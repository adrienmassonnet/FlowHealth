import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { getProductMeta } from '@/lib/content';

export const metadata: Metadata = {
  title: 'Our Product',
  description: 'Flow is a daily cognitive supplement with 13 clinically-dosed active ingredients — zero fillers, no caffeine, no added sugar. Formulated in Switzerland for deep focus and lasting mental clarity.',
  openGraph: {
    title: 'Flow — Our Cognitive Performance Formula',
    description: 'Flow is a daily cognitive supplement with 13 clinically-dosed active ingredients — zero fillers, no caffeine, no added sugar. Formulated in Switzerland for deep focus and lasting mental clarity.',
  },
};
import TrackedLink from '@/app/components/TrackedLink';
import { PRODUCT_META } from '@/lib/product-meta';
import ProductTopics from './ProductTopics';

export default async function OurProductPage() {
  const meta = await getProductMeta();
  return (
    <main>

      {/* Hero */}
      <section className="max-w-[1200px] mx-auto px-6">
        <div className="pt-20 pb-14 md:pb-20">
          <div className="space-y-8">
            {/* Top row: text + image */}
            <div className="flex flex-col md:flex-row md:items-stretch gap-10 md:gap-16">
              {/* Text */}
              <div className="flex-1 space-y-6">
                <p className="text-xs tracking-[0.16em] uppercase font-semibold bg-gradient-to-r from-[#3B38B8] to-[#1E1854] bg-clip-text text-transparent">About Flow</p>
                <h1 className="text-3xl sm:text-4xl md:text-5xl font-semibold tracking-[-0.03em] leading-tight">
                  One formula.<br className="hidden sm:block" /> Nothing hidden.
                </h1>
                <p className="text-base text-[hsla(var(--color-secondary)/0.65)] leading-relaxed">
                  Flow is a complete daily cognitive supplement built around clinically dosed, peer-reviewed ingredients. Every milligram is on the label for a reason.
                </p>
              </div>
              {/* Hero image */}
              <div className="relative w-full md:w-[420px] min-h-[260px] md:min-h-0 rounded-2xl overflow-hidden shrink-0">
                <Image
                  src="https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=900&q=85&auto=format&fit=crop"
                  alt="Natural ingredients laid out on a clean surface"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 420px"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#1E1854]/30 via-transparent to-transparent" />
              </div>
            </div>
            {/* Specs — full width below */}
            <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-7 gap-2">
              {[
                { value: String(meta.activeIngredients), label: 'Active ingredients' },
                { value: `${meta.totalFormulaWeightG}g`, label: 'Per serving' },
                { value: `${meta.caloriesKcal} kcal`, label: 'Per serving' },
                { value: 'Vegan', label: 'Certified' },
                { value: 'No added sugar', label: 'Formula' },
                { value: 'Caffeine-free', label: 'Formula' },
              ].map((spec, i) => (
                <div key={i} className="bg-gradient-to-br from-[#1E1854] to-[#2d2a7a] rounded-xl px-4 py-3">
                  <p className="text-lg font-semibold tracking-[-0.02em] text-white">{spec.value}</p>
                  <p className="text-xs tracking-[0.08em] uppercase text-white/50 mt-1">{spec.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>


      {/* Tabbed topics */}
      <ProductTopics />

      {/* CTA */}
      <section className="bg-[#1E1854] py-20">
        <div className="max-w-[720px] mx-auto px-6 text-center space-y-6">
          <h2 className="text-3xl md:text-4xl font-semibold tracking-[-0.02em] text-white leading-tight">
            Ready to experience it?
          </h2>
          <p className="text-sm text-white/60 leading-relaxed">
            Try Flow for {PRODUCT_META.returnDays} days. If you don&apos;t notice a meaningful difference, we&apos;ll refund you. No questions asked.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <TrackedLink href="/products/flow" clarityEvent="our_product_cta_shop_flow" className="inline-flex items-center gap-2 bg-white text-[#1E1854] text-xs tracking-[0.1em] uppercase font-semibold px-8 py-4 rounded-full hover:bg-[hsla(var(--color-accent)/1)] hover:text-white transition-colors">
              Get Flow
            </TrackedLink>
            <TrackedLink href="/pages/our-product" clarityEvent="our_product_cta_ingredients" className="inline-flex items-center gap-2 border border-white/30 text-white text-xs tracking-[0.1em] uppercase font-medium px-8 py-4 rounded-full hover:border-white/60 transition-colors">
              Full ingredients list
            </TrackedLink>
          </div>
        </div>
      </section>

      {/* Nav links */}
      <section className="max-w-[1200px] mx-auto px-6 py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            { label: 'Who We Are', description: 'The team and story behind Flow Health.', href: '/pages/who-we-are', image: 'https://images.unsplash.com/photo-1552196563-55cd4e45efb3?w=700&q=80&auto=format&fit=crop' },
            { label: 'Our Philosophy', description: 'The principles that guide every decision we make.', href: '/pages/our-philosophy', image: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=700&q=80&auto=format&fit=crop' },
          ].map((card) => (
            <Link key={card.label} href={card.href} className="group relative rounded-2xl overflow-hidden aspect-[16/7] flex items-end">
              <Image src={card.image} alt={card.label} fill className="object-cover transition-transform duration-500 group-hover:scale-105" sizes="(max-width: 768px) 100vw, 50vw" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/45 to-black/10" />
              <div className="relative z-10 p-6 space-y-1">
                <h3 className="text-lg font-semibold text-white">{card.label}</h3>
                <p className="text-xs text-white/80 leading-snug">{card.description}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

    </main>
  );
}
