const rows = [
  {
    feature: 'Clinically-studied formula with 8 active ingredients at full doses',
    others: 'Underdosed or proprietary blends',
  },
  {
    feature: 'One formula replaces 4–6 separate supplements',
    others: 'Multiple products required',
  },
  {
    feature: 'Ready-to-drink — no pills, no mixing, no measuring',
    others: 'Multiple capsules or powders spread across the day',
  },
  {
    feature: 'Each ingredient backed by peer-reviewed research',
    others: 'Rare',
  },
  {
    feature: 'Swiss-made, third-party tested for purity & safety',
    others: 'Rarely disclosed',
  },
];

export default function ComparisonTable() {
  return (
    <section className="bg-[#1A1A18] py-20">
      <div className="max-w-[1360px] mx-auto px-6">
        <div className="flex flex-col md:flex-row gap-10 md:gap-16 items-start">

          {/* Left: heading */}
          <div className="md:w-[28%] shrink-0 space-y-2 md:text-right md:pt-[52px]">
            <p className="text-xs tracking-[0.14em] uppercase text-white/40 font-medium">Why Flow</p>
            <h2 className="text-3xl font-semibold tracking-[-0.02em] text-white leading-tight">
              How Flow<br />compares:
            </h2>
          </div>

          {/* Right: table */}
          <div className="flex-1 min-w-0">
            {/* Column headers */}
            <div className="grid grid-cols-[1fr_100px_120px] md:grid-cols-[1fr_140px_160px]">
              <div />
              <div className="bg-[hsla(var(--color-accent)/0.15)] rounded-t-xl px-4 py-3 text-center">
                <p className="text-xs tracking-[0.1em] uppercase font-semibold text-[hsla(var(--color-accent)/1)]">Flow</p>
              </div>
              <div className="px-4 py-3 text-center">
                <p className="text-xs tracking-[0.1em] uppercase font-semibold text-white/35">Others</p>
              </div>
            </div>

            {/* Rows */}
            {rows.map((row, i) => (
              <div
                key={row.feature}
                className="grid grid-cols-[1fr_100px_120px] md:grid-cols-[1fr_140px_160px] border-t border-white/10"
              >
                <div className="py-5 pr-6">
                  <p className="text-sm text-white/70 leading-relaxed tracking-[0.01em]">{row.feature}</p>
                </div>
                <div className={`bg-[hsla(var(--color-accent)/0.1)] px-4 py-5 flex items-center justify-center${i === rows.length - 1 ? ' rounded-b-xl' : ''}`}>
                  <div className="w-3 h-3 rounded-full bg-[hsla(var(--color-accent)/1)]" />
                </div>
                <div className="px-4 py-5 flex items-center justify-center">
                  <p className="text-xs text-white/35 text-center leading-snug">{row.others}</p>
                </div>
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}
