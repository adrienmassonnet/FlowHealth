export default function PrivacyPolicyPage() {
  return (
    <main className="max-w-4xl mx-auto px-6 py-24 space-y-12">

      <div className="space-y-3">
        <p className="text-xs tracking-[0.14em] uppercase text-[hsla(var(--color-secondary)/1)]">Legal</p>
        <h1 className="text-4xl font-semibold tracking-[-0.02em]">Privacy policy</h1>
        <p className="text-xs text-[hsla(var(--color-secondary)/1)]">Last updated: 25 November 2025</p>
      </div>

      <p className="text-base text-[hsla(var(--color-secondary)/1)] leading-relaxed">
        We take your privacy very seriously. This Privacy Policy explains how Flow Health Massonnet, a company registered in Switzerland with its registered office at Chemin de Belle Combe 37, 1093 Lutry, collects, uses, shares and protects your personal data when you visit www.flowhealth.ch or purchase our dietary supplement products.
      </p>
      <p className="text-base text-[hsla(var(--color-secondary)/1)] leading-relaxed">
        This policy complies with the Swiss Federal Act on Data Protection (FADP, rev. 2023), the EU General Data Protection Regulation (GDPR) and other applicable European data-protection laws.
      </p>

      {/* Section 1 */}
      <div className="space-y-3">
        <h2 className="text-lg font-semibold tracking-[-0.01em]">1. Data Controller</h2>
        <div className="text-base text-[hsla(var(--color-secondary)/1)] leading-relaxed space-y-1">
          <p className="font-medium text-[hsla(var(--color-accent)/1)]">Flow Health Massonnet</p>
          <p>Chemin Belle Combe 37, 1093 Lutry, Switzerland</p>
          <p>
            Email:{' '}
            <a href="mailto:sales_support@flowhealth.ch" className="underline underline-offset-2 hover:opacity-70 transition-opacity">
              sales_support@flowhealth.ch
            </a>
          </p>
        </div>
      </div>

      {/* Section 2 */}
      <div className="space-y-5">
        <h2 className="text-lg font-semibold tracking-[-0.01em]">2. What personal data we collect and why</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-base border-collapse">
            <thead>
              <tr className="border-b border-[var(--color-border)]">
                <th className="text-left py-3 pr-5 text-xs tracking-[0.1em] uppercase font-semibold">Situation</th>
                <th className="text-left py-3 pr-5 text-xs tracking-[0.1em] uppercase font-semibold">Data collected</th>
                <th className="text-left py-3 pr-5 text-xs tracking-[0.1em] uppercase font-semibold">Purpose</th>
                <th className="text-left py-3 text-xs tracking-[0.1em] uppercase font-semibold">Legal basis</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--color-border)]">
              {[
                ['Creating an account', 'Name, email, encrypted password', 'Account management & login', 'Contract (Art. 6(1)(b) GDPR)'],
                ['Placing an order', 'Name, billing & shipping address, phone, email, payment details', 'Fulfil and ship your order, tax & customs', 'Contract + legal obligation'],
                ['Payment processing', 'Card or bank details (never stored by us — tokenised by PCI-DSS certified partners)', 'Secure payment', 'Contract'],
                ['Newsletter & marketing', 'Email, first name, optional interests & past purchases', 'Send offers, new products, wellness tips', 'Consent (Art. 6(1)(a) / Art. 31 FADP)'],
                ['Abandoned-cart & order follow-ups', 'Email, cart contents', 'Remind you & improve conversion', 'Legitimate interest (Art. 6(1)(f) / Art. 31 FADP)'],
                ['Customer support & contact form', 'Name, email, order number, message', 'Help you & solve issues', 'Contract / Legitimate interest'],
                ['Website analytics & advertising', 'IP address, browser, device, pages visited, UTM parameters, Facebook/Instagram/TikTok/Google pixels', 'Understand & improve user experience, retargeting', 'Consent (via cookie banner)'],
                ['Reviews & user-generated content', 'Name or nickname, photo (if uploaded), review text', 'Show authentic reviews', 'Consent + Legitimate interest'],
              ].map(([situation, data, purpose, basis]) => (
                <tr key={situation}>
                  <td className="py-3 pr-5 text-base font-medium align-top">{situation}</td>
                  <td className="py-3 pr-5 text-base text-[hsla(var(--color-secondary)/1)] align-top">{data}</td>
                  <td className="py-3 pr-5 text-base text-[hsla(var(--color-secondary)/1)] align-top">{purpose}</td>
                  <td className="py-3 text-base text-[hsla(var(--color-secondary)/1)] align-top">{basis}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Section 3 */}
      <div className="space-y-3">
        <h2 className="text-lg font-semibold tracking-[-0.01em]">3. Cookies &amp; tracking technologies</h2>
        <p className="text-base text-[hsla(var(--color-secondary)/1)] leading-relaxed">
          We use strictly necessary, performance and marketing cookies. You can manage your preferences at any time via the cookie banner or the "Cookie Settings" link in the footer.
        </p>
      </div>

      {/* Section 4 */}
      <div className="space-y-4">
        <h2 className="text-lg font-semibold tracking-[-0.01em]">4. Who we share your data with</h2>
        <ul className="space-y-2 text-base text-[hsla(var(--color-secondary)/1)] leading-relaxed">
          {[
            ['Shopify (Ireland)', 'e-commerce platform'],
            ['Stripe, PayPal, PostFinance', 'payment processing'],
            ['DHL, Swiss Post, Planzer', 'shipping & customs'],
            ['Klaviyo', 'email marketing (US with EU/Swiss SCCs + Data Processing Agreement)'],
            ['Google Analytics, Meta Pixel, TikTok Pixel', 'analytics & advertising (consent-based)'],
            ['Trusted third-party testing labs', 'only anonymised batch data'],
          ].map(([name, role]) => (
            <li key={name}>
              <span className="font-medium text-[hsla(var(--color-accent)/1)]">{name}</span> — {role}
            </li>
          ))}
        </ul>
        <p className="text-base text-[hsla(var(--color-secondary)/1)] leading-relaxed">
          All processors are bound by Data Processing Agreements and, where required, Standard Contractual Clauses or the new EU–U.S. Data Privacy Framework / Swiss–U.S. DPF.
        </p>
      </div>

      {/* Section 5 */}
      <div className="space-y-4">
        <h2 className="text-lg font-semibold tracking-[-0.01em]">5. International transfers</h2>
        <p className="text-base text-[hsla(var(--color-secondary)/1)] leading-relaxed">
          Data may be processed in the European Union, Switzerland, the United Kingdom and the United States. Whenever we transfer data outside Switzerland/EU → USA, we rely on:
        </p>
        <ul className="space-y-2 text-base text-[hsla(var(--color-secondary)/1)] leading-relaxed list-disc list-inside">
          <li>EU–U.S. Data Privacy Framework &amp; Swiss–U.S. DPF (for certified partners), or</li>
          <li>Standard Contractual Clauses (SCCs) + Technical &amp; Organisational Measures.</li>
        </ul>
      </div>

      {/* Section 6 */}
      <div className="space-y-4">
        <h2 className="text-lg font-semibold tracking-[-0.01em]">6. How long we keep your data</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-base border-collapse">
            <thead>
              <tr className="border-b border-[var(--color-border)]">
                <th className="text-left py-3 pr-8 text-xs tracking-[0.1em] uppercase font-semibold">Data type</th>
                <th className="text-left py-3 text-xs tracking-[0.1em] uppercase font-semibold">Retention period</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--color-border)]">
              {[
                ['Order & customer data', '10 years (Swiss/EU accounting & tax laws)'],
                ['Newsletter subscribers', 'Until you unsubscribe'],
                ['Analytics data', '26 months (Google Analytics)'],
                ['Support tickets', '3 years'],
              ].map(([type, period]) => (
                <tr key={type}>
                  <td className="py-3 pr-8 text-base font-medium">{type}</td>
                  <td className="py-3 text-base text-[hsla(var(--color-secondary)/1)]">{period}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="text-base text-[hsla(var(--color-secondary)/1)]">
          After the retention period, data is securely deleted or anonymised.
        </p>
      </div>

      {/* Section 7 */}
      <div className="space-y-4">
        <h2 className="text-lg font-semibold tracking-[-0.01em]">7. Your rights (Switzerland &amp; EU)</h2>
        <p className="text-base text-[hsla(var(--color-secondary)/1)]">You have the right to:</p>
        <ul className="space-y-1 text-base text-[hsla(var(--color-secondary)/1)] leading-relaxed list-disc list-inside">
          <li>Access your data</li>
          <li>Rectify inaccurate data</li>
          <li>Delete your data ("right to be forgotten")</li>
          <li>Restrict or object to processing</li>
          <li>Data portability</li>
          <li>Withdraw consent at any time</li>
          <li>Lodge a complaint with the Swiss Federal Data Protection and Information Commissioner (FDPIC) or your local EU supervisory authority</li>
        </ul>
        <p className="text-base text-[hsla(var(--color-secondary)/1)] leading-relaxed">
          To exercise any right, write to{' '}
          <a href="mailto:sales_support@flowhealth.ch" className="underline underline-offset-2 hover:opacity-70 transition-opacity">
            sales_support@flowhealth.ch
          </a>
          . We will respond within 30 days.
        </p>
      </div>

      {/* Section 8 */}
      <div className="space-y-3">
        <h2 className="text-lg font-semibold tracking-[-0.01em]">8. Children</h2>
        <p className="text-base text-[hsla(var(--color-secondary)/1)] leading-relaxed">
          Our products and website are not intended for persons under 18. We do not knowingly collect data from children.
        </p>
      </div>

      {/* Section 9 */}
      <div className="space-y-3">
        <h2 className="text-lg font-semibold tracking-[-0.01em]">9. Security</h2>
        <p className="text-base text-[hsla(var(--color-secondary)/1)] leading-relaxed">
          We use TLS encryption, regular penetration testing, and strict access controls. Payment data is never stored on our servers.
        </p>
      </div>

      {/* Section 10 */}
      <div className="space-y-3">
        <h2 className="text-lg font-semibold tracking-[-0.01em]">10. Changes to this policy</h2>
        <p className="text-base text-[hsla(var(--color-secondary)/1)] leading-relaxed">
          We may update this policy from time to time. The new version will be published on this page with an updated "Last updated" date. Significant changes will be communicated by email or via a banner on the website.
        </p>
      </div>

      {/* Section 11 */}
      <div className="space-y-4 border-t border-[var(--color-border)] pt-10">
        <h2 className="text-lg font-semibold tracking-[-0.01em]">11. Contact us</h2>
        <div className="text-base text-[hsla(var(--color-secondary)/1)] space-y-1">
          <p>
            Email:{' '}
            <a href="mailto:sales_support@flowhealth.com" className="underline underline-offset-2 hover:opacity-70 transition-opacity">
              sales_support@flowhealth.com
            </a>
          </p>
          <p>Post: Flow Health, Chemin de Belle Combe 37, 1093 Lutry, Switzerland</p>
        </div>
        <div className="pt-4 space-y-1">
          <p className="text-base font-medium">Thank you for trusting us with your data.</p>
          <p className="text-base text-[hsla(var(--color-secondary)/1)]">Flow Health Team</p>
        </div>
      </div>

    </main>
  );
}
