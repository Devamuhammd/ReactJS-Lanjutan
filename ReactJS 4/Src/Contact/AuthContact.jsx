import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [role, setRole] = useState(null); // 'user' atau 'admin'

  useEffect(() => {
    const savedRole = localStorage.getItem('role');
    if (savedRole) setRole(savedRole);
  }, []);

  const loginAs = (userRole) => {
    setRole(userRole);
    localStorage.setItem('role', userRole);
  };

  const logout = () => {
    setRole(null);
    localStorage.removeItem('role');
  };

  return (
    <AuthContext.Provider value={{ role, loginAs, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
