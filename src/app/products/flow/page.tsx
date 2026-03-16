import { redirect } from 'next/navigation';
import { getProducts } from '@/lib/shopify';

export default async function FlowRedirectPage() {
  const products = await getProducts();
  const first = products[0];
  if (first) {
    redirect(`/products/${first.handle}`);
  }
  redirect('/');
}
