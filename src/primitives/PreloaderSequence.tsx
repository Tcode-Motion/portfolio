import React, { useState, useEffect, useRef } from 'react';

// Authentic macOS first-boot multilingual system greetings
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
  'Привет',        // Russian
  'مرحبا',         // Arabic
  'Hello',         // Final English reveal greeting
];

interface PreloaderSequenceProps {
  onComplete: () => void;
}

export const PreloaderSequence: React.FC<PreloaderSequenceProps> = ({ onComplete }) => {
  const [index, setIndex] = useState(0);
  const [isZooming, setIsZooming] = useState(false);
  const [isDone, setIsDone] = useState(false);
  const onCompleteRef = useRef(onComplete);
  onCompleteRef.current = onComplete;

  // Render-driven sequential transition: guarantees EVERY language is committed to the DOM
  // and visible for at least 115ms before advancing, completely immune to frame drops or batching.
  useEffect(() => {
    const isFinalWord = index === GREETINGS.length - 1;

    if (!isFinalWord) {
      // Step to next greeting after guaranteed display time (115ms)
      const timer = setTimeout(() => {
        setIndex((prev) => prev + 1);
      }, 115);
      return () => clearTimeout(timer);
    } else {
      // Reached final "Hello": hold for 220ms, then trigger cinematic zoom-in burst
      const holdTimer = setTimeout(() => {
        setIsZooming(true);

        // Allow 580ms for the text to expand massively, cover the entire screen, and dissolve
        const exitTimer = setTimeout(() => {
          setIsDone(true);
          onCompleteRef.current?.();
        }, 580);

        return () => clearTimeout(exitTimer);
      }, 220);

      return () => clearTimeout(holdTimer);
    }
  }, [index]);

  if (isDone) {
    return null;
  }

  const currentWord = GREETINGS[index];

  return (
    <div
      aria-label="Welcome greeting"
      aria-live="polite"
      className="fixed inset-0 z-[99999] flex items-center justify-center select-none overflow-hidden pointer-events-none"
      style={{
        backgroundColor: '#07090e',
        opacity: isZooming ? 0 : 1,
        transition: 'opacity 0.58s cubic-bezier(0.2, 0, 0, 1)',
        willChange: 'opacity',
      }}
    >
      {/* Centered Multilingual Text with Apple first-boot cinematic zoom-in reveal */}
      <div
        className="w-full max-w-full px-6 flex items-center justify-center text-center will-change-transform pointer-events-none"
        style={{
          transform: isZooming ? 'scale(16)' : 'scale(1)',
          transformOrigin: 'center center',
          opacity: isZooming ? 0 : 1,
          filter: isZooming ? 'blur(8px)' : 'none',
          transition: isZooming
            ? 'transform 0.58s cubic-bezier(0.2, 0, 0, 1), opacity 0.5s cubic-bezier(0.4, 0, 1, 1), filter 0.52s ease-out'
            : 'none',
        }}
      >
        <span
          className="font-display font-bold tracking-tight text-white inline-block text-center leading-none select-none whitespace-nowrap"
          style={{
            fontSize: 'clamp(4rem, 17vw, 12.5rem)',
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
