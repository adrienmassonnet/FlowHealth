import { notFound } from 'next/navigation';
import { createClient } from '@supabase/supabase-js';
import { createClient as createContentfulClient } from 'contentful';
import crypto from 'crypto';
import type { Metadata } from 'next';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://flowhealth.ch';
const SHOP_URL = `${SITE_URL}/products/flow`;

function getDb() {
  const url = process.env.SUPABASE_URL!;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY!;
  return createClient(url, key, { auth: { persistSession: false } });
}

function getContentful() {
  return createContentfulClient({
    space: process.env.CONTENTFUL_SPACE_ID!,
    accessToken: process.env.CONTENTFUL_DELIVERY_TOKEN!,
  });
}

async function getDayContent(position: number) {
  try {
    const client = getContentful();
    const entries = await client.getEntries({
      content_type: 'ritualDay',
      'fields.dayNumber': position,
      include: 2,
      limit: 1,
    });
    if (!entries.items.length) return null;
    const fields = entries.items[0].fields as Record<string, unknown>;
    const slides = Array.isArray(fields.storySlides) ? fields.storySlides : [];
    const firstSlide = slides[0] as { fields?: Record<string, unknown> } | undefined;
    return {
      heading: (firstSlide?.fields?.heading ?? fields.heading ?? '') as string,
      subtext: (firstSlide?.fields?.subtext ?? fields.bodyText ?? '') as string,
      eyebrow: (firstSlide?.fields?.eyebrow ?? `Day ${position}`) as string,
    };
  } catch {
    return null;
  }
}

export async function generateMetadata(
  { params, searchParams }: { params: Promise<{ code: string }>; searchParams: Promise<{ day?: string }> }
): Promise<Metadata> {
  const { code } = await params;
  const { day } = await searchParams;
  const position = Math.min(10, Math.max(1, parseInt(day ?? '1', 10) || 1));
  const content = await getDayContent(position);
  const heading = content?.heading ?? 'A daily moment for your mind.';

  return {
    title: `Flow Daily Ritual: ${heading}`,
    description: `Join the Flow Daily Ritual. 10 days of morning practices designed to compound focus, clarity, and inner calm. Here's what day ${position} felt like.`,
    openGraph: {
      title: `Flow Daily Ritual: Day ${position}`,
      description: heading,
      images: [`${SITE_URL}/ritual/share/${code}/og?day=${position}`],
    },
  };
}

export default async function SharePage(
  { params, searchParams }: { params: Promise<{ code: string }>; searchParams: Promise<{ day?: string }> }
) {
  const { code } = await params;
  const { day } = await searchParams;
  const position = Math.min(10, Math.max(1, parseInt(day ?? '1', 10) || 1));

  // Validate referral code exists
  const db = getDb();
  const { data: profile } = await db
    .from('profiles')
    .select('id, referral_code')
    .eq('referral_code', code.toUpperCase())
    .single();

  if (!profile) notFound();

  // Record click (fire and forget — don't block render)
  db.from('referral_clicks').insert({
    referral_code: code.toUpperCase(),
    day_position: position,
    ip_hash: null,
    clicked_at: new Date().toISOString(),
  }).then(() => {}, () => {});

  const content = await getDayContent(position);
  const heading = content?.heading ?? 'A daily moment for your mind.';
  const subtext = content?.subtext ?? 'Ten mornings. Ten rituals. A practice that compounds.';
  const eyebrow = content?.eyebrow ?? `Day ${position}`;

  return (
    <div style={{ minHeight: '100vh', background: '#0e0a1e', fontFamily: "'Outfit', sans-serif", color: '#F4F1EA' }}>
      <link href="https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600&display=swap" rel="stylesheet" />

      {/* Hero image */}
      <div style={{ position: 'relative', width: '100%', height: 320, overflow: 'hidden' }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={`${SITE_URL}/bg-bubble.png`}
          alt=""
          style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center 60%', display: 'block' }}
        />
        {/* Gradient overlay fading into page background */}
        <div style={{
          position: 'absolute', inset: 0,
          background: 'linear-gradient(to bottom, rgba(14,10,30,0.15) 0%, rgba(14,10,30,0.0) 40%, rgba(14,10,30,1) 100%)',
        }} />
        {/* Logo lockup centered over hero */}
        <div style={{
          position: 'absolute', top: 28, left: 0, right: 0,
          display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10,
        }}>
          <svg width="20" height="20" viewBox="0 0 320 320" fill="none">
            <path d="M320 138.76V160H160V0H181.24C190.26 72.36 247.64 129.74 320 138.76Z" fill="white" opacity="0.85"/>
            <path d="M160 160V320H138.76C129.74 247.64 72.36 190.26 0 181.24V160H160Z" fill="white" opacity="0.85"/>
          </svg>
          <div style={{ width: 1, height: 16, background: 'rgba(255,255,255,0.3)', margin: '0 10px' }} />
          <span style={{ fontSize: 11, fontWeight: 500, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.6)' }}>Daily Ritual</span>
        </div>
      </div>

      {/* Quote card */}
      <div style={{ maxWidth: 480, margin: '-16px auto 0', padding: '0 24px' }}>
        <div style={{
          background: 'linear-gradient(160deg, rgba(58,51,112,0.45) 0%, rgba(30,24,84,0.30) 100%)',
          border: '1px solid rgba(255,255,255,0.10)',
          borderRadius: 24,
          padding: '36px 32px',
          backdropFilter: 'blur(20px)',
          marginBottom: 24,
        }}>
          <p style={{ fontSize: 10, fontWeight: 600, letterSpacing: '0.16em', textTransform: 'uppercase', color: '#E8652A', marginBottom: 14 }}>
            {eyebrow} of 10
          </p>
          <p style={{ fontSize: 26, fontWeight: 300, lineHeight: 1.3, letterSpacing: '-0.01em', color: '#F4F1EA', marginBottom: 16 }}>
            &ldquo;{heading}&rdquo;
          </p>
          <p style={{ fontSize: 14, fontWeight: 400, lineHeight: 1.7, color: 'rgba(244,241,234,0.55)' }}>
            {subtext}
          </p>
        </div>

        {/* What is the ritual */}
        <div style={{ marginBottom: 32 }}>
          <p style={{ fontSize: 12, fontWeight: 600, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.35)', marginBottom: 16 }}>
            What is the Flow Daily Ritual?
          </p>
          <p style={{ fontSize: 15, fontWeight: 300, lineHeight: 1.75, color: 'rgba(244,241,234,0.70)', marginBottom: 12 }}>
            Every morning after taking Flow, scan the QR code in your box. Each scan unlocks a thought built around what your body and mind are doing: neuroscience, focus, recovery, clarity.
          </p>
          <p style={{ fontSize: 15, fontWeight: 300, lineHeight: 1.75, color: 'rgba(244,241,234,0.70)' }}>
            Scan ten mornings in a row and something arrives. But consistency is what unlocks it.
          </p>
        </div>

        {/* Product card */}
        <div style={{
          background: 'rgba(255,255,255,0.04)',
          border: '1px solid rgba(255,255,255,0.08)',
          borderRadius: 20,
          overflow: 'hidden',
          marginBottom: 20,
        }}>
          {/* Product image */}
          <div style={{
            position: 'relative',
            overflow: 'hidden',
            padding: '36px 24px',
            display: 'flex',
            justifyContent: 'center',
            minHeight: 220,
            alignItems: 'center',
          }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={`${SITE_URL}/bg-wind.png`}
              alt=""
              style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center', opacity: 0.55 }}
            />
            <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(135deg, rgba(30,24,84,0.6) 0%, rgba(14,10,30,0.5) 100%)' }} />
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={`${SITE_URL}/our-product/our-product.png`}
              alt="Flow supplement pouch"
              style={{ position: 'relative', width: 180, height: 'auto', display: 'block' }}
            />
          </div>

          {/* Product info */}
          <div style={{ padding: '24px 24px 28px' }}>
            <p style={{ fontSize: 10, fontWeight: 600, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.35)', marginBottom: 8 }}>
              Flow Health · Zurich
            </p>
            <p style={{ fontSize: 20, fontWeight: 500, color: '#F4F1EA', marginBottom: 8 }}>
              Flow Daily Supplement
            </p>
            <p style={{ fontSize: 13, fontWeight: 300, lineHeight: 1.65, color: 'rgba(244,241,234,0.55)', marginBottom: 24 }}>
              16 clinically-dosed ingredients for sustained focus, balanced mood, and long-term brain health. No caffeine. No sugar. No fillers.
            </p>
            <a
              href={`${SHOP_URL}?utm_source=referral&utm_medium=ritual_share&utm_campaign=${code}`}
              style={{
                display: 'block',
                textAlign: 'center',
                background: 'linear-gradient(135deg, var(--color-brand) 0%, var(--color-ink) 100%)',
                color: '#ffffff',
                fontFamily: "'Outfit', sans-serif",
                fontSize: 15,
                fontWeight: 600,
                padding: '15px 24px',
                borderRadius: 100,
                textDecoration: 'none',
                letterSpacing: '0.02em',
              }}
            >
              Start your ritual →
            </a>
          </div>
        </div>

        {/* Footer */}
        <p style={{ fontSize: 12, color: 'rgba(255,255,255,0.20)', textAlign: 'center', paddingBottom: 48, lineHeight: 1.7 }}>
          Flow Health · Zurich, Switzerland<br />
          <a href={`${SITE_URL}/pages/privacy-policy`} style={{ color: 'rgba(255,255,255,0.25)', textDecoration: 'underline' }}>Privacy Policy</a>
        </p>
      </div>
    </div>
  );
}
