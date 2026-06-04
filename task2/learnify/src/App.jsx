import React, { useState } from 'react';
import './index.css';
import Register from './pages/Register';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';

export default function App() {
  const [page, setPage] = useState('login');
  const [user, setUser] = useState(null);
  const [users, setUsers] = useState([
    { name: 'Demo User', email: 'demo@learnify.com', password: 'demo1234' }
  ]);

  const handleRegister = (data) => {
    setUsers(prev => [...prev, data]);
    setUser(data);
    setPage('dashboard');
  };

  const handleLogin = (email, password) => {
    const found = users.find(u => u.email === email && u.password === password);
    if (found) {
      setUser(found);
      setPage('dashboard');
      return true;
    }
    return false;
  };

  const handleLogout = () => {
    setUser(null);
    setPage('login');
  };

  if (page === 'dashboard') return <Dashboard user={user} onLogout={handleLogout} />;
  if (page === 'register') return <Register onRegister={handleRegister} onLoginClick={() => setPage('login')} />;
  return <Login onLogin={handleLogin} onRegisterClick={() => setPage('register')} />;
}
