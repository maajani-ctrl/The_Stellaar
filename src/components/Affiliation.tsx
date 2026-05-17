'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import { 
  Hotel, 
  Wine, 
  Waves, 
  Dumbbell, 
  Building2, 
  Gamepad2, 
  ShieldCheck,
  MapPin
} from 'lucide-react'

const facilities = [
  { title: 'Royal AC Guest Rooms', icon: Hotel },
  { title: 'Premium Wine & Dine', icon: Wine },
  { title: 'Swimming Pool', icon: Waves },
  { title: 'Modern Gym & Yoga', icon: Dumbbell },
  { title: 'Grand Royal Banquet', icon: Building2 },
  { title: 'Sports & Cards Room', icon: Gamepad2 },
]

export default function Affiliation() {
  return (
    <section className="py-24 md:py-32 px-4 md:px-12 bg-black border-t border-zinc-900 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 md:gap-24 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[#D4AF37]/30 bg-[#D4AF37]/5 mb-6">
              <ShieldCheck className="w-4 h-4 text-[#D4AF37]" />
              <span className="text-[#D4AF37] font-mono tracking-widest uppercase text-[10px] md:text-xs font-bold">Verified Reciprocal Partner</span>
            </div>
            
            <h3 className="text-3xl md:text-5xl lg:text-6xl font-bold mb-8 tracking-tight leading-[1.1]">
              RECIPROCAL AFFILIATION: <br />
              <span className="text-[#D4AF37] relative">
                REFORMS CLUB AMRAVATI
                <span className="absolute -bottom-2 left-0 w-1/2 h-1 bg-[#D4AF37]/30 rounded-full" />
              </span>
            </h3>
            
            <p className="text-zinc-400 text-base md:text-lg mb-10 leading-relaxed max-w-xl">
              Stellaar members enjoy exclusive reciprocal access to the historic Reforms Club in Amravati. Established in 1902, this legendary institution offers a 122-year legacy of prestige and world-class hospitality.
            </p>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-12">
              {facilities.map((item, index) => (
                <div key={index} className="flex items-center gap-4 group">
                  <div className="w-10 h-10 rounded-lg bg-zinc-900 border border-zinc-800 flex items-center justify-center group-hover:border-[#D4AF37]/50 transition-colors duration-300">
                    <item.icon className="w-5 h-5 text-[#D4AF37]" />
                  </div>
                  <span className="text-zinc-300 text-sm md:text-base font-medium group-hover:text-white transition-colors duration-300">{item.title}</span>
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
            {/* Background Decorative Elements */}
            <div className="absolute -top-20 -right-20 w-64 h-64 bg-[#D4AF37]/10 blur-[100px] rounded-full pointer-events-none" />
            <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-[#D4AF37]/5 blur-[100px] rounded-full pointer-events-none" />
            
            <div className="rounded-3xl overflow-hidden border border-zinc-800 bg-zinc-900/50 backdrop-blur-sm aspect-[4/3] relative group shadow-2xl">
               {/* Inner Glow/Gradient */}
               <div className="absolute inset-0 bg-gradient-to-br from-black via-transparent to-[#D4AF37]/10 opacity-60" />
               
               {/* Pattern Overlay */}
               <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'radial-gradient(#D4AF37 1px, transparent 1px)', backgroundSize: '24px 24px' }} />

               <div className="absolute inset-0 flex flex-col items-center justify-center p-8 md:p-12 pb-24 md:pb-32">
                  <div className="text-center relative z-10 w-full">
                    <div className="mb-6 flex justify-center group-hover:scale-105 transition-transform duration-700">
                      <div className="relative p-5 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md shadow-2xl">
                        <Image 
                          src="/assets/rcalogo.png"
                          alt="Reforms Club Amravati Logo"
                          width={304}
                          height={206}
                          priority
                          quality={100}
                          className="h-20 md:h-28 w-auto object-contain brightness-110 contrast-110 drop-shadow-[0_0_15px_rgba(255,255,255,0.3)]"
                        />
                      </div>
                    </div>
                    
                    <h4 className="text-white text-2xl md:text-3xl font-bold mb-2 tracking-tighter">REFORMS CLUB</h4>
                    <div className="flex items-center justify-center gap-3">
                      <div className="h-[1px] w-6 bg-zinc-700" />
                      <p className="text-[#D4AF37] font-mono text-[10px] md:text-xs tracking-widest uppercase font-semibold">Since 1902</p>
                      <div className="h-[1px] w-6 bg-zinc-700" />
                    </div>
                    
                    <div className="mt-8 pt-6 border-t border-white/5 w-full max-w-[280px] md:max-w-md mx-auto">
                      <p className="text-zinc-400 text-xs md:text-sm italic leading-relaxed font-serif text-center text-balance px-4">
                        &quot;Fostering friendship and fellowship through high-quality social environments.&quot;
                      </p>
                    </div>
                  </div>
               </div>
               
               {/* Location Tag */}
               <div className="absolute bottom-8 left-1/2 -translate-x-1/2 px-6 py-3 backdrop-blur-xl bg-black/60 border border-white/10 rounded-full flex items-center gap-2 shadow-lg">
                  <MapPin className="w-3 h-3 text-[#D4AF37]" />
                  <p className="text-[10px] md:text-xs text-zinc-300 uppercase tracking-[0.2em] font-medium whitespace-nowrap">
                    Col. C. K. Naidu Road, Amravati
                  </p>
               </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

