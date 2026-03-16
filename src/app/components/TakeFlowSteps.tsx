'use client';

import { useState } from 'react';

const steps = [
  {
    number: '01',
    title: 'Your morning ritual',
    body: 'Flow is designed for mornings — the moment when your body is most revitalised and absorption of its formula is most optimal. Start each day with intention.',
    image: 'https://flow-health-2.myshopify.com/cdn/shop/files/ritual.png?v=1765176160&width=1080',
  },
  {
    number: '02',
    title: 'Before deep work',
    body: 'Sit down, open the bottle, and take Flow before your most demanding work session. The liquid formula is absorbed within 15 minutes, priming your mind for sustained focus.',
    image: 'https://flow-health-2.myshopify.com/cdn/shop/files/supplement.png?v=1765112045&width=1080',
  },
  {
    number: '03',
    title: 'When it matters most',
    body: 'Presentations, creative deadlines, high-stakes decisions — Flow supports clarity and calm under pressure so you show up at your best every time.',
    image: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=900&q=80&auto=format&fit=crop',
  },
];

export default function TakeFlowSteps() {
  const [active, setActive] = useState(0);

  return (
    <section className="border-t border-[var(--color-border)]">
      <div className="max-w-[1360px] mx-auto px-6 py-20 md:py-28">
        <div className="flex flex-col md:flex-row items-start gap-16 md:gap-20">

          {/* Left: text */}
          <div className="w-full md:w-[42%] shrink-0 space-y-6 md:pt-4">
            <div className="space-y-3">
              <p className="text-xs tracking-[0.14em] uppercase text-[hsla(var(--color-secondary)/0.5)] font-medium">
                How to consume Flow
              </p>
              <h2 className="text-4xl md:text-5xl font-bold tracking-[-0.03em] leading-[1.05]">
                Put yourself in the best predisposition
              </h2>
            </div>
            <p className="text-base text-[hsla(var(--color-secondary)/0.75)] leading-relaxed max-w-sm">
              One bottle, once a day. Flow fits seamlessly into your routine — no mixing, no measuring, no waiting.
            </p>

            {/* Step description that updates with active panel */}
            <div className="space-y-2 pt-2">
              {steps.map((step, i) => (
                <button
                  key={i}
                  onClick={() => setActive(i)}
                  className={`w-full text-left flex items-center gap-4 py-3 px-4 rounded-xl transition-all duration-300 ${
                    active === i
                      ? 'bg-[#F0F2F1]'
                      : 'hover:bg-[#F8F8F8]'
                  }`}
                >
                  <span className={`text-xs font-semibold tabular-nums tracking-[0.06em] transition-colors ${
                    active === i ? 'text-[hsla(var(--color-accent)/1)]' : 'text-[hsla(var(--color-secondary)/0.35)]'
                  }`}>
                    {step.number}
                  </span>
                  <div className="flex-1 min-w-0">
                    <p className={`text-sm font-semibold transition-colors leading-snug ${
                      active === i ? 'text-[#1A1A18]' : 'text-[hsla(var(--color-secondary)/0.55)]'
                    }`}>
                      {step.title}
                    </p>
                    <div
                      className="overflow-hidden transition-all duration-400 ease-in-out"
                      style={{ maxHeight: active === i ? '80px' : '0px', opacity: active === i ? 1 : 0 }}
                    >
                      <p className="text-xs text-[hsla(var(--color-secondary)/0.65)] leading-relaxed mt-1 pr-2">
                        {step.body}
                      </p>
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
          <div className="w-full md:flex-1 hidden md:flex items-stretch gap-3 h-[480px]">
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
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={step.image}
                    alt={step.title}
                    className="absolute inset-0 w-full h-full object-cover"
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
