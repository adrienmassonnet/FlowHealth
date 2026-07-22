'use client';

import { useState } from 'react';
import { trackEvent } from '@/lib/clarity';

const ALTERNATIVES = [
  'a single Red Bull at the kiosk',
  'a ginger shot at the juice bar',
  'a small espresso at your local café',
  'a pack of chewing gum',
  'a newspaper at the kiosk',
  'a banana from the supermarket',
  'a ride with public transit',
];

type Supplement = { name: string; monthlyPriceCHF: number };
type ComparisonRow = { order: number; topic?: string[]; feature: string; othersLabel: string };

function CheckIcon() {
  return (
    <span className="shrink-0 mt-0.5 w-5 h-5 rounded-full bg-emerald-50 border border-emerald-200 flex items-center justify-center">
      <svg width="9" height="9" viewBox="0 0 9 9" fill="none">
        <path d="M1.5 4.5l2 2 4-4" stroke="#16a34a" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    </span>
  );
}

function CrossIcon() {
  return (
    <span className="shrink-0 mt-0.5 w-5 h-5 rounded-full bg-ink/[0.04] border border-ink/10 flex items-center justify-center">
      <svg width="9" height="9" viewBox="0 0 9 9" fill="none">
        <path d="M2.5 2.5l4 4M6.5 2.5l-4 4" stroke="var(--color-ink)" strokeOpacity="0.3" strokeWidth="1.4" strokeLinecap="round"/>
      </svg>
    </span>
  );
}

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
  const [activeRow, setActiveRow] = useState<number | null>(comparisonRows[0]?.order ?? null);

  const flipAlternative = () => {
    setAltIndex((i) => (i + 1) % ALTERNATIVES.length);
    trackEvent('product_savings_comparison_next');
  };

  return (
    <section className="max-w-[1200px] mx-auto px-6 pt-4 pb-20 md:pt-8">
      <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold tracking-[-0.02em] leading-[1.08] mb-6">
        Flow stacks up to its competition.
      </h2>

      {/* Price card — above the table */}
      <div
        className="mb-4 rounded-xl px-4 py-4 md:px-6 md:py-6 flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-10"
        style={{ background: '#F4F4FB', border: '1px solid rgba(30,24,84,0.08)' }}
      >
        {/* Left: the value headline */}
        <div className="flex-1 space-y-1.5">
          <p className="text-xs font-semibold tracking-[0.1em] uppercase text-ink/35">What you pay</p>
          <span className="text-2xl md:text-4xl font-semibold tracking-[-0.03em] text-ink">CHF {flowPrice}<span className="text-sm font-medium text-ink/40 ml-1">/mo</span></span>
          <p className="text-xs text-ink/45 leading-[1.55]">
            One sachet. {activeIngredients} active ingredients. {servingsPerBox} days of supply. The same stack bought separately would run you <span className="font-semibold text-ink/60">CHF {traditionalTotal}/mo</span>.
          </p>
          <div className="flex flex-wrap items-center gap-2 pt-0.5">
            <span className="inline-flex items-center px-2.5 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-xs font-semibold text-emerald-700">
              CHF {savings} cheaper than buying separately
            </span>
            <button
              onClick={() => { setOpen(true); trackEvent('product_page_savings_breakdown_open'); }}
              className="inline-flex items-center gap-1 text-xs font-medium text-ink/40 hover:text-ink transition-colors duration-200"
            >
              See full breakdown
              <svg width="9" height="9" viewBox="0 0 9 9" fill="none">
                <path d="M2 4.5h5M4.5 2l2.5 2.5-2.5 2.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          </div>
        </div>

        {/* Divider */}
        <div className="sm:w-px sm:self-stretch bg-ink/[0.08] hidden sm:block" />

        {/* Right: per-day anchor */}
        <div className="flex flex-col gap-1 sm:w-52 shrink-0">
          <p className="text-xs font-semibold tracking-[0.1em] uppercase text-ink/35">Per day</p>
          <p className="text-xl md:text-3xl font-semibold tracking-[-0.02em] text-ink">CHF {pricePerServing}</p>
          <p className="text-xs text-ink/50">That's less than</p>
          <p className="text-xs font-semibold text-ink">{ALTERNATIVES[altIndex]}</p>
          <button
            onClick={flipAlternative}
            className="self-start inline-flex items-center gap-1.5 text-xs font-medium text-ink/40 hover:text-ink transition-colors duration-200 mt-0.5"
          >
            See another
            <svg width="11" height="11" viewBox="0 0 11 11" fill="none">
              <path d="M9.5 2.5A4.5 4.5 0 1 0 10 5.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M8 1l1.5 1.5L8 4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile: two-column selector */}
      <div className="md:hidden flex gap-0 rounded-2xl border border-ink/[0.07] overflow-hidden shadow-[0_2px_12px_rgba(30,24,84,0.06)]">
        {/* Left: topic list */}
        <div className="w-[42%] shrink-0 divide-y divide-ink/[0.07] border-r border-ink/[0.07]">
          {comparisonRows.map((row) => {
            const isActive = activeRow === row.order;
            return (
              <button
                key={row.order}
                onClick={() => { setActiveRow(row.order); trackEvent('product_savings_row_select'); }}
                className={`w-full text-left px-3 py-3 transition-colors duration-200 ${isActive ? 'bg-ink ' : 'bg-white hover:bg-ink/4'}`}
              >
                <span className={`text-[11px] font-semibold leading-snug ${isActive ? 'text-white' : 'text-ink/50'}`}>
                  {row.topic?.[0]}
                </span>
              </button>
            );
          })}
        </div>

        {/* Right: active content */}
        <div className="flex-1 min-w-0 bg-white p-3 space-y-2.5">
          {comparisonRows.filter(r => r.order === activeRow).map((row) => (
            <div key={row.order} className="space-y-2">
              <div className="flex items-start gap-2">
                <CheckIcon />
                <span className="text-xs text-ink leading-[1.55] pt-0.5">
                  {row.feature.replace(/\{active_ingredients\}/g, String(activeIngredients))}
                </span>
              </div>
              <div className="flex items-start gap-2">
                <CrossIcon />
                <span className="text-xs text-ink/45 leading-[1.55] pt-0.5">{row.othersLabel}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Desktop: table */}
      <div className="hidden md:block rounded-2xl border border-ink/[0.08] overflow-hidden">
        {/* Table header */}
        <div className="grid grid-cols-[160px_2fr_1fr] bg-[#F4F4FB] border-b border-ink/[0.08]">
          <div className="px-4 py-3" />
          <div className="px-4 py-3 border-l border-ink/[0.08] flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-brand" />
            <span className="text-xs font-semibold tracking-[0.1em] uppercase text-ink">Flow</span>
          </div>
          <div className="px-4 py-3 border-l border-ink/[0.08] flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-ink/20" />
            <span className="text-xs font-semibold tracking-[0.1em] uppercase text-ink/35">Others</span>
          </div>
        </div>

        {/* Table rows */}
        {comparisonRows.map((row, i) => (
          <div
            key={row.order}
            className={`grid grid-cols-[160px_2fr_1fr] ${i < comparisonRows.length - 1 ? 'border-b border-ink/[0.06]' : ''} ${i % 2 === 1 ? 'bg-[#F4F4FB]/50' : 'bg-white'}`}
          >
            <div className="px-4 py-4 flex items-center">
              <span className="text-xs font-semibold tracking-[0.08em] uppercase text-ink/50 leading-tight break-words">{row.topic?.[0]}</span>
            </div>
            <div className="px-4 py-4 border-l border-ink/[0.06] flex items-start gap-2.5">
              <CheckIcon />
              <span className="text-xs text-ink leading-relaxed pt-0.5">
                {row.feature.replace(/\{active_ingredients\}/g, String(activeIngredients))}
              </span>
            </div>
            <div className="px-4 py-4 border-l border-ink/[0.06] flex items-start gap-2.5">
              <CrossIcon />
              <span className="text-xs text-ink/45 leading-relaxed pt-0.5">{row.othersLabel}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      {open && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center" onClick={() => setOpen(false)}>
          <div className="absolute inset-0 bg-ink/60 backdrop-blur-sm" />
          <div
            className="relative w-full sm:max-w-sm bg-white rounded-t-3xl sm:rounded-3xl shadow-2xl flex flex-col max-h-[85vh] overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between px-6 py-5 border-b border-ink/[12.5%] shrink-0">
              <p className="text-sm font-semibold text-ink">Monthly breakdown</p>
              <button
                onClick={() => setOpen(false)}
                className="w-8 h-8 flex items-center justify-center rounded-full bg-ink/[3.9%] hover:bg-ink/[8.2%] transition-colors text-ink/50 hover:text-ink"
              >
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <path d="M11 3L3 11M3 3l8 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                </svg>
              </button>
            </div>
            <div className="overflow-y-auto flex-1 px-6 divide-y divide-ink/[12.5%]">
              {supplements.map((s) => (
                <div key={s.name} className="flex items-center justify-between gap-4 py-3.5">
                  <span className="text-sm text-[rgba(30,24,84,0.75)]">{s.name}</span>
                  <span className="text-sm font-medium text-ink shrink-0">CHF {s.monthlyPriceCHF}</span>
                </div>
              ))}
            </div>
            <div className="px-6 pt-1 pb-7 border-t-2 border-ink shrink-0 space-y-2">
              <div className="flex items-center justify-between gap-4 pt-3">
                <span className="text-sm text-[rgba(30,24,84,0.45)] line-through">Traditional supplements</span>
                <span className="text-sm text-[rgba(30,24,84,0.45)] line-through shrink-0">CHF {traditionalTotal}</span>
              </div>
              <div className="flex items-center justify-between gap-4">
                <span className="text-base font-semibold text-ink">Flow — {servingsPerBox} sachets · subscription</span>
                <span className="text-base font-semibold text-ink shrink-0">CHF {flowPrice}</span>
              </div>
              <p className="text-xs text-[rgba(30,24,84,0.5)] pt-1">You save CHF {savings} every month.</p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}