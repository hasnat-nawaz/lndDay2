import { supabase } from './supabaseClient'

// Get all items, newest first.
// categories(name) also brings the category name, using the foreign key.
export async function getItems() {
  const { data, error } = await supabase
    .from('items')
    .select('*, categories(name)')
    .order('created_at', { ascending: false })
  if (error) alert(error.message)
  return data
}

// Save a new item.
// item = { title, description, type, category_id, place, contact }
export async function createItem(item) {
  const { data, error } = await supabase.from('items').insert(item)
  if (error) alert(error.message)
  return data
}

// Mark one item as returned.
export async function markResolved(id) {
  const { data, error } = await supabase.from('items').update({ is_resolved: true }).eq('id', id)
  if (error) alert(error.message)
  return data
}

// Delete one item.
export async function deleteItem(id) {
  const { data, error } = await supabase.from('items').delete().eq('id', id)
  if (error) alert(error.message)
  return data
}
