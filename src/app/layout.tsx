import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import Link from "next/link";
import Script from "next/script";
import "./globals.css";
import Header from "@/app/components/Header";
import ScrollManager from "@/app/components/ScrollManager";
import ExitIntentModal from "@/app/components/ExitIntentModal";
const outfit = Outfit({ subsets: ["latin"], display: "swap", preload: true });

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://www.flow-health.ch';

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  icons: {
    icon: [
      { url: '/favicon.svg', type: 'image/svg+xml' },
    ],
    apple: '/flow-logomark.svg',
  },
  title: {
    default: 'Flow Health — Stable Energy for Deep Focus',
    template: '%s | Flow Health',
  },
  description: 'Flow is a premium Swiss cognitive supplement — 16 clinically-dosed active ingredients for sustained focus, balanced mood, and long-term brain health. No caffeine, no sugar, no fillers.',
  keywords: ['cognitive supplement', 'nootropic', 'focus supplement', 'Swiss supplement', "lion's mane", 'saffron extract', 'mental clarity', 'brain health'],
  authors: [{ name: 'Flow Health' }],
  creator: 'Flow Health',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: SITE_URL,
    siteName: 'Flow Health',
    title: 'Flow Health — Stable Energy for Deep Focus',
    description: 'Flow is a premium Swiss cognitive supplement — 16 clinically-dosed active ingredients for sustained focus, balanced mood, and long-term brain health.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Flow Health — Stable Energy for Deep Focus',
    description: 'Flow is a premium Swiss cognitive supplement — 16 clinically-dosed active ingredients for sustained focus, balanced mood, and long-term brain health.',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-image-preview': 'large', 'max-snippet': -1 },
  },
  alternates: { canonical: SITE_URL },
  verification: { google: 'Ea1HmnhxhBKchqQouW49XFw45z0Tu-XZdbYq7FES8q8' },
};

const organizationJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'Flow Health',
  url: SITE_URL,
  logo: `${SITE_URL}/favicon.svg`,
  description: 'Swiss cognitive supplement brand. Flow is a daily liquid nootropic with 16 clinically-dosed active ingredients for focus, mood, and long-term brain health.',
  foundingDate: '2022',
  foundingLocation: { '@type': 'Place', name: 'Geneva, Switzerland' },
  contactPoint: { '@type': 'ContactPoint', email: 'hello@flowhealth.com', contactType: 'customer support' },
  sameAs: [],
  brand: {
    '@type': 'Brand',
    name: 'Flow Health',
    description: 'Premium Swiss cognitive supplement — caffeine-free, fully transparent formula.',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="scroll-pt-16">
      <head>
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        {/* Prevent browser scroll restoration before JS hydrates */}
        <script dangerouslySetInnerHTML={{ __html: 'history.scrollRestoration = "manual"' }} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
        <Script src="https://www.googletagmanager.com/gtag/js?id=G-F1B6SHB752" strategy="afterInteractive" />
        <Script id="gtag-init" strategy="afterInteractive">{`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-F1B6SHB752');
        `}</Script>
        <Script id="gtm-init" strategy="afterInteractive">{`
          (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
          new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
          j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
          'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
          })(window,document,'script','dataLayer','GTM-N3CRPDLV');
        `}</Script>
        <Script id="meta-pixel" strategy="afterInteractive">{`
          !function(f,b,e,v,n,t,s)
          {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
          n.callMethod.apply(n,arguments):n.queue.push(arguments)};
          if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
          n.queue=[];t=b.createElement(e);t.async=!0;
          t.src=v;s=b.getElementsByTagName(e)[0];
          s.parentNode.insertBefore(t,s)}(window, document,'script',
          'https://connect.facebook.net/en_US/fbevents.js');
          fbq('init', '1449181289756992');
          fbq('track', 'PageView');
        `}</Script>
        <Script id="clarity-init" strategy="afterInteractive">{`
          (function(c,l,a,r,i,t,y){
            c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
            t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
            y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
          })(window,document,"clarity","script","w3zpn726v1");
        `}</Script>
      </head>
      <body className={`${outfit.className} antialiased`} suppressHydrationWarning>
        <noscript><iframe src="https://www.googletagmanager.com/ns.html?id=GTM-N3CRPDLV" height="0" width="0" style={{display:'none',visibility:'hidden'}}></iframe></noscript>
        <noscript><img height="1" width="1" style={{display:'none'}} src="https://www.facebook.com/tr?id=1449181289756992&ev=PageView&noscript=1" /></noscript>
        <ScrollManager />
        <Header />
        <ExitIntentModal />
        {children}
        <footer className="footer-gradient text-white/50 mt-12">
          <div className="max-w-[1200px] mx-auto px-6 py-16 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10 lg:gap-16">

            {/* About Flow */}
            <div className="space-y-4">
              <p className="text-white text-xs font-semibold tracking-[0.12em] uppercase">About Flow</p>
              <ul className="space-y-3 text-xs">
                {[
                  { label: 'Our Philosophy', href: '/pages/our-philosophy' },
                  { label: 'Who We Are', href: '/pages/who-we-are' },
                  { label: 'Our Product', href: '/pages/our-product' },
                  { label: 'Research', href: '/pages/research' },
                  { label: 'Legal notice', href: '/pages/legal-notice' },
                  { label: 'Blogs', href: '/pages/blog-posts' },
                ].map((l) => (
                  <li key={l.label}><Link href={l.href} className="hover:text-white transition-colors">{l.label}</Link></li>
                ))}
              </ul>
            </div>

            {/* Community */}
            <div className="space-y-4">
              <p className="text-white text-xs font-semibold tracking-[0.12em] uppercase">Community</p>
              <ul className="space-y-3 text-xs">
                {[
                  { label: 'Reviews', href: '/pages/reviews' },
                ].map((l) => (
                  <li key={l.label}><Link href={l.href} className="hover:text-white transition-colors">{l.label}</Link></li>
                ))}
              </ul>
            </div>

            {/* Support */}
            <div className="space-y-4">
              <p className="text-white text-xs font-semibold tracking-[0.12em] uppercase">Support</p>
              <ul className="space-y-3 text-xs">
                {[
                  { label: 'FAQ', href: '/pages/faq' },
                  { label: 'Manage subscription', href: '/pages/subscription' },
                  { label: 'Shipping policy', href: '/pages/shipping-policy' },
                  { label: 'Contact us', href: '/pages/contact' },
                  { label: 'Privacy policy', href: '/pages/privacy-policy' },
                  { label: 'Terms & conditions', href: '/pages/terms-and-conditions' },
                ].map((l) => (
                  <li key={l.label}><Link href={l.href} className="hover:text-white transition-colors">{l.label}</Link></li>
                ))}
              </ul>
            </div>

            {/* Newsletter */}
            <div className="sm:col-span-2 md:col-span-1 space-y-4">
              <p className="text-white text-xs font-semibold tracking-[0.12em] uppercase">Newsletter</p>
              <form className="flex items-center border-b border-white/20 pb-px focus-within:border-white/50 transition-colors">
                <input
                  type="email"
                  placeholder="Enter your email"
                  aria-label="Enter your email"
                  className="flex-1 bg-transparent text-xs text-white placeholder-white/30 outline-none py-2"
                />
                <button type="submit" aria-label="Subscribe" className="text-white/50 hover:text-white transition-colors pl-2">
                  <svg viewBox="-19 23 66 16" xmlns="http://www.w3.org/2000/svg" className="w-8 h-4 fill-current">
                    <path d="m-19 29.6h64v2.9h-64z" />
                    <path d="m47 31-2-2-6-6-2 2 5.9 6-5.9 6 2 2 6-6z" />
                  </svg>
                </button>
              </form>
              <p className="text-xs leading-relaxed">Join our newsletter. Read about our Privacy policy.</p>
            </div>

          </div>

          {/* Bottom bar */}
          <div className="max-w-[1200px] mx-auto px-6 py-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-xs">Copyright © 2026 <Link href="/" className="hover:text-white transition-colors">Flow Health</Link></p>
            {/* PayPal icon */}
            <svg viewBox="0 0 38 24" xmlns="http://www.w3.org/2000/svg" width="38" height="24" aria-label="PayPal" className="opacity-50">
              <path opacity=".07" d="M35 0H3C1.3 0 0 1.3 0 3v18c0 1.7 1.4 3 3 3h32c1.7 0 3-1.3 3-3V3c0-1.7-1.4-3-3-3z" fill="white"/>
              <path fill="#fff" d="M35 1c1.1 0 2 .9 2 2v18c0 1.1-.9 2-2 2H3c-1.1 0-2-.9-2-2V3c0-1.1.9-2 2-2h32"/>
              <path fill="#003087" d="M23.9 8.3c.2-1 0-1.7-.6-2.3-.6-.7-1.7-1-3.1-1h-4.1c-.3 0-.5.2-.6.5L14 15.6c0 .2.1.4.3.4H17l.4-3.4 1.8-2.2 4.7-2.1z"/>
              <path fill="#3086C8" d="M23.9 8.3l-.2.2c-.5 2.8-2.2 3.8-4.6 3.8H18c-.3 0-.5.2-.6.5l-.6 3.9-.2 1c0 .2.1.4.3.4H19c.3 0 .5-.2.5-.4v-.1l.4-2.4v-.1c0-.2.3-.4.5-.4h.3c2.1 0 3.7-.8 4.1-3.2.2-1 .1-1.8-.4-2.4-.1-.5-.3-.7-.5-.8z"/>
              <path fill="#012169" d="M23.3 8.1c-.1-.1-.2-.1-.3-.1-.1 0-.2 0-.3-.1-.3-.1-.7-.1-1.1-.1h-3c-.1 0-.2 0-.2.1-.2.1-.3.2-.3.4l-.7 4.4v.1c0-.3.3-.5.6-.5h1.3c2.5 0 4.1-1 4.6-3.8v-.2c-.1-.1-.3-.2-.5-.2h-.1z"/>
            </svg>
          </div>
        </footer>
      </body>
    </html>
  );
}
