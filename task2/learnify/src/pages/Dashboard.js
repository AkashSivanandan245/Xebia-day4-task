import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import './Dashboard.css';

const COURSES = [
  { id:1, title:'Introduction to Calculus', subject:'Mathematics', progress:72, lessons:24, color:'#6c63ff', emoji:'∫' },
  { id:2, title:'World History: Modern Era', subject:'History', progress:45, lessons:18, color:'#f59e0b', emoji:'🌍' },
  { id:3, title:'Python for Beginners', subject:'Programming', progress:88, lessons:30, color:'#2dd4bf', emoji:'⌨️' },
  { id:4, title:'Creative Writing 101', subject:'Literature', progress:20, lessons:12, color:'#f43f5e', emoji:'✍️' },
];

const ACTIVITIES = [
  { id:1, text:'Completed Lesson 8 in Calculus', time:'2h ago', type:'complete' },
  { id:2, text:'Earned "Streak Master" badge', time:'5h ago', type:'badge' },
  { id:3, text:'Started Python Chapter 4', time:'Yesterday', type:'start' },
  { id:4, text:'Quiz score: 94% in History', time:'2 days ago', type:'quiz' },
];

const UPCOMING = [
  { id:1, title:'Calculus: Derivatives Quiz', due:'Tomorrow', subject:'Mathematics' },
  { id:2, title:'History Essay Submission', due:'In 3 days', subject:'History' },
  { id:3, title:'Python Project Milestone', due:'In 5 days', subject:'Programming' },
];

const STATS = [
  { label:'Study Streak', value:'12', unit:'days', icon:'🔥' },
  { label:'Lessons Done', value:'47', unit:'total', icon:'📚' },
  { label:'Avg. Score', value:'87', unit:'percent', icon:'⭐' },
  { label:'Hours Learned', value:'36', unit:'hrs', icon:'⏱' },
];

export default function Dashboard() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('overview');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const firstName = user?.name?.split(' ')[0] || 'Student';
  const hour = new Date().getHours();
  const greeting = hour < 12 ? 'Good morning' : hour < 17 ? 'Good afternoon' : 'Good evening';

  return (
    <div className="dash-layout">
      {/* Sidebar */}
      <aside className={`dash-sidebar ${sidebarOpen ? 'open' : ''}`}>
        <div className="sidebar-brand">
          <span className="brand-icon">✦</span>
          <span>Learnify</span>
        </div>

        <nav className="sidebar-nav">
          {[
            { id:'overview', label:'Overview', icon:'⊞' },
            { id:'courses', label:'My Courses', icon:'📖' },
            { id:'schedule', label:'Schedule', icon:'📅' },
            { id:'progress', label:'Progress', icon:'📊' },
          ].map(item => (
            <button
              key={item.id}
              className={`nav-item ${activeTab === item.id ? 'active' : ''}`}
              onClick={() => { setActiveTab(item.id); setSidebarOpen(false); }}
            >
              <span className="nav-icon">{item.icon}</span>
              <span>{item.label}</span>
            </button>
          ))}
        </nav>

        <div className="sidebar-footer">
          <div className="user-pill">
            <div className="user-avatar">{firstName[0]}</div>
            <div className="user-info">
              <p className="user-name">{user?.name}</p>
              <p className="user-grade">{user?.grade || 'Student'}</p>
            </div>
          </div>
          <button className="logout-btn" onClick={handleLogout}>Sign out</button>
        </div>
      </aside>

      {sidebarOpen && <div className="sidebar-overlay" onClick={() => setSidebarOpen(false)} />}

      {/* Main */}
      <main className="dash-main">
        <header className="dash-header">
          <button className="menu-btn" onClick={() => setSidebarOpen(true)}>☰</button>
          <div className="header-greeting">
            <h2>{greeting}, {firstName} 👋</h2>
            <p>{new Date().toLocaleDateString('en-US', { weekday:'long', month:'long', day:'numeric' })}</p>
          </div>
          <div className="header-actions">
            <button className="notif-btn">🔔</button>
          </div>
        </header>

        <div className="dash-content">
          {/* Stats Row */}
          <div className="stats-grid">
            {STATS.map(s => (
              <div key={s.label} className="stat-card">
                <span className="stat-icon">{s.icon}</span>
                <div>
                  <p className="stat-value">{s.value}<span className="stat-unit">{s.unit}</span></p>
                  <p className="stat-label">{s.label}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="dash-grid">
            {/* Courses */}
            <section className="dash-section courses-section">
              <div className="section-header">
                <h3>Continue Learning</h3>
                <button className="see-all">See all →</button>
              </div>
              <div className="courses-list">
                {COURSES.map(c => (
                  <div key={c.id} className="course-card">
                    <div className="course-emoji" style={{ background: c.color + '22', color: c.color }}>
                      {c.emoji}
                    </div>
                    <div className="course-info">
                      <p className="course-title">{c.title}</p>
                      <p className="course-subject">{c.subject} · {c.lessons} lessons</p>
                      <div className="progress-bar">
                        <div className="progress-fill" style={{ width: c.progress + '%', background: c.color }} />
                      </div>
                      <p className="progress-label">{c.progress}% complete</p>
                    </div>
                    <button className="resume-btn" style={{ color: c.color, borderColor: c.color + '44', background: c.color + '11' }}>
                      ▶
                    </button>
                  </div>
                ))}
              </div>
            </section>

            {/* Right Column */}
            <div className="dash-right">
              {/* Upcoming */}
              <section className="dash-section">
                <div className="section-header">
                  <h3>Upcoming</h3>
                </div>
                <div className="upcoming-list">
                  {UPCOMING.map(u => (
                    <div key={u.id} className="upcoming-item">
                      <div className="upcoming-dot" />
                      <div>
                        <p className="upcoming-title">{u.title}</p>
                        <p className="upcoming-meta">{u.subject} · <span className="upcoming-due">{u.due}</span></p>
                      </div>
                    </div>
                  ))}
                </div>
              </section>

              {/* Activity */}
              <section className="dash-section">
                <div className="section-header">
                  <h3>Recent Activity</h3>
                </div>
                <div className="activity-list">
                  {ACTIVITIES.map(a => (
                    <div key={a.id} className="activity-item">
                      <div className={`activity-dot type-${a.type}`} />
                      <div>
                        <p className="activity-text">{a.text}</p>
                        <p className="activity-time">{a.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
