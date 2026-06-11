// src/services/api.ts
import axios from 'axios';
import { AuthResponse, LoginRequest, RegisterRequest, Event, Guest, Registration, Logistics } from '../types';

const API_BASE_URL = 'http://localhost:8080';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Intercepteur pour ajouter le token
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Intercepteur pour rafraîchir le token
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        const refreshToken = localStorage.getItem('refreshToken');
        const response = await axios.post(`${API_BASE_URL}/auth/refresh?token=${refreshToken}`);
        const { token } = response.data;
        localStorage.setItem('token', token);
        originalRequest.headers.Authorization = `Bearer ${token}`;
        return api(originalRequest);
      } catch (refreshError) {
        localStorage.clear();
        window.location.href = '/login';
        return Promise.reject(refreshError);
      }
    }
    return Promise.reject(error);
  }
);

// Auth Services
export const authService = {
  login: (data: LoginRequest) => api.post<AuthResponse>('/auth/login', data),
  register: (data: RegisterRequest) => api.post<AuthResponse>('/auth/register', data),
  refresh: (token: string) => api.post<AuthResponse>(`/auth/refresh?token=${token}`),
};

// Event Services
export const eventService = {
  getAll: () => api.get<Event[]>('/events'),
  getById: (id: number) => api.get<Event>(`/events/${id}`),
  create: (data: Partial<Event>) => api.post<Event>('/events', data),
  delete: (id: number) => api.delete(`/events/${id}`),
};

// Guest Services
export const guestService = {
  getAll: () => api.get<Guest[]>('/guests'),
  getById: (id: number) => api.get<Guest>(`/guests/${id}`),
  create: (data: Partial<Guest>) => api.post<Guest>('/guests', data),
  delete: (id: number) => api.delete(`/guests/${id}`),
};

// Registration Services
export const registrationService = {
  getAll: () => api.get<Registration[]>('/registrations'),
  register: (data: { eventId: number; guestId: number }) => api.post<Registration>('/registrations', data),
  cancel: (id: number) => api.put(`/registrations/cancel/${id}`),
};

// Logistics Services
export const logisticsService = {
  getAll: () => api.get<Logistics[]>('/logistics'),
  getById: (id: number) => api.get<Logistics>(`/logistics/${id}`),
  create: (data: Partial<Logistics>) => api.post<Logistics>('/logistics', data),
  updateStatus: (id: number, status: string) => api.put<Logistics>(`/logistics/${id}/status?status=${status}`),
  delete: (id: number) => api.delete(`/logistics/${id}`),
};