'use client';

import { motion } from 'framer-motion';
import { useRef } from 'react';
import { useInView } from 'framer-motion';
import { EASE, DURATION, VIEWPORT } from '@/lib/animation';

interface Item { label: string; value: string }

export default function AnimatedList({ items }: { items: Item[] }) {
  const ref = useRef(null);
  const inView = useInView(ref, VIEWPORT);

  return (
    <ul ref={ref} className="space-y-2">
      {items.map(({ label, value }, i) => (
        <motion.li
          key={label}
          className="flex items-center gap-2 text-sm"
          initial={{ opacity: 0, x: -10 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: DURATION.base, delay: 0.05 + i * 0.06, ease: EASE.expoOut }}
        >
          <span className="w-1.5 h-1.5 rounded-full bg-ink/25 shrink-0" />
          <span className="text-ink/75">{value}</span>
        </motion.li>
      ))}
    </ul>
  );
}
