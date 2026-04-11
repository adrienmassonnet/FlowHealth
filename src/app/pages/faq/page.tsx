import type { Metadata } from 'next';
import Link from 'next/link';
import { FAQ } from '@/components/ui/faq-tabs';
import { getFaqItems, getProductMeta } from '@/lib/contentful';

export const metadata: Metadata = {
  title: 'FAQ',
  description: 'Answers to common questions about Flow — product formula, usage & dosage, shipping, returns, and safety.',
  openGraph: {
    title: 'Flow FAQ — Frequently Asked Questions',
    description: 'Answers to common questions about Flow — product formula, usage & dosage, shipping, returns, and safety.',
  },
};

const categories = {
  product: 'Product & Formula',
  usage: 'Usage & Dosage',
  shipping: 'Shipping & Orders',
  returns: 'Returns & Refunds',
  safety: 'Safety & Health',
};

export default async function FaqPage({ searchParams }: { searchParams: Promise<{ category?: string }> }) {
  const { category } = await searchParams;
  const [faqItems, meta] = await Promise.all([getFaqItems(), getProductMeta()]);
  const faqData = faqItems.reduce((acc, item) => {
    if (!acc[item.category]) acc[item.category] = [];
    acc[item.category].push({ question: item.question, answer: item.answer });
    return acc;
  }, {} as Record<string, { question: string; answer: string }[]>);
  return (
    <main>
      {/* Hero */}
      <section className="bg-white">
        <div className="max-w-[1200px] mx-auto px-6 py-20 md:py-24">
          <div className="max-w-2xl">
            <p className="text-xs tracking-[0.16em] uppercase text-[hsla(var(--color-secondary)/0.5)] mb-4 font-medium">Support</p>
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-semibold tracking-[-0.03em] leading-[1.0] mb-5">
              Frequently asked<br />questions
            </h1>
            <p className="text-sm text-[hsla(var(--color-secondary)/1)] leading-[1.7]">
              Everything you need to know about Flow.{' '}
              <Link href="/pages/contact" className="underline underline-offset-2 hover:text-[hsla(var(--color-accent)/1)] transition-colors">
                Contact us
              </Link>{' '}
              if you can&apos;t find what you&apos;re looking for.
            </p>
          </div>
        </div>
      </section>

      {/* FAQ tabs component */}
      <section className="bg-[#1E185408]">
        <div className="max-w-[1200px] mx-auto px-6 py-16 md:py-24">
        <FAQ
          title="Got questions?"
          subtitle="We have answers"
          categories={categories}
          faqData={faqData}
          initialCategory={category}
        />
        </div>
      </section>

      {/* Product CTA */}
      <section className="bg-[#1E1854]">
        <div className="max-w-[1200px] mx-auto px-6 py-16 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div>
            <p className="text-xs tracking-[0.16em] uppercase text-white/40 font-medium mb-3">Ready to try Flow?</p>
            <p className="text-2xl md:text-3xl font-semibold tracking-[-0.02em] text-white max-w-lg leading-snug">
              {meta.activeIngredients} actives. One daily formula. {meta.returnDays}-day guarantee.
            </p>
          </div>
          <Link
            href="/products/flow"
            className="shrink-0 inline-flex items-center gap-2 bg-white text-[#1E1854] text-xs tracking-[0.1em] uppercase font-semibold px-7 py-4 rounded-full hover:bg-[hsla(var(--color-accent)/1)] hover:text-white transition-colors"
          >
            Shop Flow
          </Link>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="bg-white">
        <div className="max-w-[1200px] mx-auto px-6 pb-16">
          <div className="bg-[#1E185408] rounded-2xl px-8 md:px-12 py-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div>
              <p className="text-base font-semibold tracking-[-0.01em] mb-1">Still have questions?</p>
              <p className="text-sm text-[hsla(var(--color-secondary)/1)]">Our team typically responds within one business day.</p>
            </div>
            <Link
              href="/pages/contact"
              className="btn-cta shrink-0 inline-flex items-center gap-2 text-white text-xs tracking-[0.1em] uppercase font-semibold px-6 py-3.5 rounded-full"
            >
              Contact us
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
