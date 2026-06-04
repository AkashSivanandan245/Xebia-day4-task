import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './Auth.css';

const INTERESTS = ['Mathematics', 'Science', 'History', 'Literature', 'Programming', 'Design', 'Music', 'Languages'];

export default function Register() {
  const { register } = useAuth();
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [form, setForm] = useState({ name: '', email: '', password: '', grade: '', interests: [] });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const update = (k, v) => setForm(f => ({ ...f, [k]: v }));

  const toggleInterest = (i) => {
    setForm(f => ({
      ...f,
      interests: f.interests.includes(i) ? f.interests.filter(x => x !== i) : [...f.interests, i]
    }));
  };

  const nextStep = (e) => {
    e.preventDefault();
    setError('');
    if (step === 1) {
      if (!form.name.trim()) return setError('Please enter your full name.');
      if (!form.email.includes('@')) return setError('Enter a valid email.');
      if (form.password.length < 6) return setError('Password must be at least 6 characters.');
      setStep(2);
    } else {
      handleSubmit();
    }
  };

  const handleSubmit = async () => {
    setLoading(true);
    await new Promise(r => setTimeout(r, 800));
    const res = register(form);
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

        <div className="auth-steps">
          {[1,2].map(s => (
            <div key={s} className={`step-dot ${s === step ? 'active' : ''} ${s < step ? 'done' : ''}`} />
          ))}
        </div>

        <h1 className="auth-heading">
          {step === 1 ? 'Create your account' : 'Personalize your journey'}
        </h1>
        <p className="auth-sub">
          {step === 1 ? 'Start learning smarter today' : 'Help us tailor content just for you'}
        </p>

        {error && <div className="auth-error">{error}</div>}

        <form onSubmit={nextStep} className="auth-form">
          {step === 1 && (
            <>
              <div className="field-group">
                <label>Full Name</label>
                <input
                  type="text"
                  placeholder="Alex Johnson"
                  value={form.name}
                  onChange={e => update('name', e.target.value)}
                  autoFocus
                />
              </div>
              <div className="field-group">
                <label>Email Address</label>
                <input
                  type="email"
                  placeholder="alex@school.edu"
                  value={form.email}
                  onChange={e => update('email', e.target.value)}
                />
              </div>
              <div className="field-group">
                <label>Password</label>
                <input
                  type="password"
                  placeholder="Min. 6 characters"
                  value={form.password}
                  onChange={e => update('password', e.target.value)}
                />
              </div>
            </>
          )}

          {step === 2 && (
            <>
              <div className="field-group">
                <label>Grade / Year</label>
                <select value={form.grade} onChange={e => update('grade', e.target.value)}>
                  <option value="">Select your grade</option>
                  {['Grade 6','Grade 7','Grade 8','Grade 9','Grade 10','Grade 11','Grade 12','Undergraduate','Graduate'].map(g => (
                    <option key={g} value={g}>{g}</option>
                  ))}
                </select>
              </div>
              <div className="field-group">
                <label>Interests <span className="optional">(pick any)</span></label>
                <div className="interest-grid">
                  {INTERESTS.map(i => (
                    <button
                      key={i}
                      type="button"
                      className={`interest-chip ${form.interests.includes(i) ? 'selected' : ''}`}
                      onClick={() => toggleInterest(i)}
                    >
                      {i}
                    </button>
                  ))}
                </div>
              </div>
            </>
          )}

          <button type="submit" className="auth-btn" disabled={loading}>
            {loading ? <span className="spinner" /> : step === 1 ? 'Continue →' : 'Create Account'}
          </button>
        </form>

        {step === 2 && (
          <button className="back-btn" onClick={() => setStep(1)}>← Back</button>
        )}

        <p className="auth-footer">
          Already have an account? <Link to="/login">Sign in</Link>
        </p>
      </div>
    </div>
  );
}
