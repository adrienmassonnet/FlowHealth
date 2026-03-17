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
    others: 'Rarely cited',
  },
  {
    feature: 'Swiss-made, third-party tested for purity & safety',
    others: 'Rarely disclosed',
  },
];

function CheckIcon() {
  return (
    <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-white/20">
      <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
        <path d="M3 6.5L5.5 9L10 4" stroke="white" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    </span>
  );
}

function CrossIcon() {
  return (
    <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-white/[0.06]">
      <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
        <path d="M2 2L8 8M8 2L2 8" stroke="white" strokeOpacity="0.25" strokeWidth="1.4" strokeLinecap="round"/>
      </svg>
    </span>
  );
}

export default function ComparisonTable() {
  return (
    <section className="bg-white border-y border-[var(--color-border)]">
      <div className="max-w-[1200px] mx-auto px-6 py-20">

        {/* Header */}
        <div className="mb-12 space-y-4 max-w-xl">
          <p className="text-xs tracking-[0.16em] uppercase text-[hsla(var(--color-secondary)/0.5)] font-medium">Why Flow</p>
          <h2 className="text-3xl md:text-4xl font-semibold tracking-[-0.02em] leading-tight text-[#1E1854]">
            How Flow compares
          </h2>
        </div>

        {/* Table */}
        <div className="rounded-2xl overflow-hidden border border-[#1E1854]/20 bg-[#1E1854]">

          {/* Column headers */}
          <div className="grid grid-cols-[1fr_140px_260px]">
            <div className="px-6 py-4 border-b border-white/10">
              <p className="text-[11px] tracking-[0.12em] uppercase font-medium text-white/30"></p>
            </div>
            <div className="px-4 py-4 text-center border-b border-l border-white/10 bg-white/10">
              <p className="text-[11px] tracking-[0.12em] uppercase font-semibold text-white">Flow</p>
            </div>
            <div className="px-4 py-4 text-center border-b border-l border-white/10">
              <p className="text-[11px] tracking-[0.12em] uppercase font-medium text-white/60">Others</p>
            </div>
          </div>

          {/* Rows */}
          {rows.map((row, i) => (
            <div
              key={row.feature}
              className={`grid grid-cols-[1fr_140px_260px]${i > 0 ? ' border-t border-white/10' : ''}`}
            >
              <div className="px-6 py-5 flex items-center">
                <p className="text-sm text-white/80 leading-relaxed">{row.feature}</p>
              </div>
              <div className="px-4 py-5 flex items-center justify-center border-l border-white/10 bg-white/10">
                <CheckIcon />
              </div>
              <div className="px-4 py-5 flex flex-col items-center justify-center gap-2 border-l border-white/10">
                <CrossIcon />
                <p className="text-xs text-white/60 text-center leading-snug">{row.others}</p>
              </div>
            </div>
          ))}

        </div>
      </div>
    </section>
  );
}
