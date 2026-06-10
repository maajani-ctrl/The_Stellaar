'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowRight, Calendar, User, PenTool } from 'lucide-react'
import Image from 'next/image'
import { getPreviewText } from '@/utils/blog'
import Link from 'next/link'

interface Blog {
  id: number
  title: string
  content: string
  author_name: string
  image_url_1: string
  image_url_2: string
  created_at: string
}

export default function BlogPreview() {
  const [blogs, setBlogs] = useState<Blog[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await fetch('/api/blogs')
        const data = await response.json()
        if (response.ok) {
          // Only show top 3 for preview
          setBlogs(data.slice(0, 3))
        }
      } catch (error) {
        console.error('Error fetching blogs for preview:', error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchBlogs()
  }, [])

  if (isLoading && blogs.length === 0) return null
  if (!isLoading && blogs.length === 0) return null

  return (
    <section className="py-24 bg-black relative overflow-hidden">
      {/* Decorative background element */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#D4AF37]/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="container mx-auto px-6 md:px-12 relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
          <div className="max-w-2xl">
            <motion.span 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-[#D4AF37] text-xs font-mono tracking-[0.4em] uppercase mb-4 block"
            >
              The Stellaar Journal
            </motion.span>
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-4xl md:text-6xl font-bold tracking-tighter"
            >
              Latest Stories <span className="text-zinc-500 italic font-light">& Updates</span>
            </motion.h2>
          </div>
          
          <div className="flex flex-col gap-4">
            <Link 
              href="/blogs"
              className="group flex items-center gap-3 text-[#D4AF37] text-sm font-bold uppercase tracking-widest hover:gap-5 transition-all justify-end"
            >
              View All Stories <ArrowRight size={18} />
            </Link>
            <Link 
              href="/blogs/create"
              className="bg-[#D4AF37] text-black px-6 py-3 rounded-full text-[10px] font-bold uppercase tracking-widest hover:scale-105 active:scale-95 transition-all flex items-center gap-2"
            >
              <PenTool size={14} /> Share Your Story
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {blogs.map((blog, index) => (
            <motion.div
              key={blog.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <Link
                href={`/blogs/${blog.id}`}
                className="group bg-zinc-900/40 border border-zinc-800/50 rounded-2xl overflow-hidden hover:bg-zinc-900/60 hover:border-[#D4AF37]/20 transition-all duration-500 flex flex-col h-full"
              >
                {blog.image_url_1 && (
                  <div className="relative aspect-[16/9] overflow-hidden">
                    <Image 
                      src={blog.image_url_1} 
                      alt={blog.title}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-zinc-900/60 to-transparent" />
                  </div>
                )}
                
                <div className="p-8 flex flex-col flex-grow">
                  <div className="flex items-center gap-4 text-[10px] font-mono text-zinc-500 mb-6 uppercase tracking-wider">
                    <span className="flex items-center gap-1.5">
                      <Calendar size={12} className="text-[#D4AF37]" />
                      {new Date(blog.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <User size={12} className="text-[#D4AF37]" />
                      {blog.author_name}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold mb-4 group-hover:text-[#D4AF37] transition-colors line-clamp-2">
                    {blog.title}
                  </h3>
                  
                  <p className="text-zinc-400 text-sm font-light leading-relaxed mb-8 flex-grow line-clamp-3">
                    {getPreviewText(blog.content, 100)}
                  </p>

                  <div className="pt-6 border-t border-zinc-800/50 flex items-center gap-2 text-[#D4AF37] text-[10px] font-bold uppercase tracking-[0.2em]">
                    Read More <ArrowRight size={12} />
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
