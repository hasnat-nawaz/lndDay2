import { supabase } from './supabaseClient'

// Get all items, newest first.
// categories(name) also brings the category name, using the foreign key.
export async function getItems() {
  // TODO: write this
}

// Save a new item.
// item = { title, description, type, category_id, place, contact }
export async function createItem(item) {
  // TODO: write this
}

// Mark one item as returned.
export async function markResolved(id) {
  // TODO: write this
}

// Delete one item.
export async function deleteItem(id) {
  // TODO: write this
}
