// Shopify Admin API — Subscriptions (requires Shopify Subscriptions app installed)
// Uses the Admin API, not the Storefront API, so calls are server-side only.

const ADMIN_URL = `https://${process.env.SHOPIFY_STORE_DOMAIN}/admin/api/2025-04/graphql.json`;

async function adminFetch(query: string, variables?: Record<string, unknown>) {
  const res = await fetch(ADMIN_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Shopify-Access-Token': process.env.SHOPIFY_ADMIN_ACCESS_TOKEN!,
    },
    body: JSON.stringify({ query, variables }),
  });
  if (!res.ok) throw new Error(`Shopify Admin API error: ${res.status}`);
  const { data, errors } = await res.json();
  if (errors?.length) throw new Error(errors[0].message);
  return data;
}

export interface ShopifySubscription {
  id: string;
  status: 'ACTIVE' | 'PAUSED' | 'CANCELLED' | 'FAILED' | 'EXPIRED';
  nextBillingDate: string;
  createdAt: string;
  lines: {
    edges: Array<{
      node: {
        id: string;
        productTitle: string;
        quantity: number;
        currentPrice: { amount: string; currencyCode: string };
        pricingPolicy: {
          cycleDiscounts: Array<{ adjustmentValue: { percentage?: number } }>;
          basePrice: { amount: string; currencyCode: string };
        };
        deliveryPolicy: {
          interval: string;
          intervalCount: number;
        };
      };
    }>;
  };
}

export async function getSubscriptionByEmail(email: string): Promise<ShopifySubscription | null> {
  const data = await adminFetch(`
    query GetSubscriptionByEmail($email: String!) {
      customers(first: 1, query: $email) {
        edges {
          node {
            subscriptionContracts(first: 1) {
              edges {
                node {
                  id
                  status
                  nextBillingDate
                  createdAt
                  lines(first: 5) {
                    edges {
                      node {
                        id
                        productTitle
                        quantity
                        currentPrice { amount currencyCode }
                        pricingPolicy {
                          cycleDiscounts { adjustmentValue { ... on SellingPlanPricingPolicyPercentageValue { percentage } } }
                          basePrice { amount currencyCode }
                        }
                        deliveryPolicy { interval intervalCount }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  `, { email });

  const contract = data?.customers?.edges?.[0]?.node?.subscriptionContracts?.edges?.[0]?.node;
  return contract ?? null;
}

export async function pauseSubscription(contractId: string): Promise<ShopifySubscription> {
  const data = await adminFetch(`
    mutation PauseSubscription($id: ID!) {
      subscriptionContractPause(subscriptionContractId: $id) {
        contract {
          id status nextBillingDate createdAt
          lines(first: 5) {
            edges {
              node {
                id productTitle quantity
                currentPrice { amount currencyCode }
                deliveryPolicy { interval intervalCount }
              }
            }
          }
        }
        userErrors { field message }
      }
    }
  `, { id: contractId });

  const { contract, userErrors } = data.subscriptionContractPause;
  if (userErrors?.length) throw new Error(userErrors[0].message);
  return contract;
}

export async function resumeSubscription(contractId: string): Promise<ShopifySubscription> {
  const data = await adminFetch(`
    mutation ResumeSubscription($id: ID!) {
      subscriptionContractActivate(subscriptionContractId: $id) {
        contract {
          id status nextBillingDate createdAt
          lines(first: 5) {
            edges {
              node {
                id productTitle quantity
                currentPrice { amount currencyCode }
                deliveryPolicy { interval intervalCount }
              }
            }
          }
        }
        userErrors { field message }
      }
    }
  `, { id: contractId });

  const { contract, userErrors } = data.subscriptionContractActivate;
  if (userErrors?.length) throw new Error(userErrors[0].message);
  return contract;
}

export async function cancelSubscription(contractId: string): Promise<ShopifySubscription> {
  const data = await adminFetch(`
    mutation CancelSubscription($id: ID!) {
      subscriptionContractCancel(subscriptionContractId: $id) {
        contract {
          id status nextBillingDate createdAt
          lines(first: 5) {
            edges {
              node {
                id productTitle quantity
                currentPrice { amount currencyCode }
                deliveryPolicy { interval intervalCount }
              }
            }
          }
        }
        userErrors { field message }
      }
    }
  `, { id: contractId });

  const { contract, userErrors } = data.subscriptionContractCancel;
  if (userErrors?.length) throw new Error(userErrors[0].message);
  return contract;
}