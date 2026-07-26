'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { trackEvent } from '@/lib/clarity';
import { ga4SignUp } from '@/lib/ga4';
import { useSwipeToClose } from '@/lib/useSwipeToClose';

interface PreLaunchModalProps {
  open: boolean;
  onClose: () => void;
}

export default function PreLaunchModal({ open, onClose }: PreLaunchModalProps) {
  const [email, setEmail] = useState('');
  const [notifyPromos, setNotifyPromos] = useState(true);
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const { panelProps, handleProps } = useSwipeToClose(onClose);

  // Lock body scroll when open
  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  // Close on Escape
  useEffect(() => {
    if (!open) return;
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [open, onClose]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email) return;
    setStatus('loading');
    trackEvent('product_page_prelaunch_signup');
    try {
      const res = await fetch('/api/prelaunch', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, notifyPromos }),
      });
      if (!res.ok) throw new Error();
      setStatus('success');
      trackEvent('product_page_prelaunch_signup_success');
      ga4SignUp('pre_launch_modal');
    } catch {
      setStatus('error');
    }
  }

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center sm:p-4"
      role="dialog"
      aria-modal="true"
      aria-label="Pre-launch registration"
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-ink/60 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Panel */}
      <motion.div
        className="relative w-full sm:max-w-md bg-white rounded-t-3xl sm:rounded-3xl shadow-2xl overflow-hidden"
        {...panelProps}
      >
        <div
          {...handleProps}
          className="sm:hidden absolute top-0 left-0 right-0 z-10 pt-2.5 pb-1 flex items-center justify-center touch-none cursor-grab active:cursor-grabbing"
        >
          <span className="w-10 h-1.5 rounded-full bg-ink/15" />
        </div>

        {/* Close */}
        <button
          onClick={onClose}
          aria-label="Close"
          className="absolute top-4 right-4 z-10 w-8 h-8 flex items-center justify-center rounded-full bg-white/70 backdrop-blur-sm text-ink/50 hover:text-ink hover:bg-white transition-colors duration-200"
        >
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path d="M11 3L3 11M3 3l8 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
          </svg>
        </button>

        {/* Hero image */}
        <div className="relative w-full h-28 overflow-hidden">
          <Image
            src="/sunrise-consume.png"
            alt="Start your morning with Flow"
            fill
            className="object-cover object-center"
            sizes="448px"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-white/90" />
        </div>

        <div className="px-8 pt-4 pb-8" style={{ paddingBottom: 'max(2rem, env(safe-area-inset-bottom))' }}>
          {status === 'success' ? (
            <div className="text-center py-4">
              <div className="w-12 h-12 rounded-full bg-ink/8 flex items-center justify-center mx-auto mb-5">
                <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
                  <path d="M4 11l5 5 9-9" stroke="var(--color-ink)" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <h2 className="text-xl font-semibold text-ink tracking-[-0.02em] mb-2">You're on the list</h2>
              <p className="text-sm text-ink/65 leading-relaxed">
                We'll be in touch the moment Flow is ready: expect early access, the launch date, and a little something extra for those who believed in us first.
              </p>
              <button
                onClick={onClose}
                className="mt-6 btn-cta w-full text-white font-semibold text-sm tracking-[0.06em] uppercase py-3.5 rounded-full transition-all duration-300"
              >
                Close
              </button>
            </div>
          ) : (
            <>
              <h2 className="flow-h3 mb-2">
                Flow isn't available yet
              </h2>
              <p className="text-sm text-ink/65 leading-relaxed mb-6">
                Drop your email and we'll let you know the moment it launches, with early access and everything worth knowing.
              </p>

              <form onSubmit={handleSubmit} className="space-y-3">
                <input
                  type="email"
                  required
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder="Your email address"
                  className="w-full px-4 py-3.5 rounded-xl border border-ink/15 bg-ink/3 text-sm text-ink placeholder:text-ink/35 focus:outline-none focus:border-ink/40 transition-colors duration-200"
                />

                {/* Checkbox */}
                <label className="flex items-start gap-3 cursor-pointer group">
                  <span
                    onClick={() => setNotifyPromos(v => !v)}
                    className={`mt-0.5 shrink-0 w-4.5 h-4.5 rounded-md border-2 flex items-center justify-center transition-all duration-200 ${
                      notifyPromos
                        ? 'bg-ink border-ink'
                        : 'border-ink/25 group-hover:border-ink/50'
                    }`}
                  >
                    {notifyPromos && (
                      <svg width="9" height="7" viewBox="0 0 9 7" fill="none">
                        <path d="M1 3.5l2.5 2.5 5-5" stroke="white" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    )}
                  </span>
                  <span
                    onClick={() => setNotifyPromos(v => !v)}
                    className="text-xs text-ink/55 leading-relaxed select-none"
                  >
                    Keep me posted on promotions, new product releases, and other updates from Flow
                  </span>
                </label>

                {status === 'error' && (
                  <p className="text-xs text-red-500">Something went wrong, please try again.</p>
                )}
                <button
                  type="submit"
                  disabled={status === 'loading'}
                  className="btn-cta w-full text-white font-semibold text-sm tracking-[0.06em] uppercase py-3.5 rounded-full disabled:opacity-40 transition-all duration-300"
                >
                  {status === 'loading' ? 'Saving…' : 'Keep me informed'}
                </button>
              </form>

              <p className="mt-4 text-xs text-center text-ink/30 leading-relaxed">
                No spam. Unsubscribe anytime.
              </p>
            </>
          )}
        </div>
      </motion.div>
    </div>
  );
}
