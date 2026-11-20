import { useState } from 'react'
import { createItem } from '../../backend/items'

const emptyForm = {
  type: 'lost',
  title: '',
  category_id: '',
  place: '',
  description: '',
  contact: '',
}

export default function ItemForm({ categories, onPosted }) {
  const [form, setForm] = useState(emptyForm)

  function update(field, value) {
    setForm({ ...form, [field]: value })
  }

  async function handleSubmit(event) {
    event.preventDefault()
    const item = {
      title: form.title,
      description: form.description,
      type: form.type,
      category_id: Number(form.category_id),
      place: form.place,
      contact: form.contact,
    }
    await createItem(item)
    setForm(emptyForm)
    onPosted()
  }

  return (
    <section className="card form-card" aria-labelledby="report-heading">
      <h2 className="section-heading" id="report-heading">Report an item</h2>

      <form className="stack" onSubmit={handleSubmit}>
        <div className="segmented segmented-full" role="group" aria-label="Lost or found">
          <button
            type="button"
            className="segment"
            aria-pressed={form.type === 'lost'}
            onClick={() => update('type', 'lost')}
          >
            Lost
          </button>
          <button
            type="button"
            className="segment"
            aria-pressed={form.type === 'found'}
            onClick={() => update('type', 'found')}
          >
            Found
          </button>
        </div>

        <div className="field">
          <label className="label" htmlFor="item-title">Title</label>
          <input
            id="item-title"
            className="input"
            type="text"
            placeholder="Blue Milton water bottle"
            required
            value={form.title}
            onChange={(event) => update('title', event.target.value)}
          />
        </div>

        <div className="field">
          <label className="label" htmlFor="item-category">Category</label>
          <select
            id="item-category"
            className="input"
            required
            value={form.category_id}
            onChange={(event) => update('category_id', event.target.value)}
          >
            <option value="">Select a category</option>
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
        </div>

        <div className="field">
          <label className="label" htmlFor="item-place">Place</label>
          <input
            id="item-place"
            className="input"
            type="text"
            placeholder="Library"
            required
            value={form.place}
            onChange={(event) => update('place', event.target.value)}
          />
        </div>

        <div className="field">
          <label className="label" htmlFor="item-description">Description (optional)</label>
          <textarea
            id="item-description"
            className="input textarea"
            value={form.description}
            onChange={(event) => update('description', event.target.value)}
          />
        </div>

        <div className="field">
          <label className="label" htmlFor="item-contact">Contact (optional)</label>
          <input
            id="item-contact"
            className="input"
            type="text"
            value={form.contact}
            onChange={(event) => update('contact', event.target.value)}
          />
        </div>

        <button className="btn btn-primary btn-block" type="submit">
          Post item
        </button>
      </form>
    </section>
  )
}
