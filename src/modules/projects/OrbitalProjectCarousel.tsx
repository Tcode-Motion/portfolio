import React, { useState, useRef, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, ArrowRight, Github, Sparkles } from 'lucide-react';
import { useSound } from '@/core/audio/SoundManager';
import { getAllProjects } from '@/core/content/contentLoader';
import type { ProjectData } from '@/core/content/types';

const PROJECT_ACCENTS: Record<string, string> = {
  'techscript': '#c4ff36',
  'aurora-music': '#8b5cf6',
  'cloudvault': '#06b6d4',
  'techscript-playground': '#22d3ee',
  'neosketch': '#a855f7',
  'wallverse': '#14b8a6',
  'nutrilens-ai': '#f59e0b',
  'armenu-ai': '#ec4899',
  'kinotix': '#f43f5e',
  'vidstrim': '#ef4444',
};

export const OrbitalProjectCarousel: React.FC<{ onSelectProject?: (p: ProjectData) => void }> = ({ onSelectProject }) => {
  const projects = getAllProjects();
  const [activeIndex, setActiveIndex] = useState(0);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);
  const startX = useRef(0);
  const scrollLeftStart = useRef(0);
  const { playClick, playHover } = useSound();

  const total = projects.length;

  const scrollToIndex = useCallback((index: number) => {
    if (!scrollContainerRef.current) return;
    const targetIndex = Math.max(0, Math.min(index, total - 1));
    const container = scrollContainerRef.current;
    const targetCard = container.children[targetIndex] as HTMLElement;
    if (targetCard) {
      targetCard.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
      setActiveIndex(targetIndex);
    }
  }, [total]);

  const nextProject = useCallback(() => {
    playClick();
    scrollToIndex((activeIndex + 1) % total);
  }, [activeIndex, total, scrollToIndex, playClick]);

  const prevProject = useCallback(() => {
    playClick();
    scrollToIndex((activeIndex - 1 + total) % total);
  }, [activeIndex, total, scrollToIndex, playClick]);

  // Track active card on manual scroll
  const handleScroll = () => {
    if (!scrollContainerRef.current || isDragging.current) return;
    const container = scrollContainerRef.current;
    const scrollPos = container.scrollLeft;
    const cardWidth = container.firstElementChild
      ? (container.firstElementChild as HTMLElement).offsetWidth + 24
      : 440;
    const newIdx = Math.round(scrollPos / cardWidth);
    if (newIdx >= 0 && newIdx < total && newIdx !== activeIndex) {
      setActiveIndex(newIdx);
    }
  };

  // Drag-to-scroll mouse controls
  const handleMouseDown = (e: React.MouseEvent) => {
    if (!scrollContainerRef.current) return;
    isDragging.current = true;
    startX.current = e.pageX - scrollContainerRef.current.offsetLeft;
    scrollLeftStart.current = scrollContainerRef.current.scrollLeft;
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging.current || !scrollContainerRef.current) return;
    const x = e.pageX - scrollContainerRef.current.offsetLeft;
    const walk = (x - startX.current) * 1.5;
    scrollContainerRef.current.scrollLeft = scrollLeftStart.current - walk;
  };

  const handleMouseUp = () => {
    if (isDragging.current) {
      setTimeout(() => {
        isDragging.current = false;
      }, 50);
    }
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') nextProject();
      if (e.key === 'ArrowLeft') prevProject();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [nextProject, prevProject]);

  return (
    <div className="relative w-full flex flex-col items-center py-6 select-none">
      {/* Straight Horizontal Cards Scroll Track (Full Width Viewport) */}
      <div className="w-full overflow-hidden">
        <div
          ref={scrollContainerRef}
          onScroll={handleScroll}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
          className="flex gap-6 overflow-x-auto snap-x snap-mandatory py-6 px-6 sm:px-8 md:px-12 lg:px-20 scrollbar-none scroll-smooth cursor-grab active:cursor-grabbing w-full"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {projects.map((proj: ProjectData, i: number) => {
            const isFront = i === activeIndex;
            const accentColor = PROJECT_ACCENTS[proj.id] || proj.color || '#c4ff36';

            return (
              <motion.div
                key={proj.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: i * 0.05 }}
                className="snap-center shrink-0 w-[285px] sm:w-[380px] md:w-[420px] lg:w-[440px] rounded-2xl border bg-[#080c14]/95 backdrop-blur-2xl shadow-2xl p-6 sm:p-8 flex flex-col justify-between transition-all duration-300 group hover:border-white/20"
                style={{
                  borderColor: isFront ? accentColor : 'rgba(39, 39, 42, 0.8)',
                  boxShadow: isFront ? `0 0 35px ${accentColor}20` : '0 10px 30px rgba(0,0,0,0.5)',
                }}
                onClick={() => {
                  if (activeIndex !== i) {
                    playClick();
                    scrollToIndex(i);
                  }
                }}
                onMouseEnter={() => playHover()}
              >
                {/* Card Top / Header */}
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span
                      className="font-code text-xs tracking-widest uppercase px-3 py-1 rounded-full border font-semibold"
                      style={{ color: accentColor, borderColor: `${accentColor}40`, background: '#050505' }}
                    >
                      {proj.category}
                    </span>
                    <span
                      className="font-display font-extrabold text-2xl select-none opacity-30"
                      style={{ color: accentColor }}
                    >
                      {String(i + 1).padStart(2, '0')}
                    </span>
                  </div>

                  <h3 className="font-display text-2xl sm:text-3xl font-bold text-white mb-3 tracking-tight group-hover:text-white transition-colors">
                    {proj.title}
                  </h3>

                  <p className="font-body text-sm text-[#d1d5db] line-clamp-3 leading-relaxed mb-6">
                    {proj.tagline || proj.description}
                  </p>

                  {/* Highlights Bullet List */}
                  {proj.highlights && proj.highlights.length > 0 && (
                    <ul className="space-y-2 mb-6">
                      {proj.highlights.slice(0, 3).map((h: string, idx: number) => (
                        <li key={idx} className="flex items-start gap-2 font-code text-xs text-[#a1a1aa]">
                          <span style={{ color: accentColor }} className="font-bold">→</span>
                          <span className="leading-snug">{h}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>

                {/* Card Bottom / Tech & Actions */}
                <div className="mt-4">
                  {/* Tech Stack Badges */}
                  <div className="flex flex-wrap gap-1.5 mb-6 pt-4 border-t border-[#1f2430]">
                    {proj.techStack.slice(0, 4).map((tech: string) => (
                      <span
                        key={tech}
                        className="px-2.5 py-1 text-[11px] font-code rounded-md bg-[#121824] text-[#a1a1aa] border border-[#1f2430]"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  {/* Action Buttons */}
                  <div className="flex items-center gap-3">
                    {onSelectProject && (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          playClick();
                          onSelectProject(proj);
                        }}
                        className="flex-1 py-2.5 px-4 rounded-full font-semibold text-xs text-[#050505] flex items-center justify-center gap-1.5 transition-all duration-300 shadow-md hover:brightness-110 active:scale-95"
                        style={{ background: accentColor }}
                      >
                        <Sparkles className="w-3.5 h-3.5" />
                        View Case Study
                      </button>
                    )}

                    {proj.githubUrl && (
                      <a
                        href={proj.githubUrl}
                        target="_blank"
                        rel="noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="p-2.5 rounded-full border border-[#27272a] bg-[#121824] text-[#a1a1aa] hover:text-white hover:border-white transition-all active:scale-95"
                        title="Source Code"
                      >
                        <Github className="w-4 h-4" />
                      </a>
                    )}
                  </div>
                </div>
              </motion.div>
            );
          })}
          {/* End spacer for right padding alignment */}
          <div className="shrink-0 w-4 sm:w-8 md:w-12 lg:w-16" aria-hidden="true" />
        </div>
      </div>

      {/* Navigation & Progress Bar */}
      <div className="flex items-center gap-6 mt-4 z-20">
        <button
          onClick={prevProject}
          onMouseEnter={() => playHover()}
          className="w-12 h-12 rounded-full border border-[#27272a] bg-[#090a0f]/80 backdrop-blur-md flex items-center justify-center text-white hover:border-[#c4ff36] hover:text-[#c4ff36] transition-all shadow-lg active:scale-95"
          title="Previous Project"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>

        {/* Carousel Progress Indicators */}
        <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-[#090a0f]/80 border border-[#27272a] backdrop-blur-md">
          {projects.map((_: ProjectData, idx: number) => {
            const accent = PROJECT_ACCENTS[projects[idx].id] || '#c4ff36';
            return (
              <button
                key={idx}
                onClick={() => {
                  playClick();
                  scrollToIndex(idx);
                }}
                onMouseEnter={() => playHover()}
                className="h-2 rounded-full transition-all duration-300"
                style={{
                  width: activeIndex === idx ? 24 : 8,
                  background: activeIndex === idx ? accent : '#3f3f46',
                }}
                title={`Go to project ${idx + 1}`}
              />
            );
          })}
        </div>

        <button
          onClick={nextProject}
          onMouseEnter={() => playHover()}
          className="w-12 h-12 rounded-full border border-[#27272a] bg-[#090a0f]/80 backdrop-blur-md flex items-center justify-center text-white hover:border-[#c4ff36] hover:text-[#c4ff36] transition-all shadow-lg active:scale-95"
          title="Next Project"
        >
          <ArrowRight className="w-5 h-5" />
        </button>
      </div>

      <div className="font-code text-xs text-[#71717a] mt-3">
        Swipe or click arrows to explore selected projects
      </div>
    </div>
  );
};

