import type { Metadata } from 'next';
import Image from 'next/image';
import { getProductMeta, getIngredients } from '@/lib/content';

export const metadata: Metadata = {
  title: 'Our Product',
  description: 'Flow is a daily cognitive supplement with 16 clinically-dosed active ingredients: zero fillers, no caffeine, no added sugar. Formulated in Switzerland for deep focus and lasting mental clarity.',
  openGraph: {
    title: 'Flow: Our Cognitive Performance Formula',
    description: 'Flow is a daily cognitive supplement with 16 clinically-dosed active ingredients: zero fillers, no caffeine, no added sugar. Formulated in Switzerland for deep focus and lasting mental clarity.',
  },
};
import ProductTopics from './ProductTopics';
import ProductJourneySection from './ProductJourneySection';

export default async function OurProductPage() {
  const [meta, ingredients] = await Promise.all([getProductMeta(), getIngredients()]);
  return (
    <main>

      {/* Hero */}
      <section className="flow-container">
        <div className="pt-20 pb-8 md:pb-12">
          <div className="space-y-8">
            {/* Top row: text + image */}
            <div className="flex flex-col md:flex-row md:items-stretch gap-10 md:gap-16">
              {/* Text */}
              <div className="flex-1 space-y-6">
                <p className="text-xs tracking-[0.16em] uppercase font-semibold bg-gradient-to-r from-brand to-ink bg-clip-text text-transparent">About Flow</p>
                <h1 className="flow-h1">
                  One formula.<br className="hidden sm:block" /> Nothing hidden.
                </h1>
                <p className="text-base text-[rgba(30,24,84,0.65)] leading-relaxed">
                  Flow is a complete daily cognitive supplement built around clinically dosed, peer-reviewed ingredients. Every milligram is on the label for a reason.
                </p>
              </div>
              {/* Hero image */}
              <div className="relative w-full md:w-[420px] min-h-[260px] md:min-h-0 rounded-2xl overflow-hidden shrink-0">
                <Image
                  src="/our-product/our-product.png"
                  alt="Natural ingredients laid out on a clean surface"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 420px"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink/30 via-transparent to-transparent" />
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
                <div key={i} className="bg-gradient-to-br from-ink to-[#2d2a7a] rounded-xl px-4 py-3">
                  <p className="text-lg font-semibold tracking-[-0.02em] text-white">{spec.value}</p>
                  <p className="text-xs tracking-[0.08em] uppercase text-white/50 mt-1">{spec.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>


      {/* Tabbed topics */}
      <ProductTopics ingredients={ingredients} activeIngredients={meta.activeIngredients} />

      {/* Our Story / journey timeline */}
      <ProductJourneySection />

    </main>
  );
}
