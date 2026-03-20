import SearchBar from '../ui/SearchBar'

export default function Header({ search, onSearchChange, onAddClick }) {
  return (
    <header className="header" style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
      <h1 style={{ margin: 0, fontSize: '1.3rem', flex: 1 }}>Kitchen Inventory</h1>
      <SearchBar value={search} onChange={onSearchChange} />
      <button
        onClick={onAddClick}
        style={{
          padding: '8px 16px',
          background: 'var(--color-success)',
          color: 'white',
          border: 'none',
          borderRadius: '6px',
          cursor: 'pointer',
          fontWeight: '600',
          fontSize: '0.9rem',
        }}
      >
        + Add
      </button>
    </header>
  )
}
