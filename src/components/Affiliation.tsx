'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'

const facilities = [
  { title: 'Royal AC Guest Rooms', icon: '🏨' },
  { title: 'Premium Wine & Dine', icon: '🍷' },
  { title: 'Swimming Pool', icon: '🏊' },
  { title: 'Modern Gym & Yoga', icon: '🧘' },
  { title: 'Grand Royal Hall', icon: '🏛️' },
  { title: 'Sports & Cards Room', icon: '🃏' },
]

export default function Affiliation() {
  return (
    <section className="py-20 md:py-32 px-4 md:px-12 bg-black border-t border-zinc-900">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 md:gap-24 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-[#D4AF37] font-mono tracking-widest uppercase mb-4 text-xs md:text-sm">Extended Privileges</h2>
            <h3 className="text-3xl md:text-5xl font-bold mb-6 tracking-tight leading-tight">
              RECIPROCAL AFFILIATION: <br />
              <span className="text-[#D4AF37]">REFORMS CLUB AMRAVATI</span>
            </h3>
            <p className="text-zinc-400 text-base md:text-lg mb-8 leading-relaxed">
              Stellaar members enjoy exclusive reciprocal access to the historic Reforms Club in Amravati. Established in 1902, this legendary institution offers a 122-year legacy of prestige and world-class hospitality.
            </p>
            
            <div className="grid grid-cols-2 gap-4 md:gap-6 mb-10">
              {facilities.map((item, index) => (
                <div key={index} className="flex items-center gap-3 bg-zinc-900/40 border border-zinc-800 p-3 md:p-4 rounded-xl">
                  <span className="text-xl md:text-2xl">{item.icon}</span>
                  <span className="text-zinc-300 text-xs md:text-sm font-medium">{item.title}</span>
                </div>
              ))}
            </div>

            <div className="flex items-center gap-4 text-[#D4AF37]">
              <div className="w-12 h-[1px] bg-[#D4AF37]" />
              <span className="text-[10px] md:text-xs uppercase font-bold tracking-widest italic">A Legacy of 122 Years</span>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="rounded-2xl overflow-hidden border border-zinc-800 bg-zinc-900 aspect-[4/3] relative">
               <div className="absolute inset-0 bg-gradient-to-br from-[#D4AF37]/20 to-transparent flex flex-col items-center justify-center p-12">
                  <div className="text-center">
                    <div className="mb-6 flex justify-center">
                      <Image 
                        src="/assets/rcalogo.png"
                        alt="Reforms Club Amravati Logo"
                        width={120}
                        height={120}
                        className="h-20 md:h-28 w-auto object-contain drop-shadow-lg"
                      />
                    </div>
                    <h4 className="text-white text-2xl font-bold mb-2">REFORMS CLUB</h4>
                    <p className="text-[#D4AF37] font-mono text-sm tracking-widest uppercase">Since 1902</p>
                    <div className="mt-8 pt-8 border-t border-white/10">
                      <p className="text-zinc-500 text-sm italic">&quot;Fostering friendship and fellowship through high-quality social environments.&quot;</p>
                    </div>
                  </div>
               </div>
               <div className="absolute bottom-6 left-6 right-6 p-4 backdrop-blur-md bg-black/40 border border-white/5 rounded-xl">
                  <p className="text-[10px] md:text-xs text-zinc-400 uppercase tracking-widest text-center">Location: Col. C. K. Naidu Road, Amravati</p>
               </div>
            </div>
            <div className="absolute -top-10 -right-10 w-48 h-48 bg-[#D4AF37]/5 blur-[60px] rounded-full pointer-events-none" />
          </motion.div>
        </div>
      </div>
    </section>
  )
}
