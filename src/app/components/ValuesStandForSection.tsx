'use client';

import { useEffect, useRef, useState } from 'react';
import ValuePillarsSection from './ValuePillarsSection';

export default function ValuesStandForSection() {
  const textRef = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState<number>();

  useEffect(() => {
    const el = textRef.current;
    if (!el) return;
    const update = () => setHeight(el.offsetHeight);
    update();
    const observer = new ResizeObserver(update);
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div className="flex flex-col md:flex-row gap-4 md:gap-6 items-center md:items-start">
      <div className="w-full md:flex-1" style={height ? { height } : undefined}>
        <ValuePillarsSection />
      </div>
      <div ref={textRef} className="space-y-4 max-w-sm md:w-[400px] md:shrink-0">
        <p className="text-xs tracking-[0.16em] uppercase font-semibold bg-gradient-to-r from-brand to-ink bg-clip-text text-transparent">What we stand for</p>
        <h2 className="flow-h2">
          Being transparent on our intentions and guiding principles is vital to us.
        </h2>
        <p className="text-sm text-[rgba(30,24,84,0.65)] leading-relaxed">
          What a brand stands for matters as much as what it makes. That&apos;s why we choose to be open about our values, the causes we champion, and the commitments we hold ourselves to: because we&apos;re not just building a supplement, we&apos;re building something people can believe in.
        </p>
      </div>
    </div>
  );
}
