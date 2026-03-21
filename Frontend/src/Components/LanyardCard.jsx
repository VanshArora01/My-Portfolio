import { useRef, useState, useEffect } from 'react';
import { motion, useSpring } from 'framer-motion';

const LanyardCard = ({ imageSrc = '/avatar.png' }) => {
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });

  const rotateX = useSpring(0, { stiffness: 100, damping: 20, mass: 1.5 });
  const rotateY = useSpring(-8, { stiffness: 80, damping: 15, mass: 2 });

  useEffect(() => {
    let frame;
    let t = 0;
    const idle = () => {
      if (!isDragging) {
        t += 0.012;
        rotateY.set(Math.sin(t) * 7 - 4);
        rotateX.set(Math.sin(t * 0.7) * 2);
      }
      frame = requestAnimationFrame(idle);
    };
    frame = requestAnimationFrame(idle);
    return () => cancelAnimationFrame(frame);
  }, [isDragging]);

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    const dx = e.clientX - dragStart.x;
    const dy = e.clientY - dragStart.y;
    rotateY.set(dx * 0.4);
    rotateX.set(-dy * 0.2);
  };

  const handleMouseDown = (e) => {
    setIsDragging(true);
    setDragStart({ x: e.clientX, y: e.clientY });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
    rotateX.set(0);
    rotateY.set(-8);
  };

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        userSelect: 'none',
        cursor: isDragging ? 'grabbing' : 'grab',
        width: '260px',
        filter: 'drop-shadow(0 20px 60px rgba(0,255,135,0.15))',
      }}
      onMouseMove={handleMouseMove}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onMouseUpCapture={handleMouseUp}
      onMouseLeave={handleMouseUp}
    >
      {/* Lanyard hook */}
      <div style={{
        width: '14px', height: '14px', borderRadius: '50%',
        background: 'linear-gradient(135deg, #555, #222)',
        border: '2px solid #666',
        boxShadow: '0 2px 8px rgba(0,0,0,0.8)',
        zIndex: 10, position: 'relative'
      }} />

      {/* Lanyard string SVG */}
      <svg width="140" height="90" viewBox="0 0 140 90"
        style={{ display: 'block', marginBottom: '-4px' }}>
        <defs>
          <linearGradient id="lg1" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#00FF87" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#00FF87" stopOpacity="0.3" />
          </linearGradient>
        </defs>
        {/* Left string */}
        <path d="M 70 0 Q 30 45 45 90" fill="none"
          stroke="url(#lg1)" strokeWidth="3.5" strokeLinecap="round" />
        {/* Right string */}
        <path d="M 70 0 Q 110 45 95 90" fill="none"
          stroke="url(#lg1)" strokeWidth="3.5" strokeLinecap="round" />
        {/* Green stripe on lanyard */}
        <path d="M 70 0 Q 30 45 45 90" fill="none"
          stroke="#00FF87" strokeWidth="1" strokeLinecap="round"
          strokeDasharray="4 8" opacity="0.5" />
        <path d="M 70 0 Q 110 45 95 90" fill="none"
          stroke="#00FF87" strokeWidth="1" strokeLinecap="round"
          strokeDasharray="4 8" opacity="0.5" />
      </svg>

      {/* Metal clip */}
      <div style={{
        width: '28px', height: '16px',
        background: 'linear-gradient(180deg, #888 0%, #444 50%, #666 100%)',
        borderRadius: '3px',
        boxShadow: '0 2px 6px rgba(0,0,0,0.6), inset 0 1px 0 rgba(255,255,255,0.2)',
        marginBottom: '-1px',
        zIndex: 10,
        position: 'relative'
      }} />

      {/* THE CARD */}
      <motion.div
        style={{
          rotateX,
          rotateY,
          transformStyle: 'preserve-3d',
          transformPerspective: 800,
        }}
      >
        <div style={{
          width: '260px',
          background: 'linear-gradient(145deg, #0D1117 0%, #0A0F1A 100%)',
          border: '1px solid #21262D',
          borderRadius: '16px',
          overflow: 'hidden',
          boxShadow: '0 25px 50px rgba(0,0,0,0.6), 0 0 0 1px rgba(0,255,135,0.05), inset 0 1px 0 rgba(255,255,255,0.05)',
          position: 'relative',
        }}>

          {/* Top green accent bar */}
          <div style={{
            height: '4px',
            background: 'linear-gradient(90deg, #00FF87, #3BFCFF)',
          }} />

          {/* Card hole */}
          <div style={{
            width: '20px', height: '20px',
            borderRadius: '50%',
            background: '#050A0E',
            border: '2px solid #21262D',
            margin: '12px auto 0',
            boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.8)',
          }} />

          {/* Avatar image */}
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            padding: '12px 20px 0',
          }}>
            <div style={{
              width: '110px', height: '110px',
              borderRadius: '50%',
              overflow: 'hidden',
              border: '3px solid #00FF87',
              boxShadow: '0 0 20px rgba(0,255,135,0.3), 0 0 40px rgba(0,255,135,0.1)',
              background: '#161B22',
            }}>
              <img
                src={imageSrc}
                alt="Vansh Arora"
                style={{
                  width: '100%', height: '100%',
                  objectFit: 'cover',
                  objectPosition: 'top center',
                }}
                draggable={false}
              />
            </div>
          </div>

          {/* Card content */}
          <div style={{
            padding: '14px 20px 20px',
            textAlign: 'center',
            fontFamily: 'JetBrains Mono, monospace',
          }}>
            {/* Name */}
            <div style={{
              color: '#E6EDF3',
              fontWeight: 700,
              fontSize: '1.1rem',
              letterSpacing: '0.05em',
              marginBottom: '4px',
            }}>
              VANSH ARORA
            </div>

            {/* Title */}
            <div style={{
              color: '#00FF87',
              fontSize: '0.75rem',
              letterSpacing: '0.08em',
              marginBottom: '12px',
            }}>
              Full Stack Developer
            </div>

            {/* Divider */}
            <div style={{
              height: '1px',
              background: 'linear-gradient(90deg, transparent, #21262D, transparent)',
              marginBottom: '12px',
            }} />

            {/* Info rows */}
            {[
              { label: 'STACK', value: 'MERN · Groq · FastAPI' },
              { label: 'WINS', value: '2× Hackathon 🏆' },
              { label: 'STATUS', value: 'Open to Remote' },
            ].map(({ label, value }) => (
              <div key={label} style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: '6px',
              }}>
                <span style={{ color: '#4A5568', fontSize: '0.65rem', letterSpacing: '0.1em' }}>
                  {label}
                </span>
                <span style={{ color: '#CDD9E5', fontSize: '0.7rem' }}>
                  {value}
                </span>
              </div>
            ))}

            {/* Divider */}
            <div style={{
              height: '1px',
              background: 'linear-gradient(90deg, transparent, #21262D, transparent)',
              margin: '10px 0',
            }} />

            {/* GitHub URL */}
            <div style={{
              color: '#3BFCFF',
              fontSize: '0.65rem',
              letterSpacing: '0.05em',
            }}>
              github.com/VanshArora01
            </div>

            {/* Barcode decoration */}
            <div style={{
              display: 'flex',
              justifyContent: 'center',
              gap: '2px',
              marginTop: '10px',
              opacity: 0.3,
            }}>
              {Array.from({ length: 24 }).map((_, i) => (
                <div key={i} style={{
                  width: i % 3 === 0 ? '3px' : '1px',
                  height: '20px',
                  background: '#00FF87',
                  borderRadius: '1px',
                }} />
              ))}
            </div>
          </div>

          {/* Subtle grid overlay */}
          <div style={{
            position: 'absolute', inset: 0,
            backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(0,255,135,0.03) 1px, transparent 0)',
            backgroundSize: '20px 20px',
            pointerEvents: 'none',
            borderRadius: '16px',
          }} />
        </div>
      </motion.div>
    </div>
  );
};

export default LanyardCard;
