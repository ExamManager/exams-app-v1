import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "REDACTED";
const supabaseKey = "REDACTED";

const options = {
  auth: {
    persistSession: false
  }
};

export const supabase = createClient(supabaseUrl, supabaseKey, options);
