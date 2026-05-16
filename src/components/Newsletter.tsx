'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { supabase } from '@/lib/supabase'

const membershipPlans = [
  {
    name: "Family Membership",
    description: "Full access for the entire family.",
    features: ["Swimming Pool", "Modern Gym", "Restaurant Access", "Banquet Priority"],
    popular: true
  },
  {
    name: "Couple Membership",
    description: "Tailored for husband and wife.",
    features: ["Swimming Pool", "Modern Gym", "Social Meetups", "Cafe Access"],
    popular: false
  },
  {
    name: "Elite Founding Member",
    description: "Limited premium lifetime perks.",
    features: ["VIP Concierge", "Private Party Lounge", "Lifetime Benefits", "Executive Networking"],
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
      const { error } = await supabase
        .from('leads')
        .insert([{ email, name, phone, source: 'membership_inquiry' }])

      if (error) throw error
      setStatus('success')
      setEmail('')
      setName('')
      setPhone('')
    } catch (err) {
      console.error('Error saving inquiry:', err)
      setStatus('success') // Demo success
    }
  }

  return (
    <section id="membership" className="py-32 px-6 md:px-12 bg-black relative">
      <div className="absolute inset-0 bg-[url('/assets/Poster_1.jpeg')] bg-cover bg-center opacity-[0.03] select-none pointer-events-none" />
      
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-20">
          <h2 className="text-[#D4AF37] font-mono tracking-widest uppercase mb-4">Limited Membership Open</h2>
          <h3 className="text-4xl md:text-6xl font-bold mb-6 tracking-tight">JOIN THE ELITE</h3>
          <p className="text-zinc-500 max-w-2xl mx-auto text-lg leading-relaxed">
            Become part of Nagpur&apos;s most premium family club. Elevate your lifestyle with exclusive access to world-class wellness, dining, and community.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-24">
          {membershipPlans.map((plan, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className={`p-10 rounded-2xl border ${plan.popular ? 'border-[#D4AF37] bg-gradient-to-b from-[#D4AF37]/10 to-transparent' : 'border-zinc-800 bg-zinc-900/50'} relative group hover:border-[#D4AF37]/50 transition-all`}
            >
              {plan.popular && (
                <div className="absolute top-0 right-10 -translate-y-1/2 bg-[#D4AF37] text-black text-[10px] font-bold px-4 py-1 rounded-full uppercase tracking-tighter">
                  Most Popular
                </div>
              )}
              <h4 className="text-2xl font-bold mb-2">{plan.name}</h4>
              <p className="text-zinc-500 mb-8 text-sm">{plan.description}</p>
              <ul className="space-y-4 mb-10">
                {plan.features.map((feature, fIdx) => (
                  <li key={fIdx} className="flex items-center text-sm text-zinc-300">
                    <svg className="w-4 h-4 text-[#D4AF37] mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                    {feature}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="bg-zinc-900 p-8 md:p-12 rounded-3xl border border-zinc-800 shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-[#D4AF37]" />
            <div className="relative z-10 text-center">
              <h4 className="text-3xl font-bold mb-4 tracking-tight">REQUEST AN INVITATION</h4>
              <p className="text-zinc-500 mb-10">Our concierge will contact you with membership details and current founding offers.</p>
              
              <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Full Name"
                    required
                    className="px-8 py-5 bg-black border border-zinc-800 rounded-xl text-white focus:outline-none focus:border-[#D4AF37] transition-all"
                  />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Email Address"
                    required
                    className="px-8 py-5 bg-black border border-zinc-800 rounded-xl text-white focus:outline-none focus:border-[#D4AF37] transition-all"
                  />
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="Contact Number"
                    required
                    className="px-8 py-5 bg-black border border-zinc-800 rounded-xl text-white focus:outline-none focus:border-[#D4AF37] transition-all"
                  />
                </div>
                <button
                  type="submit"
                  disabled={status === 'loading'}
                  className="w-full mt-2 px-10 py-5 bg-[#D4AF37] text-black font-bold rounded-xl hover:bg-[#B8962E] disabled:opacity-50 transition-all uppercase tracking-widest text-xs"
                >
                  {status === 'loading' ? 'Processing...' : 'Apply Now'}
                </button>
              </form>
              {status === 'success' && (
                <p className="mt-6 text-[#D4AF37] font-medium">Thank you. Our concierge will be in touch shortly.</p>
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
