'use client';

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
  { domain: 'Memory', color: 'from-[#3B38B8] to-[#1E1854]', mechanism: 'Strengthens synaptic connections and accelerates long-term memory consolidation.', ingredients: ["Lion's Mane Mushroom", 'Zynamite® (Mango Leaf)', 'B-Vitamins (B1, B3, B6, B12)'], dose: '500mg · clinical dose · full complex' },
  { domain: 'Focus', color: 'from-[#5B58D8] to-[#3B38B8]', mechanism: 'Promotes alpha-wave brain activity — relaxed alertness without stimulant-driven jitteriness.', ingredients: ['Green Tea Extract', 'Zynamite® (Mango Leaf)', 'Ginseng Panax'], dose: 'standardised · clinical dose · standardised' },
  { domain: 'Stress', color: 'from-[#2d2a7a] to-[#1E1854]', mechanism: 'Modulates cortisol response so mental load stays manageable under pressure.', ingredients: ["Saffr'Active® (Saffron Extract)", 'Magnesium Citrate', 'Zinc'], dose: 'standardised · 200mg · RDI' },
  { domain: 'Neuroplasticity', color: 'from-[#3B38B8] to-[#2d2a7a]', mechanism: "Stimulates NGF production — the brain's ability to form new connections and adapt.", ingredients: ["Lion's Mane Mushroom", 'Hibiscus Extract', 'B-Vitamins (B1, B3, B6, B12)'], dose: '500mg · standardised · full complex' },
  { domain: 'Recovery', color: 'from-[#1E1854] to-[#3B38B8]', mechanism: 'Supports overnight repair and cellular methylation — the phase where memory actually consolidates.', ingredients: ['Betaine (Trimethylglycine)', 'Magnesium Citrate', 'Inulin'], dose: '500mg · 200mg · prebiotic dose' },
];

const steps = [
  { number: '01', title: 'Trademarked ingredients, verified sources', detail: 'Only standardised, bioavailable forms. Every supplier is vetted for traceability and consistency batch to batch.', proof: 'Zynamite®, Synapsa®, KSM-66® — trademarked extracts with their own clinical trials.' },
  { number: '02', title: 'Clinical doses — not label minimums', detail: 'Every ingredient is dosed at the clinical threshold used in peer-reviewed studies — not the minimum that fits on a label.', proof: 'Zero magnesium stearate. Zero silicon dioxide. Zero fillers of any kind.' },
  { number: '03', title: 'Swiss GMP-certified manufacturing', detail: 'Produced in a Swiss GMP-certified facility under pharmaceutical-grade hygiene and process controls.', proof: 'Same standards required for prescription medications in Switzerland.' },
  { number: '04', title: 'Third-party tested, every batch', detail: 'Every batch is third-party tested for potency, purity, and contaminants before it leaves the facility.', proof: "If it doesn't pass, it doesn't ship. No exceptions." },
];

const contrast = [
  { topic: 'Ingredient disclosure', flow: 'Every ingredient, every dose — fully listed on the label.', others: 'Proprietary blends hide individual doses.' },
  { topic: 'Dosing', flow: 'Clinical thresholds used in human trials. What research actually shows works.', others: 'Token amounts to justify listing the ingredient.' },
  { topic: 'Stimulants', flow: 'Zero caffeine, zero synephrine, zero artificial stimulants.', others: 'Hidden stimulants that cause crashes.' },
  { topic: 'Testing', flow: 'Independent third-party batch testing — purity, potency, contaminants.', others: 'Self-certified, or untested.' },
  { topic: 'Ingredient forms', flow: 'Trademarked, standardised extracts with their own clinical evidence.', others: 'Generic extracts, no traceability.' },
];

export default function ProductTopics({ ingredients, activeIngredients }: { ingredients: Ingredient[]; activeIngredients?: number }) {
  return (
    <div className="bg-white">

      {/* The Ingredients */}
      <IngredientsAccordion variant="card" activeIngredients={activeIngredients} ingredients={ingredients.filter((ing) => ing.active !== false).map((ing) => ({ ...ing, description: getBenefit(ing.name) ?? ing.description }))} />

      {/* Five Systems */}
      <section className="border-t border-[#1E1854]/[0.06] bg-[#F8F8FC]">
        <div className="max-w-[1200px] mx-auto px-6 py-16 md:py-24">
          <div className="mb-10 md:mb-14 space-y-3 max-w-2xl">
            <p className="text-xs tracking-[0.16em] uppercase font-semibold bg-gradient-to-r from-[#3B38B8] to-[#1E1854] bg-clip-text text-transparent">The Formula</p>
            <h2 className="text-3xl md:text-4xl font-semibold tracking-[-0.02em] leading-tight">Five systems. One formula.</h2>
            <p className="text-sm text-[rgba(30,24,84,0.65)] leading-relaxed">Most supplements target a single pathway. Flow is built around five interconnected cognitive systems — because memory, focus, stress, neuroplasticity, and recovery don't operate in isolation.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
            {systems.map((s) => (
              <div key={s.domain} className="rounded-2xl bg-white border border-[#1E1854]/[0.07] shadow-sm shadow-[#1E1854]/[0.03] p-5 flex flex-col gap-4">
                <span className={`self-start text-[10px] font-semibold tracking-[0.14em] uppercase px-2.5 py-1 rounded-full bg-gradient-to-r ${s.color} text-white`}>{s.domain}</span>
                <p className="text-xs text-[#1E1854]/70 leading-relaxed flex-1">{s.mechanism}</p>
                <div className="space-y-1.5 pt-2 border-t border-[#1E1854]/[0.06]">
                  {s.ingredients.map((ing) => (
                    <div key={ing} className="flex items-start gap-1.5">
                      <span className="shrink-0 mt-[3px] w-1.5 h-1.5 rounded-full bg-[#3B38B8]/40" />
                      <span className="text-xs text-[#1E1854] font-medium leading-tight">{ing}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It's Made */}
      <section className="border-t border-[#1E1854]/[0.06] bg-white">
        <div className="max-w-[1200px] mx-auto px-6 py-16 md:py-24">
          <div className="mb-10 md:mb-14 space-y-3 max-w-2xl">
            <p className="text-xs tracking-[0.16em] uppercase font-semibold bg-gradient-to-r from-[#3B38B8] to-[#1E1854] bg-clip-text text-transparent">Quality & Format</p>
            <h2 className="text-3xl md:text-4xl font-semibold tracking-[-0.02em] leading-tight">Made right, from start to finish.</h2>
            <p className="text-sm text-[rgba(30,24,84,0.65)] leading-relaxed">The ingredients on the label only matter if the process behind them is held to the same standard.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {steps.map((step, i) => (
              <div key={step.number} className="rounded-2xl border border-[#1E1854]/[0.07] bg-[#F8F8FC] p-6 flex flex-col gap-4">
                <div className="flex items-center gap-3">
                  <span className="shrink-0 w-9 h-9 rounded-full bg-gradient-to-br from-[#1E1854] to-[#2d2a7a] flex items-center justify-center text-xs font-semibold text-white/60 tabular-nums">{step.number}</span>
                  {i < steps.length - 1 && <div className="hidden lg:block flex-1 h-px bg-[#1E1854]/10" />}
                </div>
                <div className="space-y-2 flex-1">
                  <h3 className="text-sm font-semibold text-[#1E1854] tracking-[-0.01em]">{step.title}</h3>
                  <p className="text-xs text-[#1E1854]/60 leading-relaxed">{step.detail}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What You'll Never Find */}
      <section className="border-t border-[#1E1854]/[0.06] bg-[#F8F8FC]">
        <div className="max-w-[1200px] mx-auto px-6 py-16 md:py-24">
          <div className="mb-10 md:mb-14 space-y-3 max-w-2xl">
            <p className="text-xs tracking-[0.16em] uppercase font-semibold bg-gradient-to-r from-[#3B38B8] to-[#1E1854] bg-clip-text text-transparent">Our Promise</p>
            <h2 className="text-3xl md:text-4xl font-semibold tracking-[-0.02em] leading-tight">What you'll never find in Flow.</h2>
            <p className="text-sm text-[rgba(30,24,84,0.65)] leading-relaxed">The supplement industry has a long list of common shortcuts. These are the ones we refuse to take.</p>
          </div>
          {/* Mobile: stacked cards */}
          <div className="md:hidden flex flex-col gap-3">
            {contrast.map((row) => (
              <div key={row.topic} className="rounded-xl border border-[#1E1854]/[0.08] bg-white overflow-hidden">
                <div className="px-4 py-2 border-b border-[#1E1854]/[0.06] bg-[#F4F4FB]">
                  <span className="text-[10px] font-semibold tracking-[0.12em] uppercase text-[#1E1854]/40">{row.topic}</span>
                </div>
                <div className="flex items-start gap-2.5 px-4 py-3 border-b border-[#1E1854]/[0.06]">
                  <span className="shrink-0 mt-0.5 w-5 h-5 rounded-full bg-emerald-50 border border-emerald-200 flex items-center justify-center">
                    <svg width="9" height="9" viewBox="0 0 9 9" fill="none"><path d="M1.5 4.5l2 2 4-4" stroke="#16a34a" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/></svg>
                  </span>
                  <span className="text-xs text-[#1E1854] leading-relaxed pt-0.5">{row.flow}</span>
                </div>
                <div className="flex items-start gap-2.5 px-4 py-3">
                  <span className="shrink-0 mt-0.5 w-5 h-5 rounded-full bg-[#1E1854]/[0.04] border border-[#1E1854]/10 flex items-center justify-center">
                    <svg width="9" height="9" viewBox="0 0 9 9" fill="none"><path d="M2.5 2.5l4 4M6.5 2.5l-4 4" stroke="#1E1854" strokeOpacity="0.3" strokeWidth="1.4" strokeLinecap="round"/></svg>
                  </span>
                  <span className="text-xs text-[#1E1854]/45 leading-relaxed pt-0.5">{row.others}</span>
                </div>
              </div>
            ))}
          </div>

          {/* Desktop: table */}
          <div className="hidden md:block rounded-2xl border border-[#1E1854]/[0.08] overflow-hidden">
            <div className="grid grid-cols-[180px_1fr_1fr] bg-white border-b border-[#1E1854]/[0.08]">
              <div className="px-4 py-3" />
              <div className="px-4 py-3 border-l border-[#1E1854]/[0.08] flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#3B38B8]" />
                <span className="text-xs font-semibold tracking-[0.1em] uppercase text-[#1E1854]">Flow</span>
              </div>
              <div className="px-4 py-3 border-l border-[#1E1854]/[0.08] flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#1E1854]/20" />
                <span className="text-xs font-semibold tracking-[0.1em] uppercase text-[#1E1854]/35">Typical brands</span>
              </div>
            </div>
            {contrast.map((row, i) => (
              <div key={row.topic} className={`grid grid-cols-[180px_1fr_1fr] ${i < contrast.length - 1 ? 'border-b border-[#1E1854]/[0.06]' : ''} ${i % 2 === 0 ? 'bg-white' : 'bg-[#F8F8FC]/70'}`}>
                <div className="px-4 py-4 flex items-center">
                  <span className="text-xs font-semibold tracking-[0.08em] uppercase text-[#1E1854]/50 leading-tight">{row.topic}</span>
                </div>
                <div className="px-4 py-4 border-l border-[#1E1854]/[0.06] flex items-start gap-2.5">
                  <span className="shrink-0 mt-0.5 w-5 h-5 rounded-full bg-emerald-50 border border-emerald-200 flex items-center justify-center">
                    <svg width="9" height="9" viewBox="0 0 9 9" fill="none"><path d="M1.5 4.5l2 2 4-4" stroke="#16a34a" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/></svg>
                  </span>
                  <span className="text-xs text-[#1E1854] leading-relaxed pt-0.5">{row.flow}</span>
                </div>
                <div className="px-4 py-4 border-l border-[#1E1854]/[0.06] flex items-start gap-2.5">
                  <span className="shrink-0 mt-0.5 w-5 h-5 rounded-full bg-[#1E1854]/[0.04] border border-[#1E1854]/10 flex items-center justify-center">
                    <svg width="9" height="9" viewBox="0 0 9 9" fill="none"><path d="M2.5 2.5l4 4M6.5 2.5l-4 4" stroke="#1E1854" strokeOpacity="0.3" strokeWidth="1.4" strokeLinecap="round"/></svg>
                  </span>
                  <span className="text-xs text-[#1E1854]/45 leading-relaxed pt-0.5">{row.others}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
}
