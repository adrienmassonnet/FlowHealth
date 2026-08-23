import { NextRequest, NextResponse } from 'next/server';
import { subscribeToKlaviyoList, trackKlaviyoEvent } from '@/lib/klaviyo';
import { isRateLimited } from '@/lib/rate-limit';
import { getOrCreateAnonymousId } from '@/lib/anonymous-id';
import { captureServerEvent } from '@/lib/posthog-server';

export async function POST(req: NextRequest) {
  try {
    const ip = req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 'unknown';
    if (await isRateLimited(`prelaunch:${ip}`, 5, 600)) {
      return NextResponse.json({ error: 'Too many requests' }, { status: 429 });
    }

    const { email, notifyPromos, source } = await req.json() as { email?: string; notifyPromos?: boolean; source?: string };
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ error: 'Invalid email' }, { status: 400 });
    }

    const fhAid = await getOrCreateAnonymousId();
    await captureServerEvent(fhAid, 'prelaunch_waitlist_joined', {
      source: source ?? 'pdp_modal',
      notify_promos: notifyPromos ?? true,
    });

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