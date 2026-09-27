import React from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { getProfile, getSocials } from '@/core/content/contentLoader';
import { ArrowUpRight, Home, X, Sparkles } from 'lucide-react';

interface NavItem {
  label: string;
  path: string;
}

export const MobileMenu: React.FC<{
  isOpen: boolean;
  onClose: () => void;
  navItems: NavItem[];
}> = ({ isOpen, onClose, navItems }) => {
  const profile = getProfile();
  const socials = getSocials();

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex flex-col md:hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-[#07090e]/95 backdrop-blur-2xl"
            onClick={onClose}
          />

          {/* Drawer content */}
          <div className="relative z-10 flex flex-col justify-between h-full px-6 pt-6 pb-28 overflow-y-auto">
            <div className="space-y-6">
              {/* Header with Close Button */}
              <div className="flex items-center justify-between pb-4 border-b border-white/10">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#c4ff36]/10 border border-[#c4ff36]/20">
                  <span className="w-2 h-2 rounded-full bg-[#c4ff36] animate-pulse" />
                  <span className="font-code text-xs text-[#c4ff36] font-semibold">
                    Open for roles & collaboration
                  </span>
                </div>

                <button
                  type="button"
                  onClick={onClose}
                  className="p-2 rounded-xl border border-white/10 bg-white/5 text-white/70 hover:text-white"
                  aria-label="Close Menu"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Dedicated Quick Return Home Card */}
              <Link
                to="/"
                onClick={onClose}
                className="flex items-center justify-between p-4 rounded-2xl bg-gradient-to-r from-[#c4ff36]/20 to-[#06b6d4]/10 border border-[#c4ff36]/40 active:scale-[0.98] transition-transform"
              >
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-xl bg-[#c4ff36] text-[#07090e]">
                    <Home className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="font-display font-bold text-white text-base block">
                      Return to Homepage
                    </span>
                    <span className="font-code text-xs text-[#94a3b8]">
                      Overview, flagships & bio
                    </span>
                  </div>
                </div>
                <ArrowUpRight className="w-4 h-4 text-[#c4ff36]" />
              </Link>

              {/* Navigation list */}
              <nav className="flex flex-col gap-1">
                {navItems.map((item, i) => (
                  <motion.div
                    key={item.path}
                    initial={{ opacity: 0, x: -15 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.03 * i, duration: 0.2 }}
                  >
                    <Link
                      to={item.path}
                      onClick={onClose}
                      className="group flex items-center justify-between py-2.5 px-3 rounded-xl hover:bg-white/5 text-lg font-display font-bold text-white hover:text-[#c4ff36] transition-colors border-b border-white/5"
                    >
                      <span>{item.label}</span>
                      <ArrowUpRight className="w-4 h-4 text-white/30 group-hover:text-[#c4ff36] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                    </Link>
                  </motion.div>
                ))}

                {/* Additional Quick Links */}
                <Link
                  to="/resume"
                  onClick={onClose}
                  className="group flex items-center justify-between py-2.5 px-3 rounded-xl hover:bg-white/5 text-lg font-display font-bold text-[#38bdf8] hover:text-white transition-colors border-b border-white/5"
                >
                  <div className="flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-[#38bdf8]" />
                    <span>Curriculum Vitae / Resume</span>
                  </div>
                  <ArrowUpRight className="w-4 h-4 text-white/30 group-hover:text-white transition-all" />
                </Link>
              </nav>
            </div>

            {/* Bottom info */}
            <div className="pt-6 border-t border-white/10 space-y-4">
              <div className="flex flex-wrap gap-3">
                {socials.slice(0, 5).map((s) => (
                  <a
                    key={s.platform}
                    href={s.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs font-code text-[#94a3b8] hover:text-[#c4ff36] transition-colors"
                  >
                    {s.platform}
                  </a>
                ))}
              </div>
              <p className="font-code text-[11px] text-[#64748b]">
                {profile.name} (@{profile.handle}) · {profile.location}
              </p>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
