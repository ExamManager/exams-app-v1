import { createClient, type SupabaseClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL as string | undefined
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string | undefined

/** True only when real Supabase env vars are present. Auth stays disabled for portfolio demos. */
export const isSupabaseConfigured = Boolean(supabaseUrl && supabaseAnonKey)

// Portfolio / public showcase: never crash the SPA when env is missing.
// Placeholder client lets imports and route guards resolve; auth calls no-op / fail soft.
const url = isSupabaseConfigured
  ? supabaseUrl!
  : 'https://placeholder.supabase.co'
const anonKey = isSupabaseConfigured
  ? supabaseAnonKey!
  : 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS1kZW1vIiwicm9sZSI6ImFub24iLCJleHAiOjE5ODM4MTI5OTZ9.placeholder'

export const supabase: SupabaseClient = createClient(url, anonKey, {
  auth: {
    persistSession: isSupabaseConfigured,
    autoRefreshToken: isSupabaseConfigured,
    detectSessionInUrl: isSupabaseConfigured,
  },
})
