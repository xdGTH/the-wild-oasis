import { createClient } from "@supabase/supabase-js";
export const supabaseUrl = "https://ryxysedohscftwksaccm.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJ5eHlzZWRvaHNjZnR3a3NhY2NtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTE2MTk5MDIsImV4cCI6MjA2NzE5NTkwMn0.e7bsPnRHRPDeU550rxeoVZMo90402p4C_IW9aVNVhCw";
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
