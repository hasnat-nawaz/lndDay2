import { supabase } from './supabaseClient'

// Who is logged in right now? Returns null if nobody.
export async function getSession() {
  const { data } = await supabase.auth.getSession()
  return data.session
}

// Call callback(session) whenever someone logs in or out.
export function onAuthChange(callback) {
  supabase.auth.onAuthStateChange((event, session) => callback(session))
}
