const CHAPTERS = [
  {
    year: '01',
    label: 'Research',
    heading: 'Deep in the science',
    body: 'We scoured hundreds of peer-reviewed trials to identify ingredients with robust, replicated evidence in humans, not animal studies, not in-vitro data.',
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
    body: 'We select the most bioavailable molecular form of each compound (the same form used in the research) so your body can actually absorb what\'s on the label.',
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
    body: 'Packed into precision-dosed daily sachets and shipped directly to you. No middle-man, no shelf time, just fresh, traceable product on your schedule.',
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
      <div className="flow-container pt-4 md:pt-8">

        {/* Header */}
        <div className="mb-10 md:mb-14 space-y-2 max-w-2xl">
          <p className="text-xs tracking-[0.16em] uppercase font-semibold bg-gradient-to-r from-brand to-ink bg-clip-text text-transparent">
            From idea to sachet
          </p>
          <h2 className="flow-h2">
            How Flow goes from science to your morning ritual.
          </h2>
          <p className="text-sm text-[rgba(30,24,84,0.6)] leading-[1.6] pt-1">
            Every step in the process was chosen deliberately. Here&rsquo;s the full story.
          </p>
        </div>

        {/* Desktop: cards carry their own icon — the connector rail stole
            width from the copy and added no information */}
        <div className="hidden md:flex gap-4">
          {CHAPTERS.map((ch) => (
            <div
              key={ch.year}
              className="flex-1 rounded-xl border border-ink/[8.2%] bg-white p-5 shadow-[0_2px_12px_rgba(30,24,84,0.05)] flex flex-col gap-3"
            >
              <div className="flex items-center gap-3">
                <span className="shrink-0 w-10 h-10 rounded-full bg-gradient-to-br from-brand to-ink flex items-center justify-center text-white">
                  {ch.icon}
                </span>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <span className="text-micro tracking-[0.18em] uppercase font-semibold text-brand">{ch.label}</span>
                    <span className="text-micro font-semibold text-ink/55 tabular-nums">{ch.year}</span>
                  </div>
                  <p className="flow-h5 leading-snug">{ch.heading}</p>
                </div>
              </div>
              <p className="text-xs text-[rgba(30,24,84,0.72)] leading-[1.6]">{ch.body}</p>
            </div>
          ))}
        </div>

        {/* Mobile: full-width cards, icon inline with the title */}
        <div className="md:hidden flex flex-col gap-4">
          {CHAPTERS.map((ch) => (
            <div key={ch.year} className="rounded-xl border border-ink/[8.2%] bg-white p-5 shadow-[0_2px_12px_rgba(30,24,84,0.05)] flex flex-col gap-3">
              <div className="flex items-center gap-3">
                <span className="shrink-0 w-10 h-10 rounded-full bg-gradient-to-br from-brand to-ink flex items-center justify-center text-white">
                  {ch.icon}
                </span>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <span className="text-micro tracking-[0.18em] uppercase font-semibold text-brand">{ch.label}</span>
                    <span className="text-micro font-semibold text-ink/55 tabular-nums">{ch.year}</span>
                  </div>
                  <p className="flow-h5 leading-snug">{ch.heading}</p>
                </div>
              </div>
              <p className="text-xs text-[rgba(30,24,84,0.72)] leading-[1.6]">{ch.body}</p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
