'use client';

import { motion } from 'framer-motion';
import type { ReactNode } from 'react';
import { VARIANTS, VIEWPORT, T } from '@/lib/animation';

type Variant = keyof typeof VARIANTS;

interface Props {
  children: ReactNode;
  className?: string;
  variant?: Variant;
  delay?: number;
  duration?: number;
}

export default function ScrollReveal({
  children,
  className,
  variant = 'fadeUp',
  delay = 0,
  duration = T.base.duration,
}: Props) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={VIEWPORT}
      variants={VARIANTS[variant]}
      transition={{ duration, delay, ease: T.base.ease }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
