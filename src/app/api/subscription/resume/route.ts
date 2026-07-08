import { resumeSubscription, getSubscriptionByEmail } from '@/lib/shopify-subscriptions';
import { trackKlaviyoEvent } from '@/lib/klaviyo';
import { verifySessionToken, toClientSubscription } from '@/lib/subscription-auth';

export async function POST(req: Request) {
  try {
    const { token } = await req.json();
    const email = verifySessionToken(token);
    if (!email) return Response.json({ error: 'Your session has expired. Please verify again.' }, { status: 401 });

    const current = await getSubscriptionByEmail(email);
    if (!current) return Response.json({ error: 'No subscription found.' }, { status: 404 });

    const subscription = await resumeSubscription(current.id);

    await trackKlaviyoEvent(email, 'Subscription Resumed', {
      subscription_id: current.id,
      product_title: subscription.lines.edges[0]?.node.productTitle,
      next_billing_date: subscription.nextBillingDate,
    });

    return Response.json({ subscription: toClientSubscription(subscription) });
  } catch {
    return Response.json({ error: 'Failed to resume subscription. Please contact support.' }, { status: 500 });
  }
}
