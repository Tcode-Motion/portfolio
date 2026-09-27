import React from 'react';

export const BackgroundEngine: React.FC = () => {
  return (
    <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden select-none bg-[#07090e]">
      {/* 100% Hardware-accelerated smooth background ambient glow gradients (0% CPU, 0% RAF, zero blur filters) */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `
            radial-gradient(circle at 85% 15%, rgba(99, 102, 241, 0.12) 0%, rgba(139, 92, 246, 0.05) 35%, transparent 65%),
            radial-gradient(circle at 10% 80%, rgba(6, 182, 212, 0.09) 0%, rgba(56, 189, 248, 0.03) 35%, transparent 60%),
            radial-gradient(circle at 50% 45%, rgba(196, 255, 54, 0.035) 0%, transparent 50%)
          `,
        }}
      />

      {/* Lightweight subtle grid texture */}
      <div
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.15) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.15) 1px, transparent 1px)
          `,
          backgroundSize: '80px 80px',
        }}
      />

      {/* Subtle vignette */}
      <div
        className="absolute inset-0"
        style={{
          background: 'radial-gradient(ellipse at 50% 50%, transparent 60%, rgba(7,9,14,0.7) 100%)',
        }}
      />
    </div>
  );
};
