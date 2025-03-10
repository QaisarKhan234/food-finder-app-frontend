import React, { createContext, useState } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null); // Store user info
  const [favorites, setFavorites] = useState([]); // Store favorite books

  const login = (userData) => {
    setUser(userData);
    localStorage.setItem('token', userData.accesstoken);
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('token');
  };

  const updateFavorites = (newFavorites) => {
    setFavorites(newFavorites);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, favorites, updateFavorites }}>
      {children}
    </AuthContext.Provider>
  );
};
