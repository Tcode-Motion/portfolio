import React from 'react';

export const BrandLogo: React.FC = () => (
  <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* Outer rounded square */}
    <rect
      x="0.5"
      y="0.5"
      width="27"
      height="27"
      rx="7"
      stroke="var(--border)"
      strokeWidth="1"
    />
    {/* TM monogram */}
    <path
      d="M7 20V8L10.5 16L14 8V20"
      stroke="var(--text-1)"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      fill="none"
    />
    <path
      d="M15 20V8L18.5 16L22 8V20"
      stroke="var(--text-1)"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      fill="none"
    />
    {/* Lime dot accent */}
    <circle cx="24" cy="4" r="2" fill="var(--accent-lime)" />
  </svg>
);
