import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  console.error('Missing Supabase environment variables. Please check your .env file.');
}

export const supabase = createClient(supabaseUrl || '', supabaseAnonKey || '', {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true,
  },
  global: {
    headers: {
      'x-session-timeout': '7200', // 2 hours in seconds
    },
  },
});

// Database Types
export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string;
          full_name: string;
          role: 'homeowner' | 'designer' | 'freelancer';
          email: string;
          phone: string | null;
          location: string | null;
          bio: string | null;
          avatar_url: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id: string;
          full_name: string;
          role: 'homeowner' | 'designer' | 'freelancer';
          email: string;
          phone?: string | null;
          location?: string | null;
          bio?: string | null;
          avatar_url?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          full_name?: string;
          role?: 'homeowner' | 'designer' | 'freelancer';
          email?: string;
          phone?: string | null;
          location?: string | null;
          bio?: string | null;
          avatar_url?: string | null;
          created_at?: string;
          updated_at?: string;
        };
      };
      projects: {
        Row: {
          id: string;
          title: string;
          description: string;
          budget: string;
          category: string;
          timeline: string;
          status: 'open' | 'in-progress' | 'completed';
          homeowner_id: string;
          designer_id: string | null;
          created_at: string;
          proposals_count: number;
        };
        Insert: {
          id?: string;
          title: string;
          description: string;
          budget: string;
          category: string;
          timeline: string;
          status?: 'open' | 'in-progress' | 'completed';
          homeowner_id: string;
          designer_id?: string | null;
          created_at?: string;
          proposals_count?: number;
        };
        Update: {
          id?: string;
          title?: string;
          description?: string;
          budget?: string;
          category?: string;
          timeline?: string;
          status?: 'open' | 'in-progress' | 'completed';
          homeowner_id?: string;
          designer_id?: string | null;
          created_at?: string;
          proposals_count?: number;
        };
      };
      portfolios: {
        Row: {
          id: string;
          user_id: string;
          title: string;
          description: string;
          image_url: string;
          created_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          title: string;
          description: string;
          image_url: string;
          created_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          title?: string;
          description?: string;
          image_url?: string;
          created_at?: string;
        };
      };
      conversations: {
        Row: {
          id: string;
          participant_1_id: string;
          participant_2_id: string;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          participant_1_id: string;
          participant_2_id: string;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          participant_1_id?: string;
          participant_2_id?: string;
          created_at?: string;
          updated_at?: string;
        };
      };
      messages: {
        Row: {
          id: string;
          conversation_id: string;
          sender_id: string;
          content: string;
          created_at: string;
          read: boolean;
        };
        Insert: {
          id?: string;
          conversation_id: string;
          sender_id: string;
          content: string;
          created_at?: string;
          read?: boolean;
        };
        Update: {
          id?: string;
          conversation_id?: string;
          sender_id?: string;
          content?: string;
          created_at?: string;
          read?: boolean;
        };
      };
      contact_submissions: {
        Row: {
          id: string;
          name: string;
          email: string;
          subject: string;
          message: string;
          created_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          email: string;
          subject: string;
          message: string;
          created_at?: string;
        };
        Update: {
          id?: string;
          name?: string;
          email?: string;
          subject?: string;
          message?: string;
          created_at?: string;
        };
      };
      requirements: {
        Row: {
          id: string;
          homeowner_id: string;
          title: string;
          property_type: string;
          location: string;
          budget_min: number | null;
          budget_max: number | null;
          style_preferences: string | null;
          timeline: string;
          description: string;
          status: 'open' | 'in-progress' | 'completed' | 'cancelled';
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          homeowner_id: string;
          title: string;
          property_type: string;
          location: string;
          budget_min?: number | null;
          budget_max?: number | null;
          style_preferences?: string | null;
          timeline: string;
          description: string;
          status?: 'open' | 'in-progress' | 'completed' | 'cancelled';
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          homeowner_id?: string;
          title?: string;
          property_type?: string;
          location?: string;
          budget_min?: number | null;
          budget_max?: number | null;
          style_preferences?: string | null;
          timeline?: string;
          description?: string;
          status?: 'open' | 'in-progress' | 'completed' | 'cancelled';
          created_at?: string;
          updated_at?: string;
        };
      };
      proposals: {
        Row: {
          id: string;
          requirement_id: string;
          designer_id: string;
          timeline_estimate: string;
          cost_estimate: number;
          description: string;
          attachments: any[];
          status: 'pending' | 'accepted' | 'rejected' | 'withdrawn';
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          requirement_id: string;
          designer_id: string;
          timeline_estimate: string;
          cost_estimate: number;
          description: string;
          attachments?: any[];
          status?: 'pending' | 'accepted' | 'rejected' | 'withdrawn';
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          requirement_id?: string;
          designer_id?: string;
          timeline_estimate?: string;
          cost_estimate?: number;
          description?: string;
          attachments?: any[];
          status?: 'pending' | 'accepted' | 'rejected' | 'withdrawn';
          created_at?: string;
          updated_at?: string;
        };
      };
      freelancer_jobs: {
        Row: {
          id: string;
          designer_id: string;
          title: string;
          description: string;
          category: string;
          budget: number;
          location: string | null;
          deadline: string | null;
          status: 'open' | 'in-progress' | 'completed' | 'cancelled';
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          designer_id: string;
          title: string;
          description: string;
          category: string;
          budget: number;
          location?: string | null;
          deadline?: string | null;
          status?: 'open' | 'in-progress' | 'completed' | 'cancelled';
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          designer_id?: string;
          title?: string;
          description?: string;
          category?: string;
          budget?: number;
          location?: string | null;
          deadline?: string | null;
          status?: 'open' | 'in-progress' | 'completed' | 'cancelled';
          created_at?: string;
          updated_at?: string;
        };
      };
      job_applications: {
        Row: {
          id: string;
          job_id: string;
          freelancer_id: string;
          proposal: string;
          quoted_price: number;
          status: 'pending' | 'accepted' | 'rejected' | 'withdrawn';
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          job_id: string;
          freelancer_id: string;
          proposal: string;
          quoted_price: number;
          status?: 'pending' | 'accepted' | 'rejected' | 'withdrawn';
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          job_id?: string;
          freelancer_id?: string;
          proposal?: string;
          quoted_price?: number;
          status?: 'pending' | 'accepted' | 'rejected' | 'withdrawn';
          created_at?: string;
          updated_at?: string;
        };
      };
      reviews: {
        Row: {
          id: string;
          reviewer_id: string;
          reviewee_id: string;
          rating: number;
          comment: string | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          reviewer_id: string;
          reviewee_id: string;
          rating: number;
          comment?: string | null;
          created_at?: string;
        };
        Update: {
          id?: string;
          reviewer_id?: string;
          reviewee_id?: string;
          rating?: number;
          comment?: string | null;
          created_at?: string;
        };
      };
      favorites: {
        Row: {
          id: string;
          user_id: string;
          favorited_user_id: string;
          created_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          favorited_user_id: string;
          created_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          favorited_user_id?: string;
          created_at?: string;
        };
      };
    };
  };
}
