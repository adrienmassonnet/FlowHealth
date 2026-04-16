'use client';

import { useState } from 'react';
import Image from 'next/image';
import { takeFlowSteps as steps } from '@/lib/content-data';

export default function TakeFlowSteps() {
  const [active, setActive] = useState(0);

  return (
    <section>
      <div className="max-w-[1200px] mx-auto px-6 py-20">
        <div className="flex flex-col md:flex-row items-stretch gap-16 md:gap-20">

          {/* Left: text */}
          <div className="w-full md:w-[42%] shrink-0 space-y-6 md:pt-4">
            <div className="space-y-3">
              <p className="text-xs tracking-[0.16em] uppercase font-semibold bg-gradient-to-r from-[#3B38B8] to-[#1E1854] bg-clip-text text-transparent">
                How to consume Flow
              </p>
              <h2 className="text-3xl md:text-4xl font-semibold tracking-[-0.03em] leading-[1.05]">
                The Right Predisposition Unlocks Maximum Benefits
              </h2>
            </div>
            {/* Step description that updates with active panel */}
            <div className="space-y-2 pt-2">
              {steps.map((step, i) => (
                <button
                  key={i}
                  onClick={() => setActive(i)}
                  className={`w-full text-left flex items-center gap-4 py-3 px-4 rounded-xl transition-all duration-300 ${
                    active === i
                      ? 'bg-[#1E18540A]'
                      : 'hover:bg-[#1E185408]'
                  }`}
                >
                  <span className={`text-xs font-semibold tabular-nums tracking-[0.06em] transition-colors ${
                    active === i ? 'text-[hsla(var(--color-accent)/1)]' : 'text-[hsla(var(--color-secondary)/0.35)]'
                  }`}>
                    {step.number}
                  </span>
                  <div className="flex-1 min-w-0">
                    <p className={`text-sm font-semibold transition-colors leading-snug ${
                      active === i ? 'text-[#1E1854]' : 'text-[hsla(var(--color-secondary)/0.55)]'
                    }`}>
                      {step.title}
                    </p>
                    <div
                      className="overflow-hidden"
                      style={{
                        maxHeight: active === i ? '300px' : '0px',
                        opacity: active === i ? 1 : 0,
                        transition: 'max-height 0.55s cubic-bezier(0.22, 1, 0.36, 1), opacity 0.4s ease',
                      }}
                    >
                      {Array.isArray(step.body) ? (
                        <ul className="mt-1 pr-2 space-y-0.5">
                          {step.body.map((line) => (
                            <li key={line} className="text-xs text-[hsla(var(--color-secondary)/0.65)] leading-relaxed flex items-baseline gap-1.5">
                              <span className="relative top-[-1px] w-1 h-1 rounded-full bg-[hsla(var(--color-secondary)/0.3)] shrink-0 inline-block" />
                              {line}
                            </li>
                          ))}
                        </ul>
                      ) : (
                        <p className="text-xs text-[hsla(var(--color-secondary)/0.65)] leading-relaxed mt-1 pr-2">
                          {step.body}
                        </p>
                      )}
                    </div>
                  </div>
                  <span className={`shrink-0 transition-all duration-300 text-[hsla(var(--color-secondary)/0.3)] ${
                    active === i ? 'rotate-90' : ''
                  }`}>
                    →
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Right: image accordion */}
          <div className="w-full md:flex-1 hidden md:flex items-stretch gap-3 min-h-[480px]">
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
