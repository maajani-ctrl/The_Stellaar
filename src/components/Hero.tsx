'use client'

import { motion } from 'framer-motion'
import { useEffect, useRef } from 'react'
import Image from 'next/image'

export default function Hero() {
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    const video = videoRef.current
    if (video) {
      video.muted = true

      const attemptPlay = () => {
        video.play().catch(() => {
          console.log("Autoplay waiting for interaction")
          // Backup: Play on first user interaction if autoplay was blocked
          const playOnInteraction = () => {
            video.play()
            document.removeEventListener('click', playOnInteraction)
            document.removeEventListener('touchstart', playOnInteraction)
          }
          document.addEventListener('click', playOnInteraction)
          document.addEventListener('touchstart', playOnInteraction)
        })
      }

      const timer = setTimeout(attemptPlay, 100)
      return () => clearTimeout(timer)
    }
  }, [])

  return (
    <section className="relative min-h-[100dvh] w-full flex items-center justify-center overflow-hidden bg-black">
      {/* Cinematic Video Background */}
      <div className="absolute inset-0 z-0">
        <video
          ref={videoRef}
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          poster="/assets/Pool.png"
          className="absolute inset-0 w-full h-full object-cover opacity-90 brightness-[2.0]"
        >
          <source src="/assets/Intro_video.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>

        {/* Luxury Overlays */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/40 to-black z-[1]" />
        <div className="absolute inset-0 bg-black/50 z-[1]" />

        {/* Extra grain/texture for premium feel */}
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none z-[1] bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />

        {/* Glow Effects */}
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-[#D4AF37]/10 blur-[120px] rounded-full animate-pulse" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[60%] h-[60%] bg-[#D4AF37]/10 blur-[150px] rounded-full animate-pulse" style={{ animationDelay: '2s' }} />
      </div>

      <div className="relative z-10 text-center px-6 md:px-12 w-full max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="flex flex-col items-center"
        >
          <span className="text-[10px] sm:text-xs md:text-base font-mono tracking-[0.15em] md:tracking-[0.3em] text-[#D4AF37] uppercase mb-4 block">
            NAGPUR&apos;S NEW LIFESTYLE DESTINATION
          </span>
          <div className="mb-2 w-full flex justify-center overflow-hidden">
            <div className="relative h-20 sm:h-32 md:h-44 lg:h-56 w-full flex justify-center items-center">
              <Image 
                src="/assets/Logo_no_Back.png"
                alt="Stellaar Logo"
                width={1200}
                height={400}
                className="w-auto h-full scale-[1.6] object-contain drop-shadow-[0_0_25px_rgba(212,175,55,0.5)] transform-gpu"
              />
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3, ease: "easeOut" }}
        >
          <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl text-zinc-400 max-w-4xl mx-auto font-light leading-relaxed">
            Where Luxury Meets Lifestyle. <br className="hidden sm:block" />
            <span className="text-white font-medium">Live Premium. Belong Exclusive.</span>
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.8 }}
          className="mt-8 md:mt-12"
        >
          <a
            href="#membership"
            className="inline-block px-8 py-4 md:px-10 md:py-5 bg-[#D4AF37] text-black font-bold rounded-full hover:bg-[#B8962E] transition-all transform hover:scale-105 shadow-[0_0_20px_rgba(212,175,55,0.3)] text-sm md:text-base"
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
