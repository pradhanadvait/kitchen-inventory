import React, { useState } from 'react'
import { useInventory } from './hooks/useInventory'
import { CATEGORIES } from './data/categories'
import Header from './components/layout/Header'
import StatsBar from './components/layout/StatsBar'
import CategoryPill from './components/ui/CategoryPill'
import ItemList from './components/inventory/ItemList'
import AddEditItemModal from './components/modals/AddEditItemModal'

export default function App() {
  const {
    loading, error,
    search, setSearch,
    activeCategory, setActiveCategory,
    groupedItems, stats, activeCategoryIds,
    addItem, updateItem, deleteItem,
  } = useInventory()

  const [modalOpen, setModalOpen] = useState(false)
  const [editItem, setEditItem] = useState(null)

  const handleAddClick = () => { setEditItem(null); setModalOpen(true) }
  const handleEditItem = item => { setEditItem(item); setModalOpen(true) }
  const handleClose = () => { setModalOpen(false); setEditItem(null) }

  const handleSave = async (formData) => {
    if (editItem) await updateItem(editItem.id, formData)
    else await addItem(formData)
    handleClose()
  }

  const visibleCategories = CATEGORIES.filter(c => activeCategoryIds.has(c.id))

  return (
    <div style={{
      maxWidth: 480,
      margin: '0 auto',
      height: '100vh',
      display: 'flex',
      flexDirection: 'column',
      background: 'var(--color-bg)',
      position: 'relative',
      overflow: 'hidden',
    }}>
      <Header
        search={search}
        onSearchChange={setSearch}
        onAddClick={handleAddClick}
      />
      <StatsBar stats={stats} />

      {/* Category filter pills */}
      <div
        className="hide-scrollbar"
        style={{
          display: 'flex',
          gap: 7,
          padding: '10px 16px',
          overflowX: 'auto',
          background: 'var(--color-surface)',
          borderBottom: '1px solid var(--color-border)',
          flexShrink: 0,
        }}
      >
        <CategoryPill label="All" active={activeCategory === 'all'} onClick={() => setActiveCategory('all')} />
        {visibleCategories.map(c => (
          <CategoryPill key={c.id} label={c.label} icon={c.icon}
            active={activeCategory === c.id}
            onClick={() => setActiveCategory(c.id)}
          />
        ))}
      </div>

      {/* Main content */}
      <div className="hide-scrollbar" style={{ flex: 1, overflowY: 'auto', padding: '14px 16px' }}>
        {error ? (
          <ErrorState message={error} />
        ) : loading ? (
          <LoadingState />
        ) : (
          <ItemList groupedItems={groupedItems} onEdit={handleEditItem} onDelete={deleteItem} />
        )}
      </div>

      <AddEditItemModal
        isOpen={modalOpen}
        editItem={editItem}
        onSave={handleSave}
        onClose={handleClose}
      />
    </div>
  )
}

function LoadingState() {
  return (
    <div style={{ textAlign: 'center', padding: '48px 24px', color: 'var(--color-text-tertiary)' }}>
      <div style={{ fontSize: 32, marginBottom: 12 }}>⏳</div>
      <div style={{ fontSize: 14 }}>Loading your kitchen...</div>
    </div>
  )
}

function ErrorState({ message }) {
  return (
    <div style={{
      margin: '24px 0',
      padding: '16px',
      background: '#FCEBEB',
      border: '1px solid #F09595',
      borderRadius: 'var(--radius-md)',
      color: '#A32D2D',
      fontSize: 14,
    }}>
      <strong>Connection error</strong><br />
      {message}<br /><br />
      Check that your Firebase config in <code>src/lib/firebase.js</code> is correct and Firestore is enabled.
    </div>
  )
}
