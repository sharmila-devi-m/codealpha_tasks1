import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext.jsx';

export default function Cart() {
  const { items, update, remove, subtotal } = useCart();
  if (!items.length) return <div className="empty"><h2>Your cart is empty</h2><Link className="btn primary" to="/products">Browse products</Link></div>;
  return (
    <>
      <h1>Cart</h1>
      <div className="cart">
        <div className="items">
          {items.map(i => (
            <div className="cart-row" key={i.product._id}>
              <img src={i.product.image} alt={i.product.name} />
              <div className="grow">
                <Link to={`/products/${i.product._id}`} className="title">{i.product.name}</Link>
                <div>${i.product.price.toFixed(2)}</div>
              </div>
              <div className="qty">
                <button onClick={() => update(i.product._id, Math.max(1, i.quantity - 1))}>-</button>
                <span>{i.quantity}</span>
                <button onClick={() => update(i.product._id, i.quantity + 1)}>+</button>
              </div>
              <div className="line">${(i.product.price * i.quantity).toFixed(2)}</div>
              <button className="btn ghost" onClick={() => remove(i.product._id)}>✕</button>
            </div>
          ))}
        </div>
        <aside className="summary">
          <h3>Order Summary</h3>
          <div className="row"><span>Subtotal</span><span>${subtotal.toFixed(2)}</span></div>
          <div className="row"><span>Shipping</span><span>Free</span></div>
          <div className="row total"><span>Total</span><span>${subtotal.toFixed(2)}</span></div>
          <Link to="/checkout" className="btn primary block">Checkout</Link>
        </aside>
      </div>
    </>
  );
}
