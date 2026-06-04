import { redirect } from 'next/navigation';
import { getFirstProductHandle } from '@/lib/shopify';

export default async function FlowRedirectPage() {
  const handle = await getFirstProductHandle();
  redirect(handle ? `/products/${handle}` : '/');
}
