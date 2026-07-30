import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { getProfile, getSkills, getAllProjects, getSocials } from '@/core/content/contentLoader';

interface CliModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const COMMANDS: Record<string, (args: string) => React.ReactNode> = {
  help: () => (
    <div className="space-y-1">
      <p className="text-[var(--accent-lime)]">Available commands:</p>
      {[
        ['help', 'Show this help message'],
        ['whoami', 'About Tanmoy'],
        ['projects', 'List all projects'],
        ['skills', 'Technical skills'],
        ['socials', 'Connect with me'],
        ['clear', 'Clear terminal'],
        ['history', 'Command history'],
      ].map(([cmd, desc]) => (
        <p key={cmd} className="text-[var(--text-2)]">
          <span className="text-[var(--accent-lime)]">{cmd.padEnd(12)}</span>
          <span className="text-[var(--text-3)]">{desc}</span>
        </p>
      ))}
    </div>
  ),
  whoami: () => {
    const profile = getProfile();
    return (
      <div className="space-y-1">
        <p className="text-[var(--text-1)] font-medium">{profile.name}</p>
        <p className="text-[var(--text-3)]">{profile.title}</p>
        <p className="text-[var(--text-3)]">{profile.location}</p>
        <p className="text-[var(--text-2)] mt-2">{profile.tagline}</p>
      </div>
    );
  },
  projects: () => {
    const projects = getAllProjects();
    return (
      <div className="space-y-1">
        <p className="text-[var(--accent-lime)]">Projects ({projects.length}):</p>
        {projects.map((p) => (
          <p key={p.id} className="text-[var(--text-2)]">
            <span className="text-[var(--accent-lime)]">→</span>{' '}
            <span className="text-[var(--text-1)]">{p.title}</span>
            <span className="text-[var(--text-3)]"> — {p.category}</span>
            {p.featured && <span className="text-[var(--accent-lime)] ml-2">★</span>}
          </p>
        ))}
      </div>
    );
  },
  skills: () => {
    const skills = getSkills();
    return (
      <div className="space-y-2">
        <p className="text-[var(--accent-lime)]">Technical Skills:</p>
        {skills.categories.map((cat) => (
          <div key={cat.id}>
            <p className="text-[var(--text-1)] font-medium">{cat.name}</p>
            <p className="text-[var(--text-3)] text-xs">
              {cat.skills.map((s) => s.name).join(' · ')}
            </p>
          </div>
        ))}
      </div>
    );
  },
  socials: () => {
    const socials = getSocials();
    return (
      <div className="space-y-1">
        <p className="text-[var(--accent-lime)]">Connect:</p>
        {socials.map((s) => (
          <p key={s.platform} className="text-[var(--text-2)]">
            <span className="text-[var(--text-1)]">{s.platform}</span>
            <span className="text-[var(--text-3)]"> — {s.username}</span>
          </p>
        ))}
      </div>
    );
  },
  clear: () => null,
  history: () => null,
};

export const DeveloperCliModal: React.FC<CliModalProps> = ({ isOpen, onClose }) => {
  const [input, setInput] = useState('');
  const [history, setHistory] = useState<Array<{ command: string; output: React.ReactNode }>>([
    {
      command: '',
      output: (
        <div className="space-y-1">
          <p className="text-[var(--accent-lime)] font-medium">Tanmoy Majumder Terminal v2.0</p>
          <p className="text-[var(--text-3)]">Type <span className="text-[var(--text-1)]">help</span> for available commands.</p>
        </div>
      ),
    },
  ]);
  const [cmdHistory, setCmdHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isOpen]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [history]);

  const execute = (raw: string) => {
    const trimmed = raw.trim();
    if (!trimmed) return;

    const [cmd, ...rest] = trimmed.split(' ');
    const args = rest.join(' ');
    const handler = COMMANDS[cmd.toLowerCase()];

    const output = handler
      ? handler(args)
      : (
        <p className="text-[var(--text-3)]">
          Command not found: <span className="text-[var(--text-1)]">{cmd}</span>. Type <span className="text-[var(--accent-lime)]">help</span>.
        </p>
      );

    if (cmd.toLowerCase() === 'clear') {
      setHistory([]);
      setInput('');
      return;
    }

    setHistory((prev) => [...prev, { command: trimmed, output }]);
    setCmdHistory((prev) => [...trimmed, ...prev]);
    setHistoryIndex(-1);
    setInput('');
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      execute(input);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (historyIndex < cmdHistory.length - 1) {
        const next = historyIndex + 1;
        setHistoryIndex(next);
        setInput(cmdHistory[next]);
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIndex > 0) {
        const next = historyIndex - 1;
        setHistoryIndex(next);
        setInput(cmdHistory[next]);
      } else {
        setHistoryIndex(-1);
        setInput('');
      }
    } else if (e.key === 'Escape') {
      onClose();
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-[90] flex items-center justify-center p-4 sm:p-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          {/* Backdrop */}
          <motion.div
            className="absolute inset-0 bg-[rgba(5,5,5,0.85)] backdrop-blur-sm"
            onClick={onClose}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />

          {/* Terminal */}
          <motion.div
            className="relative w-full max-w-2xl rounded-xl border border-[var(--border)] bg-[var(--surface-1)] overflow-hidden shadow-2xl"
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 10 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* Title bar */}
            <div className="flex items-center justify-between px-4 py-3 border-b border-[var(--border)] bg-[var(--surface-2)]">
              <div className="flex items-center gap-3">
                <div className="flex gap-1.5">
                  <span className="w-3 h-3 rounded-full bg-[#ff5f57]" />
                  <span className="w-3 h-3 rounded-full bg-[#febc2e]" />
                  <span className="w-3 h-3 rounded-full bg-[#28c840]" />
                </div>
                <span className="text-[10px] font-code text-[var(--text-3)] uppercase tracking-widest">Terminal</span>
              </div>
              <button
                onClick={onClose}
                className="p-1 text-[var(--text-3)] hover:text-[var(--text-1)] transition-colors magnetic-btn"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Body */}
            <div
              ref={scrollRef}
              className="p-4 h-[400px] overflow-y-auto font-code text-sm"
            >
              {/* History */}
              {history.map((entry, i) => (
                <div key={i} className="mb-3">
                  {entry.command && (
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-[var(--accent-lime)]">❯</span>
                      <span className="text-[var(--text-1)]">{entry.command}</span>
                    </div>
                  )}
                  <div className="pl-4">{entry.output}</div>
                </div>
              ))}

              {/* Input line */}
              <div className="flex items-center gap-2">
                <span className="text-[var(--accent-lime)]">❯</span>
                <input
                  ref={inputRef}
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  className="flex-1 bg-transparent text-[var(--text-1)] font-code text-sm focus:outline-none"
                  placeholder="Type a command..."
                  spellCheck={false}
                  autoComplete="off"
                />
              </div>
            </div>

            {/* Footer */}
            <div className="flex items-center justify-between px-4 py-2 border-t border-[var(--border)] bg-[var(--surface-2)]">
              <span className="text-[10px] font-code text-[var(--text-3)]">
                ↑↓ history · Esc close · Enter run
              </span>
              <span className="text-[10px] font-code text-[var(--text-3)]">
                {cmdHistory.length} commands
              </span>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
