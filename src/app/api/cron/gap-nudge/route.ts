import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/ritual/supabase';
import { sendGapNudge } from '@/lib/ritual/klaviyo';
import { captureServerEvent } from '@/lib/ritual/posthog';

// Vercel Cron Job — runs every hour
// Finds profiles whose last scan was >96h ago and haven't received a nudge yet
// Configure in vercel.json: { "crons": [{ "path": "/api/cron/gap-nudge", "schedule": "0 * * * *" }] }

const GAP_HOURS = 96;
const CYCLE_LENGTH = 10;

export async function GET(req: NextRequest) {
  // Verify this is called by Vercel Cron (or authorized internally)
  const authHeader = req.headers.get('authorization');
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: 'unauthorized' }, { status: 401 });
  }

  try {
    const targets = await db.profiles.findGapNudgeTargets(GAP_HOURS);

    let sent = 0;
    let failed = 0;

    for (const profile of targets) {
      try {
        const daysCompleted = profile.sequence_position;
        const daysRemaining = Math.max(0, CYCLE_LENGTH - (daysCompleted % CYCLE_LENGTH));

        await sendGapNudge(profile.email, daysCompleted, daysRemaining);

        await db.profiles.update(profile.id, {
          gap_nudge_sent_at: new Date().toISOString(),
        });

        await captureServerEvent(profile.id, 'gap_nudge_sent', {
          email: profile.email,
          gap_hours: GAP_HOURS,
          days_completed: daysCompleted,
          days_remaining: daysRemaining,
        });

        sent++;
      } catch (err) {
        console.error(`[gap-nudge] failed for ${profile.email}:`, err);
        failed++;
      }
    }

    console.log(`[gap-nudge] sent=${sent} failed=${failed} total=${targets.length}`);
    return NextResponse.json({ sent, failed, total: targets.length });
  } catch (err) {
    console.error('[gap-nudge] cron error:', err);
    return NextResponse.json({ error: 'server_error' }, { status: 500 });
  }
}
