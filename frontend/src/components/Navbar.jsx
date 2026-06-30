import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';
import { useCart } from '../context/CartContext.jsx';

export default function Navbar() {
  const { user, logout } = useAuth();
  const { count } = useCart();
  const nav = useNavigate();
  return (
    <header className="nav">
      <div className="container nav-inner">
        <Link to="/" className="brand">🛍️ ShopEase</Link>
        <nav className="links">
          <NavLink to="/">Home</NavLink>
          <NavLink to="/products">Shop</NavLink>
          <NavLink to="/cart" className="cart-link">Cart<span className="badge">{count}</span></NavLink>
          {user ? (
            <>
              <NavLink to="/orders">Orders</NavLink>
              <NavLink to="/profile">{user.name.split(' ')[0]}</NavLink>
              <button className="btn ghost" onClick={() => { logout(); nav('/'); }}>Logout</button>
            </>
          ) : (
            <>
              <NavLink to="/login">Login</NavLink>
              <NavLink to="/register" className="btn primary small">Sign up</NavLink>
            </>
          )}
        </nav>
      </div>
    </header>
  );
}
