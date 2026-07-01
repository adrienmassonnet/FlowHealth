import { NextRequest, NextResponse } from 'next/server';
import { subscribeToKlaviyoList, trackKlaviyoEvent } from '@/lib/klaviyo';
import { prelaunchRateLimit, getIp } from '@/lib/rate-limit';

export async function POST(req: NextRequest) {
  const { success } = await prelaunchRateLimit.limit(getIp(req));
  if (!success) {
    return NextResponse.json({ error: 'Too many requests' }, { status: 429 });
  }

  try {
    const { email, notifyPromos, turnstileToken } = await req.json() as {
      email?: string;
      notifyPromos?: boolean;
      turnstileToken?: string;
    };

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ error: 'Invalid email' }, { status: 400 });
    }

    // Verify Turnstile token
    const secretKey = process.env.TURNSTILE_SECRET_KEY;
    if (secretKey) {
      if (!turnstileToken) {
        return NextResponse.json({ error: 'Bot verification required' }, { status: 400 });
      }
      const verifyRes = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ secret: secretKey, response: turnstileToken }),
      });
      const verifyData = await verifyRes.json() as { success: boolean };
      if (!verifyData.success) {
        return NextResponse.json({ error: 'Bot verification failed' }, { status: 403 });
      }
    }

    const klaviyoKey = process.env.KLAVIYO_PRIVATE_API_KEY;
    const klaviyoListId = process.env.KLAVIYO_PRELAUNCH_LIST_ID;
    if (klaviyoKey && klaviyoListId) {
      try {
        const [subRes, eventRes] = await Promise.all([
          subscribeToKlaviyoList(email, klaviyoListId),
          trackKlaviyoEvent(email, 'Pre-Launch Signup', { notifyPromos: notifyPromos ?? true }),
        ]);
        if (!subRes.ok) console.error('[prelaunch] Klaviyo subscribe failed', subRes.status, await subRes.text());
        if (!eventRes.ok) console.error('[prelaunch] Klaviyo event failed', eventRes.status, await eventRes.text());
      } catch (klaviyoErr) {
        console.error('[prelaunch] Klaviyo error', klaviyoErr);
      }
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error('[prelaunch] error', err);
    return NextResponse.json({ error: 'Internal error' }, { status: 500 });
  }
}