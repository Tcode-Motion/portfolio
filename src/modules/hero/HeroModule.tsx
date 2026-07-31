import React, { useRef, useState } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { Github, Instagram, Youtube, Twitter, Sparkles } from 'lucide-react';
import { useSound } from '@/core/audio/SoundManager';
import { useGithubStats } from '@/hooks/useGithubStats';
import { FadeIn } from '@/primitives/FadeIn';

export const HeroModule: React.FC = () => {
  const gh = useGithubStats();
  const sectionRef = useRef<HTMLDivElement>(null);
  const { playClick, playHover } = useSound();
  const [isSocialHovered, setIsSocialHovered] = useState(false);

  const { scrollY } = useScroll();
  const opacity = useTransform(scrollY, [0, 450], [1, 0]);
  const scale = useTransform(scrollY, [0, 450], [1, 0.95]);

  const stats = [
    { value: `${gh.repoCount || '30'}+`, label: 'Projects' },
    { value: '5+', label: 'Years Experience' },
    { value: `${gh.totalStars > 0 ? (gh.totalStars / 1000).toFixed(1) + 'K+' : '3.2K+'}`, label: 'GitHub Stars' },
    { value: '100%', label: 'Open Source' },
  ];

  const bottomBadges = [
    { icon: '</>', label: 'Creator of TechScript' },
    { icon: '⚙', label: 'Rust Compiler' },
    { icon: '⚡', label: 'Flutter Apps' },
    { icon: '✨', label: 'AI Systems' },
    { icon: '♡', label: 'Open Source' },
  ];

  const socialLinks = [
    { icon: Github, href: 'https://github.com/Tcode-Motion', label: 'GitHub', color: '#c4ff36' },
    { icon: Instagram, href: 'https://www.instagram.com/tcodemotion/', label: 'Instagram', color: '#e1306c' },
    { icon: Youtube, href: 'https://www.youtube.com/@tcodemotin', label: 'YouTube', color: '#ff0000' },
    { icon: Twitter, href: 'https://x.com/TanmoyMaju40558', label: 'Twitter / X', color: '#38bdf8' },
  ];

  return (
    <section
      ref={sectionRef}
      id="home"
      className="relative min-h-screen flex flex-col justify-between overflow-hidden pt-24 pb-10 bg-transparent"
    >
      {/* ─── Left Radial Contrast Mask ─── */}
      <div className="absolute inset-y-0 left-0 w-full lg:w-[55%] bg-gradient-to-r from-[#050505] via-[#050505]/90 to-transparent pointer-events-none z-[1]" />

      {/* ─── Main Hero Content Grid ─── */}
      <motion.div
        className="relative z-10 w-full max-w-[1400px] mx-auto px-6 sm:px-8 md:px-12 lg:px-20 my-auto"
        style={{ opacity, scale }}
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left Column Content (7 cols) */}
          <div className="lg:col-span-7">
            {/* Top Label */}
            <FadeIn delay={0.2}>
              <div className="flex items-center gap-2 mb-6">
                <span className="h-1.5 w-1.5 rounded-full bg-[#c4ff36]" />
                <span className="font-code text-xs tracking-widest text-[#a1a1aa] uppercase">
                  Coder · AI App Builder · Open Source
                </span>
              </div>
            </FadeIn>

            {/* Name Typography */}
            <FadeIn delay={0.3}>
              <h1
                className="font-display tracking-tight leading-[0.95] mb-6"
                style={{ fontSize: 'clamp(2.5rem, 8.5vw, 8rem)' }}
              >
                <span className="text-white block">Tanmoy</span>
                <span className="text-[#c4ff36] block">Majumder</span>
              </h1>
            </FadeIn>

            {/* Subtitle Tagline */}
            <FadeIn delay={0.4}>
              <p className="font-body text-[#a1a1aa] text-base sm:text-lg max-w-xl mb-8 leading-relaxed">
                Building intelligent software, developer tools, and AI-powered experiences that blend performance with beautiful design.
              </p>
            </FadeIn>

            {/* Action Buttons */}
            <FadeIn delay={0.5}>
              <div className="flex items-center gap-4 mb-12">
                <a
                  href="#work"
                  className="px-7 py-3.5 bg-[#c4ff36] text-[#050505] font-semibold text-sm rounded-full flex items-center gap-2 hover:shadow-[0_0_30px_rgba(196,255,54,0.35)] transition-all duration-300 magnetic-btn"
                  onClick={() => playClick()}
                  onMouseEnter={() => playHover()}
                >
                  View My Work <span className="text-base font-bold">↗</span>
                </a>
                <a
                  href="#contact"
                  className="px-7 py-3.5 border border-[#27272a] text-white font-medium text-sm rounded-full flex items-center gap-2 hover:border-[#c4ff36] hover:text-[#c4ff36] transition-all duration-300 magnetic-btn"
                  onClick={() => playClick()}
                  onMouseEnter={() => playHover()}
                >
                  Get In Touch <span className="text-base font-bold">↗</span>
                </a>
              </div>
            </FadeIn>

            {/* Stat Counters Row */}
            <FadeIn delay={0.6}>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 pt-4 border-t border-[#18181b]/80 max-w-2xl">
                {stats.map((st, i) => (
                  <div key={i}>
                    <div className="font-display text-2xl sm:text-3xl text-white font-bold tracking-tight mb-1">
                      {st.value}
                    </div>
                    <div className="font-code text-xs text-[#71717a]">{st.label}</div>
                  </div>
                ))}
              </div>
            </FadeIn>
          </div>
        </div>
      </motion.div>

      {/* ─── Right Floating Glass Social Navigation Bar ─── */}
      <div
        className="fixed right-6 top-1/2 -translate-y-1/2 hidden md:flex flex-col items-center z-40"
        onMouseEnter={() => setIsSocialHovered(true)}
        onMouseLeave={() => setIsSocialHovered(false)}
      >
        <AnimatePresence mode="wait">
          {isSocialHovered ? (
            <motion.div
              key="expanded"
              initial={{ opacity: 0, scale: 0.85, x: 10 }}
              animate={{ opacity: 1, scale: 1, x: 0 }}
              exit={{ opacity: 0, scale: 0.85, x: 10 }}
              transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
              className="p-2.5 rounded-full border border-white/15 bg-[#090a0f]/95 backdrop-blur-2xl shadow-2xl flex flex-col gap-3 items-center"
            >
              {socialLinks.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  target="_blank"
                  rel="noreferrer"
                  className="relative group w-10 h-10 rounded-full border border-[#27272a] bg-[#121824] flex items-center justify-center text-[#a1a1aa] transition-all duration-300 shadow-md active:scale-95"
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = item.color;
                    e.currentTarget.style.color = item.color;
                    e.currentTarget.style.boxShadow = `0 0 16px ${item.color}40`;
                    playHover();
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = '#27272a';
                    e.currentTarget.style.color = '#a1a1aa';
                    e.currentTarget.style.boxShadow = 'none';
                  }}
                  onClick={() => playClick()}
                  title={item.label}
                >
                  <item.icon className="w-4 h-4" />
                </a>
              ))}
            </motion.div>
          ) : (
            <motion.div
              key="collapsed"
              initial={{ opacity: 0, scale: 0.85 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.85 }}
              transition={{ duration: 0.25 }}
              className="relative p-2.5 rounded-full border border-white/15 bg-[#090a0f]/80 backdrop-blur-md text-[#c4ff36] shadow-xl hover:border-[#c4ff36] hover:bg-[#090a0f]/95 transition-all duration-300 cursor-pointer flex items-center justify-center group"
              title="Social Networks"
            >
              <Sparkles className="w-5 h-5 text-[#c4ff36] transition-transform duration-300 group-hover:scale-110" />
              <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-[#c4ff36] animate-ping" />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* ─── Scroll Indicator & Bottom Feature Bar ─── */}
      <div className="relative z-10 w-full max-w-[1400px] mx-auto px-6 sm:px-8 md:px-12 lg:px-20 mt-6">
        {/* Scroll Pill Indicator */}
        <div className="flex flex-col items-center mb-6">
          <div className="w-5 h-8 rounded-full border border-[#3f3f46] flex items-start justify-center p-1">
            <motion.div
              className="w-1 h-2 rounded-full bg-[#c4ff36]"
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
            />
          </div>
          <span className="font-code text-[9px] text-[#71717a] tracking-widest uppercase mt-1">SCROLL</span>
        </div>

        {/* Bottom Feature Bar */}
        <FadeIn delay={0.7}>
          <div className="w-full px-6 py-3.5 rounded-2xl border border-[#18181b] bg-[#090a0f]/60 backdrop-blur-md flex flex-wrap items-center justify-around gap-4 text-xs font-code text-[#a1a1aa]">
            {bottomBadges.map((b, i) => (
              <React.Fragment key={i}>
                <div className="flex items-center gap-2 hover:text-[#c4ff36] transition-colors cursor-default">
                  <span className="text-[#c4ff36]">{b.icon}</span>
                  <span>{b.label}</span>
                </div>
                {i < bottomBadges.length - 1 && <span className="text-[#27272a]">|</span>}
              </React.Fragment>
            ))}
          </div>
        </FadeIn>
      </div>
    </section>
  );
};
