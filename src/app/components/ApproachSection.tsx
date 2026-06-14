'use client';

import Image from 'next/image';

export default function ApproachSection() {
  return (
    <section className="relative overflow-hidden md:rounded-[2rem] md:mx-8 2xl:mx-auto 2xl:max-w-[1216px] min-h-[560px] md:min-h-[600px] flex items-center">

      {/* Background image */}
      <Image
        src="/overstimulation.png"
        alt="A moment of reflection"
        fill
        className="object-cover object-center"
        sizes="100vw"
      />

      {/* Dark overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-black/60" />

      <div className="relative z-10 w-full max-w-[1200px] mx-auto px-6 py-16 md:py-20">
        <div className="flex flex-col md:flex-row md:items-center gap-10 md:gap-16">

          {/* Left — eyebrow + heading */}
          <div className="md:w-[42%] shrink-0 space-y-4">
            <p className="text-xs tracking-[0.16em] uppercase font-semibold text-white/50">
              The neuroscience of progress
            </p>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold leading-[1.08] tracking-[-0.035em] text-white">
              The brain grows by going somewhere it hasn't been before. Flow is there for the journey.
            </h2>
          </div>

          {/* Right — two cards */}
          <div className="flex flex-col gap-4 flex-1">

            {/* Card 1 — biology of growth */}
            <div className="flex-1 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/15 px-6 py-6 space-y-3">
              <p className="text-[10px] tracking-[0.16em] uppercase font-semibold text-white/45">
                The biology of growth
              </p>
              <p className="text-sm text-white/80 leading-[1.6]">
                Discomfort and uncertainty are not signs of failure — they are neuroplasticity in motion. Every unfamiliar challenge triggers new synaptic connections. The friction is the mechanism.
              </p>
            </div>

            {/* Card 2 — Flow's honest position */}
            <div className="flex-1 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/15 px-6 py-6 space-y-3">
              <p className="text-[10px] tracking-[0.16em] uppercase font-semibold text-white/45">
                We celebrate you, not the supplement
              </p>
              <p className="text-sm text-white/80 leading-[1.6]">
                Most brands put the product at the center. We put you there. Flow doesn't make you better — you do that. We support the conditions: steadier energy, clearer thinking, less noise. The work, the repetition, the growth — that's yours.
              </p>
            </div>

          </div>
        </div>
      </div>


    </section>
  );
}
