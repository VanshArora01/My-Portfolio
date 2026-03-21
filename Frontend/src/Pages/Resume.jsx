import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Download, ExternalLink, Mail, Linkedin, Github, Globe, Phone } from 'lucide-react';

const Section = ({ transitionDelay = 0, children, style, className }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.5, delay: transitionDelay }}
      style={style}
      className={className}
    >
      {children}
    </motion.div>
  );
};

const SkillPill = ({ children }) => (
  <span style={{
    background: '#161B22',
    border: '1px solid #21262D',
    color: '#00FF87',
    padding: '0.25rem 0.75rem',
    borderRadius: '100px',
    fontSize: '0.75rem',
    fontWeight: 600,
    display: 'inline-block'
  }}>
    {children}
  </span>
);

const HackathonCard = ({ badge, event, project, date, description, stack, border }) => (
  <div className="resume-card" style={{ borderLeft: border }}>
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '0.5rem' }}>
      <div style={{ color: '#FFBD2E', fontWeight: 800, fontSize: '0.8rem' }}>{badge}</div>
      {date && <div style={{ color: '#4A5568', fontSize: '0.8rem', fontFamily: 'JetBrains Mono' }}>{date}</div>}
    </div>
    <div style={{ color: '#00FF87', fontWeight: 700, fontSize: '1.2rem', marginBottom: '0.25rem' }}>{event}</div>
    {project && <div style={{ color: '#CDD9E5', fontWeight: 600, fontSize: '1rem', marginBottom: '0.75rem' }}>{project}</div>}
    
    <p style={{ color: '#8B949E', fontSize: '0.9rem', lineHeight: 1.6, marginBottom: '1rem' }}>{description}</p>
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
      {stack.split(' · ').map(s => <SkillPill key={s}>{s}</SkillPill>)}
    </div>
  </div>
);

const ProjectCard = ({ filepath, tag, title, description, arch, stack, links, tagColor = '#3BFCFF' }) => (
  <div className="resume-card" style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
    <div style={{ fontSize: '0.75rem', color: '#4A5568', marginBottom: '1rem', fontFamily: 'JetBrains Mono' }}>
      <div style={{ display: 'flex', gap: '6px', marginBottom: '6px' }}>
        <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#ff5f57' }} />
        <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#febc2e' }} />
        <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#28c840' }} />
      </div>
      {filepath}
    </div>
    <div style={{ display: 'flex', gap: '8px', marginBottom: '0.75rem' }}>
      <span style={{ background: `${tagColor}15`, border: `1px solid ${tagColor}40`, color: tagColor, padding: '2px 8px', borderRadius: '4px', fontSize: '0.65rem', fontWeight: 700 }}>{tag}</span>
    </div>
    <h3 style={{ color: '#00FF87', fontSize: '1.25rem', fontWeight: 700, marginBottom: '0.5rem' }}>{title}</h3>
    <p style={{ color: '#8B949E', fontSize: '0.9rem', lineHeight: 1.6, marginBottom: '1rem', flex: 1 }}>{description}</p>
    {arch && <div style={{ color: '#3BFCFF', fontSize: '0.85rem', marginBottom: '1rem', lineHeight: 1.5, background: '#0D1117', padding: '0.75rem', borderRadius: '8px', border: '1px solid #21262D' }}>{arch}</div>}
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: '1rem' }}>
      {stack.split(' · ').map(s => <SkillPill key={s}>{s}</SkillPill>)}
    </div>
    <div style={{ display: 'flex', gap: '1rem', marginTop: 'auto' }}>
      {links.map(l => (
        <a key={l.label} href={l.url} target="_blank" rel="noreferrer" style={{ color: '#3BFCFF', textDecoration: 'none', fontSize: '0.85rem', display: 'flex', alignItems: 'center', gap: '4px', fontWeight: 600 }} className="link-hover">
          {l.label} <ExternalLink size={14} />
        </a>
      ))}
    </div>
  </div>
);

const SectionHeader = ({ title, cmd }) => (
  <div style={{ marginBottom: '1rem' }}>
    {cmd && <div style={{ color: '#4A5568', fontSize: '0.8rem', marginBottom: '0.25rem', fontFamily: 'JetBrains Mono' }}>&gt; {cmd}</div>}
    <h2 style={{ color: '#E6EDF3', fontSize: '1.5rem', fontWeight: 700, margin: 0, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
      <span style={{ color: '#00FF87', marginRight: '8px' }}>~/</span>{title}
    </h2>
  </div>
);

const Resume = () => {
  return (
    <div style={{ background: '#050A0E', minHeight: '100vh', fontFamily: 'Inter, sans-serif', color: '#CDD9E5', padding: '2rem 1.5rem 6rem 1.5rem' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        
        {/* HEADER SECTION */}
        <Section transitionDelay={0}>
          <div className="resume-header">
            <div>
              <h1 style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)', fontWeight: 800, color: '#FFFFFF', margin: 0, marginBottom: '0.5rem', lineHeight: 1.1 }}>VANSH ARORA</h1>
              <div style={{ color: '#00FF87', fontSize: '1rem', letterSpacing: '0.05em', fontWeight: 600, marginBottom: '1.5rem', fontFamily: 'JetBrains Mono' }}>
                Full Stack Developer · AI Engineer · 2× Hackathon Winner
              </div>
              <div className="contact-links">
                {[
                  { icon: Mail, label: 'vansharora2310@gmail.com', url: 'mailto:vansharora2310@gmail.com' },
                  { icon: Linkedin, label: 'linkedin.com/in/vansharora01', url: 'https://linkedin.com/in/vansharora01' },
                  { icon: Github, label: 'github.com/VanshArora01', url: 'https://github.com/VanshArora01' },
                  { icon: Globe, label: 'vanshcodes01.onrender.com', url: 'https://vanshcodes01.onrender.com' },
                  { icon: Phone, label: '+91 7087780200', url: 'tel:+917087780200' },
                ].map((item, i) => (
                  <a key={i} href={item.url} target="_blank" rel="noreferrer" className="contact-link">
                    <item.icon size={14} /> {item.label}
                  </a>
                ))}
              </div>
            </div>
            
            <div className="pdf-actions">
              <motion.a
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                href="/Vansh_Arora_Resume.pdf"
                download
                className="btn-primary"
              >
                <Download size={18} /> Download PDF
              </motion.a>
              <motion.button
                whileHover={{ scale: 1.02, borderColor: '#00FF87', color: '#00FF87' }}
                whileTap={{ scale: 0.98 }}
                onClick={() => window.open('/Vansh_Arora_Resume.pdf', '_blank')}
                className="btn-secondary"
              >
                <ExternalLink size={18} /> Full Screen
              </motion.button>
            </div>
          </div>
        </Section>

        <div className="resume-grid">
          {/* LEFT COLUMN */}
          <div className="resume-col">
            
            {/* EDUCATION */}
            <Section transitionDelay={0.1}>
              <SectionHeader title="education" cmd="cat education.txt" />
              <div className="resume-card">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1rem', marginBottom: '0.5rem' }}>
                  <div style={{ color: '#00FF87', fontSize: '1.1rem', fontWeight: 700 }}>PCTE Group of Institutes, Ludhiana</div>
                  <span style={{ background: 'rgba(0,255,135,0.08)', border: '1px solid rgba(0,255,135,0.3)', color: '#00FF87', padding: '2px 10px', borderRadius: '4px', fontSize: '0.7rem', fontWeight: 700 }}>In Progress</span>
                </div>
                <div style={{ color: '#E6EDF3', fontSize: '1rem', fontWeight: 600, marginBottom: '0.25rem' }}>B.Tech — Computer Science & Engineering</div>
                <div style={{ color: '#8B949E', fontSize: '0.9rem', marginBottom: '0.75rem', fontFamily: 'JetBrains Mono' }}>2024 – 2027 (Currently in 6th Semester)</div>
                <div style={{ color: '#3BFCFF', fontSize: '0.9rem', fontWeight: 600, fontFamily: 'JetBrains Mono' }}>CGPA: 7.21 / 10</div>
              </div>
            </Section>

            {/* TECHNICAL SKILLS */}
            <Section transitionDelay={0.2}>
              <SectionHeader title="skills" cmd="cat skills.txt" />
              <div className="resume-card">
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                  {[
                    { label: 'Languages', skills: 'JavaScript (ES6+), Python' },
                    { label: 'Frontend', skills: 'React.js, HTML5, CSS3, Tailwind CSS, TypeScript' },
                    { label: 'Backend', skills: 'Node.js, Express.js, FastAPI, REST, WebSockets, Events' },
                    { label: 'Database', skills: 'MongoDB, Mongoose, NoSQL Schema, Indexing' },
                    { label: 'AI / ML', skills: 'Groq API, LLaMA-3.3, Function Calling, ML Integration, Pipelines' },
                    { label: 'Payments & Tools', skills: 'Razorpay, Git, GitHub, Vercel, Postman, Linux, Brevo SMTP' },
                  ].map((group, i) => (
                    <div key={i}>
                      <div style={{ color: '#CDD9E5', fontSize: '0.85rem', fontWeight: 700, marginBottom: '0.5rem', fontFamily: 'JetBrains Mono' }}>{group.label}:</div>
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                        {group.skills.split(', ').map((s, idx) => <SkillPill key={`${s}-${idx}`}>{s}</SkillPill>)}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </Section>

            {/* DSA PROGRESS */}
            <Section transitionDelay={0.3}>
              <SectionHeader title="dsa-progress" cmd="cat dsa.txt" />
              <div className="resume-card">
                <p style={{ color: '#8B949E', fontSize: '0.9rem', marginBottom: '1.5rem', fontStyle: 'italic' }}>"Actively solving problems on LeetCode in JavaScript."</p>
                
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                  <div>
                    <div style={{ color: '#00FF87', fontSize: '0.75rem', fontWeight: 700, marginBottom: '0.5rem', fontFamily: 'JetBrains Mono' }}>SOLID:</div>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                      {['Arrays', 'Strings', 'Hash Maps', 'Two Pointers', 'Sliding Window'].map(s => (
                        <span key={s} style={{ background: '#00FF8710', border: '1px solid #00FF8740', color: '#00FF87', padding: '4px 10px', borderRadius: '4px', fontSize: '0.75rem', fontWeight: 600 }}>{s}</span>
                      ))}
                    </div>
                  </div>

                  <div>
                    <div style={{ color: '#3BFCFF', fontSize: '0.75rem', fontWeight: 700, marginBottom: '0.5rem', fontFamily: 'JetBrains Mono' }}>IN PROGRESS:</div>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                      {['Recursion', 'Binary Trees', 'BFS/DFS', 'Graph Traversal'].map(s => (
                        <span key={s} style={{ background: '#3BFCFF10', border: '1px solid #3BFCFF40', color: '#3BFCFF', padding: '4px 10px', borderRadius: '4px', fontSize: '0.75rem', fontWeight: 600 }}>{s}</span>
                      ))}
                    </div>
                  </div>

                  <div>
                    <div style={{ color: '#8B949E', fontSize: '0.75rem', fontWeight: 700, marginBottom: '0.5rem', fontFamily: 'JetBrains Mono' }}>UPCOMING:</div>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                      {['Dynamic Programming', 'Backtracking', 'Advanced Graphs'].map(s => (
                        <span key={s} style={{ background: '#21262D', border: '1px solid #30363D', color: '#8B949E', padding: '4px 10px', borderRadius: '4px', fontSize: '0.75rem', fontWeight: 600 }}>{s}</span>
                      ))}
                    </div>
                  </div>
                </div>

                <div style={{ marginTop: '1.5rem', paddingTop: '1.5rem', borderTop: '1px solid #21262D' }}>
                  <div style={{ color: '#CDD9E5', fontSize: '0.75rem', fontWeight: 700, marginBottom: '0.75rem', fontFamily: 'JetBrains Mono' }}>DSA Journey Progress</div>
                  <div style={{ display: 'flex', gap: '4px', height: '6px' }}>
                    <div style={{ flex: 1, background: '#00FF87', borderRadius: '2px' }} />
                    <div style={{ flex: 1, background: '#00FF87', borderRadius: '2px' }} />
                    <div style={{ flex: 1, background: '#00FF87', borderRadius: '2px' }} />
                    <div style={{ flex: 1, background: '#21262D', borderRadius: '2px', position: 'relative', overflow: 'hidden' }}>
                      <div style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: '60%', background: '#3BFCFF' }} />
                    </div>
                    <div style={{ flex: 1, background: '#21262D', borderRadius: '2px' }} />
                  </div>
                </div>
              </div>
            </Section>

            {/* TRAINING */}
            <Section transitionDelay={0.4}>
              <SectionHeader title="training" cmd="cat training.txt" />
              <div className="resume-card">
                <div style={{ color: '#00FF87', fontSize: '1rem', fontWeight: 700, marginBottom: '0.25rem' }}>Full Stack Development</div>
                <div style={{ color: '#E6EDF3', fontSize: '0.9rem', fontWeight: 600, marginBottom: '0.25rem' }}>Sensation Software</div>
                <div style={{ color: '#8B949E', fontSize: '0.8rem', marginBottom: '0.75rem', fontFamily: 'JetBrains Mono' }}>Summer 2024</div>
                <p style={{ color: '#8B949E', fontSize: '0.85rem', lineHeight: 1.6 }}>Covered REST API design, MVC architecture, MongoDB integrations, and production workflows.</p>
              </div>
            </Section>

            {/* LEARNING NOW */}
            <Section transitionDelay={0.5} style={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
               <SectionHeader title="learning-now" cmd="> actively improving" />
               <div className="resume-card" style={{ display: 'flex', alignContent: 'flex-start', flexWrap: 'wrap', gap: '8px', flex: 1 }}>
                {['DSA in JS', 'System Design', 'TypeScript Adv.', 'LLM Fine-tuning', 'Electron.js', 'Local AI Models'].map(s => (
                  <span key={s} style={{ background: '#3BFCFF10', border: '1px solid #3BFCFF30', color: '#3BFCFF', padding: '6px 12px', borderRadius: '100px', fontSize: '0.8rem', fontWeight: 600, fontFamily: 'JetBrains Mono' }}>{s}</span>
                ))}
              </div>
            </Section>

          </div>

          {/* RIGHT COLUMN */}
          <div className="resume-col">
            
            {/* PROJECTS */}
            <Section transitionDelay={0.4}>
              <SectionHeader title="projects" cmd="ls -la ~/projects" />
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <ProjectCard
                  filepath="~/projects/devos"
                  tag="🚧 Personal · In Development"
                  title="DevOS — Developer Execution Continuity Tool"
                  description="Solves the cold-start problem developers face every session. Persists project context, tasks, Git state, and session history so you never lose momentum between coding sessions."
                  arch="▸ Groq LLaMA-3.3-70b with 4 agentic function-calling tools: create_reminder, mark_milestone_done, log_work_session, send_standup_email"
                  stack="React · TypeScript · Node.js · MongoDB · Groq · Brevo SMTP · Recharts"
                  links={[{ label: 'GitHub', url: 'https://github.com/VanshArora01' }]}
                  tagColor="#3BFCFF"
                />
                
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1rem' }}>
                  <ProjectCard
                    filepath="~/projects/khudkojano"
                    tag="💼 Client Project"
                    title="KhudKoJano — AI Astrology"
                    description="Production subscription platform with Razorpay integration and automated AI PDF generation."
                    stack="React · Node.js · Razorpay · LLM · PDF"
                    links={[{ label: 'Live', url: 'https://khudkojano.onrender.com' }]}
                    tagColor="#8A2BE2"
                  />
                  <ProjectCard
                    filepath="~/projects/anay"
                    tag="🏆 Hackathon Project"
                    title="Anay — Conversational AI"
                    description="Jarvis-style AI assistant executing real actions with natural voice interaction."
                    stack="React · Node.js · LLM · WebSockets"
                    links={[{ label: 'Live', url: 'https://anay-6p54.onrender.com' }]}
                    tagColor="#00FF87"
                  />
                </div>
                
                <ProjectCard
                  filepath="~/projects/disaster-mgmt"
                  tag="🏆 1st Place — DBU Hackathon 2025"
                  title="Disaster Management Portal"
                  description="Dual-portal system (Admin + User) for real-time disaster response coordination. Eliminates polling with active WebSockets for high-frequency emergency updates."
                  stack="React · Node.js · WebSockets · socket.io · MongoDB · JWT"
                  links={[{ label: 'GitHub', url: 'https://github.com/VanshArora01' }]}
                  tagColor="#FFBD2E"
                />
              </div>
            </Section>

            {/* HACKATHONS */}
            <Section transitionDelay={0.5}>
              <SectionHeader title="hackathon-wins" cmd="cat achievements.txt" />
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <HackathonCard
                  badge="🏆 1ST PLACE"
                  event="Desh Bhagat University Hackathon"
                  project="Disaster Management Portal"
                  date="2025"
                  description="Built a dual-portal real-time system with WebSocket-based live alerts, RBAC, multi-severity event classification, and analytics dashboard."
                  stack="React · Node.js · WebSockets · MongoDB"
                  border="3px solid #FFBD2E"
                />
                <HackathonCard
                  badge="🏆 WINNER"
                  event="PCTE Group of Institutes Hackathon"
                  project="Full Stack Web Application"
                  date="2024"
                  description="Won the internal hackathon, demonstrating rapid full-stack prototyping under intense time constraints."
                  stack="React · Node.js · MongoDB"
                  border="3px solid #00FF87"
                />
              </div>
            </Section>

            {/* CERTIFICATIONS */}
            <Section transitionDelay={0.7} style={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
              <SectionHeader title="certifications" cmd="cat certs.txt" />
              <div className="resume-card" style={{ flex: 1 }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                  {[
                    '🏆 1st Place — DBU Hackathon 2025 (Disaster Management)',
                    '🏆 PCTE Hackathon Winner',
                    '📜 Ethical Hacking Workshop — Certificate of Participation',
                    '💡 Ideathon — Certificate of Participation',
                  ].map((cert, i) => (
                    <div key={i} style={{ color: '#E6EDF3', fontSize: '0.9rem', display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <span style={{ color: '#00FF87', fontWeight: 800 }}>&gt;</span> {cert}
                    </div>
                  ))}
                </div>
              </div>
            </Section>

          </div>
        </div>
      </div>

      <style>{`
        .resume-header {
          background: #0D1117;
          border: 1px solid #30363D;
          border-radius: 16px;
          padding: 2.5rem;
          margin-bottom: 2rem;
          display: flex;
          flex-wrap: wrap;
          justify-content: space-between;
          align-items: flex-start;
          gap: 2rem;
          box-shadow: 0 10px 30px rgba(0,0,0,0.5);
        }
        .contact-links {
          display: flex;
          flex-wrap: wrap;
          gap: 1rem 1.5rem;
        }
        .contact-link {
          color: #8B949E;
          text-decoration: none;
          font-size: 0.85rem;
          display: flex;
          align-items: center;
          gap: 6px;
          font-family: 'JetBrains Mono', monospace;
          transition: color 0.2s ease;
        }
        .contact-link:hover {
          color: #00FF87;
        }
        .pdf-actions {
          display: flex;
          gap: 1rem;
          flex-wrap: wrap;
        }
        .btn-primary {
          background: #00FF87;
          color: #050A0E;
          padding: 0.75rem 1.5rem;
          border-radius: 8px;
          font-weight: 700;
          font-size: 0.9rem;
          text-decoration: none;
          display: flex;
          align-items: center;
          gap: 8px;
          border: 1px solid #00FF87;
          transition: all 0.2s ease;
        }
        .btn-secondary {
          background: rgba(255,255,255,0.03);
          border: 1px solid #30363D;
          color: #CDD9E5;
          padding: 0.75rem 1.5rem;
          border-radius: 8px;
          font-weight: 700;
          font-size: 0.9rem;
          cursor: pointer;
          display: flex;
          align-items: center;
          gap: 8px;
          backdrop-filter: blur(10px);
          transition: all 0.2s ease;
        }
        
        .resume-grid {
          display: grid;
          grid-template-columns: 1fr 1.6fr; /* Left col a bit narrower */
          gap: 2rem;
        }
        .resume-col {
          display: flex;
          flex-direction: column;
          gap: 2rem;
          height: 100%;
        }

        .resume-card {
          background: rgba(13, 17, 23, 0.6);
          backdrop-filter: blur(10px);
          border: 1px solid #30363D;
          border-radius: 12px;
          padding: 1.5rem;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }
        .resume-card:hover {
          border-color: #00FF8780;
          background: rgba(13, 17, 23, 0.9);
          box-shadow: 0 8px 24px rgba(0,0,0,0.2);
        }
        .link-hover:hover {
          color: #00FF87 !important;
        }

        @media (max-width: 960px) {
          .resume-grid {
            grid-template-columns: 1fr;
          }
          .resume-header {
            padding: 1.5rem;
          }
        }
      `}</style>
    </div>
  );
};

export default Resume;
