import fs from 'fs';
import path from 'path';

const csvPath = path.join(process.cwd(), 'data', 'leads.csv');

export async function appendToLocalExcel(data: {
  name: string;
  email: string;
  phone: string;
  source: string;
  created_at: string;
}) {
  const dataDir = path.dirname(csvPath);
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true });
  }

  const fileExists = fs.existsSync(csvPath);
  
  // Header
  if (!fileExists) {
    fs.writeFileSync(csvPath, 'Name,Email,Phone,Source,Created At\n');
  }

  // Escape commas for CSV
  const escape = (str: string) => `"${str.replace(/"/g, '""')}"`;
  
  const row = `${escape(data.name)},${escape(data.email)},${escape(data.phone)},${escape(data.source)},${escape(data.created_at)}\n`;
  
  fs.appendFileSync(csvPath, row);
}
