const BACKEND_URL = import.meta.env.VITE_BACKEND_URL 
  || 'https://vansh-portfolio-backend.onrender.com';

export const API_ENDPOINTS = {
  GROQ_CHAT: `${BACKEND_URL}/api/groq-chat`,
  CONTACT: 'https://api.web3forms.com/submit'
};

export const WEB3FORMS_KEY = 'e0bc0ce9-110c-4dc6-8f2d-f858d7b5ed46';

