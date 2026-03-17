export function filterItemsBySearch(items, searchTerm) {
  if (!searchTerm) return items
  return items.filter((item) =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  )
}

export function sortItemsByName(items) {
  return [...items].sort((a, b) => a.name.localeCompare(b.name))
}

export function sortItemsByExpiry(items) {
  return [...items].sort((a, b) => {
    if (!a.expiryDate) return 1
    if (!b.expiryDate) return -1
    return new Date(a.expiryDate) - new Date(b.expiryDate)
  })
}

export function isLowStock(quantity, threshold = 2) {
  return quantity <= threshold
}

export function getExpiringItems(items, daysThreshold = 7) {
  const today = new Date()
  return items.filter((item) => {
    if (!item.expiryDate) return false
    const expiryDate = new Date(item.expiryDate)
    const daysUntilExpiry = Math.ceil((expiryDate - today) / (1000 * 60 * 60 * 24))
    return daysUntilExpiry <= daysThreshold && daysUntilExpiry > 0
  })
}

export function getExpiredItems(items) {
  const today = new Date()
  return items.filter((item) => {
    if (!item.expiryDate) return false
    return new Date(item.expiryDate) < today
  })
}

export function getLowStockItems(items, threshold = 2) {
  return items.filter((item) => isLowStock(item.quantity, threshold))
}
