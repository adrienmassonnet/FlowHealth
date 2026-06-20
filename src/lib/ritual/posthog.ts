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

export async function captureServerEvent(
  distinctId: string,
  event: ServerEventName,
  properties: Record<string, unknown> = {}
): Promise<void> {
  try {
    getClient().capture({ distinctId, event, properties });
    await getClient().flush();
  } catch (err) {
    // Analytics must never crash the main flow
    console.error('[posthog] capture error:', err);
  }
}

export async function identifyProfile(email: string): Promise<void> {
  try {
    getClient().identify({ distinctId: email, properties: { email } });
    await getClient().flush();
  } catch (err) {
    console.error('[posthog] identify error:', err);
  }
}
