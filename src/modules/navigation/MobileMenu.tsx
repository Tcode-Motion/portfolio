import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { getProfile, getSocials } from '@/core/content/contentLoader';

const NAV_LINKS = [
  { label: 'Work', href: '#work', num: '01' },
  { label: 'Skills', href: '#skills', num: '02' },
  { label: 'TechScript', href: '#techscript', num: '03' },
  { label: 'About', href: '#about', num: '04' },
  { label: 'Contact', href: '#contact', num: '05' },
];

const EASE = [0.16, 1, 0.3, 1] as const;

export const MobileMenu: React.FC<{
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (e: React.MouseEvent<HTMLAnchorElement>, href: string) => void;
}> = ({ isOpen, onClose, onNavigate }) => {
  const profile = getProfile();
  const socials = getSocials();

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-40 flex flex-col md:hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          {/* Backdrop */}
          <motion.div
            className="absolute inset-0 bg-[#0a0f1d]/95 backdrop-blur-3xl border-b border-white/10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />

          {/* Content */}
          <div className="relative z-10 flex flex-col justify-between h-full px-8 py-20">
            {/* Top: Status */}
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.5, ease: EASE }}
            >
              <div className="flex items-center gap-2 mb-1">
                <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent-lime)] animate-pulse" />
                <span className="section-label text-[var(--accent-lime)]">Available for projects</span>
              </div>
              <p className="text-xs text-[var(--text-3)]">{profile.location}</p>
            </motion.div>

            {/* Center: Nav Links */}
            <nav className="flex flex-col gap-1">
              {NAV_LINKS.map((link, i) => (
                <motion.a
                  key={link.href}
                  href={link.href}
                  onClick={(e) => {
                    onNavigate(e, link.href);
                    onClose();
                  }}
                  className="group flex items-baseline gap-4 py-3"
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.5, delay: 0.08 + i * 0.06, ease: EASE }}
                >
                  <span className="text-[10px] font-code text-[var(--text-3)] w-4">
                    {link.num}
                  </span>
                  <span className="font-display text-4xl sm:text-5xl tracking-heading text-[var(--text-1)] group-hover:text-[var(--accent-lime)] transition-colors duration-300">
                    {link.label}
                  </span>
                </motion.a>
              ))}
            </nav>

            {/* Bottom: Socials + Handle */}
            <motion.div
              className="space-y-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.5 }}
            >
              <div className="flex flex-wrap gap-x-6 gap-y-2">
                {socials.map((s) => (
                  <a
                    key={s.platform}
                    href={s.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs font-code text-[var(--text-3)] hover:text-[var(--accent-lime)] transition-colors magnetic-btn"
                  >
                    {s.platform}
                  </a>
                ))}
              </div>
              <p className="text-[10px] font-code text-[var(--text-3)] opacity-50">
                {profile.handle} · © {new Date().getFullYear()}
              </p>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
