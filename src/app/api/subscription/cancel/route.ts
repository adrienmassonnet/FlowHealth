import { cancelSubscription } from '@/lib/shopify-subscriptions';
import { trackKlaviyoEvent } from '@/lib/klaviyo';
import { getPostHogClient } from '@/lib/posthog-server';

export async function POST(req: Request) {
  try {
    const { subscriptionId, email, reason } = await req.json();
    if (!subscriptionId) return Response.json({ error: 'subscriptionId is required.' }, { status: 400 });
    if (!email) return Response.json({ error: 'email is required.' }, { status: 400 });
    if (!reason) return Response.json({ error: 'A cancellation reason is required.' }, { status: 400 });

    const subscription = await cancelSubscription(subscriptionId);

    await trackKlaviyoEvent(email, 'Subscription Cancelled', {
      subscription_id: subscriptionId,
      product_title: subscription.lines.edges[0]?.node.productTitle,
      cancellation_reason: reason,
    });

    const posthog = getPostHogClient();
    posthog.capture({
      distinctId: email,
      event: 'subscription_cancelled',
      properties: {
        subscription_id: subscriptionId,
        product_title: subscription.lines.edges[0]?.node.productTitle,
        cancellation_reason: reason,
      },
    });

    return Response.json({ subscription, reason });
  } catch {
    return Response.json({ error: 'Failed to cancel subscription. Please contact support.' }, { status: 500 });
  }
}