import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import Link from "next/link";
import "./globals.css";
import Header from "@/app/components/Header";

const outfit = Outfit({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Flow Health",
  description: "Stable Energy for Deep Focus — Premium Swiss functional beverage",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${outfit.className} antialiased`} suppressHydrationWarning>
        <Header />
        {/* Offset for fixed header (announcement bar ~32px + nav ~56px) */}
        <div>
          {children}

        <footer className="bg-[#1E1854] text-white/50 mt-0">
          <div className="max-w-[1200px] mx-auto px-6 py-16 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10 lg:gap-16">

            {/* About Flow */}
            <div className="space-y-4">
              <p className="text-white text-xs font-semibold tracking-[0.12em] uppercase">About Flow</p>
              <ul className="space-y-3 text-xs">
                {[
                  { label: 'Our Philosophy', href: '/pages/our-philosophy' },
                  { label: 'Science', href: '/pages/science' },
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
                  { label: 'Refer a friend', href: '/pages/contact' },
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
        </div>
      </body>
    </html>
  );
}
