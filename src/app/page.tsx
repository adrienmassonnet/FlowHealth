import Link from 'next/link';
import Image from 'next/image';
import { getProducts } from '@/lib/shopify';
import HealthBenefits from '@/app/components/HealthBenefits';
import ComparisonTable from '@/app/components/ComparisonTable';
import { FocusRail, type FocusRailItem } from '@/components/ui/focus-rail';
import {
  getHomepageContent,
  getHomepageFeatureCards,
  getResultsTimelineSteps,
  getTestimonials,
} from '@/lib/contentful';

export default async function HomePage() {
  const [products, cms, featureCards, timelineSteps, testimonials] = await Promise.all([
    getProducts(),
    getHomepageContent(),
    getHomepageFeatureCards(),
    getResultsTimelineSteps(),
    getTestimonials(),
  ]);
  const featured = products[0];
  const featuredImage = featured?.images.edges[0]?.node;
  const testimonial = testimonials[0];

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
      <section
        className="relative overflow-hidden min-h-[80vh] flex items-end"
        style={{ background: 'linear-gradient(160deg, #E8E3DA 0%, #F7F4EF 100%)' }}
      >
        <div className="max-w-[1360px] mx-auto px-6 pb-20 pt-28 w-full grid grid-cols-1 md:grid-cols-2 gap-16 items-end">
          <div className="space-y-7">
            <p className="text-[11px] tracking-[0.18em] uppercase text-[hsla(var(--color-secondary)/0.55)] font-medium">
              {cms.heroTagline}
            </p>
            <h1 className="text-5xl md:text-[4.2rem] font-semibold leading-[1.04] tracking-[-0.03em] text-[#1A1A18]">
              {cms.heroHeading}
            </h1>
            <div className="pt-1">
              <Link
                href="/products/flow"
                className="inline-flex items-center justify-center rounded-full bg-[#1A1A18] text-white text-[11px] tracking-[0.12em] uppercase font-semibold px-8 py-4 hover:opacity-80 transition-opacity duration-500"
              >
                Shop Flow
              </Link>
            </div>
          </div>

          {featuredImage && (
            <div className="relative aspect-square max-w-sm mx-auto md:mx-0 md:ml-auto">
              <Image
                src={featuredImage.url}
                alt={featuredImage.altText ?? featured?.title ?? ''}
                fill
                className="object-contain drop-shadow-2xl"
                priority
              />
            </div>
          )}
        </div>
      </section>

      {/* Mission statement — mountain backdrop */}
      <section className="relative w-full overflow-hidden">
        <Image
          src="https://www.swisskern.com/cdn/shop/files/swiss_mountains_appenzell_home_close.png?v=1715348239&width=1400"
          alt="Swiss mountains"
          fill
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-[#F7F4EF]/60" />
        <div className="relative z-10 w-full max-w-[860px] mx-auto px-6 pt-28 pb-20 text-center">
          <h2 className="text-4xl md:text-5xl font-semibold leading-[1.2] tracking-[-0.03em] text-[#1A1A18]">
            {cms.missionHeading}
          </h2>
        </div>
        <div className="relative z-10 w-full max-w-[1360px] mx-auto px-6 pb-24">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {featureCards.map((card) => (
              <div key={card.title} className="group relative rounded-2xl overflow-hidden min-h-[400px] flex flex-col justify-end">
                <Image
                  src={card.imageUrl}
                  alt={card.imageAlt || card.title}
                  fill
                  className="object-cover transition-transform duration-[900ms] ease-out group-hover:scale-[1.04]"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent transition-all duration-700" />
                <div className="relative z-10 p-7 space-y-2">
                  <h3 className="text-xl font-semibold text-white leading-snug tracking-[-0.01em]">{card.title}</h3>
                  <p className="text-sm text-white/65 leading-relaxed">{card.body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured product card */}
      {featured && (
        <section className="py-24" style={{ background: 'linear-gradient(180deg, #E8E3DA 0%, #F7F4EF 100%)' }}>
          <div className="max-w-[1360px] mx-auto px-6">
            <div className="w-full bg-[#1A1A18] rounded-3xl overflow-hidden flex flex-col md:flex-row md:min-h-[580px]">
              {/* Image */}
              <div className="relative md:w-[45%] aspect-square md:aspect-auto shrink-0">
                {featuredImage && (
                  <Image
                    src={featuredImage.url}
                    alt={featuredImage.altText ?? featured.title}
                    fill
                    className="object-contain"
                    sizes="(max-width: 768px) 100vw, 45vw"
                  />
                )}
              </div>
              {/* Content */}
              <div className="flex flex-col p-8 md:px-14 md:py-12">
                <div className="space-y-4">
                  <h3 className="text-2xl md:text-3xl font-semibold tracking-[-0.02em] text-white leading-snug">
                    {featured.title}
                  </h3>
                  <p className="text-sm text-white/60 leading-relaxed">
                    Promotes homeostasis, fights over-stimulation, and supports peak cognitive performance — naturally.
                  </p>
                </div>
                <div className="mt-auto pt-10 space-y-5">
                  <p className="text-2xl font-semibold text-white tracking-[-0.02em]">
                    {parseFloat(featured.priceRange.minVariantPrice.amount).toFixed(2)}{' '}
                    <span className="text-base font-normal text-white/50">{featured.priceRange.minVariantPrice.currencyCode}</span>
                  </p>
                  <div className="flex flex-col sm:flex-row gap-3">
                    <Link
                      href={`/products/${featured.handle}`}
                      className="flex-1 text-center rounded-full border border-white/20 text-white text-sm font-medium px-6 py-3 hover:bg-[#F8F8F8]/10 transition-colors"
                    >
                      Learn More
                    </Link>
                    <Link
                      href={`/products/${featured.handle}`}
                      className="flex-1 text-center rounded-full bg-white text-[#1A1A18] text-sm font-semibold px-6 py-3 hover:bg-white/90 transition-colors"
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




      {/* Venn diagram section */}
      <section className="py-28 bg-[#F7F4EF]">
        <div className="max-w-[1360px] mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-16 items-center">

          {/* Left: Venn diagram — image fills full column, circles centered within */}
          {/* 300px circles, container 560×500, C1(150,150) C2(410,150) C3(280,340) */}
          <div className="relative w-full rounded-3xl overflow-hidden" style={{ height: 564 }}>
            <Image
              src="https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=1400&q=80&auto=format&fit=crop"
              alt="Person enjoying a drink outdoors"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
            <div className="absolute inset-0 bg-white/55" />

            <div className="absolute inset-0 p-8 flex items-center justify-center">
              <div className="relative w-[500px] h-[500px]">

                {/* Circle 1 — top-left */}
                <div className="absolute w-[300px] h-[300px] rounded-full" style={{
                  top: 0, left: 0, zIndex: 1,
                  background: 'radial-gradient(ellipse at 35% 30%, rgba(255,255,255,0.55), rgba(224,230,232,0.12))',
                  border: '1.5px solid rgba(26,26,24,0.18)',
                  boxShadow: '0 8px 32px rgba(26,26,24,0.07), 0 2px 8px rgba(224,230,232,0.12), inset 0 1px 2px rgba(255,255,255,0.9)',
                }} />
                <div className="absolute space-y-2 text-center" style={{ top: 150, left: 150, transform: 'translate(-50%,-50%)', zIndex: 4, width: 130 }}>
                  <p className="text-base font-semibold tracking-[-0.02em] text-[#1A1A18]">Taste</p>
                  <p className="text-xs text-[hsla(var(--color-secondary)/0.65)] leading-relaxed">Crafted to be genuinely enjoyed — a drink you look forward to every morning</p>
                </div>

                {/* Circle 2 — top-right, C2 center (400,150) */}
                <div className="absolute w-[300px] h-[300px] rounded-full" style={{
                  top: 0, right: 0, zIndex: 2,
                  background: 'radial-gradient(ellipse at 65% 30%, rgba(255,255,255,0.55), rgba(224,230,232,0.12))',
                  border: '1.5px solid rgba(26,26,24,0.18)',
                  boxShadow: '0 12px 40px rgba(26,26,24,0.09), 0 3px 10px rgba(26,26,24,0.06), inset 0 1px 2px rgba(255,255,255,0.9)',
                }} />
                <div className="absolute space-y-2 text-center" style={{ top: 150, left: 350, transform: 'translate(-50%,-50%)', zIndex: 4, width: 130 }}>
                  <p className="text-base font-semibold tracking-[-0.02em] text-[#1A1A18]">Format</p>
                  <p className="text-xs text-[hsla(var(--color-secondary)/0.65)] leading-relaxed">Ready-to-drink, no prep, no measuring — fits seamlessly into any routine</p>
                </div>

                {/* Circle 3 — bottom-center */}
                <div className="absolute w-[300px] h-[300px] rounded-full" style={{
                  top: 190, left: '50%', transform: 'translateX(-50%)', zIndex: 3,
                  background: 'radial-gradient(ellipse at 50% 65%, rgba(255,255,255,0.6), rgba(224,230,232,0.12))',
                  border: '1.5px solid rgba(26,26,24,0.18)',
                  boxShadow: '0 16px 48px rgba(26,26,24,0.11), 0 4px 14px rgba(26,26,24,0.07), inset 0 1px 2px rgba(255,255,255,0.9)',
                }} />
                <div className="absolute space-y-2 text-center" style={{ top: 340, left: 250, transform: 'translate(-50%,-50%)', zIndex: 4, width: 140 }}>
                  <p className="text-base font-semibold tracking-[-0.02em] text-[#1A1A18]">All in one formula</p>
                  <p className="text-xs text-[hsla(var(--color-secondary)/0.65)] leading-relaxed">13 clinically-dosed actives — no stack needed</p>
                </div>

              </div>
            </div>
          </div>

          {/* Right: heading */}
          <div>
            <h2 className="text-4xl md:text-5xl font-semibold leading-tight tracking-[-0.03em] text-[#1A1A18]">
              {cms.vennHeading}
            </h2>
          </div>

        </div>
      </section>


      <div className="bg-[#EFECE5]"><HealthBenefits /></div>

      {/* Results timeline */}
      <section className="bg-[#F7F4EF]">
        <div className="max-w-[1360px] mx-auto px-6 py-20">
          <div className="mb-16 space-y-4 max-w-2xl">
            <h2 className="text-3xl md:text-4xl font-semibold tracking-[-0.02em] leading-tight">{cms.resultsHeading}</h2>
            <p className="text-base text-[hsla(var(--color-secondary)/1)] leading-relaxed">{cms.resultsSubheading}</p>
          </div>
          {/* Horizontal timeline */}
          <div className="relative">
            {/* Connecting line — sits at the vertical center of the dots (11.5px from top) */}
            <div className="hidden md:block absolute top-[11px] left-[11px] right-0 h-px bg-[var(--color-border)]" />
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              {timelineSteps.map((step) => (
                <div key={step.period} className="relative">
                  <div className="w-[23px] h-[23px] rounded-full border-2 border-[hsla(var(--color-accent)/1)] bg-[#F8F8F8] flex items-center justify-center mb-5">
                    <div className="w-2 h-2 rounded-full bg-[hsla(var(--color-accent)/1)]" />
                  </div>
                  <div className="space-y-2">
                    <span className="inline-block text-xs font-semibold tracking-[0.08em] uppercase border border-[hsla(var(--color-accent)/1)] px-3 py-1">{step.period}</span>
                    <p className="text-lg font-semibold tracking-[-0.01em]">{step.title}</p>
                    <ul className="space-y-1">
                      {step.bullets.split('\n').map((b) => (
                        <li key={b} className="text-base text-[hsla(var(--color-secondary)/1)] flex items-start gap-2">
                          <span className="mt-1.5 w-1 h-1 rounded-full bg-[hsla(var(--color-secondary)/0.5)] shrink-0" />
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
      </section>

      {/* Dive Deeper — card launcher */}
      <section className="bg-[#EFECE5]">
        <div className="max-w-[1360px] mx-auto px-6 py-20">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              {
                eyebrow: '● Formula',
                title: 'Our Ingredients',
                subtitle: 'Every active, fully dosed and transparently sourced.',
                cta: 'Discover',
                href: '/pages/ingredients',
                img: 'https://www.swisskern.com/cdn/shop/files/Firefly_Generate_isolated_shiitake_mushroom_on_a_white_background_53012.jpg?v=1721234355&width=800',
                alt: 'Ingredients',
              },
              {
                eyebrow: '● Brand',
                title: 'Our Philosophy',
                subtitle: 'Science-based with humans at the heart of everything.',
                cta: 'Read More',
                href: '/pages/our-philosophy',
                img: 'https://www.swisskern.com/cdn/shop/files/philosophy.jpg?v=1720797963&width=800',
                alt: 'Philosophy',
              },
            ].map((card) => (
              <Link key={card.title} href={card.href} className="group relative overflow-hidden aspect-[4/5] block rounded-3xl">
                <Image
                  src={card.img}
                  alt={card.alt}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-black/25 transition-opacity duration-500" />
                {/* Eyebrow top-left */}
                <p className="absolute top-7 left-7 text-xs text-white/70 tracking-[0.14em]">{card.eyebrow}</p>
                {/* Content bottom */}
                <div className="absolute bottom-0 left-0 right-0 p-8 space-y-2">
                  <h3 className="text-3xl font-semibold tracking-[-0.02em] text-white leading-tight">{card.title}</h3>
                  <p className="text-sm text-white/70 leading-relaxed">{card.subtitle}</p>
                  <p className="text-xs tracking-[0.14em] uppercase text-white/60 group-hover:text-white transition-colors duration-300 pt-1">{card.cta} →</p>
                </div>
              </Link>
            ))}
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
      <section className="bg-[#1A1A18] py-28">
        <div className="max-w-2xl mx-auto px-6 text-center space-y-10">
          <p className="text-[11px] tracking-[0.18em] uppercase text-white/30 font-medium">Testimonials</p>
          <blockquote className="text-2xl md:text-3xl font-semibold leading-[1.4] tracking-[-0.02em] text-white/90">
            &ldquo;{testimonial?.quote}&rdquo;
          </blockquote>
          <div>
            <p className="text-sm font-medium text-white/70">{testimonial?.authorName}</p>
            <p className="text-xs text-white/35 mt-1 tracking-[0.06em]">{testimonial?.authorRole}</p>
          </div>
        </div>
      </section>

      {/* Mission */}
      <section
        className="py-36"
        style={{ background: 'linear-gradient(180deg, #E8E3DA 0%, #F7F4EF 100%)' }}
      >
        <div className="max-w-2xl mx-auto px-6 text-center space-y-7">
          <p className="text-[11px] tracking-[0.18em] uppercase text-[hsla(var(--color-secondary)/0.5)] font-medium">
            {cms.bottomMissionEyebrow}
          </p>
          <h2 className="text-4xl md:text-5xl font-semibold leading-[1.15] tracking-[-0.03em] text-[#1A1A18]">
            {cms.bottomMissionHeading}
          </h2>
          <Link
            href={featured ? `/products/${featured.handle}` : '/'}
            className="inline-flex items-center justify-center rounded-full bg-[#1A1A18] text-white text-[11px] tracking-[0.12em] uppercase font-semibold px-8 py-4 hover:opacity-80 transition-opacity duration-500 mt-2"
          >
            Discover Flow
          </Link>
        </div>
      </section>
    </main>
  );
}
