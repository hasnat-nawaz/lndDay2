const types = [
  { value: 'all', label: 'All' },
  { value: 'lost', label: 'Lost' },
  { value: 'found', label: 'Found' },
]

export default function Filters({ categories, filters, onChange, count }) {
  function update(field, value) {
    onChange({ ...filters, [field]: value })
  }

  return (
    <section className="card filters" aria-label="Filters">
      <div className="filters-row">
        <div className="segmented" role="group" aria-label="Show lost or found">
          {types.map((type) => (
            <button
              key={type.value}
              type="button"
              className="segment"
              aria-pressed={filters.type === type.value}
              onClick={() => update('type', type.value)}
            >
              {type.label}
            </button>
          ))}
        </div>

        <select
          className="input filters-category"
          aria-label="Category"
          value={filters.category_id}
          onChange={(event) => update('category_id', event.target.value)}
        >
          <option value="">All categories</option>
          {categories.map((category) => (
            <option key={category.id} value={String(category.id)}>
              {category.name}
            </option>
          ))}
        </select>

        <label className="checkbox" htmlFor="show-returned">
          <input
            id="show-returned"
            type="checkbox"
            checked={filters.showReturned}
            onChange={(event) => update('showReturned', event.target.checked)}
          />
          Show returned items
        </label>
      </div>

      <p className="count">{count === 1 ? '1 item' : `${count} items`}</p>
    </section>
  )
}
