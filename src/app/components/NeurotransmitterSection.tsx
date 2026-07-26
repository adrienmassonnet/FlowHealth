'use client';

import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { EASE, DURATION } from '@/lib/animation';

const nodes = [
  {
    sentence: 'Stable brain.',
    angle: 0,
    icon: (
      // Head profile with neural signal line inside
      <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-5 h-5">
        <path d="M9 21v-1a6 6 0 0 1 6-6v0a6 6 0 0 0 6-6v0a6 6 0 0 0-6-6H9a6 6 0 0 0-6 6v1a4 4 0 0 0 4 4h1" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M7 10h2l1.5-2 2 4 1.5-2H16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
  },
  {
    sentence: 'Balanced stress response.',
    angle: 72,
    icon: (
      // Lightning bolt — adrenal surge that rises and falls
      <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-5 h-5">
        <path d="M13 2L4.5 13.5H12L11 22l8.5-11.5H12L13 2z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
  },
  {
    sentence: 'Settled digestive system.',
    angle: 144,
    icon: (
      // Winding tube — intestinal tract
      <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-5 h-5">
        <path d="M6 4c0 2 3 2 3 4s-3 2-3 4 3 2 3 4-3 2-3 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
        <path d="M12 6c0 2 3 2 3 4s-3 2-3 4 3 2 3 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
      </svg>
    ),
  },
  {
    sentence: 'Steady nervous system.',
    angle: 216,
    icon: (
      // Neuron — central body with branching dendrites
      <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-5 h-5">
        <circle cx="12" cy="12" r="2.5" stroke="currentColor" strokeWidth="2"/>
        <path d="M12 9.5V4M12 14.5V20M14.2 10.8L18 7M9.8 13.2L6 17M14.2 13.2L18 17M9.8 10.8L6 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
      </svg>
    ),
  },
  {
    sentence: 'Resilient cells.',
    angle: 288,
    icon: (
      // Hexagon — cellular structure
      <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-5 h-5">
        <path d="M12 3L20.5 8V16L12 21L3.5 16V8L12 3Z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round"/>
        <path d="M12 8v8M8.5 10l3.5 2 3.5-2M8.5 14l3.5-2 3.5 2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
  },
];

export default function NeurotransmitterSection() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setIsVisible(true); obs.disconnect(); } },
      { threshold: 0.1 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const rx = 0.32, ry = 0.32;

  return (
    <section
      ref={sectionRef}
      className="py-10 md:py-16 bg-[#F4F4F8] relative overflow-hidden md:rounded-2xl md:mx-8"
    >
      <div className="relative flow-container">
        <div className="flex flex-col md:flex-row md:items-center gap-10 md:gap-12">

          {/* Left: text */}
          <div className="md:w-[40%] shrink-0 space-y-4">
            <motion.p
              className="text-xs tracking-[0.16em] uppercase font-semibold bg-gradient-to-r from-brand to-ink bg-clip-text text-transparent"
              initial={{ opacity: 0 }}
              animate={isVisible ? { opacity: 1 } : {}}
              transition={{ duration: DURATION.base, ease: EASE.expoOut }}
            >
              What goes up must come down
            </motion.p>
            <motion.h2
              className="flow-h2"
              initial={{ opacity: 0, y: 16 }}
              animate={isVisible ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: DURATION.slow, delay: 0.07, ease: EASE.expoOut }}
            >
              True health is stability, not the constant swings.
            </motion.h2>
            <motion.p
              className="text-sm leading-[1.6]"
              style={{ color: 'rgba(30,24,84,0.55)' }}
              initial={{ opacity: 0, y: 12 }}
              animate={isVisible ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: DURATION.slow, delay: 0.14, ease: EASE.expoOut }}
            >
              It's not the highs that wear the body down — it's the constant swings. Flow supports the five systems that destabilise first under chronic stress, so the body spends less energy compensating and more in a state it can sustain.
            </motion.p>
          </div>

          {/* Right: ring — desktop */}
          <div className="hidden md:block flex-1 min-w-0">
            <div className="relative w-full" style={{ paddingBottom: '100%' }}>
              <div className="absolute inset-0">
                <svg
                  viewBox="0 0 100 100"
                  className="absolute inset-0 w-full h-full pointer-events-none"
                  xmlns="http://www.w3.org/2000/svg"
                  preserveAspectRatio="xMidYMid meet"
                >
                  <ellipse
                    cx="50" cy="50"
                    rx={rx * 100} ry={ry * 100}
                    fill="none"
                    stroke="rgba(59,56,184,0.2)"
                    strokeWidth="0.4"
                    strokeDasharray="1.4 1.8"
                  />
                  <text x="50" y="49" textAnchor="middle" fontSize="3.2" fontWeight="600" fill="var(--color-ink)" fontFamily="Outfit, system-ui, sans-serif">
                    Flow's contribution
                  </text>
                  <text x="50" y="54.5" textAnchor="middle" fontSize="3.2" fontWeight="600" fill="var(--color-ink)" fontFamily="Outfit, system-ui, sans-serif">
                    to stability.
                  </text>
                </svg>

                {nodes.map((n, i) => {
                  const rad = ((n.angle - 90) * Math.PI) / 180;
                  const cx = 50 + rx * 100 * Math.cos(rad);
                  const cy = 50 + ry * 100 * Math.sin(rad);
                  return (
                    <div
                      key={n.sentence}
                      className="absolute"
                      style={{ left: `${cx}%`, top: `${cy}%`, transform: 'translate(-50%, -50%)', width: '26%' }}
                    >
                      <motion.div
                        className="rounded-2xl flex items-center gap-2.5 px-3.5 py-3"
                        style={{
                          background: 'linear-gradient(135deg, var(--color-brand), var(--color-ink))',
                          boxShadow: '0 4px 20px rgba(59,56,184,0.3)',
                        }}
                        initial={{ opacity: 0, scale: 0.82 }}
                        animate={isVisible ? { opacity: 1, scale: 1 } : {}}
                        transition={{ duration: DURATION.slow, delay: 0.2 + i * 0.1, ease: EASE.expoOut }}
                      >
                        <div className="shrink-0" style={{ color: 'white' }}>{n.icon}</div>
                        <p className="text-xs font-semibold leading-[1.3] tracking-[-0.01em] text-white">{n.sentence}</p>
                      </motion.div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Mobile: two-column grid */}
          <div className="md:hidden">
            <p className="text-xs tracking-[0.16em] uppercase font-semibold bg-gradient-to-r from-brand to-ink bg-clip-text text-transparent mb-3">
              Flow's contribution to stability
            </p>
            <div className="grid grid-cols-2 gap-2.5">
              {nodes.map((n, i) => (
                <motion.div
                  key={n.sentence}
                  className={`rounded-xl px-3 py-3 min-h-16 flex items-center gap-2.5 ${
                    // centre a lone final card while keeping a single-column width
                    i === nodes.length - 1 && nodes.length % 2 === 1
                      ? 'col-span-2 justify-self-center w-[calc(50%-0.3125rem)]'
                      : ''
                  }`}
                  style={{ background: 'linear-gradient(135deg, var(--color-brand), var(--color-ink))' }}
                  initial={{ opacity: 0, y: 10 }}
                  animate={isVisible ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: DURATION.base, delay: 0.1 + i * 0.06, ease: EASE.expoOut }}
                >
                  <div className="shrink-0" style={{ color: 'white' }}>{n.icon}</div>
                  <p className="text-xs font-semibold leading-[1.25] tracking-[-0.01em] text-white">{n.sentence}</p>
                </motion.div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
