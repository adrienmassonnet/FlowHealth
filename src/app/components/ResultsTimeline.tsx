'use client';

import { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import type { ResultsTimelineStep } from '@/lib/content';
import { EASE, DURATION, VIEWPORT, VARIANTS } from '@/lib/animation';

export default function ResultsTimeline({ steps }: { steps: ResultsTimelineStep[] }) {
  const [expanded, setExpanded] = useState(false);
  const ref = useRef(null);
  const inView = useInView(ref, VIEWPORT);

  return (
    <motion.div
      ref={ref}
      className="bg-white rounded-2xl px-6 md:px-10 pt-10 pb-4 shadow-[0_2px_16px_rgba(30,24,84,0.07)] border border-ink/[0.06]"
      initial="hidden"
      animate={inView ? 'visible' : 'hidden'}
      variants={VARIANTS.fadeUp}
      transition={{ duration: DURATION.slow, ease: EASE.expoOut }}
    >

      {/* Mobile: vertical layout */}
      <div className="md:hidden flex flex-col mb-6">
        {steps.map((step, i) => (
          <motion.div
            key={step.period}
            className={`relative${i < steps.length - 1 ? ' pb-6' : ''}`}
            initial="hidden"
            animate={inView ? 'visible' : 'hidden'}
            variants={VARIANTS.slideInLeft}
            transition={{ duration: DURATION.base, delay: 0.1 + i * 0.07, ease: EASE.expoOut }}
          >
            {i < steps.length - 1 && (
              <div className="absolute left-[16px] top-[28px] bottom-0 w-px bg-ink/12" />
            )}
            <span className="relative inline-flex items-center gap-1.5 text-xs font-medium tracking-[0.06em] uppercase bg-gradient-to-r from-brand to-ink text-white px-3 py-1 rounded-full shadow-[0_2px_8px_rgba(59,56,184,0.35)]">
              <span className="w-1.5 h-1.5 rounded-full bg-white/60 shrink-0" />
              {step.period}
            </span>
            <div className="mt-3 pl-6">
              <p className="text-base font-semibold tracking-[-0.01em]">{step.title}</p>
              <div
                className="grid transition-[grid-template-rows,opacity] duration-500"
                style={{ gridTemplateRows: expanded ? '1fr' : '0fr', opacity: expanded ? 1 : 0 }}
              >
                <div className="overflow-hidden">
                  <ul className="space-y-1.5 mt-3">
                    {step.bullets.split('\n').filter(Boolean).map((b) => (
                      <li key={b} className="text-sm text-[rgba(30,24,84,0.75)] flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-ink/20 shrink-0" />
                        {b}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Desktop: 4-column grid */}
      <div className="hidden md:block mb-6">
        <div className="grid grid-cols-4 gap-8">
          {steps.map((step, i) => (
            <motion.div
              key={step.period}
              className="relative space-y-3"
              initial="hidden"
              animate={inView ? 'visible' : 'hidden'}
              variants={VARIANTS.fadeUp}
              transition={{ duration: DURATION.base, delay: 0.1 + i * 0.07, ease: EASE.expoOut }}
            >
              {i < steps.length - 1 && (
                <div className="absolute top-[14px] left-0 w-[calc(100%+2rem)] h-px bg-ink/12" />
              )}
              <span className="relative inline-flex items-center gap-1.5 text-xs font-medium tracking-[0.06em] uppercase bg-gradient-to-r from-brand to-ink text-white px-3 py-1 rounded-full shadow-[0_2px_8px_rgba(59,56,184,0.35)]">
                <span className="w-1.5 h-1.5 rounded-full bg-white/60 shrink-0" />
                {step.period}
              </span>
              <p className="text-base font-semibold tracking-[-0.01em] leading-snug">{step.title}</p>
              <div
                className="grid transition-[grid-template-rows,opacity] duration-500"
                style={{ gridTemplateRows: expanded ? '1fr' : '0fr', opacity: expanded ? 1 : 0 }}
              >
                <div className="overflow-hidden">
                  <ul className="space-y-1.5">
                    {step.bullets.split('\n').filter(Boolean).map((b) => (
                      <li key={b} className="text-sm text-[rgba(30,24,84,0.75)] flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-ink/20 shrink-0" />
                        {b}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Single toggle arrow */}
      <div className="flex justify-center">
        <button
          onClick={() => setExpanded((e) => !e)}
          className="group py-2 px-4 transition-colors duration-200"
        >
          <span className={`w-7 h-7 rounded-full border border-ink/15 flex items-center justify-center transition-transform duration-300 group-hover:border-ink/40 ${expanded ? 'rotate-180' : ''}`}>
            <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
              <path d="M2 3.5l3 3 3-3" stroke="var(--color-ink)" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </span>
        </button>
      </div>

    </motion.div>
  );
}
