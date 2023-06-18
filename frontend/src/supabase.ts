import { createClient } from '@supabase/supabase-js'

const supabaseUrl = "https://vhnpyawfzfrcezeljwfm.supabase.co"

//const supabaseUrl = process.env.DATABASE_URL

const supabaseAnonKey = "REDACTED"
const serviceRoleKey = "REDACTED"

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
export const supabaseServiceRole = createClient(supabaseUrl, serviceRoleKey)