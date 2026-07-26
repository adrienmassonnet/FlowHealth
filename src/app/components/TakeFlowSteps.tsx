'use client';

import { useState } from 'react';
import Image from 'next/image';
import type { TakeFlowStep } from '@/lib/content-data';
import { trackEvent } from '@/lib/clarity';
import { ga4SelectContent } from '@/lib/ga4';

export default function TakeFlowSteps({ steps }: { steps: TakeFlowStep[] }) {
  const [active, setActive] = useState(0);

  return (
    <section>
      <div className="flow-container pt-4 pb-20 md:pt-8">
        <h2 className="flow-h2 mb-6">
          The right setup unlocks all the benefits.
        </h2>
        <div className="flex flex-col md:flex-row items-stretch gap-16 md:gap-20">

          {/* Left: text */}
          <div className="w-full md:w-[42%] shrink-0 space-y-6">
            {/* Step cards — same numbered-card language as StepCard (see our-product page) */}
            <div className="space-y-4">
              {steps.map((step, i) => (
                <button
                  key={i}
                  onClick={() => {
                    setActive(i);
                    trackEvent('product_usage_step_open');
                    ga4SelectContent('usage_step', step.title);
                  }}
                  className={`w-full text-left rounded-xl border bg-gradient-to-b from-white to-[#F6F6FC] overflow-hidden transition-all duration-300 ${
                    active === i
                      ? 'border-brand/30 shadow-[0_10px_28px_-10px_rgba(30,24,84,0.32)]'
                      : 'border-ink/[0.08] shadow-[0_10px_28px_-10px_rgba(30,24,84,0.22)] hover:border-ink/15'
                  }`}
                >
                  <div className="flex items-center justify-between gap-3">
                    <div className="flex items-center gap-3 px-3 py-2 rounded-tl-xl rounded-br-xl bg-brand/[0.11] min-w-0">
                      <span className="text-xs font-semibold tabular-nums shrink-0 text-brand">
                        {step.number}
                      </span>
                      <p className="text-base font-semibold tracking-[-0.01em] leading-snug text-ink truncate">
                        {step.title}
                      </p>
                    </div>
                    <svg
                      width="12" height="8" viewBox="0 0 12 8" fill="none"
                      className={`shrink-0 mr-4 text-ink/30 transition-transform duration-300 ${active === i ? 'rotate-180' : ''}`}
                    >
                      <path d="M1 1.5l5 5 5-5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                  <div
                    className="grid px-4"
                    style={{
                      gridTemplateRows: active === i ? '1fr' : '0fr',
                      opacity: active === i ? 1 : 0,
                      transition: 'grid-template-rows 0.6s cubic-bezier(0.22, 1, 0.36, 1), opacity 0.45s ease',
                    }}
                  >
                    {/* min-h-0 is required: grid items default to
                        min-height:auto, which stops the 0fr row from
                        collapsing, so closed steps kept reserving their
                        full body height. */}
                    <div className="overflow-hidden min-h-0">
                      {Array.isArray(step.body) ? (
                        <ol className="pb-3 space-y-1">
                          {step.body.map((line, idx) => (
                            <li key={line} className="text-sm text-ink/60 leading-[1.6] flex items-baseline gap-2">
                              <span className="text-xs font-semibold tabular-nums text-ink/50 shrink-0">{idx + 1}.</span>
                              {line}
                            </li>
                          ))}
                        </ol>
                      ) : (
                        <p className="text-sm text-ink/60 leading-[1.6] pb-3">
                          {step.body}
                        </p>
                      )}
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Right: image accordion */}
          <div className="w-full md:flex-1 hidden md:flex items-stretch gap-3">
            {steps.map((step, i) => {
              const isActive = active === i;
              return (
                <div
                  key={i}
                  className="relative rounded-2xl overflow-hidden"
                  style={{
                    flex: isActive ? '1 1 0%' : '0 0 64px',
                    transition: 'flex 0.7s cubic-bezier(0.22, 1, 0.36, 1)',
                  }}
                >
                  {/* Image */}
                  <Image
                    src={step.image}
                    alt={step.title}
                    fill
                    className="object-cover"
                    style={{
                      opacity: isActive ? 1 : 0.45,
                      scale: isActive ? '1' : '1.04',
                      transition: 'opacity 0.7s ease, scale 0.7s cubic-bezier(0.22, 1, 0.36, 1)',
                    }}
                    sizes="(max-width: 768px) 0px, 50vw"
                    loading={i === 0 ? 'eager' : 'lazy'}
                  />
                </div>
              );
            })}
          </div>

        </div>
      </div>
    </section>
  );
}
