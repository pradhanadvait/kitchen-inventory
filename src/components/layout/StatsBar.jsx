export default function StatsBar({ stats }) {
  return (
    <div className="stats-bar">
      <div className="stat">
        <span className="stat-label">Total Items</span>
        <span className="stat-value">{stats.total}</span>
      </div>
      <div className="stat">
        <span className="stat-label">Low Stock</span>
        <span className="stat-value alert">{stats.lowStock}</span>
      </div>
    </div>
  )
}
