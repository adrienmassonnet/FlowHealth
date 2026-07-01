import { NextRequest, NextResponse } from 'next/server';
import { createCheckout } from '@/lib/shopify';
import { getPostHogClient } from '@/lib/posthog-server';

export async function POST(req: NextRequest) {
  const { variantId, quantity } = await req.json();
  const distinctId = req.headers.get('X-POSTHOG-DISTINCT-ID') ?? 'anonymous';
  const url = await createCheckout(variantId, quantity);

  const posthog = getPostHogClient();
  posthog.capture({
    distinctId,
    event: 'checkout_created',
    properties: {
      variant_id: variantId,
      quantity,
      $session_id: req.headers.get('X-POSTHOG-SESSION-ID') ?? undefined,
    },
  });

  return NextResponse.json({ url });
}
