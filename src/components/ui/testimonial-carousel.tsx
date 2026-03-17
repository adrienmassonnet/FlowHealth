'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { AnimatePresence, motion } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { Testimonial } from '@/lib/contentful';

// Static portrait images paired with testimonials (Contentful testimonials have no imageUrl)
const IMAGES = [
  'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&q=80&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=600&q=80&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=600&q=80&auto=format&fit=crop',
];

const TRANSITION = { duration: 0.55, ease: [0.25, 0.1, 0.1, 1] as const };

export function TestimonialCarousel({ testimonials }: { testimonials: Testimonial[] }) {
  const [current, setCurrent] = useState(0);

  if (!testimonials.length) return null;

  const t = testimonials[current];
  const imageUrl = IMAGES[current % IMAGES.length];
  const prev = () => setCurrent((i) => (i - 1 + testimonials.length) % testimonials.length);
  const next = () => setCurrent((i) => (i + 1) % testimonials.length);

  return (
    <div className="w-full max-w-[920px] mx-auto">

      {/* Desktop: image left, card overlapping right */}
      <div className="hidden md:flex relative items-stretch">
        {/* Image */}
        <div className="w-[380px] shrink-0 rounded-2xl overflow-hidden relative" style={{ minHeight: 440 }}>
          <AnimatePresence mode="wait">
            <motion.div
              key={imageUrl}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={TRANSITION}
              className="absolute inset-0"
            >
              <Image
                src={imageUrl}
                alt={t.authorName}
                fill
                className="object-cover"
                sizes="380px"
              />
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Card — overlaps image by 56px */}
        <div className="relative z-10 -ml-14 my-8 bg-[#F7F4EF] rounded-2xl px-9 py-9 flex-1 flex flex-col justify-center shadow-[0_12px_48px_rgba(0,0,0,0.32)]">
          <AnimatePresence mode="wait">
            <motion.div
              key={t.authorName}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={TRANSITION}
            >
              <p className="text-[52px] leading-none text-[#1E1854]/10 font-serif select-none -mt-2 mb-1">&ldquo;</p>
              <blockquote className="text-base font-medium text-[#1E1854]/80 leading-[1.75] tracking-[-0.01em] mb-8">
                {t.quote}
              </blockquote>
              <div className="flex items-center gap-3">
                <span className="block w-5 h-px bg-[#1E1854]/20 shrink-0" />
                <div>
                  <p className="text-sm font-semibold text-[#1E1854] tracking-[-0.01em]">{t.authorName}</p>
                  <p className="text-xs text-[#1E1854]/45 tracking-[0.04em] mt-0.5">{t.authorRole}</p>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Mobile: portrait above, text below */}
      <div className="md:hidden">
        <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden mb-7">
          <AnimatePresence mode="wait">
            <motion.div
              key={imageUrl}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={TRANSITION}
              className="absolute inset-0"
            >
              <Image src={imageUrl} alt={t.authorName} fill className="object-cover" sizes="100vw" />
            </motion.div>
          </AnimatePresence>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={t.authorName}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={TRANSITION}
            className="text-center px-2"
          >
            <p className="text-[44px] leading-none text-white/12 font-serif select-none mb-1">&ldquo;</p>
            <blockquote className="text-base font-medium text-white/80 leading-[1.75] mb-6">{t.quote}</blockquote>
            <span className="block w-5 h-px bg-white/20 mx-auto mb-3" />
            <p className="text-sm font-semibold text-white/75">{t.authorName}</p>
            <p className="text-xs text-white/35 tracking-[0.04em] mt-1">{t.authorRole}</p>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Navigation */}
      <div className="flex flex-col items-center gap-6 mt-10">
        <div className="flex items-center gap-5">
          <button
            onClick={prev}
            aria-label="Previous testimonial"
            className="w-10 h-10 rounded-full bg-white/8 border border-white/10 flex items-center justify-center hover:bg-white/14 transition-colors duration-200"
          >
            <ChevronLeft className="w-4 h-4 text-white/60" />
          </button>

          <div className="flex items-center gap-2">
            {testimonials.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrent(i)}
                aria-label={`Go to testimonial ${i + 1}`}
                className={cn(
                  'rounded-full transition-all duration-400',
                  i === current
                    ? 'w-5 h-[7px] bg-white/70'
                    : 'w-[7px] h-[7px] bg-white/22 hover:bg-white/38'
                )}
              />
            ))}
          </div>

          <button
            onClick={next}
            aria-label="Next testimonial"
            className="w-10 h-10 rounded-full bg-white/8 border border-white/10 flex items-center justify-center hover:bg-white/14 transition-colors duration-200"
          >
            <ChevronRight className="w-4 h-4 text-white/60" />
          </button>
        </div>

        <Link
          href="/pages/reviews"
          className="text-xs tracking-[0.1em] uppercase text-white/35 hover:text-white/60 transition-colors duration-300"
        >
          Read all reviews →
        </Link>
      </div>
    </div>
  );
}
