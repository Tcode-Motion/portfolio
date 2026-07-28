import React from 'react';

export const NoiseTexture: React.FC = () => (
  <div
    className="fixed inset-0 pointer-events-none z-[60] mix-blend-overlay"
    style={{
      backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.025'/%3E%3C/svg%3E")`,
      backgroundRepeat: 'repeat',
      opacity: 0.4,
    }}
  />
);
