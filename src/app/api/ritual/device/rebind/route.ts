import { NextRequest, NextResponse } from 'next/server';
import { verifyCode, isLockedOut } from '@/lib/ritual/otp';
import { db } from '@/lib/ritual/supabase';
import crypto from 'crypto';

// Allows a user to rebind their ritual to a new device after OTP re-verification.
// Last-device-wins: the previous bound token is silently overwritten.

export async function POST(req: NextRequest) {
  try {
    const body = await req.json() as { email?: string; code?: string; device_token?: string };
    const email = (body.email ?? '').trim().toLowerCase();
    const code = (body.code ?? '').trim();
    const newDeviceToken = (body.device_token ?? '').trim();

    if (!email || !code || !newDeviceToken) {
      return NextResponse.json({ error: 'missing_fields' }, { status: 400 });
    }

    const otpRecord = await db.otpRequests.findLatest(email);
    if (!otpRecord) return NextResponse.json({ error: 'expired' }, { status: 400 });
    if (isLockedOut(otpRecord.locked_until)) {
      return NextResponse.json({ error: 'locked', locked_until: otpRecord.locked_until }, { status: 429 });
    }

    const correct = await verifyCode(code, otpRecord.code_hash);
    if (!correct) return NextResponse.json({ error: 'wrong_code' }, { status: 400 });

    await db.otpRequests.markUsed(otpRecord.id);

    const profile = await db.profiles.findByEmail(email);
    if (!profile) return NextResponse.json({ error: 'profile_not_found' }, { status: 404 });

    const hashedToken = hashDeviceToken(newDeviceToken);

    await db.profiles.update(profile.id, { bound_device_token: hashedToken });
    await db.deviceTokens.upsert(hashedToken, profile.id);

    return NextResponse.json({ success: true, device_token: hashedToken });
  } catch (err) {
    console.error('[device/rebind]', err);
    return NextResponse.json({ error: 'server_error' }, { status: 500 });
  }
}

function hashDeviceToken(token: string): string {
  const secret = process.env.DEVICE_TOKEN_SECRET ?? 'dev-secret-change-me';
  return crypto.createHmac('sha256', secret).update(token).digest('hex');
}
