import Link from 'next/link';
import { FAQ } from '@/components/ui/faq-tabs';

const categories = {
  product: 'Product & Formula',
  usage: 'Usage & Dosage',
  shipping: 'Shipping & Orders',
  returns: 'Returns & Refunds',
  safety: 'Safety & Health',
};

const faqData = {
  product: [
    {
      question: 'What is Flow?',
      answer: 'Flow is a premium liquid nootropic supplement formulated to support sustained mental clarity, focus, and energy without the crash. Each bottle contains a precisely dosed blend of adaptogens, amino acids, functional mushrooms, vitamins, and plant extracts — delivered in a bioavailable liquid format for faster absorption.',
    },
    {
      question: 'What makes Flow different from other supplements?',
      answer: 'Most supplements come in capsule or powder form, which can take 45–60 minutes to absorb. Flow uses a liquid delivery system that reaches your bloodstream in as little as 15 minutes. We combine 13 clinically studied actives in one bottle, removing the need to manage multiple pills throughout the day.',
    },
    {
      question: 'What are the key ingredients?',
      answer: "Flow contains Ashwagandha KSM-66®, Lion's Mane mushroom, L-Theanine, Alpha-GPC, Rhodiola Rosea, Bacopa Monnieri, Vitamins B6 & B12, and Zinc. Every ingredient is transparently dosed — no proprietary blends, no hidden fillers.",
    },
    {
      question: 'Is Flow suitable for vegans?',
      answer: 'Yes. Flow is 100% vegan and free from animal-derived ingredients. It is also gluten-free and contains no artificial colours, sweeteners, or preservatives.',
    },
    {
      question: 'Are there any allergens?',
      answer: 'Flow is manufactured in a facility that processes tree nuts and soy. If you have severe allergies, please consult your healthcare provider before use. The formula itself does not contain gluten, dairy, eggs, or shellfish.',
    },
    {
      question: 'What does Flow taste like?',
      answer: 'Flow has a clean, lightly botanical taste — mildly sweet with herbal notes from Ashwagandha and Rhodiola. Most people take it straight from the bottle or mixed with a small glass of water.',
    },
  ],
  usage: [
    {
      question: 'How should I take Flow?',
      answer: 'Shake gently, then drink the entire 60 ml bottle. You can take it straight or mix it with water or a cold beverage. For best results, take it on an empty stomach in the morning.',
    },
    {
      question: 'When is the best time to take Flow?',
      answer: "We recommend taking Flow first thing in the morning, approximately 15–30 minutes before you begin work or your most demanding mental tasks. Morning intake aligns with your body's natural cortisol peak, amplifying the formula's effects on alertness and focus.",
    },
    {
      question: 'Can I take more than one bottle per day?',
      answer: 'Flow is designed as a once-daily supplement. We do not recommend exceeding one bottle per day. If you have specific health goals that require a higher intake, please speak with a healthcare professional.',
    },
    {
      question: 'How long until I feel the effects?',
      answer: 'The liquid format means most people notice increased alertness and clarity within 15–30 minutes. Full cognitive benefits from adaptogenic ingredients like Ashwagandha and Bacopa Monnieri build over 4–6 weeks of consistent daily use.',
    },
    {
      question: 'Can I take Flow with coffee or other caffeine sources?',
      answer: 'Yes. Flow does not contain caffeine, so it pairs well with your morning coffee or tea. The L-Theanine in the formula may even help smooth out any jitteriness from caffeine, promoting calm alertness.',
    },
    {
      question: 'Is it safe to take Flow alongside other supplements or medications?',
      answer: 'Flow is generally well-tolerated alongside common supplements. However, if you are taking prescription medication — particularly for blood pressure, anxiety, or mood — we recommend consulting your doctor before adding Flow to your routine.',
    },
  ],
  shipping: [
    {
      question: 'Which countries do you ship to?',
      answer: 'We currently ship to Switzerland, the European Union, the United Kingdom, and the United States. For a full list of destinations and associated costs, please visit our Shipping Policy page.',
    },
    {
      question: 'How long does delivery take?',
      answer: 'Swiss orders are typically delivered within 1–3 business days. EU and UK orders take 3–7 business days. US orders take 7–14 business days. All orders placed before 12:00 noon on a business day are dispatched the same day.',
    },
    {
      question: 'How do I track my order?',
      answer: "Once your order ships, you will receive a confirmation email with a tracking number and a link to the carrier's tracking page. If you haven't received this within 24 hours of ordering, please check your spam folder or contact us.",
    },
    {
      question: 'What if my order arrives damaged or incorrect?',
      answer: "We're sorry to hear that. Please contact us at hello@flowhealth.com within 48 hours of delivery with your order number and a photo of the issue. We will arrange a replacement or refund promptly.",
    },
  ],
  returns: [
    {
      question: 'What is your return policy?',
      answer: 'We offer a 30-day satisfaction guarantee. If you are not satisfied with your order for any reason, you may return unopened products within 30 days of receipt for a full refund. Opened bottles cannot be returned for hygiene reasons, but we review these cases individually.',
    },
    {
      question: 'How do I start a return?',
      answer: 'Email hello@flowhealth.com with your order number and reason for return. Our team will respond within 1 business day with instructions. Return shipping costs are covered by Flow Health for defective or incorrect items.',
    },
    {
      question: 'When will I receive my refund?',
      answer: 'Once we receive and inspect your return, refunds are processed within 3–5 business days. The funds will appear on your original payment method within 5–10 business days depending on your bank.',
    },
  ],
  safety: [
    {
      question: 'Is Flow safe for daily long-term use?',
      answer: 'Yes. All ingredients in Flow are dosed within safe, well-studied ranges for daily use. The formula is designed as a daily morning supplement, and clinical evidence supports the long-term safety of all actives. We recommend a one-week break every three months as good practice.',
    },
    {
      question: 'Are there any known side effects?',
      answer: 'Flow is well-tolerated by the vast majority of users. In rare cases, some individuals may experience mild digestive sensitivity during the first few days of use. This typically resolves as the body adjusts. If you experience any adverse reactions, discontinue use and consult a healthcare professional.',
    },
    {
      question: 'Who should not take Flow?',
      answer: 'Flow is not recommended for individuals under 18, pregnant or breastfeeding women, or those with known sensitivities to any listed ingredients. If you have a pre-existing medical condition or take prescription medication, please consult your doctor before use.',
    },
    {
      question: 'Does Flow contain stimulants or controlled substances?',
      answer: 'No. Flow contains no caffeine, no stimulants, and no controlled or banned substances. It is safe for competitive athletes and complies with WADA guidelines. All ingredients are naturally sourced and transparently disclosed.',
    },
  ],
};

export default async function FaqPage({ searchParams }: { searchParams: Promise<{ category?: string }> }) {
  const { category } = await searchParams;
  return (
    <main>
      {/* Hero */}
      <section className="bg-white">
        <div className="max-w-[1360px] mx-auto px-6 py-20 md:py-24">
          <div className="max-w-2xl">
            <p className="text-xs tracking-[0.14em] uppercase text-[hsla(var(--color-secondary)/0.5)] mb-4 font-medium">Support</p>
            <h1 className="text-5xl md:text-6xl font-semibold tracking-[-0.03em] leading-[1.0] mb-5">
              Frequently asked<br />questions
            </h1>
            <p className="text-base text-[hsla(var(--color-secondary)/1)] leading-[1.7]">
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
      <section className="bg-[#F8F8F8]">
        <div className="max-w-[1360px] mx-auto px-6 py-16 md:py-24">
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
      <section className="bg-[#1A1A18]">
        <div className="max-w-[1360px] mx-auto px-6 py-16 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div>
            <p className="text-xs tracking-[0.14em] uppercase text-white/40 font-medium mb-3">Ready to try Flow?</p>
            <p className="text-2xl md:text-3xl font-semibold tracking-[-0.02em] text-white max-w-lg leading-snug">
              13 actives. One daily formula. 30-day guarantee.
            </p>
          </div>
          <Link
            href="/products/flow"
            className="shrink-0 inline-flex items-center gap-2 bg-white text-[#1A1A18] text-xs tracking-[0.1em] uppercase font-semibold px-7 py-4 rounded-full hover:bg-[hsla(var(--color-accent)/1)] hover:text-white transition-colors"
          >
            Shop Flow
          </Link>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="bg-white">
        <div className="max-w-[1360px] mx-auto px-6 pb-16">
          <div className="bg-[#F8F8F8] rounded-2xl px-8 md:px-12 py-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div>
              <p className="text-base font-semibold tracking-[-0.01em] mb-1">Still have questions?</p>
              <p className="text-base text-[hsla(var(--color-secondary)/1)]">Our team typically responds within one business day.</p>
            </div>
            <Link
              href="/pages/contact"
              className="shrink-0 inline-flex items-center gap-2 bg-[#1A1A18] text-white text-xs tracking-[0.1em] uppercase font-semibold px-6 py-3.5 rounded-full hover:bg-[hsla(var(--color-accent)/1)] transition-colors"
            >
              Contact us
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
