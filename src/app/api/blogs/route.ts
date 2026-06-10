import { NextResponse } from 'next/server'
import db from '@/lib/db'
import { createClient } from '@/lib/supabase/server'

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const category = searchParams.get('category')
    const search = searchParams.get('search')
    
    const supabase = await createClient()
    
    // Try Supabase first
    if (process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
      let query = supabase
        .from('blogs')
        .select('*')
        .order('is_pinned', { ascending: false })
        .order('created_at', { ascending: false })
      
      if (category && category !== 'All') {
        query = query.eq('category', category)
      }
      
      if (search) {
        query = query.or(`title.ilike.%${search}%,content.ilike.%${search}%`)
      }
      
      const { data: blogs, error } = await query
      
      if (!error && blogs) {
        return NextResponse.json(blogs)
      }
      console.warn('Supabase fetch failed or table missing, falling back to SQLite:', error)
    }

    // Fallback to SQLite
    let blogs
    if (search) {
      const searchTerm = `%${search}%`
      if (category && category !== 'All') {
        blogs = db.prepare('SELECT * FROM blogs WHERE category = ? AND (title LIKE ? OR content LIKE ?) ORDER BY is_pinned DESC, created_at DESC')
          .all(category, searchTerm, searchTerm)
      } else {
        blogs = db.prepare('SELECT * FROM blogs WHERE title LIKE ? OR content LIKE ? ORDER BY is_pinned DESC, created_at DESC')
          .all(searchTerm, searchTerm)
      }
    } else if (category && category !== 'All') {
      blogs = db.prepare('SELECT * FROM blogs WHERE category = ? ORDER BY is_pinned DESC, created_at DESC').all(category)
    } else {
      blogs = db.prepare('SELECT * FROM blogs ORDER BY is_pinned DESC, created_at DESC').all()
    }
    
    return NextResponse.json(blogs)
  } catch (error) {
    console.error('Error fetching blogs:', error)
    return NextResponse.json({ error: 'Failed to fetch blogs' }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { title, content, author_name, author_id, image_url_1, image_url_2, category } = await request.json()

    if (!title || !content || !author_name) {
      return NextResponse.json(
        { error: 'Title, content, and author name are required.' },
        { status: 400 }
      )
    }

    // Try Supabase first
    if (process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
      const { data, error } = await supabase
        .from('blogs')
        .insert([{
          title,
          content,
          author_name,
          author_id: author_id === 'guest' || author_id === 'anonymous' ? null : author_id,
          category: category || 'General',
          image_url_1,
          image_url_2
        }])
        .select()
      
      if (!error) {
        return NextResponse.json({ success: true, id: data[0].id })
      }
      console.warn('Supabase insert failed, falling back to SQLite:', error)
    }

    // Fallback to SQLite
    const stmt = db.prepare('INSERT INTO blogs (title, content, author_name, author_id, image_url_1, image_url_2, category) VALUES (?, ?, ?, ?, ?, ?, ?)')
    const result = stmt.run(title, content, author_name, author_id || null, image_url_1 || null, image_url_2 || null, category || 'General')

    return NextResponse.json({ 
      success: true, 
      id: result.lastInsertRowid.toString() // Convert BigInt to string for JSON serialization
    })
  } catch (error: unknown) {
    console.error('Error creating blog:', error)
    const message = error instanceof Error ? error.message : 'Internal server error.'
    const details = error instanceof Error ? error.toString() : String(error)
    return NextResponse.json({ 
      error: message,
      details: details
    }, { status: 500 })
  }
}
