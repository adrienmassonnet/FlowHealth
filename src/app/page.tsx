import Image from 'next/image';
import { getProducts } from '@/lib/shopify';
import TrackedLink from '@/app/components/TrackedLink';
import { HeroText, TrustCard } from '@/app/components/HeroAnimated';
import ScrollReveal from '@/app/components/ScrollReveal';
import IngredientsGrid from '@/app/components/IngredientsGrid';
import BrainSection from '@/app/components/BrainSection';
import ApproachSection from '@/app/components/ApproachSection';
import BrainHealthSection from '@/app/components/BrainHealthSection';
import DayArcSection from '@/app/components/DayArcSection';
import NeurotransmitterSection from '@/app/components/NeurotransmitterSection';
import InnerVitalitySection from '@/app/components/InnerVitalitySection';
import {
  getHomepageContent,
  getFeaturedIngredients,
  getProductMeta,
} from '@/lib/content';

export default async function HomePage() {
  const [products, cms, featuredIngredients, meta] = await Promise.all([
    getProducts(),
    getHomepageContent(),
    getFeaturedIngredients(),
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
        <section className="py-14 md:py-24 bg-white">
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

                <p className="text-base text-[#1E1854]/65" style={{ lineHeight: '1.25' }}>
                  Start each morning with one sachet. Feel sharper, stay steady, and move closer to what matters.
                </p>

                <ul className="space-y-2">
                  {[
                    { label: 'Flavour', value: `${featured.title} flavoured` },
                    { label: 'Content', value: '30 single-dose sachets' },
                    { label: 'Formula', value: `${meta.activeIngredients} clinically-dosed ingredients` },
                    { label: 'Dose', value: `${meta.totalFormulaWeightG} g of active ingredients per sachet` },
                    { label: 'Calories', value: `${meta.caloriesKcal} kcal — no sugar` },
                    { label: 'Energy', value: 'Stimulant-free, no crash' },
                  ].map(({ label, value }) => (
                    <li key={label} className="flex items-center gap-2 text-sm">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#1E1854]/25 shrink-0" />
                      <span className="text-[#1E1854]/75">{value}</span>
                    </li>
                  ))}
                </ul>

                <div className="flex flex-col md:flex-row gap-2">
                  {[
                    { label: 'Short term', body: 'Clearer focus, steady energy, and reduced brain fog from the first days.' },
                    { label: 'Medium term', body: 'Better habits, improved mood stability and consistent daily rhythm.' },
                    { label: 'Long term', body: 'Sustained brain cell growth, deeper sleep, and reduced cortisol over time.' },
                  ].map(({ label, body }) => (
                    <div key={label} className="rounded-xl border border-[#1E1854]/[0.07] bg-[#1E18540A] px-3 py-3 flex flex-col gap-1.5">
                      <p className="text-sm font-semibold tracking-[-0.01em] text-[#1E1854] m-0">{label}</p>
                      <p className="text-sm leading-[1.5] m-0" style={{ color: 'rgba(30,24,84,0.55)' }}>{body}</p>
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

      <InnerVitalitySection />

      <DayArcSection />

      <NeurotransmitterSection />

      <BrainHealthSection />

      {/* Key Ingredients */}
      <section className="bg-[#F4F4F8] md:rounded-[2rem] md:mx-8" style={{ backgroundImage: 'radial-gradient(circle, rgba(30,24,84,0.07) 1px, transparent 1px)', backgroundSize: '28px 28px' }}>
        <div className="max-w-[1200px] mx-auto px-6 py-10 md:py-16">
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

      <div className="bg-white py-14 md:py-24">
        <ApproachSection />
      </div>

      <BrainSection />

    </main>
  );
}
