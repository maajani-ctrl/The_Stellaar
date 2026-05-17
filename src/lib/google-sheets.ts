import { google, sheets_v4 } from 'googleapis'

const SCOPES = ['https://www.googleapis.com/auth/spreadsheets']

function getAuth() {
  const email = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL
  const key = process.env.GOOGLE_PRIVATE_KEY

  if (!email || !key) {
    console.warn('Google Sheets credentials not configured — skipping sheet append.')
    return null
  }

  const auth = new google.auth.JWT({
    email,
    key: key.replace(/\\n/g, '\n'),
    scopes: SCOPES,
  })

  return auth
}

export function getSheetsClient(): sheets_v4.Sheets | null {
  const auth = getAuth()
  if (!auth) return null
  return google.sheets({ version: 'v4', auth })
}

export async function appendLeadToSheet(data: {
  name: string
  email: string
  phone: string
  source: string
  created_at: string
}) {
  const sheets = getSheetsClient()
  if (!sheets) return

  const spreadsheetId = process.env.GOOGLE_SHEET_ID
  if (!spreadsheetId) {
    console.warn('GOOGLE_SHEET_ID not set — skipping sheet append.')
    return
  }

  try {
    // Ensure header row exists
    await sheets.spreadsheets.values.append({
      spreadsheetId,
      range: 'Sheet1!A:E',
      valueInputOption: 'USER_ENTERED',
      requestBody: {
        values: [['Name', 'Email', 'Phone', 'Source', 'Submitted At']],
      },
    }).catch(() => {
      // Header likely already exists — ignore
    })

    // Append the lead row
    await sheets.spreadsheets.values.append({
      spreadsheetId,
      range: 'Sheet1!A:E',
      valueInputOption: 'USER_ENTERED',
      requestBody: {
        values: [[data.name, data.email, data.phone, data.source, data.created_at]],
      },
    })

    console.log('Lead appended to Google Sheet successfully.')
  } catch (err) {
    console.error('Failed to append lead to Google Sheet:', err)
  }
}
