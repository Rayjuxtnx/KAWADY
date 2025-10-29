-- KAWADY Mildsteel Consultants Ltd. Database Schema
--
-- This SQL file provides the necessary table structures for the project's
-- content, such as projects, gallery items, and services.
-- You can run this in your Supabase SQL editor to set up the database.

-- =============================================
-- Projects Table
-- Stores information about completed projects for the portfolio.
-- =============================================
CREATE TABLE projects (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  location TEXT,
  description TEXT,
  image_url TEXT, -- URL to the project image stored in Supabase Storage
  created_at TIMESTAMPTZ DEFAULT now()
);

-- =============================================
-- Gallery Items Table
-- Stores images for the visual gallery.
-- =============================================
CREATE TABLE gallery_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  image_url TEXT, -- URL to the gallery image stored in Supabase Storage
  created_at TIMESTAMPTZ DEFAULT now()
);

-- =============================================
-- Services Table
-- Stores the list of services offered by the company.
-- =============================================
CREATE TABLE services (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  description TEXT,
  icon_name TEXT, -- The name of the Lucide icon, e.g., "FileText"
  created_at TIMESTAMPTZ DEFAULT now()
);

-- =============================================
-- Contact Form Submissions Table
-- Stores messages sent through the contact form.
-- =============================================
CREATE TABLE contact_submissions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  message TEXT NOT NULL,
  submitted_at TIMESTAMPTZ DEFAULT now()
);


-- =============================================
-- Security Policies (Row Level Security - RLS)
-- =============================================
-- It's highly recommended to enable Row Level Security (RLS) on these tables
-- in your Supabase dashboard and define policies.
--
-- For example, to make all tables publicly readable, you would run:
--
-- ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
-- CREATE POLICY "Enable public read access" ON projects FOR SELECT USING (true);
--
-- ALTER TABLE gallery_items ENABLE ROW LEVEL SECURITY;
-- CREATE POLICY "Enable public read access" ON gallery_items FOR SELECT USING (true);
--
-- ALTER TABLE services ENABLE ROW LEVEL SECURITY;
-- CREATE POLICY "Enable public read access" ON services FOR SELECT USING (true);
--
-- For the contact_submissions table, you would likely want to restrict access
-- so that only authenticated administrators can read the data. This requires
-- more advanced policies.
-- =============================================
