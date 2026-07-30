import { useState, useEffect } from 'react';

export interface MotionCapabilities {
  prefersReducedMotion: boolean;
  isLowPowerDevice: boolean;
  allowComplexAnimations: boolean;
  allowWebGL: boolean;
}

export const useMotionCapabilities = (): MotionCapabilities => {
  const [capabilities, setCapabilities] = useState<MotionCapabilities>({
    prefersReducedMotion: false,
    isLowPowerDevice: false,
    allowComplexAnimations: true,
    allowWebGL: true,
  });

  useEffect(() => {
    // 1. Detect prefers-reduced-motion
    const reducedMotionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const prefersReducedMotion = reducedMotionQuery.matches;

    // 2. Hardware concurrency check
    const hardwareConcurrency = navigator.hardwareConcurrency || 4;
    const deviceMemory = (navigator as unknown as { deviceMemory?: number }).deviceMemory || 8;
    const isLowPowerDevice = hardwareConcurrency <= 2 || deviceMemory <= 4;

    // 3. WebGL support check
    let allowWebGL = true;
    try {
      const canvas = document.createElement('canvas');
      allowWebGL = !!(window.WebGLRenderingContext && (canvas.getContext('webgl') || canvas.getContext('experimental-webgl')));
    } catch {
      allowWebGL = false;
    }

    const allowComplexAnimations = !prefersReducedMotion && !isLowPowerDevice;

    setCapabilities({
      prefersReducedMotion,
      isLowPowerDevice,
      allowComplexAnimations,
      allowWebGL,
    });

    const handleQueryChange = (e: MediaQueryListEvent) => {
      setCapabilities((prev) => ({
        ...prev,
        prefersReducedMotion: e.matches,
        allowComplexAnimations: !e.matches && !prev.isLowPowerDevice,
      }));
    };

    reducedMotionQuery.addEventListener('change', handleQueryChange);
    return () => reducedMotionQuery.removeEventListener('change', handleQueryChange);
  }, []);

  return capabilities;
};
