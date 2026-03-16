import Image from 'next/image';
import Link from 'next/link';
import { getTeamMembers, getCompanyValues, getMilestones } from '@/lib/contentful';

const icons = [
  (
    <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
      <circle cx="14" cy="14" r="6" stroke="currentColor" strokeWidth="1.4"/>
      <path d="M14 6V4M14 24V22M6 14H4M24 14H22M8.34 8.34L6.93 6.93M21.07 21.07L19.66 19.66M8.34 19.66L6.93 21.07M21.07 6.93L19.66 8.34" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
    </svg>
  ),
  (
    <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
      <path d="M14 5L16.8 10.4L23 11.3L18.5 15.7L19.6 22L14 19L8.4 22L9.5 15.7L5 11.3L11.2 10.4L14 5Z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round"/>
    </svg>
  ),
  (
    <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
      <path d="M6 14H9L11 9L14 19L17 12L19 14H22" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),
  (
    <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
      <path d="M14 6V14M14 14C14 14 10 11 7 13M14 14C14 14 18 11 21 13M14 14V22" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),
  (
    <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
      <rect x="6" y="6" width="16" height="16" rx="2" stroke="currentColor" strokeWidth="1.4"/>
      <path d="M14 10V18M10 14H18" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
    </svg>
  ),
  (
    <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
      <circle cx="14" cy="11" r="4" stroke="currentColor" strokeWidth="1.4"/>
      <path d="M7 23C7 19.134 10.134 16 14 16C17.866 16 21 19.134 21 23" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
    </svg>
  ),
];

export default async function WhoWeArePage() {
  const [teamData, valuesData, milestonesData] = await Promise.all([getTeamMembers(), getCompanyValues(), getMilestones()]);
  const values = valuesData.map((v, i) => ({ ...v, icon: icons[i] }));
  return (
    <main>

      {/* Hero */}
      <section className="relative min-h-[60vh] flex items-end bg-[#1A1A18] overflow-hidden">
        <Image
          src="https://images.unsplash.com/photo-1552196563-55cd4e45efb3?w=1800&q=85&auto=format&fit=crop"
          alt="Who we are"
          fill
          className="object-cover opacity-35"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#1A1A18] via-[#1A1A18]/50 to-transparent" />
        <div className="relative z-10 max-w-[1360px] mx-auto px-6 pb-20 md:pb-28">
          <p className="text-xs tracking-[0.14em] uppercase text-white/40 font-medium mb-4">About Flow</p>
          <h1 className="text-4xl md:text-6xl font-semibold tracking-[-0.03em] text-white leading-tight max-w-2xl">
            A small team.<br />An uncompromising standard.
          </h1>
          <p className="mt-6 text-base text-white/60 max-w-md leading-relaxed">
            We are researchers, clinicians, and people who were frustrated enough to build something better. Flow is the product we couldn&apos;t find anywhere else.
          </p>
        </div>
      </section>

      {/* Origin story */}
      <section className="bg-[#1A1A18] py-20 md:py-28">
        <div className="max-w-[1360px] mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <div className="relative aspect-[4/3] rounded-2xl overflow-hidden order-last md:order-first">
            <Image
              src="https://images.unsplash.com/photo-1552196563-55cd4e45efb3?w=900&q=85&auto=format&fit=crop"
              alt="Origin story"
              fill
              className="object-cover opacity-80"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>
          <div className="space-y-6">
            <p className="text-xs tracking-[0.14em] uppercase text-white/40 font-medium">How We Started</p>
            <h2 className="text-3xl md:text-4xl font-semibold tracking-[-0.02em] leading-tight text-white">
              A personal struggle became a product.
            </h2>
            <div className="space-y-4 text-base text-white/60 leading-relaxed">
              <p>It started with years of ADHD-like symptoms, scattered focus, and deep frustration with a market full of overpromising, underdosing, and stimulant-reliant products.</p>
              <p>After honest conversations with researchers, practitioners, and people facing the same challenges, we spent three years formulating what we couldn&apos;t find: a clean, complete, clinically-dosed cognitive supplement with nothing to hide.</p>
              <p>Flow is small, independent, and based in Switzerland. We have no investors to please and no shortcuts to take. Every bottle reflects that.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Story intro */}
      <section className="max-w-[1360px] mx-auto px-6 py-20 md:py-28 grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
        <div className="space-y-6">
          <p className="text-xs tracking-[0.14em] uppercase text-[hsla(var(--color-secondary)/0.5)] font-medium">Our Story</p>
          <h2 className="text-3xl md:text-4xl font-semibold tracking-[-0.02em] leading-tight">
            Built by people who needed it first.
          </h2>
          <div className="space-y-4 text-base text-[hsla(var(--color-secondary)/0.75)] leading-relaxed">
            <p>Flow started with a conversation between a neuroscientist and a nutritionist who were both dealing with the same problem: a supplement market full of proprietary blends, underdosed ingredients, and claims with no clinical backing.</p>
            <p>We decided to do it differently. No investors, no shortcuts, no compromise on ingredients. We spent three years formulating before we sold a single bottle.</p>
            <p>Today, Flow is one of the most transparently dosed cognitive supplements on the market. Every ingredient, every source, every milligram — on the label.</p>
          </div>
        </div>
        <div className="relative aspect-[4/3] rounded-2xl overflow-hidden">
          <Image
            src="https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=900&q=85&auto=format&fit=crop"
            alt="Our story"
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        </div>
      </section>

      {/* Values grid */}
      <section className="bg-white">
        <div className="max-w-[1360px] mx-auto px-6 py-20">
          <div className="mb-12 space-y-2">
            <p className="text-xs tracking-[0.14em] uppercase text-[hsla(var(--color-secondary)/0.5)] font-medium">What We Stand For</p>
            <h2 className="text-3xl md:text-4xl font-semibold tracking-[-0.02em]">Our principles.</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-px bg-[var(--color-border)] border border-[var(--color-border)] rounded-2xl overflow-hidden">
            {values.map((v) => (
              <div key={v.title} className="bg-[#F8F8F8] p-8 space-y-4">
                <span className="text-[#1A1A18]">{v.icon}</span>
                <h3 className="text-base font-semibold text-[#1A1A18] tracking-[-0.01em]">{v.title}</h3>
                <p className="text-sm text-[hsla(var(--color-secondary)/0.65)] leading-relaxed">{v.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="bg-[#F8F8F8]">
        <div className="max-w-[1360px] mx-auto px-6 py-20">
          <div className="mb-12 space-y-2">
            <p className="text-xs tracking-[0.14em] uppercase text-[hsla(var(--color-secondary)/0.5)] font-medium">The People Behind Flow</p>
            <h2 className="text-3xl md:text-4xl font-semibold tracking-[-0.02em]">Meet the team.</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            {teamData.map((member) => (
              <div key={member.name} className="space-y-4">
                <div className="relative aspect-square rounded-2xl overflow-hidden bg-[#ECEEED]">
                  <Image
                    src={member.imageUrl}
                    alt={member.name}
                    fill
                    className="object-cover"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                </div>
                <div>
                  <p className="text-lg font-semibold text-[#1A1A18] tracking-[-0.01em]">{member.name}</p>
                  <p className="text-xs uppercase tracking-[0.08em] text-[hsla(var(--color-secondary)/0.5)] font-medium mt-0.5">{member.role}</p>
                  <p className="mt-3 text-sm text-[hsla(var(--color-secondary)/0.7)] leading-relaxed">{member.bio}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="bg-[#F8F8F8]">
        <div className="max-w-[1360px] mx-auto px-6 py-20">
          <div className="mb-12 space-y-2">
            <p className="text-xs tracking-[0.14em] uppercase text-[hsla(var(--color-secondary)/0.5)] font-medium">Our Journey</p>
            <h2 className="text-3xl md:text-4xl font-semibold tracking-[-0.02em]">How we got here.</h2>
          </div>
          <div className="relative pl-6 border-l border-[var(--color-border)] space-y-10">
            {milestonesData.map((m) => (
              <div key={m.year} className="relative">
                <span className="absolute -left-[25px] w-3 h-3 rounded-full border-2 border-[#1A1A18] bg-white top-1" />
                <p className="text-xs uppercase tracking-[0.1em] font-semibold text-[hsla(var(--color-secondary)/0.45)] mb-1">{m.year}</p>
                <h3 className="text-lg font-semibold text-[#1A1A18] mb-1">{m.label}</h3>
                <p className="text-sm text-[hsla(var(--color-secondary)/0.65)] leading-relaxed max-w-lg">{m.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Nav links */}
      <section className="max-w-[1360px] mx-auto px-6 pb-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            { label: 'Our Philosophy', description: 'The principles that guide every decision we make.', href: '/pages/our-philosophy', image: 'https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=700&q=80&auto=format&fit=crop' },
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
      </section>

    </main>
  );
}
