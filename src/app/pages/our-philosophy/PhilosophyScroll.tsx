'use client';

import Image from 'next/image';
import { useCallback, useEffect, useRef, useState } from 'react';

const points = [
  {
    number: '01',
    label: 'The Overstimulation Trap',
    heading: 'Constant noise steals your focus and peace.',
    description: 'We live bombarded by screens, stimulants, processed food, and endless notifications. The quiet struggle is real: scattered thoughts, restless energy, and the deep longing for clarity, unity, and true fulfillment feel harder to reach every day.',
    image: 'https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=1200&q=85&auto=format&fit=crop',
  },
  {
    number: '02',
    label: 'The Silent Toll',
    heading: 'This pace is quietly breaking us.',
    description: 'What once felt like normal hustle is now fueling burnout, hormonal chaos, chronic fatigue, and rising anxiety. More people are waking up to the truth: an exhausted lifestyle cannot lead to lasting health or happiness.',
    image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&q=85&auto=format&fit=crop',
  },
  {
    number: '03',
    label: 'Every Dawn Is Yours',
    heading: 'Design Your Every Morning for Success.',
    description: 'Each new day is a fresh beginning. When you start it with intention and the right ritual, calm focus, motivation, and inner connection naturally follow — because in life, everything is connected.',
    image: 'https://images.unsplash.com/photo-1552196563-55cd4e45efb3?w=1200&q=80&auto=format&fit=crop',
  },
  {
    number: '04',
    label: 'Tranquility as Fuel',
    heading: 'True productivity begins with inner calm.',
    description: 'Real growth and peak performance don\'t come from pushing harder — they come from finding peace. Tranquility restores mental health, sharpens creativity, and becomes the healthiest, most sustainable fuel for becoming your fullest self.',
    image: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=1200&q=85&auto=format&fit=crop',
  },
];

// -1 = closed, 0–3 = open point index
const TOTAL_STATES = points.length + 1; // closed + 4 open

export default function PhilosophyScroll() {
  const outerRef = useRef<HTMLDivElement>(null);
  const activeIndexRef = useRef(-1);
  const cooldownRef = useRef(false);
  const programmaticScrollRef = useRef(false);
  const deltaAccumRef = useRef(0);

  const [activeIndex, setActiveIndex] = useState(-1);
  const [direction, setDirection] = useState<'forward' | 'backward'>('forward');

  const goTo = useCallback((newIndex: number, dir: 'forward' | 'backward') => {
    if (!outerRef.current || cooldownRef.current) return;
    if (newIndex < -1 || newIndex >= points.length) return;

    deltaAccumRef.current = 0;
    cooldownRef.current = true;
    activeIndexRef.current = newIndex;
    setDirection(dir);
    setActiveIndex(newIndex);

    // Keep scroll position in sync: -1 → step 0, 0 → step 1, … 3 → step 4
    const outer = outerRef.current;
    const outerTop = outer.getBoundingClientRect().top + window.scrollY;
    const stepSize = (outer.offsetHeight - window.innerHeight) / TOTAL_STATES;
    const target = outerTop + (newIndex + 1) * stepSize;

    programmaticScrollRef.current = true;
    window.scrollTo(0, target);

    setTimeout(() => {
      programmaticScrollRef.current = false;
      cooldownRef.current = false;
    }, 720);
  }, []);

  useEffect(() => {
    // Compute how far window.scrollY is into the outer spacer div
    const getScrolled = () => {
      if (!outerRef.current) return -1;
      return outerRef.current.getBoundingClientRect().top * -1; // positive once section scrolls past viewport top
    };

    const handleWheel = (e: WheelEvent) => {
      if (!outerRef.current) return;
      const scrolled = getScrolled();
      const maxScrolled = outerRef.current.offsetHeight - window.innerHeight;
      // In the sticky zone when we've scrolled into (but not past) the outer spacer
      const isStuck = scrolled >= -4 && scrolled <= maxScrolled + 4;
      if (!isStuck) return;

      const down = e.deltaY > 0;
      const cur = activeIndexRef.current;

      // At boundaries: release scroll to pass through naturally
      if (down && cur >= points.length - 1) return;
      if (!down && cur <= -1) return;

      // Block ALL native scroll while inside the section
      e.preventDefault();

      if (cooldownRef.current) {
        // Drain accumulator during cooldown so residual momentum can't queue next step
        deltaAccumRef.current = 0;
        return;
      }

      deltaAccumRef.current += e.deltaY;
      if (Math.abs(deltaAccumRef.current) < 60) return;
      deltaAccumRef.current = 0;

      goTo(down ? cur + 1 : cur - 1, down ? 'forward' : 'backward');
    };

    // Touch / mobile fallback — disabled while section is stuck (wheel owns it)
    let ticking = false;
    const handleScroll = () => {
      if (programmaticScrollRef.current || cooldownRef.current || !outerRef.current) return;
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        ticking = false;
        if (!outerRef.current || programmaticScrollRef.current) return;
        const scrolled = getScrolled();
        const total = outerRef.current.offsetHeight - window.innerHeight;
        if (scrolled >= -4 && scrolled <= total + 4) return; // stuck — wheel owns it
        if (total <= 0) return;
        const progress = Math.max(0, Math.min(0.9999, scrolled / total));
        let newIndex = Math.min(points.length - 1, Math.floor(progress * TOTAL_STATES) - 1);
        // Scroll handler can only go backward to closed state; forward from closed requires a wheel event
        if (newIndex > -1 && activeIndexRef.current === -1) return;
        if (newIndex !== activeIndexRef.current) {
          const dir = newIndex > activeIndexRef.current ? 'forward' : 'backward';
          activeIndexRef.current = newIndex;
          setDirection(dir);
          setActiveIndex(newIndex);
        }
      });
    };

    window.addEventListener('wheel', handleWheel, { passive: false });
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('wheel', handleWheel);
      window.removeEventListener('scroll', handleScroll);
    };
  }, [goTo]);

  const isOpen = activeIndex >= 0;
  const isEven = activeIndex % 2 === 0;
  const point = activeIndex >= 0 ? points[activeIndex] : points[0];
  const enterClass = direction === 'forward' ? 'philosophy-enter-forward' : 'philosophy-enter-backward';

  return (
    <section className="border-t border-[#1E1854]/[0.06]">
      {/* Outer spacer: closed + 4 open + 1 exit buffer = 600vh */}
      <div ref={outerRef} style={{ height: `${(points.length + 2) * 100}vh` }} className="relative">
        <div className="sticky top-0 h-screen overflow-hidden bg-[#F8F8FC]">

          {/* ── CLOSED STATE ── 4 tall image cards */}
          <div
            className="absolute inset-0 flex flex-col"
            style={{
              opacity: isOpen ? 0 : 1,
              transform: isOpen ? 'scale(0.97)' : 'scale(1)',
              transition: 'opacity 0.7s cubic-bezier(0.25,0.1,0.1,1), transform 0.7s cubic-bezier(0.25,0.1,0.1,1)',
              pointerEvents: isOpen ? 'none' : 'auto',
            }}
          >
            <div className="flex-1 max-w-[1200px] w-full mx-auto px-6 pt-8 pb-10 flex flex-col min-h-0">
              <div className="mb-5 flex items-end justify-between shrink-0">
                <p className="text-xs tracking-[0.16em] uppercase font-semibold bg-gradient-to-r from-[#3B38B8] to-[#1E1854] bg-clip-text text-transparent">Our Pillars</p>
                <div className="flex items-center gap-1.5 text-[#1E1854]/35">
                  <span className="text-xs tracking-[0.1em] uppercase">Scroll to explore</span>
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="animate-bounce">
                    <path d="M12 5v14M5 12l7 7 7-7"/>
                  </svg>
                </div>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {points.map((p) => (
                  <div key={p.number} className="relative rounded-2xl overflow-hidden group h-[42vh]">
                    <Image
                      src={p.image}
                      alt={p.label}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                      sizes="(max-width: 768px) 50vw, 25vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#1E1854]/85 via-[#1E1854]/20 to-transparent" />
                    <div className="absolute bottom-0 left-0 right-0 p-6 space-y-1">
                      <p className="text-xs font-mono tracking-[0.12em] text-white/45">{p.number}</p>
                      <p className="text-xl font-semibold text-white tracking-[-0.02em] leading-snug">{p.label}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* ── OPEN STATE ── mini-cards nav + full content */}
          <div
            className="absolute inset-0 flex flex-col"
            style={{
              opacity: isOpen ? 1 : 0,
              transform: isOpen ? 'scale(1)' : 'scale(1.03)',
              transition: 'opacity 0.7s cubic-bezier(0.25,0.1,0.1,1), transform 0.7s cubic-bezier(0.25,0.1,0.1,1)',
              pointerEvents: isOpen ? 'auto' : 'none',
            }}
          >
            {/* Mini cards row */}
            <div className="max-w-[1200px] w-full mx-auto px-6 pt-8 pb-5 shrink-0">
              <p className="text-xs tracking-[0.16em] uppercase font-semibold bg-gradient-to-r from-[#3B38B8] to-[#1E1854] bg-clip-text text-transparent mb-5">Our Pillars</p>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {points.map((p, i) => (
                  <div
                    key={p.number}
                    className={`rounded-xl border p-4 transition-all duration-500 ${
                      i === activeIndex
                        ? 'card-selected shadow-lg shadow-[#1E1854]/20'
                        : i < activeIndex
                        ? 'border-[#1E1854]/[0.12] bg-white'
                        : 'border-[#1E1854]/[0.07] bg-white opacity-50'
                    }`}
                  >
                    <p className={`text-xs font-mono tracking-[0.12em] mb-2 ${
                      i === activeIndex ? 'text-white/50' : 'text-[#1E1854]/25'
                    }`}>{p.number}</p>
                    <p className={`text-sm font-semibold tracking-[-0.01em] leading-snug ${
                      i === activeIndex ? 'text-white' : 'text-[#1E1854]'
                    }`}>{p.label}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Unfolded content */}
            <div className="flex-1 max-w-[1200px] w-full mx-auto px-6 pb-10 min-h-0">
              <div className="h-full grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-14 items-center">

                {/* Image — directional crossfade with scale + blur */}
                <div className={`relative rounded-2xl overflow-hidden h-[36vh] md:h-full ring-1 ring-[#1E1854]/[0.08] shadow-xl shadow-[#1E1854]/[0.08] ${
                  isEven ? 'md:order-first' : 'md:order-last'
                }`}>
                  {points.map((p, i) => {
                    const isActive = i === activeIndex;
                    const isPast = i < activeIndex;
                    return (
                      <div
                        key={p.number}
                        className="absolute inset-0"
                        style={{
                          opacity: isActive ? 1 : 0,
                          transform: isActive ? 'scale(1)' : isPast ? 'scale(0.96)' : 'scale(1.06)',
                          filter: isActive ? 'blur(0px)' : 'blur(6px)',
                          transition: 'opacity 0.9s cubic-bezier(0.16,1,0.3,1), transform 0.9s cubic-bezier(0.16,1,0.3,1), filter 0.9s cubic-bezier(0.16,1,0.3,1)',
                        }}
                      >
                        <Image src={p.image} alt={p.heading} fill className="object-cover" sizes="(max-width: 768px) 100vw, 50vw" priority={i === 0} />
                      </div>
                    );
                  })}
                </div>

                {/* Text — staggered directional blur-slide animation */}
                <div
                  key={`${activeIndex}-${direction}`}
                  className={`space-y-5 ${isEven ? 'md:order-last' : 'md:order-first'}`}
                >
                  <p
                    className={`${enterClass} text-xs tracking-[0.16em] uppercase font-semibold bg-gradient-to-r from-[#3B38B8] to-[#1E1854] bg-clip-text text-transparent`}
                    style={{ animationDelay: '0ms' }}
                  >{point.label}</p>
                  <h2
                    className={`${enterClass} text-3xl md:text-[2.4rem] font-semibold tracking-[-0.03em] leading-tight text-[#1E1854]`}
                    style={{ animationDelay: '80ms' }}
                  >
                    {point.heading}
                  </h2>
                  <p
                    className={`${enterClass} text-sm text-[hsla(var(--color-secondary)/0.7)] leading-relaxed max-w-md`}
                    style={{ animationDelay: '160ms' }}
                  >
                    {point.description}
                  </p>
                </div>

              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
