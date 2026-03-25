import { getSavingsSupplements } from '@/lib/contentful';

const flowPrice = 79;

export default async function SavingsBreakdown() {
  const supplements = await getSavingsSupplements();
  const traditionalTotal = supplements.reduce((sum, s) => sum + s.monthlyPriceCHF, 0);
  const savings = traditionalTotal - flowPrice;

  return (
    <section className="max-w-[1200px] mx-auto px-6 py-12 md:py-20">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20 items-start">

        {/* Left — heading + savings badge */}
        <div className="flex flex-col gap-8">
          <div className="space-y-2">
            <p className="text-xs tracking-[0.16em] uppercase text-[hsla(var(--color-secondary)/0.5)] font-medium">Save Money</p>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold tracking-[-0.02em] leading-tight">
              One bottle replaces<br />{supplements.length} daily supplements.
            </h2>
            <p className="text-sm text-[hsla(var(--color-secondary)/0.65)] max-w-sm leading-relaxed mt-3">
              The average person spends over CHF {traditionalTotal} every month on individual supplements. Flow consolidates everything into one bottle — without compromise.
            </p>
          </div>

          {/* Savings badge */}
          <div className="inline-flex flex-col items-center justify-center w-40 h-40 md:w-48 md:h-48 rounded-full bg-[#1E1854] text-white text-center p-6 self-start">
            <span className="text-[10px] uppercase tracking-[0.16em] text-white/50 font-medium mb-1">Monthly savings</span>
            <span className="text-4xl font-semibold tracking-[-0.03em] leading-none">CHF {savings}</span>
            <span className="text-xs text-white/50 mt-2 leading-snug">switching to Flow</span>
          </div>
        </div>

        {/* Right — breakdown list */}
        <div>
          <p className="text-xs uppercase tracking-[0.12em] text-[hsla(var(--color-secondary)/0.4)] font-medium mb-4">Monthly breakdown</p>

          <div className="divide-y divide-[var(--color-border)]">
            {supplements.map((s) => (
              <div key={s.name} className="flex items-center justify-between gap-4 py-3.5">
                <span className="text-sm text-[hsla(var(--color-secondary)/0.75)]">{s.name}</span>
                <span className="text-sm font-medium text-[#1E1854] shrink-0">CHF {s.monthlyPriceCHF}</span>
              </div>
            ))}
          </div>

          {/* Totals */}
          <div className="mt-1 pt-4 border-t-2 border-[#1E1854] space-y-2">
            <div className="flex items-center justify-between gap-4">
              <span className="text-sm text-[hsla(var(--color-secondary)/0.55)] line-through">Traditional supplements</span>
              <span className="text-sm text-[hsla(var(--color-secondary)/0.55)] line-through shrink-0">CHF {traditionalTotal}</span>
            </div>
            <div className="flex items-center justify-between gap-4">
              <span className="text-base font-semibold text-[#1E1854]">Flow — one daily bottle</span>
              <span className="text-base font-semibold text-[#1E1854] shrink-0">CHF {flowPrice}</span>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
