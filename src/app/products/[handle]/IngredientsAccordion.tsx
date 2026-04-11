'use client';

import { useState } from 'react';
import Image from 'next/image';
import { AnimatePresence, motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import type { Ingredient } from '@/lib/contentful';

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

const INITIAL_ROWS = 2;
const COLS = 4;

function FlipCard({ name, tagline, description, image }: { name: string; tagline: string; description: string; image: string }) {
  const [flipped, setFlipped] = useState(false);

  return (
    <div
      className="cursor-pointer"
      style={{ perspective: '1000px' }}
      onClick={() => setFlipped((f) => !f)}
    >
      <div
        style={{
          transformStyle: 'preserve-3d',
          transform: flipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
          transition: 'transform 0.5s cubic-bezier(0.22, 1, 0.36, 1)',
          position: 'relative',
        }}
      >
        {/* Front */}
        <div
          className="rounded-2xl overflow-hidden border border-[var(--color-border)]"
          style={{ backfaceVisibility: 'hidden' }}
        >
          <div className="relative aspect-[4/3] w-full bg-gradient-to-br from-[#f5f5fc] to-[#eeeef8]">
            <Image src={image} alt={name} fill className="object-contain p-4" sizes="(max-width: 768px) 50vw, 25vw" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
            <div className="absolute bottom-3 right-3 w-6 h-6 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
              <svg width="9" height="9" viewBox="0 0 10 10" fill="none">
                <path d="M2 5h6M5 2l3 3-3 3" stroke="white" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
          </div>
          <div className="p-4 pb-3 bg-white">
            <p className="text-sm font-semibold text-[#1E1854] leading-snug">{name}</p>
            <p className="text-xs text-[hsla(var(--color-secondary)/0.45)] mt-0.5 leading-snug">{tagline}</p>
          </div>
        </div>

        {/* Back */}
        <div
          className="absolute inset-0 rounded-2xl bg-[#1E1854] p-5 flex flex-col justify-between"
          style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}
        >
          <div>
            <p className="text-sm font-semibold text-white mb-3 leading-snug">{name}</p>
            <p className="text-sm text-white/65 leading-relaxed">{description}</p>
          </div>
          <div className="flex items-center gap-1.5 mt-4">
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none" className="text-white/40">
              <circle cx="6" cy="6" r="5" stroke="currentColor" strokeWidth="1"/>
              <path d="M3.5 6l2 2 3-3" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <span className="text-xs text-white/40 uppercase tracking-[0.1em]">Clinically Dosed</span>
          </div>
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
  const [expanded, setExpanded] = useState(false);
  const filtered = selectedCategory === 'all'
    ? cards
    : cards.filter((i) => i.category === selectedCategory);

  const initialCount = INITIAL_ROWS * COLS;
  const visible = expanded ? filtered : filtered.slice(0, initialCount);
  const hasMore = filtered.length > initialCount;

  return (
    <section className="max-w-[1200px] mx-auto px-6 py-12 md:py-20">
      <div className="mb-8 space-y-2">
        <p className="text-xs tracking-[0.16em] uppercase text-[hsla(var(--color-secondary)/0.5)] font-medium">Transparent Formula</p>
        <h2 className="text-2xl sm:text-3xl font-semibold tracking-[-0.02em]">Get to Know the Ingredients</h2>
        <p className="text-sm text-[hsla(var(--color-secondary)/0.7)] max-w-md">Our formula is made of premium, quality ingredients selected for their efficacy. Tap any card to learn more.</p>
      </div>

      {/* Category tabs */}
      <div className="flex flex-wrap gap-2 mb-8">
        {Object.entries(categories).map(([key, label]) => (
          <button
            key={key}
            onClick={() => { setSelectedCategory(key); setExpanded(false); }}
            className={cn(
              'relative overflow-hidden whitespace-nowrap rounded-full border px-4 py-2.5 text-xs tracking-[0.08em] uppercase font-medium transition-colors duration-300',
              selectedCategory === key
                ? 'border-[#1E1854] text-white'
                : 'border-[var(--color-border)] text-[hsla(var(--color-secondary)/0.7)] hover:text-[#1E1854] hover:border-[#1E1854]'
            )}
          >
            <span className="relative z-10">{label}</span>
            <AnimatePresence>
              {selectedCategory === key && (
                <motion.span
                  initial={{ y: '100%' }}
                  animate={{ y: '0%' }}
                  exit={{ y: '100%' }}
                  transition={{ duration: 0.4, ease: 'backIn' }}
                  className="absolute inset-0 z-0"
                  style={{ background: 'linear-gradient(135deg, #3B38B8 0%, #1E1854 100%)' }}
                />
              )}
            </AnimatePresence>
          </button>
        ))}
      </div>

      {/* Flip card grid */}
      <AnimatePresence mode="wait">
        <motion.div
          key={selectedCategory}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 10 }}
          transition={{ duration: 0.2 }}
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4"
        >
          {visible.map((ing, i) => (
            <div key={ing.name} className={i >= 6 && !expanded ? 'hidden sm:block' : ''}>
              <FlipCard
                name={ing.name}
                tagline={ing.tagline}
                description={ing.description}
                image={ing.image}
              />
            </div>
          ))}
        </motion.div>
      </AnimatePresence>

      {/* View all / collapse */}
      {hasMore && (
        <div className="mt-8 flex justify-center">
          <button
            onClick={() => setExpanded((e) => !e)}
            className="border border-[var(--color-border)] rounded-full px-6 py-2.5 text-sm font-medium text-[#1E1854] hover:bg-[#1E185408] transition-colors"
          >
            {expanded ? 'View Less' : `View All ${filtered.length} Ingredients`}
          </button>
        </div>
      )}

    </section>
  );
}
