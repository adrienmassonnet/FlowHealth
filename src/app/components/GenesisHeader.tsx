'use client';

import { useEffect, useRef, useState } from 'react';

export default function GenesisHeader() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) { setVisible(true); obs.disconnect(); }
      },
      { threshold: 0.15 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <>
      <style>{`
        @keyframes genesis-fade-up {
          from { opacity: 0; transform: translateY(18px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .genesis-animate {
          opacity: 0;
          animation: genesis-fade-up 0.75s cubic-bezier(0.25, 0.1, 0.1, 1) forwards;
        }
      `}</style>
      <div ref={ref} className="max-w-[920px] mx-auto px-6 text-center space-y-6">
        <p
          className={`text-xs tracking-[0.16em] uppercase font-semibold bg-gradient-to-r from-brand to-ink bg-clip-text text-transparent${visible ? ' genesis-animate' : ' opacity-0'}`}
          style={visible ? { animationDelay: '0ms' } : {}}
        >
          conceived to remove the noise
        </p>
        <h2
          className={`text-2xl sm:text-3xl md:text-4xl font-semibold tracking-[-0.03em] leading-[1.2] text-ink${visible ? ' genesis-animate' : ' opacity-0'}`}
          style={visible ? { animationDelay: '100ms' } : {}}
        >
          Flow is made for those whose minds refuse to settle but who seek inner peace.
        </h2>
        <p
          className={`text-base text-ink/65 leading-[1.7] max-w-[620px] mx-auto${visible ? ' genesis-animate' : ' opacity-0'}`}
          style={visible ? { animationDelay: '200ms' } : {}}
        >
          Flow is more than a product. It embodies an investment in ourselves and gets us closer to reaching our goals.
        </p>
      </div>
    </>
  );
}