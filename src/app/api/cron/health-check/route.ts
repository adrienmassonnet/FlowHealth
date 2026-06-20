import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const ALERT_EMAIL = 'adrien.massonnet@gmail.com';

// Thresholds that trigger an alert
const THRESHOLDS = {
  minVerifyRatePct: 40,   // OTP verify rate below 40% → alert
  minScansLast24h: 1,     // Zero valid scans in 24h → alert (after first user exists)
  maxDeviceConflictPct: 20, // >20% of events are device conflicts → alert
};

function getDb() {
  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) throw new Error('Missing Supabase env vars');
  return createClient(url, key, { auth: { persistSession: false } });
}

async function sendAlertEmail(issues: string[]): Promise<void> {
  const key = process.env.KLAVIYO_PRIVATE_API_KEY;
  if (!key) throw new Error('Missing KLAVIYO_PRIVATE_API_KEY');

  const payload = {
    data: {
      type: 'event',
      attributes: {
        metric: { data: { type: 'metric', attributes: { name: 'System Health Alert' } } },
        profile: { data: { type: 'profile', attributes: { email: ALERT_EMAIL } } },
        properties: {
          alert_count: issues.length,
          issues: issues.join('\n'),
          checked_at: new Date().toISOString(),
          dashboard_url: 'https://supabase.com/dashboard/project/_/editor',
        },
        time: new Date().toISOString(),
      },
    },
  };

  const res = await fetch('https://a.klaviyo.com/api/events/', {
    method: 'POST',
    headers: {
      Authorization: `Klaviyo-API-Key ${key}`,
      'Content-Type': 'application/json',
      revision: '2024-02-15',
    },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Klaviyo error ${res.status}: ${text}`);
  }
}

export async function GET(req: NextRequest) {
  const authHeader = req.headers.get('authorization');
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: 'unauthorized' }, { status: 401 });
  }

  const db = getDb();
  const issues: string[] = [];
  const metrics: Record<string, unknown> = {};

  try {
    // 1. Check OTP health for today
    const { data: otpRows } = await db
      .from('otp_requests')
      .select('used, locked_until, expires_at')
      .gte('created_at', new Date(Date.now() - 24 * 3600 * 1000).toISOString());

    if (otpRows && otpRows.length > 0) {
      const verified = otpRows.filter(r => r.used).length;
      const locked = otpRows.filter(r => r.locked_until).length;
      const verifyRate = Math.round((verified / otpRows.length) * 100);

      metrics.otp_requests_24h = otpRows.length;
      metrics.otp_verify_rate_pct = verifyRate;
      metrics.otp_locked_count = locked;

      if (verifyRate < THRESHOLDS.minVerifyRatePct) {
        issues.push(`OTP verify rate is ${verifyRate}% (threshold: ${THRESHOLDS.minVerifyRatePct}%) — users may be failing to authenticate`);
      }
      if (locked > 3) {
        issues.push(`${locked} users locked out of OTP in the last 24h — possible brute-force or UX confusion`);
      }
    }

    // 2. Check scan volume for today
    const { data: scanRows } = await db
      .from('scan_events')
      .select('outcome')
      .gte('scanned_at', new Date(Date.now() - 24 * 3600 * 1000).toISOString());

    if (scanRows) {
      const validScans = scanRows.filter(r => r.outcome === 'valid' || r.outcome === 'gap_return' || r.outcome === 'milestone').length;
      const conflicts = scanRows.filter(r => r.outcome === 'device_conflict').length;
      const conflictPct = scanRows.length > 0 ? Math.round((conflicts / scanRows.length) * 100) : 0;

      metrics.valid_scans_24h = validScans;
      metrics.device_conflicts_24h = conflicts;
      metrics.device_conflict_pct = conflictPct;

      // Only alert on zero scans if we have registered users (avoids noise pre-launch)
      const { count: userCount } = await db.from('profiles').select('*', { count: 'exact', head: true }).gt('sequence_position', 0);
      if ((userCount ?? 0) > 0 && validScans < THRESHOLDS.minScansLast24h) {
        issues.push(`Zero valid scans in the last 24h despite ${userCount} active users — QR or scan route may be broken`);
      }

      if (conflictPct > THRESHOLDS.maxDeviceConflictPct && conflicts > 2) {
        issues.push(`${conflictPct}% of scan events are device conflicts (${conflicts} events) — users may be switching devices or token binding is broken`);
      }
    }

    // 3. Check for recent server errors in scan events (unexpected outcomes)
    const { data: recentScans } = await db
      .from('scan_events')
      .select('outcome, scanned_at')
      .gte('scanned_at', new Date(Date.now() - 1 * 3600 * 1000).toISOString());

    metrics.events_last_1h = recentScans?.length ?? 0;

    console.log('[health-check]', { issues: issues.length, metrics });

    if (issues.length > 0) {
      await sendAlertEmail(issues);
      console.log(`[health-check] alert sent: ${issues.length} issue(s)`);
    }

    return NextResponse.json({
      status: issues.length === 0 ? 'healthy' : 'alert_sent',
      issues,
      metrics,
    });
  } catch (err) {
    console.error('[health-check] error:', err);
    // Alert on the health check itself failing
    try {
      await sendAlertEmail([`Health check cron itself failed: ${String(err)}`]);
    } catch {
      // swallow — can't do much more
    }
    return NextResponse.json({ error: 'server_error' }, { status: 500 });
  }
}
