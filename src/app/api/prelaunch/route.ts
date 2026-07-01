import { NextRequest, NextResponse } from 'next/server';
import { subscribeToKlaviyoList, trackKlaviyoEvent } from '@/lib/klaviyo';
import { getPostHogClient } from '@/lib/posthog-server';

export async function POST(req: NextRequest) {
  try {
    const { email, notifyPromos } = await req.json() as { email?: string; notifyPromos?: boolean };
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ error: 'Invalid email' }, { status: 400 });
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

    const distinctId = req.headers.get('X-POSTHOG-DISTINCT-ID') ?? email;
    const posthog = getPostHogClient();
    posthog.identify({
      distinctId: email,
      properties: { email, notify_promos: notifyPromos ?? true },
    });
    if (distinctId !== email) {
      posthog.alias({ distinctId: email, alias: distinctId });
    }
    posthog.capture({
      distinctId: email,
      event: 'prelaunch_email_captured',
      properties: {
        notify_promos: notifyPromos ?? true,
        $session_id: req.headers.get('X-POSTHOG-SESSION-ID') ?? undefined,
      },
    });

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error('[prelaunch] error', err);
    return NextResponse.json({ error: 'Internal error' }, { status: 500 });
  }
}