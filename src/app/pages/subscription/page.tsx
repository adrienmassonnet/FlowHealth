'use client';

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { trackEvent } from '@/lib/clarity';
import { ga4SubscriptionEvent } from '@/lib/ga4';

type Step = 'lookup' | 'verify' | 'manage' | 'paused' | 'cancelled';

interface Subscription {
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

const CANCEL_REASONS = [
  'Too expensive',
  'Not seeing results',
  'Taking a break',
  'Switching to another product',
  'Ordering too frequently',
  'Other',
];

const STATUS_BADGE: Record<Subscription['status'], { label: string; classes: string }> = {
  active:    { label: 'Active',    classes: 'bg-emerald-50 text-emerald-700 border-emerald-100' },
  paused:    { label: 'Paused',    classes: 'bg-amber-50 text-amber-700 border-amber-100' },
  cancelled: { label: 'Cancelled', classes: 'bg-red-50 text-red-600 border-red-100' },
};

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' });
}

function formatPrice(amount: number, currency: string) {
  return new Intl.NumberFormat('fr-CH', { style: 'currency', currency }).format(amount);
}

async function apiPost(path: string, body: Record<string, unknown>) {
  const res = await fetch(path, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error ?? 'Something went wrong.');
  return data;
}

export default function SubscriptionPage() {
  return (
    <Suspense>
      <SubscriptionPageInner />
    </Suspense>
  );
}

function SubscriptionPageInner() {
  const searchParams = useSearchParams();
  const [step, setStep] = useState<Step>('lookup');
  const [email, setEmail] = useState('');
  const [code, setCode] = useState('');
  const [token, setToken] = useState('');
  const [loading, setLoading] = useState(false);
  const [actionLoading, setActionLoading] = useState(false);
  const [error, setError] = useState('');
  const [verifyError, setVerifyError] = useState('');
  const [actionError, setActionError] = useState('');
  const [sub, setSub] = useState<Subscription | null>(null);
  const [confirmAction, setConfirmAction] = useState<'cancel' | 'pause' | null>(null);
  const [cancelReason, setCancelReason] = useState('');

  async function sendCode(emailValue: string) {
    setLoading(true);
    setError('');
    try {
      await apiPost('/api/subscription/lookup', { email: emailValue });
      setStep('verify');
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Something went wrong.');
    } finally {
      setLoading(false);
    }
  }

  async function verifyCode() {
    setLoading(true);
    setVerifyError('');
    try {
      const data = await apiPost('/api/subscription/verify', { email, code });
      setToken(data.token);
      setSub(data.subscription);
      setStep('manage');
    } catch (e) {
      setVerifyError(e instanceof Error ? e.message : 'Something went wrong.');
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    const emailParam = searchParams.get('email');
    if (!emailParam) return;
    setEmail(emailParam);
    trackEvent('subscription_email_link_open');
    sendCode(emailParam);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams]);

  async function handleLookup(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    trackEvent('subscription_lookup_submit');
    ga4SubscriptionEvent('lookup');
    await sendCode(email);
  }

  async function handleVerify(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    trackEvent('subscription_verify_submit');
    await verifyCode();
  }

  async function handlePause() {
    if (!sub) return;
    setActionLoading(true);
    setActionError('');
    trackEvent('subscription_pause_confirm');
    ga4SubscriptionEvent('pause_confirm');
    try {
      const data = await apiPost('/api/subscription/pause', { token });
      setSub(data.subscription);
      setConfirmAction(null);
      setStep('paused');
    } catch (e) {
      setActionError(e instanceof Error ? e.message : 'Something went wrong.');
    } finally {
      setActionLoading(false);
    }
  }

  async function handleCancel() {
    if (!sub || !cancelReason) return;
    setActionLoading(true);
    setActionError('');
    trackEvent('subscription_cancel_confirm');
    ga4SubscriptionEvent('cancel_confirm', cancelReason);
    try {
      const data = await apiPost('/api/subscription/cancel', { token, reason: cancelReason });
      setSub(data.subscription);
      setConfirmAction(null);
      setStep('cancelled');
    } catch (e) {
      setActionError(e instanceof Error ? e.message : 'Something went wrong.');
    } finally {
      setActionLoading(false);
    }
  }

  async function handleResume() {
    if (!sub) return;
    setActionLoading(true);
    setActionError('');
    trackEvent('subscription_resume');
    ga4SubscriptionEvent('resume');
    try {
      const data = await apiPost('/api/subscription/resume', { token });
      setSub(data.subscription);
      setStep('manage');
    } catch (e) {
      setActionError(e instanceof Error ? e.message : 'Something went wrong.');
    } finally {
      setActionLoading(false);
    }
  }

  return (
    <main className="pt-20 bg-white min-h-screen">

      {/* Hero */}
      <div className="border-b border-ink/[12.5%]">
        <div className="max-w-[1200px] mx-auto px-6 pt-6 pb-10 md:py-14">
          <p className="text-xs tracking-[0.16em] uppercase font-semibold bg-gradient-to-r from-brand to-ink bg-clip-text text-transparent mb-3">
            My account
          </p>
          <h1 className="text-3xl md:text-5xl font-semibold tracking-[-0.02em] leading-tight text-ink mb-3">
            Subscription
          </h1>
          <p className="text-sm text-[var(--text-secondary)] leading-relaxed max-w-sm">
            View and manage your recurring Flow order — pause, cancel, or resume your delivery.
          </p>
        </div>
      </div>

      <div className="max-w-[1200px] mx-auto px-6 py-12 md:py-16">
        <div className="max-w-lg mx-auto">

          {/* ── Step 1: Email lookup ── */}
          {step === 'lookup' && (
            <div className="bg-white rounded-2xl border border-ink/[12.5%] shadow-[var(--shadow-card)] p-7 md:p-9">
              <div className="w-10 h-10 rounded-xl bg-ink/[3.9%] border border-ink/[12.5%] flex items-center justify-center mb-5">
                <svg width="18" height="18" viewBox="0 0 20 20" fill="none">
                  <rect x="3" y="8" width="14" height="9" rx="2" stroke="var(--color-ink)" strokeWidth="1.3"/>
                  <path d="M7 8V6a3 3 0 016 0v2" stroke="var(--color-ink)" strokeWidth="1.3" strokeLinecap="round"/>
                </svg>
              </div>
              <p className="text-xs tracking-[0.14em] uppercase text-[var(--text-muted)] font-medium mb-1">Access your subscription</p>
              <h2 className="text-xl font-semibold text-ink tracking-[-0.01em] mb-1">Enter your email</h2>
              <p className="text-xs text-[var(--text-muted)] mb-6">
                Use the email address you placed your order with.
              </p>

              <form onSubmit={handleLookup} className="space-y-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-medium text-ink/55 tracking-[0.04em]">Email address</label>
                  <div className="relative">
                    <svg width="14" height="14" viewBox="0 0 16 16" fill="none" className="absolute left-3.5 top-1/2 -translate-y-1/2 text-ink/30">
                      <rect x="2" y="3.5" width="12" height="9" rx="1.5" stroke="currentColor" strokeWidth="1.2"/>
                      <path d="M2 6l6 4 6-4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
                    </svg>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => { setEmail(e.target.value); setError(''); }}
                      placeholder="ada@example.com"
                      className="w-full pl-9 pr-3.5 py-2.5 text-sm rounded-xl border border-ink/[12.5%] bg-ink/[3.9%] text-ink placeholder:text-ink/25 focus:outline-none focus:border-ink/40 focus:bg-white transition-colors"
                    />
                  </div>
                  {error && <p className="text-xs text-red-500 mt-1">{error}</p>}
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="btn-cta w-full py-3.5 rounded-xl text-white text-xs tracking-[0.08em] uppercase font-semibold disabled:opacity-60 transition-opacity"
                >
                  {loading ? 'Sending code…' : 'Send me a code'}
                </button>
              </form>
            </div>
          )}

          {/* ── Step 1b: Verify code ── */}
          {step === 'verify' && (
            <div className="bg-white rounded-2xl border border-ink/[12.5%] shadow-[var(--shadow-card)] p-7 md:p-9">
              <p className="text-xs tracking-[0.14em] uppercase text-[var(--text-muted)] font-medium mb-1">Check your inbox</p>
              <h2 className="text-xl font-semibold text-ink tracking-[-0.01em] mb-1">Enter your code</h2>
              <p className="text-xs text-[var(--text-muted)] mb-6">
                If {email} has a subscription, we&apos;ve sent a code — it expires in 10 minutes.
              </p>

              <form onSubmit={handleVerify} className="space-y-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-medium text-ink/55 tracking-[0.04em]">Verification code</label>
                  <input
                    type="text"
                    inputMode="numeric"
                    required
                    value={code}
                    onChange={(e) => { setCode(e.target.value); setVerifyError(''); }}
                    placeholder="0000"
                    className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-ink/[12.5%] bg-ink/[3.9%] text-ink placeholder:text-ink/25 focus:outline-none focus:border-ink/40 focus:bg-white transition-colors tracking-[0.3em]"
                  />
                  {verifyError && <p className="text-xs text-red-500 mt-1">{verifyError}</p>}
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="btn-cta w-full py-3.5 rounded-xl text-white text-xs tracking-[0.08em] uppercase font-semibold disabled:opacity-60 transition-opacity"
                >
                  {loading ? 'Verifying…' : 'Verify'}
                </button>

                <button
                  type="button"
                  onClick={() => { setStep('lookup'); setCode(''); setVerifyError(''); }}
                  className="w-full text-xs text-ink/50 hover:text-ink transition-colors"
                >
                  Use a different email
                </button>
              </form>
            </div>
          )}

          {/* ── Step 2: Manage ── */}
          {step === 'manage' && sub && (
            <div className="space-y-4">

              <div className="bg-white rounded-2xl border border-ink/[12.5%] shadow-[var(--shadow-card)] p-7 md:p-9">
                <div className="flex items-start justify-between gap-3 mb-6">
                  <div>
                    <h2 className="text-lg font-semibold text-ink tracking-[-0.01em]">{sub.productTitle}</h2>
                  </div>
                  <span className={`shrink-0 text-[10px] font-semibold tracking-[0.08em] uppercase px-2.5 py-1 rounded-full border ${STATUS_BADGE[sub.status].classes}`}>
                    {STATUS_BADGE[sub.status].label}
                  </span>
                </div>

                <div className="space-y-3 mb-6">
                  <Row label="Frequency"      value={`Every ${sub.intervalCount} ${sub.interval.toLowerCase()}${sub.intervalCount > 1 ? 's' : ''}`} />
                  <Row label="Next billing"   value={formatDate(sub.nextBillingDate)} />
                  <Row label="Price"          value={formatPrice(sub.price, sub.currency)} />
                  <Row label="Quantity"       value={`${sub.quantity} unit${sub.quantity > 1 ? 's' : ''}`} />
                </div>

                {actionError && (
                  <p className="text-xs text-red-500 mb-3">{actionError}</p>
                )}

                {/* Paused state — show resume */}
                {sub.status === 'paused' && !confirmAction && (
                  <div className="pt-2 border-t border-ink/[12.5%]">
                    <button
                      onClick={handleResume}
                      disabled={actionLoading}
                      className="btn-cta w-full py-2.5 rounded-xl text-white text-xs tracking-[0.06em] uppercase font-semibold disabled:opacity-60 transition-opacity"
                    >
                      {actionLoading ? 'Resuming…' : 'Resume subscription'}
                    </button>
                  </div>
                )}

                {/* Active state — show pause / cancel */}
                {sub.status === 'active' && !confirmAction && (
                  <div className="flex flex-col sm:flex-row gap-2 pt-2 border-t border-ink/[12.5%]">
                    <button
                      onClick={() => { trackEvent('subscription_pause_click'); ga4SubscriptionEvent('pause_click'); setConfirmAction('pause'); setActionError(''); }}
                      className="flex-1 py-2.5 rounded-xl text-xs tracking-[0.06em] uppercase font-semibold border border-ink/[12.5%] text-ink/70 hover:border-ink/40 hover:text-ink transition-colors"
                    >
                      Pause subscription
                    </button>
                    <button
                      onClick={() => { trackEvent('subscription_cancel_click'); ga4SubscriptionEvent('cancel_click'); setConfirmAction('cancel'); setActionError(''); }}
                      className="flex-1 py-2.5 rounded-xl text-xs tracking-[0.06em] uppercase font-semibold border border-ink/[12.5%] text-red-500/70 hover:border-red-200 hover:text-red-600 transition-colors"
                    >
                      Cancel subscription
                    </button>
                  </div>
                )}

                {/* Confirm: pause */}
                {confirmAction === 'pause' && (
                  <div className="pt-4 border-t border-ink/[12.5%]">
                    <p className="text-sm font-semibold text-ink mb-1">Pause your subscription?</p>
                    <p className="text-xs text-[var(--text-muted)] mb-4 leading-relaxed">
                      No payment will be taken while paused. You can resume at any time.
                    </p>
                    {actionError && <p className="text-xs text-red-500 mb-3">{actionError}</p>}
                    <div className="flex gap-2">
                      <button
                        onClick={handlePause}
                        disabled={actionLoading}
                        className="btn-cta flex-1 py-2.5 rounded-xl text-white text-xs tracking-[0.06em] uppercase font-semibold disabled:opacity-60 transition-opacity"
                      >
                        {actionLoading ? 'Pausing…' : 'Confirm pause'}
                      </button>
                      <button
                        onClick={() => setConfirmAction(null)}
                        disabled={actionLoading}
                        className="flex-1 py-2.5 rounded-xl text-xs tracking-[0.06em] uppercase font-semibold border border-ink/[12.5%] text-ink/60 hover:text-ink transition-colors disabled:opacity-40"
                      >
                        Keep active
                      </button>
                    </div>
                  </div>
                )}

                {/* Confirm: cancel */}
                {confirmAction === 'cancel' && (
                  <div className="pt-4 border-t border-ink/[12.5%]">
                    <p className="text-sm font-semibold text-ink mb-1">Cancel your subscription?</p>
                    <p className="text-xs text-[var(--text-muted)] mb-4 leading-relaxed">
                      All future charges and shipments will stop. Please tell us why — it helps us improve.
                    </p>

                    <div className="space-y-2 mb-4">
                      {CANCEL_REASONS.map((reason) => (
                        <label key={reason} className="flex items-center gap-2.5 cursor-pointer group">
                          <span className={`w-4 h-4 shrink-0 rounded-full border flex items-center justify-center transition-colors ${cancelReason === reason ? 'border-ink bg-ink' : 'border-ink/[12.5%] group-hover:border-ink/40'}`}>
                            {cancelReason === reason && <span className="w-1.5 h-1.5 rounded-full bg-white" />}
                          </span>
                          <input
                            type="radio"
                            name="cancel_reason"
                            value={reason}
                            checked={cancelReason === reason}
                            onChange={() => setCancelReason(reason)}
                            className="sr-only"
                          />
                          <span className="text-xs text-ink/70 group-hover:text-ink transition-colors">{reason}</span>
                        </label>
                      ))}
                    </div>

                    {actionError && <p className="text-xs text-red-500 mb-3">{actionError}</p>}

                    <div className="flex gap-2">
                      <button
                        onClick={handleCancel}
                        disabled={actionLoading || !cancelReason}
                        className="flex-1 py-2.5 rounded-xl text-xs tracking-[0.06em] uppercase font-semibold border border-red-200 text-red-600 hover:bg-red-50 transition-colors disabled:opacity-40"
                      >
                        {actionLoading ? 'Cancelling…' : 'Yes, cancel'}
                      </button>
                      <button
                        onClick={() => { setConfirmAction(null); setCancelReason(''); }}
                        disabled={actionLoading}
                        className="btn-cta flex-1 py-2.5 rounded-xl text-white text-xs tracking-[0.06em] uppercase font-semibold disabled:opacity-60"
                      >
                        Keep subscription
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {/* Help nudge */}
              <div className="rounded-2xl border border-ink/[12.5%] bg-ink/[3.9%] px-6 py-5 flex items-start gap-3">
                <span className="shrink-0 mt-0.5 w-8 h-8 rounded-lg bg-white border border-ink/[12.5%] flex items-center justify-center text-ink/50">
                  <svg width="15" height="15" viewBox="0 0 16 16" fill="none">
                    <circle cx="8" cy="8" r="6" stroke="currentColor" strokeWidth="1.2"/>
                    <path d="M8 7v5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
                    <circle cx="8" cy="5" r="0.6" fill="currentColor"/>
                  </svg>
                </span>
                <div>
                  <p className="text-xs font-semibold text-ink mb-0.5">Need help?</p>
                  <p className="text-xs text-[var(--text-muted)] leading-relaxed">
                    Contact us at{' '}
                    <a href="mailto:hello@flowhealth.com" onClick={() => trackEvent('subscription_contact_email')} className="text-ink underline hover:no-underline">
                      hello@flowhealth.com
                    </a>{' '}
                    and we&apos;ll take care of it within 24 hours.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* ── Paused confirmation ── */}
          {step === 'paused' && sub && (
            <ConfirmationCard
              icon={
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                  <circle cx="12" cy="12" r="9" stroke="var(--color-ink)" strokeWidth="1.4"/>
                  <path d="M9 8v8M15 8v8" stroke="var(--color-ink)" strokeWidth="1.6" strokeLinecap="round"/>
                </svg>
              }
              title="Subscription paused"
              description="No further charges or shipments will occur until you resume. You can reactivate at any time."
            >
              <button
                onClick={handleResume}
                disabled={actionLoading}
                className="btn-cta w-full py-3.5 rounded-xl text-white text-xs tracking-[0.08em] uppercase font-semibold disabled:opacity-60"
              >
                {actionLoading ? 'Resuming…' : 'Resume subscription'}
              </button>
              {actionError && <p className="text-xs text-red-500 mt-3">{actionError}</p>}
            </ConfirmationCard>
          )}

          {/* ── Cancelled confirmation ── */}
          {step === 'cancelled' && (
            <ConfirmationCard
              icon={
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                  <circle cx="12" cy="12" r="9" stroke="var(--color-ink)" strokeWidth="1.4"/>
                  <path d="M8 8l8 8M16 8l-8 8" stroke="var(--color-ink)" strokeWidth="1.6" strokeLinecap="round"/>
                </svg>
              }
              title="Subscription cancelled"
              description="Your subscription has been cancelled. No further payments will be taken. We're sorry to see you go — feel free to reorder whenever you're ready."
            >
              <a
                href="/products/rooibos-hibiscus-pomegranate"
                onClick={() => { trackEvent('subscription_cancelled_reorder'); ga4SubscriptionEvent('reorder'); }}
                className="btn-cta w-full py-3.5 rounded-xl text-white text-xs tracking-[0.08em] uppercase font-semibold text-center block"
              >
                Reorder Flow
              </a>
            </ConfirmationCard>
          )}

        </div>
      </div>
    </main>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between gap-4">
      <span className="text-xs text-[var(--text-muted)] font-medium">{label}</span>
      <span className="text-xs text-ink font-semibold text-right">{value}</span>
    </div>
  );
}

function ConfirmationCard({
  icon, title, description, children,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
  children: React.ReactNode;
}) {
  return (
    <div className="bg-white rounded-2xl border border-ink/[12.5%] shadow-[var(--shadow-card)] p-7 md:p-9 text-center">
      <div className="w-12 h-12 rounded-full bg-ink/[3.9%] flex items-center justify-center mx-auto mb-4">
        {icon}
      </div>
      <p className="text-base font-semibold text-ink mb-2">{title}</p>
      <p className="text-sm text-[var(--text-secondary)] leading-relaxed mb-6 max-w-xs mx-auto">{description}</p>
      {children}
    </div>
  );
}