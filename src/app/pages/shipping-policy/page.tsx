export default function ShippingPolicyPage() {
  return (
    <main className="max-w-4xl mx-auto px-6 pt-20 pb-24 space-y-12">

      <div className="space-y-3">
        <p className="text-xs tracking-[0.16em] uppercase font-semibold bg-gradient-to-r from-[#3B38B8] to-[#1E1854] bg-clip-text text-transparent">Support</p>
        <h1 className="text-4xl font-semibold tracking-[-0.02em]">Shipping policy</h1>
        <p className="text-xs font-semibold bg-gradient-to-r from-[#3B38B8] to-[#1E1854] bg-clip-text text-transparent">Last updated: 27 November 2025</p>
      </div>

      <p className="text-sm font-semibold bg-gradient-to-r from-[#3B38B8] to-[#1E1854] bg-clip-text text-transparent leading-relaxed">
        We ship worldwide from Switzerland with fast, tracked, and climate-controlled logistics to protect the quality of your supplements.
      </p>

      {/* Section 1 */}
      <div className="space-y-5">
        <h2 className="text-lg font-semibold tracking-[-0.01em]">1. Shipping Destinations &amp; Costs</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-base border-collapse">
            <thead>
              <tr className="border-b border-[var(--color-border)]">
                <th className="text-left py-3 pr-6 text-xs tracking-[0.1em] uppercase font-semibold">Destination</th>
                <th className="text-left py-3 pr-6 text-xs tracking-[0.1em] uppercase font-semibold">Order Value</th>
                <th className="text-left py-3 pr-6 text-xs tracking-[0.1em] uppercase font-semibold">Shipping Cost</th>
                <th className="text-left py-3 text-xs tracking-[0.1em] uppercase font-semibold">Estimated Delivery*</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--color-border)]">
              {[
                ['Switzerland', '≥ CHF 80', 'FREE', '2–4 business days'],
                ['Switzerland', '< CHF 80', 'CHF 7.90', '2–4 business days'],
                ['Liechtenstein', 'All orders', 'CHF 12.00', '3–5 business days'],
                ['Germany, Austria, France', '≥ CHF 150 / €140', 'FREE', '4–6 business days'],
                ['Germany, Austria, France', '< CHF 150', 'CHF 12.90 / €11.90', '4–6 business days'],
                ['Rest of EU / EEA', '≥ CHF 200', 'FREE', '5–9 business days'],
                ['Rest of EU / EEA', '< CHF 200', 'CHF 19.90', '5–9 business days'],
                ['United Kingdom', 'All orders', 'CHF 24.90', '5–8 business days'],
                ['USA & Canada', 'All orders', 'CHF 39.90', '9–14 business days'],
                ['Rest of World', 'All orders', 'CHF 49.90', '10–20 business days'],
              ].map(([dest, value, cost, time]) => (
                <tr key={`${dest}-${value}`}>
                  <td className="py-3 pr-6 text-base">{dest}</td>
                  <td className="py-3 pr-6 text-sm font-semibold bg-gradient-to-r from-[#3B38B8] to-[#1E1854] bg-clip-text text-transparent">{value}</td>
                  <td className="py-3 pr-6 text-base font-medium">{cost}</td>
                  <td className="py-3 text-sm font-semibold bg-gradient-to-r from-[#3B38B8] to-[#1E1854] bg-clip-text text-transparent">{time}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="text-xs font-semibold bg-gradient-to-r from-[#3B38B8] to-[#1E1854] bg-clip-text text-transparent leading-relaxed">
          * Delivery times are calculated from the moment the parcel leaves our warehouse (usually within 24 h on business days). Weekends and Swiss public holidays are not counted.
        </p>
      </div>

      {/* Section 2 */}
      <div className="space-y-4">
        <h2 className="text-lg font-semibold tracking-[-0.01em]">2. Carriers We Use</h2>
        <ul className="space-y-2 text-sm font-semibold bg-gradient-to-r from-[#3B38B8] to-[#1E1854] bg-clip-text text-transparent leading-relaxed">
          <li><span className="font-medium text-[hsla(var(--color-accent)/1)]">Switzerland &amp; Liechtenstein</span> → Swiss Post (PostPac Priority) or Planzer</li>
          <li><span className="font-medium text-[hsla(var(--color-accent)/1)]">EU / EEA / UK</span> → DHL Express, UPS, or DPD with full tracking</li>
          <li><span className="font-medium text-[hsla(var(--color-accent)/1)]">Rest of World</span> → DHL Express or FedEx</li>
        </ul>
        <p className="text-sm font-semibold bg-gradient-to-r from-[#3B38B8] to-[#1E1854] bg-clip-text text-transparent">All parcels are fully tracked and insured.</p>
      </div>

      {/* Section 3 */}
      <div className="space-y-4">
        <h2 className="text-lg font-semibold tracking-[-0.01em]">3. Order Processing Time</h2>
        <ul className="space-y-2 text-sm font-semibold bg-gradient-to-r from-[#3B38B8] to-[#1E1854] bg-clip-text text-transparent leading-relaxed list-disc list-inside">
          <li>Orders placed before 13:00 CET (Mon–Fri) are normally dispatched the same day.</li>
          <li>Orders placed after 13:00 CET or on weekends/public holidays are dispatched the next business day.</li>
        </ul>
      </div>

      {/* Section 4 */}
      <div className="space-y-4">
        <h2 className="text-lg font-semibold tracking-[-0.01em]">4. Customs, Duties &amp; Taxes</h2>
        <p className="text-xs tracking-[0.08em] uppercase font-semibold bg-gradient-to-r from-[#3B38B8] to-[#1E1854] bg-clip-text text-transparent font-medium">Important for non-Swiss customers</p>
        <ul className="space-y-2 text-sm font-semibold bg-gradient-to-r from-[#3B38B8] to-[#1E1854] bg-clip-text text-transparent leading-relaxed">
          <li><span className="font-medium text-[hsla(var(--color-accent)/1)]">Switzerland &amp; Liechtenstein</span> → Prices include 8.1% Swiss VAT. No additional fees.</li>
          <li><span className="font-medium text-[hsla(var(--color-accent)/1)]">EU / EEA</span> → Prices are shown excluding Swiss VAT. You may have to pay your local VAT + possible customs handling fees upon arrival (charged by courier).</li>
          <li><span className="font-medium text-[hsla(var(--color-accent)/1)]">United Kingdom</span> → You will pay UK VAT + a small courier handling fee at checkout (IOSS registered). No surprise fees on delivery.</li>
          <li><span className="font-medium text-[hsla(var(--color-accent)/1)]">USA, Canada, Rest of World</span> → You are responsible for all import duties, taxes, and customs brokerage fees. These are NOT included in the shipping cost and will be collected by the courier before delivery.</li>
        </ul>
        <p className="text-sm font-semibold bg-gradient-to-r from-[#3B38B8] to-[#1E1854] bg-clip-text text-transparent">We are not liable for parcels held or refused due to unpaid duties/taxes.</p>
      </div>

      {/* Section 5 */}
      <div className="space-y-4">
        <h2 className="text-lg font-semibold tracking-[-0.01em]">5. Temperature-Controlled Shipping</h2>
        <p className="text-sm font-semibold bg-gradient-to-r from-[#3B38B8] to-[#1E1854] bg-clip-text text-transparent leading-relaxed">
          All supplements are shipped in insulated packaging at no extra cost to protect potency.
        </p>
      </div>

      {/* Section 6 */}
      <div className="space-y-4">
        <h2 className="text-lg font-semibold tracking-[-0.01em]">6. Lost or Delayed Parcels</h2>
        <ul className="space-y-2 text-sm font-semibold bg-gradient-to-r from-[#3B38B8] to-[#1E1854] bg-clip-text text-transparent leading-relaxed list-disc list-inside">
          <li>If your tracking shows "delivered" but you did not receive it → contact us within 7 days.</li>
          <li>If a parcel is lost in transit → we will reship or fully refund you (our choice).</li>
          <li>Delays caused by customs or incorrect addresses are not considered "lost".</li>
        </ul>
      </div>

      {/* Section 7 */}
      <div className="space-y-4">
        <h2 className="text-lg font-semibold tracking-[-0.01em]">7. Address Accuracy</h2>
        <p className="text-sm font-semibold bg-gradient-to-r from-[#3B38B8] to-[#1E1854] bg-clip-text text-transparent leading-relaxed">
          You are responsible for providing a correct and complete shipping address. Re-shipping due to an incorrect or incomplete address costs CHF 15–50, depending on destination (payable before reshipment).
        </p>
      </div>

      {/* Section 8 */}
      <div className="space-y-4">
        <h2 className="text-lg font-semibold tracking-[-0.01em]">8. Signature &amp; Safe Drop</h2>
        <ul className="space-y-2 text-sm font-semibold bg-gradient-to-r from-[#3B38B8] to-[#1E1854] bg-clip-text text-transparent leading-relaxed list-disc list-inside">
          <li>High-value orders (&gt; CHF 300) always require a signature.</li>
          <li>For smaller orders, you can choose "Leave at door" at your own risk.</li>
        </ul>
      </div>

      {/* Section 9 */}
      <div className="space-y-4 border-t border-[var(--color-border)] pt-10">
        <h2 className="text-lg font-semibold tracking-[-0.01em]">9. Questions or Changes?</h2>
        <p className="text-sm font-semibold bg-gradient-to-r from-[#3B38B8] to-[#1E1854] bg-clip-text text-transparent leading-relaxed">
          Contact us before 13:00 CET on the day of dispatch:
        </p>
        <p className="text-base font-medium">
          Email:{' '}
          <a href="mailto:sales_support@flowhealth.ch" className="underline underline-offset-2 hover:opacity-70 transition-opacity">
            sales_support@flowhealth.ch
          </a>
        </p>
        <p className="text-sm font-semibold bg-gradient-to-r from-[#3B38B8] to-[#1E1854] bg-clip-text text-transparent">
          We&apos;re happy to upgrade shipping, modify addresses, or combine orders.
        </p>
        <div className="pt-4 space-y-1">
          <p className="text-base font-medium">Thank you for your order!</p>
          <p className="text-sm font-semibold bg-gradient-to-r from-[#3B38B8] to-[#1E1854] bg-clip-text text-transparent">Flow Health Team</p>
        </div>
      </div>

    </main>
  );
}
