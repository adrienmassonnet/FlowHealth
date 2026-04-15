'use client';

import { useState } from 'react';
import type { ResultsTimelineStep } from '@/lib/content';

export default function BenefitsTimeline({ steps }: { steps: ResultsTimelineStep[] }) {
  const mapped = steps.map((s) => {
    const bullets = s.bullets.split('\n').map((b) => b.trim()).filter(Boolean);
    return { week: s.period, title: s.title, summary: bullets[0] ?? '', detail: bullets.slice(1).join(' ') };
  });
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="bg-gradient-to-b from-[#F4F3FF] to-white py-24">
      <div className="max-w-[1200px] mx-auto px-6">
        <div className="mb-12 space-y-1.5">
          <p className="text-xs tracking-[0.16em] uppercase font-semibold bg-gradient-to-r from-[#3B38B8] to-[#1E1854] bg-clip-text text-transparent">Timeline</p>
          <h2 className="text-3xl md:text-4xl font-semibold tracking-[-0.02em] leading-tight text-[#1E1854]">
            What and how will I feel?
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-[minmax(0,560px)_1fr] gap-6 items-start">
          {/* Timeline steps */}
          <div className="flex flex-col">
            {mapped.map((step, i) => (
              <div key={step.week} className={`relative${i < mapped.length - 1 ? ' mb-3' : ''}`}>
                {/* Connecting line — sits in the mb-3 gap, from card bottom to next card top */}
                {i < mapped.length - 1 && (
                  <div className="absolute left-6 top-full h-3 w-px bg-[#1E1854]/20 z-10" />
                )}
                <div className="bg-white rounded-2xl px-6 py-5 shadow-[0_2px_16px_rgba(30,24,84,0.07)] border border-[#1E1854]/[0.06]">
                  <div className="flex items-center justify-between gap-4 mb-2">
                    <span className="inline-flex items-center gap-1.5 text-xs font-medium tracking-[0.06em] uppercase bg-gradient-to-r from-[#3B38B8] to-[#1E1854] text-white px-3 py-1 rounded-full shadow-[0_2px_8px_rgba(59,56,184,0.35)]">
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
                  <button
                    onClick={() => setOpenIndex(openIndex === i ? null : i)}
                    className="w-full text-left"
                  >
                    <p className="text-base font-semibold tracking-[-0.01em] text-[#1E1854]">{step.title}</p>
                  </button>
                  <div className="pt-1.5">
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
                          className="text-sm text-[hsla(var(--color-secondary)/0.45)] leading-[1.75] pt-1.5"
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
              </div>
            ))}
          </div>

          {/* Consistency card — right column */}
          <div
            className="rounded-2xl px-7 py-8 flex flex-col gap-6"
            style={{ background: 'linear-gradient(155deg, #3B38B8 0%, #1E1854 100%)', boxShadow: '0 4px 32px rgba(30,24,84,0.30), 0 0 80px rgba(59,56,184,0.20)' }}
          >
            {/* Logomark */}
            <div className="w-11 h-11 flex items-center justify-center rounded-full bg-white/15">
              <div className="w-5 h-5">
                <svg viewBox="0 0 320 320" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M320 138.76V160H160V0H181.24C190.26 72.36 247.64 129.74 320 138.76Z" fill="white"/>
                  <path d="M160 160V320H138.76C129.74 247.64 72.36 190.26 0 181.24V160H160Z" fill="white"/>
                </svg>
              </div>
            </div>

            <div className="space-y-2">
              <p className="text-xs font-semibold tracking-[0.18em] uppercase text-white/50">
                Consistency is key
              </p>
              <h3 className="text-3xl font-semibold tracking-[-0.02em] leading-snug text-white">
                The longer you take it, the more it compounds.
              </h3>
            </div>

            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <span className="mt-1 shrink-0 w-4 h-4 rounded-full bg-white/15 flex items-center justify-center">
                  <span className="w-1.5 h-1.5 rounded-full bg-white/80" />
                </span>
                <p className="text-sm text-white/70 leading-[1.7]">
                  Fast-acting compounds deliver noticeable clarity and calm from day one.
                </p>
              </div>
              <div className="flex items-start gap-3">
                <span className="mt-1 shrink-0 w-4 h-4 rounded-full bg-white/15 flex items-center justify-center">
                  <span className="w-1.5 h-1.5 rounded-full bg-white/80" />
                </span>
                <p className="text-sm text-white/70 leading-[1.7]">
                  Deeper benefits — memory, cortisol regulation, neuroplastic changes — build over 4–8 weeks of daily use.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
