import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/ritual/supabase';
import { captureServerEvent } from '@/lib/ritual/posthog';
import { createHmac } from 'crypto';

// Verify email + order_id combo, bind device token, return hashed token.
// Used by email CTAs with pre-embedded credentials — no OTP required.
export async function POST(req: NextRequest) {
  try {
    const body = await req.json() as { email?: string; order_id?: string; device_token?: string };
    const email = (body.email ?? '').trim().toLowerCase();
    const orderId = (body.order_id ?? '').trim();
    const rawDeviceToken = (body.device_token ?? '').trim();

    if (!email || !orderId || !rawDeviceToken) {
      return NextResponse.json({ error: 'missing_params' }, { status: 400 });
    }

    // Find profile — must already exist (created at OTP send time or first scan)
    const profile = await db.profiles.findByEmail(email);

    if (!profile) {
      await captureServerEvent(email, 'magic_link_fail', { reason: 'profile_not_found' });
      return NextResponse.json({ error: 'not_found' }, { status: 404 });
    }

    // Verify order ID matches what we stored from Shopify at registration
    if (profile.shopify_order_id !== orderId) {
      await captureServerEvent(email, 'magic_link_fail', { reason: 'order_mismatch' });
      return NextResponse.json({ error: 'invalid_order' }, { status: 403 });
    }

    // Hash the device token before storing (same approach as OTP verify)
    const secret = process.env.DEVICE_TOKEN_HMAC_SECRET ?? 'flow-ritual-secret';
    const hashedToken = createHmac('sha256', secret).update(rawDeviceToken).digest('hex');

    // Upsert device token and bind to profile
    await db.deviceTokens.upsert(hashedToken, profile.id);
    await db.profiles.update(profile.id, {
      bound_device_token: hashedToken,
      entry_source: 'magic_link',
    });

    await captureServerEvent(profile.id, 'magic_link_success', {
      sequence_position: profile.sequence_position,
      entry: 'email_cta',
    });

    return NextResponse.json({
      success: true,
      device_token: hashedToken,
      state: profile.sequence_position === 0 ? 'first_time_success' : 'returning',
      sequence_position: profile.sequence_position,
    });
  } catch (err) {
    console.error('[magic-link]', err);
    return NextResponse.json({ error: 'server_error' }, { status: 500 });
  }
}
