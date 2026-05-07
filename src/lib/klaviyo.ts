const KLAVIYO_HEADERS = {
  'Content-Type': 'application/json',
  'revision': '2024-02-15',
  'Authorization': `Klaviyo-API-Key ${process.env.KLAVIYO_PRIVATE_API_KEY}`,
};

export async function trackKlaviyoEvent(
  email: string,
  eventName: string,
  properties: Record<string, unknown>
) {
  await fetch('https://a.klaviyo.com/api/events/', {
    method: 'POST',
    headers: KLAVIYO_HEADERS,
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
  acceptsMarketing: boolean
) {
  await fetch(`https://a.klaviyo.com/api/lists/${listId}/relationships/profiles/`, {
    method: 'POST',
    headers: KLAVIYO_HEADERS,
    body: JSON.stringify({
      data: [
        {
          type: 'profile',
          attributes: {
            email,
            subscriptions: {
              email: {
                marketing: {
                  consent: acceptsMarketing ? 'SUBSCRIBED' : 'UNSUBSCRIBED',
                },
              },
            },
          },
        },
      ],
    }),
  });
}