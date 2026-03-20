import React from 'react'
import { CATEGORY_MAP, CATEGORY_COLORS } from '../../data/categories'
import { isLowStock } from '../../utils/inventoryHelpers'

export default function ItemCard({ item, onEdit, onDelete }) {
  const cat = CATEGORY_MAP[item.cat] || { label: item.cat, icon: '📦' }
  const low = isLowStock(item)
  const bgColor = CATEGORY_COLORS[item.cat] || 'var(--color-surface-muted)'

  return (
    <div
      className="animate-fade-in"
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: 12,
        background: 'var(--color-surface)',
        border: '1px solid var(--color-border)',
        borderRadius: 'var(--radius-md)',
        padding: '11px 13px',
        marginBottom: 8,
      }}
    >
      {/* Icon */}
      <div style={{
        width: 40,
        height: 40,
        borderRadius: 10,
        background: bgColor,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: 19,
        flexShrink: 0,
      }}>
        {cat.icon}
      </div>

      {/* Info */}
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{
          fontSize: 14,
          fontWeight: 500,
          color: 'var(--color-text-primary)',
          marginBottom: 2,
          whiteSpace: 'nowrap',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
        }}>
          {item.name}
        </div>
        <div style={{
          fontSize: 12,
          color: low ? 'var(--color-low-stock)' : 'var(--color-text-secondary)',
          display: 'flex',
          alignItems: 'center',
          gap: 6,
        }}>
          <span>{item.qty} {item.unit}</span>
          {low && (
            <span style={{
              background: 'var(--color-low-stock-bg)',
              color: 'var(--color-low-stock)',
              fontSize: 10,
              fontWeight: 500,
              padding: '1px 6px',
              borderRadius: 'var(--radius-pill)',
            }}>
              low stock
            </span>
          )}
        </div>
      </div>

      {/* Actions */}
      <div style={{ display: 'flex', gap: 6, flexShrink: 0 }}>
        <ActionBtn onClick={() => onEdit(item)} title="Edit">
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path d="M9.5 2L12 4.5L4.5 12H2V9.5L9.5 2Z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" />
          </svg>
        </ActionBtn>
        <ActionBtn onClick={() => onDelete(item.id)} title="Delete" danger>
          <svg width="13" height="14" viewBox="0 0 13 14" fill="none">
            <path d="M1 3.5H12M4.5 3.5V2H8.5V3.5M5.5 6.5V10.5M7.5 6.5V10.5M2 3.5L2.5 12H10.5L11 3.5H2Z" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </ActionBtn>
      </div>
    </div>
  )
}

function ActionBtn({ onClick, children, title, danger }) {
  const [hover, setHover] = React.useState(false)
  return (
    <button
      onClick={onClick}
      title={title}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        width: 32,
        height: 32,
        borderRadius: 'var(--radius-sm)',
        border: '1px solid var(--color-border)',
        background: hover && danger
          ? 'var(--color-low-stock-bg)'
          : hover
          ? 'var(--color-surface-muted)'
          : 'var(--color-surface)',
        color: hover && danger ? 'var(--color-low-stock)' : 'var(--color-text-secondary)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        transition: 'all 0.12s ease',
      }}
    >
      {children}
    </button>
  )
}
