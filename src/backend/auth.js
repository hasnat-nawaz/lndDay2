import { supabase } from './supabaseClient'

// Create a new account with email and password.
export async function signUp(email, password) {
  const { data, error } = await supabase.auth.signUp({ email, password })
  if (error) alert(error.message)
  return data
}

// Log in with email and password.
export async function signIn(email, password) {
  const { data, error } = await supabase.auth.signInWithPassword({ email, password })
  if (error) alert(error.message)
  return data
}

// Log out the current user.
export async function signOut() {
  const { error } = await supabase.auth.signOut()
  if (error) alert(error.message)
}
