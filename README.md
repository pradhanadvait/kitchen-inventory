# Kitchen Inventory

A mobile-first kitchen inventory management app built with React + Vite.

## Features
- Add, edit, and delete inventory items
- Organised by category (Produce, Dairy, Meat, Grains, Snacks, Drinks, Condiments, Frozen)
- Filter by category and search by name
- Low stock indicators for items with quantity ≤ 2
- Stats bar showing total items, categories, and low stock count
- Smooth slide-up modal for adding/editing items

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

## Project Structure

```
src/
├── components/
│   ├── layout/         # Header, StatsBar
│   ├── inventory/      # ItemCard, ItemList, CategorySection
│   ├── modals/         # AddEditItemModal
│   └── ui/             # SearchBar, CategoryPill, QuantityControl
├── hooks/
│   └── useInventory.js # All state and business logic
├── data/
│   ├── categories.js   # Category config, colors, units
│   └── sampleItems.js  # Demo seed data
├── utils/
│   └── inventoryHelpers.js  # Pure filter/sort/stats functions
├── styles/
│   └── globals.css
├── App.jsx
└── main.jsx
```

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start dev server |
| `npm run build` | Build for production |
| `npm run preview` | Preview production build |

## Tech Stack
- React 18
- Vite 5
- Pure CSS (no UI library)
