import { NextResponse } from 'next/server'
import db from '@/lib/db'
import { createClient } from '@/lib/supabase/server'

const ADMIN_EMAIL = 'office.thestellaar@gmail.com'

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const { is_pinned } = await request.json()
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user || user.email !== ADMIN_EMAIL) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 403 })
    }

    // Try Supabase first
    if (process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
      const { error } = await supabase
        .from('blogs')
        .update({ is_pinned })
        .eq('id', id)
      
      if (!error) {
        return NextResponse.json({ success: true })
      }
    }

    // Fallback to SQLite
    const stmt = db.prepare('UPDATE blogs SET is_pinned = ? WHERE id = ?')
    stmt.run(is_pinned ? 1 : 0, id)

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error updating blog:', error)
    return NextResponse.json({ error: 'Failed to update blog' }, { status: 500 })
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user || user.email !== ADMIN_EMAIL) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 403 })
    }

    // Try Supabase first
    if (process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
      const { error } = await supabase
        .from('blogs')
        .delete()
        .eq('id', id)
      
      if (!error) {
        return NextResponse.json({ success: true })
      }
    }

    // Fallback to SQLite
    const stmt = db.prepare('DELETE FROM blogs WHERE id = ?')
    stmt.run(id)

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error deleting blog:', error)
    return NextResponse.json({ error: 'Failed to delete blog' }, { status: 500 })
  }
}
