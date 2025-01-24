import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://etqcxvvsxbqanndcrvkn.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImV0cWN4dnZzeGJxYW5uZGNydmtuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mzc2ODc3MTEsImV4cCI6MjA1MzI2MzcxMX0.0NDARDboG1QgrkYt3aKxsRFv03aOMVJN3fcpz3TVFWk';

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