import { NextRequest, NextResponse } from 'next/server';
import { createCheckout } from '@/lib/shopify';

export async function POST(req: NextRequest) {
  const { variantId, quantity } = await req.json();
  const url = await createCheckout(variantId, quantity);
  return NextResponse.json({ url });
}
