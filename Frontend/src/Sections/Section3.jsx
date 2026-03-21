import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import MagicBento from '../Components/MagicBento';

const Section3 = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section ref={ref} style={{ background: '#050A0E', padding: '4rem 0' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 2rem' }}>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          style={{ marginBottom: '2rem', textAlign: 'center' }}
        >
          <p style={{ fontFamily: 'JetBrains Mono, monospace', color: '#4A5568', fontSize: '0.82rem', marginBottom: '0.5rem' }}>
            &gt; cat about.txt
          </p>
          <h2 style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 'clamp(1.8rem, 4vw, 2.5rem)', fontWeight: 700, color: '#00FF87' }}>
            ~/about
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.2 }}
        >
          <MagicBento
            textAutoHide={false}
            enableStars={true}
            enableSpotlight={true}
            enableBorderGlow={true}
            enableTilt={false}
            enableMagnetism={false}
            clickEffect={true}
            spotlightRadius={350}
            particleCount={10}
            glowColor="0, 255, 135"
            disableAnimations={false}
          />
        </motion.div>

      </div>
    </section>
  );
};

export default Section3;