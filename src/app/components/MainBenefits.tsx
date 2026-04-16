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
    <section className="max-w-[1200px] mx-auto px-6 pt-4 pb-16">
      <div className="mb-8 space-y-1">
        <p className="text-xs tracking-[0.16em] uppercase font-semibold bg-gradient-to-r from-[#3B38B8] to-[#1E1854] bg-clip-text text-transparent">Why Flow</p>
        <h2 className="text-3xl font-semibold tracking-[-0.02em]">Main benefits</h2>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {benefits.map((b) => (
          <div
            key={b.label}
            className="relative rounded-2xl overflow-hidden cursor-pointer group h-[240px] md:h-[290px] bg-[#1E1854]"
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
          className="fixed inset-0 z-50 flex items-end sm:items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          onClick={() => setModal(null)}
        >
          <div className="absolute inset-0 bg-[#1E1854]/60 backdrop-blur-sm" />
          <motion.div
            className="relative w-full sm:max-w-md bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
            initial={{ y: 48, opacity: 0, scale: 0.97 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: 32, opacity: 0, scale: 0.97 }}
            transition={{ duration: 0.38, ease: [0.25, 0.1, 0.1, 1] }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Image */}
            {modal.imageUrl && (
              <div className="relative w-full h-44 shrink-0 overflow-hidden">
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
              className="absolute top-4 right-4 z-10 w-8 h-8 flex items-center justify-center rounded-full bg-white/80 backdrop-blur-sm text-[#1E1854]/50 hover:text-[#1E1854] hover:bg-white transition-colors duration-200"
            >
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M11 3L3 11M3 3l8 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
              </svg>
            </button>

            {/* Content */}
            <div className="px-7 pt-4 pb-8 overflow-y-auto">
              <h3 className="text-xl font-semibold text-[#1E1854] tracking-[-0.02em] leading-snug mb-3">{modal.label}</h3>
              <p className="text-sm text-[#1E1854]/65 leading-relaxed">{modal.description}</p>
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
