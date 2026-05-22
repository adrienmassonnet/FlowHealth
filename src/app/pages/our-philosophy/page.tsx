import type { Metadata } from 'next';
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
import PhilosophyScroll from './PhilosophyScroll';
import PrinciplesAccordion from './PrinciplesAccordion';

export default async function OurPhilosophyPage() {
  const [principles, beliefs, cms, meta] = await Promise.all([getPhilosophyPrinciples(), getPhilosophyBeliefs(), getHomepageContent(), getProductMeta()]);
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
            <div className="space-y-3">
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

    </main>
  );
}