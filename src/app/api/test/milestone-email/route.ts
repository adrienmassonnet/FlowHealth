import { NextRequest, NextResponse } from 'next/server';
import { sendMilestoneReward } from '@/lib/ritual/klaviyo';

// Temporary test route — delete after Klaviyo metric is registered.
export async function POST(req: NextRequest) {
  const body = await req.json() as { email?: string };
  const email = (body.email ?? '').trim().toLowerCase();
  if (!email) return NextResponse.json({ error: 'missing_email' }, { status: 400 });

  await sendMilestoneReward(email, 'You completed the 10-day ritual.', process.env.MILESTONE_REWARD_CODE ?? 'DAILYRITUAL_GIFT');

  return NextResponse.json({ sent: true, email });
}
