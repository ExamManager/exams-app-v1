import { createClient } from '@supabase/supabase-js'

const supabaseUrl = "https://vhnpyawfzfrcezeljwfm.supabase.co"
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZobnB5YXdmemZyY2V6ZWxqd2ZtIiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODM3MTgyNzAsImV4cCI6MTk5OTI5NDI3MH0.MTGmchPIj36MX9gElfKbza0c5fbO9w6lvnktiZ6UM4g"

export const supabase = createClient(supabaseUrl, supabaseAnonKey)