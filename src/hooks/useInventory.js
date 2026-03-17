import { useState } from 'react'

export function useInventory(initialItems = []) {
  const [items, setItems] = useState(initialItems)

  const addItem = (item) => {
    const newItem = {
      ...item,
      id: Date.now(),
    }
    setItems((prev) => [...prev, newItem])
  }

  const updateItem = (id, updates) => {
    setItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, ...updates } : item))
    )
  }

  const deleteItem = (id) => {
    setItems((prev) => prev.filter((item) => item.id !== id))
  }

  const getItemsByCategory = (categoryId) => {
    return items.filter((item) => item.category === categoryId)
  }

  return {
    items,
    addItem,
    updateItem,
    deleteItem,
    getItemsByCategory,
  }
}
