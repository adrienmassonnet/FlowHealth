'use client';

import { useState, useEffect, useRef } from 'react';

const molecules = [
  {
    label: 'Dopamine',
    heading: 'Every spike borrows from your baseline.',
    body: "Dopamine's tonic baseline sustains focus and drive. Repeated spikes force the brain to downregulate receptors — the floor drops. Over time, more input produces less effect, and what felt like motivation becomes noise.",
  },
  {
    label: 'Cortisol',
    heading: 'The stress signal that never clears.',
    body: 'Cortisol peaks at wake and tapers through the day. Stimulants extend that peak past its window. When cortisol stays elevated, recovery suffers, sleep is disrupted, and tomorrow starts lower.',
  },
  {
    label: 'Serotonin',
    heading: 'Calm is not the absence of energy.',
    body: "Serotonin stabilises mood and shapes how the brain reads experience. Chronic overstimulation depletes it over time. The result isn't just low mood — it's a narrowing tolerance for anything that isn't a spike.",
  },
  {
    label: 'Adenosine',
    heading: 'Sleep pressure is a feature, not a bug.',
    body: 'Adenosine builds all day, signalling the need for rest. Caffeine blocks its receptors — it doesn\'t clear the debt. When the block lifts, the signal arrives all at once. The crash is the unpaid bill.',
  },
];

export default function NeurotransmitterSection() {
  const [active, setActive] = useState(0);
  const [visible, setVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold: 0.1 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const mol = molecules[active];

  return (
    <section
      ref={sectionRef}
      className="py-14 md:py-24 bg-[#F4F4F8] relative overflow-hidden md:rounded-[2rem] md:mx-8"
      style={{
        backgroundImage: 'radial-gradient(circle, rgba(30,24,84,0.07) 1px, transparent 1px)',
        backgroundSize: '28px 28px',
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(20px)',
        transition: 'opacity 0.7s cubic-bezier(0.25,0.1,0.1,1), transform 0.7s cubic-bezier(0.25,0.1,0.1,1)',
      }}
    >
      {/* Faint sine wave */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M0,60 C120,20 240,100 360,60 C480,20 600,100 720,60 C840,20 960,100 1080,60 C1200,20 1320,100 1440,60"
          stroke="rgba(59,56,184,0.06)" strokeWidth="2" fill="none"
          transform="translate(0,40) scale(1,2)"
        />
        <path
          d="M0,60 C120,20 240,100 360,60 C480,20 600,100 720,60 C840,20 960,100 1080,60 C1200,20 1320,100 1440,60"
          stroke="rgba(59,56,184,0.04)" strokeWidth="2" fill="none"
          transform="translate(0,120) scale(1,2.5)"
        />
      </svg>
      <div className="relative max-w-[1200px] mx-auto px-6">

        {/* Section label */}
        {/* Mobile: single column flow */}
        <div className="md:hidden space-y-6">
          <div className="space-y-4">
            <div className="space-y-2">
              <p className="text-xs tracking-[0.16em] uppercase font-semibold bg-gradient-to-r from-[#3B38B8] to-[#1E1854] bg-clip-text text-transparent">
                What goes up must come down
              </p>
              <h2 className="text-2xl font-semibold tracking-[-0.03em] leading-[1.08] text-[#1E1854]">
                True health is stability, not the constant swings.
              </h2>
            </div>
            <p className="text-sm leading-[1.55]" style={{ color: 'rgba(30,24,84,0.55)' }}>
              Your body and brain were built for optimal. The natural baseline is the most sustainable state there is — and it's constant deviation from it that creates the restlessness, fatigue, and fragmentation we mistake for normal.
            </p>
          </div>

          <div className="space-y-3">
            <div className="flex gap-2 overflow-x-auto" style={{ scrollbarWidth: 'none' }}>
              {molecules.map((m, i) => (
                <button
                  key={m.label}
                  onClick={() => setActive(i)}
                  className="shrink-0 rounded-full px-3 py-1 text-xs font-medium transition-all duration-300"
                  style={
                    i === active
                      ? { border: '1.5px solid #3B38B8', color: '#3B38B8' }
                      : { border: '1.5px solid rgba(30,24,84,0.14)', color: 'rgba(30,24,84,0.45)' }
                  }
                >
                  {m.label}
                </button>
              ))}
            </div>
            <div
              className="rounded-2xl p-5"
              style={{ background: 'linear-gradient(135deg, #3B38B8, #1E1854)' }}
            >
              <p className="text-sm leading-[1.55]" style={{ color: 'rgba(255,255,255,0.8)' }}>
                {mol.body}
              </p>
            </div>
          </div>
        </div>

        {/* Desktop: 2-col layout */}
        <div className="hidden md:flex flex-row gap-20 items-start">
          <div className="w-[42%] shrink-0 space-y-4">
            <p className="text-xs tracking-[0.16em] uppercase font-semibold bg-gradient-to-r from-[#3B38B8] to-[#1E1854] bg-clip-text text-transparent">
              What goes up must come down
            </p>
            <h2 className="text-3xl md:text-4xl font-semibold tracking-[-0.03em] leading-[1.08] text-[#1E1854]">
              True health is stability, not the constant swings.
            </h2>
            <p className="text-sm leading-[1.55]" style={{ color: 'rgba(30,24,84,0.55)' }}>
              Your body and brain were built for optimal. The natural baseline is the most sustainable state there is — and it's constant deviation from it that creates the restlessness, fatigue, and fragmentation we mistake for normal.
            </p>
          </div>
          <div className="flex-1 min-w-0 space-y-4">
            <div className="flex gap-2 flex-wrap">
              {molecules.map((m, i) => (
                <button
                  key={m.label}
                  onClick={() => setActive(i)}
                  className="rounded-full px-4 py-1.5 text-sm font-medium transition-all duration-300"
                  style={
                    i === active
                      ? { border: '1.5px solid #3B38B8', color: '#3B38B8' }
                      : { border: '1.5px solid rgba(30,24,84,0.14)', color: 'rgba(30,24,84,0.45)' }
                  }
                >
                  {m.label}
                </button>
              ))}
            </div>
            <div
              className="rounded-2xl p-7"
              style={{ background: 'linear-gradient(135deg, #3B38B8, #1E1854)' }}
            >
              <p className="text-sm leading-[1.55]" style={{ color: 'rgba(255,255,255,0.8)' }}>
                {mol.body}
              </p>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
