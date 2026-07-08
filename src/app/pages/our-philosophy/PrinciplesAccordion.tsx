'use client';

import { useState } from 'react';
import type { PhilosophyPrinciple } from '@/lib/content-data';

interface Props {
  principles: PhilosophyPrinciple[];
}

export default function PrinciplesAccordion({ principles }: Props) {
  const [active, setActive] = useState<number | null>(0);
  const activePrinciple = active !== null ? principles[active] : null;

  return (
    <div className="grid grid-cols-1 md:grid-cols-[380px_1fr] gap-6 items-stretch">

      {/* Left — 2-column card grid */}
      <div className="grid grid-cols-2 gap-2">
        {principles.map((p, i) => {
          const isActive = active === i;
          return (
            <button
              key={p.number}
              onClick={() => setActive(isActive ? null : i)}
              className={`relative flex items-center px-4 py-3.5 rounded-xl w-full overflow-hidden text-left transition-all duration-400 ${
                isActive
                  ? 'border-2 border-brand/60 shadow-[0_4px_16px_rgba(30,24,84,0.22)]'
                  : 'border-2 border-transparent bg-ink/[0.05] hover:border-ink/20'
              }`}
            >
              <span className={`absolute inset-0 bg-gradient-to-br from-brand to-ink transition-opacity duration-400 ${isActive ? 'opacity-100' : 'opacity-0'}`} />
              <span className={`relative z-10 text-sm font-semibold leading-snug transition-colors duration-400 ${isActive ? 'text-white' : 'text-ink/75'}`}>
                {p.title}
              </span>
            </button>
          );
        })}
      </div>

      {/* Right — detail panel */}
      <div className="rounded-2xl border border-ink/[0.07] bg-[#F8F8FC] flex items-center">
        {activePrinciple ? (
          <div key={activePrinciple.number} className="p-8 space-y-3" style={{ animation: 'hbFadeUp 0.45s cubic-bezier(0.25,0.1,0.1,1) forwards' }}>
            <p className="text-xs font-mono tracking-[0.12em] text-ink/30">{activePrinciple.number}</p>
            <h3 className="text-lg font-semibold text-ink tracking-[-0.01em]">{activePrinciple.title}</h3>
            <p className="text-sm text-[rgba(30,24,84,0.65)] leading-relaxed">{activePrinciple.body}</p>
          </div>
        ) : (
          <p className="px-8 text-sm text-ink/25 italic">Select a principle to read more.</p>
        )}
      </div>

    </div>
  );
}