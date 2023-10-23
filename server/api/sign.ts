import { supabase } from '../supabase-init'

async function checkUser(email: string) {
  const { data, error } = await supabase
    .from('users')
    .select('*')
    .eq('email', email)

  if (error) {
    console.error(error)
    return false
  }

  if (data.length === 0)
    return false

  return true
}
export default defineEventHandler(async (event) => {
  const body = await readBody(event)

  const userExists = await checkUser(body.email)
  if (userExists) {
    const { data, error } = await supabase.auth.signInWithPassword({
      email: body.email,
      password: 'example-password',
    })
    return { data, error }
  }

  const { data, error } = await supabase.auth.signUp({
    email: body.email,
    password: 'example-password',
  })
  return { data, error }
})
