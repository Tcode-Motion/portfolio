import React, { createContext, useContext, useEffect, useRef, useState } from 'react';

interface MouseContextValue {
  x: number;
  y: number;
  nx: number;
  ny: number;
}

const MouseContext = createContext<MouseContextValue>({ x: 0, y: 0, nx: 0, ny: 0 });

export const useMouse = () => useContext(MouseContext);

export const MouseProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [pos, setPos] = useState({ x: 0, y: 0, nx: 0.5, ny: 0.5 });
  const rafRef = useRef<number>(0);
  const targetRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      targetRef.current.x = e.clientX;
      targetRef.current.y = e.clientY;
    };

    const animate = () => {
      const { x, y } = targetRef.current;
      setPos({
        x,
        y,
        nx: x / window.innerWidth,
        ny: y / window.innerHeight,
      });
      rafRef.current = requestAnimationFrame(animate);
    };

    window.addEventListener('mousemove', onMove, { passive: true });
    rafRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('mousemove', onMove);
      cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <MouseContext.Provider value={pos}>
      {children}
    </MouseContext.Provider>
  );
};
