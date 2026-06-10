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
    const { name, role, description, image_url, display_order } = await request.json()
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user || user.email !== ADMIN_EMAIL) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 403 })
    }

    // Try Supabase first
    if (process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
      const { error } = await supabase
        .from('staff')
        .update({ name, role, description, image_url, display_order })
        .eq('id', id)
      
      if (!error) {
        return NextResponse.json({ success: true })
      }
    }

    // Fallback to SQLite
    const stmt = db.prepare('UPDATE staff SET name = ?, role = ?, description = ?, image_url = ?, display_order = ? WHERE id = ?')
    stmt.run(name, role, description, image_url, display_order, id)

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error updating staff:', error)
    return NextResponse.json({ error: 'Failed to update staff' }, { status: 500 })
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
        .from('staff')
        .delete()
        .eq('id', id)
      
      if (!error) {
        return NextResponse.json({ success: true })
      }
    }

    // Fallback to SQLite
    const stmt = db.prepare('DELETE FROM staff WHERE id = ?')
    stmt.run(id)

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error deleting staff:', error)
    return NextResponse.json({ error: 'Failed to delete staff' }, { status: 500 })
  }
}
