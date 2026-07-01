'use client';

import { useState, useEffect, useCallback } from 'react';
import { trackEvent } from '@/lib/clarity';
import { ga4SignUp } from '@/lib/ga4';

const STORAGE_KEY = 'flow_exit_intent_dismissed';

export default function ExitIntentModal() {
  const [open, setOpen] = useState(false);
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const dismiss = useCallback(() => {
    setOpen(false);
    try { sessionStorage.setItem(STORAGE_KEY, '1'); } catch {}
  }, []);

  const show = useCallback(() => {
    try { if (sessionStorage.getItem(STORAGE_KEY)) return; } catch {}
    setOpen(true);
    trackEvent('exit_intent_shown');
  }, []);

  useEffect(() => {
    // Desktop: mouse leaves viewport through the top
    const handleMouseLeave = (e: MouseEvent) => {
      if (e.clientY <= 0) show();
    };

    // Mobile: scroll past 60% of page height
    let scrollFired = false;
    const handleScroll = () => {
      if (scrollFired) return;
      const scrolled = window.scrollY + window.innerHeight;
      const total = document.documentElement.scrollHeight;
      if (scrolled / total >= 0.6) {
        scrollFired = true;
        show();
      }
    };

    document.addEventListener('mouseleave', handleMouseLeave);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      document.removeEventListener('mouseleave', handleMouseLeave);
      window.removeEventListener('scroll', handleScroll);
    };
  }, [show]);

  useEffect(() => {
    if (!open) return;
    document.body.style.overflow = 'hidden';
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') dismiss(); };
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', onKey);
    };
  }, [open, dismiss]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email) return;
    setStatus('loading');
    trackEvent('exit_intent_email_submit');
    try {
      const res = await fetch('/api/prelaunch', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, notifyPromos: true }),
      });
      if (!res.ok) throw new Error();
      setStatus('success');
      trackEvent('exit_intent_email_success');
      ga4SignUp('exit_intent');
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
      aria-label="Special offer"
    >
      <div className="absolute inset-0 bg-[#1E1854]/60 backdrop-blur-sm" onClick={dismiss} />

      <div className="relative w-full sm:max-w-md bg-white rounded-t-3xl sm:rounded-3xl shadow-2xl overflow-hidden">

        {/* Close */}
        <button
          onClick={dismiss}
          aria-label="Close"
          className="absolute top-4 right-4 z-10 w-8 h-8 flex items-center justify-center rounded-full bg-white/70 backdrop-blur-sm text-[#1E1854]/50 hover:text-[#1E1854] hover:bg-white transition-colors duration-200"
        >
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path d="M11 3L3 11M3 3l8 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
          </svg>
        </button>

        <div className="px-8 pt-8 pb-8" style={{ paddingBottom: 'max(2rem, env(safe-area-inset-bottom))' }}>
          {status === 'success' ? (
            <div className="text-center py-4 space-y-4">
              <div className="w-12 h-12 rounded-full bg-[#1E1854]/8 flex items-center justify-center mx-auto">
                <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
                  <path d="M4 11l5 5 9-9" stroke="#1E1854" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <h2 className="text-xl font-semibold text-[#1E1854] tracking-[-0.02em]">You're in.</h2>
              <p className="text-sm text-[#1E1854]/65 leading-relaxed">
                Check your inbox — your 10% discount code is on its way.
              </p>
              <button
                onClick={dismiss}
                className="btn-cta w-full text-white font-semibold text-sm tracking-[0.06em] uppercase py-3.5 rounded-full"
              >
                Close
              </button>
            </div>
          ) : (
            <div className="space-y-5">
              <div className="space-y-2">
                <p className="text-xs tracking-[0.16em] uppercase font-semibold bg-gradient-to-r from-[#3B38B8] to-[#1E1854] bg-clip-text text-transparent">
                  Before you go
                </p>
                <h2 className="text-2xl font-semibold text-[#1E1854] tracking-[-0.02em] leading-tight">
                  10% off your first box
                </h2>
                <p className="text-sm text-[#1E1854]/60 leading-relaxed">
                  Drop your email and we'll send you a discount code — plus the science behind why Flow works.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-3">
                <input
                  type="email"
                  required
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder="Your email address"
                  className="w-full px-4 py-3.5 rounded-xl border border-[#1E1854]/15 bg-[#1E1854]/3 text-sm text-[#1E1854] placeholder:text-[#1E1854]/35 focus:outline-none focus:border-[#1E1854]/40 transition-colors duration-200"
                />
                {status === 'error' && (
                  <p className="text-xs text-red-500">Something went wrong — please try again.</p>
                )}
                <button
                  type="submit"
                  disabled={status === 'loading'}
                  className="btn-cta w-full text-white font-semibold text-sm tracking-[0.06em] uppercase py-3.5 rounded-full disabled:opacity-40 transition-all duration-300"
                >
                  {status === 'loading' ? 'Saving…' : 'Send my 10% code'}
                </button>
              </form>

              <p className="text-xs text-center text-[#1E1854]/30">No spam. Unsubscribe anytime.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}