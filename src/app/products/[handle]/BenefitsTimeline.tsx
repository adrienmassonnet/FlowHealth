'use client';

import { useState } from 'react';
import type { ResultsTimelineStep } from '@/lib/contentful';

export default function BenefitsTimeline({ steps }: { steps: ResultsTimelineStep[] }) {
  const mapped = steps.map((s) => {
    const bullets = s.bullets.split('\n').map((b) => b.trim()).filter(Boolean);
    return { week: s.period, title: s.title, summary: bullets[0] ?? '', detail: bullets.slice(1).join(' ') };
  });
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="max-w-[1200px] mx-auto px-6 py-20">
      <div className="mb-10 space-y-1.5">
        <p className="text-xs tracking-[0.16em] uppercase text-[hsla(var(--color-secondary)/0.5)] font-medium">Timeline</p>
        <h2 className="text-3xl md:text-4xl font-semibold tracking-[-0.02em] leading-tight">
          What and how will I feel?
        </h2>
      </div>

      <div className="bg-white rounded-2xl px-6 md:px-10 py-10 shadow-[0_2px_16px_rgba(30,24,84,0.07)] border border-[#1E1854]/[0.06]">
        <div className="flex flex-col">
          {mapped.map((step, i) => (
            <div key={step.week} className={`relative${i < mapped.length - 1 ? ' pb-8' : ''}`}>
              {/* Connecting line — same as homepage */}
              {i < mapped.length - 1 && (
                <div className="absolute left-[16px] top-[14px] bottom-0 w-px bg-[#1E1854]/12" />
              )}
              {/* Pill row */}
              <div className="flex items-center justify-between gap-4">
                <span className="relative shrink-0 inline-flex items-center gap-1.5 text-xs font-medium tracking-[0.06em] uppercase bg-gradient-to-r from-[#3B38B8] to-[#1E1854] text-white px-3 py-1 rounded-full shadow-[0_2px_8px_rgba(59,56,184,0.35)]">
                  <span className="w-1.5 h-1.5 rounded-full bg-white/60 shrink-0" />
                  {step.week}
                </span>
                <button
                  onClick={() => setOpenIndex(openIndex === i ? null : i)}
                  className={`shrink-0 text-[#1E1854]/30 transition-transform duration-300 ${openIndex === i ? 'rotate-180' : ''}`}
                >
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                    <path d="M3 5L7 9L11 5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </button>
              </div>
              {/* Title */}
              <button
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                className="w-full text-left mt-2 pl-6"
              >
                <p className="text-base font-semibold tracking-[-0.01em] text-[#1E1854]">{step.title}</p>
              </button>
              {/* Content — indented past the connecting line */}
              <div className="pl-6 pt-2">
                <p className="text-sm font-medium text-[hsla(var(--color-secondary)/0.65)] leading-relaxed">{step.summary}</p>
                <div
                  className="grid"
                  style={{
                    gridTemplateRows: openIndex === i ? '1fr' : '0fr',
                    transition: 'grid-template-rows 420ms cubic-bezier(0.25, 0.1, 0.1, 1)',
                  }}
                >
                  <div className="overflow-hidden min-h-0">
                    <p
                      className="text-sm text-[hsla(var(--color-secondary)/0.45)] leading-[1.75] pt-1.5 pr-6"
                      style={{
                        opacity: openIndex === i ? 1 : 0,
                        transition: 'opacity 300ms ease-out',
                        transitionDelay: openIndex === i ? '100ms' : '0ms',
                      }}
                    >
                      {step.detail}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Consistency callout */}
      <div className="mt-12 max-w-2xl mx-auto w-full rounded-2xl bg-white border border-[#3B38B8]/20 shadow-[0_0_0_1px_rgba(59,56,184,0.08),0_8px_48px_rgba(59,56,184,0.18)] px-8 py-10 flex flex-col items-center text-center gap-5" style={{ boxShadow: '0 0 0 1px rgba(59,56,184,0.08), 0 8px 48px rgba(59,56,184,0.18), 0 0 80px rgba(59,56,184,0.10)' }}>
        {/* Logomark with gradient circle */}
        <div className="relative w-14 h-14 flex items-center justify-center">
          <div className="absolute inset-0 rounded-full" style={{ background: 'linear-gradient(135deg, #3B38B8 0%, #1E1854 100%)' }} />
          <div className="relative w-7 h-7">
            <svg viewBox="0 0 320 320" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M320 138.76V160H160V0H181.24C190.26 72.36 247.64 129.74 320 138.76Z" fill="white"/>
              <path d="M160 160V320H138.76C129.74 247.64 72.36 190.26 0 181.24V160H160Z" fill="white"/>
            </svg>
          </div>
        </div>
        <div className="space-y-2.5 max-w-lg">
          <p className="text-sm font-semibold tracking-[0.16em] uppercase text-[hsla(var(--color-accent)/1)]">
            Consistency is key
          </p>
          <p className="text-sm text-[hsla(var(--color-secondary)/0.75)] leading-[1.75]">
            Fast-acting compounds deliver noticeable clarity and calm from day one.
          </p>
          <p className="text-sm text-[hsla(var(--color-secondary)/0.75)] leading-[1.75]">
            Deeper benefits — improved memory, cortisol regulation, and lasting neuroplastic changes — build progressively over 4–8 weeks of daily use.
          </p>
        </div>
      </div>
    </section>
  );
}
