import { useState, useMemo, useEffect } from 'react'
import {
  collection, onSnapshot, addDoc, updateDoc,
  deleteDoc, doc, serverTimestamp, query, orderBy
} from 'firebase/firestore'
import { db, HOUSEHOLD_ID } from '../lib/firebase'
import { SAMPLE_ITEMS } from '../data/sampleItems'
import {
  filterItems,
  groupByCategory,
  getStats,
  getActiveCategoryIds,
} from '../utils/inventoryHelpers'

const itemsRef = () =>
  collection(db, 'households', HOUSEHOLD_ID, 'items')

export function useInventory() {
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [search, setSearch] = useState('')
  const [activeCategory, setActiveCategory] = useState('all')

  // ── Real-time listener ──────────────────────────────────────────
  useEffect(() => {
    const q = query(itemsRef(), orderBy('createdAt', 'asc'))
    const unsub = onSnapshot(
      q,
      snapshot => {
        const docs = snapshot.docs.map(d => ({ id: d.id, ...d.data() }))
        setItems(docs)
        setLoading(false)
      },
      err => {
        console.error('Firestore error:', err)
        setError('Could not connect to database.')
        setLoading(false)
      }
    )
    return () => unsub()
  }, [])

  // ── Derived state ───────────────────────────────────────────────
  const filteredItems = useMemo(
    () => filterItems(items, { search, category: activeCategory }),
    [items, search, activeCategory]
  )

  const groupedItems = useMemo(
    () => groupByCategory(filteredItems),
    [filteredItems]
  )

  const stats = useMemo(() => getStats(items), [items])

  const activeCategoryIds = useMemo(
    () => getActiveCategoryIds(items),
    [items]
  )

  // ── Actions ─────────────────────────────────────────────────────
  async function addItem(formData) {
    try {
      await addDoc(itemsRef(), {
        name: formData.name.trim(),
        cat: formData.cat,
        qty: Number(formData.qty) || 0,
        unit: formData.unit,
        createdAt: serverTimestamp(),
      })
    } catch (err) {
      console.error('Failed to add item:', err)
    }
  }

  async function updateItem(id, formData) {
    try {
      await updateDoc(doc(db, 'households', HOUSEHOLD_ID, 'items', id), {
        name: formData.name.trim(),
        cat: formData.cat,
        qty: Number(formData.qty) || 0,
        unit: formData.unit,
      })
    } catch (err) {
      console.error('Failed to update item:', err)
    }
  }

  async function deleteItem(id) {
    try {
      await deleteDoc(doc(db, 'households', HOUSEHOLD_ID, 'items', id))
    } catch (err) {
      console.error('Failed to delete item:', err)
    }
  }

  // Seed helper — call seedSampleData() from browser console once
  // to populate Firestore with demo items
  async function seedSampleData() {
    for (const item of SAMPLE_ITEMS) {
      await addDoc(itemsRef(), {
        name: item.name,
        cat: item.cat,
        qty: item.qty,
        unit: item.unit,
        createdAt: serverTimestamp(),
      })
    }
  }

  return {
    items, loading, error,
    search, activeCategory,
    filteredItems, groupedItems, stats, activeCategoryIds,
    setSearch, setActiveCategory,
    addItem, updateItem, deleteItem, seedSampleData,
  }
}