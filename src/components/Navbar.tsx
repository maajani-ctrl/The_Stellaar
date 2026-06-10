'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { Menu, X, LogIn, LogOut, PenTool, ChevronDown } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { createClient } from '@/lib/supabase/client'
import { User, Session } from '@supabase/supabase-js'
import Link from 'next/link'

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false)
  const [user, setUser] = useState<User | null>(null)
  const supabase = createClient()

  useEffect(() => {
    const getUser = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      setUser(user)
    }
    getUser()

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event: unknown, session: Session | null) => {
      setUser(session?.user ?? null)
    })

    return () => subscription.unsubscribe()
  }, [supabase.auth])

  const handleLogout = async () => {
    await supabase.auth.signOut()
    window.location.reload()
  }

  return (
    <>
      <nav className="fixed top-0 w-full z-50 px-4 md:px-12 py-4 flex justify-between items-center backdrop-blur-md bg-black/20 border-b border-white/5">
        <div className="flex items-center gap-2 md:gap-4">
          <Link href="/">
            <Image 
              src="/assets/Logo_no_Back.png" 
              alt="Stellaar Logo" 
              width={180} 
              height={60} 
              className="h-10 md:h-14 w-auto object-contain"
              priority
            />
          </Link>
        </div>
        
        {/* Desktop Nav - Hidden on Mobile */}
        <div className="hidden lg:flex gap-8 text-[10px] uppercase tracking-[0.2em] font-bold">
          <Link href="/#about" className="hover:text-[#D4AF37] transition-colors">About</Link>
          <Link href="/#facilities" className="hover:text-[#D4AF37] transition-colors">Amenities</Link>
          <Link href="/#membership" className="hover:text-[#D4AF37] transition-colors">Membership</Link>
          <Link href="/#affiliation" className="hover:text-[#D4AF37] transition-colors">Affiliation</Link>
          <Link href="/staff" className="hover:text-[#D4AF37] transition-colors">Staff</Link>
          <Link href="/blogs" className="hover:text-[#D4AF37] transition-colors flex items-center gap-1">
            <PenTool size={12} /> Blogs
          </Link>
          <Link href="/#contact" className="hover:text-[#D4AF37] transition-colors">Contact</Link>
        </div>

        <div className="flex items-center gap-2 md:gap-4">
          <div className="hidden lg:flex items-center gap-6">
            {user ? (
              <div className="relative">
                <button 
                  onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                  className="px-4 py-2 bg-white/5 border border-white/10 rounded-full flex items-center gap-3 hover:bg-white/10 transition-all group"
                >
                  <span className="text-[9px] md:text-[10px] uppercase tracking-widest font-bold text-zinc-500 whitespace-nowrap">
                    Welcome, <span className="text-[#D4AF37] ml-1">{user.user_metadata?.full_name || user.email?.split('@')[0]}</span>
                  </span>
                  <ChevronDown size={14} className={`text-zinc-500 group-hover:text-[#D4AF37] transition-transform duration-300 ${isUserMenuOpen ? 'rotate-180' : ''}`} />
                </button>

                <AnimatePresence>
                  {isUserMenuOpen && (
                    <>
                      {/* Invisible backdrop to close menu on click outside */}
                      <div 
                        className="fixed inset-0 z-40" 
                        onClick={() => setIsUserMenuOpen(false)}
                      />
                      <motion.div
                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 10, scale: 0.95 }}
                        transition={{ duration: 0.2 }}
                        className="absolute right-0 mt-3 w-64 bg-zinc-900 border border-zinc-800 rounded-2xl overflow-hidden shadow-2xl z-50 py-2"
                      >
                        <div className="px-6 py-4 border-b border-zinc-800 mb-2">
                          <p className="text-[10px] uppercase tracking-widest font-bold text-zinc-500 mb-1">Signed in as</p>
                          <p className="text-sm font-bold truncate text-white">{user.email}</p>
                        </div>
                        
                        {user.email === 'office.thestellaar@gmail.com' && (
                          <div className="px-2 pb-2 mb-2 border-b border-zinc-800">
                            <p className="px-4 py-2 text-[8px] uppercase tracking-widest font-bold text-[#D4AF37]">Admin Controls</p>
                            <Link 
                              href="/blogs/create" 
                              onClick={() => setIsUserMenuOpen(false)}
                              className="flex items-center gap-3 px-4 py-3 text-xs font-bold uppercase tracking-widest text-zinc-400 hover:text-white hover:bg-white/5 transition-all rounded-xl"
                            >
                              <PenTool size={14} /> Write Blog Post
                            </Link>
                          </div>
                        )}

                        <div className="px-2">
                          <button 
                            onClick={handleLogout}
                            className="w-full flex items-center gap-3 px-4 py-3 text-xs font-bold uppercase tracking-widest text-red-500/80 hover:text-red-500 hover:bg-red-500/5 transition-all rounded-xl"
                          >
                            <LogOut size={14} /> Sign Out Account
                          </button>
                        </div>
                      </motion.div>
                    </>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <Link 
                href="/auth"
                className="flex items-center gap-2 text-[10px] uppercase tracking-widest font-bold text-[#D4AF37] hover:opacity-80 transition-all"
              >
                <LogIn size={16} /> Member Sign In
              </Link>
            )}
          </div>

          <Link href="/#membership" className="px-4 py-2 md:px-5 md:py-2 border border-[#D4AF37] text-[#D4AF37] text-[8px] md:text-[10px] uppercase tracking-widest font-bold rounded-full hover:bg-[#D4AF37] hover:text-black transition-all">
            Inquire
          </Link>

          
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
            className="fixed inset-0 z-[60] bg-black flex flex-col items-center justify-center gap-6 text-xl font-bold uppercase tracking-widest"
          >
            <button 
              onClick={() => setIsMenuOpen(false)}
              className="absolute top-6 right-6 text-[#D4AF37]"
            >
              <X size={32} />
            </button>
            <Link href="/" onClick={() => setIsMenuOpen(false)} className="hover:text-[#D4AF37]">Home</Link>
            <Link href="/#about" onClick={() => setIsMenuOpen(false)} className="hover:text-[#D4AF37]">About</Link>
            <Link href="/#facilities" onClick={() => setIsMenuOpen(false)} className="hover:text-[#D4AF37]">Amenities</Link>
            <Link href="/#membership" onClick={() => setIsMenuOpen(false)} className="hover:text-[#D4AF37]">Membership</Link>
            <Link href="/#affiliation" onClick={() => setIsMenuOpen(false)} className="hover:text-[#D4AF37]">Affiliation</Link>
            <Link href="/staff" onClick={() => setIsMenuOpen(false)} className="hover:text-[#D4AF37]">Staff</Link>
            <Link href="/blogs" onClick={() => setIsMenuOpen(false)} className="hover:text-[#D4AF37]">Blogs</Link>
            <Link href="/#contact" onClick={() => setIsMenuOpen(false)} className="hover:text-[#D4AF37]">Contact</Link>
            
            <div className="mt-8 flex flex-col items-center gap-4">
              {user ? (
                <>
                  {user.email === 'office.thestellaar@gmail.com' && (
                    <Link 
                      href="/blogs/create" 
                      onClick={() => setIsMenuOpen(false)}
                      className="flex items-center gap-2 text-[#D4AF37]"
                    >
                      <PenTool size={24} /> Write Blog Post
                    </Link>
                  )}
                  <button onClick={handleLogout} className="flex items-center gap-2 text-zinc-400">
                    <LogOut size={24} /> Sign Out
                  </button>
                </>
              ) : (
                <Link href="/auth" onClick={() => setIsMenuOpen(false)} className="flex items-center gap-2 text-[#D4AF37]">
                  <LogIn size={24} /> Member Sign In
                </Link>
              )}
            </div>

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
