import React from 'react';

const DOTS = [
  { size: 320, top: '-80px', left: '-80px', opacity: 0.07 },
  { size: 200, bottom: '60px', right: '-60px', opacity: 0.09 },
  { size: 140, top: '40%', right: '18%', opacity: 0.05 },
];

export default function AuthLayout({ children }) {
  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '24px',
      background: 'var(--bg)',
      position: 'relative',
      overflow: 'hidden',
    }}>
      {/* decorative blobs */}
      {DOTS.map((d, i) => (
        <div key={i} style={{
          position: 'absolute',
          width: d.size,
          height: d.size,
          borderRadius: '50%',
          background: 'var(--brand)',
          opacity: d.opacity,
          top: d.top,
          left: d.left,
          bottom: d.bottom,
          right: d.right,
          pointerEvents: 'none',
        }} />
      ))}

      {/* left panel — branding */}
      <div style={{
        display: 'none',
        flexDirection: 'column',
        justifyContent: 'center',
        maxWidth: 420,
        marginRight: 64,
      }} className="auth-left">
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 40 }}>
          <LogoMark />
          <span style={{ fontFamily: 'Syne', fontSize: 22, fontWeight: 800, color: 'var(--brand)' }}>Learnify</span>
        </div>
        <h1 style={{ fontSize: 40, fontWeight: 800, lineHeight: 1.15, marginBottom: 20, color: 'var(--text-primary)' }}>
          Your learning<br />journey starts<br />
          <span style={{ color: 'var(--brand)' }}>right here.</span>
        </h1>
        <p style={{ fontSize: 16, color: 'var(--text-secondary)', lineHeight: 1.7 }}>
          Access 500+ courses, track your progress, earn certificates and connect with a community of learners worldwide.
        </p>
        <div style={{ display: 'flex', gap: 32, marginTop: 40 }}>
          {[['500+', 'Courses'], ['48K', 'Students'], ['98%', 'Satisfaction']].map(([val, label]) => (
            <div key={label}>
              <div style={{ fontFamily: 'Syne', fontSize: 28, fontWeight: 800, color: 'var(--brand)' }}>{val}</div>
              <div style={{ fontSize: 13, color: 'var(--text-muted)', marginTop: 2 }}>{label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* card */}
      <div style={{
        background: 'var(--surface)',
        borderRadius: 24,
        padding: '40px 36px',
        width: '100%',
        maxWidth: 440,
        boxShadow: 'var(--shadow-lg)',
        position: 'relative',
        zIndex: 1,
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 9, marginBottom: 32 }}>
          <LogoMark />
          <span style={{ fontFamily: 'Syne', fontSize: 19, fontWeight: 800, color: 'var(--brand)' }}>Learnify</span>
        </div>
        {children}
      </div>

      <style>{`
        @media (min-width: 900px) {
          .auth-left { display: flex !important; }
        }
      `}</style>
    </div>
  );
}

function LogoMark() {
  return (
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
      <rect width="32" height="32" rx="10" fill="#6C47FF" />
      <path d="M8 22L16 10L24 22" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M11 18H21" stroke="white" strokeWidth="2.5" strokeLinecap="round" />
    </svg>
  );
}
