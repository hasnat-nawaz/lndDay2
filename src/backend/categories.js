import { supabase } from './supabaseClient'

// Get all categories, sorted A to Z.
export async function getCategories() {
  const { data, error } = await supabase.from('categories').select('*').order('name')
  if (error) alert(error.message)
  return data
}
