import { useState, useEffect } from 'react'
import { CATEGORIES, UNITS } from '../../data/categories'

export default function AddEditItemModal({ isOpen, editItem, onSave, onClose }) {
  const [formData, setFormData] = useState({
    name: '',
    qty: '',
    unit: 'pcs',
    cat: 'produce',
  })

  useEffect(() => {
    if (editItem) {
      setFormData({ ...editItem })
    } else {
      setFormData({ name: '', qty: '', unit: 'pcs', cat: 'produce' })
    }
  }, [editItem, isOpen])

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!formData.name.trim() || !formData.qty) return
    onSave({ ...formData, qty: Number(formData.qty) })
  }

  if (!isOpen) return null

  return (
    <div className="modal-overlay" onClick={onClose} style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: 'rgba(0,0,0,0.5)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 1000,
    }}>
      <div className="modal" onClick={(e) => e.stopPropagation()} style={{
        background: 'var(--color-surface)',
        borderRadius: '8px',
        padding: '20px',
        maxWidth: '400px',
        width: '90%',
        boxShadow: '0 20px 25px rgba(0,0,0,0.15)',
      }}>
        <h2 style={{ marginBottom: '16px', fontSize: '1.3rem' }}>{editItem ? 'Edit Item' : 'Add New Item'}</h2>
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <input
            type="text"
            name="name"
            placeholder="Item name"
            value={formData.name}
            onChange={handleChange}
            required
            style={{
              padding: '8px 12px',
              border: '1px solid var(--color-border)',
              borderRadius: '6px',
              fontSize: '1rem',
              fontFamily: 'inherit',
            }}
          />
          <input
            type="number"
            name="qty"
            placeholder="Quantity"
            value={formData.qty}
            onChange={handleChange}
            required
            style={{
              padding: '8px 12px',
              border: '1px solid var(--color-border)',
              borderRadius: '6px',
              fontSize: '1rem',
              fontFamily: 'inherit',
            }}
          />
          <select name="unit" value={formData.unit} onChange={handleChange} style={{
            padding: '8px 12px',
            border: '1px solid var(--color-border)',
            borderRadius: '6px',
            fontSize: '1rem',
            fontFamily: 'inherit',
          }}>
            {UNITS.map((u) => (
              <option key={u} value={u}>{u}</option>
            ))}
          </select>
          <select name="cat" value={formData.cat} onChange={handleChange} style={{
            padding: '8px 12px',
            border: '1px solid var(--color-border)',
            borderRadius: '6px',
            fontSize: '1rem',
            fontFamily: 'inherit',
          }}>
            {CATEGORIES.map((cat) => (
              <option key={cat.id} value={cat.id}>{cat.label}</option>
            ))}
          </select>
          <div style={{ display: 'flex', gap: '8px', marginTop: '4px' }}>
            <button type="submit" style={{
              flex: 1,
              padding: '10px',
              background: 'var(--color-success)',
              color: 'white',
              border: 'none',
              borderRadius: '6px',
              cursor: 'pointer',
              fontWeight: '600',
              fontSize: '0.95rem',
            }}>
              Save
            </button>
            <button type="button" onClick={onClose} style={{
              flex: 1,
              padding: '10px',
              background: 'var(--color-border)',
              color: 'var(--color-text)',
              border: 'none',
              borderRadius: '6px',
              cursor: 'pointer',
              fontWeight: '600',
              fontSize: '0.95rem',
            }}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
