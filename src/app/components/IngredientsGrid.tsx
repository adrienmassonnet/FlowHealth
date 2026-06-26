'use client';

import { useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, useInView } from 'framer-motion';
import { EASE, DURATION, VARIANTS } from '@/lib/animation';

interface Ingredient {
  name: string;
  imageUrl?: string;
  benefit?: string;
  blogSlug?: string;
}

interface Props {
  ingredients: Ingredient[];
  sizes: string;
  labelClassName?: string;
  gridClassName?: string;
}

export default function IngredientsGrid({ ingredients, sizes, labelClassName = 'px-3 py-2.5 text-xs', gridClassName = 'grid-cols-2' }: Props) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-8% 0px' });

  return (
    <div ref={ref} className={`grid gap-3 w-full ${gridClassName}`}>
      {ingredients.map((ing, i) => (
        <motion.div
          key={ing.name}
          className="flex flex-col"
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          variants={VARIANTS.fadeUp}
          transition={{ duration: DURATION.slow, delay: i * 0.08, ease: EASE.expoOut }}
        >
          {/* Image card — z-10 sits on top of the benefit tag below */}
          <div className="group relative rounded-2xl overflow-hidden aspect-[4/3] shadow-[0_4px_16px_rgba(0,0,0,0.12)] z-10 cursor-pointer">
            {ing.imageUrl && (
              <Image
                src={ing.imageUrl}
                alt={ing.name}
                fill
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                sizes={sizes}
              />
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent transition-opacity duration-500 group-hover:opacity-80" />
            <div className={`absolute bottom-0 left-0 right-0 flex items-end justify-between ${labelClassName}`}>
              <p className="font-semibold text-white tracking-[-0.01em]">
                {ing.name}
              </p>
              {ing.blogSlug && (
                <Link
                  href={`/pages/blog-posts/${ing.blogSlug}`}
                  aria-label={`Read about ${ing.name}`}
                  className="shrink-0 w-5 h-5 rounded-full border border-white/40 flex items-center justify-center text-white/50 transition-all duration-300 group-hover:border-white group-hover:text-white group-hover:bg-white/15 group-hover:scale-110"
                >
                  <svg width="8" height="8" viewBox="0 0 8 8" fill="none">
                    <path d="M4 1v6M1 4h6" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
                  </svg>
                </Link>
              )}
            </div>
          </div>

          {/* Benefit tag — tucked behind the image via -mt + pt, slides out below */}
          {ing.benefit && (
            <div className="relative z-0 flex-1 -mt-3 pt-5 pb-3 px-4 bg-[#E3E1F4] rounded-b-2xl shadow-[0_8px_20px_rgba(30,24,84,0.18),0_2px_6px_rgba(30,24,84,0.10)]">
              <p className="text-xs sm:text-sm font-semibold tracking-[-0.01em] leading-snug bg-gradient-to-r from-[#3B38B8] to-[#1E1854] bg-clip-text text-transparent">
                {ing.benefit}
              </p>
            </div>
          )}
        </motion.div>
      ))}
    </div>
  );
}