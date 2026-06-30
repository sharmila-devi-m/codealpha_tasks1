import { createContext, useContext, useEffect, useState } from 'react';
import { useAuth } from './AuthContext.jsx';
import api from '../services/api.js';

const CartContext = createContext();
export const useCart = () => useContext(CartContext);

export function CartProvider({ children }) {
  const { user } = useAuth();
  const [items, setItems] = useState([]);

  useEffect(() => {
    if (user) {
      api.get('/cart').then(r => setItems(r.data)).catch(() => {});
    } else {
      const local = localStorage.getItem('cart');
      setItems(local ? JSON.parse(local) : []);
    }
  }, [user]);

  const saveLocal = (next) => {
    setItems(next);
    if (!user) localStorage.setItem('cart', JSON.stringify(next));
  };

  const add = async (product, quantity = 1) => {
    if (user) {
      const { data } = await api.post('/cart/add', { productId: product._id, quantity });
      setItems(data);
    } else {
      const exist = items.find(i => i.product._id === product._id);
      const next = exist
        ? items.map(i => i.product._id === product._id ? { ...i, quantity: i.quantity + quantity } : i)
        : [...items, { product, quantity }];
      saveLocal(next);
    }
  };

  const update = async (productId, quantity) => {
    if (user) {
      const { data } = await api.put('/cart/update', { productId, quantity });
      setItems(data);
    } else {
      saveLocal(items.map(i => i.product._id === productId ? { ...i, quantity } : i));
    }
  };

  const remove = async (productId) => {
    if (user) {
      const { data } = await api.delete('/cart/remove', { data: { productId } });
      setItems(data);
    } else {
      saveLocal(items.filter(i => i.product._id !== productId));
    }
  };

  const clear = () => { setItems([]); if (!user) localStorage.removeItem('cart'); };

  const subtotal = items.reduce((s, i) => s + (i.product?.price || 0) * i.quantity, 0);
  const count = items.reduce((s, i) => s + i.quantity, 0);

  return <CartContext.Provider value={{ items, add, update, remove, clear, subtotal, count }}>{children}</CartContext.Provider>;
}
