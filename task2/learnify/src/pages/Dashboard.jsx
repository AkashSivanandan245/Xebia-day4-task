import React, { useState } from 'react';

const COURSES = [
  { id: 1, title: 'React — The Complete Guide', category: 'Web Dev', progress: 72, lessons: 54, color: '#6C47FF', emoji: '⚛️', instructor: 'Sarah Chen', xp: 820 },
  { id: 2, title: 'Python for Data Science', category: 'Data Science', progress: 45, lessons: 80, color: '#FF6B35', emoji: '🐍', instructor: 'Dr. Amir Patel', xp: 510 },
  { id: 3, title: 'UI/UX Design Fundamentals', category: 'Design', progress: 91, lessons: 36, color: '#1DB97A', emoji: '🎨', instructor: 'Mia Torres', xp: 940 },
  { id: 4, title: 'Machine Learning A–Z', category: 'AI & ML', progress: 18, lessons: 110, color: '#F5A623', emoji: '🤖', instructor: 'Prof. Lee', xp: 190 },
];

const ACTIVITY = [
  { day: 'Mon', mins: 45 }, { day: 'Tue', mins: 80 }, { day: 'Wed', mins: 30 },
  { day: 'Thu', mins: 95 }, { day: 'Fri', mins: 60 }, { day: 'Sat', mins: 110 }, { day: 'Sun', mins: 20 },
];

const ACHIEVEMENTS = [
  { icon: '🔥', title: '7-day streak', desc: 'You learned every day this week!' },
  { icon: '⚡', title: 'Fast learner', desc: 'Completed 3 lessons in one day' },
  { icon: '🏆', title: 'Top scorer', desc: 'Scored 100% on React quiz' },
];

const UPCOMING = [
  { title: 'React Hooks Deep Dive', course: 'React Guide', time: 'Today, 3:00 PM' },
  { title: 'NumPy Arrays', course: 'Python DS', time: 'Tomorrow, 10:00 AM' },
  { title: 'Live Q&A with Sarah Chen', course: 'React Guide', time: 'Thu, 6:00 PM' },
];

const NAV_ITEMS = [
  { icon: '⊞', label: 'Dashboard', id: 'dashboard' },
  { icon: '📚', label: 'My Courses', id: 'courses' },
  { icon: '🗓', label: 'Schedule', id: 'schedule' },
  { icon: '🏅', label: 'Certificates', id: 'certs' },
  { icon: '⚙️', label: 'Settings', id: 'settings' },
];

const maxMins = Math.max(...ACTIVITY.map(a => a.mins));

export default function Dashboard({ user, onLogout }) {
  const [activeNav, setActiveNav] = useState('dashboard');
  const [sideOpen, setSideOpen] = useState(false);
  const initials = user?.name?.split(' ').map(n => n[0]).join('').toUpperCase().slice(0,2) || 'U';
  const totalXP = COURSES.reduce((s, c) => s + c.xp, 0);

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: 'var(--bg)' }}>
      {/* Sidebar */}
      <aside style={{
        width: 240,
        background: 'var(--surface)',
        borderRight: '1px solid var(--border)',
        display: 'flex',
        flexDirection: 'column',
        padding: '24px 0',
        position: 'fixed',
        top: 0, left: sideOpen ? 0 : '-240px',
        height: '100vh',
        zIndex: 100,
        transition: 'left 0.3s ease',
        boxShadow: sideOpen ? 'var(--shadow-lg)' : 'none',
      }} className="sidebar">
        <div style={{ padding: '0 24px', marginBottom: 32 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 9 }}>
            <svg width="30" height="30" viewBox="0 0 32 32" fill="none">
              <rect width="32" height="32" rx="10" fill="#6C47FF" />
              <path d="M8 22L16 10L24 22" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M11 18H21" stroke="white" strokeWidth="2.5" strokeLinecap="round" />
            </svg>
            <span style={{ fontFamily: 'Syne', fontSize: 18, fontWeight: 800, color: 'var(--brand)' }}>Learnify</span>
          </div>
        </div>

        <nav style={{ flex: 1, padding: '0 12px' }}>
          {NAV_ITEMS.map(item => (
            <button key={item.id} onClick={() => { setActiveNav(item.id); setSideOpen(false); }} style={{
              display: 'flex', alignItems: 'center', gap: 12, width: '100%',
              padding: '11px 16px', borderRadius: 10, marginBottom: 4, cursor: 'pointer',
              background: activeNav === item.id ? 'var(--brand-light)' : 'transparent',
              color: activeNav === item.id ? 'var(--brand)' : 'var(--text-secondary)',
              fontWeight: activeNav === item.id ? 600 : 400,
              fontSize: 14, border: 'none', textAlign: 'left',
              transition: 'all 0.15s',
            }}>
              <span style={{ fontSize: 16 }}>{item.icon}</span>
              {item.label}
            </button>
          ))}
        </nav>

        <div style={{ padding: '16px 24px', borderTop: '1px solid var(--border)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 14 }}>
            <div style={{
              width: 36, height: 36, borderRadius: '50%', background: 'var(--brand)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              color: '#fff', fontWeight: 700, fontSize: 13
            }}>{initials}</div>
            <div>
              <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--text-primary)' }}>{user?.name}</div>
              <div style={{ fontSize: 11, color: 'var(--text-muted)' }}>{user?.email}</div>
            </div>
          </div>
          <button onClick={onLogout} style={{
            width: '100%', padding: '9px', borderRadius: 8, border: '1px solid var(--border-dark)',
            background: 'transparent', color: 'var(--text-secondary)', fontSize: 13, cursor: 'pointer'
          }}>Sign out</button>
        </div>
      </aside>

      {/* overlay for mobile */}
      {sideOpen && <div onClick={() => setSideOpen(false)} style={{
        position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.3)', zIndex: 90
      }} />}

      {/* Main */}
      <main style={{ flex: 1, marginLeft: 0, padding: '24px 20px', maxWidth: '100%' }} className="main-content">

        {/* Top bar */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 28 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
            <button onClick={() => setSideOpen(s => !s)} className="menu-btn" style={{
              background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 8,
              width: 38, height: 38, fontSize: 18, cursor: 'pointer', display: 'flex',
              alignItems: 'center', justifyContent: 'center'
            }}>☰</button>
            <div>
              <h1 style={{ fontFamily: 'Syne', fontSize: 20, fontWeight: 800, color: 'var(--text-primary)' }}>
                Hello, {user?.name?.split(' ')[0]} 👋
              </h1>
              <p style={{ fontSize: 13, color: 'var(--text-muted)', marginTop: 2 }}>Keep up the great work!</p>
            </div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <div style={{
              background: 'var(--brand-light)', border: '1px solid var(--border-dark)',
              borderRadius: 20, padding: '6px 14px', fontSize: 13, color: 'var(--brand)', fontWeight: 600
            }}>
              ⚡ {totalXP.toLocaleString()} XP
            </div>
            <div style={{
              width: 36, height: 36, borderRadius: '50%', background: 'var(--brand)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              color: '#fff', fontWeight: 700, fontSize: 13
            }}>{initials}</div>
          </div>
        </div>

        {/* Stats row */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: 14, marginBottom: 28 }}>
          {[
            { label: 'Active Courses', value: COURSES.length, icon: '📚', color: '#6C47FF', bg: '#EEE9FF' },
            { label: 'Hours Learned', value: '34h', icon: '⏱', color: '#1DB97A', bg: '#E1F5EE' },
            { label: 'Avg. Progress', value: `${Math.round(COURSES.reduce((s,c)=>s+c.progress,0)/COURSES.length)}%`, icon: '📈', color: '#FF6B35', bg: '#FFF0EA' },
            { label: 'Certificates', value: 1, icon: '🏅', color: '#F5A623', bg: '#FAEEDA' },
          ].map(stat => (
            <div key={stat.label} style={{
              background: 'var(--surface)', borderRadius: var_radius,
              border: '1px solid var(--border)', padding: '16px',
              display: 'flex', alignItems: 'center', gap: 12
            }}>
              <div style={{ width: 40, height: 40, borderRadius: 10, background: stat.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18, flexShrink: 0 }}>
                {stat.icon}
              </div>
              <div>
                <div style={{ fontFamily: 'Syne', fontSize: 22, fontWeight: 800, color: stat.color, lineHeight: 1 }}>{stat.value}</div>
                <div style={{ fontSize: 12, color: 'var(--text-muted)', marginTop: 3 }}>{stat.label}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Two column layout */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: 20 }} className="grid-two">

          {/* My Courses */}
          <section>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 14 }}>
              <h2 style={{ fontFamily: 'Syne', fontSize: 17, fontWeight: 700 }}>My Courses</h2>
              <button style={{ background: 'none', border: 'none', color: 'var(--brand)', fontSize: 13, fontWeight: 600, cursor: 'pointer' }}>View all →</button>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              {COURSES.map((c, i) => (
                <div key={c.id} className={`fade-up fade-up-${i+1}`} style={{
                  background: 'var(--surface)', borderRadius: 14,
                  border: '1px solid var(--border)', padding: '16px',
                  cursor: 'pointer', transition: 'box-shadow 0.2s',
                }}
                  onMouseEnter={e => e.currentTarget.style.boxShadow = 'var(--shadow)'}
                  onMouseLeave={e => e.currentTarget.style.boxShadow = 'none'}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                    <div style={{ width: 44, height: 44, borderRadius: 12, background: c.color + '18', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20, flexShrink: 0 }}>
                      {c.emoji}
                    </div>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 8 }}>
                        <div>
                          <div style={{ fontSize: 14, fontWeight: 600, color: 'var(--text-primary)', lineHeight: 1.3 }}>{c.title}</div>
                          <div style={{ fontSize: 12, color: 'var(--text-muted)', marginTop: 3 }}>{c.instructor} · {c.lessons} lessons</div>
                        </div>
                        <span style={{ fontSize: 13, fontWeight: 700, color: c.color, flexShrink: 0 }}>{c.progress}%</span>
                      </div>
                      <div style={{ marginTop: 10, height: 5, background: 'var(--bg)', borderRadius: 99, overflow: 'hidden' }}>
                        <div style={{ height: '100%', width: `${c.progress}%`, background: c.color, borderRadius: 99, transition: 'width 0.6s ease' }} />
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Right column */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>

            {/* Weekly Activity */}
            <section style={{ background: 'var(--surface)', borderRadius: 14, border: '1px solid var(--border)', padding: '20px' }}>
              <h2 style={{ fontFamily: 'Syne', fontSize: 17, fontWeight: 700, marginBottom: 16 }}>Weekly Activity</h2>
              <div style={{ display: 'flex', alignItems: 'flex-end', gap: 8, height: 80 }}>
                {ACTIVITY.map(a => (
                  <div key={a.day} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 5 }}>
                    <div style={{
                      width: '100%', borderRadius: 6,
                      height: `${Math.round((a.mins / maxMins) * 64)}px`,
                      background: a.mins === maxMins ? 'var(--brand)' : 'var(--brand-light)',
                      transition: 'height 0.4s ease',
                    }} title={`${a.mins} min`} />
                    <span style={{ fontSize: 10, color: 'var(--text-muted)' }}>{a.day}</span>
                  </div>
                ))}
              </div>
              <div style={{ marginTop: 12, fontSize: 12, color: 'var(--text-muted)' }}>
                Total this week: <strong style={{ color: 'var(--brand)' }}>{ACTIVITY.reduce((s,a) => s+a.mins, 0)} min</strong>
              </div>
            </section>

            {/* Upcoming */}
            <section style={{ background: 'var(--surface)', borderRadius: 14, border: '1px solid var(--border)', padding: '20px' }}>
              <h2 style={{ fontFamily: 'Syne', fontSize: 17, fontWeight: 700, marginBottom: 14 }}>Upcoming</h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                {UPCOMING.map((u, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '10px 12px', borderRadius: 10, background: 'var(--bg)' }}>
                    <div style={{ width: 8, height: 8, borderRadius: '50%', background: 'var(--brand)', flexShrink: 0 }} />
                    <div style={{ flex: 1 }}>
                      <div style={{ fontSize: 13, fontWeight: 600 }}>{u.title}</div>
                      <div style={{ fontSize: 11, color: 'var(--text-muted)', marginTop: 1 }}>{u.course}</div>
                    </div>
                    <div style={{ fontSize: 11, color: 'var(--brand)', fontWeight: 500, textAlign: 'right' }}>{u.time}</div>
                  </div>
                ))}
              </div>
            </section>

            {/* Achievements */}
            <section style={{ background: 'var(--surface)', borderRadius: 14, border: '1px solid var(--border)', padding: '20px' }}>
              <h2 style={{ fontFamily: 'Syne', fontSize: 17, fontWeight: 700, marginBottom: 14 }}>Achievements</h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                {ACHIEVEMENTS.map((a, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                    <div style={{ width: 36, height: 36, borderRadius: 10, background: 'var(--brand-light)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18, flexShrink: 0 }}>
                      {a.icon}
                    </div>
                    <div>
                      <div style={{ fontSize: 13, fontWeight: 600 }}>{a.title}</div>
                      <div style={{ fontSize: 11, color: 'var(--text-muted)' }}>{a.desc}</div>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </div>
        </div>
      </main>

      <style>{`
        @media (min-width: 860px) {
          .sidebar { left: 0 !important; box-shadow: none !important; }
          .menu-btn { display: none !important; }
          .main-content { margin-left: 240px !important; padding: 32px 36px !important; }
          .grid-two { grid-template-columns: 1fr 1fr !important; }
        }
      `}</style>
    </div>
  );
}

// fix: use a JS string since JSX can't use raw CSS var
const var_radius = 'var(--radius-sm)';
