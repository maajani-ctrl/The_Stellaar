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
        <p className="text-[#D4AF37] font-mono text-sm mb-12 uppercase tracking-widest">Effective Date: May 17, 2026</p>

        <div className="space-y-12">
          <section>
            <h2 className="text-2xl font-bold text-white mb-6 uppercase tracking-tight">1. Membership Agreement</h2>
            <p className="leading-relaxed mb-4">
              By applying for membership at The Stellaar - A Unit of Triovertical Megaventure Pvt Ltd, you agree to abide by all the rules, regulations, and policies of the Club as established by the management.
            </p>
          </section>

          <section className="bg-zinc-900/50 p-8 rounded-2xl border border-[#D4AF37]/30">
            <h2 className="text-2xl font-bold text-[#D4AF37] mb-6 uppercase tracking-tight">2. SPECIAL POLICY: NON-REFUNDABLE & NON-TRANSFERABLE CLAUSE</h2>
            <p className="leading-relaxed mb-6 font-semibold text-white text-balance">
              Membership at The Stellaar - A Unit of Triovertical Megaventure Pvt Ltd is subject to the following strict financial and administrative terms:
            </p>
            <div className="space-y-4 border-l-2 border-[#D4AF37] pl-6">
              <p className="text-white font-medium uppercase leading-relaxed">
                ALL PAYMENTS MADE TO THE STELLAAR - A UNIT OF TRIOVERTICAL MEGAVENTURE PVT LTD, INCLUDING BUT NOT LIMITED TO REGISTRATION FEES, MEMBERSHIP DEPOSITS, ANNUAL SUBSCRIPTIONS, AND EVENT BOOKINGS, ARE STRICTLY NON-REFUNDABLE AND NON-TRANSFERABLE.
              </p>
              <p className="text-sm text-zinc-400">
                The Club management reserves the right to decline any refund request or transfer request once a payment has been processed. This policy remains in effect regardless of membership usage, relocation, or any other personal circumstances.
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-6 uppercase tracking-tight">3. Use of Amenities</h2>
            <p className="leading-relaxed mb-4">
              Members are entitled to use the Club's facilities (Pool, Gym, Dining, etc.) according to their membership tier. All amenities are subject to availability and specific operating hours as defined by the management of The Stellaar - A Unit of Triovertical Megaventure Pvt Ltd.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-6 uppercase tracking-tight">4. Conduct and Termination</h2>
            <p className="leading-relaxed mb-4">
              The management reserves the right to terminate membership without refund if a member is found violating the Club's code of conduct or engaging in activities that damage the reputation of The Stellaar - A Unit of Triovertical Megaventure Pvt Ltd.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-6 uppercase tracking-tight">5. Governing Law</h2>
            <p className="leading-relaxed mb-4">
              These terms shall be governed by and construed in accordance with the laws of India. Any legal actions or proceedings shall be instituted in the courts of Nagpur, Maharashtra.
            </p>
          </section>

          <section className="pt-12 border-t border-zinc-800">
            <h2 className="text-2xl font-bold text-white mb-6 uppercase tracking-tight">6. Contact Information</h2>
            <div className="text-zinc-400 space-y-1">
              <p className="text-white font-bold">The Stellaar - A Unit of Triovertical Megaventure Pvt Ltd</p>
              <p>Ajni, Nagpur, Maharashtra 440015</p>
              <p>Email: info@thestellaar.com</p>
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
