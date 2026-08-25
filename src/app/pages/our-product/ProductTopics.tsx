'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { EASE, DURATION } from '@/lib/animation';
import { StepCard } from '@/app/components/StepCard';
import IngredientsAccordion from '@/app/products/[handle]/IngredientsAccordion';
import { allIngredients } from '@/app/components/IngredientsExplorer';
import type { Ingredient } from '@/lib/content';

function getBenefit(name: string): string | undefined {
  const lower = name.toLowerCase();
  return allIngredients.find((i) => {
    const iLower = i.name.toLowerCase();
    return iLower === lower || iLower.includes(lower) || lower.includes(iLower);
  })?.benefit;
}

const systems = [
  { domain: 'Memory', color: 'from-brand to-ink', mechanism: 'Strengthens synaptic connections and accelerates long-term memory consolidation.', ingredients: ["Lion's Mane Mushroom", 'Zynamite® (Mango Leaf)', 'B-Vitamins (B1, B3, B6, B12)'], dose: '500mg · clinical dose · full complex' },
  { domain: 'Focus', color: 'from-[#5B58D8] to-brand', mechanism: 'Promotes alpha-wave brain activity: relaxed alertness without stimulant-driven jitteriness.', ingredients: ['Green Tea Extract', 'Zynamite® (Mango Leaf)', 'Ginseng Panax'], dose: 'standardised · clinical dose · standardised' },
  { domain: 'Stress', color: 'from-[#2d2a7a] to-ink', mechanism: 'Modulates cortisol response so mental load stays manageable under pressure.', ingredients: ["Saffr'Active® (Saffron Extract)", 'Magnesium Citrate', 'Zinc'], dose: 'standardised · 200mg · RDI' },
  { domain: 'Neuroplasticity', color: 'from-brand to-[#2d2a7a]', mechanism: "Stimulates NGF production: the brain's ability to form new connections and adapt.", ingredients: ["Lion's Mane Mushroom", 'Hibiscus Extract', 'B-Vitamins (B1, B3, B6, B12)'], dose: '500mg · standardised · full complex' },
  { domain: 'Recovery', color: 'from-ink to-brand', mechanism: 'Supports overnight repair and cellular methylation: the phase where memory actually consolidates.', ingredients: ['Betaine (Trimethylglycine)', 'Magnesium Citrate', 'Inulin'], dose: '500mg · 200mg · prebiotic dose' },
];

const steps = [
  { number: '01', title: 'Trademarked ingredients, verified sources', detail: 'Only standardised, bioavailable forms. Every supplier is vetted for traceability and consistency batch to batch.', proof: 'Zynamite®, Synapsa®, KSM-66®: trademarked extracts with their own clinical trials.' },
  { number: '02', title: 'Clinical doses, not label minimums', detail: 'Every ingredient is dosed at the clinical threshold used in peer-reviewed studies, not the minimum that fits on a label.', proof: 'Zero magnesium stearate. Zero silicon dioxide. Zero fillers of any kind.' },
  { number: '03', title: 'Swiss GMP-certified manufacturing', detail: 'Produced in a Swiss GMP-certified facility under pharmaceutical-grade hygiene and process controls.', proof: 'Same standards required for prescription medications in Switzerland.' },
  { number: '04', title: 'Third-party tested, every batch', detail: 'Every batch is third-party tested for potency, purity, and contaminants before it leaves the facility.', proof: "If it doesn't pass, it doesn't ship. No exceptions." },
];

const contrast = [
  { topic: 'Ingredient disclosure', flow: 'Every ingredient, every dose: fully listed on the label.', others: 'Proprietary blends hide individual doses.' },
  { topic: 'Dosing', flow: 'Clinical thresholds used in human trials. What research actually shows works.', others: 'Token amounts to justify listing the ingredient.' },
  { topic: 'Stimulants', flow: 'Zero caffeine, zero synephrine, zero artificial stimulants.', others: 'Hidden stimulants that cause crashes.' },
  { topic: 'Testing', flow: 'Independent third-party batch testing: purity, potency, contaminants.', others: 'Self-certified, or untested.' },
  { topic: 'Ingredient forms', flow: 'Trademarked, standardised extracts with their own clinical evidence.', others: 'Generic extracts, no traceability.' },
];

export default function ProductTopics({ ingredients, activeIngredients }: { ingredients: Ingredient[]; activeIngredients?: number }) {
  const [activeSystem, setActiveSystem] = useState(0);
  const [activeTopic, setActiveTopic] = useState(0);

  return (
    <div className="bg-white">

      {/* The Ingredients */}
      <IngredientsAccordion variant="card" activeIngredients={activeIngredients} ingredients={ingredients.filter((ing) => ing.active !== false && ing.category !== 'Flavoring').map((ing) => ({ ...ing, description: getBenefit(ing.name) ?? ing.description }))} />

      {/* Five Systems */}
      <section className="border-t border-ink/[0.06] bg-[#F8F8FC]">
        <div className="flow-container py-16 md:py-24">
          <div className="mb-10 md:mb-14 space-y-3 max-w-2xl">
            <p className="text-xs tracking-[0.16em] uppercase font-semibold bg-gradient-to-r from-brand to-ink bg-clip-text text-transparent">The Formula</p>
            <h2 className="flow-h2">Five systems. One formula.</h2>
            <p className="text-sm text-[rgba(30,24,84,0.78)] leading-relaxed">Most supplements target a single pathway. Flow is built around five interconnected cognitive systems, because memory, focus, stress, neuroplasticity, and recovery don't operate in isolation.</p>
          </div>
          {/* Mobile/tablet: one system at a time — five narrow columns forced
              2-word line wraps and buried the mechanism copy. */}
          <div className="md:hidden">
            <div className="flex flex-wrap gap-2 mb-4">
              {systems.map((s, i) => {
                const isActive = i === activeSystem;
                return (
                  <button
                    key={s.domain}
                    onClick={() => setActiveSystem(i)}
                    aria-pressed={isActive}
                    className={`min-h-[44px] px-4 py-2 rounded-full text-xs font-semibold tracking-[0.08em] uppercase transition-colors duration-200 border ${
                      isActive
                        ? `bg-gradient-to-r ${s.color} text-white border-transparent shadow-sm`
                        : 'bg-white text-ink/70 border-ink/15 hover:border-ink/35 hover:text-ink'
                    }`}
                  >
                    {s.domain}
                  </button>
                );
              })}
            </div>

            <div className="rounded-xl bg-white border border-ink/[0.07] shadow-sm shadow-ink/[0.03] p-5">
              <p className="flow-h5 mb-3">{systems[activeSystem].mechanism}</p>
              <div className="flex flex-wrap gap-x-6 gap-y-2 pt-4 border-t border-ink/[0.06]">
                {systems[activeSystem].ingredients.map((ing) => (
                  <div key={ing} className="flex items-center gap-2">
                    <span className="shrink-0 w-1.5 h-1.5 rounded-full bg-brand" />
                    <span className="text-sm text-ink font-medium">{ing}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Desktop: all five systems shown at once, side by side. */}
          <div className="hidden md:grid md:grid-cols-5 gap-4">
            {systems.map((s) => (
              <div key={s.domain} className="rounded-xl bg-white border border-ink/[0.07] shadow-sm shadow-ink/[0.03] p-5 flex flex-col">
                <span className={`inline-flex self-start items-center px-3 py-1.5 rounded-full text-[11px] font-semibold tracking-[0.08em] uppercase text-white bg-gradient-to-r ${s.color} mb-3`}>
                  {s.domain}
                </span>
                <p className="text-sm text-ink leading-relaxed mb-4">{s.mechanism}</p>
                <div className="flex flex-col gap-2 pt-3 mt-auto border-t border-ink/[0.06]">
                  {s.ingredients.map((ing) => (
                    <div key={ing} className="flex items-start gap-2">
                      <span className="shrink-0 w-1.5 h-1.5 rounded-full bg-brand mt-1.5" />
                      <span className="text-xs text-ink font-medium leading-snug">{ing}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It's Made */}
      <section className="border-t border-ink/[0.06] bg-white">
        <div className="flow-container py-16 md:py-24">
          <div className="mb-10 md:mb-14 space-y-3 max-w-2xl">
            <p className="text-xs tracking-[0.16em] uppercase font-semibold bg-gradient-to-r from-brand to-ink bg-clip-text text-transparent">Quality & Format</p>
            <h2 className="flow-h2">Made right, from start to finish.</h2>
            <p className="text-sm text-[rgba(30,24,84,0.78)] leading-relaxed">The ingredients on the label only matter if the process behind them is held to the same standard.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {steps.map((step) => (
              <StepCard key={step.number} number={step.number} title={step.title} description={step.detail} />
            ))}
          </div>
        </div>
      </section>

      {/* What You'll Never Find */}
      <section className="border-t border-ink/[0.06] bg-[#F8F8FC]">
        <div className="flow-container py-16 md:py-24">
          <div className="mb-10 md:mb-14 space-y-3 max-w-2xl">
            <p className="text-xs tracking-[0.16em] uppercase font-semibold bg-gradient-to-r from-brand to-ink bg-clip-text text-transparent">Our Promise</p>
            <h2 className="flow-h2">What you'll never find in Flow.</h2>
            <p className="text-sm text-[rgba(30,24,84,0.78)] leading-relaxed">The supplement industry has a long list of common shortcuts. These are the ones we refuse to take.</p>
          </div>
          {/* Mobile: vertical topic list + single-open comparison, matching FAQ table layout */}
          <div className="md:hidden grid grid-cols-[104px_1fr] border border-ink/[0.08] rounded-2xl overflow-hidden">
            {/* Topics — left */}
            <div className="bg-white border-r border-ink/[0.07] flex flex-col">
              {contrast.map((row, i) => (
                <button
                  key={row.topic}
                  onClick={() => setActiveTopic(i)}
                  aria-pressed={activeTopic === i}
                  className={`text-left px-3 py-3.5 border-b border-ink/[0.07] last:border-0 transition-colors duration-200 ${
                    activeTopic === i ? 'bg-[#F7F6FA]' : 'bg-white hover:bg-[#F7F6FA]/60'
                  }`}
                >
                  <span className={`text-[11px] font-semibold tracking-[0.08em] uppercase leading-snug transition-colors duration-200 ${activeTopic === i ? 'text-brand' : 'text-ink/60'}`}>
                    {row.topic}
                  </span>
                </button>
              ))}
            </div>

            {/* Comparison — right */}
            <div className="relative bg-[#FAFAFA] min-h-[180px] overflow-hidden">
              <AnimatePresence mode="wait">
                <motion.div
                  key={contrast[activeTopic].topic}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: DURATION.base, ease: EASE.expoOut }}
                  className="px-3.5 py-4 space-y-3"
                >
                  <div className="flex items-start gap-2.5">
                    <span className="shrink-0 w-5 h-5 rounded-full bg-emerald-50 border border-emerald-200 flex items-center justify-center mt-0.5">
                      <svg width="9" height="9" viewBox="0 0 9 9" fill="none"><path d="M1.5 4.5l2 2 4-4" stroke="#16a34a" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/></svg>
                    </span>
                    <span className="text-xs text-ink leading-relaxed">{contrast[activeTopic].flow}</span>
                  </div>
                  <div className="flex items-start gap-2.5 pt-3 border-t border-ink/[0.06]">
                    <span className="shrink-0 w-5 h-5 rounded-full bg-ink/[0.04] border border-ink/10 flex items-center justify-center mt-0.5">
                      <svg width="9" height="9" viewBox="0 0 9 9" fill="none"><path d="M2.5 2.5l4 4M6.5 2.5l-4 4" stroke="var(--color-ink)" strokeOpacity="0.45" strokeWidth="1.4" strokeLinecap="round"/></svg>
                    </span>
                    <span className="text-xs text-ink/65 leading-relaxed">{contrast[activeTopic].others}</span>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          {/* Desktop: table */}
          <div className="hidden md:block rounded-2xl border border-ink/[0.08] overflow-hidden">
            <div className="grid grid-cols-[180px_1fr_1fr] bg-white border-b border-ink/[0.08]">
              <div className="px-4 py-3" />
              <div className="px-4 py-3 border-l border-ink/[0.08] flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-brand" />
                <span className="text-xs font-semibold tracking-[0.1em] uppercase text-ink">Flow</span>
              </div>
              <div className="px-4 py-3 border-l border-ink/[0.08] flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-ink/20" />
                <span className="text-xs font-semibold tracking-[0.1em] uppercase text-ink/55">Typical brands</span>
              </div>
            </div>
            {contrast.map((row, i) => (
              <div key={row.topic} className={`grid grid-cols-[180px_1fr_1fr] ${i < contrast.length - 1 ? 'border-b border-ink/[0.06]' : ''} ${i % 2 === 0 ? 'bg-white' : 'bg-[#F8F8FC]/70'}`}>
                <div className="px-4 py-4 flex items-center">
                  <span className="text-xs font-semibold tracking-[0.08em] uppercase text-ink/60 leading-tight">{row.topic}</span>
                </div>
                <div className="px-4 py-4 border-l border-ink/[0.06] flex items-start gap-2.5">
                  <span className="shrink-0 w-5 h-5 rounded-full bg-emerald-50 border border-emerald-200 flex items-center justify-center">
                    <svg width="9" height="9" viewBox="0 0 9 9" fill="none"><path d="M1.5 4.5l2 2 4-4" stroke="#16a34a" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/></svg>
                  </span>
                  <span className="text-xs text-ink leading-relaxed">{row.flow}</span>
                </div>
                <div className="px-4 py-4 border-l border-ink/[0.06] flex items-start gap-2.5">
                  <span className="shrink-0 w-5 h-5 rounded-full bg-ink/[0.04] border border-ink/10 flex items-center justify-center">
                    <svg width="9" height="9" viewBox="0 0 9 9" fill="none"><path d="M2.5 2.5l4 4M6.5 2.5l-4 4" stroke="var(--color-ink)" strokeOpacity="0.45" strokeWidth="1.4" strokeLinecap="round"/></svg>
                  </span>
                  <span className="text-xs text-ink/65 leading-relaxed">{row.others}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
}
