import api from './client';

export const authApi = {
  register: (payload) => api.post('/auth/register', payload),
  login: (payload) => api.post('/auth/login', payload),
  forgotPassword: (payload) => api.post('/auth/forgot-password', payload),
  resetPassword: (token, payload) => api.post(`/auth/reset-password/${token}`, payload),
  verifyEmail: (token) => api.get(`/auth/verify-email/${token}`),
  me: () => api.get('/auth/me')
};
