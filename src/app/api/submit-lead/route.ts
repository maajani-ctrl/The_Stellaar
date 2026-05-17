import { NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'
import { appendLeadToSheet } from '@/lib/google-sheets'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || ''
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''

export async function POST(request: Request) {
  try {
    const { name, email, phone } = await request.json()

    if (!name || !email || !phone) {
      return NextResponse.json(
        { error: 'Name, email, and phone are required.' },
        { status: 400 }
      )
    }

    const created_at = new Date().toISOString()
    const source = 'membership_inquiry'

    // 1. Save to Supabase (SQL database)
    const supabase = createClient(supabaseUrl, supabaseAnonKey)
    const { error: dbError } = await supabase
      .from('leads')
      .insert([{ email, name, phone, source }])

    if (dbError) {
      console.error('Supabase insert error:', dbError)
    }

    // 2. Save to Google Sheets (fire-and-forget)
    appendLeadToSheet({ name, email, phone, source, created_at })

    return NextResponse.json({ success: true })
  } catch (err) {
    console.error('Submit lead error:', err)
    return NextResponse.json(
      { error: 'Internal server error.' },
      { status: 500 }
    )
  }
}
