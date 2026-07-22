'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { AnimatePresence, motion } from 'framer-motion';
import { EASE, DURATION } from '@/lib/animation';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import type { Testimonial } from '@/lib/content';
import { trackEvent } from '@/lib/clarity';
import { CarouselDots } from '@/components/ui/carousel-dots';

// Static portrait images paired with testimonials (Contentful testimonials have no imageUrl)
const IMAGES = [
  'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&q=80&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=600&q=80&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=600&q=80&auto=format&fit=crop',
];

const TRANSITION = { duration: DURATION.slow, ease: EASE.expoOut };

export function TestimonialCarousel({ testimonials }: { testimonials: Testimonial[] }) {
  const [current, setCurrent] = useState(0);

  if (!testimonials.length) return null;

  const t = testimonials[current];
  const imageUrl = IMAGES[current % IMAGES.length];
  const prev = () => { setCurrent((i) => (i - 1 + testimonials.length) % testimonials.length); trackEvent('product_reviews_carousel_prev'); };
  const next = () => { setCurrent((i) => (i + 1) % testimonials.length); trackEvent('product_reviews_carousel_next'); };

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
              <p className="text-[52px] leading-none text-ink/10 font-serif select-none -mt-2 mb-1">&ldquo;</p>
              <blockquote className="text-base font-medium text-ink/75 leading-[1.75] tracking-[-0.01em] mb-8">
                {t.quote}
              </blockquote>
              <div className="flex items-center gap-3">
                <span className="block w-5 h-px bg-ink/20 shrink-0" />
                <div>
                  <p className="text-sm font-semibold text-ink tracking-[-0.01em]">{t.authorName}</p>
                  <p className="text-xs text-ink/45 tracking-[0.04em] mt-0.5">{t.authorRole}</p>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Mobile: compact card */}
      <div className="md:hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={t.authorName}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={TRANSITION}
            className="bg-white border border-ink/[12.5%] rounded-2xl px-6 py-6 text-center"
          >
            <p className="text-[28px] leading-none text-ink/10 font-serif select-none mb-1">&ldquo;</p>
            <blockquote className="text-sm font-medium text-ink/75 leading-[1.7] mb-5">{t.quote}</blockquote>
            <div className="flex items-center justify-center gap-3 mb-1">
              <div className="relative w-9 h-9 rounded-full overflow-hidden shrink-0">
                <Image src={imageUrl} alt={t.authorName} fill className="object-cover" sizes="36px" />
              </div>
              <div className="text-left">
                <p className="text-xs font-semibold text-ink">{t.authorName}</p>
                {t.authorRole && <p className="text-xs text-ink/45 tracking-[0.03em] mt-0.5">{t.authorRole}</p>}
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Navigation */}
      <div className="flex flex-col items-center gap-4 md:gap-6 mt-5 md:mt-10">
        <div className="flex items-center gap-5">
          <button
            onClick={prev}
            aria-label="Previous testimonial"
            className="w-10 h-10 rounded-full bg-ink/[0.06] border border-ink/10 flex items-center justify-center hover:bg-ink/10 transition-colors duration-200"
          >
            <ChevronLeft className="w-4 h-4 text-ink/50" />
          </button>

          <CarouselDots
            count={testimonials.length}
            current={current}
            onDotClick={setCurrent}
            variant="dark"
          />

          <button
            onClick={next}
            aria-label="Next testimonial"
            className="w-10 h-10 rounded-full bg-ink/[0.06] border border-ink/10 flex items-center justify-center hover:bg-ink/10 transition-colors duration-200"
          >
            <ChevronRight className="w-4 h-4 text-ink/50" />
          </button>
        </div>

        <Link
          href="/pages/reviews"
          onClick={() => trackEvent('homepage_reviews_read_all')}
          className="text-xs tracking-[0.1em] uppercase text-ink/35 hover:text-ink/60 transition-colors duration-300"
        >
          Read all reviews →
        </Link>
      </div>
    </div>
  );
}
