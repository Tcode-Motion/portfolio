import React, { useEffect, useState, Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { PlanetaryGlobe } from '@/modules/hero/PlanetaryGlobe';

export const GlobalPlanetaryCanvas: React.FC = () => {
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0) {
        const progress = Math.min(1, Math.max(0, window.scrollY / totalHeight));
        setScrollProgress(progress);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-[1] overflow-hidden">
      <Suspense fallback={null}>
        <Canvas
          camera={{ position: [0, 0, 7.5], fov: 44 }}
          dpr={[1, 1.5]}
          gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
          style={{ background: 'transparent' }}
        >
          <PlanetaryGlobe scrollProgress={scrollProgress} />
        </Canvas>
      </Suspense>

      {/* Atmospheric Ambient Glow behind Planet */}
      <div
        className="absolute top-1/4 right-10 w-[550px] h-[550px] rounded-full blur-[150px] pointer-events-none opacity-20 transition-all duration-700"
        style={{
          background: 'radial-gradient(circle, #c4ff36 0%, rgba(139,92,246,0.3) 50%, transparent 80%)',
          transform: `translate3d(0, ${scrollProgress * -100}px, 0)`,
        }}
      />
    </div>
  );
};
