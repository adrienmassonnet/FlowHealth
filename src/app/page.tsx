import Image from 'next/image';
import { getProducts } from '@/lib/shopify';
import TrackedLink from '@/app/components/TrackedLink';
import { HeroText, TrustCard } from '@/app/components/HeroAnimated';
import HealthBenefits from '@/app/components/HealthBenefits';
import ScrollReveal from '@/app/components/ScrollReveal';
import IngredientsGrid from '@/app/components/IngredientsGrid';
import BrainSection from '@/app/components/BrainSection';
import ApproachSection from '@/app/components/ApproachSection';
import BrainHealthSection from '@/app/components/BrainHealthSection';
import DayArcSection from '@/app/components/DayArcSection';
import NeurotransmitterSection from '@/app/components/NeurotransmitterSection';
import {
  getHomepageContent,
  getFeaturedIngredients,
  getHealthBenefits,
  getProductMeta,
} from '@/lib/content';

export default async function HomePage() {
  const [products, cms, featuredIngredients, healthBenefits, meta] = await Promise.all([
    getProducts(),
    getHomepageContent(),
    getFeaturedIngredients(),
    getHealthBenefits(),
    getProductMeta(),
  ]);
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
          alt="Flow Health — clarity in motion"
          fill
          className="md:hidden object-cover object-center"
          priority
          sizes="100vw"
        />
        {/* Desktop image */}
        <Image
          src={cms.heroImageUrl || '/hero-desktop.png'}
          alt="Flow Health — clarity in motion"
          fill
          className="hidden md:block object-cover object-[center_20%]"
          priority
          sizes="100vw"
        />
        {/* Gradient overlay — only at bottom-left for text legibility */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/30 via-transparent to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent md:from-black/35 md:via-transparent" />

        <div className="relative z-10 max-w-[1200px] mx-auto px-6 pb-10 pt-20 md:pb-20 md:pt-24 w-full">
          <div className="max-w-lg space-y-4 md:space-y-7">
            <HeroText delay={0}>
              <p className="text-xs tracking-[0.16em] uppercase text-white/50 font-medium">{cms.heroTagline}</p>
            </HeroText>
            <HeroText delay={120}>
              <h1 className="text-2xl sm:text-4xl md:text-5xl md:text-[4.2rem] font-semibold leading-[1.08] tracking-[-0.03em] text-white">{cms.heroHeading}</h1>
            </HeroText>
            <HeroText delay={260} className="pt-1 w-full">
              <TrackedLink
                href="/products/rooibos-hibiscus-pomegranate"
                clarityEvent="homepage_hero_shop_flow"
                className="flex md:inline-flex items-center justify-center rounded-full bg-white text-[#1E1854] text-xs tracking-[0.12em] uppercase font-semibold px-7 py-4 md:px-8 md:py-4 hover:opacity-90 transition-opacity duration-500"
              >
                Get Flow
              </TrackedLink>
            </HeroText>
          </div>
        </div>
      </section>

      {/* Mission + Featured product */}
      {featured && (
        <section className="pt-12 pb-8 md:pt-24 md:pb-12 bg-white">
          <div className="max-w-[1200px] mx-auto px-6 space-y-8 md:space-y-12">
            {/* Section header */}
            <div className="text-center max-w-[860px] mx-auto">
              <p className="text-xs tracking-[0.16em] uppercase font-semibold bg-gradient-to-r from-[#3B38B8] to-[#1E1854] bg-clip-text text-transparent mb-2">
                conceived to remove the noise
              </p>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold leading-[1.08] tracking-[-0.03em] text-[#1E1854]">
                Flow is made for those whose minds refuse to settle but who seek inner peace.
              </h2>
            </div>

            {/* Images row — full width */}
            {featuredImage && (
              <div className="flex gap-4 w-full">
                <ScrollReveal variant="scale" duration={1.4} className="flex-1 aspect-[4/3] relative rounded-2xl overflow-hidden">
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
                  <div className="flex-1 aspect-[4/3] rounded-2xl overflow-hidden bg-[#2D2B6E]">
                    <Image
                      src={featuredImageSecondary.url}
                      alt={featuredImageSecondary.altText ?? featured.title}
                      width={800}
                      height={600}
                      className="w-full h-full object-cover block"
                      loading="lazy"
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                  </div>
                )}
              </div>
            )}

            {/* Bottom row: single column */}
            <div className="flex flex-col gap-6">

              {/* Descriptive text */}
              <p className="text-base text-[#1E1854]/65" style={{ lineHeight: '1.25' }}>
                Flow is more than a product — it's an investment in yourself, and a step closer to your goals.<br />
                One sachet dissolved in 400–500 ml of water, every morning, to sharpen focus, reduce stress, and support long-term brain health.
              </p>

              {/* Spec table */}
              <ul className="w-full rounded-2xl overflow-hidden border border-[#1E1854]/[0.07] divide-y divide-[#1E1854]/[0.07]">
                {[
                  { label: 'Flavour', value: featured.title },
                  { label: 'Content', value: '30 single-dose sachets' },
                  { label: 'Formula', value: `${meta.activeIngredients} clinically-dosed ingredients` },
                  { label: 'Dose', value: `${meta.totalFormulaWeightG} g actives per sachet` },
                  { label: 'Calories', value: `${meta.caloriesKcal} kcal — no sugar` },
                  { label: 'Energy', value: 'Stimulant-free, no crash' },
                ].map(({ label, value }) => (
                  <li key={label} className="flex items-center gap-4 px-4 py-3 bg-[#1E18540A]">
                    <span className="text-xs font-semibold uppercase tracking-[0.08em] text-[#1E1854]/40 w-16 shrink-0">{label}</span>
                    <span className="text-sm text-[#1E1854]/80 leading-snug">{value}</span>
                  </li>
                ))}
              </ul>

              {/* CTA column */}
              <div className="w-full flex flex-col gap-6">

                {/* Timeline cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
                  {[
                    { period: 'Days 1–7', label: 'Short term', body: 'Clearer focus, steady energy, and reduced brain fog from the first days.' },
                    { period: 'Weeks 2–4', label: 'Medium term', body: 'Better habits, improved mood stability and consistent daily rhythm.' },
                    { period: 'Month 3+', label: 'Long term', body: 'Sustained brain cell growth, deeper sleep, and reduced cortisol over time.' },
                  ].map(({ period, label, body }) => (
                    <div key={label} className="rounded-xl border border-[#1E1854]/[0.07] bg-[#1E18540A] px-3 py-3 flex flex-col gap-1.5">
                      <span className="block text-sm font-semibold tracking-[-0.01em] text-[#1E1854]">{label}</span>
                      <span className="block text-xs leading-[1.5]" style={{ color: 'rgba(30,24,84,0.55)' }}>{body}</span>
                    </div>
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

      <HealthBenefits benefits={healthBenefits} sectionLabel={cms.healthBenefitsSectionLabel} heading={cms.healthBenefitsHeading} />

      <NeurotransmitterSection />

      <DayArcSection />

      <BrainHealthSection />

      <BrainSection />

      {/* Key Ingredients */}
      <section className="bg-[#F4F4F8] md:rounded-[2rem] md:mx-8" style={{ backgroundImage: 'radial-gradient(circle, rgba(30,24,84,0.07) 1px, transparent 1px)', backgroundSize: '28px 28px' }}>
        <div className="max-w-[1200px] mx-auto px-6 py-14 md:py-24">
          <div className="flex flex-col md:flex-row gap-6 md:gap-16 items-start">

            {/* Left — header + CTA */}
            <div className="md:w-[44%] shrink-0 flex flex-col gap-6 md:pt-2">
              <div className="space-y-2">
                <p className="text-xs tracking-[0.16em] uppercase font-semibold bg-gradient-to-r from-[#3B38B8] to-[#1E1854] bg-clip-text text-transparent">
                  {cms.ingredientsSectionLabel || 'our ingredients'}
                </p>
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold tracking-[-0.02em] leading-[1.08] text-[#1E1854]">
                  {cms.ingredientsHeading}
                </h2>
              </div>
              <TrackedLink
                href="/pages/our-product"
                clarityEvent="homepage_ingredients_see_all"
                className="inline-flex items-center gap-2 text-xs tracking-[0.08em] uppercase font-medium text-[#1E1854]/45 hover:text-[#1E1854] transition-colors duration-200"
              >
                {`See all ${meta.activeIngredients} ingredients`}
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                  <path d="M2.5 6H9.5M6.5 3L9.5 6L6.5 9" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </TrackedLink>
            </div>

            {/* Right — 2×2 ingredient grid */}
            <div className="flex-1">
              <IngredientsGrid
                ingredients={featuredIngredients.slice(0, 4)}
                sizes="(max-width: 768px) 50vw, 33vw"
                labelClassName="px-3 py-2.5 text-xs md:px-4 md:py-3 md:text-sm"
                gridClassName="grid-cols-2"
              />
            </div>

          </div>
        </div>
      </section>

      <ApproachSection />



    </main>
  );
}
