'use client';

import { useState } from 'react';
import Image from 'next/image';

interface IngredientCategory {
  type: string;
  image?: string;
  ingredients: string[];
}

const categories: IngredientCategory[] = [
  {
    type: 'Adaptogens',
    image: 'https://flow-health-2.myshopify.com/cdn/shop/files/gingner.png?crop=center&height=76&v=1765390947&width=76',
    ingredients: ['Ashwagandha', 'Rhodiola Rosea'],
  },
  {
    type: 'Amino Acids & Precursors',
    ingredients: ['L-Tyrosine', 'Mucuna Pruriens', 'Alpha-GPC', 'L-Theanine'],
  },
  {
    type: 'Functional Mushrooms & Herbs',
    ingredients: ["Lion's Mane Mushroom", 'Bacopa Monnieri'],
  },
  {
    type: 'Vitamins',
    ingredients: ['Vitamin B complex (B1, B3, B6, B12)'],
  },
  {
    type: 'Minerals',
    ingredients: ['Magnesium (as magnesium bisglycinate)'],
  },
  {
    type: 'Plant Extracts & Polyphenols',
    ingredients: ['Green tea extract', 'Blueberry extract'],
  },
];

export default function IngredientTypeAccordion() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <section className="max-w-[1200px] mx-auto px-6 py-16">
      <div className="mb-10 space-y-2">
        <p className="text-xs tracking-[0.16em] uppercase font-semibold bg-gradient-to-r from-[#3B38B8] to-[#1E1854] bg-clip-text text-transparent">Formula Breakdown</p>
        <h2 className="text-3xl font-semibold tracking-[-0.02em]">Ingredient Type</h2>
      </div>
      <div className="divide-y divide-[var(--color-border)] border-t border-[var(--color-border)]">
        {categories.map((cat, i) => (
          <div key={cat.type}>
            <button
              onClick={() => setOpen(open === i ? null : i)}
              className="w-full flex items-center justify-between py-5 text-left gap-4"
            >
              <div className="flex items-center gap-4">
                {cat.image && (
                  <div className="relative w-10 h-10 rounded-full overflow-hidden shrink-0 bg-[#1E18540F]">
                    <Image src={cat.image} alt={cat.type} fill className="object-cover" />
                  </div>
                )}
                <span className="text-base font-medium tracking-[-0.01em]">{cat.type}</span>
              </div>
              <span
                className="font-semibold bg-gradient-to-r from-[#3B38B8] to-[#1E1854] bg-clip-text text-transparent transition-transform duration-300 shrink-0"
                style={{ transform: open === i ? 'rotate(45deg)' : 'rotate(0deg)' }}
              >
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                  <path d="M6 1v10M1 6h10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
              </span>
            </button>
            <div
              className="overflow-hidden transition-all duration-300 ease-out"
              style={{ maxHeight: open === i ? '300px' : '0px' }}
            >
              <ul className="pb-5 space-y-1 pl-14">
                {cat.ingredients.map((ing) => (
                  <li key={ing} className="text-sm font-semibold bg-gradient-to-r from-[#3B38B8] to-[#1E1854] bg-clip-text text-transparent flex items-center gap-2">
                    <span className="w-1 h-1 rounded-full bg-[hsla(var(--color-secondary)/0.5)] shrink-0" />
                    {ing}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
