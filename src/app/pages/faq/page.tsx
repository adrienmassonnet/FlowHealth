import type { Metadata } from 'next';
import TrackedLink from '@/app/components/TrackedLink';
import { FAQ } from '@/components/ui/faq-tabs';
import { getFaqItems } from '@/lib/content';
import { faqCategories as categories } from '@/lib/content-data';

export const metadata: Metadata = {
  title: 'FAQ',
  description: 'Answers to common questions about Flow: product formula, usage & dosage, shipping, returns, and safety.',
  openGraph: {
    title: 'Flow FAQ: Frequently Asked Questions',
    description: 'Answers to common questions about Flow: product formula, usage & dosage, shipping, returns, and safety.',
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
        <div className="flow-container pt-20 md:pt-24 pb-16 md:pb-24">
          {/* Heading */}
          <div className="max-w-2xl mb-10">
            <p className="text-xs tracking-[0.16em] uppercase font-semibold bg-gradient-to-r from-brand to-ink bg-clip-text text-transparent mb-4">Support</p>
            <h1 className="flow-h1 flow-h1--hero">
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
        <div className="flow-container pb-16">
          <div className="bg-ink/[3.1%] rounded-2xl px-8 md:px-12 py-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div>
              <p className="text-base font-semibold tracking-[-0.01em] mb-1">Still have questions?</p>
              <p className="text-sm text-[rgb(30,24,84)]">Our team typically responds within one business day.</p>
            </div>
            <TrackedLink
              href="/pages/contact"
              clarityEvent="faq_contact_us"
              className="btn-cta shrink-0 inline-flex items-center gap-2 text-white flow-label px-6 py-3.5 rounded-full"
            >
              Contact us
            </TrackedLink>
          </div>
        </div>
      </section>
    </main>
  );
}
