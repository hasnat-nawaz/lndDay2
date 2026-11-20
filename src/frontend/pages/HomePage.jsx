import { useEffect, useState } from 'react'
import { getItems } from '../../backend/items'
import { getCategories } from '../../backend/categories'
import Header from '../components/Header'
import ItemForm from '../components/ItemForm'
import Filters from '../components/Filters'
import ItemList from '../components/ItemList'

const defaultFilters = { type: 'all', category_id: '', showReturned: false }

export default function HomePage({ session }) {
  const [items, setItems] = useState([])
  const [categories, setCategories] = useState([])
  const [loading, setLoading] = useState(true)
  const [filters, setFilters] = useState(defaultFilters)
  const [newIds, setNewIds] = useState([])

  async function loadItems() {
    const data = await getItems()
    setItems(data ?? [])
    setLoading(false)
  }

  async function loadCategories() {
    const data = await getCategories()
    setCategories(data ?? [])
  }

  useEffect(() => {
    loadItems()
    loadCategories()
  }, [])

  // After posting, reload and remember which cards are new so only they animate in.
  async function handlePosted() {
    const oldIds = items.map((item) => item.id)
    const data = (await getItems()) ?? []
    setNewIds(data.filter((item) => !oldIds.includes(item.id)).map((item) => item.id))
    setItems(data)
  }

  function handleFiltersChange(next) {
    setFilters(next)
    setNewIds([])
  }

  const visibleItems = items
    .filter((item) => filters.type === 'all' || item.type === filters.type)
    .filter((item) => filters.category_id === '' || String(item.category_id) === filters.category_id)
    .filter((item) => filters.showReturned || !item.is_resolved)

  const emptyMessage =
    items.length === 0 ? 'No items yet. Be the first to post.' : 'No items match these filters.'

  return (
    <div className="screen">
      <Header email={session.user.email} />
      <main className="layout">
        <ItemForm categories={categories} onPosted={handlePosted} />
        <div className="feed">
          <Filters
            categories={categories}
            filters={filters}
            onChange={handleFiltersChange}
            count={visibleItems.length}
          />
          <ItemList
            items={visibleItems}
            loading={loading}
            emptyMessage={emptyMessage}
            session={session}
            newIds={newIds}
            onChange={loadItems}
          />
        </div>
      </main>
    </div>
  )
}
