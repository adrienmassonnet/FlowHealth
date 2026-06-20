'use client';

import { useState } from 'react';
import Image from 'next/image';
import { takeFlowSteps as steps } from '@/lib/content-data';

export default function TakeFlowSteps() {
  const [active, setActive] = useState(0);

  return (
    <section>
      <div className="max-w-[1200px] mx-auto px-6 pt-4 pb-20 md:pt-8">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold tracking-[-0.02em] leading-[1.08] mb-6">
          The right setup unlocks all the benefits.
        </h2>
        <div className="flex flex-col md:flex-row items-stretch gap-16 md:gap-20">

          {/* Left: text */}
          <div className="w-full md:w-[42%] shrink-0 space-y-6">
            {/* Step cards */}
            <div className="space-y-3">
              {steps.map((step, i) => (
                <button
                  key={i}
                  onClick={() => setActive(i)}
                  className={`w-full text-left rounded-2xl border transition-all duration-300 shadow-[0_2px_16px_rgba(30,24,84,0.07)] ${
                    active === i
                      ? 'bg-white border-[#1E1854]/12 shadow-[0_4px_24px_rgba(30,24,84,0.11)]'
                      : 'bg-white border-[#1E185420] hover:border-[#1E1854]/15'
                  }`}
                >
                  <div className="flex items-start gap-4 px-5 py-4">
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold leading-snug text-[#1E1854]">
                        {step.title}
                      </p>
                      <div
                        className="grid"
                        style={{
                          gridTemplateRows: active === i ? '1fr' : '0fr',
                          opacity: active === i ? 1 : 0,
                          transition: 'grid-template-rows 0.6s cubic-bezier(0.22, 1, 0.36, 1), opacity 0.45s ease',
                        }}
                      >
                      <div className="overflow-hidden">
                        {Array.isArray(step.body) ? (
                          <ol className="mt-2 space-y-1">
                            {step.body.map((line, idx) => (
                              <li key={line} className="text-sm text-[rgba(30,24,84,0.75)] leading-[1.55] flex items-baseline gap-2">
                                <span className="text-xs font-semibold tabular-nums text-[rgba(30,24,84,0.7)] shrink-0">{idx + 1}.</span>
                                {line}
                              </li>
                            ))}
                          </ol>
                        ) : (
                          <p className="text-sm text-[rgba(30,24,84,0.75)] leading-[1.55] mt-2">
                            {step.body}
                          </p>
                        )}
                      </div>
                    </div>
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
