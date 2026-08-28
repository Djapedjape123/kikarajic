"use client";

import React, { useCallback, useEffect, useMemo, useRef, useState, memo } from 'react';

// 1. Definišemo tipove za Props-e
export interface LogoLoopProps {
  logos: any[];
  speed?: number;
  direction?: 'left' | 'right' | 'up' | 'down';
  width?: string | number;
  logoHeight?: number;
  gap?: number;
  pauseOnHover?: boolean;
  hoverSpeed?: number;
  fadeOut?: boolean;
  fadeOutColor?: string;
  scaleOnHover?: boolean;
  renderItem: (item: any) => React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}

const ANIMATION_CONFIG = { SMOOTH_TAU: 0.25, MIN_COPIES: 2, COPY_HEADROOM: 2 };

const toCssLength = (value?: string | number) => 
  typeof value === 'number' ? `${value}px` : value ?? undefined;

const cx = (...parts: (string | undefined | null | false)[]) => 
  parts.filter(Boolean).join(' ');

// 2. Dodati tipovi za Hook-ove
const useResizeObserver = (callback: () => void, elements: React.RefObject<HTMLElement | null>[], dependencies: any[]) => {
  useEffect(() => {
    if (!window.ResizeObserver) {
      const handleResize = () => callback();
      window.addEventListener('resize', handleResize);
      callback();
      return () => window.removeEventListener('resize', handleResize);
    }
    const observers = elements.map(ref => {
      if (!ref.current) return null;
      const observer = new ResizeObserver(callback);
      observer.observe(ref.current);
      return observer;
    });
    callback();
    return () => { observers.forEach(observer => observer?.disconnect()); };
  }, [callback, elements, dependencies]);
};

const useImageLoader = (seqRef: React.RefObject<HTMLElement | null>, onLoad: () => void, dependencies: any[]) => {
  useEffect(() => {
    const images = seqRef.current?.querySelectorAll('img') ?? [];
    if (images.length === 0) { onLoad(); return; }
    
    let remainingImages = images.length;
    const handleImageLoad = () => {
      remainingImages -= 1;
      if (remainingImages === 0) onLoad();
    };

    images.forEach(img => {
      const htmlImg = img as HTMLImageElement;
      if (htmlImg.complete) handleImageLoad();
      else {
        htmlImg.addEventListener('load', handleImageLoad, { once: true });
        htmlImg.addEventListener('error', handleImageLoad, { once: true });
      }
    });
  }, [onLoad, seqRef, dependencies]);
};

const useAnimationLoop = (
  trackRef: React.RefObject<HTMLElement | null>, 
  targetVelocity: number, 
  seqWidth: number, 
  seqHeight: number, 
  isHovered: boolean, 
  hoverSpeed: number | undefined, 
  isVertical: boolean
) => {
  const rafRef = useRef<number | null>(null);
  const lastTimestampRef = useRef<number | null>(null);
  const offsetRef = useRef(0);
  const velocityRef = useRef(0);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    const seqSize = isVertical ? seqHeight : seqWidth;

    if (seqSize > 0) {
      offsetRef.current = ((offsetRef.current % seqSize) + seqSize) % seqSize;
      track.style.transform = isVertical
        ? `translate3d(0, ${-offsetRef.current}px, 0)`
        : `translate3d(${-offsetRef.current}px, 0, 0)`;
    }

    const animate = (timestamp: number) => {
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
    return () => {
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
      lastTimestampRef.current = null;
    };
  }, [targetVelocity, seqWidth, seqHeight, isHovered, hoverSpeed, isVertical, trackRef]);
};

export const LogoLoop = memo(({ 
  logos, 
  speed = 40, 
  direction = 'left', 
  width = '100%', 
  logoHeight = 40, 
  gap = 48, 
  pauseOnHover, 
  hoverSpeed, 
  fadeOut = false, 
  fadeOutColor, 
  scaleOnHover = false, 
  renderItem, 
  className, 
  style 
}: LogoLoopProps) => {
  
  // 3. OVO REŠAVA TVOJ PROBLEM: Tačno govorimo TS-u koji HTML element ref prati
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const seqRef = useRef<HTMLUListElement>(null);
  
  const [seqWidth, setSeqWidth] = useState(0);
  const [seqHeight, setSeqHeight] = useState(0);
  const [copyCount, setCopyCount] = useState(ANIMATION_CONFIG.MIN_COPIES);
  const [isHovered, setIsHovered] = useState(false);

  const effectiveHoverSpeed = useMemo(() => {
    if (hoverSpeed !== undefined) return hoverSpeed;
    if (pauseOnHover === true) return 0;
    if (pauseOnHover === false) return undefined;
    return 0;
  }, [hoverSpeed, pauseOnHover]);

  const targetVelocity = useMemo(() => (Math.abs(speed) * (direction === 'left' ? 1 : -1) * (speed < 0 ? -1 : 1)), [speed, direction]);

  const updateDimensions = useCallback(() => {
    const containerWidth = containerRef.current?.clientWidth ?? 0;
    const sequenceWidth = seqRef.current?.getBoundingClientRect?.().width ?? 0;
    if (sequenceWidth > 0) {
      setSeqWidth(Math.ceil(sequenceWidth));
      setCopyCount(Math.max(ANIMATION_CONFIG.MIN_COPIES, Math.ceil(containerWidth / sequenceWidth) + ANIMATION_CONFIG.COPY_HEADROOM));
    }
  }, []);

  useResizeObserver(updateDimensions, [containerRef, seqRef], [logos, gap, logoHeight]);
  useImageLoader(seqRef, updateDimensions, [logos, gap, logoHeight]);
  useAnimationLoop(trackRef, targetVelocity, seqWidth, seqHeight, isHovered, effectiveHoverSpeed, false);

  const handleMouseEnter = () => setIsHovered(true);
  const handleMouseLeave = () => setIsHovered(false);

  const renderLogoItem = (item: any, key: string) => (
    <li className={`flex-none text-[length:var(--logoloop-logoHeight)] leading-[1] mr-[var(--logoloop-gap)]`} key={key}>
      {renderItem(item)}
    </li>
  );

  return (
    <div
      ref={containerRef}
      className={cx('relative group overflow-x-hidden', className)}
      style={{ 
        width: toCssLength(width) ?? '100%', 
        '--logoloop-gap': `${gap}px`, 
        '--logoloop-logoHeight': `${logoHeight}px`, 
        ...(fadeOutColor ? { '--logoloop-fadeColor': fadeOutColor } : {}),
        ...style 
      } as React.CSSProperties}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {fadeOut && (
        <>
          <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-[clamp(24px,8%,120px)] bg-[linear-gradient(to_right,var(--logoloop-fadeColor)_0%,rgba(0,0,0,0)_100%)]" />
          <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-[clamp(24px,8%,120px)] bg-[linear-gradient(to_left,var(--logoloop-fadeColor)_0%,rgba(0,0,0,0)_100%)]" />
        </>
      )}
      <div ref={trackRef} className="flex will-change-transform select-none relative z-0 flex-row w-max">
        {Array.from({ length: copyCount }, (_, i) => (
          <ul className="flex items-center" key={`copy-${i}`} ref={i === 0 ? seqRef : undefined}>
            {logos.map((item, idx) => renderLogoItem(item, `${i}-${idx}`))}
          </ul>
        ))}
      </div>
    </div>
  );
});

LogoLoop.displayName = 'LogoLoop';
export default LogoLoop;