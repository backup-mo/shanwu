import { supabase } from '../supabase-init'

export default defineEventHandler(async () => {
  const { data, error } = await supabase
    .from('shanwu')
    .select()

  return { data, error }
})
