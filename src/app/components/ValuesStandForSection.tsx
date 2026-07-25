'use client';

import ValuePillarsSection from './ValuePillarsSection';

export default function ValuesStandForSection() {
  return (
    // Mobile: text first, accordion below (flex-col-reverse over the DOM order).
    // Desktop: accordion left, text right.
    <div className="flex flex-col-reverse md:flex-row gap-6 md:gap-10 md:items-start">
      <div className="w-full md:flex-1">
        <ValuePillarsSection />
      </div>
      <div className="space-y-4 md:w-[400px] md:shrink-0">
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
