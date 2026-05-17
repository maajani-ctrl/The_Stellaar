import Link from 'next/link'

export const metadata = {
  title: 'Terms and Conditions | The Stellaar - A Unit of Triovertical Megaventure Pvt Ltd',
  description: 'Membership Terms and Conditions for The Stellaar - A Unit of Triovertical Megaventure Pvt Ltd, Nagpur.',
}

export default function TermsAndConditions() {
  return (
    <main className="min-h-screen bg-black text-zinc-300 py-20 px-6 md:px-12 lg:px-24">
      <div className="max-w-4xl mx-auto">
        <Link 
          href="/" 
          className="inline-flex items-center text-[#D4AF37] mb-12 hover:translate-x-[-4px] transition-transform font-mono text-sm uppercase tracking-widest"
        >
          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
          </svg>
          Back to Home
        </Link>

        <h1 className="text-4xl md:text-6xl font-bold text-white mb-4 tracking-tight uppercase text-balance">Terms and Conditions</h1>
        <p className="text-[#D4AF37] font-mono text-sm mb-12 uppercase tracking-widest">Version 1.1 | Effective Date: May 17, 2026</p>

        <div className="space-y-12">
          <section>
            <h2 className="text-xl md:text-2xl font-bold text-white mb-6 uppercase tracking-widest border-b border-zinc-800 pb-2">1. Agreement to Terms</h2>
            <p className="leading-relaxed mb-4 text-sm md:text-base">
              These Terms and Conditions constitute a legally binding agreement made between you, whether personally or on behalf of an entity (“you”) and <strong>The Stellaar - A Unit of Triovertical Megaventure Pvt Ltd</strong> (“we,” “us” or “our”), concerning your access to and use of our facilities, services, and membership privileges.
            </p>
            <p className="leading-relaxed text-zinc-400 text-sm italic">
              By accessing the Club or using our Services, you acknowledge that you have read, understood, and agreed to be bound by all of these Terms and Conditions.
            </p>
          </section>

          <section>
            <h2 className="text-xl md:text-2xl font-bold text-white mb-6 uppercase tracking-widest border-b border-zinc-800 pb-2">2. Membership Eligibility</h2>
            <p className="leading-relaxed mb-4 text-sm md:text-base">
              Membership is subject to approval by the management. Applicants must provide accurate, current, and complete information during the registration process. The Stellaar reserves the right to refuse membership to any individual without assigning any reason.
            </p>
            <ul className="list-disc pl-6 space-y-3 text-zinc-400 text-sm md:text-base">
              <li>Members must be at least 18 years of age to hold a primary membership.</li>
              <li>Dependent access (kids) is limited to those under 18 years of age as per the specific plan selected.</li>
              <li>Membership is strictly personal and non-transferable to any other person or entity.</li>
            </ul>
          </section>

          <section className="bg-zinc-900/50 p-6 md:p-10 rounded-2xl border border-[#D4AF37]/30 shadow-2xl">
            <h2 className="text-xl md:text-2xl font-bold text-[#D4AF37] mb-6 uppercase tracking-widest">3. FINANCIAL POLICY: NON-REFUNDABLE CLAUSE</h2>
            <p className="leading-relaxed mb-6 font-semibold text-white text-sm md:text-base">
              The Stellaar - A Unit of Triovertical Megaventure Pvt Ltd maintains a strict zero-refund policy to ensure the sustainability and exclusivity of our community.
            </p>
            <div className="space-y-4 border-l-2 border-[#D4AF37] pl-6">
              <p className="text-white font-bold uppercase leading-relaxed text-sm md:text-base">
                ALL PAYMENTS, INCLUDING BUT NOT LIMITED TO REGISTRATION FEES, MEMBERSHIP DEPOSITS, ANNUAL SUBSCRIPTIONS, AND EVENT BOOKINGS, ARE STRICTLY NON-REFUNDABLE AND NON-TRANSFERABLE UNDER ANY CIRCUMSTANCES.
              </p>
              <p className="text-xs md:text-sm text-zinc-400 leading-relaxed">
                This includes, but is not limited to, instances of membership non-usage, member resignation, relocation, or termination of membership by the management due to breaches of Club protocols.
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-xl md:text-2xl font-bold text-white mb-6 uppercase tracking-widest border-b border-zinc-800 pb-2">4. Code of Conduct</h2>
            <p className="leading-relaxed mb-4 text-sm md:text-base">
              To maintain the premium environment of The Stellaar, all members and their guests are expected to adhere to a high standard of decorum:
            </p>
            <ul className="list-disc pl-6 space-y-3 text-zinc-400 text-sm md:text-base">
              <li>Adherence to the Club&apos;s dress code in specified areas.</li>
              <li>Respectful behavior towards other members and Club staff.</li>
              <li>Strict compliance with safety guidelines for the Pool, Gym, and other amenities.</li>
              <li>Management reserves the right to suspend or terminate membership for any conduct deemed detrimental to the Club&apos;s reputation.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl md:text-2xl font-bold text-white mb-6 uppercase tracking-widest border-b border-zinc-800 pb-2">5. Limitation of Liability</h2>
            <p className="leading-relaxed mb-4 text-sm md:text-base text-zinc-400">
              The Stellaar - A Unit of Triovertical Megaventure Pvt Ltd shall not be held liable for any personal injury, loss, or damage to personal property sustained by members or guests while on the premises. Use of all amenities, including the Gymnasium and Swimming Pool, is at the member&apos;s own risk.
            </p>
          </section>

          <section>
            <h2 className="text-xl md:text-2xl font-bold text-white mb-6 uppercase tracking-widest border-b border-zinc-800 pb-2">6. Modifications to Service</h2>
            <p className="leading-relaxed mb-4 text-sm md:text-base text-zinc-400">
              The management reserves the right to modify operating hours, amenity availability, or Club rules at any time without prior notice to ensure optimal operation and maintenance of the facilities.
            </p>
          </section>

          <section>
            <h2 className="text-xl md:text-2xl font-bold text-white mb-6 uppercase tracking-widest border-b border-zinc-800 pb-2">7. Governing Law & Jurisdiction</h2>
            <p className="leading-relaxed mb-4 text-sm md:text-base text-zinc-400">
              These Terms and Conditions shall be governed by and defined in accordance with the laws of India. You irrevocably consent that the courts of <strong>Nagpur, Maharashtra</strong> shall have exclusive jurisdiction to resolve any dispute which may arise in connection with these terms.
            </p>
          </section>

          <section className="pt-12 border-t border-zinc-800">
            <h2 className="text-xl font-bold text-white mb-6 uppercase tracking-tight">8. Contact and Inquiries</h2>
            <p className="leading-relaxed mb-6 text-sm md:text-base text-zinc-400">
              For any legal inquiries or clarifications regarding these terms, please contact our administrative office:
            </p>
            <div className="text-zinc-400 space-y-2 text-sm md:text-base">
              <p className="text-[#D4AF37] font-bold">The Stellaar - A Unit of Triovertical Megaventure Pvt Ltd</p>
              <p>79, Prashant Nagar,</p>
              <p>Behind Mount Carmel School,</p>
              <p>Ajni, Nagpur, Maharashtra 440015</p>
              <p>Email: legal@thestellaar.com</p>
              <p>Phone: +91 8668647116</p>
            </div>
          </section>
        </div>

        <div className="mt-20 pt-12 border-t border-zinc-900 text-center">
          <p className="text-zinc-600 text-xs uppercase tracking-widest">
            © 2026 Triovertical Megaventure Pvt Ltd. All rights reserved.
          </p>
        </div>
      </div>
    </main>
  )
}
