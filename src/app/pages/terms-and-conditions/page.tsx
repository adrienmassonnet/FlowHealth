export default function TermsAndConditionsPage() {
  return (
    <main className="max-w-4xl mx-auto px-6 pt-20 pb-24 space-y-12">

      <div className="space-y-3">
        <p className="text-xs tracking-[0.16em] uppercase text-[hsla(var(--color-secondary)/1)]">Legal</p>
        <h1 className="text-4xl font-semibold tracking-[-0.02em]">Terms &amp; conditions</h1>
        <p className="text-xs text-[hsla(var(--color-secondary)/1)]">Last updated: 27 November 2025</p>
      </div>

      <div className="space-y-3">
        <p className="text-sm text-[hsla(var(--color-secondary)/1)] leading-relaxed">
          Welcome to www.flowhealth.ch. These Terms and Conditions govern your use of our website and the purchase of our dietary supplement products.
        </p>
        <p className="text-sm text-[hsla(var(--color-secondary)/1)] leading-relaxed">
          By placing an order or using this website, you accept these Terms in full.
        </p>
      </div>

      {/* Section 1 */}
      <div className="space-y-3">
        <h2 className="text-lg font-semibold tracking-[-0.01em]">1. Company Information</h2>
        <div className="text-sm text-[hsla(var(--color-secondary)/1)] leading-relaxed space-y-1">
          <p className="font-medium text-[hsla(var(--color-accent)/1)]">Flow Health Massonnet</p>
          <p>Chemin de Belle Combe 37, 1093 Lutry, Switzerland</p>
          <p>
            Email:{' '}
            <a href="mailto:sales_support@flowhealth.ch" className="underline underline-offset-2 hover:opacity-70 transition-opacity">
              sales_support@flowhealth.ch
            </a>
          </p>
        </div>
      </div>

      {/* Section 2 */}
      <div className="space-y-3">
        <h2 className="text-lg font-semibold tracking-[-0.01em]">2. Applicability</h2>
        <p className="text-sm text-[hsla(var(--color-secondary)/1)] leading-relaxed">
          These Terms apply to all visits to and all orders placed on www.flowhealth.ch. We reserve the right to update these Terms at any time. The version valid at the time of your order applies to that purchase.
        </p>
      </div>

      {/* Section 3 */}
      <div className="space-y-4">
        <h2 className="text-lg font-semibold tracking-[-0.01em]">3. Products &amp; Health Information</h2>
        <ul className="space-y-2 text-sm text-[hsla(var(--color-secondary)/1)] leading-relaxed list-disc list-inside">
          <li>Our products are food supplements (not medicines).</li>
          <li>They are not intended to diagnose, treat, cure, or prevent any disease.</li>
          <li>The statements have not been evaluated by Swissmedic, the European Medicines Agency (EMA), or the FDA.</li>
          <li>You should consult a healthcare professional before use, especially if you are pregnant, breastfeeding, under 18, or have a medical condition.</li>
        </ul>
      </div>

      {/* Section 4 */}
      <div className="space-y-4">
        <h2 className="text-lg font-semibold tracking-[-0.01em]">4. Ordering &amp; Contract Formation</h2>
        <ul className="space-y-2 text-sm text-[hsla(var(--color-secondary)/1)] leading-relaxed list-disc list-inside">
          <li>Offers on the website are non-binding until you place an order.</li>
          <li>By clicking "Pay Now", you make a binding offer to purchase.</li>
          <li>We send an automatic order confirmation by email — the contract is concluded only when we explicitly accept (usually via shipping confirmation).</li>
          <li>Minimum age: 18 years.</li>
        </ul>
      </div>

      {/* Section 5 */}
      <div className="space-y-4">
        <h2 className="text-lg font-semibold tracking-[-0.01em]">5. Prices &amp; Payment</h2>
        <ul className="space-y-2 text-sm text-[hsla(var(--color-secondary)/1)] leading-relaxed list-disc list-inside">
          <li>All prices are in CHF (Swiss Francs) and include Swiss VAT (8.1%).</li>
          <li>For deliveries outside Switzerland (EU/UK/rest of world), prices are shown excl. VAT; import duties and local taxes are your responsibility and will be charged by the courier (DDP not offered).</li>
          <li>Accepted payment methods: Credit card, PayPal, Apple Pay, Google Pay, TWINT, PostFinance.</li>
          <li>Payment is due immediately.</li>
        </ul>
      </div>

      {/* Section 6 */}
      <div className="space-y-4">
        <h2 className="text-lg font-semibold tracking-[-0.01em]">6. Subscription Terms</h2>
        <ul className="space-y-2 text-sm text-[hsla(var(--color-secondary)/1)] leading-relaxed list-disc list-inside">
          <li>You may choose "Subscribe &amp; Save".</li>
          <li>Subscription renews automatically at the selected interval until cancelled.</li>
          <li>You can skip, pause, or cancel anytime in your account or by email (at least 48 h before next renewal).</li>
          <li>Price changes for existing subscriptions will be announced 30 days in advance.</li>
        </ul>
      </div>

      {/* Section 7 */}
      <div className="space-y-5">
        <h2 className="text-lg font-semibold tracking-[-0.01em]">7. Shipping &amp; Delivery</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-base border-collapse">
            <thead>
              <tr className="border-b border-[var(--color-border)]">
                <th className="text-left py-3 pr-5 text-xs tracking-[0.1em] uppercase font-semibold">Destination</th>
                <th className="text-left py-3 pr-5 text-xs tracking-[0.1em] uppercase font-semibold">Shipping Cost</th>
                <th className="text-left py-3 pr-5 text-xs tracking-[0.1em] uppercase font-semibold">Delivery Time</th>
                <th className="text-left py-3 text-xs tracking-[0.1em] uppercase font-semibold">Carrier</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--color-border)]">
              {[
                ['Switzerland', 'Free from CHF 80', '2–4 business days', 'Swiss Post / Planzer'],
                ['EU / EEA', 'Calculated at checkout', '3–7 business days', 'DHL / UPS'],
                ['United Kingdom', 'Calculated', '4–8 business days', 'DHL + customs clearance'],
                ['Rest of World', 'Calculated', '7–14 business days', 'DHL Express'],
              ].map(([dest, cost, time, carrier]) => (
                <tr key={dest}>
                  <td className="py-3 pr-5 text-base font-medium">{dest}</td>
                  <td className="py-3 pr-5 text-sm text-[hsla(var(--color-secondary)/1)]">{cost}</td>
                  <td className="py-3 pr-5 text-sm text-[hsla(var(--color-secondary)/1)]">{time}</td>
                  <td className="py-3 text-sm text-[hsla(var(--color-secondary)/1)]">{carrier}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <ul className="space-y-1 text-sm text-[hsla(var(--color-secondary)/1)] leading-relaxed list-disc list-inside">
          <li>Risk passes to you when the parcel is handed to the carrier.</li>
          <li>We are not responsible for customs delays or additional fees.</li>
        </ul>
      </div>

      {/* Section 8 */}
      <div className="space-y-4">
        <h2 className="text-lg font-semibold tracking-[-0.01em]">8. 30-Day Money-Back Guarantee</h2>
        <ul className="space-y-2 text-sm text-[hsla(var(--color-secondary)/1)] leading-relaxed list-disc list-inside">
          <li>You may return unopened and unused products within 30 days of delivery for a full refund (excluding shipping costs).</li>
          <li>Opened products are only eligible if defective or damaged.</li>
          <li>Return shipping costs are paid by the customer (except for faulty items).</li>
          <li>Refunds are issued within 10 business days of receiving the return.</li>
        </ul>
      </div>

      {/* Section 9 */}
      <div className="space-y-4">
        <h2 className="text-lg font-semibold tracking-[-0.01em]">9. Right of Withdrawal (EU/EEA customers only)</h2>
        <ul className="space-y-2 text-sm text-[hsla(var(--color-secondary)/1)] leading-relaxed list-disc list-inside">
          <li>You have a statutory 14-day withdrawal right starting the day after delivery (no reason required).</li>
          <li>
            To exercise it, send a clear statement to{' '}
            <a href="mailto:sales_support@flowhealth.ch" className="underline underline-offset-2 hover:opacity-70 transition-opacity">
              sales_support@flowhealth.ch
            </a>{' '}
            before the 14 days expire.
          </li>
          <li>Our voluntary 30-day money-back guarantee (above) replaces and extends this right.</li>
        </ul>
      </div>

      {/* Section 10 */}
      <div className="space-y-4">
        <h2 className="text-lg font-semibold tracking-[-0.01em]">10. Warranty &amp; Liability</h2>
        <ul className="space-y-2 text-sm text-[hsla(var(--color-secondary)/1)] leading-relaxed list-disc list-inside">
          <li>Swiss law provides a 2-year warranty for defects.</li>
          <li>We are liable only for intentional acts or gross negligence. Liability for slight negligence — except for personal injury — is excluded to the extent permitted by law.</li>
        </ul>
      </div>

      {/* Section 11 */}
      <div className="space-y-3">
        <h2 className="text-lg font-semibold tracking-[-0.01em]">11. Intellectual Property</h2>
        <p className="text-sm text-[hsla(var(--color-secondary)/1)] leading-relaxed">
          All content (photos, texts, logos, designs) is owned by Flow Health Massonnet or its licensors. Any reproduction or use without written permission is prohibited.
        </p>
      </div>

      {/* Section 12 */}
      <div className="space-y-3">
        <h2 className="text-lg font-semibold tracking-[-0.01em]">12. Force Majeure</h2>
        <p className="text-sm text-[hsla(var(--color-secondary)/1)] leading-relaxed">
          We are not liable for delays or non-performance caused by events beyond our control (e.g., strikes, pandemics, customs delays).
        </p>
      </div>

      {/* Section 13 */}
      <div className="space-y-4">
        <h2 className="text-lg font-semibold tracking-[-0.01em]">13. Governing Law &amp; Jurisdiction</h2>
        <ul className="space-y-2 text-sm text-[hsla(var(--color-secondary)/1)] leading-relaxed list-disc list-inside">
          <li>Swiss law applies (excluding UN Sales Convention — CISG).</li>
          <li>Exclusive place of jurisdiction: Lutry, Switzerland.</li>
          <li>
            EU consumers may also use the courts of their residence and the EU Online Dispute Resolution platform:{' '}
            <a href="https://ec.europa.eu/odr" target="_blank" rel="noopener noreferrer" className="underline underline-offset-2 hover:opacity-70 transition-opacity">
              https://ec.europa.eu/odr
            </a>
          </li>
        </ul>
      </div>

      {/* Section 14 */}
      <div className="space-y-3">
        <h2 className="text-lg font-semibold tracking-[-0.01em]">14. Severability</h2>
        <p className="text-sm text-[hsla(var(--color-secondary)/1)] leading-relaxed">
          If any provision of these Terms is or becomes invalid, the remaining provisions remain valid.
        </p>
      </div>

      {/* Section 15 */}
      <div className="space-y-4 border-t border-[var(--color-border)] pt-10">
        <h2 className="text-lg font-semibold tracking-[-0.01em]">15. Contact</h2>
        <div className="text-sm text-[hsla(var(--color-secondary)/1)] space-y-1">
          <p>
            Email:{' '}
            <a href="mailto:sales_support@flowhealth.ch" className="underline underline-offset-2 hover:opacity-70 transition-opacity">
              sales_support@flowhealth.ch
            </a>
          </p>
          <p>
            Phone:{' '}
            <a href="tel:+41793545278" className="underline underline-offset-2 hover:opacity-70 transition-opacity">
              +41 79 354 52 78
            </a>{' '}
            (Mon–Fri 9–17 CET)
          </p>
        </div>
        <div className="pt-4 space-y-1">
          <p className="text-base font-medium">Thank you for choosing Flow Health!</p>
        </div>
      </div>

    </main>
  );
}
