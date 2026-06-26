'use client';

import Image from 'next/image';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { EASE, DURATION, VIEWPORT } from '@/lib/animation';

const cards = [
  {
    label: 'The biology of growth',
    body: 'Discomfort and uncertainty are not signs of failure — they are neuroplasticity in motion. Every unfamiliar challenge triggers new synaptic connections. The friction is the mechanism.',
  },
  {
    label: 'We celebrate you, not the supplement',
    body: "Most brands put the product at the center. We put you there. Flow doesn't make you better — you do that. We support the conditions: steadier energy, clearer thinking, less noise. The work, the repetition, the growth — that's yours.",
  },
];

export default function ApproachSection() {
  const ref = useRef(null);
  const inView = useInView(ref, VIEWPORT);

  return (
    <section
      ref={ref}
      className="relative overflow-hidden md:rounded-[2rem] md:mx-8 2xl:mx-auto 2xl:max-w-[1216px] min-h-[560px] md:min-h-[600px] flex items-center"
    >
      <Image
        src="/overstimulation.png"
        alt="A moment of reflection"
        fill
        className="object-cover object-center"
        sizes="100vw"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-black/60" />

      <div className="relative z-10 w-full max-w-[1200px] mx-auto px-6 py-16 md:py-20">
        <div className="flex flex-col md:flex-row md:items-center gap-10 md:gap-16">

          {/* Left — eyebrow + heading */}
          <div className="md:w-[42%] shrink-0 space-y-4">
            <motion.p
              className="text-xs tracking-[0.16em] uppercase font-semibold text-white/50"
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ duration: DURATION.base, ease: EASE.expoOut }}
            >
              The neuroscience of progress
            </motion.p>
            <motion.h2
              className="text-2xl sm:text-3xl md:text-4xl font-semibold leading-[1.08] tracking-[-0.035em] text-white"
              initial={{ opacity: 0, y: 16 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: DURATION.slow, delay: 0.07, ease: EASE.expoOut }}
            >
              The brain grows by going somewhere it hasn't been before. Flow is there for the journey.
            </motion.h2>
          </div>

          {/* Right — two cards staggered */}
          <div className="flex flex-col gap-4 flex-1">
            {cards.map((card, i) => (
              <motion.div
                key={card.label}
                className="flex-1 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/15 px-6 py-6 space-y-3"
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: DURATION.slow, delay: 0.12 + i * 0.1, ease: EASE.expoOut }}
              >
                <p className="text-[10px] tracking-[0.16em] uppercase font-semibold text-white/45">
                  {card.label}
                </p>
                <p className="text-sm text-white/80 leading-[1.6]">
                  {card.body}
                </p>
              </motion.div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}
