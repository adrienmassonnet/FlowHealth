'use client';

import { motion } from 'framer-motion';
import { EASE, VARIANTS, VIEWPORT, DURATION, T } from '@/lib/animation';
import { useSectionProp } from '@/lib/section-animation-context';

export function HeroText({ children, delayPropId, className }: { children: React.ReactNode; delayPropId: 'headline1Delay' | 'headline2Delay' | 'ctaDelay'; className?: string }) {
  const entranceDuration = useSectionProp('hero', 'entranceDuration') as number;
  const delay = useSectionProp('hero', delayPropId) as number;
  return (
    <motion.div
      initial={{ opacity: 0, y: 22, filter: 'blur(4px)' }}
      animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
      transition={{ duration: entranceDuration, delay, ease: EASE.expoOut }}
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
