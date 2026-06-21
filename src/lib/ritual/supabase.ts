import { createClient } from '@supabase/supabase-js';

export type ScanOutcome = 'valid' | 'gap_return' | 'cooldown_rejected' | 'device_conflict' | 'milestone';

export interface Profile {
  id: string;
  email: string;
  shopify_order_id: string | null;
  sequence_position: number;
  last_scan_at: string | null;
  bound_device_token: string | null;
  gap_nudge_sent_at: string | null;
  entry_source: 'qr_scan' | 'magic_link' | 'direct' | null;
  otp_verified_at: string | null;
  referral_code: string | null;
  created_at: string;
  updated_at: string;
}

export interface OtpRequest {
  id: string;
  email: string;
  code_hash: string;
  expires_at: string;
  used: boolean;
  attempt_count: number;
  locked_until: string | null;
  created_at: string;
}

export interface DeviceToken {
  token: string;
  profile_id: string;
  created_at: string;
  last_seen_at: string;
}

export interface ScanEvent {
  id: string;
  profile_id: string;
  scanned_at: string;
  outcome: ScanOutcome;
  device_token: string | null;
  ip_hash: string | null;
  metadata: Record<string, unknown>;
}

function generateReferralCode(): string {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789'; // no O/0/I/1 ambiguity
  return Array.from({ length: 6 }, () => chars[Math.floor(Math.random() * chars.length)]).join('');
}

function getClient() {
  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) throw new Error('Missing SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY');
  return createClient(url, key, { auth: { persistSession: false } });
}

export const db = {
  profiles: {
    async findByEmail(email: string): Promise<Profile | null> {
      const { data } = await getClient()
        .from('profiles')
        .select('*')
        .eq('email', email.toLowerCase())
        .single();
      return data ?? null;
    },

    async findByDeviceToken(token: string): Promise<Profile | null> {
      const { data } = await getClient()
        .from('profiles')
        .select('*')
        .eq('bound_device_token', token)
        .single();
      return data ?? null;
    },

    async upsert(email: string, fields: Partial<Omit<Profile, 'id' | 'email' | 'created_at' | 'updated_at'>>): Promise<Profile> {
      const { data, error } = await getClient()
        .from('profiles')
        .upsert({ email: email.toLowerCase(), ...fields }, { onConflict: 'email' })
        .select()
        .single();
      if (error) throw error;
      return data;
    },

    async update(id: string, fields: Partial<Profile>): Promise<void> {
      const { error } = await getClient()
        .from('profiles')
        .update(fields)
        .eq('id', id);
      if (error) throw error;
    },

    async findByReferralCode(code: string): Promise<Profile | null> {
      const { data } = await getClient()
        .from('profiles')
        .select('*')
        .eq('referral_code', code.toUpperCase())
        .single();
      return data ?? null;
    },

    async ensureReferralCode(id: string): Promise<string> {
      // Return existing code or generate and persist a new one
      const { data } = await getClient()
        .from('profiles')
        .select('referral_code')
        .eq('id', id)
        .single();
      const existing = (data as { referral_code: string | null } | null)?.referral_code;
      if (existing) return existing;
      const code = generateReferralCode();
      await getClient().from('profiles').update({ referral_code: code }).eq('id', id);
      return code;
    },

    // Gap nudge cron: profiles with a valid scan, overdue for nudge, nudge not yet sent
    async findGapNudgeTargets(gapThresholdHours: number): Promise<Profile[]> {
      const threshold = new Date(Date.now() - gapThresholdHours * 3600 * 1000).toISOString();
      const { data, error } = await getClient()
        .from('profiles')
        .select('*')
        .gt('sequence_position', 0)
        .lt('last_scan_at', threshold)
        .is('gap_nudge_sent_at', null);
      if (error) throw error;
      return data ?? [];
    },
  },

  otpRequests: {
    async create(email: string, codeHash: string, expiresAt: Date): Promise<void> {
      const { error } = await getClient()
        .from('otp_requests')
        .insert({ email: email.toLowerCase(), code_hash: codeHash, expires_at: expiresAt.toISOString() });
      if (error) throw error;
    },

    async findLatest(email: string): Promise<OtpRequest | null> {
      const { data } = await getClient()
        .from('otp_requests')
        .select('*')
        .eq('email', email.toLowerCase())
        .eq('used', false)
        .gt('expires_at', new Date().toISOString())
        .order('created_at', { ascending: false })
        .limit(1)
        .single();
      return data ?? null;
    },

    async incrementAttempt(id: string, lockUntil?: Date): Promise<void> {
      const fields: Record<string, unknown> = { attempt_count: getClient().rpc };
      // Use raw update with increment
      const client = getClient();
      const { data: current } = await client.from('otp_requests').select('attempt_count').eq('id', id).single();
      const newCount = ((current as { attempt_count: number } | null)?.attempt_count ?? 0) + 1;
      const update: Record<string, unknown> = { attempt_count: newCount };
      if (lockUntil) update.locked_until = lockUntil.toISOString();
      await client.from('otp_requests').update(update).eq('id', id);
      void fields;
    },

    async markUsed(id: string): Promise<void> {
      const { error } = await getClient()
        .from('otp_requests')
        .update({ used: true })
        .eq('id', id);
      if (error) throw error;
    },

    async invalidatePrevious(email: string): Promise<void> {
      const { error } = await getClient()
        .from('otp_requests')
        .update({ used: true })
        .eq('email', email.toLowerCase())
        .eq('used', false);
      if (error) throw error;
    },
  },

  deviceTokens: {
    async upsert(token: string, profileId: string): Promise<void> {
      const { error } = await getClient()
        .from('device_tokens')
        .upsert({ token, profile_id: profileId, last_seen_at: new Date().toISOString() }, { onConflict: 'token' });
      if (error) throw error;
    },

    async findByToken(token: string): Promise<DeviceToken | null> {
      const { data } = await getClient()
        .from('device_tokens')
        .select('*')
        .eq('token', token)
        .single();
      return data ?? null;
    },

    async touch(token: string): Promise<void> {
      await getClient()
        .from('device_tokens')
        .update({ last_seen_at: new Date().toISOString() })
        .eq('token', token);
    },
  },

  scanEvents: {
    async insert(event: Omit<ScanEvent, 'id' | 'scanned_at'>): Promise<void> {
      const { error } = await getClient().from('scan_events').insert(event);
      if (error) throw error;
    },
  },

  referralClicks: {
    async record(referralCode: string, dayPosition: number, ipHash: string | null): Promise<void> {
      await getClient().from('referral_clicks').insert({
        referral_code: referralCode,
        day_position: dayPosition,
        ip_hash: ipHash,
        clicked_at: new Date().toISOString(),
      });
    },
  },
};
