'use client';

import { motion } from 'framer-motion';
import { EASE } from '@/lib/animation';

export function HeroText({ children, delay = 0, className }: { children: React.ReactNode; delay?: number; className?: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 22, filter: 'blur(4px)' }}
      animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
      transition={{ duration: 1.1, delay: delay / 1000, ease: EASE.expoOut }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function TrustCard({ children, delay = 0, className }: { children: React.ReactNode; delay?: number; className?: string }) {
  return (
    <motion.div
      variants={VARIANTS.fadeBlur}
      initial="hidden"
      whileInView="visible"
      viewport={{ ...VIEWPORT, amount: 0.3 }}
      transition={{ duration: DURATION.xslow, ease: T.slow.ease, delay: delay / 1000 }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
