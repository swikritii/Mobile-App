import axios from 'axios';

// Base API configuration
const API_BASE_URL = 'http://10.0.2.2:8000'; // if Android emulator
// Local development server

// Create axios instance
const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add JWT token
api.interceptors.request.use(
  (config) => {
    // Get token from AsyncStorage or context
    const token = global.authToken; // This will be set from context
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Token expired or invalid, redirect to login
      // This will be handled by the app navigation
    }
    return Promise.reject(error);
  }
);

// Set global token for interceptors
export const setAuthToken = (token) => {
  global.authToken = token;
};

// API methods
export const authAPI = {
  login: async (email, password) => {
    const response = await api.post('/auth/login', { email, password });
    return response.data;
  },
};

export const booksAPI = {
  getBooks: async () => {
    const response = await api.get('/books');
    return response.data;
  },
};

export const borrowAPI = {
  borrowBook: async (bookId) => {
    const response = await api.post('/borrow', { bookId });
    return response.data;
  },
};

export default api;
