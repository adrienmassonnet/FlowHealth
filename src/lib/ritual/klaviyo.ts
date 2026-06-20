// Klaviyo transactional events for the ritual

const BASE = 'https://a.klaviyo.com/api';

async function track(eventName: string, email: string, properties: Record<string, unknown>) {
  const key = process.env.KLAVIYO_PRIVATE_API_KEY;
  if (!key) throw new Error('Missing KLAVIYO_PRIVATE_API_KEY');

  const payload = {
    data: {
      type: 'event',
      attributes: {
        metric: { data: { type: 'metric', attributes: { name: eventName } } },
        profile: { data: { type: 'profile', attributes: { email } } },
        properties,
        time: new Date().toISOString(),
      },
    },
  };

  const res = await fetch(`${BASE}/events/`, {
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

export async function sendOtp(email: string, code: string): Promise<void> {
  await track('QR OTP Sent', email, {
    code,
    expires_in_minutes: 10,
  });
}

export async function sendGapNudge(
  email: string,
  daysCompleted: number,
  daysRemaining: number
): Promise<void> {
  await track('QR Gap Nudge', email, {
    days_completed: daysCompleted,
    days_remaining: daysRemaining,
  });
}

export async function sendMilestoneReward(
  email: string,
  milestoneHeading: string,
  rewardCode: string | null
): Promise<void> {
  await track('QR Milestone Reached', email, {
    milestone_heading: milestoneHeading,
    reward_code: rewardCode ?? '',
  });
}
