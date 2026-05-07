import api from './client';

export const userApi = {
  getProfile: () => api.get('/users/profile'),
  updateProfile: (payload) => api.put('/users/profile', payload),
  updateAvatar: (formData) =>
    api.put('/users/avatar', formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    })
};
