import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Layers, Github } from 'lucide-react';
import type { ProjectData } from '@/core/content/types';

interface ModalProps {
  project: ProjectData | null;
  onClose: () => void;
}

export const ExplodedArchitectureModal: React.FC<ModalProps> = ({ project, onClose }) => {
  if (!project) return null;

  const getArchitectureLayers = () => {
    switch (project.id) {
      case 'techscript':
        return [
          { name: 'Layer 1: Frontend & CLI Toolchain', desc: 'Cargo Workspace CLI, Lexer & Tokenizer parsing source text.' },
          { name: 'Layer 2: Compiler & AST Generator', desc: 'Recursive descent parser constructing type-checked Abstract Syntax Tree.' },
          { name: 'Layer 3: Bytecode Engine & Stack VM', desc: 'Stack-based virtual machine executing bytecode instructions & standard library.' },
          { name: 'Layer 4: Future LLVM & LSP Backend', desc: 'Planned LLVM IR emitter, JIT compilation, and Language Server Protocol.' },
        ];
      case 'cloudvault':
        return [
          { name: 'Layer 1: UI Viewport (Jetpack Compose)', desc: 'Modern reactive Material 3 user interface built with Kotlin Coroutines.' },
          { name: 'Layer 2: Architecture & State Layer', desc: 'MVVM architecture with Hilt dependency injection & Room local database.' },
          { name: 'Layer 3: TDLib Engine Abstraction', desc: 'Telegram Database Library C++ binding for cloud file streaming & chunking.' },
          { name: 'Layer 4: Storage Infrastructure', desc: 'Infinite encrypted cloud storage backed by Telegram server nodes.' },
        ];
      case 'aurora-music':
        return [
          { name: 'Layer 1: User Interface (Flutter & Material 3)', desc: 'Smooth 60fps responsive UI with reactive state management.' },
          { name: 'Layer 2: Media Indexing Engine', desc: 'High-speed local Android media library scanner & metadata parser.' },
          { name: 'Layer 3: Playback Architecture', desc: 'Low-latency background audio service with notification controls.' },
          { name: 'Layer 4: Audio Processing DSP', desc: 'Equalizer pipeline & spatial audio processing abstraction.' },
        ];
      default:
        return [
          { name: 'Layer 1: Client Application UI', desc: 'Modern user interface with responsive state rendering.' },
          { name: 'Layer 2: Application API Services', desc: 'REST & GraphQL client streaming network services.' },
          { name: 'Layer 3: Data & Storage Engine', desc: 'High-performance local cache and database synchronization.' },
        ];
    }
  };

  const layers = getArchitectureLayers();

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 bg-black/80 backdrop-blur-xl p-4 sm:p-6 flex items-center justify-center overflow-y-auto"
        role="dialog"
        aria-modal="true"
        aria-label={`${project.title} Exploded Architecture View`}
      >
        <motion.div
          initial={{ scale: 0.95, y: 20 }}
          animate={{ scale: 1, y: 0 }}
          exit={{ scale: 0.95, y: 20 }}
          className="glass-panel max-w-3xl w-full p-6 sm:p-8 space-y-6 relative border-border-subtle bg-surface-raised shadow-2xl"
        >
          {/* Top Bar */}
          <div className="flex items-center justify-between border-b border-border-subtle pb-4">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-accent-indigo/10 text-accent-indigo border border-accent-indigo/30">
                <Layers className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-display font-bold text-xl text-content-primary">
                  {project.title} — Architectural Explode View
                </h3>
                <span className="font-code text-xs text-accent-cyan">{project.category}</span>
              </div>
            </div>

            <button
              onClick={onClose}
              className="p-2 rounded-xl bg-surface-base border border-border-subtle text-content-secondary hover:text-white transition-colors"
              aria-label="Close Architecture Modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Problem & Solution Summary */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-body">
            <div className="p-4 rounded-xl bg-surface-base border border-border-subtle space-y-1">
              <span className="font-code text-accent-purple font-semibold">Engineering Challenge:</span>
              <p className="text-content-secondary">{project.problem}</p>
            </div>
            <div className="p-4 rounded-xl bg-surface-base border border-border-subtle space-y-1">
              <span className="font-code text-accent-cyan font-semibold">Architectural Solution:</span>
              <p className="text-content-secondary">{project.solution}</p>
            </div>
          </div>

          {/* Exploded Architecture Stack Nodes */}
          <div className="space-y-3 pt-2">
            <h4 className="font-code text-xs text-content-tertiary uppercase tracking-wider">
              // Layered System Breakdown:
            </h4>
            <div className="space-y-3">
              {layers.map((layer, idx) => (
                <div
                  key={idx}
                  className="p-4 rounded-xl bg-surface-base border border-border-subtle flex items-start gap-4 hover:border-accent-indigo/50 transition-all hover:translate-x-1"
                >
                  <div className="p-2 rounded-lg bg-surface-raised font-code text-xs text-accent-cyan border border-border-subtle">
                    0{idx + 1}
                  </div>
                  <div>
                    <h5 className="font-display font-bold text-sm text-content-primary">{layer.name}</h5>
                    <p className="font-body text-xs text-content-secondary mt-1">{layer.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Tech Badges & Footer Links */}
          <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-border-subtle">
            <div className="flex flex-wrap gap-1.5">
              {project.techStack.map((tech) => (
                <span
                  key={tech}
                  className="px-2.5 py-1 rounded-md bg-surface-base border border-border-subtle font-code text-[11px] text-accent-cyan"
                >
                  {tech}
                </span>
              ))}
            </div>

            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-accent-indigo text-white font-body font-semibold text-xs hover:bg-indigo-600 transition-colors"
            >
              <Github className="w-4 h-4" />
              <span>View Repository</span>
            </a>
          </div>

        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};
