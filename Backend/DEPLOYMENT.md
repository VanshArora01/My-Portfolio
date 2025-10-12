# Backend Deployment Guide

## Environment Variables Required

Create a `.env` file in the Backend directory with the following variables:

```env
# Email Configuration
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password

# Server Configuration
PORT=5000

# Frontend URL (for CORS)
FRONTEND_URL=https://your-frontend-domain.vercel.app
```

## Deployment Steps

1. **Set up environment variables** in your hosting platform (Heroku, Railway, etc.)
2. **Update CORS configuration** in `index.js` with your actual frontend domain
3. **Deploy the backend**
4. **Update frontend configuration** with your backend URL

## CORS Configuration

Update the `origin` array in `index.js` with your actual frontend domain:

```javascript
origin: [
    "http://localhost:5173", // Development
    "https://your-actual-frontend-domain.vercel.app", // Production
    process.env.FRONTEND_URL
].filter(Boolean)
```

## Frontend Configuration

Create a `.env` file in the Frontend directory:

```env
VITE_API_URL=https://your-backend-domain.herokuapp.com
```

Or update the `config.js` file directly with your backend URL.
