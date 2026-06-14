'use client';

import { useEffect, useRef, useState } from 'react';

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
      className="py-10 md:py-16 bg-[#F4F4F8] relative overflow-hidden md:rounded-[2rem] md:mx-8"
      style={{
        backgroundImage: 'radial-gradient(circle, rgba(30,24,84,0.07) 1px, transparent 1px)',
        backgroundSize: '28px 28px',
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
        transition: 'opacity 0.7s cubic-bezier(0.25,0.1,0.1,1), transform 0.7s cubic-bezier(0.25,0.1,0.1,1)',
      }}
    >
      <div className="relative max-w-[1200px] mx-auto px-6">
        <div className="flex flex-col md:flex-row md:items-center gap-10 md:gap-12">

          {/* Left: text */}
          <div className="md:w-[40%] shrink-0 space-y-4">
            <p className="text-xs tracking-[0.16em] uppercase font-semibold bg-gradient-to-r from-[#3B38B8] to-[#1E1854] bg-clip-text text-transparent">
              What goes up must come down
            </p>
            <h2 className="text-2xl md:text-4xl font-semibold tracking-[-0.03em] leading-[1.08] text-[#1E1854]">
              True health is stability, not the constant swings.
            </h2>
            <p className="text-sm leading-[1.6]" style={{ color: 'rgba(30,24,84,0.55)' }}>
              It's not the highs that wear the body down — it's the constant variation. Every spike demands a recovery. Homeostasis is the body's ability to return to its natural baseline after each disruption. Flow supports five systems that lose that ability first under chronic stress, so the body spends less energy compensating and more in a state it can sustain.
            </p>
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
                  <text x="50" y="49" textAnchor="middle" fontSize="3.2" fontWeight="600" fill="#1E1854" fontFamily="Outfit, system-ui, sans-serif">
                    Flow's contribution
                  </text>
                  <text x="50" y="54.5" textAnchor="middle" fontSize="3.2" fontWeight="600" fill="#1E1854" fontFamily="Outfit, system-ui, sans-serif">
                    to stability.
                  </text>
                </svg>

                {nodes.map((n) => {
                  const rad = ((n.angle - 90) * Math.PI) / 180;
                  const cx = 50 + rx * 100 * Math.cos(rad);
                  const cy = 50 + ry * 100 * Math.sin(rad);
                  return (
                    <div
                      key={n.sentence}
                      className="absolute rounded-2xl flex items-center gap-2.5 px-3.5 py-3"
                      style={{
                        left: `${cx}%`,
                        top: `${cy}%`,
                        transform: 'translate(-50%, -50%)',
                        width: '26%',
                        background: 'linear-gradient(135deg, #3B38B8, #1E1854)',
                        boxShadow: '0 4px 20px rgba(59,56,184,0.3)',
                      }}
                    >
                      <div className="shrink-0" style={{ color: 'white' }}>{n.icon}</div>
                      <p className="text-xs font-semibold leading-[1.3] tracking-[-0.01em] text-white">{n.sentence}</p>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Mobile: single column */}
          <div className="md:hidden flex flex-col gap-3">
          <p className="text-xs tracking-[0.16em] uppercase font-semibold text-[#1E1854] mb-1">
            Flow's contribution to stability
          </p>
            {nodes.map((n) => (
              <div
                key={n.sentence}
                className="rounded-2xl px-4 py-3.5 flex items-center gap-3"
                style={{ background: 'linear-gradient(135deg, #3B38B8, #1E1854)' }}
              >
                <div className="shrink-0" style={{ color: 'white' }}>{n.icon}</div>
                <p className="text-sm font-semibold leading-[1.3] tracking-[-0.01em] text-white">{n.sentence}</p>
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}
