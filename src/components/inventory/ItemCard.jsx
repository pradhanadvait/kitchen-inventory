export default function ItemCard({ item, onEdit, onDelete }) {
  return (
    <div className="item-card">
      <div className="item-header">
        <h3>{item.name}</h3>
        <span className="item-quantity">{item.quantity}</span>
      </div>
      <div className="item-details">
        <p className="item-unit">{item.unit}</p>
        {item.expiryDate && <p className="item-expiry">Expires: {item.expiryDate}</p>}
      </div>
      <div className="item-actions">
        <button onClick={() => onEdit(item)} className="btn-edit">Edit</button>
        <button onClick={() => onDelete(item.id)} className="btn-delete">Delete</button>
      </div>
    </div>
  )
}
