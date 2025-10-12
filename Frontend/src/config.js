// API Configuration
const API_BASE_URL = import.meta.env.VITE_API_URL || 'https://portfolio-backend-cbvf.onrender.com';

export const API_ENDPOINTS = {
  CONTACT: `${API_BASE_URL}/contact`
};

export default API_BASE_URL;
