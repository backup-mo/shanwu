import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://suytialgkblkvsfqhlfw.supabase.co'
const config = useRuntimeConfig()
export const supabase = createClient(supabaseUrl, config.public.supabaseKey)
