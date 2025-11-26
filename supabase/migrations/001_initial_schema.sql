-- Happy Homes Database Schema
-- Run this SQL in your Supabase SQL Editor

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create custom types
CREATE TYPE user_role AS ENUM ('homeowner', 'designer', 'freelancer');
CREATE TYPE project_status AS ENUM ('open', 'in-progress', 'completed');

-- =====================================================
-- PROFILES TABLE
-- =====================================================
CREATE TABLE profiles (
  id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  full_name TEXT NOT NULL,
  role user_role NOT NULL,
  email TEXT NOT NULL UNIQUE,
  phone TEXT,
  location TEXT,
  bio TEXT,
  avatar_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

-- Policies for profiles
CREATE POLICY "Public profiles are viewable by everyone"
  ON profiles FOR SELECT
  USING (true);

CREATE POLICY "Users can insert their own profile"
  ON profiles FOR INSERT
  WITH CHECK (auth.uid() = id);

CREATE POLICY "Users can update their own profile"
  ON profiles FOR UPDATE
  USING (auth.uid() = id);

-- =====================================================
-- PROJECTS TABLE
-- =====================================================
CREATE TABLE projects (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  budget TEXT NOT NULL,
  category TEXT NOT NULL,
  timeline TEXT NOT NULL,
  status project_status DEFAULT 'open',
  homeowner_id UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  designer_id UUID REFERENCES profiles(id) ON DELETE SET NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  proposals_count INTEGER DEFAULT 0
);

-- Enable RLS
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;

-- Policies for projects
CREATE POLICY "Projects are viewable by everyone"
  ON projects FOR SELECT
  USING (true);

CREATE POLICY "Homeowners can create projects"
  ON projects FOR INSERT
  WITH CHECK (
    auth.uid() = homeowner_id AND
    EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'homeowner')
  );

CREATE POLICY "Homeowners can update their own projects"
  ON projects FOR UPDATE
  USING (auth.uid() = homeowner_id);

CREATE POLICY "Homeowners can delete their own projects"
  ON projects FOR DELETE
  USING (auth.uid() = homeowner_id);

-- =====================================================
-- PORTFOLIOS TABLE
-- =====================================================
CREATE TABLE portfolios (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  image_url TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE portfolios ENABLE ROW LEVEL SECURITY;

-- Policies for portfolios
CREATE POLICY "Portfolios are viewable by everyone"
  ON portfolios FOR SELECT
  USING (true);

CREATE POLICY "Users can create their own portfolio items"
  ON portfolios FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own portfolio items"
  ON portfolios FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own portfolio items"
  ON portfolios FOR DELETE
  USING (auth.uid() = user_id);

-- =====================================================
-- CONVERSATIONS TABLE
-- =====================================================
CREATE TABLE conversations (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  participant_1_id UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  participant_2_id UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  CONSTRAINT different_participants CHECK (participant_1_id != participant_2_id),
  CONSTRAINT unique_conversation UNIQUE (participant_1_id, participant_2_id)
);

-- Enable RLS
ALTER TABLE conversations ENABLE ROW LEVEL SECURITY;

-- Policies for conversations
CREATE POLICY "Users can view their own conversations"
  ON conversations FOR SELECT
  USING (auth.uid() = participant_1_id OR auth.uid() = participant_2_id);

CREATE POLICY "Users can create conversations"
  ON conversations FOR INSERT
  WITH CHECK (auth.uid() = participant_1_id OR auth.uid() = participant_2_id);

-- =====================================================
-- MESSAGES TABLE
-- =====================================================
CREATE TABLE messages (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  conversation_id UUID REFERENCES conversations(id) ON DELETE CASCADE NOT NULL,
  sender_id UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  content TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  read BOOLEAN DEFAULT false
);

-- Enable RLS
ALTER TABLE messages ENABLE ROW LEVEL SECURITY;

-- Policies for messages
CREATE POLICY "Users can view messages in their conversations"
  ON messages FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM conversations
      WHERE id = conversation_id
      AND (participant_1_id = auth.uid() OR participant_2_id = auth.uid())
    )
  );

CREATE POLICY "Users can send messages in their conversations"
  ON messages FOR INSERT
  WITH CHECK (
    auth.uid() = sender_id AND
    EXISTS (
      SELECT 1 FROM conversations
      WHERE id = conversation_id
      AND (participant_1_id = auth.uid() OR participant_2_id = auth.uid())
    )
  );

CREATE POLICY "Users can update their own messages"
  ON messages FOR UPDATE
  USING (auth.uid() = sender_id);

-- =====================================================
-- CONTACT SUBMISSIONS TABLE
-- =====================================================
CREATE TABLE contact_submissions (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  subject TEXT NOT NULL,
  message TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS (public can insert, only authenticated users can view)
ALTER TABLE contact_submissions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can submit contact form"
  ON contact_submissions FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Only authenticated users can view submissions"
  ON contact_submissions FOR SELECT
  USING (auth.uid() IS NOT NULL);

-- =====================================================
-- INDEXES
-- =====================================================
CREATE INDEX idx_projects_homeowner ON projects(homeowner_id);
CREATE INDEX idx_projects_designer ON projects(designer_id);
CREATE INDEX idx_projects_status ON projects(status);
CREATE INDEX idx_portfolios_user ON portfolios(user_id);
CREATE INDEX idx_conversations_participants ON conversations(participant_1_id, participant_2_id);
CREATE INDEX idx_messages_conversation ON messages(conversation_id);
CREATE INDEX idx_messages_created_at ON messages(created_at);

-- =====================================================
-- FUNCTIONS
-- =====================================================

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger for profiles
CREATE TRIGGER update_profiles_updated_at
  BEFORE UPDATE ON profiles
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Trigger for conversations
CREATE TRIGGER update_conversations_updated_at
  BEFORE UPDATE ON conversations
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Function to update conversation timestamp when new message is sent
CREATE OR REPLACE FUNCTION update_conversation_timestamp()
RETURNS TRIGGER AS $$
BEGIN
  UPDATE conversations
  SET updated_at = NOW()
  WHERE id = NEW.conversation_id;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_conversation_on_message
  AFTER INSERT ON messages
  FOR EACH ROW
  EXECUTE FUNCTION update_conversation_timestamp();

-- =====================================================
-- STORAGE BUCKETS (Run these in Supabase Dashboard > Storage)
-- =====================================================
-- You'll need to create these buckets manually in the Supabase dashboard:
-- 1. avatars (public)
-- 2. portfolios (public)

-- After creating the buckets, run these policies:

-- Storage policies for avatars bucket
-- CREATE POLICY "Avatar images are publicly accessible"
--   ON storage.objects FOR SELECT
--   USING (bucket_id = 'avatars');

-- CREATE POLICY "Users can upload their own avatar"
--   ON storage.objects FOR INSERT
--   WITH CHECK (
--     bucket_id = 'avatars' AND
--     auth.uid()::text = (storage.foldername(name))[1]
--   );

-- CREATE POLICY "Users can update their own avatar"
--   ON storage.objects FOR UPDATE
--   USING (
--     bucket_id = 'avatars' AND
--     auth.uid()::text = (storage.foldername(name))[1]
--   );

-- CREATE POLICY "Users can delete their own avatar"
--   ON storage.objects FOR DELETE
--   USING (
--     bucket_id = 'avatars' AND
--     auth.uid()::text = (storage.foldername(name))[1]
--   );

-- Storage policies for portfolios bucket
-- CREATE POLICY "Portfolio images are publicly accessible"
--   ON storage.objects FOR SELECT
--   USING (bucket_id = 'portfolios');

-- CREATE POLICY "Users can upload portfolio images"
--   ON storage.objects FOR INSERT
--   WITH CHECK (
--     bucket_id = 'portfolios' AND
--     auth.uid()::text = (storage.foldername(name))[1]
--   );

-- CREATE POLICY "Users can update their portfolio images"
--   ON storage.objects FOR UPDATE
--   USING (
--     bucket_id = 'portfolios' AND
--     auth.uid()::text = (storage.foldername(name))[1]
--   );

-- CREATE POLICY "Users can delete their portfolio images"
--   ON storage.objects FOR DELETE
--   USING (
--     bucket_id = 'portfolios' AND
--     auth.uid()::text = (storage.foldername(name))[1]
--   );
