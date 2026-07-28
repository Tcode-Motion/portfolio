import React, { useRef, useEffect, useMemo } from 'react';

export const BackgroundEngine: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const blobRefs = useRef<HTMLDivElement[]>([]);
  const mouseRef = useRef({ x: 0.5, y: 0.5 });
  const scrollRef = useRef(0);
  const blobState = useRef([
    { x: 0, y: 0 },
    { x: 0, y: 0 },
    { x: 0, y: 0 },
    { x: 0, y: 0 },
  ]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let raf: number;
    let w = window.innerWidth;
    let h = window.innerHeight;
    const dpr = Math.min(window.devicePixelRatio, 2);
    let time = 0;

    const resize = () => {
      w = window.innerWidth;
      h = window.innerHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
    };

    const onMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX / w, y: e.clientY / h };
    };

    const onScroll = () => {
      scrollRef.current = window.scrollY / (document.documentElement.scrollHeight - window.innerHeight);
    };

    const particles = Array.from({ length: 80 }, () => ({
      x: Math.random() * w,
      y: Math.random() * h,
      vx: (Math.random() - 0.5) * 0.15,
      vy: (Math.random() - 0.5) * 0.1,
      size: Math.random() * 1.8 + 0.4,
      opacity: Math.random() * 0.2 + 0.03,
      phase: Math.random() * Math.PI * 2,
    }));

    const tick = () => {
      time += 0.016;
      const mx = mouseRef.current.x;
      const my = mouseRef.current.y;
      const sy = scrollRef.current;

      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, w, h);

      // Particles with mouse attraction + scroll drift
      for (let pi = 0; pi < particles.length; pi++) {
        const p = particles[pi];
        const ddx = mx * w - p.x;
        const ddy = (my * h + sy * h * 0.3) - p.y;
        const dist = Math.sqrt(ddx * ddx + ddy * ddy);
        if (dist < 350 && dist > 1) {
          const f = (350 - dist) / 350 * 0.006;
          p.vx += (ddx / dist) * f;
          p.vy += (ddy / dist) * f;
        }
        p.x += p.vx;
        p.y += p.vy;
        p.vx *= 0.99;
        p.vy *= 0.99;
        p.phase += 0.005;

        if (p.x < -30) p.x = w + 30;
        if (p.x > w + 30) p.x = -30;
        if (p.y < -30) p.y = h + 30;
        if (p.y > h + 30) p.y = -30;

        const a = p.opacity * (0.6 + 0.4 * Math.sin(p.phase + sy * 4));
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        const isLime = (p.phase + pi) % 5 === 0;
        ctx.fillStyle = isLime
          ? `rgba(196,255,54,${a * 0.6})`
          : `rgba(240,237,232,${a})`;
        ctx.fill();
      }

      // Connection lines between nearby particles
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const ddx = particles[i].x - particles[j].x;
          const ddy = particles[i].y - particles[j].y;
          const d2 = ddx * ddx + ddy * ddy;
          if (d2 < 12000) {
            const d = Math.sqrt(d2);
            const a = (1 - d / 110) * 0.03;
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(196,255,54,${a})`;
            ctx.lineWidth = 0.4;
            ctx.stroke();
          }
        }
      }

      // Animated blobs with scroll influence
      const bs = blobState.current;
      const speeds = [0.008, 0.005, 0.006, 0.004];
      const tx = [
        Math.sin(time * 0.25) * 100 + (mx - 0.5) * 80 + Math.sin(sy * 6) * 40,
        Math.cos(time * 0.18) * 120 + (0.5 - mx) * 50 + Math.cos(sy * 5) * 30,
        Math.sin(time * 0.3 + 2) * 80 + (mx - 0.5) * 40 + Math.sin(sy * 7) * 25,
        Math.cos(time * 0.22 + 1) * 90 + (my - 0.5) * 60 + Math.cos(sy * 4) * 35,
      ];
      const ty = [
        Math.cos(time * 0.2) * 80 + (my - 0.5) * 50 + Math.cos(sy * 5) * 30,
        Math.sin(time * 0.15) * 100 + (0.5 - my) * 40 + Math.sin(sy * 6) * 25,
        Math.cos(time * 0.26 + 1) * 70 + (my - 0.5) * 35 + Math.cos(sy * 4) * 20,
        Math.sin(time * 0.19) * 85 + (mx - 0.5) * 45 + Math.sin(sy * 7) * 30,
      ];

      for (let i = 0; i < 4; i++) {
        bs[i].x += (tx[i] - bs[i].x) * speeds[i];
        bs[i].y += (ty[i] - bs[i].y) * speeds[i];
        const el = blobRefs.current[i];
        if (el) el.style.transform = `translate(${bs[i].x}px,${bs[i].y}px)`;
      }

      raf = requestAnimationFrame(tick);
    };

    resize();
    window.addEventListener('resize', resize);
    window.addEventListener('mousemove', onMove, { passive: true });
    window.addEventListener('scroll', onScroll, { passive: true });
    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('scroll', onScroll);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const blobs = useMemo(() => [
    { w: 550, left: '20%', top: '30%', bg: 'radial-gradient(circle,rgba(196,255,54,0.08) 0%,transparent 70%)' },
    { w: 650, left: '75%', top: '35%', bg: 'radial-gradient(circle,rgba(6,182,212,0.05) 0%,transparent 70%)' },
    { w: 450, left: '45%', top: '70%', bg: 'radial-gradient(circle,rgba(196,255,54,0.04) 0%,transparent 70%)' },
    { w: 500, left: '10%', top: '75%', bg: 'radial-gradient(circle,rgba(6,182,212,0.03) 0%,transparent 70%)' },
  ], []);

  return (
    <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
      {/* Canvas particles */}
      <canvas ref={canvasRef} className="absolute inset-0" />

      {/* Animated grid */}
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(240,237,232,0.3) 1px, transparent 1px),
            linear-gradient(90deg, rgba(240,237,232,0.3) 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px',
        }}
      />

      {/* Mouse-reactive blobs */}
      {blobs.map((b, i) => (
        <div
          key={i}
          ref={(el) => { if (el) blobRefs.current[i] = el; }}
          className="absolute rounded-full will-change-transform"
          style={{
            width: b.w, height: b.w, left: b.left, top: b.top,
            marginLeft: -b.w / 2, marginTop: -b.w / 2,
            background: b.bg, transform: 'translate(0,0)',
          }}
        />
      ))}

      {/* Moving scan line */}
      <div
        className="absolute left-0 right-0 h-px opacity-[0.04]"
        style={{
          background: 'linear-gradient(90deg, transparent, #c4ff36, transparent)',
          animation: 'scanLine 8s ease-in-out infinite',
        }}
      />

      {/* Vignette */}
      <div
        className="absolute inset-0"
        style={{
          background: 'radial-gradient(ellipse 65% 65% at 50% 50%, transparent 30%, rgba(5,5,5,0.6) 100%)',
        }}
      />

      <style>{`
        @keyframes scanLine {
          0%, 100% { top: 10%; }
          50% { top: 80%; }
        }
      `}</style>
    </div>
  );
};
