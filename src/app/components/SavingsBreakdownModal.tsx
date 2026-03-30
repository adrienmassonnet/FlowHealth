'use client';

import { useState } from 'react';

type Supplement = { name: string; monthlyPriceCHF: number };

export default function SavingsBreakdownModal({
  supplements,
  flowPrice,
  traditionalTotal,
  savings,
}: {
  supplements: Supplement[];
  flowPrice: number;
  traditionalTotal: number;
  savings: number;
}) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="inline-flex items-center gap-1.5 text-xs font-medium text-[hsla(var(--color-accent)/1)] tracking-[0.04em] hover:opacity-75 transition-opacity"
      >
        See full breakdown
        <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
          <path d="M2 5h6M5 2l3 3-3 3" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </button>

      {open && (
        <div
          className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-4 sm:p-6"
          onClick={() => setOpen(false)}
        >
          {/* Backdrop */}
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" />

          {/* Panel */}
          <div
            className="relative w-full max-w-sm bg-white rounded-2xl shadow-xl overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
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

            {/* List */}
            <div className="px-6 divide-y divide-[var(--color-border)]">
              {supplements.map((s) => (
                <div key={s.name} className="flex items-center justify-between gap-4 py-3.5">
                  <span className="text-sm text-[hsla(var(--color-secondary)/0.75)]">{s.name}</span>
                  <span className="text-sm font-medium text-[#1E1854] shrink-0">CHF {s.monthlyPriceCHF}</span>
                </div>
              ))}
            </div>

            {/* Totals */}
            <div className="px-6 pt-1 pb-6 border-t-2 border-[#1E1854] mt-1 space-y-2">
              <div className="flex items-center justify-between gap-4 pt-3">
                <span className="text-sm text-[hsla(var(--color-secondary)/0.45)] line-through">Traditional supplements</span>
                <span className="text-sm text-[hsla(var(--color-secondary)/0.45)] line-through shrink-0">CHF {traditionalTotal}</span>
              </div>
              <div className="flex items-center justify-between gap-4">
                <span className="text-base font-semibold text-[#1E1854]">Flow — one daily bottle</span>
                <span className="text-base font-semibold text-[#1E1854] shrink-0">CHF {flowPrice}</span>
              </div>
              <p className="text-xs text-[hsla(var(--color-secondary)/0.5)] pt-1">You save CHF {savings} every month.</p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
