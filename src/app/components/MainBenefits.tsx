'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { trackEvent } from '@/lib/clarity';
import type { HealthBenefit } from '@/lib/contentful';

export default function MainBenefits({ benefits }: { benefits: HealthBenefit[] }) {
  const [flipped, setFlipped] = useState<string | null>(null);

  return (
    <section className="max-w-[1200px] mx-auto px-6 pt-4 pb-16">
      <div className="mb-8 space-y-1">
        <p className="text-xs tracking-[0.16em] uppercase text-[hsla(var(--color-secondary)/0.5)] font-medium">Why Flow</p>
        <h2 className="text-3xl font-semibold tracking-[-0.02em]">Main benefits</h2>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-12 gap-3">
        {benefits.map((b, i) => {
          const isFlipped = flipped === b.label;
          // 3-2-3 bento: thirds / halves / thirds
          const span = (i >= 3 && i <= 4) ? 'md:col-span-6' : 'md:col-span-4';
          const height = (i >= 3 && i <= 4) ? 'min-h-[340px]' : 'min-h-[280px]';
          return (
            <div
              key={b.label}
              className={`relative cursor-pointer ${span} ${height} [perspective:1000px]`}
              onClick={() => setFlipped(isFlipped ? null : b.label)}
            >
              {/* Flip container */}
              <div
                className={`absolute inset-0 rounded-2xl [transform-style:preserve-3d] transition-[transform] duration-500 ${isFlipped ? '[transform:rotateY(180deg)]' : ''}`}
              >
                {/* Front face */}
                <div className="absolute inset-0 rounded-2xl overflow-hidden [backface-visibility:hidden]">
                  {b.imageUrl && (
                    <Image
                      src={b.imageUrl}
                      alt={b.label}
                      fill
                      className="object-cover brightness-[0.98] saturate-[1.1]"
                      sizes="(max-width: 768px) 100vw, 33vw"
                    />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/15 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-5">
                    <h3 className="text-lg font-semibold text-white leading-snug drop-shadow-sm pr-10">{b.label}</h3>
                  </div>
                  {/* Arrow hint */}
                  <div className="absolute bottom-4 right-4 w-7 h-7 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center shrink-0">
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                      <path d="M2.5 6H9.5M6.5 3L9.5 6L6.5 9" stroke="white" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                  {/* Article icon */}
                  {b.blogSlug && (
                    <Link
                      href={`/pages/blog-posts/${b.blogSlug}`}
                      onClick={(e) => { e.stopPropagation(); trackEvent('homepage_benefit_article_link'); }}
                      className="absolute top-3 right-3 w-7 h-7 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center hover:bg-white/35 transition-colors"
                      title="Read article"
                    >
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                        <polyline points="14 2 14 8 20 8"/>
                        <line x1="16" y1="13" x2="8" y2="13"/>
                        <line x1="16" y1="17" x2="8" y2="17"/>
                        <polyline points="10 9 9 9 8 9"/>
                      </svg>
                    </Link>
                  )}
                </div>

                {/* Back face */}
                <div className="absolute inset-0 rounded-2xl overflow-hidden [backface-visibility:hidden] [transform:rotateY(180deg)] bg-[#1E1854] flex flex-col p-5">
                  <div className="flex items-start justify-between gap-3 shrink-0 mb-3">
                    <h3 className="text-lg font-semibold text-white leading-snug">{b.label}</h3>
                    <div className="w-7 h-7 rounded-full bg-white/10 flex items-center justify-center shrink-0 mt-0.5">
                      <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                        <path d="M2 2L8 8M8 2L2 8" stroke="white" strokeWidth="1.3" strokeLinecap="round"/>
                      </svg>
                    </div>
                  </div>
                  <div className="overflow-y-auto flex-1 space-y-3 pr-1">
                    <p className="text-sm text-white/75 leading-relaxed">{b.description}</p>
                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {b.ingredients.split(',').map((ing) => (
                        <span key={ing.trim()} className="text-xs tracking-[0.04em] text-white/60 bg-white/10 rounded-full px-2.5 py-0.5">
                          {ing.trim()}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
