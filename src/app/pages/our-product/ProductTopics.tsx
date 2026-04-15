'use client';

import { useState } from 'react';
import Image from 'next/image';
import { trackEvent } from '@/lib/clarity';
import IngredientsExplorer from '@/app/components/IngredientsExplorer';

const TABS = [
  {
    id: 'ingredients' as const,
    label: 'The Ingredients',
    description: 'What\'s inside — every active compound.',
  },
  {
    id: 'formula' as const,
    label: 'The Formula',
    description: 'The science behind the stack.',
  },
  {
    id: 'quality' as const,
    label: 'Quality & Format',
    description: 'How it\'s made and what that means.',
  },
  {
    id: 'promise' as const,
    label: 'Our Promise',
    description: 'Non-negotiables we\'ll never compromise on.',
  },
];

type TabId = typeof TABS[number]['id'];

const formats = [
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
        <rect x="9" y="5" width="10" height="18" rx="3" stroke="currentColor" strokeWidth="1.4"/>
        <path d="M12 9h4M12 13h4M12 17h2" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
      </svg>
    ),
    title: 'Capsule form',
    description: 'Delayed-release vegetarian capsules for optimal absorption. No fillers, no anti-caking agents, no unnecessary additives.',
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
        <path d="M7 14C7 10.134 10.134 7 14 7C17.866 7 21 10.134 21 14" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
        <path d="M7 14v5a2 2 0 002 2h10a2 2 0 002-2v-5" stroke="currentColor" strokeWidth="1.4"/>
        <path d="M14 14v4M11 17l3-3 3 3" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    title: '30-day supply',
    description: 'Two capsules daily with your morning meal. Designed for consistent daily use — benefits compound over 4–12 weeks.',
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
        <path d="M14 5L16.8 10.4L23 11.3L18.5 15.7L19.6 22L14 19L8.4 22L9.5 15.7L5 11.3L11.2 10.4L14 5Z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round"/>
      </svg>
    ),
    title: 'Third-party tested',
    description: 'Every batch is independently tested for purity, potency, and contaminants before it leaves the facility.',
  },
];

const promiseItems = [
  'Clean, natural ingredients you can trust',
  'No artificial stimulants or hidden additives',
  'Clinically dosed — no pixie-dusting',
  'Third-party tested for purity and potency',
  'Sustainable packaging and responsible sourcing',
  'Honest communication — always',
];

export default function ProductTopics() {
  const [active, setActive] = useState<TabId>('ingredients');

  const handleTab = (id: TabId) => {
    if (id === active) return;
    trackEvent(`our_product_tab_${id}`);
    setActive(id);
  };

  return (
    <section className="bg-white border-t border-[#1E1854]/[0.06]">
      <div className="max-w-[1200px] mx-auto px-6 py-16 md:py-24">

        {/* Topic buttons */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-12">
          {TABS.map((tab) => {
            const isActive = tab.id === active;
            return (
              <button
                key={tab.id}
                onClick={() => handleTab(tab.id)}
                className={`text-left rounded-2xl border p-5 md:p-6 transition-all duration-500 ${
                  isActive
                    ? 'card-selected shadow-lg shadow-[#1E1854]/20 -translate-y-0.5'
                    : 'border-[#1E1854]/[0.1] bg-white hover:border-[#1E1854]/25 hover:shadow-md hover:shadow-[#1E1854]/[0.06] hover:-translate-y-0.5'
                }`}
              >
                <p className={`text-sm font-semibold tracking-[-0.01em] leading-snug mb-2 ${
                  isActive ? 'text-white' : 'text-[#1E1854]'
                }`}>
                  {tab.label}
                </p>
                <p className={`text-xs leading-snug ${
                  isActive ? 'text-white/50' : 'text-[#1E1854]/40'
                }`}>
                  {tab.description}
                </p>
              </button>
            );
          })}
        </div>

        {/* Content panel — key triggers re-mount → animation */}
        <div key={active} className="topic-enter">

          {active === 'ingredients' && (
            <IngredientsExplorer scrollOnFilter={false} clarityPrefix="our_product_ingredients" visibleLimit={0} />
          )}

          {active === 'formula' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 items-center">
              <div className="space-y-6">
                <p className="text-xs tracking-[0.16em] uppercase font-semibold bg-gradient-to-r from-[#3B38B8] to-[#1E1854] bg-clip-text text-transparent">The Formula</p>
                <h2 className="text-3xl md:text-4xl font-semibold tracking-[-0.02em] leading-tight">
                  Built for the long game.
                </h2>
                <div className="space-y-4 text-sm text-[hsla(var(--color-secondary)/0.75)] leading-relaxed">
                  <p>Most cognitive supplements are designed around one or two hero ingredients padded out with cheap fillers. Flow is built differently — every ingredient earns its place through clinical evidence, not marketing.</p>
                  <p>The formula targets five domains simultaneously: memory consolidation, stress resilience, neuroplasticity, focused attention, and sleep quality. These systems are deeply interconnected — optimising all five compounds over time.</p>
                  <p>You won&apos;t notice a spike on day one. You will notice that six weeks in, tasks feel easier, stress feels lighter, and focus feels more available on demand.</p>
                </div>
              </div>
              <div className="relative aspect-[4/3] rounded-2xl overflow-hidden ring-1 ring-[#1E1854]/[0.08] shadow-xl shadow-[#1E1854]/[0.06]">
                <Image
                  src="https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=900&q=85&auto=format&fit=crop"
                  alt="Formula"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
            </div>
          )}

          {active === 'quality' && (
            <div>
              <div className="mb-10 space-y-2">
                <p className="text-xs tracking-[0.16em] uppercase font-semibold bg-gradient-to-r from-[#3B38B8] to-[#1E1854] bg-clip-text text-transparent">The Details</p>
                <h2 className="text-3xl md:text-4xl font-semibold tracking-[-0.02em]">Made right, from start to finish.</h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {formats.map((f) => (
                  <div key={f.title} className="space-y-4 p-8 bg-[#1E185408] rounded-2xl border border-[var(--color-border)]">
                    <span className="text-[#1E1854]">{f.icon}</span>
                    <h3 className="text-lg font-semibold text-[#1E1854]">{f.title}</h3>
                    <p className="text-sm text-[hsla(var(--color-secondary)/0.65)] leading-relaxed">{f.description}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {active === 'promise' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 items-center">
              <div className="space-y-4">
                <p className="text-xs tracking-[0.16em] uppercase font-semibold bg-gradient-to-r from-[#3B38B8] to-[#1E1854] bg-clip-text text-transparent">Our Promise</p>
                <h2 className="text-3xl md:text-4xl font-semibold tracking-[-0.02em] leading-tight">
                  Nothing hidden.<br />Nothing compromised.
                </h2>
                <p className="text-sm text-[hsla(var(--color-secondary)/0.65)] leading-relaxed max-w-sm">
                  We&apos;re here for the long haul, committed to supporting your journey toward a calmer mind, deeper focus, and a more fulfilling life.
                </p>
              </div>
              <ul className="space-y-4">
                {promiseItems.map((p) => (
                  <li key={p} className="flex items-start gap-3">
                    <span className="mt-0.5 shrink-0 w-5 h-5 rounded-full bg-[#1E1854] flex items-center justify-center">
                      <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                        <path d="M2 5l2.5 2.5 4-4" stroke="white" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </span>
                    <span className="text-sm text-[#1E1854] leading-snug font-medium">{p}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

        </div>
      </div>
    </section>
  );
}
