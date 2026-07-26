'use client';

import { useRef, useEffect, useState } from 'react';
import Image from 'next/image';
import { motion, useInView } from 'framer-motion';
import cloud from 'd3-cloud';
import { EASE, DURATION } from '@/lib/animation';

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
const H_DESKTOP = 200;
const H_MOBILE = 320;

function WordCloud({ inView, mobile }: { inView: boolean; mobile: boolean }) {
  const [words, setWords] = useState<CloudWord[]>([]);
  const H = mobile ? H_MOBILE : H_DESKTOP;
  const scale = mobile ? 1.4 : 1;

  useEffect(() => {
    cloud<CloudWord>()
      .size([W, H])
      .words(inputWords.map(w => ({ ...w, fontSize: w.fontSize * scale })))
      .padding(8)
      .rotate(() => 0)
      .font('Outfit, system-ui, sans-serif')
      .fontWeight((d) => String(d.weight ?? 400))
      .fontSize((d) => d.fontSize ?? 12)
      .on('end', (laid) => setWords(laid))
      .start();
  }, [H, scale]);

  return (
    <div className="relative w-full select-none" style={{ height: H }}>
      <div
        className="absolute inset-0 pointer-events-none z-10"
        style={{
          background: 'radial-gradient(ellipse 85% 80% at 50% 50%, transparent 38%, white 88%)',
        }}
      />
      <svg width="100%" height={H} viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="xMidYMid meet">
        <g transform={`translate(${W / 2},${H / 2})`}>
          {words.map((w, i) => (
            <motion.text
              key={w.text}
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: w.opacity } : {}}
              transition={{ duration: DURATION.base, ease: EASE.expoOut, delay: 0.03 * i }}
              textAnchor="middle"
              transform={`translate(${w.x ?? 0},${w.y ?? 0}) rotate(${w.rotate ?? 0})`}
              fontSize={w.fontSize}
              fontWeight={w.weight}
              fontFamily="Outfit, system-ui, sans-serif"
              fill="var(--color-ink)"
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
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia('(max-width: 767px)');
    setIsMobile(mq.matches);
    const handler = (e: MediaQueryListEvent) => setIsMobile(e.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);

  return (
    <section
      ref={sectionRef}
      className="py-section-sm md:py-section bg-white overflow-hidden"
    >
      <div className="flow-container">

        <div className="flex flex-col md:flex-row md:items-center gap-8 md:gap-6">

          {/* Word cloud — left on desktop, below the text on mobile */}
          <div className="order-2 md:order-1 w-full md:flex-1 min-w-0">
            <WordCloud inView={inView} mobile={isMobile} />
          </div>

          {/* Text block — right on desktop, first on mobile */}
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: DURATION.slow, ease: EASE.expoOut, delay: 0.1 }}
            className="order-1 md:order-2 relative isolate space-y-4 md:max-w-[500px]"
          >
            {/* Image behind the text — calm emerging from chaos */}
            <div className="absolute -inset-4 md:-inset-x-5 md:-inset-y-12 -z-10 pointer-events-none overflow-hidden rounded-3xl bg-ink transform-gpu">
              <Image
                src="/calm-from-chaos.png"
                alt=""
                fill
                className="object-cover scale-110 transform-gpu"
                sizes="(max-width: 768px) 100vw, 600px"
              />
            </div>
            <div className="space-y-2">
              <p
                className="text-xs tracking-[0.16em] uppercase font-semibold text-white/70"
                style={{ textShadow: '0 1px 3px rgba(0,0,0,0.9), 0 2px 14px rgba(0,0,0,0.5)' }}
              >
                Long-term brain health
              </p>
              <h2
                className="flow-h2 text-white"
                style={{ textShadow: '0 2px 4px rgba(0,0,0,0.9), 0 4px 20px rgba(0,0,0,0.5)' }}
              >
                Chronic overstimulation quietly hinders the brain.
              </h2>
            </div>
            <p
              className="text-sm text-white/90 leading-[1.55]"
              style={{ textShadow: '0 1px 3px rgba(0,0,0,0.9), 0 2px 14px rgba(0,0,0,0.5)' }}
            >
              Modern life keeps the nervous system switched on &mdash; notifications, deadlines, and stimulants stacking until cortisol never fully settles, showing up as mood swings, foggy recall, and a stress response that won&rsquo;t ease. Flow works with the body&rsquo;s own chemistry instead of pushing it further: saffron and ginseng support healthy serotonin and dopamine activity, magnesium and rooibos help manage the body&rsquo;s everyday hormonal stress response, and Lion&rsquo;s Mane supports long-term cognitive vitality &mdash; for steadier mood, calmer stress, and clearer thinking.
            </p>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
