'use client';

import { useState } from 'react';
import Image from 'next/image';
import type { HealthBenefit } from '@/lib/contentful';

// Icons are keyed by benefit number — SVG can't live in a CMS
const icons: Record<string, React.ReactNode> = {
  '01': (
    <svg viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      <path d="M14 5C10.134 5 7 8.134 7 12C7 14.5 8.3 16.7 10.3 17.9L10 22H18L17.7 17.9C19.7 16.7 21 14.5 21 12C21 8.134 17.866 5 14 5Z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round"/>
      <path d="M11 22H17" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
    </svg>
  ),
  '02': (
    <svg viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      <path d="M7 14C7 14 9 8 14 8C19 8 21 14 21 14" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
      <path d="M5 17C7 15 10 16 12 18C14 20 17 21 19 19" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
      <circle cx="14" cy="14" r="1.5" fill="currentColor"/>
    </svg>
  ),
  '03': (
    <svg viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      <circle cx="14" cy="14" r="4" stroke="currentColor" strokeWidth="1.4"/>
      <path d="M14 6V8M14 20V22M6 14H8M20 14H22M8.34 8.34L9.76 9.76M18.24 18.24L19.66 19.66M8.34 19.66L9.76 18.24M18.24 9.76L19.66 8.34" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
    </svg>
  ),
  '04': (
    <svg viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      <path d="M6 14H9L11 9L14 19L17 12L19 14H22" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),
  '05': (
    <svg viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      <path d="M14 6V14M14 14C14 14 10 11 7 13M14 14C14 14 18 11 21 13M14 14V22" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),
  '06': (
    <svg viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      <circle cx="14" cy="12" r="5" stroke="currentColor" strokeWidth="1.4"/>
      <path d="M10 19C10 19 11 22 14 22C17 22 18 19 18 19" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
      <path d="M11 11C11 11 12 13 14 13C16 13 17 11 17 11" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
    </svg>
  ),
  '07': (
    <svg viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      <path d="M6 14C10 14 14 10 14 6C14 10 18 14 22 14C18 14 14 18 14 22C14 18 10 14 6 14Z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round"/>
    </svg>
  ),
};

interface Props {
  benefits: HealthBenefit[];
  sectionLabel?: string;
  heading?: string;
}

export default function HealthBenefits({ benefits, sectionLabel, heading }: Props) {
  const [active, setActive] = useState(0);
  const step = benefits[active];

  if (!step) return null;

  return (
    <section className="max-w-[1200px] mx-auto px-6 py-14">
      {/* Header */}
      <div className="mb-8 space-y-1.5">
        <p className="text-[11px] tracking-[0.16em] uppercase text-[hsla(var(--color-secondary)/0.45)] font-medium">
          {sectionLabel || 'Health Benefits'}
        </p>
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold tracking-[-0.02em] leading-tight">
          {heading || 'Everything your body needs.\nNothing it doesn\'t.'}
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-[288px_1fr] gap-6 items-stretch">

        {/* Left — benefit selector */}
        <div className="grid grid-cols-2 gap-2">
          {benefits.map((s, i) => {
            const isActive = active === i;
            const icon = icons[s.number];
            return (
              <button
                key={s.number}
                onClick={() => setActive(i)}
                className={`
                  relative flex flex-col items-center justify-center gap-2 px-2 py-4 text-center
                  rounded-xl transition-all duration-300 w-full
                  ${i === benefits.length - 1 && benefits.length % 2 !== 0 ? 'col-span-2' : ''}
                  ${isActive
                    ? 'bg-[#F7F4EF] border border-[#1E1854]/12 shadow-[0_1px_4px_rgba(0,0,0,0.06)]'
                    : 'bg-[#1E1854]/[0.05] border border-transparent hover:bg-[#1E1854]/[0.08]'
                  }
                `}
              >
                {isActive && (
                  <span className="absolute top-0 left-1/2 -translate-x-1/2 w-6 h-[2px] rounded-full bg-[#1E1854]" />
                )}
                <span className={`w-[26px] h-[26px] shrink-0 transition-colors duration-300 ${
                  isActive ? 'text-[#1E1854]' : 'text-[#1E1854]/40'
                }`}>
                  {icon}
                </span>
                <span className={`text-[11px] font-medium leading-snug transition-colors duration-300 ${
                  isActive ? 'text-[#1E1854]' : 'text-[#1E1854]/55'
                }`}>
                  {s.label}
                </span>
              </button>
            );
          })}
        </div>

        {/* Right — detail image panel */}
        <div className="relative rounded-2xl overflow-hidden min-h-[360px] md:min-h-0">
          {step.imageUrl && (
            <Image
              key={step.imageUrl}
              src={step.imageUrl}
              alt={step.title}
              fill
              className="object-cover transition-opacity duration-700"
              sizes="(max-width: 768px) 100vw, 60vw"
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/35 to-transparent" />

          <div className="absolute inset-0 flex flex-col justify-end p-7 md:p-9">
            <div className="mb-3 w-8 h-8 text-white/70">
              {icons[step.number]}
            </div>
            <h3 className="text-2xl md:text-[1.7rem] font-semibold text-white tracking-[-0.02em] leading-snug mb-2">
              {step.title}
            </h3>
            <div className="flex items-center gap-3 mb-3">
              <span className="block w-5 h-px bg-white/25 shrink-0" />
              <span className="text-[11px] uppercase tracking-[0.1em] text-white/45">{step.ingredients}</span>
            </div>
            <p className="text-sm text-white/75 leading-relaxed mb-5 max-w-[420px]">
              {step.description}
            </p>
            <div className="flex items-center gap-2">
              <svg width="13" height="13" viewBox="0 0 16 16" fill="none" className="text-white/35 shrink-0">
                <path d="M3 8L6.5 11.5L13 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <span className="text-[11px] text-white/35 tracking-[0.06em]">Clinically Dosed Ingredients</span>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
