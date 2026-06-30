import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../services/api.js';
import ProductCard from '../components/ProductCard.jsx';

export default function Home() {
  const [featured, setFeatured] = useState([]);
  useEffect(() => { api.get('/products').then(r => setFeatured(r.data.slice(0, 4))); }, []);
  return (
    <>
      <section className="hero">
        <div>
          <h1>Discover gear you'll love.</h1>
          <p>Curated electronics, fashion, home goods and more — at honest prices.</p>
          <Link to="/products" className="btn primary">Shop now</Link>
        </div>
      </section>
      <h2 className="section-title">Featured Products</h2>
      <div className="grid">{featured.map(p => <ProductCard key={p._id} p={p} />)}</div>
    </>
  );
}
