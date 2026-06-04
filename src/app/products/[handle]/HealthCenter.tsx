'use client';

import { PRODUCT_META } from '@/lib/product-meta';
import { useState } from 'react';



const pillars = [
  {
    title: 'Peer-Reviewed Evidence',
    description: 'Human clinical trials only — no animal studies or in-vitro data.',
    icon: (
      <svg width="28" height="28" viewBox="0 0 36 36" fill="none">
        <circle cx="18" cy="18" r="8" stroke="currentColor" strokeWidth="1.5"/>
        <path d="M18 10V10.5M18 25.5V26M10 18H10.5M25.5 18H26M12.4 12.4L12.75 12.75M23.25 23.25L23.6 23.6M12.4 23.6L12.75 23.25M23.25 12.75L23.6 12.4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
    ),
  },
  {
    title: 'Clinical Dosing',
    description: 'Dosed at proven therapeutic levels. No pixie-dusting, no hidden blends.',
    icon: (
      <svg width="28" height="28" viewBox="0 0 36 36" fill="none">
        <rect x="13" y="5" width="10" height="26" rx="5" stroke="currentColor" strokeWidth="1.5"/>
        <line x1="13" y1="18" x2="23" y2="18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
        <line x1="16" y1="12" x2="20" y2="12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
    ),
  },
  {
    title: 'Bioavailable Forms',
    description: 'The most absorbable form of each compound — the exact form used in research.',
    icon: (
      <svg width="28" height="28" viewBox="0 0 36 36" fill="none">
        <path d="M18 6 C18 6 10 14 10 22 C10 27.5 13.6 31 18 31 C22.4 31 26 27.5 26 22 C26 14 18 6 18 6Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/>
        <line x1="18" y1="19" x2="18" y2="31" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
        <line x1="14" y1="23" x2="18" y2="19" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
    ),
  },
  {
    title: 'Swiss GMP Manufacturing',
    description: 'Swiss-made, pharmaceutical-grade. Every batch third-party tested before release.',
    icon: (
      <svg width="28" height="28" viewBox="0 0 36 36" fill="none">
        <rect x="9" y="5" width="18" height="26" rx="2" stroke="currentColor" strokeWidth="1.5"/>
        <line x1="13" y1="13" x2="23" y2="13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
        <line x1="13" y1="19" x2="23" y2="19" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
        <line x1="13" y1="25" x2="19" y2="25" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
    ),
  },
];

const macros = [
  { label: 'Total Fat', value: `${PRODUCT_META.nutrition.fatG} g`, daily: '0%' },
  { label: 'Total Carbohydrate', value: `${PRODUCT_META.nutrition.carbsG} g`, daily: '2%' },
  { label: 'of which Sugars', value: `${PRODUCT_META.nutrition.sugarsG} g`, daily: null, indent: true },
  { label: 'Protein', value: `${PRODUCT_META.nutrition.proteinG} g`, daily: null },
  { label: 'Salt (Sodium)', value: `${PRODUCT_META.nutrition.saltMg} mg`, daily: '2%' },
];

const actives = [
  { name: 'Zynamite® (Mango Leaf Extract)', dose: '300 mg' },
  { name: 'Green Tea Extract', dose: '250 mg' },
  { name: "Lion's Mane Mushroom", dose: '250 mg' },
  { name: 'Hibiscus Extract', dose: '1,750 mg' },
  { name: 'Rooibos Extract', dose: '625 mg' },
  { name: "Saffr'Active® (Saffron Extract)", dose: '50 mg' },
  { name: 'Ginseng Panax', dose: '200 mg' },
  { name: 'Betaine (Trimethylglycine)', dose: '500 mg' },
  { name: 'Magnesium Citrate', dose: '680 mg' },
  { name: 'Sodium Citrate', dose: '400 mg' },
  { name: 'Zinc', dose: '7 mg' },
  { name: 'Vitamin B1 (Thiamine)', dose: '1.1 mg' },
  { name: 'Vitamin B3 (Niacin)', dose: '16 mg' },
  { name: 'Vitamin B6 (Pyridoxine)', dose: '1.4 mg' },
  { name: 'Vitamin B12 (Methylcobalamin)', dose: '3 µg' },
  { name: 'Inulin', dose: '1,345 mg' },
];

export default function HealthCenter({ caloriesKcal, activeIngredients, totalFormulaWeightG, servingsPerBox, handle }: { caloriesKcal: number; activeIngredients: number; totalFormulaWeightG: number; servingsPerBox: number; handle: string }) {
  const [nutritionOpen, setNutritionOpen] = useState(false);

  return (
    <section className="max-w-[1200px] mx-auto px-6 pt-4 pb-20 md:pt-8">
      <div className="mb-6 space-y-2">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold tracking-[-0.02em] leading-[1.08]">Our product has nothing to hide.</h2>
      </div>

      {/* Nutrition popup */}
      {nutritionOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={() => setNutritionOpen(false)}
          />
          <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[85vh] flex flex-col overflow-hidden">
            <div className="flex items-center justify-between px-6 py-5 border-b border-[#1E185420] shrink-0">
              <div>
                <p className="text-xs uppercase tracking-[0.1em] text-[rgba(30,24,84,0.45)] font-medium">Flow Health</p>
                <h3 className="text-lg font-semibold text-[#1E1854] tracking-[-0.01em] mt-0.5">Full Nutrition Sheet</h3>
              </div>
              <button
                onClick={() => setNutritionOpen(false)}
                className="w-8 h-8 rounded-full bg-[#1E185408] flex items-center justify-center hover:bg-[#1E18540D] transition-colors shrink-0"
              >
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                  <path d="M2 2L10 10M10 2L2 10" stroke="#1E1854" strokeWidth="1.5" strokeLinecap="round"/>
                </svg>
              </button>
            </div>
            <div className="overflow-y-auto flex-1 px-6 py-6 space-y-8">
              <div>
                <p className="text-xs uppercase tracking-[0.1em] font-semibold text-[rgba(30,24,84,0.45)] mb-3">Nutritional Values per Serving (400 ml)</p>
                {macros.map((row) => (
                  <div
                    key={row.label}
                    className={`flex items-center justify-between py-2.5 border-b border-[#1E185420] ${row.indent ? 'pl-5' : ''}`}
                  >
                    <span className={`text-sm ${row.indent ? 'text-[rgba(30,24,84,0.55)]' : 'text-[#1E1854] font-medium'}`}>{row.label}</span>
                    <div className="flex items-center gap-6">
                      <span className="text-sm text-[#1E1854]">{row.value}</span>
                      {row.daily
                        ? <span className="text-xs text-[rgba(30,24,84,0.4)] w-8 text-right">{row.daily}*</span>
                        : <span className="w-8" />
                      }
                    </div>
                  </div>
                ))}
                <p className="text-xs text-[rgba(30,24,84,0.4)] mt-3 leading-relaxed">* Reference intake of an average adult (8400 kJ / 2000 kcal).</p>
              </div>
              <div>
                <p className="text-xs uppercase tracking-[0.1em] font-semibold text-[rgba(30,24,84,0.45)] mb-3">Active Ingredient Dosages</p>
                {actives.map((a) => (
                  <div key={a.name} className="flex items-center justify-between py-2.5 border-b border-[#1E185420]">
                    <span className="text-sm text-[#1E1854]">{a.name}</span>
                    <span className="text-sm font-semibold text-[#1E1854] shrink-0 ml-6">{a.dose}</span>
                  </div>
                ))}
                <p className="text-xs text-[rgba(30,24,84,0.4)] mt-3 leading-relaxed">Swiss GMP · Vegan · Gluten-free · No artificial colours · Third-party tested for purity and potency.</p>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">

        {/* Left column: Formula + What's not in it */}
        <div className="space-y-4">

          {/* Group 1: Formula */}
          <div className="space-y-2">
            <p className="text-xs font-semibold tracking-[0.12em] uppercase text-[#1E1854]/40">Formula</p>
            <div className="grid grid-cols-2 gap-1.5">
              {[
                { label: 'Sachets per box', value: String(servingsPerBox) },
                { label: 'per sachet', value: `${totalFormulaWeightG} g` },
                { label: 'ingredients per sachet', value: String(activeIngredients) },
                { label: 'Calories per session', value: `${caloriesKcal} kcal` },
              ].map((row) => (
                <div key={row.label} className="bg-gradient-to-br from-[#1E1854] to-[#2d2a7a] rounded-xl px-3 py-2.5">
                  <p className="text-sm font-semibold tracking-[-0.02em] text-white leading-snug">{row.value}</p>
                  <p className="text-[10px] tracking-[0.07em] uppercase text-white/50 mt-0.5">{row.label}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Group 2: What's not in it */}
          <div className="space-y-2">
            <p className="text-xs font-semibold tracking-[0.12em] uppercase text-[#1E1854]/40">What&apos;s not in it</p>
            <div className="flex flex-wrap gap-1.5">
              {[
                'Vegan',
                'Caffeine-free',
                'No added sugar',
                'No artificial flavours',
                'No artificial colours',
                'No preservatives',
              ].map((label) => (
                <div key={label} className="inline-flex items-center px-2.5 py-1 rounded-lg border border-[#1E185420] bg-[#1E185403]">
                  <span className="text-xs font-medium text-[#1E1854] whitespace-nowrap">{label}</span>
                </div>
              ))}
            </div>
            <button
              onClick={() => setNutritionOpen(true)}
              className="flex items-center gap-1.5 text-xs font-semibold text-[#3B38B8] hover:text-[#1E1854] transition-colors"
            >
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                <path d="M6 2V10M2 6H10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
              </svg>
              See the full nutritional value
            </button>
          </div>

        </div>

        {/* Right column: Selection Process */}
        <div className="space-y-2">
          <a href={`/products/${handle}`} className="flex items-center gap-1 text-xs font-semibold tracking-[0.12em] uppercase text-[#1E1854]/40 hover:text-[#1E1854]/70 transition-colors">
            Our selection process
            <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
              <path d="M2 5h6M5.5 2.5L8 5l-2.5 2.5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </a>
          <div className="border border-[#1E185420] rounded-xl overflow-hidden">
            {pillars.map((p, i, arr) => (
              <div key={p.title} className={`px-3 py-2.5 bg-[#1E185403] ${i < arr.length - 1 ? 'border-b border-[#1E185420]' : ''}`}>
                <p className="text-xs font-medium text-[#1E1854] leading-snug">{p.title}</p>
                <p className="text-xs text-[#1E1854]/45 leading-snug mt-0.5">{p.description}</p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
