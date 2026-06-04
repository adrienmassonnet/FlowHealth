'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { AnimatePresence, motion } from 'framer-motion';
import { trackEvent } from '@/lib/clarity';
import type { HealthBenefit } from '@/lib/content';

export default function MainBenefits({ benefits }: { benefits: HealthBenefit[] }) {
  const [modal, setModal] = useState<HealthBenefit | null>(null);

  return (
    <section className="max-w-[1200px] mx-auto px-6 pt-4 pb-20 md:pt-8">
      <div className="mb-6 space-y-2">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold tracking-[-0.02em] leading-[1.08]">Main benefits</h2>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 pb-4">
        {benefits.map((b) => (
          <div
            key={b.label}
            className="relative rounded-2xl overflow-hidden cursor-pointer group h-[180px] md:h-[clamp(180px,22vh,280px)] bg-[#1E1854]"
            onClick={() => { setModal(b); trackEvent('product_page_benefit_card_open'); }}
          >
            {b.imageUrl ? (
              <Image
                src={b.imageUrl}
                alt={b.imageAlt || b.label}
                fill
                className="object-cover object-center transition-transform duration-700 ease-[cubic-bezier(0.25,0.1,0.1,1)] group-hover:scale-[1.04]"
                sizes="(max-width: 768px) 50vw, 25vw"
              />
            ) : (
              <div className="absolute inset-0 bg-gradient-to-br from-[#1E1854] to-[#2d2a7a]" />
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-4">
              <h3 className="text-sm font-semibold text-white leading-snug drop-shadow-[0_1px_4px_rgba(0,0,0,0.6)]">{b.label}</h3>
            </div>
          </div>
        ))}
      </div>

      {/* Benefit modal */}
      <AnimatePresence>
      {modal && (
        <motion.div
          className="fixed inset-0 z-50 sm:flex sm:items-center sm:justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          onClick={() => setModal(null)}
        >
          <div className="absolute inset-0 bg-[#1E1854]/60 backdrop-blur-sm" />
          <motion.div
            className="absolute bottom-0 left-0 right-0 sm:relative sm:bottom-auto sm:left-auto sm:right-auto sm:w-full sm:max-w-md bg-white rounded-t-3xl sm:rounded-3xl shadow-2xl flex flex-col max-h-[90svh]"
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ duration: 0.42, ease: [0.22, 1, 0.36, 1] }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Image */}
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

            {/* Close */}
            <button
              onClick={() => setModal(null)}
              aria-label="Close"
              className="absolute top-3 right-4 z-10 w-8 h-8 flex items-center justify-center rounded-full bg-white/80 backdrop-blur-sm text-[#1E1854]/50 hover:text-[#1E1854] hover:bg-white transition-colors duration-200"
            >
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M11 3L3 11M3 3l8 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
              </svg>
            </button>

            {/* Content */}
            <div className="flex-1 px-7 pt-4 overflow-y-auto" style={{ paddingBottom: 'max(2rem, env(safe-area-inset-bottom))' }}>
              <h3 className="text-xl font-semibold text-[#1E1854] tracking-[-0.02em] leading-snug mb-3">{modal.label}</h3>
              <p className="text-sm text-[#1E1854]/65 leading-relaxed mb-4">{modal.description}</p>
              {modal.ingredients && (
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {modal.ingredients.split(',').map((ing) => (
                    <span key={ing} className="text-xs tracking-wide px-2.5 py-1 rounded-full bg-[#3B38B8]/8 text-[#3B38B8] font-medium border border-[#3B38B8]/15">
                      {ing.trim()}
                    </span>
                  ))}
                </div>
              )}
              {modal.blogSlug && (
                <Link
                  href={`/pages/blog-posts/${modal.blogSlug}`}
                  onClick={() => { setModal(null); trackEvent('homepage_benefit_article_link'); }}
                  className="inline-flex items-center gap-1.5 mt-5 text-xs tracking-[0.08em] uppercase font-medium text-[#3B38B8] hover:opacity-75 transition-opacity"
                >
                  Read the science
                  <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                    <path d="M2 5h6M5 2l3 3-3 3" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </Link>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
      </AnimatePresence>
    </section>
  );
}
