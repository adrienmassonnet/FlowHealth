import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';
import { subscribeToKlaviyoList, trackKlaviyoEvent } from '@/lib/klaviyo';
import { prelaunchRateLimit, getIp } from '@/lib/rate-limit';
import { newsletterWelcomeEmail } from '@/lib/email-templates';

const DISCOUNT_CODE = process.env.NEWSLETTER_DISCOUNT_CODE ?? 'FIRST_FLOW_10';

export async function POST(req: NextRequest) {
  const { success } = await prelaunchRateLimit.limit(getIp(req));
  if (!success) {
    return NextResponse.json({ error: 'Too many requests' }, { status: 429 });
  }

  try {
    const { email } = await req.json() as { email?: string };

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ error: 'Invalid email' }, { status: 400 });
    }

    // Add to Klaviyo newsletter list
    const klaviyoKey = process.env.KLAVIYO_PRIVATE_API_KEY;
    const klaviyoListId = process.env.KLAVIYO_NEWSLETTER_LIST_ID ?? process.env.KLAVIYO_PRELAUNCH_LIST_ID;
    if (klaviyoKey && klaviyoListId) {
      try {
        await Promise.all([
          subscribeToKlaviyoList(email, klaviyoListId),
          trackKlaviyoEvent(email, 'Newsletter Signup', { source: 'exit_intent', discountCode: DISCOUNT_CODE }),
        ]);
      } catch (err) {
        console.error('[newsletter] Klaviyo error', err);
      }
    }

    // Send confirmation email with discount code
    const resendKey = process.env.RESEND_API_KEY;
    if (resendKey) {
      const resend = new Resend(resendKey);
      const { subject, html, text } = newsletterWelcomeEmail(email, DISCOUNT_CODE);
      const from = process.env.RESEND_FROM_EMAIL ?? 'hello@flowhealth.com';
      const { error } = await resend.emails.send({ from, to: email, subject, html, text });
      if (error) console.error('[newsletter] Resend error', error);
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error('[newsletter] error', err);
    return NextResponse.json({ error: 'Internal error' }, { status: 500 });
  }
}