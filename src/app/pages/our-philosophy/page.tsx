import type { Metadata } from 'next';
import { getPhilosophyPrinciples, getPhilosophyBeliefs, getHomepageContent, getProductMeta } from '@/lib/content';
import VennCard from '@/app/components/VennCard';

export const metadata: Metadata = {
  title: 'Our Philosophy',
  description: 'Flow is built on one belief: cognitive performance should be earned through science, not marketing. Read the principles that guide every formulation decision we make.',
  openGraph: {
    title: 'Our Philosophy: The Principles Behind Flow',
    description: 'Flow is built on one belief: cognitive performance should be earned through science, not marketing. Read the principles that guide every formulation decision we make.',
  },
};
import PhilosophyScroll from './PhilosophyScroll';
import PrinciplesAccordion from './PrinciplesAccordion';
import { StepCard } from '@/app/components/StepCard';
import MorningRitualCard from '@/app/components/MorningRitualCard';
import PeacefulApproachSection from '@/app/components/PeacefulApproachSection';

export default async function OurPhilosophyPage() {
  const [principles, beliefs, cms, meta] = await Promise.all([getPhilosophyPrinciples(), getPhilosophyBeliefs(), getHomepageContent(), getProductMeta()]);
  return (
    <main className="bg-white">

      {/* Hero */}
      <section className="bg-white pt-28 md:pt-36 pb-14 md:pb-20">
        <div className="flow-container">
          <p className="text-xs tracking-[0.16em] uppercase text-ink/40 font-medium mb-5">About Flow</p>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-semibold tracking-[-0.03em] text-ink leading-tight max-w-3xl mb-6">
            Built for minds that refuse to settle.
          </h1>
          <p className="text-sm text-[rgba(30,24,84,0.65)] max-w-lg leading-relaxed">
            Flow started with a personal frustration: scattered focus, overstimulation, and a supplement market full of noise. We decided to build something better.
          </p>
        </div>
      </section>

      {/* Scroll-driven pillars */}
      <PhilosophyScroll />

      {/* A more peaceful approach */}
      <PeacefulApproachSection />

      {/* Venn diagram section */}
      <section className="py-16 md:py-20 border-t border-ink/[0.06]">
        <div className="flow-container">
          <VennCard
            vennBackgroundImageUrl={cms.vennBackgroundImageUrl}
            vennHeading={cms.vennHeading}
            activeIngredients={meta.activeIngredients}
          />
        </div>
      </section>

      {/* Values — rotating principle cards */}
      <section className="bg-white border-t border-ink/[0.06]">
        <div className="flow-container py-16 md:py-24">
          {/* Section header above the card */}
          <div className="max-w-2xl space-y-3 mb-8 md:mb-10">
            <p className="text-xs tracking-[0.16em] uppercase font-semibold bg-gradient-to-r from-brand to-ink bg-clip-text text-transparent">Values we hold dear</p>
            <h2 className="text-3xl md:text-4xl font-semibold tracking-[-0.03em] leading-tight text-ink">
              Flow is human led and science based.
            </h2>
          </div>
          <div className="max-w-md mx-auto md:mx-0">
            <MorningRitualCard />
          </div>
        </div>
      </section>

      {/* What we believe — each glass card emits its own brand-blue + coral
          light (see StepCard glass variant); the section stays neutral */}
      <section className="bg-[#FBFBFE]">
        <div className="flow-container py-16 md:py-24">
          <div className="grid grid-cols-1 md:grid-cols-[1fr_2fr] gap-10 md:gap-16 items-start">
            <div className="space-y-3">
              <p className="text-xs tracking-[0.16em] uppercase font-semibold bg-gradient-to-r from-brand to-ink bg-clip-text text-transparent">What We Believe</p>
              <h2 className="text-3xl md:text-4xl font-semibold tracking-[-0.02em] leading-tight">
                Conviction,<br />not aspiration.
              </h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {beliefs.filter((_, i) => i !== 3).map((b, i) => {
                // Prefer the explicit Header / Description fields; fall back to
                // splitting the legacy combined `text` for un-migrated entries.
                let header = b.header?.trim();
                let description = b.description?.trim();
                if (!header) {
                  const normalized = (b.text ?? '').replace(/ — /g, '. ').replace(/^(.)/, (c) => c.toUpperCase());
                  const firstPeriodIdx = normalized.indexOf('. ');
                  header = firstPeriodIdx > -1 ? normalized.slice(0, firstPeriodIdx + 1) : normalized;
                  if (!description) description = firstPeriodIdx > -1 ? normalized.slice(firstPeriodIdx + 2) : '';
                }
                return (
                  <StepCard
                    key={b.header || b.text || i}
                    number={i + 1}
                    title={header}
                    description={description || undefined}
                  />
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Core principles */}
      <section className="bg-white">
        <div className="flow-container py-16 md:py-24">
          <div className="mb-6 space-y-2">
            <p className="text-xs tracking-[0.16em] uppercase font-semibold bg-gradient-to-r from-brand to-ink bg-clip-text text-transparent">Non-Negotiables</p>
            <h2 className="text-3xl md:text-4xl font-semibold tracking-[-0.02em]">Our six principles.</h2>
          </div>
          <PrinciplesAccordion principles={principles} />
        </div>
      </section>

    </main>
  );
}