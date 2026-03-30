'use client';

import { useState } from 'react';
import Image from 'next/image';
import { AnimatePresence, motion } from 'framer-motion';
import { cn } from '@/lib/utils';

const ingredients = [
  {
    name: 'Zynamite®',
    category: 'plant-extracts',
    tagline: 'Clean focus without the crash',
    description: 'A breakthrough mango leaf extract that inhibits COMT to naturally prolong dopamine and noradrenaline. Clinically shown to improve attention 11–16% within 60 minutes without the stimulant side effects of caffeine.',
    image: 'https://images.unsplash.com/photo-1518310952931-b1de897abd40?w=500&q=80&auto=format&fit=crop',
  },
  {
    name: 'L-Theanine & Caffeine',
    category: 'amino-acids',
    tagline: 'Smooth, jitter-free alertness',
    description: 'A synergistic duo that delivers smooth, jitter-free alertness. L-theanine moderates caffeine\'s stimulatory effects, promoting alpha brainwave activity for calm, focused awareness without the crash.',
    image: 'https://images.unsplash.com/photo-1544787219-7f47ccb76574?w=500&q=80&auto=format&fit=crop',
  },
  {
    name: 'Rhodiola Rosea',
    category: 'adaptogens',
    tagline: 'Combat fatigue, build resilience',
    description: 'An adaptogenic herb that combats fatigue and supports stress resilience. Rhodiola helps the body adapt to physical and mental demands, reducing the perception of effort during challenging tasks.',
    image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=500&q=80&auto=format&fit=crop',
  },
  {
    name: 'Panax Ginseng',
    category: 'adaptogens',
    tagline: 'Cognitive function & stamina',
    description: 'A renowned adaptogen that supports cognitive function and physical stamina. Panax ginseng modulates the HPA axis and cortisol response, helping maintain balance under sustained stress.',
    image: 'https://images.unsplash.com/photo-1466637574441-749b8f19452f?w=500&q=80&auto=format&fit=crop',
  },
  {
    name: 'Ashwagandha KSM-66®',
    category: 'adaptogens',
    tagline: 'Calm, grounded, balanced',
    description: 'A clinically-studied adaptogen that reduces cortisol levels and supports healthy hormonal balance. Promotes a calm, grounded state while supporting thyroid and adrenal health.',
    image: 'https://images.unsplash.com/photo-1596078842550-f9b9bdd7bdc7?w=500&q=80&auto=format&fit=crop',
  },
  {
    name: 'Lion\'s Mane Mushroom',
    category: 'plant-extracts',
    tagline: 'Neuroplasticity & memory',
    description: 'A medicinal mushroom that stimulates NGF (Nerve Growth Factor), supporting the formation of new neural connections. Studied for its role in improving memory, cognitive speed, and long-term brain health.',
    image: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=500&q=80&auto=format&fit=crop',
  },
  {
    name: 'Electrolytes',
    category: 'minerals',
    tagline: 'Hydration & nerve signalling',
    description: 'A precise blend of sodium, potassium, and magnesium that supports optimal hydration, nerve signalling, and muscle function — ensuring your body and mind operate at full capacity.',
    image: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=500&q=80&auto=format&fit=crop',
  },
  {
    name: 'Prebiotics & Probiotics',
    category: 'gut-health',
    tagline: 'Gut-brain axis support',
    description: 'A dual-action gut-brain axis support system. Prebiotics feed beneficial bacteria while probiotics replenish them, supporting mood, immunity, and serotonin production.',
    image: 'https://images.unsplash.com/photo-1498837167922-ddd27525d352?w=500&q=80&auto=format&fit=crop',
  },
  {
    name: 'Bacopa Monnieri',
    category: 'plant-extracts',
    tagline: 'Memory & learning support',
    description: 'An Ayurvedic herb used for centuries to enhance memory and cognitive performance. Bacopa modulates acetylcholine and serotonin pathways, with clinical studies showing improved recall after 8–12 weeks.',
    image: 'https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=500&q=80&auto=format&fit=crop',
  },
  {
    name: 'Alpha-GPC',
    category: 'amino-acids',
    tagline: 'Acetylcholine precursor',
    description: 'A highly bioavailable choline source that crosses the blood-brain barrier to boost acetylcholine levels — the neurotransmitter central to memory, focus, and learning. Popular with athletes and nootropic users.',
    image: 'https://images.unsplash.com/photo-1552196563-55cd4e45efb3?w=500&q=80&auto=format&fit=crop',
  },
  {
    name: 'Magnesium Glycinate',
    category: 'minerals',
    tagline: 'Calm, sleep & recovery',
    description: 'The most bioavailable form of magnesium, chelated with glycine for superior absorption. Supports over 300 enzymatic reactions, deep sleep, muscle relaxation, and healthy cortisol rhythms.',
    image: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=500&q=80&auto=format&fit=crop',
  },
  {
    name: 'Green Tea Catechins',
    category: 'plant-extracts',
    tagline: 'Antioxidant & mitochondrial health',
    description: 'Powerful antioxidants that support cellular energy production and cardiovascular health. EGCG from green tea protects neurons and supports healthy mitochondrial function for sustained vitality.',
    image: 'https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=500&q=80&auto=format&fit=crop',
  },
];

const categories: Record<string, string> = {
  all: 'All',
  adaptogens: 'Adaptogens',
  'amino-acids': 'Amino Acids',
  'plant-extracts': 'Plant Extracts',
  minerals: 'Minerals',
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
          </div>
          <div className="p-4 bg-white">
            <p className="text-sm font-semibold text-[#1E1854] leading-snug">{name}</p>
            <p className="text-xs text-[hsla(var(--color-secondary)/0.55)] mt-1 leading-snug">{tagline}</p>
          </div>
          <div className="px-4 pb-3 flex items-center gap-1 bg-white">
            <span className="text-[10px] uppercase tracking-[0.1em] text-[hsla(var(--color-accent)/1)] font-medium">Learn more</span>
            <svg width="10" height="10" viewBox="0 0 10 10" fill="none" className="text-[hsla(var(--color-accent)/1)]">
              <path d="M2 5h6M5 2l3 3-3 3" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
        </div>

        {/* Back */}
        <div
          className="absolute inset-0 rounded-2xl bg-[#1E1854] p-5 flex flex-col justify-between"
          style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}
        >
          <div>
            <p className="text-sm font-semibold text-white mb-3 leading-snug">{name}</p>
            <p className="text-xs text-white/65 leading-relaxed">{description}</p>
          </div>
          <div className="flex items-center gap-1.5 mt-4">
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none" className="text-white/40">
              <circle cx="6" cy="6" r="5" stroke="currentColor" strokeWidth="1"/>
              <path d="M3.5 6l2 2 3-3" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <span className="text-[10px] text-white/40 uppercase tracking-[0.1em]">Clinically Dosed</span>
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
                  className="absolute inset-0 z-0 bg-[#1E1854]"
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
