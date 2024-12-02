import { api } from '../config/api';
import { User } from '../types';

interface LoginCredentials {
  email: string;
  password: string;
}

interface RegisterData extends LoginCredentials {
  name: string;
  role: 'admin' | 'member';
}

export const authService = {
  async login(credentials: LoginCredentials) {
    const { data } = await api.post('/auth/login', credentials);
    localStorage.setItem('token', data.token);
    return data;
  },

  async register(userData: RegisterData) {
    const { data } = await api.post('/auth/register', userData);
    return data;
  },

  async getCurrentUser(): Promise<User> {
    const { data } = await api.get('/auth/me');
    return data;
  },

  logout() {
    localStorage.removeItem('token');
  },
};