export default function CategoryPill({ label, icon, active, onClick }) {
  return (
    <button
      className={`category-pill ${active ? 'active' : ''}`}
      onClick={onClick}
      style={{
        padding: '8px 12px',
        background: active ? 'var(--color-primary)' : 'var(--color-surface)',
        color: active ? 'white' : 'var(--color-text)',
        border: '1px solid var(--color-border)',
        borderRadius: '6px',
        cursor: 'pointer',
        fontSize: '0.85rem',
        fontWeight: '500',
        whiteSpace: 'nowrap',
      }}
    >
      {icon && <span style={{ marginRight: '4px' }}>{icon}</span>}
      {label}
    </button>
  )
}
