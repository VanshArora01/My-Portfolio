import React, { useState } from 'react';
import { ArrowRight, Terminal as TerminalIcon } from 'lucide-react';
import { API_ENDPOINTS, WEB3FORMS_KEY } from '../config';
import { toast } from 'react-toastify';
import { motion } from 'framer-motion';
import NeuralHack from '../Components/NeuralHack';
import SnakeGame from '../Components/SnakeGame';

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
      toast.error('ERR: INCOMPLETE DATA PAYLOAD');
      return;
    }

    setIsSubmitting(true);
    const loadingToast = toast.loading('Establishing secure connection...');

    try {
      const response = await fetch(API_ENDPOINTS.CONTACT, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          access_key: WEB3FORMS_KEY,
          name: trimmedName,
          email: trimmedEmail,
          message: trimmedMessage,
          subject: `Portfolio Contact from ${trimmedName}`
        }),
      });

      const result = await response.json();
      
      if (result.success) {
        toast.dismiss(loadingToast);
        toast.success('TRANSMISSION SUCCESSFUL.');
        setFormData({ name: '', email: '', message: '' });
      } else {
        throw new Error(result.message || 'Transmission failed');
      }
    } catch (error) {
      toast.dismiss(loadingToast);
      toast.error('CRITICAL: TRANSMISSION FAILED.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="full-screen-section" style={{ position: 'relative', background: '#030708', overflow: 'hidden', padding: '2rem 1rem' }}>
      {/* Background Matrix-like grid */}
      <div style={{ position: 'absolute', inset: 0, zIndex: 0, opacity: 0.05, backgroundImage: 'linear-gradient(#00FF87 1px, transparent 1px), linear-gradient(90deg, #00FF87 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
      
      <div className="pb-dock contact-container" style={{ maxWidth: '1200px', width: '100%', margin: '0 auto', position: 'relative', zIndex: 1, paddingBottom: '2rem' }}>
        
        <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
          <motion.div initial={{ opacity: 0, y: -10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <span style={{ color: '#00FF87', fontSize: '0.75rem', fontWeight: 600, letterSpacing: '0.2em', textTransform: 'uppercase' }}>SYS.CONTACT_PROTOCOL</span>
            <h2 className="text-glow glitch contact-title" style={{ fontSize: 'clamp(1.5rem, 4vw, 2.5rem)', fontWeight: 800, color: '#F0F6FC', marginTop: '0.2rem', display: 'inline-block', cursor: 'pointer' }}>
              INITIALIZE <span style={{ color: '#00FF87' }}>CONNECTION</span>
            </h2>
          </motion.div>
        </div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          style={{ 
            background: 'rgba(5, 10, 14, 0.8)', 
            border: '1px solid #00FF87', 
            borderRadius: '10px',
            boxShadow: '0 0 30px rgba(0, 255, 135, 0.08)',
            overflow: 'hidden',
            backdropFilter: 'blur(10px)',
            maxWidth: '800px',
            margin: '0 auto'
          }}
        >
          {/* Terminal Header */}
          <div style={{ padding: '8px 16px', background: 'rgba(0, 255, 135, 0.1)', borderBottom: '1px solid #00FF87', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div style={{ display: 'flex', gap: '6px' }}>
              <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#FF5F56' }} />
              <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#FFBD2E' }} />
              <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#27C93F' }} />
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#00FF87', fontFamily: '"JetBrains Mono", monospace', fontSize: '0.75rem' }}>
              <TerminalIcon size={12} /> ssh root@vansh.dev
            </div>
            <div style={{ width: '34px' }} /> {/* Spacer */}
          </div>

          <div style={{ padding: '1.5rem 2rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                <label style={{ color: '#00FF87', fontSize: '0.85rem', fontFamily: '"JetBrains Mono", monospace' }}>
                  $ enter_identifier: <span className="blink">_</span>
                </label>
                <input 
                  type="text" name="name" value={formData.name} onChange={handleChange} placeholder="[ YOUR NAME ]"
                  autoComplete="off"
                  style={{ 
                    background: 'transparent', border: 'none', borderBottom: '1px dashed #00FF87', 
                    padding: '0.25rem 0', color: '#CDD9E5', outline: 'none', fontSize: '0.9rem',
                    fontFamily: '"JetBrains Mono", monospace', transition: 'border-color 0.3s'
                  }}
                  onFocus={(e) => e.target.style.borderBottom = '1px solid #3BFCFF'}
                  onBlur={(e) => e.target.style.borderBottom = '1px dashed #00FF87'}
                />
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                <label style={{ color: '#00FF87', fontSize: '0.85rem', fontFamily: '"JetBrains Mono", monospace' }}>
                  $ enter_comms_link: <span className="blink">_</span>
                </label>
                <input 
                  type="email" name="email" value={formData.email} onChange={handleChange} placeholder="[ EMAIL ADDRESS ]"
                  autoComplete="off"
                  style={{ 
                    background: 'transparent', border: 'none', borderBottom: '1px dashed #00FF87', 
                    padding: '0.25rem 0', color: '#CDD9E5', outline: 'none', fontSize: '0.9rem',
                    fontFamily: '"JetBrains Mono", monospace', transition: 'border-color 0.3s'
                  }}
                  onFocus={(e) => e.target.style.borderBottom = '1px solid #3BFCFF'}
                  onBlur={(e) => e.target.style.borderBottom = '1px dashed #00FF87'}
                />
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                <label style={{ color: '#00FF87', fontSize: '0.85rem', fontFamily: '"JetBrains Mono", monospace' }}>
                  $ inject_payload: <span className="blink">_</span>
                </label>
                <textarea 
                  name="message" value={formData.message} onChange={handleChange} placeholder="[ ENTER PROJECT DETAILS... ]" rows="3"
                  style={{ 
                    background: 'rgba(0, 255, 135, 0.02)', border: '1px dashed #00FF87', borderRadius: '4px',
                    padding: '0.75rem', color: '#00FF87', outline: 'none', resize: 'none', fontSize: '0.9rem',
                    fontFamily: '"JetBrains Mono", monospace', transition: 'all 0.3s'
                  }}
                  onFocus={(e) => e.target.style.border = '1px solid #3BFCFF'}
                  onBlur={(e) => e.target.style.border = '1px dashed #00FF87'}
                />
              </div>

              <motion.button 
                whileHover={{ scale: 1.01, backgroundColor: '#3BFCFF', color: '#030708', boxShadow: '0 0 15px #3BFCFF' }}
                whileTap={{ scale: 0.99 }}
                type="submit" disabled={isSubmitting}
                style={{
                  background: 'transparent', color: '#00FF87', padding: '0.75rem', borderRadius: '4px',
                  fontWeight: 800, fontSize: '0.9rem', border: '1px solid #00FF87', cursor: 'pointer',
                  display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
                  fontFamily: '"JetBrains Mono", monospace', textTransform: 'uppercase', transition: 'all 0.3s'
                }}
              >
                {isSubmitting ? '[ EXECUTING... ]' : <>[ EXECUTE_TRANSMISSION ] <ArrowRight size={16} /></>}
              </motion.button>
            </form>
          </div>
        </motion.div>
        
        {/* 🎮 INTERACTIVE GAMING DECK */}
        <div style={{ marginTop: '6rem', textAlign: 'center' }}>
          <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} style={{ marginBottom: '3rem' }}>
            <h3 style={{ fontFamily: 'monospace', color: '#00FF87', fontSize: '1.2rem', fontWeight: 800, letterSpacing: '4px' }}>[ V.A.I_GAMING_DECK ]</h3>
            <p style={{ color: '#4A5568', fontSize: '0.8rem', marginTop: '10px' }}>ESTABLISHING_NEURAL_RECREATION_STREAM...</p>
          </motion.div>
          
          <div style={{ 
            display: 'flex', 
            flexDirection: 'row', 
            flexWrap: 'wrap', 
            gap: '30px', 
            justifyContent: 'center',
            alignItems: 'center'
          }}>
            <div style={{ flex: '1 1 400px', maxWidth: '800px' }}>
              <NeuralHack />
            </div>
            <div style={{ flex: '1 1 400px', maxWidth: '800px' }}>
              <SnakeGame />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Section4;