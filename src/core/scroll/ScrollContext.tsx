import React, { createContext, useContext, useEffect, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';

gsap.registerPlugin(ScrollTrigger);

interface ScrollContextValue {
  gsap: typeof gsap;
  ScrollTrigger: typeof ScrollTrigger;
  lenis: Lenis | null;
}

const ScrollContext = createContext<ScrollContextValue>({ gsap, ScrollTrigger, lenis: null });

export const useScrollContext = () => useContext(ScrollContext);

export const ScrollProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [lenis, setLenis] = useState<Lenis | null>(null);

  useEffect(() => {
    const lenisInstance = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      touchMultiplier: 2,
      infinite: false,
    });

    setLenis(lenisInstance);

    ScrollTrigger.defaults({
      toggleActions: 'play none none reverse',
    });

    lenisInstance.on('scroll', ScrollTrigger.update);

    const raf = (time: number) => {
      lenisInstance.raf(time * 1000);
    };
    gsap.ticker.add(raf);
    gsap.ticker.lagSmoothing(0);

    return () => {
      lenisInstance.destroy();
      gsap.ticker.remove(raf);
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, []);

  return (
    <ScrollContext.Provider value={{ gsap, ScrollTrigger, lenis }}>
      {children}
    </ScrollContext.Provider>
  );
};
