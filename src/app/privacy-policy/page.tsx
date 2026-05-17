import Link from 'next/link'

export const metadata = {
  title: 'Privacy Policy | Stellaar Family Club',
  description: 'Privacy Policy and Membership Terms for Stellaar Family Club, Nagpur.',
}

export default function PrivacyPolicy() {
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

        <h1 className="text-4xl md:text-6xl font-bold text-white mb-4 tracking-tight uppercase">Privacy Policy</h1>
        <p className="text-[#D4AF37] font-mono text-sm mb-12 uppercase tracking-widest">Effective Date: May 17, 2026</p>

        <div className="space-y-12">
          <section>
            <h2 className="text-2xl font-bold text-white mb-6 uppercase tracking-tight">1. Introduction</h2>
            <p className="leading-relaxed mb-4">
              Welcome to Stellaar Family Club (operating under "Stellaar Design Studio"). We are committed to protecting your personal information and your right to privacy. This Privacy Policy applies to all information collected through our website, mobile application, and/or any related services, sales, marketing, or events.
            </p>
            <p className="leading-relaxed text-zinc-400 italic">
              Please read this privacy policy carefully as it will help you understand what we do with the information that we collect.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-6 uppercase tracking-tight">2. Information We Collect</h2>
            <p className="leading-relaxed mb-4">
              We collect personal information that you voluntarily provide to us when you express an interest in obtaining information about us or our products and Services, when you participate in activities on the Website or otherwise when you contact us.
            </p>
            <ul className="list-disc pl-6 space-y-2 text-zinc-400">
              <li><strong>Personal Data:</strong> Name, email address, phone number, and mailing address.</li>
              <li><strong>Inquiry Data:</strong> Information provided when requesting a membership invitation or downloading forms.</li>
              <li><strong>Automated Information:</strong> IP address, browser type, and usage data collected via cookies.</li>
            </ul>
          </section>

          <section className="bg-zinc-900/50 p-8 rounded-2xl border border-[#D4AF37]/30">
            <h2 className="text-2xl font-bold text-[#D4AF37] mb-6 uppercase tracking-tight">3. SPECIAL POLICY: NON-REFUNDABLE & NON-TRANSFERABLE CLAUSE</h2>
            <p className="leading-relaxed mb-6 font-semibold text-white">
              By applying for membership or making any payment to Stellaar Family Club, you explicitly agree to the following strict financial and administrative terms:
            </p>
            <div className="space-y-4 border-l-2 border-[#D4AF37] pl-6">
              <p className="text-white font-medium">
                ALL PAYMENTS MADE TO STELLAAR FAMILY CLUB (STELLAAR DESIGN STUDIO), INCLUDING BUT NOT LIMITED TO REGISTRATION FEES, MEMBERSHIP DEPOSITS, ANNUAL SUBSCRIPTIONS, AND EVENT BOOKINGS, ARE STRICTLY NON-REFUNDABLE AND NON-TRANSFERABLE.
              </p>
              <p className="text-sm text-zinc-400">
                Under no circumstances shall the Club be liable to refund any amount or transfer the membership to another individual/entity once the transaction is completed. This applies regardless of membership usage, resignation, relocation, or termination of membership by the Club for violation of rules.
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-6 uppercase tracking-tight">4. How We Use Your Information</h2>
            <p className="leading-relaxed mb-4">
              We use the information we collect or receive:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-zinc-400">
              <li>To facilitate account creation and logon process.</li>
              <li>To send you marketing and promotional communications.</li>
              <li>To respond to user inquiries and offer support.</li>
              <li>To send administrative information to you.</li>
              <li>To fulfill and manage your membership and orders.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-6 uppercase tracking-tight">5. Data Sharing and Disclosure</h2>
            <p className="leading-relaxed mb-4">
              We only share information with your consent, to comply with laws, to provide you with services, to protect your rights, or to fulfill business obligations. This includes sharing data with our database providers (Supabase) and internal management tools (Google Sheets).
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-6 uppercase tracking-tight">6. Data Security</h2>
            <p className="leading-relaxed mb-4">
              We have implemented appropriate technical and organizational security measures designed to protect the security of any personal information we process. However, please also remember that we cannot guarantee that the internet itself is 100% secure.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-6 uppercase tracking-tight">7. Governing Law</h2>
            <p className="leading-relaxed mb-4">
              This Privacy Policy and your relationship with Stellaar Family Club shall be governed by the laws of India. Any disputes arising out of this policy shall be subject to the exclusive jurisdiction of the courts located in Nagpur, Maharashtra.
            </p>
          </section>

          <section className="pt-12 border-t border-zinc-800">
            <h2 className="text-2xl font-bold text-white mb-6 uppercase tracking-tight">8. Contact Us</h2>
            <p className="leading-relaxed mb-6">
              If you have questions or comments about this policy, you may contact our Data Protection Officer by email or post:
            </p>
            <div className="text-zinc-400 space-y-1">
              <p className="text-white font-bold">Stellaar Family Club</p>
              <p>Ajni, Nagpur, Maharashtra 440015</p>
              <p>India</p>
              <p className="mt-4">Phone: +91 8668647116</p>
              <p>Email: info@thestellaar.com</p>
            </div>
          </section>
        </div>

        <div className="mt-20 pt-12 border-t border-zinc-900 text-center">
          <p className="text-zinc-600 text-xs uppercase tracking-widest">
            © 2026 Stellaar Design Studio. All rights reserved.
          </p>
        </div>
      </div>
    </main>
  )
}
