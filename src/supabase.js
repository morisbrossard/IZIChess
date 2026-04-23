import { createClient } from '@supabase/supabase-js'

const SUPABASE_URL = 'https://kjvcfmdvlfnqmvjezdyl.supabase.co'
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtqdmNmbWR2bGZucW12amV6ZHlsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzY4ODg2MTQsImV4cCI6MjA5MjQ2NDYxNH0.hIKqKB0srs999lFJZ2mohcI7cpJUWmtl3nsUDikdofY'

export const supabase = createClient(SUPABASE_URL, SUPABASE_KEY)