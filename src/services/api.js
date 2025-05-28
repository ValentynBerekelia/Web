import axios from 'axios';

<<<<<<< HEAD
const API_URL = 'https://localhost:7001/api';
=======
const API_URL = 'http://localhost:5000/api';
>>>>>>> add dashboard and fix home page

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add token to requests if it exists
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const authService = {
  login: async (username, password) => {
    const response = await api.post('/auth/login', { username, password });
    if (response.data.token) {
      localStorage.setItem('token', response.data.token);
<<<<<<< HEAD
=======
      localStorage.setItem('isAdmin', 'true');
>>>>>>> add dashboard and fix home page
    }
    return response.data;
  },
  logout: () => {
    localStorage.removeItem('token');
<<<<<<< HEAD
  },
  getToken: () => localStorage.getItem('token'),
=======
    localStorage.removeItem('isAdmin');
  },
  getToken: () => localStorage.getItem('token'),
  isAuthenticated: () => localStorage.getItem('isAdmin') === 'true'
>>>>>>> add dashboard and fix home page
};

export const plansService = {
  getAll: () => api.get('/plans'),
  getById: (id) => api.get(`/plans/${id}`),
  create: (plan) => api.post('/plans', plan),
  update: (id, plan) => api.put(`/plans/${id}`, plan),
  delete: (id) => api.delete(`/plans/${id}`),
};

<<<<<<< HEAD
=======
export const cursorsService = {
  getAll: () => api.get('/cursors'),
  getById: (id) => api.get(`/cursors/${id}`),
  create: (formData) => {
    const config = {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    };
    return api.post('/cursors/add', formData, config);
  },
  update: (id, formData) => {
    const config = {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    };
    return api.put(`/cursors/update/${id}`, formData, config);
  },
  delete: (id) => api.delete(`/cursors/delete/${id}`),
};

>>>>>>> add dashboard and fix home page
export default api; 