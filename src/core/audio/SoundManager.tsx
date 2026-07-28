import React, { createContext, useContext, useRef, useCallback, useEffect, useState } from 'react';

interface SoundContextValue {
  playHover: () => void;
  playClick: () => void;
  playScroll: () => void;
  playTransition: () => void;
  playType: () => void;
  playAmbient: () => void;
  stopAmbient: () => void;
  isMuted: boolean;
  toggleMute: () => void;
  soundEnabled: boolean;
}

const SoundContext = createContext<SoundContextValue>({
  playHover: () => {},
  playClick: () => {},
  playScroll: () => {},
  playTransition: () => {},
  playType: () => {},
  playAmbient: () => {},
  stopAmbient: () => {},
  isMuted: true,
  toggleMute: () => {},
  soundEnabled: false,
});

export const useSound = () => useContext(SoundContext);
export const useSoundManager = useSound;

const createOscillatorSound = (
  ctx: AudioContext,
  type: OscillatorType,
  freqStart: number,
  freqEnd: number,
  duration: number,
  volume: number = 0.08
) => {
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();
  osc.type = type;
  osc.frequency.setValueAtTime(freqStart, ctx.currentTime);
  osc.frequency.exponentialRampToValueAtTime(freqEnd, ctx.currentTime + duration);
  gain.gain.setValueAtTime(volume, ctx.currentTime);
  gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration);
  osc.connect(gain);
  gain.connect(ctx.destination);
  osc.start(ctx.currentTime);
  osc.stop(ctx.currentTime + duration);
};

export const SoundProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const audioCtxRef = useRef<AudioContext | null>(null);
  const ambientOscRef = useRef<OscillatorNode | null>(null);
  const ambientGainRef = useRef<GainNode | null>(null);
  const [isMuted, setIsMuted] = useState(true);
  const [soundEnabled, setSoundEnabled] = useState(false);

  const getCtx = useCallback(() => {
    if (!audioCtxRef.current) {
      audioCtxRef.current = new AudioContext();
    }
    if (audioCtxRef.current.state === 'suspended') {
      audioCtxRef.current.resume();
    }
    return audioCtxRef.current;
  }, []);

  const playHover = useCallback(() => {
    if (isMuted) return;
    try {
      const ctx = getCtx();
      createOscillatorSound(ctx, 'sine', 1200, 800, 0.05, 0.03);
    } catch {}
  }, [isMuted, getCtx]);

  const playClick = useCallback(() => {
    if (isMuted) return;
    try {
      const ctx = getCtx();
      createOscillatorSound(ctx, 'triangle', 1400, 700, 0.07, 0.05);
      createOscillatorSound(ctx, 'sine', 2100, 1400, 0.03, 0.02);
    } catch {}
  }, [isMuted, getCtx]);

  const playScroll = useCallback(() => {
    if (isMuted) return;
    try {
      const ctx = getCtx();
      createOscillatorSound(ctx, 'sine', 200, 150, 0.04, 0.015);
    } catch {}
  }, [isMuted, getCtx]);

  const playTransition = useCallback(() => {
    if (isMuted) return;
    try {
      const ctx = getCtx();
      createOscillatorSound(ctx, 'sine', 440, 880, 0.12, 0.025);
      createOscillatorSound(ctx, 'triangle', 660, 330, 0.08, 0.015);
    } catch {}
  }, [isMuted, getCtx]);

  const playType = useCallback(() => {
    if (isMuted) return;
    try {
      const ctx = getCtx();
      createOscillatorSound(ctx, 'square', 1800, 1200, 0.015, 0.01);
    } catch {}
  }, [isMuted, getCtx]);

  const playAmbient = useCallback(() => {
    if (isMuted) return;
    try {
      const ctx = getCtx();
      if (ambientOscRef.current) return;

      const osc1 = ctx.createOscillator();
      const osc2 = ctx.createOscillator();
      const gain = ctx.createGain();
      const filter = ctx.createBiquadFilter();

      osc1.type = 'sine';
      osc1.frequency.value = 110;
      osc2.type = 'sine';
      osc2.frequency.value = 165;

      filter.type = 'lowpass';
      filter.frequency.value = 200;

      gain.gain.value = 0;
      gain.gain.linearRampToValueAtTime(0.015, ctx.currentTime + 3);

      osc1.connect(filter);
      osc2.connect(filter);
      filter.connect(gain);
      gain.connect(ctx.destination);

      osc1.start();
      osc2.start();

      ambientOscRef.current = osc1;
      ambientGainRef.current = gain;
    } catch {}
  }, [isMuted, getCtx]);

  const stopAmbient = useCallback(() => {
    try {
      if (ambientOscRef.current && audioCtxRef.current) {
        const gain = ambientGainRef.current;
        if (gain) {
          gain.gain.linearRampToValueAtTime(0.001, audioCtxRef.current.currentTime + 1);
        }
        setTimeout(() => {
          try {
            ambientOscRef.current?.stop();
          } catch {}
          ambientOscRef.current = null;
          ambientGainRef.current = null;
        }, 1200);
      }
    } catch {}
  }, []);

  const toggleMute = useCallback(() => {
    setIsMuted(prev => {
      const next = !prev;
      if (next) {
        stopAmbient();
      } else {
        setSoundEnabled(true);
      }
      return next;
    });
  }, [stopAmbient]);

  useEffect(() => {
    if (soundEnabled && !isMuted) {
      playAmbient();
    }
  }, [soundEnabled, isMuted, playAmbient]);

  return (
    <SoundContext.Provider value={{ playHover, playClick, playScroll, playTransition, playType, playAmbient, stopAmbient, isMuted, toggleMute, soundEnabled }}>
      {children}
    </SoundContext.Provider>
  );
};
