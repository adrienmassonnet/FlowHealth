import type { Metadata } from 'next';
import { getProduct } from '@/lib/shopify';
import { getProductMeta } from '@/lib/contentful';
import IngredientsClient from './IngredientsClient';

export const metadata: Metadata = {
  title: 'Ingredients',
  description: 'Every ingredient in Flow is fully disclosed — clinically dosed, no proprietary blends. Explore the 13 active ingredients selected for focus, mood, and long-term brain health.',
  openGraph: {
    title: 'Flow Ingredients — Fully Transparent Formula',
    description: 'Every ingredient in Flow is fully disclosed — clinically dosed, no proprietary blends. Explore the 13 active ingredients selected for focus, mood, and long-term brain health.',
  },
};

export default async function IngredientsPage() {
  const [product, meta] = await Promise.all([getProduct('flow'), getProductMeta()]);
  const productImageUrl = product?.images?.edges?.[0]?.node?.url;
  return (
    <IngredientsClient
      productImageUrl={productImageUrl}
      activeIngredients={meta.activeIngredients}
      totalFormulaWeightG={meta.totalFormulaWeightG}
      caloriesKcal={meta.caloriesKcal}
    />
  );
}
