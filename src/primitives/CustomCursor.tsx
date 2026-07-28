import React, { useEffect, useRef, useState } from 'react';

type CursorState = 'active' | 'hidden';

const LERP = (a: number, b: number, t: number) => a + (b - a) * t;

export const CustomCursor: React.FC = () => {
  const [isTouch, setIsTouch] = useState(true);

  const posRef = useRef({ x: -100, y: -100 });
  const targetRef = useRef({ x: -100, y: -100 });
  const stateRef = useRef<CursorState>('hidden');
  const frameRef = useRef(0);
  const angleRef = useRef(0);

  const lensRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    setIsTouch(isTouchDevice);
  }, []);

  useEffect(() => {
    if (isTouch) return;

    const lens = lensRef.current;
    const dot = dotRef.current;
    const glow = glowRef.current;
    if (!lens || !dot || !glow) return;

    let mx = -100, my = -100;

    const onMove = (e: MouseEvent) => {
      mx = e.clientX;
      my = e.clientY;
      targetRef.current = { x: mx, y: my };
      stateRef.current = 'active';
    };
    const onLeave = () => {
      stateRef.current = 'hidden';
    };
    const onEnter = (e: MouseEvent) => {
      mx = e.clientX;
      my = e.clientY;
      stateRef.current = 'active';
    };

    document.addEventListener('mousemove', onMove, { passive: true });
    document.addEventListener('mouseleave', onLeave);
    document.addEventListener('mouseenter', onEnter);

    const animate = () => {
      const pos = posRef.current;
      const target = targetRef.current;
      const state = stateRef.current;
      angleRef.current += 0.002;

      pos.x = LERP(pos.x, target.x, 0.25);
      pos.y = LERP(pos.y, target.y, 0.25);

      const isHidden = state === 'hidden';
      const sz = 44;
      const half = sz / 2;

      // ─── Lens ───
      lens.style.transform = `translate(${pos.x - half}px, ${pos.y - half}px)`;
      lens.style.width = `${sz}px`;
      lens.style.height = `${sz}px`;
      lens.style.opacity = isHidden ? '0' : '1';

      // Rainbow prism — rotating conic gradient on the inner rim
      const rainbow = lens.querySelector('.lens-rainbow') as HTMLElement;
      if (rainbow) {
        rainbow.style.transform = `rotate(${angleRef.current}rad)`;
        rainbow.style.opacity = isHidden ? '0' : '0.35';
      }

      // Specular
      const spec = lens.querySelector('.lens-specular') as HTMLElement;
      if (spec) {
        spec.style.opacity = isHidden ? '0' : '0.5';
      }

      // ─── Center dot ───
      dot.style.transform = `translate(${pos.x - 2}px, ${pos.y - 2}px)`;
      dot.style.opacity = isHidden ? '0' : '0.8';

      // ─── Glow ───
      glow.style.transform = `translate(${pos.x - 60}px, ${pos.y - 60}px)`;
      glow.style.opacity = isHidden ? '0' : '1';

      frameRef.current = requestAnimationFrame(animate);
    };

    frameRef.current = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(frameRef.current);
      document.removeEventListener('mousemove', onMove);
      document.removeEventListener('mouseleave', onLeave);
      document.removeEventListener('mouseenter', onEnter);
    };
  }, [isTouch]);

  if (isTouch) return null;

  return (
    <div className="fixed inset-0 z-[9999] pointer-events-none">
      {/* Glow aura */}
      <div
        ref={glowRef}
        className="absolute rounded-full"
        style={{
          width: 120,
          height: 120,
          background: 'radial-gradient(circle, rgba(255,255,255,0.04) 0%, transparent 70%)',
          transition: 'opacity 0.3s ease',
          willChange: 'transform',
        }}
      />

      {/* ─── Glass lens ─── */}
      <div
        ref={lensRef}
        className="absolute rounded-full overflow-hidden"
        style={{
          willChange: 'transform, opacity',
          transition: 'opacity 0.2s ease',
          backdropFilter: 'brightness(1.3) contrast(1.1) saturate(1.4) blur(0.5px)',
          WebkitBackdropFilter: 'brightness(1.3) contrast(1.1) saturate(1.4) blur(0.5px)',
          background: 'rgba(255,255,255,0.02)',
          boxShadow: `
            0 0 0 1px rgba(255,255,255,0.08),
            0 2px 8px rgba(0,0,0,0.15),
            inset 0 1px 2px rgba(255,255,255,0.06),
            inset 0 -1px 3px rgba(0,0,0,0.1)
          `,
        }}
      >
        {/* Rainbow chromatic edge */}
        <div
          className="lens-rainbow absolute inset-0 rounded-full"
          style={{
            background: 'conic-gradient(from 0deg, #ff0040, #ff8000, #40ff00, #0080ff, #8b5cf6, #ff0040)',
            maskImage: 'radial-gradient(circle, transparent 65%, black 68%, transparent 72%)',
            WebkitMaskImage: 'radial-gradient(circle, transparent 65%, black 68%, transparent 72%)',
            opacity: 0.35,
            willChange: 'transform',
            transition: 'opacity 0.3s ease',
          }}
        />

        {/* Glass depth shading */}
        <div
          className="absolute inset-0 rounded-full"
          style={{
            background: 'radial-gradient(circle at 35% 30%, transparent 35%, rgba(0,0,0,0.08) 85%, rgba(0,0,0,0.15) 100%)',
          }}
        />

        {/* Specular highlight */}
        <div
          className="lens-specular absolute rounded-full"
          style={{
            top: '18%',
            left: '22%',
            width: '40%',
            height: '22%',
            background: 'radial-gradient(ellipse, rgba(255,255,255,0.6) 0%, rgba(255,255,255,0.15) 40%, transparent 70%)',
            borderRadius: '50%',
            opacity: 0.5,
            transition: 'opacity 0.2s ease',
          }}
        />
      </div>

      {/* Center dot */}
      <div
        ref={dotRef}
        className="absolute rounded-full"
        style={{
          width: 4,
          height: 4,
          background: 'rgba(255,255,255,0.7)',
          boxShadow: '0 0 4px rgba(255,255,255,0.3)',
          willChange: 'transform',
          transition: 'opacity 0.2s ease',
        }}
      />
    </div>
  );
};
