'use client';

import { useState } from 'react';

const ALTERNATIVES = [
  'a single Red Bull at the kiosk',
  'a small espresso at your local café',
  'a pack of chewing gum',
  'a newspaper at the kiosk',
  'a banana from the supermarket',
  'a ride with public transit',
];

type Supplement = { name: string; monthlyPriceCHF: number };
type ComparisonRow = { order: number; topic?: string[]; feature: string };

export default function SavingsBreakdownClient({
  supplements,
  flowPrice,
  traditionalTotal,
  savings,
  servingsPerBox,
  pricePerServing,
  activeIngredients,
  comparisonRows,
}: {
  supplements: Supplement[];
  flowPrice: number;
  traditionalTotal: number;
  savings: number;
  servingsPerBox: number;
  pricePerServing: number;
  activeIngredients: number;
  comparisonRows: ComparisonRow[];
}) {
  const [open, setOpen] = useState(false);
  const [altIndex, setAltIndex] = useState(0);

  const flipAlternative = () => setAltIndex((i) => (i + 1) % ALTERNATIVES.length);

  return (
    <section className="max-w-[1200px] mx-auto px-6 pt-4 pb-20 md:pt-8">
      {/* Section title — full width, same level as other section titles */}
      <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold tracking-[-0.02em] leading-tight mb-5 md:mb-7">
        Flow stacks up to its competition.
      </h2>

      {/* How Flow compares — compact cards */}
      <div className="mt-10 md:mt-12">
<div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-5 gap-3">

          {/* Price card — spans 2 cols to fit more content */}
          <div
            className="sm:col-span-2 rounded-xl px-5 py-5 flex flex-col gap-4"
            style={{ background: '#F4F4FB', border: '1px solid rgba(30,24,84,0.08)' }}
          >
            <div>
              <p className="text-xs font-semibold tracking-[0.1em] uppercase text-[#1E1854]/35 mb-2">Price</p>
              <p className="text-xs text-[#1E1854] leading-relaxed">
                For all {activeIngredients} ingredients in Flow you would have paid{' '}
                <span className="font-semibold">CHF {traditionalTotal}/month</span> buying them separately.
              </p>
              <button
                onClick={() => setOpen(true)}
                className="mt-2 inline-flex items-center gap-1 text-xs font-medium text-[#1E1854]/40 hover:text-[#1E1854] transition-colors duration-200"
              >
                See full breakdown
                <svg width="9" height="9" viewBox="0 0 9 9" fill="none">
                  <path d="M2 4.5h5M4.5 2l2.5 2.5-2.5 2.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
            </div>

            <hr className="border-[#1E1854]/10" />

            <div className="flex flex-col gap-3">
              <p className="text-xs text-[#1E1854]/50 leading-snug">
                At CHF {pricePerServing} per day you could also get
              </p>
              <p className="text-xs font-semibold text-[#1E1854] leading-snug">
                {ALTERNATIVES[altIndex]}
              </p>
              <button
                onClick={flipAlternative}
                className="self-start inline-flex items-center gap-1.5 text-xs font-medium text-[#1E1854]/50 hover:text-[#1E1854] transition-colors duration-200"
              >
                What else could I buy
                <svg width="11" height="11" viewBox="0 0 11 11" fill="none">
                  <path d="M9.5 2.5A4.5 4.5 0 1 0 10 5.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M8 1l1.5 1.5L8 4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
            </div>
          </div>

          {comparisonRows
            .filter((row) => !['science', 'quality'].includes((row.topic?.[0] ?? '').toLowerCase()))
            .map((row) => (
              <div
                key={row.order}
                className="rounded-xl px-4 py-3.5 flex flex-col gap-1.5"
                style={{ background: '#F4F4FB', border: '1px solid rgba(30,24,84,0.08)' }}
              >
                {row.topic?.[0] && (
                  <p className="text-xs font-semibold tracking-[0.1em] uppercase text-[#1E1854]/35">{row.topic[0]}</p>
                )}
                <p className="text-xs text-[#1E1854] leading-snug">{row.feature}</p>
              </div>
            ))}
        </div>
      </div>

      {/* Modal */}
      {open && (
        <div
          className="fixed inset-0 z-50 flex items-end sm:items-center justify-center"
          onClick={() => setOpen(false)}
        >
          <div className="absolute inset-0 bg-[#1E1854]/60 backdrop-blur-sm" />
          <div
            className="relative w-full sm:max-w-sm bg-white rounded-t-3xl sm:rounded-3xl shadow-2xl flex flex-col max-h-[85vh] overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-5 border-b border-[var(--color-border)] shrink-0">
              <p className="text-sm font-semibold text-[#1E1854]">Monthly breakdown</p>
              <button
                onClick={() => setOpen(false)}
                className="w-8 h-8 flex items-center justify-center rounded-full bg-[#1E18540A] hover:bg-[#1E185415] transition-colors text-[#1E1854]/50 hover:text-[#1E1854]"
              >
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <path d="M11 3L3 11M3 3l8 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                </svg>
              </button>
            </div>
            {/* Scrollable list */}
            <div className="overflow-y-auto flex-1 px-6 divide-y divide-[var(--color-border)]">
              {supplements.map((s) => (
                <div key={s.name} className="flex items-center justify-between gap-4 py-3.5">
                  <span className="text-sm text-[hsla(var(--color-secondary)/0.75)]">{s.name}</span>
                  <span className="text-sm font-medium text-[#1E1854] shrink-0">CHF {s.monthlyPriceCHF}</span>
                </div>
              ))}
            </div>
            {/* Totals — sticky at bottom */}
            <div className="px-6 pt-1 pb-7 border-t-2 border-[#1E1854] shrink-0 space-y-2">
              <div className="flex items-center justify-between gap-4 pt-3">
                <span className="text-sm text-[hsla(var(--color-secondary)/0.45)] line-through">Traditional supplements</span>
                <span className="text-sm text-[hsla(var(--color-secondary)/0.45)] line-through shrink-0">CHF {traditionalTotal}</span>
              </div>
              <div className="flex items-center justify-between gap-4">
                <span className="text-base font-semibold text-[#1E1854]">Flow — {servingsPerBox} sachets · subscription</span>
                <span className="text-base font-semibold text-[#1E1854] shrink-0">CHF {flowPrice}</span>
              </div>
              <p className="text-xs text-[hsla(var(--color-secondary)/0.5)] pt-1">You save CHF {savings} every month.</p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}