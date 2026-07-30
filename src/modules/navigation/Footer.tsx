import React from 'react';
import { ArrowUp, Github, Instagram, Youtube, Twitter, Sparkles } from 'lucide-react';
import { useScrollContext } from '@/core/scroll/ScrollContext';
import { useSound } from '@/core/audio/SoundManager';
import { getProfile, getSocials } from '@/core/content/contentLoader';

const NAV_LINKS = [
  { label: 'Selected Work', href: '#work' },
  { label: 'Skills & Stack', href: '#skills' },
  { label: 'TechScript VM', href: '#techscript' },
  { label: 'GitHub Activity', href: '#github' },
  { label: 'About & Philosophy', href: '#about' },
  { label: 'Contact', href: '#contact' },
];

const FEATURED_PROJECTS = [
  { label: 'TechScript Compiler', href: '#work' },
  { label: 'Aurora Music Engine', href: '#work' },
  { label: 'CloudVault Systems', href: '#work' },
  { label: 'NeoSketch Studio', href: '#work' },
];

export const Footer: React.FC = () => {
  const { lenis } = useScrollContext();
  const { playClick, playHover } = useSound();
  const profile = getProfile();
  const socials = getSocials();

  const handleScrollTop = (e: React.MouseEvent) => {
    e.preventDefault();
    playClick();
    if (lenis) {
      lenis.scrollTo(0, { duration: 1.5 });
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const renderSocialIcon = (platform: string) => {
    const p = platform.toLowerCase();
    if (p.includes('github')) return <Github className="w-4 h-4 text-[#c4ff36]" />;
    if (p.includes('instagram')) return <Instagram className="w-4 h-4 text-[#e1306c]" />;
    if (p.includes('youtube')) return <Youtube className="w-4 h-4 text-[#ff0000]" />;
    if (p.includes('twitter') || p.includes('x')) return <Twitter className="w-4 h-4 text-[#38bdf8]" />;
    return <Sparkles className="w-4 h-4 text-[#c4ff36]" />;
  };

  return (
    <footer className="w-full relative z-10 border-t border-white/15 bg-[#0a0f1d]/40 backdrop-blur-2xl pt-10 pb-6 px-6 sm:px-8 md:px-12 lg:px-20 mt-2 shadow-[0_-15px_40px_rgba(0,0,0,0.5)]">
      <div className="max-w-[1400px] mx-auto">
        {/* Top Section — 4 Columns */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 pb-12 border-b border-white/10">
          {/* Col 1 — Brand & Bio (4 Cols) */}
          <div className="lg:col-span-4 space-y-6">
            <div className="flex items-center gap-3">
              <img
                src="https://github.com/Tcode-Motion.png"
                alt="Tcode-Motion"
                className="w-9 h-9 rounded-full border-2 border-[#c4ff36] shadow-[0_0_12px_rgba(196,255,54,0.3)] object-cover shrink-0"
              />
              <span className="font-code text-xs text-[#c4ff36] bg-[#0c160e]/80 px-2.5 py-1 rounded-full border border-[#c4ff36]/30 font-semibold">
                @{profile.handle || 'Tcode-Motion'} ({profile.name || 'Tanmoy Majumder'})
              </span>
            </div>

            <p className="text-sm text-[#a1a1aa] leading-relaxed max-w-sm font-sans">
              Architecting custom compilers, high-performance web applications, and interactive 3D digital experiences.
            </p>

            {/* Back to Top Button */}
            <button
              onClick={handleScrollTop}
              onMouseEnter={() => playHover()}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full border border-white/15 bg-[#0d1527]/50 text-xs font-semibold text-white hover:border-[#c4ff36] hover:text-[#c4ff36] transition-all shadow-md active:scale-95 backdrop-blur-md"
            >
              <ArrowUp className="w-4 h-4" />
              <span>Back to Top</span>
            </button>
          </div>

          {/* Sub-grid Wrapper for Navigation & Featured Work (5 Cols on Desktop, 2 Columns side-by-side on Mobile) */}
          <div className="grid grid-cols-2 lg:col-span-5 gap-6">
            {/* Col 2 — Quick Navigation */}
            <div className="space-y-4">
              <h4 className="section-label text-[#c4ff36] font-semibold">Navigation</h4>
              <ul className="space-y-2.5 text-sm">
                {NAV_LINKS.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      onClick={() => playClick()}
                      onMouseEnter={() => playHover()}
                      className="text-[#a1a1aa] hover:text-white transition-colors hover:translate-x-1 inline-block duration-200"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Col 3 — Featured Projects */}
            <div className="space-y-4">
              <h4 className="section-label text-[#c4ff36] font-semibold">Featured Work</h4>
              <ul className="space-y-2.5 text-sm">
                {FEATURED_PROJECTS.map((proj) => (
                  <li key={proj.label}>
                    <a
                      href={proj.href}
                      onClick={() => playClick()}
                      onMouseEnter={() => playHover()}
                      className="text-[#a1a1aa] hover:text-white transition-colors hover:translate-x-1 inline-block duration-200"
                    >
                      {proj.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Col 4 — Connect Networks (3 Cols) */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="section-label text-[#c4ff36] font-semibold">Connect Networks</h4>
            <div className="flex flex-wrap lg:flex-col gap-2.5">
              {socials.map((s) => (
                <a
                  key={s.platform}
                  href={s.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => playClick()}
                  onMouseEnter={() => playHover()}
                  className="flex items-center gap-2.5 p-2 px-3 rounded-xl bg-[#080d1a]/80 border border-white/10 hover:border-[#c4ff36] transition-all group backdrop-blur-md text-white font-semibold text-xs shrink-0"
                >
                  <div className="p-1 rounded-lg bg-[#080c14] border border-white/10 shrink-0">
                    {renderSocialIcon(s.platform)}
                  </div>
                  <div className="flex flex-col text-left">
                    <span className="text-[11px] sm:text-xs font-semibold text-white group-hover:text-[#c4ff36] transition-colors">
                      {s.platform}
                    </span>
                    <span className="text-[9px] text-[#a1a1aa] font-code hidden sm:inline">@{s.username}</span>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Middle Section — Invitation Banner */}
        <div className="py-8 border-b border-white/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div>
            <h3 className="font-display text-xl sm:text-2xl font-bold text-white mb-1">
              Have an ambitious project in mind?
            </h3>
            <p className="text-xs text-[#a1a1aa]">Let's build something extraordinary together.</p>
          </div>
          <a
            href="#contact"
            onClick={() => playClick()}
            onMouseEnter={() => playHover()}
            className="px-6 py-3 rounded-full bg-[#c4ff36] text-[#050505] font-bold text-xs hover:shadow-[0_0_25px_rgba(196,255,54,0.35)] transition-all active:scale-95 shrink-0"
          >
            Start a Conversation
          </a>
        </div>

        {/* Bottom Section — System Status & Copyright */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs">
          <div className="text-[#a1a1aa] font-code">
            © {new Date().getFullYear()} <span className="text-white font-semibold">{profile.name}</span>. All rights reserved.
          </div>

          <div className="text-[#a1a1aa] font-code text-[11px] bg-[#080d1a]/80 px-4 py-1.5 rounded-full border border-white/10">
            Crafted with React 18 · Three.js · Tailwind · GSAP · Lenis
          </div>

          <div className="flex items-center gap-2 text-xs text-[#c4ff36] font-code">
            <span className="w-2 h-2 rounded-full bg-[#c4ff36] animate-pulse" />
            <span>All Systems Nominal · Kolkata, IN</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
