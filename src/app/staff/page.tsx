'use client'

import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Plus, X, Upload, Edit2, Trash2, Save, User, UserCircle, Briefcase, Info, Loader2 } from 'lucide-react'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import Image from 'next/image'
import { createClient } from '@/lib/supabase/client'
import { User as SupabaseUser } from '@supabase/supabase-js'

interface StaffMember {
  id: string
  name: string
  role: string
  description: string
  image_url: string
  display_order: number
}

interface EditingMember extends Partial<StaffMember> {
  _file?: File;
}

export default function StaffPage() {
  const [staff, setStaff] = useState<StaffMember[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [currentUser, setCurrentUser] = useState<SupabaseUser | null>(null)
  const [isEditing, setIsEditing] = useState(false)
  const [editingMember, setEditingMember] = useState<EditingMember | null>(null)
  const [previewImage, setPreviewImage] = useState<string | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const ADMIN_EMAIL = 'office.thestellaar@gmail.com'
  const isAdmin = currentUser?.email === ADMIN_EMAIL
  const supabase = createClient()

  const fetchStaff = useCallback(async () => {
    setIsLoading(true)
    try {
      const response = await fetch('/api/staff')
      const data = await response.json()
      if (response.ok) {
        setStaff(data)
      }
    } catch (error) {
      console.error('Error fetching staff:', error)
    } finally {
      setIsLoading(false)
    }
  }, [])

  useEffect(() => {
    const checkUser = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      setCurrentUser(user)
    }
    checkUser()
    
    // Initial fetch
    const initialFetch = async () => {
      await fetchStaff()
    }
    initialFetch()
  }, [supabase, fetchStaff])

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const url = URL.createObjectURL(file)
      setPreviewImage(url)
      setEditingMember(prev => ({ ...prev, _file: file }))
    }
  }

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

  const handleSave = async () => {
    if (!editingMember?.name || !editingMember?.role) {
      alert('Name and Role are required')
      return
    }

    setIsSubmitting(true)
    try {
      let finalImageUrl = editingMember.image_url || ''
      
      // 1. Upload new image if present
      if (editingMember._file) {
        finalImageUrl = await uploadFile(editingMember._file)
      }

      const method = editingMember.id ? 'PATCH' : 'POST'
      const url = editingMember.id ? `/api/staff/${editingMember.id}` : '/api/staff'

      const payload = { ...editingMember, image_url: finalImageUrl };
      delete payload._file;

      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      })

      if (response.ok) {
        setIsEditing(false)
        setEditingMember(null)
        setPreviewImage(null)
        fetchStaff()
      } else {
        const error = await response.json()
        throw new Error(error.error || 'Failed to save')
      }
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : 'An error occurred'
      alert(message)
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to remove this staff member?')) return
    try {
      const response = await fetch(`/api/staff/${id}`, { method: 'DELETE' })
      if (response.ok) fetchStaff()
    } catch (error) {
      console.error('Error deleting staff:', error)
    }
  }

  return (
    <main className="min-h-screen bg-black text-white selection:bg-[#D4AF37] selection:text-black">
      <Navbar />
      
      <div className="pt-32 pb-20 px-6 md:px-12 max-w-7xl mx-auto">
        <header className="mb-20 text-center relative">
          <motion.span 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-[#D4AF37] text-xs font-mono tracking-[0.4em] uppercase mb-4 block"
          >
            Elite Professionals
          </motion.span>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-5xl md:text-7xl font-bold tracking-tighter mb-6"
          >
            Meet Our <span className="text-zinc-500 italic font-light">Team</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-zinc-400 max-w-2xl mx-auto text-lg md:text-xl font-light leading-relaxed"
          >
            The dedicated individuals committed to delivering the ultimate lifestyle sanctuary for our members.
          </motion.p>

          {isAdmin && (
            <motion.button
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              onClick={() => {
                setEditingMember({ display_order: staff.length })
                setIsEditing(true)
              }}
              className="mt-10 inline-flex items-center gap-2 bg-[#D4AF37] text-black px-8 py-4 rounded-full font-bold uppercase tracking-widest text-xs hover:scale-105 active:scale-95 transition-all shadow-[0_0_30px_rgba(212,175,55,0.2)]"
            >
              <Plus size={18} /> Add Staff Member
            </motion.button>
          )}
        </header>

        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-20 gap-4">
            <div className="w-12 h-12 border-2 border-[#D4AF37]/20 border-t-[#D4AF37] rounded-full animate-spin" />
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12">
            {staff.map((member) => (
              <motion.div
                key={member.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="group relative bg-zinc-900/30 border border-zinc-800/50 rounded-3xl overflow-hidden hover:bg-zinc-900/50 hover:border-[#D4AF37]/30 transition-all duration-500"
              >
                {isAdmin && (
                  <div className="absolute top-4 right-4 z-20 flex gap-2">
                    <button 
                      onClick={() => {
                        setEditingMember(member)
                        setPreviewImage(member.image_url)
                        setIsEditing(true)
                      }}
                      className="p-2 bg-black/60 backdrop-blur-md text-zinc-400 hover:text-[#D4AF37] rounded-full transition-all"
                    >
                      <Edit2 size={16} />
                    </button>
                    <button 
                      onClick={() => handleDelete(member.id)}
                      className="p-2 bg-black/60 backdrop-blur-md text-zinc-400 hover:text-red-500 rounded-full transition-all"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                )}

                <div className="relative aspect-[4/5] overflow-hidden">
                  {member.image_url ? (
                    <Image
                      src={member.image_url}
                      alt={member.name}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                  ) : (
                    <div className="w-full h-full bg-zinc-900 flex items-center justify-center text-zinc-800">
                      <UserCircle size={100} strokeWidth={1} />
                    </div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-60" />
                  
                  <div className="absolute bottom-0 left-0 right-0 p-8">
                    <div className="text-[#D4AF37] text-[10px] font-mono uppercase tracking-[0.2em] mb-2">{member.role}</div>
                    <h3 className="text-2xl font-bold tracking-tight">{member.name}</h3>
                  </div>
                </div>

                <div className="p-8 pt-6">
                  <p className="text-zinc-400 font-light leading-relaxed text-sm">
                    {member.description || "A valued professional at The Stellaar Club dedicated to excellence."}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {!isLoading && staff.length === 0 && (
          <div className="text-center py-20 bg-zinc-900/20 border border-dashed border-zinc-800 rounded-3xl">
            <UserCircle size={48} className="mx-auto text-zinc-800 mb-6" />
            <h3 className="text-xl font-medium text-zinc-500 mb-2">No team members showcased yet</h3>
            <p className="text-zinc-600">The office admin will update this shortly.</p>
          </div>
        )}
      </div>

      <Footer />

      {/* Admin Modal */}
      <AnimatePresence>
        {isEditing && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsEditing(false)}
              className="absolute inset-0 bg-black/90 backdrop-blur-md"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-2xl bg-zinc-900 border border-zinc-800 rounded-3xl overflow-hidden shadow-2xl"
            >
              <div className="flex items-center justify-between p-6 border-b border-zinc-800">
                <h2 className="text-xl font-bold flex items-center gap-2">
                  {editingMember?.id ? <Edit2 size={18} /> : <Plus size={18} />}
                  {editingMember?.id ? 'Edit Staff Member' : 'Add New Staff'}
                </h2>
                <button onClick={() => setIsEditing(false)} className="text-zinc-500 hover:text-white transition-colors">
                  <X size={24} />
                </button>
              </div>

              <div className="p-8 max-h-[70vh] overflow-y-auto space-y-6">
                <div className="flex flex-col md:flex-row gap-8">
                  <div className="space-y-4">
                    <label className="text-[10px] uppercase tracking-widest font-bold text-zinc-500 block">Photo</label>
                    <div className="relative w-40 h-40 rounded-2xl overflow-hidden bg-zinc-950 border border-zinc-800 flex items-center justify-center group cursor-pointer">
                      {previewImage ? (
                        <Image src={previewImage} alt="Preview" fill className="object-cover" />
                      ) : (
                        <UserCircle size={64} className="text-zinc-800" />
                      )}
                      <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <Upload size={24} className="text-[#D4AF37]" />
                      </div>
                      <input type="file" accept="image/*" onChange={handleImageChange} className="absolute inset-0 opacity-0 cursor-pointer" />
                    </div>
                  </div>

                  <div className="flex-grow space-y-4">
                    <div className="space-y-2">
                      <label className="text-[10px] uppercase tracking-widest font-bold text-zinc-500 block flex items-center gap-2">
                        <User size={12} /> Full Name
                      </label>
                      <input 
                        type="text"
                        value={editingMember?.name || ''}
                        onChange={(e) => setEditingMember(prev => ({ ...prev, name: e.target.value }))}
                        className="w-full bg-black/40 border border-zinc-800 rounded-xl py-3 px-4 focus:outline-none focus:border-[#D4AF37] transition-all"
                        placeholder="e.g. John Doe"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] uppercase tracking-widest font-bold text-zinc-500 block flex items-center gap-2">
                        <Briefcase size={12} /> Job Role
                      </label>
                      <input 
                        type="text"
                        value={editingMember?.role || ''}
                        onChange={(e) => setEditingMember(prev => ({ ...prev, role: e.target.value }))}
                        className="w-full bg-black/40 border border-zinc-800 rounded-xl py-3 px-4 focus:outline-none focus:border-[#D4AF37] transition-all"
                        placeholder="e.g. General Manager"
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] uppercase tracking-widest font-bold text-zinc-500 block flex items-center gap-2">
                    <Info size={12} /> Description
                  </label>
                  <textarea 
                    rows={4}
                    value={editingMember?.description || ''}
                    onChange={(e) => setEditingMember(prev => ({ ...prev, description: e.target.value }))}
                    className="w-full bg-black/40 border border-zinc-800 rounded-xl py-3 px-4 focus:outline-none focus:border-[#D4AF37] transition-all resize-none"
                    placeholder="Brief professional bio..."
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] uppercase tracking-widest font-bold text-zinc-500 block">Display Order</label>
                  <input 
                    type="number"
                    value={editingMember?.display_order || 0}
                    onChange={(e) => setEditingMember(prev => ({ ...prev, display_order: parseInt(e.target.value) || 0 }))}
                    className="w-full bg-black/40 border border-zinc-800 rounded-xl py-3 px-4 focus:outline-none focus:border-[#D4AF37] transition-all"
                  />
                  <p className="text-[10px] text-zinc-600">Lower numbers appear first.</p>
                </div>
              </div>

              <div className="p-6 border-t border-zinc-800 flex justify-end gap-4">
                <button 
                  onClick={() => setIsEditing(false)}
                  className="px-6 py-3 rounded-xl font-bold uppercase tracking-widest text-[10px] text-zinc-500 hover:text-white transition-all"
                >
                  Cancel
                </button>
                <button 
                  onClick={handleSave}
                  disabled={isSubmitting}
                  className="bg-[#D4AF37] text-black px-8 py-3 rounded-xl font-bold uppercase tracking-widest text-[10px] hover:scale-105 active:scale-95 transition-all disabled:opacity-50 flex items-center gap-2"
                >
                  {isSubmitting ? <Loader2 className="animate-spin" size={14} /> : <Save size={14} />}
                  Save Member
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </main>
  )
}
