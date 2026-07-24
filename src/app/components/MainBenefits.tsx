'use client';

import { useRef, useState } from 'react';
import Image from 'next/image';
import { AnimatePresence, motion, useInView } from 'framer-motion';
import { trackEvent } from '@/lib/clarity';
import type { HealthBenefit } from '@/lib/content';
import { EASE, DURATION, VIEWPORT } from '@/lib/animation';

export default function MainBenefits({ benefits }: { benefits: HealthBenefit[] }) {
  const [active, setActive] = useState(0);
  const [modal, setModal] = useState<HealthBenefit | null>(null);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-8% 0px' });
  const step = benefits[Math.max(0, active)];

  if (!step) return null;

  return (
    <section ref={ref} className="flow-container pt-4 pb-30 md:pt-8">
      <div className="mb-6 space-y-2">
        <h2 className="flow-h2">Main benefits</h2>
      </div>

      {/* Mobile: 2-col card grid */}
      <div className="md:hidden grid grid-cols-2 gap-3 pb-4">
        {benefits.map((b) => (
          <div
            key={b.label}
            className="relative rounded-2xl overflow-hidden cursor-pointer group h-[126px] bg-ink"
            onClick={() => { setModal(b); trackEvent('product_page_benefit_card_open'); }}
          >
            {b.imageUrl ? (
              <Image
                src={b.imageUrl}
                alt={b.imageAlt || b.label}
                fill
                className="object-cover object-center transition-transform duration-700 ease-[cubic-bezier(0.25,0.1,0.1,1)] group-hover:scale-[1.04]"
                sizes="50vw"
              />
            ) : (
              <div className="absolute inset-0 bg-gradient-to-br from-ink to-[#2d2a7a]" />
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
            {/* Tap affordance — without this the cards read as static imagery */}
            <span className="absolute top-2.5 right-2.5 w-6 h-6 rounded-full bg-white/20 backdrop-blur-sm border border-white/30 flex items-center justify-center">
              <svg width="11" height="11" viewBox="0 0 11 11" fill="none" aria-hidden="true">
                <path d="M5.5 1.5v8M1.5 5.5h8" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
            </span>
            <div className="absolute bottom-0 left-0 right-0 p-4">
              <h3 className="flow-h5 text-white drop-shadow-[0_1px_4px_rgba(0,0,0,0.6)]">{b.label}</h3>
            </div>
          </div>
        ))}
      </div>

      {/* Desktop: selector + image panel */}
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
                  bg-ink/[0.05] border-2 transition-[border-color,transform,box-shadow] duration-500
                  hover:scale-[1.02] active:scale-[0.97]
                  ${i === benefits.length - 1 && benefits.length % 2 !== 0 ? 'col-span-2' : ''}
                  ${isActive
                    ? 'border-brand/60 shadow-[0_4px_16px_rgba(30,24,84,0.30)]'
                    : 'border-transparent hover:border-ink/20'
                  }
                `}
              >
                <span
                  className={`absolute inset-0 bg-gradient-to-br from-brand to-ink transition-opacity duration-500 ${
                    isActive ? 'opacity-100' : 'opacity-0'
                  }`}
                />
                <span className={`relative z-10 text-xs font-semibold leading-snug transition-colors duration-500 ${
                  isActive ? 'text-white' : 'text-ink/75'
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
                alt={b.imageAlt || b.label}
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

          <div
            key={active}
            className="absolute inset-0 flex flex-col justify-end p-9"
            style={{ animation: `hbFadeUp ${DURATION.base}s cubic-bezier(0.16, 1, 0.3, 1) forwards` }}
          >
            <h3 className="flow-h2 text-white mb-1.5">
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
        {modal && (
          <motion.div
            className="fixed inset-0 z-50 sm:flex sm:items-center sm:justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: DURATION.fast }}
            onClick={() => setModal(null)}
          >
            <div className="absolute inset-0 bg-ink/60 backdrop-blur-sm" />
            <motion.div
              className="absolute bottom-0 left-0 right-0 sm:relative sm:bottom-auto sm:left-auto sm:right-auto sm:w-full sm:max-w-md bg-white rounded-t-3xl sm:rounded-3xl shadow-2xl flex flex-col max-h-[90svh]"
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ duration: DURATION.slow, ease: EASE.expoOut }}
              onClick={(e) => e.stopPropagation()}
            >
              {modal.imageUrl && (
                <div className="relative w-full h-28 sm:h-40 shrink-0 overflow-hidden rounded-t-3xl">
                  <Image
                    src={modal.imageUrl}
                    alt={modal.imageAlt || modal.label}
                    fill
                    className="object-cover object-center"
                    sizes="448px"
                  />
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-white/90" />
                </div>
              )}
              <button
                onClick={() => setModal(null)}
                aria-label="Close"
                className="absolute top-3 right-4 z-10 w-8 h-8 flex items-center justify-center rounded-full bg-white/80 backdrop-blur-sm text-ink/50 hover:text-ink hover:bg-white transition-colors duration-200"
              >
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <path d="M11 3L3 11M3 3l8 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                </svg>
              </button>
              <div className="flex-1 px-7 pt-4 overflow-y-auto" style={{ paddingBottom: 'max(2rem, env(safe-area-inset-bottom))' }}>
                <h3 className="text-xl font-semibold text-ink tracking-[-0.02em] leading-snug mb-3">{modal.label}</h3>
                <p className="text-sm text-ink/65 leading-relaxed mb-4">{modal.description}</p>
                {modal.ingredients && (
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {modal.ingredients.split(',').map((ing) => (
                      <span key={ing} className="text-xs tracking-wide px-2.5 py-1 rounded-full bg-brand/8 text-brand font-medium border border-brand/15">
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
