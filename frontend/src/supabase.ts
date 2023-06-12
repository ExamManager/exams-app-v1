import { createClient } from '@supabase/supabase-js'

const supabaseUrl = "https://vhnpyawfzfrcezeljwfm.supabase.co"
const supabaseAnonKey = "REDACTED"

export const supabase = createClient(supabaseUrl, supabaseAnonKey)