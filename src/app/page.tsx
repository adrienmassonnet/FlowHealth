import Link from 'next/link';
import Image from 'next/image';
import { getProducts } from '@/lib/shopify';

export default async function HomePage() {
  const products = await getProducts();

  return (
    <main className="max-w-6xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold mb-8">Our Products</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product) => {
          const image = product.images.edges[0]?.node;
          const price = product.priceRange.minVariantPrice;
          return (
            <Link
              key={product.id}
              href={`/products/${product.handle}`}
              className="group border rounded-xl overflow-hidden hover:shadow-lg transition"
            >
              {image && (
                <div className="relative aspect-square bg-gray-100">
                  <Image
                    src={image.url}
                    alt={image.altText ?? product.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
              )}
              <div className="p-4">
                <h2 className="font-semibold text-lg">{product.title}</h2>
                <p className="text-gray-500 mt-1">
                  {parseFloat(price.amount).toFixed(2)} {price.currencyCode}
                </p>
              </div>
            </Link>
          );
        })}
      </div>
    </main>
  );
}
