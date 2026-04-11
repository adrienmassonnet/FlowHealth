import Image from 'next/image';
import { getProducts } from '@/lib/shopify';
import TrackedLink from '@/app/components/TrackedLink';
import HealthBenefits from '@/app/components/HealthBenefits';
import BlogBento from '@/app/components/BlogBento';
import ComparisonTable from '@/app/components/ComparisonTable';
import { TestimonialCarousel } from '@/components/ui/testimonial-carousel';
import MorningRitualCard from '@/app/components/MorningRitualCard';
import {
  getHomepageContent,
  getResultsTimelineSteps,
  getTestimonials,
  getFeaturedIngredients,
  getHealthBenefits,
  getProductMeta,
} from '@/lib/contentful';

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
      <section className="relative overflow-hidden min-h-screen flex items-end">
        {/* Background lifestyle image — sourced from Contentful */}
        <Image
          src={cms.heroImageUrl || '/hero-lifestyle.png'}
          alt="Flow Health — clarity in motion"
          fill
          className="object-cover object-center"
          priority
          sizes="100vw"
        />
        {/* Gradient overlay — preserves legibility while letting the image breathe */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#1E1854]/80 via-[#1E1854]/30 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#1E1854]/60 via-transparent to-transparent" />

        <div className="relative z-10 max-w-[1200px] mx-auto px-6 pb-14 pt-20 md:pb-20 md:pt-24 w-full">
          <div className="max-w-lg space-y-5 md:space-y-7">
            <p className="text-xs tracking-[0.16em] uppercase text-white/50 font-medium">
              {cms.heroTagline}
            </p>
            <h1 className="text-3xl sm:text-4xl md:text-5xl md:text-[4.2rem] font-semibold leading-[1.04] tracking-[-0.03em] text-white">
              {cms.heroHeading}
            </h1>
            <div className="pt-1">
              <TrackedLink
                href="/products/flow"
                clarityEvent="homepage_hero_shop_flow"
                className="inline-flex items-center justify-center rounded-full bg-white text-[#1E1854] text-xs tracking-[0.12em] uppercase font-semibold px-7 py-3.5 md:px-8 md:py-4 hover:opacity-90 transition-opacity duration-500"
              >
                Shop Flow
              </TrackedLink>
            </div>
          </div>
        </div>
      </section>

      {/* Mission + Featured product */}
      {featured && (
        <section className="py-24 bg-white">
          <div className="max-w-[1200px] mx-auto px-6 space-y-12">
            <div className="space-y-3 text-center max-w-[860px] mx-auto">
              <p className="text-xs tracking-[0.16em] uppercase font-semibold text-[#1E1854]/50">
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
                  gradient: 'bg-gradient-to-br from-[#3B38B8] to-[#1E1854]',
                  icon: (
                    <svg width="16" height="16" viewBox="0 0 26 26" fill="none">
                      <path d="M3 13C5 13 6 9 8 9C10 9 11 17 13 17C15 17 16 9 18 9C20 9 21 13 23 13" stroke="white" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  ),
                },
                {
                  title: 'Unlock your full potential',
                  gradient: 'bg-gradient-to-r from-[#1E1854] via-[#3B38B8] to-[#1E1854]',
                  icon: (
                    <svg width="16" height="16" viewBox="0 0 26 26" fill="none">
                      <circle cx="13" cy="13" r="3" stroke="white" strokeWidth="1.6"/>
                      <circle cx="13" cy="13" r="7" stroke="white" strokeWidth="1.6" strokeOpacity="0.5"/>
                      <path d="M13 2V5M13 21V24M2 13H5M21 13H24" stroke="white" strokeWidth="1.6" strokeLinecap="round"/>
                    </svg>
                  ),
                },
                {
                  title: 'Your daily inner peace ritual',
                  gradient: 'bg-gradient-to-tl from-[#3B38B8] to-[#1E1854]',
                  icon: (
                    <svg width="16" height="16" viewBox="0 0 26 26" fill="none">
                      <path d="M5 17C5 13.134 8.686 10 13 10C17.314 10 21 13.134 21 17" stroke="white" strokeWidth="1.6" strokeLinecap="round"/>
                      <path d="M3 17H23" stroke="white" strokeWidth="1.6" strokeLinecap="round"/>
                      <path d="M13 10V7" stroke="white" strokeWidth="1.6" strokeLinecap="round"/>
                      <path d="M7 8.5L8.5 10M19 8.5L17.5 10" stroke="white" strokeWidth="1.6" strokeLinecap="round"/>
                    </svg>
                  ),
                },
              ].map((card) => (
                <div
                  key={card.title}
                  className={`${card.gradient} rounded-2xl px-5 py-4 flex items-center gap-3.5`}
                >
                  <div className="shrink-0 w-8 h-8 rounded-xl bg-white/15 flex items-center justify-center">
                    {card.icon}
                  </div>
                  <p className="text-sm font-semibold text-white leading-snug tracking-[-0.01em]">{card.title}</p>
                </div>
              ))}
            </div>

            <div className="w-full flex flex-col md:flex-row gap-10 md:gap-14 items-stretch">
              {/* Image — portrait ratio, editorial feel */}
              {featuredImage && (
                <div className="md:w-[52%] shrink-0 w-full aspect-[4/3] md:aspect-auto relative">
                  <Image
                    src={featuredImage.url}
                    alt={featuredImage.altText ?? featured.title}
                    fill
                    className="object-contain object-center scale-[0.88]"
                    sizes="(max-width: 768px) 100vw, 52vw"
                  />
                </div>
              )}

              {/* Content */}
              <div className="flex-1 flex flex-col justify-between py-2 gap-5">

                {/* Top: name + tagline */}
                <div className="space-y-1.5">
                  <p className="text-xs tracking-[0.14em] uppercase text-[#1E1854]/35 font-medium">Daily powdered supplement</p>
                  <h3 className="text-2xl md:text-3xl font-semibold tracking-[-0.03em] text-[#1E1854] leading-tight">
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
                  <span className="text-sm font-semibold tracking-[0.02em]">Shop Now →</span>
                </TrackedLink>

              </div>
            </div>
          </div>
        </section>
      )}

      {/* Key Ingredients */}
      <section className="bg-[#F6F5FA]">
        <div className="max-w-[1200px] mx-auto px-6 py-20 flex flex-col md:flex-row gap-12 md:gap-20 items-start">

          {/* Left — header */}
          <div className="md:w-[38%] shrink-0 space-y-5">
            <p className="text-xs tracking-[0.16em] uppercase text-[hsla(var(--color-secondary)/0.5)] font-medium">
              {cms.ingredientsSectionLabel || 'our ingredients'}
            </p>
            <p className="text-2xl md:text-2xl font-semibold tracking-[-0.02em] leading-[1.35] text-[#1E1854]">
              {cms.ingredientsHeading}
            </p>

            {/* Mobile-only ingredient grid */}
            <div className="md:hidden grid grid-cols-2 gap-3">
              {featuredIngredients.map((ing) => (
                <div key={ing.name} className="relative rounded-2xl overflow-hidden aspect-[4/3] shadow-[0_4px_16px_rgba(0,0,0,0.12)]">
                  {ing.imageUrl && (
                    <Image
                      src={ing.imageUrl}
                      alt={ing.name}
                      fill
                      className="object-cover"
                      sizes="50vw"
                    />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
                  <p className="absolute bottom-0 left-0 right-0 px-3 py-2.5 text-xs font-semibold text-white tracking-[-0.01em]">
                    {ing.name}
                  </p>
                </div>
              ))}
            </div>

            <TrackedLink
              href="/pages/ingredients"
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
          <div className="hidden md:block flex-1">
            <div className="grid grid-cols-2 gap-3">
              {featuredIngredients.map((ing) => (
                <div key={ing.name} className="relative rounded-2xl overflow-hidden aspect-[4/3] shadow-[0_4px_16px_rgba(0,0,0,0.12)]">
                  {ing.imageUrl && (
                    <Image
                      src={ing.imageUrl}
                      alt={ing.name}
                      fill
                      className="object-cover"
                      sizes="25vw"
                    />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
                  <p className="absolute bottom-0 left-0 right-0 px-4 py-3 text-sm font-semibold text-white tracking-[-0.01em]">
                    {ing.name}
                  </p>
                </div>
              ))}
            </div>
          </div>

        </div>
      </section>

      <HealthBenefits benefits={healthBenefits} sectionLabel={cms.healthBenefitsSectionLabel} heading={cms.healthBenefitsHeading} />

      {/* Results timeline */}
      <section className="bg-[#F6F5FA]">
        <div className="max-w-[1200px] mx-auto px-6 py-20">
          <div className="mb-10 space-y-4 max-w-2xl">
            <p className="text-xs tracking-[0.16em] uppercase text-[hsla(var(--color-secondary)/0.5)] font-medium">Timeline</p>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold tracking-[-0.02em] leading-tight">{cms.resultsHeading}</h2>
            <p className="text-sm text-[hsla(var(--color-secondary)/0.7)] leading-relaxed">{cms.resultsSubheading}</p>
          </div>
          <div className="bg-white rounded-2xl px-6 md:px-10 py-10 shadow-[0_2px_16px_rgba(30,24,84,0.07)] border border-[#1E1854]/[0.06]">

            {/* Mobile: vertical layout — line runs through pill center */}
            <div className="md:hidden flex flex-col">
              {timelineSteps.map((step, i) => (
                <div key={step.period} className={`relative${i < timelineSteps.length - 1 ? ' pb-8' : ''}`}>
                  {/* Connecting line — starts from pill center, stops at next pill */}
                  {i < timelineSteps.length - 1 && (
                    <div className="absolute left-[16px] top-[14px] bottom-0 w-px bg-[#1E1854]/12" />
                  )}
                  {/* Gradient pill — sits on the line */}
                  <span className="relative inline-flex items-center gap-1.5 text-xs font-medium tracking-[0.06em] uppercase bg-gradient-to-r from-[#3B38B8] to-[#1E1854] text-white px-3 py-1 rounded-full shadow-[0_2px_8px_rgba(59,56,184,0.35)]">
                    <span className="w-1.5 h-1.5 rounded-full bg-white/60 shrink-0" />
                    {step.period}
                  </span>
                  {/* Content */}
                  <div className="mt-3 pl-1">
                    <p className="text-base font-semibold tracking-[-0.01em] mb-2">{step.title}</p>
                    <ul className="space-y-1.5">
                      {step.bullets.split('\n').map((b) => (
                        <li key={b} className="text-sm text-[hsla(var(--color-secondary)/0.75)] flex items-start gap-2">
                          <span className="mt-1.5 w-1 h-1 rounded-full bg-[#1E1854]/20 shrink-0" />
                          {b}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>

            {/* Desktop: 4-column grid — pill is the node, per-column connectors stop before last */}
            <div className="hidden md:block">
              <div className="grid grid-cols-4 gap-8">
                {timelineSteps.map((step, i) => (
                  <div key={step.period} className="relative space-y-4">
                    {/* Connector line — spans full column + gap, starts behind pill, pill bg masks it */}
                    {i < timelineSteps.length - 1 && (
                      <div className="absolute top-[14px] left-0 w-[calc(100%+2rem)] h-px bg-[#1E1854]/12" />
                    )}
                    {/* Gradient pill — sits on the line */}
                    <span className="relative inline-flex items-center gap-1.5 text-xs font-medium tracking-[0.06em] uppercase bg-gradient-to-r from-[#3B38B8] to-[#1E1854] text-white px-3 py-1 rounded-full shadow-[0_2px_8px_rgba(59,56,184,0.35)]">
                      <span className="w-1.5 h-1.5 rounded-full bg-white/60 shrink-0" />
                      {step.period}
                    </span>
                    <div className="space-y-2">
                      <p className="text-base font-semibold tracking-[-0.01em]">{step.title}</p>
                      <ul className="space-y-1.5">
                        {step.bullets.split('\n').map((b) => (
                          <li key={b} className="text-sm text-[hsla(var(--color-secondary)/0.75)] flex items-start gap-2">
                            <span className="mt-1.5 w-1 h-1 rounded-full bg-[#1E1854]/20 shrink-0" />
                            {b}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Venn diagram section */}
      <section className="relative overflow-hidden py-16 md:py-20">
        <Image
          src={cms.vennBackgroundImageUrl || '/venn-bg.png'}
          alt="Flow Health formula"
          fill
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-[#1E1854]/78" />
        <div className="relative z-10 max-w-[1200px] mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 items-center">

          {/* Right: eyebrow + heading — shown first on mobile */}
          <div className="space-y-5 md:hidden">
            <p className="text-xs tracking-[0.16em] uppercase text-white/35 font-medium">The formula</p>
            <h2 className="text-2xl sm:text-3xl font-semibold leading-tight tracking-[-0.03em] text-white">
              {cms.vennHeading}
            </h2>
            <TrackedLink
              href="/pages/our-product"
              clarityEvent="homepage_venn_read_more_product"
              className="inline-flex items-center gap-2 text-xs tracking-[0.08em] uppercase font-medium text-white/45 hover:text-white transition-colors duration-200"
            >
              Read more about our product
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                <path d="M2.5 6H9.5M6.5 3L9.5 6L6.5 9" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </TrackedLink>
          </div>

          {/* Left: Venn SVG — white circles on dark bg, overlaps visible via additive fill */}
          <svg viewBox="0 0 535 510" className="w-full max-w-xs mx-auto md:max-w-full" style={{ fontFamily: 'inherit' }}>
            <circle cx="160" cy="155" r="150" fill="rgba(255,255,255,0.05)" stroke="rgba(255,255,255,0.18)" strokeWidth="1.5" />
            <circle cx="380" cy="155" r="150" fill="rgba(255,255,255,0.05)" stroke="rgba(255,255,255,0.18)" strokeWidth="1.5" />
            <circle cx="270" cy="346" r="150" fill="rgba(255,255,255,0.07)" stroke="rgba(255,255,255,0.18)" strokeWidth="1.5" />

            <text textAnchor="middle" fontSize="30" fontWeight="600" fill="rgba(255,255,255,0.88)" letterSpacing="-0.6">
              <tspan x="115" y="137">A pleasant</tspan>
              <tspan x="115" dy="36">taste</tspan>
            </text>

            <text textAnchor="middle" fontSize="30" fontWeight="600" fill="rgba(255,255,255,0.88)" letterSpacing="-0.6">
              <tspan x="420" y="137">Convenient</tspan>
              <tspan x="420" dy="36">daily packet</tspan>
            </text>

            <text textAnchor="middle" fontSize="30" fontWeight="600" fill="rgba(255,255,255,0.88)" letterSpacing="-0.6">
              <tspan x="270" y="348">One sachet,</tspan>
              <tspan x="270" dy="36">{`${meta.activeIngredients} ingredients`}</tspan>
            </text>
          </svg>

          {/* Right: eyebrow + heading — desktop only (mobile version rendered above) */}
          <div className="hidden md:block space-y-5">
            <p className="text-xs tracking-[0.16em] uppercase text-white/35 font-medium">The formula</p>
            <h2 className="text-3xl md:text-4xl font-semibold leading-tight tracking-[-0.03em] text-white">
              {cms.vennHeading}
            </h2>
            <TrackedLink
              href="/pages/our-product"
              clarityEvent="homepage_formula_read_more_product"
              className="inline-flex items-center gap-2 text-xs tracking-[0.08em] uppercase font-medium text-white/45 hover:text-white transition-colors duration-200"
            >
              Read more about our product
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                <path d="M2.5 6H9.5M6.5 3L9.5 6L6.5 9" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </TrackedLink>
          </div>

        </div>
      </section>

      {/* Mission + Formula Trust */}
      <section className="border-b border-[var(--color-border)]">
        <div className="max-w-[1200px] mx-auto px-6 py-20">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-20 items-center">

            {/* Left — rotating principle cards */}
            <MorningRitualCard />

            {/* Right — header */}
            <div className="space-y-6">
              <p className="text-xs tracking-[0.16em] uppercase text-[hsla(var(--color-secondary)/0.5)] font-medium">Values we hold dear</p>
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
            <p className="text-xs tracking-[0.16em] uppercase text-[#1E1854]/40 font-medium">From the journal</p>
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
          <p className="text-xs tracking-[0.16em] uppercase text-[#1E1854]/30 font-medium text-center mb-14">Testimonials</p>
          <TestimonialCarousel testimonials={testimonials} />
        </div>
      </section>

    </main>
  );
}
