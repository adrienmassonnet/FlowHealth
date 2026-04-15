import Link from 'next/link';
import { getTestimonials } from '@/lib/content';

// Star icon rendered inline — no extra dependency
function Stars() {
  return (
    <div className="flex items-center gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <svg key={i} width="12" height="12" viewBox="0 0 12 12" fill="none">
          <path
            d="M6 1L7.4 4.3L11 4.7L8.5 7.1L9.2 11L6 9.2L2.8 11L3.5 7.1L1 4.7L4.6 4.3L6 1Z"
            fill="#1E1854"
            fillOpacity="0.75"
          />
        </svg>
      ))}
    </div>
  );
}

const stats = [
  { value: '4.9', label: 'Average rating' },
  { value: '200+', label: 'Verified reviews' },
  { value: '94%', label: 'Would recommend' },
];

export default async function ReviewsPage() {
  const testimonials = await getTestimonials();

  return (
    <main>
      {/* Hero */}
      <section className="bg-white border-b border-[var(--color-border)]">
        <div className="max-w-[1200px] mx-auto px-6 pt-20 pb-20 md:pb-24">
          <div className="max-w-2xl">
            <p className="text-xs tracking-[0.16em] uppercase font-semibold bg-gradient-to-r from-[#3B38B8] to-[#1E1854] bg-clip-text text-transparent mb-4">
              Reviews
            </p>
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-semibold tracking-[-0.03em] leading-[1.0] mb-5">
              What people say<br />about Flow
            </h1>
            <p className="text-sm text-[hsla(var(--color-secondary)/0.75)] leading-[1.7] max-w-md">
              Real experiences from people who made Flow part of their daily routine.
            </p>
          </div>
        </div>
      </section>

      {/* Stats bar */}
      <section className="bg-[#1E18540A] border-b border-[var(--color-border)]">
        <div className="max-w-[1200px] mx-auto px-6 py-10">
          <div className="grid grid-cols-3 gap-3 sm:gap-6 md:gap-0 md:flex md:items-center md:divide-x md:divide-[var(--color-border)]">
            {stats.map((s) => (
              <div key={s.label} className="md:px-10 first:pl-0 last:pr-0 text-center md:text-left">
                <p className="text-2xl md:text-3xl font-semibold tracking-[-0.03em] text-[#1E1854]">{s.value}</p>
                <p className="text-xs text-[hsla(var(--color-secondary)/0.55)] mt-1 tracking-[0.04em]">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Reviews grid */}
      <section className="bg-[#1E185408]">
        <div className="max-w-[1200px] mx-auto px-6 py-16 md:py-20">
          {testimonials.length === 0 ? (
            <p className="text-sm text-[hsla(var(--color-secondary)/0.5)] text-center py-12">
              No reviews yet — check back soon.
            </p>
          ) : (
            <div className="columns-1 sm:columns-2 lg:columns-3 gap-3 sm:gap-5 space-y-3 sm:space-y-5">
              {testimonials.map((t, i) => (
                <div
                  key={i}
                  className="break-inside-avoid bg-white rounded-2xl border border-[var(--color-border)] px-7 py-7 space-y-4"
                >
                  <Stars />
                  <blockquote className="text-sm text-[#1E1854]/80 leading-[1.75] font-medium">
                    &ldquo;{t.quote}&rdquo;
                  </blockquote>
                  <div className="flex items-center gap-3 pt-1">
                    <span className="block w-4 h-px bg-[#1E1854]/15 shrink-0" />
                    <div>
                      <p className="text-xs font-semibold text-[#1E1854] tracking-[-0.01em]">{t.authorName}</p>
                      {t.authorRole && (
                        <p className="text-xs text-[hsla(var(--color-secondary)/0.45)] mt-0.5 tracking-[0.03em]">
                          {t.authorRole}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* CTA */}
      <section className="bg-[#1E1854]">
        <div className="max-w-[1200px] mx-auto px-6 py-16 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div>
            <p className="text-xs tracking-[0.16em] uppercase text-white/40 font-medium mb-3">
              Ready to experience it yourself?
            </p>
            <p className="text-2xl md:text-3xl font-semibold tracking-[-0.02em] text-white max-w-lg leading-snug">
              Join the people who made Flow part of their morning.
            </p>
          </div>
          <Link
            href="/products/flow"
            className="shrink-0 inline-flex items-center gap-2 bg-white text-[#1E1854] text-xs tracking-[0.1em] uppercase font-semibold px-7 py-4 rounded-full hover:bg-[hsla(var(--color-accent)/1)] hover:text-white transition-colors"
          >
            Get Flow
          </Link>
        </div>
      </section>
    </main>
  );
}
