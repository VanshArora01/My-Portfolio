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
          <p style={{ color: '#4A5568', fontSize: '0.7rem', marginBottom: '0.5rem' }}>&gt; query developer_profile</p>
          <p style={{ color: '#CDD9E5', fontSize: '0.85rem', lineHeight: 1.8 }}>
            A Full Stack Architect bridging the gap between <span style={{ color: '#3BFCFF' }}>Agentic AI</span> and production ecosystems. With 3 client-validated platforms and 2 national hackathon wins, I engineer systems that prioritize <span style={{ color: '#00FF87', fontWeight: 600 }}>computational efficiency</span> and cinematic user experiences.
          </p>
        </div>
      )
    },
    {
      label: 'CORE STACK',
      title: null,
      content: (
        <div style={{ textAlign: 'center', padding: '0.5rem 0' }}>
          <p style={{ color: '#4A5568', fontSize: '0.65rem', marginBottom: '0.8rem', letterSpacing: '0.1em' }}>NEURAL ENGINE STACK</p>
          <p className="magic-bento-card__big" style={{ color: '#00FF87', fontWeight: 900, lineHeight: 1, fontFamily: 'JetBrains Mono', fontSize: '1.8rem' }}>MERN+AI</p>
          <div style={{ marginTop: '0.5rem', display: 'flex', justifyContent: 'center', gap: '8px' }}>
            <span style={{ color: '#3BFCFF', fontSize: '0.6rem', border: '1px solid rgba(59, 252, 255, 0.2)', padding: '2px 6px', borderRadius: '4px' }}>LLAMA-3.3</span>
            <span style={{ color: '#3BFCFF', fontSize: '0.6rem', border: '1px solid rgba(59, 252, 255, 0.2)', padding: '2px 6px', borderRadius: '4px' }}>GROQ</span>
          </div>
        </div>
      )
    },
    {
      label: 'HACKATHONS',
      title: null,
      content: (
        <div style={{ textAlign: 'center', display: 'flex', flexDirection: 'column', justifyContent: 'center', flex: 1, paddingTop: isMobile ? '0rem' : '1rem' }}>
          <p className="magic-bento-card__big" style={{ color: '#00FF87', fontWeight: 800, lineHeight: 1, fontFamily: 'JetBrains Mono', fontSize: isMobile ? '1.8rem' : '2.5rem', marginBottom: '0.25rem' }}>2× 🥇</p>
          <p style={{ color: '#E6EDF3', fontWeight: 700, fontSize: isMobile ? '0.75rem' : '0.88rem', letterSpacing: '0.05em' }}>PRESTIGIOUS VICTORIES</p>
          <div style={{ marginTop: '0.5rem', display: 'flex', flexDirection: 'column', gap: '4px' }}>
            <p style={{ color: '#8B949E', fontSize: '0.72rem' }}>DBU 2025 • <span style={{ color: '#00FF87' }}>Champion</span></p>
            <p style={{ color: '#8B949E', fontSize: '0.72rem' }}>PCTE Group • <span style={{ color: '#00FF87' }}>Winner</span></p>
          </div>
          {!isMobile && <p style={{ color: '#4A5568', fontSize: '0.65rem', marginTop: '1rem', fontStyle: 'italic' }}>"Engineering solutions under extreme pressure."</p>}
        </div>
      )
    },
    {
      label: 'ALGORITHMS',
      title: null,
      content: (
        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', flex: 1, paddingTop: isMobile ? '0' : '1rem' }}>
          <p style={{ color: '#E6EDF3', fontWeight: 700, fontSize: '1rem' }}>⚡ Advanced Problem Solving</p>
          <p style={{ color: '#8B949E', fontSize: '0.82rem', marginTop: '0.5rem', lineHeight: 1.6 }}>
            {isMobile 
              ? "Optimizing Time Complexity across Arrays, Hash Maps, & Sliding Windows." 
              : "Optimizing Time Complexity across Arrays, Hash Maps, & Sliding Windows for high-performance data processing."}
          </p>
          <div style={{ display: 'flex', gap: '4px', marginTop: '1rem' }}>
            {[1,2,3,4,5].map(i => (
              <div key={i} style={{ height: '5px', width: '24px', borderRadius: '3px', background: i <= 3 ? '#00FF87' : '#21262D' }} />
            ))}
          </div>
        </div>
      )
    },
    {
      label: 'PRODUCTION',
      title: null,
      content: (
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          <p style={{ color: '#00FF87', fontWeight: 800, fontSize: '1.2rem', marginBottom: '0.4rem', letterSpacing: '-0.02em' }}>Impactful Deployments</p>
          <p style={{ color: '#CDD9E5', fontSize: '0.82rem', lineHeight: 1.6, marginBottom: '0.75rem' }}>
            {isMobile 
              ? "Architected and deployed 10+ Production Applications with 99.9% uptime." 
              : "Successfully architected and deployed 10+ Production Applications for diverse clients, maintaining 99.9% uptime and high-performance throughput."}
          </p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem' }}>
            {['E-Commerce', 'SaaS', 'Industrial'].map(tag => (
              <span key={tag} style={{ background: 'rgba(59, 252, 255, 0.05)', border: '1px solid rgba(59, 252, 255, 0.15)', color: '#3BFCFF', fontSize: '0.6rem', padding: '2px 8px', borderRadius: '100px' }}>
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
