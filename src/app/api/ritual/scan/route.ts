import { NextRequest, NextResponse } from 'next/server';
import { processScan } from '@/lib/ritual/state-machine';
import { captureServerEvent } from '@/lib/ritual/posthog';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json() as { device_token?: string };
    const deviceToken = (body.device_token ?? '').trim();

    if (!deviceToken) {
      return NextResponse.json({ error: 'missing_device_token' }, { status: 400 });
    }

    const result = await processScan(deviceToken);

    // Fire PostHog server-side events — use Supabase profile.id as canonical distinctId
    const distinctId = result.profile?.id ?? deviceToken;
    const email = result.profile?.email;

    switch (result.state) {
      case 'already_checked_in':
        await captureServerEvent(distinctId, 'scan_rejected', {
          email,
          sequence_position: result.profile?.sequence_position,
        });
        break;
      case 'device_conflict':
        await captureServerEvent(distinctId, 'scan_device_conflict', { email });
        break;
      case 'gap_return':
        await captureServerEvent(distinctId, 'gap_return', {
          email,
          sequence_position: result.profile?.sequence_position,
          display_position: result.displayPosition,
        });
        break;
      case 'milestone':
        await captureServerEvent(distinctId, 'milestone_reached', {
          email,
          milestone_position: result.milestonePosition,
          sequence_position: result.profile?.sequence_position,
        });
        break;
      case 'daily_message':
      case 'first_time_success':
        await captureServerEvent(distinctId, 'scan_valid', {
          email,
          sequence_position: result.profile?.sequence_position,
          display_position: result.displayPosition,
          outcome: result.state,
        });
        break;
    }

    return NextResponse.json({
      state: result.state,
      display_position: result.displayPosition,
      sequence_position: result.profile?.sequence_position ?? 0,
      is_gap_return: result.isGapReturn,
      is_milestone: result.isMilestone,
      milestone_position: result.milestonePosition ?? null,
    });
  } catch (err) {
    console.error('[scan]', err);
    return NextResponse.json({ error: 'server_error' }, { status: 500 });
  }
}
