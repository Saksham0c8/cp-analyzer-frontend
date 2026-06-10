import axios from 'axios';
import type { DashboardResponse, AuthResponse, RegisterData, LoginData } from '../types/dashboard';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'https://cp-analyzer-backend-0xdh.onrender.com';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add token to requests if available
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Handle auth errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      localStorage.removeItem('appUsername');
      localStorage.removeItem('leetcodeUsername');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export const authApi = {
  register: async (data: RegisterData): Promise<AuthResponse> => {
    const response = await api.post<AuthResponse>('/auth/register', data);
    return response.data;
  },

  login: async (data: LoginData): Promise<AuthResponse> => {
    const response = await api.post<AuthResponse>('/auth/login', data);
    return response.data;
  },
};

export const leetcodeApi = {
  importRecent: async (appUsername: string, leetcodeUsername: string): Promise<string> => {
    const response = await api.post<string>(
      `/api/leetcode/import/${appUsername}/${leetcodeUsername}`
    );
    return response.data;
  },
};

export const dashboardApi = {
  getDashboard: async (appUsername: string, leetcodeUsername: string): Promise<DashboardResponse> => {
    const response = await api.get<DashboardResponse>(`/dashboard/${appUsername}/${leetcodeUsername}`);
    return response.data;
  },
};

export default api;
