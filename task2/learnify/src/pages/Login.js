import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './Auth.css';

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPw, setShowPw] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    if (!form.email || !form.password) return setError('Please fill in all fields.');
    setLoading(true);
    await new Promise(r => setTimeout(r, 700));
    const res = login(form);
    setLoading(false);
    if (res.success) navigate('/dashboard');
    else setError(res.error);
  };

  return (
    <div className="auth-wrapper">
      <div className="auth-glow auth-glow--purple" />
      <div className="auth-glow auth-glow--teal" />

      <div className="auth-card">
        <div className="auth-brand">
          <span className="brand-icon">✦</span>
          <span className="brand-name">Learnify</span>
        </div>

        <h1 className="auth-heading">Welcome back</h1>
        <p className="auth-sub">Continue your learning journey</p>

        {error && <div className="auth-error">{error}</div>}

        <form onSubmit={handleSubmit} className="auth-form">
          <div className="field-group">
            <label>Email Address</label>
            <input
              type="email"
              placeholder="your@email.com"
              value={form.email}
              onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
              autoFocus
            />
          </div>

          <div className="field-group">
            <label>
              Password
              <button type="button" className="pw-toggle" onClick={() => setShowPw(s => !s)}>
                {showPw ? 'Hide' : 'Show'}
              </button>
            </label>
            <input
              type={showPw ? 'text' : 'password'}
              placeholder="Your password"
              value={form.password}
              onChange={e => setForm(f => ({ ...f, password: e.target.value }))}
            />
          </div>

          <button type="submit" className="auth-btn" disabled={loading}>
            {loading ? <span className="spinner" /> : 'Sign In'}
          </button>
        </form>

        <p className="auth-footer">
          Don't have an account? <Link to="/register">Sign up free</Link>
        </p>
      </div>
    </div>
  );
}
