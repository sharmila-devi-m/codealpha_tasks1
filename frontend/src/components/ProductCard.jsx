import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext.jsx';
import toast from 'react-hot-toast';
export default function ProductCard({ p }) {
  const { add } = useCart();
  return (
    <div className="card">
      <Link to={`/products/${p._id}`}><img src={p.image} alt={p.name} /></Link>
      <div className="card-body">
        <Link to={`/products/${p._id}`} className="title">{p.name}</Link>
        <div className="cat">{p.category}</div>
        <div className="row">
          <span className="price">${p.price.toFixed(2)}</span>
          <button className="btn primary small" onClick={async () => { await add(p); toast.success('Added to cart'); }}>Add</button>
        </div>
      </div>
    </div>
  );
}
