import React, { useState, useRef, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, ArrowRight, Github, Sparkles } from 'lucide-react';
import { useSound } from '@/core/audio/SoundManager';
import { getAllProjects } from '@/core/content/contentLoader';
import type { ProjectData } from '@/core/content/types';

const PROJECT_ACCENTS: Record<string, string> = {
  'techscript': '#c4ff36',
  'aurora-music': '#8b5cf6',
  'cloudvault': '#22d3ee',
};

export const OrbitalProjectCarousel: React.FC<{ onSelectProject?: (p: ProjectData) => void }> = ({ onSelectProject }) => {
  const projects = getAllProjects();
  const [activeIndex, setActiveIndex] = useState(0);
  const [rotationAngle, setRotationAngle] = useState(0);
  const isDragging = useRef(false);
  const startX = useRef(0);
  const currentAngleRef = useRef(0);
  const { playClick, playHover } = useSound();

  const total = projects.length;

  const rotateTo = useCallback((index: number) => {
    const targetAngle = -(index / total) * Math.PI * 2;
    currentAngleRef.current = targetAngle;
    setRotationAngle(targetAngle);
    setActiveIndex((index + total) % total);
  }, [total]);

  const nextProject = useCallback(() => {
    playClick();
    rotateTo(activeIndex + 1);
  }, [activeIndex, rotateTo, playClick]);

  const prevProject = useCallback(() => {
    playClick();
    rotateTo(activeIndex - 1);
  }, [activeIndex, rotateTo, playClick]);

  // Drag controls to spin cards around globe
  const handlePointerDown = (e: React.PointerEvent) => {
    isDragging.current = true;
    startX.current = e.clientX;
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDragging.current) return;
    const deltaX = e.clientX - startX.current;
    const newAngle = currentAngleRef.current + (deltaX * 0.005);
    setRotationAngle(newAngle);
  };

  const handlePointerUp = (e: React.PointerEvent) => {
    if (!isDragging.current) return;
    isDragging.current = false;
    const deltaX = e.clientX - startX.current;
    if (Math.abs(deltaX) > 40) {
      if (deltaX < 0) nextProject();
      else prevProject();
    } else {
      setRotationAngle(currentAngleRef.current);
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
    <div className="relative w-full min-h-[680px] flex flex-col items-center justify-center py-10 overflow-hidden select-none">

      {/* Orbital 3D Stage */}
      <div
        className="relative w-full max-w-[1200px] h-[520px] flex items-center justify-center cursor-grab active:cursor-grabbing touch-none"
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerLeave={handlePointerUp}
      >
        {projects.map((proj: ProjectData, i: number) => {
          const cardAngle = (i / total) * Math.PI * 2 + rotationAngle;
          const radiusX = 360; // Horizontal orbit width
          const radiusZ = 220; // Depth orbit distance

          const x = Math.sin(cardAngle) * radiusX;
          const z = Math.cos(cardAngle) * radiusZ;
          const scale = 0.72 + (z + radiusZ) / (2 * radiusZ) * 0.32;
          const opacity = Math.max(0.25, 0.35 + (z + radiusZ) / (2 * radiusZ) * 0.65);
          const isFront = i === activeIndex;
          const accentColor = PROJECT_ACCENTS[proj.id] || '#c4ff36';

          return (
            <motion.div
              key={proj.id}
              className="absolute w-[360px] sm:w-[440px] md:w-[480px] rounded-2xl border bg-[#080c14]/95 backdrop-blur-2xl shadow-2xl p-6 sm:p-8 flex flex-col justify-between transition-all duration-700 pointer-events-auto"
              style={{
                x,
                scale,
                opacity,
                zIndex: Math.round(z + 500),
                borderColor: isFront ? accentColor : 'rgba(39, 39, 42, 0.8)',
                boxShadow: isFront ? `0 0 40px ${accentColor}25` : '0 10px 30px rgba(0,0,0,0.5)',
              }}
              onClick={() => {
                if (!isFront) {
                  playClick();
                  rotateTo(i);
                }
              }}
              onMouseEnter={() => playHover()}
            >
              {/* Card Header & Category */}
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span
                    className="font-code text-xs tracking-widest uppercase px-3 py-1 rounded-full border font-semibold"
                    style={{ color: accentColor, borderColor: `${accentColor}40`, background: '#050505' }}
                  >
                    {proj.category}
                  </span>
                  <span className="font-display font-extrabold text-2xl text-white/20 select-none">
                    0{i + 1}
                  </span>
                </div>

                <h3 className="font-display text-2xl sm:text-3xl font-bold text-white mb-3 tracking-tight">
                  {proj.title}
                </h3>

                <p className="font-body text-sm text-[#d1d5db] line-clamp-3 leading-relaxed mb-6">
                  {proj.tagline || proj.description}
                </p>

                {/* Highlights */}
                {proj.highlights && (
                  <ul className="space-y-1.5 mb-6">
                    {proj.highlights.slice(0, 3).map((h: string, idx: number) => (
                      <li key={idx} className="flex items-start gap-2 font-code text-xs text-[#a1a1aa]">
                        <span style={{ color: accentColor }}>→</span>
                        <span>{h}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>

              {/* Card Footer & Actions */}
              <div>
                {/* Tech Badges */}
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

                {/* CTA Buttons */}
                <div className="flex items-center gap-3">
                  {onSelectProject && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        playClick();
                        onSelectProject(proj);
                      }}
                      className="flex-1 py-2.5 px-4 rounded-full font-semibold text-xs text-[#050505] flex items-center justify-center gap-1.5 transition-all duration-300 shadow-md"
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
                      className="p-2.5 rounded-full border border-[#27272a] bg-[#121824] text-[#a1a1aa] hover:text-white hover:border-white transition-all"
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
      </div>

      {/* Orbit Controls Bar (Previous / Next / Project Indicators) */}
      <div className="flex items-center gap-6 mt-6 z-20">
        <button
          onClick={prevProject}
          onMouseEnter={() => playHover()}
          className="w-12 h-12 rounded-full border border-[#27272a] bg-[#090a0f]/80 backdrop-blur-md flex items-center justify-center text-white hover:border-[#c4ff36] hover:text-[#c4ff36] transition-all shadow-lg"
          title="Previous Project"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>

        {/* Orbit Dots Indicator */}
        <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-[#090a0f]/80 border border-[#27272a] backdrop-blur-md">
          {projects.map((_: ProjectData, idx: number) => (
            <button
              key={idx}
              onClick={() => rotateTo(idx)}
              onMouseEnter={() => playHover()}
              className="h-2 rounded-full transition-all duration-300"
              style={{
                width: activeIndex === idx ? 24 : 8,
                background: activeIndex === idx ? '#c4ff36' : '#3f3f46',
              }}
            />
          ))}
        </div>

        <button
          onClick={nextProject}
          onMouseEnter={() => playHover()}
          className="w-12 h-12 rounded-full border border-[#27272a] bg-[#090a0f]/80 backdrop-blur-md flex items-center justify-center text-white hover:border-[#c4ff36] hover:text-[#c4ff36] transition-all shadow-lg"
          title="Next Project"
        >
          <ArrowRight className="w-5 h-5" />
        </button>
      </div>

      <div className="font-code text-xs text-[#71717a] mt-3">
        Drag or click any card to orbit around the 3D globe
      </div>
    </div>
  );
};
