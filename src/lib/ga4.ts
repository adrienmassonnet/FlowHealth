/* eslint-disable @typescript-eslint/no-explicit-any */
declare global {
  interface Window { gtag?: (...args: any[]) => void; }
}

interface GA4Item {
  item_id: string;
  item_name: string;
  price: number;
  currency: string;
  item_brand?: string;
  item_category?: string;
  quantity?: number;
  index?: number;
}

function gtag(...args: any[]) {
  window.gtag?.(...args);
}

export function ga4ViewItemList(items: GA4Item[], listName = 'Homepage') {
  gtag('event', 'view_item_list', {
    item_list_name: listName,
    items: items.map((item, i) => ({ ...item, index: item.index ?? i })),
  });
}

export function ga4SelectItem(item: GA4Item, listName = 'Homepage') {
  gtag('event', 'select_item', {
    item_list_name: listName,
    items: [item],
  });
}

export function ga4ViewItem(item: GA4Item) {
  gtag('event', 'view_item', {
    currency: item.currency,
    value: item.price,
    items: [{ ...item, quantity: 1 }],
  });
}

export function ga4AddToCart(item: GA4Item) {
  gtag('event', 'add_to_cart', {
    currency: item.currency,
    value: item.price,
    items: [{ ...item, quantity: 1 }],
  });
}

export function ga4BeginCheckout(item: GA4Item, purchaseType: 'subscribe' | 'one_time') {
  gtag('event', 'begin_checkout', {
    currency: item.currency,
    value: item.price,
    purchase_type: purchaseType,
    items: [{ ...item, quantity: 1 }],
  });
}

export function ga4SubscriptionEvent(action: 'pause_click' | 'cancel_click' | 'pause_confirm' | 'cancel_confirm' | 'resume' | 'reorder' | 'lookup', cancelReason?: string) {
  gtag('event', `subscription_${action}`, {
    ...(cancelReason ? { cancel_reason: cancelReason } : {}),
  });
}

export function ga4SelectContent(contentType: string, itemId: string) {
  gtag('event', 'select_content', { content_type: contentType, item_id: itemId });
}

export function ga4GenerateLead() {
  gtag('event', 'generate_lead');
}

export function ga4SignUp(method = 'pre_launch_modal') {
  gtag('event', 'sign_up', { method });
}