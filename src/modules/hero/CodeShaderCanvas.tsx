import React, { useEffect, useRef } from 'react';
import { useMotion } from '@/core/motion/MotionProvider';

export const CodeShaderCanvas: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { allowComplexAnimations } = useMotion();

  useEffect(() => {
    if (!allowComplexAnimations || !canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = canvas.offsetWidth);
    let height = (canvas.height = canvas.offsetHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = canvas.offsetWidth;
      height = canvas.height = canvas.offsetHeight;
    };

    window.addEventListener('resize', handleResize);

    // Particle nodes representing code syntax streams
    const particles = Array.from({ length: 45 }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      size: Math.random() * 2 + 1,
      speedX: (Math.random() - 0.5) * 0.4,
      speedY: (Math.random() - 0.5) * 0.4,
      opacity: Math.random() * 0.5 + 0.2,
      char: ['fn', 'let', 'mut', 'struct', 'impl', 'AST', 'VM', '01', '=>', '{}'][
        Math.floor(Math.random() * 10)
      ],
    }));

    let mouseX = width / 2;
    let mouseY = height / 2;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseX = e.clientX - rect.left;
      mouseY = e.clientY - rect.top;
    };

    window.addEventListener('mousemove', handleMouseMove);

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Render subtle connections
      for (let i = 0; i < particles.length; i++) {
        const p1 = particles[i];
        p1.x += p1.speedX;
        p1.y += p1.speedY;

        if (p1.x < 0 || p1.x > width) p1.speedX *= -1;
        if (p1.y < 0 || p1.y > height) p1.speedY *= -1;

        // Draw character code node
        ctx.font = '10px "JetBrains Mono", monospace';
        ctx.fillStyle = `rgba(99, 102, 241, ${p1.opacity * 0.6})`;
        ctx.fillText(p1.char, p1.x, p1.y);

        // Distance check to mouse for interactive heat effect
        const dx = mouseX - p1.x;
        const dy = mouseY - p1.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < 120) {
          ctx.beginPath();
          ctx.moveTo(p1.x, p1.y);
          ctx.lineTo(mouseX, mouseY);
          ctx.strokeStyle = `rgba(6, 182, 212, ${1 - dist / 120})`;
          ctx.lineWidth = 0.6;
          ctx.stroke();
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, [allowComplexAnimations]);

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-40">
      {allowComplexAnimations ? (
        <canvas ref={canvasRef} className="w-full h-full" />
      ) : (
        <div className="w-full h-full bg-gradient-to-tr from-accent-indigo/10 via-accent-purple/5 to-transparent" />
      )}
    </div>
  );
};
