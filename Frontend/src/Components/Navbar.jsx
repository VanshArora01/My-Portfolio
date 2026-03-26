import { useState, useRef, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, useMotionValue, useSpring, useTransform, AnimatePresence } from 'framer-motion';
import { Home, Briefcase, FileText, Github, Linkedin, Bot } from 'lucide-react';

const leftLinks = [
  { name: 'Home', path: '/', icon: Home, color: '#00FF87' },
  { name: 'Work', path: '/work', icon: Briefcase, color: '#3BFCFF' },
  { name: 'Resume', path: '/resume', icon: FileText, color: '#8A2BE2' },
  { name: 'Assistant', path: '/terminal', icon: Bot, color: '#FF3366' },
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
            initial={{ opacity: 0, scale: 0.8, x: '-50%', y: 10 }}
            animate={{ opacity: 1, scale: 1, x: '-50%', y: 0 }}
            exit={{ opacity: 0, scale: 0.8, x: '-50%', y: 10 }}
            style={{
              position: 'absolute',
              bottom: 'calc(100% + 20px)',
              left: '50%',
              padding: '6px 14px',
              borderRadius: '100px',
              background: 'rgba(3, 7, 8, 0.9)',
              backdropFilter: 'blur(10px)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              color: '#F0F6FC',
              fontSize: '0.7rem',
              fontWeight: 800,
              whiteSpace: 'nowrap',
              pointerEvents: 'none',
              boxShadow: '0 10px 20px rgba(0,0,0,0.5)',
              textTransform: 'uppercase',
              letterSpacing: '0.05em',
              zIndex: 1000
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
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setIsMobileOpen(false);
  }, [location.pathname]);

  return (
    <>
      {/* Desktop Navigation */}
      <div className="desktop-dock" style={{ position: 'fixed', bottom: '30px', left: '50%', transform: 'translateX(-50%)', zIndex: 10000 }}>
        <motion.div
          onPointerMove={(e) => mouseX.set(e.clientX)}
          onPointerLeave={() => mouseX.set(Infinity)}
          className="glass glass-no-shimmer"
          style={{
            padding: '10px 14px',
            borderRadius: '26px',
            display: 'flex',
            alignItems: 'flex-end',
            gap: '10px',
            background: 'rgba(3, 7, 8, 0.4)',
            border: '1px solid rgba(255, 255, 255, 0.05)',
            boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.8)',
            overflow: 'visible'
          }}
        >
          {leftLinks.map((link) => (
            <NavItem key={link.name} link={link} mouseX={mouseX} />
          ))}

          <div style={{ width: '1px', height: '35px', background: 'rgba(255,255,255,0.08)', margin: '0 8px', alignSelf: 'center' }} />
          
          {rightLinks.map((link) => (
            <NavItem key={link.name} link={link} mouseX={mouseX} isExternal={true} />
          ))}
        </motion.div>
      </div>

      {/* Mobile Navigation Toggle */}
      <div className="mobile-nav-container" style={{ position: 'fixed', top: '15px', right: '15px', zIndex: 10001 }}>
        <motion.button 
          whileTap={{ scale: 0.9 }}
          onClick={() => setIsMobileOpen(!isMobileOpen)}
          style={{
            background: 'rgba(3, 7, 8, 0.6)',
            backdropFilter: 'blur(10px)',
            border: `1px solid ${isMobileOpen ? '#FF3366' : '#00FF87'}`,
            borderRadius: '12px',
            width: '45px', height: '45px',
            display: 'flex', flexDirection: 'column',
            justifyContent: 'center', alignItems: 'center', gap: '5px',
            cursor: 'pointer',
            boxShadow: `0 0 15px ${isMobileOpen ? 'rgba(255, 51, 102, 0.2)' : 'rgba(0, 255, 135, 0.2)'}`,
            position: 'relative',
            overflow: 'hidden'
          }}
        >
          {/* Hacker Scanline effect */}
          <motion.div 
            animate={{ y: ['-100%', '100%'] }}
            transition={{ repeat: Infinity, duration: 1.5, ease: 'linear' }}
            style={{ position: 'absolute', width: '100%', height: '2px', background: 'rgba(255,255,255,0.2)', top: 0, left: 0 }}
          />

          <motion.div 
            animate={isMobileOpen ? { rotate: 45, y: 7, backgroundColor: '#FF3366' } : { rotate: 0, y: 0, backgroundColor: '#00FF87' }} 
            style={{ width: '22px', height: '2px', transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)' }} 
          />
          <motion.div 
            animate={isMobileOpen ? { opacity: 0, scale: 0, x: -10 } : { opacity: 1, scale: 1, x: 0, backgroundColor: '#3BFCFF' }} 
            style={{ width: '22px', height: '2px', transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)' }} 
          />
          <motion.div 
            animate={isMobileOpen ? { rotate: -45, y: -7, backgroundColor: '#FF3366' } : { rotate: 0, y: 0, backgroundColor: '#8A2BE2' }} 
            style={{ width: '22px', height: '2px', transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)' }} 
          />
        </motion.button>
      </div>

      {/* Hacker Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileOpen && (
          <motion.div
            initial={{ opacity: 0, clipPath: 'circle(0% at 90% 10%)' }}
            animate={{ opacity: 1, clipPath: 'circle(150% at 90% 10%)' }}
            exit={{ opacity: 0, clipPath: 'circle(0% at 90% 10%)' }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            style={{
              position: 'fixed', inset: 0, zIndex: 10000,
              background: 'rgba(3, 7, 8, 0.95)',
              backdropFilter: 'blur(20px)',
              display: 'flex', flexDirection: 'column',
              justifyContent: 'center', alignItems: 'center',
            }}
          >
            {/* Cyber Grid Background */}
            <div style={{ position: 'absolute', inset: 0, zIndex: -1, opacity: 0.1, backgroundImage: 'linear-gradient(#00FF87 1px, transparent 1px), linear-gradient(90deg, #00FF87 1px, transparent 1px)', backgroundSize: '30px 30px' }} />
            
            <div style={{ width: '100%', maxWidth: '320px', padding: '0 20px', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              
              <motion.div 
                initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }}
                style={{ display: 'flex', alignItems: 'center', gap: '10px', paddingBottom: '1rem', borderBottom: '1px solid rgba(0, 255, 135, 0.3)' }}
              >
                <Bot color="#00FF87" size={20} />
                <span style={{ color: '#00FF87', fontFamily: 'JetBrains Mono', fontSize: '0.85rem', letterSpacing: '0.2em', textTransform: 'uppercase' }}>
                  Assistant.Node
                </span>
                <motion.span animate={{ opacity: [1, 0] }} transition={{ repeat: Infinity, duration: 0.8 }} style={{ width: '8px', height: '15px', background: '#00FF87' }} />
              </motion.div>

              {[...leftLinks, ...rightLinks].map((link, i) => {
                const isCurrent = !link.href && location.pathname === link.path;
                return (
                  <motion.div
                    key={link.name}
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 + i * 0.08, type: "spring", stiffness: 100, damping: 15 }}
                  >
                    {link.path ? (
                      <Link to={link.path} style={{ textDecoration: 'none' }} onClick={() => setIsMobileOpen(false)}>
                        <div style={{ 
                          display: 'flex', alignItems: 'center', gap: '15px', padding: '15px 20px', 
                          background: isCurrent ? `${link.color}15` : 'rgba(255,255,255,0.02)', 
                          border: `1px solid ${isCurrent ? link.color : 'rgba(255,255,255,0.05)'}`, 
                          borderRadius: '16px', position: 'relative', overflow: 'hidden'
                        }}>
                          <link.icon size={22} color={isCurrent ? link.color : '#8B949E'} />
                          <span style={{ color: isCurrent ? '#F0F6FC' : '#8B949E', fontSize: '1.2rem', fontWeight: 800, letterSpacing: '0.1em', transition: 'color 0.3s' }}>{link.name}</span>
                          {isCurrent && (
                            <motion.div layoutId="mobile-target" style={{ marginLeft: 'auto', display: 'flex', gap: '4px' }}>
                              <span style={{ color: link.color, fontSize: '0.7rem', fontWeight: 800 }}>ACTIVE</span>
                              <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: link.color, alignSelf: 'center', boxShadow: `0 0 10px ${link.color}` }} />
                            </motion.div>
                          )}
                        </div>
                      </Link>
                    ) : (
                      <a href={link.href} target="_blank" rel="noreferrer" style={{ textDecoration: 'none' }}>
                        <div style={{ 
                          display: 'flex', alignItems: 'center', gap: '15px', padding: '15px 20px', 
                          background: 'rgba(255,255,255,0.02)', 
                          border: '1px solid rgba(255,255,255,0.05)', 
                          borderRadius: '16px' 
                        }}>
                          <link.icon size={22} color="#8B949E" />
                          <span style={{ color: '#8B949E', fontSize: '1.2rem', fontWeight: 800, letterSpacing: '0.1em' }}>{link.name}</span>
                          <span style={{ marginLeft: 'auto', color: '#4A5568', fontSize: '0.65rem', fontFamily: 'JetBrains Mono' }}>[EXT]</span>
                        </div>
                      </a>
                    )}
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
