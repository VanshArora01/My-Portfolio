# 🌐 Vansh Aurora — Full Stack & AI Portfolio

Welcome to the definitive archive of **Vansh Aurora**, a Full Stack Developer and AI Engineer obsessed with performance, rich aesthetics, and agentic AI systems.

![V.A.I Interface](https://img.shields.io/badge/V.A.I-Active-00FF87?style=for-the-badge) 
![Stack](https://img.shields.io/badge/Stack-React_|_Node_|_FastAPI-blue?style=for-the-badge)
![Status](https://img.shields.io/badge/Status-Hiring_Open-orange?style=for-the-badge)

## 🚀 The Cognitive Interface (V.A.I)
This portfolio features **V.A.I (Vansh AI Interface)**, a custom-built AI assistant powered by **Groq + LLaMA-3.3-70b**. V.A.I is not just a chatbot; it is a cognitive anchor that:
- Synthesizes project details in real-time.
- Executes contact collection through agentic function calling.
- Operates via a secure Backend Proxy to protect API credentials.

---

## 🏗️ Architecture Overview

The project is split into two primary neural nodes:

### 1. 📂 [/Frontend](./Frontend)
A high-performance React application utilizing **Vite**, **Framer Motion**, and **Three.js** for a premium "hacker-type" aesthetic.
- **Rich Aesthetics**: Glassmorphism, scanlines, and glow effects.
- **Interactive Gaming Deck**: Includes custom versions of *Neural Hack* and *Neural Snake*.
- **3D Integration**: Features a 3D avatar that reflects the assistant's state.

### 2. 📂 [/Backend](./Backend)
A production-ready Express.js server acting as a secure proxy layer.
- **Security**: Protects the Groq API key from frontend exposure.
- **CORS Management**: Strict origin filtering to prevent unauthorized access.
- **Clean API**: Isolated routes for AI completions and health monitoring.

---

## 🛠️ Tech Stack

- **Frontend**: React 19, Vite, Tailwind CSS (v4), Framer Motion, Three.js, Lucide Icons.
- **Backend**: Node.js, Express.js, CORS, Dotenv.
- **AI Engine**: Groq SDK, LLaMA-3.3-70b-versatile.
- **Deployment**: Render (Backend), Vercel/Render (Frontend).
- **Communication**: Web3Forms (Contacts), SMTP2GO (Automation).

---

## ⚙️ Environment Variables

To run this locally or in production, you'll need the following variables:

### Backend (`/Backend/.env`)
| Key | Description | Example |
|-----|-------------|---------|
| `PORT` | Listening port | `5000` |
| `GROQ_API_KEY` | Your Groq API Key | `gsk_...` |
| `FRONTEND_URL` | Allowed CORS origin | `https://your-domain.com` |

### Frontend (`/Frontend/.env`)
| Key | Description | Example |
|-----|-------------|---------|
| `VITE_BACKEND_URL` | API endpoint for the proxy | `https://api.your-domain.com` |

---

## 📦 Deployment & Commands

### ⚡ Development
Run both in parallel:
```bash
# Frontend
cd Frontend && npm run dev

# Backend
cd Backend && npm run dev
```

### 🚢 Production Deployment

#### Frontend
1. Build the assets: `npm run build`
2. Deploy the `dist/` folder to **Vercel** or **Render**.
3. Set the `VITE_BACKEND_URL` in the deployment platform settings.

#### Backend
1. Set up a Web Service on **Render**.
2. Environment: `Node`
3. Build Command: `npm install`
4. Start Command: `npm start`
5. Map the `GROQ_API_KEY` in the Environment variables section.

---

## 🏆 Achievements Highlighted In-Site
- **1st Place** @ Desh Bhagat University Hackathon 2025.
- **Winner** @ PCTE Group Internal Hackathon.
- Built **DevOS** and **KhudKoJano** AI platforms.

---

## 👨‍💻 Author
**Vansh Aurora**  
Email: [vansharora2310@gmail.com](mailto:vansharora2310@gmail.com)  
LinkedIn: [linkedin.com/in/vansharora01](https://www.linkedin.com/in/vansharora01)  
GitHub: [@VanshArora01](https://github.com/VanshArora01)

---

> "You never start from zero again." — **DevOS**
