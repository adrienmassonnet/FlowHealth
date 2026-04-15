import Image from 'next/image';

const pillars = [
  {
    title: 'Peer-Reviewed Evidence',
    description: 'Every ingredient is backed by human clinical trials — not animal studies or in-vitro data.',
    icon: (
      <svg width="32" height="32" viewBox="0 0 36 36" fill="none">
        <circle cx="18" cy="18" r="8" stroke="white" strokeWidth="1.5"/>
        <path d="M18 10V10.5M18 25.5V26M10 18H10.5M25.5 18H26M12.4 12.4L12.75 12.75M23.25 23.25L23.6 23.6M12.4 23.6L12.75 23.25M23.25 12.75L23.6 12.4" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
    ),
  },
  {
    title: 'Clinical Dosing',
    description: 'We dose at proven therapeutic levels — no pixie-dusting or proprietary blends hiding underdoses.',
    icon: (
      <svg width="32" height="32" viewBox="0 0 36 36" fill="none">
        <rect x="13" y="5" width="10" height="26" rx="5" stroke="white" strokeWidth="1.5"/>
        <line x1="13" y1="18" x2="23" y2="18" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
        <line x1="16" y1="12" x2="20" y2="12" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
    ),
  },
  {
    title: 'Bioavailable Forms',
    description: 'We select the most bioavailable form of each compound — the exact form used in the clinical research.',
    icon: (
      <svg width="32" height="32" viewBox="0 0 36 36" fill="none">
        <path d="M18 6 C18 6 10 14 10 22 C10 27.5 13.6 31 18 31 C22.4 31 26 27.5 26 22 C26 14 18 6 18 6Z" stroke="white" strokeWidth="1.5" strokeLinejoin="round"/>
        <line x1="18" y1="19" x2="18" y2="31" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
        <line x1="14" y1="23" x2="18" y2="19" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
    ),
  },
  {
    title: 'Swiss GMP Manufacturing',
    description: 'Produced under pharmaceutical-grade Swiss GMP conditions — every batch tested for purity and potency.',
    icon: (
      <svg width="32" height="32" viewBox="0 0 36 36" fill="none">
        <rect x="9" y="5" width="18" height="26" rx="2" stroke="white" strokeWidth="1.5"/>
        <line x1="13" y1="13" x2="23" y2="13" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
        <line x1="13" y1="19" x2="23" y2="19" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
        <line x1="13" y1="25" x2="19" y2="25" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
    ),
  },
];

export default function SelectionProcessSection() {
  return (
    <section className="py-20">

      {/* Mobile: image with cards overlaid at the bottom */}
      <div className="md:hidden mx-4 relative rounded-2xl overflow-hidden" style={{ minHeight: '580px' }}>
        <Image
          src="https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=800&q=80&auto=format&fit=crop"
          alt="Our selection process"
          fill
          className="object-cover object-center"
          sizes="100vw"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/10 to-black/80" />
        <div className="absolute inset-0 flex flex-col justify-between p-5 pb-5">
          <h2 className="text-2xl font-semibold text-white leading-[1.1]">
            Our rigorous ingredient<br />selection process.
          </h2>
          <div
            className="flex gap-3 overflow-x-auto"
            style={{ scrollSnapType: 'x mandatory', WebkitOverflowScrolling: 'touch', scrollbarWidth: 'none' }}
          >
            {pillars.map((p) => (
              <div
                key={p.title}
                className="shrink-0 rounded-xl border border-white/15 p-4 flex flex-col gap-3"
                style={{ scrollSnapAlign: 'start', width: 'calc(85% - 6px)', background: 'rgba(0,0,0,0.4)', backdropFilter: 'blur(12px)', WebkitBackdropFilter: 'blur(12px)' }}
              >
                {p.icon}
                <p className="text-sm font-semibold text-white leading-snug">{p.title}</p>
                <p className="text-xs text-white/70 leading-relaxed">{p.description}</p>
              </div>
            ))}
            <div className="shrink-0 w-1" />
          </div>
        </div>
      </div>

      {/* Desktop: all text visible, no flip */}
      <div className="hidden md:block">
        <div className="max-w-[1200px] mx-auto px-6">
        <div className="relative overflow-hidden h-[680px] rounded-2xl">
          <Image
            src="https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=1400&q=85&auto=format&fit=crop"
            alt="Our selection process"
            fill
            className="object-cover object-center"
            sizes="1200px"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/55 via-black/15 to-black/25" />
          <div className="absolute inset-0 flex flex-col justify-between">
            <div className="max-w-[1200px] mx-auto w-full px-12 pt-16">
              <h2 className="text-4xl font-semibold text-white max-w-xl leading-[1.1] drop-shadow-sm">
                Our rigorous ingredient selection process.
              </h2>
            </div>
            <div className="max-w-[1200px] mx-auto w-full px-12 pb-12">
            <div className="grid grid-cols-4 gap-6 bg-black/40 backdrop-blur-md rounded-2xl p-8">
              {pillars.map((p) => (
                <div key={p.title} className="flex flex-col gap-3">
                  {p.icon}
                  <p className="text-sm font-semibold text-white leading-snug">{p.title}</p>
                  <p className="text-xs text-white/70 leading-relaxed">{p.description}</p>
                </div>
              ))}
            </div>
            </div>
          </div>
        </div>
        </div>
      </div>

    </section>
  );
}
