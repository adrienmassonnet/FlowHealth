'use client';

import { useState } from 'react';

export default function AddToCartButton({ variantId }: { variantId: string }) {
  const [loading, setLoading] = useState(false);

  async function handleCheckout() {
    setLoading(true);
    try {
      const res = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ variantId, quantity: 1 }),
      });
      const { url } = await res.json();
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
      className="w-full bg-[hsla(var(--color-accent)/1)] text-white text-xs tracking-[0.12em] uppercase py-4 rounded-full hover:bg-[hsla(var(--color-secondary)/1)] transition-colors disabled:opacity-40"
    >
      {loading ? 'Redirecting...' : 'Buy Now'}
    </button>
  );
}
