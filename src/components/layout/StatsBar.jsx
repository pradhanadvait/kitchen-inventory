export default function StatsBar({ total, lowStock }) {
  return (
    <div className="stats-bar">
      <div className="stat">
        <span className="stat-label">Total Items</span>
        <span className="stat-value">{total}</span>
      </div>
      <div className="stat">
        <span className="stat-label">Low Stock</span>
        <span className="stat-value alert">{lowStock}</span>
      </div>
    </div>
  )
}
