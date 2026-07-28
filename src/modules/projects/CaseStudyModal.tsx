import React, { useEffect, useCallback, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useSound } from '@/core/audio/SoundManager';
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
  const [activeTab, setActiveTab] = useState<'overview' | 'architecture' | 'challenges' | 'roadmap'>('overview');

  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (e.key === 'Escape') { playClick(); onClose(); }
  }, [onClose, playClick]);

  useEffect(() => {
    if (project) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [project, handleKeyDown]);

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
        className="fixed inset-0 z-[100] flex items-start justify-center overflow-y-auto"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
      >
        {/* Backdrop */}
        <motion.div
          className="fixed inset-0 bg-[#050505]/90 backdrop-blur-xl"
          onClick={onClose}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        />

        {/* Modal content */}
        <motion.div
          className="relative w-full max-w-5xl mx-4 my-8 sm:my-16 rounded-3xl border border-[var(--border)] bg-[var(--surface-1)] overflow-hidden"
          initial={{ opacity: 0, y: 40, scale: 0.97 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 40, scale: 0.97 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        >
          {/* Top glow bar */}
          <div className="absolute top-0 left-0 right-0 h-px" style={{ background: `linear-gradient(90deg, transparent, ${color}60, transparent)` }} />

          {/* Header */}
          <div className="relative p-8 sm:p-10 pb-0">
            <div className="flex items-start justify-between mb-8">
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <span className="w-2.5 h-2.5 rounded-full" style={{ background: color }} />
                  <span className="section-label" style={{ color }}>{project.category}</span>
                </div>
                <h2 className="font-display text-3xl sm:text-4xl md:text-5xl tracking-heading leading-heading">
                  {project.title}
                </h2>
              </div>
              <button
                onClick={() => { playClick(); onClose(); }}
                onMouseEnter={() => playHover()}
                className="flex items-center justify-center w-10 h-10 rounded-full border border-[var(--border)] text-[var(--text-3)] hover:text-[var(--text-1)] hover:border-[var(--border-hover)] transition-all shrink-0 magnetic-btn"
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
                className="flex items-center gap-2 px-5 py-2.5 text-sm font-medium rounded-full border border-[var(--border)] text-[var(--text-1)] hover:border-[var(--accent-lime)] hover:text-[var(--accent-lime)] transition-all magnetic-btn"
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
                  className="flex items-center gap-2 px-5 py-2.5 text-sm font-medium rounded-full text-[#050505] transition-all magnetic-btn"
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

          {/* Tab navigation */}
          <div className="px-8 sm:px-10 border-b border-[var(--border)]">
            <div className="flex gap-1">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => { playClick(); setActiveTab(tab.id); }}
                  onMouseEnter={() => playHover()}
                  className={`relative px-4 py-3 text-sm transition-colors ${
                    activeTab === tab.id ? 'text-[var(--text-1)]' : 'text-[var(--text-3)] hover:text-[var(--text-2)]'
                  }`}
                >
                  {tab.label}
                  {activeTab === tab.id && (
                    <motion.div
                      layoutId="cs-tab"
                      className="absolute bottom-0 left-0 right-0 h-px"
                      style={{ background: color }}
                      transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                    />
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Tab content */}
          <div className="p-8 sm:p-10 min-h-[400px]">
            <AnimatePresence mode="wait">
              {activeTab === 'overview' && (
                <motion.div key="overview" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.3 }}>
                  {/* Description */}
                  <p className="text-[var(--text-2)] text-base leading-relaxed mb-8 max-w-3xl">{project.description}</p>

                  {/* Problem / Solution */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                    <div className="p-6 rounded-2xl border border-[var(--border)] bg-[var(--surface-2)]">
                      <div className="flex items-center gap-2 mb-3">
                        <span className="w-1.5 h-1.5 rounded-full bg-red-400" />
                        <span className="text-xs font-code uppercase tracking-widest text-[var(--text-3)]">Problem</span>
                      </div>
                      <p className="text-sm text-[var(--text-2)] leading-relaxed">{project.problem}</p>
                    </div>
                    <div className="p-6 rounded-2xl border border-[var(--border)] bg-[var(--surface-2)]">
                      <div className="flex items-center gap-2 mb-3">
                        <span className="w-1.5 h-1.5 rounded-full" style={{ background: color }} />
                        <span className="text-xs font-code uppercase tracking-widest text-[var(--text-3)]">Solution</span>
                      </div>
                      <p className="text-sm text-[var(--text-2)] leading-relaxed">{project.solution}</p>
                    </div>
                  </div>

                  {/* Features */}
                  {project.features && (
                    <div className="mb-8">
                      <h3 className="text-sm font-code uppercase tracking-widest text-[var(--text-3)] mb-4">Key Features</h3>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {project.features.map((f, i) => (
                          <div key={i} className="flex items-start gap-3 p-3 rounded-xl bg-[var(--surface-2)] border border-[var(--border)]">
                            <span className="mt-1 w-1.5 h-1.5 rounded-full shrink-0" style={{ background: color }} />
                            <span className="text-sm text-[var(--text-2)]">{f}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Tech stack */}
                  <div>
                    <h3 className="text-sm font-code uppercase tracking-widest text-[var(--text-3)] mb-4">Tech Stack</h3>
                    <div className="flex flex-wrap gap-2">
                      {project.techStack.map((t) => (
                        <span
                          key={t}
                          className="flex items-center gap-2 px-3 py-1.5 text-xs font-code rounded-lg border border-[var(--border)] text-[var(--text-2)]"
                        >
                          <span className="w-2 h-2 rounded-full" style={{ background: LANG_COLORS[t] || '#888' }} />
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
                      <h3 className="text-sm font-code uppercase tracking-widest text-[var(--text-3)] mb-4">System Architecture</h3>
                      <div className="p-6 rounded-2xl border border-[var(--border)] bg-[var(--surface-2)] overflow-x-auto">
                        <div className="flex items-center gap-3 min-w-max">
                          {project.architecture.split('→').map((step, i, arr) => (
                            <React.Fragment key={i}>
                              <span className="px-4 py-2 text-sm font-code rounded-lg border text-[var(--text-2)]" style={{ borderColor: `${color}40`, background: `${color}08` }}>
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
                      <h3 className="text-sm font-code uppercase tracking-widest text-[var(--text-3)] mb-4">Performance Optimizations</h3>
                      <div className="space-y-3">
                        {project.optimizations.map((opt, i) => (
                          <div key={i} className="flex items-start gap-3 p-4 rounded-xl bg-[var(--surface-2)] border border-[var(--border)]">
                            <span className="text-xs font-code mt-0.5" style={{ color }}>{String(i + 1).padStart(2, '0')}</span>
                            <span className="text-sm text-[var(--text-2)]">{opt}</span>
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
                      <div key={i} className="flex items-start gap-4 p-5 rounded-2xl bg-[var(--surface-2)] border border-[var(--border)]">
                        <span className="flex items-center justify-center w-8 h-8 rounded-full shrink-0 text-xs font-code font-medium" style={{ background: `${color}15`, color }}>
                          {String(i + 1).padStart(2, '0')}
                        </span>
                        <p className="text-sm text-[var(--text-2)] leading-relaxed">{c}</p>
                      </div>
                    ))}
                  </div>

                  {project.timeline && (
                    <div className="mt-8 p-5 rounded-2xl border border-[var(--border)] bg-[var(--surface-2)]">
                      <span className="text-xs font-code uppercase tracking-widest text-[var(--text-3)]">Timeline</span>
                      <p className="text-sm text-[var(--text-2)] mt-2">{project.timeline}</p>
                    </div>
                  )}
                </motion.div>
              )}

              {activeTab === 'roadmap' && (
                <motion.div key="roadmap" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.3 }}>
                  <div className="relative">
                    {/* Timeline line */}
                    <div className="absolute left-4 top-0 bottom-0 w-px" style={{ background: `linear-gradient(180deg, ${color}40, transparent)` }} />
                    <div className="space-y-6">
                      {project.roadmap?.map((item, i) => (
                        <div key={i} className="flex items-start gap-6 pl-2">
                          <div className="relative z-10 w-5 h-5 rounded-full border-2 shrink-0 mt-0.5" style={{ borderColor: color, background: i === 0 ? color : 'var(--surface-1)' }} />
                          <div className="p-4 rounded-xl bg-[var(--surface-2)] border border-[var(--border)] flex-1">
                            <span className="text-xs font-code text-[var(--text-3)]">Phase {i + 1}</span>
                            <p className="text-sm text-[var(--text-2)] mt-1">{item}</p>
                          </div>
                        </div>
                      ))}
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
