import { resumeSubscription } from '@/lib/shopify-subscriptions';
import { trackKlaviyoEvent } from '@/lib/klaviyo';

export async function POST(req: Request) {
  try {
    const { subscriptionId, email } = await req.json();
    if (!subscriptionId) return Response.json({ error: 'subscriptionId is required.' }, { status: 400 });
    if (!email) return Response.json({ error: 'email is required.' }, { status: 400 });

    const subscription = await resumeSubscription(subscriptionId);

    await trackKlaviyoEvent(email, 'Subscription Resumed', {
      subscription_id: subscriptionId,
      product_title: subscription.lines.edges[0]?.node.productTitle,
      next_billing_date: subscription.nextBillingDate,
    });

    return Response.json({ subscription });
  } catch {
    return Response.json({ error: 'Failed to resume subscription. Please contact support.' }, { status: 500 });
  }
}