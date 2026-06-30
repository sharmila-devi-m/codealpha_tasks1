import { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';
import toast from 'react-hot-toast';

export default function Login() {
  const { login } = useAuth();
  const nav = useNavigate();
  const loc = useLocation();
  const [form, setForm] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const submit = async (e) => {
    e.preventDefault(); setLoading(true);
    try { await login(form.email, form.password); toast.success('Welcome back!'); nav(loc.state?.from?.pathname || '/'); }
    catch (err) { toast.error(err.response?.data?.message || 'Login failed'); }
    finally { setLoading(false); }
  };
  return (
    <form onSubmit={submit} className="auth-form">
      <h1>Login</h1>
      <input type="email" required placeholder="Email" value={form.email} onChange={e => setForm({...form, email: e.target.value})}/>
      <input type="password" required placeholder="Password" value={form.password} onChange={e => setForm({...form, password: e.target.value})}/>
      <button className="btn primary block" disabled={loading}>{loading ? '...' : 'Login'}</button>
      <p>No account? <Link to="/register">Sign up</Link></p>
    </form>
  );
}
