'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

// ─── Data ───────────────────────────────────────────────────────────────────

const languages = [
  { code: 'EN', label: 'English' },
  { code: 'FR', label: 'Français' },
  { code: 'DE', label: 'Deutsch' },
  { code: 'IT', label: 'Italiano' },
];

const aboutLinks = [
  {
    href: '/pages/who-we-are',
    label: 'Who We Are',
    description: 'The team and story behind Flow Health.',
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
        <circle cx="10" cy="7" r="3" stroke="currentColor" strokeWidth="1.3"/>
        <path d="M4 17c0-3.314 2.686-6 6-6s6 2.686 6 6" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/>
      </svg>
    ),
  },
  {
    href: '/pages/our-philosophy',
    label: 'Our Philosophy',
    description: 'The principles we refuse to compromise on.',
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
        <path d="M10 3L12 7.5L17 8.2L13.5 11.5L14.5 16.5L10 14L5.5 16.5L6.5 11.5L3 8.2L8 7.5L10 3Z" stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round"/>
      </svg>
    ),
  },
  {
    href: '/pages/our-product',
    label: 'Our Product',
    description: 'Inside the formula — every ingredient, every dose.',
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
        <rect x="7" y="3" width="6" height="14" rx="2" stroke="currentColor" strokeWidth="1.3"/>
        <path d="M9 7h2M9 10h2M9 13h1" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/>
      </svg>
    ),
  },
];

const latestPosts = [
  {
    slug: 'nootropics-explained',
    title: 'Nootropics Explained: What They Are and How They Actually Work',
    readTime: '7 min read',
    tag: 'Science',
    image: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=400&q=80&auto=format&fit=crop',
  },
  {
    slug: 'ashwagandha-stress',
    title: 'Ashwagandha KSM-66®: The Most Clinically Studied Adaptogen',
    readTime: '5 min read',
    tag: 'Ingredients',
    image: 'https://images.unsplash.com/photo-1596078842550-f9b9bdd7bdc7?w=400&q=80&auto=format&fit=crop',
  },
  {
    slug: 'lions-mane-brain',
    title: "Lion's Mane and Neuroplasticity: What the Research Says",
    readTime: '8 min read',
    tag: 'Science',
    image: 'https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=400&q=80&auto=format&fit=crop',
  },
  {
    slug: 'morning-ritual',
    title: 'Building a Morning Ritual That Actually Sticks',
    readTime: '6 min read',
    tag: 'Lifestyle',
    image: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=400&q=80&auto=format&fit=crop',
  },
];

// ─── Animation variants ──────────────────────────────────────────────────────

const easeOut: [number, number, number, number] = [0.16, 1, 0.3, 1];
const easeIn: [number, number, number, number] = [0.4, 0, 1, 1];

const panelVariants = {
  hidden: { opacity: 0, y: -6, scale: 0.98 },
  visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.22, ease: easeOut } },
  exit: { opacity: 0, y: -4, scale: 0.98, transition: { duration: 0.14, ease: easeIn } },
};

const listVariants = {
  visible: { transition: { staggerChildren: 0.04, delayChildren: 0.06 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 6 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.18, ease: easeOut } },
  exit: { opacity: 0 },
};

const backdropVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.2 } },
  exit: { opacity: 0, transition: { duration: 0.15 } },
};

// ─── LanguageSelector ────────────────────────────────────────────────────────

function LanguageSelector({ muted }: { muted?: boolean }) {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState('EN');
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen((o) => !o)}
        className={`flex items-center gap-1 text-xs tracking-[0.08em] uppercase transition-colors ${
          muted
            ? 'text-[hsla(var(--color-secondary)/0.6)] hover:text-[#1A1A18]'
            : 'text-[hsla(var(--color-secondary)/1)] hover:text-[hsla(var(--color-accent)/1)]'
        }`}
      >
        <svg width="13" height="13" viewBox="0 0 16 16" fill="none" className="shrink-0">
          <circle cx="8" cy="8" r="6.5" stroke="currentColor" strokeWidth="1.2"/>
          <path d="M8 1.5C8 1.5 5.5 4 5.5 8C5.5 12 8 14.5 8 14.5M8 1.5C8 1.5 10.5 4 10.5 8C10.5 12 8 14.5 8 14.5M1.5 8H14.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
        </svg>
        {selected}
        <motion.svg
          width="8" height="8" viewBox="0 0 8 8" fill="none"
          animate={{ rotate: open ? 180 : 0 }}
          transition={{ duration: 0.2 }}
          className="shrink-0"
        >
          <path d="M1.5 3L4 5.5L6.5 3" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
        </motion.svg>
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            variants={panelVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="absolute right-0 top-full mt-2 w-32 rounded-xl border border-[var(--color-border)] bg-white shadow-lg overflow-hidden z-50"
          >
            {languages.map((lang) => (
              <button
                key={lang.code}
                onClick={() => { setSelected(lang.code); setOpen(false); }}
                className={`w-full flex items-center justify-between px-3 py-2 text-xs transition-colors ${
                  selected === lang.code
                    ? 'bg-[#1A1A18] text-white'
                    : 'text-[#1A1A18] hover:bg-[#F8F8F8]'
                }`}
              >
                <span>{lang.label}</span>
                <span className={`font-mono text-[10px] ${selected === lang.code ? 'text-white/50' : 'text-[hsla(var(--color-secondary)/0.4)]'}`}>{lang.code}</span>
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ─── Chevron helper ──────────────────────────────────────────────────────────

function Chevron({ open }: { open: boolean }) {
  return (
    <motion.svg
      width="8" height="8" viewBox="0 0 8 8" fill="none"
      animate={{ rotate: open ? 180 : 0 }}
      transition={{ duration: 0.2 }}
      className="shrink-0"
    >
      <path d="M1.5 3L4 5.5L6.5 3" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
    </motion.svg>
  );
}

// ─── NavButton ───────────────────────────────────────────────────────────────

function NavButton({ label, open }: { label: string; open: boolean }) {
  return (
    <button
      className={`relative flex items-center gap-1.5 text-xs tracking-[0.08em] uppercase px-3 py-1.5 rounded-full transition-all duration-200 ${
        open
          ? 'bg-[#1A1A18] text-white'
          : 'text-[hsla(var(--color-secondary)/1)] hover:bg-[#1A1A18]/[0.07]'
      }`}
    >
      {label}
      <Chevron open={open} />
    </button>
  );
}

// ─── Header ──────────────────────────────────────────────────────────────────

type ActiveMenu = 'about' | 'learn' | null;

const mobileNavLinks = [
  { href: '/pages/who-we-are', label: 'Who We Are' },
  { href: '/pages/our-philosophy', label: 'Our Philosophy' },
  { href: '/pages/our-product', label: 'Our Product' },
  { href: '/pages/ingredients', label: 'Ingredients' },
  { href: '/pages/blog-posts', label: 'Blog' },
  { href: '/pages/faq', label: 'FAQ' },
  { href: '/pages/contact', label: 'Contact' },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [activeMenu, setActiveMenu] = useState<ActiveMenu>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const navRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 72);
      setActiveMenu(null);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Close on outside click
  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (navRef.current && !navRef.current.contains(e.target as Node)) {
        setActiveMenu(null);
      }
    }
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  function openMenu(menu: ActiveMenu) {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setActiveMenu(menu);
  }

  function scheduleClose() {
    closeTimer.current = setTimeout(() => setActiveMenu(null), 120);
  }

  return (
    <>
      {/* Desktop dropdown backdrop */}
      <AnimatePresence>
        {activeMenu && (
          <motion.div
            key="backdrop"
            variants={backdropVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="fixed inset-0 z-40 bg-black/20 backdrop-blur-[2px]"
            onClick={() => setActiveMenu(null)}
          />
        )}
      </AnimatePresence>

      {/* Mobile drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              key="mobile-backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 z-40 bg-black/30 backdrop-blur-sm md:hidden"
              onClick={() => setMobileOpen(false)}
            />
            <motion.div
              key="mobile-drawer"
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="fixed top-0 left-0 bottom-0 z-50 w-72 bg-white flex flex-col md:hidden shadow-2xl"
            >
              <div className="flex items-center justify-between px-6 h-16 border-b border-[var(--color-border)]">
                <Link href="/" onClick={() => setMobileOpen(false)} className="flex items-center gap-2.5" aria-label="Flow Health">
                  <img src="/flow-logomark.svg" alt="" width={22} height={22} className="w-[22px] h-[22px]" />
                  <img src="/flow-wordmark.svg" alt="Flow" width={60} height={24} className="h-6 w-auto" />
                </Link>
                <button onClick={() => setMobileOpen(false)} className="p-2 -mr-2 text-[#1A1A18]" aria-label="Close menu">
                  <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                    <path d="M3 3l12 12M15 3L3 15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                  </svg>
                </button>
              </div>
              <nav className="flex-1 overflow-y-auto px-4 py-6 space-y-1">
                {mobileNavLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setMobileOpen(false)}
                    className="flex items-center justify-between px-4 py-3 rounded-xl text-sm font-medium text-[#1A1A18] hover:bg-[#F8F8F8] transition-colors"
                  >
                    {link.label}
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                      <path d="M3 7h8M8 4l3 3-3 3" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </Link>
                ))}
              </nav>
              <div className="px-4 pb-8 pt-4 border-t border-[var(--color-border)]">
                <Link
                  href="/products/flow"
                  onClick={() => setMobileOpen(false)}
                  className="flex items-center justify-center w-full py-3.5 rounded-full bg-[#1A1A18] text-white text-xs tracking-[0.08em] uppercase font-semibold hover:bg-[hsla(var(--color-accent)/1)] transition-colors"
                >
                  Get Flow
                </Link>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <header className="fixed top-0 left-0 right-0 z-50">
        {/* Announcement bar */}
        <motion.div
          animate={scrolled ? { maxHeight: 0, opacity: 0, paddingTop: 0, paddingBottom: 0 } : { maxHeight: 40, opacity: 1, paddingTop: '0.5rem', paddingBottom: '0.5rem' }}
          transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
          className="bg-[hsla(var(--color-accent)/1)] text-white text-center text-xs tracking-[0.1em] px-4 overflow-hidden"
        >
          Free shipping on orders over CHF 60 · 30-day satisfaction guarantee
        </motion.div>

        {/* Nav wrapper — layout is always stable, only visuals animate */}
        <div className="relative">
          {/* Full-width bar background — fades out when scrolled */}
          <motion.div
            animate={{ opacity: scrolled ? 0 : 1 }}
            transition={{ duration: 0.4, ease: easeOut }}
            className="absolute inset-0 border-b border-[var(--color-border)] bg-[#F8F8F8]/90 backdrop-blur-sm pointer-events-none"
          />

          <div className="max-w-[1360px] mx-auto px-6">
            <div className="h-14 flex items-center justify-between gap-3">
              {/* Hamburger button — mobile only */}
              <button
                className="md:hidden p-2 -ml-2 text-[#1A1A18]"
                aria-label="Open menu"
                onClick={() => setMobileOpen(true)}
              >
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <path d="M3 5h14M3 10h14M3 15h14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                </svg>
              </button>

              {/* Left side: logo + nav + CTA */}
              <motion.div
                animate={scrolled
                  ? { borderRadius: 9999, paddingLeft: 20, paddingRight: 20, backgroundColor: 'rgba(255,255,255,0.75)', boxShadow: '0 4px 24px rgba(0,0,0,0.08)' }
                  : { borderRadius: 0, paddingLeft: 0, paddingRight: 0, backgroundColor: 'rgba(255,255,255,0)', boxShadow: '0 0 0 rgba(0,0,0,0)' }
                }
                transition={{ duration: 0.5, ease: easeOut }}
                className="flex items-center gap-5 border border-white/0 backdrop-blur-xl h-10"
                style={{ borderColor: scrolled ? 'rgba(255,255,255,0.3)' : 'rgba(255,255,255,0)' }}
              >
              {/* Logo */}
              <Link
                href="/"
                onClick={() => setActiveMenu(null)}
                className="shrink-0 text-[#1E1854]"
                aria-label="Flow Health"
              >
                <img
                  src="/flow-wordmark.svg"
                  alt="Flow"
                  width={72}
                  height={28}
                  className="h-7 w-auto"
                  style={{ color: '#1E1854' }}
                />
              </Link>

              {/* Nav */}
              <nav ref={navRef} className="hidden md:flex items-center gap-2 relative">

                {/* About Flow dropdown */}
                <div className="relative" onMouseEnter={() => openMenu('about')} onMouseLeave={scheduleClose}>
                  <NavButton label="About Flow" open={activeMenu === 'about'} />
                  <AnimatePresence>
                    {activeMenu === 'about' && (
                      <motion.div
                        key="about-panel"
                        variants={panelVariants}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                        className="absolute left-1/2 -translate-x-1/2 top-full mt-4 w-72 rounded-2xl border border-[var(--color-border)] bg-white shadow-[0_8px_40px_rgba(0,0,0,0.12)] overflow-hidden z-50"
                      >
                        <div className="px-4 pt-4 pb-2">
                          <p className="text-[10px] uppercase tracking-[0.12em] font-semibold text-[hsla(var(--color-secondary)/0.45)]">About Flow</p>
                        </div>
                        <motion.div className="p-2 space-y-0.5" variants={listVariants} initial="hidden" animate="visible">
                          {aboutLinks.map((link) => (
                            <motion.div key={link.href} variants={itemVariants}>
                              <Link
                                href={link.href}
                                onClick={() => setActiveMenu(null)}
                                className="group flex items-center gap-4 px-3 py-3.5 rounded-xl hover:bg-[#F8F8F8] transition-colors"
                              >
                                <span className="shrink-0 w-9 h-9 rounded-xl bg-[#F0F0EE] flex items-center justify-center text-[#1A1A18] group-hover:bg-[#1A1A18] group-hover:text-white transition-colors">
                                  {link.icon}
                                </span>
                                <div className="flex-1 min-w-0">
                                  <p className="text-sm font-semibold text-[#1A1A18] group-hover:text-[hsla(var(--color-accent)/1)] transition-colors">{link.label}</p>
                                  <p className="text-xs text-[hsla(var(--color-secondary)/0.5)] leading-snug mt-0.5">{link.description}</p>
                                </div>
                                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="shrink-0 opacity-0 group-hover:opacity-100 transition-opacity text-[hsla(var(--color-accent)/1)]">
                                  <path d="M3 7h8M8 4l3 3-3 3" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
                                </svg>
                              </Link>
                            </motion.div>
                          ))}
                        </motion.div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Learn dropdown */}
                <div className="relative" onMouseEnter={() => openMenu('learn')} onMouseLeave={scheduleClose}>
                  <NavButton label="Learn" open={activeMenu === 'learn'} />
                  <AnimatePresence>
                    {activeMenu === 'learn' && (
                      <motion.div
                        key="learn-panel"
                        variants={panelVariants}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                        className="absolute left-1/2 -translate-x-1/2 top-full mt-4 w-[520px] rounded-2xl border border-[var(--color-border)] bg-white shadow-[0_8px_40px_rgba(0,0,0,0.12)] overflow-hidden z-50"
                      >
                        {/* Header row */}
                        <div className="flex items-center justify-between px-5 pt-4 pb-3 border-b border-[var(--color-border)]">
                          <p className="text-[10px] uppercase tracking-[0.12em] font-semibold text-[hsla(var(--color-secondary)/0.45)]">Latest articles</p>
                          <Link
                            href="/pages/blog-posts"
                            onClick={() => setActiveMenu(null)}
                            className="flex items-center gap-1 text-[10px] uppercase tracking-[0.1em] font-semibold text-[hsla(var(--color-accent)/1)] hover:opacity-70 transition-opacity"
                          >
                            See all
                            <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                              <path d="M2 5h6M5.5 2.5L8 5l-2.5 2.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                          </Link>
                        </div>

                        {/* Posts */}
                        <motion.div className="p-3 space-y-1" variants={listVariants} initial="hidden" animate="visible">
                          {latestPosts.map((post) => (
                            <motion.div key={post.slug} variants={itemVariants}>
                              <Link
                                href={`/pages/blog-posts/${post.slug}`}
                                onClick={() => setActiveMenu(null)}
                                className="group flex items-center gap-4 px-3 py-3 rounded-xl hover:bg-[#F8F8F8] transition-colors"
                              >
                                <div className="relative shrink-0 w-14 h-14 rounded-lg overflow-hidden bg-[#F0F0EE]">
                                  <Image src={post.image} alt={post.title} fill className="object-cover" sizes="56px" />
                                </div>
                                <div className="flex-1 min-w-0">
                                  <p className="text-[10px] uppercase tracking-[0.08em] font-medium text-[hsla(var(--color-secondary)/0.45)] mb-0.5">{post.tag} · {post.readTime}</p>
                                  <p className="text-sm font-medium text-[#1A1A18] leading-snug line-clamp-2 group-hover:text-[hsla(var(--color-accent)/1)] transition-colors">
                                    {post.title}
                                  </p>
                                </div>
                                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="shrink-0 opacity-0 group-hover:opacity-100 transition-opacity text-[hsla(var(--color-accent)/1)]">
                                  <path d="M3 7h8M8 4l3 3-3 3" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
                                </svg>
                              </Link>
                            </motion.div>
                          ))}
                        </motion.div>

                        {/* Footer CTA */}
                        <div className="px-5 pb-4 pt-1">
                          <Link
                            href="/pages/blog-posts"
                            onClick={() => setActiveMenu(null)}
                            className="flex items-center justify-center gap-2 w-full py-2.5 rounded-xl border border-[var(--color-border)] text-xs tracking-[0.08em] uppercase font-medium text-[#1A1A18] hover:bg-[#1A1A18] hover:text-white hover:border-[#1A1A18] transition-colors"
                          >
                            View all articles
                          </Link>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </nav>

                {/* Get Flow CTA */}
                <Link
                  href="/products/flow"
                  onClick={() => setActiveMenu(null)}
                  className="text-xs tracking-[0.08em] uppercase font-medium bg-[#1A1A18] text-white px-4 py-1.5 rounded-full hover:bg-[hsla(var(--color-accent)/1)] transition-colors"
                >
                  Get Flow
                </Link>
              </motion.div>

              {/* Right side: language */}
              <motion.div
                animate={scrolled
                  ? { borderRadius: 9999, paddingLeft: 16, paddingRight: 16, backgroundColor: 'rgba(255,255,255,0.75)', boxShadow: '0 4px 24px rgba(0,0,0,0.08)' }
                  : { borderRadius: 0, paddingLeft: 0, paddingRight: 0, backgroundColor: 'rgba(255,255,255,0)', boxShadow: '0 0 0 rgba(0,0,0,0)' }
                }
                transition={{ duration: 0.5, ease: easeOut }}
                className="hidden md:flex items-center border border-white/0 backdrop-blur-xl h-10"
                style={{ borderColor: scrolled ? 'rgba(255,255,255,0.3)' : 'rgba(255,255,255,0)' }}
              >
                <LanguageSelector muted={scrolled} />
              </motion.div>
            </div>
          </div>
        </div>
      </header>
    </>
  );
}
