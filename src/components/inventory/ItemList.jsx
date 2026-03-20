import ItemCard from './ItemCard'

export default function ItemList({ groupedItems, onEdit, onDelete }) {
  if (!groupedItems || groupedItems.length === 0) {
    return <p style={{ textAlign: 'center', color: 'var(--color-text-light)' }}>No items found</p>
  }

  return (
    <div>
      {groupedItems.map(({ category, items }) => (
        <div key={category.id} style={{ marginBottom: '24px' }}>
          <h2 style={{ fontSize: '1.1rem', marginBottom: '12px', color: 'var(--color-text)' }}>
            {category.icon} {category.label}
          </h2>
          <div>
            {items.map((item) => (
              <ItemCard key={item.id} item={item} onEdit={onEdit} onDelete={onDelete} />
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}
