'use client';

import { useState } from 'react';
import Image from 'next/image';
import { PRODUCT_META } from '@/lib/product-meta';

const steps: { number: string; title: string; body: string | string[]; image: string }[] = [
  {
    number: '01',
    title: 'Simple Daily Ritual',
    body: [
      `Pour one sachet into ${PRODUCT_META.servingWaterMl} of water`,
      'Stir gently until fully dissolved',
      'Drink slowly and mindfully',
      'Repeat every day',
    ],
    image: 'https://flow-health-2.myshopify.com/cdn/shop/files/ritual.png?v=1765176160&width=1080',
  },
  {
    number: '02',
    title: 'Your Morning Routine',
    body: 'Take Flow first thing in the morning. The early hours offer a clean slate with peak dopamine sensitivity and minimal distractions, delivering full calm energy and focus that lasts all day.',
    image: 'https://flow-health-2.myshopify.com/cdn/shop/files/supplement.png?v=1765112045&width=1080',
  },
  {
    number: '03',
    title: 'Pair with Meaningful Moments',
    body: 'Link your Flow moment to an activity you enjoy and that helps you grow — journaling, a short walk, deep work or creative time. It becomes the emblem of your commitment to personal growth.',
    image: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=900&q=80&auto=format&fit=crop',
  },
];

export default function TakeFlowSteps() {
  const [active, setActive] = useState(0);

  return (
    <section>
      <div className="max-w-[1200px] mx-auto px-6 py-20">
        <div className="flex flex-col md:flex-row items-stretch gap-16 md:gap-20">

          {/* Left: text */}
          <div className="w-full md:w-[42%] shrink-0 space-y-6 md:pt-4">
            <div className="space-y-3">
              <p className="text-xs tracking-[0.16em] uppercase text-[hsla(var(--color-secondary)/0.5)] font-medium">
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
                      className="overflow-hidden transition-all duration-400 ease-in-out"
                      style={{ maxHeight: active === i ? '80px' : '0px', opacity: active === i ? 1 : 0 }}
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
                    transition: 'flex 0.6s cubic-bezier(0.22, 1, 0.36, 1)',
                  }}
                >
                  {/* Image */}
                  <Image
                    src={step.image}
                    alt={step.title}
                    fill
                    className="object-cover"
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
