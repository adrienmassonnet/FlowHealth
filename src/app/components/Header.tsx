'use client';

import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { trackEvent } from '@/lib/clarity';

// ─── Data ───────────────────────────────────────────────────────────────────

const languages = [
  { code: 'EN', label: 'English' },
  { code: 'FR', label: 'Français' },
  { code: 'DE', label: 'Deutsch' },
  { code: 'IT', label: 'Italiano' },
];

const aboutLinks = [
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
            ? 'text-[hsla(var(--color-secondary)/0.6)] hover:text-[#1E1854]'
            : 'text-[hsla(var(--color-secondary)/1)] hover:text-[hsla(var(--color-accent)/1)]'
        }`}
      >
        <svg width="13" height="13" viewBox="0 0 16 16" fill="none" className="shrink-0">
          <circle cx="8" cy="8" r="6.5" stroke="currentColor" strokeWidth="1.2"/>
          <path d="M8 1.5C8 1.5 5.5 4 5.5 8C5.5 12 8 14.5 8 14.5M8 1.5C8 1.5 10.5 4 10.5 8C10.5 12 8 14.5 8 14.5M1.5 8H14.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
        </svg>
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
                    ? 'bg-[#1E1854] text-white'
                    : 'text-[#1E1854] hover:bg-[#1E185408]'
                }`}
              >
                <span>{lang.label}</span>
                <span className={`font-mono text-xs ${selected === lang.code ? 'text-white/50' : 'text-[hsla(var(--color-secondary)/0.4)]'}`}>{lang.code}</span>
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
          ? 'bg-[#E8E8FF] text-[#1E1854]'
          : 'text-[hsla(var(--color-secondary)/1)] hover:text-[#3B38B8] hover:bg-[#E8E8FF]'
      }`}
    >
      {label}
      <Chevron open={open} />
    </button>
  );
}

// ─── Header ──────────────────────────────────────────────────────────────────

type ActiveMenu = 'about' | null;

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [activeMenu, setActiveMenu] = useState<ActiveMenu>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const navRef = useRef<HTMLElement>(null);

  useEffect(() => {
    let rafId: number;
    const onScroll = () => {
      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(() => {
        setScrolled(window.scrollY > 10);
        setActiveMenu(null);
      });
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => { window.removeEventListener('scroll', onScroll); cancelAnimationFrame(rafId); };
  }, []);

  // Close desktop dropdowns on outside click
  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (navRef.current && !navRef.current.contains(e.target as Node)) {
        setActiveMenu(null);
      }
    }
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  // Lock body scroll when mobile drawer is open
  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [mobileOpen]);

  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  function openMenu(menu: ActiveMenu) {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setActiveMenu(menu);
  }

  function scheduleClose() {
    closeTimer.current = setTimeout(() => setActiveMenu(null), 120);
  }

  const pillStyle = {
    backgroundColor: 'rgba(255,255,255,0.75)',
    boxShadow: '0 4px 24px rgba(0,0,0,0.08)',
  };

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

      {/* Mobile drawer — z-[70] so it sits above the fixed header (z-50) */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              key="mobile-backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 z-[60] bg-black/30 backdrop-blur-sm md:hidden"
              onClick={() => setMobileOpen(false)}
            />
            <motion.div
              key="mobile-drawer"
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="fixed top-0 left-0 bottom-0 z-[70] w-[300px] bg-white flex flex-col md:hidden shadow-2xl"
            >
              {/* Drawer header */}
              <div className="flex items-center justify-between px-5 h-16 border-b border-[var(--color-border)] shrink-0">
                <Link href="/" onClick={() => setMobileOpen(false)} className="flex items-center gap-2.5" aria-label="Flow Health">
                  <img src="/flow-logomark.svg?v=2" alt="" width={20} height={20} className="w-5 h-5" />
                  <img src="/flow-wordmark.svg?v=2" alt="Flow" width={51} height={20} className="h-5 w-auto" />
                </Link>
                <button onClick={() => setMobileOpen(false)} className="p-2 -mr-1 text-[#1E1854]" aria-label="Close menu">
                  <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                    <path d="M3 3l12 12M15 3L3 15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                  </svg>
                </button>
              </div>

              {/* Shop CTA — top of drawer */}
              <div className="px-4 pt-4 pb-3 shrink-0">
                <Link
                  href="/products/rooibos-hibiscus-pomegranate"
                  onClick={() => { setMobileOpen(false); trackEvent('header_get_flow_mobile'); }}
                  className="btn-cta flex items-center justify-center w-full py-3.5 rounded-full text-white text-xs tracking-[0.08em] uppercase font-semibold"
                >
                  Shop
                </Link>
              </div>

              {/* Drawer nav */}
              <nav className="flex-1 overflow-y-auto py-5">

                {/* For the Seekers section */}
                <div className="px-3 mb-5">
                  <p className="text-xs uppercase tracking-[0.14em] font-semibold text-[hsla(var(--color-secondary)/0.4)] px-3 mb-2">For the Seekers</p>
                  <div className="space-y-0.5">
                    {aboutLinks.map((link) => (
                      <Link
                        key={link.href}
                        href={link.href}
                        onClick={() => setMobileOpen(false)}
                        className="group flex items-center gap-3 px-3 py-3 rounded-xl hover:bg-[#1E185408] transition-colors"
                      >
                        <span className="shrink-0 w-8 h-8 rounded-lg bg-[#1E18540A] flex items-center justify-center text-[#1E1854]/60 group-hover:bg-[#1E1854] group-hover:text-white transition-colors">
                          {link.icon}
                        </span>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-[#1E1854]">{link.label}</p>
                        </div>
                      </Link>
                    ))}
                    <Link
                      href="/pages/blog-posts"
                      onClick={() => setMobileOpen(false)}
                      className="group flex items-center gap-3 px-3 py-3 rounded-xl hover:bg-[#1E185408] transition-colors"
                    >
                      <span className="shrink-0 w-8 h-8 rounded-lg bg-[#1E18540A] flex items-center justify-center text-[#1E1854]/60 group-hover:bg-[#1E1854] group-hover:text-white transition-colors">
                        <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                          <path d="M4 5h12M4 8h8M4 11h10M4 14h6" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/>
                        </svg>
                      </span>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-[#1E1854]">Our Articles</p>
                      </div>
                    </Link>
                  </div>
                </div>

                {/* Divider */}
                <div className="mx-3 mb-4 border-t border-[var(--color-border)]" />

                {/* Utility links */}
                <div className="px-6">
                  <Link
                    href="/pages/faq"
                    onClick={() => setMobileOpen(false)}
                    className="inline-flex items-center px-4 py-1.5 rounded-full border border-[var(--color-border)] text-xs tracking-[0.08em] uppercase font-medium text-[#1E1854] hover:bg-[#1E185408] transition-colors"
                  >
                    FAQ
                  </Link>
                </div>
              </nav>

            </motion.div>
          </>
        )}
      </AnimatePresence>

      <header className="fixed top-2 left-0 right-0 z-50">
        <div className="relative">
          <div className="max-w-[1200px] mx-auto px-6">
            <div className="h-14 flex items-center justify-between gap-3">

              {/* Main pill */}
              <motion.div
                initial={{ opacity: 0, y: -8, filter: 'blur(6px)' }}
                animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                transition={{ duration: 0.9, ease: easeOut }}
                className="md:flex-none flex items-center justify-center gap-3 md:gap-5 border border-white/30 backdrop-blur-xl h-10 w-auto rounded-full px-3 md:px-5"
                style={pillStyle}
              >
                {/* Mobile: hamburger + logo side by side */}
                <div className="md:hidden flex items-center gap-2.5">
                  <button
                    className="p-1 text-[#1E1854] shrink-0"
                    aria-label="Open menu"
                    onClick={() => setMobileOpen(true)}
                  >
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                      <path d="M3 5h14M3 10h14M3 15h14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                    </svg>
                  </button>
                  <Link
                    href="/"
                    onClick={() => setMobileOpen(false)}
                    className="flex items-center gap-1.5"
                    aria-label="Flow Health"
                  >
                    <img src="/flow-logomark.svg?v=2" alt="" width={18} height={18} className="w-4.5 h-4.5" />
                    <img src="/flow-wordmark.svg?v=2" alt="Flow" width={46} height={18} className="h-4.5 w-auto" />
                  </Link>
                </div>

                {/* Logo — desktop only */}
                <Link
                  href="/"
                  onClick={() => { setActiveMenu(null); trackEvent('header_logo_click'); }}
                  className="shrink-0 hidden md:flex items-center gap-2"
                  aria-label="Flow Health"
                >
                  <img src="/flow-logomark.svg?v=2" alt="" width={20} height={20} className="hidden md:block w-5 h-5" />
                  <img src="/flow-wordmark.svg?v=2" alt="Flow" width={51} height={20} className="hidden md:block h-5 w-auto" />
                </Link>

                {/* Desktop nav dropdowns */}
                <nav ref={navRef} className="hidden md:flex items-center gap-2 relative">
                    <div className="relative" onMouseEnter={() => { openMenu('about'); trackEvent('header_menu_about_flow'); }} onMouseLeave={scheduleClose}>
                      <NavButton label="For the Seekers" open={activeMenu === 'about'} />
                      <AnimatePresence>
                        {activeMenu === 'about' && (
                          <motion.div
                            key="about-panel"
                            variants={panelVariants}
                            initial="hidden"
                            animate="visible"
                            exit="exit"
                            className="absolute left-1/2 -translate-x-1/2 top-full mt-3 w-[280px] rounded-2xl overflow-hidden z-50 bg-white"
                            style={{
                              border: '1px solid rgba(30,24,84,0.08)',
                              boxShadow: '0 1px 0 rgba(255,255,255,0.9) inset, 0 20px 48px rgba(30,24,84,0.11)',
                            }}
                          >
                            <motion.div className="p-2 space-y-0.5" variants={listVariants} initial="hidden" animate="visible">
                              {aboutLinks.map((link) => (
                                <motion.div key={link.href} variants={itemVariants}>
                                  <Link
                                    href={link.href}
                                    onClick={() => setActiveMenu(null)}
                                    className="group flex items-center gap-3 px-3 py-3 rounded-xl hover:bg-[#E8E8FF] transition-colors duration-150"
                                  >
                                    <span className="shrink-0 w-8 h-8 rounded-lg bg-[#1E1854]/[0.06] flex items-center justify-center text-[#1E1854]/60 group-hover:bg-[#1E1854] group-hover:text-white transition-colors duration-200">
                                      {link.icon}
                                    </span>
                                    <div className="flex-1 min-w-0">
                                      <p className="text-sm font-semibold text-[#1E1854] leading-snug">{link.label}</p>
                                    </div>
                                  </Link>
                                </motion.div>
                              ))}
                              <motion.div variants={itemVariants}>
                                <Link
                                  href="/pages/blog-posts"
                                  onClick={() => setActiveMenu(null)}
                                  className="group flex items-center gap-3 px-3 py-3 rounded-xl hover:bg-[#E8E8FF] transition-colors duration-150"
                                >
                                  <span className="shrink-0 w-8 h-8 rounded-lg bg-[#1E1854]/[0.06] flex items-center justify-center text-[#1E1854]/60 group-hover:bg-[#1E1854] group-hover:text-white transition-colors duration-200">
                                    <svg width="18" height="18" viewBox="0 0 20 20" fill="none">
                                      <path d="M4 5h12M4 8h8M4 11h10M4 14h6" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/>
                                    </svg>
                                  </span>
                                  <div className="flex-1 min-w-0">
                                    <p className="text-sm font-semibold text-[#1E1854] leading-snug">Our Articles</p>
                                  </div>
                                </Link>
                              </motion.div>
                            </motion.div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                </nav>

                {/* Shop CTA */}
                <Link
                  href="/products/rooibos-hibiscus-pomegranate"
                  onClick={() => { setActiveMenu(null); trackEvent('header_get_flow_desktop'); }}
                  className="btn-cta flex items-center gap-2 text-xs tracking-[0.08em] uppercase font-medium text-white px-4 py-1.5 rounded-full shrink-0"
                >
                  Shop
                </Link>

              </motion.div>

              {/* Language selector — mobile only, hidden when scrolled */}
              <AnimatePresence>
                {!scrolled && (
                  <motion.span
                    key="mobile-lang"
                    initial={{ opacity: 0, scale: 0.85 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.85 }}
                    transition={{ duration: 0.25, ease: easeOut }}
                    className="md:hidden shrink-0 w-10 h-10 flex items-center justify-center rounded-full border border-white/30 backdrop-blur-xl"
                    style={pillStyle}
                  >
                    <LanguageSelector muted={false} />
                  </motion.span>
                )}
              </AnimatePresence>

              {/* Right side: language — desktop only */}
              <motion.div
                initial={{ opacity: 0, y: -8, filter: 'blur(6px)' }}
                animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                transition={{ duration: 0.9, ease: easeOut, delay: 0.08 }}
                className="hidden md:flex items-center border border-white/30 backdrop-blur-xl h-10 rounded-full px-4"
                style={pillStyle}
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