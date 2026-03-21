import React, { useState } from 'react';
import { ArrowRight } from 'lucide-react';
import { API_ENDPOINTS } from '../config';
import { toast } from 'react-toastify';
import { motion } from 'framer-motion';

const Section4 = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const trimmedName = formData.name.trim();
    const trimmedEmail = formData.email.trim();
    const trimmedMessage = formData.message.trim();
    
    if (!trimmedName || !trimmedEmail || !trimmedMessage) {
      toast.error('Please fill in all fields');
      return;
    }

    setIsSubmitting(true);
    const loadingToast = toast.loading('Establishing connection...');

    try {
      const response = await fetch(API_ENDPOINTS.CONTACT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: trimmedName, email: trimmedEmail, message: trimmedMessage }),
      });

      if (!response.ok) throw new Error('Network error');

      const result = await response.json();
      if (result.success) {
        toast.dismiss(loadingToast);
        toast.success('Transmission successful!');
        setFormData({ name: '', email: '', message: '' });
      } else {
        throw new Error(result.message);
      }
    } catch (error) {
      toast.dismiss(loadingToast);
      toast.error('Transmission failed. Try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="full-screen-section" style={{ position: 'relative' }}>
        <div className="mesh-bg" style={{ position: 'absolute', inset: 0, zIndex: 0 }} />
      <div className="pb-dock" style={{ maxWidth: '1200px', width: '100%', margin: '0 auto', padding: '0 2.5rem', position: 'relative', zIndex: 1, paddingBottom: '4rem' }}>
        
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <span style={{ color: '#00FF87', fontSize: '0.85rem', fontWeight: 600, letterSpacing: '0.3em', textTransform: 'uppercase' }}>Connection</span>
          <h2 className="text-glow" style={{ fontSize: 'clamp(2rem, 5vw, 3.2rem)', fontWeight: 800, color: '#F0F6FC', marginTop: '0.5rem' }}>
            Let's Start a <span style={{ color: '#00FF87' }}>Dialogue.</span>
          </h2>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.5fr', gap: '2rem' }} className="contact-grid">
          
          {/* INFO PANEL */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="glass"
            style={{ padding: '3rem', borderRadius: '32px', display: 'flex', flexDirection: 'column', gap: '2rem' }}
          >
            <div>
              <h3 style={{ color: '#F0F6FC', fontSize: '1.5rem', fontWeight: 700, marginBottom: '1rem' }}>Collaboration Hub</h3>
              <p style={{ color: '#8B949E', lineHeight: 1.7, fontSize: '0.95rem' }}>
                Whether you have a groundbreaking idea or a complex system that needs scaling, I'm here to build it with you.
              </p>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              {[
                { label: 'Primary Email', value: 'vansharora2310@gmail.com', href: 'mailto:vansharora2310@gmail.com', color: '#00FF87' },
                { label: 'Developer profile', value: 'github.com/VanshArora01', href: 'https://github.com/VanshArora01', color: '#3BFCFF' },
                { label: 'Professional network', value: 'linkedin.com/in/vansharora01', href: 'https://linkedin.com/in/vansharora01', color: '#8A2BE2' }
              ].map((item, i) => (
                <div key={i}>
                  <div style={{ color: '#6E7681', fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '0.5rem' }}>{item.label}</div>
                  <a href={item.href} target="_blank" rel="noreferrer" style={{ 
                    color: '#CDD9E5', textDecoration: 'none', fontSize: '1rem', fontWeight: 600,
                    transition: 'color 0.2s'
                  }} onMouseEnter={e => e.currentTarget.style.color = item.color} onMouseLeave={e => e.currentTarget.style.color = '#CDD9E5'}>
                    {item.value}
                  </a>
                </div>
              ))}
            </div>

            <div style={{ marginTop: 'auto', paddingTop: '2rem', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#00FF87' }} className="pulse-dot" />
                <span style={{ color: '#8B949E', fontSize: '0.85rem' }}>Currently active in <strong>Ludhiana, India</strong></span>
              </div>
            </div>
          </motion.div>

          {/* FORM PANEL */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="glass"
            style={{ padding: '3.5rem', borderRadius: '32px' }}
          >
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }} className="form-row">
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                  <label style={{ color: '#F0F6FC', fontSize: '0.85rem', fontWeight: 600 }}>&gt; Full Name</label>
                  <input 
                    type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Dev Vansh"
                    style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid var(--glass-border)', borderRadius: '12px', padding: '1rem', color: '#CDD9E5', outline: 'none' }}
                  />
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                  <label style={{ color: '#F0F6FC', fontSize: '0.85rem', fontWeight: 600 }}>&gt; Email Address</label>
                  <input 
                    type="email" name="email" value={formData.email} onChange={handleChange} placeholder="example@tech.com"
                    style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid var(--glass-border)', borderRadius: '12px', padding: '1rem', color: '#CDD9E5', outline: 'none' }}
                  />
                </div>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                <label style={{ color: '#F0F6FC', fontSize: '0.85rem', fontWeight: 600 }}>&gt; Project Brief</label>
                <textarea 
                  name="message" value={formData.message} onChange={handleChange} placeholder="Tell me about your vision..." rows="5"
                  style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid var(--glass-border)', borderRadius: '12px', padding: '1rem', color: '#CDD9E5', outline: 'none', resize: 'none' }}
                />
              </div>

              <motion.button 
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
                type="submit" disabled={isSubmitting}
                className="shimmer"
                style={{
                  background: '#00FF87', color: '#030708', padding: '1.25rem', borderRadius: '12px',
                  fontWeight: 800, fontSize: '1rem', border: 'none', cursor: 'pointer',
                  display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px',
                  boxShadow: '0 10px 30px -10px rgba(0,255,135,0.5)'
                }}
              >
                {isSubmitting ? 'Establishing Protocol...' : <>Execute Transmission <ArrowRight size={20} /></>}
              </motion.button>
            </form>
          </motion.div>

        </div>
      </div>

      <style>{`
        @media (max-width: 968px) {
          .contact-grid { grid-template-columns: 1fr !important; }
          .form-row { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
};

export default Section4;