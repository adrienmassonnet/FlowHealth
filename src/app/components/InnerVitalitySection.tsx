'use client';

import { useEffect, useRef, useState } from 'react';
import { StepCard } from './StepCard';

const lines = [
  {
    label: 'Find your calm',
    body: 'Noise vibrates, calm resonates. Favour moments where you can connect with your inner self.',
  },
  {
    label: 'Follow what draws you',
    body: 'Move towards what matters: passions, rituals, the things that make you feel alive.',
  },
  {
    label: 'Become who you want to be',
    body: 'The person built in quiet hours shows up fully: healthier, happier, more present.',
  },
];

function fade(visible: boolean, delay: number) {
  return {
    opacity: visible ? 1 : 0,
    transition: `opacity 2.4s ease ${delay}ms`,
  };
}

export default function InnerVitalitySection() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.1 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={ref}
      className="relative overflow-hidden py-16 md:py-24"
      style={{
        background: visible ? 'var(--color-ink)' : '#0e0c2e',
        transition: 'background 5s cubic-bezier(0.16,1,0.3,1) 1800ms',
      }}
    >
      {/* Mobile orb — bottom right glimmer */}
      <div
        className="pointer-events-none absolute md:hidden"
        style={{
          right: '-10%',
          bottom: '-10%',
          width: '60vw',
          height: '60vw',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(220,230,255,0.16) 0%, rgba(180,200,255,0.07) 45%, transparent 70%)',
          filter: 'blur(30px)',
          opacity: visible ? 1 : 0,
          transition: 'opacity 4s cubic-bezier(0.16,1,0.3,1) 2000ms',
        }}
      />
      {/* Sunrise — wide diffuse atmospheric glow */}
      <div
        className="pointer-events-none absolute"
        style={{
          right: '-20%',
          bottom: '-60%',
          width: '110vw',
          height: '110vw',
          maxWidth: 1100,
          maxHeight: 1100,
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(200,210,255,0.13) 0%, rgba(160,180,255,0.07) 40%, rgba(100,120,255,0.03) 65%, transparent 80%)',
          filter: 'blur(80px)',
          opacity: visible ? 1 : 0,
          transform: visible ? 'translateY(0)' : 'translateY(100%)',
          transition: 'opacity 5s cubic-bezier(0.16,1,0.3,1) 1800ms, transform 6s cubic-bezier(0.16,1,0.3,1) 1800ms',
        }}
      />
      {/* Mid glow */}
      <div
        className="pointer-events-none absolute"
        style={{
          right: '0%',
          bottom: '-45%',
          width: '80vw',
          height: '80vw',
          maxWidth: 800,
          maxHeight: 800,
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(220,230,255,0.18) 0%, rgba(180,200,255,0.09) 45%, transparent 72%)',
          filter: 'blur(50px)',
          opacity: visible ? 1 : 0,
          transform: visible ? 'translateY(0)' : 'translateY(100%)',
          transition: 'opacity 4.5s cubic-bezier(0.16,1,0.3,1) 2200ms, transform 5.5s cubic-bezier(0.16,1,0.3,1) 2200ms',
        }}
      />
      {/* Inner core */}
      <div
        className="pointer-events-none absolute"
        style={{
          right: '10%',
          bottom: '-30%',
          width: '40vw',
          height: '40vw',
          maxWidth: 400,
          maxHeight: 400,
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(255,255,255,0.22) 0%, rgba(200,215,255,0.12) 40%, transparent 68%)',
          filter: 'blur(24px)',
          opacity: visible ? 1 : 0,
          transform: visible ? 'translateY(0)' : 'translateY(100%)',
          transition: 'opacity 4s cubic-bezier(0.16,1,0.3,1) 2600ms, transform 5s cubic-bezier(0.16,1,0.3,1) 2600ms',
        }}
      />

      <div className="relative z-10 flow-container">

        <div className="flex flex-col md:flex-row gap-10 md:gap-16 items-center">

        {/* Left — header */}
        <div className="md:w-[36%] shrink-0 space-y-3">

          <p
            className="text-xs tracking-[0.16em] uppercase font-semibold"
            style={{ color: 'rgba(180,200,255,0.8)', ...fade(visible, 200) }}
          >
            your morning belongs to you
          </p>

          <h2
            className="flow-h2 text-white"
            style={fade(visible, 700)}
          >
            Those who look inward perform better, feel better, and live better.
          </h2>

          <p
            className="text-base leading-[1.6]"
            style={{ color: 'rgba(255,255,255,0.45)', ...fade(visible, 1200) }}
          >
            Inner vitality is not a luxury. It is the foundation: the quiet morning work that makes everything else possible.
          </p>

        </div>

        {/* Right — cards vertical */}
        <div className="flex-1 flex flex-col gap-4">
          {lines.map(({ label, body }, i) => (
            <StepCard
              key={label}
              tone="dark"
              number={i + 1}
              title={label}
              description={body}
              style={fade(visible, 1700 + i * 400) as React.CSSProperties}
            />
          ))}
        </div>

        </div>{/* end flex row */}

      </div>
    </section>
  );
}
