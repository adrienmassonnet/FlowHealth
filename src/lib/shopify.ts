import { createStorefrontApiClient } from '@shopify/storefront-api-client';

let _client: ReturnType<typeof createStorefrontApiClient> | undefined;

function shopifyClient() {
  if (!_client) {
    _client = createStorefrontApiClient({
      storeDomain: process.env.SHOPIFY_STORE_DOMAIN!,
      apiVersion: '2025-04',
      publicAccessToken: process.env.SHOPIFY_STOREFRONT_ACCESS_TOKEN!,
    });
  }
  return _client;
}

// Types
export interface Product {
  id: string;
  title: string;
  handle: string;
  description: string;
  priceRange: {
    minVariantPrice: {
      amount: string;
      currencyCode: string;
    };
  };
  images: {
    edges: Array<{
      node: {
        url: string;
        altText: string | null;
      };
    }>;
  };
  variants: {
    edges: Array<{
      node: {
        id: string;
        title: string;
        availableForSale: boolean;
        price: {
          amount: string;
          currencyCode: string;
        };
      };
    }>;
  };
}

// Queries
export async function getProducts(): Promise<Product[]> {
  const query = `
    query GetProducts {
      products(first: 20) {
        edges {
          node {
            id
            title
            handle
            description
            priceRange {
              minVariantPrice {
                amount
                currencyCode
              }
            }
            images(first: 1) {
              edges {
                node {
                  url
                  altText
                }
              }
            }
          }
        }
      }
    }
  `;

  const { data, errors } = await shopifyClient().request(query);
  if (errors) throw new Error(errors.message);
  return data.products.edges.map((e: { node: Product }) => e.node);
}

export async function getProduct(handle: string): Promise<Product | null> {
  const query = `
    query GetProduct($handle: String!) {
      productByHandle(handle: $handle) {
        id
        title
        handle
        description
        priceRange {
          minVariantPrice {
            amount
            currencyCode
          }
        }
        images(first: 5) {
          edges {
            node {
              url
              altText
            }
          }
        }
        variants(first: 10) {
          edges {
            node {
              id
              title
              availableForSale
              price {
                amount
                currencyCode
              }
            }
          }
        }
      }
    }
  `;

  const { data, errors } = await shopifyClient().request(query, { variables: { handle } });
  if (errors) throw new Error(errors.message);
  return data.productByHandle;
}

export async function createCheckout(variantId: string, quantity: number): Promise<string> {
  const mutation = `
    mutation CreateCart($variantId: ID!, $quantity: Int!) {
      cartCreate(input: {
        lines: [{ merchandiseId: $variantId, quantity: $quantity }]
      }) {
        cart {
          checkoutUrl
        }
      }
    }
  `;

  const { data, errors } = await shopifyClient().request(mutation, {
    variables: { variantId, quantity },
  });
  if (errors) throw new Error(errors.message);
  return data.cartCreate.cart.checkoutUrl;
}
