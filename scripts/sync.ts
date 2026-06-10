import { createClient } from '@supabase/supabase-js';
import Database from 'better-sqlite3';
import path from 'path';
import fs from 'fs';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config({ path: '.env.local' });

const dbPath = path.join(process.cwd(), 'data', 'leads.db');
const csvPath = path.join(process.cwd(), 'data', 'leads.csv');

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('❌ Supabase credentials missing.');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);
const db = new Database(dbPath);

async function syncLeads() {
  console.log('🔄 Syncing leads...');
  const { data, error } = await supabase.from('leads').select('*');
  if (error) {
    console.error('❌ Error fetching leads from Supabase:', error.message);
    return;
  }

  if (data) {
    const insert = db.prepare(`
      INSERT INTO leads (id, name, email, phone, membership_type, source, created_at)
      VALUES (?, ?, ?, ?, ?, ?, ?)
      ON CONFLICT(id) DO UPDATE SET
        name = excluded.name,
        email = excluded.email,
        phone = excluded.phone,
        membership_type = excluded.membership_type,
        source = excluded.source,
        created_at = excluded.created_at
    `);

    const transaction = db.transaction((items) => {
      for (const item of items) {
        insert.run(item.id, item.name, item.email, item.phone, item.membership_type, item.source, item.created_at);
      }
    });

    transaction(data);
    console.log(`✅ Synced ${data.length} leads.`);

    // Update CSV
    const escape = (str: string) => `"${(str || '').replace(/"/g, '""')}"`;
    const header = 'Name,Email,Phone,Membership Type,Source,Created At\n';
    let content = header;
    
    const allLeads = db.prepare('SELECT * FROM leads ORDER BY created_at DESC').all();
    for (const lead of allLeads as any[]) {
      content += `${escape(lead.name)},${escape(lead.email)},${escape(lead.phone)},${escape(lead.membership_type)},${escape(lead.source)},${escape(lead.created_at)}\n`;
    }
    fs.writeFileSync(csvPath, content);
    console.log('✅ Local CSV updated.');
  }
}

async function syncBlogs() {
  console.log('🔄 Syncing blogs...');
  const { data, error } = await supabase.from('blogs').select('*');
  if (error) {
    console.error('❌ Error fetching blogs from Supabase:', error.message);
    return;
  }

  if (data) {
    try {
        db.exec("ALTER TABLE blogs ADD COLUMN supabase_id TEXT;");
        db.exec("CREATE UNIQUE INDEX IF NOT EXISTS idx_blogs_supabase_id ON blogs(supabase_id);");
    } catch(e) {}

    const insert = db.prepare(`
      INSERT INTO blogs (supabase_id, title, content, author_name, author_id, category, is_pinned, image_url_1, image_url_2, created_at, updated_at)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      ON CONFLICT(supabase_id) DO UPDATE SET
        title = excluded.title,
        content = excluded.content,
        author_name = excluded.author_name,
        author_id = excluded.author_id,
        category = excluded.category,
        is_pinned = excluded.is_pinned,
        image_url_1 = excluded.image_url_1,
        image_url_2 = excluded.image_url_2,
        created_at = excluded.created_at,
        updated_at = excluded.updated_at
    `);

    const transaction = db.transaction((items) => {
      for (const item of items) {
        insert.run(
          item.id,
          item.title,
          item.content,
          item.author_name,
          item.author_id,
          item.category,
          item.is_pinned ? 1 : 0,
          item.image_url_1,
          item.image_url_2,
          item.created_at,
          item.updated_at
        );
      }
    });

    transaction(data);
    console.log(`✅ Synced ${data.length} blogs.`);
  }
}

async function syncStaff() {
  console.log('🔄 Syncing staff...');
  const { data, error } = await supabase.from('staff').select('*');
  if (error) {
    console.error('❌ Error fetching staff from Supabase:', error.message);
    return;
  }

  if (data) {
    try {
        db.exec("ALTER TABLE staff ADD COLUMN supabase_id TEXT;");
        db.exec("CREATE UNIQUE INDEX IF NOT EXISTS idx_staff_supabase_id ON staff(supabase_id);");
    } catch(e) {}

    const insert = db.prepare(`
      INSERT INTO staff (supabase_id, name, role, description, image_url, display_order, created_at, updated_at)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)
      ON CONFLICT(supabase_id) DO UPDATE SET
        name = excluded.name,
        role = excluded.role,
        description = excluded.description,
        image_url = excluded.image_url,
        display_order = excluded.display_order,
        created_at = excluded.created_at,
        updated_at = excluded.updated_at
    `);

    const transaction = db.transaction((items) => {
      for (const item of items) {
        insert.run(
          item.id,
          item.name,
          item.role,
          item.description,
          item.image_url,
          item.display_order,
          item.created_at,
          item.updated_at
        );
      }
    });

    transaction(data);
    console.log(`✅ Synced ${data.length} staff.`);
  }
}

async function runSync() {
  console.log(`--- Sync Started: ${new Date().toLocaleString()} ---`);
  await syncLeads();
  await syncBlogs();
  await syncStaff();
  console.log(`--- Sync Finished ---`);
  db.close();
}

runSync();
