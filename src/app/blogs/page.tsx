'use client'

import { useEffect, useState, useCallback } from 'react'
import { motion } from 'framer-motion'
import { Calendar, User, ArrowRight, PenTool, Search, Tag, X, Sparkles } from 'lucide-react'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import Image from 'next/image'
import { getPreviewText } from '@/utils/blog'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/client'
import { User as SupabaseUser } from '@supabase/supabase-js'

interface Blog {
  id: string
  title: string
  content: string
  author_name: string
  category: string
  is_pinned: number | boolean
  image_url_1?: string
  created_at: string
}

export default function BlogsPage() {
  const [blogs, setBlogs] = useState<Blog[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [currentUser, setCurrentUser] = useState<SupabaseUser | null>(null)
  
  const ADMIN_EMAIL = 'office.thestellaar@gmail.com'
  const isAdmin = currentUser?.email === ADMIN_EMAIL

  const categories = ['All', 'General', 'Events', 'Lifestyle', 'Wellness', 'Dining', 'Updates']

  useEffect(() => {
    const checkUser = async () => {
      const supabase = createClient()
      const { data: { user } } = await supabase.auth.getUser()
      setCurrentUser(user)
    }
    checkUser()
  }, [])

  const fetchBlogs = useCallback(async () => {
    setIsLoading(true)
    try {
      const params = new URLSearchParams()
      if (selectedCategory !== 'All') params.append('category', selectedCategory)
      if (searchQuery) params.append('search', searchQuery)
      
      const response = await fetch(`/api/blogs?${params.toString()}`)
      const data = await response.json()
      if (response.ok) {
        setBlogs(data)
      } else {
        console.error('Failed to fetch blogs:', data.error)
      }
    } catch (error) {
      console.error('Error fetching blogs:', error)
    } finally {
      setIsLoading(false)
    }
  }, [selectedCategory, searchQuery])

  useEffect(() => {
    const timer = setTimeout(() => {
      fetchBlogs()
    }, 300)

    return () => clearTimeout(timer)
  }, [fetchBlogs])

  const handlePin = async (id: string, currentStatus: number | boolean) => {
    try {
      const response = await fetch(`/api/blogs/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ is_pinned: !currentStatus })
      })
      if (response.ok) fetchBlogs()
    } catch (error) {
      console.error('Error pinning blog:', error)
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this blog permanently?')) return
    try {
      const response = await fetch(`/api/blogs/${id}`, {
        method: 'DELETE'
      })
      if (response.ok) fetchBlogs()
    } catch (error) {
      console.error('Error deleting blog:', error)
    }
  }

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  }

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  }

  return (
    <main className="min-h-screen bg-black text-white selection:bg-[#D4AF37] selection:text-black">
      <Navbar />
      
      <div className="pt-32 pb-20 px-6 md:px-12 max-w-7xl mx-auto">
        <header className="mb-20 text-center">
          <motion.span 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-[#D4AF37] text-xs font-mono tracking-[0.4em] uppercase mb-4 block"
          >
            Stellaar Stories
          </motion.span>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-5xl md:text-7xl font-bold tracking-tighter mb-6"
          >
            Our Community <br />
            <span className="text-zinc-500 italic font-light">& Updates</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-zinc-400 max-w-2xl mx-auto text-lg md:text-xl font-light leading-relaxed mb-10"
          >
            Insights, events, and stories from the heart of Nagpur&apos;s most exclusive family club.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 }}
          >
            <Link href="/blogs/create" className="inline-flex items-center gap-2 bg-[#D4AF37] text-black px-8 py-4 rounded-full font-bold uppercase tracking-widest text-xs hover:scale-105 active:scale-95 transition-all">
              <PenTool size={16} /> Share Your Story
            </Link>
          </motion.div>
        </header>

        {/* Database Search & Filter Section */}
        <section className="mb-16 space-y-8">
          <div className="flex flex-col md:flex-row gap-6 items-center justify-between">
            <div className="relative w-full md:max-w-md group">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500 group-focus-within:text-[#D4AF37] transition-colors" size={18} />
              <input 
                type="text" 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search stories..." 
                className="w-full bg-zinc-900/50 border border-zinc-800 rounded-full py-3 pl-12 pr-6 text-sm focus:outline-none focus:border-[#D4AF37] transition-all"
              />
              {searchQuery && (
                <button onClick={() => setSearchQuery('')} className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-white">
                  <X size={14} />
                </button>
              )}
            </div>

            <div className="flex flex-wrap gap-2 justify-center">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-4 py-2 rounded-full text-[10px] font-bold uppercase tracking-widest transition-all ${
                    selectedCategory === cat 
                      ? 'bg-[#D4AF37] text-black' 
                      : 'bg-zinc-900/30 text-zinc-500 hover:text-white border border-zinc-800'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </section>

        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-20 gap-4">
            <div className="w-12 h-12 border-2 border-[#D4AF37]/20 border-t-[#D4AF37] rounded-full animate-spin" />
            <p className="text-zinc-500 font-mono text-xs uppercase tracking-widest">Querying Database...</p>
          </div>
        ) : blogs.length > 0 ? (
          <motion.div 
            variants={container}
            initial="hidden"
            animate="show"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {blogs.map((blog) => (
              <motion.div
                key={blog.id}
                variants={item}
              >
                <Link
                  href={`/blogs/${blog.id}`}
                  className={`group relative bg-zinc-900/30 border rounded-2xl overflow-hidden hover:bg-zinc-900/50 transition-all duration-500 flex flex-col h-full ${
                    blog.is_pinned 
                      ? 'border-[#D4AF37]/60 shadow-[0_0_20px_rgba(212,175,55,0.1)]' 
                      : 'border-zinc-800/50 hover:border-[#D4AF37]/30'
                  }`}
                >
                  {blog.is_pinned ? (
                    <div className="absolute top-4 right-4 z-20">
                      <div className="bg-[#D4AF37] text-black p-1.5 rounded-full shadow-lg">
                        <Sparkles size={14} fill="black" />
                      </div>
                    </div>
                  ) : null}

                  {isAdmin && (
                    <div className="absolute top-4 right-4 z-30 flex gap-2" onClick={(e) => e.preventDefault()}>
                      <button 
                        onClick={() => handlePin(blog.id, blog.is_pinned)}
                        className={`p-2 rounded-full backdrop-blur-md transition-all ${
                          blog.is_pinned ? 'bg-[#D4AF37] text-black' : 'bg-black/60 text-zinc-400 hover:text-[#D4AF37]'
                        }`}
                        title={blog.is_pinned ? "Unpin Post" : "Pin Post"}
                      >
                        <Sparkles size={14} fill={blog.is_pinned ? "black" : "none"} />
                      </button>
                      <button 
                        onClick={() => handleDelete(blog.id)}
                        className="p-2 bg-black/60 backdrop-blur-md text-zinc-400 hover:text-red-500 rounded-full transition-all"
                        title="Delete Post"
                      >
                        <X size={14} />
                      </button>
                    </div>
                  )}

                  {blog.image_url_1 && (
                    <div className="relative aspect-[16/9] overflow-hidden border-b border-zinc-800/50">
                      <Image
                        src={blog.image_url_1}
                        alt={blog.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-700"
                      />
                      <div className="absolute top-4 left-4">
                        <span className="px-3 py-1 bg-black/60 backdrop-blur-md text-[#D4AF37] text-[8px] font-bold uppercase tracking-widest rounded-full border border-[#D4AF37]/30 flex items-center gap-1.5">
                          <Tag size={10} /> {blog.category}
                        </span>
                      </div>
                    </div>
                  )}
                  
                  <div className="p-8 flex flex-col flex-grow">
                    {!blog.image_url_1 && (
                      <div className="mb-6">
                        <span className="px-3 py-1 bg-zinc-900 text-[#D4AF37] text-[8px] font-bold uppercase tracking-widest rounded-full border border-zinc-800 flex items-center gap-1.5 w-fit">
                          <Tag size={10} /> {blog.category}
                        </span>
                      </div>
                    )}
                    <div className="flex items-center gap-4 text-xs font-mono text-zinc-500 mb-6 uppercase tracking-wider">
                      <span className="flex items-center gap-1.5">
                        <Calendar size={12} className="text-[#D4AF37]" />
                        {new Date(blog.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                      </span>
                      <span className="w-1 h-1 bg-zinc-700 rounded-full" />
                      <span className="flex items-center gap-1.5">
                        <User size={12} className="text-[#D4AF37]" />
                        {blog.author_name}
                      </span>
                    </div>

                    <h3 className="text-2xl font-bold mb-4 group-hover:text-[#D4AF37] transition-colors line-clamp-2 leading-tight">
                      {blog.title}
                    </h3>
                    
                    <p className="text-zinc-400 font-light leading-relaxed mb-8 flex-grow line-clamp-3">
                      {getPreviewText(blog.content, 120)}
                    </p>

                    <div className="flex items-center gap-2 text-[#D4AF37] text-xs font-bold uppercase tracking-widest group-hover:gap-4 transition-all">
                      Read More <ArrowRight size={14} />
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-20 bg-zinc-900/20 border border-dashed border-zinc-800 rounded-3xl"
          >
            <PenTool size={48} className="mx-auto text-zinc-800 mb-6" />
            <h3 className="text-xl font-medium text-zinc-500 mb-2">No stories published yet</h3>
            <p className="text-zinc-600 mb-8">Be the first to share an update with the community.</p>
            <Link href="/blogs/create" className="inline-flex items-center gap-2 bg-[#D4AF37] text-black px-6 py-3 rounded-full font-bold uppercase tracking-widest text-[10px] hover:scale-105 transition-all">
              Create First Blog
            </Link>
          </motion.div>
        )}
      </div>

      <Footer />
    </main>
  )
}
