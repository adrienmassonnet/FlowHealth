'use client';

import { useEffect } from 'react';
import { useSearchParams } from 'next/navigation';

export default function UtmTracker({ campaignSlug }: { campaignSlug: string }) {
  const searchParams = useSearchParams();

  useEffect(() => {
    const utmSource = searchParams.get('utm_source') ?? undefined;
    const utmMedium = searchParams.get('utm_medium') ?? undefined;
    const utmCampaign = searchParams.get('utm_campaign') ?? undefined;

    fetch('/api/lp/track', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ slug: campaignSlug, utmSource, utmMedium, utmCampaign }),
    }).catch(() => {});
  }, [campaignSlug, searchParams]);

  return null;
}