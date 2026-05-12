import { NextRequest, NextResponse } from 'next/server';
import { createStorefrontApiClient } from '@shopify/storefront-api-client';
import { Resend } from 'resend';
import { prelaunchConfirmationEmail } from '@/lib/email-templates';
import { subscribeToKlaviyoList, trackKlaviyoEvent } from '@/lib/klaviyo';

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

    // Subscribe to Klaviyo pre-launch list
    const klaviyoKey = process.env.KLAVIYO_PRIVATE_API_KEY;
    const klaviyoListId = process.env.KLAVIYO_PRELAUNCH_LIST_ID;
    if (klaviyoKey && klaviyoListId) {
      try {
        await Promise.all([
          subscribeToKlaviyoList(email, klaviyoListId, notifyPromos ?? true),
          trackKlaviyoEvent(email, 'Pre-Launch Signup', { notifyPromos: notifyPromos ?? true }),
        ]);
      } catch (klaviyoErr) {
        console.error('[prelaunch] Klaviyo error', klaviyoErr);
      }
    }

    // Send confirmation email via Resend
    const resendKey = process.env.RESEND_API_KEY;
    if (resendKey && !resendKey.startsWith('re_REPLACE')) {
      try {
        const resend = new Resend(resendKey);
        const from = process.env.RESEND_FROM_EMAIL ?? 'Flow <hello@flowhealth.com>';
        const { subject, html, text } = prelaunchConfirmationEmail(email);
        const { error: sendError } = await resend.emails.send({ from, to: email, subject, html, text });
        if (sendError) {
          console.error('[prelaunch] Resend send error', sendError);
        }
      } catch (sendErr) {
        // Non-fatal: email sending failure should not block the signup response
        console.error('[prelaunch] Resend exception', sendErr);
      }
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error('[prelaunch] error', err);
    return NextResponse.json({ error: 'Internal error' }, { status: 500 });
  }
}
