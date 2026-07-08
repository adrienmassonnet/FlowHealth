import { verifySubscriptionCode } from '@/lib/subscription-auth';

export async function POST(req: Request) {
  try {
    const { email, code } = await req.json();
    if (!email) return Response.json({ error: 'Email is required.' }, { status: 400 });
    if (!code) return Response.json({ error: 'Code is required.' }, { status: 400 });

    const result = await verifySubscriptionCode(email, code);

    if (!result.ok) {
      const status = result.error === 'locked' ? 429 : 400;
      const messages: Record<typeof result.error, string> = {
        expired: 'That code has expired. Please request a new one.',
        locked: 'Too many incorrect attempts. Please try again later.',
        wrong_code: `Incorrect code.${result.attemptsRemaining != null ? ` ${result.attemptsRemaining} attempt(s) remaining.` : ''}`,
      };
      return Response.json({ error: messages[result.error] }, { status });
    }

    return Response.json({ token: result.token, subscription: result.subscription });
  } catch {
    return Response.json({ error: 'Something went wrong. Please try again.' }, { status: 500 });
  }
}
