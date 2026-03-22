import React from 'react';
import { motion } from 'framer-motion';
import { TypeAnimation } from 'react-type-animation';
import { Github, Linkedin, Cpu } from 'lucide-react';
import { Link as ScrollLink } from 'react-scroll';
import Particles from '../Components/Particles';
import HeroProfileCard from '../Components/HeroProfileCard';
import meImage from '../assets/Me1.png';

const Herosection = () => {
  return (
    <section 
      id="hero" 
      className="mesh-bg full-screen-section" 
      style={{ 
        position: 'relative', 
        minHeight: '100vh',
        overflow: 'hidden', 
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: '#050A0E'
      }}
    >
      
      {/* 1. Particles Background */}
      <div style={{
        position: 'absolute',
        inset: 0,
        zIndex: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'all'
      }}>
        <Particles
          particleColors={["#00FF87", "#00FF87", "#3BFCFF", "#ffffff"]}
          particleCount={800}
          particleSpread={15}
          speed={0.1}
          particleBaseSize={100}
          moveParticlesOnHover={true}
          particleHoverFactor={1.5}
          alphaParticles={true}
          disableRotation={false}
          pixelRatio={typeof window !== 'undefined' ? (window.devicePixelRatio || 1) : 1}
          sizeRandomness={1}
          cameraDistance={20}
        />
      </div>

      {/* 2. Radial Vignette */}
      <div style={{
        position: 'absolute',
        inset: 0,
        zIndex: 1,
        pointerEvents: 'none',
        background: 'radial-gradient(ellipse at 50% 50%, transparent 20%, rgba(5,10,14,0.7) 70%, rgba(5,10,14,0.95) 100%)'
      }} />

      {/* 3. Scanline Overlay */}
      <div style={{
        position: 'absolute',
        inset: 0,
        zIndex: 2,
        pointerEvents: 'none',
        backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,255,135,0.02) 2px, rgba(0,255,135,0.02) 4px)'
      }} />

      {/* Floating 3D Blobs for Atmosphere */}
      <motion.div 
        animate={{ x: [0, 40, -40, 0], y: [0, -40, 40, 0] }}
        transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
        style={{ position: 'absolute', top: '20%', left: '15%', width: '400px', height: '400px', background: 'radial-gradient(circle, rgba(0, 255, 135, 0.08) 0%, transparent 70%)', filter: 'blur(80px)', zIndex: 2 }}
      />
      
      {/* 4. Main Hero Content */}
      <div 
        style={{ 
          maxWidth: '1150px', 
          width: '100%', 
          margin: '0 auto', 
          padding: '0 1.5rem', 
          position: 'relative', 
          zIndex: 3, 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'space-between', 
          gap: 'clamp(2rem, 5vw, 4rem)',
          pointerEvents: 'none' 
        }} 
        className="hero-container"
      >
        
        {/* Left Side: Content Reveal */}
        <div style={{ flex: 1, maxWidth: '650px', pointerEvents: 'auto' }}>
          
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            
            {/* Status & Info Badges */}
            <div style={{ display: 'flex', gap: '1rem', marginBottom: '2rem' }}>
              <div className="glass" style={{ padding: '6px 14px', borderRadius: '100px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                 <div className="pulse-dot" style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#00FF87' }} />
                 <span style={{ color: '#00FF87', fontSize: '0.7rem', fontWeight: 800, letterSpacing: '0.05em', textTransform: 'uppercase' }}>System Active</span>
              </div>
              <div className="glass" style={{ padding: '6px 14px', borderRadius: '100px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                 <Cpu size={12} color="#3BFCFF" />
                 <span style={{ color: '#8B949E', fontSize: '0.7rem', fontWeight: 700 }}>AI Systems Architect</span>
              </div>
            </div>

            <motion.h1 
              className="text-glow glitch" 
              style={{ 
                fontSize: 'clamp(2.5rem, 7vw, 4.2rem)', 
                lineHeight: 1.1, 
                fontWeight: 800, 
                background: 'linear-gradient(90deg, #00FF87, #3BFCFF)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                letterSpacing: '-0.04em', 
                marginBottom: '1.5rem', 
                cursor: 'default' 
              }}
            >
              Vansh Arora.
            </motion.h1>
            
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '3rem' }}>
              <div style={{ width: '40px', height: '1px', background: '#00FF87' }} />
              <TypeAnimation
                sequence={['Full Stack Architect', 2000, 'AI Systems Engineer', 2000, 'Creative Technologist', 2000]}
                wrapper="span"
                speed={50}
                repeat={Infinity}
                style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '1.1rem', color: '#8B949E', fontWeight: 600, letterSpacing: '0.15em', textTransform: 'uppercase' }}
              />
            </div>

            <motion.div className="glass" style={{ padding: 'clamp(1.5rem, 3vw, 2rem)', borderRadius: '24px', marginBottom: 'clamp(1.5rem, 4vw, 2.5rem)', borderLeft: '4px solid #00FF87' }}>
              <p style={{ color: '#CDD9E5', fontSize: 'clamp(0.95rem, 1.2vw, 1.05rem)', lineHeight: 1.7, fontWeight: 500 }}>
                Specializing in bridging the gap between <span style={{ color: '#00FF87' }}>complex AI models</span> and <span style={{ color: '#3BFCFF' }}>production-scale systems</span>. My builds prioritize precision, low-latency, and cinematic UX.
              </p>
            </motion.div>

            <div style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap' }}>
              <ScrollLink
                to="contact"
                smooth={true}
                duration={800}
                style={{ textDecoration: 'none' }}
              >
                <motion.button 
                  whileHover={{ scale: 1.05, y: -5 }}
                  whileTap={{ scale: 0.95 }}
                  className="shimmer"
                  style={{ 
                    background: '#00FF87', 
                    color: '#030708', 
                    padding: '1.25rem 2.5rem', 
                    borderRadius: '16px', 
                    fontWeight: 800, 
                    fontSize: '1rem', 
                    border: 'none', 
                    cursor: 'pointer', 
                    boxShadow: '0 15px 35px -10px rgba(0, 255, 135, 0.4)', 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'center',
                    width: '100%'
                  }}
                >
                  Initiate Project
                </motion.button>
              </ScrollLink>
              
              <div style={{ display: 'flex', gap: '0.75rem' }}>
                {[
                  { Icon: Github, href: 'https://github.com/VanshArora01' },
                  { Icon: Linkedin, href: 'https://linkedin.com/in/vansharora01' }
                ].map((social, i) => (
                  <motion.a 
                    key={i} href={social.href} target="_blank" rel="noreferrer"
                    whileHover={{ scale: 1.1, y: -5, background: 'rgba(255,255,255,0.05)' }} 
                    style={{ width: '56px', height: '56px', borderRadius: '14px', border: '1px solid rgba(255,255,255,0.05)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#8B949E', textDecoration: 'none', backdropFilter: 'blur(10px)' }}
                  >
                    <social.Icon size={24} />
                  </motion.a>
                ))}
              </div>
            </div>
          </motion.div>
        </div>

        <div 
          className="hero-right" 
          style={{ 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center', 
            flex: '0 0 320px',
            pointerEvents: 'auto'
          }}
        >
          <HeroProfileCard
            name="Vansh Arora"
            description=""
            image={meImage}
            isVerified={true}
            enableAnimations={true}
            onContactClick={() => {
              const el = document.getElementById('contact');
              if (el) el.scrollIntoView({ behavior: 'smooth' });
              else window.location.href = '/#contact';
            }}
          />
        </div>
      </div>

      <style>{`
        @media (max-width: 1024px) {
          .hero-container { gap: 3rem !important; }
        }
        @media (max-width: 968px) {
          .hero-container { flex-direction: column !important; text-align: center; gap: 2rem !important; padding: 1rem 1.5rem !important; }
          .hero-right { order: -1; margin-bottom: 0px !important; }
          .hero-container > div { max-width: 100% !important; display: flex; flex-direction: column; align-items: center; }
          .hero-container h1 { font-size: clamp(2.2rem, 10vw, 3.5rem) !important; }
          .hero-container .glass { padding: 1.5rem !important; margin-bottom: 2rem !important; }
          .hero-container div[style*="flex-wrap: wrap"] { justify-content: center; }
        }
        @media (max-width: 480px) {
          .hero-container h1 { font-size: 2.2rem !important; }
          .hero-container span[style*="font-size: 1.1rem"] { font-size: 0.9rem !important; }
          .hero-container p { fontSize: 0.9rem !important; }
        }
      `}</style>
    </section>
  );
};

export default Herosection;