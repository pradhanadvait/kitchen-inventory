import ItemList from './ItemList'

export default function CategorySection({ category, items, onEdit, onDelete }) {
  return (
    <section className="category-section">
      <h2>{category.name}</h2>
      <ItemList items={items} onEdit={onEdit} onDelete={onDelete} />
    </section>
  )
}
