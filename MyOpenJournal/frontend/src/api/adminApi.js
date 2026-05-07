import api from './client';

export const adminApi = {
  stats: () => api.get('/admin/stats'),
  posts: () => api.get('/admin/posts'),
  comments: () => api.get('/admin/comments'),
  deleteComment: (id) => api.delete(`/admin/comments/${id}`)
};
