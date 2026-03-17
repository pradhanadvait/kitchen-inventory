export default function QuantityControl({ quantity, onIncrease, onDecrease }) {
  return (
    <div className="quantity-control">
      <button onClick={onDecrease} className="btn-qty">−</button>
      <span className="qty-display">{quantity}</span>
      <button onClick={onIncrease} className="btn-qty">+</button>
    </div>
  )
}
