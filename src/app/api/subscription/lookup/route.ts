import { sendSubscriptionCode } from '@/lib/subscription-auth';

// Sends a one-time code if the email has a subscription. Always returns the
// same generic response regardless of whether the email exists, to avoid
// leaking subscription/account existence to an unauthenticated caller.
export async function POST(req: Request) {
  try {
    const { email } = await req.json();
    if (!email) return Response.json({ error: 'Email is required.' }, { status: 400 });

    await sendSubscriptionCode(email);

    return Response.json({ sent: true });
  } catch {
    return Response.json({ error: 'Something went wrong. Please try again.' }, { status: 500 });
  }
}
