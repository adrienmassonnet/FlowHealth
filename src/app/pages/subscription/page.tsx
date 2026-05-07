'use client';

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { trackEvent } from '@/lib/clarity';

type Step = 'lookup' | 'manage' | 'paused' | 'cancelled';

interface Subscription {
  id: number;
  status: 'active' | 'paused' | 'cancelled';
  product_title: string;
  order_interval_frequency: number;
  order_interval_unit: string;
  next_charge_scheduled_at: string;
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
  const [loading, setLoading] = useState(false);
  const [actionLoading, setActionLoading] = useState(false);
  const [error, setError] = useState('');
  const [actionError, setActionError] = useState('');
  const [sub, setSub] = useState<Subscription | null>(null);
  const [confirmAction, setConfirmAction] = useState<'cancel' | 'pause' | null>(null);
  const [cancelReason, setCancelReason] = useState('');

  async function lookupEmail(emailValue: string) {
    setLoading(true);
    setError('');
    try {
      const data = await apiPost('/api/subscription/lookup', { email: emailValue });
      setSub(data.subscription);
      setStep('manage');
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Something went wrong.');
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    const emailParam = searchParams.get('email');
    if (!emailParam) return;
    setEmail(emailParam);
    trackEvent('subscription_email_link_open');
    lookupEmail(emailParam);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams]);

  async function handleLookup(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    trackEvent('subscription_lookup_submit');
    await lookupEmail(email);
  }

  async function handlePause() {
    if (!sub) return;
    setActionLoading(true);
    setActionError('');
    trackEvent('subscription_pause_confirm');
    try {
      const data = await apiPost('/api/subscription/pause', { subscriptionId: sub.id, email });
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
    try {
      const data = await apiPost('/api/subscription/cancel', { subscriptionId: sub.id, email, reason: cancelReason });
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
    try {
      const data = await apiPost('/api/subscription/resume', { subscriptionId: sub.id, email });
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
      <div className="border-b border-[var(--color-border)]">
        <div className="max-w-[1200px] mx-auto px-6 pt-6 pb-10 md:py-14">
          <p className="text-xs tracking-[0.16em] uppercase font-semibold bg-gradient-to-r from-[#3B38B8] to-[#1E1854] bg-clip-text text-transparent mb-3">
            My account
          </p>
          <h1 className="text-3xl md:text-5xl font-semibold tracking-[-0.02em] leading-tight text-[#1E1854] mb-3">
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
            <div className="bg-white rounded-2xl border border-[var(--color-border)] shadow-[var(--shadow-card)] p-7 md:p-9">
              <div className="w-10 h-10 rounded-xl bg-[#1E18540A] border border-[var(--color-border)] flex items-center justify-center mb-5">
                <svg width="18" height="18" viewBox="0 0 20 20" fill="none">
                  <rect x="3" y="8" width="14" height="9" rx="2" stroke="#1E1854" strokeWidth="1.3"/>
                  <path d="M7 8V6a3 3 0 016 0v2" stroke="#1E1854" strokeWidth="1.3" strokeLinecap="round"/>
                </svg>
              </div>
              <p className="text-xs tracking-[0.14em] uppercase text-[var(--text-muted)] font-medium mb-1">Access your subscription</p>
              <h2 className="text-xl font-semibold text-[#1E1854] tracking-[-0.01em] mb-1">Enter your email</h2>
              <p className="text-xs text-[var(--text-muted)] mb-6">
                Use the email address you placed your order with.
              </p>

              <form onSubmit={handleLookup} className="space-y-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-medium text-[#1E1854]/55 tracking-[0.04em]">Email address</label>
                  <div className="relative">
                    <svg width="14" height="14" viewBox="0 0 16 16" fill="none" className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#1E1854]/30">
                      <rect x="2" y="3.5" width="12" height="9" rx="1.5" stroke="currentColor" strokeWidth="1.2"/>
                      <path d="M2 6l6 4 6-4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
                    </svg>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => { setEmail(e.target.value); setError(''); }}
                      placeholder="ada@example.com"
                      className="w-full pl-9 pr-3.5 py-2.5 text-sm rounded-xl border border-[var(--color-border)] bg-[#1E18540A] text-[#1E1854] placeholder:text-[#1E1854]/25 focus:outline-none focus:border-[#1E1854]/40 focus:bg-white transition-colors"
                    />
                  </div>
                  {error && <p className="text-xs text-red-500 mt-1">{error}</p>}
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="btn-cta w-full py-3.5 rounded-xl text-white text-xs tracking-[0.08em] uppercase font-semibold disabled:opacity-60 transition-opacity"
                >
                  {loading ? 'Looking up…' : 'Access my subscription'}
                </button>
              </form>
            </div>
          )}

          {/* ── Step 2: Manage ── */}
          {step === 'manage' && sub && (
            <div className="space-y-4">

              <div className="bg-white rounded-2xl border border-[var(--color-border)] shadow-[var(--shadow-card)] p-7 md:p-9">
                <div className="flex items-start justify-between gap-3 mb-6">
                  <div>
                    <p className="text-xs text-[var(--text-muted)] tracking-[0.04em] font-medium mb-0.5">#{sub.id}</p>
                    <h2 className="text-lg font-semibold text-[#1E1854] tracking-[-0.01em]">{sub.product_title}</h2>
                  </div>
                  <span className={`shrink-0 text-[10px] font-semibold tracking-[0.08em] uppercase px-2.5 py-1 rounded-full border ${STATUS_BADGE[sub.status].classes}`}>
                    {STATUS_BADGE[sub.status].label}
                  </span>
                </div>

                <div className="space-y-3 mb-6">
                  <Row label="Frequency"      value={`Every ${sub.order_interval_frequency} ${sub.order_interval_unit}`} />
                  <Row label="Next billing"   value={formatDate(sub.next_charge_scheduled_at)} />
                  <Row label="Next shipment"  value={formatDate(sub.next_charge_scheduled_at)} />
                  <Row label="Price"          value={formatPrice(sub.price, sub.currency)} />
                  <Row label="Quantity"       value={`${sub.quantity} unit${sub.quantity > 1 ? 's' : ''}`} />
                </div>

                {actionError && (
                  <p className="text-xs text-red-500 mb-3">{actionError}</p>
                )}

                {/* Paused state — show resume */}
                {sub.status === 'paused' && !confirmAction && (
                  <div className="pt-2 border-t border-[var(--color-border)]">
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
                  <div className="flex flex-col sm:flex-row gap-2 pt-2 border-t border-[var(--color-border)]">
                    <button
                      onClick={() => { trackEvent('subscription_pause_click'); setConfirmAction('pause'); setActionError(''); }}
                      className="flex-1 py-2.5 rounded-xl text-xs tracking-[0.06em] uppercase font-semibold border border-[var(--color-border)] text-[#1E1854]/70 hover:border-[#1E1854]/40 hover:text-[#1E1854] transition-colors"
                    >
                      Pause subscription
                    </button>
                    <button
                      onClick={() => { trackEvent('subscription_cancel_click'); setConfirmAction('cancel'); setActionError(''); }}
                      className="flex-1 py-2.5 rounded-xl text-xs tracking-[0.06em] uppercase font-semibold border border-[var(--color-border)] text-red-500/70 hover:border-red-200 hover:text-red-600 transition-colors"
                    >
                      Cancel subscription
                    </button>
                  </div>
                )}

                {/* Confirm: pause */}
                {confirmAction === 'pause' && (
                  <div className="pt-4 border-t border-[var(--color-border)]">
                    <p className="text-sm font-semibold text-[#1E1854] mb-1">Pause your subscription?</p>
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
                        className="flex-1 py-2.5 rounded-xl text-xs tracking-[0.06em] uppercase font-semibold border border-[var(--color-border)] text-[#1E1854]/60 hover:text-[#1E1854] transition-colors disabled:opacity-40"
                      >
                        Keep active
                      </button>
                    </div>
                  </div>
                )}

                {/* Confirm: cancel */}
                {confirmAction === 'cancel' && (
                  <div className="pt-4 border-t border-[var(--color-border)]">
                    <p className="text-sm font-semibold text-[#1E1854] mb-1">Cancel your subscription?</p>
                    <p className="text-xs text-[var(--text-muted)] mb-4 leading-relaxed">
                      All future charges and shipments will stop. Please tell us why — it helps us improve.
                    </p>

                    <div className="space-y-2 mb-4">
                      {CANCEL_REASONS.map((reason) => (
                        <label key={reason} className="flex items-center gap-2.5 cursor-pointer group">
                          <span className={`w-4 h-4 shrink-0 rounded-full border flex items-center justify-center transition-colors ${cancelReason === reason ? 'border-[#1E1854] bg-[#1E1854]' : 'border-[var(--color-border)] group-hover:border-[#1E1854]/40'}`}>
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
                          <span className="text-xs text-[#1E1854]/70 group-hover:text-[#1E1854] transition-colors">{reason}</span>
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
              <div className="rounded-2xl border border-[var(--color-border)] bg-[#1E18540A] px-6 py-5 flex items-start gap-3">
                <span className="shrink-0 mt-0.5 w-8 h-8 rounded-lg bg-white border border-[var(--color-border)] flex items-center justify-center text-[#1E1854]/50">
                  <svg width="15" height="15" viewBox="0 0 16 16" fill="none">
                    <circle cx="8" cy="8" r="6" stroke="currentColor" strokeWidth="1.2"/>
                    <path d="M8 7v5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
                    <circle cx="8" cy="5" r="0.6" fill="currentColor"/>
                  </svg>
                </span>
                <div>
                  <p className="text-xs font-semibold text-[#1E1854] mb-0.5">Need help?</p>
                  <p className="text-xs text-[var(--text-muted)] leading-relaxed">
                    Contact us at{' '}
                    <a href="mailto:hello@flowhealth.com" onClick={() => trackEvent('subscription_contact_email')} className="text-[#1E1854] underline hover:no-underline">
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
                  <circle cx="12" cy="12" r="9" stroke="#1E1854" strokeWidth="1.4"/>
                  <path d="M9 8v8M15 8v8" stroke="#1E1854" strokeWidth="1.6" strokeLinecap="round"/>
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
                  <circle cx="12" cy="12" r="9" stroke="#1E1854" strokeWidth="1.4"/>
                  <path d="M8 8l8 8M16 8l-8 8" stroke="#1E1854" strokeWidth="1.6" strokeLinecap="round"/>
                </svg>
              }
              title="Subscription cancelled"
              description="Your subscription has been cancelled. No further payments will be taken. We're sorry to see you go — feel free to reorder whenever you're ready."
            >
              <a
                href="/products/flow"
                onClick={() => trackEvent('subscription_cancelled_reorder')}
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
      <span className="text-xs text-[#1E1854] font-semibold text-right">{value}</span>
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
    <div className="bg-white rounded-2xl border border-[var(--color-border)] shadow-[var(--shadow-card)] p-7 md:p-9 text-center">
      <div className="w-12 h-12 rounded-full bg-[#1E18540A] flex items-center justify-center mx-auto mb-4">
        {icon}
      </div>
      <p className="text-base font-semibold text-[#1E1854] mb-2">{title}</p>
      <p className="text-sm text-[var(--text-secondary)] leading-relaxed mb-6 max-w-xs mx-auto">{description}</p>
      {children}
    </div>
  );
}