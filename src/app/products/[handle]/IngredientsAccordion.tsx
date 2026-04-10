'use client';

import { useState } from 'react';
import Image from 'next/image';
import { AnimatePresence, motion } from 'framer-motion';
import { cn } from '@/lib/utils';
const ingredients = [
  { name: 'Zynamite® (Mango Leaf Extract)', category: 'plant-extracts', tagline: '300 mg', description: 'Delivers fast-acting mental clarity, improves reaction time, and reduces mental fatigue without affecting heart rate or blood pressure.', image: '/mangifera.png' },
  { name: 'Green Tea Extract', category: 'plant-extracts', tagline: '250 mg', description: 'Provides smooth, jitter-free energy and sustained attention when paired with L-theanine.', image: '/green-tea.png' },
  { name: "Lion's Mane Mushroom", category: 'plant-extracts', tagline: '250 mg', description: 'Supports nerve health, mental clarity, and long-term cognitive vitality.', image: '/lions-mane.png' },
  { name: 'Hibiscus Extract', category: 'plant-extracts', tagline: '1,750 mg', description: 'Offers gentle antioxidant support and may help maintain calm mental performance while supporting healthy blood flow.', image: '/hibiscus.png' },
  { name: 'Rooibos Extract', category: 'plant-extracts', tagline: '625 mg', description: 'Provides antioxidant protection and may help reduce feelings of everyday stress while supporting overall calm.', image: 'https://images.unsplash.com/photo-1576092768241-dec231879fc3?w=500&q=80&auto=format&fit=crop' },
  { name: "Saffr'Active® (Saffron Extract)", category: 'adaptogens', tagline: '50 mg', description: 'Gently lifts mood, reduces everyday tension, and supports emotional balance.', image: '/saffran.png' },
  { name: 'Ginseng Panax', category: 'adaptogens', tagline: '200 mg', description: 'Helps combat mental fatigue and supports working memory and overall cognitive performance.', image: 'https://images.unsplash.com/photo-1544991875-5dc1b05f607d?w=500&q=80&auto=format&fit=crop' },
  { name: 'Betaine (Trimethylglycine)', category: 'amino-acids', tagline: '500 mg', description: 'Supports healthy methylation and helps maintain balanced homocysteine levels for brain chemistry and energy metabolism.', image: 'https://images.unsplash.com/photo-1593280405106-e438ebe93f5e?w=500&q=80&auto=format&fit=crop' },
  { name: 'Magnesium Citrate', category: 'minerals', tagline: '680 mg', description: 'Promotes relaxation, helps ease tension, and supports healthy stress response and sleep quality.', image: 'https://images.unsplash.com/photo-1550572017-edd951b55104?w=500&q=80&auto=format&fit=crop' },
  { name: 'Sodium Citrate', category: 'minerals', tagline: '400 mg', description: 'Supports proper hydration, fluid balance, and smooth nutrient absorption for steady energy and mental clarity.', image: '/sodium-citrate.png' },
  { name: 'Zinc', category: 'minerals', tagline: '7 mg', description: 'Supports healthy neurotransmitter function, immune balance, and cognitive processes.', image: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=500&q=80&auto=format&fit=crop' },
  { name: 'B-Vitamins (B1, B3, B6, B12)', category: 'vitamins', tagline: '2.875 mg', description: 'Support energy metabolism, neurotransmitter production, and overall mental performance.', image: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=500&q=80&auto=format&fit=crop' },
  { name: 'Inulin', category: 'gut-health', tagline: '1,345 mg', description: 'Nourishes beneficial gut bacteria, supporting the gut-brain connection that influences mood and cognitive flexibility.', image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=500&q=80&auto=format&fit=crop' },
];

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
          <div className="relative aspect-[4/3] w-full">
            <Image src={image} alt={name} fill className="object-cover" sizes="(max-width: 768px) 50vw, 25vw" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
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

export default function IngredientsAccordion() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [expanded, setExpanded] = useState(false);
  const filtered = selectedCategory === 'all'
    ? ingredients
    : ingredients.filter((i) => i.category === selectedCategory);

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
