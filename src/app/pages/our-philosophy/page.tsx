import Image from 'next/image';
import Link from 'next/link';

const principles = [
  {
    number: '01',
    title: 'Science before marketing',
    body: 'Every claim we make is backed by peer-reviewed human clinical trials. We never cite animal studies or preclinical data as proof of efficacy. If the evidence isn\'t strong enough, the ingredient doesn\'t make the formula.',
  },
  {
    number: '02',
    title: 'Dose integrity',
    body: 'Proprietary blends exist to hide underdosing. We disclose every milligram because we dose at clinically effective levels — not at trace amounts that look good on a label. If you\'re paying for an ingredient, it should actually work.',
  },
  {
    number: '03',
    title: 'No stimulant dependency',
    body: 'We built Flow for sustainable clarity — not a spike and crash cycle. You should be able to miss a day without consequences. Cognitive enhancement should compound over time, not create reliance.',
  },
  {
    number: '04',
    title: 'Radical transparency',
    body: 'Every source, every form, every dose — disclosed. We will always tell you what\'s in our product, where it comes from, and why we chose it over alternatives. Hiding things is not something we are interested in.',
  },
  {
    number: '05',
    title: 'Swiss precision',
    body: 'We manufacture in Switzerland under GMP conditions that exceed most global standards. Not because it\'s a marketing point — because where and how a supplement is made directly affects its safety, consistency, and efficacy.',
  },
  {
    number: '06',
    title: 'Long-term thinking',
    body: 'Short-term cognitive enhancement is easy. We optimise for 6-month, 12-month, and lifetime cognitive health. That means neuroprotective compounds, not just stimulants. It means doing things the slow, right way.',
  },
];

const beliefs = [
  'The mind is the most important asset you have.',
  'Most people are operating far below their cognitive potential — not from lack of effort, but from poor nutrition, chronic stress, and overstimulation.',
  'High-quality supplementation is not a shortcut. It is infrastructure — the same way sleep, exercise, and diet are infrastructure.',
  'Transparency is not a brand value. It is a minimum standard.',
  'We believe in compounding — small, consistent inputs that build over months and years into something remarkable.',
];

export default function OurPhilosophyPage() {
  return (
    <main>

      {/* Hero */}
      <section className="relative min-h-[60vh] flex items-end bg-[#1A1A18] overflow-hidden">
        <Image
          src="https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=1800&q=85&auto=format&fit=crop"
          alt="Our philosophy"
          fill
          className="object-cover opacity-30"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#1A1A18] via-[#1A1A18]/50 to-transparent" />
        <div className="relative z-10 max-w-[1360px] mx-auto px-6 pb-20 md:pb-28">
          <p className="text-xs tracking-[0.14em] uppercase text-white/40 font-medium mb-4">About Flow</p>
          <h1 className="text-4xl md:text-6xl font-semibold tracking-[-0.03em] text-white leading-tight max-w-2xl">
            Built for minds that refuse to settle.
          </h1>
          <p className="mt-6 text-base text-white/60 max-w-md leading-relaxed">
            Flow started with a personal frustration — scattered focus, overstimulation, and a supplement market full of noise. We decided to build something better.
          </p>
        </div>
      </section>

      {/* Mission */}
      <section className="bg-white">
        <div className="max-w-[1360px] mx-auto px-6 py-20 md:py-28 grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <div className="space-y-6">
            <p className="text-xs tracking-[0.14em] uppercase text-[hsla(var(--color-secondary)/0.5)] font-medium">Our Mission</p>
            <h2 className="text-3xl md:text-4xl font-semibold tracking-[-0.02em] leading-tight">
              Restore balance.<br />Unlock clarity.
            </h2>
            <div className="space-y-4 text-base text-[hsla(var(--color-secondary)/0.75)] leading-relaxed">
              <p>At Flow, we believe true performance and lasting happiness come from within — from a calm, sustainable mind that lets you live with clarity, purpose, and joy.</p>
              <p>In a world that pushes constant hustle and overstimulation, we&apos;re here to help you restore balance and unlock the quiet strength already inside you.</p>
            </div>
          </div>
          <div className="relative aspect-[4/3] rounded-2xl overflow-hidden">
            <Image
              src="https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=900&q=85&auto=format&fit=crop"
              alt="Mission"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>
        </div>
      </section>

      {/* What we believe */}
      <section className="bg-[#F8F8F8]">
        <div className="max-w-[1360px] mx-auto px-6 py-20 md:py-28 grid grid-cols-1 md:grid-cols-2 gap-16 items-start">
          <div className="space-y-6 md:sticky md:top-28">
            <p className="text-xs tracking-[0.14em] uppercase text-[hsla(var(--color-secondary)/0.5)] font-medium">What We Believe</p>
            <h2 className="text-3xl md:text-4xl font-semibold tracking-[-0.02em] leading-tight">
              Conviction,<br />not aspiration.
            </h2>
            <p className="text-base text-[hsla(var(--color-secondary)/0.65)] leading-relaxed">
              These are not values we wrote for a brand deck. They are the beliefs that drove three years of research before we launched a single product.
            </p>
            <div className="relative aspect-[4/3] rounded-2xl overflow-hidden">
              <Image
                src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=900&q=85&auto=format&fit=crop"
                alt="Philosophy"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
          </div>
          <ul className="space-y-5">
            {beliefs.map((b) => (
              <li key={b.slice(0, 40)} className="flex items-start gap-4 py-5 border-b border-[var(--color-border)] last:border-0">
                <span className="shrink-0 mt-0.5 w-6 h-6 rounded-full bg-[#1A1A18] flex items-center justify-center">
                  <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                    <path d="M2 5l2.5 2.5 4-4" stroke="white" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </span>
                <p className="text-base text-[#1A1A18] leading-relaxed font-medium">{b}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Core principles */}
      <section className="bg-[#1A1A18] py-20 md:py-28">
        <div className="max-w-[1360px] mx-auto px-6">
          <div className="mb-14 space-y-2">
            <p className="text-xs tracking-[0.14em] uppercase text-white/40 font-medium">Non-Negotiables</p>
            <h2 className="text-3xl md:text-4xl font-semibold tracking-[-0.02em] text-white">Our six principles.</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-white/10 border border-white/10 rounded-2xl overflow-hidden">
            {principles.map((p) => (
              <div key={p.number} className="bg-[#1A1A18] p-8 space-y-4">
                <p className="text-xs font-mono tracking-[0.12em] text-white/25">{p.number}</p>
                <h3 className="text-lg font-semibold text-white tracking-[-0.01em]">{p.title}</h3>
                <p className="text-sm text-white/55 leading-relaxed">{p.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* The standard we hold ourselves to */}
      <section className="bg-white">
        <div className="max-w-[1360px] mx-auto px-6 py-20 md:py-28 grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <div className="relative aspect-[4/3] rounded-2xl overflow-hidden order-last md:order-first">
            <Image
              src="https://images.unsplash.com/photo-1596078842550-f9b9bdd7bdc7?w=900&q=85&auto=format&fit=crop"
              alt="Standard"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>
          <div className="space-y-6">
            <p className="text-xs tracking-[0.14em] uppercase text-[hsla(var(--color-secondary)/0.5)] font-medium">The Standard</p>
            <h2 className="text-3xl md:text-4xl font-semibold tracking-[-0.02em] leading-tight">
              If we wouldn&apos;t take it ourselves,<br />we don&apos;t sell it.
            </h2>
            <p className="text-base text-[hsla(var(--color-secondary)/0.7)] leading-relaxed">
              Every member of the Flow team uses the product daily. That is not a marketing claim — it is the simplest quality test we have. When the people making the product are also the people taking it, the incentives align perfectly.
            </p>
            <p className="text-base text-[hsla(var(--color-secondary)/0.7)] leading-relaxed">
              We ask ourselves one question before every decision: would we be comfortable explaining this to a customer who holds us fully accountable? If not, we don&apos;t do it.
            </p>
          </div>
        </div>
      </section>

      {/* Product CTA */}
      <section className="bg-[#1A1A18]">
        <div className="max-w-[1360px] mx-auto px-6 py-16 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div>
            <p className="text-xs tracking-[0.14em] uppercase text-white/40 font-medium mb-3">Put it into practice</p>
            <p className="text-2xl md:text-3xl font-semibold tracking-[-0.02em] text-white max-w-lg leading-snug">
              The philosophy behind Flow, now in one daily formula.
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

      {/* CTA links */}
      <section className="bg-white">
        <div className="max-w-[1360px] mx-auto px-6 pb-20">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              { label: 'Who We Are', description: 'Meet the team behind Flow and the story that started it all.', href: '/pages/who-we-are', image: 'https://images.unsplash.com/photo-1552196563-55cd4e45efb3?w=700&q=80&auto=format&fit=crop' },
              { label: 'Our Product', description: 'Inside the formula — every ingredient and why it matters.', href: '/pages/our-product', image: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=700&q=80&auto=format&fit=crop' },
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
        </div>
      </section>

    </main>
  );
}
