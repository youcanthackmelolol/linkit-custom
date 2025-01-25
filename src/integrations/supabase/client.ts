import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const SUPABASE_URL = "https://etqcxvvsxbqanndcrvkn.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImV0cWN4dnZzeGJxYW5uZGNydmtuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mzc2ODc3MTEsImV4cCI6MjA1MzI2MzcxMX0.0NDARDboG1QgrkYt3aKxsRFv03aOMVJN3fcpz3TVFWk";

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_ANON_KEY);