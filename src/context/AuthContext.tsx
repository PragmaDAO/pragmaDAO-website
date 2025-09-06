import React, { createContext, useState, useEffect, useContext, ReactNode } from 'react';
import { jwtDecode } from 'jwt-decode';

interface AuthContextType {
  user: { id: string; username: string } | null;
  token: string | null; // Add token property
  login: (token: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<{ id: string; username: string } | null>(null);
  const [token, setToken] = useState<string | null>(() => {
    const storedToken = localStorage.getItem('token');
    const urlParams = new URLSearchParams(window.location.search);
    const tokenFromUrl = urlParams.get('token');

    if (tokenFromUrl) {
      localStorage.setItem('token', tokenFromUrl);
      // Clean the URL after getting the token
      window.history.replaceState({}, document.title, window.location.pathname);
      return tokenFromUrl;
    } else if (storedToken) {
      return storedToken;
    }
    return null;
  });

  useEffect(() => {
    console.log('AuthContext useEffect running');
    if (token) {
      console.log('Token found:', token);
      try {
        const decoded: any = jwtDecode(token);
        if (decoded.exp * 1000 < Date.now()) {
          console.log('Token expired');
          localStorage.removeItem('token');
          setUser(null);
          setToken(null);
        } else {
          console.log('Token valid, setting user:', decoded.username);
          setUser({ id: decoded.id, username: decoded.username });
        }
      } catch (error) {
        console.error("Error decoding token:", error);
        localStorage.removeItem('token');
        setUser(null);
        setToken(null);
      }
    } else {
      console.log('No token found');
      setUser(null);
      setToken(null);
    }
  }, [token]);

  const login = (newToken: string) => {
    console.log('Login function called');
    localStorage.setItem('token', newToken);
    setToken(newToken);
    const decoded: any = jwtDecode(newToken);
    setUser({ id: decoded.id, username: decoded.username });
  };

  const logout = () => {
    console.log('Logout function called');
    localStorage.removeItem('token');
    setToken(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
