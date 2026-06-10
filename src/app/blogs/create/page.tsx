'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { ArrowLeft, Send, Sparkles, X, Upload } from 'lucide-react'
import Navbar from '@/components/Navbar'
import BlogEditor from '@/components/blog/BlogEditor'
import { createClient } from '@/lib/supabase/client'
import Image from 'next/image'
import Link from 'next/link'

interface UserMetadata {
  full_name?: string;
}

interface User {
  id: string;
  email?: string;
  user_metadata?: UserMetadata;
}

interface ImagePreview {
  file: File | null;
  url: string;
}

export default function CreateBlog() {
  const [title, setTitle] = useState('')
  const [authorName, setAuthorName] = useState('')
  const [category, setCategory] = useState('General')
  const [content, setContent] = useState('')
  const [images, setImages] = useState<ImagePreview[]>([])
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [uploadingImages, setUploadingImages] = useState(false)
  const [user, setUser] = useState<User | null>(null)
  const router = useRouter()
  const supabase = createClient()

  const categories = ['General', 'Events', 'Lifestyle', 'Wellness', 'Dining', 'Updates']

  useEffect(() => {
    // Cleanup preview URLs to prevent memory leaks
    return () => {
      images.forEach(img => {
        if (img.url.startsWith('blob:')) {
          URL.revokeObjectURL(img.url)
        }
      })
    }
  }, [images])

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const selectedFiles = Array.from(e.target.files)
      const newImages = selectedFiles.map(file => ({
        file,
        url: URL.createObjectURL(file)
      }))
      setImages(prev => [...prev, ...newImages].slice(0, 2))
    }
  }

  const removeImage = (index: number) => {
    setImages(prev => {
      const newImages = [...prev]
      if (newImages[index].url.startsWith('blob:')) {
        URL.revokeObjectURL(newImages[index].url)
      }
      newImages.splice(index, 1)
      return newImages
    })
  }

  useEffect(() => {
    const checkUser = async () => {
      try {
        const { data: { user: authUser } } = await supabase.auth.getUser()
        if (authUser) {
          const typedUser: User = {
            id: authUser.id,
            email: authUser.email,
            user_metadata: {
              full_name: authUser.user_metadata?.full_name as string | undefined
            }
          }
          setUser(typedUser)
          setAuthorName(prev => prev || (authUser.user_metadata?.full_name as string) || authUser.email?.split('@')[0] || '')
        } else {
          // No user found, set guest
          setUser({ id: 'guest', user_metadata: { full_name: 'Guest Member' } })
          setAuthorName(prev => prev || 'Guest Member')
        }
      } catch {
        console.warn('Supabase auth check failed — proceeding as guest.')
        setUser({ id: 'guest', user_metadata: { full_name: 'Guest Member' } })
        setAuthorName(prev => prev || 'Guest Member')
      }
    }
    checkUser()
  }, [supabase])

  const uploadFile = async (file: File) => {
    const formData = new FormData()
    formData.append('file', file)
    const response = await fetch('/api/upload', {
      method: 'POST',
      body: formData
    })
    const data = (await response.json()) as { url: string; error?: string }
    if (!response.ok) throw new Error(data.error || 'Upload failed')
    return data.url
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    // Better content validation
    const strippedContent = content.replace(/<[^>]*>/g, '').trim()
    if (!title.trim() || !strippedContent || !authorName.trim()) {
      alert('Please provide a title, some content, and your name.')
      return
    }

    setIsSubmitting(true)
    setUploadingImages(true)

    try {
      // 1. Upload images if they are files
      const imageUrls = await Promise.all(
        images.map(async (img) => {
          if (img.file) {
            try {
              return await uploadFile(img.file)
            } catch (uploadErr: unknown) {
              console.error('Image upload failed:', uploadErr)
              const message = uploadErr instanceof Error ? uploadErr.message : 'Unknown error'
              throw new Error(`Photo upload failed: ${message}`)
            }
          }
          return img.url
        })
      )

      setUploadingImages(false)

      // 2. Submit blog
      const response = await fetch('/api/blogs', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: title.trim(),
          content,
          author_id: user?.id || 'guest',
          author_name: authorName.trim(),
          category,
          image_url_1: imageUrls[0] || null,
          image_url_2: imageUrls[1] || null,
        }),
      })

      const data = (await response.json()) as { error?: string, details?: string }

      if (!response.ok) {
        throw new Error(data.error || data.details || 'Failed to save blog')
      }

      router.push('/blogs')
      router.refresh()
    } catch (err: unknown) {
      console.error('Error saving blog:', err)
      const message = err instanceof Error ? err.message : 'Failed to save blog. Please try again.'
      alert(message)
    } finally {
      setIsSubmitting(false)
      setUploadingImages(false)
    }
  }

  return (
    <main className="min-h-screen bg-black text-white pb-20">
      <Navbar />
      
      <div className="pt-32 px-6 md:px-12 max-w-4xl mx-auto">
        <Link
          href="/blogs"
          className="flex items-center gap-2 text-zinc-400 hover:text-[#D4AF37] transition-colors mb-8 group w-fit"
        >
          <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
          Back
        </Link>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12"
        >
          <span className="text-[#D4AF37] text-xs font-mono tracking-[0.3em] uppercase mb-4 block flex items-center gap-2">
            <Sparkles size={14} /> Share Your Stellaar Story
          </span>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight">Create New Blog</h1>
        </motion.div>

        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="space-y-2">
            <label htmlFor="title" className="text-sm font-mono tracking-widest text-zinc-500 uppercase">
              Blog Title
            </label>
            <input
              id="title"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter a captivating title..."
              className="w-full bg-transparent border-b border-zinc-800 py-4 text-2xl md:text-3xl font-medium focus:outline-none focus:border-[#D4AF37] transition-colors placeholder:text-zinc-800"
              required
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="authorName" className="text-sm font-mono tracking-widest text-zinc-500 uppercase">
              Author Name
            </label>
            <input
              id="authorName"
              type="text"
              value={authorName}
              onChange={(e) => setAuthorName(e.target.value)}
              placeholder="Enter author's name..."
              className="w-full bg-transparent border-b border-zinc-800 py-2 text-xl font-medium focus:outline-none focus:border-[#D4AF37] transition-colors placeholder:text-zinc-800"
              required
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="category" className="text-sm font-mono tracking-widest text-zinc-500 uppercase">
              Category
            </label>
            <div className="flex flex-wrap gap-2 pt-2">
              {categories.map((cat) => (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setCategory(cat)}
                  className={`px-4 py-2 rounded-full text-[10px] font-bold uppercase tracking-widest transition-all ${
                    category === cat 
                      ? 'bg-[#D4AF37] text-black' 
                      : 'bg-zinc-900 text-zinc-500 hover:text-white border border-zinc-800'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-4">
            <label className="text-sm font-mono tracking-widest text-zinc-500 uppercase block">
              Photos (Max 2)
            </label>
            <div className="flex flex-wrap gap-4">
              {images.map((img, index) => (
                <div key={index} className="relative w-32 h-32 rounded-xl overflow-hidden border border-zinc-800 bg-zinc-900">
                  <Image 
                    src={img.url} 
                    alt="Preview" 
                    fill 
                    className="object-cover" 
                  />
                  <button
                    type="button"
                    onClick={() => removeImage(index)}
                    className="absolute top-1 right-1 bg-black/50 text-white p-1 rounded-full hover:bg-red-500 transition-colors"
                  >
                    <X size={14} />
                  </button>
                </div>
              ))}
              
              {images.length < 2 && (
                <label className="w-32 h-32 rounded-xl border-2 border-dashed border-zinc-800 hover:border-[#D4AF37]/50 transition-colors flex flex-col items-center justify-center cursor-pointer gap-2 group">
                  <div className="bg-zinc-900 p-2 rounded-lg group-hover:text-[#D4AF37] transition-colors">
                    <Upload size={20} />
                  </div>
                  <span className="text-[10px] text-zinc-500 font-bold uppercase tracking-widest">Add Photo</span>
                  <input 
                    type="file" 
                    accept="image/*" 
                    onChange={handleImageChange} 
                    className="hidden" 
                    multiple={images.length === 0}
                  />
                </label>
              )}
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-mono tracking-widest text-zinc-500 uppercase">
              Content
            </label>
            <BlogEditor content={content} onChange={setContent} />
          </div>

          <div className="flex justify-end">
            <button
              type="submit"
              disabled={isSubmitting}
              className="flex items-center gap-2 bg-[#D4AF37] text-black px-8 py-4 rounded-full font-bold uppercase tracking-widest text-xs hover:scale-105 active:scale-95 transition-all disabled:opacity-50 disabled:scale-100"
            >
              {isSubmitting ? (uploadingImages ? 'Uploading...' : 'Publishing...') : (
                <>
                  <Send size={16} /> Publish Story
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </main>
  )
}
