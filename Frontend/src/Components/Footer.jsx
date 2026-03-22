import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Github, Linkedin, Mail, ArrowUpRight } from 'lucide-react';

const Footer = () => {
  return (
    <footer style={{ 
      background: 'var(--bg)', 
      borderTop: '1px solid var(--glass-border)', 
      padding: '6rem 0 3rem', 
      fontFamily: 'JetBrains Mono, monospace',
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* Background Glow */}
      <div style={{ position: 'absolute', bottom: '-100px', left: '50%', transform: 'translateX(-50%)', width: '600px', height: '300px', background: 'radial-gradient(circle, rgba(0, 255, 135, 0.05) 0%, transparent 70%)', filter: 'blur(50px)', zIndex: 0 }} />

      <div className="footer-container" style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 2.5rem', position: 'relative', zIndex: 1 }}>
        
        <div className="footer-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '4rem', marginBottom: '4rem' }}>
          
          {/* Brand Column */}
          <div className="brand-col" style={{ gridColumn: 'span 2' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '1.5rem' }}>
               <div style={{ width: '24px', height: '24px', borderRadius: '6px', background: '#00FF87', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, color: '#030708', fontSize: '0.75rem' }}>V</div>
               <span style={{ color: '#F0F6FC', fontSize: '1.2rem', fontWeight: 700 }}>Vansh Arora</span>
            </div>
            <p style={{ color: '#8B949E', fontSize: '0.95rem', lineHeight: 1.7, maxWidth: '400px' }}>
              Building the next generation of developer-first ecosystems and AI-driven production systems.
            </p>
          </div>

          {/* Quick Links */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <h4 style={{ color: '#00FF87', fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase' }}>Navigation</h4>
            {[
              { name: 'Home', path: '/' },
              { name: 'Work', path: '/work' },
              { name: 'Resume', path: '/resume' }
            ].map(link => (
              <Link key={link.name} to={link.path} style={{ color: '#8B949E', textDecoration: 'none', transition: 'color 0.2s', fontSize: '0.9rem' }} onMouseEnter={e => e.currentTarget.style.color = '#F0F6FC'} onMouseLeave={e => e.currentTarget.style.color = '#8B949E'}>
                {link.name}
              </Link>
            ))}
          </div>

          {/* Socials */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <h4 style={{ color: '#00FF87', fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase' }}>Connect</h4>
            {[
              { name: 'GitHub', href: 'https://github.com/VanshArora01', icon: <Github size={14} /> },
              { name: 'LinkedIn', href: 'https://linkedin.com/in/vansharora01', icon: <Linkedin size={14} /> },
              { name: 'Email', href: 'mailto:vansharora2310@gmail.com', icon: <Mail size={14} /> }
            ].map(social => (
              <a key={social.name} href={social.href} target="_blank" rel="noreferrer" style={{ color: '#8B949E', textDecoration: 'none', transition: 'color 0.2s', fontSize: '0.9rem', display: 'flex', alignItems: 'center', gap: '8px' }} onMouseEnter={e => e.currentTarget.style.color = '#F0F6FC'} onMouseLeave={e => e.currentTarget.style.color = '#8B949E'}>
                {social.icon} {social.name} <ArrowUpRight size={12} style={{ opacity: 0.5 }} />
              </a>
            ))}
          </div>

        </div>

        {/* Footer Bottom */}
        <div style={{ borderTop: '1px solid var(--glass-border)', paddingTop: '2.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
          <div style={{ color: '#6E7681', fontSize: '0.8rem' }}>
            © 2026 Vansh Arora. Built with precision.
          </div>
          <div style={{ display: 'flex', gap: '1.5rem' }}>
             <span style={{ color: '#6E7681', fontSize: '0.8rem' }}>React</span>
             <span style={{ color: '#6E7681', fontSize: '0.8rem' }}>Framer Motion</span>
             <span style={{ color: '#6E7681', fontSize: '0.8rem' }}>Vite</span>
          </div>
        </div>

      </div>
      <style>{`
        @media (max-width: 768px) {
          .footer-container { padding: 0 1.5rem !important; }
          .footer-grid { gap: 2.5rem !important; margin-bottom: 3rem !important; }
          .brand-col { grid-column: span 1 !important; }
          footer { padding: 4rem 0 2rem !important; }
        }
      `}</style>
    </footer>
  );
};

export default Footer;