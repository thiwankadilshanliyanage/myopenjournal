import api from './client';

export const likeApi = {
  status: (postId) => api.get(`/likes/status/${postId}`),
  toggle: (payload) => api.post('/likes/toggle', payload)
};