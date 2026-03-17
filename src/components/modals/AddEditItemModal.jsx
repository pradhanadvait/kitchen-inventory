import { useState, useEffect } from 'react'

export default function AddEditItemModal({ item, categories, onSave, onClose }) {
  const [formData, setFormData] = useState({
    name: '',
    quantity: '',
    unit: '',
    category: '',
    expiryDate: '',
  })

  useEffect(() => {
    if (item) {
      setFormData(item)
    }
  }, [item])

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    onSave(formData)
  }

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <h2>{item ? 'Edit Item' : 'Add New Item'}</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            placeholder="Item name"
            value={formData.name}
            onChange={handleChange}
            required
          />
          <input
            type="number"
            name="quantity"
            placeholder="Quantity"
            value={formData.quantity}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="unit"
            placeholder="Unit (e.g., kg, L, pieces)"
            value={formData.unit}
            onChange={handleChange}
          />
          <select name="category" value={formData.category} onChange={handleChange}>
            <option value="">Select Category</option>
            {categories.map((cat) => (
              <option key={cat.id} value={cat.id}>{cat.name}</option>
            ))}
          </select>
          <input
            type="date"
            name="expiryDate"
            value={formData.expiryDate}
            onChange={handleChange}
          />
          <div className="modal-actions">
            <button type="submit" className="btn-primary">Save</button>
            <button type="button" onClick={onClose} className="btn-secondary">Cancel</button>
          </div>
        </form>
      </div>
    </div>
  )
}
