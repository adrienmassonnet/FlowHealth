import { createHmac } from 'crypto';

// Klaviyo event names mapped from Shopify subscription webhook topics
const KLAVIYO_EVENTS: Record<string, string> = {
  'subscription_contracts/create': 'Subscription Created',
  'subscription_contracts/update': 'Subscription Updated',
};

// Shopify sends status changes as updates — we derive a more specific event name
function resolveEventName(topic: string, payload: Record<string, unknown>): string {
  if (topic === 'subscription_contracts/update') {
    const status = payload.status as string | undefined;
    if (status === 'PAUSED') return 'Subscription Paused';
    if (status === 'CANCELLED') return 'Subscription Cancelled';
    if (status === 'ACTIVE') return 'Subscription Resumed';
  }
  return KLAVIYO_EVENTS[topic] ?? 'Subscription Updated';
}

async function trackKlaviyoEvent(email: string, eventName: string, properties: Record<string, unknown>) {
  await fetch('https://a.klaviyo.com/api/events/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'revision': '2024-02-15',
      'Authorization': `Klaviyo-API-Key ${process.env.KLAVIYO_PRIVATE_API_KEY}`,
    },
    body: JSON.stringify({
      data: {
        type: 'event',
        attributes: {
          metric: { data: { type: 'metric', attributes: { name: eventName } } },
          profile: { data: { type: 'profile', attributes: { email } } },
          properties,
          time: new Date().toISOString(),
        },
      },
    }),
  });
}

function verifyShopifyHmac(body: string, hmacHeader: string): boolean {
  const secret = process.env.SHOPIFY_WEBHOOK_SECRET!;
  const digest = createHmac('sha256', secret).update(body, 'utf8').digest('base64');
  return digest === hmacHeader;
}

export async function POST(req: Request) {
  const body = await req.text();
  const hmac = req.headers.get('x-shopify-hmac-sha256') ?? '';
  const topic = req.headers.get('x-shopify-topic') ?? '';

  if (!verifyShopifyHmac(body, hmac)) {
    return new Response('Unauthorized', { status: 401 });
  }

  try {
    const payload = JSON.parse(body) as Record<string, unknown>;

    // Extract customer email — Shopify embeds it in the contract payload
    const email = payload.customer_email as string | undefined;
    if (!email) return new Response('OK', { status: 200 });

    const eventName = resolveEventName(topic, payload);
    const line = (payload.lines as { edges?: Array<{ node: Record<string, unknown> }> })?.edges?.[0]?.node;

    await trackKlaviyoEvent(email, eventName, {
      subscription_id: payload.id,
      status: payload.status,
      product_title: line?.product_title,
      next_billing_date: payload.next_billing_date,
      cancel_reason: payload.cancellation_reason,
    });
  } catch {
    // Always return 200 to Shopify to prevent retries on our processing errors
  }

  return new Response('OK', { status: 200 });
}