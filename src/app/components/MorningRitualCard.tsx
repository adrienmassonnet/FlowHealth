'use client';

import { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { trackEvent } from '@/lib/clarity';
import { morningRitualCards } from '@/lib/content-data';
import { EASE } from '@/lib/animation';

const icons = [
  <svg key="0" width="32" height="32" viewBox="0 0 26 26" fill="none"><path d="M5 17C5 13.134 8.686 10 13 10C17.314 10 21 13.134 21 17" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/><path d="M3 17H23" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/><path d="M13 10V7" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/><path d="M7 8.5L8.5 10M19 8.5L17.5 10" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/></svg>,
  <svg key="1" width="32" height="32" viewBox="0 0 26 26" fill="none"><path d="M3 13C6 13 6 7 9.5 7C13 7 13 19 16.5 19C20 19 20 13 23 13" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/></svg>,
  <svg key="2" width="32" height="32" viewBox="0 0 26 26" fill="none"><path d="M13 4C13 4 8 9 8 14C8 17.314 10.686 20 13 20C15.314 20 18 17.314 18 14C18 9 13 4 13 4Z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round"/><path d="M13 20V23" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/><path d="M10 17L13 20L16 17" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" strokeOpacity="0.4"/></svg>,
  <svg key="3" width="32" height="32" viewBox="0 0 26 26" fill="none"><circle cx="7" cy="13" r="3" stroke="currentColor" strokeWidth="1.4"/><circle cx="19" cy="13" r="3" stroke="currentColor" strokeWidth="1.4"/><path d="M10 13H16" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/><path d="M14 11L16 13L14 15" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/></svg>,
  <svg key="4" width="32" height="32" viewBox="0 0 26 26" fill="none"><path d="M13 5C13 5 7 9 7 14.5C7 17.538 9.686 20 13 20C16.314 20 19 17.538 19 14.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/><path d="M19 8C19 8 16 10 16 12.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeOpacity="0.4"/><circle cx="13" cy="13" r="2" stroke="currentColor" strokeWidth="1.4"/></svg>,
  <svg key="5" width="32" height="32" viewBox="0 0 26 26" fill="none"><path d="M5 20C7 18 9 14 13 13C17 12 19 8 21 6" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/><path d="M18 6H21V9" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/><circle cx="13" cy="13" r="1.5" fill="currentColor" opacity="0.4"/></svg>,
  <svg key="6" width="32" height="32" viewBox="0 0 26 26" fill="none"><rect x="6" y="7" width="14" height="13" rx="1.5" stroke="currentColor" strokeWidth="1.4"/><path d="M6 11H20" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/><path d="M10 15H16" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/><path d="M10 18H14" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeOpacity="0.45"/><path d="M14 5L16 7" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/></svg>,
  <svg key="7" width="32" height="32" viewBox="0 0 26 26" fill="none"><path d="M13 4L16.5 10.5H22L17 15L19 21L13 17.5L7 21L9 15L4 10.5H9.5L13 4Z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round"/><circle cx="13" cy="13" r="2.5" stroke="currentColor" strokeWidth="1" strokeOpacity="0.35"/></svg>,
];

const cards = morningRitualCards.map((c, i) => ({ ...c, icon: icons[i] }));

type Phase = 'idle' | 'exit' | 'enter';

function rand(min: number, max: number) {
  return Math.random() * (max - min) + min;
}

export default function MorningRitualCard() {
  const [index, setIndex] = useState(0);
  const [phase, setPhase] = useState<Phase>('idle');
  const [spins, setSpins] = useState(0);
  const [diceVars, setDiceVars] = useState<Record<string, string>>({});
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-8% 0px' });

  const advance = () => {
    if (phase !== 'idle') return;
    setSpins((s) => s + 1);
    trackEvent('homepage_morning_card_next');
    // Pick a random Y tilt: positive = tilt right, negative = tilt left
    const sign = Math.random() < 0.5 ? 1 : -1;
    const yExit  = sign * rand(4, 13);
    const yEnter = -sign * rand(4, 13);
    setDiceVars({
      '--dice-y-exit':  `${yExit.toFixed(1)}deg`,
      '--dice-y-enter': `${yEnter.toFixed(1)}deg`,
    });
    setPhase('exit');
    setTimeout(() => {
      setIndex((i) => (i + 1) % cards.length);
      setPhase('enter');
      setTimeout(() => setPhase('idle'), 720);
    }, 200);
  };

  const card = cards[index];
  const animClass = phase === 'exit' ? 'dice-exit' : phase === 'enter' ? 'dice-enter' : '';

  return (
    <motion.div
      ref={ref}
      className="flex flex-col gap-4"
      initial={{ opacity: 0, scale: 0.94, y: 20 }}
      animate={inView ? { opacity: 1, scale: 1, y: 0 } : {}}
      transition={{ duration: 0.85, ease: EASE.inOut }}
    >
      <div
        className={`bg-white rounded-2xl border border-ink/[0.07] px-7 py-9 flex flex-col gap-6 shadow-[0_4px_32px_rgba(30,24,84,0.09)] md:min-h-[220px] justify-between ${animClass}`}
        style={diceVars as React.CSSProperties}
      >
        <span className="text-ink/45">{card.icon}</span>
        <div className="space-y-3">
          <p className="text-base font-semibold text-ink leading-snug tracking-[-0.01em]">{card.title}</p>
          <p className="text-sm text-ink/55 leading-relaxed">{card.description}</p>
        </div>
      </div>

      {/* Navigation */}
      <div className="flex justify-center">
        <button
          onClick={advance}
          className="inline-flex items-center gap-2 min-h-[44px] text-xs tracking-[0.08em] uppercase font-semibold text-ink border-2 border-ink/20 hover:border-ink/40 hover:bg-ink/[0.04] rounded-full px-5 py-2.5 transition-colors duration-200"
        >
          {/* Icon spins once on each click, then rests back at the default state */}
          <svg
            width="15" height="15" viewBox="0 0 16 16" fill="none"
            style={{ transform: `rotate(${spins * -360}deg)`, transition: 'transform 0.6s cubic-bezier(0.25,0.1,0.1,1)' }}
          >
            <path d="M2.5 8a5.5 5.5 0 0 1 9.4-3.9M13.5 8a5.5 5.5 0 0 1-9.4 3.9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
            <path d="M11.5 1.5V4.5H8.5M4.5 14.5V11.5H7.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          Reveal another truth
        </button>
      </div>
    </motion.div>
  );
}
