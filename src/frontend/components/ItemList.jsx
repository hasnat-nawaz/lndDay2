import ItemCard from './ItemCard'

export default function ItemList({ items, loading, emptyMessage, session, newIds, onChange }) {
  if (loading) return <p className="feed-message">Loading…</p>
  if (items.length === 0) return <p className="feed-message">{emptyMessage}</p>

  return (
    <div className="item-grid">
      {items.map((item) => (
        <ItemCard
          key={item.id}
          item={item}
          session={session}
          isNew={newIds.includes(item.id)}
          onChange={onChange}
        />
      ))}
    </div>
  )
}
