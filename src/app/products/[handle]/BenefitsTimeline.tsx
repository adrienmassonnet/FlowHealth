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
    <section className="max-w-[1360px] mx-auto px-6 py-20">
      <div className="mb-12">
        <h2 className="text-3xl md:text-4xl font-semibold tracking-[-0.02em] leading-tight">
          What and how will I feel?
        </h2>
      </div>

      <div className="relative">
        {/* Vertical timeline line */}
        <div className="absolute left-[10px] top-3 bottom-3 w-px bg-[var(--color-border)]" />

        <div className="space-y-0">
          {steps.map((step, i) => (
            <div key={step.week} className="relative pl-10">
              {/* Dot */}
              <div className="absolute left-0 top-[22px] w-[21px] h-[21px] flex items-center justify-center">
                {/* Filled circle that expands and stays while open, retracts on close */}
                <AnimatePresence>
                  {openIndex === i && (
                    <motion.span
                      key="fill"
                      className="absolute rounded-full bg-[hsla(var(--color-accent)/0.12)] pointer-events-none"
                      style={{ left: '50%', top: '50%', x: '-50%', y: '-50%' }}
                      initial={{ width: 21, height: 21 }}
                      animate={{ width: 44, height: 44 }}
                      exit={{ width: 21, height: 21 }}
                      transition={{ duration: 0.4, ease: 'easeOut' }}
                    />
                  )}
                </AnimatePresence>
                <div className={cn(
                  'relative w-[21px] h-[21px] rounded-full border-2 flex items-center justify-center bg-[#F8F8F8] transition-colors',
                  openIndex === i ? 'border-[hsla(var(--color-accent)/1)]' : 'border-[var(--color-border)]'
                )}>
                  <div className={cn(
                    'w-2 h-2 rounded-full transition-colors',
                    openIndex === i ? 'bg-[hsla(var(--color-accent)/1)]' : 'bg-transparent'
                  )} />
                </div>
              </div>

              <button
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                className="w-full flex items-start gap-6 py-5 text-left group"
              >
                {/* Week badge */}
                <span className="shrink-0 text-xs font-semibold tracking-[0.08em] uppercase border border-[hsla(var(--color-accent)/1)] px-3 py-1 mt-0.5 text-[hsla(var(--color-accent)/1)]">
                  {step.week}
                </span>

                <div className="flex-1 min-w-0">
                  <p className={cn(
                    'text-base font-semibold tracking-[-0.01em] transition-all px-2 py-0.5 -mx-2 rounded-md inline-block',
                    openIndex === i
                      ? 'text-[#1A1A18]'
                      : 'text-[#1A1A18] group-hover:bg-[#F0F2F1]'
                  )}>
                    {step.title}
                  </p>
                  {openIndex !== i && (
                    <p className="text-sm text-[hsla(var(--color-secondary)/0.75)] mt-1 leading-relaxed line-clamp-1">
                      {step.summary}
                    </p>
                  )}
                </div>
              </button>

              <AnimatePresence initial={false}>
                {openIndex === i && (
                  <motion.div
                    key="content"
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: 'easeInOut' }}
                    className="overflow-hidden"
                  >
                    <div className="pb-6 pr-10 md:pr-16">
                      <p className="text-sm text-[hsla(var(--color-secondary)/0.85)] mb-3 leading-relaxed font-medium">
                        {step.summary}
                      </p>
                      <p className="text-base text-[#1A1A18] leading-[1.75]">
                        {step.detail}
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
