import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Terminal, Trophy, Play, RotateCcw, Zap, ChevronUp, ChevronDown, ChevronLeft, ChevronRight, Cpu } from 'lucide-react';

const GRID_SIZE = 20;
const INITIAL_SPEED = 150;

const SnakeGame = () => {
  const [gameState, setGameState] = useState('idle'); // idle, playing, over
  const [snake, setSnake] = useState([{ x: 10, y: 10 }]);
  const [food, setFood] = useState({ x: 15, y: 15 });
  const [direction, setDirection] = useState({ x: 0, y: -1 });
  const [score, setScore] = useState(0);
  const [speed, setSpeed] = useState(INITIAL_SPEED);
  const gameLoopRef = useRef();

  const spawnFood = useCallback(() => {
    return {
      x: Math.floor(Math.random() * GRID_SIZE),
      y: Math.floor(Math.random() * GRID_SIZE)
    };
  }, []);

  const resetGame = () => {
    setSnake([{ x: 10, y: 10 }]);
    setFood(spawnFood());
    setDirection({ x: 0, y: -1 });
    setScore(0);
    setGameState('playing');
    setSpeed(INITIAL_SPEED);
  };

  const moveSnake = useCallback(() => {
    setSnake(prevSnake => {
      const head = prevSnake[0];
      const newHead = {
        x: (head.x + direction.x + GRID_SIZE) % GRID_SIZE,
        y: (head.y + direction.y + GRID_SIZE) % GRID_SIZE
      };

      // Collision with self
      if (prevSnake.some(segment => segment.x === newHead.x && segment.y === newHead.y)) {
        setGameState('over');
        return prevSnake;
      }

      const newSnake = [newHead, ...prevSnake];

      // Check for food
      if (newHead.x === food.x && newHead.y === food.y) {
        setScore(s => s + 1);
        setFood(spawnFood());
        setSpeed(s => Math.max(80, s - 2));
      } else {
        newSnake.pop();
      }

      return newSnake;
    });
  }, [direction, food, spawnFood]);

  useEffect(() => {
    if (gameState === 'playing') {
      gameLoopRef.current = setInterval(moveSnake, speed);
    } else {
      clearInterval(gameLoopRef.current);
    }
    return () => clearInterval(gameLoopRef.current);
  }, [gameState, moveSnake, speed]);

  useEffect(() => {
    const handleKey = (e) => {
      if (gameState !== 'playing') return;
      if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', ' ', 'w', 'a', 's', 'd'].includes(e.key.toLowerCase())) {
        e.preventDefault();
      }
      
      const key = e.key.toLowerCase();
      switch (key) {
        case 'arrowup':
        case 'w': if (direction.y === 0) setDirection({ x: 0, y: -1 }); break;
        case 'arrowdown':
        case 's': if (direction.y === 0) setDirection({ x: 0, y: 1 }); break;
        case 'arrowleft':
        case 'a': if (direction.x === 0) setDirection({ x: -1, y: 0 }); break;
        case 'arrowright':
        case 'd': if (direction.x === 0) setDirection({ x: 1, y: 0 }); break;
      }
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [direction, gameState]);

  return (
    <div style={{ marginTop: '0', textAlign: 'center' }}>

      <div style={{
        width: '100%',
        maxWidth: '800px',
        height: '500px',
        margin: '0 auto',
        background: '#050A0E',
        border: '2px solid rgba(59, 252, 255, 0.2)',
        borderRadius: '20px',
        position: 'relative',
        boxShadow: 'inset 0 0 30px rgba(59, 252, 255, 0.05)',
        overflow: 'hidden'
      }}>
        <div style={{ position: 'absolute', top: 20, left: 20, zIndex: 10, display: 'flex', gap: '20px' }}>
          <div style={{ textAlign: 'left' }}>
            <p style={{ fontSize: '0.6rem', color: '#4A5568', margin: 0 }}>CONNECTION_STRENGTH</p>
            <p style={{ fontSize: '1rem', fontWeight: 900, color: '#3BFCFF', margin: 0 }}>{Math.max(10, 100 - (150 - speed))}%</p>
          </div>
          <div style={{ textAlign: 'left' }}>
            <p style={{ fontSize: '0.6rem', color: '#4A5568', margin: 0 }}>DATA_RECOVERED</p>
            <p style={{ fontSize: '1rem', fontWeight: 900, color: '#00FF87', margin: 0 }}>{score.toString().padStart(3, '0')}</p>
          </div>
        </div>

        {/* The Grid */}
        <div style={{
          width: '320px',
          height: '320px',
          margin: '50px auto 0',
          display: 'grid',
          gridTemplateColumns: `repeat(${GRID_SIZE}, 1fr)`,
          gridTemplateRows: `repeat(${GRID_SIZE}, 1fr)`,
          background: 'rgba(255,255,255,0.02)',
          border: '1px solid rgba(59, 252, 255, 0.1)',
          borderRadius: '8px',
          position: 'relative',
          overflow: 'hidden'
        }}>
          {snake.map((seg, i) => (
            <div key={i} style={{ gridColumn: seg.x + 1, gridRow: seg.y + 1, background: i === 0 ? '#3BFCFF' : 'rgba(59, 252, 255, 0.5)', borderRadius: '2px', boxShadow: i === 0 ? '0 0 10px #3BFCFF' : 'none' }} />
          ))}
          <motion.div animate={{ scale: [1, 1.2, 1] }} transition={{ repeat: Infinity, duration: 1 }} style={{ gridColumn: food.x + 1, gridRow: food.y + 1, background: '#00FF87', borderRadius: '50%', boxShadow: '0 0 15px #00FF87' }} />
        </div>

        <AnimatePresence>
          {gameState !== 'playing' && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={{ position: 'absolute', inset: 0, zIndex: 10, background: 'rgba(2, 4, 8, 0.9)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', borderRadius: '20px' }}>
              {gameState === 'idle' ? (
                <>
                  <Terminal size={50} color="#3BFCFF" style={{ marginBottom: '15px' }} />
                  <p style={{ color: '#8B949E', fontSize: '0.8rem', maxWidth: '300px', lineHeight: 1.6, marginBottom: '30px' }}>Navigate the neural stream. Consume data nodes.</p>
                </>
              ) : (
                <>
                  <ShieldAlert size={40} color="#FF5F56" style={{ marginBottom: '15px' }} />
                  <p style={{ color: '#FF5F56', fontSize: '1rem', fontWeight: 900 }}>CONNECTION_LOST</p>
                  <p style={{ color: '#8B949E', fontSize: '0.7rem', marginBottom: '20px' }}>Final Score: {score}</p>
                </>
              )}
              <div style={{ display: 'flex', gap: '15px' }}>
                <motion.button onClick={resetGame} whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} style={{ padding: '8px 20px', background: '#3BFCFF', color: '#000', border: 'none', borderRadius: '8px', fontWeight: 800, fontSize: '0.75rem', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  {gameState === 'idle' ? 'START_UP()' : 'RETRY()'}
                </motion.button>
                {gameState === 'over' && (
                  <motion.button onClick={() => setGameState('idle')} whileHover={{ scale: 1.1 }} style={{ padding: '8px 20px', background: 'transparent', color: '#3BFCFF', border: '1px solid #3BFCFF', borderRadius: '8px', fontWeight: 800, fontSize: '0.75rem', cursor: 'pointer' }}>
                    EXIT_SESSION
                  </motion.button>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Mobile Controls */}
        <div style={{ marginTop: '20px', display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '10px', width: '150px', marginInline: 'auto' }}>
          <div />
          <ControlButton onClick={() => direction.y === 0 && setDirection({ x: 0, y: -1 })}><ChevronUp size={20} /></ControlButton>
          <div />
          <ControlButton onClick={() => direction.x === 0 && setDirection({ x: -1, y: 0 })}><ChevronLeft size={20} /></ControlButton>
          <ControlButton onClick={() => direction.y === 0 && setDirection({ x: 0, y: 1 })}><ChevronDown size={20} /></ControlButton>
          <ControlButton onClick={() => direction.x === 0 && setDirection({ x: 1, y: 0 })}><ChevronRight size={20} /></ControlButton>
        </div>
      </div>
      <p style={{ color: '#4A5568', fontSize: '0.7rem', marginTop: '1.5rem', letterSpacing: '1px' }}>
        TIP: CONSUME DATA NODES TO GROW. USE ARROWS OR WASD TO NAVIGATE.
      </p>
    </div>
  );
};

const ControlButton = ({ children, onClick }) => (
  <motion.button 
    whileTap={{ scale: 0.9, background: 'rgba(59, 252, 255, 0.2)' }}
    onClick={onClick}
    style={{ aspectRatio: '1/1', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(59, 252, 255, 0.1)', borderRadius: '8px', color: '#3BFCFF', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}
  >
    {children}
  </motion.button>
);

const ShieldAlert = ({ size, color, style }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={style}>
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>
  </svg>
);

export default SnakeGame;
