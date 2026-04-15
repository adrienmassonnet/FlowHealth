import { NextRequest, NextResponse } from 'next/server';
import { createStorefrontApiClient } from '@shopify/storefront-api-client';

function shopifyClient() {
  return createStorefrontApiClient({
    storeDomain: process.env.SHOPIFY_STORE_DOMAIN!,
    apiVersion: '2025-04',
    publicAccessToken: process.env.SHOPIFY_STOREFRONT_ACCESS_TOKEN!,
  });
}

const CREATE_CUSTOMER = `
  mutation CreateCustomer($input: CustomerCreateInput!) {
    customerCreate(input: $input) {
      customer {
        id
        email
      }
      customerUserErrors {
        code
        message
      }
    }
  }
`;

export async function POST(req: NextRequest) {
  try {
    const { email, notifyPromos } = await req.json() as { email?: string; notifyPromos?: boolean };
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ error: 'Invalid email' }, { status: 400 });
    }

    const password = crypto.randomUUID() + crypto.randomUUID();

    const { data, errors } = await shopifyClient().request(CREATE_CUSTOMER, {
      variables: {
        input: {
          email,
          password,
          acceptsMarketing: notifyPromos ?? true,
          tags: ['prelaunch'],
        },
      },
    });

    if (errors) {
      console.error('[prelaunch] Shopify request error', errors);
      return NextResponse.json({ error: 'Internal error' }, { status: 500 });
    }

    const userErrors = data?.customerCreate?.customerUserErrors ?? [];
    // CUSTOMER_ALREADY_EXISTS is fine — they're already in Shopify
    const fatalErrors = userErrors.filter((e: { code: string }) => e.code !== 'CUSTOMER_ALREADY_EXISTS');
    if (fatalErrors.length > 0) {
      console.error('[prelaunch] customerCreate errors', fatalErrors);
      return NextResponse.json({ error: 'Could not register email' }, { status: 422 });
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error('[prelaunch] error', err);
    return NextResponse.json({ error: 'Internal error' }, { status: 500 });
  }
}
