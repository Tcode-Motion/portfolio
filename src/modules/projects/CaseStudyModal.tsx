import React, { useEffect, useCallback, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useSound } from '@/core/audio/SoundManager';
import { useScrollContext } from '@/core/scroll/ScrollContext';
import type { ProjectData } from '@/core/content/types';

interface CaseStudyModalProps {
  project: ProjectData | null;
  onClose: () => void;
}

const LANG_COLORS: Record<string, string> = {
  TypeScript: '#3178c6', Dart: '#00b4ab', Python: '#3776ab', JavaScript: '#f7df1e',
  Rust: '#dea584', Shell: '#89e051', HTML: '#e34c26', Kotlin: '#A97BFF', Swift: '#F05138',
};

export const CaseStudyModal: React.FC<CaseStudyModalProps> = ({ project, onClose }) => {
  const { playClick, playHover } = useSound();
  const { lenis } = useScrollContext();
  const [activeTab, setActiveTab] = useState<'overview' | 'architecture' | 'challenges' | 'roadmap'>('overview');

  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (e.key === 'Escape') { playClick(); onClose(); }
  }, [onClose, playClick]);

  useEffect(() => {
    if (project) {
      document.body.classList.add('modal-active');
      document.body.style.overflow = 'hidden';
      if (lenis) lenis.stop();
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.classList.remove('modal-active');
      document.body.style.overflow = '';
      if (lenis) lenis.start();
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [project, handleKeyDown, lenis]);

  if (!project) return null;

  const color = project.color || '#c4ff36';
  const tabs = [
    { id: 'overview' as const, label: 'Overview' },
    { id: 'architecture' as const, label: 'Architecture' },
    { id: 'challenges' as const, label: 'Challenges' },
    { id: 'roadmap' as const, label: 'Roadmap' },
  ];

  return (
    <AnimatePresence>
      <motion.div
        data-lenis-prevent
        className="fixed inset-0 z-[100] flex items-center justify-center overflow-y-auto p-4 sm:p-6 md:p-8 overscroll-contain"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
      >
        {/* Fixed Top-Right Floating Cut/Close Button */}
        <button
          onClick={() => { playClick(); onClose(); }}
          className="fixed top-6 right-6 sm:top-8 sm:right-8 z-[120] flex items-center gap-2 px-4 py-2.5 rounded-full border border-white/20 bg-[#0a0f1d]/90 text-white backdrop-blur-xl hover:border-[#c4ff36] hover:text-[#c4ff36] transition-all shadow-[0_10px_25px_rgba(0,0,0,0.5)] group"
          aria-label="Close project view"
        >
          <span className="text-xs font-code font-bold uppercase tracking-wider">Close</span>
          <svg className="w-4 h-4 text-[#94a3b8] group-hover:text-[#c4ff36] transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Transparent backdrop allowing 3D sphere background to shine through */}
        <motion.div
          className="fixed inset-0 bg-[#030508]/80 backdrop-blur-md"
          onClick={onClose}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        />

        {/* Semi-Transparent Frosted Dark Glass Modal Content Container */}
        <motion.div
          data-lenis-prevent
          className="relative w-full max-w-5xl mx-auto my-auto rounded-3xl border border-white/15 bg-[#0a0f1d]/75 backdrop-blur-3xl shadow-[0_25px_60px_rgba(0,0,0,0.7)] overflow-y-auto max-h-[85vh] text-white z-10 overscroll-contain custom-scrollbar"
          initial={{ opacity: 0, y: 40, scale: 0.97 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 40, scale: 0.97 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        >
          {/* Top glowing accent line */}
          <div className="absolute top-0 left-0 right-0 h-px" style={{ background: `linear-gradient(90deg, transparent, ${color}, transparent)` }} />

          {/* Header */}
          <div className="relative p-8 sm:p-10 pb-0">
            <div className="flex items-start justify-between mb-8">
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <span className="w-2.5 h-2.5 rounded-full shadow-[0_0_8px_currentColor]" style={{ background: color, color }} />
                  <span className="section-label font-bold tracking-wider uppercase text-xs" style={{ color }}>{project.category}</span>
                </div>
                <h2 className="font-display text-3xl sm:text-4xl md:text-5xl tracking-heading leading-heading font-bold text-white">
                  {project.title}
                </h2>
              </div>
              <button
                onClick={() => { playClick(); onClose(); }}
                onMouseEnter={() => playHover()}
                className="flex items-center justify-center w-10 h-10 rounded-full border border-white/15 bg-[#0d1527]/50 text-[#94a3b8] hover:text-white hover:border-white/30 transition-all shrink-0 shadow-md backdrop-blur-md"
                aria-label="Close"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Action buttons */}
            <div className="flex flex-wrap gap-3 mb-8">
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => playClick()}
                className="flex items-center gap-2 px-5 py-2.5 text-xs font-code font-bold rounded-full border border-white/15 bg-[#0d1527]/60 backdrop-blur-md text-white hover:border-[#c4ff36] hover:text-[#c4ff36] transition-all shadow-md"
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
                View Source
              </a>
              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => playClick()}
                  className="flex items-center gap-2 px-5 py-2.5 text-xs font-code font-bold rounded-full text-black transition-all shadow-[0_0_20px_rgba(196,255,54,0.2)]"
                  style={{ background: color }}
                >
                  Live Demo
                  <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M7 17L17 7M17 7H7M17 7v10" />
                  </svg>
                </a>
              )}
            </div>
          </div>

          {/* Tab navigation pill bar */}
          <div className="px-8 sm:px-10 mb-6">
            <div className="inline-flex gap-2 p-1.5 rounded-full bg-[#080d1a]/80 border border-white/10 overflow-x-auto max-w-full backdrop-blur-md">
              {tabs.map((tab) => {
                const isActive = activeTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => { playClick(); setActiveTab(tab.id); }}
                    onMouseEnter={() => playHover()}
                    className={`relative px-5 py-2.5 text-xs font-code font-bold rounded-full transition-all duration-300 ${
                      isActive
                        ? 'text-black shadow-lg scale-[1.02]'
                        : 'text-[#94a3b8] hover:text-white hover:bg-white/5'
                    }`}
                    style={isActive ? { background: color, boxShadow: `0 0 15px ${color}80` } : {}}
                  >
                    {tab.label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Tab content */}
          <div className="p-8 sm:p-10 min-h-[380px]">
            <AnimatePresence mode="wait">
              {activeTab === 'overview' && (
                <motion.div key="overview" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.3 }}>
                  {/* Description */}
                  <p className="text-[#94a3b8] text-base leading-relaxed mb-8 max-w-3xl font-sans">{project.description}</p>

                  {/* Problem / Solution */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                    <div className="p-6 rounded-2xl border border-white/15 bg-[#0d1527]/50 backdrop-blur-xl">
                      <div className="flex items-center gap-2 mb-3">
                        <span className="w-2 h-2 rounded-full bg-red-400 shadow-[0_0_8px_#f87171]" />
                        <span className="text-xs font-code font-bold uppercase tracking-widest text-[#94a3b8]">Problem</span>
                      </div>
                      <p className="text-sm text-white leading-relaxed font-sans">{project.problem}</p>
                    </div>
                    <div className="p-6 rounded-2xl border border-white/15 bg-[#0d1527]/50 backdrop-blur-xl">
                      <div className="flex items-center gap-2 mb-3">
                        <span className="w-2 h-2 rounded-full" style={{ background: color, boxShadow: `0 0 8px ${color}` }} />
                        <span className="text-xs font-code font-bold uppercase tracking-widest text-[#94a3b8]">Solution</span>
                      </div>
                      <p className="text-sm text-white leading-relaxed font-sans">{project.solution}</p>
                    </div>
                  </div>

                  {/* Features */}
                  {project.features && (
                    <div className="mb-8">
                      <h3 className="text-xs font-code uppercase tracking-widest text-[#94a3b8] mb-4 font-bold">Key Features</h3>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {project.features.map((f, i) => (
                          <div key={i} className="flex items-start gap-3 p-3.5 rounded-xl bg-[#0d1527]/50 border border-white/15 backdrop-blur-xl">
                            <span className="mt-1 w-1.5 h-1.5 rounded-full shrink-0" style={{ background: color, boxShadow: `0 0 6px ${color}` }} />
                            <span className="text-xs font-sans text-white leading-relaxed">{f}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Tech stack */}
                  <div>
                    <h3 className="text-xs font-code uppercase tracking-widest text-[#94a3b8] mb-4 font-bold">Tech Stack</h3>
                    <div className="flex flex-wrap gap-2">
                      {project.techStack.map((t) => (
                        <span
                          key={t}
                          className="flex items-center gap-2 px-3.5 py-1.5 text-xs font-code rounded-xl border border-white/15 bg-[#0d1527]/60 text-white backdrop-blur-md shadow-sm"
                        >
                          <span className="w-2.5 h-2.5 rounded-full" style={{ background: LANG_COLORS[t] || '#888', boxShadow: `0 0 6px ${LANG_COLORS[t] || '#888'}` }} />
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}

              {activeTab === 'architecture' && (
                <motion.div key="arch" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.3 }}>
                  {/* Architecture diagram */}
                  {project.architecture && (
                    <div className="mb-8">
                      <h3 className="text-xs font-code uppercase tracking-widest text-[#94a3b8] mb-4 font-bold">System Architecture</h3>
                      <div className="p-6 rounded-2xl border border-white/15 bg-[#0d1527]/50 backdrop-blur-xl overflow-x-auto">
                        <div className="flex items-center gap-3 min-w-max">
                          {project.architecture.split('→').map((step, i, arr) => (
                            <React.Fragment key={i}>
                              <span className="px-4 py-2.5 text-xs font-code font-bold rounded-xl border text-white shadow-sm" style={{ borderColor: `${color}50`, background: `${color}15` }}>
                                {step.trim()}
                              </span>
                              {i < arr.length - 1 && (
                                <svg className="w-4 h-4 shrink-0" style={{ color }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                                </svg>
                              )}
                            </React.Fragment>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Optimizations */}
                  {project.optimizations && (
                    <div>
                      <h3 className="text-xs font-code uppercase tracking-widest text-[#94a3b8] mb-4 font-bold">Performance Optimizations</h3>
                      <div className="space-y-3">
                        {project.optimizations.map((opt, i) => (
                          <div key={i} className="flex items-start gap-3 p-4 rounded-xl bg-[#0d1527]/50 border border-white/15 backdrop-blur-xl">
                            <span className="text-xs font-code font-bold mt-0.5" style={{ color }}>{String(i + 1).padStart(2, '0')}</span>
                            <span className="text-xs font-sans text-white leading-relaxed">{opt}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </motion.div>
              )}

              {activeTab === 'challenges' && (
                <motion.div key="challenges" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.3 }}>
                  <div className="space-y-4">
                    {project.challenges?.map((c, i) => (
                      <div key={i} className="flex items-start gap-4 p-5 rounded-2xl bg-[#0d1527]/50 border border-white/15 backdrop-blur-xl">
                        <span className="flex items-center justify-center w-8 h-8 rounded-full shrink-0 text-xs font-code font-bold" style={{ background: `${color}20`, color }}>
                          {String(i + 1).padStart(2, '0')}
                        </span>
                        <p className="text-xs font-sans text-white leading-relaxed">{c}</p>
                      </div>
                    ))}
                  </div>

                  {project.timeline && (
                    <div className="mt-8 p-5 rounded-2xl border border-white/15 bg-[#0d1527]/50 backdrop-blur-xl">
                      <span className="text-xs font-code uppercase tracking-widest text-[#94a3b8] font-bold">Timeline</span>
                      <p className="text-xs font-sans text-white mt-2">{project.timeline}</p>
                    </div>
                  )}
                </motion.div>
              )}

              {activeTab === 'roadmap' && (
                <motion.div key="roadmap" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.3 }}>
                  <div className="relative">
                    {/* Timeline vertical bar */}
                    <div className="absolute left-4 top-0 bottom-0 w-px" style={{ background: `linear-gradient(180deg, ${color}80, transparent)` }} />
                    <div className="space-y-4">
                      {project.roadmap?.map((item, i) => {
                        const isObj = typeof item === 'object' && item !== null;
                        const phaseText = isObj ? item.phase : `Phase ${i + 1}`;
                        const titleText = isObj ? item.title : item;
                        const status = isObj ? item.status : (i === 0 ? 'completed' : 'in-progress');

                        const isDone = status === 'completed';
                        const isInProgress = status === 'in-progress';

                        return (
                          <div key={i} className="flex items-start gap-5 pl-2">
                            <div
                              className={`relative z-10 w-5 h-5 rounded-full border-2 shrink-0 mt-1 flex items-center justify-center ${
                                isDone
                                  ? 'bg-[#c4ff36] border-[#c4ff36] text-black shadow-[0_0_10px_#c4ff36]'
                                  : isInProgress
                                  ? 'bg-[#38bdf8]/20 border-[#38bdf8] text-[#38bdf8] shadow-[0_0_10px_#38bdf8]'
                                  : 'bg-[#0a0f1d] border-white/20 text-[#94a3b8]'
                              }`}
                            >
                              {isDone ? (
                                <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                </svg>
                              ) : isInProgress ? (
                                <span className="w-1.5 h-1.5 rounded-full bg-[#38bdf8] animate-pulse" />
                              ) : (
                                <span className="w-1 h-1 rounded-full bg-white/30" />
                              )}
                            </div>

                            <div className="p-4 sm:p-5 rounded-2xl bg-[#0d1527]/50 border border-white/15 backdrop-blur-xl flex-1 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                              <div>
                                <span className="text-[11px] font-code font-bold uppercase tracking-wider text-[#94a3b8] block mb-1">
                                  {phaseText}
                                </span>
                                <p className="text-xs font-sans text-white font-medium leading-relaxed">{titleText}</p>
                              </div>

                              <span
                                className={`px-3 py-1 text-[10px] font-code font-bold rounded-full border shrink-0 uppercase tracking-widest ${
                                  isDone
                                    ? 'border-[#c4ff36]/40 text-[#c4ff36] bg-[#c4ff36]/10'
                                    : isInProgress
                                    ? 'border-[#38bdf8]/40 text-[#38bdf8] bg-[#38bdf8]/10'
                                    : 'border-white/10 text-[#94a3b8] bg-white/5'
                                }`}
                              >
                                {isDone ? '✓ Completed' : isInProgress ? '⚙ In Progress' : '🎯 Planned'}
                              </span>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};
