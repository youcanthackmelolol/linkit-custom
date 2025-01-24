import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://your-project-url.supabase.co';
const supabaseKey = 'your-anon-key';

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