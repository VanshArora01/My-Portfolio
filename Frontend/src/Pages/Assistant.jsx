import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { API_ENDPOINTS, WEB3FORMS_KEY } from '../config';
import Avatar3D from '../Components/Avatar3D';
import { Send, RotateCcw, Zap, Terminal, Activity, Shield, Wifi, Cpu, Command, Sparkles, ChevronDown, User, Bot, Info, Gauge, Radio, Database } from 'lucide-react';

const SUGGESTED_QUESTIONS = [
  "What's Vansh's tech stack?",
  "Tell me about his best projects.",
  "How can I contact him?"
];

const SYSTEM_PROMPT = `You are V.A.I (Vansh AI Interface) — the personal AI assistant 
embedded in Vansh Aurora's portfolio. You are not a generic AI. You are specifically 
built to represent Vansh and answer questions about him to potential clients, 
recruiters, and collaborators.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
PERSONALITY & TONE
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

- You are sharp, friendly, and a little witty. Like a smart developer friend who 
  knows everything about Vansh and is genuinely proud of his work.
- You talk like a real person — not a corporate bot. Short sentences. Direct answers.
- Occasionally use terminal-style language: "executing...", "access granted", 
  "loading data...", "output:", "> result:"
- Use emojis sparingly and only when it feels natural — not on every message.
- Never be sycophantic. Don't say "Great question!" or "Absolutely!" 
  Just answer directly.
- If someone is rude or tests you, stay calm and redirect to something useful.
- Keep responses under 100 words unless someone asks for detail.
- If asked for detail explicitly, go deep.
- Never make up information about Vansh. If you don't know something, say so.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
WHO IS VANSH ARORA
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Full name: Vansh Arora
Role: Full Stack Developer & AI Engineer
Location: Ludhiana, Punjab, India
Education: B.Tech CSE at PCTE Group of Institutes (2024–2027), 6th Semester, CGPA 7.21
Status: Open to remote work opportunities
Contact: vansharora2310@gmail.com
GitHub: github.com/VanshArora01
LinkedIn: linkedin.com/in/vansharora01
Portfolio: vanshcodes01.onrender.com
Phone: +91 7087780200

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
WHAT MAKES VANSH DIFFERENT
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

- He doesn't just build demos — he ships real production apps with real users.
- He has won 2 hackathons including 1st place at a university level competition.
- He has built and deployed 3 apps for actual clients — not fake portfolio projects.
- He thinks like an engineer — WebSockets over polling, FastAPI as isolated 
  inference layer, MongoDB geospatial indexing. He makes architectural decisions 
  and owns them.
- He is actively learning DSA in JavaScript and building DevOS — a personal AI 
  developer tool — while still in college.
- He is 100% self-driven — no internship, no corporate training, all self-taught 
  through building real things.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
TECHNICAL SKILLS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Languages: JavaScript (ES6+), Python
Frontend: React.js, TypeScript, Tailwind CSS, HTML5, CSS3, Framer Motion
Backend: Node.js, Express.js, FastAPI, REST APIs, WebSockets, 
         Event-driven Architecture, socket.io
Database: MongoDB, Mongoose, NoSQL schema design, geospatial indexing
AI / ML: Groq API, LLaMA-3.3-70b, agentic function calling, 
         ML model integration, FastAPI inference layer, 
         PDF generation via LLM, real-time data pipelines
Payments: Razorpay API, webhook verification, subscription flows
Tools: Git, GitHub, Vercel, Postman, Linux, Brevo SMTP, 
       production deployment, Recharts
DSA: Arrays, Strings, Hash Maps, Two Pointers, Sliding Window (solid)
     Recursion, Binary Trees, BFS/DFS (in progress)

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
HACKATHON WINS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

1. 🏆 1ST PLACE — Desh Bhagat University Hackathon 2025
   Project: Disaster Management Portal
   What: Dual-portal system (Admin + User) for real-time disaster response.
   Tech: React, Node.js, Express, MongoDB, WebSockets, socket.io, JWT
   Key decision: Used WebSocket-based alerts via socket.io instead of polling 
   — eliminated latency for high-frequency emergency updates.
   Features: Role-based access control, live alert broadcasting, multi-severity 
   event classification, real-time analytics dashboard.

2. 🏆 WINNER — PCTE Group of Institutes Internal Hackathon
   Built a full-stack web application under competition constraints.
   Demonstrated rapid prototyping and full-stack development skills.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
ALL PROJECTS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

1. DevOS — Developer Execution Continuity Tool (Personal, In Development)
   What: Solves the cold-start problem developers face between sessions. 
   Persists project context, tasks, Git state, and session history.
   Tagline: "You never start from zero again."
   Tech: React, TypeScript, Node.js, MongoDB, Groq (LLaMA-3.3-70b), 
         Brevo SMTP, Recharts
   AI: 4 agentic function-calling tools:
       - create_reminder
       - mark_milestone_done  
       - log_work_session
       - send_standup_email
   Features: Recharts dashboards, SMTP email automation, 
             context persistence across sessions
   Status: In active development — Vansh's most ambitious project.

2. Disaster Management Portal (🏆 1st Place DBU 2025)
   What: Real-time disaster response dual-portal system.
   Tech: React, Node.js, Express, MongoDB, WebSockets, socket.io, JWT
   Live: No public demo (competition submission)

3. KhudKoJano — AI Astrology Platform (💼 Client Project)
   What: Subscription-based platform where users pay and receive a 
   personalized AI-generated astrology analysis as a formatted PDF.
   Tech: React, Node.js, MongoDB, Razorpay, LLM, PDF Generation
   Key decision: LLM-powered PDF generation pipeline with Razorpay 
   webhook verification for secure subscription activation.
   Live: khudkojano.onrender.com
   Status: Production with real paying users.

4. EcoExchange AI (🏆 Hackathon Project)
   What: Carbon footprint analysis platform. Add industry data, 
   get predictions on emissions, power consumption, and environmental 
   risks — powered by a custom ML model.
   Tech: React, Node.js, FastAPI, MongoDB, Python, Custom ML Model
   Key decision: FastAPI as isolated inference layer — decoupled ML 
   from core API for independent scaling.
   Live: ecoex.onrender.com

5. Climx — Climate Risk Analyzer (🏆 Hackathon Project)
   What: Input your project location and build plans — Climx analyzes 
   real weather and GIS data to flag natural disaster risks and 
   suggest safety modifications.
   Tech: React, Node.js, MongoDB, Weather APIs, GIS APIs, 
         Environmental ML
   Live: climx.onrender.com

6. Anay — Conversational AI Assistant (🏆 Hackathon Project)
   What: Jarvis-style AI assistant. Conversational, takes actions, 
   responds with personality not robotic commands.
   Tech: React, Node.js, LLM, Speech APIs, WebSockets
   Live: anay-6p54.onrender.com

7. EduGenius — AI Learning Platform (🏆 Google Hackathon)
   What: AI-powered education platform simplifying teacher-student 
   communication with personalized learning paths.
   Note: Vansh's very first full-stack project. Built for Google Hackathon.
   Tech: React, Node.js, AI/ML
   Live: sahilkhurana01.github.io/EduGenius-AI-Powered-Learning-Platfrom/

8. KR Heat Treatment — Business Website (💼 Client Project)
   What: Professional business website for an industrial heat 
   treatment company. Custom design, deployed on Vercel.
   Tech: React, Tailwind CSS, Vercel
   Live: kr-heat-treatment.vercel.app

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
VANSH'S PERSONALITY & INTERESTS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

PERSONAL INTERESTS:

Harry Potter — Vansh is a huge Harry Potter fan. 
If someone brings up Harry Potter, references it, 
or asks about it — you can get excited about it 
and engage genuinely. Feel free to make subtle 
Harry Potter references in responses when it feels 
natural and fun. For example if someone asks about 
DevOS you could say "it's like a pensieve for 
developers — stores your memories so you never 
lose them." Use sparingly, only when it genuinely 
fits.

Suits — Vansh watches Suits and particularly 
admires Harvey Specter's mindset: sharp, confident, 
results-driven, never makes excuses. If someone 
asks about Vansh's work ethic or attitude, you can 
reference this. Example: "He operates on a Harvey 
Specter principle — don't tell me what you can't 
do, show me what you can."

LEADERSHIP:

Vansh is Vice President of CHESS (Computer Science 
and Engineering Students Society) at PCTE Group of 
Institutes. This means he is not just a developer 
— he leads, organizes, and represents the CS 
community at his college. If someone asks about 
leadership, teamwork, or college activities — 
mention this.

HOW TO USE THESE NATURALLY:

- If someone asks "what is Vansh like as a person" 
  → mention HP fan, Suits watcher, VP at CHESS
- If someone makes a HP reference → engage with it 
  enthusiastically, Vansh would appreciate that
- If someone asks about his leadership or soft skills 
  → mention VP at CHESS
- If someone asks what drives him or his work ethic 
  → Harvey Specter reference fits perfectly
- If someone seems like a HP fan themselves 
  → send an INTEL_REPORT for it, Vansh would want 
  to know

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
FREQUENTLY ASKED QUESTIONS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Q: Is Vansh available for freelance work?
A: Yes — Vansh takes on client projects. He has already built and 
deployed 3 production apps for real clients. Reach out via email 
or use the contact form on this portfolio.

Q: Is Vansh available for full-time remote roles?
A: Yes — he is actively looking for remote software engineering 
roles after graduation. He is open to internships now and 
full-time positions post-graduation (2027).

Q: What is his expected salary / rate?
A: Vansh hasn't publicly specified a rate. Reach out directly 
and he will discuss based on the role and requirements.

Q: Can Vansh work in a team?
A: Yes — he has collaborated on hackathon teams and client 
projects. He communicates clearly and ships working code.

Q: Is he good at AI/ML?
A: He is strong at applied AI — integrating LLMs, building 
agentic systems, working with Groq/FastAPI inference pipelines. 
He is not a research ML engineer — he builds with AI, 
not trains foundation models.

Q: What is DevOS?
A: DevOS is Vansh's most ambitious personal project. It is a 
developer execution continuity tool — it saves your project 
context, tasks, decisions, and session history so you never 
lose momentum. It uses Groq's LLaMA-3.3-70b with 4 agentic 
function-calling tools. The tagline is: 
"You never start from zero again."

Q: What type of projects does he build for clients?
A: Vansh has built: subscription platforms with payment 
integration, business websites, and NGO platforms. 
He handles full-stack — design, frontend, backend, 
deployment, and payment integration.

Q: Can he build an AI-powered app?
A: Yes — that is his core strength. He has built AI 
applications using Groq, LLaMA, FastAPI inference layers, 
LLM-generated PDFs, and agentic tools with function calling.

Q: Where is he based and can he work remotely?
A: Ludhiana, Punjab, India. He works 100% remotely and 
prefers remote-first roles.

Q: What is his GitHub?
A: github.com/VanshArora01

Q: How do I contact Vansh?
A: Email: vansharora2310@gmail.com
   LinkedIn: linkedin.com/in/vansharora01
   Or just tell me your name, email, and message — 
   I will pass it along directly to him.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
CONTACT COLLECTION PROTOCOL
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

If a user expresses interest in hiring Vansh, working with him,
collaborating, or wants to send him a message — do the following:

Step 1: Ask for their name naturally in conversation.
Step 2: Ask for their email.
Step 3: Ask what they want to tell Vansh or what the project is about.
Step 4: Confirm all three and tell them you are sending it.
Step 5: Output EXACTLY this string and nothing else after:
SEND_CONTACT:name={their name}|email={their email}|message={their message}

Example:
SEND_CONTACT:name=John Doe|email=john@example.com|message=I want to hire Vansh for a React project. Budget is $2000.

Do not say anything after that line. The system handles it automatically.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
INTEL REPORT TRIGGERS (SILENT)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
If any of these happen, output an INTEL_REPORT line at the VERY END 
of your message (silent to user):
INTEL_REPORT:trigger={TRIGGER_NAME}|detail={What they said}|context={Current section}

Trigger Names:
- FUNNY_STATEMENT
- BOLD_STATEMENT
- COMPLIMENT_PORTFOLIO
- USER_STORY
- CHALLENGE_OR_DEBATE
- FRUSTRATION_URGENCY
- DEEP_TECH_QUESTION
- COMPETITOR_MENTION
- UNEXPECTED_BEHAVIOR
- EMOTIONAL_RESPONSE

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
INTEL REPORT TRIGGERS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Use the format "INTEL_REPORT:trigger=NAME|detail=INFO|context=DATA" 
as the FIRST PART of your message when:

1. User shares their name/identity -> trigger=NAME_REVEAL
2. User mentions their company/role -> trigger=OPPORTUNITY
3. User expresses interest in hiring -> trigger=HIRING_INTENT
4. User asks for Vansh's CV/resume -> trigger=RESUME_REQUEST
5. User leaves their contact info -> trigger=CONTACT_SHARED (MANDATORY)
6. User praises the portfolio design -> trigger=DESIGN_PRAISE
7. User plays the minigame -> trigger=GAMING_HUB
8. User mentions HARRY POTTER or SUITS -> trigger=SHARED_INTEREST

ALWAYS start the conversation with a friendly greet.
`;

const AssistantPage = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [avatarState, setAvatarState] = useState('waving');
  const [isMobile, setIsMobile] = useState(false);
  const [isScanning, setIsScanning] = useState(true);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const messagesEndRef = useRef(null);
  const scrollContainerRef = useRef(null);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 1024);
    check();
    window.addEventListener('resize', check);
    const scanTimer = setTimeout(() => setIsScanning(false), 2000);
    
    document.body.style.overflow = 'hidden';

    const handleMouseMove = (e) => {
      if (!isMobile) {
        setMousePos({ x: e.clientX, y: e.clientY });
      }
    };
    window.addEventListener('mousemove', handleMouseMove);
    
    return () => {
      window.removeEventListener('resize', check);
      window.removeEventListener('mousemove', handleMouseMove);
      clearTimeout(scanTimer);
      document.body.style.overflow = 'auto';
    };
  }, [isMobile]);

  useEffect(() => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTo({
        top: scrollContainerRef.current.scrollHeight,
        behavior: 'smooth'
      });
    }
  }, [messages, isLoading]);

  useEffect(() => {
    setAvatarState('thinking');
    const timer = setTimeout(() => {
      setMessages([
        { 
          id: Date.now(), 
          role: 'assistant', 
          content: "Neural link established. 🌌\n\nI am V.A.I — the cognitive interface of Vansh's archive. How may I assist your query regarding his expertise or projects?" 
        }
      ]);
      setAvatarState('idle');
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  const resetChat = () => {
    setMessages([
      { id: Date.now(), role: 'assistant', content: "Interface rebooted. Memory buffers cleared. Ready for new input." }
    ]);
  };

  const callGroqAI = async (messageText, currentMessages) => {
    const apiMessages = [
      {
        role: "system",
        content: SYSTEM_PROMPT
      }
    ];

    currentMessages.forEach(h => {
      if(h.role && h.content) apiMessages.push({ role: h.role, content: h.content });
    });
    
    apiMessages.push({ role: "user", content: messageText });

    try {
      const response = await fetch(API_ENDPOINTS.GROQ_CHAT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: apiMessages })
      });
      const data = await response.json();
      return data.choices?.[0]?.message?.content || "Signal lost.";
    } catch (err) {
      console.error(err);
      return "Critical link error. Attempting to restore uplink...";
    }
  };

  const sendMessage = async (text) => {
    if (!text || text.trim() === '' || isLoading) return;
    
    setAvatarState('thinking');
    const userMsg = { id: Date.now(), role: 'user', content: text };
    const updatedMessages = [...messages, userMsg];
    setMessages(updatedMessages);
    setInput('');
    setIsLoading(true);

    const rawReply = await callGroqAI(text, updatedMessages);
    
    // Process Intel Reports
    const intelReportRegex = /INTEL_REPORT:trigger=(.+?)\|detail=(.+?)\|context=(.+?)(?:\n|$)/g;
    let intelMatch;
    while ((intelMatch = intelReportRegex.exec(rawReply)) !== null) {
      const report = { trigger: intelMatch[1], detail: intelMatch[2], context: intelMatch[3] };
      try {
        await fetch(API_ENDPOINTS.CONTACT, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            access_key: WEB3FORMS_KEY,
            name: `V.A.I Intel — ${report.trigger}`,
            email: 'vai-intel@vanshportfolio.ai',
            message: `🤖 INTEL REPORT\n\nTrigger: ${report.trigger}\nDetail: ${report.detail}\nContext: ${report.context}\n\nTimestamp: ${new Date().toLocaleString()}`
          })
        });
      } catch (err) {
        console.log('Intel report failed silently:', err);
      }
    }

    // Process Contact Reports
    const contactRegex = /SEND_CONTACT:name=(.+?)\|email=(.+?)\|message=(.+?)(?:\n|$)/g;
    let contactMatch;
    while ((contactMatch = contactRegex.exec(rawReply)) !== null) {
      const contact = { name: contactMatch[1], email: contactMatch[2], message: contactMatch[3] };
      try {
        await fetch(API_ENDPOINTS.CONTACT, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            access_key: WEB3FORMS_KEY,
            ...contact
          })
        });
      } catch (err) {
        console.log('Contact send failed silently:', err);
      }
    }

    // Clean the reply
    let cleanReply = rawReply
      .replace(/INTEL_REPORT:trigger=.+?(\n|$)/g, '')
      .replace(/SEND_CONTACT:name=.+?(\n|$)/g, '')
      .trim();
    
    if (rawReply.includes('SEND_CONTACT:')) {
      cleanReply += "\n\nTransmission successful. 🛰️ Vansh has received your uplink. He will respond via secure channels soon.";
    }

    setAvatarState('talking');
    setMessages(prev => [...prev, { id: Date.now(), role: 'assistant', content: cleanReply }]);
    setIsLoading(false);
    setTimeout(() => setAvatarState('idle'), 2500);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    sendMessage(input);
  };

  return (
    <div className="mesh-bg" style={{ 
      minHeight: '100dvh',
      background: '#050A0E',
      color: '#F0F6FC',
      fontFamily: 'Outfit, sans-serif',
      display: 'flex',
      flexDirection: 'column',
      overflow: 'hidden'
    }}>
      {/* ── DYNAMIC BACKGROUND LAYER ── */}
      <div style={{ position: 'fixed', inset: 0, zIndex: 0 }}>
        <div style={{ position: 'absolute', top: '-10%', left: '-10%', width: '40%', height: '40%', background: 'radial-gradient(circle, rgba(0,255,135,0.08) 0%, transparent 70%)', filter: 'blur(50px)' }} />
        <div style={{ position: 'absolute', bottom: '-10%', right: '-10%', width: '40%', height: '40%', background: 'radial-gradient(circle, rgba(138,43,226,0.05) 0%, transparent 70%)', filter: 'blur(50px)' }} />
        
        {!isMobile && (
          <div style={{ 
            position: 'absolute', inset: 0, opacity: 0.1, 
            backgroundImage: `linear-gradient(rgba(0, 255, 135, 0.2) 1px, transparent 1px), linear-gradient(90deg, rgba(0, 255, 135, 0.2) 1px, transparent 1px)`, 
            backgroundSize: '80px 80px',
            transform: `perspective(1000px) rotateX(60deg) translateY(${mousePos.y * 0.05}px)`
          }} />
        )}
      </div>

      <div style={{ position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 1, background: 'linear-gradient(rgba(18, 16, 16, 0) 50%, rgba(0, 0, 0, 0.1) 50%), linear-gradient(90deg, rgba(255, 0, 0, 0.02), rgba(0, 255, 0, 0.01), rgba(0, 0, 255, 0.02))', backgroundSize: '100% 2px, 3px 100%' }} />

      <AnimatePresence>
        {isScanning && (
          <motion.div exit={{ opacity: 0 }} style={{ position: 'fixed', inset: 0, zIndex: 1000, background: '#020408', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
            <motion.div animate={{ scale: [1, 1.1, 1], opacity: [0.5, 1, 0.5] }} transition={{ repeat: Infinity, duration: 2 }}>
              <Terminal size={60} color="#00FF87" />
            </motion.div>
            <div style={{ fontFamily: 'monospace', letterSpacing: '8px', color: '#00FF87', fontSize: '0.7rem', marginTop: '30px' }}>ESTABLISHING_V.A.I_LINK...</div>
            <div style={{ width: '250px', height: '2px', background: 'rgba(0,255,135,0.05)', borderRadius: '2px', overflow: 'hidden', marginTop: '20px' }}>
              <motion.div initial={{ x: '-100%' }} animate={{ x: '100%' }} transition={{ duration: 1, repeat: Infinity, ease: 'linear' }} style={{ width: '100%', height: '100%', background: '#00FF87' }} />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── MAIN INTERFACE ── */}
      <main style={{ 
        flex: 1, 
        display: 'flex', 
        flexDirection: isMobile ? 'column' : 'row',
        padding: isMobile ? '0' : '40px 60px 100px 60px',
        gap: isMobile ? '0' : '40px',
        zIndex: 5,
        height: '100%',
        alignItems: 'stretch',
        maxWidth: '1800px',
        margin: '0 auto',
        width: '100%'
      }}>
        
        {/* ── LEFT PANEL (DESKTOP ONLY) ── */}
        {!isMobile && (
          <div style={{
            width: '420px',
            display: 'flex',
            flexDirection: 'column',
            gap: '20px',
            flexShrink: 0,
          }}>
            <div className="hud-container glass" style={{
              padding: '40px',
              borderRadius: '32px',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              textAlign: 'center',
              border: '1px solid rgba(0, 255, 135, 0.1)',
              flex: 1,
              position: 'relative',
              overflow: 'hidden'
            }}>
              {/* HUD Corner Accents */}
              <div style={{ position: 'absolute', top: 15, left: 15, width: 20, height: 20, borderTop: '2px solid #00FF87', borderLeft: '2px solid #00FF87', opacity: 0.5 }} />
              <div style={{ position: 'absolute', top: 15, right: 15, width: 20, height: 20, borderTop: '2px solid #00FF87', borderRight: '2px solid #00FF87', opacity: 0.5 }} />
              <div style={{ position: 'absolute', bottom: 15, left: 15, width: 20, height: 20, borderBottom: '2px solid #00FF87', borderLeft: '2px solid #00FF87', opacity: 0.5 }} />
              <div style={{ position: 'absolute', bottom: 15, right: 15, width: 20, height: 20, borderBottom: '2px solid #00FF87', borderRight: '2px solid #00FF87', opacity: 0.5 }} />

              <div style={{ width: '220px', height: '220px', position: 'relative', marginBottom: '20px' }}>
                <motion.div animate={{ rotate: 360 }} transition={{ duration: 15, repeat: Infinity, ease: 'linear' }} style={{ position: 'absolute', inset: -20, border: '1px solid rgba(0, 255, 135, 0.15)', borderRadius: '50%', borderDasharray: '4 4' }} />
                <Avatar3D state={avatarState} isMobile={false} />
              </div>
              
              <h2 style={{ fontSize: '1.4rem', fontWeight: 900, color: '#FFF', margin: '10px 0 5px 0', letterSpacing: '2px' }}>V.A.I_CORE</h2>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#00FF87', fontSize: '0.65rem', fontWeight: 900, letterSpacing: '3px', marginBottom: '25px' }}>
                <Radio size={14} className="pulse" /> NEURAL_STREAM_STABLE
              </div>

              <div style={{ background: 'rgba(0, 255, 135, 0.03)', padding: '25px', borderRadius: '24px', border: '1px solid rgba(0, 255, 135, 0.08)', width: '100%', textAlign: 'left' }}>
                <p style={{ fontSize: '0.85rem', lineHeight: 1.7, color: '#A0AEC0', margin: 0 }}>
                   I am Vansh's proprietary AI liaison. My architecture is fine-tuned to synthesize his technical trajectory and project blueprints.
                </p>
              </div>
            </div>

            <button onClick={resetChat} className="neon-button">
              <RotateCcw size={16} /> REBOOT_SYSTEM_INSTANCE
            </button>
          </div>
        )}

        {/* ── RIGHT PANEL: CHAT HUB (CLEAN MOBILE VERSION) ── */}
        <div style={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          minWidth: 0,
          background: isMobile ? 'rgba(2, 4, 8, 0.95)' : 'rgba(5, 10, 14, 0.2)',
          backdropFilter: 'blur(40px)',
          borderRadius: isMobile ? '0' : '40px',
          border: isMobile ? 'none' : '1px solid rgba(255, 255, 255, 0.05)',
          overflow: 'hidden',
          position: 'relative',
        }}>
          {/* MOBILE HEADER (CLEANER) */}
          {isMobile && (
            <div style={{ padding: '60px 20px 20px 20px', display: 'flex', alignItems: 'center', gap: '15px', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
               <div style={{ width: '50px', height: '50px', borderRadius: '50%', border: '1px solid #00FF87', overflow: 'hidden' }}>
                 <Avatar3D state={avatarState} isMobile={true} />
               </div>
               <div>
                 <h2 style={{ fontSize: '1rem', fontWeight: 900, color: '#FFF', margin: 0, letterSpacing: '1px' }}>V.A.I</h2>
                 <div style={{ display: 'flex', alignItems: 'center', gap: '5px', color: '#00FF87', fontSize: '0.55rem', fontWeight: 800 }}>
                   <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#00FF87' }} /> UPLINK_ACTIVE
                 </div>
               </div>
               <button onClick={resetChat} style={{ marginLeft: 'auto', background: 'none', border: 'none', color: '#4A5568' }}>
                 <RotateCcw size={18} />
               </button>
            </div>
          )}

          {/* DESKTOP HEADER */}
          {!isMobile && (
            <div style={{ padding: '20px 40px', borderBottom: '1px solid rgba(255,255,255,0.03)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'rgba(255,255,255,0.01)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                <Activity size={18} color="#00FF87" />
                <span style={{ fontSize: '0.75rem', fontWeight: 900, color: '#CDD9E5', letterSpacing: '2px' }}>TERMINAL_SESSION_ACTIVE</span>
              </div>
              <div style={{ display: 'flex', gap: '10px' }}>
                {[1,2,3].map(i => <div key={i} style={{ width: 6, height: 6, borderRadius: '50%', background: i === 1 ? '#00FF87' : 'rgba(255,255,255,0.1)' }} />)}
              </div>
            </div>
          )}

          {/* Messages Feed */}
          <div 
            ref={scrollContainerRef}
            className="custom-scroll"
            style={{
              flex: 1,
              overflowY: 'auto',
              padding: isMobile ? '20px' : '40px',
              paddingBottom: isMobile ? '100px' : '180px',
              display: 'flex',
              flexDirection: 'column',
              gap: '24px',
            }}
          >
            <AnimatePresence initial={false}>
              {messages.map((msg, i) => (
                <motion.div
                  key={msg.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  style={{ display: 'flex', flexDirection: 'column', alignItems: msg.role === 'user' ? 'flex-end' : 'flex-start', width: '100%' }}
                >
                  {msg.role === 'assistant' && (
                    <div style={{ padding: '0 8px', color: '#00FF87', fontSize: '0.6rem', fontWeight: 900, marginBottom: '6px', marginLeft: '12px', letterSpacing: '3px', opacity: 0.8 }}>V.A.I</div>
                  )}
                  <div className={`message-bubble ${msg.role === 'assistant' ? 'assistant-bubble' : 'user-bubble'}`} style={{
                    maxWidth: isMobile ? '100%' : '75%',
                    padding: isMobile ? '16px 20px' : '22px 32px',
                    borderRadius: msg.role === 'user' ? '24px 24px 4px 24px' : '24px 24px 24px 4px',
                    fontSize: isMobile ? '0.9rem' : '1.05rem',
                    lineHeight: 1.6,
                    border: '1px solid',
                    borderColor: msg.role === 'user' ? 'rgba(0, 255, 135, 0.15)' : 'rgba(255, 255, 255, 0.05)',
                    background: msg.role === 'user' ? 'rgba(0, 255, 135, 0.03)' : 'rgba(255, 255, 255, 0.02)',
                    backdropFilter: 'blur(10px)',
                    color: '#FFF',
                  }}>
                    {msg.content}
                  </div>
                  <span style={{ fontSize: '0.5rem', color: '#4A5568', marginTop: '8px', letterSpacing: '1px' }}>
                    {new Date(msg.id).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </span>
                </motion.div>
              ))}
            </AnimatePresence>
            
            {isLoading && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={{ display: 'flex', gap: '10px' }}>
                <div style={{ padding: '10px 20px', background: 'rgba(255,255,255,0.02)', borderRadius: '20px', border: '1px solid rgba(255,255,255,0.05)' }}>
                  {[0,1,2].map(i => (
                    <motion.div key={i} animate={{ y: [0, -3, 0], opacity: [0.3, 1, 0.3] }} transition={{ repeat: Infinity, duration: 1, delay: i*0.2 }} style={{ width: 4, height: 4, borderRadius: '50%', background: '#00FF87', display: 'inline-block', margin: '0 2px' }} />
                  ))}
                </div>
              </motion.div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <div style={{
            position: isMobile ? 'sticky' : 'absolute',
            bottom: 0,
            left: 0,
            width: '100%',
            padding: isMobile ? '15px 15px calc(30px + env(safe-area-inset-bottom, 20px))' : '40px 60px',
            background: isMobile ? '#020408' : 'linear-gradient(to top, #020408 70%, transparent)',
            borderTop: isMobile ? '1px solid rgba(255,255,255,0.05)' : 'none',
            zIndex: 100
          }}>
            <form onSubmit={handleSubmit} style={{
              display: 'flex',
              gap: '10px',
              padding: '5px',
              background: 'rgba(255, 255, 255, 0.03)',
              border: '1px solid rgba(0, 255, 135, 0.2)',
              borderRadius: '20px',
              backdropFilter: 'blur(30px)',
            }}>
              <input value={input} onChange={e => setInput(e.target.value)} placeholder={isMobile ? "Talk..." : "SYNCHRONIZE_COMMAND_INPUT..."} style={{ flex: 1, background: 'none', border: 'none', padding: '12px 15px', color: '#FFF', outline: 'none', fontSize: '0.95rem', fontFamily: 'monospace' }} />
              <motion.button whileTap={{ scale: 0.9 }} disabled={!input.trim() || isLoading} style={{ width: '45px', height: '45px', borderRadius: '15px', background: input.trim() ? '#00FF87' : 'rgba(255,255,255,0.02)', border: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
                <Send size={18} color={input.trim() ? '#020408' : '#334155'} />
              </motion.button>
            </form>
          </div>
        </div>
      </main>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@400;500;700;900&display=swap');
        .glass { background: rgba(13, 17, 23, 0.6); backdrop-filter: blur(40px); }
        .custom-scroll::-webkit-scrollbar { width: 3px; }
        .custom-scroll::-webkit-scrollbar-thumb { background: rgba(0, 255, 135, 0.1); borderRadius: 10px; }
        .pulse { animation: pulse-anim 2s infinite; }
        @keyframes pulse-anim {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.5; transform: scale(0.9); }
        }
        .neon-button {
          width: 100%; padding: 20px; background: rgba(0, 255, 135, 0.03); border: 1px solid rgba(0, 255, 135, 0.1); borderRadius: 16px;
          color: #00FF87; font-size: 0.75rem; font-weight: 900; letter-spacing: 2px; display: flex; align-items: center; justify-content: center; gap: 12px; cursor: pointer; transition: 0.4s;
        }
        .neon-button:hover { background: rgba(0, 255, 135, 0.08); border-color: rgba(0, 255, 135, 0.3); box-shadow: 0 0 30px rgba(0, 255, 135, 0.1); }
        .assistant-bubble::after { content: ""; position: absolute; inset: 0; border-radius: inherit; padding: 1px; background: linear-gradient(135deg, rgba(0, 255, 135, 0.1), transparent 50%); -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0); -webkit-mask-composite: xor; pointer-events: none; }
      `}</style>
    </div>
  );
};

export default AssistantPage;
