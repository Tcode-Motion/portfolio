import React, { useState, useEffect, useRef, useMemo } from 'react';
import { useMouse } from '@/core/cursor/MouseProvider';

interface LangEntry {
  text: string;
  italic?: true;
  highlighted?: true;
  slow?: true;
}

const LANGUAGES: LangEntry[] = [
  { text: "HELLO WORLD", slow: true },
  { text: "Hola Mundo" },
  { text: "Ciao Mondo" },
  { text: "Hallo Welt", italic: true },
  { text: "Bonjour le Monde", italic: true },
  { text: "你好世界", italic: true },
  { text: "こんにちは世界" },
  { text: "안녕하세요 세계" },
  { text: "नमस्ते दुनिया", slow: true, highlighted: true },
  { text: "Привет мир" },
  { text: "Olá Mundo" },
  { text: "Γειά σου Κόσμε", italic: true },
  { text: "Selam Dünya", italic: true },
  { text: "नमस्कार जग", slow: true, highlighted: true },
  { text: "হ্যালো বিশ্ব", slow: true, highlighted: true },
  { text: "Hei Verden" },
  { text: "Hej Världen" },
  { text: "Ahoj světe" },
  { text: "Helló Világ" },
  { text: "Салом Дунё" },
  { text: "Sveiki Pasaule" },
  { text: "Bok Svijete" },
  { text: "Përshëndetje Botë" },
  { text: "שלום עולם", italic: true },
  { text: "سلام دنیا", italic: true },
  { text: "salut le monde" },
];

const PER_CHAR_MS = 68;
const FAST_MS = 15;
const ITALIC_MS = 25;
const SLOW_MS = 55;
const LAST_SHOW_MS = 400;

export const PreloaderSequence: React.FC<{ onComplete: () => void }> = ({ onComplete }) => {
  const [entryIndex, setEntryIndex] = useState(0);
  const [typedChars, setTypedChars] = useState(0);
  const [phase, setPhase] = useState<'morphing' | 'reveal' | 'exit'>('morphing');
  const [exitProgress, setExitProgress] = useState(0);
  const { nx, ny } = useMouse();
  const hasCompleted = useRef(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const entryDurations = useMemo(() =>
    LANGUAGES.map((e, i) => {
      if (i === 0) return e.text.length * PER_CHAR_MS;
      if (e.slow) return SLOW_MS;
      if (e.italic) return ITALIC_MS;
      return FAST_MS;
    }), []);

  useEffect(() => {
    if (phase !== 'morphing') return;
    if (entryIndex >= LANGUAGES.length) {
      const t = setTimeout(() => setPhase('reveal'), LAST_SHOW_MS);
      return () => clearTimeout(t);
    }
    const entry = LANGUAGES[entryIndex];
    const dur = entryDurations[entryIndex];
    let start = performance.now();
    const tick = (now: number) => {
      const elapsed = now - start;
      if (entryIndex === 0) {
        const total = entry.text.length;
        const show = Math.min(Math.floor((elapsed / dur) * total), total);
        setTypedChars(show);
        if (show >= total) {
          setEntryIndex((p) => p + 1);
          setTypedChars(0);
          return;
        }
      } else {
        if (elapsed >= dur) {
          setEntryIndex((p) => p + 1);
          return;
        }
      }
      timerRef.current = setTimeout(() => tick(performance.now()), 16);
    };
    timerRef.current = setTimeout(() => tick(performance.now()), 16);
    return () => { if (timerRef.current) clearTimeout(timerRef.current); };
  }, [phase, entryIndex, entryDurations]);

  useEffect(() => {
    if (phase !== 'reveal') return;
    let frame = 0;
    const animate = () => {
      frame++;
      setExitProgress(Math.min(frame / 30, 1));
      if (frame < 30) requestAnimationFrame(animate);
      else setPhase('exit');
    };
    requestAnimationFrame(animate);
  }, [phase]);

  useEffect(() => {
    if (phase !== 'exit' || hasCompleted.current) return;
    hasCompleted.current = true;
    const t = setTimeout(() => onComplete(), 350);
    return () => clearTimeout(t);
  }, [phase, onComplete]);

  const currentEntry = entryIndex < LANGUAGES.length ? LANGUAGES[entryIndex] : null;
  const showLast = entryIndex >= LANGUAGES.length;
  const isFirst = entryIndex === 0;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center"
      style={{
        background: '#050505',
        opacity: phase === 'exit' ? 0 : 1,
        transition: 'opacity 0.35s cubic-bezier(0.16, 1, 0.3, 1)',
      }}
    >
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            'linear-gradient(rgba(240,237,232,0.12) 1px, transparent 1px), linear-gradient(90deg, rgba(240,237,232,0.12) 1px, transparent 1px)',
          backgroundSize: '60px 60px',
        }}
      />

      <div
        className="absolute w-[600px] h-[600px] rounded-full pointer-events-none opacity-20"
        style={{
          background: 'radial-gradient(circle, rgba(196,255,54,0.08) 0%, transparent 70%)',
          transform: `translate(${nx * 30 - 15}%, ${ny * 30 - 15}%)`,
          left: '50%', top: '50%',
          marginLeft: '-300px', marginTop: '300px',
        }}
      />

      <div
        className="absolute top-1/2 left-0 h-px bg-[var(--accent-lime)]"
        style={{
          width: `${exitProgress * 100}%`,
          opacity: exitProgress > 0 ? 1 : 0,
          boxShadow: '0 0 20px rgba(196,255,54,0.4)',
        }}
      />

      <div className="relative z-10 text-center">
        <div
          className="flex items-center justify-center"
          style={{
            fontFamily: showLast ? "'SF Pro Display', -apple-system, BlinkMacSystemFont, 'Helvetica Neue', sans-serif" : undefined,
            fontSize: showLast ? 'clamp(2.2rem, 7vw, 5rem)' : 'clamp(2rem, 6vw, 4.5rem)',
            lineHeight: 1.05,
            fontWeight: showLast ? 600 : currentEntry?.highlighted ? 500 : 400,
            fontStyle: showLast ? 'italic' : currentEntry?.italic ? 'italic' : 'normal',
            color: currentEntry?.highlighted ? '#c4ff36' : undefined,
            letterSpacing: showLast ? '-0.02em' : undefined,
          }}
        >
          {showLast ? (
            <span className="inline-block">
              {'hello world'.split('').map((ch, i) => (
                <span
                  key={i}
                  className="inline-block"
                  style={{
                    opacity: 0,
                    animation: `apple-in 0.35s cubic-bezier(0.16, 1, 0.3, 1) ${i * 30 + 50}ms forwards`,
                    transform: 'translateY(6px) scale(0.95)',
                    filter: 'blur(2px)',
                  }}
                >
                  {ch === ' ' ? '\u00A0' : ch}
                </span>
              ))}
            </span>
          ) : (
            (isFirst ? currentEntry!.text.slice(0, typedChars) : (currentEntry?.text ?? '')).split('').map((ch, i) => (
              <span key={i} className="inline-block">
                {ch === ' ' ? '\u00A0' : ch}
              </span>
            ))
          )}
        </div>

        {!showLast && currentEntry && (
          <div className="section-label mt-4" style={{ opacity: 0.25 }}>
            {entryIndex + 1}/{LANGUAGES.length}
          </div>
        )}
      </div>

      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex gap-1.5">
        {LANGUAGES.map((_, i) => (
          <div
            key={i}
            className="rounded-full transition-all duration-200"
            style={{
              width: i < entryIndex ? 5 : 2.5,
              height: i < entryIndex ? 5 : 2.5,
              background: i < entryIndex ? 'var(--accent-lime)' : 'var(--text-3)',
              opacity: i < entryIndex ? 1 : 0.3,
            }}
          />
        ))}
      </div>

      <style>{`
        @keyframes apple-in {
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
            filter: blur(0);
          }
        }
      `}</style>
    </div>
  );
};
