import { getSavingsSupplements } from '@/lib/contentful';
import SavingsBreakdownModal from './SavingsBreakdownModal';

const flowPrice = 79;

export default async function SavingsBreakdown() {
  const supplements = await getSavingsSupplements();
  const traditionalTotal = supplements.reduce((sum, s) => sum + s.monthlyPriceCHF, 0);
  const savings = traditionalTotal - flowPrice;

  return (
    <section className="max-w-[1200px] mx-auto px-6 py-12 md:py-20">
      <div className="flex flex-col sm:flex-row gap-10 sm:gap-16 items-start">

        {/* Heading */}
        <div className="flex-1 space-y-2">
          <p className="text-xs tracking-[0.16em] uppercase text-[hsla(var(--color-secondary)/0.5)] font-medium">Save Money</p>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold tracking-[-0.02em] leading-tight">
            One bottle replaces<br />{supplements.length} daily supplements.
          </h2>
          <p className="text-sm text-[hsla(var(--color-secondary)/0.65)] max-w-sm leading-relaxed pt-1">
            The average person spends over CHF {traditionalTotal} every month on individual supplements. Flow consolidates everything into one bottle — without compromise.
          </p>
          {/* CTA: hidden on mobile (shown below badge), visible on sm+ */}
          <div className="hidden sm:block pt-2">
            <SavingsBreakdownModal
              supplements={supplements}
              flowPrice={flowPrice}
              traditionalTotal={traditionalTotal}
              savings={savings}
            />
          </div>
        </div>

        {/* Savings badge + mobile CTA */}
        <div className="flex flex-col items-start sm:items-center gap-3 shrink-0">
          <div className="inline-flex flex-col items-center justify-center w-40 h-40 md:w-48 md:h-48 rounded-full bg-[#1E1854] text-white text-center p-6">
            <span className="text-[10px] uppercase tracking-[0.16em] text-white/50 font-medium mb-1">Monthly savings</span>
            <span className="text-4xl font-semibold tracking-[-0.03em] leading-none">CHF {savings}</span>
            <span className="text-xs text-white/50 mt-2 leading-snug">switching to Flow</span>
          </div>
          {/* CTA: only on mobile */}
          <div className="sm:hidden">
            <SavingsBreakdownModal
              supplements={supplements}
              flowPrice={flowPrice}
              traditionalTotal={traditionalTotal}
              savings={savings}
            />
          </div>
        </div>

      </div>
    </section>
  );
}
