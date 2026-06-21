import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/ritual/supabase';

// Returns (or generates) the referral code for the requesting device token.
// Called by the ritual Share button before opening the native share sheet.
export async function POST(req: NextRequest) {
  try {
    const body = await req.json() as { device_token?: string; day_position?: number };
    const deviceToken = (body.device_token ?? '').trim();
    const dayPosition = body.day_position ?? 1;

    if (!deviceToken) {
      return NextResponse.json({ error: 'missing_device_token' }, { status: 400 });
    }

    const profile = await db.profiles.findByDeviceToken(deviceToken);
    if (!profile) {
      return NextResponse.json({ error: 'profile_not_found' }, { status: 404 });
    }

    const referralCode = await db.profiles.ensureReferralCode(profile.id);
    const shareUrl = `${process.env.NEXT_PUBLIC_SITE_URL ?? 'https://flowhealth.ch'}/ritual/share/${referralCode}?day=${dayPosition}`;

    return NextResponse.json({ referral_code: referralCode, share_url: shareUrl });
  } catch (err) {
    console.error('[ritual/share]', err);
    return NextResponse.json({ error: 'server_error' }, { status: 500 });
  }
}
