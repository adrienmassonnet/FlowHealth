'use client';

import { useState } from 'react';
import { trackEvent } from '@/lib/clarity';

const cards = [
  {
    icon: (
      <svg width="32" height="32" viewBox="0 0 26 26" fill="none">
        <path d="M5 17C5 13.134 8.686 10 13 10C17.314 10 21 13.134 21 17" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
        <path d="M3 17H23" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
        <path d="M13 10V7" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
        <path d="M7 8.5L8.5 10M19 8.5L17.5 10" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
      </svg>
    ),
    title: 'Win Your Morning, Win Your Day',
    description: 'The way you begin shapes everything that follows. A calm, intentional morning sets the tone for clarity, focus, and presence — because the first hour quietly determines the quality of the entire day.',
  },
  {
    icon: (
      <svg width="32" height="32" viewBox="0 0 26 26" fill="none">
        <path d="M3 13C6 13 6 7 9.5 7C13 7 13 19 16.5 19C20 19 20 13 23 13" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    title: 'What Goes Up Must Come Down',
    description: 'Artificial spikes always crash. Flow rejects the rollercoaster of stimulants and supports the natural, sustainable rhythm your body and mind were designed for.',
  },
  {
    icon: (
      <svg width="32" height="32" viewBox="0 0 26 26" fill="none">
        <path d="M13 4C13 4 8 9 8 14C8 17.314 10.686 20 13 20C15.314 20 18 17.314 18 14C18 9 13 4 13 4Z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round"/>
        <path d="M13 20V23" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
        <path d="M10 17L13 20L16 17" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" strokeOpacity="0.4"/>
      </svg>
    ),
    title: 'Do It Light, Do It Right',
    description: 'Gentle consistency beats forceful effort. When you approach your day and your rituals with lightness, you create space for real flow — because sustainable excellence is born from ease, not force.',
  },
  {
    icon: (
      <svg width="32" height="32" viewBox="0 0 26 26" fill="none">
        <circle cx="7" cy="13" r="3" stroke="currentColor" strokeWidth="1.4"/>
        <circle cx="19" cy="13" r="3" stroke="currentColor" strokeWidth="1.4"/>
        <path d="M10 13H16" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
        <path d="M14 11L16 13L14 15" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    title: 'Energy Can Only Be Transferred',
    description: 'You cannot create more energy — you can only move it wisely. Flow helps you transfer energy from stress and distraction into calm focus, creativity, and presence instead of letting it leak away.',
  },
  {
    icon: (
      <svg width="32" height="32" viewBox="0 0 26 26" fill="none">
        <path d="M13 5C13 5 7 9 7 14.5C7 17.538 9.686 20 13 20C16.314 20 19 17.538 19 14.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
        <path d="M19 8C19 8 16 10 16 12.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeOpacity="0.4"/>
        <circle cx="13" cy="13" r="2" stroke="currentColor" strokeWidth="1.4"/>
      </svg>
    ),
    title: 'Work in the Shadows',
    description: 'The most important growth happens quietly, unseen. Real progress is made in private rituals and inner work, not in the spotlight. Flow honours the silent, steady effort that truly transforms you.',
  },
  {
    icon: (
      <svg width="32" height="32" viewBox="0 0 26 26" fill="none">
        <path d="M5 20C7 18 9 14 13 13C17 12 19 8 21 6" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
        <path d="M18 6H21V9" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
        <circle cx="13" cy="13" r="1.5" fill="currentColor" opacity="0.4"/>
      </svg>
    ),
    title: 'The Journey Is the Dream',
    description: 'The destination is never the point — the daily practice is. Every mindful morning with Flow is already the life you\'re building: presence, growth, and fulfillment are found in the process itself.',
  },
  {
    icon: (
      <svg width="32" height="32" viewBox="0 0 26 26" fill="none">
        <rect x="6" y="7" width="14" height="13" rx="1.5" stroke="currentColor" strokeWidth="1.4"/>
        <path d="M6 11H20" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
        <path d="M10 15H16" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
        <path d="M10 18H14" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeOpacity="0.45"/>
        <path d="M14 5L16 7" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
      </svg>
    ),
    title: 'Read Your Own Story',
    description: 'Stop scrolling someone else\'s highlight reel. Your attention is sacred. Flow reminds you to stay inside your own life, writing your story with intention instead of comparing it to others.',
  },
  {
    icon: (
      <svg width="32" height="32" viewBox="0 0 26 26" fill="none">
        <path d="M13 4L16.5 10.5H22L17 15L19 21L13 17.5L7 21L9 15L4 10.5H9.5L13 4Z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round"/>
        <circle cx="13" cy="13" r="2.5" stroke="currentColor" strokeWidth="1" strokeOpacity="0.35"/>
      </svg>
    ),
    title: 'Focus Is Transcendence',
    description: 'Deep focus is more than productivity — it is a state of being. When the mind becomes still and fully present, you rise above noise, ego, and distraction into something clearer, freer, and more alive.',
  },
];

type Phase = 'idle' | 'exit' | 'enter';

function rand(min: number, max: number) {
  return Math.random() * (max - min) + min;
}

export default function MorningRitualCard() {
  const [index, setIndex] = useState(0);
  const [phase, setPhase] = useState<Phase>('idle');
  const [diceVars, setDiceVars] = useState<Record<string, string>>({});

  const advance = () => {
    if (phase !== 'idle') return;
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
    <div className="flex flex-col gap-4">
      <div
        className={`bg-white rounded-2xl border border-[#1E1854]/[0.07] px-7 py-9 flex flex-col gap-6 shadow-[0_4px_32px_rgba(30,24,84,0.09)] min-h-[220px] justify-between ${animClass}`}
        style={diceVars as React.CSSProperties}
      >
        <span className="text-[#1E1854]/45">{card.icon}</span>
        <div className="space-y-3">
          <p className="text-base font-semibold text-[#1E1854] leading-snug tracking-[-0.01em]">{card.title}</p>
          <p className="text-sm text-[#1E1854]/55 leading-relaxed">{card.description}</p>
        </div>
      </div>

      {/* Navigation */}
      <div className="flex justify-center">
        <button
          onClick={advance}
          className="text-xs tracking-[0.08em] uppercase font-medium text-[#1E1854]/45 hover:text-white border border-[#1E1854]/15 hover:border-transparent rounded-full px-5 py-2 transition-all duration-300 hover:[background:linear-gradient(135deg,#3B38B8_0%,#1E1854_100%)]"
        >
          Reveal another truth
        </button>
      </div>
    </div>
  );
}
