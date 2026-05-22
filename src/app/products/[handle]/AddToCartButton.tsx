'use client';

import { useState } from 'react';
import { trackEvent } from '@/lib/clarity';
import { ga4AddToCart, ga4BeginCheckout } from '@/lib/ga4';

interface AddToCartButtonProps {
  variantId: string;
  productName?: string;
  price?: number;
  currencyCode?: string;
}

export default function AddToCartButton({ variantId, productName = 'Flow', price = 0, currencyCode = 'CHF' }: AddToCartButtonProps) {
  const [loading, setLoading] = useState(false);

  async function handleCheckout() {
    setLoading(true);
    trackEvent('product_page_buy_now');
    const item = { item_id: variantId, item_name: productName, price, currency: currencyCode, item_brand: 'Flow Health', item_category: 'Supplement' };
    ga4AddToCart(item);
    try {
      const res = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ variantId, quantity: 1 }),
      });
      const { url } = await res.json();
      trackEvent('product_page_checkout_redirected');
      ga4BeginCheckout(item);
      window.location.href = url;
    } catch (e) {
      console.error(e);
      setLoading(false);
    }
  }

  return (
    <button
      onClick={handleCheckout}
      disabled={loading}
      className="btn-cta w-full text-white text-xs tracking-[0.12em] uppercase py-4 rounded-full disabled:opacity-40"
    >
      {loading ? 'Redirecting...' : 'Get Flow'}
    </button>
  );
}
