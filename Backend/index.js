import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// ─── CORS ────────────────────────────────────────────────
const allowedOrigins = [
  'http://localhost:5173',
  'http://localhost:3000',
  'https://vanshcodes01.onrender.com',
  process.env.FRONTEND_URL
].filter(Boolean);

app.use(cors({
  origin: (origin, callback) => {
    // Allow requests with no origin (mobile apps, curl, Postman)
    if (!origin) return callback(null, true);
    if (allowedOrigins.includes(origin)) return callback(null, true);
    callback(new Error(`CORS blocked: ${origin}`));
  },
  credentials: true
}));

app.use(express.json());

// ─── Health Check ────────────────────────────────────────
app.get('/', (req, res) => {
  res.json({
    status: 'online',
    message: 'Vansh Portfolio Backend is running.',
    endpoints: [
      'GET  / — health check',
      'POST /api/groq-chat — Groq AI proxy',
    ]
  });
});

// ─── Groq API Proxy ──────────────────────────────────────
app.post('/api/groq-chat', async (req, res) => {
  try {
    const { messages } = req.body;

    if (!messages || !Array.isArray(messages)) {
      return res.status(400).json({ 
        error: 'Invalid request: messages array is required' 
      });
    }

    if (!process.env.GROQ_API_KEY) {
      console.error('GROQ_API_KEY not set in environment');
      return res.status(500).json({ 
        error: 'Groq API key not configured on server' 
      });
    }

    const groqResponse = await fetch(
      'https://api.groq.com/openai/v1/chat/completions',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${process.env.GROQ_API_KEY}`
        },
        body: JSON.stringify({
          model: 'llama-3.3-70b-versatile',
          messages,
          max_tokens: 400,
          temperature: 0.75,
          stream: false
        })
      }
    );

    if (!groqResponse.ok) {
      const errorData = await groqResponse.json();
      console.error('Groq API error:', errorData);
      return res.status(groqResponse.status).json({
        error: 'Groq API request failed',
        details: errorData
      });
    }

    const data = await groqResponse.json();
    res.json(data);

  } catch (err) {
    console.error('Server error in /api/groq-chat:', err.message);
    res.status(500).json({ 
      error: 'Internal server error', 
      message: err.message 
    });
  }
});

// ─── 404 Handler ─────────────────────────────────────────
app.use((req, res) => {
  res.status(404).json({ error: `Route ${req.method} ${req.path} not found` });
});

// ─── Error Handler ───────────────────────────────────────
app.use((err, req, res, next) => {
  console.error('Unhandled error:', err.message);
  res.status(500).json({ error: err.message });
});

// ─── Start Server ─────────────────────────────────────────
app.listen(PORT, () => {
  console.log(`✅ Backend running on port ${PORT}`);
  console.log(`🔑 Groq API key: ${process.env.GROQ_API_KEY ? 'loaded' : 'MISSING'}`);
});
