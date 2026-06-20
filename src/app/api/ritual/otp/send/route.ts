import { NextRequest, NextResponse } from 'next/server';
import { verifyRitualEligibility } from '@/lib/ritual/shopify-admin';
import { generateCode, hashCode, otpExpiresAt } from '@/lib/ritual/otp';
import { db } from '@/lib/ritual/supabase';
import { sendOtp } from '@/lib/ritual/klaviyo';
import { captureServerEvent } from '@/lib/ritual/posthog';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json() as { email?: string };
    const email = (body.email ?? '').trim().toLowerCase();

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ error: 'invalid_email' }, { status: 400 });
    }

    // Test bypass — emails listed in TEST_BYPASS_EMAILS skip Shopify verification
    const bypassEmails = (process.env.TEST_BYPASS_EMAILS ?? '').split(',').map(s => s.trim().toLowerCase()).filter(Boolean);
    const isBypass = bypassEmails.includes(email);

    // Verify Shopify order eligibility before sending OTP
    const { eligible, orderId } = isBypass
      ? { eligible: true, orderId: 'TEST' }
      : await verifyRitualEligibility(email);

    if (!eligible) {
      await captureServerEvent(email, 'shopify_order_not_found', { email_masked: maskEmail(email) });
      return NextResponse.json({ error: 'not_found' }, { status: 404 });
    }

    // Invalidate any existing unused OTPs for this email (resend flow)
    await db.otpRequests.invalidatePrevious(email);

    // Generate and store new OTP
    const code = generateCode();
    const hash = await hashCode(code);
    const expiresAt = otpExpiresAt();

    await db.otpRequests.create(email, hash, expiresAt);

    // Ensure profile exists (upsert with order id if first time)
    await db.profiles.upsert(email, { shopify_order_id: orderId });

    // Send via Klaviyo
    await sendOtp(email, code);

    await captureServerEvent(email, 'otp_sent', { email_masked: maskEmail(email) });

    return NextResponse.json({ sent: true });
  } catch (err) {
    console.error('[otp/send]', err);
    return NextResponse.json({ error: 'server_error' }, { status: 500 });
  }
}

function maskEmail(email: string): string {
  const [local, domain] = email.split('@');
  return `${local[0]}${'•'.repeat(Math.min(local.length - 1, 5))}@${domain}`;
}
