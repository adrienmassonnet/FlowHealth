import { NextRequest, NextResponse } from 'next/server';
import { createClient } from 'contentful';

// Contentful content delivery — cached at edge, revalidated on publish webhook
const CACHE_SECONDS = 300; // 5 minutes; Contentful webhook will trigger ISR revalidation

function getContentfulClient() {
  const spaceId = process.env.CONTENTFUL_SPACE_ID;
  const token = process.env.CONTENTFUL_DELIVERY_TOKEN;
  if (!spaceId || !token) throw new Error('Missing Contentful credentials');
  return createClient({ space: spaceId, accessToken: token });
}

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ position: string }> }
) {
  try {
    const { position: positionStr } = await params;
    const position = parseInt(positionStr, 10);

    if (isNaN(position) || position < 1 || position > 10) {
      return NextResponse.json({ error: 'invalid_position' }, { status: 400 });
    }

    const client = getContentfulClient();

    const entries = await client.getEntries({
      content_type: 'ritualDay',
      'fields.dayNumber': position,
      include: 2, // include linked StorySlide entries
      limit: 1,
    });

    if (!entries.items.length) {
      return NextResponse.json({ error: 'not_found' }, { status: 404 });
    }

    const item = entries.items[0];
    const fields = item.fields as Record<string, unknown>;

    // Shape the response — decoupled from Contentful internals
    const day = {
      dayNumber: fields.dayNumber,
      eyebrow: fields.eyebrow,
      heading: fields.heading,
      bodyText: fields.bodyText,
      backgroundImageUrl: extractImageUrl(fields.backgroundImage),
      storySlides: extractSlides(fields.storySlides),
    };

    return NextResponse.json(day, {
      headers: {
        'Cache-Control': `public, s-maxage=${CACHE_SECONDS}, stale-while-revalidate=60`,
      },
    });
  } catch (err) {
    console.error('[content/day]', err);
    return NextResponse.json({ error: 'server_error' }, { status: 500 });
  }
}

function extractImageUrl(field: unknown): string | null {
  const f = field as { fields?: { file?: { url?: string } } } | null;
  return f?.fields?.file?.url ? `https:${f.fields.file.url}` : null;
}

function extractSlides(field: unknown): unknown[] {
  if (!Array.isArray(field)) return [];
  return field.map((slide) => {
    const s = slide as { fields?: Record<string, unknown> };
    const sf = s.fields ?? {};
    return {
      slideNumber: sf.slideNumber,
      eyebrow: sf.eyebrow,
      heading: sf.heading,
      subtext: sf.subtext,
      backgroundImageUrl: extractImageUrl(sf.backgroundImage),
      durationSeconds: sf.durationSeconds ?? 6,
    };
  });
}
