import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext.jsx';
import api from '../services/api.js';
import toast from 'react-hot-toast';

export default function Checkout() {
  const { items, subtotal, clear } = useCart();
  const nav = useNavigate();
  const [form, setForm] = useState({ fullName: '', address: '', city: '', postalCode: '', country: '', phone: '' });
  const [loading, setLoading] = useState(false);

  const onChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const submit = async (e) => {
    e.preventDefault();
    if (!items.length) return toast.error('Cart is empty');
    setLoading(true);
    try {
      await api.post('/orders', { shippingAddress: form });
      clear();
      toast.success('Order placed!');
      nav('/orders');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Checkout failed');
    } finally { setLoading(false); }
  };

  return (
    <>
      <h1>Checkout</h1>
      <div className="checkout">
        <form onSubmit={submit} className="card-form">
          <h3>Shipping Information</h3>
          {['fullName','address','city','postalCode','country','phone'].map(k => (
            <input key={k} name={k} required placeholder={k} value={form[k]} onChange={onChange} />
          ))}
          <button className="btn primary block" disabled={loading}>{loading ? 'Placing...' : 'Place Order'}</button>
        </form>
        <aside className="summary">
          <h3>Summary</h3>
          {items.map(i => (
            <div className="row" key={i.product._id}><span>{i.product.name} × {i.quantity}</span><span>${(i.product.price * i.quantity).toFixed(2)}</span></div>
          ))}
          <div className="row total"><span>Total</span><span>${subtotal.toFixed(2)}</span></div>
        </aside>
      </div>
    </>
  );
}
