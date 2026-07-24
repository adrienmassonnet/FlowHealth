import type { Metadata } from 'next';
import Link from 'next/link';
import { getTestimonials } from '@/lib/content';
import { getFirstProductHandle } from '@/lib/shopify';

export const metadata: Metadata = {
  title: 'Reviews',
  description: 'See what Flow customers say. Over 200 verified reviews: 4.9 average rating, 94% would recommend.',
};

// Star icon rendered inline — no extra dependency
function Stars() {
  return (
    <div className="flex items-center gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <svg key={i} width="12" height="12" viewBox="0 0 12 12" fill="none">
          <path
            d="M6 1L7.4 4.3L11 4.7L8.5 7.1L9.2 11L6 9.2L2.8 11L3.5 7.1L1 4.7L4.6 4.3L6 1Z"
            fill="var(--color-ink)"
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
  const [testimonials, productHandle] = await Promise.all([
    getTestimonials(),
    getFirstProductHandle(),
  ]);

  return (
    <main>
      {/* Hero */}
      <section className="bg-white border-b border-ink/[12.5%]">
        <div className="flow-container pt-12 pb-10 md:pt-20 md:pb-24">
          <div className="max-w-2xl">
            <p className="text-xs tracking-[0.16em] uppercase font-semibold bg-gradient-to-r from-brand to-ink bg-clip-text text-transparent mb-4">
              Reviews
            </p>
            <h1 className="flow-h1 flow-h1--hero mb-3 md:mb-5">
              What people say<br />about Flow
            </h1>
            <p className="text-sm text-[rgba(30,24,84,0.75)] leading-[1.7] max-w-md">
              Real experiences from people who made Flow part of their daily routine.
            </p>
          </div>
        </div>
      </section>

      {/* Stats bar */}
      <section className="bg-ink/[3.9%] border-b border-ink/[12.5%]">
        <div className="flow-container py-5 md:py-10">
          <div className="grid grid-cols-3 gap-3 sm:gap-6 md:gap-0 md:flex md:items-center md:divide-x md:divide-ink/[12.5%]">
            {stats.map((s) => (
              <div key={s.label} className="md:px-10 first:pl-0 last:pr-0 text-center md:text-left">
                <p className="flow-h3">{s.value}</p>
                <p className="text-xs text-[rgba(30,24,84,0.55)] mt-1 tracking-[0.04em]">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Reviews grid */}
      <section className="bg-ink/[3.1%]">
        <div className="flow-container py-8 md:px-6 md:py-20">
          {testimonials.length === 0 ? (
            <p className="text-sm text-[rgba(30,24,84,0.5)] text-center py-12">
              No reviews yet, check back soon.
            </p>
          ) : (
            <div className="columns-1 sm:columns-2 lg:columns-3 gap-3 sm:gap-5 space-y-3 sm:space-y-5">
              {testimonials.map((t, i) => (
                <div
                  key={i}
                  className="break-inside-avoid bg-white rounded-2xl border border-ink/[12.5%] px-5 py-5 space-y-3 md:px-7 md:py-7 md:space-y-4"
                >
                  <Stars />
                  <blockquote className="text-sm text-ink/75 leading-[1.75] font-medium">
                    &ldquo;{t.quote}&rdquo;
                  </blockquote>
                  <div className="flex items-center gap-3 pt-1">
                    <span className="block w-4 h-px bg-ink/15 shrink-0" />
                    <div>
                      <p className="text-xs font-semibold text-ink tracking-[-0.01em]">{t.authorName}</p>
                      {t.authorRole && (
                        <p className="text-xs text-[rgba(30,24,84,0.45)] mt-0.5 tracking-[0.03em]">
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
      <section className="bg-ink">
        <div className="flow-container py-16 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div>
            <p className="text-xs tracking-[0.16em] uppercase text-white/40 font-medium mb-3">
              Ready to experience it yourself?
            </p>
            <p className="flow-h3 text-white max-w-lg">
              Join the people who made Flow part of their morning.
            </p>
          </div>
          <Link
            href={`/products/${productHandle ?? 'flow'}`}
            className="shrink-0 inline-flex items-center gap-2 bg-white text-ink flow-label px-7 py-4 rounded-full hover:bg-[rgb(30,24,84)] hover:text-white transition-colors"
          >
            Get Flow
          </Link>
        </div>
      </section>
    </main>
  );
}
