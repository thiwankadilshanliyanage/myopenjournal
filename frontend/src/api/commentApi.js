import api from './client';

export const commentApi = {
  getComments: (postId) => api.get(`/comments/${postId}`),

  createComment: (payload) => api.post('/comments', payload),

  updateComment: (id, payload) => api.put(`/comments/${id}`, payload),

  deleteComment: (id) => api.delete(`/comments/${id}`)
};