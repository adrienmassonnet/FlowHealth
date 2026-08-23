/* eslint-disable @typescript-eslint/no-explicit-any */
declare global {
  interface Window { fbq?: (...args: any[]) => void; }
}

export function pixelViewContent(opts: { content_name: string; value: number; currency: string }) {
  window.fbq?.('track', 'ViewContent', { content_name: opts.content_name, value: opts.value, currency: opts.currency, content_type: 'product' });
}

export function pixelInitiateCheckout(opts: { value: number; currency: string }) {
  window.fbq?.('track', 'InitiateCheckout', { value: opts.value, currency: opts.currency, num_items: 1 });
}

export function pixelLead(opts?: { content_name?: string }) {
  window.fbq?.('track', 'Lead', opts?.content_name ? { content_name: opts.content_name } : undefined);
}