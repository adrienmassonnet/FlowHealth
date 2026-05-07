'use client';

import { useState } from 'react';
import type { ResultsTimelineStep } from '@/lib/content';

export default function BenefitsTimeline({ steps }: { steps: ResultsTimelineStep[] }) {
  const mapped = steps.map((s) => {
    const bullets = s.bullets.split('\n').map((b) => b.trim()).filter(Boolean);
    return { week: s.period, title: s.title, summary: bullets[0] ?? '', detail: bullets.slice(1).join(' ') };
  });
  const [expanded, setExpanded] = useState(false);

  const cols = mapped.length;

  return (
    <section className="bg-white pt-4 pb-20 md:pt-8">
      <div className="max-w-[1200px] mx-auto px-6">
        <div className="mb-6 space-y-1.5">
          <h2 className="text-3xl font-semibold tracking-[-0.02em] leading-tight text-[#1E1854]">
            How I Will Feel
          </h2>
        </div>

        {/* Single card with horizontal timeline */}
        <div className="mb-6 bg-white rounded-2xl px-6 pt-6 pb-0 shadow-[0_2px_16px_rgba(30,24,84,0.07)] border border-[#1E1854]/[0.06]">
          <div>
            <div
              className="grid gap-6 [grid-template-columns:1fr] sm:[grid-template-columns:repeat(var(--tl-cols),minmax(0,1fr))]"
              style={{ '--tl-cols': cols } as React.CSSProperties}
            >
              {mapped.map((step, i) => (
                <div key={step.week} className="flex flex-col gap-2">

                  {/* Badge with connecting line */}
                  <div className="relative">
                    {i < mapped.length - 1 && (
                      <>
                        {/* Horizontal line on desktop */}
                        <div className="hidden sm:block absolute top-1/2 left-0 w-[calc(100%+1.5rem)] h-px bg-[#1E1854]/15 -translate-y-1/2 z-0" />
                      </>
                    )}
                    <span className="relative z-10 inline-flex items-center gap-1.5 text-xs font-medium tracking-[0.06em] uppercase bg-gradient-to-r from-[#3B38B8] to-[#1E1854] text-white px-3 py-1 rounded-full shadow-[0_2px_8px_rgba(59,56,184,0.35)]">
                      <span className="w-1.5 h-1.5 rounded-full bg-white/60 shrink-0" />
                      {step.week}
                    </span>
                  </div>

                  {/* Title */}
                  <p className="text-base font-semibold tracking-[-0.01em] text-[#1E1854] leading-snug">{step.title}</p>

                  {/* Expandable detail */}
                  <div
                    className="grid"
                    style={{
                      gridTemplateRows: expanded ? '1fr' : '0fr',
                      transition: 'grid-template-rows 420ms cubic-bezier(0.25, 0.1, 0.1, 1)',
                    }}
                  >
                    <div className="overflow-hidden min-h-0">
                      <div
                        style={{
                          opacity: expanded ? 1 : 0,
                          transition: 'opacity 300ms ease-out',
                          transitionDelay: expanded ? '100ms' : '0ms',
                        }}
                      >
                        <p className="text-sm font-medium text-[hsla(var(--color-secondary)/0.65)] leading-relaxed">{step.summary}</p>
                        {step.detail && (
                          <p className="text-sm text-[hsla(var(--color-secondary)/0.45)] leading-[1.75] pt-1.5">{step.detail}</p>
                        )}
                      </div>
                    </div>
                  </div>

                </div>
              ))}
            </div>
          </div>

          {/* Single toggle arrow */}
          <div className="flex justify-center">
            <button
              onClick={() => setExpanded((e) => !e)}
              className="group py-2 px-4 flex items-end transition-colors duration-200"
            >
              <svg
                width="12" height="8" viewBox="0 0 12 8" fill="none"
                className={`text-[#1E1854]/30 transition-transform duration-300 group-hover:text-[#1E1854]/60 ${expanded ? 'rotate-180' : ''}`}
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
            style={{ background: 'linear-gradient(155deg, #3B38B8 0%, #1E1854 100%)', boxShadow: '0 4px 32px rgba(30,24,84,0.30), 0 0 80px rgba(59,56,184,0.20)' }}
          >
            <p className="text-xs font-semibold tracking-[0.18em] uppercase text-white/50">
              Consistency is key
            </p>
            <h3 className="text-2xl font-semibold tracking-[-0.02em] leading-snug text-white">
              The longer you take it, the more it compounds.
            </h3>
            <p className="text-sm text-white/75 leading-[1.7]">
              You&apos;ll notice clarity and calm <strong className="text-white font-semibold">from day one</strong> — deeper benefits compound with <strong className="text-white font-semibold">4–8 weeks</strong> of daily use.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
