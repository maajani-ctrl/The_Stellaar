'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'

export default function About() {
  return (
    <section id="about" className="py-20 md:py-32 px-4 md:px-12 bg-black overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-20 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="w-full rounded-2xl overflow-hidden border border-zinc-800 p-2 bg-zinc-900/20 shadow-2xl">
              <Image
                src="/assets/Building.jpeg"
                alt="Stellaar Club Building"
                width={1200}
                height={900}
                className="w-full h-auto rounded-xl"
              />
            </div>
            <div className="absolute -bottom-10 -left-10 w-48 h-48 md:w-64 md:h-64 bg-[#D4AF37]/10 blur-[60px] md:blur-[80px] rounded-full" />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-[#D4AF37] font-mono tracking-widest uppercase mb-4 text-xs md:text-sm">Our Legacy & Vision</h2>
            <h3 className="text-3xl md:text-5xl font-bold mb-6 md:mb-8 tracking-tight leading-tight uppercase">
              A NEW LIFESTYLE UPGRADED OF <span className="text-[#D4AF37]">NAGPUR</span>
            </h3>            <p className="text-zinc-400 text-base md:text-lg mb-8 leading-relaxed">
              Stellaar is being transformed into a modern premium family club for Nagpur residents who seek status, lifestyle, wellness, and exclusive experiences.
            </p>
            <div className="space-y-4 md:space-y-6 mb-10">
              <div className="flex items-start">
                <div className="w-1.5 h-1.5 rounded-full bg-[#D4AF37] mt-2 mr-4 shrink-0" />
                <p className="text-zinc-300 font-medium text-sm md:text-base">Nagpur’s most desirable premium family club destination.</p>
              </div>
              <div className="flex items-start">
                <div className="w-1.5 h-1.5 rounded-full bg-[#D4AF37] mt-2 mr-4 shrink-0" />
                <p className="text-zinc-300 font-medium text-sm md:text-base">A sanctuary for families, professionals, and elite entrepreneurs.</p>
              </div>
              <div className="flex items-start">
                <div className="w-1.5 h-1.5 rounded-full bg-[#D4AF37] mt-2 mr-4 shrink-0" />
                <p className="text-zinc-300 font-medium text-sm md:text-base">Exquisite interiors combining marble textures and warm lighting.</p>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 md:gap-6 mt-10">
              <a 
                href="/assets/STELLAAR FAMILY CLUB BROUCHER FINAL.pdf" 
                target="_blank"
                className="inline-flex items-center justify-center px-6 py-3 md:px-8 md:py-4 border border-[#D4AF37] text-[#D4AF37] font-bold rounded-full hover:bg-[#D4AF37] hover:text-black transition-all group text-sm md:text-base"
              >
                <svg className="w-5 h-5 mr-3 group-hover:animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"></path></svg>
                Download Brochure
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
