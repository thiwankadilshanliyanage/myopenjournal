import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { authApi } from '../api/authApi';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [authLoading, setAuthLoading] = useState(true);

  const fetchCurrentUser = async () => {
    const token = localStorage.getItem('sakura_note_token');

    if (!token) {
      setAuthLoading(false);
      return;
    }

    try {
      const { data } = await authApi.me();

      // ✅ FIX HERE
      setUser(data.user);

    } catch {
      localStorage.removeItem('sakura_note_token');
      setUser(null);
    } finally {
      setAuthLoading(false);
    }
  };

  useEffect(() => {
    fetchCurrentUser();
  }, []);

  const login = (token, userData) => {
    localStorage.setItem('sakura_note_token', token);
    setUser(userData);
  };

  const logout = () => {
    localStorage.removeItem('sakura_note_token');
    setUser(null);
  };

  const value = useMemo(
    () => ({
      user,
      setUser,
      authLoading,
      login,
      logout,
      fetchCurrentUser,
      isAuthenticated: Boolean(user),
      isAdmin: user?.role === 'admin'
    }),
    [user, authLoading]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export const useAuth = () => useContext(AuthContext);