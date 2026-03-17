import ItemCard from './ItemCard'

export default function ItemList({ items, onEdit, onDelete }) {
  return (
    <div className="item-list">
      {items.length === 0 ? (
        <p className="empty-state">No items found</p>
      ) : (
        items.map((item) => (
          <ItemCard key={item.id} item={item} onEdit={onEdit} onDelete={onDelete} />
        ))
      )}
    </div>
  )
}
