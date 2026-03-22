import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Terminal, ShieldAlert, Zap, Trophy, Play, RotateCcw, Cpu } from 'lucide-react';

const NeuralHack = () => {
  const [gameState, setGameState] = useState('idle'); // idle, playing, won, lost
  const [score, setScore] = useState(0);
  const [level, setLevel] = useState(1);
  const [lives, setLives] = useState(3);
  const canvasRef = useRef(null);
  const requestRef = useRef();
  
  const [playerPosition, setPlayerPosition] = useState(50); // percentage
  const [items, setItems] = useState([]);
  
  const GAME_WIDTH = 700;
  const GAME_HEIGHT = 500;

  const GOOD_ITEMS = ['0x1F', 'V.A.I', 'NODE', 'AUTH', 'PUSH', 'SUDO', 'SYNC'];
  const BAD_ITEMS = ['ERR', 'BUG', '404', 'NULL', 'ROOT_LIP', 'VOID'];

  useEffect(() => {
    if (gameState !== 'playing') return;

    const spawnInterval = setInterval(() => {
      const isGood = Math.random() > 0.3;
      const text = isGood 
        ? GOOD_ITEMS[Math.floor(Math.random() * GOOD_ITEMS.length)]
        : BAD_ITEMS[Math.floor(Math.random() * BAD_ITEMS.length)];
      
      const newItem = {
        id: Math.random(),
        x: Math.random() * 90 + 5,
        y: -20,
        text,
        isGood,
        speed: (Math.random() * 2 + 2) * (1 + level * 0.2)
      };
      setItems(prev => [...prev, newItem]);
    }, 800 / level);

    return () => clearInterval(spawnInterval);
  }, [gameState, level]);

  const update = () => {
    if (gameState !== 'playing') return;

    setItems(prev => {
      const nextItems = prev.map(item => ({ ...item, y: item.y + item.speed }));
      
      // Filter out items that hit bottom or get caught
      return nextItems.filter(item => {
        const isOffScreen = item.y > GAME_HEIGHT;
        
        // Collision detection
        const isCaught = item.y > GAME_HEIGHT - 80 && 
                         item.y < GAME_HEIGHT - 20 &&
                         item.x > playerPosition - 10 && 
                         item.x < playerPosition + 10;

        if (isCaught) {
          if (item.isGood) {
            setScore(s => {
              const newScore = s + 10;
              if (newScore >= 100) setGameState('won');
              if (newScore >= 50 && level === 1) setLevel(2);
              return newScore;
            });
          } else {
            setLives(l => {
              const newLives = l - 1;
              if (newLives <= 0) setGameState('lost');
              return newLives;
            });
            setScore(s => Math.max(0, s - 15));
          }
          return false;
        }
        
        return !isOffScreen;
      });
    });

    requestRef.current = requestAnimationFrame(update);
  };

  useEffect(() => {
    if (gameState === 'playing') {
      requestRef.current = requestAnimationFrame(update);
    }
    return () => cancelAnimationFrame(requestRef.current);
  }, [gameState, playerPosition]);

  const handleMove = (e) => {
    if (gameState !== 'playing') return;
    const rect = e.currentTarget.getBoundingClientRect();
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const x = ((clientX - rect.left) / rect.width) * 100;
    setPlayerPosition(Math.max(5, Math.min(95, x)));
  };

  const startGame = () => {
    setGameState('playing');
    setScore(0);
    setLevel(1);
    setLives(3);
    setItems([]);
  };

  return (
    <div style={{ marginTop: '0', textAlign: 'center' }}>

      <div 
        onMouseMove={handleMove}
        onTouchMove={handleMove}
        style={{
          width: '100%',
          maxWidth: '800px',
          height: '500px',
          margin: '0 auto',
          background: 'rgba(5, 10, 14, 0.9)',
          border: '2px solid rgba(0, 255, 135, 0.2)',
          borderRadius: '20px',
          position: 'relative',
          overflow: 'hidden',
          cursor: gameState === 'playing' ? 'none' : 'default',
          boxShadow: 'inset 0 0 50px rgba(0, 255, 135, 0.05)'
        }}
      >
        {/* Game UI Overlay */}
        <div style={{ position: 'absolute', top: 20, left: 20, zIndex: 10, display: 'flex', gap: '20px' }}>
          <div style={{ textAlign: 'left' }}>
            <p style={{ fontSize: '0.6rem', color: '#4A5568', margin: 0 }}>DECRYPTION_PROGRESS</p>
            <p style={{ fontSize: '1rem', fontWeight: 900, color: '#00FF87', margin: 0 }}>{score}%</p>
          </div>
          <div style={{ textAlign: 'left' }}>
            <p style={{ fontSize: '0.6rem', color: '#4A5568', margin: 0 }}>CORE_STABILITY</p>
            <p style={{ fontSize: '1rem', fontWeight: 900, color: level === 1 ? '#3BFCFF' : '#8A2BE2', margin: 0 }}>LVL_0{level}</p>
          </div>
          <div style={{ textAlign: 'left' }}>
            <p style={{ fontSize: '0.6rem', color: '#4A5568', margin: 0 }}>INTEGRITY</p>
            <div style={{ display: 'flex', gap: '3px', marginTop: '4px' }}>
              {[...Array(3)].map((_, i) => (
                <div key={i} style={{ width: '10px', height: '10px', background: i < lives ? '#00FF87' : '#2D3748', borderRadius: '2px', boxShadow: i < lives ? '0 0 5px #00FF87' : 'none' }} />
              ))}
            </div>
          </div>
        </div>

        {/* Scanlines Effect */}
        <div style={{ position: 'absolute', inset: 0, zIndex: 5, background: 'linear-gradient(rgba(18, 16, 16, 0) 50%, rgba(0, 0, 0, 0.1) 50%)', backgroundSize: '100% 4px', pointerEvents: 'none', mixBlendMode: 'overlay' }} />

        {/* Game Components */}
        <AnimatePresence>
          {gameState === 'idle' && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} style={{ position: 'absolute', inset: 0, zIndex: 20, background: 'rgba(2, 4, 8, 0.8)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '20px' }}>
              <Terminal size={50} color="#00FF87" style={{ marginBottom: '20px' }} />
              <h3 style={{ color: '#FFF', fontSize: '1.2rem', marginBottom: '10px' }}>NEURAL_BYPASS_INIT</h3>
              <p style={{ color: '#8B949E', fontSize: '0.8rem', maxWidth: '300px', lineHeight: 1.6, marginBottom: '30px' }}>
                Intercept green data packets to bypass the firewall. Avoid security breaches (red codes) at all costs.
              </p>
              <motion.button onClick={startGame} whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} style={{ padding: '8px 20px', background: '#00FF87', color: '#000', border: 'none', borderRadius: '8px', fontWeight: 800, fontSize: '0.75rem', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Play size={16} fill="currentColor" /> EXECUTE()
              </motion.button>
            </motion.div>
          )}

          {gameState === 'won' && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={{ position: 'absolute', inset: 0, zIndex: 30, background: '#00FF87', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', color: '#000', textAlign: 'center', padding: '40px' }}>
              <Trophy size={50} style={{ marginBottom: '15px' }} />
              <h3 style={{ fontSize: '1.5rem', fontWeight: 900, marginBottom: '10px' }}>HACK SUCCESSFUL!</h3>
              <div style={{ background: '#000', color: '#00FF87', padding: '10px 20px', borderRadius: '12px', fontFamily: 'monospace', fontSize: '0.8rem', marginBottom: '20px' }}>
                &gt; ACCESS_GRANTED: "System fully compromised."
              </div>
              <div style={{ display: 'flex', gap: '15px' }}>
                <motion.button onClick={startGame} whileHover={{ scale: 1.1 }} style={{ padding: '10px 20px', background: '#000', color: '#00FF87', border: 'none', borderRadius: '8px', fontWeight: 800, fontSize: '0.8rem', display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer' }}>
                  <RotateCcw size={14} /> RE_INITIALIZE
                </motion.button>
                <motion.button onClick={() => setGameState('idle')} whileHover={{ scale: 1.1 }} style={{ padding: '10px 20px', background: 'transparent', color: '#000', border: '1px solid #000', borderRadius: '8px', fontWeight: 800, fontSize: '0.8rem', cursor: 'pointer' }}>
                  EXIT_UPLINK
                </motion.button>
              </div>
            </motion.div>
          )}

          {gameState === 'lost' && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={{ position: 'absolute', inset: 0, zIndex: 30, background: '#FF5F56', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', color: '#000', textAlign: 'center', padding: '40px' }}>
              <ShieldAlert size={50} style={{ marginBottom: '15px' }} />
              <h3 style={{ fontSize: '1.5rem', fontWeight: 900, marginBottom: '10px' }}>HACK FAILED</h3>
              <div style={{ background: '#000', color: '#FF5F56', padding: '10px 20px', borderRadius: '12px', fontFamily: 'monospace', fontSize: '0.8rem', marginBottom: '20px' }}>
                &gt; CONNECTION_TERMINATED: Security breach detected!
              </div>
              <div style={{ display: 'flex', gap: '15px' }}>
                <motion.button onClick={startGame} whileHover={{ scale: 1.1 }} style={{ padding: '10px 20px', background: '#000', color: '#FF5F56', border: 'none', borderRadius: '8px', fontWeight: 800, fontSize: '0.8rem', display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer' }}>
                  <RotateCcw size={14} /> RETRY
                </motion.button>
                <motion.button onClick={() => setGameState('idle')} whileHover={{ scale: 1.1 }} style={{ padding: '10px 20px', background: 'transparent', color: '#000', border: '1px solid #000', borderRadius: '8px', fontWeight: 800, fontSize: '0.8rem', cursor: 'pointer' }}>
                  EXIT_SESSION
                </motion.button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Falling Items */}
        {items.map(item => (
          <div
            key={item.id}
            style={{
              position: 'absolute',
              left: `${item.x}%`,
              top: `${item.y}px`,
              color: item.isGood ? '#00FF87' : '#FF5F56',
              fontFamily: 'monospace',
              fontSize: '0.8rem',
              fontWeight: 800,
              textShadow: `0 0 10px ${item.isGood ? '#00FF87' : '#FF5F56'}`,
              display: 'flex',
              alignItems: 'center',
              gap: '5px'
            }}
          >
            {!item.isGood && <ShieldAlert size={12} />}
            {item.text}
          </div>
        ))}

        {/* Player Bucket */}
        {gameState === 'playing' && (
          <div 
            style={{
              position: 'absolute',
              left: `${playerPosition}%`,
              bottom: '40px',
              transform: 'translateX(-50%)',
              color: '#00FF87',
              fontFamily: 'monospace',
              fontSize: '1rem',
              fontWeight: 900,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              pointerEvents: 'none'
            }}
          >
            <div style={{ display: 'flex', gap: '2px', marginBottom: '4px' }}>
              <div style={{ width: 4, height: 10, background: '#00FF87' }} />
              <span style={{ fontSize: '0.6rem' }}>[DECRYPTOR]</span>
              <div style={{ width: 4, height: 10, background: '#00FF87' }} />
            </div>
            <motion.div 
              animate={{ width: [40, 60, 40] }}
              transition={{ repeat: Infinity, duration: 1 }}
              style={{ height: '2px', background: '#00FF87', boxShadow: '0 0 15px #00FF87' }} 
            />
          </div>
        )}
      </div>

      <p style={{ color: '#4A5568', fontSize: '0.7rem', marginTop: '1.5rem', letterSpacing: '1px' }}>
        TIP: CATCH THE CODES TO GAIN ACCESS. AVOID THE BUG THREATS.
      </p>
    </div>
  );
};

export default NeuralHack;
