import axios from 'axios';

const API_BASE = process.env.REACT_APP_API_URL || 'http://localhost:3001';

const api = axios.create({
  baseURL: API_BASE,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Add auth token to requests
api.interceptors.request.use(config => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const auth = {
  register: (email, password) => api.post('/api/auth/register', { email, password }),
  login: (email, password) => api.post('/api/auth/login', { email, password })
};

export const chatbots = {
  create: (data) => api.post('/api/chatbots', data),
  getAll: () => api.get('/api/chatbots'),
  update: (id, data) => api.put(`/api/chatbots/${id}`, data),
  delete: (id) => api.delete(`/api/chatbots/${id}`)
};

export const documents = {
  upload: (chatbotId, file) => {
    const formData = new FormData();
    formData.append('file', file);
    return api.post(`/api/chatbots/${chatbotId}/documents`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    });
  },
  getAll: (chatbotId) => api.get(`/api/chatbots/${chatbotId}/documents`),
  delete: (chatbotId, docId) => api.delete(`/api/chatbots/${chatbotId}/documents/${docId}`)
};

export const connections = {
  create: (chatbotId, data) => api.post(`/api/chatbots/${chatbotId}/connections`, data),
  getAll: (chatbotId) => api.get(`/api/chatbots/${chatbotId}/connections`)
};

export default api;