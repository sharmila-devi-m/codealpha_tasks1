import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import api from '../services/api.js';
import { useCart } from '../context/CartContext.jsx';
import toast from 'react-hot-toast';

export default function ProductDetails() {
  const { id } = useParams();
  const [p, setP] = useState(null);
  const [qty, setQty] = useState(1);
  const { add } = useCart();
  useEffect(() => { api.get(`/products/${id}`).then(r => setP(r.data)).catch(() => setP(false)); }, [id]);
  if (p === null) return <p>Loading...</p>;
  if (!p) return <p>Product not found.</p>;
  return (
    <div className="details">
      <img src={p.image} alt={p.name} />
      <div>
        <h1>{p.name}</h1>
        <div className="cat">{p.category}</div>
        <p className="price big">${p.price.toFixed(2)}</p>
        <p>{p.description}</p>
        <p className="stock">{p.stock > 0 ? `${p.stock} in stock` : 'Out of stock'}</p>
        <div className="qty">
          <button onClick={() => setQty(Math.max(1, qty - 1))}>-</button>
          <span>{qty}</span>
          <button onClick={() => setQty(qty + 1)}>+</button>
        </div>
        <button className="btn primary" disabled={p.stock === 0}
          onClick={async () => { await add(p, qty); toast.success('Added to cart'); }}>
          Add to cart
        </button>
      </div>
    </div>
  );
}
