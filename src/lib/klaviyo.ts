function klaviyoHeaders() {
  return {
    'Content-Type': 'application/json',
    'revision': '2024-02-15',
    'Authorization': `Klaviyo-API-Key ${process.env.KLAVIYO_PRIVATE_API_KEY}`,
  };
}

export async function trackKlaviyoEvent(
  email: string,
  eventName: string,
  properties: Record<string, unknown>
): Promise<Response> {
  return fetch('https://a.klaviyo.com/api/events/', {
    method: 'POST',
    headers: klaviyoHeaders(),
    body: JSON.stringify({
      data: {
        type: 'event',
        attributes: {
          metric: { data: { type: 'metric', attributes: { name: eventName } } },
          profile: { data: { type: 'profile', attributes: { email } } },
          properties,
          time: new Date().toISOString(),
        },
      },
    }),
  });
}

export async function subscribeToKlaviyoList(
  email: string,
  listId: string,
): Promise<Response> {
  // Step 1: upsert the profile and get its ID
  const profileRes = await fetch('https://a.klaviyo.com/api/profiles/', {
    method: 'POST',
    headers: klaviyoHeaders(),
    body: JSON.stringify({
      data: {
        type: 'profile',
        attributes: { email },
      },
    }),
  });

  let profileId: string | undefined;
  if (profileRes.ok || profileRes.status === 409) {
    const body = await profileRes.json();
    // 409 means profile already exists — id is in errors[0].meta.duplicate_profile_id
    profileId = profileRes.status === 409
      ? body.errors?.[0]?.meta?.duplicate_profile_id
      : body.data?.id;
  }

  if (!profileId) {
    console.error('[prelaunch] Could not get Klaviyo profile ID', await profileRes.text());
    return profileRes;
  }

  // Step 2: add profile to the list
  return fetch(`https://a.klaviyo.com/api/lists/${listId}/relationships/profiles/`, {
    method: 'POST',
    headers: klaviyoHeaders(),
    body: JSON.stringify({
      data: [{ type: 'profile', id: profileId }],
    }),
  });
}