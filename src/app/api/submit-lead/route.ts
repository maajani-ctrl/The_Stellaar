import { NextResponse } from 'next/server'
import db from '@/lib/db'
import { appendToLocalExcel } from '@/lib/local-excel'

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

    // 1. Save to Local SQL Database (SQLite)
    try {
      const stmt = db.prepare('INSERT INTO leads (name, email, phone, membership_type, source, created_at) VALUES (?, ?, ?, ?, ?, ?)')
      stmt.run(name, email, phone, membershipType || null, source, created_at)
      console.log('Lead saved to local SQL database.')
    } catch (dbError) {
      console.error('Local SQL insert error:', dbError)
    }

    // 2. Save to Local Excel (CSV)
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
