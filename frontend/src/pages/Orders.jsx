import { useEffect, useState } from 'react';
import api from '../services/api.js';

export default function Orders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => { api.get('/orders/user').then(r => setOrders(r.data)).finally(() => setLoading(false)); }, []);
  if (loading) return <p>Loading...</p>;
  if (!orders.length) return <p>No orders yet.</p>;
  return (
    <>
      <h1>My Orders</h1>
      <div className="orders">
        {orders.map(o => (
          <div className="order" key={o._id}>
            <div className="order-head">
              <span>Order #{o._id.slice(-6)}</span>
              <span className={`status ${o.status}`}>{o.status}</span>
              <span>{new Date(o.createdAt).toLocaleString()}</span>
              <b>${o.totalAmount.toFixed(2)}</b>
            </div>
            <ul>{o.products.map(p => <li key={p.product}>{p.name} × {p.quantity} — ${(p.price*p.quantity).toFixed(2)}</li>)}</ul>
          </div>
        ))}
      </div>
    </>
  );
}
