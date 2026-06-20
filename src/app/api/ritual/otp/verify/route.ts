import { NextRequest, NextResponse } from 'next/server';
import { verifyCode, isLockedOut, attemptsRemaining, shouldLock, lockoutUntil } from '@/lib/ritual/otp';
import { db } from '@/lib/ritual/supabase';
import { captureServerEvent, identifyProfile } from '@/lib/ritual/posthog';
import { processScan } from '@/lib/ritual/state-machine';
import crypto from 'crypto';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json() as { email?: string; code?: string; device_token?: string };
    const email = (body.email ?? '').trim().toLowerCase();
    const code = (body.code ?? '').trim();
    const deviceToken = (body.device_token ?? '').trim();

    if (!email || !code || !deviceToken) {
      return NextResponse.json({ error: 'missing_fields' }, { status: 400 });
    }

    // Find the latest valid OTP for this email
    const otpRecord = await db.otpRequests.findLatest(email);

    if (!otpRecord) {
      return NextResponse.json({ error: 'expired' }, { status: 400 });
    }

    // Check lockout
    if (isLockedOut(otpRecord.locked_until)) {
      return NextResponse.json(
        { error: 'locked', locked_until: otpRecord.locked_until },
        { status: 429 }
      );
    }

    // Verify code
    const correct = await verifyCode(code, otpRecord.code_hash);

    if (!correct) {
      const lockUser = shouldLock(otpRecord.attempt_count);
      const newLockoutUntil = lockUser ? lockoutUntil() : undefined;

      await db.otpRequests.incrementAttempt(otpRecord.id, newLockoutUntil);

      const remaining = attemptsRemaining(otpRecord.attempt_count + 1);

      await captureServerEvent(email, 'otp_failed', { attempts_remaining: remaining });

      if (lockUser) {
        await captureServerEvent(email, 'otp_locked', { locked_until: newLockoutUntil?.toISOString() });
        return NextResponse.json(
          { error: 'locked', locked_until: newLockoutUntil?.toISOString() },
          { status: 429 }
        );
      }

      return NextResponse.json(
        { error: 'wrong_code', attempts_remaining: remaining },
        { status: 400 }
      );
    }

    // Code correct — mark used
    await db.otpRequests.markUsed(otpRecord.id);

    // Bind device token to profile
    const profile = await db.profiles.findByEmail(email);
    if (!profile) {
      return NextResponse.json({ error: 'profile_not_found' }, { status: 404 });
    }

    // Hash device token before storing for privacy
    const hashedToken = hashDeviceToken(deviceToken);

    await db.profiles.update(profile.id, {
      bound_device_token: hashedToken,
      entry_source: 'qr_scan',
      otp_verified_at: new Date().toISOString(),
    });
    await db.deviceTokens.upsert(hashedToken, profile.id);

    const isNewProfile = profile.sequence_position === 0 && !profile.last_scan_at;

    await identifyProfile(profile.id, email);
    await captureServerEvent(profile.id, 'otp_verified', { email, is_new_profile: isNewProfile });

    // Return profile state — on first OTP verify we don't advance sequence yet;
    // that happens on the first QR scan. Return the current state.
    return NextResponse.json({
      success: true,
      device_token: hashedToken,
      state: isNewProfile ? 'first_time_success' : 'returning',
      sequence_position: profile.sequence_position,
    });
  } catch (err) {
    console.error('[otp/verify]', err);
    return NextResponse.json({ error: 'server_error' }, { status: 500 });
  }
}

// One-way hash of device token for storage — prevents token enumeration
function hashDeviceToken(token: string): string {
  const secret = process.env.DEVICE_TOKEN_SECRET ?? 'dev-secret-change-me';
  return crypto.createHmac('sha256', secret).update(token).digest('hex');
}
