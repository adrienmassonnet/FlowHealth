import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/ritual/supabase';

// Read-only status check — does NOT advance sequence or consume daily scan.
// Used on page load to restore UI state for returning users.
export async function POST(req: NextRequest) {
  try {
    const body = await req.json() as { device_token?: string };
    const deviceToken = (body.device_token ?? '').trim();

    if (!deviceToken) {
      return NextResponse.json({ error: 'missing_device_token' }, { status: 400 });
    }

    const profile = await db.profiles.findByDeviceToken(deviceToken);

    if (!profile) {
      return NextResponse.json({ state: 'new_visitor' });
    }

    const COOLDOWN_HOURS = 21;
    const CYCLE_LENGTH = 10;

    function displayPos(seqPos: number) {
      if (seqPos === 0) return 1;
      return ((seqPos - 1) % CYCLE_LENGTH) + 1;
    }

    const hoursSinceScan = profile.last_scan_at
      ? (Date.now() - new Date(profile.last_scan_at).getTime()) / 3_600_000
      : null;

    const alreadyCheckedIn = hoursSinceScan !== null && hoursSinceScan < COOLDOWN_HOURS;

    const state = alreadyCheckedIn ? 'already_checked_in' : 'daily_message';
    const display_position = displayPos(profile.sequence_position);

    return NextResponse.json({
      state,
      display_position,
      sequence_position: profile.sequence_position,
    });
  } catch (err) {
    console.error('[status]', err);
    return NextResponse.json({ error: 'server_error' }, { status: 500 });
  }
}
