import { useState } from 'react'
import Header from './components/layout/Header'
import StatsBar from './components/layout/StatsBar'
import CategorySection from './components/inventory/CategorySection'
import AddEditItemModal from './components/modals/AddEditItemModal'
import SearchBar from './components/ui/SearchBar'
import CategoryPill from './components/ui/CategoryPill'
import { useInventory } from './hooks/useInventory'
import { CATEGORIES } from './data/categories'
import { SAMPLE_ITEMS } from './data/sampleItems'
import { filterItemsBySearch } from './utils/inventoryHelpers'
import './styles/globals.css'

function App() {
  const { items, addItem, updateItem, deleteItem, getItemsByCategory } = useInventory(SAMPLE_ITEMS)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState(null)
  const [showModal, setShowModal] = useState(false)
  const [editingItem, setEditingItem] = useState(null)

  const filteredItems = filterItemsBySearch(items, searchTerm)

  const handleAddNew = () => {
    setEditingItem(null)
    setShowModal(true)
  }

  const handleEdit = (item) => {
    setEditingItem(item)
    setShowModal(true)
  }

  const handleSaveItem = (formData) => {
    if (editingItem) {
      updateItem(editingItem.id, formData)
    } else {
      addItem(formData)
    }
    setShowModal(false)
    setEditingItem(null)
  }

  const handleDeleteItem = (id) => {
    deleteItem(id)
  }

  const lowStockCount = items.filter(item => item.quantity <= 2).length

  return (
    <div className="app">
      <Header />
      <StatsBar total={items.length} lowStock={lowStockCount} />
      
      <div style={{ padding: 'var(--space-lg)' }}>
        <SearchBar value={searchTerm} onChange={setSearchTerm} />
        
        <div style={{ margin: 'var(--space-lg) 0', display: 'flex', flexWrap: 'wrap' }}>
          <CategoryPill
            category={{ id: null, name: 'All', color: '#3b82f6' }}
            isActive={selectedCategory === null}
            onClick={() => setSelectedCategory(null)}
          />
          {CATEGORIES.map((cat) => (
            <CategoryPill
              key={cat.id}
              category={cat}
              isActive={selectedCategory === cat.id}
              onClick={() => setSelectedCategory(cat.id)}
            />
          ))}
        </div>

        <button
          onClick={handleAddNew}
          style={{
            padding: 'var(--space-md) var(--space-lg)',
            marginBottom: 'var(--space-lg)',
            backgroundColor: '#10b981',
            color: 'white',
            border: 'none',
            borderRadius: 'var(--radius-md)',
            cursor: 'pointer',
            fontSize: '1rem',
            fontWeight: '600',
          }}
        >
          + Add New Item
        </button>

        {CATEGORIES.map((category) => {
          const categoryItems = selectedCategory === null || selectedCategory === category.id
            ? filteredItems.filter(item => item.category === category.id)
            : []
          
          if (categoryItems.length === 0 && selectedCategory !== null && selectedCategory !== category.id) {
            return null
          }

          return (
            <CategorySection
              key={category.id}
              category={category}
              items={categoryItems}
              onEdit={handleEdit}
              onDelete={handleDeleteItem}
            />
          )
        })}
      </div>

      {showModal && (
        <AddEditItemModal
          item={editingItem}
          categories={CATEGORIES}
          onSave={handleSaveItem}
          onClose={() => {
            setShowModal(false)
            setEditingItem(null)
          }}
        />
      )}
    </div>
  )
}

export default App
