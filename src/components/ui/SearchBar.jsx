export default function SearchBar({ value, onChange, placeholder = "Search items..." }) {
  return (
    <input
      type="text"
      className="search-bar"
      placeholder={placeholder}
      value={value}
      onChange={(e) => onChange(e.target.value)}
    />
  )
}
