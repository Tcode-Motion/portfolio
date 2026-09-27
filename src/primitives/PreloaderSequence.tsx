import React, { useState, useEffect, useRef } from 'react';

// Curated authentic macOS first-boot multilingual greetings
const GREETINGS = [
  'Hello',         // English
  'Bonjour',       // French
  'Hola',          // Spanish
  'Ciao',          // Italian
  'Hallo',         // German
  'こんにちは',    // Japanese
  '你好',          // Chinese
  '안녕하세요',    // Korean
  'नमस्ते',        // Hindi
  'হ্যালো',         // Bengali (Tanmoy's native language)
  'Olá',           // Portuguese
  'Hello',         // Final English reveal greeting
];

export const PreloaderSequence: React.FC<{ onComplete: () => void }> = ({ onComplete }) => {
  const [index, setIndex] = useState(0);
  const [isZoomingOut, setIsZoomingOut] = useState(false);
  const [isDone, setIsDone] = useState(false);
  const hasFinishedRef = useRef(false);

  useEffect(() => {
    // 1. Accessibility: Instant fade if user prefers reduced motion
    if (typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      const quickTimer = setTimeout(() => {
        if (!hasFinishedRef.current) {
          hasFinishedRef.current = true;
          setIsDone(true);
          onComplete();
        }
      }, 150);
      return () => clearTimeout(quickTimer);
    }

    // 2. Multilingual cadence: 110ms per greeting so each language is clearly visible
    const intervalMs = 110;
    let currentStep = 0;
    const maxSteps = GREETINGS.length - 1;

    const intervalId = setInterval(() => {
      currentStep++;
      if (currentStep <= maxSteps) {
        setIndex(currentStep);
      } else {
        clearInterval(intervalId);
      }
    }, intervalMs);

    // 3. At ~1.3s: Trigger the dramatic full zoom-out + fade exit
    const zoomOutTimer = setTimeout(() => {
      setIsZoomingOut(true);
    }, (maxSteps * intervalMs) + 90);

    // 4. At ~1.7s: Complete the animation and reveal the portfolio underneath
    const completeTimer = setTimeout(() => {
      if (!hasFinishedRef.current) {
        hasFinishedRef.current = true;
        setIsDone(true);
        onComplete();
      }
    }, (maxSteps * intervalMs) + 480);

    return () => {
      clearInterval(intervalId);
      clearTimeout(zoomOutTimer);
      clearTimeout(completeTimer);
    };
  }, [onComplete]);

  if (isDone) {
    return null;
  }

  const currentWord = GREETINGS[index];

  return (
    <div
      aria-label="Welcome greeting"
      aria-live="polite"
      className="fixed inset-0 z-[99999] flex items-center justify-center select-none overflow-hidden"
      style={{
        backgroundColor: '#07090e',
        opacity: isZoomingOut ? 0 : 1,
        pointerEvents: isZoomingOut ? 'none' : 'auto',
        transition: 'opacity 0.38s cubic-bezier(0.16, 1, 0.3, 1)',
        willChange: 'opacity',
      }}
    >
      {/* Centered Multilingual Text with Apple-like zoom-out exit */}
      <div
        className="w-full max-w-full px-6 flex items-center justify-center text-center will-change-transform"
        style={{
          transform: isZoomingOut ? 'scale(0.12)' : 'scale(1)',
          opacity: isZoomingOut ? 0 : 1,
          filter: isZoomingOut ? 'blur(8px)' : 'none',
          transition: isZoomingOut
            ? 'transform 0.38s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.32s ease-out, filter 0.32s ease-out'
            : 'none',
        }}
      >
        <span
          className="font-display font-bold tracking-tight text-white inline-block text-center leading-none select-none"
          style={{
            fontSize: 'clamp(3.8rem, 15vw, 11rem)',
            letterSpacing: '-0.04em',
            textRendering: 'optimizeLegibility',
            WebkitFontSmoothing: 'antialiased',
          }}
        >
          {currentWord}
        </span>
      </div>
    </div>
  );
};
