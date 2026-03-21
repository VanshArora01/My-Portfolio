import { useRef, useEffect, useCallback, useState } from 'react';
import { gsap } from 'gsap';
import './MagicBento.css';

const DEFAULT_PARTICLE_COUNT = 10;
const DEFAULT_SPOTLIGHT_RADIUS = 300;
const DEFAULT_GLOW_COLOR = '0, 255, 135';
const MOBILE_BREAKPOINT = 768;

const createParticleElement = (x, y, color = DEFAULT_GLOW_COLOR) => {
  const el = document.createElement('div');
  el.className = 'particle';
  el.style.cssText = `
    position: absolute;
    width: 3px;
    height: 3px;
    border-radius: 50%;
    background: rgba(${color}, 1);
    box-shadow: 0 0 6px rgba(${color}, 0.8);
    pointer-events: none;
    z-index: 100;
    left: ${x}px;
    top: ${y}px;
  `;
  return el;
};

const calculateSpotlightValues = radius => ({
  proximity: radius * 0.5,
  fadeDistance: radius * 0.75
});

const updateCardGlowProperties = (card, mouseX, mouseY, glow, radius) => {
  const rect = card.getBoundingClientRect();
  const relativeX = ((mouseX - rect.left) / rect.width) * 100;
  const relativeY = ((mouseY - rect.top) / rect.height) * 100;
  card.style.setProperty('--glow-x', `${relativeX}%`);
  card.style.setProperty('--glow-y', `${relativeY}%`);
  card.style.setProperty('--glow-intensity', glow.toString());
  card.style.setProperty('--glow-radius', `${radius}px`);
};

const ParticleCard = ({
  children, className = '', disableAnimations = false, style,
  particleCount = DEFAULT_PARTICLE_COUNT, glowColor = DEFAULT_GLOW_COLOR,
  enableTilt = false, clickEffect = true, enableMagnetism = false
}) => {
  const cardRef = useRef(null);
  const particlesRef = useRef([]);
  const timeoutsRef = useRef([]);
  const isHoveredRef = useRef(false);
  const memoizedParticles = useRef([]);
  const particlesInitialized = useRef(false);

  const initializeParticles = useCallback(() => {
    if (particlesInitialized.current || !cardRef.current) return;
    const { width, height } = cardRef.current.getBoundingClientRect();
    memoizedParticles.current = Array.from({ length: particleCount }, () =>
      createParticleElement(Math.random() * width, Math.random() * height, glowColor)
    );
    particlesInitialized.current = true;
  }, [particleCount, glowColor]);

  const clearAllParticles = useCallback(() => {
    timeoutsRef.current.forEach(clearTimeout);
    timeoutsRef.current = [];
    particlesRef.current.forEach(particle => {
      gsap.to(particle, {
        scale: 0, opacity: 0, duration: 0.3, ease: 'back.in(1.7)',
        onComplete: () => particle.parentNode?.removeChild(particle)
      });
    });
    particlesRef.current = [];
  }, []);

  const animateParticles = useCallback(() => {
    if (!cardRef.current || !isHoveredRef.current) return;
    if (!particlesInitialized.current) initializeParticles();
    memoizedParticles.current.forEach((particle, index) => {
      const timeoutId = setTimeout(() => {
        if (!isHoveredRef.current || !cardRef.current) return;
        const clone = particle.cloneNode(true);
        cardRef.current.appendChild(clone);
        particlesRef.current.push(clone);
        gsap.fromTo(clone, { scale: 0, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.3, ease: 'back.out(1.7)' });
        gsap.to(clone, { x: (Math.random() - 0.5) * 80, y: (Math.random() - 0.5) * 80, rotation: Math.random() * 360, duration: 2 + Math.random() * 2, ease: 'none', repeat: -1, yoyo: true });
        gsap.to(clone, { opacity: 0.4, duration: 1.5, ease: 'power2.inOut', repeat: -1, yoyo: true });
      }, index * 80);
      timeoutsRef.current.push(timeoutId);
    });
  }, [initializeParticles]);

  useEffect(() => {
    if (disableAnimations || !cardRef.current) return;
    const element = cardRef.current;

    const handleMouseEnter = () => { isHoveredRef.current = true; animateParticles(); };
    const handleMouseLeave = () => { isHoveredRef.current = false; clearAllParticles(); };

    const handleClick = e => {
      if (!clickEffect) return;
      const rect = element.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const maxDistance = Math.max(Math.hypot(x, y), Math.hypot(x - rect.width, y), Math.hypot(x, y - rect.height), Math.hypot(x - rect.width, y - rect.height));
      const ripple = document.createElement('div');
      ripple.style.cssText = `position:absolute;width:${maxDistance*2}px;height:${maxDistance*2}px;border-radius:50%;background:radial-gradient(circle,rgba(${glowColor},0.3) 0%,rgba(${glowColor},0.1) 30%,transparent 70%);left:${x-maxDistance}px;top:${y-maxDistance}px;pointer-events:none;z-index:1000;`;
      element.appendChild(ripple);
      gsap.fromTo(ripple, { scale: 0, opacity: 1 }, { scale: 1, opacity: 0, duration: 0.8, ease: 'power2.out', onComplete: () => ripple.remove() });
    };

    element.addEventListener('mouseenter', handleMouseEnter);
    element.addEventListener('mouseleave', handleMouseLeave);
    element.addEventListener('click', handleClick);

    return () => {
      isHoveredRef.current = false;
      element.removeEventListener('mouseenter', handleMouseEnter);
      element.removeEventListener('mouseleave', handleMouseLeave);
      element.removeEventListener('click', handleClick);
      clearAllParticles();
    };
  }, [animateParticles, clearAllParticles, disableAnimations, clickEffect, glowColor]);

  return (
    <div ref={cardRef} className={`${className} particle-container`} style={{ ...style, position: 'relative', overflow: 'hidden' }}>
      {children}
    </div>
  );
};

const GlobalSpotlight = ({ gridRef, disableAnimations = false, enabled = true, spotlightRadius = DEFAULT_SPOTLIGHT_RADIUS, glowColor = DEFAULT_GLOW_COLOR }) => {
  const spotlightRef = useRef(null);

  useEffect(() => {
    if (disableAnimations || !gridRef?.current || !enabled) return;
    const spotlight = document.createElement('div');
    spotlight.className = 'global-spotlight';
    spotlight.style.cssText = `position:fixed;width:600px;height:600px;border-radius:50%;pointer-events:none;background:radial-gradient(circle,rgba(${glowColor},0.12) 0%,rgba(${glowColor},0.06) 20%,rgba(${glowColor},0.03) 40%,transparent 70%);z-index:200;opacity:0;transform:translate(-50%,-50%);mix-blend-mode:screen;`;
    document.body.appendChild(spotlight);
    spotlightRef.current = spotlight;

    const handleMouseMove = e => {
      if (!spotlightRef.current || !gridRef.current) return;
      const section = gridRef.current.closest('.bento-section');
      const rect = section?.getBoundingClientRect();
      const mouseInside = rect && e.clientX >= rect.left && e.clientX <= rect.right && e.clientY >= rect.top && e.clientY <= rect.bottom;
      const cards = gridRef.current.querySelectorAll('.magic-bento-card');
      if (!mouseInside) {
        gsap.to(spotlightRef.current, { opacity: 0, duration: 0.3 });
        cards.forEach(card => card.style.setProperty('--glow-intensity', '0'));
        return;
      }
      const { proximity, fadeDistance } = calculateSpotlightValues(spotlightRadius);
      let minDistance = Infinity;
      cards.forEach(card => {
        const cardRect = card.getBoundingClientRect();
        const centerX = cardRect.left + cardRect.width / 2;
        const centerY = cardRect.top + cardRect.height / 2;
        const distance = Math.max(0, Math.hypot(e.clientX - centerX, e.clientY - centerY) - Math.max(cardRect.width, cardRect.height) / 2);
        minDistance = Math.min(minDistance, distance);
        let glowIntensity = 0;
        if (distance <= proximity) glowIntensity = 1;
        else if (distance <= fadeDistance) glowIntensity = (fadeDistance - distance) / (fadeDistance - proximity);
        updateCardGlowProperties(card, e.clientX, e.clientY, glowIntensity, spotlightRadius);
      });
      gsap.to(spotlightRef.current, { left: e.clientX, top: e.clientY, duration: 0.1 });
      const targetOpacity = minDistance <= proximity ? 0.8 : minDistance <= fadeDistance ? ((fadeDistance - minDistance) / (fadeDistance - proximity)) * 0.8 : 0;
      gsap.to(spotlightRef.current, { opacity: targetOpacity, duration: targetOpacity > 0 ? 0.2 : 0.5 });
    };

    const handleMouseLeave = () => {
      gridRef.current?.querySelectorAll('.magic-bento-card').forEach(card => card.style.setProperty('--glow-intensity', '0'));
      if (spotlightRef.current) gsap.to(spotlightRef.current, { opacity: 0, duration: 0.3 });
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      spotlightRef.current?.parentNode?.removeChild(spotlightRef.current);
    };
  }, [gridRef, disableAnimations, enabled, spotlightRadius, glowColor]);

  return null;
};

const useMobileDetection = () => {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth <= MOBILE_BREAKPOINT);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);
  return isMobile;
};

const MagicBento = ({
  textAutoHide = true, enableStars = true, enableSpotlight = true,
  enableBorderGlow = true, disableAnimations = false,
  spotlightRadius = DEFAULT_SPOTLIGHT_RADIUS, particleCount = DEFAULT_PARTICLE_COUNT,
  glowColor = DEFAULT_GLOW_COLOR, clickEffect = true
}) => {
  const gridRef = useRef(null);
  const isMobile = useMobileDetection();
  const shouldDisableAnimations = disableAnimations || isMobile;

  const cardData = [
    {
      label: 'ABOUT',
      title: null,
      content: (
        <div>
          <p style={{ color: '#4A5568', fontSize: '0.7rem', marginBottom: '0.5rem' }}>&gt; cat about.txt</p>
          <p style={{ color: '#CDD9E5', fontSize: '0.85rem', lineHeight: 1.8 }}>
            I'm a full-stack developer who ships things people actually use. 3 production apps for real clients, 2 hackathon wins, and an AI developer tool in active development. I make{' '}
            <span style={{ color: '#00FF87', fontWeight: 600 }}>architectural decisions</span>
            {' '}and own them.
          </p>
        </div>
      )
    },
    {
      label: 'CORE STACK',
      title: null,
      content: (
        <div style={{ textAlign: 'center', padding: '0.5rem 0' }}>
          <p style={{ color: '#4A5568', fontSize: '0.65rem', marginBottom: '0.4rem', letterSpacing: '0.1em' }}>CORE STACK</p>
          <p style={{ color: '#00FF87', fontSize: '2.8rem', fontWeight: 700, lineHeight: 1, fontFamily: 'JetBrains Mono' }}>MERN</p>
          <p style={{ color: '#3BFCFF', fontSize: '1rem', marginTop: '0.25rem' }}>+ AI</p>
        </div>
      )
    },
    {
      label: 'HACKATHONS',
      title: null,
      content: (
        <div style={{ textAlign: 'center', padding: '0.25rem 0' }}>
          <p style={{ color: '#00FF87', fontSize: '2.5rem', fontWeight: 700, lineHeight: 1, fontFamily: 'JetBrains Mono' }}>2× 🏆</p>
          <p style={{ color: '#CDD9E5', fontSize: '0.82rem', marginTop: '0.5rem' }}>Hackathon Winner</p>
          <p style={{ color: '#4A5568', fontSize: '0.72rem', marginTop: '0.2rem' }}>DBU 2025 · 1st Place</p>
          <p style={{ color: '#4A5568', fontSize: '0.72rem' }}>PCTE Winner</p>
        </div>
      )
    },
    // {
    //   label: 'PAYMENTS',
    //   title: null,
    //   content: (
    //     <div>
    //       <p style={{ color: '#4A5568', fontSize: '0.65rem', marginBottom: '0.5rem', letterSpacing: '0.1em' }}>PAYMENTS</p>
    //       <p style={{ fontSize: '1.4rem', marginBottom: '0.3rem' }}>💳</p>
    //       <p style={{ color: '#E6EDF3', fontWeight: 600, fontSize: '0.9rem' }}>Razorpay Integrated</p>
    //       <p style={{ color: '#4A5568', fontSize: '0.75rem', marginTop: '0.3rem', lineHeight: 1.5 }}>Real transaction flows on production apps</p>
    //     </div>
    //   )
    // },
    // {
    //   label: 'STATUS',
    //   title: null,
    //   content: (
    //     <div style={{ display: 'flex', alignItems: 'flex-start', gap: '8px' }}>
    //       <span className="pulse-ring" style={{ marginTop: '3px' }} />
    //       <div>
    //         <p style={{ color: '#00FF87', fontWeight: 600, fontSize: '0.9rem' }}>Open to Remote</p>
    //         <p style={{ color: '#4A5568', fontSize: '0.75rem', marginTop: '0.3rem' }}>Ludhiana, Punjab 🇮🇳</p>
    //         <p style={{ color: '#4A5568', fontSize: '0.72rem', marginTop: '0.2rem' }}>Available for work</p>
    //       </div>
    //     </div>
    //   )
    // },
    {
      label: 'DSA',
      title: null,
      content: (
        <div>
          <p style={{ color: '#4A5568', fontSize: '0.65rem', marginBottom: '0.5rem', letterSpacing: '0.1em' }}>DSA PROGRESS</p>
          <p style={{ color: '#E6EDF3', fontWeight: 600, fontSize: '0.85rem' }}>⚡ LeetCode Active</p>
          <p style={{ color: '#4A5568', fontSize: '0.72rem', marginTop: '0.3rem', lineHeight: 1.6 }}>Arrays · Hash Maps · Two Pointers · Sliding Window</p>
          <div style={{ display: 'flex', gap: '4px', marginTop: '0.75rem' }}>
            {[1,2,3,4,5].map(i => (
              <div key={i} style={{ height: '5px', width: '24px', borderRadius: '3px', background: i <= 3 ? '#00FF87' : '#21262D' }} />
            ))}
          </div>
        </div>
      )
    },
    {
      label: 'CURRENT PROJECT',
      title: null,
      content: (
        <div>
          <p style={{ color: '#4A5568', fontSize: '0.72rem', marginBottom: '0.6rem' }}>&gt; ls ~/projects/current</p>
          <p style={{ color: '#00FF87', fontWeight: 700, fontSize: '1.1rem', marginBottom: '0.4rem' }}>DevOS — Developer OS</p>
          <p style={{ color: '#CDD9E5', fontSize: '0.82rem', lineHeight: 1.7, marginBottom: '0.6rem' }}>
            Agentic AI · 4 function-calling tools · Recharts dashboards · Brevo SMTP · Real-time context persistence across dev sessions
          </p>
          <p style={{ color: '#3BFCFF', fontSize: '0.78rem', fontStyle: 'italic', marginBottom: '0.75rem' }}>
            "You never start from zero again."
          </p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.3rem' }}>
            {['React', 'TypeScript', 'Node.js', 'MongoDB', 'Groq', 'LLaMA-3.3-70b'].map(tag => (
              <span key={tag} style={{ background: '#161B22', border: '1px solid #21262D', color: '#00FF87', fontSize: '0.62rem', padding: '2px 7px', borderRadius: '4px', fontFamily: 'JetBrains Mono' }}>
                {tag}
              </span>
            ))}
          </div>
        </div>
      )
    }
  ];

  return (
    <>
      {enableSpotlight && (
        <GlobalSpotlight
          gridRef={gridRef}
          disableAnimations={shouldDisableAnimations}
          enabled={enableSpotlight}
          spotlightRadius={spotlightRadius}
          glowColor={glowColor}
        />
      )}
      <div className="card-grid bento-section" ref={gridRef}>
        {cardData.map((card, index) => {
          const baseClassName = `magic-bento-card ${textAutoHide ? 'magic-bento-card--text-autohide' : ''} ${enableBorderGlow ? 'magic-bento-card--border-glow' : ''}`;
          const cardStyle = { backgroundColor: '#0D1117', '--glow-color': glowColor };

          if (enableStars) {
            return (
              <ParticleCard
                key={index}
                className={baseClassName}
                style={cardStyle}
                disableAnimations={shouldDisableAnimations}
                particleCount={particleCount}
                glowColor={glowColor}
                enableTilt={false}
                clickEffect={clickEffect}
                enableMagnetism={false}
              >
                <div className="magic-bento-card__header">
                  <div className="magic-bento-card__label">{card.label}</div>
                </div>
                <div className="magic-bento-card__content">
                  {card.content}
                </div>
              </ParticleCard>
            );
          }

          return (
            <div key={index} className={baseClassName} style={cardStyle}>
              <div className="magic-bento-card__header">
                <div className="magic-bento-card__label">{card.label}</div>
              </div>
              <div className="magic-bento-card__content">
                {card.content}
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default MagicBento;
