'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { CarouselDots } from '@/components/ui/carousel-dots';

function ArrowDown({ align = 'center', dark = false }: { align?: 'center' | 'left'; dark?: boolean }) {
  const color = dark ? 'rgba(30,24,84,0.3)' : 'rgba(255,255,255,0.4)';
  return (
    <div className={`flex my-2 ${align === 'left' ? 'justify-start pl-1' : 'justify-center'}`}>
      <svg width="12" height="18" viewBox="0 0 12 18" fill="none" aria-hidden="true">
        <path d="M1 6 L6 11 L11 6" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </div>
  );
}


export default function OverstimulationSection() {
  const [flipped, setFlipped] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [visible, setVisible] = useState(false);

  // Front side mobile scroll
  const [mobileStep, setMobileStep] = useState(0);
  const [scrollOffset, setScrollOffset] = useState(0);

  // Back side mobile scroll
  const [backMobileStep, setBackMobileStep] = useState(0);
  const [backScrollOffset, setBackScrollOffset] = useState(0);

  const sectionRef = useRef<HTMLElement>(null);
  const thirdCardRef = useRef<HTMLDivElement>(null);
  const colRef = useRef<HTMLDivElement>(null);
  const backThirdCardRef = useRef<HTMLDivElement>(null);
  const backColRef = useRef<HTMLDivElement>(null);

  // Intersection observer — trigger entrance animation
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); observer.disconnect(); } },
      { threshold: 0.1 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const calculateOffset = () => {
    if (!thirdCardRef.current || !colRef.current) return 0;
    const colRect = colRef.current.getBoundingClientRect();
    const cardRect = thirdCardRef.current.getBoundingClientRect();
    return Math.max(0, cardRect.bottom + 12 - colRect.bottom);
  };

  const calculateBackOffset = () => {
    if (!backThirdCardRef.current || !backColRef.current) return 0;
    const colRect = backColRef.current.getBoundingClientRect();
    const cardRect = backThirdCardRef.current.getBoundingClientRect();
    return Math.max(0, cardRect.bottom + 12 - colRect.bottom);
  };


  const handleStepChange = (i: number) => {
    if (i === 1) { setScrollOffset(calculateOffset()); setMobileStep(1); }
    else { setMobileStep(0); setScrollOffset(0); }
  };

  const handleBackStepChange = (i: number) => {
    if (i === 1) { setBackScrollOffset(calculateBackOffset()); setBackMobileStep(1); }
    else { setBackMobileStep(0); setBackScrollOffset(0); }
  };

  const peekAngle = flipped ? 'rotateY(165deg)' : 'rotateY(15deg)';
  const fullAngle = flipped ? 'rotateY(180deg)' : 'rotateY(0deg)';

  return (
    <section ref={sectionRef} className="py-14 md:py-24 bg-white overflow-x-hidden">
      <div className="flow-container">

        {/* Subheader + heading — above card */}
        <div
          className="text-center mb-8 md:mb-10 space-y-3 transition-all duration-700"
          style={{ opacity: visible ? 1 : 0, transform: visible ? 'translateY(0)' : 'translateY(12px)' }}
        >
          <p className="text-xs tracking-[0.16em] uppercase font-semibold bg-gradient-to-r from-brand to-ink bg-clip-text text-transparent">
            The Over-stimulation Cycle
          </p>
          <h2 className="flow-h2">
            Your brain was not built for this.
          </h2>
        </div>

        {/* Image card */}
        <div
          className="rounded-3xl bg-[#EEEDF5] transition-all duration-900"
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? 'translateY(0)' : 'translateY(28px)',
            transitionDelay: '150ms',
            transitionTimingFunction: 'cubic-bezier(0.25, 0.1, 0.1, 1)',
          }}
        >

          {/* Image flip */}
          <div className="relative w-full" style={{ perspective: '1400px' }}>

            <div
              className="relative w-full transition-transform duration-700"
              style={{
                transformStyle: 'preserve-3d',
                transform: hovered ? peekAngle : fullAngle,
                transitionTimingFunction: 'cubic-bezier(0.25, 0.1, 0.1, 1)',
                transitionDuration: hovered ? '400ms' : '700ms',
                willChange: 'transform',
              }}
            >

              {/* ── FRONT — Over-stimulated ── */}
              <div
                className="relative w-full aspect-[4/5] sm:aspect-[4/3] md:aspect-[3/2] xl:aspect-[2/1] rounded-3xl overflow-hidden cursor-pointer"
                style={{ backfaceVisibility: 'hidden' }}
                onClick={() => setFlipped(true)}
              >
                <Image
                  src="/overstimulation.png"
                  alt="Overstimulated state"
                  fill
                  className="object-cover object-center"
                  sizes="(max-width: 768px) 100vw, 1200px"
                />

                {/* Right column — scrollable on mobile */}
                <div
                  ref={colRef}
                  className="absolute top-5 right-0 bottom-5 md:top-7 md:bottom-7 w-[55%] sm:w-[48%] md:w-[48%] overflow-hidden flex flex-col justify-start md:justify-center gap-0 px-5 md:px-10"
                >
                  <div
                    className="flex flex-col gap-0 transition-transform duration-1000 py-4"
                    style={{
                      transform: mobileStep === 1 ? `translateY(-${scrollOffset}px)` : 'translateY(0)',
                      transitionTimingFunction: 'cubic-bezier(0.25, 0.1, 0.1, 1)',
                    }}
                  >
                    <div className="bg-black/35 backdrop-blur-md rounded-xl p-3.5 md:p-5">
                      <p className="text-xs md:text-sm font-semibold text-white tracking-[-0.01em] mb-1.5">The Brain Locks into Hyperactivation.</p>
                      <p className="text-[11px] md:text-xs text-white/55 leading-relaxed">
                        Dopamine spikes then crashes, cortisol rises, and the nervous system locks into sustained high alert.
                      </p>
                    </div>

                    {/* ↓↑ side by side — cycle between containers 1 and 2 */}
                    <div className="flex items-center gap-1 my-2 pl-1" aria-hidden="true">
                      <svg width="12" height="18" viewBox="0 0 12 18" fill="none">
                        <path d="M1 6 L6 11 L11 6" stroke="rgba(255,255,255,0.4)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                      <svg width="12" height="18" viewBox="0 0 12 18" fill="none">
                        <path d="M1 12 L6 7 L11 12" stroke="rgba(255,255,255,0.4)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </div>

                    <div className="bg-black/35 backdrop-blur-md rounded-xl p-3.5 md:p-5">
                      <p className="text-xs md:text-sm font-semibold text-white tracking-[-0.01em] mb-1.5">Always Craving More</p>
                      <p className="text-[11px] md:text-xs text-white/55 leading-relaxed">
                        Tolerance builds, the baseline rises, and restlessness replaces calm as the default state.
                      </p>
                    </div>

                    {/* = result separator */}
                    <div className="flex my-2 pl-1" aria-hidden="true">
                      <svg width="16" height="10" viewBox="0 0 16 10" fill="none">
                        <line x1="0" y1="2" x2="16" y2="2" stroke="rgba(255,255,255,0.4)" strokeWidth="1.5" strokeLinecap="round" />
                        <line x1="0" y1="8" x2="16" y2="8" stroke="rgba(255,255,255,0.4)" strokeWidth="1.5" strokeLinecap="round" />
                      </svg>
                    </div>

                    <div ref={thirdCardRef} className="bg-black/35 backdrop-blur-md rounded-xl p-3.5 md:p-5">
                      <p className="text-xs md:text-sm font-semibold text-white tracking-[-0.01em] mb-1.5">Poor Long-Term Impact</p>
                      <p className="text-[11px] md:text-xs text-white/55 leading-relaxed">
                        Shortened attention, mood instability, poor sleep, and depleted cognitive reserve accumulate.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Mobile navigation — front side, bottom-left */}
                <div className="md:hidden absolute bottom-4 left-4 flex items-center gap-3">
                  <button
                    onClick={(e) => { e.stopPropagation(); handleStepChange(0); }}
                    disabled={mobileStep === 0}
                    aria-label="Previous"
                    className="w-7 h-7 rounded-full bg-white/15 flex items-center justify-center disabled:opacity-30 active:bg-white/25 transition-all duration-200"
                  >
                    <ChevronLeft className="w-3.5 h-3.5 text-white/70" />
                  </button>
                  <CarouselDots
                    count={2}
                    current={mobileStep}
                    onDotClick={handleStepChange}
                    variant="light"
                  />
                  <button
                    onClick={(e) => { e.stopPropagation(); handleStepChange(1); }}
                    disabled={mobileStep === 1}
                    aria-label="Next"
                    className="w-7 h-7 rounded-full bg-white/15 flex items-center justify-center disabled:opacity-30 active:bg-white/25 transition-all duration-200"
                  >
                    <ChevronRight className="w-3.5 h-3.5 text-white/70" />
                  </button>
                </div>

              </div>

              {/* ── BACK — Inner stability ── */}
              <div
                className="absolute inset-0 w-full rounded-3xl overflow-hidden cursor-pointer"
                style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}
                onClick={() => setFlipped(false)}
              >
                <Image
                  src="/inner-stability.png"
                  alt="Inner stability state"
                  fill
                  className="object-cover object-center"
                  sizes="(max-width: 768px) 100vw, 1200px"
                />

                {/* Left column */}
                <div
                  ref={backColRef}
                  className="absolute top-5 left-0 bottom-5 md:top-7 md:bottom-7 w-[55%] sm:w-[48%] md:w-[48%] overflow-hidden flex flex-col justify-start md:justify-center gap-0 px-5 md:px-10"
                >
                  <div
                    className="flex flex-col gap-0 transition-transform duration-1000 py-4"
                    style={{
                      transform: backMobileStep === 1 ? `translateY(-${backScrollOffset}px)` : 'translateY(0)',
                      transitionTimingFunction: 'cubic-bezier(0.25, 0.1, 0.1, 1)',
                    }}
                  >
                    <div className="bg-black/30 backdrop-blur-md rounded-xl p-3.5 md:p-5">
                      <p className="text-xs md:text-sm font-semibold text-white tracking-[-0.01em] mb-1.5">Flow Sustained Energy</p>
                      <p className="text-[11px] md:text-xs text-white/55 leading-relaxed">
                        Unlike stimulants, Flow doesn't spike dopamine or cortisol. Receptors recover, the nervous system rebalances, and the brain gets more stable energy.
                      </p>
                    </div>
                    <ArrowDown align="left" />
                    <div className="bg-black/30 backdrop-blur-md rounded-xl p-3.5 md:p-5">
                      <p className="text-xs md:text-sm font-semibold text-white tracking-[-0.01em] mb-1.5">Steadiness Returns</p>
                      <p className="text-[11px] md:text-xs text-white/55 leading-relaxed">
                        Focus sharpens, mood stabilises, and the urge for constant input quietly fades.
                      </p>
                    </div>
                    <ArrowDown align="left" />
                    <div ref={backThirdCardRef} className="bg-black/30 backdrop-blur-md rounded-xl p-3.5 md:p-5">
                      <p className="text-xs md:text-sm font-semibold text-white tracking-[-0.01em] mb-1.5">Long-Term Clarity</p>
                      <p className="text-[11px] md:text-xs text-white/55 leading-relaxed">
                        Sustained attention, emotional resilience, deep sleep, and renewed cognitive capacity build over time.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Mobile navigation — back side, bottom-right */}
                <div className="md:hidden absolute bottom-4 right-4 flex items-center gap-3">
                  <button
                    onClick={(e) => { e.stopPropagation(); handleBackStepChange(0); }}
                    disabled={backMobileStep === 0}
                    aria-label="Previous"
                    className="w-7 h-7 rounded-full bg-white/15 flex items-center justify-center disabled:opacity-30 active:bg-white/25 transition-all duration-200"
                  >
                    <ChevronLeft className="w-3.5 h-3.5 text-white/70" />
                  </button>
                  <CarouselDots
                    count={2}
                    current={backMobileStep}
                    onDotClick={handleBackStepChange}
                    variant="light"
                  />
                  <button
                    onClick={(e) => { e.stopPropagation(); handleBackStepChange(1); }}
                    disabled={backMobileStep === 1}
                    aria-label="Next"
                    className="w-7 h-7 rounded-full bg-white/15 flex items-center justify-center disabled:opacity-30 active:bg-white/25 transition-all duration-200"
                  >
                    <ChevronRight className="w-3.5 h-3.5 text-white/70" />
                  </button>
                </div>

              </div>

            </div>
          </div>

        </div>{/* end image card */}

        {/* Switch CTA — below the card */}
        <div
          className="mt-5 flex justify-center transition-all duration-700"
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? 'translateY(0)' : 'translateY(12px)',
            transitionDelay: '300ms',
            transitionTimingFunction: 'cubic-bezier(0.25, 0.1, 0.1, 1)',
          }}
        >
          <button
            className="group inline-flex items-center gap-2 border border-ink/20 rounded-full px-5 py-2.5 text-xs tracking-[0.08em] uppercase font-medium text-ink/55 hover:text-ink hover:border-ink/40 hover:bg-ink/[0.03] hover:shadow-[0_2px_12px_rgba(30,24,84,0.08)] transition-all duration-300"
            onClick={() => { setHovered(false); setMobileStep(0); setScrollOffset(0); setBackMobileStep(0); setBackScrollOffset(0); setFlipped(f => !f); }}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
          >
            {!flipped ? 'See inner stability' : 'See overstimulated side'}
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true" className="transition-transform duration-300 group-hover:rotate-180">
              <path d="M2 7 C2 4.2 4.2 2 7 2 C9 2 10.7 3.1 11.5 4.7" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
              <path d="M9.5 4.2 L11.5 4.7 L11 6.7" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M12 7 C12 9.8 9.8 12 7 12 C5 12 3.3 10.9 2.5 9.3" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
              <path d="M4.5 9.8 L2.5 9.3 L3 7.3" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </div>

      </div>
    </section>
  );
}