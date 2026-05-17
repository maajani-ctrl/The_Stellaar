'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'

const membershipPlans = [
  {
    name: "Blue Membership",
    duration: "1 Year",
    description: "Perfect for families seeking a premium lifestyle experience with access to wellness, dining, and social amenities.",
    features: [
      "Husband + Wife Membership",
      "Access for 2 Kids (up to 18 yrs)",
      "Swimming Pool Access",
      "Premium Gym & Steam Bath",
      "Café & Lounge Access",
      "Fine-Dine Restaurant Privileges",
      "Member Events & Activities",
      "Food & Salon Discounts"
    ],
    color: "#3b82f6", // Blue
    popular: false
  },
  {
    name: "Silver Membership",
    duration: "3 Years",
    description: "An elevated long-term membership experience offering luxury amenities, family recreation, and exclusive member benefits.",
    features: [
      "Husband + Wife Membership",
      "Access for 2 Kids (up to 18 yrs)",
      "Premium Lifestyle Amenities",
      "Social & Networking Events",
      "Food & Salon Privileges",
      "Stellaar Select Benefits",
      "Extended Membership Convenience"
    ],
    color: "#e2e8f0", // Silver/Slate
    popular: true
  },
  {
    name: "Gold Membership",
    duration: "5 Years",
    description: "The ultimate premium family club experience designed for members who desire luxury, exclusivity, and elite community engagement.",
    features: [
      "Husband + Wife Membership",
      "Access for 2 Kids (up to 18 yrs)",
      "Complete Club Amenities Access",
      "Premium Dining & Wellness",
      "Exclusive Lifestyle Experiences",
      "Priority Community Engagement",
      "Elite Long-Term Experience"
    ],
    color: "#D4AF37", // Gold
    popular: false
  }
]

export default function Membership() {
  const [email, setEmail] = useState('')
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('loading')

    try {
      // Attempt to save to database, but don't block the user if it fails
      fetch('/api/submit-lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, phone }),
      }).catch(err => console.error('Silent background save failed:', err))
      
      // WhatsApp message formatting
      const whatsappNumber = "917888005995"
      const message = `Name:- ${name}\nEmail:- ${email}\nContact info:- ${phone}`
      const encodedMessage = encodeURIComponent(message)
      const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`

      setStatus('success')
      
      // Clear form
      setEmail('')
      setName('')
      setPhone('')

      // Redirect to WhatsApp using window.location.href for better reliability (avoiding popup blockers)
      setTimeout(() => {
        window.location.href = whatsappUrl
      }, 1000)
    } catch (err) {
      console.error('Submission error:', err)
      setStatus('error')
    }
  }

  return (
    <section id="membership" className="py-24 md:py-40 px-4 md:px-12 bg-black relative overflow-hidden">
      {/* Cinematic Family Background with Fade */}
      <div className="absolute inset-0 z-0">
        <Image 
          src="https://images.unsplash.com/photo-1511895426328-dc8714191300?q=80&w=2070&auto=format&fit=crop" 
          alt="Family Lifestyle Background"
          fill
          className="object-cover opacity-20 brightness-[0.3] grayscale-[0.2]"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black via-black/80 to-black" />
        <div className="absolute inset-0 bg-gradient-to-r from-black via-transparent to-black opacity-60" />
      </div>
      
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-12 md:mb-20">
          <h2 className="text-[#D4AF37] font-mono text-xs md:text-sm tracking-widest uppercase mb-4">Membership Plans</h2>
          <h3 className="text-3xl md:text-6xl font-bold mb-6 tracking-tight uppercase">Premium Family Club</h3>
          <p className="text-zinc-500 max-w-2xl mx-auto text-base md:text-lg leading-relaxed">
            Where Families Connect, Celebrate & Belong. Choose the tier that best fits your legacy.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8 mb-16 md:mb-24">
          {membershipPlans.map((plan, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className={`p-8 md:p-10 rounded-2xl border transition-all duration-500 hover:scale-[1.02] flex flex-col ${
                plan.popular 
                ? 'border-[#D4AF37] bg-gradient-to-b from-[#D4AF37]/10 via-zinc-900/50 to-zinc-900/80' 
                : 'border-zinc-800 bg-zinc-900/40 hover:border-zinc-700'
              }`}
            >
              {plan.popular && (
                <div className="absolute top-0 right-10 -translate-y-1/2 bg-[#D4AF37] text-black text-[10px] font-bold px-4 py-1 rounded-full uppercase tracking-tighter shadow-lg">
                  Elevated Experience
                </div>
              )}
              
              <div className="mb-8">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-2 h-8 rounded-full" style={{ backgroundColor: plan.color }} />
                  <div>
                    <h4 className="text-xl md:text-2xl font-bold">{plan.name}</h4>
                    <span className="text-[10px] uppercase tracking-[0.2em] font-bold opacity-60" style={{ color: plan.color }}>
                      {plan.duration}
                    </span>
                  </div>
                </div>
                <p className="text-zinc-500 text-xs md:text-sm leading-relaxed">{plan.description}</p>
              </div>

              <div className="h-[1px] w-full bg-zinc-800 mb-8" />

              <ul className="space-y-4 mb-10 flex-1">
                {plan.features.map((feature, fIdx) => (
                  <li key={fIdx} className="flex items-start text-xs md:text-sm text-zinc-300 group">
                    <div className="mr-3 mt-1 w-4 h-4 rounded-full border border-zinc-700 flex items-center justify-center shrink-0 group-hover:border-[#D4AF37] transition-colors">
                      <svg className="w-2.5 h-2.5 text-[#D4AF37]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <span className="group-hover:text-white transition-colors">{feature}</span>
                  </li>
                ))}
              </ul>

              <a 
                href="#membership-form" 
                className={`w-full py-4 rounded-xl text-center text-[10px] md:text-xs uppercase font-bold tracking-widest transition-all ${
                  plan.popular 
                  ? 'bg-[#D4AF37] text-black hover:bg-white' 
                  : 'bg-zinc-800 text-zinc-300 hover:bg-zinc-700 hover:text-white'
                }`}
              >
                Choose {plan.name.split(' ')[0]}
              </a>
            </motion.div>
          ))}
        </div>

        <div id="membership-form" className="max-w-4xl mx-auto pt-10">
          <div className="bg-zinc-900 p-6 md:p-12 rounded-2xl md:rounded-3xl border border-zinc-800 shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-[#D4AF37]" />
            <div className="relative z-10 text-center">
              <h4 className="text-2xl md:text-3xl font-bold mb-4 tracking-tight">REQUEST AN INVITATION</h4>
              <p className="text-zinc-500 text-sm md:text-base mb-8 md:mb-10">Our concierge will contact you with membership details and current founding offers.</p>
              
              <form onSubmit={handleSubmit} className="flex flex-col gap-3 md:gap-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-4">
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Full Name"
                    required
                    className="px-6 py-4 md:px-8 md:py-5 bg-black/50 border border-zinc-700/50 rounded-xl text-white text-sm focus:outline-none focus:border-[#D4AF37] transition-all w-full placeholder:text-zinc-600"
                  />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Email Address"
                    required
                    className="px-6 py-4 md:px-8 md:py-5 bg-black/50 border border-zinc-700/50 rounded-xl text-white text-sm focus:outline-none focus:border-[#D4AF37] transition-all w-full placeholder:text-zinc-600"
                  />
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="Contact Number"
                    required
                    className="px-6 py-4 md:px-8 md:py-5 bg-black/50 border border-zinc-700/50 rounded-xl text-white text-sm focus:outline-none focus:border-[#D4AF37] transition-all w-full placeholder:text-zinc-600"
                  />
                </div>
                <button
                  type="submit"
                  disabled={status === 'loading'}
                  className="w-full mt-2 px-8 py-4 md:px-10 md:py-5 bg-[#D4AF37] text-black font-bold rounded-xl hover:bg-[#B8962E] disabled:opacity-50 transition-all uppercase tracking-widest text-[10px] md:text-xs"
                >
                  {status === 'loading' ? 'Processing...' : 'Apply Now'}
                </button>
              </form>
              {status === 'success' && (
                <p className="mt-6 text-[#D4AF37] font-medium">Thank you. Redirecting to WhatsApp...</p>
              )}
              {status === 'error' && (
                <p className="mt-6 text-red-500 font-medium">Something went wrong. Please try again or contact us directly.</p>
              )}

              <div className="mt-12 pt-8 border-t border-zinc-800 flex flex-col items-center">
                <p className="text-zinc-500 text-sm mb-4 uppercase tracking-widest font-bold">Manual Registration</p>
                <a 
                  href="/assets/STELLAAR FAMILY CLUB FORM.pdf" 
                  target="_blank"
                  className="text-zinc-400 hover:text-[#D4AF37] transition-colors flex items-center text-sm font-medium"
                >
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path></svg>
                  Download Offline Membership Form (PDF)
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
