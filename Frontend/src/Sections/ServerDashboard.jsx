import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Activity, Cpu, HardDrive, Wifi, Server, ShieldCheck } from 'lucide-react';

const generateIP = () => `${Math.floor(Math.random()*255)}.${Math.floor(Math.random()*255)}.${Math.floor(Math.random()*255)}.${Math.floor(Math.random()*255)}`;

const ServerDashboard = () => {
  const [cpuUsage, setCpuUsage] = useState(42);
  const [ramUsage, setRamUsage] = useState(68);
  const [ping, setPing] = useState(12);
  const [logs, setLogs] = useState([]);

  // Loop data safely
  useEffect(() => {
    const interval = setInterval(() => {
      setCpuUsage(Math.floor(Math.random() * 30) + 30);
      setRamUsage(prev => {
        const newer = prev + (Math.random() > 0.5 ? 2 : -2);
        return newer > 90 ? 80 : newer < 50 ? 60 : newer;
      });
      setPing(Math.floor(Math.random() * 10) + 8);
      
      const newLog = `[${new Date().toLocaleTimeString()}] HTTP 200 GET /api/v1/auth from ${generateIP()}`;
      setLogs(prev => [newLog, ...prev].slice(0, 10)); // Keep only 10 logs
    }, 1500);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="full-screen-section" style={{ background: '#030708', padding: '4rem 1.5rem', position: 'relative', overflow: 'hidden' }}>
      
      <div style={{ position: 'absolute', inset: 0, backgroundImage: 'radial-gradient(circle at 50% 50%, rgba(0,255,135,0.03) 0%, transparent 60%)' }} />

      <div style={{ maxWidth: '1100px', margin: '0 auto', width: '100%', position: 'relative', zIndex: 1 }}>
        <div style={{ marginBottom: '3rem', textAlign: 'center' }}>
          <span style={{ color: '#00FF87', fontSize: '0.85rem', fontWeight: 600, letterSpacing: '0.3em', textTransform: 'uppercase' }}>SYS.MONITOR</span>
          <h2 className="text-glow glitch" style={{ fontSize: 'clamp(2rem, 5vw, 3.2rem)', fontWeight: 800, color: '#F0F6FC', marginTop: '0.5rem' }}>
            INFRASTRUCTURE <span style={{ color: '#00FF87' }}>CORE</span>
          </h2>
          <p style={{ color: '#8B949E', marginTop: '1rem', maxWidth: '600px', margin: '1rem auto 0', fontSize: '1rem' }}>
            Real-time visualization of my active processes and deployed systems.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem' }}>
          
          {/* CPU Metric */}
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="glass" style={{ padding: '2rem', borderRadius: '24px', position: 'relative' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: '#00FF87' }}><Cpu size={24} /><span style={{ fontWeight: 700, letterSpacing: '0.1em' }}>CPU_LOAD</span></div>
              <span style={{ color: '#F0F6FC', fontSize: '1.5rem', fontWeight: 800 }}>{cpuUsage}%</span>
            </div>
            {/* Simple Animated Graph */}
            <div style={{ display: 'flex', alignItems: 'flex-end', gap: '4px', height: '60px' }}>
              {[...Array(20)].map((_, i) => (
                <motion.div key={i} animate={{ height: `${Math.random() * 100}%` }} transition={{ repeat: Infinity, duration: Math.random() * 2 + 1, ease: "easeInOut" }} style={{ flex: 1, background: i < (cpuUsage/5) ? '#00FF87' : 'rgba(0,255,135,0.2)', borderRadius: '2px' }} />
              ))}
            </div>
          </motion.div>

          {/* Memory Metric */}
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }} className="glass" style={{ padding: '2rem', borderRadius: '24px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: '#3BFCFF' }}><HardDrive size={24} /><span style={{ fontWeight: 700, letterSpacing: '0.1em' }}>MEM_ALLOC</span></div>
              <span style={{ color: '#F0F6FC', fontSize: '1.5rem', fontWeight: 800 }}>{ramUsage}%</span>
            </div>
            <div style={{ width: '100%', height: '8px', background: 'rgba(59,252,255,0.2)', borderRadius: '100px', overflow: 'hidden' }}>
              <motion.div animate={{ width: `${ramUsage}%` }} transition={{ type: 'spring', damping: 15 }} style={{ height: '100%', background: '#3BFCFF', borderRadius: '100px', boxShadow: '0 0 10px #3BFCFF' }} />
            </div>
            <div style={{ marginTop: '1rem', color: '#8B949E', fontSize: '0.85rem', display: 'flex', justifyContent: 'space-between' }}>
              <span>16.4 GB / 32.0 GB</span>
              <span style={{ color: '#3BFCFF' }}>STABLE</span>
            </div>
          </motion.div>

          {/* Network Active */}
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }} className="glass" style={{ padding: '2rem', borderRadius: '24px', gridColumn: '1 / -1', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid rgba(255,255,255,0.05)', paddingBottom: '1rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: '#8A2BE2' }}><Activity size={24} /><span style={{ fontWeight: 700, letterSpacing: '0.1em' }}>LIVE_NETWORK_STREAM</span></div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><div className="pulse-dot" style={{ width: '8px', height: '8px', background: '#00FF87', borderRadius: '50%' }}/><span style={{ color: '#00FF87', fontSize: '0.8rem', fontWeight: 600 }}>SECURE</span></div>
            </div>
            
            <div style={{ background: 'rgba(0,0,0,0.5)', padding: '1rem', borderRadius: '12px', height: '180px', overflow: 'hidden', display: 'flex', flexDirection: 'column', gap: '8px', border: '1px solid rgba(138,43,226,0.2)' }}>
              {logs.map((log, i) => (
                <motion.div key={i} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1 - (i * 0.1), x: 0 }} style={{ color: '#CDD9E5', fontFamily: '"JetBrains Mono", monospace', fontSize: '0.85rem', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                  <span style={{ color: '#00FF87' }}>{log.split(' ')[0]}</span> <span style={{ color: '#3BFCFF' }}>{log.split(' ')[1]}</span> <span style={{ color: '#8A2BE2' }}>{log.split(' ')[2]}</span> {log.split(' ').slice(3).join(' ')}
                </motion.div>
              ))}
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', color: '#8B949E', fontSize: '0.8rem', marginTop: '0.5rem', fontFamily: '"JetBrains Mono", monospace' }}>
              <span>LATENCY: {ping}ms</span>
              <span>PACKET_LOSS: 0.00%</span>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default ServerDashboard;
