import { NextResponse } from 'next/server'
import db from '@/lib/db'
import { createClient } from '@/lib/supabase/server'

const ADMIN_EMAIL = 'office.thestellaar@gmail.com'

export async function GET() {
  try {
    const supabase = await createClient()
    
    // Try Supabase first
    if (process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
      const { data: staff, error } = await supabase
        .from('staff')
        .select('*')
        .order('display_order', { ascending: true })
      
      if (!error && staff) {
        return NextResponse.json(staff)
      }
    }

    // Fallback to SQLite
    const staff = db.prepare('SELECT * FROM staff ORDER BY display_order ASC, name ASC').all()
    return NextResponse.json(staff)
  } catch (error) {
    console.error('Error fetching staff:', error)
    return NextResponse.json({ error: 'Failed to fetch staff' }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user || user.email !== ADMIN_EMAIL) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 403 })
    }

    const { name, role, description, image_url, display_order } = await request.json()

    if (!name || !role) {
      return NextResponse.json({ error: 'Name and role are required' }, { status: 400 })
    }

    // Try Supabase first
    if (process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
      const { data, error } = await supabase
        .from('staff')
        .insert([{ name, role, description, image_url, display_order: display_order || 0 }])
        .select()
      
      if (!error) {
        return NextResponse.json({ success: true, id: data[0].id })
      }
    }

    // Fallback to SQLite
    const stmt = db.prepare('INSERT INTO staff (name, role, description, image_url, display_order) VALUES (?, ?, ?, ?, ?)')
    const result = stmt.run(name, role, description || null, image_url || null, display_order || 0)

    return NextResponse.json({ success: true, id: result.lastInsertRowid.toString() })
  } catch (error) {
    console.error('Error creating staff:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
