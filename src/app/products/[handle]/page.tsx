import { Suspense } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { getProduct, getProducts } from '@/lib/shopify';
import { getHealthBenefits, getResultsTimelineSteps, getIngredients, getProductMeta } from '@/lib/content';
import { servicePillars, faqCategories } from '@/lib/content-data';

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
import ComparisonTable from '@/app/components/ComparisonTable';
import SavingsBreakdown from '@/app/components/SavingsBreakdown';
import PurchaseSelector from './PurchaseSelector';
import BenefitsTimeline from './BenefitsTimeline';
import HealthCenter from './HealthCenter';
import MainBenefits from '@/app/components/MainBenefits';
import SelectionProcessSection from './SelectionProcessSection';


export default async function ProductPage({ params }: { params: Promise<{ handle: string }> }) {
  const { handle } = await params;
  const [product, allProducts, healthBenefits, timelineSteps, ingredients, meta] = await Promise.all([getProduct(handle), getProducts(), getHealthBenefits(), getResultsTimelineSteps(), getIngredients(), getProductMeta()]);

  if (!product) notFound();

  const images = product.images.edges.map((e) => e.node);
  const variants = product.variants.edges.map((e) => e.node);
  const firstVariant = variants[0];
  const relatedProducts = allProducts.filter((p) => p.handle !== handle).slice(0, 3);
  const shortDesc = product.description.length > 220
    ? product.description.slice(0, 220) + '…'
    : product.description;

  const productJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.title,
    description: product.description,
    image: images.map((i) => i.url),
    brand: { '@type': 'Brand', name: 'Flow Health' },
    offers: {
      '@type': 'Offer',
      price: firstVariant.price.amount,
      priceCurrency: firstVariant.price.currencyCode,
      availability: 'https://schema.org/InStock',
      url: `https://www.flow-health.ch/products/${handle}`,
    },
  };

  return (
    <main>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(productJsonLd) }} />
      {/* Product hero */}
      <div className="pt-20 pb-12 md:pb-20 max-w-[1200px] mx-auto pl-3 pr-6 relative overflow-hidden">
        {/* Ambient glow */}
        <div className="absolute top-0 right-0 w-[700px] h-[700px] rounded-full pointer-events-none" style={{ background: 'radial-gradient(ellipse at 70% 20%, rgba(59,56,184,0.08) 0%, transparent 65%)' }} />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-y-10 md:gap-y-0 items-start">
          <ProductImageGallery images={images} title={product.title} />

          <div className="space-y-7 pl-6 pr-0 md:pl-8 lg:pl-12 pt-8 md:pt-12">
            <div className="space-y-2">
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

            <p className="text-sm text-[hsla(var(--color-secondary)/1)] leading-relaxed">{shortDesc}</p>

            <PurchaseSelector
              variantId={firstVariant.id}
              price={parseFloat(firstVariant.price.amount)}
              currencyCode={firstVariant.price.currencyCode}
            />

            {/* Service pillars */}
            {(() => {
              const pillarIcons = [
                <svg key="dispatch" height="18" viewBox="0 0 64 64" width="18" xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10"><path d="m57.7 16.5a30 30 0 1 1 -14.3-12.2" /><path d="m32 12c0 4.2 6 1.7 6 6s-4.6 7.3-8 5-7.9-3.5-11.9 2.1-1.3 12 1.5 11.9 5.5-2.8 6.7.6 1.5 3.4 2.8 4.2 1.3 2.2.9 4.1 2 8 4 8 3.8-.8 4-4 2.6-3.3 3.8-4.2-.9-4.3 1.3-6.5 6.6-6.2 2.8-7.2-3.5-1.8-4-3.4-2-3.2 1-3.3a11.9 11.9 0 0 0 8.7-3.6c2.5-2.6 3.8-5.2 6.1-5.2a25.6 25.6 0 0 0 -6.5-7.5 30 30 0 0 0 -7.8-4.7c-6.7 3.2-11.4 3.5-11.4 7.7z" /></svg>,
                <svg key="delivery" height="18" viewBox="0 0 64 64" width="18" xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10"><path d="m17 15h26c2.3 0 2.1 1.6 1.7 3.1s-3.7 14.9-3.7 14.9h10.1l4-2 3.9 2v8c0 1.3-.5 2-2 2h-8m-40 0h6.6m9.4 0h14.6" /><path d="m43.6 23h5.4l6.1 8m-24.1-8h-22m18 8h-22" /><path d="m24.8 44a6.9 6.9 0 0 1 -6.2 5c-2.7 0-4.2-2.2-3.4-5a6.9 6.9 0 0 1 6.2-5c2.6 0 4.2 2.2 3.4 5zm24 0a6.9 6.9 0 0 1 -6.2 5c-2.7 0-4.2-2.2-3.4-5a6.9 6.9 0 0 1 6.2-5c2.6 0 4.2 2.2 3.4 5z" /></svg>,
                <svg key="returns" height="18" viewBox="0 0 64 64" width="18" xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10"><path d="m54 6v10h-10m-12 43a27 27 0 1 1 21.751-43m-8.766 39.678a26.819 26.819 0 0 1 -6.985 2.653m15.751-10.331a27.159 27.159 0 0 1 -4.711 4.945m8.751-12.932a26.821 26.821 0 0 1 -1.58 3.952" /><circle cx="32" cy="32" r="3" /><path d="m33.961 34.261 10.039 7.739m-12-30v17" /></svg>,
              ];
              return (
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-px bg-[var(--color-border)] border border-[var(--color-border)] rounded-xl overflow-hidden shadow-[0_4px_24px_rgba(30,24,84,0.08)]">
                  {servicePillars.map((item, i) => (
                    <div key={item.title} className="bg-white px-3 py-5 flex flex-col items-center gap-2.5 text-center">
                      <div className="w-9 h-9 rounded-full bg-gradient-to-br from-[#3B38B8]/15 to-[#1E1854]/8 flex items-center justify-center shrink-0">
                        <span className="text-[#3B38B8]">{pillarIcons[i]}</span>
                      </div>
                      <p className="text-xs font-semibold tracking-[-0.01em] leading-tight">{item.title}</p>
                      <p className="text-xs text-[hsla(var(--color-secondary)/0.7)] leading-snug">{item.text}</p>
                    </div>
                  ))}
                </div>
              );
            })()}

          </div>
        </div>
      </div>

      <MainBenefits benefits={healthBenefits} />

      <BenefitsTimeline steps={timelineSteps} />

      <TakeFlowSteps />

      <HealthCenter caloriesKcal={meta.caloriesKcal} />

      <IngredientsAccordion ingredients={ingredients} />

      <Suspense>
        <SavingsBreakdown />
      </Suspense>

      <SelectionProcessSection />

      <Suspense>
        <ComparisonTable />
      </Suspense>

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

      {/* Still got questions? */}
      <section className="relative overflow-hidden py-24" style={{ background: 'linear-gradient(160deg, #f8f7ff 0%, #ffffff 50%, #f0f0fb 100%)' }}>
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute left-1/2 top-0 -translate-x-1/2 w-[800px] h-[400px]" style={{ background: 'radial-gradient(ellipse at 50% 0%, rgba(59,56,184,0.06) 0%, transparent 70%)' }} />
        </div>
        <div className="relative max-w-[1200px] mx-auto px-6 text-center space-y-6">
          <p className="text-xs tracking-[0.16em] uppercase font-semibold bg-gradient-to-r from-[#3B38B8] to-[#1E1854] bg-clip-text text-transparent">Support</p>
          <h2 className="text-3xl md:text-4xl font-semibold tracking-[-0.02em]">Still got questions?</h2>
          <p className="text-sm text-[hsla(var(--color-secondary)/0.7)]">Please select where you need support.</p>
          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            {Object.entries(faqCategories).map(([key, label]) => (
              <Link
                key={key}
                href={`/pages/faq?category=${key}`}
                className="whitespace-nowrap rounded-full bg-white border border-[var(--color-border)] shadow-[0_2px_8px_rgba(30,24,84,0.06)] px-5 py-2.5 text-xs tracking-[0.08em] uppercase font-medium text-[hsla(var(--color-secondary)/0.8)] hover:border-[#3B38B8] hover:text-[#3B38B8] hover:shadow-[0_4px_16px_rgba(59,56,184,0.12)] transition-all duration-300"
              >
                {label}
              </Link>
            ))}
          </div>
        </div>
      </section>

    </main>
  );
}
