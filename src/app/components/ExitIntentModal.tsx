'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { trackEvent } from '@/lib/clarity';
import { ga4SignUp } from '@/lib/ga4';

const VISITED_KEY = 'flow_visited';
const DISMISSED_KEY = 'flow_exit_intent_dismissed';

function isEligible(): boolean {
  try {
    if (localStorage.getItem(DISMISSED_KEY)) return false;
    // visits is already incremented by recordVisit on mount,
    // so >= 2 means this is at least the second visit
    const visits = parseInt(localStorage.getItem(VISITED_KEY) ?? '0', 10);
    return visits >= 2;
  } catch { return false; }
}

function recordVisit() {
  try {
    const visits = parseInt(localStorage.getItem(VISITED_KEY) ?? '0', 10);
    localStorage.setItem(VISITED_KEY, String(visits + 1));
  } catch {}
}

function markDismissed() {
  try { localStorage.setItem(DISMISSED_KEY, '1'); } catch {}
}

export default function ExitIntentModal() {
  const [open, setOpen] = useState(false);
  const [visible, setVisible] = useState(false);
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Record this visit on mount
  useEffect(() => { recordVisit(); }, []);

  const dismiss = useCallback(() => {
    setVisible(false);
    setTimeout(() => setOpen(false), 500);
    markDismissed();
  }, []);

  const show = useCallback(() => {
    if (!isEligible()) return;
    setOpen(true);
    // Slight delay so the animation plays after mount
    requestAnimationFrame(() => requestAnimationFrame(() => setVisible(true)));
    trackEvent('exit_intent_shown');
  }, []);

  useEffect(() => {
    // Desktop: mouse leaves viewport through the top
    const handleMouseLeave = (e: MouseEvent) => {
      if (e.clientY <= 0) show();
    };

    // Scroll: trigger at 80% depth
    let scrollFired = false;
    const handleScroll = () => {
      if (scrollFired) return;
      const scrolled = window.scrollY + window.innerHeight;
      const total = document.documentElement.scrollHeight;
      if (scrolled / total >= 0.8) {
        scrollFired = true;
        // Small delay after reaching scroll depth — feels like a reward, not an interruption
        timerRef.current = setTimeout(show, 800);
      }
    };

    document.addEventListener('mouseleave', handleMouseLeave);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      document.removeEventListener('mouseleave', handleMouseLeave);
      window.removeEventListener('scroll', handleScroll);
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [show]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') dismiss(); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open, dismiss]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email) return;
    setStatus('loading');
    trackEvent('exit_intent_email_submit');
    try {
      const res = await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
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
    <>
      {/* Soft backdrop — dimmer and slower than the standard modal */}
      <div
        className="fixed inset-0 z-50"
        style={{
          background: 'rgba(30,24,84,0.45)',
          backdropFilter: 'blur(6px)',
          opacity: visible ? 1 : 0,
          transition: 'opacity 600ms ease',
        }}
        onClick={dismiss}
      />

      {/* Panel — slides up from bottom center on desktop, full-width bottom sheet on mobile */}
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Welcome gift"
        className="fixed z-50 w-full sm:w-[420px] bottom-0 left-0 sm:left-1/2 sm:-translate-x-1/2 sm:bottom-8"
        style={{
          transform: visible ? 'translateY(0)' : 'translateY(calc(100% + 2rem))',
          opacity: visible ? 1 : 0,
          transition: 'transform 600ms cubic-bezier(0.22, 1, 0.36, 1), opacity 500ms ease',
        }}
      >
        <div className="relative bg-white sm:rounded-3xl rounded-t-3xl shadow-[0_24px_80px_rgba(30,24,84,0.22)] overflow-hidden">

          {/* Decorative gradient header band */}
          <div className="h-1.5 w-full bg-gradient-to-r from-[#3B38B8] via-[#6B5CE7] to-[#1E1854]" />

          {/* Close */}
          <button
            onClick={dismiss}
            aria-label="Close"
            className="absolute top-4 right-4 z-10 w-7 h-7 flex items-center justify-center rounded-full text-[#1E1854]/30 hover:text-[#1E1854]/70 hover:bg-[#1E1854]/6 transition-all duration-200"
          >
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
              <path d="M10 2L2 10M2 2l8 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
          </button>

          <div className="px-7 pt-6 pb-7" style={{ paddingBottom: 'max(1.75rem, env(safe-area-inset-bottom))' }}>
            {status === 'success' ? (
              <div className="text-center py-3 space-y-4">
                {/* Animated checkmark */}
                <div className="w-14 h-14 rounded-full bg-gradient-to-br from-[#3B38B8]/15 to-[#1E1854]/10 flex items-center justify-center mx-auto">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <path d="M4 12l6 6 10-10" stroke="#3B38B8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <div className="space-y-1.5">
                  <h2 className="text-xl font-semibold text-[#1E1854] tracking-[-0.02em]">Your code is on its way.</h2>
                  <p className="text-sm text-[#1E1854]/55 leading-relaxed">
                    Check your inbox — 10% off your first box, ready to use.
                  </p>
                </div>
                <button
                  onClick={dismiss}
                  className="btn-cta w-full text-white font-semibold text-sm tracking-[0.06em] uppercase py-3.5 rounded-full"
                >
                  Continue browsing
                </button>
              </div>
            ) : (
              <div className="space-y-5">
                {/* Gift icon + label */}
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-[#3B38B8]/12 to-[#1E1854]/8 flex items-center justify-center shrink-0">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#3B38B8" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M20 12v10H4V12"/>
                      <path d="M22 7H2v5h20V7z"/>
                      <path d="M12 22V7"/>
                      <path d="M12 7H7.5a2.5 2.5 0 0 1 0-5C11 2 12 7 12 7z"/>
                      <path d="M12 7h4.5a2.5 2.5 0 0 0 0-5C13 2 12 7 12 7z"/>
                    </svg>
                  </div>
                  <p className="text-xs tracking-[0.14em] uppercase font-semibold bg-gradient-to-r from-[#3B38B8] to-[#1E1854] bg-clip-text text-transparent">
                    A gift for reading this far
                  </p>
                </div>

                <div className="space-y-1.5">
                  <h2 className="text-2xl font-semibold text-[#1E1854] tracking-[-0.02em] leading-tight">
                    10% off your first box
                  </h2>
                  <p className="text-sm text-[#1E1854]/55 leading-relaxed">
                    You've done the research. Here's a little something to make the first step easier.
                  </p>
                </div>

                {/* Trust bullets */}
                <ul className="space-y-1.5">
                  {[
                    '16 clinically-dosed ingredients',
                    'No caffeine, no sugar, no fillers',
                    'Pause or cancel from month 2',
                  ].map((item) => (
                    <li key={item} className="flex items-center gap-2 text-xs text-[#1E1854]/60">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#3B38B8]/50 shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>

                <form onSubmit={handleSubmit} className="space-y-2.5">
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    placeholder="Your email address"
                    className="w-full px-4 py-3.5 rounded-xl border border-[#1E1854]/12 bg-[#1E1854]/3 text-sm text-[#1E1854] placeholder:text-[#1E1854]/30 focus:outline-none focus:border-[#3B38B8]/40 transition-colors duration-200"
                  />
                  {status === 'error' && (
                    <p className="text-xs text-red-500">Something went wrong — please try again.</p>
                  )}
                  <button
                    type="submit"
                    disabled={status === 'loading'}
                    className="btn-cta w-full text-white font-semibold text-sm tracking-[0.06em] uppercase py-3.5 rounded-full disabled:opacity-40 transition-all duration-300"
                  >
                    {status === 'loading' ? 'Saving…' : 'Claim my 10% discount'}
                  </button>
                </form>

                <p className="text-[11px] text-center text-[#1E1854]/25">No spam. Unsubscribe anytime.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}