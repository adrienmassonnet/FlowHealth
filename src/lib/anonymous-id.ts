import { cookies } from 'next/headers';
import { randomUUID } from 'crypto';

// First-party, stable-per-visitor ID — not tied to any personal data (TRACKING_PLAN.md §3/§4).
// Set once on first visit, read wherever we need to tie a later server-side event (e.g. an
// order webhook) back to the browser session that started it.
const COOKIE_NAME = 'fh_aid';
const COOKIE_MAX_AGE_SECONDS = 60 * 60 * 24 * 365;

export async function getOrCreateAnonymousId(): Promise<string> {
  const store = await cookies();
  const existing = store.get(COOKIE_NAME)?.value;
  if (existing) return existing;

  const id = randomUUID();
  store.set(COOKIE_NAME, id, {
    maxAge: COOKIE_MAX_AGE_SECONDS,
    httpOnly: false, // posthog-js (client SDK) needs to read this too, once installed in Phase 2
    sameSite: 'lax',
    path: '/',
  });
  return id;
}
