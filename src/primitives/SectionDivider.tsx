import React, { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const SectionDivider: React.FC<{ className?: string }> = ({ className = '' }) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const line = el.querySelector('.divider-line') as HTMLElement;
    const dot = el.querySelector('.divider-dot') as HTMLElement;
    if (!line || !dot) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(line,
        { scaleX: 0 },
        {
          scaleX: 1,
          duration: 1.2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: el,
            start: 'top 85%',
            once: true,
          },
        }
      );

      gsap.fromTo(dot,
        { scale: 0, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          duration: 0.6,
          delay: 0.4,
          ease: 'back.out(2)',
          scrollTrigger: {
            trigger: el,
            start: 'top 85%',
            once: true,
          },
        }
      );
    }, el);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={ref} className={`relative flex items-center justify-center py-8 ${className}`}>
      <div className="divider-line absolute inset-x-0 h-px bg-gradient-to-r from-transparent via-[var(--border)] to-transparent origin-center" />
      <div className="divider-dot relative z-10 w-2 h-2 rounded-full bg-[var(--accent-lime)] shadow-[0_0_12px_rgba(196,255,54,0.3)]" />
    </div>
  );
};
