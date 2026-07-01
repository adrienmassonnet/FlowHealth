import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { Suspense } from 'react';
import { getCampaign } from '@/app/lp/campaigns';
import UtmTracker from './UtmTracker';

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const campaign = getCampaign(slug);
  if (!campaign) return {};
  return {
    title: campaign.headline,
    description: campaign.subheadline,
    robots: { index: false, follow: false },
  };
}

export default async function LandingPage({ params }: Props) {
  const { slug } = await params;
  const campaign = getCampaign(slug);
  if (!campaign) notFound();

  return (
    <main className="min-h-screen bg-[#f4f4f9]">
      <Suspense>
        <UtmTracker campaignSlug={slug} />
      </Suspense>

      {/* Hero */}
      <section className="relative h-[60vh] min-h-[420px] flex items-end">
        <Image
          src={campaign.heroImage}
          alt=""
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#1E1854]/80 to-transparent" />
        <div className="relative z-10 max-w-2xl mx-auto px-6 pb-12 text-white">
          <p className="text-xs font-bold tracking-[0.14em] uppercase text-indigo-300 mb-3">Flow Health</p>
          <h1 className="text-4xl md:text-5xl font-semibold leading-tight tracking-tight mb-4">
            {campaign.headline}
          </h1>
          <p className="text-lg text-white/80 leading-relaxed">{campaign.subheadline}</p>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-white">
        <div className="max-w-2xl mx-auto px-6 py-12 text-center">
          <Link
            href={campaign.ctaUrl}
            className="inline-block rounded-full px-11 py-4 text-sm font-semibold uppercase tracking-[0.06em] text-white"
            style={{ background: 'linear-gradient(135deg,#3B38B8 0%,#1E1854 100%)' }}
          >
            {campaign.ctaText}
          </Link>
        </div>
      </section>
    </main>
  );
}