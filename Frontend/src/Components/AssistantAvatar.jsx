import { motion, AnimatePresence, useAnimation } from 'framer-motion';
import { useEffect, useState } from 'react';

const AssistantAvatar = ({ state = 'idle', isMobile = false }) => {
  const [eyePos, setEyePos] = useState({ x: 0, y: 0 });
  const [blinkState, setBlinkState] = useState(false);
  const [currentIdleAnim, setCurrentIdleAnim] = useState('breathe');
  const bodyControls = useAnimation();
  const headControls = useAnimation();
  const leftArmControls = useAnimation();
  const rightArmControls = useAnimation();
  const eyebrowControls = useAnimation();

  // Random eye movement when idle
  useEffect(() => {
    if (state !== 'idle' && state !== 'thinking') return;
    const moveEyes = () => {
      const directions = [
        { x: 0, y: 0 }, { x: 3, y: 0 }, { x: -3, y: 0 },
        { x: 0, y: 2 }, { x: 2, y: 2 }, { x: -2, y: -1 },
        { x: 3, y: -1 }, { x: -3, y: 2 },
      ];
      const pick = directions[Math.floor(Math.random() * directions.length)];
      setEyePos(pick);
    };
    const interval = setInterval(moveEyes, 2000);
    return () => clearInterval(interval);
  }, [state]);

  // Blinking
  useEffect(() => {
    const blink = () => {
      setBlinkState(true);
      setTimeout(() => setBlinkState(false), 120);
    };
    const interval = setInterval(blink, 
      state === 'thinking' ? 800 : 3000
    );
    return () => clearInterval(interval);
  }, [state]);

  // Random idle animations cycle
  useEffect(() => {
    if (state !== 'idle') return;
    const anims = ['breathe', 'look_around', 'wave', 'stretch', 'nod'];
    let i = 0;
    const cycle = () => {
      i = (i + 1) % anims.length;
      setCurrentIdleAnim(anims[i]);
    };
    const interval = setInterval(cycle, 4000);
    return () => clearInterval(interval);
  }, [state]);

  // Head movement based on state
  useEffect(() => {
    if (state === 'thinking') {
      headControls.start({
        rotate: [-2, 5, -2, 5, -2],
        y: [0, -3, 0],
        transition: { duration: 2, repeat: Infinity, ease: 'easeInOut' }
      });
    } else if (state === 'talking') {
      headControls.start({
        rotate: [-1, 1, -1, 1, -1],
        y: [0, -2, 0],
        transition: { duration: 0.5, repeat: Infinity, ease: 'easeInOut' }
      });
    } else if (state === 'peeking') {
      headControls.start({
        rotate: [0, 3, 0, -2, 0],
        y: [0, -4, 0],
        transition: { duration: 3, repeat: Infinity, ease: 'easeInOut' }
      });
    } else if (currentIdleAnim === 'look_around') {
      headControls.start({
        rotate: [0, -8, 0, 8, 0, -5, 0],
        transition: { duration: 3, ease: 'easeInOut' }
      });
    } else if (currentIdleAnim === 'nod') {
      headControls.start({
        y: [0, 5, 0, 5, 0],
        transition: { duration: 1.5, ease: 'easeInOut' }
      });
    } else {
      headControls.start({
        rotate: 0, y: 0,
        transition: { duration: 0.5 }
      });
    }
  }, [state, currentIdleAnim]);

  // Arm animations
  useEffect(() => {
    if (state === 'waving' || currentIdleAnim === 'wave') {
      rightArmControls.start({
        rotate: [0, -40, -10, -40, -10, -40, 0],
        y: [0, -15, -10, -15, -10, -15, 0],
        transition: { duration: 1.5, ease: 'easeInOut' }
      });
    } else if (currentIdleAnim === 'stretch') {
      leftArmControls.start({
        rotate: [0, 20, 0],
        transition: { duration: 2, ease: 'easeInOut' }
      });
      rightArmControls.start({
        rotate: [0, -20, 0],
        transition: { duration: 2, ease: 'easeInOut' }
      });
    } else {
      leftArmControls.start({ rotate: 0, y: 0, transition: { duration: 0.5 } });
      rightArmControls.start({ rotate: 0, y: 0, transition: { duration: 0.5 } });
    }
  }, [state, currentIdleAnim]);

  // Eyebrow reactions
  useEffect(() => {
    if (state === 'thinking') {
      eyebrowControls.start({
        y: -3, rotate: -5,
        transition: { duration: 0.3 }
      });
    } else if (state === 'reacting') {
      eyebrowControls.start({
        y: [-3, -8, -3],
        transition: { duration: 0.4, repeat: 2 }
      });
    } else if (state === 'talking') {
      eyebrowControls.start({
        y: [0, -2, 0],
        transition: { duration: 0.5, repeat: Infinity }
      });
    } else {
      eyebrowControls.start({ y: 0, rotate: 0, transition: { duration: 0.3 } });
    }
  }, [state]);

  // Body breathe
  const bodyVariants = {
    breathe: {
      y: [0, -3, 0],
      transition: { duration: 3, repeat: Infinity, ease: 'easeInOut' }
    },
    talking: {
      y: [0, -4, 0, -2, 0],
      transition: { duration: 0.6, repeat: Infinity, ease: 'easeInOut' }
    },
    thinking: {
      y: [0, -2, 0],
      transition: { duration: 2, repeat: Infinity, ease: 'easeInOut' }
    }
  };

  const glowColor = state === 'talking' ? '#00FF87'
    : state === 'thinking' ? '#3BFCFF'
    : state === 'reacting' ? '#FFBD2E'
    : '#21262D';

  return (
    <div style={{
      position: 'relative',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: isMobile ? 'flex-end' : 'center',
      width: '100%',
      height: isMobile ? '220px' : '100%',
    }}>

      {/* Glow behind avatar */}
      <motion.div
        animate={{
          boxShadow: [
            `0 0 40px 10px ${glowColor}22`,
            `0 0 80px 20px ${glowColor}11`,
            `0 0 40px 10px ${glowColor}22`,
          ]
        }}
        transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        style={{
          position: 'absolute',
          width: isMobile ? '160px' : '220px',
          height: isMobile ? '160px' : '220px',
          borderRadius: '50%',
          background: 'transparent',
          bottom: isMobile ? '20px' : '50%',
          transform: isMobile ? 'none' : 'translateY(50%)',
          zIndex: 0,
        }}
      />

      {/* Main avatar SVG */}
      <motion.div
        animate={state === 'talking' ? 'talking'
          : state === 'thinking' ? 'thinking'
          : 'breathe'}
        variants={bodyVariants}
        style={{
          position: 'relative',
          zIndex: 1,
          transformOrigin: 'bottom center',
          // On mobile, peek by rotating forward and translating down
          ...(isMobile && {
            rotate: '8deg',
            y: '30px',
          })
        }}
      >
        <svg
          viewBox="0 0 280 380"
          width={isMobile ? "160" : "260"}
          height={isMobile ? "200" : "340"}
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* ── DESK / LAPTOP ── */}
          <rect x="20" y="290" width="240" height="12" rx="4"
            fill="#161B22" stroke="#21262D" strokeWidth="1"/>
          {/* Laptop screen */}
          <rect x="70" y="240" width="140" height="90" rx="6"
            fill="#0D1117" stroke="#21262D" strokeWidth="1.5"/>
          <rect x="75" y="245" width="130" height="78" rx="4"
            fill="#050A0E"/>
          {/* Code on screen */}
          {[0,1,2,3,4].map(i => (
            <rect key={i} x={80 + (i%2)*30} y={252 + i*13}
              width={20 + (i*7)%40} height="3" rx="1"
              fill={i%3===0 ? '#00FF87' : i%3===1 ? '#3BFCFF' : '#4A5568'}
              opacity={0.7 + (i*0.05)}
            />
          ))}
          {/* Laptop base */}
          <rect x="60" y="328" width="160" height="8" rx="3"
            fill="#161B22" stroke="#21262D" strokeWidth="1"/>

          {/* ── BODY / CHAIR ── */}
          <rect x="80" y="230" width="120" height="100" rx="20"
            fill="#1a1f3c"/>
          {/* Shirt collar */}
          <polygon points="120,240 140,260 160,240" fill="#0D1117"/>
          <polygon points="120,240 132,270 140,260" fill="#161B22"/>
          <polygon points="160,240 148,270 140,260" fill="#161B22"/>

          {/* ── LEFT ARM ── */}
          <motion.g animate={leftArmControls} style={{ originX: '80px', originY: '260px' }}>
            <rect x="55" y="248" width="28" height="65" rx="14"
              fill="#C9784B"/>
            {/* Left hand */}
            <ellipse cx="69" cy="318" rx="12" ry="10" fill="#C9784B"/>
            <rect x="61" y="310" width="7" height="14" rx="3" fill="#C9784B"/>
            <rect x="70" y="308" width="7" height="16" rx="3" fill="#C9784B"/>
          </motion.g>

          {/* ── RIGHT ARM (waves) ── */}
          <motion.g
            animate={rightArmControls}
            style={{ originX: '200px', originY: '260px' }}
          >
            <rect x="197" y="248" width="28" height="65" rx="14"
              fill="#C9784B"/>
            {/* Right hand */}
            <ellipse cx="211" cy="318" rx="12" ry="10" fill="#C9784B"/>
            <rect x="203" y="310" width="7" height="14" rx="3" fill="#C9784B"/>
            <rect x="212" y="308" width="7" height="16" rx="3" fill="#C9784B"/>
            {/* Waving fingers */}
            {(state === 'waving' || currentIdleAnim === 'wave') && (
              <>
                <motion.rect x="203" y="298" width="6" height="14" rx="3"
                  fill="#C9784B"
                  animate={{ rotate: [0, -15, 0, -15, 0] }}
                  transition={{ duration: 0.4, repeat: Infinity }}
                  style={{ originX: '206px', originY: '312px' }}
                />
                <motion.rect x="211" y="296" width="6" height="16" rx="3"
                  fill="#C9784B"
                  animate={{ rotate: [0, -20, 0, -20, 0] }}
                  transition={{ duration: 0.4, repeat: Infinity, delay: 0.1 }}
                  style={{ originX: '214px', originY: '312px' }}
                />
              </>
            )}
          </motion.g>

          {/* ── NECK ── */}
          <rect x="124" y="200" width="32" height="32" rx="6"
            fill="#C9784B"/>

          {/* ── HEAD ── */}
          <motion.g animate={headControls} style={{ originX: '140px', originY: '210px' }}>
            {/* Head shape */}
            <ellipse cx="140" cy="155" rx="58" ry="60" fill="#C9784B"/>

            {/* Hair */}
            <ellipse cx="140" cy="102" rx="55" ry="30" fill="#2d1b00"/>
            <rect x="84" y="95" width="18" height="45" rx="9" fill="#2d1b00"/>
            <rect x="178" y="95" width="18" height="45" rx="9" fill="#2d1b00"/>
            <ellipse cx="140" cy="90" rx="50" ry="22" fill="#3d2600"/>
            {/* Hair strand */}
            <path d="M 130 88 Q 140 75 155 88" fill="none"
              stroke="#2d1b00" strokeWidth="4" strokeLinecap="round"/>

            {/* Ears */}
            <ellipse cx="82" cy="155" rx="10" ry="13" fill="#C9784B"/>
            <ellipse cx="198" cy="155" rx="10" ry="13" fill="#C9784B"/>

            {/* ── HEADPHONES ── */}
            <path d="M 88 125 Q 140 72 192 125"
              fill="none" stroke="#00FF87" strokeWidth="7" strokeLinecap="round"/>
            <rect x="78" y="122" width="20" height="26" rx="7"
              fill="#161B22" stroke="#00FF87" strokeWidth="2"/>
            <rect x="182" y="122" width="20" height="26" rx="7"
              fill="#161B22" stroke="#00FF87" strokeWidth="2"/>
            <rect x="81" y="125" width="14" height="20" rx="5"
              fill="#00FF87" opacity="0.25"/>
            <rect x="185" y="125" width="14" height="20" rx="5"
              fill="#00FF87" opacity="0.25"/>
            {/* LED dots on headphones */}
            <circle cx="88" cy="128" r="2" fill="#00FF87" opacity="0.9"/>
            <circle cx="192" cy="128" r="2" fill="#00FF87" opacity="0.9"/>

            {/* ── EYEBROWS ── */}
            <motion.g animate={eyebrowControls}>
              <path d="M 108 122 Q 124 116 135 120"
                fill="none" stroke="#2d1b00" strokeWidth="4"
                strokeLinecap="round"/>
              <path d="M 145 120 Q 156 116 172 122"
                fill="none" stroke="#2d1b00" strokeWidth="4"
                strokeLinecap="round"/>
            </motion.g>

            {/* ── EYES ── */}
            {/* Eye whites */}
            <ellipse cx="122" cy="148" rx="16" ry={blinkState ? 1 : 16}
              fill="white"
              style={{ transition: 'ry 0.05s' }}
            />
            <ellipse cx="158" cy="148" rx="16" ry={blinkState ? 1 : 16}
              fill="white"
              style={{ transition: 'ry 0.05s' }}
            />

            {/* Glasses */}
            <rect x="104" y="136" width="34" height="26" rx="8"
              fill="none" stroke="#2d1b00" strokeWidth="3"/>
            <rect x="142" y="136" width="34" height="26" rx="8"
              fill="none" stroke="#2d1b00" strokeWidth="3"/>
            <line x1="138" y1="149" x2="142" y2="149"
              stroke="#2d1b00" strokeWidth="2.5"/>
            <line x1="104" y1="149" x2="96" y2="146"
              stroke="#2d1b00" strokeWidth="2.5"/>
            <line x1="176" y1="149" x2="184" y2="146"
              stroke="#2d1b00" strokeWidth="2.5"/>

            {/* Pupils — move with eyePos */}
            {!blinkState && (
              <>
                <motion.circle
                  cx={122 + eyePos.x}
                  cy={149 + eyePos.y}
                  r="7" fill="#1a0a00"
                  animate={{ cx: 122 + eyePos.x, cy: 149 + eyePos.y }}
                  transition={{ duration: 0.4, ease: 'easeOut' }}
                />
                <motion.circle
                  cx={158 + eyePos.x}
                  cy={149 + eyePos.y}
                  r="7" fill="#1a0a00"
                  animate={{ cx: 158 + eyePos.x, cy: 149 + eyePos.y }}
                  transition={{ duration: 0.4, ease: 'easeOut' }}
                />
                {/* Eye shine */}
                <circle cx={124 + eyePos.x} cy={147 + eyePos.y}
                  r="2.5" fill="white"/>
                <circle cx={160 + eyePos.x} cy={147 + eyePos.y}
                  r="2.5" fill="white"/>
              </>
            )}

            {/* ── NOSE ── */}
            <ellipse cx="140" cy="165" rx="6" ry="5" fill="#b06a3a"/>

            {/* ── MOUTH — changes with state ── */}
            {state === 'talking' ? (
              <motion.ellipse
                cx="140" cy="182" rx="14"
                animate={{ ry: [6, 3, 8, 4, 6] }}
                transition={{ duration: 0.35, repeat: Infinity }}
                fill="#1a0a00"
              />
            ) : state === 'thinking' ? (
              // Mouth to the side — thinking
              <path d="M 130 183 Q 140 180 150 184"
                fill="none" stroke="#1a0a00" strokeWidth="3"
                strokeLinecap="round"/>
            ) : state === 'reacting' ? (
              // Surprised O mouth
              <ellipse cx="140" cy="183" rx="12" ry="10" fill="#1a0a00"/>
            ) : currentIdleAnim === 'wave' ? (
              // Big grin while waving
              <path d="M 122 180 Q 140 196 158 180"
                fill="none" stroke="#1a0a00" strokeWidth="3.5"
                strokeLinecap="round"/>
            ) : (
              // Default smile
              <path d="M 126 180 Q 140 192 154 180"
                fill="none" stroke="#1a0a00" strokeWidth="3"
                strokeLinecap="round"/>
            )}

            {/* Rosy cheeks */}
            <ellipse cx="105" cy="168" rx="10" ry="7"
              fill="#e8826a" opacity="0.35"/>
            <ellipse cx="175" cy="168" rx="10" ry="7"
              fill="#e8826a" opacity="0.35"/>
          </motion.g>

          {/* ── REACTION EFFECTS ── */}
          <AnimatePresence>
            {state === 'thinking' && (
              <motion.g
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0 }}
              >
                {['...'].map((_, i) => (
                  <motion.text
                    key={i}
                    x="195" y="80"
                    fontSize="28"
                    fill="#3BFCFF"
                    animate={{ opacity: [0, 1, 0], y: [0, -10, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.3 }}
                  >💭</motion.text>
                ))}
              </motion.g>
            )}

            {(state === 'waving' || currentIdleAnim === 'wave') && (
              <motion.text
                x="195" y="90" fontSize="24"
                initial={{ opacity: 0, scale: 0, rotate: -20 }}
                animate={{ opacity: 1, scale: [1, 1.2, 1], rotate: [-20, 20, -20] }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5, repeat: Infinity }}
              >👋</motion.text>
            )}

            {state === 'reacting' && (
              <motion.text
                x="190" y="85" fontSize="26"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: [10, -5, 0] }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4 }}
              >✨</motion.text>
            )}

            {currentIdleAnim === 'look_around' && (
              <motion.text
                x="192" y="88" fontSize="20"
                initial={{ opacity: 0 }}
                animate={{ opacity: [0, 1, 1, 0] }}
                transition={{ duration: 3 }}
              >👀</motion.text>
            )}
          </AnimatePresence>

          {/* ── LAPTOP SCREEN GLOW based on state ── */}
          <rect x="75" y="245" width="130" height="78" rx="4"
            fill="none"
            stroke={state === 'talking' ? '#00FF87'
              : state === 'thinking' ? '#3BFCFF'
              : '#21262D'}
            strokeWidth="1"
            opacity={state === 'idle' ? 0.3 : 0.8}
          />
        </svg>
      </motion.div>

      {/* ── STATUS BADGE ── */}
      <motion.div
        animate={{ opacity: [0.7, 1, 0.7] }}
        transition={{ duration: 1.5, repeat: Infinity }}
        style={{
          marginTop: isMobile ? '0' : '1rem',
          background: state === 'talking' ? 'rgba(0,255,135,0.12)'
            : state === 'thinking' ? 'rgba(59,252,255,0.12)'
            : state === 'reacting' ? 'rgba(255,189,46,0.12)'
            : 'rgba(33,38,45,0.8)',
          border: `1px solid ${
            state === 'talking' ? 'rgba(0,255,135,0.4)'
            : state === 'thinking' ? 'rgba(59,252,255,0.4)'
            : state === 'reacting' ? 'rgba(255,189,46,0.4)'
            : '#21262D'
          }`,
          borderRadius: '999px',
          padding: '4px 14px',
          fontFamily: 'JetBrains Mono, monospace',
          fontSize: '0.62rem',
          color: state === 'talking' ? '#00FF87'
            : state === 'thinking' ? '#3BFCFF'
            : state === 'reacting' ? '#FFBD2E'
            : '#4A5568',
          fontWeight: 600,
          letterSpacing: '0.08em',
          display: 'flex',
          alignItems: 'center',
          gap: '6px',
        }}
      >
        <motion.span
          animate={{ opacity: [1, 0, 1] }}
          transition={{ duration: 0.8, repeat: Infinity }}
        >●</motion.span>
        {state === 'talking' ? 'RESPONDING'
          : state === 'thinking' ? 'THINKING...'
          : state === 'reacting' ? 'REACTING!'
          : state === 'waving' ? 'WAVING HI!'
          : state === 'peeking' ? 'PEEKING...'
          : 'IDLE'}
      </motion.div>
    </div>
  );
};

export default AssistantAvatar;
