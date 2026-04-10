'use client';

import Image from 'next/image';
import { PRODUCT_META } from '@/lib/product-meta';
import Link from 'next/link';
import IngredientsExplorer from '@/app/components/IngredientsExplorer';

export default function IngredientsClient({ productImageUrl }: { productImageUrl?: string }) {
  return (
    <main className="max-w-[1200px] mx-auto px-6 pb-14 md:pb-24">

      {/* Hero */}
      <div className="pt-20 pb-14 md:pb-20 border-b border-[var(--color-border)]">
        <div className="flex flex-col md:flex-row md:items-center gap-10 md:gap-16">
          {/* Text + specs */}
          <div className="flex-1 space-y-6">
            <p className="text-xs tracking-[0.16em] uppercase text-[#1E1854]/40 font-medium">Transparent Formula</p>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-semibold tracking-[-0.03em] leading-tight">
              Every ingredient,<br className="hidden sm:block" /> fully disclosed.
            </h1>
            <p className="text-base text-[hsla(var(--color-secondary)/0.65)] leading-relaxed">
              Selected for clinical evidence, bioavailability, and synergy. No fillers, no proprietary blends — just full doses of what works.
            </p>
            {/* Specs */}
            <div className="flex flex-wrap gap-2 mt-2">
              {[
                { value: String(PRODUCT_META.activeIngredients), label: 'Active ingredients' },
                { value: `${PRODUCT_META.totalFormulaWeightG}g`, label: 'Per serving' },
                { value: '0', label: 'Fillers or blends' },
                { value: `${PRODUCT_META.caloriesKcal} kcal`, label: 'Per serving' },
                { value: 'Vegan', label: 'Certified' },
                { value: 'No added sugar', label: 'Formula' },
                { value: 'Caffeine-free', label: 'Formula' },
              ].map((spec, i) => (
                <div key={i} className="bg-gradient-to-br from-[#1E1854] to-[#2d2a7a] rounded-xl px-5 py-3">
                  <p className="text-xl font-semibold tracking-[-0.02em] text-white whitespace-nowrap">{spec.value}</p>
                  <p className="text-xs tracking-[0.08em] uppercase text-white/50 mt-1 whitespace-nowrap">{spec.label}</p>
                </div>
              ))}
            </div>
          </div>
          {/* Hero image */}
          <div className="relative w-full md:w-[420px] h-[300px] md:h-[480px] rounded-2xl overflow-hidden shrink-0">
            <Image
              src="https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=900&q=85&auto=format&fit=crop"
              alt="Natural ingredients laid out on a clean surface"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 420px"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#1E1854]/30 via-transparent to-transparent" />
          </div>
        </div>
      </div>

      <div className="space-y-16 md:space-y-24 pt-16 md:pt-24">

        {/* Three axes */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {[
            {
              label: 'Cognitive Function',
              description: 'Sharpens focus, sustains mental energy, and supports long-term neuroplasticity via cholinergic, dopaminergic, and NGF pathways.',
              ingredients: ["Lion's Mane", 'Zynamite®', 'Green Tea', 'Ginseng', 'B-Vitamins'],
              icon: (
                <svg width="22" height="22" viewBox="0 0 28 28" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M14 4C9.6 4 6 7.6 6 12c0 2.8 1.4 5.3 3.5 6.8V21h9v-2.2C20.6 17.3 22 14.8 22 12c0-4.4-3.6-8-8-8z" />
                  <path d="M10 21v2a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1v-2" />
                  <line x1="14" y1="4" x2="14" y2="2" />
                  <line x1="6.3" y1="6.3" x2="4.9" y2="4.9" />
                  <line x1="21.7" y1="6.3" x2="23.1" y2="4.9" />
                </svg>
              ),
            },
            {
              label: 'Mood & Emotional Balance',
              description: 'Supports serotonin and dopamine pathways, eases everyday tension, and builds resilience through adaptogenic and antioxidant compounds.',
              ingredients: ["Saffr'Active®", 'Magnesium', 'Hibiscus', 'Rooibos', 'B6'],
              icon: (
                <svg width="22" height="22" viewBox="0 0 28 28" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="14" cy="14" r="10" />
                  <path d="M10 16s1.5 2 4 2 4-2 4-2" />
                  <circle cx="10.5" cy="12" r="1" fill="currentColor" stroke="none" />
                  <circle cx="17.5" cy="12" r="1" fill="currentColor" stroke="none" />
                </svg>
              ),
            },
            {
              label: 'Cellular & Metabolic Health',
              description: 'Fuels mitochondrial efficiency, supports healthy methylation, and provides the mineral and vitamin cofactors every cell needs to thrive.',
              ingredients: ['Betaine', 'Zinc', 'Inulin', 'B1', 'B12'],
              icon: (
                <svg width="22" height="22" viewBox="0 0 28 28" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M7 14c0-3.9 3.1-7 7-7s7 3.1 7 7" />
                  <path d="M10 18.5c0 2.2 1.8 4 4 4s4-1.8 4-4" />
                  <line x1="14" y1="7" x2="14" y2="4" />
                  <path d="M9 9.5 7 7.5M19 9.5l2-2" />
                  <line x1="7" y1="14" x2="4" y2="14" />
                  <line x1="21" y1="14" x2="24" y2="14" />
                </svg>
              ),
            },
          ].map((axis) => (
            <div key={axis.label} className="rounded-2xl border border-[#1E1854]/[0.07] bg-white shadow-sm shadow-[#1E1854]/[0.04] flex flex-col gap-4 p-5">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-[#1E1854]/[0.06] flex items-center justify-center text-[#1E1854] shrink-0">
                  {axis.icon}
                </div>
                <p className="text-sm font-semibold tracking-[-0.02em] text-[#1E1854]">{axis.label}</p>
              </div>
              <div className="flex flex-col gap-3 pt-1 border-t border-[#1E1854]/[0.06]">
                <p className="text-sm text-[hsla(var(--color-secondary)/0.68)] leading-relaxed">{axis.description}</p>
                <div className="flex flex-wrap gap-1.5">
                  {axis.ingredients.map((ing) => (
                    <span key={ing} className="text-xs tracking-[0.05em] bg-[#1E1854]/[0.04] border border-[#1E1854]/[0.08] px-2.5 py-1 rounded-full text-[#1E1854]/60 font-medium">
                      {ing}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Sidebar + filterable ingredient list */}
        <IngredientsExplorer scrollOnFilter clarityPrefix="ingredients_page" visibleLimit={6} />

        {/* Bottom row: Shop Flow + nav links */}
        <div className="space-y-5">
          <h2 className="text-2xl font-semibold tracking-[-0.02em]">Continue your research</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Shop Flow CTA card */}
            <div className="relative rounded-2xl overflow-hidden h-[320px] flex flex-col justify-end p-7 gap-4">
              <Image src={productImageUrl || '/hero-lifestyle.png'} alt="Flow product" fill className="object-cover" sizes="(max-width: 768px) 100vw, 33vw" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#1E1854]/85 via-[#1E1854]/30 to-transparent" />
              <div className="relative z-10 flex flex-col gap-4">
                <h3 className="text-lg font-semibold tracking-[-0.02em] text-white leading-snug">
                  Every ingredient above, in one daily formula.
                </h3>
                <Link href="/products/flow" className="self-start inline-flex items-center justify-center bg-white text-[#1E1854] text-xs tracking-[0.1em] uppercase font-semibold px-5 py-3 rounded-full hover:bg-[hsla(var(--color-accent)/1)] hover:text-white transition-colors">
                  Shop Flow
                </Link>
              </div>
            </div>

            {/* Nav link cards */}
            {[
              { label: 'Our Philosophy', description: 'The principles that guide every formulation decision.', href: '/pages/our-philosophy', image: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=700&q=80&auto=format&fit=crop' },
              { label: 'Our Product', description: 'Inside the formula — every ingredient and why it matters.', href: '/pages/our-product', image: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=700&q=80&auto=format&fit=crop' },
            ].map((card) => (
              <Link key={card.label} href={card.href} className="group relative rounded-2xl overflow-hidden h-[320px] flex items-end">
                <Image src={card.image} alt={card.label} fill className="object-cover transition-transform duration-500 group-hover:scale-105" sizes="(max-width: 768px) 100vw, 33vw" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/45 to-black/10" />
                <div className="relative z-10 p-7 space-y-1">
                  <h3 className="text-lg font-semibold text-white">{card.label}</h3>
                  <p className="text-xs text-white/80 leading-snug">{card.description}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>

      </div>
    </main>
  );
}
