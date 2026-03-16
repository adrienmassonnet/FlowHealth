import Image from 'next/image';
import Link from 'next/link';
import { getIngredients } from '@/lib/contentful';

const highlights = [
  { value: '13', unit: 'Active ingredients', description: 'Each chosen for clinical evidence, not marketing appeal.' },
  { value: '0', unit: 'Proprietary blends', description: 'Every dose is disclosed. No hidden fillers or trace amounts.' },
  { value: '30+', unit: 'Clinical studies', description: 'The evidence base behind our core ingredient stack.' },
  { value: 'Swiss', unit: 'GMP certified', description: 'Manufactured to pharmaceutical-grade standards in Switzerland.' },
];

const formats = [
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
        <rect x="9" y="5" width="10" height="18" rx="3" stroke="currentColor" strokeWidth="1.4"/>
        <path d="M12 9h4M12 13h4M12 17h2" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
      </svg>
    ),
    title: 'Capsule form',
    description: 'Delayed-release vegetarian capsules for optimal absorption. No fillers, no anti-caking agents, no unnecessary additives.',
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
        <path d="M7 14C7 10.134 10.134 7 14 7C17.866 7 21 10.134 21 14" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
        <path d="M7 14v5a2 2 0 002 2h10a2 2 0 002-2v-5" stroke="currentColor" strokeWidth="1.4"/>
        <path d="M14 14v4M11 17l3-3 3 3" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    title: '30-day supply',
    description: 'Two capsules daily with your morning meal. Designed for consistent daily use — benefits compound over 4–12 weeks.',
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
        <path d="M14 5L16.8 10.4L23 11.3L18.5 15.7L19.6 22L14 19L8.4 22L9.5 15.7L5 11.3L11.2 10.4L14 5Z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round"/>
      </svg>
    ),
    title: 'Third-party tested',
    description: 'Every batch is independently tested for purity, potency, and contaminants before it leaves the facility.',
  },
];

export default async function OurProductPage() {
  const ingredients = await getIngredients();
  return (
    <main>

      {/* Hero */}
      <section className="relative min-h-[60vh] flex items-end bg-[#1A1A18] overflow-hidden">
        <Image
          src="https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=1800&q=85&auto=format&fit=crop"
          alt="Our product"
          fill
          className="object-cover opacity-35"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#1A1A18] via-[#1A1A18]/50 to-transparent" />
        <div className="relative z-10 max-w-[1360px] mx-auto px-6 pb-20 md:pb-28">
          <p className="text-xs tracking-[0.14em] uppercase text-white/40 font-medium mb-4">About Flow</p>
          <h1 className="text-4xl md:text-6xl font-semibold tracking-[-0.03em] text-white leading-tight max-w-2xl">
            One formula.<br />Nothing hidden.
          </h1>
          <p className="mt-6 text-base text-white/60 max-w-md leading-relaxed">
            Flow is a complete daily cognitive supplement built around clinically dosed, peer-reviewed ingredients. Every milligram is on the label for a reason.
          </p>
        </div>
      </section>

      {/* Key numbers */}
      <section className="bg-white py-8">
        <div className="max-w-[1360px] mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-[var(--color-border)] bg-[#F8F8F8] rounded-2xl overflow-hidden">
          {highlights.map((h) => (
            <div key={h.unit} className="py-10 px-6 text-center space-y-1">
              <p className="text-3xl md:text-4xl font-semibold tracking-[-0.03em] text-[#1A1A18]">{h.value}</p>
              <p className="text-xs uppercase tracking-[0.1em] text-[hsla(var(--color-secondary)/0.5)] font-medium">{h.unit}</p>
              <p className="text-xs text-[hsla(var(--color-secondary)/0.5)] leading-snug hidden md:block">{h.description}</p>
            </div>
          ))}
        </div>
        </div>
      </section>

      {/* Formula overview */}
      <section className="max-w-[1360px] mx-auto px-6 py-20 md:py-28 grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
        <div className="space-y-6">
          <p className="text-xs tracking-[0.14em] uppercase text-[hsla(var(--color-secondary)/0.5)] font-medium">The Formula</p>
          <h2 className="text-3xl md:text-4xl font-semibold tracking-[-0.02em] leading-tight">
            Built for the long game.
          </h2>
          <div className="space-y-4 text-base text-[hsla(var(--color-secondary)/0.75)] leading-relaxed">
            <p>Most cognitive supplements are designed around one or two hero ingredients padded out with cheap fillers. Flow is built differently — every ingredient earns its place through clinical evidence, not marketing.</p>
            <p>The formula targets five domains simultaneously: memory consolidation, stress resilience, neuroplasticity, focused attention, and sleep quality. These systems are deeply interconnected — optimising all five compounds over time.</p>
            <p>You won&apos;t notice a spike on day one. You will notice that six weeks in, tasks feel easier, stress feels lighter, and focus feels more available on demand.</p>
          </div>
        </div>
        <div className="relative aspect-[4/3] rounded-2xl overflow-hidden">
          <Image
            src="https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=900&q=85&auto=format&fit=crop"
            alt="Formula"
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        </div>
      </section>

      {/* Ingredients */}
      <section className="bg-[#F8F8F8]">
        <div className="max-w-[1360px] mx-auto px-6 py-20">
          <div className="mb-12 space-y-2">
            <p className="text-xs tracking-[0.14em] uppercase text-[hsla(var(--color-secondary)/0.5)] font-medium">Key Ingredients</p>
            <h2 className="text-3xl md:text-4xl font-semibold tracking-[-0.02em]">What&apos;s inside Flow.</h2>
          </div>
          <div className="space-y-px border border-[var(--color-border)] rounded-2xl overflow-hidden">
            {ingredients.map((ing) => (
              <div key={ing.name} className="bg-white grid grid-cols-1 md:grid-cols-[80px_1fr_auto] gap-0 items-stretch">
                <div className="relative h-20 md:h-auto md:aspect-square overflow-hidden hidden md:block">
                  <Image src={ing.imageUrl ?? ''} alt={ing.imageAlt || ing.name} fill className="object-cover" sizes="80px" />
                </div>
                <div className="p-6 space-y-1">
                  <div className="flex flex-wrap items-center gap-3">
                    <h3 className="text-base font-semibold text-[#1A1A18] tracking-[-0.01em]">{ing.name}</h3>
                    <span className="text-[10px] uppercase tracking-[0.08em] border border-[var(--color-border)] px-2.5 py-0.5 rounded-full text-[hsla(var(--color-secondary)/0.5)] font-medium">{ing.category}</span>
                  </div>
                  <p className="text-xs text-[hsla(var(--color-secondary)/0.45)]">{ing.form}</p>
                  <p className="text-sm text-[hsla(var(--color-secondary)/0.65)] leading-relaxed pt-1">{ing.description}</p>
                </div>
                <div className="flex items-center px-6 border-t md:border-t-0 md:border-l border-[var(--color-border)]">
                  <div className="text-right">
                    <p className="text-xl font-semibold text-[#1A1A18] tracking-[-0.02em]">{ing.dose}</p>
                    <p className="text-xs text-[hsla(var(--color-secondary)/0.4)] uppercase tracking-[0.06em]">per serving</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <p className="mt-4 text-xs text-[hsla(var(--color-secondary)/0.4)] text-center">
            + 6 additional supporting ingredients including Alpha-GPC, B-complex vitamins, and Black Pepper extract for bioavailability.
          </p>
        </div>
      </section>

      {/* Format */}
      <section className="max-w-[1360px] mx-auto px-6 py-20">
        <div className="mb-12 space-y-2">
          <p className="text-xs tracking-[0.14em] uppercase text-[hsla(var(--color-secondary)/0.5)] font-medium">The Details</p>
          <h2 className="text-3xl md:text-4xl font-semibold tracking-[-0.02em]">Made right, from start to finish.</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {formats.map((f) => (
            <div key={f.title} className="space-y-4 p-8 bg-[#F8F8F8] rounded-2xl border border-[var(--color-border)]">
              <span className="text-[#1A1A18]">{f.icon}</span>
              <h3 className="text-lg font-semibold text-[#1A1A18]">{f.title}</h3>
              <p className="text-sm text-[hsla(var(--color-secondary)/0.65)] leading-relaxed">{f.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Promise */}
      <section className="bg-[#F8F8F8]">
        <div className="max-w-[1360px] mx-auto px-6 py-20 grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <div className="space-y-4">
            <p className="text-xs tracking-[0.14em] uppercase text-[hsla(var(--color-secondary)/0.5)] font-medium">Our Promise</p>
            <h2 className="text-3xl md:text-4xl font-semibold tracking-[-0.02em] leading-tight">
              Nothing hidden.<br />Nothing compromised.
            </h2>
            <p className="text-base text-[hsla(var(--color-secondary)/0.65)] leading-relaxed max-w-sm">
              We&apos;re here for the long haul, committed to supporting your journey toward a calmer mind, deeper focus, and a more fulfilling life.
            </p>
          </div>
          <ul className="space-y-4">
            {[
              'Clean, natural ingredients you can trust',
              'No artificial stimulants or hidden additives',
              'Clinically dosed — no pixie-dusting',
              'Third-party tested for purity and potency',
              'Sustainable packaging and responsible sourcing',
              'Honest communication — always',
            ].map((p) => (
              <li key={p} className="flex items-start gap-3">
                <span className="mt-0.5 shrink-0 w-5 h-5 rounded-full bg-[#1A1A18] flex items-center justify-center">
                  <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                    <path d="M2 5l2.5 2.5 4-4" stroke="white" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </span>
                <span className="text-sm text-[#1A1A18] leading-snug font-medium">{p}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-[#1A1A18] py-20">
        <div className="max-w-[720px] mx-auto px-6 text-center space-y-6">
          <h2 className="text-3xl md:text-4xl font-semibold tracking-[-0.02em] text-white leading-tight">
            Ready to experience it?
          </h2>
          <p className="text-base text-white/60 leading-relaxed">
            Try Flow for 30 days. If you don&apos;t notice a meaningful difference, we&apos;ll refund you. No questions asked.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/products/flow" className="inline-flex items-center gap-2 bg-white text-[#1A1A18] text-xs tracking-[0.1em] uppercase font-semibold px-8 py-4 rounded-full hover:bg-[hsla(var(--color-accent)/1)] hover:text-white transition-colors">
              Shop Flow
            </Link>
            <Link href="/pages/ingredients" className="inline-flex items-center gap-2 border border-white/30 text-white text-xs tracking-[0.1em] uppercase font-medium px-8 py-4 rounded-full hover:border-white/60 transition-colors">
              Full ingredients list
            </Link>
          </div>
        </div>
      </section>

      {/* Nav links */}
      <section className="max-w-[1360px] mx-auto px-6 py-20">
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
