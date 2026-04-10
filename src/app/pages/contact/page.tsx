'use client';

import { useState } from 'react';
import { trackEvent } from '@/lib/clarity';

const categories = [
  {
    title: 'Customer Support',
    description: 'Questions about your order, delivery, or account — we respond within 24 hours.',
    icon: (
      <svg width="18" height="18" viewBox="0 0 20 20" fill="none">
        <circle cx="10" cy="7" r="3" stroke="currentColor" strokeWidth="1.3"/>
        <path d="M4 17c0-3.314 2.686-6 6-6s6 2.686 6 6" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/>
      </svg>
    ),
  },
  {
    title: 'Feedback & Suggestions',
    description: 'We read everything. Your input directly shapes how Flow evolves.',
    icon: (
      <svg width="18" height="18" viewBox="0 0 20 20" fill="none">
        <path d="M10 3L12 7.5L17 8.2L13.5 11.5L14.5 16.5L10 14L5.5 16.5L6.5 11.5L3 8.2L8 7.5L10 3Z" stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round"/>
      </svg>
    ),
  },
  {
    title: 'Press & Media',
    description: 'For editorial requests or press inquiries, reach us at press@flowhealth.com.',
    icon: (
      <svg width="18" height="18" viewBox="0 0 20 20" fill="none">
        <rect x="3" y="5" width="14" height="10" rx="1.5" stroke="currentColor" strokeWidth="1.3"/>
        <path d="M3 8h14" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/>
        <path d="M7 12h2M11 12h2" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/>
      </svg>
    ),
  },
];

export default function ContactPage() {
  const [formData, setFormData] = useState({ firstName: '', lastName: '', email: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    trackEvent('contact_form_submit');
    setSubmitted(true);
  }

  return (
    <main className="pt-20 bg-white">

      {/* Hero section */}
      <div className="bg-white border-b border-[var(--color-border)]">
        <div className="max-w-[1200px] mx-auto px-6 pt-6 pb-12 md:py-16">
          <div className="flex flex-col md:grid md:grid-cols-2 md:gap-x-20 md:gap-y-10 gap-8 items-start">

            {/* Heading + description — first on all screens */}
            <div className="order-1 md:col-start-1 md:row-start-1">
              <p className="text-xs tracking-[0.16em] uppercase text-[hsla(var(--color-secondary)/0.5)] font-medium mb-3">Get in touch</p>
              <h1 className="text-3xl md:text-5xl font-semibold tracking-[-0.02em] leading-tight text-[#1E1854] mb-4">
                Contact Us
              </h1>
              <p className="text-sm text-[hsla(var(--color-secondary)/0.65)] leading-relaxed max-w-sm">
                Email, call, or fill out the form and we&apos;ll get back to you as soon as possible.
              </p>
            </div>

            {/* Contact links + categories — third on mobile, below heading on desktop */}
            <div className="order-3 md:col-start-1 md:row-start-2">
              <div className="space-y-2 mb-8">
                <a href="mailto:hello@flowhealth.com" onClick={() => trackEvent('contact_email_click')} className="flex items-center gap-2 text-sm text-[#1E1854] font-medium hover:text-[hsla(var(--color-accent)/1)] transition-colors">
                  <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                    <rect x="2" y="3.5" width="12" height="9" rx="1.5" stroke="currentColor" strokeWidth="1.2"/>
                    <path d="M2 6l6 4 6-4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
                  </svg>
                  hello@flowhealth.com
                </a>
                <a href="tel:+41000000000" onClick={() => trackEvent('contact_phone_click')} className="flex items-center gap-2 text-sm text-[#1E1854] font-medium hover:text-[hsla(var(--color-accent)/1)] transition-colors">
                  <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                    <path d="M3 2.5h2.5l1 3L5 7s1 3 4 4l1.5-1.5 3 1V13c0 .5-.5 1-1 1C5.5 14 2 8.5 2 3.5c0-.5.5-1 1-1z" stroke="currentColor" strokeWidth="1.2" strokeLinejoin="round"/>
                  </svg>
                  +41 00 000 00 00
                </a>
              </div>

              {/* Support categories */}
              <div className="space-y-4">
                {categories.map((cat) => (
                  <div key={cat.title} className="flex items-start gap-3">
                    <span className="shrink-0 w-8 h-8 rounded-lg bg-[#1E18540A] border border-[var(--color-border)] flex items-center justify-center text-[#1E1854]/60 mt-0.5">
                      {cat.icon}
                    </span>
                    <div>
                      <p className="text-sm font-semibold text-[#1E1854] leading-snug">{cat.title}</p>
                      <p className="text-xs text-[hsla(var(--color-secondary)/0.55)] leading-relaxed mt-0.5">{cat.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Form card — second on mobile, right column spanning both rows on desktop */}
            <div className="order-2 md:col-start-2 md:row-start-1 md:row-span-2 bg-white rounded-2xl border border-[var(--color-border)] shadow-[0_4px_32px_rgba(0,0,0,0.06)] p-7 md:p-9">
              {submitted ? (
                <div className="flex flex-col items-center text-center py-10 gap-4">
                  <div className="w-12 h-12 rounded-full bg-[#1E18540A] flex items-center justify-center">
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                      <path d="M5 13l4 4L19 7" stroke="#1E1854" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                  <div className="space-y-1">
                    <p className="text-base font-semibold text-[#1E1854]">Message sent</p>
                    <p className="text-sm text-[hsla(var(--color-secondary)/0.6)]">We&apos;ll get back to you within 24 hours.</p>
                  </div>
                </div>
              ) : (
                <>
                  <p className="text-xs tracking-[0.14em] uppercase text-[hsla(var(--color-secondary)/0.45)] font-medium mb-1">Write to us</p>
                  <h2 className="text-xl font-semibold text-[#1E1854] tracking-[-0.01em] mb-6">Get in Touch</h2>

                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-2 gap-3">
                      <div className="space-y-1.5">
                        <label className="text-xs font-medium text-[#1E1854]/60 tracking-[0.04em]">First name</label>
                        <input
                          type="text"
                          required
                          value={formData.firstName}
                          onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                          placeholder="Ada"
                          className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-[var(--color-border)] bg-[#1E18540A] text-[#1E1854] placeholder:text-[#1E1854]/25 focus:outline-none focus:border-[#1E1854]/40 focus:bg-white transition-colors"
                        />
                      </div>
                      <div className="space-y-1.5">
                        <label className="text-xs font-medium text-[#1E1854]/60 tracking-[0.04em]">Last name</label>
                        <input
                          type="text"
                          required
                          value={formData.lastName}
                          onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                          placeholder="Lovelace"
                          className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-[var(--color-border)] bg-[#1E18540A] text-[#1E1854] placeholder:text-[#1E1854]/25 focus:outline-none focus:border-[#1E1854]/40 focus:bg-white transition-colors"
                        />
                      </div>
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-medium text-[#1E1854]/60 tracking-[0.04em]">Your email</label>
                      <div className="relative">
                        <svg width="14" height="14" viewBox="0 0 16 16" fill="none" className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#1E1854]/30">
                          <rect x="2" y="3.5" width="12" height="9" rx="1.5" stroke="currentColor" strokeWidth="1.2"/>
                          <path d="M2 6l6 4 6-4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
                        </svg>
                        <input
                          type="email"
                          required
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          placeholder="ada@example.com"
                          className="w-full pl-9 pr-3.5 py-2.5 text-sm rounded-xl border border-[var(--color-border)] bg-[#1E18540A] text-[#1E1854] placeholder:text-[#1E1854]/25 focus:outline-none focus:border-[#1E1854]/40 focus:bg-white transition-colors"
                        />
                      </div>
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-medium text-[#1E1854]/60 tracking-[0.04em]">How can we help?</label>
                      <textarea
                        required
                        rows={4}
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        placeholder="Tell us what's on your mind…"
                        className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-[var(--color-border)] bg-[#1E18540A] text-[#1E1854] placeholder:text-[#1E1854]/25 focus:outline-none focus:border-[#1E1854]/40 focus:bg-white transition-colors resize-none"
                      />
                      <p className="text-right text-xs text-[#1E1854]/25">{formData.message.length}/500</p>
                    </div>

                    <button
                      type="submit"
                      className="btn-cta w-full py-3.5 rounded-xl text-white text-xs tracking-[0.08em] uppercase font-semibold"
                    >
                      Send message
                    </button>

                    <p className="text-center text-xs text-[hsla(var(--color-secondary)/0.4)] leading-relaxed">
                      By contacting us, you agree to our{' '}
                      <a href="/pages/terms-and-conditions" className="underline hover:text-[#1E1854] transition-colors">Terms of Service</a>
                      {' '}and{' '}
                      <a href="/pages/privacy-policy" className="underline hover:text-[#1E1854] transition-colors">Privacy Policy</a>.
                    </p>
                  </form>
                </>
              )}
            </div>

          </div>
        </div>
      </div>

    </main>
  );
}
