'use client'

import { motion } from 'framer-motion'

export default function Hero() {
  return (
    <section className="relative h-screen w-full flex items-center justify-center overflow-hidden bg-black">
      {/* Cinematic Video Background */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <video
        autoPlay
        loop
        muted
        playsInline
        poster="/assets/Swimming_Pool.jpeg"
        className="absolute min-w-full min-h-full object-cover opacity-60"
        >

          <source src="/assets/STELLAAR CLUB.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        
        {/* Luxury Overlays */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/30 to-black" />
        <div className="absolute inset-0 bg-black/40" />
        
        {/* Glow Effects */}
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-[#D4AF37]/10 blur-[120px] rounded-full animate-pulse" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[60%] h-[60%] bg-[#D4AF37]/10 blur-[150px] rounded-full animate-pulse" style={{ animationDelay: '2s' }} />
      </div>

      <div className="relative z-10 text-center px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
        >
          <span className="text-sm md:text-base font-mono tracking-[0.3em] text-[#D4AF37] uppercase mb-4 block">
            NAGPUR&apos;S NEW LIFESTYLE DESTINATION
          </span>
          <h1 className="text-6xl md:text-9xl font-bold tracking-tighter mb-6 text-white uppercase italic">
            <span className="text-[#D4AF37]">STELLAAR</span>
          </h1>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3, ease: "easeOut" }}
        >
          <p className="text-xl md:text-3xl text-zinc-400 max-w-3xl mx-auto font-light leading-relaxed">
            Where Luxury Meets Lifestyle. <br className="hidden md:block" />
            <span className="text-white font-medium">Live Premium. Belong Exclusive.</span>
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.8 }}
          className="mt-12"
        >
          <a
            href="#membership"
            className="inline-block px-10 py-5 bg-[#D4AF37] text-black font-bold rounded-full hover:bg-[#B8962E] transition-all transform hover:scale-105 shadow-[0_0_20px_rgba(212,175,55,0.3)]"
          >
            Join the Elite Community
          </a>
        </motion.div>
      </div>
      
      {/* Decorative Bottom Line */}
      <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[#D4AF37]/50 to-transparent" />
    </section>
  )
}
