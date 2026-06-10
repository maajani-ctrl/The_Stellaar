-- ============================================================
-- The Stellaar Club — Database Schema
-- Run this in the Supabase SQL Editor to set up your tables.
-- ============================================================

-- Leads table: stores "REQUEST AN INVITATION" form submissions
CREATE TABLE IF NOT EXISTS leads (
  id              BIGSERIAL PRIMARY KEY,
  name            TEXT NOT NULL,
  email           TEXT NOT NULL,
  phone           TEXT NOT NULL,
  membership_type TEXT,
  source          TEXT NOT NULL DEFAULT 'membership_inquiry',
  created_at      TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Index for quick lookups by email
CREATE INDEX IF NOT EXISTS idx_leads_email ON leads (email);

-- Index for sorting by newest first
CREATE INDEX IF NOT EXISTS idx_leads_created_at ON leads (created_at DESC);

-- Enable Row Level Security (recommended)
ALTER TABLE leads ENABLE ROW LEVEL SECURITY;

-- Allow anonymous inserts (needed for the public form)
CREATE POLICY "Allow anonymous inserts on leads"
  ON leads
  FOR INSERT
  TO anon
  WITH CHECK (true);

-- Allow authenticated users to read all leads
CREATE POLICY "Allow authenticated reads on leads"
  ON leads
  FOR SELECT
  TO authenticated
  USING (true);

-- Blogs table: stores rich-text blog posts
CREATE TABLE IF NOT EXISTS blogs (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title       TEXT NOT NULL,
  content     TEXT NOT NULL, -- Stores HTML/JSON from TipTap
  author_id   UUID REFERENCES auth.users(id), -- Optional for guest posts
  author_name TEXT NOT NULL,
  category    TEXT DEFAULT 'General',
  is_pinned   BOOLEAN DEFAULT FALSE,
  image_url_1 TEXT,
  image_url_2 TEXT,
  created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at  TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Index for sorting by newest first
CREATE INDEX IF NOT EXISTS idx_blogs_created_at ON blogs (created_at DESC);

-- Enable Row Level Security
ALTER TABLE blogs ENABLE ROW LEVEL SECURITY;

-- Allow anyone to read blogs
CREATE POLICY "Allow public read access on blogs"
  ON blogs
  FOR SELECT
  TO anon, authenticated
  USING (true);

-- Allow authenticated users to insert their own blogs
CREATE POLICY "Allow authenticated inserts on blogs"
  ON blogs
  FOR INSERT
  TO authenticated, anon
  WITH CHECK (true);

-- Allow authors to update their own blogs
CREATE POLICY "Allow authors to update their own blogs"
  ON blogs
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = author_id)
  WITH CHECK (auth.uid() = author_id);

-- Allow authors to delete their own blogs
CREATE POLICY "Allow authors to delete their own blogs"
  ON blogs
  FOR DELETE
  TO authenticated
  USING (auth.uid() = author_id);

-- Staff table: stores team member profiles
CREATE TABLE IF NOT EXISTS staff (
  id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name          TEXT NOT NULL,
  role          TEXT NOT NULL,
  description   TEXT,
  image_url     TEXT,
  display_order INTEGER DEFAULT 0,
  created_at    TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at    TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE staff ENABLE ROW LEVEL SECURITY;

-- Allow anyone to read staff profiles
CREATE POLICY "Allow public read access on staff"
  ON staff
  FOR SELECT
  TO anon, authenticated
  USING (true);

-- Only allow the office admin to manage staff profiles
-- Note: Replace with your actual admin logic if you want automated RLS
CREATE POLICY "Allow admin to manage staff"
  ON staff
  FOR ALL
  TO authenticated
  USING (auth.jwt()->>'email' = 'office.thestellaar@gmail.com')
  WITH CHECK (auth.jwt()->>'email' = 'office.thestellaar@gmail.com');
