export default function CategoryPill({ category, isActive, onClick }) {
  return (
    <button
      className={`category-pill ${isActive ? 'active' : ''}`}
      style={{ borderColor: category.color }}
      onClick={onClick}
    >
      {category.name}
    </button>
  )
}
