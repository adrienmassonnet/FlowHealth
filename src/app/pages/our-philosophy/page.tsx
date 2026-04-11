import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { getPhilosophyPrinciples, getPhilosophyBeliefs } from '@/lib/contentful';

export const metadata: Metadata = {
  title: 'Our Philosophy',
  description: 'Flow is built on one belief: cognitive performance should be earned through science, not marketing. Read the principles that guide every formulation decision we make.',
  openGraph: {
    title: 'Our Philosophy — The Principles Behind Flow',
    description: 'Flow is built on one belief: cognitive performance should be earned through science, not marketing. Read the principles that guide every formulation decision we make.',
  },
};
import { getProduct } from '@/lib/shopify';
import PhilosophyScroll from './PhilosophyScroll';

export default async function OurPhilosophyPage() {
  const [principles, beliefs, product] = await Promise.all([getPhilosophyPrinciples(), getPhilosophyBeliefs(), getProduct('flow')]);
  const productImageUrl = product?.images?.edges?.[0]?.node?.url;
  return (
    <main className="bg-white">

      {/* Hero */}
      <section className="relative min-h-[60vh] flex items-end overflow-hidden">
        <Image
          src="https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=1800&q=85&auto=format&fit=crop"
          alt="Our philosophy"
          fill
          className="object-cover opacity-40"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#1E1854] via-[#1E1854]/50 to-transparent" />
        <div className="relative z-10 max-w-[1200px] mx-auto px-6 pb-20 md:pb-28">
          <p className="text-xs tracking-[0.16em] uppercase text-white/40 font-medium mb-4">About Flow</p>
          <h1 className="text-3xl sm:text-4xl md:text-6xl font-semibold tracking-[-0.03em] text-white leading-tight max-w-2xl">
            Built for minds that refuse to settle.
          </h1>
          <p className="mt-6 text-sm text-white/60 max-w-md leading-relaxed">
            Flow started with a personal frustration — scattered focus, overstimulation, and a supplement market full of noise. We decided to build something better.
          </p>
        </div>
      </section>

      {/* Scroll-driven pillars */}
      <PhilosophyScroll />

      {/* What we believe */}
      <section className="bg-white border-t border-[#1E1854]/[0.06]">
        <div className="max-w-[1200px] mx-auto px-6 py-16 md:py-24">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 items-start">
            <div className="space-y-6 md:sticky md:top-28">
              <p className="text-xs tracking-[0.16em] uppercase text-[#1E1854]/40 font-medium">What We Believe</p>
              <h2 className="text-3xl md:text-4xl font-semibold tracking-[-0.02em] leading-tight">
                Conviction,<br />not aspiration.
              </h2>
              <p className="text-sm text-[hsla(var(--color-secondary)/0.65)] leading-relaxed">
                They are the beliefs that drove three years of research before we launched a single product.
              </p>
              <div className="relative aspect-[4/3] rounded-2xl overflow-hidden ring-1 ring-[#1E1854]/[0.08] shadow-xl shadow-[#1E1854]/[0.06]">
                <Image
                  src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=900&q=85&auto=format&fit=crop"
                  alt="Philosophy"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
            </div>
            <div className="grid grid-cols-1 gap-3">
              {beliefs.filter((_, i) => i !== 3).map((b, i) => (
                <div key={b.text.slice(0, 40)} className="group rounded-2xl border border-[#1E1854]/[0.07] bg-white shadow-sm shadow-[#1E1854]/[0.04] hover:shadow-lg hover:shadow-[#1E1854]/[0.08] hover:-translate-y-0.5 transition-all duration-500 p-5 flex items-start gap-4">
                  <span className="shrink-0 mt-0.5 w-7 h-7 rounded-full bg-gradient-to-br from-[#1E1854] to-[#2d2a7a] flex items-center justify-center text-xs font-semibold text-white/60 tabular-nums">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <p className="text-sm text-[#1E1854] leading-relaxed font-medium pt-0.5">{b.text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Core principles */}
      <section className="bg-white border-t border-[#1E1854]/[0.06]">
        <div className="max-w-[1200px] mx-auto px-6 py-16 md:py-24">
          <div className="mb-12 space-y-2">
            <p className="text-xs tracking-[0.16em] uppercase text-[#1E1854]/40 font-medium">Non-Negotiables</p>
            <h2 className="text-3xl md:text-4xl font-semibold tracking-[-0.02em]">Our six principles.</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {principles.map((p) => (
              <div key={p.number} className="group rounded-2xl bg-[#F8F8FC] border border-[#1E1854]/[0.07] hover:border-[#1E1854]/[0.14] hover:shadow-lg hover:shadow-[#1E1854]/[0.07] hover:-translate-y-0.5 transition-all duration-500 p-7 space-y-3">
                <p className="text-xs font-mono tracking-[0.12em] text-[#1E1854]/25">{p.number}</p>
                <h3 className="text-base font-semibold text-[#1E1854] tracking-[-0.01em]">{p.title}</h3>
                <p className="text-sm text-[hsla(var(--color-secondary)/0.65)] leading-relaxed">{p.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* The standard */}
      <section className="bg-white border-t border-[#1E1854]/[0.06]">
        <div className="max-w-[1200px] mx-auto px-6 py-16 md:py-24 grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 items-center">
          <div className="relative aspect-[4/3] rounded-2xl overflow-hidden order-last md:order-first ring-1 ring-[#1E1854]/[0.08] shadow-xl shadow-[#1E1854]/[0.06]">
            <Image
              src="https://images.unsplash.com/photo-1596078842550-f9b9bdd7bdc7?w=900&q=85&auto=format&fit=crop"
              alt="Standard"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>
          <div className="space-y-6">
            <p className="text-xs tracking-[0.16em] uppercase text-[#1E1854]/40 font-medium">The Standard</p>
            <h2 className="text-3xl md:text-4xl font-semibold tracking-[-0.02em] leading-tight">
              If we wouldn&apos;t take it ourselves,<br />we don&apos;t sell it.
            </h2>
            <p className="text-sm text-[hsla(var(--color-secondary)/0.7)] leading-relaxed">
              Every member of the Flow team uses the product daily. That is not a marketing claim — it is the simplest quality test we have. When the people making the product are also the people taking it, the incentives align perfectly.
            </p>
            <p className="text-sm text-[hsla(var(--color-secondary)/0.7)] leading-relaxed">
              We ask ourselves one question before every decision: would we be comfortable explaining this to a customer who holds us fully accountable? If not, we don&apos;t do it.
            </p>
          </div>
        </div>
      </section>

      {/* Product CTA */}
      <section className="bg-white border-t border-[#1E1854]/[0.06]">
        <div className="max-w-[1200px] mx-auto px-6 py-12 md:py-16">
          <div className="bg-gradient-to-br from-[#1E1854] to-[#2d2a7a] rounded-3xl px-10 py-14 flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
            <div>
              <p className="text-xs tracking-[0.16em] uppercase text-white/40 font-medium mb-3">Put it into practice</p>
              <p className="text-2xl md:text-3xl font-semibold tracking-[-0.02em] text-white max-w-lg leading-snug">
                The philosophy behind Flow, now in one daily formula.
              </p>
            </div>
            <Link
              href="/products/flow"
              className="shrink-0 inline-flex items-center gap-2 bg-white text-[#1E1854] text-xs tracking-[0.1em] uppercase font-semibold px-7 py-4 rounded-full hover:bg-[hsla(var(--color-accent)/1)] hover:text-white transition-colors"
            >
              Shop Flow
            </Link>
          </div>
        </div>
      </section>

      {/* Nav links */}
      <section className="max-w-[1200px] mx-auto px-6 py-20">
        <div className="space-y-5">
          <h2 className="text-2xl font-semibold tracking-[-0.02em]">Continue your research</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Shop Flow CTA card */}
            <div className="relative rounded-2xl overflow-hidden h-[320px] flex flex-col justify-end p-7 gap-4">
              <Image src={productImageUrl || '/hero-lifestyle.png'} alt="Flow product" fill className="object-cover" sizes="(max-width: 768px) 100vw, 33vw" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#1E1854]/85 via-[#1E1854]/30 to-transparent" />
              <div className="relative z-10 flex flex-col gap-4">
                <h3 className="text-lg font-semibold tracking-[-0.02em] text-white leading-snug">
                  Every ingredient above, in one daily formula.
                </h3>
                <Link href="/products/flow" className="self-start inline-flex items-center justify-center bg-white text-[#1E1854] text-xs tracking-[0.1em] uppercase font-semibold px-5 py-3 rounded-full hover:bg-[hsla(var(--color-accent)/1)] hover:text-white transition-colors">
                  Shop Flow
                </Link>
              </div>
            </div>

            {/* Nav link cards */}
            {[
              { label: 'Who We Are', description: 'Meet the team behind Flow and the story that started it all.', href: '/pages/who-we-are', image: 'https://images.unsplash.com/photo-1552196563-55cd4e45efb3?w=700&q=80&auto=format&fit=crop' },
              { label: 'Our Product', description: 'Inside the formula — every ingredient and why it matters.', href: '/pages/our-product', image: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=700&q=80&auto=format&fit=crop' },
            ].map((card) => (
              <Link key={card.label} href={card.href} className="group relative rounded-2xl overflow-hidden h-[320px] flex items-end">
                <Image src={card.image} alt={card.label} fill className="object-cover transition-transform duration-500 group-hover:scale-105" sizes="(max-width: 768px) 100vw, 33vw" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/45 to-black/10" />
                <div className="relative z-10 p-7 space-y-1">
                  <h3 className="text-lg font-semibold text-white">{card.label}</h3>
                  <p className="text-xs text-white/80 leading-snug">{card.description}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

    </main>
  );
}
