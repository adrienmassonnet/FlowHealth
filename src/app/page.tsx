import Image from 'next/image';
import { getProducts } from '@/lib/shopify';
import TrackedLink from '@/app/components/TrackedLink';
import { HeroText, TrustCard } from '@/app/components/HeroAnimated';
import HealthBenefits from '@/app/components/HealthBenefits';
import ResultsTimeline from '@/app/components/ResultsTimeline';
import BlogBento from '@/app/components/BlogBento';
import ComparisonTable from '@/app/components/ComparisonTable';
import { TestimonialCarousel } from '@/components/ui/testimonial-carousel';
import MorningRitualCard from '@/app/components/MorningRitualCard';
import ScrollReveal from '@/app/components/ScrollReveal';
import IngredientsGrid from '@/app/components/IngredientsGrid';
import VennCard from '@/app/components/VennCard';
import {
  getHomepageContent,
  getResultsTimelineSteps,
  getTestimonials,
  getFeaturedIngredients,
  getHealthBenefits,
  getProductMeta,
} from '@/lib/content';

export default async function HomePage() {
  const [products, cms, timelineSteps, testimonials, featuredIngredients, healthBenefits, meta] = await Promise.all([
    getProducts(),
    getHomepageContent(),
    getResultsTimelineSteps(),
    getTestimonials(),
    getFeaturedIngredients(),
    getHealthBenefits(),
    getProductMeta(),
  ]);
  const featured = products[0];
  const featuredImage = featured?.images.edges[0]?.node;


  return (
    <main className="bg-[radial-gradient(ellipse_120%_35%_at_50%_0%,rgba(30,24,84,0.05)_0%,transparent_100%)]">
      {/* Hero */}
      <section className="relative overflow-hidden min-h-[70vh] md:min-h-screen flex items-end">
        <Image
          src={cms.heroImageUrl || '/hero-lifestyle.png'}
          alt="Flow Health — clarity in motion"
          fill
          className="object-cover object-[center_20%]"
          priority
          sizes="100vw"
        />
        {/* Gradient overlay — preserves legibility while letting the image breathe */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#1E1854]/55 via-[#1E1854]/15 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#1E1854]/40 via-transparent to-transparent" />

        <div className="relative z-10 max-w-[1200px] mx-auto px-6 pb-14 pt-20 md:pb-20 md:pt-24 w-full">
          <div className="max-w-lg space-y-5 md:space-y-7">
            <HeroText delay={0}>
              <p className="text-xs tracking-[0.16em] uppercase text-white/50 font-medium">{cms.heroTagline}</p>
            </HeroText>
            <HeroText delay={120}>
              <h1 className="text-3xl sm:text-4xl md:text-5xl md:text-[4.2rem] font-semibold leading-[1.04] tracking-[-0.03em] text-white">{cms.heroHeading}</h1>
            </HeroText>
            <HeroText delay={260} className="pt-1">
              <TrackedLink
                href="/products/flow"
                clarityEvent="homepage_hero_shop_flow"
                className="inline-flex items-center justify-center rounded-full bg-white text-[#1E1854] text-xs tracking-[0.12em] uppercase font-semibold px-7 py-3.5 md:px-8 md:py-4 hover:opacity-90 transition-opacity duration-500"
              >
                Get Flow
              </TrackedLink>
            </HeroText>
          </div>
        </div>
      </section>

      {/* Mission + Featured product */}
      {featured && (
        <section className="py-24 bg-white">
          <div className="max-w-[1200px] mx-auto px-6 space-y-12">
            <div className="space-y-3 text-center max-w-[860px] mx-auto">
              <p className="text-xs tracking-[0.16em] uppercase font-semibold bg-gradient-to-r from-[#3B38B8] to-[#1E1854] bg-clip-text text-transparent">
                {cms.missionSubheading || 'on a mission to fight over stimulation'}
              </p>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold leading-[1.2] tracking-[-0.03em] text-[#1E1854]">
                {cms.missionHeading}
              </h2>
            </div>

            {/* Trust strip */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {[
                {
                  title: 'Empowered by stable energy',
                  delay: '100ms',
                  icon: (
                    <svg width="32" height="32" viewBox="0 0 26 26" fill="none">
                      <path d="M3 13C5 13 6 9 8 9C10 9 11 17 13 17C15 17 16 9 18 9C20 9 21 13 23 13" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  ),
                },
                {
                  title: 'Unlock your full potential',
                  delay: '220ms',
                  icon: (
                    <svg width="32" height="32" viewBox="0 0 26 26" fill="none">
                      <circle cx="13" cy="13" r="3" stroke="currentColor" strokeWidth="2.2"/>
                      <circle cx="13" cy="13" r="7" stroke="currentColor" strokeWidth="2.2" strokeOpacity="0.5"/>
                      <path d="M13 2V5M13 21V24M2 13H5M21 13H24" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round"/>
                    </svg>
                  ),
                },
                {
                  title: 'Your daily inner peace ritual',
                  delay: '340ms',
                  icon: (
                    <svg width="32" height="32" viewBox="0 0 26 26" fill="none">
                      <path d="M5 17C5 13.134 8.686 10 13 10C17.314 10 21 13.134 21 17" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round"/>
                      <path d="M3 17H23" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round"/>
                      <path d="M13 10V7" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round"/>
                      <path d="M7 8.5L8.5 10M19 8.5L17.5 10" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round"/>
                    </svg>
                  ),
                },
              ].map((card) => (
                <TrustCard key={card.title} delay={parseInt(card.delay)} className="border border-[#1E1854]/10 rounded-2xl px-6 py-6 flex flex-col gap-4 items-center text-center shadow-[0_2px_20px_rgba(30,24,84,0.07)] bg-white">
                  <div className="text-[#3B38B8]">
                    {card.icon}
                  </div>
                  <p className="text-base font-semibold uppercase tracking-[0.06em] leading-snug bg-gradient-to-r from-[#3B38B8] to-[#1E1854] bg-clip-text text-transparent">{card.title}</p>
                </TrustCard>
              ))}
            </div>

            <div className="w-full flex flex-col md:flex-row gap-10 md:gap-14 items-stretch">

              {/* Mobile-only: title above image */}
              <div className="md:hidden space-y-1.5">
                <p className="text-xs tracking-[0.14em] uppercase text-[#1E1854]/35 font-medium">Daily powdered supplement</p>
                <h3 className="text-2xl font-semibold tracking-[-0.03em] text-[#1E1854] leading-tight">
                  {featured.title}
                </h3>
              </div>

              {/* Image — portrait ratio, editorial feel */}
              {featuredImage && (
                <ScrollReveal variant="scale" duration={1.4} className="md:w-[52%] shrink-0 w-full aspect-[4/3] md:aspect-auto relative">
                  <Image
                    src={featuredImage.url}
                    alt={featuredImage.altText ?? featured.title}
                    fill
                    className="object-contain object-center scale-[0.88]"
                    sizes="(max-width: 768px) 100vw, 52vw"
                  />
                </ScrollReveal>
              )}

              {/* Content */}
              <div className="flex-1 flex flex-col justify-between py-2 gap-5">

                {/* Desktop-only: name + tagline */}
                <div className="hidden md:block space-y-1.5">
                  <p className="text-xs tracking-[0.14em] uppercase text-[#1E1854]/35 font-medium">Daily powdered supplement</p>
                  <h3 className="text-3xl font-semibold tracking-[-0.03em] text-[#1E1854] leading-tight">
                    {featured.title}
                  </h3>
                </div>

                {/* Middle: attribute rows with dividers */}
                <ul className="divide-y divide-[#1E1854]/8 bg-[#1E18540A] rounded-2xl px-4 shadow-[0_1px_6px_rgba(30,24,84,0.06)] border border-[#1E1854]/[0.05]">
                  {[
                    { label: 'Formula', value: `${meta.activeIngredients} clinically-dosed ingredients` },
                    { label: 'Format', value: `${meta.totalFormulaWeightG} g active ingredients in a daily sachet` },
                    { label: 'Calories', value: `${meta.caloriesKcal} kcal per sachet — no sugar` },
                    { label: 'Energy', value: 'Stimulant-free, no crash, no dependency' },
                    { label: 'Testing', value: 'Third-party tested for purity & potency' },
                  ].map(({ label, value }) => (
                    <li key={label} className="flex items-baseline gap-4 py-3">
                      <span className="text-xs tracking-[0.1em] uppercase font-semibold text-[#1E1854]/30 w-16 shrink-0">{label}</span>
                      <span className="text-sm text-[#1E1854]/75 leading-relaxed">{value}</span>
                    </li>
                  ))}
                </ul>

                {/* Bottom: price + CTA combined */}
                <TrackedLink
                  href={`/products/${featured.handle}`}
                  clarityEvent="homepage_product_shop_now"
                  className="btn-cta w-full flex items-center justify-between rounded-full text-white px-6 py-3.5"
                >
                  <div className="flex items-baseline gap-1.5">
                    <span className="text-base font-semibold tracking-[-0.02em]">
                      {parseFloat(featured.priceRange.minVariantPrice.amount).toFixed(2)}
                    </span>
                    <span className="text-xs font-normal text-white/50">{featured.priceRange.minVariantPrice.currencyCode} / month</span>
                  </div>
                  <span className="text-sm font-semibold tracking-[0.02em]">Get Flow</span>
                </TrackedLink>

              </div>
            </div>
          </div>
        </section>
      )}

      {/* Venn diagram section */}
      <section className="py-16 md:py-20">
        <div className="max-w-[1200px] mx-auto px-6">
          <VennCard
            vennBackgroundImageUrl={cms.vennBackgroundImageUrl}
            vennHeading={cms.vennHeading}
            activeIngredients={meta.activeIngredients}
          />
        </div>
      </section>

      <HealthBenefits benefits={healthBenefits} sectionLabel={cms.healthBenefitsSectionLabel} heading={cms.healthBenefitsHeading} />

      {/* Key Ingredients */}
      <section className="bg-[#F6F5FA]">
        <div className="max-w-[1200px] mx-auto px-6 py-20 flex flex-col md:flex-row gap-12 md:gap-20 items-start">

          {/* Left — header */}
          <div className="md:w-[38%] shrink-0 space-y-5">
            <p className="text-xs tracking-[0.16em] uppercase font-semibold bg-gradient-to-r from-[#3B38B8] to-[#1E1854] bg-clip-text text-transparent">
              {cms.ingredientsSectionLabel || 'our ingredients'}
            </p>
            <p className="text-2xl sm:text-3xl md:text-4xl font-semibold tracking-[-0.02em] leading-[1.2] text-[#1E1854]">
              {cms.ingredientsHeading}
            </p>

            {/* Mobile-only ingredient grid */}
            <div className="md:hidden">
              <IngredientsGrid ingredients={featuredIngredients} sizes="50vw" />
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

          {/* Right — ingredient image grid (desktop only) */}
          <div className="hidden md:flex flex-1">
            <IngredientsGrid ingredients={featuredIngredients} sizes="25vw" labelClassName="px-4 py-3 text-sm" />
          </div>

        </div>
      </section>

      {/* Results timeline */}
      <section className="bg-white">
        <div className="max-w-[1200px] mx-auto px-6 py-20">
          <div className="mb-10 space-y-4 max-w-2xl">
            <p className="text-xs tracking-[0.16em] uppercase font-semibold bg-gradient-to-r from-[#3B38B8] to-[#1E1854] bg-clip-text text-transparent">Timeline</p>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold tracking-[-0.02em] leading-tight">{cms.resultsHeading}</h2>
            <p className="text-sm text-[hsla(var(--color-secondary)/0.7)] leading-relaxed">{cms.resultsSubheading}</p>
          </div>
          <ResultsTimeline steps={timelineSteps} />
        </div>
      </section>

      {/* Mission + Formula Trust */}
      <section className="bg-[#F6F5FA] border-b border-[var(--color-border)]">
        <div className="max-w-[1200px] mx-auto px-6 py-20">
          {/* Mobile-only header — shown above the card */}
          <div className="md:hidden space-y-4 mb-8">
            <p className="text-xs tracking-[0.16em] uppercase font-semibold bg-gradient-to-r from-[#3B38B8] to-[#1E1854] bg-clip-text text-transparent">Values we hold dear</p>
            <h2 className="text-2xl font-semibold tracking-[-0.03em] leading-tight text-[#1E1854]">
              Flow is human led and science based.
            </h2>
            <TrackedLink
              href="/pages/our-philosophy"
              clarityEvent="homepage_philosophy_read_more"
              className="inline-flex items-center gap-2 text-xs tracking-[0.08em] uppercase font-medium text-[#1E1854]/45 hover:text-[#1E1854] transition-colors duration-200"
            >
              Read more about our philosophy
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                <path d="M2.5 6H9.5M6.5 3L9.5 6L6.5 9" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </TrackedLink>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-20 items-center">

            {/* Left — rotating principle cards */}
            <MorningRitualCard />

            {/* Right — header (desktop only) */}
            <div className="hidden md:block space-y-6">
              <p className="text-xs tracking-[0.16em] uppercase font-semibold bg-gradient-to-r from-[#3B38B8] to-[#1E1854] bg-clip-text text-transparent">Values we hold dear</p>
              <h2 className="text-3xl md:text-4xl font-semibold tracking-[-0.03em] leading-tight text-[#1E1854]">
                Flow is human led and science based.
              </h2>
              <TrackedLink
                href="/pages/our-philosophy"
                clarityEvent="homepage_philosophy_read_more"
                className="inline-flex items-center gap-2 text-xs tracking-[0.08em] uppercase font-medium text-[#1E1854]/45 hover:text-[#1E1854] transition-colors duration-200"
              >
                Read more about our philosophy
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                  <path d="M2.5 6H9.5M6.5 3L9.5 6L6.5 9" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </TrackedLink>
            </div>

          </div>
        </div>
      </section>



      <ComparisonTable />

      {/* Blog bento */}
      <section className="max-w-[1200px] mx-auto px-6 py-16">

        {/* Header */}
        <div className="flex items-end justify-between mb-8">
          <div className="space-y-1.5">
            <p className="text-xs tracking-[0.16em] uppercase font-semibold bg-gradient-to-r from-[#3B38B8] to-[#1E1854] bg-clip-text text-transparent">From the journal</p>
            <h2 className="text-2xl sm:text-3xl font-semibold tracking-[-0.02em] text-[#1E1854]">Latest articles</h2>
          </div>
          <TrackedLink
            href="/pages/blog"
            clarityEvent="homepage_blog_read_all"
            className="hidden sm:inline-flex items-center gap-2 text-xs tracking-[0.08em] uppercase font-medium text-[#1E1854]/45 hover:text-[#1E1854] transition-colors duration-200"
          >
            All articles
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M2.5 6H9.5M6.5 3L9.5 6L6.5 9" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/></svg>
          </TrackedLink>
        </div>

        <BlogBento />
      </section>

      {/* Testimonial */}
      <section className="py-20 border-t border-[var(--color-border)] bg-[#F6F5FA]">
        <div className="max-w-[1200px] mx-auto px-6">
          <p className="text-xs tracking-[0.16em] uppercase font-semibold bg-gradient-to-r from-[#3B38B8] to-[#1E1854] bg-clip-text text-transparent text-center mb-14">Testimonials</p>
          <TestimonialCarousel testimonials={testimonials} />
        </div>
      </section>

    </main>
  );
}
