import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Download, ExternalLink, Mail, Linkedin, Github, Globe, Phone, Cpu, Award, BookOpen, Code, Rocket, Terminal, Zap, Sparkles } from 'lucide-react';

const Section = ({ transitionDelay = 0, children }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: -20 }}
      animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
      transition={{ duration: 0.6, delay: transitionDelay, ease: [0.23, 1, 0.32, 1] }}
      style={{ position: 'relative', marginBottom: '4rem' }}
    >
      {children}
    </motion.div>
  );
};

const SkillPill = ({ children, color = '#3BFCFF' }) => (
  <motion.span
    whileHover={{ scale: 1.05, y: -2 }}
    style={{
      background: 'rgba(255,255,255,0.03)',
      border: `1px solid ${color}20`,
      color: color,
      padding: '6px 14px',
      borderRadius: '100px',
      fontSize: '0.72rem',
      fontWeight: 600,
      display: 'inline-block',
      backdropFilter: 'blur(10px)',
      boxShadow: `0 0 10px ${color}05`
    }}>
    {children}
  </motion.span>
);

const TimelineNode = ({ active = false }) => (
  <div style={{ position: 'absolute', left: '-30px', top: '10px', width: '12px', height: '12px', background: active ? '#00FF87' : '#161B22', border: active ? '3px solid #00FF8744' : '2px solid #30363D', borderRadius: '50%', zIndex: 2, transition: '0.3s' }} />
);

const Resume = () => {
  return (
    <div className="resume-page-wrapper" style={{ background: '#020408', minHeight: '100vh', fontFamily: '"JetBrains Mono", monospace', color: '#CDD9E5', position: 'relative', overflowX: 'hidden' }}>
      
      {/* ── BACKGROUND FX ── */}
      <div style={{ position: 'fixed', inset: 0, zIndex: 0 }}>
        <div style={{ position: 'absolute', top: '-10%', left: '-10%', width: '40%', height: '40%', background: 'radial-gradient(circle, rgba(0,255,135,0.08) 0%, transparent 70%)', filter: 'blur(50px)' }} />
        <div style={{ position: 'absolute', bottom: '-10%', right: '-10%', width: '40%', height: '40%', background: 'radial-gradient(circle, rgba(138,43,226,0.05) 0%, transparent 70%)', filter: 'blur(50px)' }} />
        <div style={{ position: 'absolute', inset: 0, opacity: 0.2, backgroundImage: `linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)`, backgroundSize: '50px 50px' }} />
      </div>

      <div style={{ position: 'fixed', left: '44px', top: 0, bottom: 0, width: '1px', background: 'linear-gradient(to bottom, transparent, rgba(0,255,135,0.2) 20%, rgba(59,252,255,0.2) 80%, transparent)', zIndex: 1 }} className='hide-mobile' />

      <div style={{ maxWidth: '1000px', margin: '0 auto', position: 'relative', zIndex: 2, padding: '100px 20px 100px 60px' }} className="mobile-padding-res">
      
        {/* ── HERO ── */}
        <section style={{ marginBottom: '6rem' }}>
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '20px' }}>
              <Terminal size={20} color="#4A5568" />
              <span style={{ fontSize: '0.8rem', color: '#4A5568', letterSpacing: '4px' }}>ACCESSING_PERSONA_FILE_V4</span>
            </div>
            <h1 style={{ fontSize: 'clamp(3rem, 8vw, 6rem)', fontWeight: 800, color: '#FFF', margin: 0, lineHeight: 0.9, letterSpacing: '-2px' }}>VANSH<br/><span style={{ color: '#00FF87' }}>ARORA.</span></h1>
            <p style={{ fontSize: '1.2rem', color: '#8B949E', marginTop: '20px', maxWidth: '600px', lineHeight: 1.6 }}>Full-Stack Architect & AI Systems Engineer. Deployed to Ludhiana, India. Building the next generation of neural interfaces.</p>
            
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '30px', marginTop: '40px' }}>
               {[
                 { icon: Mail, label: 'vansharora2310@gmail.com', url: 'mailto:vansharora2310@gmail.com' },
                 { icon: Github, label: 'github/VanshArora01', url: 'https://github.com/VanshArora01' },
                 { icon: Linkedin, label: 'linkdn/vansharora01', url: 'https://linkedin.com/in/vansharora01' }
               ].map(link => (
                 <a key={link.label} href={link.url} target="_blank" rel="noreferrer" style={{ display: 'flex', alignItems: 'center', gap: '10px', color: '#4A5568', textDecoration: 'none', fontSize: '0.75rem', fontWeight: 600 }}>
                   <link.icon size={16} /> {link.label}
                 </a>
               ))}
            </div>

            <div style={{ display: 'flex', gap: '20px', marginTop: '50px' }}>
               <motion.a href="/Vansh_Arora_Resume.pdf" download className="glass" style={{ padding: '12px 32px', border: '1px solid #00FF87', color: '#00FF87', borderRadius: '4px', textDecoration: 'none', fontWeight: 700, fontSize: '0.9rem', display: 'flex', alignItems: 'center', gap: '10px', background: 'rgba(0, 255, 135, 0.05)' }}>
                 <Download size={18} /> DOWNLOAD_DATA
               </motion.a>
               <button onClick={() => window.open('/Vansh_Arora_Resume.pdf', '_blank')} className="glass" style={{ padding: '12px 32px', background: 'transparent', border: '1px solid rgba(255,255,255,0.1)', color: '#CDD9E5', borderRadius: '4px', fontWeight: 700, fontSize: '0.9rem', cursor: 'pointer' }}>FULL_VIEW</button>
            </div>
          </motion.div>
        </section>

        {/* ── CORE STACK ── */}
        <Section transitionDelay={0.2}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '30px' }}>
            <Cpu size={24} color="#00FF87" />
            <h2 style={{ fontSize: '1.5rem', fontWeight: 800, margin: 0, textTransform: 'uppercase' }}>Technical Spectrum</h2>
            <div style={{ flex: 1, height: '1px', background: 'rgba(255,255,255,0.05)' }} />
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '30px' }}>
            {[
              { label: 'Neural & AI', skills: 'Groq API, Llama-3.3, ML Pipelines, NLP', color: '#3BFCFF' },
              { label: 'Core Backend', skills: 'Node.js, Express, FastAPI, WebSockets', color: '#8A2BE2' },
              { label: 'Adaptive UI', skills: 'React, Tailwind, Framer Motion, TypeScript', color: '#00FF87' },
              { label: 'Data Layers', skills: 'MongoDB, Redis, Mongoose, SQL', color: '#FFBD2E' }
            ].map(group => (
              <div key={group.label} className="glass" style={{ padding: '25px', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.05)' }}>
                <p style={{ fontSize: '0.7rem', color: '#4A5568', fontWeight: 800, letterSpacing: '2px', marginBottom: '15px' }}>{group.label}</p>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                  {group.skills.split(', ').map(s => <SkillPill key={s} color={group.color}>{s}</SkillPill>)}
                </div>
              </div>
            ))}
          </div>
        </Section>

        {/* ── MISSION LOG (EDUCATION & EXP) ── */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '80px' }}>
          
          <Section transitionDelay={0.3}>
            <TimelineNode active />
            <div style={{ display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '20px' }}>
              <BookOpen size={20} color="#00FF87" />
              <h3 style={{ fontSize: '1.5rem', fontWeight: 800, margin: 0 }}>Academic Link</h3>
            </div>
            <div style={{ marginLeft: '10px' }} className="glass" style={{ padding: '30px', borderRadius: '24px', border: '1px solid rgba(255,255,255,0.05)' }}>
              <h4 style={{ fontSize: '1.4rem', color: '#FFF', margin: 0 }}>PCTE Group of Institutes, Ludhiana</h4>
              <p style={{ fontSize: '1rem', color: '#4A5568', marginTop: '8px' }}>B.Tech in Computer Science // 2024 - 2027</p>
              <div style={{ display: 'flex', gap: '20px', marginTop: '25px' }}>
                <div style={{ padding: '15px 25px', background: 'rgba(0,255,135,0.05)', borderRadius: '12px', border: '1px solid rgba(0,255,135,0.2)' }}>
                   <p style={{ fontSize: '0.6rem', color: '#00FF87' }}>CGPA_VAL</p>
                   <p style={{ fontSize: '1.4rem', fontWeight: 800, color: '#FFF' }}>7.21/10</p>
                </div>
                {/* <div style={{ padding: '15px 25px', background: 'rgba(59,252,255,0.05)', borderRadius: '12px', border: '1px solid rgba(59,252,255,0.2)' }}>
                   <p style={{ fontSize: '0.6rem', color: '#3BFCFF' }}>CURRENT_DOMAIN</p>
                   <p style={{ fontSize: '1.4rem', fontWeight: 800, color: '#FFF' }}>U-GRAD</p>
                </div> */}
              </div>
            </div>
          </Section>

          <Section transitionDelay={0.4}>
            <TimelineNode />
            <div style={{ display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '40px' }}>
              <Rocket size={20} color="#3BFCFF" />
              <h3 style={{ fontSize: '1.5rem', fontWeight: 800, margin: 0 }}>Strategic Projects</h3>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '60px' }}>
              {[
                { title: 'DevOS', tag: 'A_AGENTIC', detail: 'Developer Execution Tool', stack: 'Node · React · Groq', desc: 'Eliminates the cold-start problem of new sessions using agentic context persistence.' },
                { title: 'Anay', tag: 'JARVIS_STYLE', detail: 'Command Assistant', stack: 'WebSockets · LLM', desc: 'Jarvis-style real action executor using natural language parsing.' },
                { title: 'Disaster Portal', tag: 'HACKATHON_WIN', detail: '1st Place DBU-25', stack: 'Socket.io · MongoDB', desc: 'Real-time multi-crisis coordination system for emergency response.' }
              ].map(proj => (
                <div key={proj.title} className="glass" style={{ position: 'relative', padding: '30px', borderRadius: '24px', border: '1px solid rgba(255,255,255,0.05)' }}>
                  <div style={{ position: 'absolute', left: 0, top: 20, bottom: 20, width: '4px', background: '#00FF87', borderRadius: '0 4px 4px 0', opacity: 0.5 }} />
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px', flexWrap: 'wrap', gap: '10px' }}>
                    <h4 style={{ fontSize: '2rem', fontWeight: 800, color: '#FFF' }}>{proj.title}</h4>
                    <span style={{ fontSize: '0.65rem', color: '#00FF87', border: '1px solid #00FF8744', padding: '4px 12px', borderRadius: '4px', fontWeight: 800, letterSpacing: '1px' }}>{proj.tag}</span>
                  </div>
                  <p style={{ fontSize: '0.9rem', color: '#4A5568', margin: '0 0 15px', letterSpacing: '1px' }}>{proj.detail} // {proj.stack}</p>
                  <p style={{ fontSize: '1.05rem', color: '#8B949E', lineHeight: 1.7 }}>{proj.desc}</p>
                </div>
              ))}
            </div>
          </Section>

          <Section transitionDelay={0.6}>
             <TimelineNode />
             <div style={{ display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '30px' }}>
                <Award size={20} color="#FFBD2E" />
                <h3 style={{ fontSize: '1.5rem', fontWeight: 800, margin: 0 }}>Hall of Fame</h3>
             </div>
             <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '25px' }}>
                {[
                  { title: '🏆 1st Place - DBU Hackathon 2025', desc: 'National level win for excellence in emergency response automation.', color: '#FFBD2E' },
                  { title: '🏆 PCTE Hackathon Winner 2024', desc: 'Winner of internal institute hackathon for full-stack engineering.', color: '#00FF87' },
                  { title: '📜 Ethical Hacking Certification', desc: 'Certified in penetration testing and offensive security systems.', color: '#3BFCFF' },
                  { title: '💡 AI Ideathon Participant', desc: 'Selected participant for rapid prototyping of generative AI agents.', color: '#8A2BE2' }
                ].map((cert, i) => (
                  <div key={i} className="glass" style={{ padding: '30px', background: `${cert.color}05`, border: `1px dashed ${cert.color}44`, borderRadius: '16px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
                     <Sparkles size={18} color={cert.color} />
                     <h4 style={{ color: '#FFF', fontSize: '1.1rem', fontWeight: 800 }}>{cert.title}</h4>
                     <p style={{ fontSize: '0.85rem', color: '#8B949E', lineHeight: 1.5 }}>{cert.desc}</p>
                  </div>
                ))}
             </div>
          </Section>

        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .mobile-padding-res { padding: 40px 20px 100px 30px !important; }
          .hide-mobile { display: none !important; }
          .resume-page-wrapper section { margin-bottom: 3rem !important; }
          h1 { font-size: 3.5rem !important; }
          .glass { padding: 20px !important; }
        }
      `}</style>
    </div>
  );
};

export default Resume;
