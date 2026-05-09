import api from './client';

export const postApi = {
  getPosts: (params) => api.get('/posts', { params }),
  getPost: (slug) => api.get(`/posts/${slug}`),
  createPost: (payload) => api.post('/posts', payload),
  updatePost: (id, payload) => api.put(`/posts/${id}`, payload),
  deletePost: (id) => api.delete(`/posts/${id}`),
  getCategories: () => api.get('/categories'),
  uploadImage: (formData) =>
    api.post('/uploads/image', formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    })
};
