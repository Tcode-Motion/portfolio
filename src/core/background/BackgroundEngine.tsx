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

    const particles = Array.from({ length: 240 }, () => ({
      x: Math.random() * w,
      y: Math.random() * h,
      vx: (Math.random() - 0.5) * 0.12,
      vy: (Math.random() - 0.5) * 0.08,
      size: Math.random() * 1.8 + 0.4,
      baseOpacity: Math.random() * 0.5 + 0.2,
      twinkleSpeed: Math.random() * 0.04 + 0.01,
      phase: Math.random() * Math.PI * 2,
      colorType: Math.floor(Math.random() * 10), // 0-6 White, 7 Lime, 8 Cyan, 9 Violet
    }));

    const tick = () => {
      time += 0.016;
      const mx = mouseRef.current.x;
      const my = mouseRef.current.y;
      const sy = scrollRef.current;

      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.fillStyle = '#04060a';
      ctx.fillRect(0, 0, w, h);

      // Render Twinkling Space Stars
      for (let pi = 0; pi < particles.length; pi++) {
        const p = particles[pi];

        // Parallax drift with cursor and scroll
        const ddx = mx * w - p.x;
        const ddy = (my * h + sy * h * 0.4) - p.y;
        const dist = Math.sqrt(ddx * ddx + ddy * ddy);
        if (dist < 300 && dist > 1) {
          const f = (300 - dist) / 300 * 0.004;
          p.vx += (ddx / dist) * f;
          p.vy += (ddy / dist) * f;
        }

        p.x += p.vx;
        p.y += p.vy;
        p.vx *= 0.99;
        p.vy *= 0.99;

        if (p.x < -20) p.x = w + 20;
        if (p.x > w + 20) p.x = -20;
        if (p.y < -20) p.y = h + 20;
        if (p.y > h + 20) p.y = -20;

        // Twinkle Alpha Modulation
        const a = Math.max(0.08, Math.min(0.95, p.baseOpacity * (0.6 + 0.4 * Math.sin(time * p.twinkleSpeed * 10 + p.phase))));

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);

        if (p.colorType === 7) {
          ctx.fillStyle = `rgba(196, 255, 54, ${a})`;
        } else if (p.colorType === 8) {
          ctx.fillStyle = `rgba(34, 211, 238, ${a})`;
        } else if (p.colorType === 9) {
          ctx.fillStyle = `rgba(168, 85, 247, ${a})`;
        } else {
          ctx.fillStyle = `rgba(255, 255, 255, ${a})`;
        }
        ctx.fill();

        // Cross-flare glow for prominent stars
        if (p.size > 1.7 && a > 0.4) {
          ctx.beginPath();
          ctx.moveTo(p.x - p.size * 2.5, p.y);
          ctx.lineTo(p.x + p.size * 2.5, p.y);
          ctx.moveTo(p.x, p.y - p.size * 2.5);
          ctx.lineTo(p.x, p.y + p.size * 2.5);
          ctx.strokeStyle = `rgba(255, 255, 255, ${a * 0.3})`;
          ctx.lineWidth = 0.5;
          ctx.stroke();
        }
      }

      // Constellation webs between nearby star clusters
      for (let i = 0; i < particles.length; i += 2) {
        for (let j = i + 1; j < particles.length; j += 2) {
          const ddx = particles[i].x - particles[j].x;
          const ddy = particles[i].y - particles[j].y;
          const d2 = ddx * ddx + ddy * ddy;
          if (d2 < 9000) {
            const d = Math.sqrt(d2);
            const a = (1 - d / 95) * 0.04;
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(196, 255, 54, ${a})`;
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
    { w: 600, left: '15%', top: '25%', bg: 'radial-gradient(circle,rgba(196,255,54,0.06) 0%,transparent 70%)' },
    { w: 700, left: '80%', top: '30%', bg: 'radial-gradient(circle,rgba(6,182,212,0.05) 0%,transparent 70%)' },
    { w: 500, left: '50%', top: '65%', bg: 'radial-gradient(circle,rgba(168,85,247,0.04) 0%,transparent 70%)' },
    { w: 550, left: '10%', top: '80%', bg: 'radial-gradient(circle,rgba(6,182,212,0.03) 0%,transparent 70%)' },
  ], []);

  return (
    <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
      {/* Canvas space particles */}
      <canvas ref={canvasRef} className="absolute inset-0" />

      {/* Animated subtle grid */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(240,237,232,0.2) 1px, transparent 1px),
            linear-gradient(90deg, rgba(240,237,232,0.2) 1px, transparent 1px)
          `,
          backgroundSize: '60px 60px',
        }}
      />

      {/* Mouse-reactive nebulae blobs */}
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

      {/* Vignette */}
      <div
        className="absolute inset-0"
        style={{
          background: 'radial-gradient(ellipse 70% 70% at 50% 50%, transparent 40%, rgba(4,6,10,0.7) 100%)',
        }}
      />
    </div>
  );
};
