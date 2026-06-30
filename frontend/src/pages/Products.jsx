import { useEffect, useMemo, useState } from 'react';
import api from '../services/api.js';
import ProductCard from '../components/ProductCard.jsx';

export default function Products() {
  const [items, setItems] = useState([]);
  const [q, setQ] = useState('');
  const [cat, setCat] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    api.get('/products', { params: { q, category: cat } })
      .then(r => setItems(r.data)).finally(() => setLoading(false));
  }, [q, cat]);

  const cats = useMemo(() => Array.from(new Set(items.map(i => i.category))), [items]);

  return (
    <>
      <h1>Shop</h1>
      <div className="filters">
        <input placeholder="Search products..." value={q} onChange={e => setQ(e.target.value)} />
        <select value={cat} onChange={e => setCat(e.target.value)}>
          <option value="">All categories</option>
          {['Electronics','Fashion','Home','Books','Sports', ...cats].filter((v,i,a)=>a.indexOf(v)===i).map(c => <option key={c}>{c}</option>)}
        </select>
      </div>
      {loading ? <p>Loading...</p> : items.length === 0 ? <p>No products found.</p> :
        <div className="grid">{items.map(p => <ProductCard key={p._id} p={p} />)}</div>}
    </>
  );
}
