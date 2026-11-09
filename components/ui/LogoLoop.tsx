"use client";

import React, { useCallback, useEffect, useMemo, useRef, useState, memo } from 'react';

// 1. Definišemo tipove za Props-e (T = tip jednog logoa, npr. { name, href, src })
export interface LogoLoopProps<T> {
  logos: readonly T[];
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
  renderItem: (item: T) => React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}

const ANIMATION_CONFIG = { SMOOTH_TAU: 0.25, MIN_COPIES: 2, COPY_HEADROOM: 2 };

const toCssLength = (value?: string | number) => 
  typeof value === 'number' ? `${value}px` : value ?? undefined;

const cx = (...parts: (string | undefined | null | false)[]) => 
  parts.filter(Boolean).join(' ');

// 2. Dodati tipovi za Hook-ove
// Zavisnosti efekata su stabilne (refovi, callback iz useCallback, niz logoa) - ranije su se nizovi
// pravili iznova pri svakom renderu, pa su se posmatrači i listeneri postavljali ponovo na svaki hover/skrol.
// FUNKCIJA KOJA KORISTI ResizeObserver ILI FALLBACK NA window.resize
const useResizeObserver = (
  callback: () => void,
  firstRef: React.RefObject<HTMLElement | null>,
  secondRef: React.RefObject<HTMLElement | null>
) => {
  useEffect(() => {
    // Ako ResizeObserver nije podržan, koristimo fallback na window.resize
    if (!window.ResizeObserver) {
      const handleResize = () => callback();
      window.addEventListener('resize', handleResize);
      callback();
      return () => window.removeEventListener('resize', handleResize);
    }
    // Ako je ResizeObserver podržan, koristimo ga (javlja se i odmah po observe-u, i pri svakoj promeni veličine)
    const observers = [firstRef, secondRef].map(ref => {
      if (!ref.current) return null;
      const observer = new ResizeObserver(callback);
      observer.observe(ref.current);
      return observer;
    });
    callback();
    return () => { observers.forEach(observer => observer?.disconnect()); };
  }, [callback, firstRef, secondRef]);
};
// FUNLCIJA KOJA ČEKA DA SE SVI LOGO-OVI UCITAJU (ponovo samo kad se promeni spisak logoa)
const useImageLoader = (seqRef: React.RefObject<HTMLElement | null>, onLoad: () => void, logos: readonly unknown[]) => {
  useEffect(() => {
    const images = Array.from(seqRef.current?.querySelectorAll('img') ?? []);
    if (images.length === 0) { onLoad(); return; }

    let remainingImages = images.length;
    const handleImageLoad = () => {
      remainingImages -= 1;
      if (remainingImages === 0) onLoad();
    };

    const pending = images.filter(img => !img.complete);
    images.forEach(img => { if (img.complete) handleImageLoad(); });
    pending.forEach(img => {
      img.addEventListener('load', handleImageLoad, { once: true });
      img.addEventListener('error', handleImageLoad, { once: true });
    });
    return () => {
      pending.forEach(img => {
        img.removeEventListener('load', handleImageLoad);
        img.removeEventListener('error', handleImageLoad);
      });
    };
  }, [onLoad, seqRef, logos]);
};

// FUNKCIJA KOJA PRATI DA LI JE TRAKA NA EKRANU (van ekrana ne trošimo CPU na animaciju)
const useIsOnScreen = (ref: React.RefObject<HTMLElement | null>) => {
  const [isOnScreen, setIsOnScreen] = useState(true);
  useEffect(() => {
    const el = ref.current;
    if (!el || !window.IntersectionObserver) return;
    const observer = new IntersectionObserver(([entry]) => setIsOnScreen(entry.isIntersecting));
    observer.observe(el);
    return () => observer.disconnect();
  }, [ref]);
  return isOnScreen;
};

const useAnimationLoop = (
  trackRef: React.RefObject<HTMLElement | null>, 
  targetVelocity: number, 
  seqWidth: number, 
  seqHeight: number, 
  isHovered: boolean, 
  hoverSpeed: number | undefined, 
  isVertical: boolean,
  isOnScreen: boolean
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

    if (!isOnScreen) return;

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
  }, [targetVelocity, seqWidth, seqHeight, isHovered, hoverSpeed, isVertical, trackRef, isOnScreen]);
};

function LogoLoopInner<T>({
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
}: LogoLoopProps<T>) {
  
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

  // promena razmaka/visine logoa menja širinu trake, a to ResizeObserver sam primeti
  useResizeObserver(updateDimensions, containerRef, seqRef);
  useImageLoader(seqRef, updateDimensions, logos);
  const isOnScreen = useIsOnScreen(containerRef);
  useAnimationLoop(trackRef, targetVelocity, seqWidth, seqHeight, isHovered, effectiveHoverSpeed, false, isOnScreen);

  const handleMouseEnter = () => setIsHovered(true);
  const handleMouseLeave = () => setIsHovered(false);

  const renderLogoItem = (item: T, key: string) => (
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
}

// memo ne zna za generičke komponente, pa se tip vraća ručno
const MemoLogoLoop = memo(LogoLoopInner);
MemoLogoLoop.displayName = 'LogoLoop';
export const LogoLoop = MemoLogoLoop as typeof LogoLoopInner;
export default LogoLoop;