import { markResolved, deleteItem } from '../../backend/items'

// "just now", "5 minutes ago", "3 hours ago", "Yesterday", then a plain date.
function timeAgo(dateString) {
  const date = new Date(dateString)
  const minutes = Math.floor((Date.now() - date.getTime()) / 60000)
  if (minutes < 1) return 'just now'
  if (minutes < 60) return minutes === 1 ? '1 minute ago' : `${minutes} minutes ago`
  const hours = Math.floor(minutes / 60)
  if (hours < 24) return hours === 1 ? '1 hour ago' : `${hours} hours ago`
  if (hours < 48) return 'Yesterday'
  return date.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })
}

export default function ItemCard({ item, session, isNew, onChange }) {
  const isOwner = item.user_id === session.user.id

  async function handleResolve() {
    await markResolved(item.id)
    onChange()
  }

  async function handleDelete() {
    if (!window.confirm(`Delete "${item.title}"?`)) return
    await deleteItem(item.id)
    onChange()
  }

  const classNames = ['card', 'item-card']
  if (item.is_resolved) classNames.push('is-resolved')
  if (isNew) classNames.push('is-new')

  const footer = [item.contact, timeAgo(item.created_at)].filter(Boolean).join(' · ')

  return (
    <article className={classNames.join(' ')}>
      <div className="badges">
        <span className={`badge badge-${item.type}`}>{item.type === 'lost' ? 'Lost' : 'Found'}</span>
        {item.is_resolved && <span className="badge badge-returned">Returned</span>}
      </div>

      <h2 className="item-title">{item.title}</h2>
      <p className="meta">
        {item.categories?.name} · {item.place}
      </p>

      {item.description && <p className="item-description">{item.description}</p>}

      <p className="meta">{footer}</p>

      {isOwner && (
        <div className="item-actions">
          {!item.is_resolved && (
            <button className="btn btn-primary btn-small" type="button" onClick={handleResolve}>
              Mark as returned
            </button>
          )}
          <button className="btn btn-secondary btn-small btn-danger" type="button" onClick={handleDelete}>
            Delete
          </button>
        </div>
      )}
    </article>
  )
}
