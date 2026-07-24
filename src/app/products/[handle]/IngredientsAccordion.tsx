'use client';

import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import { AnimatePresence, motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { EASE } from '@/lib/animation';
import type { Ingredient } from '@/lib/content';
import { trackEvent } from '@/lib/clarity';
import { ga4SelectContent } from '@/lib/ga4';

type IngredientCard = { name: string; category: string; tagline: string; description: string; image: string };

const ingredientPillsRaw: Array<{ keywords: string[]; pills: string[] }> = [
  { keywords: ['hibiscus'],                         pills: ['Antioxidant', 'Blood Flow', 'Calm'] },
  { keywords: ['rooibos'],                          pills: ['Antioxidant', 'Stress Relief', 'Calm'] },
  { keywords: ['mango', 'zynamite'],                pills: ['Focus', 'Mental Clarity', 'Anti-Fatigue'] },
  { keywords: ['green tea'],                        pills: ['Energy', 'Attention', 'Alertness'] },
  { keywords: ["lion's mane", 'lion mane'],         pills: ['Memory', 'Neuroplasticity', 'Brain Health'] },
  { keywords: ['ginseng'],                          pills: ['Stamina', 'Memory', 'Anti-Fatigue'] },
  { keywords: ['saffron', "saffr'active"],          pills: ['Mood', 'Emotional Balance', 'Serotonin'] },
  { keywords: ['inulin'],                           pills: ['Gut-Brain Axis', 'Microbiome', 'Mood'] },
  { keywords: ['betaine', 'trimethylglycine', 'tmg'], pills: ['Methylation', 'Energy', 'Brain Chemistry'] },
  { keywords: ['magnesium'],                        pills: ['Relaxation', 'Sleep', 'Stress Relief'] },
  { keywords: ['sodium citrate'],                   pills: ['Hydration', 'Electrolytes', 'Energy'] },
  { keywords: ['zinc'],                             pills: ['Neurotransmitters', 'Immunity', 'Cognitive'] },
  { keywords: ['vitamin b', 'b-vitamin', 'b1', 'b3', 'b6', 'b12'], pills: ['Energy', 'Dopamine', 'Serotonin'] },
  { keywords: ['pomegranate'],                      pills: ['Natural Taste', 'Daily Ritual'] },
];

function getPills(name: string): string[] {
  const lower = name.toLowerCase();
  return ingredientPillsRaw.find((e) => e.keywords.some((k) => lower.includes(k)))?.pills ?? [];
}

const categories: Record<string, string> = {
  all: 'All',
  Cognitive: 'Cognitive',
  'Mood & Stress': 'Mood & Stress',
  Neuroplasticity: 'Neuroplasticity',
  'Cellular Health': 'Cellular Health',
  'Gut-Brain Axis': 'Gut-Brain Axis',
  Recovery: 'Recovery',
  'Energy & Vitamins': 'Energy & Vitamins',
};

const ITEMS_PER_PAGE = 6;

function IngredientTile({ name, tagline, image, onClick }: { name: string; tagline: string; image: string; onClick: () => void }) {
  return (
    <div
      className="cursor-pointer rounded-2xl overflow-hidden border border-ink/[12.5%] group"
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
          {tagline && (
            <p className="text-sm text-white/85 font-semibold mt-0.5">{tagline}</p>
          )}
        </div>
      </div>
    </div>
  );
}

function IngredientCardRow({ name, tagline, image, onClick }: { name: string; tagline: string; description?: string; image: string; onClick: () => void }) {
  return (
    <button
      type="button"
      className="cursor-pointer group rounded-xl border border-ink/[0.07] bg-white shadow-sm shadow-ink/[0.04] hover:shadow-xl hover:shadow-ink/[0.10] hover:-translate-y-0.5 hover:border-brand/30 transition-all duration-500 flex flex-col overflow-hidden text-left w-full"
      onClick={onClick}
      aria-label={`${name} — view details`}
    >
      <div className="relative w-full aspect-[16/10] shrink-0 overflow-hidden bg-ink/[0.04]">
        {image && (image.startsWith('/') || image.startsWith('http')) && (
          <Image
            src={image}
            alt={name}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
            sizes="(max-width: 768px) 50vw, 25vw"
            unoptimized={!image.startsWith('/')}
          />
        )}
        {tagline && (
          <span className="absolute bottom-2 left-2 text-micro font-semibold tracking-[0.08em] uppercase text-white bg-black/45 backdrop-blur-sm px-2 py-0.5 rounded-full whitespace-nowrap">
            {tagline}
          </span>
        )}
        {/* Affordance — the cards read as static imagery without it */}
        <span className="absolute top-2 right-2 w-6 h-6 rounded-full bg-white/25 backdrop-blur-sm border border-white/40 flex items-center justify-center">
          <svg width="11" height="11" viewBox="0 0 11 11" fill="none" aria-hidden="true">
            <path d="M5.5 1.5v8M1.5 5.5h8" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        </span>
      </div>

      <div className="flex flex-col gap-1.5 p-3 flex-1 min-w-0">
        <h3 className="flow-h5">{name}</h3>
        {getPills(name).length > 0 && (
          <div className="flex flex-wrap gap-1">
            {getPills(name).map((pill: string) => (
              <span key={pill} className="text-micro font-semibold tracking-[0.06em] uppercase px-2 py-0.5 rounded-full bg-brand/10 text-brand">
                {pill}
              </span>
            ))}
          </div>
        )}
      </div>
    </button>
  );
}

export default function IngredientsAccordion({ ingredients, variant = 'tile', activeIngredients }: { ingredients: Ingredient[]; variant?: 'tile' | 'card'; activeIngredients?: number }) {
  const cards: IngredientCard[] = ingredients
    .filter((ing) => ing.active !== false && ing.category !== 'Flavoring')
    .map((ing) => ({
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

  function selectCategory(key: string) {
    setSelectedCategory(key);
    setPage(0);
    setActiveCard(null);
    trackEvent(`product_ingredient_filter_${key}`);
  }

  function openCard(card: IngredientCard) {
    setActiveCard(card);
    trackEvent('product_ingredient_card_open');
    ga4SelectContent('ingredient_card', card.name);
  }

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
    <section className="flow-container pt-4 pb-16 md:pb-20 md:pt-8">
      <div className="mb-6 space-y-2">
        <h2 className="flow-h2">{activeIngredients ?? cards.filter(c => c.category !== 'taste').length} active compounds</h2>
      </div>

      {/* Mobile: horizontal scroll tabs */}
      <div
        className="flex md:hidden flex-nowrap gap-1 mb-6 overflow-x-auto pb-1"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {Object.entries(categories).map(([key, label]) => {
          const count = key === 'all' ? cards.length : cards.filter((c) => c.category === key).length;
          const active = selectedCategory === key;
          return (
            <button
              key={key}
              onClick={() => selectCategory(key)}
              className={cn(
                'shrink-0 whitespace-nowrap rounded-full px-3.5 min-h-[44px] text-xs font-semibold transition-all duration-200 flex items-center gap-1.5 border',
                active
                  ? 'bg-ink text-white'
                  : 'bg-ink/6 text-ink/50 hover:bg-ink/10 hover:text-ink/70'
              )}
            >
              {label}
              <span className={cn(
                'text-xs font-semibold rounded-full px-1.5 py-0.5 leading-none tabular-nums',
                active ? 'bg-white/25 text-white' : 'bg-ink/10 text-ink/60'
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
          className="hidden md:flex flex-col gap-1 w-40 shrink-0 sticky top-24 self-start"
        >
          {Object.entries(categories).map(([key, label]) => {
            const count = key === 'all' ? cards.length : cards.filter((c) => c.category === key).length;
            const active = selectedCategory === key;
            return (
              <button
                key={key}
                data-category={key}
                onClick={() => selectCategory(key)}
                className={cn(
                  'relative rounded-full px-3.5 min-h-[40px] text-xs font-semibold transition-all duration-200 flex items-center justify-between gap-2 w-full text-left border',
                  active
                    ? 'bg-ink text-white border-ink'
                    : 'text-ink/70 border-ink/15 bg-white hover:border-ink/40 hover:text-ink'
                )}
              >
                {label}
                <span className={cn(
                  'text-xs font-semibold rounded-full px-1.5 py-0.5 leading-none tabular-nums shrink-0 transition-colors duration-200',
                  active
                    ? 'bg-white/25 text-white'
                    : 'bg-ink/10 text-ink/60'
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
              className={variant === 'tile' ? 'grid grid-cols-2 sm:grid-cols-3 gap-4' : 'grid grid-cols-2 gap-3'}
            >
              {visible.map((ing) => variant === 'tile' ? (
                <IngredientTile
                  key={ing.name}
                  name={ing.name}
                  tagline={ing.tagline}
                  image={ing.image}
                  onClick={() => openCard(ing)}
                />
              ) : (
                <IngredientCardRow
                  key={ing.name}
                  name={ing.name}
                  tagline={ing.tagline}
                  description={ing.description}
                  image={ing.image}
                  onClick={() => openCard(ing)}
                />
              ))}
              {Array.from({ length: placeholderCount }).map((_, i) => (
                <div key={`ph-${i}`} className={variant === 'tile' ? 'rounded-2xl aspect-[4/3] invisible' : 'rounded-xl aspect-[16/10] invisible'} />
              ))}
            </motion.div>
          </AnimatePresence>

          {/* Carousel navigation — always reserve space */}
          <div className="mt-8 flex items-center justify-center gap-5">
        <button
          onClick={() => { setPage((p) => Math.max(0, p - 1)); trackEvent('product_ingredient_page_prev'); }}
          disabled={safePage === 0}
          aria-label="Previous ingredients"
          className="w-11 h-11 rounded-full border border-ink/20 bg-white flex items-center justify-center text-ink disabled:opacity-30 disabled:pointer-events-none hover:border-ink/45 hover:bg-ink/[0.04] transition-colors duration-300"
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
              className={`rounded-full transition-all duration-300 ${i === safePage ? 'w-6 h-1.5 bg-brand' : 'w-1.5 h-1.5 bg-ink/25 hover:bg-ink/45'}`}
            />
          ))}
        </div>
        <button
          onClick={() => { setPage((p) => Math.min(totalPages - 1, p + 1)); trackEvent('product_ingredient_page_next'); }}
          disabled={safePage === totalPages - 1}
          aria-label="Next ingredients"
          className="w-11 h-11 rounded-full border border-ink/20 bg-white flex items-center justify-center text-ink disabled:opacity-30 disabled:pointer-events-none hover:border-ink/45 hover:bg-ink/[0.04] transition-colors duration-300"
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
          <div className="absolute inset-0 bg-ink/60 backdrop-blur-sm" />
          <motion.div
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ duration: 0.45, ease: EASE.expoOut }}
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
              className="absolute top-3 right-4 z-10 w-8 h-8 flex items-center justify-center rounded-full bg-white/80 backdrop-blur-sm text-ink/50 hover:text-ink hover:bg-white transition-colors duration-200"
            >
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M11 3L3 11M3 3l8 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
              </svg>
            </button>

            <div className="flex-1 px-7 pt-4 overflow-y-auto" style={{ paddingBottom: 'max(2rem, env(safe-area-inset-bottom))' }}>
              <h3 className="text-xl font-semibold text-ink tracking-[-0.02em] leading-snug mb-1">{activeCard.name}</h3>
              {activeCard.tagline && (
                <span className="inline-block text-xs tracking-[0.08em] uppercase font-semibold bg-ink/8 text-ink/55 px-2.5 py-1 rounded-full mb-3">
                  {activeCard.tagline}
                </span>
              )}
              <p className="text-sm text-ink/65 leading-[1.55] mb-4">{activeCard.description}</p>
              {getPills(activeCard.name).length > 0 && (
                <div className="flex flex-wrap gap-1.5">
                  {getPills(activeCard.name).map((pill) => (
                    <span key={pill} className="text-xs tracking-wide px-2.5 py-1 rounded-full bg-brand/8 text-brand font-medium border border-brand/15">
                      {pill}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
      </AnimatePresence>
    </section>
  );
}
