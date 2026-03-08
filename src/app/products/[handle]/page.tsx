import Image from 'next/image';
import { notFound } from 'next/navigation';
import { getProduct, createCheckout } from '@/lib/shopify';
import AddToCartButton from './AddToCartButton';

export default async function ProductPage({ params }: { params: Promise<{ handle: string }> }) {
  const { handle } = await params;
  const product = await getProduct(handle);

  if (!product) notFound();

  const images = product.images.edges.map((e) => e.node);
  const variants = product.variants.edges.map((e) => e.node);
  const firstVariant = variants[0];

  return (
    <main className="max-w-5xl mx-auto px-4 py-10">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        {/* Images */}
        <div className="space-y-4">
          {images.map((img, i) => (
            <div key={i} className="relative aspect-square rounded-xl overflow-hidden bg-gray-100">
              <Image
                src={img.url}
                alt={img.altText ?? product.title}
                fill
                className="object-cover"
              />
            </div>
          ))}
        </div>

        {/* Info */}
        <div className="sticky top-10 self-start space-y-6">
          <h1 className="text-3xl font-bold">{product.title}</h1>
          <p className="text-2xl font-semibold">
            {parseFloat(firstVariant.price.amount).toFixed(2)} {firstVariant.price.currencyCode}
          </p>
          <p className="text-gray-600 leading-relaxed">{product.description}</p>
          <AddToCartButton variantId={firstVariant.id} />
        </div>
      </div>
    </main>
  );
}
