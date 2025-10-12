// API Configuration
const API_BASE_URL = import.meta.env.VITE_API_URL || 
  (import.meta.env.DEV ? 'http://localhost:5000' : 'https://portfolio-backend-cbvf.onrender.com');

// Debug logging (remove in production if needed)
console.log('Environment:', import.meta.env.DEV ? 'development' : 'production');
console.log('API Base URL:', API_BASE_URL);

export const API_ENDPOINTS = {
  CONTACT: `${API_BASE_URL}/contact`
};

export default API_BASE_URL;
