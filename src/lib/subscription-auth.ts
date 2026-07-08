// Subscription self-service auth — OTP-gated access to pause/resume/cancel.
//
// Flow: send() emails a code (always returns the same generic response,
// regardless of whether the email has a subscription, to avoid leaking
// account existence) → verify() checks the code and, on success, mints a
// short-lived signed session token → pause/resume/cancel routes require
// that token and re-derive the subscription server-side from its email,
// never trusting a client-supplied subscriptionId.

import crypto from 'crypto';
import { createClient } from '@supabase/supabase-js';
import {
  generateCode,
  hashCode,
  verifyCode as verifyOtpCode,
  otpExpiresAt,
  isLockedOut,
  attemptsRemaining,
  shouldLock,
  lockoutUntil,
} from './ritual/otp';
import { trackKlaviyoEvent } from './klaviyo';
import { getSubscriptionByEmail, type ShopifySubscription } from './shopify-subscriptions';

const SESSION_TTL_MINUTES = 15;

function getClient() {
  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) throw new Error('Missing SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY');
  return createClient(url, key, { auth: { persistSession: false } });
}

interface OtpRequestRow {
  id: string;
  email: string;
  code_hash: string;
  expires_at: string;
  used: boolean;
  attempt_count: number;
  locked_until: string | null;
}

async function findLatest(email: string): Promise<OtpRequestRow | null> {
  const { data } = await getClient()
    .from('subscription_otp_requests')
    .select('*')
    .eq('email', email.toLowerCase())
    .eq('used', false)
    .gt('expires_at', new Date().toISOString())
    .order('created_at', { ascending: false })
    .limit(1)
    .single();
  return data ?? null;
}

// ─── Send code ────────────────────────────────────────────────────────────────
// Always resolves the same way regardless of whether the email has a
// subscription — callers should show a generic "if that email has a
// subscription, we've sent a code" message either way.

export async function sendSubscriptionCode(email: string): Promise<void> {
  const normalized = email.trim().toLowerCase();

  const subscription = await getSubscriptionByEmail(normalized).catch(() => null);
  if (!subscription) return; // silently no-op — don't reveal account existence

  await getClient()
    .from('subscription_otp_requests')
    .update({ used: true })
    .eq('email', normalized)
    .eq('used', false);

  const code = generateCode();
  const hash = await hashCode(code);
  const expiresAt = otpExpiresAt();

  const { error } = await getClient()
    .from('subscription_otp_requests')
    .insert({ email: normalized, code_hash: hash, expires_at: expiresAt.toISOString() });
  if (error) throw error;

  await trackKlaviyoEvent(normalized, 'Subscription Management OTP Sent', {
    code,
    expires_in_minutes: 10,
  });
}

// ─── Verify code ──────────────────────────────────────────────────────────────

export type VerifyResult =
  | { ok: true; token: string; subscription: ClientSubscription }
  | { ok: false; error: 'expired' | 'locked' | 'wrong_code'; attemptsRemaining?: number; lockedUntil?: string };

export async function verifySubscriptionCode(email: string, code: string): Promise<VerifyResult> {
  const normalized = email.trim().toLowerCase();
  const record = await findLatest(normalized);
  if (!record) return { ok: false, error: 'expired' };

  if (isLockedOut(record.locked_until)) {
    return { ok: false, error: 'locked', lockedUntil: record.locked_until ?? undefined };
  }

  const correct = await verifyOtpCode(code, record.code_hash);
  if (!correct) {
    const lock = shouldLock(record.attempt_count);
    const newLockedUntil = lock ? lockoutUntil() : undefined;
    await getClient()
      .from('subscription_otp_requests')
      .update({
        attempt_count: record.attempt_count + 1,
        ...(newLockedUntil ? { locked_until: newLockedUntil.toISOString() } : {}),
      })
      .eq('id', record.id);

    if (lock) return { ok: false, error: 'locked', lockedUntil: newLockedUntil?.toISOString() };
    return { ok: false, error: 'wrong_code', attemptsRemaining: attemptsRemaining(record.attempt_count + 1) };
  }

  await getClient().from('subscription_otp_requests').update({ used: true }).eq('id', record.id);

  const subscription = await getSubscriptionByEmail(normalized);
  if (!subscription) return { ok: false, error: 'expired' };

  return { ok: true, token: signSessionToken(normalized), subscription: toClientSubscription(subscription) };
}

// ─── Session token — HMAC-signed, short-lived, carries only the email ────────

function secret(): string {
  const s = process.env.SUBSCRIPTION_TOKEN_SECRET;
  if (!s) throw new Error('Missing SUBSCRIPTION_TOKEN_SECRET');
  return s;
}

function signSessionToken(email: string): string {
  const payload = JSON.stringify({ email, exp: Date.now() + SESSION_TTL_MINUTES * 60 * 1000 });
  const payloadB64 = Buffer.from(payload).toString('base64url');
  const sig = crypto.createHmac('sha256', secret()).update(payloadB64).digest('base64url');
  return `${payloadB64}.${sig}`;
}

// ─── Client-facing shape ───────────────────────────────────────────────────────
// Shopify's subscriptionContract shape is nested (lines[].node, deliveryPolicy,
// currentPrice.amount as string). Flatten it once here so the frontend has one
// simple, correct shape instead of guessing at field names.

export interface ClientSubscription {
  id: string;
  status: 'active' | 'paused' | 'cancelled';
  productTitle: string;
  intervalCount: number;
  interval: string;
  nextBillingDate: string;
  price: number;
  currency: string;
  quantity: number;
}

const STATUS_MAP: Record<ShopifySubscription['status'], ClientSubscription['status']> = {
  ACTIVE: 'active',
  PAUSED: 'paused',
  CANCELLED: 'cancelled',
  FAILED: 'cancelled',
  EXPIRED: 'cancelled',
};

export function toClientSubscription(sub: ShopifySubscription): ClientSubscription {
  const line = sub.lines.edges[0]?.node;
  return {
    id: sub.id,
    status: STATUS_MAP[sub.status],
    productTitle: line?.productTitle ?? '',
    intervalCount: line?.deliveryPolicy?.intervalCount ?? 1,
    interval: line?.deliveryPolicy?.interval ?? '',
    nextBillingDate: sub.nextBillingDate,
    price: Number(line?.currentPrice?.amount ?? 0),
    currency: line?.currentPrice?.currencyCode ?? 'CHF',
    quantity: line?.quantity ?? 1,
  };
}

// Returns the verified email, or null if the token is missing/invalid/expired.
export function verifySessionToken(token: string | undefined | null): string | null {
  if (!token || !token.includes('.')) return null;
  const [payloadB64, sig] = token.split('.');
  const expectedSig = crypto.createHmac('sha256', secret()).update(payloadB64).digest('base64url');
  const sigBuf = Buffer.from(sig ?? '');
  const expectedBuf = Buffer.from(expectedSig);
  if (sigBuf.length !== expectedBuf.length || !crypto.timingSafeEqual(sigBuf, expectedBuf)) return null;

  try {
    const { email, exp } = JSON.parse(Buffer.from(payloadB64, 'base64url').toString('utf8'));
    if (typeof email !== 'string' || typeof exp !== 'number') return null;
    if (Date.now() > exp) return null;
    return email;
  } catch {
    return null;
  }
}
