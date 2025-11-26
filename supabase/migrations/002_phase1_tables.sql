-- Phase 1: Additional Tables for Role-Based Dashboards
-- Run this SQL in your Supabase SQL Editor AFTER the initial schema

-- =====================================================
-- REQUIREMENTS TABLE (Homeowner project requirements)
-- =====================================================
CREATE TABLE requirements (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  homeowner_id UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  title TEXT NOT NULL,
  property_type TEXT NOT NULL,
  location TEXT NOT NULL,
  budget_min DECIMAL(10, 2),
  budget_max DECIMAL(10, 2),
  style_preferences TEXT,
  timeline TEXT NOT NULL,
  description TEXT NOT NULL,
  status TEXT DEFAULT 'open' CHECK (status IN ('open', 'in-progress', 'completed', 'cancelled')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE requirements ENABLE ROW LEVEL SECURITY;

-- Policies for requirements
CREATE POLICY "Requirements are viewable by everyone"
  ON requirements FOR SELECT
  USING (true);

CREATE POLICY "Homeowners can create requirements"
  ON requirements FOR INSERT
  WITH CHECK (
    auth.uid() = homeowner_id AND
    EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'homeowner')
  );

CREATE POLICY "Homeowners can update their own requirements"
  ON requirements FOR UPDATE
  USING (auth.uid() = homeowner_id);

CREATE POLICY "Homeowners can delete their own requirements"
  ON requirements FOR DELETE
  USING (auth.uid() = homeowner_id);

-- =====================================================
-- PROPOSALS TABLE (Designer proposals)
-- =====================================================
CREATE TABLE proposals (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  requirement_id UUID REFERENCES requirements(id) ON DELETE CASCADE NOT NULL,
  designer_id UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  timeline_estimate TEXT NOT NULL,
  cost_estimate DECIMAL(10, 2) NOT NULL,
  description TEXT NOT NULL,
  attachments JSONB DEFAULT '[]',
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'accepted', 'rejected', 'withdrawn')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE proposals ENABLE ROW LEVEL SECURITY;

-- Policies for proposals
CREATE POLICY "Proposals are viewable by requirement owner and proposal creator"
  ON proposals FOR SELECT
  USING (
    auth.uid() = designer_id OR
    auth.uid() IN (SELECT homeowner_id FROM requirements WHERE id = requirement_id)
  );

CREATE POLICY "Designers can create proposals"
  ON proposals FOR INSERT
  WITH CHECK (
    auth.uid() = designer_id AND
    EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'designer')
  );

CREATE POLICY "Designers can update their own proposals"
  ON proposals FOR UPDATE
  USING (auth.uid() = designer_id);

CREATE POLICY "Designers can delete their own proposals"
  ON proposals FOR DELETE
  USING (auth.uid() = designer_id);

-- =====================================================
-- FREELANCER_JOBS TABLE (Jobs posted by designers)
-- =====================================================
CREATE TABLE freelancer_jobs (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  designer_id UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  category TEXT NOT NULL,
  budget DECIMAL(10, 2) NOT NULL,
  location TEXT,
  deadline DATE,
  status TEXT DEFAULT 'open' CHECK (status IN ('open', 'in-progress', 'completed', 'cancelled')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE freelancer_jobs ENABLE ROW LEVEL SECURITY;

-- Policies for freelancer_jobs
CREATE POLICY "Jobs are viewable by everyone"
  ON freelancer_jobs FOR SELECT
  USING (true);

CREATE POLICY "Designers can create jobs"
  ON freelancer_jobs FOR INSERT
  WITH CHECK (
    auth.uid() = designer_id AND
    EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'designer')
  );

CREATE POLICY "Designers can update their own jobs"
  ON freelancer_jobs FOR UPDATE
  USING (auth.uid() = designer_id);

CREATE POLICY "Designers can delete their own jobs"
  ON freelancer_jobs FOR DELETE
  USING (auth.uid() = designer_id);

-- =====================================================
-- JOB_APPLICATIONS TABLE (Freelancer applications)
-- =====================================================
CREATE TABLE job_applications (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  job_id UUID REFERENCES freelancer_jobs(id) ON DELETE CASCADE NOT NULL,
  freelancer_id UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  proposal TEXT NOT NULL,
  quoted_price DECIMAL(10, 2) NOT NULL,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'accepted', 'rejected', 'withdrawn')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(job_id, freelancer_id)
);

-- Enable RLS
ALTER TABLE job_applications ENABLE ROW LEVEL SECURITY;

-- Policies for job_applications
CREATE POLICY "Applications viewable by job owner and applicant"
  ON job_applications FOR SELECT
  USING (
    auth.uid() = freelancer_id OR
    auth.uid() IN (SELECT designer_id FROM freelancer_jobs WHERE id = job_id)
  );

CREATE POLICY "Freelancers can create applications"
  ON job_applications FOR INSERT
  WITH CHECK (
    auth.uid() = freelancer_id AND
    EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'freelancer')
  );

CREATE POLICY "Freelancers can update their own applications"
  ON job_applications FOR UPDATE
  USING (auth.uid() = freelancer_id);

-- =====================================================
-- REVIEWS TABLE (Ratings and reviews)
-- =====================================================
CREATE TABLE reviews (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  reviewer_id UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  reviewee_id UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
  comment TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(reviewer_id, reviewee_id)
);

-- Enable RLS
ALTER TABLE reviews ENABLE ROW LEVEL SECURITY;

-- Policies for reviews
CREATE POLICY "Reviews are viewable by everyone"
  ON reviews FOR SELECT
  USING (true);

CREATE POLICY "Users can create reviews"
  ON reviews FOR INSERT
  WITH CHECK (auth.uid() = reviewer_id);

CREATE POLICY "Users can update their own reviews"
  ON reviews FOR UPDATE
  USING (auth.uid() = reviewer_id);

CREATE POLICY "Users can delete their own reviews"
  ON reviews FOR DELETE
  USING (auth.uid() = reviewer_id);

-- =====================================================
-- FAVORITES TABLE (Saved designers/freelancers)
-- =====================================================
CREATE TABLE favorites (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  favorited_user_id UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id, favorited_user_id)
);

-- Enable RLS
ALTER TABLE favorites ENABLE ROW LEVEL SECURITY;

-- Policies for favorites
CREATE POLICY "Users can view their own favorites"
  ON favorites FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can add favorites"
  ON favorites FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can remove favorites"
  ON favorites FOR DELETE
  USING (auth.uid() = user_id);

-- =====================================================
-- INDEXES for Performance
-- =====================================================
CREATE INDEX idx_requirements_homeowner ON requirements(homeowner_id);
CREATE INDEX idx_requirements_status ON requirements(status);
CREATE INDEX idx_proposals_requirement ON proposals(requirement_id);
CREATE INDEX idx_proposals_designer ON proposals(designer_id);
CREATE INDEX idx_proposals_status ON proposals(status);
CREATE INDEX idx_freelancer_jobs_designer ON freelancer_jobs(designer_id);
CREATE INDEX idx_freelancer_jobs_status ON freelancer_jobs(status);
CREATE INDEX idx_job_applications_job ON job_applications(job_id);
CREATE INDEX idx_job_applications_freelancer ON job_applications(freelancer_id);
CREATE INDEX idx_reviews_reviewee ON reviews(reviewee_id);
CREATE INDEX idx_favorites_user ON favorites(user_id);
CREATE INDEX idx_favorites_favorited ON favorites(favorited_user_id);

-- =====================================================
-- TRIGGERS
-- =====================================================

-- Update updated_at on requirements
CREATE TRIGGER update_requirements_updated_at
  BEFORE UPDATE ON requirements
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Update updated_at on proposals
CREATE TRIGGER update_proposals_updated_at
  BEFORE UPDATE ON proposals
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Update updated_at on freelancer_jobs
CREATE TRIGGER update_freelancer_jobs_updated_at
  BEFORE UPDATE ON freelancer_jobs
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Update updated_at on job_applications
CREATE TRIGGER update_job_applications_updated_at
  BEFORE UPDATE ON job_applications
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();
