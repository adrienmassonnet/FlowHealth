import { Suspense } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { getProduct, getProducts } from '@/lib/shopify';
import { getHealthBenefits, getResultsTimelineSteps, getIngredients, getProductMeta, getTestimonials } from '@/lib/content';
import { servicePillars } from '@/lib/content-data';

export async function generateMetadata({ params }: { params: Promise<{ handle: string }> }): Promise<Metadata> {
  const { handle } = await params;
  const product = await getProduct(handle);
  if (!product) return {};
  const image = product.images.edges[0]?.node;
  const price = product.variants.edges[0]?.node.price;
  return {
    title: product.title,
    description: product.description.slice(0, 155),
    openGraph: {
      title: `${product.title} | Flow Health`,
      description: product.description.slice(0, 155),
      images: image ? [{ url: image.url, alt: image.altText ?? product.title }] : [],
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: `${product.title} | Flow Health`,
      description: product.description.slice(0, 155),
      images: image ? [image.url] : [],
    },
    other: {
      'product:price:amount': price?.amount ?? '',
      'product:price:currency': price?.currencyCode ?? 'CHF',
    },
  };
}
import ProductImageGallery from './ProductImageGallery';
import IngredientsAccordion from './IngredientsAccordion';
import TakeFlowSteps from '@/app/components/TakeFlowSteps';
import SavingsBreakdown from '@/app/components/SavingsBreakdown';
import PurchaseSelector from './PurchaseSelector';
import BenefitsTimeline from './BenefitsTimeline';
import HealthCenter from './HealthCenter';
import MainBenefits from '@/app/components/MainBenefits';
import ProductNavTabs from './ProductNavTabs';
import ProductPageInit from './ProductPageInit';
import { TestimonialCarousel } from '@/components/ui/testimonial-carousel';


export default async function ProductPage({ params }: { params: Promise<{ handle: string }> }) {
  const { handle } = await params;
  const [product, allProducts, healthBenefits, timelineSteps, ingredients, meta, testimonials] = await Promise.all([getProduct(handle), getProducts(), getHealthBenefits(), getResultsTimelineSteps(), getIngredients(), getProductMeta(), getTestimonials()]);

  if (!product) notFound();

  const images = product.images.edges.map((e) => e.node);
  const variants = product.variants.edges.map((e) => e.node);
  const firstVariant = variants[0];
  const relatedProducts = allProducts.filter((p) => p.handle !== handle).slice(0, 3);
  const fullPrice = parseFloat(firstVariant.price.amount);
  const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://www.flow-health.ch';
  const productJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.title,
    description: product.description,
    image: images.map((i) => i.url),
    brand: { '@type': 'Brand', name: 'Flow Health' },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.8',
      reviewCount: String(testimonials.length > 0 ? Math.max(testimonials.length, 47) : 47),
      bestRating: '5',
      worstRating: '1',
    },
    offers: {
      '@type': 'Offer',
      price: firstVariant.price.amount,
      priceCurrency: firstVariant.price.currencyCode,
      availability: 'https://schema.org/InStock',
      url: `${SITE_URL}/products/${handle}`,
      seller: { '@type': 'Organization', name: 'Flow Health' },
    },
  };

  return (
    <main>
      <ProductPageInit productName={product.title} price={fullPrice} currencyCode={firstVariant.price.currencyCode} productId={product.id} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(productJsonLd) }} />
      {/* Product hero */}
      <section id="section-product" className="scroll-mt-16 pt-20 pb-12 md:pb-20 max-w-[1200px] mx-auto pl-3 pr-6 relative overflow-hidden">
        {/* Mobile-only title — shown above gallery */}
        <div className="md:hidden space-y-2 pb-4 pl-3 pr-6">
          <p className="text-xs tracking-[0.16em] uppercase font-semibold bg-gradient-to-r from-[#3B38B8] to-[#1E1854] bg-clip-text text-transparent">Cognitive Performance Formula</p>
          <h1 className="text-3xl font-semibold tracking-[-0.02em] leading-tight">{product.title}</h1>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-y-10 md:gap-y-0 items-start">
          <ProductImageGallery images={images} title={product.title} />

          <div className="space-y-7 pl-6 pr-0 md:pl-8 lg:pl-12 pt-8 md:pt-12">
            <div className="hidden md:block space-y-2">
              <p className="text-xs tracking-[0.16em] uppercase font-semibold bg-gradient-to-r from-[#3B38B8] to-[#1E1854] bg-clip-text text-transparent">Cognitive Performance Formula</p>
              <h1 className="text-3xl font-semibold tracking-[-0.02em] leading-tight">{product.title}</h1>
            </div>

            {variants.length > 1 && (
              <div className="space-y-2">
                <p className="text-xs tracking-[0.1em] uppercase text-[hsla(var(--color-secondary)/1)]">Flavour</p>
                <div className="flex flex-wrap gap-2">
                  {variants.map((v) => (
                    <button key={v.id} className="border border-[var(--color-border)] px-4 py-2.5 text-xs min-h-[44px] tracking-wide hover:border-[hsla(var(--color-accent)/1)] transition-colors">
                      {v.title}
                    </button>
                  ))}
                </div>
              </div>
            )}

            <div className="space-y-3">
              <p className="text-sm text-[hsla(var(--color-secondary)/1)] leading-relaxed">
                A daily cognitive supplement in powder sachet form — mix one sachet in 400–500 ml of water. One box contains 30 sachets.
              </p>
              <ul className="space-y-1.5">
                {[
                  '16 clinically-dosed active ingredients',
                  'No caffeine, no added sugar, no fillers',
                  'Formulated in Switzerland',
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2 text-sm text-[hsla(var(--color-secondary)/1)]">
                    <span className="text-[#3B38B8] mt-0.5 shrink-0">✓</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <PurchaseSelector
              variantId={firstVariant.id}
              price={fullPrice}
              currencyCode={firstVariant.price.currencyCode}
            />


          </div>
        </div>
      </section>

      {/* Nav tabs */}
      <div data-product-nav-wrapper>
        <div className="max-w-[1200px] mx-auto px-6 pt-8 pb-2">
          <p className="text-xs tracking-[0.16em] uppercase font-semibold bg-gradient-to-r from-[#3B38B8] to-[#1E1854] bg-clip-text text-transparent">Learn more about Flow.</p>
        </div>
        <ProductNavTabs />
      </div>

      {/* Tab sections — wrapper holds a fixed min-height so the footer never shifts position when switching tabs */}
      <div className="min-h-screen">

      {/* Benefits section — visible by default; others pre-hidden to avoid flash before tab JS runs */}
      <section id="section-benefits" className="pt-2 pb-16">
        <MainBenefits benefits={healthBenefits} />
      </section>

      {/* Timeline section */}
      <section id="section-timeline" className="pt-2 pb-16">
        <BenefitsTimeline steps={timelineSteps} />
      </section>

      {/* How to Use section */}
      <section id="section-how-to-use" className="pt-2 pb-16">
        <TakeFlowSteps />
      </section>

      {/* Ingredients section */}
      <section id="section-ingredients" className="pt-2 pb-16">
        <IngredientsAccordion ingredients={ingredients} />
      </section>

      {/* Purity & Transparency section */}
      <section id="section-purity" className="pt-2 pb-16">
        <HealthCenter caloriesKcal={meta.caloriesKcal} activeIngredients={meta.activeIngredients} totalFormulaWeightG={meta.totalFormulaWeightG} servingsPerBox={meta.servingsPerBox} handle={handle} />
      </section>

      {/* Reviews section */}
      <section id="section-reviews" className="pt-2 pb-16">
        <div className="max-w-[1200px] mx-auto px-6 pt-4 pb-20 md:pt-8">
          <div className="mb-9 space-y-2">
            <h2 className="text-3xl font-semibold tracking-[-0.02em]">What our clients have said.</h2>
          </div>
          <TestimonialCarousel testimonials={testimonials} />
        </div>
      </section>

      {/* Shipping & Returns section */}
      <section id="section-shipping" className="pt-2 pb-16">
        <div className="max-w-[1200px] mx-auto px-6 pt-4 pb-20 md:pt-8">
          <div className="mb-9">
            <h2 className="text-3xl font-semibold tracking-[-0.02em]">Simple, stress-free shipping & terms.</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {(() => {
              const pillarIcons = [
                <svg key="dispatch" width="28" height="28" viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10"><path d="m57.7 16.5a30 30 0 1 1 -14.3-12.2" /><path d="m32 12c0 4.2 6 1.7 6 6s-4.6 7.3-8 5-7.9-3.5-11.9 2.1-1.3 12 1.5 11.9 5.5-2.8 6.7.6 1.5 3.4 2.8 4.2 1.3 2.2.9 4.1 2 8 4 8 3.8-.8 4-4 2.6-3.3 3.8-4.2-.9-4.3 1.3-6.5 6.6-6.2 2.8-7.2-3.5-1.8-4-3.4-2-3.2 1-3.3a11.9 11.9 0 0 0 8.7-3.6c2.5-2.6 3.8-5.2 6.1-5.2a25.6 25.6 0 0 0 -6.5-7.5 30 30 0 0 0 -7.8-4.7c-6.7 3.2-11.4 3.5-11.4 7.7z" /></svg>,
                <svg key="delivery" width="28" height="28" viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10"><path d="m17 15h26c2.3 0 2.1 1.6 1.7 3.1s-3.7 14.9-3.7 14.9h10.1l4-2 3.9 2v8c0 1.3-.5 2-2 2h-8m-40 0h6.6m9.4 0h14.6" /><path d="m43.6 23h5.4l6.1 8m-24.1-8h-22m18 8h-22" /><path d="m24.8 44a6.9 6.9 0 0 1 -6.2 5c-2.7 0-4.2-2.2-3.4-5a6.9 6.9 0 0 1 6.2-5c2.6 0 4.2 2.2 3.4 5zm24 0a6.9 6.9 0 0 1 -6.2 5c-2.7 0-4.2-2.2-3.4-5a6.9 6.9 0 0 1 6.2-5c2.6 0 4.2 2.2 3.4 5z" /></svg>,
                <svg key="subscription" width="28" height="28" viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="8" y="14" width="48" height="42" rx="4" /><path d="M8 26h48" /><path d="M20 8v12M44 8v12" /><circle cx="32" cy="42" r="7" /><path d="M32 38v4l3 2" /></svg>,
              ];
              return servicePillars.map((item, i) => (
                <div key={item.title} className="border border-[var(--color-border)] rounded-2xl p-4 md:p-8 flex flex-row md:flex-col items-start gap-4 md:gap-5 shadow-[0_2px_16px_rgba(30,24,84,0.06)] bg-white">
                  <div className="w-9 h-9 md:w-12 md:h-12 shrink-0 rounded-full bg-gradient-to-br from-[#3B38B8]/15 to-[#1E1854]/8 flex items-center justify-center text-[#3B38B8]">
                    {pillarIcons[i]}
                  </div>
                  <div className="space-y-2">
                    <p className="text-sm md:text-base font-semibold tracking-[-0.01em]">{item.title}</p>
                    <ul className="space-y-4">
                      {item.lines.map((line) => {
                        const [label, detail] = line.split(' — ');
                        return (
                          <li key={line} className="text-xs md:text-sm leading-snug">
                            {detail ? (
                              <span className="flex flex-col gap-0.5">
                                <span className="font-medium text-[#1E1854]/80">{label}</span>
                                <span className="text-[hsla(var(--color-secondary)/0.55)]">{detail}</span>
                              </span>
                            ) : (
                              <span className="text-[hsla(var(--color-secondary)/0.65)]">{line}</span>
                            )}
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                </div>
              ));
            })()}
          </div>
        </div>
      </section>

      {/* Save Money + How Flow Compares section */}
      <section id="section-savings" className="pt-2 pb-16">
        <Suspense><SavingsBreakdown /></Suspense>
      </section>

      </div>{/* end tab sections wrapper */}

      {/* Related products */}
      {relatedProducts.length > 0 && (
        <section className="max-w-[1200px] mx-auto px-6 py-20">
          <div className="text-center mb-12 space-y-2">
            <p className="text-xs tracking-[0.16em] uppercase font-semibold bg-gradient-to-r from-[#3B38B8] to-[#1E1854] bg-clip-text text-transparent">Our Range</p>
            <h2 className="text-3xl font-semibold tracking-[-0.02em]">Our Unique Formulas</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {relatedProducts.map((p) => {
              const img = p.images.edges[0]?.node;
              const price = p.priceRange.minVariantPrice;
              return (
                <Link key={p.id} href={`/products/${p.handle}`} className="group bg-white border border-[var(--color-border)] rounded-2xl p-6 hover:shadow-[0_8px_32px_rgba(30,24,84,0.10)] transition-all duration-500 text-center">
                  {img && (
                    <div className="relative aspect-square mb-4 bg-gradient-to-br from-[#3B38B8]/5 to-[#1E1854]/5 rounded-xl">
                      <Image src={img.url} alt={img.altText ?? p.title} fill className="object-contain p-6 group-hover:scale-105 transition-transform duration-500" />
                    </div>
                  )}
                  <p className="text-base font-medium">{p.title}</p>
                  <p className="text-xs text-[hsla(var(--color-secondary)/0.7)] mt-1">{parseFloat(price.amount).toFixed(2)} {price.currencyCode}</p>
                  <div className="mt-4 text-xs tracking-[0.08em] uppercase btn-cta text-white px-5 py-2.5 rounded-full inline-block">
                    Get Flow
                  </div>
                </Link>
              );
            })}
          </div>
        </section>
      )}


    </main>
  );
}
