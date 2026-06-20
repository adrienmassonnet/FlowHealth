import { PostHog } from 'posthog-node';

let _client: PostHog | null = null;

function getClient(): PostHog {
  if (!_client) {
    const key = process.env.POSTHOG_API_KEY;
    if (!key) throw new Error('Missing POSTHOG_API_KEY');
    _client = new PostHog(key, { host: 'https://eu.i.posthog.com', flushAt: 1, flushInterval: 0 });
  }
  return _client;
}

type ServerEventName =
  | 'otp_sent'
  | 'otp_verified'
  | 'otp_failed'
  | 'otp_locked'
  | 'scan_valid'
  | 'scan_rejected'
  | 'scan_device_conflict'
  | 'milestone_reached'
  | 'gap_nudge_sent'
  | 'gap_return'
  | 'shopify_order_not_found'
  | 'magic_link_success'
  | 'magic_link_fail';

// Use Supabase profile.id as distinctId when available.
// For pre-auth events (no profile yet), pass email as distinctId — PostHog
// will merge it once identifyProfile is called with the alias.
export async function captureServerEvent(
  distinctId: string,
  event: ServerEventName,
  properties: Record<string, unknown> = {}
): Promise<void> {
  try {
    getClient().capture({ distinctId, event, properties });
    await getClient().flush();
  } catch (err) {
    console.error('[posthog] capture error:', err);
  }
}

// Call once when a profile is confirmed (OTP verified or magic-link success).
// Sets the Supabase UUID as the canonical distinctId and links the email alias.
export async function identifyProfile(profileId: string, email: string): Promise<void> {
  try {
    // Identify with the Supabase UUID as canonical distinctId
    getClient().identify({
      distinctId: profileId,
      properties: { email, supabase_id: profileId },
    });
    // Alias the email → profileId so pre-auth events merge onto this person
    getClient().alias({ distinctId: profileId, alias: email });
    await getClient().flush();
  } catch (err) {
    console.error('[posthog] identify error:', err);
  }
}
