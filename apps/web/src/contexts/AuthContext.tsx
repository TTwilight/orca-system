'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { User, userApi, auth } from '@/lib/user';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  error: string | null;
  login: (email: string, password: string) => Promise<void>;
  register: (username: string, email: string, password: string) => Promise<void>;
  logout: () => void;
  updateUser: (user: User) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    if (!auth.isAuthenticated()) {
      setLoading(false);
      return;
    }

    try {
      const userData = await userApi.getCurrentUser();
      setUser(userData);
    } catch (err) {
      console.error('认证检查失败:', err);
      auth.clearToken();
    } finally {
      setLoading(false);
    }
  };

  const login = async (email: string, password: string) => {
    try {
      setError(null);
      const response = await userApi.login(email, password);
      auth.setToken(response.token);
      setUser(response.user);
      router.push('/');
    } catch (err) {
      setError(err instanceof Error ? err.message : '登录失败');
      throw err;
    }
  };

  const register = async (username: string, email: string, password: string) => {
    try {
      setError(null);
      const response = await userApi.register({ username, email, password });
      auth.setToken(response.token);
      setUser(response.user);
      router.push('/');
    } catch (err) {
      setError(err instanceof Error ? err.message : '注册失败');
      throw err;
    }
  };

  const logout = () => {
    auth.clearToken();
    setUser(null);
    router.push('/login');
  };

  const updateUser = (updatedUser: User) => {
    setUser(updatedUser);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        error,
        login,
        register,
        logout,
        updateUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}