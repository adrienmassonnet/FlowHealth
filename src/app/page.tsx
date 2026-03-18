import Link from 'next/link';
import Image from 'next/image';
import { getProducts } from '@/lib/shopify';
import HealthBenefits from '@/app/components/HealthBenefits';
import ComparisonTable from '@/app/components/ComparisonTable';
import { FocusRail, type FocusRailItem } from '@/components/ui/focus-rail';
import { TestimonialCarousel } from '@/components/ui/testimonial-carousel';
import {
  getHomepageContent,
  getResultsTimelineSteps,
  getTestimonials,
  getFeaturedIngredients,
  getHealthBenefits,
} from '@/lib/contentful';

export default async function HomePage() {
  const [products, cms, timelineSteps, testimonials, featuredIngredients, healthBenefits] = await Promise.all([
    getProducts(),
    getHomepageContent(),
    getResultsTimelineSteps(),
    getTestimonials(),
    getFeaturedIngredients(),
    getHealthBenefits(),
  ]);
  const featured = products[0];
  const featuredImage = featured?.images.edges[0]?.node;

  const blogPosts: { title: string; href: string; img: string | null; alt: string }[] = [
    {
      title: 'Deep Work in 2026: How to Protect Your Focus in a Distracted World',
      href: '/pages/blog-posts/deep-work',
      img: 'https://images.unsplash.com/photo-1552196563-55cd4e45efb3?w=600&q=80&auto=format&fit=crop',
      alt: 'Deep Work',
    },
    {
      title: 'Why L-Theanine + Caffeine Is the Most Studied Nootropic Stack',
      href: '/pages/blog-posts/caffeine-theanine',
      img: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=600&q=80&auto=format&fit=crop',
      alt: 'L-Theanine and Caffeine',
    },
    {
      title: 'Building a Morning Ritual That Actually Sticks',
      href: '/pages/blog-posts/morning-ritual',
      img: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=600&q=80&auto=format&fit=crop',
      alt: 'Morning Ritual',
    },
    {
      title: 'Nootropics Explained: What They Are and How They Actually Work',
      href: '/pages/blog-posts/nootropics-explained',
      img: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=600&q=80&auto=format&fit=crop',
      alt: 'Nootropics',
    },
    {
      title: "Lion's Mane and Neuroplasticity: What the Research Says",
      href: '/pages/blog-posts/lions-mane-brain',
      img: 'https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=600&q=80&auto=format&fit=crop',
      alt: "Lion's Mane",
    },
  ];

  return (
    <main>
      {/* Hero */}
      <section className="relative overflow-hidden min-h-[90vh] flex items-end">
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

        <div className="relative z-10 max-w-[1200px] mx-auto px-6 pb-14 pt-20 md:pb-20 md:pt-28 w-full">
          <div className="max-w-lg space-y-5 md:space-y-7">
            <p className="text-[11px] tracking-[0.16em] uppercase text-white/50 font-medium">
              {cms.heroTagline}
            </p>
            <h1 className="text-3xl sm:text-4xl md:text-5xl md:text-[4.2rem] font-semibold leading-[1.04] tracking-[-0.03em] text-white">
              {cms.heroHeading}
            </h1>
            <div className="pt-1">
              <Link
                href="/products/flow"
                className="inline-flex items-center justify-center rounded-full bg-white text-[#1E1854] text-[11px] tracking-[0.12em] uppercase font-semibold px-7 py-3.5 md:px-8 md:py-4 hover:opacity-90 transition-opacity duration-500"
              >
                Shop Flow
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Mission + Featured product */}
      {featured && (
        <section className="py-24" style={{ background: 'linear-gradient(180deg, #1E185414 0%, #1E18540A 100%)' }}>
          <div className="max-w-[1200px] mx-auto px-6 space-y-12">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold leading-[1.2] tracking-[-0.03em] text-[#1E1854] max-w-[860px] mx-auto text-center">
              {cms.missionHeading}
            </h2>
            <div className="max-w-[860px] mx-auto w-full bg-[#1E1854] rounded-3xl overflow-hidden flex flex-col md:flex-row md:min-h-[420px]">
              {/* Image */}
              <div className="md:w-[40%] shrink-0 aspect-square md:aspect-auto flex self-stretch pl-5 pt-5 pr-0 pb-5 md:pl-10 md:pt-10 md:pb-10">
                {featuredImage && (
                  <div className="relative w-full h-full">
                    <Image
                      src={featuredImage.url}
                      alt={featuredImage.altText ?? featured.title}
                      fill
                      className="object-cover object-center"
                      sizes="(max-width: 768px) 100vw, 40vw"
                    />
                  </div>
                )}
              </div>
              {/* Content */}
              <div className="flex flex-col p-8 pt-10 md:px-10 md:py-10">
                <div className="space-y-3">
                  <h3 className="text-xl md:text-2xl font-semibold tracking-[-0.02em] text-white leading-snug">
                    {featured.title}
                  </h3>
                  <p className="text-sm text-white/60 leading-relaxed">
                    Promotes homeostasis, fights over-stimulation, and supports peak cognitive performance — naturally.
                  </p>
                </div>
                <div className="mt-auto pt-7 space-y-4">
                  <p className="text-2xl font-semibold text-white tracking-[-0.02em]">
                    {parseFloat(featured.priceRange.minVariantPrice.amount).toFixed(2)}{' '}
                    <span className="text-base font-normal text-white/50">{featured.priceRange.minVariantPrice.currencyCode}</span>
                  </p>
                  <div className="flex flex-col sm:flex-row gap-3">
                    <Link
                      href={`/products/${featured.handle}`}
                      className="flex-1 text-center rounded-full border border-white/20 text-white text-sm font-medium px-6 py-3 hover:bg-[#1E185408]/10 transition-colors"
                    >
                      Learn More
                    </Link>
                    <Link
                      href={`/products/${featured.handle}`}
                      className="flex-1 text-center rounded-full bg-white text-[#1E1854] text-sm font-semibold px-6 py-3 hover:bg-white/90 transition-colors"
                    >
                      Shop Now
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}




      {/* Mission + Formula Trust */}
      <section className="bg-white border-y border-[var(--color-border)]">
        <div className="max-w-[1200px] mx-auto px-6 py-20 space-y-10">

          {/* Header */}
          <div className="space-y-5 max-w-xl">
            <p className="text-xs tracking-[0.16em] uppercase text-[hsla(var(--color-secondary)/0.5)] font-medium">our philosophy</p>
            <p className="text-2xl md:text-[1.7rem] font-semibold tracking-[-0.02em] leading-[1.35] text-[#1E1854]">
              For those whose mind never settles, and who seeks inner peace.
            </p>
            <Link
              href="/pages/our-philosophy"
              className="inline-flex items-center gap-2 text-xs tracking-[0.08em] uppercase font-medium text-[#1E1854]/45 hover:text-[#1E1854] transition-colors duration-200"
            >
              Read more about our philosophy
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                <path d="M2.5 6H9.5M6.5 3L9.5 6L6.5 9" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </Link>
          </div>

          {/* 3 benefit cards — horizontal row */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {[
              {
                title: 'Empowered by stable energy',
                description: 'Flow gently restores harmony – delivering steady, calm energy that keeps distractions, fatigue, and overwhelm at bay.',
                icon: (
                  <svg width="26" height="26" viewBox="0 0 26 26" fill="none">
                    <path d="M3 13C5 13 6 9 8 9C10 9 11 17 13 17C15 17 16 9 18 9C20 9 21 13 23 13" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                ),
              },
              {
                title: 'Unlock your full potential',
                description: 'Flow\'s ingredients help you tap into deep focus, effortless creativity, and crystal-clear thinking – so you can perform at your peak every day.',
                icon: (
                  <svg width="26" height="26" viewBox="0 0 26 26" fill="none">
                    <circle cx="13" cy="13" r="3" stroke="currentColor" strokeWidth="1.4"/>
                    <circle cx="13" cy="13" r="7" stroke="currentColor" strokeWidth="1.4" strokeOpacity="0.35"/>
                    <path d="M13 2V5M13 21V24M2 13H5M21 13H24" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
                  </svg>
                ),
              },
              {
                title: 'Your daily inner peace ritual',
                description: 'Begin each day with purpose and power. Flow sets the stage for a productive, fulfilling day.',
                icon: (
                  <svg width="26" height="26" viewBox="0 0 26 26" fill="none">
                    <path d="M5 17C5 13.134 8.686 10 13 10C17.314 10 21 13.134 21 17" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
                    <path d="M3 17H23" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
                    <path d="M13 10V7" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
                    <path d="M7 8.5L8.5 10M19 8.5L17.5 10" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
                  </svg>
                ),
              },
            ].map((card) => (
              <div
                key={card.title}
                className="bg-[#1E18540A] rounded-2xl border border-[var(--color-border)] px-5 py-7 flex flex-col gap-4"
              >
                <span className="text-[#1E1854]/45">{card.icon}</span>
                <div className="space-y-2">
                  <p className="text-sm font-semibold text-[#1E1854] leading-snug tracking-[-0.01em]">{card.title}</p>
                  <p className="text-xs text-[#1E1854]/55 leading-relaxed">{card.description}</p>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      <div className="bg-[#1E185410]"><HealthBenefits benefits={healthBenefits} sectionLabel={cms.healthBenefitsSectionLabel} heading={cms.healthBenefitsHeading} /></div>

      {/* Results timeline */}
      <section className="bg-[#F7F4EF]">
        <div className="max-w-[1200px] mx-auto px-6 py-20">
          <div className="mb-10 space-y-4 max-w-2xl">
            <p className="text-xs tracking-[0.16em] uppercase text-[hsla(var(--color-secondary)/0.5)] font-medium">Timeline</p>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold tracking-[-0.02em] leading-tight">{cms.resultsHeading}</h2>
            <p className="text-sm text-[hsla(var(--color-secondary)/0.7)] leading-relaxed">{cms.resultsSubheading}</p>
          </div>
          <div className="bg-[#1E18540D] rounded-2xl px-6 md:px-10 py-10">
            <div className="relative">
              <div className="hidden md:block absolute top-[4px] left-[4px] right-0 h-px bg-[#1E1854]/12" />
              <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                {timelineSteps.map((step) => (
                  <div key={step.period} className="relative">
                    <div className="w-[10px] h-[10px] rounded-full bg-[hsla(var(--color-accent)/1)] shadow-[0_0_0_3px_hsla(var(--color-accent)/0.18)] mb-6" />
                    <div className="space-y-2.5">
                      <span className="inline-block text-xs font-medium tracking-[0.06em] uppercase bg-[#1E1854]/[0.08] text-[#1E1854]/55 px-3 py-1 rounded-full">{step.period}</span>
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
            <Link
              href="/products/flow"
              className="inline-flex items-center gap-2 text-xs tracking-[0.08em] uppercase font-medium text-white/45 hover:text-white transition-colors duration-200"
            >
              Read more about our product
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                <path d="M2.5 6H9.5M6.5 3L9.5 6L6.5 9" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </Link>
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
              <tspan x="270" dy="36">13 ingredients</tspan>
            </text>
          </svg>

          {/* Right: eyebrow + heading — desktop only (mobile version rendered above) */}
          <div className="hidden md:block space-y-5">
            <p className="text-xs tracking-[0.16em] uppercase text-white/35 font-medium">The formula</p>
            <h2 className="text-3xl md:text-4xl font-semibold leading-tight tracking-[-0.03em] text-white">
              {cms.vennHeading}
            </h2>
            <Link
              href="/products/flow"
              className="inline-flex items-center gap-2 text-xs tracking-[0.08em] uppercase font-medium text-white/45 hover:text-white transition-colors duration-200"
            >
              Read more about our product
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                <path d="M2.5 6H9.5M6.5 3L9.5 6L6.5 9" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </Link>
          </div>

        </div>
      </section>



      {/* Key Ingredients */}
      <section className="bg-[#1E18540A] border-b border-[var(--color-border)]">
        <div className="max-w-[1200px] mx-auto px-6 py-20 flex flex-col md:flex-row gap-12 md:gap-20 items-start">

          {/* Left — header */}
          <div className="md:w-[38%] shrink-0 space-y-5 md:sticky md:top-24">
            <p className="text-xs tracking-[0.16em] uppercase text-[hsla(var(--color-secondary)/0.5)] font-medium">
              {cms.ingredientsSectionLabel || 'our ingredients'}
            </p>
            <p className="text-2xl md:text-[1.7rem] font-semibold tracking-[-0.02em] leading-[1.35] text-[#1E1854]">
              {cms.ingredientsHeading}
            </p>
            <Link
              href="/pages/ingredients"
              className="inline-flex items-center gap-2 text-xs tracking-[0.08em] uppercase font-medium text-[#1E1854]/45 hover:text-[#1E1854] transition-colors duration-200"
            >
              See all 13 ingredients
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                <path d="M2.5 6H9.5M6.5 3L9.5 6L6.5 9" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </Link>
          </div>

          {/* Right — ingredient image grid */}
          <div className="flex-1">
            <div className="grid grid-cols-2 gap-3">
              {featuredIngredients.map((ing) => (
                <div key={ing.name} className="relative rounded-2xl overflow-hidden aspect-[4/3]">
                  {ing.imageUrl && (
                    <Image
                      src={ing.imageUrl}
                      alt={ing.name}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 50vw, 25vw"
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

      <ComparisonTable />

      <FocusRail
        loop
        heading="Latest Articles"
        items={blogPosts.map((p): FocusRailItem => ({
          id: p.href,
          title: p.title,
          meta: 'Article',
          href: p.href,
          imageSrc: p.img ?? 'https://images.unsplash.com/photo-1542744094-3a31f272c490?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=600&q=80',
        }))}
      />

      {/* Testimonial */}
      <section className="bg-[#1E1854] py-20">
        <div className="max-w-[1200px] mx-auto px-6">
          <p className="text-[11px] tracking-[0.16em] uppercase text-white/30 font-medium text-center mb-14">Testimonials</p>
          <TestimonialCarousel testimonials={testimonials} />
        </div>
      </section>

    </main>
  );
}
