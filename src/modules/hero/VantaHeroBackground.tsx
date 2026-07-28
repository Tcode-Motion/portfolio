import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import BIRDS from 'vanta/dist/vanta.birds.min';

interface VantaHeroBackgroundProps {
  scrollYProgress?: number;
}

export const VantaHeroBackground: React.FC<VantaHeroBackgroundProps> = ({ scrollYProgress = 0 }) => {
  const vantaRef = useRef<HTMLDivElement>(null);
  const vantaEffect = useRef<any>(null);
  const [reducedMotion, setReducedMotion] = useState(false);

  // Check prefers-reduced-motion
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReducedMotion(mediaQuery.matches);
    const handleChange = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  // Initialize Vanta BIRDS effect with ultra-minimal settings
  useEffect(() => {
    if (!vantaRef.current) return;

    try {
      vantaEffect.current = BIRDS({
        el: vantaRef.current,
        THREE,
        mouseControls: true,
        touchControls: true,
        gyroControls: false,
        minHeight: 200.0,
        minWidth: 200.0,
        scale: 1.0,
        scaleMobile: 0.7,
        backgroundColor: 0x050505,
        color1: 0xc4ff36,
        color2: 0x22d3ee,
        birdSize: reducedMotion ? 0.3 : 0.5,
        wingSpan: reducedMotion ? 6.0 : 8.0,
        speedLimit: reducedMotion ? 1.5 : 2.5,
        separation: reducedMotion ? 50.0 : 40.0,
        alignment: reducedMotion ? 30.0 : 25.0,
        cohesion: reducedMotion ? 25.0 : 20.0,
        quantity: reducedMotion ? 1.5 : 2.2,
        backgroundAlpha: 0,
      });
    } catch (err) {
      console.warn('Vanta BIRDS init warning:', err);
    }

    return () => {
      if (vantaEffect.current) {
        try { vantaEffect.current.destroy(); } catch {}
        vantaEffect.current = null;
      }
    };
  }, [reducedMotion]);

  const scrollOpacity = 1 - Math.min(1, scrollYProgress * 1.6);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0 bg-[#050505]">
      {/* Vanta BIRDS Container — Right 55% with smooth left fade */}
      <div
        className="absolute top-0 right-0 w-[60%] h-full"
        style={{
          maskImage: 'linear-gradient(to right, transparent 0%, rgba(0,0,0,0.15) 20%, rgba(0,0,0,0.6) 45%, rgba(0,0,0,1) 65%)',
          WebkitMaskImage: 'linear-gradient(to right, transparent 0%, rgba(0,0,0,0.15) 20%, rgba(0,0,0,0.6) 45%, rgba(0,0,0,1) 65%)',
        }}
      >
        <div
          ref={vantaRef}
          className="absolute -inset-10 w-[calc(100%+80px)] h-[calc(100%+80px)]"
          style={{ opacity: scrollOpacity }}
        />
      </div>

      {/* Soft neon green ambient glow on right side */}
      <div
        className="absolute top-1/3 right-10 w-[400px] h-[400px] rounded-full blur-[120px] pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(196,255,54,0.06) 0%, rgba(196,255,54,0.02) 40%, transparent 70%)',
        }}
      />

      {/* Deep radial dark mask behind left typography */}
      <div className="absolute inset-y-0 left-0 w-full lg:w-[55%] bg-gradient-to-r from-[#050505] via-[#050505]/95 to-transparent z-[1]" />
      <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_35%_30%,rgba(5,5,5,0.97)_0%,rgba(5,5,5,0.3)_55%,transparent_100%)] z-[1]" />

      {/* Fine vignette */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_50%,rgba(5,5,5,0.6)_100%)] pointer-events-none z-[2]" />
    </div>
  );
};
