// Shopify Admin API — order verification for ritual eligibility

const ELIGIBLE_SKUS = (process.env.SHOPIFY_ELIGIBLE_SKU ?? 'KORR_FLOW_RHP_01')
  .split(',')
  .map(s => s.trim());

interface ShopifyOrder {
  id: number;
  email: string;
  financial_status: string;
  cancelled_at: string | null;
  line_items: Array<{
    sku: string;
    quantity: number;
  }>;
}

interface ShopifyOrdersResponse {
  orders: ShopifyOrder[];
}

async function fetchOrders(email: string): Promise<ShopifyOrder[]> {
  const store = process.env.SHOPIFY_STORE_DOMAIN;
  const token = process.env.SHOPIFY_ADMIN_ACCESS_TOKEN;
  if (!store || !token) throw new Error('Missing Shopify admin credentials');

  const url = `https://${store}/admin/api/2024-01/orders.json?email=${encodeURIComponent(email)}&status=any&limit=10`;
  const res = await fetch(url, {
    headers: {
      'X-Shopify-Access-Token': token,
      'Content-Type': 'application/json',
    },
    next: { revalidate: 0 }, // never cache — always fresh
  });

  if (!res.ok) {
    throw new Error(`Shopify API error: ${res.status}`);
  }

  const data = (await res.json()) as ShopifyOrdersResponse;
  return data.orders ?? [];
}

export interface VerificationResult {
  eligible: boolean;
  orderId: string | null;
}

export async function verifyRitualEligibility(email: string): Promise<VerificationResult> {
  try {
    const orders = await fetchOrders(email);

    for (const order of orders) {
      if (order.cancelled_at) continue;
      if (order.financial_status === 'refunded' || order.financial_status === 'voided') continue;

      const hasEligibleSku = order.line_items.some(item =>
        ELIGIBLE_SKUS.includes(item.sku)
      );

      if (hasEligibleSku) {
        return { eligible: true, orderId: String(order.id) };
      }
    }

    return { eligible: false, orderId: null };
  } catch (err) {
    console.error('[shopify-admin] verifyRitualEligibility error:', err);
    // Fail closed — don't grant access on API error
    return { eligible: false, orderId: null };
  }
}
