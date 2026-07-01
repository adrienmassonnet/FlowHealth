import { NextRequest, NextResponse } from 'next/server';
import { trackKlaviyoEvent } from '@/lib/klaviyo';
import { getCampaign } from '@/app/lp/campaigns';

export async function POST(req: NextRequest) {
  try {
    const { slug, utmSource, utmMedium, utmCampaign } = await req.json() as {
      slug?: string;
      utmSource?: string;
      utmMedium?: string;
      utmCampaign?: string;
    };

    if (!slug) return NextResponse.json({ ok: false }, { status: 400 });

    const campaign = getCampaign(slug);
    if (!campaign) return NextResponse.json({ ok: false }, { status: 404 });

    const klaviyoKey = process.env.KLAVIYO_PRIVATE_API_KEY;
    if (klaviyoKey) {
      await trackKlaviyoEvent('anonymous', campaign.klaviyoEvent, {
        slug,
        source: campaign.source,
        utmSource,
        utmMedium,
        utmCampaign,
      }).catch(() => {});
    }

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ ok: false }, { status: 500 });
  }
}