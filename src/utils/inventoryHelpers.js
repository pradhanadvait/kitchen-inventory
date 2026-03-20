import { CATEGORIES, LOW_STOCK_THRESHOLD } from '../data/categories'

export function isLowStock(item) {
  return item.qty <= LOW_STOCK_THRESHOLD
}

export function filterItems(items, { search = '', category = 'all' }) {
  return items.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(search.toLowerCase())
    const matchesCat = category === 'all' || item.cat === category
    return matchesSearch && matchesCat
  })
}

export function groupByCategory(items) {
  const groups = {}
  items.forEach(item => {
    if (!groups[item.cat]) groups[item.cat] = []
    groups[item.cat].push(item)
  })
  // Return in canonical category order
  return CATEGORIES
    .filter(c => groups[c.id])
    .map(c => ({ category: c, items: groups[c.id] }))
}

export function getStats(items) {
  return {
    total: items.length,
    categories: new Set(items.map(i => i.cat)).size,
    lowStock: items.filter(isLowStock).length,
  }
}

export function getActiveCategoryIds(items) {
  return new Set(items.map(i => i.cat))
}

export function createItem({ name, cat, qty, unit }) {
  return {
    id: Date.now(),
    name: name.trim(),
    cat,
    qty: Number(qty) || 0,
    unit,
  }
}