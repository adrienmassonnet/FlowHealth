'use client';

import Image from 'next/image';
import { useState } from 'react';
import { trackEvent } from '@/lib/clarity';

const pillars = [
  {
    key: 'scientific',
    title: 'Scientific',
    description: 'We are a brain-first company. We invest in advancing the understanding of the brain, funding research into topics like ADHD, depression, and beyond.',
    imageUrl: '/the-brain.png',
    imageAlt: 'The brain: scientific pillar',
  },
  {
    key: 'environmental',
    title: 'Environmental',
    description: 'We optimise our entire supply chain, from the cultivation of indigenous botanicals to the distribution of the final product.',
    imageUrl: '/hibiscus.png',
    imageAlt: 'Indigenous botanicals: environmental pillar',
  },
  {
    key: 'social',
    title: 'Social',
    description: 'We fight against the modern-day strains and stresses created by overstimulation and unrealistic modern-day standards.',
    imageUrl: '/overstimulation.png',
    imageAlt: 'Overstimulation: social pillar',
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
    <div className="w-full flex flex-col gap-3">
      {pillars.map((pillar, i) => {
        const active = i === activeIndex;
        return (
          <button
            key={pillar.key}
            onClick={() => select(i)}
            aria-expanded={active}
            className="w-full block text-left rounded-2xl bg-white border border-ink/[0.08] shadow-[0_8px_32px_rgba(30,24,84,0.08)] overflow-hidden focus:outline-none"
          >
            {/* Image: closed = full banner with the title overlaid on top;
                open = a shorter banner across the top of the card */}
            <div className={`relative w-full transition-[height] duration-500 ease-out ${active ? 'h-48' : 'h-20'}`}>
              <Image
                src={pillar.imageUrl}
                alt={pillar.imageAlt}
                fill
                sizes="(max-width: 768px) 100vw, 400px"
                className="object-cover"
              />
              {/* Closed-state overlay title — fades out on open */}
              <div className={`absolute inset-0 transition-opacity duration-300 ${active ? 'opacity-0' : 'opacity-100'}`}>
                <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-ink/25 to-transparent" />
                <div className="absolute inset-0 flex items-end p-4">
                  <h3 className="text-white font-bold text-lg tracking-[-0.01em] [text-shadow:0_1px_6px_rgba(0,0,0,0.4)]">
                    {pillar.title}
                  </h3>
                </div>
              </div>
            </div>

            {/* Open-state: title below the image, then description */}
            <div className={`grid transition-[grid-template-rows] duration-500 ease-out ${active ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'}`}>
              <div className="overflow-hidden min-h-0">
                <div className="px-3.5 py-3.5">
                  <h3 className="text-ink font-semibold text-base tracking-[-0.01em] mb-1.5">
                    {pillar.title}
                  </h3>
                  <p className="text-sm text-[rgba(30,24,84,0.65)] leading-relaxed">
                    {pillar.description}
                  </p>
                </div>
              </div>
            </div>
          </button>
        );
      })}
    </div>
  );
}
