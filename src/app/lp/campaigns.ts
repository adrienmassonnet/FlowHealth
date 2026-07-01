export type Campaign = {
  slug: string;
  headline: string;
  subheadline: string;
  ctaText: string;
  ctaUrl: string;
  heroImage: string;
  klaviyoEvent: string;
  source: 'email' | 'instagram' | 'tiktok' | 'other';
};

export const campaigns: Record<string, Campaign> = {
  'post-purchase-upsell': {
    slug: 'post-purchase-upsell',
    headline: 'Your brain will thank you.',
    subheadline: 'Flow subscribers get 10% off every order, forever. Lock in your supply.',
    ctaText: 'Subscribe & Save 10%',
    ctaUrl: '/products/flow-roi-boss',
    heroImage: 'https://cdn.shopify.com/s/files/1/0956/6850/2905/files/Box_mockup.jpg?v=1775806866',
    klaviyoEvent: 'Viewed LP: Post-Purchase Upsell',
    source: 'email',
  },
};

export function getCampaign(slug: string): Campaign | null {
  return campaigns[slug] ?? null;
}