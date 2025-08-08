// 用户相关的类型定义
export interface User {
  id: string;
  username: string;
  email: string;
  fullName?: string;
  avatar?: string;
  createdAt: string;
  updatedAt: string;
}

export interface LoginResponse {
  token: string;
  user: User;
}

export interface ApiResponse<T = any> {
  success: boolean;
  message?: string;
  data?: T;
}

// API 请求函数
const API_BASE_URL = 'http://localhost:8080';

export async function fetchWithAuth<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  const token = localStorage.getItem('token');
  
  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      'Authorization': token ? `Bearer ${token}` : '',
      ...options.headers,
    },
  });

  if (response.status === 401) {
    localStorage.removeItem('token');
    window.location.href = '/login';
    throw new Error('未授权访问');
  }

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || '请求失败');
  }

  return data;
}

// 用户相关的 API 函数
export const userApi = {
  login: async (email: string, password: string): Promise<LoginResponse> => {
    return fetchWithAuth<LoginResponse>('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });
  },

  register: async (userData: {
    username: string;
    email: string;
    password: string;
  }): Promise<LoginResponse> => {
    return fetchWithAuth<LoginResponse>('/auth/register', {
      method: 'POST',
      body: JSON.stringify(userData),
    });
  },

  forgotPassword: async (email: string): Promise<ApiResponse> => {
    return fetchWithAuth<ApiResponse>('/auth/forgot-password', {
      method: 'POST',
      body: JSON.stringify({ email }),
    });
  },

  resetPassword: async (token: string, password: string): Promise<ApiResponse> => {
    return fetchWithAuth<ApiResponse>('/auth/reset-password', {
      method: 'POST',
      body: JSON.stringify({ token, password }),
    });
  },

  getCurrentUser: async (): Promise<User> => {
    return fetchWithAuth<User>('/user/detail', {
      method: 'POST',
      body: JSON.stringify({ id: 'current' }),
    });
  },

  updateProfile: async (userId: string, data: Partial<User>): Promise<User> => {
    return fetchWithAuth<User>('/user/update', {
      method: 'POST',
      body: JSON.stringify({ id: userId, ...data }),
    });
  },

  getUsers: async (): Promise<User[]> => {
    return fetchWithAuth<User[]>('/user/list', {
      method: 'POST',
    });
  },

  deleteUser: async (userId: string): Promise<ApiResponse> => {
    return fetchWithAuth<ApiResponse>('/user/delete', {
      method: 'POST',
      body: JSON.stringify({ id: userId }),
    });
  },
};

// 用户认证相关的工具函数
export const auth = {
  isAuthenticated: (): boolean => {
    return !!localStorage.getItem('token');
  },

  getToken: (): string | null => {
    return localStorage.getItem('token');
  },

  setToken: (token: string): void => {
    localStorage.setItem('token', token);
  },

  clearToken: (): void => {
    localStorage.removeItem('token');
  },

  logout: (): void => {
    localStorage.removeItem('token');
    window.location.href = '/login';
  },
};