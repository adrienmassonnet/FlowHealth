import { NextRequest, NextResponse } from 'next/server';
import { sendMilestoneReward } from '@/lib/ritual/klaviyo';

// Test-only route — fires the milestone reward email without touching Supabase.
// Remove or gate behind auth before going to production at scale.
export async function POST(req: NextRequest) {
  const secret = process.env.TEST_ROUTE_SECRET;
  const auth = req.headers.get('x-test-secret');
  if (!secret || auth !== secret) {
    return NextResponse.json({ error: 'unauthorized' }, { status: 401 });
  }

  const body = await req.json() as { email?: string };
  const email = (body.email ?? '').trim().toLowerCase();
  if (!email) return NextResponse.json({ error: 'missing_email' }, { status: 400 });

  await sendMilestoneReward(email, 'You completed the 10-day ritual.', process.env.MILESTONE_REWARD_CODE ?? 'DAILYRITUAL_GIFT');

  return NextResponse.json({ sent: true, email });
}
