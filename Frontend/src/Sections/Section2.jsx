import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { LogoLoop } from '../Components/LogoLoop';
import { SiReact, SiNodedotjs, SiExpress, SiMongodb, SiPython, SiFastapi, SiTypescript, SiTailwindcss, SiGit, SiNextdotjs, SiDocker, SiFirebase } from 'react-icons/si';

const iconColor = '#00FF87';

const allLogos = [
  { node: <SiReact color={iconColor} />, title: 'React' },
  { node: <SiNodedotjs color={iconColor} />, title: 'Node.js' },
  { node: <SiExpress color={iconColor} />, title: 'Express' },
  { node: <SiMongodb color={iconColor} />, title: 'MongoDB' },
  { node: <SiPython color={iconColor} />, title: 'Python' },
  { node: <SiFastapi color={iconColor} />, title: 'FastAPI' },
  { node: <SiTypescript color={iconColor} />, title: 'TypeScript' },
  { node: <SiTailwindcss color={iconColor} />, title: 'Tailwind' },
  { node: <SiGit color={iconColor} />, title: 'Git' },
  { node: <SiNextdotjs color={iconColor} />, title: 'Next.js' },
  { node: <SiDocker color={iconColor} />, title: 'Docker' },
  { node: <SiFirebase color={iconColor} />, title: 'Firebase' },
];

const Section2 = () => {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, margin: '-100px' });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.2 } }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }
  };

  return (
    <section ref={containerRef} id="skills" style={{ padding: '6rem 0', overflow: 'hidden', position: 'relative' }}>
      
      {/* Background Accent */}
      <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: '800px', height: '400px', background: 'radial-gradient(ellipse at center, rgba(0, 255, 135, 0.03) 0%, transparent 70%)', zIndex: 0 }} />

      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 2.5rem', position: 'relative', zIndex: 1 }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          style={{ marginBottom: '6rem', textAlign: 'center' }}
        >
          <p className="text-glow" style={{ fontFamily: 'JetBrains Mono, monospace', color: '#00FF87', fontSize: '0.85rem', fontWeight: 600, letterSpacing: '0.3em', textTransform: 'uppercase', marginBottom: '0.75rem' }}>
            Capabilities
          </p>
          <h2 style={{ fontSize: 'clamp(2rem, 5vw, 3.2rem)', fontWeight: 800, color: '#F0F6FC', letterSpacing: '-0.02em' }}>
            Mastering the <span style={{ color: '#00FF87' }}>Stack.</span>
          </h2>
        </motion.div>
      </div>

      {/* Full-width technology slider */}
      <div style={{ width: '100%', marginBottom: '6rem', position: 'relative', zIndex: 1 }}>
        <LogoLoop
          logos={allLogos}
          speed={80}
          direction="left"
          logoHeight={45}
          gap={60}
          scaleOnHover={false}
          fadeOut={true}
        />
      </div>

      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 2.5rem', position: 'relative', zIndex: 1 }}>
        {/* Stats Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="stats-grid"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '2rem',
            fontFamily: 'JetBrains Mono, monospace'
          }}
        >
          {[
            { value: '10+', label: 'Production Apps', sub: 'Deployed & Scaling', color: '#00FF87' },
            { value: '2×', label: 'Hackathon Wins', sub: 'National Level', color: '#3BFCFF' },
            { value: '99%', label: 'Stability', sub: 'In Production', color: '#8A2BE2' }
          ].map((stat, i) => (
            <motion.div 
              key={i} 
              variants={itemVariants}
              className="glass stat-card"
              style={{
                padding: '3rem 2rem', borderBottom: `4px solid ${stat.color}`,
                borderRadius: '24px', textAlign: 'center'
              }}
              whileHover={{ y: -10, boxShadow: `0 20px 40px -20px ${stat.color}33` }}
            >
              <div style={{ color: stat.color, fontSize: '4.5rem', fontWeight: 800, lineHeight: 1, marginBottom: '0.8rem' }} className="text-glow stat-value">
                {stat.value}
              </div>
              <div style={{ color: '#F0F6FC', fontSize: '1.25rem', fontWeight: 700, marginBottom: '0.25rem' }} className="stat-label">
                {stat.label}
              </div>
              <div style={{ color: '#6E7681', fontSize: '0.9rem' }} className="stat-sub">
                {stat.sub}
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Secondary Skills Chips */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 1, duration: 1 }}
          style={{
            marginTop: '4rem',
            display: 'flex',
            justifyContent: 'center',
            gap: '0.85rem',
            flexWrap: 'wrap'
          }}
        >
          {/* {["System Design", "Cloud Architecture", "LLM Fine-tuning", "Socket.io", "Geospatial Indexing", "CI/CD"].map((skill) => (
            <span
              key={skill}
              className="glass"
              style={{
                padding: '8px 20px',
                borderRadius: '100px',
                fontSize: '0.8rem',
                color: '#8B949E',
                border: '1px solid rgba(255,255,255,0.05)',
                transition: 'all 0.3s ease'
              }}
              onMouseEnter={e => { e.currentTarget.style.color = '#00FF87'; e.currentTarget.style.borderColor = 'rgba(0, 255, 135, 0.3)'; }}
              onMouseLeave={e => { e.currentTarget.style.color = '#8B949E'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.05)'; }}
            >
              {skill}
            </span>
          ))} */}
        </motion.div>
      </div>
    </section>
  );
};

export default Section2;