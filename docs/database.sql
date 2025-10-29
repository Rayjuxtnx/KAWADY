-- This file contains the SQL statements to create the necessary tables
-- for the KAWADY mildsteel consultants Ltd. website. You can run this
-- in your Supabase SQL editor to set up your database schema.

-- Table for storing project portfolio information
CREATE TABLE projects (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title VARCHAR(255) NOT NULL,
  location VARCHAR(255),
  description TEXT,
  image_url TEXT,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Table for storing gallery images
CREATE TABLE gallery_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title VARCHAR(255) NOT NULL,
  image_url TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Table for storing company services
CREATE TABLE services (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title VARCHAR(255) NOT NULL,
  description TEXT,
  icon_name VARCHAR(100), -- To store the name of the Lucide icon, e.g., "FileText"
  image_url TEXT,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Table for storing contact form submissions
CREATE TABLE contact_submissions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  phone VARCHAR(50),
  message TEXT NOT NULL,
  submitted_at TIMESTAMTz DEFAULT now()
);

-- Example comments on how to use these tables
-- After creating the tables, you would typically use Supabase Storage for images.
-- The 'image_url' columns would then store the public URL provided by Supabase Storage.

-- To enable Row Level Security (RLS) on these tables, which is recommended:
-- ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
-- ALTER TABLE gallery_items ENABLE ROW LEVEL SECURITY;
-- ALTER TABLE services ENABLE ROW LEVEL SECURITY;
-- ALTER TABLE contact_submissions ENABLE ROW LEVEL SECURITY;

-- Example of a policy that allows public read access for projects:
-- CREATE POLICY "Allow public read access to projects"
-- ON projects
-- FOR SELECT
-- USING (true);
