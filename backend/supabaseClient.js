import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://vhnpyawfzfrcezeljwfm.supabase.co"
const supabaseKey = "REDACTED"

const options = {
  auth: {
    persistSession: false
  }
};

export const supabase = createClient(supabaseUrl, supabaseKey, options);
