import { NextResponse } from 'next/server';
import { getFirstProductHandle } from '@/lib/shopify';

export async function GET() {
  const handle = await getFirstProductHandle();
  return NextResponse.json({ handle: handle ?? 'flow' });
}
