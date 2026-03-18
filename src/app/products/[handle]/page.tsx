import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { getProduct, getProducts } from '@/lib/shopify';
import AddToCartButton from './AddToCartButton';
import ProductImageGallery from './ProductImageGallery';
import IngredientsAccordion from './IngredientsAccordion';
import TakeFlowSteps from '@/app/components/TakeFlowSteps';
import ComparisonTable from '@/app/components/ComparisonTable';
import SavingsBreakdown from '@/app/components/SavingsBreakdown';
import PurchaseSelector from './PurchaseSelector';
import BenefitsTimeline from './BenefitsTimeline';
import HealthCenter from './HealthCenter';
import MainBenefits from '@/app/components/MainBenefits';





export default async function ProductPage({ params }: { params: Promise<{ handle: string }> }) {
  const { handle } = await params;
  const [product, allProducts] = await Promise.all([getProduct(handle), getProducts()]);

  if (!product) notFound();

  const images = product.images.edges.map((e) => e.node);
  const variants = product.variants.edges.map((e) => e.node);
  const firstVariant = variants[0];
  const relatedProducts = allProducts.filter((p) => p.handle !== handle).slice(0, 3);
  const shortDesc = product.description.length > 220
    ? product.description.slice(0, 220) + '…'
    : product.description;

  return (
    <main>
      {/* Product hero */}
      <div className="pb-12 md:pb-20 max-w-[1200px] mx-auto pl-3 pr-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-y-10 md:gap-y-0 items-start">
          <ProductImageGallery images={images} title={product.title} />

          <div className="md:sticky md:top-20 space-y-7 pl-6 pr-0 md:pl-8 lg:pl-12 pt-8 md:pt-12">
            <div className="space-y-2">
              <h1 className="text-3xl font-semibold tracking-[-0.02em] leading-tight">{product.title}</h1>
              <p className="text-xl font-medium mt-2">
                {parseFloat(firstVariant.price.amount).toFixed(2)}{' '}
                <span className="text-sm text-[hsla(var(--color-secondary)/1)] font-normal">{firstVariant.price.currencyCode}</span>
              </p>
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
              price={parseFloat(firstVariant.price.amount)}
              currencyCode={firstVariant.price.currencyCode}
            />

            <AddToCartButton variantId={firstVariant.id} />

            {/* Service pillars */}
            <div className="grid grid-cols-3 gap-px bg-[var(--color-border)] border border-[var(--color-border)] rounded-xl overflow-hidden">
              {[
                {
                  title: 'Same Day Dispatch',
                  text: 'Orders before 4pm dispatched same day.',
                  icon: (
                    <svg height="20" viewBox="0 0 64 64" width="20" xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10">
                      <path d="m57.7 16.5a30 30 0 1 1 -14.3-12.2" />
                      <path d="m32 12c0 4.2 6 1.7 6 6s-4.6 7.3-8 5-7.9-3.5-11.9 2.1-1.3 12 1.5 11.9 5.5-2.8 6.7.6 1.5 3.4 2.8 4.2 1.3 2.2.9 4.1 2 8 4 8 3.8-.8 4-4 2.6-3.3 3.8-4.2-.9-4.3 1.3-6.5 6.6-6.2 2.8-7.2-3.5-1.8-4-3.4-2-3.2 1-3.3a11.9 11.9 0 0 0 8.7-3.6c2.5-2.6 3.8-5.2 6.1-5.2a25.6 25.6 0 0 0 -6.5-7.5 30 30 0 0 0 -7.8-4.7c-6.7 3.2-11.4 3.5-11.4 7.7z" />
                    </svg>
                  ),
                },
                {
                  title: 'Free Delivery',
                  text: 'Free 2-day tracked delivery over CHF 50.',
                  icon: (
                    <svg height="20" viewBox="0 0 64 64" width="20" xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10">
                      <path d="m17 15h26c2.3 0 2.1 1.6 1.7 3.1s-3.7 14.9-3.7 14.9h10.1l4-2 3.9 2v8c0 1.3-.5 2-2 2h-8m-40 0h6.6m9.4 0h14.6" />
                      <path d="m43.6 23h5.4l6.1 8m-24.1-8h-22m18 8h-22" />
                      <path d="m24.8 44a6.9 6.9 0 0 1 -6.2 5c-2.7 0-4.2-2.2-3.4-5a6.9 6.9 0 0 1 6.2-5c2.6 0 4.2 2.2 3.4 5zm24 0a6.9 6.9 0 0 1 -6.2 5c-2.7 0-4.2-2.2-3.4-5a6.9 6.9 0 0 1 6.2-5c2.6 0 4.2 2.2 3.4 5z" />
                    </svg>
                  ),
                },
                {
                  title: '30-Day Returns',
                  text: 'Free returns within 30 days of shipping.',
                  icon: (
                    <svg height="20" viewBox="0 0 64 64" width="20" xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10">
                      <path d="m54 6v10h-10m-12 43a27 27 0 1 1 21.751-43m-8.766 39.678a26.819 26.819 0 0 1 -6.985 2.653m15.751-10.331a27.159 27.159 0 0 1 -4.711 4.945m8.751-12.932a26.821 26.821 0 0 1 -1.58 3.952" />
                      <circle cx="32" cy="32" r="3" />
                      <path d="m33.961 34.261 10.039 7.739m-12-30v17" />
                    </svg>
                  ),
                },
              ].map((item) => (
                <div key={item.title} className="bg-[#1E185408] px-3 py-4 flex flex-col items-center gap-2 text-center">
                  <span className="text-[hsla(var(--color-secondary)/1)]">{item.icon}</span>
                  <p className="text-xs font-semibold tracking-[-0.01em] leading-tight">{item.title}</p>
                  <p className="text-xs text-[hsla(var(--color-secondary)/0.7)] leading-snug">{item.text}</p>
                </div>
              ))}
            </div>


          </div>
        </div>
      </div>

      <MainBenefits />

      <BenefitsTimeline />

      <TakeFlowSteps />

      <HealthCenter />

      <IngredientsAccordion />

      {/* Our selection process */}
      <section className="max-w-[1200px] mx-auto px-6 py-20">
        <div className="relative rounded-3xl overflow-hidden h-[560px]">
          <Image
            src="https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=1400&q=85&auto=format&fit=crop"
            alt="Our selection process"
            fill
            className="object-cover object-center"
            sizes="(max-width: 768px) 100vw, 1360px"
          />
          {/* Soft overlay to keep headline legible */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/55 via-black/15 to-black/25" />
          <div className="absolute inset-0 flex flex-col justify-between p-8 md:p-12 pt-12 md:pt-16">
            {/* Headline */}
            <h2 className="text-3xl md:text-4xl font-semibold text-white max-w-xl leading-[1.1] drop-shadow-sm">
              Our rigorous ingredient selection process.
            </h2>
            {/* Bottom frosted panel */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 bg-black/40 backdrop-blur-md rounded-2xl p-8">
              {[
                {
                  title: 'Peer-Reviewed Evidence',
                  description: 'Every ingredient is backed by human clinical trials — not animal studies or in-vitro data.',
                  icon: (
                    <svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <circle cx="18" cy="18" r="8" stroke="white" strokeWidth="1.5"/>
                      <path d="M18 10V10.5M18 25.5V26M10 18H10.5M25.5 18H26M12.4 12.4L12.75 12.75M23.25 23.25L23.6 23.6M12.4 23.6L12.75 23.25M23.25 12.75L23.6 12.4" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
                    </svg>
                  ),
                },
                {
                  title: 'Clinical Dosing',
                  description: 'We dose at proven therapeutic levels — no pixie-dusting or proprietary blends hiding underdoses.',
                  icon: (
                    <svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <rect x="13" y="5" width="10" height="26" rx="5" stroke="white" strokeWidth="1.5"/>
                      <line x1="13" y1="18" x2="23" y2="18" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
                      <line x1="16" y1="12" x2="20" y2="12" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
                    </svg>
                  ),
                },
                {
                  title: 'Bioavailable Forms',
                  description: 'We select the most bioavailable form of each compound — the exact form used in the clinical research.',
                  icon: (
                    <svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M18 6 C18 6 10 14 10 22 C10 27.5 13.6 31 18 31 C22.4 31 26 27.5 26 22 C26 14 18 6 18 6Z" stroke="white" strokeWidth="1.5" strokeLinejoin="round"/>
                      <line x1="18" y1="19" x2="18" y2="31" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
                      <line x1="14" y1="23" x2="18" y2="19" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
                    </svg>
                  ),
                },
                {
                  title: 'Swiss GMP Manufacturing',
                  description: 'Produced under pharmaceutical-grade Swiss GMP conditions — every batch tested for purity and potency.',
                  icon: (
                    <svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <rect x="9" y="5" width="18" height="26" rx="2" stroke="white" strokeWidth="1.5"/>
                      <line x1="13" y1="13" x2="23" y2="13" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
                      <line x1="13" y1="19" x2="23" y2="19" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
                      <line x1="13" y1="25" x2="19" y2="25" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
                    </svg>
                  ),
                },
              ].map((item) => (
                <div key={item.title}>
                  {item.icon}
                  <h3 className="text-sm font-semibold text-white mt-4 mb-2 leading-snug">{item.title}</h3>
                  <p className="text-sm text-white/70 leading-relaxed">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <ComparisonTable />
      <SavingsBreakdown />

      {/* Related products */}
      {relatedProducts.length > 0 && (
        <section className="max-w-[1200px] mx-auto px-6 py-20">
          <div className="text-center mb-12 space-y-2">
            <p className="text-xs tracking-[0.16em] uppercase text-[hsla(var(--color-secondary)/1)]">Our Range</p>
            <h2 className="text-3xl font-semibold tracking-[-0.02em]">Our Unique Formulas</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-px bg-[var(--color-border)]">
            {relatedProducts.map((p) => {
              const img = p.images.edges[0]?.node;
              const price = p.priceRange.minVariantPrice;
              return (
                <Link key={p.id} href={`/products/${p.handle}`} className="group bg-[#1E185408] p-6 hover:bg-[#1E18540A] transition-colors text-center">
                  {img && (
                    <div className="relative aspect-square mb-4 bg-[#1E18540F]">
                      <Image src={img.url} alt={img.altText ?? p.title} fill className="object-contain p-6 group-hover:scale-105 transition-transform duration-500" />
                    </div>
                  )}
                  <p className="text-base font-medium">{p.title}</p>
                  <p className="text-xs text-[hsla(var(--color-secondary)/1)] mt-1">{parseFloat(price.amount).toFixed(2)} {price.currencyCode}</p>
                  <div className="mt-3 text-xs tracking-[0.08em] uppercase border border-[var(--color-border)] px-4 py-2 hover:bg-[hsla(var(--color-accent)/1)] hover:text-white hover:border-[hsla(var(--color-accent)/1)] transition-colors">
                    Shop Now
                  </div>
                </Link>
              );
            })}
          </div>
        </section>
      )}

      {/* Still got questions? */}
      <section className="bg-[#1E185408] py-20">
        <div className="max-w-[1200px] mx-auto px-6 text-center space-y-6">
          <h2 className="text-3xl md:text-4xl font-semibold tracking-[-0.02em]">Still got questions?</h2>
          <p className="text-sm text-[hsla(var(--color-secondary)/1)]">Please select where you need support.</p>
          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            {([
              { key: 'product', label: 'Product & Formula' },
              { key: 'usage', label: 'Usage & Dosage' },
              { key: 'shipping', label: 'Shipping & Orders' },
              { key: 'returns', label: 'Returns & Refunds' },
              { key: 'safety', label: 'Safety & Health' },
            ] as const).map(({ key, label }) => (
              <Link
                key={key}
                href={`/pages/faq?category=${key}`}
                className="whitespace-nowrap rounded-full border border-[var(--color-border)] px-5 py-2 text-xs tracking-[0.08em] uppercase font-medium text-[hsla(var(--color-secondary)/0.8)] hover:border-[#1E1854] hover:text-[#1E1854] transition-colors duration-200"
              >
                {label}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Sticky mobile CTA */}
      <div className="fixed bottom-0 left-0 right-0 z-40 md:hidden bg-[#1E185408]/95 backdrop-blur-sm border-t border-[var(--color-border)] p-4">
        <AddToCartButton variantId={firstVariant.id} />
      </div>
    </main>
  );
}
