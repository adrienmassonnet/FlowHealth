import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Legal Notice',
  description: 'Legal notice and Impressum for Flow Health — company information as required under Swiss and EU law.',
};

export default function LegalNoticePage() {
  return (
    <main className="max-w-4xl mx-auto px-6 pt-20 pb-24 space-y-10">

      <div className="space-y-3">
        <p className="text-xs tracking-[0.16em] uppercase font-semibold bg-gradient-to-r from-brand to-ink bg-clip-text text-transparent">Legal</p>
        <h1 className="flow-h1">Legal notice / Impressum</h1>
        <p className="text-xs font-semibold bg-gradient-to-r from-brand to-ink bg-clip-text text-transparent">Required under Swiss and EU law · Last updated: 27 November 2025</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-ink/[12.5%]">

        {/* Company */}
        <div className="bg-ink/[3.1%] p-8 space-y-3">
          <h2 className="flow-label">Company</h2>
          <div className="text-sm font-semibold bg-gradient-to-r from-brand to-ink bg-clip-text text-transparent leading-relaxed space-y-0.5">
            <p className="font-medium text-[rgb(30,24,84)]">Flow Health Massonnet</p>
            <p>Chemin de Belle Combe 37</p>
            <p>1093 Lutry</p>
            <p>Switzerland</p>
          </div>
        </div>

        {/* Contact */}
        <div className="bg-ink/[3.1%] p-8 space-y-3">
          <h2 className="flow-label">Contact</h2>
          <div className="text-sm font-semibold bg-gradient-to-r from-brand to-ink bg-clip-text text-transparent leading-relaxed space-y-1">
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
              </a>
            </p>
            <p>Website: www.flowhealth.ch</p>
          </div>
        </div>

        {/* Commercial Register */}
        <div className="bg-ink/[3.1%] p-8 space-y-3">
          <h2 className="flow-label">Commercial Register</h2>
          <p className="text-sm font-semibold bg-gradient-to-r from-brand to-ink bg-clip-text text-transparent leading-relaxed">
            Registered in the Commercial Register of the Canton of Vaud
          </p>
        </div>

        {/* Managing Director */}
        <div className="bg-ink/[3.1%] p-8 space-y-3">
          <h2 className="flow-label">Managing Director / Authorized Signatories</h2>
          <p className="text-sm font-semibold bg-gradient-to-r from-brand to-ink bg-clip-text text-transparent">Adrien Massonnet</p>
        </div>

        {/* EU Representative */}
        <div className="bg-ink/[3.1%] p-8 space-y-3">
          <h2 className="flow-label">EU Representative (Art. 27 GDPR)</h2>
          <div className="text-sm font-semibold bg-gradient-to-r from-brand to-ink bg-clip-text text-transparent leading-relaxed space-y-0.5">
            <p>Adrien Massonnet</p>
            <p>Chemin de Belle Combe 37</p>
            <p>1093 Lutry, Switzerland</p>
            <p>
              Email:{' '}
              <a href="mailto:sales_support@flowhealth.ch" className="underline underline-offset-2 hover:opacity-70 transition-opacity">
                sales_support@flowhealth.ch
              </a>
            </p>
          </div>
        </div>

        {/* Hosting */}
        <div className="bg-ink/[3.1%] p-8 space-y-3">
          <h2 className="flow-label">Hosting</h2>
          <div className="text-sm font-semibold bg-gradient-to-r from-brand to-ink bg-clip-text text-transparent leading-relaxed space-y-0.5">
            <p className="font-medium text-[rgb(30,24,84)]">Shopify International Limited</p>
            <p>2nd Floor Victoria Buildings</p>
            <p>1-2 Haddington Road</p>
            <p>Dublin 4, D04 XN32</p>
            <p>Ireland</p>
          </div>
        </div>

      </div>

      {/* Platform */}
      <div className="space-y-3">
        <h2 className="flow-h4">Platform</h2>
        <p className="text-sm font-semibold bg-gradient-to-r from-brand to-ink bg-clip-text text-transparent leading-relaxed">
          This website is operated on Shopify Inc. (Canada) with servers primarily in the EU and Switzerland.
        </p>
      </div>

      {/* Liability for Content */}
      <div className="space-y-3">
        <h2 className="flow-h4">Liability for Content</h2>
        <p className="text-sm font-semibold bg-gradient-to-r from-brand to-ink bg-clip-text text-transparent leading-relaxed">
          We create the contents of this website with the greatest possible care. However, we assume no liability for the accuracy, completeness or topicality of the information provided. The use of the content is at the user&apos;s own risk.
        </p>
      </div>

      {/* Liability for Links */}
      <div className="space-y-3">
        <h2 className="flow-h4">Liability for Links</h2>
        <p className="text-sm font-semibold bg-gradient-to-r from-brand to-ink bg-clip-text text-transparent leading-relaxed">
          Our website contains links to external third-party websites. We have no influence on their content and therefore accept no liability for this external content.
        </p>
      </div>

      {/* Copyright */}
      <div className="space-y-3">
        <h2 className="flow-h4">Copyright</h2>
        <p className="text-sm font-semibold bg-gradient-to-r from-brand to-ink bg-clip-text text-transparent leading-relaxed">
          All texts, images, graphics, videos and the layout of this website are protected by copyright. Any reproduction, distribution or public display requires our prior written consent.
        </p>
      </div>

      {/* Applicable Law */}
      <div className="space-y-3 border-t border-ink/[12.5%] pt-10">
        <h2 className="flow-h4">Applicable Law</h2>
        <p className="text-sm font-semibold bg-gradient-to-r from-brand to-ink bg-clip-text text-transparent leading-relaxed">
          Swiss law applies. Place of jurisdiction: Lutry, Switzerland.
        </p>
        <div className="pt-4">
          <p className="text-sm font-semibold bg-gradient-to-r from-brand to-ink bg-clip-text text-transparent">Thank you for visiting flowhealth.ch</p>
        </div>
      </div>

    </main>
  );
}
