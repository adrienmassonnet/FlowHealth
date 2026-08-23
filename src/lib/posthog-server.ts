import { PostHog } from 'posthog-node';

let _client: PostHog | null = null;

function getClient(): PostHog | null {
  if (!_client) {
    const key = process.env.NEXT_PUBLIC_POSTHOG_KEY;
    const host = process.env.NEXT_PUBLIC_POSTHOG_HOST;
    if (!key || !host) {
      if (process.env.NODE_ENV === 'development') {
        const variable = !key ? 'NEXT_PUBLIC_POSTHOG_KEY' : 'NEXT_PUBLIC_POSTHOG_HOST';
        throw new Error(
          `${variable} variable required by PostHog is missing or un-configured, this causes events to be silently missed. This error stops appearing once ${variable} is configured`
        );
      }
      return null;
    }
    _client = new PostHog(key, { host, flushAt: 1, flushInterval: 0 });
  }
  return _client;
}

type ServerEventName =
  // Daily Ritual (retention)
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
  | 'magic_link_fail'
  // Pre-launch (see TRACKING_PLAN.md §6.3, §9 — waitlist signup, not real
  // checkout; rename to 'checkout_started' once real checkout ships)
  | 'prelaunch_waitlist_joined'
  // Purchase funnel (see TRACKING_PLAN.md §6.4)
  | 'checkout_created'
  | 'order_completed'
  // Ritual engagement
  | 'ritual_review_submitted'
  | 'ritual_share_link_created'
  // Subscription lifecycle (see TRACKING_PLAN.md §6.5)
  | 'subscription_created'
  | 'subscription_paused'
  | 'subscription_cancelled'
  | 'subscription_resumed';

// Anonymous aggregate events only — no identify(), no alias(), no email as distinctId.
// Use a stable anonymous ID (fh_aid cookie, Supabase profile.id, or device token) so counts
// are deduplicated but no personal data is attached to PostHog persons.
export async function captureServerEvent(
  distinctId: string,
  event: ServerEventName,
  properties: Record<string, unknown> = {}
): Promise<void> {
  try {
    const client = getClient();
    if (!client) return;
    client.capture({ distinctId, event, properties });
    await client.flush();
  } catch (err) {
    console.error('[posthog] capture error:', err);
  }
}
