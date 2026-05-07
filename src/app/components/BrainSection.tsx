'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { CarouselDots } from '@/components/ui/carousel-dots';

const ARTICLES = [
  {
    category: 'Neuroscience',
    title: 'The Complete Guide to Neurotransmitters',
    slug: 'neurotransmitters-guide',
    image: 'https://images.unsplash.com/photo-1507413245164-6160d8298b31?w=800&q=85&auto=format&fit=crop',
  },
  {
    category: 'Sports & Performance',
    title: 'The Brain Behind Athletic Performance',
    slug: 'brain-athletic-performance',
    image: 'https://images.unsplash.com/photo-1476480862126-209bfaa8edc8?w=800&q=85&auto=format&fit=crop',
  },
  {
    category: 'Deep Work',
    title: 'What Focused Work Does to Your Brain',
    slug: 'focused-work-brain',
    image: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=800&q=85&auto=format&fit=crop',
  },
  {
    category: 'Recovery',
    title: 'What the Brain Needs to Truly Recover',
    slug: 'brain-recovery',
    image: 'https://images.unsplash.com/photo-1541781774459-bb2af2f05b55?w=800&q=85&auto=format&fit=crop',
  },
];

export default function BrainSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const stripRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [visible, setVisible] = useState(false);
  const [activeCard, setActiveCard] = useState(0);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          obs.disconnect();
        }
      },
      { threshold: 0.12 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const scrollRafRef = useRef<number | null>(null);
  const handleScroll = () => {
    if (scrollRafRef.current !== null) return;
    scrollRafRef.current = requestAnimationFrame(() => {
      scrollRafRef.current = null;
      const strip = stripRef.current;
      if (!strip) return;
      let closestIdx = 0;
      let closestDist = Infinity;
      cardRefs.current.forEach((card, i) => {
        if (!card) return;
        const dist = Math.abs(card.offsetLeft - strip.scrollLeft);
        if (dist < closestDist) {
          closestDist = dist;
          closestIdx = i;
        }
      });
      setActiveCard(closestIdx);
    });
  };


  const scrollToCard = (i: number) => {
    const card = cardRefs.current[i];
    if (!card) return;
    card.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'start' });
  };

  return (
    <section ref={sectionRef} className="py-20 md:py-24 bg-white overflow-hidden">
      <style>{`
        @keyframes brain-fade-up {
          from { opacity: 0; transform: translateY(18px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .brain-animate {
          opacity: 0;
          animation: brain-fade-up 0.7s cubic-bezier(0.25, 0.1, 0.1, 1) forwards;
        }
        @keyframes card-rise {
          from { opacity: 0; transform: translateY(52px) scale(0.94); }
          to   { opacity: 1; transform: translateY(0) scale(1); }
        }
        .brain-card {
          opacity: 0;
          animation: card-rise 0.75s cubic-bezier(0.22, 0.9, 0.36, 1) forwards;
          transition: transform 0.5s cubic-bezier(0.25, 0.1, 0.1, 1),
                      box-shadow 0.5s cubic-bezier(0.25, 0.1, 0.1, 1);
        }
        .brain-card:hover {
          transform: translateY(-6px);
          box-shadow: 0 12px 36px rgba(30, 24, 84, 0.13);
        }
        .brain-card:hover .brain-card-img {
          transform: scale(1.05);
        }
        .brain-card-img {
          transition: transform 0.7s cubic-bezier(0.25, 0.1, 0.1, 1);
          transform: scale(1);
        }
      `}</style>

      <div className="max-w-[1200px] mx-auto px-6">

        {/* Header */}
        <div className="space-y-3 mb-10 max-w-2xl">
          <p
            className={`text-xs tracking-[0.16em] uppercase font-semibold bg-gradient-to-r from-[#3B38B8] to-[#1E1854] bg-clip-text text-transparent${visible ? ' brain-animate' : ''}`}
            style={visible ? { animationDelay: '0ms' } : {}}
          >
            Our brain sets the tone
          </p>
          <h2
            className={`text-2xl sm:text-3xl md:text-4xl font-semibold tracking-[-0.03em] leading-[1.15] text-[#1E1854]${visible ? ' brain-animate' : ''}`}
            style={visible ? { animationDelay: '80ms' } : {}}
          >
            Flow primes the brain to be effortlessly optimal, helping you achieve more.
          </h2>
          <p
            className={`text-sm sm:text-base text-[#1E1854]/60 leading-[1.7] max-w-xl${visible ? ' brain-animate' : ''}`}
            style={visible ? { animationDelay: '160ms' } : {}}
          >
            Whether it's sports, work, recovery, creativity, or others, Flow's formula optimizes your neurochemistry so you can perform at your best and repeat it the next day.
          </p>
        </div>

        {/* 4-article horizontal strip */}
        <div
          ref={stripRef}
          onScroll={handleScroll}
          className="flex gap-4 overflow-x-auto pb-2 -mx-6 px-6 snap-x snap-mandatory md:mx-0 md:px-0 md:overflow-x-visible md:grid md:grid-cols-4 md:snap-none"
        >
          {ARTICLES.map((article, i) => (
            <div
              key={i}
              ref={(el) => { cardRefs.current[i] = el; }}
              className={`flex-shrink-0 snap-start w-[78vw] sm:w-[48vw] md:w-auto flex flex-col rounded-2xl overflow-hidden border border-[#1E1854]/[0.07] bg-[#F8F8FB] shadow-[0_2px_16px_rgba(30,24,84,0.06)]${visible ? ' brain-card' : ''}`}
              style={visible ? { animationDelay: `${200 + i * 120}ms` } : {}}
            >
            <Link
              href={`/pages/blog-posts/${article.slug}`}
              className="flex flex-col flex-1"
            >
              {/* Cover image */}
              <div className="relative w-full aspect-[4/3] overflow-hidden">
                <Image
                  src={article.image}
                  alt={article.title}
                  fill
                  className="object-cover object-center brain-card-img"
                  sizes="(max-width: 768px) 78vw, 25vw"
                />
              </div>

              {/* Content */}
              <div className="flex flex-col gap-2 p-4">
                <span className="text-[10px] tracking-[0.12em] uppercase font-semibold bg-gradient-to-r from-[#3B38B8] to-[#1E1854] bg-clip-text text-transparent">
                  {article.category}
                </span>
                <p className="text-sm font-semibold text-[#1E1854] leading-snug tracking-[-0.01em]">
                  {article.title}
                </p>
                <span className="text-[10px] tracking-[0.06em] uppercase font-medium text-[#1E1854]/30 mt-1">Read article →</span>
              </div>
            </Link>
            </div>
          ))}
        </div>

        {/* Carousel navigation — mobile only */}
        <div className="md:hidden flex items-center justify-center gap-5 mt-5">
          <button
            onClick={() => scrollToCard(Math.max(0, activeCard - 1))}
            aria-label="Previous card"
            disabled={activeCard === 0}
            className="w-10 h-10 rounded-full bg-[#1E1854]/[0.06] border border-[#1E1854]/10 flex items-center justify-center hover:bg-[#1E1854]/10 disabled:opacity-30 transition-all duration-200"
          >
            <ChevronLeft className="w-4 h-4 text-[#1E1854]/50" />
          </button>

          <CarouselDots
            count={ARTICLES.length}
            current={activeCard}
            onDotClick={scrollToCard}
            variant="dark"
          />

          <button
            onClick={() => scrollToCard(Math.min(ARTICLES.length - 1, activeCard + 1))}
            aria-label="Next card"
            disabled={activeCard === ARTICLES.length - 1}
            className="w-10 h-10 rounded-full bg-[#1E1854]/[0.06] border border-[#1E1854]/10 flex items-center justify-center hover:bg-[#1E1854]/10 disabled:opacity-30 transition-all duration-200"
          >
            <ChevronRight className="w-4 h-4 text-[#1E1854]/50" />
          </button>
        </div>

      </div>
    </section>
  );
}