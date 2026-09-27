import React, { useEffect, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { PlanetaryGlobe } from '@/modules/hero/PlanetaryGlobe';

export const GlobalPlanetaryCanvas: React.FC = () => {
  const [canRender, setCanRender] = useState(true);

  useEffect(() => {
    // Check if user explicitly asked for reduced motion
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setCanRender(false);
    }
  }, []);

  if (!canRender) {
    return null;
  }

  return (
    <div
      className="fixed inset-0 pointer-events-none z-[1] overflow-hidden select-none"
      style={{ opacity: 0.85 }}
      aria-hidden="true"
    >
      <Canvas
        camera={{ position: [0, 0, 7.5], fov: 44 }}
        dpr={1}
        gl={{
          antialias: false,
          alpha: true,
          powerPreference: 'default',
          preserveDrawingBuffer: false,
        }}
        onCreated={({ gl }) => {
          const dom = gl.domElement;
          // Crucial: prevent browser from permanently abandoning context on transient driver hiccups
          dom.addEventListener(
            'webglcontextlost',
            (event) => {
              event.preventDefault();
            },
            false
          );
        }}
        style={{ background: 'transparent', pointerEvents: 'none', width: '100%', height: '100%' }}
      >
        <PlanetaryGlobe />
      </Canvas>

      {/* Atmospheric Ambient Glow behind Planet (pure hardware CSS radial gradient, 0% blur overhead) */}
      <div
        className="absolute top-1/4 right-6 w-[450px] h-[450px] rounded-full pointer-events-none opacity-20"
        style={{
          background: 'radial-gradient(circle, rgba(99,102,241,0.25) 0%, rgba(139,92,246,0.1) 40%, transparent 70%)',
        }}
      />
    </div>
  );
};
