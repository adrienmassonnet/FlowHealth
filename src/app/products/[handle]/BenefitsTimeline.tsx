'use client';

import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { cn } from '@/lib/utils';

const steps = [
  {
    week: 'Day 1',
    title: 'A calm wave of focus',
    summary: 'Within 60 minutes of your first bottle, you\'ll notice a subtle but clear shift — sharper thoughts, reduced mental noise.',
    detail: 'Zynamite® and L-Theanine begin working within the first hour. Expect a clean, jitter-free alertness that feels different from coffee: no spike, no racing heart. Your mind settles into a productive rhythm while staying relaxed. Most people describe it as "finally feeling in control of their thoughts."',
  },
  {
    week: 'Week 1–2',
    title: 'Steadier energy, better mornings',
    summary: 'The afternoon slump starts to fade. Mornings feel less groggy. Your energy curve becomes noticeably smoother across the day.',
    detail: 'As B-vitamins and electrolytes build up in your system, your body\'s energy metabolism becomes more efficient. You\'ll find it easier to start tasks without procrastination. Sleep quality often improves in the first two weeks too — Magnesium and L-Theanine support deeper, more restorative rest, so you wake up actually refreshed.',
  },
  {
    week: 'Week 3–4',
    title: 'Stress rolls off you differently',
    summary: 'Stressful situations feel more manageable. You react less and respond more. Colleagues or family may notice before you do.',
    detail: 'Ashwagandha KSM-66® and Rhodiola Rosea take about 3–4 weeks to meaningfully modulate your cortisol response. By now, your HPA axis is better regulated — your body doesn\'t over-react to everyday stressors. You\'ll notice a more grounded baseline: less irritability, more patience, and a greater sense of emotional stability even in demanding moments.',
  },
  {
    week: 'Month 2+',
    title: 'Sharpness that compounds',
    summary: 'Long-term neuroplasticity support kicks in. Your capacity for sustained deep work improves and you feel more mentally resilient overall.',
    detail: 'Lion\'s Mane mushroom and Bacopa Monnieri work on longer timescales, supporting the growth of new neural connections and protecting existing ones. After two months of consistent use, many people report noticeably improved memory recall, faster problem-solving, and a greater capacity for creative thinking. This is the compound interest of daily supplementation.',
  },
];

export default function BenefitsTimeline() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="max-w-[1200px] mx-auto px-6 py-20">
      <div className="mb-10 space-y-1.5">
        <p className="text-xs tracking-[0.16em] uppercase text-[hsla(var(--color-secondary)/0.5)] font-medium">Timeline</p>
        <h2 className="text-3xl md:text-4xl font-semibold tracking-[-0.02em] leading-tight">
          What and how will I feel?
        </h2>
      </div>

      {/* Dark blue container behind the timeline */}
      <div className="bg-[#1E1854] rounded-2xl px-6 md:px-10 py-8">
        <div className="relative">
          {/* Vertical timeline line */}
          <div className="absolute left-[10px] top-3 bottom-3 w-px bg-white/10" />

          <div className="space-y-0">
            {steps.map((step, i) => (
              <div key={step.week} className="relative pl-10">
                {/* Dot */}
                <div className="absolute left-0 top-[22px] w-[21px] h-[21px] flex items-center justify-center">
                  <AnimatePresence>
                    {openIndex === i && (
                      <motion.span
                        key="fill"
                        className="absolute rounded-full bg-white/10 pointer-events-none"
                        style={{ left: '50%', top: '50%', x: '-50%', y: '-50%' }}
                        initial={{ width: 21, height: 21 }}
                        animate={{ width: 40, height: 40 }}
                        exit={{ width: 21, height: 21 }}
                        transition={{ duration: 0.4, ease: 'easeOut' }}
                      />
                    )}
                  </AnimatePresence>
                  <div className={cn(
                    'relative w-[9px] h-[9px] rounded-full transition-all duration-300',
                    openIndex === i
                      ? 'bg-white shadow-[0_0_0_3px_rgba(255,255,255,0.18)]'
                      : 'bg-white/25'
                  )} />
                </div>

                <button
                  onClick={() => setOpenIndex(openIndex === i ? null : i)}
                  className="w-full flex items-start gap-5 py-5 text-left group"
                >
                  {/* Week pill */}
                  <span className={cn(
                    'shrink-0 text-xs font-medium tracking-[0.06em] uppercase px-3 py-1 mt-0.5 rounded-full transition-colors duration-200',
                    openIndex === i
                      ? 'bg-white/20 text-white'
                      : 'bg-white/[0.08] text-white/40'
                  )}>
                    {step.week}
                  </span>

                  <div className="flex-1 min-w-0">
                    <p className={cn(
                      'text-base font-semibold tracking-[-0.01em] transition-colors duration-200',
                      openIndex === i ? 'text-white' : 'text-white/60 group-hover:text-white'
                    )}>
                      {step.title}
                    </p>
                    {openIndex !== i && (
                      <p className="text-sm text-white/35 mt-1 leading-relaxed line-clamp-1">
                        {step.summary}
                      </p>
                    )}
                  </div>

                  {/* Chevron */}
                  <span className={cn(
                    'shrink-0 mt-1 transition-transform duration-300 text-white/30',
                    openIndex === i ? 'rotate-180' : ''
                  )}>
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                      <path d="M3 5L7 9L11 5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </span>
                </button>

                {/* CSS grid-template-rows trick: smoothest expand, no JS layout measurement */}
                <div
                  className="grid"
                  style={{
                    gridTemplateRows: openIndex === i ? '1fr' : '0fr',
                    transition: 'grid-template-rows 420ms cubic-bezier(0.25, 0.1, 0.1, 1)',
                  }}
                >
                  <div className="overflow-hidden min-h-0">
                    <div
                      className="flex gap-5 pb-6 pr-8 md:pr-12"
                      style={{
                        opacity: openIndex === i ? 1 : 0,
                        transition: 'opacity 300ms ease-out',
                        transitionDelay: openIndex === i ? '100ms' : '0ms',
                      }}
                    >
                      {/* Invisible spacer */}
                      <span className="shrink-0 invisible text-xs font-medium tracking-[0.06em] uppercase px-3 py-1 rounded-full">
                        {step.week}
                      </span>
                      <div className="flex-1">
                        <p className="text-sm text-white/70 mb-3 leading-relaxed font-medium">
                          {step.summary}
                        </p>
                        <p className="text-sm text-white/55 leading-[1.75]">
                          {step.detail}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Consistency is Key callout */}
      <div className="mt-12 max-w-2xl mx-auto w-full border border-[var(--color-border)] bg-[#1E185408] rounded-2xl py-10 px-8 flex flex-col items-center text-center gap-4">
        <div className="w-14 h-14 flex items-center justify-center" style={{
          clipPath: 'polygon(50% 0%, 93% 25%, 93% 75%, 50% 100%, 7% 75%, 7% 25%)',
          background: 'hsla(var(--color-accent)/1)',
        }}>
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
            <path d="M13 3L5 14h7l-1 7 8-11h-7l1-7z" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
        <div className="space-y-2 max-w-lg">
          <p className="text-sm font-semibold tracking-[0.16em] uppercase text-[hsla(var(--color-accent)/1)]">
            Consistency is key
          </p>
          <p className="text-sm text-[hsla(var(--color-secondary)/0.75)] leading-relaxed">
            Most users report noticeable improvements in focus and energy within the first week, with comprehensive benefits developing over 4–8 weeks of daily use.
          </p>
        </div>
      </div>
    </section>
  );
}
