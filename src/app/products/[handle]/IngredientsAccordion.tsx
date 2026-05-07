'use client';

import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import { AnimatePresence, motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import type { Ingredient } from '@/lib/content';

type IngredientCard = { name: string; category: string; tagline: string; description: string; image: string };

const categories: Record<string, string> = {
  all: 'All',
  adaptogens: 'Adaptogens',
  'amino-acids': 'Amino Acids',
  'plant-extracts': 'Plant Extracts',
  minerals: 'Minerals',
  vitamins: 'Vitamins',
  'gut-health': 'Gut Health',
};

const ITEMS_PER_PAGE = 6;

function IngredientCardTile({ name, image, onClick }: { name: string; image: string; onClick: () => void }) {
  return (
    <div
      className="cursor-pointer rounded-2xl overflow-hidden border border-[var(--color-border)] group"
      onClick={onClick}
    >
      <div className="relative aspect-[4/3] md:aspect-auto md:h-[clamp(140px,16vh,200px)] w-full bg-[#f5f5fc]">
        {image && (image.startsWith('/') || image.startsWith('http')) && (
          <Image
            src={image}
            alt={name}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
            sizes="(max-width: 768px) 50vw, 33vw"
            unoptimized={!image.startsWith('/')}
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/15 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-3">
          <p className="text-sm font-semibold text-white leading-snug">{name}</p>
        </div>
      </div>
    </div>
  );
}

export default function IngredientsAccordion({ ingredients }: { ingredients: Ingredient[] }) {
  const cards: IngredientCard[] = ingredients.map((ing) => ({
    name: ing.name,
    category: ing.category,
    tagline: ing.dose,
    description: ing.description,
    image: ing.imageUrl ?? '',
  }));
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [page, setPage] = useState(0);
  const [activeCard, setActiveCard] = useState<IngredientCard | null>(null);
  const categoryTabsRef = useRef<HTMLDivElement>(null);

  // Scroll selected category to the left when it changes
  useEffect(() => {
    if (!categoryTabsRef.current) return;
    const btn = categoryTabsRef.current.querySelector<HTMLElement>(`[data-category="${selectedCategory}"]`);
    if (btn) btn.scrollIntoView({ behavior: 'smooth', inline: 'start', block: 'nearest' });
  }, [selectedCategory]);

  const filtered = selectedCategory === 'all'
    ? cards
    : cards.filter((i) => i.category === selectedCategory);

  const totalPages = Math.max(1, Math.ceil(filtered.length / ITEMS_PER_PAGE));
  const safePage = Math.min(page, totalPages - 1);
  const visible = filtered.slice(safePage * ITEMS_PER_PAGE, (safePage + 1) * ITEMS_PER_PAGE);
  const placeholderCount = ITEMS_PER_PAGE - visible.length;

  return (
    <section className="max-w-[1200px] mx-auto px-6 pt-4 pb-20 md:pt-8">
      <div className="mb-5 space-y-2">
        <h2 className="text-3xl font-semibold tracking-[-0.02em]">15 active compounds</h2>
      </div>

      {/* Mobile: horizontal scroll tabs */}
      <div
        className="flex md:hidden flex-nowrap gap-1.5 mb-6 overflow-x-auto pb-1"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {Object.entries(categories).map(([key, label]) => {
          const count = key === 'all' ? cards.length : cards.filter((c) => c.category === key).length;
          return (
            <button
              key={key}
              onClick={() => { setSelectedCategory(key); setPage(0); setActiveCard(null); }}
              className={cn(
                'shrink-0 whitespace-nowrap rounded-xl px-4 py-2 text-sm font-medium transition-all duration-200 flex items-center gap-2',
                selectedCategory === key
                  ? 'bg-[#1E1854]/8 text-[#1E1854]'
                  : 'text-[#1E1854]/45 hover:text-[#1E1854]/70 hover:bg-[#1E1854]/4'
              )}
            >
              {label}
              <span className={cn(
                'text-xs font-semibold rounded-full px-1.5 py-0.5 leading-none',
                selectedCategory === key ? 'bg-[#1E1854]/12 text-[#1E1854]/70' : 'bg-[#1E1854]/6 text-[#1E1854]/35'
              )}>{count}</span>
            </button>
          );
        })}
      </div>

      {/* Two-column layout: sidebar + grid */}
      <div className="flex gap-8 items-start">

        {/* Category sidebar — desktop only */}
        <div
          ref={categoryTabsRef}
          className="hidden md:flex flex-col gap-1 w-40 shrink-0 sticky top-24"
        >
          {Object.entries(categories).map(([key, label]) => {
            const count = key === 'all' ? cards.length : cards.filter((c) => c.category === key).length;
            return (
              <button
                key={key}
                data-category={key}
                onClick={() => { setSelectedCategory(key); setPage(0); setActiveCard(null); }}
                className={cn(
                  'relative rounded-xl px-4 py-2 text-sm font-medium transition-all duration-200 flex items-center justify-between gap-2 w-full text-left',
                  selectedCategory === key
                    ? 'bg-[#E8E7F5] text-[#1E1854]'
                    : 'text-[#1E1854]/45 hover:text-[#1E1854]/70 hover:bg-[#1E1854]/4'
                )}
              >
                {label}
                <span className={cn(
                  'text-xs font-semibold rounded-full px-1.5 py-0.5 leading-none transition-colors duration-200 shrink-0',
                  selectedCategory === key
                    ? 'bg-[#1E1854]/6 text-[#1E1854]/40'
                    : 'bg-[#1E1854]/4 text-[#1E1854]/25'
                )}>{count}</span>
              </button>
            );
          })}
        </div>

        {/* Right: card grid + pagination */}
        <div className="flex-1 min-w-0">
          {/* Card grid — always full height with placeholders */}
          <AnimatePresence mode="wait">
            <motion.div
              key={`${selectedCategory}-${safePage}`}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.2 }}
              className="grid grid-cols-2 sm:grid-cols-3 gap-4"
            >
              {visible.map((ing) => (
                <IngredientCardTile
                  key={ing.name}
                  name={ing.name}
                  image={ing.image}
                  onClick={() => setActiveCard(ing)}
                />
              ))}
              {Array.from({ length: placeholderCount }).map((_, i) => (
                <div key={`ph-${i}`} className="rounded-2xl aspect-[4/3] invisible" />
              ))}
            </motion.div>
          </AnimatePresence>

          {/* Carousel navigation — always reserve space */}
          <div className="mt-8 flex items-center justify-center gap-5">
        <button
          onClick={() => setPage((p) => Math.max(0, p - 1))}
          disabled={safePage === 0}
          aria-label="Previous ingredients"
          className="w-8 h-8 flex items-center justify-center text-[#1E1854]/65 disabled:opacity-25 disabled:pointer-events-none hover:text-[#1E1854] transition-colors duration-300"
        >
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
            <path d="M11 4L6 9L11 14" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
        <div className="flex items-center gap-1.5">
          {Array.from({ length: totalPages }).map((_, i) => (
            <button
              key={i}
              onClick={() => setPage(i)}
              aria-label={`Page ${i + 1}`}
              className={`rounded-full transition-all duration-300 ${i === safePage ? 'w-5 h-1 bg-[#1E1854]/35' : 'w-1.5 h-1.5 bg-[#1E1854]/12 hover:bg-[#1E1854]/25'}`}
            />
          ))}
        </div>
        <button
          onClick={() => setPage((p) => Math.min(totalPages - 1, p + 1))}
          disabled={safePage === totalPages - 1}
          aria-label="Next ingredients"
          className="w-8 h-8 flex items-center justify-center text-[#1E1854]/65 disabled:opacity-25 disabled:pointer-events-none hover:text-[#1E1854] transition-colors duration-300"
        >
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
            <path d="M7 4L12 9L7 14" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
      </div>
        </div>{/* end right column */}
      </div>{/* end two-column layout */}

      {/* Ingredient modal */}
      <AnimatePresence>
      {activeCard && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          className="fixed inset-0 z-50 flex items-end sm:items-center justify-center"
          onClick={() => setActiveCard(null)}
        >
          <div className="absolute inset-0 bg-[#1E1854]/60 backdrop-blur-sm" />
          <motion.div
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            className="relative w-full sm:max-w-md bg-white rounded-t-3xl sm:rounded-3xl shadow-2xl flex flex-col max-h-[90svh]"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Image */}
            {activeCard.image && (
              <div className="relative w-full h-28 sm:h-40 shrink-0 overflow-hidden rounded-t-3xl">
                <Image
                  src={activeCard.image}
                  alt={activeCard.name}
                  fill
                  className="object-cover"
                  sizes="448px"
                  unoptimized={!activeCard.image.startsWith('/')}
                />
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-white/90" />
              </div>
            )}

            {/* Close */}
            <button
              onClick={() => setActiveCard(null)}
              aria-label="Close"
              className="absolute top-3 right-4 z-10 w-8 h-8 flex items-center justify-center rounded-full bg-white/80 backdrop-blur-sm text-[#1E1854]/50 hover:text-[#1E1854] hover:bg-white transition-colors duration-200"
            >
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M11 3L3 11M3 3l8 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
              </svg>
            </button>

            <div className="flex-1 px-7 pt-4 overflow-y-auto" style={{ paddingBottom: 'max(2rem, env(safe-area-inset-bottom))' }}>
              <h3 className="text-xl font-semibold text-[#1E1854] tracking-[-0.02em] leading-snug mb-1">{activeCard.name}</h3>
              {activeCard.tagline && (
                <span className="inline-block text-xs tracking-[0.08em] uppercase font-semibold bg-[#1E1854]/8 text-[#1E1854]/55 px-2.5 py-1 rounded-full mb-3">
                  {activeCard.tagline}
                </span>
              )}
              <p className="text-sm text-[#1E1854]/65 leading-relaxed">{activeCard.description}</p>
            </div>
          </motion.div>
        </motion.div>
      )}
      </AnimatePresence>
    </section>
  );
}
