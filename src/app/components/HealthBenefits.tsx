'use client';

import { useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { trackEvent } from '@/lib/clarity';
import type { HealthBenefit } from '@/lib/content';
import { EASE, DURATION } from '@/lib/animation';

interface Props {
  benefits: HealthBenefit[];
  sectionLabel?: string;
  heading?: string;
}

export default function HealthBenefits({ benefits, sectionLabel, heading }: Props) {
  const [active, setActive] = useState(0);
  const [modalBenefit, setModalBenefit] = useState<HealthBenefit | null>(null);
  const step = benefits[Math.max(0, active)];
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-8% 0px' });

  if (!step) return null;

  return (
    <section ref={ref} className="max-w-[1200px] mx-auto px-6 py-14 md:py-24">
      {/* Header */}
      <div className="mb-6 md:mb-8 space-y-1.5">
        <p className="text-xs tracking-[0.16em] uppercase font-semibold bg-gradient-to-r from-[#3B38B8] to-[#1E1854] bg-clip-text text-transparent">
          {sectionLabel || 'Health Benefits'}
        </p>
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold tracking-[-0.02em] leading-tight">
          {heading || 'Everything your body needs.\nNothing it doesn\'t.'}
        </h2>
      </div>

      {/* Mobile: 2-col card grid */}
      <div className="md:hidden grid grid-cols-2 gap-3">
        {benefits.map((s, i) => (
          <button
            key={s.number}
            onClick={() => setModalBenefit(s)}
            className="relative rounded-2xl overflow-hidden aspect-[3/2.7] text-left border border-[#1E1854]/10 shadow-[0_2px_12px_rgba(30,24,84,0.07)] group"
          >
            {s.imageUrl && (
              <Image
                src={s.imageUrl}
                alt={s.title}
                fill
                loading={i === 0 ? 'eager' : 'lazy'}
                className="object-cover object-center transition-transform duration-500 group-active:scale-[1.03]"
                sizes="50vw"
              />
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-black/10" />

            {/* Expand icon */}
            <span className="absolute top-2.5 right-2.5 w-6 h-6 rounded-full bg-white/25 backdrop-blur-sm border border-white/30 flex items-center justify-center">
              <svg width="10" height="10" viewBox="0 0 10 10" fill="none" stroke="white" strokeWidth="1.5" strokeLinecap="round">
                <line x1="5" y1="1" x2="5" y2="9"/><line x1="1" y1="5" x2="9" y2="5"/>
              </svg>
            </span>

            {/* Title */}
            <div className="absolute bottom-0 left-0 right-0 p-3">
              <p className="text-sm font-bold text-white leading-snug drop-shadow-[0_1px_3px_rgba(0,0,0,0.5)]">{s.title}</p>
            </div>
          </button>
        ))}
      </div>

      {/* Desktop: 2-col selector + image panel */}
      <div className="hidden md:grid grid-cols-[320px_1fr] gap-6 items-stretch">

        {/* Left — selector */}
        <motion.div
          className="grid grid-cols-2 gap-2"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: DURATION.slow, ease: EASE.expoOut }}
        >
          {benefits.map((s, i) => {
            const isActive = active === i;
            return (
              <motion.button
                key={s.number}
                onClick={() => setActive(i)}
                initial={{ opacity: 0 }}
                animate={inView ? { opacity: 1 } : {}}
                transition={{ duration: DURATION.base, delay: 0.05 + i * 0.04, ease: EASE.expoOut }}
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
          className="relative rounded-2xl overflow-hidden min-h-[446px]"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: DURATION.slow, delay: 0.1, ease: EASE.expoOut }}
        >
          {benefits.map((b, i) =>
            b.imageUrl ? (
              <Image
                key={i}
                src={b.imageUrl}
                alt={b.title}
                fill
                loading={i === 0 ? 'eager' : 'lazy'}
                className={`object-cover transition-opacity duration-500 ease-in-out ${
                  i === active ? 'opacity-100' : 'opacity-0'
                }`}
                sizes="60vw"
              />
            ) : null
          )}

          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

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

          <div
            key={active}
            className="absolute inset-0 flex flex-col justify-end p-9"
            style={{ animation: `hbFadeUp ${DURATION.base}s cubic-bezier(0.16, 1, 0.3, 1) forwards` }}
          >
            <h3 className="text-3xl md:text-4xl font-semibold text-white tracking-[-0.02em] leading-snug mb-1.5">
              {step.title}
            </h3>
            <p className="text-sm text-white/90 leading-relaxed mb-3">
              {step.description}
            </p>
            {step.ingredients && (
              <div className="flex flex-wrap gap-1.5">
                {step.ingredients.split(',').map((ing) => (
                  <span key={ing} className="text-xs tracking-wide px-2.5 py-1 rounded-full bg-white/15 backdrop-blur-sm text-white/90 font-medium border border-white/20">
                    {ing.trim()}
                  </span>
                ))}
              </div>
            )}
          </div>
        </motion.div>

      </div>

      {/* Mobile benefit modal */}
      <AnimatePresence>
        {modalBenefit && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: DURATION.fast }}
            className="md:hidden fixed inset-0 z-50 flex items-end justify-center"
            onClick={() => setModalBenefit(null)}
          >
            <div className="absolute inset-0 bg-[#1E1854]/60 backdrop-blur-sm" />
            <motion.div
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ duration: DURATION.slow, ease: EASE.expoOut }}
              className="relative w-full bg-white rounded-t-3xl shadow-2xl flex flex-col max-h-[90svh]"
              onClick={(e) => e.stopPropagation()}
            >
              {modalBenefit.imageUrl && (
                <div className="relative w-full h-40 shrink-0 overflow-hidden rounded-t-3xl">
                  <Image
                    src={modalBenefit.imageUrl}
                    alt={modalBenefit.title}
                    fill
                    className="object-cover"
                    sizes="100vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-white/90" />
                </div>
              )}
              <button
                onClick={() => setModalBenefit(null)}
                aria-label="Close"
                className="absolute top-3 right-4 z-10 w-8 h-8 flex items-center justify-center rounded-full bg-white/80 backdrop-blur-sm text-[#1E1854]/50 hover:text-[#1E1854] transition-colors duration-200"
              >
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <path d="M11 3L3 11M3 3l8 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                </svg>
              </button>
              <div className="flex-1 px-6 pt-4 overflow-y-auto" style={{ paddingBottom: 'max(2rem, env(safe-area-inset-bottom))' }}>
                <h3 className="text-xl font-semibold text-[#1E1854] tracking-[-0.02em] leading-snug mb-2">{modalBenefit.title}</h3>
                <p className="text-sm text-[#1E1854]/65 leading-relaxed mb-4">{modalBenefit.description}</p>
                {modalBenefit.ingredients && (
                  <div className="flex flex-wrap gap-1.5">
                    {modalBenefit.ingredients.split(',').map((ing) => (
                      <span key={ing} className="text-xs tracking-wide px-2.5 py-1 rounded-full bg-[#3B38B8]/8 text-[#3B38B8] font-medium border border-[#3B38B8]/15">
                        {ing.trim()}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
