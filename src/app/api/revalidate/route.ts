import { revalidateTag } from 'next/cache';
import { type NextRequest } from 'next/server';
import { warmCacheContextForRevalidate } from '@/lib/content';

// Contentful webhook → per-content-type cache invalidation.
// Setup in Contentful: Settings → Webhooks → Add
//   URL: https://<your-domain>/api/revalidate
//   Triggers: Entry published, Entry unpublished, Asset published
//   Header: x-contentful-webhook-secret: <CONTENTFUL_WEBHOOK_SECRET>
//
// content.ts resolvers are cached via unstable_cache with tags of the form
// `contentful:<contentTypeId>`. An Entry event tells us exactly which content
// type changed, so we revalidate only that tag. Asset events don't carry a
// content type (an asset can be referenced by entries of any type), so we
// fall back to revalidating every known tag on asset publish — broader than
// ideal, but still far narrower than the previous whole-layout revalidation.
//
// warmCacheContextForRevalidate() must run before any revalidateTag() call —
// confirmed by isolated testing that revalidateTag silently fails to persist
// its invalidation to later requests otherwise. See content.ts for detail.

const KNOWN_CONTENT_TYPE_TAGS = [
  'healthBenefit',
  'productHero',
  'ingredient',
  'testimonial',
  'resultsTimelineStep',
  'takeFlowStep',
  'productMeta',
  'contentTag',
].map((type) => `contentful:${type}`);

export async function POST(req: NextRequest) {
  const secret = req.headers.get('x-contentful-webhook-secret');

  if (secret !== process.env.CONTENTFUL_WEBHOOK_SECRET) {
    return Response.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const body = await req.json().catch(() => null);
  const sysType = body?.sys?.type as string | undefined;
  const contentTypeId = body?.sys?.contentType?.sys?.id as string | undefined;

  await warmCacheContextForRevalidate();

  if (sysType === 'Asset') {
    for (const tag of KNOWN_CONTENT_TYPE_TAGS) revalidateTag(tag, { expire: 0 });
    return Response.json({ revalidated: true, scope: 'asset-fallback-all', timestamp: Date.now() });
  }

  if (!contentTypeId) {
    return Response.json({ error: 'missing_content_type' }, { status: 400 });
  }

  revalidateTag(`contentful:${contentTypeId}`, { expire: 0 });

  return Response.json({ revalidated: true, tag: `contentful:${contentTypeId}`, timestamp: Date.now() });
}
