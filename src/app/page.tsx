import Image from 'next/image';
import { getProducts } from '@/lib/shopify';
import TrackedLink from '@/app/components/TrackedLink';
import { HeroText, TrustCard } from '@/app/components/HeroAnimated';
import ScrollReveal from '@/app/components/ScrollReveal';
import AnimatedList from '@/app/components/AnimatedList';
import HomepageIngredientsSection from '@/app/components/HomepageIngredientsSection';
import BrainSection from '@/app/components/BrainSection';
import ApproachSection from '@/app/components/ApproachSection';
import BrainHealthSection from '@/app/components/BrainHealthSection';
import DayArcSection from '@/app/components/DayArcSection';
import NeurotransmitterSection from '@/app/components/NeurotransmitterSection';
import InnerVitalitySection from '@/app/components/InnerVitalitySection';
import ValuesStandForSection from '@/app/components/ValuesStandForSection';
import { StepCard } from '@/app/components/StepCard';
import { FAQ } from '@/components/ui/faq-tabs';
import { faqCategories as categories } from '@/lib/content-data';
import {
  getHomepageContent,
  getFeaturedIngredients,
  getProductMeta,
  getFaqItems,
} from '@/lib/content';

export default async function HomePage() {
  const [products, cms, featuredIngredients, meta, faqItems] = await Promise.all([
    getProducts(),
    getHomepageContent(),
    getFeaturedIngredients(),
    getProductMeta(),
    getFaqItems(),
  ]);

  const faqData = faqItems.reduce((acc, item) => {
    if (!acc[item.category]) acc[item.category] = [];
    acc[item.category].push({ question: item.question, answer: item.answer });
    return acc;
  }, {} as Record<string, { question: string; answer: string }[]>);
  const featured = products[0];
  const featuredImage = featured?.images.edges[0]?.node;
  const featuredImageSecondary = featured?.images.edges[1]?.node;


  return (
    <main className="bg-[radial-gradient(ellipse_120%_35%_at_50%_0%,rgba(30,24,84,0.05)_0%,transparent_100%)]">
      {/* Hero */}
      <section className="relative overflow-hidden min-h-[85vh] md:min-h-screen flex items-end">
        {/* Mobile image */}
        <Image
          src="/hero-mobile.png"
          alt="Flow Health: clarity in motion"
          fill
          className="md:hidden object-cover object-center"
          priority
          sizes="100vw"
        />
        {/* Desktop image */}
        <Image
          src={cms.heroImageUrl || '/hero-desktop.png'}
          alt="Flow Health: clarity in motion"
          fill
          className="hidden md:block object-cover object-[center_20%]"
          priority
          sizes="100vw"
        />
        {/* Gradient overlay — only at bottom-left for text legibility */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/30 via-transparent to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent md:from-black/35 md:via-transparent" />

        <div className="relative z-10 flow-container pb-10 pt-20 md:pb-20 md:pt-24 w-full">
          <div className="max-w-lg">
            {/* Eyebrow + headline kept tight as one unit */}
            <HeroText delayPropId="headline1Delay">
              <p className="text-xs tracking-[0.16em] uppercase text-white/80 font-semibold mb-2">{cms.heroTagline}</p>
            </HeroText>
            <HeroText delayPropId="headline2Delay">
              <h1 className="flow-display text-white">{cms.heroHeading}</h1>
            </HeroText>
            <HeroText delayPropId="ctaDelay" className="pt-5 md:pt-6">
              <TrackedLink
                href={featured ? `/products/${featured.handle}` : '/'}
                clarityEvent="homepage_hero_shop_flow"
                className="inline-flex items-center justify-center rounded-full bg-white text-ink text-xs tracking-[0.12em] uppercase font-semibold px-6 py-3 hover:opacity-90 transition-opacity duration-500"
              >
                Get Flow
              </TrackedLink>
            </HeroText>
          </div>
        </div>
      </section>

      {/* Mission + Featured product */}
      {featured && (
        <section className="py-14 md:py-24 bg-white">
          <div className="flow-container space-y-8 md:space-y-12">
            {/* Section header */}
            <div className="text-center max-w-[860px] mx-auto space-y-2">
              <ScrollReveal variant="fade">
                <p className="text-xs tracking-[0.16em] uppercase font-semibold bg-gradient-to-r from-brand to-ink bg-clip-text text-transparent">
                  conceived to remove the noise
                </p>
              </ScrollReveal>
              <ScrollReveal variant="fadeUp" delay={0.06}>
                <h2 className="flow-h2">
                  Flow is made for those whose minds refuse to settle but who seek inner peace.
                </h2>
              </ScrollReveal>
            </div>

            {/* Two-col: images left, content right */}
            <div className="flex flex-col md:flex-row gap-6 md:gap-10 items-start">

              {/* Left: stacked images */}
              {featuredImage && (
                <div className="w-full md:w-[38%] shrink-0 flex flex-col gap-3">
                  <ScrollReveal variant="scale" duration={1.4} className="relative aspect-[4/3] rounded-2xl overflow-hidden">
                    <Image
                      src={featuredImage.url}
                      alt={featuredImage.altText ?? featured.title}
                      fill
                      priority
                      className="object-cover object-center"
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                  </ScrollReveal>
                  {featuredImageSecondary && (
                    <div className="relative aspect-[16/9] rounded-2xl overflow-hidden">
                      <Image
                        src={featuredImageSecondary.url}
                        alt={featuredImageSecondary.altText ?? featured.title}
                        fill
                        className="object-cover"
                        loading="lazy"
                        sizes="(max-width: 768px) 100vw, 50vw"
                      />
                    </div>
                  )}
                </div>
              )}

              {/* Right: description + bullets + cards + CTA */}
              <div className="w-full md:flex-1 flex flex-col gap-6">

                <ScrollReveal variant="fadeUp" delay={0.1}>
                  <p className="text-base text-ink/65" style={{ lineHeight: '1.25' }}>
                    Start each morning with one sachet. Feel sharper, stay steady, and move closer to what matters.
                  </p>
                </ScrollReveal>

                <AnimatedList
                  items={[
                    { label: 'Flavour', value: `${featured.title} flavoured` },
                    { label: 'Content', value: '30 single-dose sachets' },
                    { label: 'Formula', value: `${meta.activeIngredients} clinically-dosed ingredients` },
                    { label: 'Dose', value: `${meta.totalFormulaWeightG} g of active ingredients per sachet` },
                    { label: 'Calories', value: `${meta.caloriesKcal} kcal, no sugar` },
                    { label: 'Energy', value: 'Stimulant-free, no crash' },
                  ]}
                />

                <div className="flex flex-col md:flex-row gap-3 md:items-stretch">
                  {[
                    { label: 'Short term', body: 'Clearer focus, steady energy, and reduced brain fog from the first days.' },
                    { label: 'Medium term', body: 'Better habits, improved mood stability and consistent daily rhythm.' },
                    { label: 'Long term', body: 'Sustained brain cell growth, deeper sleep, and reduced cortisol over time.' },
                  ].map(({ label, body }, i) => (
                    <ScrollReveal key={label} variant="fadeUp" delay={0.08 + i * 0.07} className="flex-1 flex">
                      <StepCard number={i + 1} title={label} description={body} className="w-full" />
                    </ScrollReveal>
                  ))}
                </div>

                <TrackedLink
                  href={`/products/${featured.handle}`}
                  clarityEvent="homepage_product_shop_now"
                  className="btn-cta w-full md:w-auto flex items-center justify-center rounded-full text-white px-8 py-3 md:self-start"
                >
                  <span className="text-xs font-semibold tracking-[0.1em] uppercase">Get Flow</span>
                </TrackedLink>
              </div>

            </div>

          </div>
        </section>
      )}

      <InnerVitalitySection />

      <DayArcSection />

      <NeurotransmitterSection />

      <BrainHealthSection />

      {/* Key Ingredients */}
      <section className="bg-[#F4F4F8] md:rounded-2xl md:mx-8" style={{ backgroundImage: 'radial-gradient(circle, rgba(30,24,84,0.07) 1px, transparent 1px)', backgroundSize: '28px 28px' }}>
        <div className="flow-container py-10 md:py-16 space-y-8">

          {/* Header row */}
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3">
            <div className="space-y-2">
              <ScrollReveal variant="fade">
                <p className="text-xs tracking-[0.16em] uppercase font-semibold bg-gradient-to-r from-brand to-ink bg-clip-text text-transparent">
                  {cms.ingredientsSectionLabel || 'our ingredients'}
                </p>
              </ScrollReveal>
              <ScrollReveal variant="fadeUp" delay={0.06}>
                <h2 className="flow-h2">
                  {cms.ingredientsHeading}
                </h2>
              </ScrollReveal>
            </div>
            <TrackedLink
              href="/pages/our-product"
              clarityEvent="homepage_ingredients_see_all"
              className="self-start inline-flex items-center gap-2 text-xs tracking-[0.08em] uppercase font-semibold text-ink border border-ink/25 rounded-full px-5 py-2.5 min-h-[44px] hover:border-ink hover:bg-ink hover:text-white transition-colors duration-200 shrink-0"
            >
              {`See all ${meta.activeIngredients} ingredients`}
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                <path d="M2.5 6H9.5M6.5 3L9.5 6L6.5 9" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </TrackedLink>
          </div>

          {/* 4-column horizontal grid with modal detail */}
          <HomepageIngredientsSection
            ingredients={featuredIngredients.slice(0, 4)}
            sizes="(max-width: 640px) 50vw, 25vw"
          />

        </div>
      </section>

      <div className="bg-white py-14 md:py-24">
        <ApproachSection />
      </div>

      {/* Values — three pillars */}
      <section className="bg-white border-t border-ink/[0.06]">
        <div className="flow-container py-16 md:py-24">
          <ValuesStandForSection />
        </div>
      </section>

      <BrainSection />

      {/* FAQ */}
      <section className="bg-white py-14 md:py-24">
        <div className="flow-container">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
            <div>
              <p className="text-xs tracking-[0.16em] uppercase font-semibold bg-gradient-to-r from-brand to-ink bg-clip-text text-transparent mb-2">
                Support
              </p>
              <h2 className="flow-h2">
                Frequently asked questions
              </h2>
            </div>
            <TrackedLink
              href="/pages/faq"
              clarityEvent="homepage_view_all_faqs"
              className="shrink-0 inline-flex items-center gap-2 text-xs tracking-[0.08em] uppercase font-medium text-ink/45 hover:text-ink transition-colors duration-200"
            >
              View all FAQs
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                <path d="M2.5 6H9.5M6.5 3L9.5 6L6.5 9" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </TrackedLink>
          </div>
          <FAQ
            title=""
            subtitle=""
            categories={categories}
            faqData={faqData}
          />
        </div>
      </section>

    </main>
  );
}
