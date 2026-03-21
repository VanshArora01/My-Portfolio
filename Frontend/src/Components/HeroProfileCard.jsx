import { motion, useReducedMotion } from 'framer-motion';
import { Check } from 'lucide-react';
import { useState } from 'react';

const HeroProfileCard = ({
  name = 'Vansh Arora',
  description = 'Full Stack Developer & AI Engineer. I build things people actually use — from production client apps to hackathon-winning platforms.',
  image = '/your-photo.jpg',
  isVerified = true,
  enableAnimations = true,
  className = '',
  onContactClick = () => {},
}) => {
  const [hovered, setHovered] = useState(false);
  const shouldReduceMotion = useReducedMotion();
  const shouldAnimate = enableAnimations && !shouldReduceMotion;

  const containerVariants = {
    rest: { scale: 1, y: 0 },
    hover: shouldAnimate ? {
      scale: 1.02,
      y: -6,
      transition: { type: 'spring', stiffness: 400, damping: 28, mass: 0.6 }
    } : {}
  };

  const imageVariants = {
    rest: { scale: 1 },
    hover: { scale: 1.06, transition: { type: 'spring', stiffness: 300, damping: 30 } }
  };

  const contentVariants = {
    hidden: { opacity: 0, y: 20, filter: 'blur(4px)' },
    visible: {
      opacity: 1, y: 0, filter: 'blur(0px)',
      transition: {
        type: 'spring', stiffness: 400, damping: 28, mass: 0.6,
        staggerChildren: 0.08, delayChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 15, scale: 0.95, filter: 'blur(2px)' },
    visible: {
      opacity: 1, y: 0, scale: 1, filter: 'blur(0px)',
      transition: { type: 'spring', stiffness: 400, damping: 25, mass: 0.5 }
    }
  };

  const letterVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1, scale: 1,
      transition: { type: 'spring', damping: 8, stiffness: 200, mass: 0.8 }
    }
  };

  const stats = [
    { label: 'Hackathon Wins', value: '2×' },
    { label: 'Client Apps', value: '3+' },
    { label: 'Projects', value: '8+' },
  ];

  return (
    <motion.div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      initial="rest"
      whileHover="hover"
      variants={containerVariants}
      className={className}
      style={{
        position: 'relative',
        width: '100%',
        maxWidth: '310px',
        aspectRatio: '300/420',
        borderRadius: '24px',
        border: '1px solid #21262D',
        overflow: 'hidden',
        cursor: 'pointer',
        boxShadow: hovered
          ? '0 0 0 1px rgba(0,255,135,0.3), 0 25px 60px rgba(0,0,0,0.7), 0 0 40px rgba(0,255,135,0.1)'
          : '0 25px 50px rgba(0,0,0,0.6)',
        transition: 'box-shadow 0.3s ease',
      }}
    >
      {/* Full cover image */}
      <motion.img
        src={image}
        alt={name}
        variants={imageVariants}
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          objectFit: 'contain',
          objectPosition: 'center center',
          background: 'linear-gradient(145deg, #0D1117 0%, #0A1628 100%)',
        }}
        onError={e => {
          e.target.style.display = 'none';
          e.target.parentElement.style.background = 'linear-gradient(145deg, #0D1117 0%, #0A1628 100%)';
        }}
      />

      {/* Subtle dark gradient overlay — only at the bottom for text legibility */}
      <div style={{
        position: 'absolute', inset: 0,
        background: 'linear-gradient(to top, rgba(5,10,14,0.95) 0%, rgba(5,10,14,0.4) 25%, transparent 50%)'
      }} />
      <div style={{
        position: 'absolute', bottom: 0, left: 0, right: 0, height: '35%',
        background: 'linear-gradient(to top, rgba(5,10,14,0.8) 0%, transparent 100%)',
      }} />

      {/* Green glow on hover */}
      <div style={{
        position: 'absolute', inset: 0,
        background: 'radial-gradient(ellipse at 50% 100%, rgba(0,255,135,0.06) 0%, transparent 70%)',
        opacity: hovered ? 1 : 0,
        transition: 'opacity 0.3s ease',
        pointerEvents: 'none',
      }} />

      {/* Top bar: terminal dots + status */}
      <motion.div
        variants={itemVariants}
        style={{
          position: 'absolute', top: 0, left: 0, right: 0,
          padding: '14px 16px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          background: 'linear-gradient(to bottom, rgba(5,10,14,0.6), transparent)',
        }}
      >
        <div style={{ display: 'flex', gap: '5px' }}>
          {['#FF5F57','#FFBD2E','#28CA41'].map((c, i) => (
            <div key={i} style={{ width: 9, height: 9, borderRadius: '50%', background: c }} />
          ))}
        </div>
        <div style={{
          display: 'flex', alignItems: 'center', gap: '5px',
          background: 'rgba(0,255,135,0.1)', border: '1px solid rgba(0,255,135,0.2)',
          borderRadius: '999px', padding: '3px 10px',
        }}>
          <div style={{
            width: 6, height: 6, borderRadius: '50%', background: '#00FF87',
            boxShadow: '0 0 6px #00FF87',
            animation: 'pulse-dot 2s infinite',
          }} />
          <span style={{
            fontFamily: 'JetBrains Mono, monospace',
            fontSize: '0.62rem', color: '#00FF87', letterSpacing: '0.05em'
          }}>
            available
          </span>
        </div>
      </motion.div>

      {/* Bottom content */}
      <motion.div
        variants={contentVariants}
        initial="hidden"
        animate="visible"
        style={{
          position: 'absolute', bottom: 0, left: 0, right: 0,
          padding: '0 1.25rem 1.25rem',
        }}
      >
        {/* Name + verified */}
        <motion.div
          variants={itemVariants}
          style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}
        >
          <h2 style={{
            fontFamily: 'JetBrains Mono, monospace',
            fontSize: '1.3rem', fontWeight: 700,
            color: '#E6EDF3', margin: 0, lineHeight: 1.2,
          }}>
            {name.split('').map((letter, i) => (
              <motion.span key={i} variants={letterVariants} style={{ display: 'inline-block' }}>
                {letter === ' ' ? '\u00A0' : letter}
              </motion.span>
            ))}
          </h2>
          {isVerified && (
            <motion.div
              variants={itemVariants}
              whileHover={{ scale: 1.15, rotate: 5 }}
              style={{
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                width: 18, height: 18, borderRadius: '50%',
                background: '#00FF87', flexShrink: 0,
              }}
            >
              <Check size={11} color="#000" strokeWidth={3} />
            </motion.div>
          )}
        </motion.div>

        {/* Title */}
        <motion.p
          variants={itemVariants}
          style={{
            fontFamily: 'JetBrains Mono, monospace',
            fontSize: '0.72rem', color: '#00FF87',
            margin: '0 0 8px', letterSpacing: '0.05em',
          }}
        >
          Full Stack Developer · AI Engineer
        </motion.p>

        {/* Description */}
        <motion.p
          variants={itemVariants}
          style={{
            fontFamily: 'JetBrains Mono, monospace',
            fontSize: '0.72rem', color: '#4A5568',
            lineHeight: 1.6, margin: '0 0 12px',
          }}
        >
          {description}
        </motion.p>

        {/* Stats row */}
        <motion.div
          variants={itemVariants}
          style={{
            display: 'flex', gap: '0',
            marginBottom: '14px',
            background: 'rgba(13,17,23,0.8)',
            border: '1px solid #21262D',
            borderRadius: '8px', overflow: 'hidden',
          }}
        >
          {stats.map(({ label, value }, i) => (
            <div key={label} style={{
              flex: 1, padding: '8px 4px', textAlign: 'center',
              borderRight: i < stats.length - 1 ? '1px solid #21262D' : 'none',
            }}>
              <div style={{
                fontFamily: 'JetBrains Mono, monospace',
                fontSize: '1rem', fontWeight: 700, color: '#00FF87', lineHeight: 1,
              }}>{value}</div>
              <div style={{
                fontFamily: 'JetBrains Mono, monospace',
                fontSize: '0.58rem', color: '#4A5568', marginTop: '3px', lineHeight: 1.2,
              }}>{label}</div>
            </div>
          ))}
        </motion.div>

        {/* Contact button */}
        <motion.button
          variants={itemVariants}
          onClick={onContactClick}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          style={{
            width: '100%',
            padding: '10px',
            borderRadius: '10px',
            border: 'none',
            background: '#00FF87',
            color: '#000',
            fontFamily: 'JetBrains Mono, monospace',
            fontWeight: 700, fontSize: '0.8rem',
            cursor: 'pointer', letterSpacing: '0.05em',
            transition: 'all 0.2s ease',
          }}
          onMouseEnter={e => {
            e.currentTarget.style.background = '#00CC6A';
            e.currentTarget.style.boxShadow = '0 0 20px rgba(0,255,135,0.4)';
          }}
          onMouseLeave={e => {
            e.currentTarget.style.background = '#00FF87';
            e.currentTarget.style.boxShadow = 'none';
          }}
        >
          CONTACT ME →
        </motion.button>
      </motion.div>
    </motion.div>
  );
};

export default HeroProfileCard;
