export const CATEGORIES = [
  { id: 'produce',    label: 'Produce',     icon: '🥦' },
  { id: 'dairy',      label: 'Dairy',       icon: '🥛' },
  { id: 'meat',       label: 'Meat',        icon: '🥩' },
  { id: 'grains',     label: 'Grains',      icon: '🌾' },
  { id: 'snacks',     label: 'Snacks',      icon: '🍿' },
  { id: 'drinks',     label: 'Drinks',      icon: '🧃' },
  { id: 'condiments', label: 'Condiments',  icon: '🫙' },
  { id: 'frozen',     label: 'Frozen',      icon: '🧊' },
]

export const CATEGORY_MAP = Object.fromEntries(
  CATEGORIES.map(c => [c.id, c])
)

export const CATEGORY_COLORS = {
  produce:    'var(--cat-produce)',
  dairy:      'var(--cat-dairy)',
  meat:       'var(--cat-meat)',
  grains:     'var(--cat-grains)',
  snacks:     'var(--cat-snacks)',
  drinks:     'var(--cat-drinks)',
  condiments: 'var(--cat-condiments)',
  frozen:     'var(--cat-frozen)',
}

export const UNITS = ['pcs', 'kg', 'g', 'L', 'ml', 'pack', 'bottle', 'bag', 'box', 'bunch']

export const LOW_STOCK_THRESHOLD = 2
