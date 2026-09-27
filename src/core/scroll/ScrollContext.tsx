import React, { createContext, useContext, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// Lightweight native scroll shim for modal lock compatibility with 0ms latency
export interface ScrollControllerShim {
  stop: () => void;
  start: () => void;
  destroy: () => void;
  raf: (time: number) => void;
  on: (event: string, callback: (...args: unknown[]) => void) => void;
  off: (event: string, callback: (...args: unknown[]) => void) => void;
}

const nativeController: ScrollControllerShim = {
  stop: () => {
    document.documentElement.style.overflow = 'hidden';
    document.body.style.overflow = 'hidden';
  },
  start: () => {
    document.documentElement.style.overflow = '';
    document.body.style.overflow = '';
  },
  destroy: () => {},
  raf: () => {},
  on: () => {},
  off: () => {},
};

interface ScrollContextValue {
  gsap: typeof gsap;
  ScrollTrigger: typeof ScrollTrigger;
  lenis: ScrollControllerShim | null;
}

const ScrollContext = createContext<ScrollContextValue>({
  gsap,
  ScrollTrigger,
  lenis: nativeController,
});

export const useScrollContext = () => useContext(ScrollContext);

export const ScrollProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  useEffect(() => {
    // Configure GSAP ScrollTrigger for native high-frequency passive scroll
    ScrollTrigger.defaults({
      toggleActions: 'play none none reverse',
    });

    const handleNativeScroll = () => {
      ScrollTrigger.update();
    };

    window.addEventListener('scroll', handleNativeScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleNativeScroll);
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  return (
    <ScrollContext.Provider value={{ gsap, ScrollTrigger, lenis: nativeController }}>
      {children}
    </ScrollContext.Provider>
  );
};
