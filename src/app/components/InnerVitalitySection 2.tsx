'use client';

import { useEffect, useRef, useState } from 'react';

const lines = [
  {
    label: 'Tune inward',
    body: 'The most powerful thing you can do each morning is protect your time — before the world claims it.',
  },
  {
    label: 'Become yourself',
    body: 'Real energy is not borrowed from caffeine or urgency. It grows when you move at your own rhythm.',
  },
  {
    label: 'Resonate',
    body: 'Loud vibrates, but calm resonates. Flow is built for those who know the difference.',
  },
];

export default function InnerVitalitySection() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.15 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={ref} className="bg-[#F9F9FB] py-16 md:py-24">
      <div className="max-w-[1200px] mx-auto px-6">

        {/* Header */}
        <div
          className="max-w-[640px] mb-12 md:mb-16 space-y-3 transition-all duration-700"
          style={{ opacity: visible ? 1 : 0, transform: visible ? 'none' : 'translateY(16px)' }}
        >
          <p className="text-xs tracking-[0.16em] uppercase font-semibold bg-gradient-to-r from-[#3B38B8] to-[#1E1854] bg-clip-text text-transparent">
            inner vitality
          </p>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold leading-[1.08] tracking-[-0.03em] text-[#1E1854]">
            Your mornings belong to you.
          </h2>
          <p className="text-base text-[#1E1854]/55 leading-[1.6]">
            True performance starts from within — when you take time to listen, reflect, and grow on your own terms.
          </p>
        </div>

        {/* Three pillars */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
          {lines.map(({ label, body }, i) => (
            <div
              key={label}
              className="rounded-2xl border border-[#1E1854]/[0.07] bg-white px-6 py-7 flex flex-col gap-3 transition-all duration-700"
              style={{
                opacity: visible ? 1 : 0,
                transform: visible ? 'none' : 'translateY(20px)',
                transitionDelay: `${i * 100 + 150}ms`,
              }}
            >
              <span className="w-7 h-7 rounded-full bg-[#1E1854]/[0.06] flex items-center justify-center text-[#1E1854]/40 text-xs font-semibold">
                {i + 1}
              </span>
              <p className="text-base font-semibold tracking-[-0.01em] text-[#1E1854]">{label}</p>
              <p className="text-sm leading-[1.6] text-[#1E1854]/55">{body}</p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
