import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const SUPABASE_URL = "https://zqolckdpbhuknvrynces.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inpxb2xja2RwYmh1a252cnluY2VzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mzc4NDE3NjEsImV4cCI6MjA1MzQxNzc2MX0.X3iAWGusnQrNhSlG_zzjt5Oq74Ev9ulntdAK4f7hkoI";

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_ANON_KEY);