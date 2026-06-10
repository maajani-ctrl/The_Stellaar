import { NextResponse } from 'next/server'
import db from '@/lib/db'
import { appendToLocalExcel } from '@/lib/local-excel'
import { createClient } from '@/lib/supabase/server'
import { appendLeadToSheet } from '@/lib/google-sheets'

export async function POST(request: Request) {
  try {
    const { name, email, phone, membershipType } = await request.json()

    if (!name || !email || !phone) {
      return NextResponse.json(
        { error: 'Name, email, and phone are required.' },
        { status: 400 }
      )
    }

    const created_at = new Date().toISOString()
    const source = 'membership_inquiry'

    // 1. Save to Supabase (Cloud Database) - Primary
    try {
      const supabase = await createClient()
      const { error: supabaseError } = await supabase
        .from('leads')
        .insert([{ 
          name, 
          email, 
          phone, 
          membership_type: membershipType || null, 
          source, 
          created_at 
        }])
      
      if (supabaseError) {
        console.warn('Supabase lead insert error:', supabaseError)
      } else {
        console.log('Lead saved to Supabase database.')
      }
    } catch (supabaseCatchError) {
      console.error('Supabase integration error:', supabaseCatchError)
    }

    // 2. Save to Google Sheets (Cloud Backup)
    try {
      await appendLeadToSheet({ name, email, phone, source, created_at })
      console.log('Lead appended to Google Sheets.')
    } catch (sheetsError) {
      console.error('Google Sheets append error:', sheetsError)
    }

    // 3. Save to Local SQL Database (SQLite) - Local Backup
    try {
      const stmt = db.prepare('INSERT INTO leads (name, email, phone, membership_type, source, created_at) VALUES (?, ?, ?, ?, ?, ?)')
      stmt.run(name, email, phone, membershipType || null, source, created_at)
      console.log('Lead saved to local SQL database.')
    } catch (dbError) {
      console.error('Local SQL insert error:', dbError)
    }

    // 4. Save to Local Excel (CSV) - Local Backup
    try {
      await appendToLocalExcel({ name, email, phone, membership_type: membershipType, source, created_at })
      console.log('Lead appended to local Excel (CSV).')
    } catch (excelError) {
      console.error('Local Excel append error:', excelError)
    }

    return NextResponse.json({ success: true })
  } catch (err) {
    console.error('Submit lead error:', err)
    return NextResponse.json(
      { error: 'Internal server error.' },
      { status: 500 }
    )
  }
}
