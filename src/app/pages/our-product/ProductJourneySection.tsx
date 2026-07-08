const CHAPTERS = [
  {
    year: '01',
    label: 'Research',
    heading: 'Deep in the science',
    body: 'We scoured hundreds of peer-reviewed trials to identify ingredients with robust, replicated evidence in humans — not animal studies, not in-vitro data.',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2a7 7 0 1 0 0 14 7 7 0 0 0 0-14z" />
        <path d="M12 6v6l4 2" />
        <path d="M2 17l2 2 4-4" />
        <path d="M2 21h4" />
      </svg>
    ),
  },
  {
    year: '02',
    label: 'Formulation',
    heading: 'Built without compromise',
    body: 'Each of the 16 active ingredients is dosed at the exact amount studied in clinical trials. No proprietary blends, no pixie-dusting, no fillers.',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M9 3H5a2 2 0 0 0-2 2v4m6-6h10a2 2 0 0 1 2 2v4M9 3v18m0 0h10a2 2 0 0 0 2-2v-4M9 21H5a2 2 0 0 1-2-2v-4m0 0h18" />
      </svg>
    ),
  },
  {
    year: '03',
    label: 'Bioavailability',
    heading: 'The right form matters',
    body: 'We select the most bioavailable molecular form of each compound — the same form used in the research — so your body can actually absorb what\'s on the label.',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2C6 8 6 14 12 22c6-8 6-14 0-20z" />
        <path d="M12 12v6" />
        <path d="M9 15l3-3 3 3" />
      </svg>
    ),
  },
  {
    year: '04',
    label: 'Manufacturing',
    heading: 'Pharmaceutical-grade production',
    body: 'Flow is produced in a Swiss GMP-certified facility under the same conditions as pharmaceutical drugs. Every batch is tracked, documented, and verified.',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
        <polyline points="9 22 9 12 15 12 15 22" />
      </svg>
    ),
  },
  {
    year: '05',
    label: 'Quality Testing',
    heading: 'Tested before it ships',
    body: 'Independent third-party labs verify the purity and potency of every batch. If it doesn\'t meet spec, it doesn\'t leave the facility.',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M9 11l3 3L22 4" />
        <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" />
      </svg>
    ),
  },
  {
    year: '06',
    label: 'Ready for You',
    heading: 'From lab to your hands',
    body: 'Packed into precision-dosed daily sachets and shipped directly to you. No middle-man, no shelf time — just fresh, traceable product on your schedule.',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
        <circle cx="12" cy="10" r="3" />
      </svg>
    ),
  },
];

export default function ProductJourneySection() {
  return (
    <section className="pt-4 pb-16">
      <div className="max-w-[1200px] mx-auto px-6 pt-4 md:pt-8">

        {/* Header */}
        <div className="mb-10 md:mb-14 space-y-2 max-w-2xl">
          <p className="text-xs tracking-[0.16em] uppercase font-semibold bg-gradient-to-r from-brand to-ink bg-clip-text text-transparent">
            From idea to sachet
          </p>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold tracking-[-0.02em] leading-[1.08]">
            How Flow goes from science to your morning ritual.
          </h2>
          <p className="text-sm text-[rgba(30,24,84,0.6)] leading-[1.6] pt-1">
            Every step in the process was chosen deliberately. Here&rsquo;s the full story.
          </p>
        </div>

        {/* Desktop: horizontal timeline */}
        <div className="hidden md:block">
          {/* Connector line */}
          <div className="relative mb-10">
            <div className="absolute top-5 left-0 right-0 h-px bg-gradient-to-r from-brand/20 via-brand/40 to-ink/20" />
            <div className="flex justify-between relative">
              {CHAPTERS.map((ch) => (
                <div key={ch.year} className="flex flex-col items-center" style={{ width: `${100 / CHAPTERS.length}%` }}>
                  {/* Node */}
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-brand to-ink flex items-center justify-center text-white shadow-[0_0_0_4px_white,0_0_0_5px_rgba(59,56,184,0.2)] z-10">
                    {ch.icon}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Cards */}
          <div className="flex gap-4">
            {CHAPTERS.map((ch, i) => (
              <div
                key={ch.year}
                className="flex-1 rounded-2xl border border-ink/[8.2%] bg-white p-5 shadow-[0_2px_12px_rgba(30,24,84,0.05)] flex flex-col gap-3"
                style={{ opacity: 1 }}
              >
                <div className="flex items-center justify-between">
                  <span className="text-[10px] tracking-[0.18em] uppercase font-semibold text-brand/60">{ch.label}</span>
                  <span className="text-xs font-semibold text-ink/20">{ch.year}</span>
                </div>
                <p className="text-sm font-semibold text-ink leading-snug tracking-[-0.01em]">{ch.heading}</p>
                <p className="text-xs text-[rgba(30,24,84,0.55)] leading-[1.6]">{ch.body}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Mobile: vertical timeline */}
        <div className="md:hidden relative">
          {/* Vertical line */}
          <div className="absolute left-4 top-5 bottom-5 w-px bg-gradient-to-b from-brand/30 via-brand/20 to-ink/10" />

          <div className="flex flex-col gap-8 pl-12">
            {CHAPTERS.map((ch) => (
              <div key={ch.year} className="relative">
                {/* Node */}
                <div className="absolute -left-12 top-0 w-8 h-8 rounded-full bg-gradient-to-br from-brand to-ink flex items-center justify-center text-white shadow-[0_0_0_3px_white,0_0_0_4px_rgba(59,56,184,0.2)]">
                  {ch.icon}
                </div>

                <div className="rounded-2xl border border-ink/[8.2%] bg-white p-5 shadow-[0_2px_12px_rgba(30,24,84,0.05)] flex flex-col gap-2">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] tracking-[0.18em] uppercase font-semibold text-brand">{ch.label}</span>
                    <span className="text-[10px] font-semibold text-ink/25">{ch.year}</span>
                  </div>
                  <p className="text-sm font-semibold text-ink leading-snug">{ch.heading}</p>
                  <p className="text-xs text-[rgba(30,24,84,0.55)] leading-[1.6]">{ch.body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
