import React, { useState } from 'react';
import AuthLayout from '../components/AuthLayout';

const INTERESTS = ['Web Dev', 'Data Science', 'Design', 'AI & ML', 'Mobile', 'Cloud'];

export default function Register({ onRegister, onLoginClick }) {
  const [form, setForm] = useState({ name: '', email: '', password: '', confirm: '' });
  const [interests, setInterests] = useState([]);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [showPass, setShowPass] = useState(false);

  const set = (key) => (e) => setForm(f => ({ ...f, [key]: e.target.value }));

  const validate = () => {
    const errs = {};
    if (!form.name.trim()) errs.name = 'Name is required.';
    if (!form.email.includes('@')) errs.email = 'Enter a valid email.';
    if (form.password.length < 8) errs.password = 'At least 8 characters.';
    if (form.password !== form.confirm) errs.confirm = 'Passwords do not match.';
    return errs;
  };

  const toggleInterest = (i) => setInterests(prev =>
    prev.includes(i) ? prev.filter(x => x !== i) : [...prev, i]
  );

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errs = validate();
    setErrors(errs);
    if (Object.keys(errs).length) return;
    setLoading(true);
    await new Promise(r => setTimeout(r, 700));
    onRegister({ name: form.name, email: form.email, password: form.password, interests });
  };

  return (
    <AuthLayout>
      <div className="fade-up">
        <h2 style={{ fontFamily: 'Syne', fontSize: 26, fontWeight: 800, marginBottom: 6 }}>Create your account</h2>
        <p style={{ fontSize: 14, color: 'var(--text-secondary)', marginBottom: 28 }}>
          Join thousands of students learning every day.
        </p>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="form-group fade-up fade-up-1">
          <label className="label">Full name</label>
          <input className="input-field" placeholder="Jane Doe" value={form.name} onChange={set('name')} />
          {errors.name && <div className="error-msg">{errors.name}</div>}
        </div>

        <div className="form-group fade-up fade-up-2">
          <label className="label">Email address</label>
          <input className="input-field" type="email" placeholder="you@example.com" value={form.email} onChange={set('email')} />
          {errors.email && <div className="error-msg">{errors.email}</div>}
        </div>

        <div className="form-group fade-up fade-up-3">
          <label className="label">Password</label>
          <div style={{ position: 'relative' }}>
            <input
              className="input-field"
              type={showPass ? 'text' : 'password'}
              placeholder="Min. 8 characters"
              value={form.password}
              onChange={set('password')}
              style={{ paddingRight: 44 }}
            />
            <button type="button" onClick={() => setShowPass(s => !s)} style={{
              position: 'absolute', right: 14, top: '50%', transform: 'translateY(-50%)',
              background: 'none', color: 'var(--text-muted)', fontSize: 13, padding: 0
            }}>
              {showPass ? 'Hide' : 'Show'}
            </button>
          </div>
          {errors.password && <div className="error-msg">{errors.password}</div>}
        </div>

        <div className="form-group fade-up fade-up-4">
          <label className="label">Confirm password</label>
          <input className="input-field" type="password" placeholder="Repeat password" value={form.confirm} onChange={set('confirm')} />
          {errors.confirm && <div className="error-msg">{errors.confirm}</div>}
        </div>

        <div className="form-group fade-up fade-up-5">
          <label className="label">Interests (optional)</label>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginTop: 4 }}>
            {INTERESTS.map(i => (
              <button
                key={i}
                type="button"
                onClick={() => toggleInterest(i)}
                style={{
                  padding: '7px 14px',
                  borderRadius: 20,
                  fontSize: 13,
                  fontWeight: 500,
                  border: `1.5px solid ${interests.includes(i) ? 'var(--brand)' : 'var(--border-dark)'}`,
                  background: interests.includes(i) ? 'var(--brand-light)' : 'transparent',
                  color: interests.includes(i) ? 'var(--brand)' : 'var(--text-secondary)',
                  transition: 'all 0.15s',
                  cursor: 'pointer',
                }}
              >
                {i}
              </button>
            ))}
          </div>
        </div>

        <button className="btn-primary" type="submit" disabled={loading} style={{ opacity: loading ? 0.7 : 1, marginTop: 4 }}>
          {loading ? 'Creating account…' : 'Create account →'}
        </button>
      </form>

      <p style={{ textAlign: 'center', fontSize: 14, color: 'var(--text-secondary)', marginTop: 22 }}>
        Already have an account?{' '}
        <button onClick={onLoginClick} style={{
          background: 'none', color: 'var(--brand)', fontWeight: 600, fontSize: 14, padding: 0, cursor: 'pointer', border: 'none'
        }}>
          Sign in
        </button>
      </p>
    </AuthLayout>
  );
}
