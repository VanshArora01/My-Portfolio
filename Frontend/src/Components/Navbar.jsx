import { useState, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, useMotionValue, useSpring, useTransform, AnimatePresence } from 'framer-motion';
import { Home, Briefcase, FileText, Github, Linkedin } from 'lucide-react';

const leftLinks = [
  { name: 'Home', path: '/', icon: Home, color: '#00FF87' },
  { name: 'Work', path: '/work', icon: Briefcase, color: '#3BFCFF' },
  { name: 'Resume', path: '/resume', icon: FileText, color: '#8A2BE2' },
];

const rightLinks = [
  { name: 'GitHub', href: 'https://github.com/VanshArora01', icon: Github, color: '#F0F6FC' },
  { name: 'LinkedIn', href: 'https://linkedin.com/in/vansharora01', icon: Linkedin, color: '#0077B5' },
];

const NavItem = ({ link, mouseX, isExternal = false }) => {
  const ref = useRef(null);
  const location = useLocation();
  const isActive = !isExternal && location.pathname === link.path;

  const distance = useMotionValue(Infinity);
  const widthTransform = useTransform(distance, [-150, 0, 150], [45, 75, 45]);
  const width = useSpring(widthTransform, { mass: 0.1, stiffness: 90, damping: 18 });

  const [hovered, setHovered] = useState(false);

  const content = (
    <motion.div
      style={{
        width, height: width,
        background: isActive ? `${link.color}15` : 'rgba(255,255,255,0.03)',
        border: `1px solid ${isActive ? `${link.color}40` : 'rgba(255,255,255,0.05)'}`,
        borderRadius: '16px',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        color: isActive ? link.color : '#8B949E',
        backdropFilter: 'blur(10px)',
        transition: 'all 0.2s cubic-bezier(0.16, 1, 0.3, 1)',
        position: 'relative'
      }}
    >
      <link.icon size={22} style={{ 
        color: isActive || hovered ? link.color : '#8B949E',
        filter: isActive || hovered ? `drop-shadow(0 0 8px ${link.color}80)` : 'none',
        transition: 'all 0.2s ease'
      }} />
      
      {isActive && (
        <motion.div 
          layoutId="nav-dot"
          style={{ position: 'absolute', bottom: '6px', width: '4px', height: '4px', borderRadius: '50%', background: link.color }}
        />
      )}

      <AnimatePresence>
        {hovered && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.8 }}
            animate={{ opacity: 1, y: -45, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.8 }}
            style={{
              position: 'absolute',
              padding: '6px 14px',
              borderRadius: '100px',
              background: 'rgba(3, 7, 8, 0.85)',
              backdropFilter: 'blur(10px)',
              border: '1px solid rgba(255, 255, 255, 0.05)',
              color: '#F0F6FC',
              fontSize: '0.7rem',
              fontWeight: 800,
              whiteSpace: 'nowrap',
              pointerEvents: 'none',
              boxShadow: '0 10px 20px rgba(0,0,0,0.5)',
              textTransform: 'uppercase',
              letterSpacing: '0.05em'
            }}
          >
            {link.name}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );

  return (
    <div 
      onPointerMove={(e) => {
        const rect = ref.current?.getBoundingClientRect();
        if (rect) distance.set(e.clientX - (rect.left + rect.width / 2));
      }}
      onPointerLeave={() => distance.set(Infinity)}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      ref={ref}
      style={{ cursor: 'pointer' }}
    >
      {isExternal ? (
        <a href={link.href} target="_blank" rel="noreferrer" style={{ textDecoration: 'none' }}>
          {content}
        </a>
      ) : (
        <Link to={link.path} style={{ textDecoration: 'none' }}>
          {content}
        </Link>
      )}
    </div>
  );
};

const Navbar = () => {
  const mouseX = useMotionValue(Infinity);

  return (
    <div style={{ position: 'fixed', bottom: '30px', left: '50%', transform: 'translateX(-50%)', zIndex: 10000 }}>
      {/* Background Dock Frame */}
      <motion.div
        onPointerMove={(e) => mouseX.set(e.clientX)}
        onPointerLeave={() => mouseX.set(Infinity)}
        className="glass"
        style={{
          padding: '10px 14px',
          borderRadius: '26px',
          display: 'flex',
          alignItems: 'flex-end',
          gap: '10px',
          background: 'rgba(3, 7, 8, 0.4)',
          border: '1px solid rgba(255, 255, 255, 0.05)',
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.8)'
        }}
      >
        {/* Navigation Section */}
        {leftLinks.map((link) => (
          <NavItem key={link.name} link={link} mouseX={mouseX} />
        ))}

        {/* Separator */}
        <div style={{ width: '1px', height: '35px', background: 'rgba(255,255,255,0.08)', margin: '0 8px', alignSelf: 'center' }} />
        
        {/* Social Section */}
        {rightLinks.map((link) => (
          <NavItem key={link.name} link={link} mouseX={mouseX} isExternal={true} />
        ))}
      </motion.div>
    </div>
  );
};

export default Navbar;
