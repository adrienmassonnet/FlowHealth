'use client';

import Image from 'next/image';
import { useState } from 'react';
import { trackEvent } from '@/lib/clarity';

const pillars = [
  {
    key: 'scientific',
    title: 'Scientific',
    description: 'We are a brain-first company. We invest in advancing the understanding of the brain — funding research into topics like ADHD, depression, and beyond.',
    imageUrl: '/the-brain.png',
    imageAlt: 'The brain — scientific pillar',
  },
  {
    key: 'environmental',
    title: 'Environmental',
    description: 'We optimise our entire supply chain — from the cultivation of indigenous botanicals to the distribution of the final product.',
    imageUrl: '/hibiscus.png',
    imageAlt: 'Indigenous botanicals — environmental pillar',
  },
  {
    key: 'social',
    title: 'Social',
    description: 'We fight against the modern-day strains and stresses created by overstimulation and unrealistic modern-day standards.',
    imageUrl: '/overstimulation.png',
    imageAlt: 'Overstimulation — social pillar',
  },
];

export default function ValuePillarsSection() {
  const [activeIndex, setActiveIndex] = useState(0);

  const select = (i: number) => {
    if (i === activeIndex) return;
    trackEvent(`homepage_value_pillar_${pillars[i].key}`);
    setActiveIndex(i);
  };

  return (
    <div className="relative w-full min-h-[320px] h-full flex gap-3">
      {pillars.map((pillar, i) => {
        const active = i === activeIndex;
        return (
          <button
            key={pillar.key}
            onClick={() => select(i)}
            className={`relative flex items-stretch text-left overflow-hidden rounded-2xl bg-white border border-[#1E1854]/[0.08] shadow-[0_8px_32px_rgba(30,24,84,0.1)] focus:outline-none transition-[flex-grow] duration-700 ease-out ${
              active ? 'flex-grow flex-shrink basis-0' : 'flex-grow-0 flex-shrink-0 basis-[52px] md:basis-[64px]'
            }`}
          >
            {/* Image — width follows the parent's flex transition automatically */}
            <div className={`relative shrink-0 h-full ${active ? 'w-1/3' : 'w-full'}`}>
              <Image
                src={pillar.imageUrl}
                alt={pillar.imageAlt}
                fill
                sizes="220px"
                className="object-cover"
              />

              {/* Closed-state overlay */}
              <div
                className={`absolute inset-0 transition-opacity ease-out ${
                  active ? 'opacity-0 pointer-events-none duration-150' : 'opacity-100 duration-300 delay-500'
                }`}
              >
                <div className="absolute inset-0 bg-gradient-to-t from-[#1E1854]/85 via-[#1E1854]/15 to-transparent" />
                <div className="relative z-10 h-full flex items-end justify-center pb-5">
                  <span
                    className="text-xs md:text-sm font-bold tracking-[0.12em] uppercase text-white [text-shadow:0_1px_4px_rgba(0,0,0,0.35)] whitespace-nowrap"
                    style={{ writingMode: 'vertical-rl' }}
                  >
                    {pillar.title}
                  </span>
                </div>
              </div>
            </div>

            {/* Text — width tracks the parent's live size automatically (percentage-based, no own transition needed);
                opacity fades in only once the box has mostly finished expanding, and fades out instantly on click away */}
            <div
              className={`shrink-0 flex flex-col justify-center overflow-hidden whitespace-nowrap transition-opacity ease-out ${
                active ? 'w-2/3 opacity-100 px-5 md:px-6 duration-300 delay-500' : 'w-0 opacity-0 px-0 duration-150'
              }`}
            >
              <h3 className="font-semibold tracking-[-0.02em] text-[#1E1854] text-xl md:text-2xl mb-2 whitespace-normal">
                {pillar.title}
              </h3>
              <p className="text-sm text-[rgba(30,24,84,0.6)] leading-relaxed whitespace-normal">
                {pillar.description}
              </p>
            </div>
          </button>
        );
      })}
    </div>
  );
}
