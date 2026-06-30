import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';
import toast from 'react-hot-toast';

export default function Register() {
  const { register } = useAuth();
  const nav = useNavigate();
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const submit = async (e) => {
    e.preventDefault();
    if (form.password.length < 6) return toast.error('Password must be 6+ chars');
    setLoading(true);
    try { await register(form.name, form.email, form.password); toast.success('Account created'); nav('/'); }
    catch (err) { toast.error(err.response?.data?.message || 'Register failed'); }
    finally { setLoading(false); }
  };
  return (
    <form onSubmit={submit} className="auth-form">
      <h1>Create account</h1>
      <input required placeholder="Full name" value={form.name} onChange={e => setForm({...form, name: e.target.value})}/>
      <input type="email" required placeholder="Email" value={form.email} onChange={e => setForm({...form, email: e.target.value})}/>
      <input type="password" required placeholder="Password (6+ chars)" value={form.password} onChange={e => setForm({...form, password: e.target.value})}/>
      <button className="btn primary block" disabled={loading}>{loading ? '...' : 'Sign up'}</button>
      <p>Have an account? <Link to="/login">Login</Link></p>
    </form>
  );
}
