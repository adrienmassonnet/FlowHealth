import { revalidatePath } from 'next/cache';
import { type NextRequest } from 'next/server';

// Contentful webhook → Next.js on-demand ISR
// Setup in Contentful: Settings → Webhooks → Add
//   URL: https://<your-domain>/api/revalidate
//   Triggers: Entry published, Entry unpublished, Asset published
//   Header: x-contentful-webhook-secret: <CONTENTFUL_WEBHOOK_SECRET>

export async function POST(req: NextRequest) {
  const secret = req.headers.get('x-contentful-webhook-secret');

  if (secret !== process.env.CONTENTFUL_WEBHOOK_SECRET) {
    return Response.json({ error: 'Unauthorized' }, { status: 401 });
  }

  revalidatePath('/', 'layout');

  return Response.json({ revalidated: true, timestamp: Date.now() });
}
