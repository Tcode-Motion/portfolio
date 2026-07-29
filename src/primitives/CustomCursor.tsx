import React, { useEffect, useRef, useState } from 'react';

type CursorState = 'active' | 'hidden';

const LERP = (a: number, b: number, t: number) => a + (b - a) * t;

export const CustomCursor: React.FC = () => {
  const [isTouch, setIsTouch] = useState(true);

  const posRef = useRef({ x: -100, y: -100 });
  const targetRef = useRef({ x: -100, y: -100 });
  const velRef = useRef({ vx: 0, vy: 0 });
  const stateRef = useRef<CursorState>('hidden');
  const isHoveredRef = useRef(false);
  const frameRef = useRef(0);
  const wobblePhaseRef = useRef(0);

  const lensRef = useRef<HTMLDivElement>(null);
  const liquidRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    setIsTouch(isTouchDevice);
  }, []);

  useEffect(() => {
    if (isTouch) return;

    const lens = lensRef.current;
    const liquid = liquidRef.current;
    const dot = dotRef.current;
    const glow = glowRef.current;
    if (!lens || !liquid || !dot || !glow) return;

    const onMove = (e: MouseEvent) => {
      targetRef.current = { x: e.clientX, y: e.clientY };
      stateRef.current = 'active';
    };

    const onMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target) return;
      const isInteractive = !!target.closest(
        'button, a, input, textarea, select, [role="button"], [data-cursor="hover"], .magnetic-btn, h1, h2, h3, p, span'
      );
      isHoveredRef.current = isInteractive;
    };

    const onLeave = () => {
      stateRef.current = 'hidden';
      isHoveredRef.current = false;
    };

    const onEnter = (e: MouseEvent) => {
      targetRef.current = { x: e.clientX, y: e.clientY };
      stateRef.current = 'active';
    };

    document.addEventListener('mousemove', onMove, { passive: true });
    document.addEventListener('mouseover', onMouseOver, { passive: true });
    document.addEventListener('mouseleave', onLeave);
    document.addEventListener('mouseenter', onEnter);

    let currentSize = 34;

    const animate = () => {
      const pos = posRef.current;
      const target = targetRef.current;
      const state = stateRef.current;
      const isHovered = isHoveredRef.current;
      wobblePhaseRef.current += 0.2;

      // Velocity computation for liquid deformation & surface tension spring
      const vx = target.x - pos.x;
      const vy = target.y - pos.y;
      velRef.current.vx = LERP(velRef.current.vx, vx, 0.22);
      velRef.current.vy = LERP(velRef.current.vy, vy, 0.22);

      const speed = Math.hypot(velRef.current.vx, velRef.current.vy);
      const angle = Math.atan2(velRef.current.vy, velRef.current.vx);

      // Lerp position
      pos.x = LERP(pos.x, target.x, 0.22);
      pos.y = LERP(pos.y, target.y, 0.22);

      const isHidden = state === 'hidden';

      // Morph size: 34px water droplet -> 68px liquid magnifying lens
      const targetSize = isHovered ? 68 : 34;
      currentSize = LERP(currentSize, targetSize, 0.16);
      const half = currentSize / 2;

      // Surface tension spring wobble & velocity stretch
      const stretch = Math.min(speed * 0.007, 0.4);
      const springWobble = Math.sin(wobblePhaseRef.current) * Math.min(speed * 0.003, 0.08);
      const scaleX = 1 + stretch + springWobble;
      const scaleY = 1 - stretch * 0.5 - springWobble;

      // Outer container positioning (Strict 100% rounded-full)
      lens.style.transform = `translate3d(${pos.x - half}px, ${pos.y - half}px, 0)`;
      lens.style.width = `${currentSize}px`;
      lens.style.height = `${currentSize}px`;
      lens.style.opacity = isHidden ? '0' : '1';

      // Inner liquid glass deformation (snell's law water droplet lens)
      liquid.style.transform = `rotate(${angle}rad) scale(${scaleX}, ${scaleY}) rotate(${-angle}rad)`;
      liquid.style.boxShadow = isHovered
        ? '0 16px 45px rgba(0,0,0,0.6), inset 0 2px 4px rgba(255,255,255,0.95), inset 0 -4px 10px rgba(0,0,0,0.5), inset 0 0 20px rgba(196,255,54,0.25), 0 0 30px rgba(196,255,54,0.3)'
        : '0 10px 32px rgba(0,0,0,0.5), inset 0 2px 4px rgba(255,255,255,0.9), inset 0 -4px 8px rgba(0,0,0,0.45), 0 0 15px rgba(255,255,255,0.2)';

      // Specular highlight brightness on velocity
      const spec = lens.querySelector('.lens-specular') as HTMLElement;
      if (spec) {
        spec.style.opacity = isHidden ? '0' : `${Math.min(0.75 + speed * 0.01, 0.98)}`;
      }

      // Center core dot
      dot.style.transform = `translate3d(${pos.x - 2.5}px, ${pos.y - 2.5}px, 0) scale(${isHovered ? 1.5 : 1})`;
      dot.style.opacity = isHidden ? '0' : isHovered ? '1' : '0.85';
      dot.style.background = isHovered ? '#c4ff36' : 'rgba(255,255,255,0.95)';

      // Ambient glow
      glow.style.transform = `translate3d(${pos.x - 60}px, ${pos.y - 60}px, 0)`;
      glow.style.opacity = isHidden ? '0' : isHovered ? '1' : '0.5';

      frameRef.current = requestAnimationFrame(animate);
    };

    frameRef.current = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(frameRef.current);
      document.removeEventListener('mousemove', onMove);
      document.removeEventListener('mouseover', onMouseOver);
      document.removeEventListener('mouseleave', onLeave);
      document.removeEventListener('mouseenter', onEnter);
    };
  }, [isTouch]);

  if (isTouch) return null;

  return (
    <div className="fixed inset-0 z-[9999] pointer-events-none overflow-hidden">
      {/* Embedded Active SVG Heightmap Displacement Filter (Snell's Law Magnification) */}
      <svg
        width="0"
        height="0"
        className="absolute pointer-events-none"
        style={{ opacity: 0, position: 'absolute', width: 0, height: 0 }}
      >
        <defs>
          <filter id="water-droplet-lens-physics" x="-50%" y="-50%" width="200%" height="200%">
            <feTurbulence type="fractalNoise" baseFrequency="0.02" numOctaves="2" result="noise" />
            <feDisplacementMap in="SourceGraphic" in2="noise" scale="-24" xChannelSelector="R" yChannelSelector="G" result="magnified" />
            <feGaussianBlur in="magnified" stdDeviation="0.3" />
          </filter>
        </defs>
      </svg>

      {/* Ambient background glow */}
      <div
        ref={glowRef}
        className="absolute rounded-full"
        style={{
          width: 120,
          height: 120,
          background: 'radial-gradient(circle, rgba(196,255,54,0.12) 0%, rgba(255,255,255,0.03) 45%, transparent 70%)',
          transition: 'opacity 0.3s ease',
          willChange: 'transform',
        }}
      />

      {/* ─── Water Droplet Outer Container (Strictly 100% Rounded Full) ─── */}
      <div
        ref={lensRef}
        className="absolute rounded-full overflow-hidden"
        style={{
          willChange: 'transform, opacity, width, height',
          transition: 'opacity 0.2s ease',
          borderRadius: '50%',
        }}
      >
        {/* ─── 3D Water Droplet Physics Shell ─── */}
        <div
          ref={liquidRef}
          className="w-full h-full relative rounded-full overflow-hidden transition-all duration-300 ease-out"
          style={{
            backdropFilter: 'url(#water-droplet-lens-physics) blur(0.5px) brightness(1.35) contrast(1.2) saturate(1.6)',
            WebkitBackdropFilter: 'url(#water-droplet-lens-physics) blur(0.5px) brightness(1.35) contrast(1.2) saturate(1.6)',
            background: 'radial-gradient(circle at 32% 24%, rgba(255,255,255,0.35) 0%, rgba(255,255,255,0.1) 45%, rgba(0,0,0,0.3) 85%, rgba(0,0,0,0.5) 100%)',
            border: '1.5px solid rgba(255, 255, 255, 0.65)',
            borderRadius: '50%',
          }}
        >
          {/* Total Internal Reflection (TIR) Dark Rim Shading */}
          <div
            className="absolute inset-0 rounded-full"
            style={{
              background: 'radial-gradient(circle at 30% 25%, transparent 35%, rgba(0,0,0,0.2) 75%, rgba(0,0,0,0.45) 100%)',
              borderRadius: '50%',
            }}
          />

          {/* Primary Solar Specular Arc Highlight */}
          <div
            className="lens-specular absolute rounded-full"
            style={{
              top: '6%',
              left: '10%',
              width: '54%',
              height: '30%',
              background: 'radial-gradient(ellipse, rgba(255,255,255,0.98) 0%, rgba(255,255,255,0.5) 35%, transparent 80%)',
              borderRadius: '50%',
              opacity: 0.85,
              transition: 'opacity 0.2s ease',
            }}
          />

          {/* Secondary Ground Caustic Bounce Highlight */}
          <div
            className="absolute rounded-full"
            style={{
              bottom: '5%',
              right: '8%',
              width: '45%',
              height: '25%',
              background: 'radial-gradient(ellipse, rgba(255,255,255,0.35) 0%, transparent 75%)',
              borderRadius: '50%',
            }}
          />
        </div>
      </div>

      {/* Center Core Liquid Dot */}
      <div
        ref={dotRef}
        className="absolute rounded-full"
        style={{
          width: 5,
          height: 5,
          boxShadow: '0 0 8px rgba(255,255,255,0.9)',
          willChange: 'transform',
          transition: 'opacity 0.2s ease, background 0.3s ease',
          borderRadius: '50%',
        }}
      />
    </div>
  );
};



