import React, { useState, useRef } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { Code2, Layout, Smartphone, Cpu, ArrowUpRight, Sparkles, CheckCircle2 } from 'lucide-react';
import { FadeIn } from '@/primitives/FadeIn';
import { useSound } from '@/core/audio/SoundManager';

interface SkillNode {
  name: string;
  level?: number;
  projects?: string[];
}

const CATEGORIES: Record<string, { label: string; color: string; bg: string; border: string; glow: string; icon: React.ReactNode }> = {
  languages: {
    label: 'Languages',
    color: '#c4ff36',
    bg: 'rgba(196, 255, 54, 0.08)',
    border: 'rgba(196, 255, 54, 0.35)',
    glow: 'rgba(196, 255, 54, 0.25)',
    icon: <Code2 className="w-4 h-4 text-[#c4ff36]" />,
  },
  frontend: {
    label: 'Frontend & 3D Web',
    color: '#8b5cf6',
    bg: 'rgba(139, 92, 246, 0.08)',
    border: 'rgba(139, 92, 246, 0.35)',
    glow: 'rgba(139, 92, 246, 0.25)',
    icon: <Layout className="w-4 h-4 text-[#8b5cf6]" />,
  },
  mobile: {
    label: 'Desktop & Native GUI',
    color: '#06b6d4',
    bg: 'rgba(6, 182, 212, 0.08)',
    border: 'rgba(6, 182, 212, 0.35)',
    glow: 'rgba(6, 182, 212, 0.25)',
    icon: <Smartphone className="w-4 h-4 text-[#06b6d4]" />,
  },
  systems: {
    label: 'Compiler & Systems',
    color: '#f59e0b',
    bg: 'rgba(245, 158, 11, 0.08)',
    border: 'rgba(245, 158, 11, 0.35)',
    glow: 'rgba(245, 158, 11, 0.25)',
    icon: <Cpu className="w-4 h-4 text-[#f59e0b]" />,
  },
};

const SKILL_GRAPH: Record<string, SkillNode[]> = {
  languages: [
    { name: 'Rust', level: 98, projects: ['TechScript 2.0'] },
    { name: 'JavaScript', level: 95, projects: ['NovOS', 'WallVault'] },
    { name: 'TypeScript', level: 94, projects: ['WallVault', 'TechScript 2.0'] },
    { name: 'Python', level: 90, projects: ['TechScript 2.0'] },
    { name: 'GLSL Shaders', level: 88, projects: ['NovOS'] },
  ],
  frontend: [
    { name: 'Three.js / WebGL', level: 92, projects: ['NovOS'] },
    { name: 'React', level: 95, projects: ['NovOS', 'WallVault'] },
    { name: 'Vite', level: 92, projects: ['NovOS'] },
    { name: 'Tailwind CSS', level: 96, projects: ['NovOS', 'WallVault'] },
    { name: 'Framer Motion', level: 90, projects: ['TechScript 2.0'] },
    { name: 'Zustand', level: 92, projects: ['NovOS', 'WallVault'] },
  ],
  mobile: [
    { name: 'Tauri v2', level: 92, projects: ['WallVault'] },
    { name: 'Egui / egui_dock', level: 90, projects: ['TechScript 2.0'] },
    { name: 'POSIX VFS / IndexedDB', level: 88, projects: ['NovOS'] },
  ],
  systems: [
    { name: 'Bytecode VM', level: 95, projects: ['TechScript 2.0'] },
    { name: 'Logos Lexer & Pratt Parser', level: 94, projects: ['TechScript 2.0'] },
    { name: 'AST Optimizer', level: 92, projects: ['TechScript 2.0'] },
    { name: 'Cargo & Git', level: 96, projects: ['TechScript 2.0', 'NovOS'] },
  ],
};

export const SkillConstellationModule: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { playClick, playHover } = useSound();
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [highlightedSkill, setHighlightedSkill] = useState<string | null>(null);
  const [mobileSkillsView, setMobileSkillsView] = useState<'grid' | 'carousel'>('carousel');
  const [carouselIndex, setCarouselIndex] = useState(0);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });
  const y = useTransform(scrollYProgress, [0, 1], [40, -40]);

  const allSkills = activeCategory
    ? SKILL_GRAPH[activeCategory] || []
    : Object.values(SKILL_GRAPH).flat();

  const getConnectedProjects = (skillName: string): string[] => {
    for (const skills of Object.values(SKILL_GRAPH)) {
      const found = skills.find(s => s.name === skillName);
      if (found?.projects) return found.projects;
    }
    return [];
  };

  const connectedProjects = highlightedSkill ? getConnectedProjects(highlightedSkill) : [];

  return (
    <section ref={sectionRef} id="skills" className="relative py-20 sm:py-28 overflow-hidden z-10">
      {/* Dual Background Ambient Mesh Glow */}
      <div
        className="absolute top-1/4 left-1/3 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] pointer-events-none opacity-30"
        style={{
          background: 'radial-gradient(circle, rgba(196,255,54,0.08) 0%, rgba(139,92,246,0.04) 50%, transparent 70%)',
        }}
      />
      <div
        className="absolute bottom-1/4 right-1/3 translate-x-1/2 translate-y-1/2 w-[600px] h-[600px] pointer-events-none opacity-25"
        style={{
          background: 'radial-gradient(circle, rgba(6,182,212,0.08) 0%, rgba(245,158,11,0.04) 50%, transparent 70%)',
        }}
      />

      <div className="max-w-[1400px] mx-auto px-6 sm:px-8 md:px-12 lg:px-20 relative z-10">
        {/* Ultra-Translucent Frosted Dark Glass Container Card */}
        <div className="p-5 sm:p-12 md:p-14 rounded-3xl border border-white/15 bg-[#0a0f1d]/40 backdrop-blur-2xl shadow-[0_25px_60px_rgba(0,0,0,0.6)] relative z-10 overflow-hidden">
          {/* Top glowing accent line */}
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#c4ff36]/50 to-transparent" />

          {/* Header */}
          <FadeIn>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-px bg-[var(--accent-lime)] shadow-[0_0_8px_#c4ff36]" />
              <span className="section-label text-[var(--accent-lime)] tracking-widest uppercase">Expertise</span>
            </div>
          </FadeIn>

          <motion.div style={{ y }}>
            <FadeIn delay={0.1}>
              <h2 className="font-display text-4xl sm:text-5xl md:text-6xl tracking-heading leading-heading mb-4 text-white font-bold">
                Technical <span className="text-gradient-lime">Arsenal</span>
              </h2>
              <p className="text-[#94a3b8] text-sm sm:text-base max-w-lg mb-10 leading-relaxed font-sans">
                Click any technology card to reveal proficiency metrics and linked portfolio projects.
              </p>
            </FadeIn>
          </motion.div>

          {/* Category Filter Tabs */}
          <FadeIn delay={0.2}>
            <div className="flex flex-wrap gap-3 mb-10">
              <button
                onClick={() => { setActiveCategory(null); setHighlightedSkill(null); playClick(); }}
                className={`flex items-center gap-2 px-5 py-2.5 text-xs font-code font-semibold rounded-full border transition-all duration-300 ${
                  !activeCategory
                    ? 'border-[#c4ff36] text-[#c4ff36] bg-[#c4ff36]/10 shadow-[0_0_20px_rgba(196,255,54,0.2)]'
                    : 'border-white/10 text-[#94a3b8] hover:border-white/30 hover:text-white bg-[#0d1527]/50 backdrop-blur-md'
                }`}
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>All Technologies</span>
              </button>

              {Object.entries(CATEGORIES).map(([key, cat]) => {
                const isSelected = activeCategory === key;
                return (
                  <button
                    key={key}
                    onClick={() => { setActiveCategory(key); setHighlightedSkill(null); playClick(); }}
                    className="flex items-center gap-2.5 px-5 py-2.5 text-xs font-code font-semibold rounded-full border transition-all duration-300 backdrop-blur-md"
                    style={{
                      borderColor: isSelected ? cat.color : 'rgba(255, 255, 255, 0.1)',
                      color: isSelected ? cat.color : '#94a3b8',
                      background: isSelected ? cat.bg : 'rgba(13, 21, 39, 0.5)',
                      boxShadow: isSelected ? `0 0 20px ${cat.glow}` : 'none',
                    }}
                  >
                    {cat.icon}
                    <span>{cat.label}</span>
                  </button>
                );
              })}
            </div>
          </FadeIn>

          {/* Mobile View Mode Slider Toggles */}
          <div className="flex sm:hidden border border-white/10 rounded-2xl p-1 mb-8 bg-[#0d1527]/30 backdrop-blur-md relative z-10 gap-1.5 w-full">
            <button
              onClick={() => { setMobileSkillsView('carousel'); playClick(); }}
              className={`flex-1 py-2.5 text-xs font-code font-bold rounded-xl transition-all ${
                mobileSkillsView === 'carousel'
                  ? 'bg-[#121824] text-[#c4ff36] border border-[#c4ff36]/30 shadow-[0_0_15px_rgba(196,255,54,0.1)]'
                  : 'text-[#94a3b8]'
              }`}
            >
              Interactive Swipe View
            </button>
            <button
              onClick={() => { setMobileSkillsView('grid'); playClick(); }}
              className={`flex-1 py-2.5 text-xs font-code font-bold rounded-xl transition-all ${
                mobileSkillsView === 'grid'
                  ? 'bg-[#121824] text-[#c4ff36] border border-[#c4ff36]/30 shadow-[0_0_15px_rgba(196,255,54,0.1)]'
                  : 'text-[#94a3b8]'
              }`}
            >
              Classic Grid View
            </button>
          </div>

          {/* Carousel View (For mobile only, hidden on tablet/desktop) */}
          {mobileSkillsView === 'carousel' && (
            <div className="flex sm:hidden flex-col items-center mb-10 w-full">
              <div className="w-full relative px-12 flex justify-center min-h-[170px]">
                {/* Active Card */}
                {(() => {
                  const skill = allSkills[carouselIndex % allSkills.length] || allSkills[0];
                  if (!skill) return null;
                  const catKey = Object.keys(SKILL_GRAPH).find(k =>
                    SKILL_GRAPH[k].some(s => s.name === skill.name)
                  ) || 'languages';
                  const catInfo = CATEGORIES[catKey] || CATEGORIES.languages;
                  const isActive = highlightedSkill === skill.name;

                  const gradientMap: Record<string, string> = {
                    languages: 'from-[#c4ff36] to-[#0df28b]',
                    frontend: 'from-[#8b5cf6] to-[#d8b4fe]',
                    mobile: 'from-[#06b6d4] to-[#38bdf8]',
                    systems: 'from-[#f59e0b] to-[#ff7043]',
                  };

                  return (
                    <motion.div
                      key={skill.name}
                      initial={{ opacity: 0, scale: 0.95, x: 20 }}
                      animate={{ opacity: 1, scale: 1, x: 0 }}
                      exit={{ opacity: 0, scale: 0.95, x: -20 }}
                      onClick={() => {
                        setHighlightedSkill(isActive ? null : skill.name);
                        playHover();
                      }}
                      className="w-full text-left p-6 rounded-2xl border transition-all duration-300 relative overflow-hidden bg-[#0d1527]/90 border-white/15 backdrop-blur-2xl shadow-xl flex flex-col justify-between"
                      style={{
                        borderColor: isActive ? catInfo.color : 'rgba(255, 255, 255, 0.15)',
                        boxShadow: isActive ? `0 0 25px ${catInfo.glow}` : '0 10px 25px rgba(0,0,0,0.4)',
                      }}
                    >
                      <div className="flex flex-col justify-between h-full space-y-4">
                        <div className="flex items-center justify-between gap-2">
                          <div className="flex items-center gap-2 min-w-0">
                            <span
                              className="w-3 h-3 rounded-full shrink-0"
                              style={{
                                background: catInfo.color,
                                boxShadow: `0 0 10px ${catInfo.color}`,
                              }}
                            />
                            <span className="font-extrabold text-base text-white truncate">
                              {skill.name}
                            </span>
                          </div>
                          {skill.level && (
                            <span
                              className="text-xs font-code font-bold px-2.5 py-0.5 rounded-full border shrink-0 bg-[#080d1a] border-white/10 text-white"
                              style={{ color: catInfo.color }}
                            >
                              {skill.level}%
                            </span>
                          )}
                        </div>

                        {skill.level && (
                          <div className="w-full h-2 bg-[#080d1a] rounded-full overflow-hidden border border-white/5 my-1">
                            <div
                              className={`h-full rounded-full bg-gradient-to-r ${gradientMap[catKey] || 'from-[#c4ff36] to-[#0df28b]'}`}
                              style={{ width: `${skill.level}%` }}
                            />
                          </div>
                        )}

                        <div className="flex items-center justify-between text-[11px] font-code text-[#94a3b8] pt-1">
                          <span className="truncate pr-1">{catInfo.label}</span>
                          {skill.projects && skill.projects.length > 0 ? (
                            <span className="text-[#c4ff36] font-semibold shrink-0">
                              {skill.projects.length} project{skill.projects.length > 1 ? 's' : ''}
                            </span>
                          ) : (
                            <span className="shrink-0">Core skill</span>
                          )}
                        </div>
                      </div>
                    </motion.div>
                  );
                })()}

                {/* Left Arrow */}
                <button
                  onClick={() => {
                    playClick();
                    setCarouselIndex(prev => (prev - 1 + allSkills.length) % allSkills.length);
                  }}
                  className="absolute left-0 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full border border-white/15 bg-[#090b12] hover:bg-[#121c33] flex items-center justify-center text-white"
                >
                  ←
                </button>

                {/* Right Arrow */}
                <button
                  onClick={() => {
                    playClick();
                    setCarouselIndex(prev => (prev + 1) % allSkills.length);
                  }}
                  className="absolute right-0 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full border border-white/15 bg-[#090b12] hover:bg-[#121c33] flex items-center justify-center text-white"
                >
                  →
                </button>
              </div>

              {/* Dot Indicators */}
              <div className="flex gap-1.5 mt-5 max-w-full overflow-x-auto py-1 scrollbar-none">
                {allSkills.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => { playClick(); setCarouselIndex(idx); }}
                    className={`w-1.5 h-1.5 rounded-full transition-all duration-300 shrink-0 ${
                      idx === carouselIndex % allSkills.length ? 'bg-[#c4ff36] w-4' : 'bg-white/20'
                    }`}
                  />
                ))}
              </div>
            </div>
          )}

          {/* Multi-Colored Style-Transferred Skill Cards Grid */}
          <div className={`sm:grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-12 ${mobileSkillsView === 'grid' ? 'grid' : 'hidden'}`}>
            <AnimatePresence mode="popLayout">
              {allSkills.map((skill, i) => {
                const isActive = highlightedSkill === skill.name;
                const catKey = Object.keys(SKILL_GRAPH).find(k =>
                  SKILL_GRAPH[k].some(s => s.name === skill.name)
                ) || 'languages';
                const catInfo = CATEGORIES[catKey] || CATEGORIES.languages;

                const gradientMap: Record<string, string> = {
                  languages: 'from-[#c4ff36] to-[#0df28b]',
                  frontend: 'from-[#8b5cf6] to-[#d8b4fe]',
                  mobile: 'from-[#06b6d4] to-[#38bdf8]',
                  systems: 'from-[#f59e0b] to-[#ff7043]',
                };

                return (
                  <motion.button
                    key={skill.name}
                    layout
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.25, delay: i * 0.015 }}
                    onClick={() => {
                      setHighlightedSkill(isActive ? null : skill.name);
                      playHover();
                    }}
                    className="group text-left p-5 rounded-2xl border transition-all duration-300 relative overflow-hidden backdrop-blur-md hover:-translate-y-1"
                    style={{
                      background: isActive ? catInfo.bg : 'rgba(13, 21, 39, 0.85)',
                      borderColor: isActive ? catInfo.color : 'rgba(255, 255, 255, 0.12)',
                      boxShadow: isActive ? `0 0 30px ${catInfo.glow}` : '0 4px 20px rgba(0,0,0,0.3)',
                    }}
                  >
                    <div className="flex flex-col justify-between h-full space-y-3">
                      {/* Top line: Name & Percentage */}
                      <div className="flex items-center justify-between gap-2">
                        <div className="flex items-center gap-2 min-w-0">
                          <span
                            className="w-2.5 h-2.5 rounded-full shrink-0 transition-all duration-300"
                            style={{
                              background: catInfo.color,
                              boxShadow: `0 0 10px ${catInfo.color}`,
                            }}
                          />
                          <span className="font-bold text-sm text-white group-hover:text-[#c4ff36] transition-colors truncate">
                            {skill.name}
                          </span>
                        </div>
                        {skill.level && (
                          <span
                            className="text-xs font-code font-bold px-2 py-0.5 rounded-full border shrink-0 shadow-sm"
                            style={{
                              color: catInfo.color,
                              borderColor: catInfo.border,
                              background: catInfo.bg,
                            }}
                          >
                            {skill.level}%
                          </span>
                        )}
                      </div>

                      {/* Progress Bar Meter */}
                      {skill.level && (
                        <div className="w-full h-1.5 bg-[#080d1a] rounded-full overflow-hidden border border-white/5 my-1">
                          <motion.div
                            className={`h-full rounded-full bg-gradient-to-r ${gradientMap[catKey] || 'from-[#c4ff36] to-[#0df28b]'}`}
                            initial={{ width: 0 }}
                            animate={{ width: `${skill.level}%` }}
                            transition={{ duration: 0.8, delay: i * 0.02 }}
                          />
                        </div>
                      )}

                      {/* Footer tag */}
                      <div className="flex items-center justify-between text-[11px] font-code text-[#94a3b8] pt-1">
                        <span className="truncate pr-1">{catInfo.label}</span>
                        {skill.projects && skill.projects.length > 0 ? (
                          <span className="text-[#c4ff36] font-semibold shrink-0">
                            {skill.projects.length} project{skill.projects.length > 1 ? 's' : ''}
                          </span>
                        ) : (
                          <span className="shrink-0">Core skill</span>
                        )}
                      </div>
                    </div>
                  </motion.button>
                );
              })}
            </AnimatePresence>
          </div>

          {/* Connected projects showcase card */}
          <AnimatePresence mode="wait">
            {highlightedSkill && (
              <motion.div
                key={highlightedSkill}
                initial={{ opacity: 0, y: 20, filter: 'blur(6px)' }}
                animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                exit={{ opacity: 0, y: -10, filter: 'blur(6px)' }}
                transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                className="p-6 sm:p-8 rounded-2xl border border-[#c4ff36]/60 bg-[#0a1813]/90 backdrop-blur-xl shadow-[0_0_40px_rgba(196,255,54,0.18)]"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <CheckCircle2 className="w-5 h-5 text-[#c4ff36]" />
                    <span className="font-bold text-base text-white">
                      Projects powered by <span className="text-[#c4ff36]">{highlightedSkill}</span>
                    </span>
                  </div>
                  <button
                    onClick={() => setHighlightedSkill(null)}
                    className="text-xs font-code text-[#94a3b8] hover:text-white"
                  >
                    Close ✕
                  </button>
                </div>

                <div className="flex flex-wrap gap-3">
                  {connectedProjects.length > 0 ? (
                    connectedProjects.map((p) => (
                      <a
                        key={p}
                        href="#work"
                        className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-white/10 bg-[#0d1527] text-xs font-code text-white hover:border-[#c4ff36] hover:text-[#c4ff36] transition-all shadow-md"
                      >
                        <span>{p}</span>
                        <ArrowUpRight className="w-3.5 h-3.5" />
                      </a>
                    ))
                  ) : (
                    <span className="text-xs text-[#94a3b8] font-code">
                      Core technical proficiency integrated across general system architecture.
                    </span>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};

