'use client';

import { useState } from 'react';
import type { ResultsTimelineStep } from '@/lib/content';
import { trackEvent } from '@/lib/clarity';
import { ga4SelectContent } from '@/lib/ga4';

export default function BenefitsTimeline({ steps }: { steps: ResultsTimelineStep[] }) {
  const mapped = steps.map((s) => {
    const bullets = s.bullets.split('\n').map((b) => b.trim()).filter(Boolean);
    return { week: s.period, title: s.title, summary: bullets[0] ?? '', detail: bullets.slice(1).join(' ') };
  });
  const [mobileOpen, setMobileOpen] = useState<number | null>(null);
  const [desktopExpanded, setDesktopExpanded] = useState(false);

  const cols = mapped.length;

  return (
    <section className="bg-white pt-4 pb-20 md:pt-8">
      <div className="flow-container">
        <div className="mb-6 space-y-2">
          <h2 className="flow-h2">
            How I Will Feel
          </h2>
        </div>

        {/* Mobile: per-step accordion */}
        <div className="md:hidden mb-6 rounded-2xl overflow-hidden border border-ink/[0.06] shadow-[0_2px_16px_rgba(30,24,84,0.07)] divide-y divide-ink/[0.06]">
          {mapped.map((step, i) => {
            const isOpen = mobileOpen === i;
            return (
              <div key={step.week} className="bg-white">
                <button
                  onClick={() => {
                    setMobileOpen(isOpen ? null : i);
                    if (!isOpen) { trackEvent('product_timeline_stage_open'); ga4SelectContent('timeline_stage', step.week); }
                  }}
                  className="w-full flex items-center justify-between px-5 py-4 text-left gap-3"
                >
                  <div className="flex flex-col min-w-0">
                    <p className="text-micro font-semibold tracking-[0.14em] uppercase bg-gradient-to-r from-brand to-ink bg-clip-text text-transparent mb-0.5">{step.week}</p>
                    <p className="text-sm font-semibold tracking-[-0.01em] text-ink leading-snug">{step.title}</p>
                  </div>
                  <svg
                    width="12" height="8" viewBox="0 0 12 8" fill="none"
                    className={`shrink-0 text-ink/30 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
                  >
                    <path d="M1 1.5l5 5 5-5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </button>
                <div
                  className="grid transition-all duration-300"
                  style={{ gridTemplateRows: isOpen ? '1fr' : '0fr' }}
                >
                  <div className="overflow-hidden min-h-0">
                    <div className="px-5 pb-4">
                      <p className="text-sm font-medium text-[rgba(30,24,84,0.65)] leading-[1.55]">{step.summary}</p>
                      {step.detail && (
                        <p className="text-sm text-[rgba(30,24,84,0.45)] leading-[1.55] pt-1.5">{step.detail}</p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Desktop: horizontal grid card with single expand toggle */}
        <div className="hidden md:block mb-6 bg-white rounded-2xl px-6 pt-6 pb-0 shadow-[0_2px_16px_rgba(30,24,84,0.07)] border border-ink/[0.06]">
          <div>
            <div
              className="grid gap-6"
              style={{ gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))` }}
            >
              {mapped.map((step, i) => (
                <div key={step.week} className="flex flex-col gap-2">
                  <div className="relative">
                    {i < mapped.length - 1 && (
                      <div className="absolute top-1/2 left-0 w-[calc(100%+1.5rem)] h-px bg-ink/15 -translate-y-1/2 z-0" />
                    )}
                    <span className="relative z-10 inline-flex items-center gap-1.5 text-xs font-medium tracking-[0.06em] uppercase bg-gradient-to-r from-brand to-ink text-white px-3 py-1 rounded-full shadow-[0_2px_8px_rgba(59,56,184,0.35)]">
                      <span className="w-1.5 h-1.5 rounded-full bg-white/60 shrink-0" />
                      {step.week}
                    </span>
                  </div>
                  <p className="text-sm font-semibold tracking-[-0.01em] text-ink leading-snug">{step.title}</p>
                  <div
                    className="grid"
                    style={{
                      gridTemplateRows: desktopExpanded ? '1fr' : '0fr',
                      transition: 'grid-template-rows 420ms cubic-bezier(0.25, 0.1, 0.1, 1)',
                    }}
                  >
                    <div className="overflow-hidden min-h-0">
                      <div style={{ opacity: desktopExpanded ? 1 : 0, transition: 'opacity 300ms ease-out', transitionDelay: desktopExpanded ? '100ms' : '0ms' }}>
                        <p className="text-sm font-medium text-[rgba(30,24,84,0.65)] leading-[1.55]">{step.summary}</p>
                        {step.detail && (
                          <p className="text-sm text-[rgba(30,24,84,0.45)] leading-[1.55] pt-1.5">{step.detail}</p>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="flex justify-center">
            <button
              onClick={() => {
                setDesktopExpanded((e) => !e);
                if (!desktopExpanded) trackEvent('product_timeline_stage_open');
              }}
              className="group py-2 px-4 flex items-end transition-colors duration-200"
            >
              <svg
                width="12" height="8" viewBox="0 0 12 8" fill="none"
                className={`text-ink/30 transition-transform duration-300 group-hover:text-ink/60 ${desktopExpanded ? 'rotate-180' : ''}`}
              >
                <path d="M1 1.5l5 5 5-5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          </div>
        </div>

        {/* Consistency card — centered, reduced width */}
        <div className="flex justify-center">
          <div
            className="w-full max-w-xl rounded-2xl px-7 py-8 flex flex-col gap-4 text-center"
            style={{ background: 'linear-gradient(155deg, var(--color-brand) 0%, var(--color-ink) 100%)', boxShadow: '0 4px 32px rgba(30,24,84,0.30), 0 0 80px rgba(59,56,184,0.20)' }}
          >
            <p className="text-xs font-semibold tracking-[0.18em] uppercase text-white/50">
              Consistency is key
            </p>
            <h3 className="text-2xl font-semibold tracking-[-0.02em] leading-snug text-white">
              The longer you take it, the more it compounds.
            </h3>
            <p className="text-sm text-white/75 leading-[1.55]">
              You&apos;ll notice clarity and calm <strong className="text-white font-semibold">from day one</strong>; deeper benefits compound with <strong className="text-white font-semibold">4–8 weeks</strong> of daily use.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
