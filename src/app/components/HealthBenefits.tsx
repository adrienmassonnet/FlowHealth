'use client';

import { useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, useInView } from 'framer-motion';
import { trackEvent } from '@/lib/clarity';
import type { HealthBenefit } from '@/lib/content';

const ease = [0.25, 0.1, 0.1, 1] as const;

interface Props {
  benefits: HealthBenefit[];
  sectionLabel?: string;
  heading?: string;
}

export default function HealthBenefits({ benefits, sectionLabel, heading }: Props) {
  const [active, setActive] = useState(0);
  const step = benefits[active];
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-8% 0px' });

  if (!step) return null;

  return (
    <section ref={ref} className="max-w-[1200px] mx-auto px-6 py-14">
      {/* Header */}
      <div className="mb-8 space-y-1.5">
        <p className="text-xs tracking-[0.16em] uppercase font-semibold bg-gradient-to-r from-[#3B38B8] to-[#1E1854] bg-clip-text text-transparent">
          {sectionLabel || 'Health Benefits'}
        </p>
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold tracking-[-0.02em] leading-tight">
          {heading || 'Everything your body needs.\nNothing it doesn\'t.'}
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-[320px_1fr] gap-6 items-stretch">

        {/* Left — benefit selector */}
        <motion.div
          className="grid grid-cols-2 gap-2"
          initial={{ opacity: 0, x: -24 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.8, ease }}
        >
          {benefits.map((s, i) => {
            const isActive = active === i;
            return (
              <motion.button
                key={s.number}
                onClick={() => setActive(i)}
                initial={{ opacity: 0, y: 16 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.1 + i * 0.07, ease }}
                className={`
                  relative flex flex-col items-center justify-center gap-2 px-3 py-4 text-center
                  rounded-xl w-full overflow-hidden
                  bg-[#1E1854]/[0.05] border-2 transition-[border-color,transform,box-shadow] duration-500
                  hover:scale-[1.02] active:scale-[0.97]
                  ${i === benefits.length - 1 && benefits.length % 2 !== 0 ? 'col-span-2' : ''}
                  ${isActive
                    ? 'border-[#3B38B8]/60 shadow-[0_4px_16px_rgba(30,24,84,0.30)]'
                    : 'border-transparent hover:border-[#1E1854]/20'
                  }
                `}
              >
                {/* Gradient fill — opacity-controlled so it crossfades smoothly */}
                <span
                  className={`absolute inset-0 bg-gradient-to-br from-[#3B38B8] to-[#1E1854] transition-opacity duration-500 ${
                    isActive ? 'opacity-100' : 'opacity-0'
                  }`}
                />
                <span className={`relative z-10 text-xs font-semibold leading-snug transition-colors duration-500 ${
                  isActive ? 'text-white' : 'text-[#1E1854]/75'
                }`}>
                  {s.label}
                </span>
              </motion.button>
            );
          })}
        </motion.div>

        {/* Right — detail image panel */}
        <motion.div
          className="relative rounded-2xl overflow-hidden min-h-[428px] md:min-h-[446px]"
          initial={{ opacity: 0, scale: 0.94 }}
          animate={inView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.9, delay: 0.12, ease }}
        >

          {/* All images stacked — crossfade via opacity transition */}
          {benefits.map((b, i) =>
            b.imageUrl ? (
              <Image
                key={i}
                src={b.imageUrl}
                alt={b.title}
                fill
                className={`object-cover transition-opacity duration-700 ease-in-out ${
                  i === active ? 'opacity-100' : 'opacity-0'
                }`}
                sizes="(max-width: 768px) 100vw, 60vw"
              />
            ) : null
          )}

          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

          {/* Article icon */}
          {step.blogSlug && (
            <Link
              href={`/pages/blog-posts/${step.blogSlug}`}
              onClick={() => trackEvent('homepage_benefit_article_link')}
              className="absolute top-4 right-4 z-10 flex items-center gap-1.5 bg-white/15 backdrop-blur-sm hover:bg-white/25 transition-colors px-3 py-1.5 rounded-full"
              title="Read article"
            >
              <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                <polyline points="14 2 14 8 20 8"/>
                <line x1="16" y1="13" x2="8" y2="13"/>
                <line x1="16" y1="17" x2="8" y2="17"/>
              </svg>
              <span className="text-xs font-medium tracking-[0.06em] uppercase text-white/80">Article</span>
            </Link>
          )}

          {/* Content — re-animates on each switch via key */}
          <div
            key={active}
            className="absolute inset-0 flex flex-col justify-end p-7 md:p-9"
            style={{ animation: 'hbFadeUp 0.5s cubic-bezier(0.25, 0.1, 0.1, 1) forwards' }}
          >
            <h3 className="text-2xl sm:text-3xl md:text-4xl font-semibold text-white tracking-[-0.02em] leading-snug mb-2">
              {step.title}
            </h3>
            <p className="text-sm text-white/90 leading-relaxed mb-5">
              {step.description}
            </p>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
