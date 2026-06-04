import React, { useState } from 'react';
import AuthLayout from '../components/AuthLayout';

export default function Login({ onLogin, onRegisterClick }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPass, setShowPass] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    if (!email || !password) { setError('Please fill in all fields.'); return; }
    setLoading(true);
    await new Promise(r => setTimeout(r, 600));
    const ok = onLogin(email, password);
    if (!ok) { setError('Invalid email or password.'); setLoading(false); }
  };

  return (
    <AuthLayout>
      <div className="fade-up">
        <h2 style={{ fontFamily: 'Syne', fontSize: 26, fontWeight: 800, marginBottom: 6 }}>Welcome back 👋</h2>
        <p style={{ fontSize: 14, color: 'var(--text-secondary)', marginBottom: 28 }}>
          Sign in to continue your learning journey.
        </p>
      </div>

      {/* Demo hint */}
      <div className="fade-up fade-up-1" style={{
        background: 'var(--brand-light)', border: '1px solid var(--border-dark)',
        borderRadius: 10, padding: '10px 14px', marginBottom: 22, fontSize: 13, color: 'var(--brand)'
      }}>
        <strong>Demo:</strong> demo@learnify.com / demo1234
      </div>

      <form onSubmit={handleSubmit}>
        <div className="form-group fade-up fade-up-2">
          <label className="label">Email address</label>
          <input
            className="input-field"
            type="email"
            placeholder="you@example.com"
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
        </div>

        <div className="form-group fade-up fade-up-3">
          <label className="label">Password</label>
          <div style={{ position: 'relative' }}>
            <input
              className="input-field"
              type={showPass ? 'text' : 'password'}
              placeholder="Your password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              style={{ paddingRight: 44 }}
            />
            <button type="button" onClick={() => setShowPass(s => !s)} style={{
              position: 'absolute', right: 14, top: '50%', transform: 'translateY(-50%)',
              background: 'none', color: 'var(--text-muted)', fontSize: 13, padding: 0
            }}>
              {showPass ? 'Hide' : 'Show'}
            </button>
          </div>
        </div>

        {error && <div className="error-msg" style={{ marginBottom: 14, fontSize: 13 }}>{error}</div>}

        <div className="fade-up fade-up-4">
          <button className="btn-primary" type="submit" disabled={loading} style={{ opacity: loading ? 0.7 : 1 }}>
            {loading ? 'Signing in…' : 'Sign in →'}
          </button>
        </div>
      </form>

      <p className="fade-up fade-up-5" style={{ textAlign: 'center', fontSize: 14, color: 'var(--text-secondary)', marginTop: 22 }}>
        New to Learnify?{' '}
        <button onClick={onRegisterClick} style={{
          background: 'none', color: 'var(--brand)', fontWeight: 600, fontSize: 14, padding: 0,
          cursor: 'pointer', border: 'none'
        }}>
          Create account
        </button>
      </p>
    </AuthLayout>
  );
}
