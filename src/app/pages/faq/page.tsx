import type { Metadata } from 'next';
import Link from 'next/link'; // used in bottom CTA
import { FAQ } from '@/components/ui/faq-tabs';
import { getFaqItems } from '@/lib/content';
import { faqCategories as categories } from '@/lib/content-data';

export const metadata: Metadata = {
  title: 'FAQ',
  description: 'Answers to common questions about Flow — product formula, usage & dosage, shipping, returns, and safety.',
  openGraph: {
    title: 'Flow FAQ — Frequently Asked Questions',
    description: 'Answers to common questions about Flow — product formula, usage & dosage, shipping, returns, and safety.',
  },
};

export default async function FaqPage({ searchParams }: { searchParams: Promise<{ category?: string }> }) {
  const { category } = await searchParams;
  const faqItems = await getFaqItems();

  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqItems.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: { '@type': 'Answer', text: item.answer },
    })),
  };

  const faqData = faqItems.reduce((acc, item) => {
    if (!acc[item.category]) acc[item.category] = [];
    acc[item.category].push({ question: item.question, answer: item.answer });
    return acc;
  }, {} as Record<string, { question: string; answer: string }[]>);

  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />

      {/* Hero + FAQ tabs — seamless section */}
      <section className="bg-white">
        <div className="max-w-[1200px] mx-auto px-6 pt-20 md:pt-24 pb-16 md:pb-24">
          {/* Heading */}
          <div className="max-w-2xl mb-10">
            <p className="text-xs tracking-[0.16em] uppercase font-semibold bg-gradient-to-r from-[#3B38B8] to-[#1E1854] bg-clip-text text-transparent mb-4">Support</p>
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-semibold tracking-[-0.03em] leading-[1.0]">
              Frequently asked<br />questions
            </h1>
          </div>

          {/* FAQ — no internal header */}
          <FAQ
            title=""
            subtitle=""
            categories={categories}
            faqData={faqData}
            initialCategory={category}
          />
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
