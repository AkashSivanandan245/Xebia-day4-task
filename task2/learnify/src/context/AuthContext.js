import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    try {
      const saved = localStorage.getItem('learnify_user');
      return saved ? JSON.parse(saved) : null;
    } catch { return null; }
  });

  const register = (userData) => {
    const users = JSON.parse(localStorage.getItem('learnify_users') || '[]');
    const exists = users.find(u => u.email === userData.email);
    if (exists) return { success: false, error: 'Email already registered.' };
    const newUser = { ...userData, id: Date.now(), joinedAt: new Date().toISOString() };
    users.push(newUser);
    localStorage.setItem('learnify_users', JSON.stringify(users));
    localStorage.setItem('learnify_user', JSON.stringify(newUser));
    setUser(newUser);
    return { success: true };
  };

  const login = ({ email, password }) => {
    const users = JSON.parse(localStorage.getItem('learnify_users') || '[]');
    const found = users.find(u => u.email === email && u.password === password);
    if (found) {
      localStorage.setItem('learnify_user', JSON.stringify(found));
      setUser(found);
      return { success: true };
    }
    return { success: false, error: 'Invalid email or password.' };
  };

  const logout = () => {
    localStorage.removeItem('learnify_user');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, register, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
