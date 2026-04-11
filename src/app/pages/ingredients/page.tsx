import { getProduct } from '@/lib/shopify';
import { getProductMeta } from '@/lib/contentful';
import IngredientsClient from './IngredientsClient';

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
