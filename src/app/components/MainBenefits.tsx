'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { trackEvent } from '@/lib/clarity';
import type { HealthBenefit } from '@/lib/content';

export default function MainBenefits({ benefits }: { benefits: HealthBenefit[] }) {
  const [active, setActive] = useState<string | null>(null);

  return (
    <section className="max-w-[1200px] mx-auto px-6 pt-4 pb-16">
      <div className="mb-8 space-y-1">
        <p className="text-xs tracking-[0.16em] uppercase font-semibold bg-gradient-to-r from-[#3B38B8] to-[#1E1854] bg-clip-text text-transparent">Why Flow</p>
        <h2 className="text-3xl font-semibold tracking-[-0.02em]">Main benefits</h2>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {benefits.map((b) => {
          const isActive = active === b.label;
          return (
            <div
              key={b.label}
              className="relative rounded-2xl overflow-hidden cursor-pointer group h-[240px] md:h-[290px] bg-[#1E1854]"
              onMouseEnter={() => setActive(b.label)}
              onMouseLeave={() => setActive(null)}
              onClick={() => setActive(isActive ? null : b.label)}
            >
              {/* Image */}
              {b.imageUrl ? (
                <Image
                  src={b.imageUrl}
                  alt={b.imageAlt || b.label}
                  fill
                  className="object-cover object-center transition-transform duration-700 ease-[cubic-bezier(0.25,0.1,0.1,1)] group-hover:scale-[1.04]"
                  sizes="(max-width: 768px) 50vw, 25vw"
                />
              ) : (
                <div className="absolute inset-0 bg-gradient-to-br from-[#1E1854] to-[#2d2a7a]" />
              )}

              {/* Persistent dark gradient at bottom — only covers bottom third for readability */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />

              {/* Hover tint overlay */}
              <div
                className="absolute inset-0 bg-[#1E1854]/85 transition-opacity duration-400 ease-out"
                style={{ opacity: isActive ? 1 : 0 }}
              />

              {/* Default label — fades out on hover */}
              <div
                className="absolute bottom-0 left-0 right-0 p-4 transition-opacity duration-200"
                style={{ opacity: isActive ? 0 : 1 }}
              >
                <h3 className="text-sm font-semibold text-white leading-snug drop-shadow-[0_1px_4px_rgba(0,0,0,0.6)]">{b.label}</h3>
              </div>

              {/* Hover content — fades in */}
              <div
                className="absolute inset-0 p-4 flex flex-col justify-end transition-opacity duration-300"
                style={{ opacity: isActive ? 1 : 0 }}
              >
                {b.blogSlug && (
                  <Link
                    href={`/pages/blog-posts/${b.blogSlug}`}
                    onClick={(e) => { e.stopPropagation(); trackEvent('homepage_benefit_article_link'); }}
                    className="absolute top-4 right-4 w-6 h-6 rounded-full bg-white/15 flex items-center justify-center hover:bg-white/30 transition-colors"
                    title="Read article"
                  >
                    <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                      <polyline points="14 2 14 8 20 8"/>
                      <line x1="16" y1="13" x2="8" y2="13"/>
                      <line x1="16" y1="17" x2="8" y2="17"/>
                    </svg>
                  </Link>
                )}
                <h3 className="text-sm font-semibold text-white leading-snug mb-2">{b.label}</h3>
                <p className="text-xs text-white/80 leading-relaxed">{b.description}</p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
