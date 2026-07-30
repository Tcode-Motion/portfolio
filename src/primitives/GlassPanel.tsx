import React from 'react';

interface GlassPanelProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
  glow?: boolean;
}

export const GlassPanel: React.FC<GlassPanelProps> = ({ children, className = '', hover = false }) => (
  <div
    className={`rounded-xl border border-[var(--border)] bg-[var(--surface-1)] ${hover ? 'hover:border-[var(--border-hover)] transition-all duration-300' : ''} ${className}`}
  >
    {children}
  </div>
);
