'use client'

import { useState } from 'react'
import Image from 'next/image'
import { Menu, X } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <>
      <nav className="fixed top-0 w-full z-50 px-4 md:px-12 py-4 flex justify-between items-center backdrop-blur-md bg-black/20 border-b border-white/5">
        <div className="flex items-center gap-2 md:gap-4">
          <Image 
            src="/assets/Logo_no_Back.png" 
            alt="Stellaar Logo" 
            width={180} 
            height={60} 
            className="h-10 md:h-14 w-auto object-contain"
          />
        </div>
        
        {/* Desktop Nav - Hidden on Mobile */}
        <div className="hidden lg:flex gap-10 text-[10px] uppercase tracking-[0.3em] font-bold">
          <a href="#about" className="hover:text-[#D4AF37] transition-colors">About</a>
          <a href="#facilities" className="hover:text-[#D4AF37] transition-colors">Amenities</a>
          <a href="#membership" className="hover:text-[#D4AF37] transition-colors">Membership</a>
          <a href="#contact" className="hover:text-[#D4AF37] transition-colors">Contact</a>
        </div>

        <div className="flex items-center gap-2 md:gap-4">
          <a href="#membership" className="px-4 py-2 md:px-5 md:py-2 border border-[#D4AF37] text-[#D4AF37] text-[8px] md:text-[10px] uppercase tracking-widest font-bold rounded-full hover:bg-[#D4AF37] hover:text-black transition-all">
            Inquire
          </a>
          
          {/* Mobile Menu Toggle */}
          <button 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="lg:hidden text-[#D4AF37] p-1"
          >
            {isMenuOpen ? <X size={20} className="md:w-6 md:h-6" /> : <Menu size={20} className="md:w-6 md:h-6" />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed inset-0 z-[60] bg-black flex flex-col items-center justify-center gap-8 text-2xl font-bold uppercase tracking-widest"
          >
            <button 
              onClick={() => setIsMenuOpen(false)}
              className="absolute top-6 right-6 text-[#D4AF37]"
            >
              <X size={32} />
            </button>
            <a href="#about" onClick={() => setIsMenuOpen(false)} className="hover:text-[#D4AF37]">About</a>
            <a href="#facilities" onClick={() => setIsMenuOpen(false)} className="hover:text-[#D4AF37]">Amenities</a>
            <a href="#membership" onClick={() => setIsMenuOpen(false)} className="hover:text-[#D4AF37]">Membership</a>
            <a href="#contact" onClick={() => setIsMenuOpen(false)} className="hover:text-[#D4AF37]">Contact</a>
            
            <div className="mt-12">
              <Image 
                src="/assets/Logo_no_Back.png" 
                alt="Stellaar Logo" 
                width={150} 
                height={50} 
                className="opacity-50"
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
