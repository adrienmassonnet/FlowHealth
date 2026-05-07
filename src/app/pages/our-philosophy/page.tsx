import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { getPhilosophyPrinciples, getPhilosophyBeliefs, getHomepageContent, getProductMeta } from '@/lib/content';
import VennCard from '@/app/components/VennCard';

export const metadata: Metadata = {
  title: 'Our Philosophy',
  description: 'Flow is built on one belief: cognitive performance should be earned through science, not marketing. Read the principles that guide every formulation decision we make.',
  openGraph: {
    title: 'Our Philosophy — The Principles Behind Flow',
    description: 'Flow is built on one belief: cognitive performance should be earned through science, not marketing. Read the principles that guide every formulation decision we make.',
  },
};
import { getProduct } from '@/lib/shopify';
import PhilosophyScroll from './PhilosophyScroll';
import PrinciplesAccordion from './PrinciplesAccordion';

export default async function OurPhilosophyPage() {
  const [principles, beliefs, product, cms, meta] = await Promise.all([getPhilosophyPrinciples(), getPhilosophyBeliefs(), getProduct('flow'), getHomepageContent(), getProductMeta()]);
  const productImageUrl = product?.images?.edges?.[0]?.node?.url;
  return (
    <main className="bg-white">

      {/* Hero */}
      <section className="bg-white pt-28 md:pt-36 pb-14 md:pb-20">
        <div className="max-w-[1200px] mx-auto px-6">
          <p className="text-xs tracking-[0.16em] uppercase text-[#1E1854]/40 font-medium mb-5">About Flow</p>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-semibold tracking-[-0.03em] text-[#1E1854] leading-tight max-w-3xl mb-6">
            Built for minds that refuse to settle.
          </h1>
          <p className="text-sm text-[hsla(var(--color-secondary)/0.65)] max-w-lg leading-relaxed">
            Flow started with a personal frustration — scattered focus, overstimulation, and a supplement market full of noise. We decided to build something better.
          </p>
        </div>
      </section>

      {/* Scroll-driven pillars */}
      <PhilosophyScroll />

      {/* Venn diagram section */}
      <section className="py-16 md:py-20 border-t border-[#1E1854]/[0.06]">
        <div className="max-w-[1200px] mx-auto px-6">
          <VennCard
            vennBackgroundImageUrl={cms.vennBackgroundImageUrl}
            vennHeading={cms.vennHeading}
            activeIngredients={meta.activeIngredients}
          />
        </div>
      </section>

      {/* What we believe */}
      <section className="bg-white">
        <div className="max-w-[1200px] mx-auto px-6 py-16 md:py-24">
          <div className="grid grid-cols-1 md:grid-cols-[1fr_2fr] gap-10 md:gap-16 items-start">
            <div className="md:sticky md:top-28 space-y-3">
              <p className="text-xs tracking-[0.16em] uppercase font-semibold bg-gradient-to-r from-[#3B38B8] to-[#1E1854] bg-clip-text text-transparent">What We Believe</p>
              <h2 className="text-3xl md:text-4xl font-semibold tracking-[-0.02em] leading-tight">
                Conviction,<br />not aspiration.
              </h2>
            </div>
            <div className="grid grid-cols-2 gap-2">
              {beliefs.filter((_, i) => i !== 3).map((b, i) => {
                const normalized = b.text.replace(/ — /g, '. ').replace(/^(.)/, (c) => c.toUpperCase());
                const firstPeriodIdx = normalized.indexOf('. ');
                const firstSentence = firstPeriodIdx > -1 ? normalized.slice(0, firstPeriodIdx + 1) : normalized;
                const rest = firstPeriodIdx > -1 ? normalized.slice(firstPeriodIdx + 2) : '';
                return (
                  <div key={b.text.slice(0, 40)} className="group rounded-xl border border-[#1E1854]/[0.07] bg-white shadow-sm shadow-[#1E1854]/[0.04] hover:shadow-md hover:shadow-[#1E1854]/[0.07] hover:-translate-y-0.5 transition-all duration-500 p-4 flex items-start gap-3">
                    <span className="shrink-0 mt-0.5 w-9 h-9 rounded-full bg-gradient-to-br from-[#1E1854] to-[#2d2a7a] flex items-center justify-center text-xs font-semibold text-white/60 tabular-nums">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <div className="pt-0.5">
                      <p className="text-sm font-semibold bg-gradient-to-r from-[#3B38B8] to-[#1E1854] bg-clip-text text-transparent leading-snug">{firstSentence}</p>
                      {rest && <p className="mt-1.5 text-xs text-[hsla(var(--color-secondary)/0.60)] leading-relaxed">{rest}</p>}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Core principles */}
      <section className="bg-white">
        <div className="max-w-[1200px] mx-auto px-6 py-16 md:py-24">
          <div className="mb-12 space-y-2">
            <p className="text-xs tracking-[0.16em] uppercase font-semibold bg-gradient-to-r from-[#3B38B8] to-[#1E1854] bg-clip-text text-transparent">Non-Negotiables</p>
            <h2 className="text-3xl md:text-4xl font-semibold tracking-[-0.02em]">Our six principles.</h2>
          </div>
          <PrinciplesAccordion principles={principles} />
        </div>
      </section>

      {/* Nav links */}
      <section className="max-w-[1200px] mx-auto px-6 py-20">
        <div className="space-y-5">
          <h2 className="text-2xl font-semibold tracking-[-0.02em]">Continue your research</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Get Flow CTA card */}
            <div className="relative rounded-2xl overflow-hidden h-[320px] flex flex-col justify-end p-7 gap-4">
              <Image src={productImageUrl || '/hero-lifestyle.png'} alt="Flow product" fill className="object-cover" sizes="(max-width: 768px) 100vw, 33vw" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#1E1854]/85 via-[#1E1854]/30 to-transparent" />
              <div className="relative z-10 flex flex-col gap-4">
                <h3 className="text-lg font-semibold tracking-[-0.02em] text-white leading-snug">
                  Every ingredient above, in one daily formula.
                </h3>
                <Link href="/products/flow" className="self-start inline-flex items-center justify-center bg-white text-[#1E1854] text-xs tracking-[0.1em] uppercase font-semibold px-5 py-3 rounded-full hover:bg-[hsla(var(--color-accent)/1)] hover:text-white transition-colors">
                  Get Flow
                </Link>
              </div>
            </div>

            {/* Nav link cards */}
            {[
              { label: 'Our Product', description: 'Inside the formula — every ingredient and why it matters.', href: '/pages/our-product', image: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=700&q=80&auto=format&fit=crop' },
            ].map((card) => (
              <Link key={card.label} href={card.href} className="group relative rounded-2xl overflow-hidden h-[320px] flex items-end">
                <Image src={card.image} alt={card.label} fill className="object-cover transition-transform duration-500 group-hover:scale-105" sizes="(max-width: 768px) 100vw, 33vw" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/45 to-black/10" />
                <div className="relative z-10 p-7 space-y-1">
                  <h3 className="text-lg font-semibold text-white">{card.label}</h3>
                  <p className="text-xs text-white/80 leading-snug">{card.description}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

    </main>
  );
}