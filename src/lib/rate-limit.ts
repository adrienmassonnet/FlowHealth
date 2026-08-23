const url = process.env.UPSTASH_REDIS_REST_URL;
const token = process.env.UPSTASH_REDIS_REST_TOKEN;

// Fixed-window limiter over Upstash's REST API — no client library needed for
// a single call site. Fails open (never blocks a request) if Upstash is
// unreachable or unconfigured, since this guards abuse, not correctness.
export async function isRateLimited(key: string, limit: number, windowSeconds: number): Promise<boolean> {
  if (!url || !token) return false;
  try {
    const res = await fetch(`${url}/pipeline`, {
      method: 'POST',
      headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
      body: JSON.stringify([
        ['INCR', key],
        ['EXPIRE', key, String(windowSeconds), 'NX'],
      ]),
    });
    if (!res.ok) return false;
    const [incr] = (await res.json()) as { result: number }[];
    return (incr?.result ?? 0) > limit;
  } catch (err) {
    console.error('[rate-limit] error', err);
    return false;
  }
}
