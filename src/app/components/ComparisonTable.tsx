import Image from 'next/image';
import { getComparisonRows, getProductMeta } from '@/lib/contentful';

function interpolate(text: string, meta: { activeIngredients: number }) {
  return text.replace(/\{active_ingredients\}/g, String(meta.activeIngredients));
}

function CrossIcon() {
  return (
    <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-[#1E1854]/[0.07]">
      <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
        <path d="M2 2L8 8M8 2L2 8" stroke="#1E1854" strokeOpacity="0.3" strokeWidth="1.4" strokeLinecap="round"/>
      </svg>
    </span>
  );
}

export default async function ComparisonTable() {
  const [rows, meta] = await Promise.all([getComparisonRows(), getProductMeta()]);

  return (
    <section className="bg-white border-y border-[var(--color-border)]">
      <div className="max-w-[1200px] mx-auto px-6 py-20">

        <div className="flex flex-col md:flex-row md:items-start md:gap-12">

          {/* Header — left on desktop, top on mobile */}
          <div className="mb-10 md:mb-0 md:w-56 md:shrink-0 md:pt-12 space-y-4">
            <p className="text-xs tracking-[0.16em] uppercase text-[hsla(var(--color-secondary)/0.5)] font-medium">Why Flow</p>
            <h2 className="text-2xl sm:text-3xl font-semibold tracking-[-0.02em] leading-tight text-[#1E1854]">
              How Flow compares
            </h2>
          </div>

          {/* Table + column labels */}
          <div className="flex-1 min-w-0">

            {/* Column labels — outside the table */}
            <div className="grid grid-cols-[1fr_120px] md:grid-cols-[1fr_180px] mb-2 px-1">
              <div className="px-5 md:px-6 py-2 flex items-center justify-center gap-2">
                <Image src="/flow-logomark.svg" alt="Flow logomark" width={28} height={28} />
                <Image src="/flow-wordmark.svg" alt="Flow" width={60} height={24} className="mt-px" />
              </div>
              <div className="px-4 py-2 flex items-center justify-center">
                <p className="text-xs tracking-[0.12em] uppercase font-medium text-[#1E1854]/35 text-center">Others</p>
              </div>
            </div>

            {/* Table */}
            <div className="rounded-2xl overflow-hidden border border-[#1E1854]/12 bg-[#F0F1FA]">

              {/* Rows */}
              {rows.map((row, i) => (
                <div
                  key={row.order}
                  className={`grid grid-cols-[1fr_120px] md:grid-cols-[1fr_180px]${i > 0 ? ' border-t border-[#1E1854]/8' : ''}`}
                >
                  {/* Topic + Flow — descriptive text */}
                  <div className="px-5 md:px-6 py-5 flex flex-col gap-1 bg-[#1E1854]/[0.06]">
                    <p className="text-xs tracking-[0.10em] uppercase font-semibold text-[#1E1854]/35">
                      {row.topic?.[0]}
                    </p>
                    <p className="text-sm text-[#1E1854]/80 leading-relaxed">{interpolate(row.feature, meta)}</p>
                  </div>

                  {/* Others — cross + label */}
                  <div className="px-4 py-5 flex flex-col items-center justify-center gap-2 border-l border-[#1E1854]/8">
                    <CrossIcon />
                    {row.othersLabel && (
                      <p className="text-xs text-[#1E1854]/40 leading-snug text-center">{row.othersLabel}</p>
                    )}
                  </div>
                </div>
              ))}

            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
