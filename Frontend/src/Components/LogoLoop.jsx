import { useCallback, useEffect, useMemo, useRef, useState, memo } from 'react';
import './LogoLoop.css';

const ANIMATION_CONFIG = { SMOOTH_TAU: 0.5, MIN_COPIES: 2, COPY_HEADROOM: 2 };
const toCssLength = value => (typeof value === 'number' ? `${value}px` : (value ?? undefined));

const useResizeObserver = (callback, elements, dependencies) => {
  useEffect(() => {
    if (!window.ResizeObserver) {
      window.addEventListener('resize', callback);
      callback();
      return () => window.removeEventListener('resize', callback);
    }
    const observers = elements.map(ref => {
      if (!ref.current) return null;
      const observer = new ResizeObserver(callback);
      observer.observe(ref.current);
      return observer;
    });
    callback();
    return () => observers.forEach(o => o?.disconnect());
  }, [callback, elements, dependencies]);
};

const useAnimationLoop = (trackRef, targetVelocity, seqWidth, seqHeight, isHovered, hoverSpeed, isVertical) => {
  const rafRef = useRef(null);
  const lastTimestampRef = useRef(null);
  const offsetRef = useRef(0);
  const velocityRef = useRef(0);
  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    const seqSize = isVertical ? seqHeight : seqWidth;
    const animate = timestamp => {
      if (lastTimestampRef.current === null) lastTimestampRef.current = timestamp;
      const deltaTime = Math.max(0, timestamp - lastTimestampRef.current) / 1000;
      lastTimestampRef.current = timestamp;
      const target = isHovered && hoverSpeed !== undefined ? hoverSpeed : targetVelocity;
      const easingFactor = 1 - Math.exp(-deltaTime / ANIMATION_CONFIG.SMOOTH_TAU);
      velocityRef.current += (target - velocityRef.current) * easingFactor;
      if (seqSize > 0) {
        let nextOffset = offsetRef.current + velocityRef.current * deltaTime;
        nextOffset = ((nextOffset % seqSize) + seqSize) % seqSize;
        offsetRef.current = nextOffset;
        track.style.transform = isVertical
          ? `translate3d(0, ${-offsetRef.current}px, 0)`
          : `translate3d(${-offsetRef.current}px, 0, 0)`;
      }
      rafRef.current = requestAnimationFrame(animate);
    };
    rafRef.current = requestAnimationFrame(animate);
    return () => { if (rafRef.current) cancelAnimationFrame(rafRef.current); lastTimestampRef.current = null; };
  }, [targetVelocity, seqWidth, seqHeight, isHovered, hoverSpeed, isVertical, trackRef]);
};

export const LogoLoop = memo(({ logos, speed = 120, direction = 'left', width = '100%', logoHeight = 28, gap = 32, pauseOnHover, hoverSpeed, fadeOut = false, fadeOutColor, scaleOnHover = false, renderItem, ariaLabel = 'Tech logos', className, style }) => {
  const containerRef = useRef(null);
  const trackRef = useRef(null);
  const seqRef = useRef(null);
  const [seqWidth, setSeqWidth] = useState(0);
  const [seqHeight, setSeqHeight] = useState(0);
  const [copyCount, setCopyCount] = useState(ANIMATION_CONFIG.MIN_COPIES);
  const [isHovered, setIsHovered] = useState(false);
  const isVertical = direction === 'up' || direction === 'down';
  const effectiveHoverSpeed = useMemo(() => {
    if (hoverSpeed !== undefined) return hoverSpeed;
    if (pauseOnHover === true) return 0;
    return 0;
  }, [hoverSpeed, pauseOnHover]);
  const targetVelocity = useMemo(() => {
    const magnitude = Math.abs(speed);
    const dirMul = isVertical ? (direction === 'up' ? 1 : -1) : (direction === 'left' ? 1 : -1);
    return magnitude * dirMul * (speed < 0 ? -1 : 1);
  }, [speed, direction, isVertical]);
  const updateDimensions = useCallback(() => {
    const sequenceRect = seqRef.current?.getBoundingClientRect?.();
    const sequenceWidth = sequenceRect?.width ?? 0;
    const sequenceHeight = sequenceRect?.height ?? 0;
    if (!isVertical && sequenceWidth > 0) {
      setSeqWidth(Math.ceil(sequenceWidth));
      const containerWidth = containerRef.current?.clientWidth ?? 0;
      setCopyCount(Math.max(ANIMATION_CONFIG.MIN_COPIES, Math.ceil(containerWidth / sequenceWidth) + ANIMATION_CONFIG.COPY_HEADROOM));
    }
  }, [isVertical]);
  useResizeObserver(updateDimensions, [containerRef, seqRef], [logos, gap, logoHeight, isVertical]);
  useAnimationLoop(trackRef, targetVelocity, seqWidth, seqHeight, isHovered, effectiveHoverSpeed, isVertical);
  const cssVariables = useMemo(() => ({
    '--logoloop-gap': `${gap}px`,
    '--logoloop-logoHeight': `${logoHeight}px`,
    ...(fadeOutColor && { '--logoloop-fadeColor': fadeOutColor })
  }), [gap, logoHeight, fadeOutColor]);
  const rootClassName = ['logoloop', isVertical ? 'logoloop--vertical' : 'logoloop--horizontal', fadeOut && 'logoloop--fade', scaleOnHover && 'logoloop--scale-hover', className].filter(Boolean).join(' ');
  const renderLogoItem = useCallback((item, key) => {
    if (renderItem) return <li className="logoloop__item" key={key}>{renderItem(item, key)}</li>;
    const isNodeItem = 'node' in item;
    const content = isNodeItem ? <span className="logoloop__node">{item.node}</span> : <img src={item.src} alt={item.alt ?? ''} loading="lazy" draggable={false} />;
    return <li className="logoloop__item" key={key}>{item.href ? <a className="logoloop__link" href={item.href} target="_blank" rel="noreferrer noopener">{content}</a> : content}</li>;
  }, [renderItem]);
  const logoLists = useMemo(() => Array.from({ length: copyCount }, (_, ci) => (
    <ul className="logoloop__list" key={`copy-${ci}`} aria-hidden={ci > 0} ref={ci === 0 ? seqRef : undefined}>
      {logos.map((item, ii) => renderLogoItem(item, `${ci}-${ii}`))}
    </ul>
  )), [copyCount, logos, renderLogoItem]);
  return (
    <div ref={containerRef} className={rootClassName} style={{ width: toCssLength(width) ?? '100%', ...cssVariables, ...style }} role="region" aria-label={ariaLabel}>
      <div className="logoloop__track" ref={trackRef} onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>
        {logoLists}
      </div>
    </div>
  );
});

LogoLoop.displayName = 'LogoLoop';
export default LogoLoop;
