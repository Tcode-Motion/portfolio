import React, { useState, useEffect, useRef } from 'react';

interface Greeting {
  text: string;
  lang: string;
  fontFamily?: string;
  script?: string;
}

const GREETINGS: Greeting[] = [
  { text: 'hello', lang: 'English' },
  { text: 'hola', lang: 'Spanish' },
  { text: 'bonjour', lang: 'French' },
  { text: 'ciao', lang: 'Italian' },
  { text: 'olá', lang: 'Portuguese' },
  { text: 'hallo', lang: 'German' },
  { text: 'नमस्ते', lang: 'Hindi' },
  { text: 'হ্যালো', lang: 'Bengali' },
  { text: 'こんにちは', lang: 'Japanese' },
  { text: '你好', lang: 'Chinese' },
  { text: '안녕하세요', lang: 'Korean' },
  { text: 'hello world', lang: 'Dev' },
];

export const PreloaderSequence: React.FC<{ onComplete: () => void }> = ({ onComplete }) => {
  const [index, setIndex] = useState(0);
  const [isZooming, setIsZooming] = useState(false);
  const [isExiting, setIsExiting] = useState(false);
  const completedRef = useRef(false);

  useEffect(() => {
    // Rapid MacBook greeting cycling: ~75ms per language
    const interval = setInterval(() => {
      setIndex((prev) => {
        if (prev < GREETINGS.length - 1) {
          return prev + 1;
        }
        clearInterval(interval);
        return prev;
      });
    }, 78);

    // Trigger the iconic Apple zoom effect right after cycling
    const zoomTimer = setTimeout(() => {
      setIsZooming(true);
    }, 950);

    // Fade out overlay curtain
    const exitTimer = setTimeout(() => {
      setIsExiting(true);
    }, 1150);

    // Complete transition and unmount
    const finishTimer = setTimeout(() => {
      if (!completedRef.current) {
        completedRef.current = true;
        onComplete();
      }
    }, 1350);

    return () => {
      clearInterval(interval);
      clearTimeout(zoomTimer);
      clearTimeout(exitTimer);
      clearTimeout(finishTimer);
    };
  }, [onComplete]);

  // Click-to-skip immediately triggers the zoom out
  const handleQuickSkip = () => {
    if (!completedRef.current) {
      completedRef.current = true;
      setIsZooming(true);
      setIsExiting(true);
      setTimeout(onComplete, 250);
    }
  };

  const current = GREETINGS[index];
  const isLast = index === GREETINGS.length - 1;

  return (
    <div
      onClick={handleQuickSkip}
      className="fixed inset-0 z-[9999] flex items-center justify-center cursor-pointer select-none overflow-hidden"
      style={{
        backgroundColor: '#07090e',
        opacity: isExiting ? 0 : 1,
        pointerEvents: isExiting ? 'none' : 'auto',
        transition: 'opacity 0.35s cubic-bezier(0.16, 1, 0.3, 1)',
      }}
      aria-label="Opening introduction animation"
      role="dialog"
    >
      {/* Subtle Ambient Apple Specular Glow */}
      <div
        className="absolute w-[500px] h-[500px] rounded-full pointer-events-none opacity-20"
        style={{
          background: 'radial-gradient(circle, rgba(196, 255, 54, 0.25) 0%, rgba(6, 182, 212, 0.1) 40%, transparent 70%)',
          filter: 'blur(40px)',
          transform: isZooming ? 'scale(3)' : 'scale(1)',
          transition: 'transform 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
        }}
      />

      {/* Center Multilingual Greeting Text */}
      <div
        className="relative z-10 text-center px-6 will-change-transform"
        style={{
          transform: isZooming ? 'scale(18)' : 'scale(1)',
          opacity: isZooming ? 0 : 1,
          filter: isZooming ? 'blur(10px)' : 'blur(0px)',
          transition: isZooming
            ? 'transform 0.42s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.32s ease-in, filter 0.35s ease-in'
            : 'transform 0.08s ease-out',
        }}
      >
        <span
          className="font-display font-bold tracking-tight inline-block text-white"
          style={{
            fontSize: 'clamp(2.5rem, 8vw, 6rem)',
            lineHeight: 1.05,
            letterSpacing: isLast ? '-0.04em' : '-0.02em',
            textShadow: '0 0 40px rgba(255, 255, 255, 0.2)',
          }}
        >
          {current.text}
          {isLast && (
            <span className="text-[#c4ff36] ml-1">.</span>
          )}
        </span>

        {/* Small subtle language indicator below */}
        <div
          className="mt-3 text-[11px] font-code text-[#64748b] tracking-widest uppercase transition-opacity duration-150"
          style={{ opacity: isZooming ? 0 : 0.6 }}
        >
          {current.lang}
        </div>
      </div>

      {/* Progress pill indicator at bottom */}
      <div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-1 transition-opacity duration-200"
        style={{ opacity: isZooming ? 0 : 0.5 }}
      >
        {GREETINGS.map((_, i) => (
          <div
            key={i}
            className="h-1 rounded-full transition-all duration-150"
            style={{
              width: i === index ? 16 : 4,
              backgroundColor: i === index ? '#c4ff36' : 'rgba(255, 255, 255, 0.2)',
            }}
          />
        ))}
      </div>
    </div>
  );
};
