import { cancelSubscription, getSubscriptionByEmail } from '@/lib/shopify-subscriptions';
import { trackKlaviyoEvent } from '@/lib/klaviyo';
import { verifySessionToken, toClientSubscription } from '@/lib/subscription-auth';

export async function POST(req: Request) {
  try {
    const { token, reason } = await req.json();
    if (!reason) return Response.json({ error: 'A cancellation reason is required.' }, { status: 400 });

    const email = verifySessionToken(token);
    if (!email) return Response.json({ error: 'Your session has expired. Please verify again.' }, { status: 401 });

    const current = await getSubscriptionByEmail(email);
    if (!current) return Response.json({ error: 'No subscription found.' }, { status: 404 });

    const subscription = await cancelSubscription(current.id);

    await trackKlaviyoEvent(email, 'Subscription Cancelled', {
      subscription_id: current.id,
      product_title: subscription.lines.edges[0]?.node.productTitle,
      cancellation_reason: reason,
    });

    return Response.json({ subscription: toClientSubscription(subscription), reason });
  } catch {
    return Response.json({ error: 'Failed to cancel subscription. Please contact support.' }, { status: 500 });
  }
}
