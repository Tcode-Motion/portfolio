import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useSound } from '@/core/audio/SoundManager';
import { MobileMenu } from './MobileMenu';
import {
  Home,
  Code2,
  Smartphone,
  Terminal,
  Layers,
  GitBranch,
  User,
  Send,
  Menu,
  X,
  ArrowUpRight,
} from 'lucide-react';
import { getProfile } from '@/core/content/contentLoader';

const NAV_ITEMS = [
  { label: 'Home', path: '/', icon: Home },
  { label: 'Projects', path: '/projects', icon: Code2 },
  { label: 'Apps', path: '/apps', icon: Smartphone },
  { label: 'TechScript', path: '/techscript', icon: Terminal },
  { label: 'Workflow', path: '/workflow', icon: Layers },
  { label: 'Journey', path: '/journey', icon: GitBranch },
  { label: 'About', path: '/about', icon: User },
];

const DRAWER_ITEMS = [
  ...NAV_ITEMS,
  { label: 'Connect & Contact', path: '/connect', icon: Send },
];

export const Navbar: React.FC<{ onOpenCli?: () => void }> = ({ onOpenCli }) => {
  const { playClick, playHover } = useSound();
  const location = useLocation();
  const profile = getProfile();
  const [menuOpen, setMenuOpen] = useState(false);

  const isCurrent = (path: string) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname.startsWith(path);
  };

  const isNotHome = location.pathname !== '/';

  return (
    <>
      {/* ─────────────────────────────────────────────────────────────
          1. DESKTOP FLOATING LIQUID GLASS DOCK (md:flex)
          macOS / iOS Liquid Glass Specular Bevel Dock
      ───────────────────────────────────────────────────────────── */}
      <header
        className="fixed top-3 left-1/2 -translate-x-1/2 z-50 hidden md:flex items-center gap-1 lg:gap-1.5 px-3 py-1.5 rounded-full max-w-[95vw] shadow-2xl transition-all select-none"
        style={{
          background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.08) 0%, rgba(10, 15, 29, 0.82) 30%, rgba(6, 9, 18, 0.92) 100%)',
          backdropFilter: 'blur(32px) saturate(190%)',
          WebkitBackdropFilter: 'blur(32px) saturate(190%)',
          border: '1px solid rgba(255, 255, 255, 0.14)',
          boxShadow: 'inset 0 1px 1.5px 0 rgba(255, 255, 255, 0.35), inset 0 -1px 1px 0 rgba(0, 0, 0, 0.4), 0 20px 50px -10px rgba(0, 0, 0, 0.75), 0 0 25px -5px rgba(196, 255, 54, 0.08)',
        }}
      >
        {/* Brand Anchor Capsule */}
        <Link
          to="/"
          onClick={() => playClick()}
          onMouseEnter={() => playHover()}
          className="flex items-center gap-2 pl-1 pr-2.5 py-1 rounded-full hover:bg-white/[0.08] transition-all group shrink-0"
        >
          <div className="relative w-7 h-7 rounded-full overflow-hidden border border-[#c4ff36]/60 shadow-[0_0_12px_rgba(196,255,54,0.35)] group-hover:scale-105 transition-transform shrink-0">
            <img
              src="https://github.com/Tcode-Motion.png"
              alt="Tanmoy Majumder"
              className="w-full h-full object-cover"
              width={28}
              height={28}
            />
          </div>
          <div className="flex flex-col">
            <span className="font-display font-semibold text-[13px] tracking-tight text-white group-hover:text-[#c4ff36] transition-colors leading-none">
              {profile.name}
            </span>
            <span className="font-code text-[9px] text-[#c4ff36] tracking-wider leading-none mt-0.5">
              @{profile.handle}
            </span>
          </div>
        </Link>

        {/* Specular Glass Divider */}
        <div className="h-4 w-[1px] bg-white/15 mx-0.5 shrink-0" />

        {/* Liquid Dock Nav Items */}
        <nav className="flex items-center gap-0.5 lg:gap-1">
          {NAV_ITEMS.map((item) => {
            const active = isCurrent(item.path);
            const Icon = item.icon;
            const isHomeItem = item.path === '/';

            return (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => playClick()}
                onMouseEnter={() => playHover()}
                className={`flex items-center gap-1.5 px-2.5 py-1.5 lg:px-3 rounded-full text-xs lg:text-[13px] font-display font-medium tracking-tight transition-all duration-200 active:scale-95 shrink-0 ${
                  active
                    ? 'bg-gradient-to-r from-[#c4ff36] to-[#b4f826] text-[#07090e] shadow-[0_0_20px_rgba(196,255,54,0.45)] font-bold'
                    : isHomeItem && isNotHome
                    ? 'text-white bg-[#c4ff36]/15 hover:bg-[#c4ff36]/25 hover:text-[#c4ff36] border border-[#c4ff36]/30'
                    : 'text-white/75 hover:text-white hover:bg-white/[0.08] hover:scale-105'
                }`}
                title={item.label}
              >
                <Icon className={`w-3.5 h-3.5 ${active ? 'text-[#07090e]' : isHomeItem && isNotHome ? 'text-[#c4ff36]' : 'text-current'}`} />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>

        {/* Specular Glass Divider */}
        <div className="h-4 w-[1px] bg-white/15 mx-0.5 shrink-0" />

        {/* CLI Terminal Launcher */}
        {onOpenCli && (
          <button
            type="button"
            onClick={() => {
              playClick();
              onOpenCli();
            }}
            className="p-1.5 rounded-full text-white/70 hover:text-[#c4ff36] hover:bg-white/[0.08] hover:scale-105 transition-all active:scale-95 shrink-0"
            title="Open Developer Terminal (Ctrl+K or `)"
            aria-label="Developer Terminal"
          >
            <Terminal className="w-3.5 h-3.5 text-[#c4ff36]" />
          </button>
        )}

        {/* Contact CTA Action Pill */}
        <Link
          to="/connect"
          onClick={() => playClick()}
          onMouseEnter={() => playHover()}
          className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-gradient-to-r from-[#c4ff36] to-[#a3e020] text-[#07090e] font-display text-xs font-bold shadow-[0_0_15px_rgba(196,255,54,0.35)] hover:shadow-[0_0_25px_rgba(196,255,54,0.55)] hover:scale-105 active:scale-95 transition-all shrink-0 ml-0.5"
        >
          <span>Contact</span>
          <ArrowUpRight className="w-3.5 h-3.5 stroke-[2.5]" />
        </Link>
      </header>

      {/* ─────────────────────────────────────────────────────────────
          2. MOBILE TOP APP BAR (md:hidden)
          Clean native header with prominent Home button when not home
      ───────────────────────────────────────────────────────────── */}
      <header
        className="fixed top-0 left-0 right-0 z-40 px-4 py-2.5 flex md:hidden items-center justify-between border-b border-white/10"
        style={{
          background: 'rgba(7, 9, 14, 0.92)',
          backdropFilter: 'blur(24px)',
          WebkitBackdropFilter: 'blur(24px)',
        }}
      >
        {/* Brand */}
        <Link
          to="/"
          onClick={() => playClick()}
          className="flex items-center gap-2.5 active:scale-95 transition-transform"
        >
          <div className="w-7 h-7 rounded-full overflow-hidden border border-[#c4ff36]/60 shadow-[0_0_10px_rgba(196,255,54,0.3)] shrink-0">
            <img
              src="https://github.com/Tcode-Motion.png"
              alt="Tanmoy Majumder"
              className="w-full h-full object-cover"
              width={28}
              height={28}
            />
          </div>
          <div className="flex flex-col">
            <span className="font-display font-semibold text-xs tracking-tight text-white leading-none">
              {profile.name}
            </span>
            <span className="font-code text-[9px] text-[#c4ff36] leading-none mt-0.5">
              @{profile.handle}
            </span>
          </div>
        </Link>

        {/* Right side actions */}
        <div className="flex items-center gap-2">
          {/* Prominent Back-to-Home button whenever NOT on Home page */}
          {isNotHome && (
            <Link
              to="/"
              onClick={() => playClick()}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-gradient-to-r from-[#c4ff36] to-[#b4f826] text-[#07090e] font-display font-bold text-xs shadow-[0_0_14px_rgba(196,255,54,0.4)] active:scale-95 transition-transform"
            >
              <Home className="w-3.5 h-3.5" />
              <span>Home</span>
            </Link>
          )}

          {onOpenCli && (
            <button
              type="button"
              onClick={() => {
                playClick();
                onOpenCli();
              }}
              className="p-1.5 rounded-lg border border-white/10 bg-white/5 text-white/70 hover:text-[#c4ff36]"
              aria-label="Open CLI Terminal"
            >
              <Terminal className="w-4 h-4 text-[#c4ff36]" />
            </button>
          )}
        </div>
      </header>

      {/* ─────────────────────────────────────────────────────────────
          3. MOBILE BOTTOM APP DOCK (md:hidden)
          Proper Native Android / iOS Bottom Navigation Tab Bar with Liquid Glass
      ───────────────────────────────────────────────────────────── */}
      <nav
        className="fixed bottom-3 left-3 right-3 z-50 flex md:hidden items-center justify-around p-1.5 rounded-2xl"
        style={{
          background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.08) 0%, rgba(10, 15, 29, 0.88) 30%, rgba(6, 9, 18, 0.95) 100%)',
          backdropFilter: 'blur(30px) saturate(200%)',
          WebkitBackdropFilter: 'blur(30px) saturate(200%)',
          border: '1px solid rgba(255, 255, 255, 0.14)',
          boxShadow: 'inset 0 1px 1.5px 0 rgba(255, 255, 255, 0.3), 0 16px 40px rgba(0, 0, 0, 0.85)',
          paddingBottom: 'calc(0.375rem + env(safe-area-inset-bottom, 0px))',
        }}
        aria-label="Mobile Navigation"
      >
        {/* Tab 1: Home */}
        <Link
          to="/"
          onClick={() => {
            playClick();
            setMenuOpen(false);
          }}
          className={`flex flex-col items-center justify-center flex-1 py-1 px-1 rounded-xl transition-all ${
            location.pathname === '/'
              ? 'text-[#c4ff36] bg-[#c4ff36]/15 font-bold shadow-[0_0_12px_rgba(196,255,54,0.2)]'
              : 'text-white/60 hover:text-white'
          }`}
        >
          <Home className="w-5 h-5 mb-0.5" />
          <span className="text-[10px] font-code leading-none">Home</span>
        </Link>

        {/* Tab 2: Projects */}
        <Link
          to="/projects"
          onClick={() => {
            playClick();
            setMenuOpen(false);
          }}
          className={`flex flex-col items-center justify-center flex-1 py-1 px-1 rounded-xl transition-all ${
            isCurrent('/projects')
              ? 'text-[#c4ff36] bg-[#c4ff36]/15 font-bold shadow-[0_0_12px_rgba(196,255,54,0.2)]'
              : 'text-white/60 hover:text-white'
          }`}
        >
          <Code2 className="w-5 h-5 mb-0.5" />
          <span className="text-[10px] font-code leading-none">Projects</span>
        </Link>

        {/* Tab 3: Apps */}
        <Link
          to="/apps"
          onClick={() => {
            playClick();
            setMenuOpen(false);
          }}
          className={`flex flex-col items-center justify-center flex-1 py-1 px-1 rounded-xl transition-all ${
            isCurrent('/apps')
              ? 'text-[#c4ff36] bg-[#c4ff36]/15 font-bold shadow-[0_0_12px_rgba(196,255,54,0.2)]'
              : 'text-white/60 hover:text-white'
          }`}
        >
          <Smartphone className="w-5 h-5 mb-0.5" />
          <span className="text-[10px] font-code leading-none">Apps</span>
        </Link>

        {/* Tab 4: TechScript */}
        <Link
          to="/techscript"
          onClick={() => {
            playClick();
            setMenuOpen(false);
          }}
          className={`flex flex-col items-center justify-center flex-1 py-1 px-1 rounded-xl transition-all ${
            isCurrent('/techscript')
              ? 'text-[#c4ff36] bg-[#c4ff36]/15 font-bold shadow-[0_0_12px_rgba(196,255,54,0.2)]'
              : 'text-white/60 hover:text-white'
          }`}
        >
          <Terminal className="w-5 h-5 mb-0.5" />
          <span className="text-[10px] font-code leading-none">TechScript</span>
        </Link>

        {/* Tab 5: More / Menu */}
        <button
          type="button"
          onClick={() => {
            playClick();
            setMenuOpen((prev) => !prev);
          }}
          className={`flex flex-col items-center justify-center flex-1 py-1 px-1 rounded-xl transition-all ${
            menuOpen
              ? 'text-[#c4ff36] bg-[#c4ff36]/15 font-bold shadow-[0_0_12px_rgba(196,255,54,0.2)]'
              : 'text-white/60 hover:text-white'
          }`}
          aria-label={menuOpen ? 'Close Navigation Menu' : 'Open Full Menu'}
        >
          {menuOpen ? <X className="w-5 h-5 mb-0.5" /> : <Menu className="w-5 h-5 mb-0.5" />}
          <span className="text-[10px] font-code leading-none">{menuOpen ? 'Close' : 'More'}</span>
        </button>
      </nav>

      {/* Mobile Drawer Menu */}
      <MobileMenu
        isOpen={menuOpen}
        onClose={() => setMenuOpen(false)}
        navItems={DRAWER_ITEMS}
      />
    </>
  );
};
