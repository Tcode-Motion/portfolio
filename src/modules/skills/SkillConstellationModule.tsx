import React, { useState, useRef } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { FadeIn } from '@/primitives/FadeIn';
import { useSound } from '@/core/audio/SoundManager';

interface SkillNode {
  name: string;
  level?: number;
  projects?: string[];
}

const CATEGORIES: Record<string, { label: string; color: string; icon: string }> = {
  languages: { label: 'Languages', color: '#c4ff36', icon: '{ }' },
  frontend: { label: 'Frontend', color: '#8b5cf6', icon: '◈' },
  mobile: { label: 'Mobile', color: '#06b6d4', icon: '◻' },
  systems: { label: 'Systems', color: '#f59e0b', icon: '⬡' },
};

const SKILL_GRAPH: Record<string, SkillNode[]> = {
  languages: [
    { name: 'Dart', level: 95, projects: ['aurora-music', 'armenu-ai'] },
    { name: 'Python', level: 90, projects: ['nutrilens-ai', 'cloudvault'] },
    { name: 'TypeScript', level: 92, projects: ['techscript', 'funnelcore'] },
    { name: 'Rust', level: 75, projects: ['techscript'] },
    { name: 'Kotlin', level: 70, projects: ['armenu-ai'] },
    { name: 'C', level: 65, projects: [] },
    { name: 'C++', level: 60, projects: [] },
    { name: 'Java', level: 68, projects: [] },
    { name: 'JavaScript', level: 88, projects: ['funnelcore', 'wallvault'] },
  ],
  frontend: [
    { name: 'React', level: 93, projects: ['techscript', 'funnelcore', 'wallvault'] },
    { name: 'Next.js', level: 88, projects: ['funnelcore'] },
    { name: 'Three.js', level: 78, projects: [] },
    { name: 'Tailwind CSS', level: 95, projects: ['techscript', 'funnelcore', 'wallvault'] },
    { name: 'Framer Motion', level: 85, projects: ['techscript'] },
    { name: 'Node.js', level: 87, projects: ['cloudvault', 'funnelcore'] },
    { name: 'Express.js', level: 85, projects: ['cloudvault'] },
  ],
  mobile: [
    { name: 'Flutter', level: 95, projects: ['aurora-music', 'armenu-ai', 'nutrilens-ai'] },
    { name: 'Firebase', level: 88, projects: ['wallvault', 'nutrilens-ai'] },
    { name: 'Supabase', level: 82, projects: ['cloudvault'] },
    { name: 'PostgreSQL', level: 85, projects: ['cloudvault', 'funnelcore'] },
    { name: 'MongoDB', level: 78, projects: ['armenu-ai'] },
    { name: 'Hive', level: 80, projects: ['aurora-music'] },
    { name: 'Riverpod', level: 88, projects: ['aurora-music'] },
  ],
  systems: [
    { name: 'Git', level: 95, projects: [] },
    { name: 'Docker', level: 80, projects: ['cloudvault'] },
    { name: 'AWS', level: 75, projects: ['cloudvault'] },
    { name: 'Linux', level: 85, projects: [] },
    { name: 'Arduino', level: 70, projects: [] },
  ],
};

export const SkillConstellationModule: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { playClick, playHover } = useSound();
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [highlightedSkill, setHighlightedSkill] = useState<string | null>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });
  const y = useTransform(scrollYProgress, [0, 1], [50, -50]);

  const allSkills = activeCategory
    ? SKILL_GRAPH[activeCategory] || []
    : Object.values(SKILL_GRAPH).flat();

  // Get connected skills for the highlighted skill
  const getConnectedProjects = (skillName: string): string[] => {
    for (const skills of Object.values(SKILL_GRAPH)) {
      const found = skills.find(s => s.name === skillName);
      if (found?.projects) return found.projects;
    }
    return [];
  };

  const connectedProjects = highlightedSkill ? getConnectedProjects(highlightedSkill) : [];

  return (
    <section ref={sectionRef} id="skills" className="relative py-20 sm:py-28 overflow-hidden">
      {/* Background glow */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(196,255,54,0.02) 0%, transparent 60%)',
        }}
      />

      <div className="max-w-[1400px] mx-auto px-6 sm:px-8 md:px-12 lg:px-20">
        {/* Header */}
        <FadeIn>
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-px bg-[var(--accent-lime)]" />
            <span className="section-label text-[var(--accent-lime)]">Expertise</span>
          </div>
        </FadeIn>

        <motion.div style={{ y }}>
          <FadeIn delay={0.1}>
            <h2 className="font-display text-4xl sm:text-5xl md:text-6xl tracking-heading leading-heading mb-4">
              Technical<br />
              <span className="text-gradient-lime">Arsenal</span>
            </h2>
            <p className="text-[var(--text-2)] text-sm max-w-md mb-12">
              Click any technology to see which projects it powers
            </p>
          </FadeIn>
        </motion.div>

        {/* Category tabs */}
        <FadeIn delay={0.2}>
          <div className="flex flex-wrap gap-3 mb-12">
            <button
              onClick={() => { setActiveCategory(null); setHighlightedSkill(null); playClick(); }}
              className={`px-4 py-2 text-xs font-code rounded-full border transition-all duration-300 magnetic-btn ${
                !activeCategory
                  ? 'border-[var(--accent-lime)] text-[var(--accent-lime)] bg-[rgba(196,255,54,0.06)]'
                  : 'border-[var(--border)] text-[var(--text-3)] hover:border-[var(--border-hover)]'
              }`}
            >
              All
            </button>
            {Object.entries(CATEGORIES).map(([key, cat]) => (
              <button
                key={key}
                onClick={() => { setActiveCategory(key); setHighlightedSkill(null); playClick(); }}
                className={`px-4 py-2 text-xs font-code rounded-full border transition-all duration-300 magnetic-btn ${
                  activeCategory === key
                    ? 'border-[var(--accent-lime)] text-[var(--accent-lime)] bg-[rgba(196,255,54,0.06)]'
                    : 'border-[var(--border)] text-[var(--text-3)] hover:border-[var(--border-hover)]'
                }`}
              >
                <span className="mr-1.5">{cat.icon}</span>
                {cat.label}
              </button>
            ))}
          </div>
        </FadeIn>

        {/* Skill pills */}
        <div className="flex flex-wrap gap-3 mb-16">
          <AnimatePresence mode="popLayout">
            {allSkills.map((skill, i) => {
              const isActive = highlightedSkill === skill.name;
              const catKey = Object.keys(SKILL_GRAPH).find(k =>
                SKILL_GRAPH[k].some(s => s.name === skill.name)
              );
              const catColor = catKey ? CATEGORIES[catKey]?.color : '#888';

              return (
                <motion.button
                  key={skill.name}
                  layout
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ duration: 0.3, delay: i * 0.015 }}
                  onClick={() => {
                    setHighlightedSkill(isActive ? null : skill.name);
                    playHover();
                  }}
                  className={`group relative px-4 py-2.5 rounded-lg border text-sm transition-all duration-300 magnetic-btn ${
                    isActive
                      ? 'border-[var(--accent-lime)] text-[var(--accent-lime)] bg-[rgba(196,255,54,0.06)] shadow-[0_0_20px_rgba(196,255,54,0.08)]'
                      : 'border-[var(--border)] text-[var(--text-2)] hover:border-[var(--border-hover)] hover:text-[var(--text-1)]'
                  }`}
                  data-cursor="hover"
                >
                  <span className="flex items-center gap-2">
                    <span
                      className="w-1.5 h-1.5 rounded-full transition-all duration-300"
                      style={{
                        background: isActive ? 'var(--accent-lime)' : catColor,
                        boxShadow: isActive ? `0 0 6px ${catColor}60` : 'none',
                      }}
                    />
                    {skill.name}
                    {skill.level && (
                      <span className="text-[10px] font-code text-[var(--text-3)] ml-1">{skill.level}%</span>
                    )}
                  </span>
                </motion.button>
              );
            })}
          </AnimatePresence>
        </div>

        {/* Connected projects display */}
        <AnimatePresence mode="wait">
          {highlightedSkill && (
            <motion.div
              key={highlightedSkill}
              initial={{ opacity: 0, y: 20, filter: 'blur(4px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              exit={{ opacity: 0, y: -10, filter: 'blur(4px)' }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="p-6 rounded-xl border border-[var(--accent-lime)] bg-[rgba(196,255,54,0.03)]"
            >
              <div className="flex items-center gap-2 mb-4">
                <span className="w-2 h-2 rounded-full bg-[var(--accent-lime)] animate-pulse" />
                <span className="section-label text-[var(--accent-lime)]">
                  Projects using {highlightedSkill}
                </span>
              </div>
              <div className="flex flex-wrap gap-3">
                {connectedProjects.length > 0 ? (
                  connectedProjects.map((p) => (
                    <a
                      key={p}
                      href="#work"
                      className="px-4 py-2 rounded-lg border border-[var(--border)] text-sm text-[var(--text-2)] hover:border-[var(--accent-lime)] hover:text-[var(--text-1)] transition-all magnetic-btn"
                    >
                      {p}
                    </a>
                  ))
                ) : (
                  <span className="text-sm text-[var(--text-3)]">No linked projects</span>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};
