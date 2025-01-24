import { createClient } from '@supabase/supabase-js';

// Replace these with your actual Supabase project URL and anon key
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

export const supabase = createClient(supabaseUrl, supabaseKey);

export type Profile = {
  id: string;
  username: string;
  avatar_url?: string;
  background_url?: string;
  description?: string;
  music_url?: string;
  social_links?: {
    platform: string;
    url: string;
  }[];
  appearance?: {
    opacity: number;
    blur: number;
    accent_color: string;
    text_color: string;
    socials_glow: boolean;
    username_glow: boolean;
  };
};