'use client';

import { PRODUCT_META } from '@/lib/product-meta';

import { useState } from 'react';


const badges = [
  {
    label: 'Vegan',
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M6 14C10 14 14 10 14 6C14 10 18 14 22 14C18 14 14 18 14 22C14 18 10 14 6 14Z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round"/>
      </svg>
    ),
  },
  {
    label: 'Gluten-Free',
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="14" cy="14" r="8" stroke="currentColor" strokeWidth="1.4"/>
        <path d="M10 14L13 17L18 11" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
  },
  {
    label: 'Dairy-Free',
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M10 7H18L20 13C20 17.418 17.314 21 14 21C10.686 21 8 17.418 8 13L10 7Z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round"/>
        <path d="M6 10H10M18 10H22" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
      </svg>
    ),
  },
  {
    label: 'Non-GMO',
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M14 6V14M14 14C14 14 10 11 7 13M14 14C14 14 18 11 21 13M14 14V22" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
  },
  {
    label: 'No Artificial Flavours',
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M9 20L19 8" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
        <path d="M9 8L19 20" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
        <circle cx="14" cy="14" r="8" stroke="currentColor" strokeWidth="1.4"/>
      </svg>
    ),
    absent: true,
  },
  {
    label: 'No Artificial Colours',
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M9 20L19 8" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
        <path d="M9 8L19 20" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
        <circle cx="14" cy="14" r="8" stroke="currentColor" strokeWidth="1.4"/>
      </svg>
    ),
    absent: true,
  },
  {
    label: 'No Chemical Preservatives',
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M9 20L19 8" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
        <path d="M9 8L19 20" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
        <circle cx="14" cy="14" r="8" stroke="currentColor" strokeWidth="1.4"/>
      </svg>
    ),
    absent: true,
  },
  {
    label: 'Swiss Made',
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="6" y="6" width="16" height="16" rx="2" stroke="currentColor" strokeWidth="1.4"/>
        <path d="M14 10V18M10 14H18" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
      </svg>
    ),
  },
  {
    label: 'Third-Party Tested',
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M14 5L16.8 10.4L23 11.3L18.5 15.7L19.6 22L14 19L8.4 22L9.5 15.7L5 11.3L11.2 10.4L14 5Z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round"/>
      </svg>
    ),
  },
  {
    label: 'No Sugar',
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M9 19C9 19 10 14 14 14C18 14 19 19 19 19" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
        <circle cx="14" cy="10" r="3" stroke="currentColor" strokeWidth="1.4"/>
      </svg>
    ),
    absent: true,
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
  { name: 'B-Vitamins (B1, B3, B6, B12)', dose: '2.875 mg' },
  { name: 'Inulin', dose: '1,345 mg' },
];

export default function HealthCenter({ caloriesKcal }: { caloriesKcal: number }) {
  const [nutritionOpen, setNutritionOpen] = useState(false);

  return (
    <section className="max-w-[1200px] mx-auto px-6 py-20">
      <div className="mb-10 space-y-2">
        <p className="text-xs tracking-[0.16em] uppercase text-[hsla(var(--color-secondary)/0.5)] font-medium">
          Purity & Transparency
        </p>
        <h2 className="text-3xl font-semibold tracking-[-0.02em]">What&apos;s in Flow. What isn&apos;t.</h2>
        <p className="text-sm text-[hsla(var(--color-secondary)/1)] max-w-md leading-relaxed">
          Every ingredient is disclosed. Every claim is verified. No hidden fillers, no corner-cutting — just a formula you can trust.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-[1fr_2fr] gap-4 items-start">

        {/* LEFT — Calories highlight + nutrition sheet link */}
        <div className="flex flex-col items-center justify-center py-4">
          <div
            className="w-44 h-44 rounded-full flex flex-col items-center justify-center gap-1"
            style={{
              background: 'linear-gradient(135deg, #3B38B8 0%, #1E1854 100%)',
              boxShadow: '0 8px 48px rgba(59,56,184,0.4), 0 0 0 1px rgba(59,56,184,0.12), 0 0 80px rgba(59,56,184,0.15)',
            }}
          >
            <p className="text-5xl font-semibold text-white tracking-[-0.03em] leading-none">{caloriesKcal}</p>
            <p className="text-xs font-medium text-white/70 tracking-[0.04em]">kcal per serving</p>
            <button
              onClick={() => setNutritionOpen(true)}
              className="mt-2 text-xs text-white/50 underline underline-offset-2 hover:text-white/80 transition-colors tracking-[0.02em]"
            >
              full nutritional sheet
            </button>
          </div>
        </div>

        {/* Nutrition popup */}
        {nutritionOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop */}
            <div
              className="absolute inset-0 bg-black/50 backdrop-blur-sm"
              onClick={() => setNutritionOpen(false)}
            />
            {/* Panel */}
            <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[85vh] flex flex-col overflow-hidden">
              {/* Header */}
              <div className="flex items-center justify-between px-6 py-5 border-b border-[var(--color-border)] shrink-0">
                <div>
                  <p className="text-xs uppercase tracking-[0.1em] text-[hsla(var(--color-secondary)/0.45)] font-medium">Flow Health</p>
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

              {/* Scrollable content */}
              <div className="overflow-y-auto flex-1 px-6 py-6 space-y-8">
                {/* Macros */}
                <div>
                  <p className="text-xs uppercase tracking-[0.1em] font-semibold text-[hsla(var(--color-secondary)/0.45)] mb-3">Nutritional Values per Serving (400 ml)</p>
                  {macros.map((row) => (
                    <div
                      key={row.label}
                      className={`flex items-center justify-between py-2.5 border-b border-[var(--color-border)] ${row.indent ? 'pl-5' : ''}`}
                    >
                      <span className={`text-sm ${row.indent ? 'text-[hsla(var(--color-secondary)/0.55)]' : 'text-[#1E1854] font-medium'}`}>{row.label}</span>
                      <div className="flex items-center gap-6">
                        <span className="text-sm text-[#1E1854]">{row.value}</span>
                        {row.daily
                          ? <span className="text-xs text-[hsla(var(--color-secondary)/0.4)] w-8 text-right">{row.daily}*</span>
                          : <span className="w-8" />
                        }
                      </div>
                    </div>
                  ))}
                  <p className="text-xs text-[hsla(var(--color-secondary)/0.4)] mt-3 leading-relaxed">* Reference intake of an average adult (8400 kJ / 2000 kcal).</p>
                </div>

                {/* Actives */}
                <div>
                  <p className="text-xs uppercase tracking-[0.1em] font-semibold text-[hsla(var(--color-secondary)/0.45)] mb-3">Active Ingredient Dosages</p>
                  {actives.map((a) => (
                    <div key={a.name} className="flex items-center justify-between py-2.5 border-b border-[var(--color-border)]">
                      <span className="text-sm text-[#1E1854]">{a.name}</span>
                      <span className="text-sm font-semibold text-[#1E1854] shrink-0 ml-6">{a.dose}</span>
                    </div>
                  ))}
                  <p className="text-xs text-[hsla(var(--color-secondary)/0.4)] mt-3 leading-relaxed">Swiss GMP · Vegan · Gluten-free · No artificial colours · Third-party tested for purity and potency.</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* RIGHT — Purity badges split into two groups */}
        <div className="border border-[var(--color-border)] rounded-2xl overflow-hidden shadow-[0_2px_16px_rgba(30,24,84,0.07)] flex flex-col">
          {/* Group 1: What it contains */}
          <div>
            <div className="px-4 py-2.5 border-b border-[var(--color-border)] bg-[#1E18540A]">
              <p className="text-xs font-semibold tracking-[0.1em] uppercase text-[#1E1854]">What it contains</p>
            </div>
            <div className="grid grid-cols-3 sm:grid-cols-6 gap-px bg-[var(--color-border)]">
              {badges.filter((b) => !b.absent).map((badge) => (
                <div key={badge.label} className="bg-white flex flex-col items-center justify-center gap-2.5 px-3 py-5 text-center">
                  <span className="text-[#1E1854]">{badge.icon}</span>
                  <p className="text-xs leading-snug font-medium text-[#1E1854]">{badge.label}</p>
                </div>
              ))}
            </div>
          </div>
          {/* Group 2: What it doesn't contain */}
          <div>
            <div className="px-4 py-2.5 border-y border-[var(--color-border)] bg-[#1E18540A]">
              <p className="text-xs font-semibold tracking-[0.1em] uppercase text-[hsla(var(--color-secondary)/0.45)]">What it doesn&apos;t contain</p>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-px bg-[var(--color-border)]">
              {badges.filter((b) => b.absent).map((badge) => (
                <div key={badge.label} className="bg-white flex flex-col items-center justify-center gap-2.5 px-3 py-5 text-center">
                  <span className="text-[hsla(var(--color-secondary)/0.35)]">{badge.icon}</span>
                  <p className="text-xs leading-snug font-medium text-[hsla(var(--color-secondary)/0.4)]">{badge.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
