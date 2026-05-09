import api from './client';

export const likeApi = {
  toggle: (payload) => api.post('/likes/toggle', payload)
};
