import { createClient } from "@supabase/supabase-js";
import dotenv from "dotenv";

dotenv.config();

const supabaseUrl =
  process.env.SUPABASE_URL || "https://placeholder.supabase.co";
const supabaseKey =
  process.env.SUPABASE_SERVICE_ROLE_KEY ||
  process.env.SUPABASE_ANON_KEY ||
  "placeholder";

// Portfolio showcase: boot even when secrets are unset. Real auth/DB calls will fail soft.
if (!process.env.SUPABASE_URL || !(process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_ANON_KEY)) {
  console.warn(
    "[showcase] Missing SUPABASE_URL / service role key — Supabase client is a placeholder."
  );
}

const options = {
  auth: {
    persistSession: false,
  },
};

export const supabase = createClient(supabaseUrl, supabaseKey, options);
