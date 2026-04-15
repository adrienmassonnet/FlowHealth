'use client';

import { useRef } from 'react';
import Image from 'next/image';
import { motion, useInView } from 'framer-motion';
import TrackedLink from '@/app/components/TrackedLink';
import VennSVG from '@/app/components/VennSVG';

const ease = [0.25, 0.1, 0.1, 1] as const;

interface Props {
  vennBackgroundImageUrl: string;
  vennHeading: string;
  activeIngredients: number;
}

export default function VennCard({ vennBackgroundImageUrl, vennHeading, activeIngredients }: Props) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-8% 0px' });

  return (
    <motion.div
      ref={ref}
      className="relative overflow-hidden rounded-2xl py-16 md:py-20"
      initial={{ opacity: 0, scale: 0.96, y: 24 }}
      animate={inView ? { opacity: 1, scale: 1, y: 0 } : {}}
      transition={{ duration: 1.0, ease }}
    >
      <Image
        src={vennBackgroundImageUrl || '/venn-bg.png'}
        alt="Flow Health formula"
        fill
        className="object-cover"
        sizes="1200px"
      />
      <div className="absolute inset-0 bg-[#1E1854]/78" />
      <div className="relative z-10 px-6 md:px-12 grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 items-center">

        {/* Mobile: heading shown first */}
        <motion.div
          className="space-y-5 md:hidden"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.85, ease }}
        >
          <p className="text-xs tracking-[0.16em] uppercase text-white/35 font-medium">The formula</p>
          <h2 className="text-2xl sm:text-3xl font-semibold leading-tight tracking-[-0.03em] text-white">
            {vennHeading}
          </h2>
          <TrackedLink
            href="/pages/our-product"
            clarityEvent="homepage_venn_read_more_product"
            className="inline-flex items-center gap-2 text-xs tracking-[0.08em] uppercase font-medium text-white/45 hover:text-white transition-colors duration-200"
          >
            Read more about our product
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
              <path d="M2.5 6H9.5M6.5 3L9.5 6L6.5 9" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </TrackedLink>
        </motion.div>

        {/* Venn SVG — driven by shared inView trigger */}
        <VennSVG activeIngredients={activeIngredients} inView={inView} />

        {/* Desktop: heading on right */}
        <motion.div
          className="hidden md:block space-y-5"
          initial={{ opacity: 0, x: 32 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.85, ease }}
        >
          <p className="text-xs tracking-[0.16em] uppercase text-white/35 font-medium">The formula</p>
          <h2 className="text-3xl md:text-4xl font-semibold leading-tight tracking-[-0.03em] text-white">
            {vennHeading}
          </h2>
          <TrackedLink
            href="/pages/our-product"
            clarityEvent="homepage_formula_read_more_product"
            className="inline-flex items-center gap-2 text-xs tracking-[0.08em] uppercase font-medium text-white/45 hover:text-white transition-colors duration-200"
          >
            Read more about our product
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
              <path d="M2.5 6H9.5M6.5 3L9.5 6L6.5 9" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </TrackedLink>
        </motion.div>

      </div>
    </motion.div>
  );
}
