// src/api/auth.ts
import api from './axios';
import { LoginRequest, RegisterRequest, AuthResponse } from '../types';

export const authAPI = {
  login: async (data: LoginRequest) => {
    const response = await api.post('/auth/login', data);
    console.log('📦 Réponse API login:', response.data);
    return response;
  },
  register: async (data: RegisterRequest) => {
    const response = await api.post('/auth/register', data);
    console.log('📦 Réponse API register:', response.data);
    return response;
  },
  refresh: (token: string) => api.post(`/auth/refresh?token=${token}`),
  logout: () => {
    localStorage.clear();
  },
};