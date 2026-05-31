import { getSubscriptionByEmail } from '@/lib/shopify-subscriptions';

export async function POST(req: Request) {
  try {
    const { email } = await req.json();
    if (!email) return Response.json({ error: 'Email is required.' }, { status: 400 });

    const subscription = await getSubscriptionByEmail(email);
    if (!subscription) return Response.json({ error: 'No subscription found for this email address.' }, { status: 404 });

    return Response.json({ subscription });
  } catch {
    return Response.json({ error: 'Something went wrong. Please try again.' }, { status: 500 });
  }
}