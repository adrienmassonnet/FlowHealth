'use client';

import { useRef, useEffect, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import cloud from 'd3-cloud';

const ease = [0.25, 0.1, 0.1, 1] as const;

const inputWords = [
  { text: 'Restlessness',           fontSize: 40, opacity: 0.95, weight: 700 },
  { text: 'Burnout',                fontSize: 30, opacity: 0.88, weight: 700 },
  { text: 'Dopamine crash',         fontSize: 26, opacity: 0.85, weight: 600 },
  { text: 'Cortisol overload',      fontSize: 24, opacity: 0.82, weight: 600 },
  { text: 'Broken sleep',           fontSize: 24, opacity: 0.80, weight: 600 },
  { text: 'Chronic fatigue',        fontSize: 22, opacity: 0.78, weight: 600 },
  { text: 'Anxiety spiral',         fontSize: 22, opacity: 0.76, weight: 600 },
  { text: 'Mood instability',       fontSize: 16, opacity: 0.58, weight: 500 },
  { text: 'Memory gaps',            fontSize: 16, opacity: 0.56, weight: 500 },
  { text: 'Neuroplasticity loss',   fontSize: 15, opacity: 0.54, weight: 500 },
  { text: 'Attention collapse',     fontSize: 15, opacity: 0.54, weight: 500 },
  { text: 'Decision fatigue',       fontSize: 12, opacity: 0.40, weight: 400 },
  { text: 'Tolerance build-up',     fontSize: 12, opacity: 0.38, weight: 400 },
  { text: 'Cognitive ageing',       fontSize: 12, opacity: 0.36, weight: 400 },
  { text: 'Stress baseline rising', fontSize: 11, opacity: 0.34, weight: 400 },
  { text: 'Serotonin depletion',    fontSize: 10, opacity: 0.28, weight: 400 },
  { text: 'Neural inflammation',    fontSize: 10, opacity: 0.26, weight: 400 },
  { text: 'HPA dysregulation',      fontSize: 10, opacity: 0.24, weight: 400 },
];

type CloudWord = {
  text: string;
  fontSize: number;
  opacity: number;
  weight: number;
  x?: number;
  y?: number;
  rotate?: number;
};

const W = 560;
const H = 200;

function WordCloud({ inView }: { inView: boolean }) {
  const [words, setWords] = useState<CloudWord[]>([]);

  useEffect(() => {
    cloud<CloudWord>()
      .size([W, H])
      .words(inputWords.map(w => ({ ...w })))
      .padding(8)
      .rotate(() => 0)
      .font('Outfit, system-ui, sans-serif')
      .fontWeight((d) => String(d.weight ?? 400))
      .fontSize((d) => d.fontSize ?? 12)
      .on('end', (laid) => setWords(laid))
      .start();
  }, []);

  return (
    <div className="relative w-full select-none" style={{ height: H }}>
      <div
        className="absolute inset-0 pointer-events-none z-10"
        style={{
          background: 'radial-gradient(ellipse 85% 80% at 50% 50%, transparent 38%, #F4F4F8 88%)',
        }}
      />
      <svg width="100%" height={H} viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="xMidYMid meet">
        <g transform={`translate(${W / 2},${H / 2})`}>
          {words.map((w, i) => (
            <motion.text
              key={w.text}
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: w.opacity } : {}}
              transition={{ duration: 0.6, ease, delay: 0.04 * i }}
              textAnchor="middle"
              transform={`translate(${w.x ?? 0},${w.y ?? 0}) rotate(${w.rotate ?? 0})`}
              fontSize={w.fontSize}
              fontWeight={w.weight}
              fontFamily="Outfit, system-ui, sans-serif"
              fill="#1E1854"
            >
              {w.text}
            </motion.text>
          ))}
        </g>
      </svg>
    </div>
  );
}

export default function BrainHealthSection() {
  const sectionRef = useRef(null);
  const inView = useInView(sectionRef, { once: true, margin: '-6% 0px' });

  return (
    <section
      ref={sectionRef}
      className="py-14 md:py-24 bg-[#F4F4F8] overflow-hidden md:rounded-[2rem] md:mx-8"
      style={{ backgroundImage: 'radial-gradient(circle, rgba(30,24,84,0.07) 1px, transparent 1px)', backgroundSize: '28px 28px' }}
    >
      <div className="max-w-[1200px] mx-auto px-6">

        <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-6">

          {/* Word cloud — left */}
          <div className="w-full md:flex-1 min-w-0">
            <WordCloud inView={inView} />
          </div>

          {/* Text block — right */}
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.65, ease, delay: 0.1 }}
            className="space-y-4 md:max-w-[500px]"
          >
            <div className="space-y-2">
              <p className="text-xs tracking-[0.16em] uppercase font-semibold bg-gradient-to-r from-[#3B38B8] to-[#1E1854] bg-clip-text text-transparent">
                Long-term brain health
              </p>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold tracking-[-0.03em] leading-[1.08] text-[#1E1854]">
                Chronic overstimulation quietly hinders the brain.
              </h2>
            </div>
            <p className="text-sm md:text-base text-[#1E1854]/55 leading-[1.55]">
              Flow was built for this. Through clinically studied adaptogens and nootropics, it targets the root causes of what chronic overstimulation does over time to stress, focus, mood, and sleep.
            </p>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
