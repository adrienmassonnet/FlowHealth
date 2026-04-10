import { getProduct } from '@/lib/shopify';
import IngredientsClient from './IngredientsClient';

export default async function IngredientsPage() {
  const product = await getProduct('flow');
  const productImageUrl = product?.images?.edges?.[0]?.node?.url;
  return <IngredientsClient productImageUrl={productImageUrl} />;
}
