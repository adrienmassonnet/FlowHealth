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
  return fetch('https://a.klaviyo.com/api/profile-subscription-bulk-create-jobs/', {
    method: 'POST',
    headers: klaviyoHeaders(),
    body: JSON.stringify({
      data: {
        type: 'profile-subscription-bulk-create-job',
        attributes: {
          custom_source: 'Pre-Launch Popup',
          profiles: {
            data: [{
              type: 'profile',
              attributes: {
                email,
                subscriptions: {
                  email: { marketing: { consent: 'SUBSCRIBED' } },
                },
              },
            }],
          },
        },
        relationships: {
          list: { data: { type: 'list', id: listId } },
        },
      },
    }),
  });
}