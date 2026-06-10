'use client'

import { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { Calendar, User, ArrowLeft, Share2 } from 'lucide-react'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import Image from 'next/image'
import Link from 'next/link'
import DOMPurify from 'isomorphic-dompurify'

interface Blog {
  id: string
  title: string
  content: string
  author_name: string
  image_url_1?: string
  image_url_2?: string
  created_at: string
}

export default function BlogPost() {
  const { id } = useParams()
  const router = useRouter()
  const [blog, setBlog] = useState<Blog | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchBlog = async () => {
      if (!id) return

      try {
        const response = await fetch(`/api/blogs/${id}`)
        const data = await response.json()
        
        if (response.ok) {
          setBlog(data)
        } else {
          console.error('Error fetching blog:', data.error)
          router.push('/blogs')
        }
      } catch (error) {
        console.error('Error fetching blog:', error)
        router.push('/blogs')
      } finally {
        setIsLoading(false)
      }
    }

    fetchBlog()
  }, [id, router])

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: blog?.title,
        url: window.location.href,
      })
    } else {
      navigator.clipboard.writeText(window.location.href)
      alert('Link copied to clipboard!')
    }
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="w-12 h-12 border-2 border-[#D4AF37]/20 border-t-[#D4AF37] rounded-full animate-spin" />
      </div>
    )
  }

  if (!blog) return null

  return (
    <main className="min-h-screen bg-black text-white selection:bg-[#D4AF37] selection:text-black">
      <Navbar />
      
      <article className="pt-32 pb-20 px-6 md:px-12 max-w-4xl mx-auto">
        <Link
          href="/blogs"
          className="flex items-center gap-2 text-zinc-400 hover:text-[#D4AF37] transition-colors mb-12 group w-fit"
        >
          <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
          Back to Stories
        </Link>

        <header className="mb-12">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-4 text-xs font-mono text-zinc-500 mb-6 uppercase tracking-wider"
          >
            <span className="flex items-center gap-1.5">
              <Calendar size={14} className="text-[#D4AF37]" />
              {new Date(blog.created_at).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
            </span>
            <span className="w-1 h-1 bg-zinc-700 rounded-full" />
            <span className="flex items-center gap-1.5">
              <User size={14} className="text-[#D4AF37]" />
              {blog.author_name}
            </span>
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-6xl font-bold tracking-tight mb-8 leading-[1.1]"
          >
            {blog.title}
          </motion.h1>

          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="flex items-center gap-4"
          >
            <button 
              onClick={handleShare}
              className="flex items-center gap-2 px-4 py-2 bg-zinc-900 border border-zinc-800 rounded-full text-xs font-bold uppercase tracking-widest text-zinc-400 hover:text-[#D4AF37] hover:border-[#D4AF37]/30 transition-all"
            >
              <Share2 size={14} /> Share Story
            </button>
          </motion.div>
        </header>

        {blog.image_url_1 && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 }}
            className="relative aspect-[21/9] rounded-3xl overflow-hidden mb-12 border border-zinc-800"
          >
            <Image 
              src={blog.image_url_1} 
              alt={blog.title} 
              fill 
              priority
              className="object-cover" 
            />
          </motion.div>
        )}

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="prose prose-invert prose-zinc max-w-none 
            prose-headings:text-white prose-headings:font-bold prose-headings:tracking-tight
            prose-p:text-zinc-300 prose-p:leading-relaxed prose-p:text-lg
            prose-a:text-[#D4AF37] prose-a:no-underline hover:prose-a:underline
            prose-blockquote:border-[#D4AF37] prose-blockquote:bg-zinc-900/50 prose-blockquote:py-1 prose-blockquote:rounded-r-lg
            prose-strong:text-white prose-strong:font-bold mb-12"
          dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(blog.content) }}
        />

        {blog.image_url_2 && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="relative aspect-[16/9] rounded-3xl overflow-hidden mb-12 border border-zinc-800"
          >
            <Image 
              src={blog.image_url_2} 
              alt={`${blog.title} - secondary`} 
              fill 
              className="object-cover" 
            />
          </motion.div>
        )}

        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-20 pt-12 border-t border-zinc-800 flex flex-col items-center text-center"
        >
          <div className="w-16 h-16 bg-[#D4AF37]/10 rounded-full flex items-center justify-center mb-6">
            <User size={32} className="text-[#D4AF37]" />
          </div>
          <p className="text-zinc-500 font-mono text-[10px] uppercase tracking-[0.3em] mb-2">Written By</p>
          <h4 className="text-xl font-bold mb-4">{blog.author_name}</h4>
          <p className="text-zinc-400 max-w-sm text-sm font-light">
            A valued member of The Stellaar Club community, sharing insights and stories from our premium lifestyle sanctuary.
          </p>
        </motion.div>
      </article>

      <Footer />
    </main>
  )
}
