'use client';
import { PRODUCT_META } from '@/lib/product-meta';

import { useState } from 'react';
import { trackEvent } from '@/lib/clarity';

type Supplement = { name: string; monthlyPriceCHF: number };

export default function SavingsBreakdownClient({
  supplements,
  flowPrice,
  traditionalTotal,
  savings,
  savingsRounded,
}: {
  supplements: Supplement[];
  flowPrice: number;
  traditionalTotal: number;
  savings: number;
  savingsRounded: number;
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
          <p className="text-xs tracking-[0.16em] uppercase text-[hsla(var(--color-secondary)/0.5)] font-medium">Save Money</p>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold tracking-[-0.02em] leading-tight">
            One formula replaces {supplements.length} daily supplements,<br />at the cost of one energy drink.
          </h2>
          <p className="text-sm text-[hsla(var(--color-secondary)/0.65)] max-w-sm leading-relaxed pt-1">
            At CHF {PRODUCT_META.pricePerServingSingleCHF} per sachet — the same price as a Red Bull — Flow delivers {PRODUCT_META.activeIngredients} clinically dosed active ingredients. Buying the same stack individually costs CHF {traditionalTotal}/month at Swiss retailers.
          </p>
        </div>

        {/* Savings badge + inline breakdown */}
        <div className="flex flex-col items-start sm:items-center gap-5 shrink-0 w-full sm:w-auto">

          {/* Circle badge — gradient, hover scale, click opens modal */}
          <button
            onClick={openModal}
            aria-label="Open savings breakdown"
            className="self-start sm:self-auto inline-flex flex-col items-center justify-center w-40 h-40 md:w-48 md:h-48 rounded-full bg-gradient-to-br from-[#1E1854] via-[#2a2770] to-[#312e8a] text-white text-center p-6 shadow-lg shadow-[#1E1854]/25 cursor-pointer transition-all duration-500 ease-[cubic-bezier(0.25,0.1,0.1,1)] hover:scale-[1.06] hover:shadow-2xl hover:shadow-[#1E1854]/40"
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
          className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-4 sm:p-6"
          onClick={() => setOpen(false)}
        >
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" />
          <div
            className="relative w-full max-w-sm bg-white rounded-2xl shadow-xl overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between px-6 py-5 border-b border-[var(--color-border)]">
              <p className="text-sm font-semibold text-[#1E1854]">Monthly breakdown</p>
              <button
                onClick={() => setOpen(false)}
                className="w-7 h-7 flex items-center justify-center rounded-full hover:bg-[#1E18540A] transition-colors text-[#1E1854]/40"
              >
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                  <path d="M1.5 1.5l9 9M10.5 1.5l-9 9" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
                </svg>
              </button>
            </div>
            <div className="px-6 divide-y divide-[var(--color-border)]">
              {supplements.map((s) => (
                <div key={s.name} className="flex items-center justify-between gap-4 py-3.5">
                  <span className="text-sm text-[hsla(var(--color-secondary)/0.75)]">{s.name}</span>
                  <span className="text-sm font-medium text-[#1E1854] shrink-0">CHF {s.monthlyPriceCHF}</span>
                </div>
              ))}
            </div>
            <div className="px-6 pt-1 pb-6 border-t-2 border-[#1E1854] mt-1 space-y-2">
              <div className="flex items-center justify-between gap-4 pt-3">
                <span className="text-sm text-[hsla(var(--color-secondary)/0.45)] line-through">Traditional supplements</span>
                <span className="text-sm text-[hsla(var(--color-secondary)/0.45)] line-through shrink-0">CHF {traditionalTotal}</span>
              </div>
              <div className="flex items-center justify-between gap-4">
                <span className="text-base font-semibold text-[#1E1854]">Flow — {PRODUCT_META.servingsPerBox} sachets · monthly</span>
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
