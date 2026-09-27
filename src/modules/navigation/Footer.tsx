import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUp, Github, Instagram, Youtube, Twitter, Smartphone, ExternalLink, User } from 'lucide-react';
import { useSound } from '@/core/audio/SoundManager';
import { getProfile, getSocials } from '@/core/content/contentLoader';

const SITE_PAGES = [
  { label: 'Projects Catalog', path: '/projects' },
  { label: 'Android Applications', path: '/apps' },
  { label: 'TechScript Language', path: '/techscript' },
  { label: 'Now Page', path: '/now' },
  { label: 'Engineering Workflow', path: '/workflow' },
  { label: 'Milestone Journey', path: '/journey' },
  { label: 'About & Identity', path: '/about' },
  { label: 'Connect & Inquiries', path: '/connect' },
];

const HIGHLIGHTED_PRODUCTS = [
  { label: 'TechScript Compiler', path: '/projects/techscript', badge: 'Rust 2.0' },
  { label: 'Satvora AI Nutrition', path: '/apps/satvora-ai', badge: 'Testing' },
  { label: 'KinotiX 4K Wallpaper', path: '/apps/kinotix', badge: 'Google Play' },
  { label: 'NovOS Web Desktop', path: '/projects/novos', badge: 'Web OS' },
  { label: 'NeoSketch Photo Editor', path: '/projects/neosketch', badge: 'Flutter+Rust' },
];

export const Footer: React.FC = () => {
  const { playClick, playHover } = useSound();
  const profile = getProfile();
  const socials = getSocials();

  const handleScrollTop = (e: React.MouseEvent) => {
    e.preventDefault();
    playClick();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const renderSocialIcon = (platform: string) => {
    const p = platform.toLowerCase();
    if (p.includes('github')) return <Github className="w-4 h-4 text-[#c4ff36]" />;
    if (p.includes('play')) return <Smartphone className="w-4 h-4 text-[#10b981]" />;
    if (p.includes('instagram')) return <Instagram className="w-4 h-4 text-[#e1306c]" />;
    if (p.includes('youtube')) return <Youtube className="w-4 h-4 text-[#ef4444]" />;
    if (p.includes('twitter') || p.includes('x')) return <Twitter className="w-4 h-4 text-[#38bdf8]" />;
    if (p.includes('about')) return <User className="w-4 h-4 text-[#a855f7]" />;
    return <ExternalLink className="w-4 h-4 text-[#c4ff36]" />;
  };

  return (
    <footer className="w-full relative z-10 border-t border-white/10 bg-[#07090e]/90 backdrop-blur-2xl pt-14 pb-28 sm:pb-12 px-4 sm:px-6 md:px-10 lg:px-16 mt-20 shadow-[0_-15px_40px_rgba(0,0,0,0.5)]">
      <div className="max-w-[1400px] mx-auto">
        {/* Top 4-Column Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-10 pb-12 border-b border-white/10">
          
          {/* Col 1 — Identity (4 Cols) */}
          <div className="lg:col-span-4 space-y-5">
            <div className="flex items-center gap-3">
              <div className="relative w-10 h-10 rounded-full border-2 border-[#c4ff36] shadow-[0_0_12px_rgba(196,255,54,0.3)] overflow-hidden shrink-0">
                <img
                  src="https://github.com/Tcode-Motion.png"
                  alt="Tanmoy Majumder"
                  className="w-full h-full object-cover"
                  width={40}
                  height={40}
                />
              </div>
              <div>
                <h3 className="font-display font-bold text-base text-white leading-tight">
                  {profile.name}
                </h3>
                <span className="font-code text-xs text-[#c4ff36] block mt-0.5">
                  @{profile.handle}
                </span>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-[#94a3b8] leading-relaxed max-w-sm">
              Official developer portfolio and technical knowledge hub for Tanmoy Majumder. Creator of TechScript (Rust compiler), publisher of KinotiX on Google Play, and builder of open-source software.
            </p>

            <button
              type="button"
              onClick={handleScrollTop}
              onMouseEnter={() => playHover()}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl border border-white/15 bg-white/5 text-xs font-semibold text-white hover:border-[#c4ff36] hover:text-[#c4ff36] hover:bg-white/10 transition-all shadow-md active:scale-95"
            >
              <ArrowUp className="w-3.5 h-3.5" />
              <span>Back to Top</span>
            </button>
          </div>

          {/* Col 2 — Knowledge Hub Routes (2 Cols) */}
          <div className="lg:col-span-2 space-y-4">
            <h4 className="font-code text-xs text-[#c4ff36] tracking-wider uppercase font-semibold">
              Knowledge Hub
            </h4>
            <ul className="space-y-2.5 text-xs sm:text-sm">
              {SITE_PAGES.map((page) => (
                <li key={page.path}>
                  <Link
                    to={page.path}
                    onClick={() => playClick()}
                    onMouseEnter={() => playHover()}
                    className="text-[#94a3b8] hover:text-white transition-colors inline-block hover:translate-x-1 duration-150"
                  >
                    {page.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3 — Flagship Works (3 Cols - Spacious, NO truncation) */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="font-code text-xs text-[#c4ff36] tracking-wider uppercase font-semibold">
              Flagship Products
            </h4>
            <ul className="space-y-2 text-xs sm:text-sm">
              {HIGHLIGHTED_PRODUCTS.map((prod) => (
                <li key={prod.path}>
                  <Link
                    to={prod.path}
                    onClick={() => playClick()}
                    onMouseEnter={() => playHover()}
                    className="flex items-center justify-between gap-3 p-2 rounded-xl hover:bg-white/5 border border-transparent hover:border-white/10 text-[#94a3b8] hover:text-white transition-all group"
                  >
                    <span className="font-medium text-white group-hover:text-[#c4ff36] transition-colors whitespace-nowrap">
                      {prod.label}
                    </span>
                    <span className="shrink-0 text-[10px] font-code px-2 py-0.5 rounded-full bg-white/5 border border-white/10 text-[#c4ff36] whitespace-nowrap">
                      {prod.badge}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 4 — Verified Profiles (3 Cols) */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="font-code text-xs text-[#c4ff36] tracking-wider uppercase font-semibold">
              Verified Profiles
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-2">
              {socials.filter(s => s.platform !== 'Email').slice(0, 7).map((s) => (
                <a
                  key={s.platform}
                  href={s.url}
                  target="_blank"
                  rel={s.rel || 'noopener noreferrer'}
                  onClick={() => playClick()}
                  onMouseEnter={() => playHover()}
                  className="flex items-center gap-2.5 p-2 rounded-xl bg-[#0c1222]/60 border border-white/10 hover:border-[#c4ff36]/60 transition-all text-white text-xs group"
                >
                  <div className="p-1 rounded-lg bg-black/40 border border-white/10 shrink-0 group-hover:scale-105 transition-transform">
                    {renderSocialIcon(s.platform)}
                  </div>
                  <div className="flex flex-col min-w-0">
                    <span className="font-medium text-white group-hover:text-[#c4ff36] transition-colors truncate leading-tight">
                      {s.platform}
                    </span>
                    <span className="text-[10px] text-[#64748b] font-code truncate leading-tight mt-0.5">
                      {s.username}
                    </span>
                  </div>
                </a>
              ))}
            </div>
          </div>

        </div>

        {/* Bottom Metadata Bar */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs">
          <div className="text-[#94a3b8] font-code text-center md:text-left">
            © {new Date().getFullYear()} <span className="text-white font-semibold">{profile.name}</span> (Tcode-Motion). First-party verified developer portal.
          </div>

          <div className="text-[#64748b] font-code text-[11px] bg-white/5 px-3 py-1 rounded-full border border-white/10">
            Kolkata, West Bengal, India
          </div>

          <div className="flex items-center gap-2 text-xs text-[#c4ff36] font-code">
            <span className="w-2 h-2 rounded-full bg-[#c4ff36] animate-pulse" />
            <span>Systems Online // 60 FPS</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
