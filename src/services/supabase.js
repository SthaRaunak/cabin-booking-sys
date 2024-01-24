import { createClient } from '@supabase/supabase-js'

export const supabaseUrl = 'https://vipcldfxtldtoxpxolpm.supabase.co';
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZpcGNsZGZ4dGxkdG94cHhvbHBtIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTk1MDQwNDUsImV4cCI6MjAxNTA4MDA0NX0.UB3Cfgxndgu_s8WW_j2I2HH1kizEQAWkOhOHtuWea8w";
const supabase = createClient(supabaseUrl, supabaseKey)

export default supabase;

