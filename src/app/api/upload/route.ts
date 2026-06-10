import { NextResponse } from 'next/server'
import path from 'path'
import fs from 'fs'
import { createClient } from '@/lib/supabase/server'

export async function POST(request: Request) {
  try {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const formData = await request.formData()
    const file = formData.get('file') as File | null

    if (!file) {
      return NextResponse.json({ error: 'No file uploaded' }, { status: 400 })
    }

    const bytes = await file.arrayBuffer()
    const buffer = Buffer.from(bytes)
    const filename = `${Date.now()}-${file.name.replace(/\s+/g, '-')}`

    // Try Supabase Storage first
    if (process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
      const supabase = await createClient()
      
      const { error } = await supabase.storage
        .from('stellaar-assets') // Name of the bucket
        .upload(`uploads/${filename}`, buffer, {
          contentType: file.type,
          upsert: false
        })

      if (error) {
        console.error('Supabase upload error:', error)
        // Fall through to local storage if bucket doesn't exist or fails during dev
      } else {
        // Get the public URL
        const { data: { publicUrl } } = supabase.storage
          .from('stellaar-assets')
          .getPublicUrl(`uploads/${filename}`)

        return NextResponse.json({ 
          success: true, 
          url: publicUrl 
        })
      }
    }

    // Fallback to local file system (for local dev without Supabase configured)
    const uploadDir = path.join(process.cwd(), 'public', 'uploads', 'blogs')
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true })
    }

    const filepath = path.join(uploadDir, filename)
    fs.writeFileSync(filepath, buffer)

    return NextResponse.json({ 
      success: true, 
      url: `/uploads/blogs/${filename}` 
    })
  } catch (err) {
    console.error('Upload error:', err)
    return NextResponse.json({ error: 'Failed to upload file' }, { status: 500 })
  }
}
