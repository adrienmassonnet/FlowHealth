'use client';

import { useState } from 'react';
import { trackEvent } from '@/lib/clarity';

type Supplement = { name: string; monthlyPriceCHF: number };

export default function SavingsBreakdownClient({
  supplements,
  flowPrice,
  traditionalTotal,
  savings,
  savingsRounded,
  pricePerServing,
  activeIngredients,
  servingsPerBox,
}: {
  supplements: Supplement[];
  flowPrice: number;
  traditionalTotal: number;
  savings: number;
  savingsRounded: number;
  pricePerServing: number;
  activeIngredients: number;
  servingsPerBox: number;
}) {
  const [open, setOpen] = useState(false);

  const openModal = () => {
    setOpen(true);
    trackEvent('product_page_savings_breakdown_open');
  };

  return (
    <section className="max-w-[1200px] mx-auto px-6 py-12 md:py-20">
      <div className="flex flex-col sm:flex-row gap-10 sm:gap-16 items-start">

        {/* Heading */}
        <div className="flex-1 space-y-2">
          <p className="text-xs tracking-[0.16em] uppercase font-semibold bg-gradient-to-r from-[#3B38B8] to-[#1E1854] bg-clip-text text-transparent">Save Money</p>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold tracking-[-0.02em] leading-tight">
            One formula replaces {supplements.length} daily supplements,<br />at the cost of one energy drink.
          </h2>
          <p className="text-sm text-[hsla(var(--color-secondary)/0.65)] max-w-sm leading-relaxed pt-1">
            At CHF {pricePerServing} per sachet — the same price as a Red Bull — Flow delivers {activeIngredients} clinically dosed active ingredients. Buying the same stack individually costs CHF {traditionalTotal}/month at Swiss retailers.
          </p>
        </div>

        {/* Savings badge + inline breakdown */}
        <div className="flex flex-col items-center gap-5 shrink-0 w-full sm:w-auto">

          {/* Circle badge — gradient, hover scale, click opens modal */}
          <button
            onClick={openModal}
            aria-label="Open savings breakdown"
            className="inline-flex flex-col items-center justify-center w-40 h-40 md:w-48 md:h-48 rounded-full bg-gradient-to-br from-[#1E1854] via-[#2a2770] to-[#312e8a] text-white text-center p-6 shadow-lg shadow-[#1E1854]/25 cursor-pointer transition-all duration-500 ease-[cubic-bezier(0.25,0.1,0.1,1)] hover:scale-[1.06] hover:shadow-2xl hover:shadow-[#1E1854]/40"
          >
            <span className="text-xs uppercase tracking-[0.16em] text-white/50 font-medium mb-1">Monthly savings</span>
            <span className="text-4xl font-semibold tracking-[-0.03em] leading-none">CHF {savingsRounded}</span>
            <span className="text-xs text-white/50 mt-2 leading-snug">switching to Flow</span>
          </button>

          {/* Link CTA — below circle on all breakpoints */}
          <button
            onClick={openModal}
            className="inline-flex items-center gap-1.5 text-xs font-medium text-[hsla(var(--color-accent)/1)] tracking-[0.04em] hover:opacity-75 transition-opacity"
          >
            See full breakdown
            <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
              <path d="M2 5h6M5 2l3 3-3 3" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
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
