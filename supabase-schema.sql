-- ============================================================
-- The Stellaar Club — Database Schema
-- Run this in the Supabase SQL Editor to set up your tables.
-- ============================================================

-- Leads table: stores "REQUEST AN INVITATION" form submissions
CREATE TABLE IF NOT EXISTS leads (
  id          BIGSERIAL PRIMARY KEY,
  name        TEXT NOT NULL,
  email       TEXT NOT NULL,
  phone       TEXT NOT NULL,
  source      TEXT NOT NULL DEFAULT 'membership_inquiry',
  created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW()
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
