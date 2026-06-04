// Run once: node scripts/register-webhooks.mjs
// Registers Shopify subscription contract webhooks programmatically.

import { config } from 'dotenv';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
config({ path: resolve(__dirname, '../.env.local') });

const STORE_DOMAIN = process.env.SHOPIFY_STORE_DOMAIN;
const ACCESS_TOKEN = process.env.SHOPIFY_ADMIN_ACCESS_TOKEN;
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://www.flow-health.ch';
const WEBHOOK_URL = `${SITE_URL}/api/webhooks/shopify-subscriptions`;

const TOPICS = [
  'SUBSCRIPTION_CONTRACTS_CREATE',
  'SUBSCRIPTION_CONTRACTS_UPDATE',
];

async function registerWebhook(topic) {
  const res = await fetch(`https://${STORE_DOMAIN}/admin/api/2025-04/graphql.json`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Shopify-Access-Token': ACCESS_TOKEN,
    },
    body: JSON.stringify({
      query: `
        mutation RegisterWebhook($topic: WebhookSubscriptionTopic!, $url: URL!) {
          webhookSubscriptionCreate(topic: $topic, webhookSubscription: {
            format: JSON
            callbackUrl: $url
          }) {
            webhookSubscription { id topic callbackUrl }
            userErrors { field message }
          }
        }
      `,
      variables: { topic, url: WEBHOOK_URL },
    }),
  });

  const { data } = await res.json();
  const result = data?.webhookSubscriptionCreate;

  if (result?.userErrors?.length) {
    console.error(`❌ ${topic}:`, result.userErrors[0].message);
  } else {
    console.log(`✅ ${topic} → ${result.webhookSubscription.callbackUrl}`);
  }
}

for (const topic of TOPICS) {
  await registerWebhook(topic);
}