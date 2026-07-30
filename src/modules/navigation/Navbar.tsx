import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion } from 'framer-motion';
import { useSound } from '@/core/audio/SoundManager';
import { useScrollContext } from '@/core/scroll/ScrollContext';
import { MobileMenu } from './MobileMenu';

const NAV_LINKS = [
  { label: 'Home', href: '#home' },
  { label: 'Work', href: '#work' },
  { label: 'Skills', href: '#skills' },
  { label: 'TechScript', href: '#techscript' },
  { label: 'About', href: '#about' },
];

const SECTION_IDS = ['home', 'work', 'skills', 'techscript', 'about', 'contact'];

export const Navbar: React.FC = () => {
  const { playClick, playHover } = useSound();
  const { lenis } = useScrollContext();

  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  const linksContainerRef = useRef<HTMLDivElement>(null);
  const pillRef = useRef<HTMLDivElement>(null);
  const linkRefs = useRef<Map<string, HTMLAnchorElement>>(new Map());
  const [spotlight, setSpotlight] = useState({ x: 0, y: 0, active: false });

  // ─── Scroll hide/show ───
  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 40);
      setHidden(y > lastScrollY && y > 300);
      setLastScrollY(y);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [lastScrollY]);

  // ─── Active section tracking (delayed to handle async rendering) ───
  useEffect(() => {
    const observers: IntersectionObserver[] = [];

    const observe = () => {
      SECTION_IDS.forEach((id) => {
        const el = document.getElementById(id);
        if (!el) return;

        const observer = new IntersectionObserver(
          ([entry]) => {
            if (entry.isIntersecting) {
              setActiveSection(id);
            }
          },
          {
            threshold: 0,
            rootMargin: '-80px 0px -50% 0px',
          }
        );

        observer.observe(el);
        observers.push(observer);
      });
    };

    // Run immediately + retry after short delays to catch dynamically rendered sections
    observe();
    const t1 = setTimeout(observe, 500);
    const t2 = setTimeout(observe, 2000);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      observers.forEach((o) => o.disconnect());
    };
  }, []);

  // ─── Pill positioning ───
  useEffect(() => {
    const linkEl = linkRefs.current.get(activeSection);
    const container = linksContainerRef.current;
    const pill = pillRef.current;
    if (!linkEl || !container || !pill) return;

    const containerRect = container.getBoundingClientRect();
    const linkRect = linkEl.getBoundingClientRect();

    pill.style.left = `${linkRect.left - containerRect.left}px`;
    pill.style.width = `${linkRect.width}px`;
    pill.style.opacity = '1';
  }, [activeSection, scrolled]);

  // ─── Navigation click handler ───
  // Use a ref to always have the latest lenis instance
  const lenisRef = useRef(lenis);
  lenisRef.current = lenis;

  const handleSpotlightMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setSpotlight({ x: e.clientX - rect.left, y: e.clientY - rect.top, active: true });
  }, []);

  const handleClick = useCallback((e: React.MouseEvent<HTMLAnchorElement> | React.MouseEvent, href: string) => {
    e.preventDefault();
    playClick();
    if (href === '#home' || href === '#') {
      lenisRef.current?.scrollTo(0, { offset: 0, duration: 1.5 });
    } else {
      lenisRef.current?.scrollTo(href, { offset: -60, duration: 1.5 });
    }
  }, [playClick]);

  return (
    <>
      <motion.nav
        className="fixed top-0 left-0 right-0 z-50 py-3 transition-all duration-500"
        initial={false}
        animate={{ y: hidden ? -100 : 0 }}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className="relative max-w-[1400px] mx-auto px-4 sm:px-6 md:px-10">
          <div
            className={`flex items-center justify-between h-14 px-5 rounded-full transition-all duration-500 ${
              scrolled
                ? 'nav-glass-capsule'
                : 'bg-transparent border border-transparent'
            }`}
          >
            {/* ─── Left: Avatar ─── */}
            <a
              href="#"
              className="flex items-center gap-3 magnetic-btn group"
              onClick={(e) => {
                e.preventDefault();
                lenisRef.current?.scrollTo(0, { offset: 0, duration: 1.5 });
                playClick();
              }}
              onMouseEnter={() => playHover()}
            >
              <img
                src="https://github.com/Tcode-Motion.png"
                alt="Tanmoy Majumder"
                className="w-8 h-8 rounded-full border border-white/20 group-hover:border-[#c4ff36] transition-colors shadow-sm"
              />
              <span className="font-code font-bold text-xs text-white tracking-wider hidden sm:inline-block">
                Tanmoy Majumder
              </span>
            </a>

            {/* ─── Center: Nav Links + Pill (desktop) ─── */}
            <div
              ref={linksContainerRef}
              onMouseMove={handleSpotlightMove}
              onMouseLeave={() => setSpotlight((s) => ({ ...s, active: false }))}
              className="hidden md:flex items-center relative p-1 rounded-full bg-[#080d1a]/50 border border-white/10 backdrop-blur-md"
            >
              {/* Spotlight glow */}
              <div
                className="pointer-events-none absolute inset-0 rounded-full transition-opacity duration-300 z-0"
                style={{
                  opacity: spotlight.active ? 1 : 0,
                  background: `radial-gradient(120px circle at ${spotlight.x}px ${spotlight.y}px, rgba(196,255,54,0.12), transparent 70%)`,
                }}
              />
              {NAV_LINKS.map((link) => {
                const sectionId = link.href.replace('#', '');
                const isActive = activeSection === sectionId;

                return (
                  <a
                    key={link.href}
                    href={link.href}
                    ref={(el) => {
                      if (el) linkRefs.current.set(sectionId, el);
                    }}
                    onClick={(e) => handleClick(e, link.href)}
                    onMouseEnter={(e) => {
                      playHover();
                      const r = e.currentTarget.getBoundingClientRect();
                      const container = linksContainerRef.current?.getBoundingClientRect();
                      if (container) {
                        setSpotlight({ x: r.left - container.left + r.width / 2, y: r.top - container.top + r.height / 2, active: true });
                      }
                    }}
                    className={`relative px-4 py-1.5 text-xs font-code font-bold transition-all duration-300 magnetic-btn z-10 ${
                      isActive
                        ? 'text-[#c4ff36]'
                        : 'text-[#94a3b8] hover:text-white'
                    }`}
                  >
                    {link.label}
                  </a>
                );
              })}

              {/* Animated active pill background */}
              <div
                ref={pillRef}
                className="absolute top-1/2 -translate-y-1/2 h-7 rounded-full border border-[#c4ff36]/40 bg-[#c4ff36]/10 shadow-[0_0_12px_rgba(196,255,54,0.2)] transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]"
                style={{
                  zIndex: 0,
                  left: 0,
                  width: 0,
                  opacity: 0,
                }}
              />
            </div>

            {/* ─── Right: Nav actions ─── */}
            <div className="flex items-center gap-3">
              {/* Contact CTA */}
              <a
                href="#contact"
                onClick={(e) => handleClick(e, '#contact')}
                onMouseEnter={() => playHover()}
                className="hidden sm:flex items-center gap-1.5 px-4 h-8 text-xs font-code font-bold bg-[#c4ff36] text-black rounded-full hover:shadow-[0_0_20px_rgba(196,255,54,0.3)] hover:scale-105 transition-all duration-300 magnetic-btn"
              >
                Let's Talk
              </a>

              {/* Mobile hamburger */}
              <button
                className="md:hidden flex flex-col justify-center items-center w-9 h-9 gap-1.5 rounded-full border border-white/10 bg-[#0d1527]/60 text-white magnetic-btn"
                onClick={() => { playClick(); setMenuOpen(!menuOpen); }}
                aria-label="Toggle menu"
              >
                <motion.span
                  className="block w-4 h-0.5 bg-white origin-center"
                  animate={menuOpen ? { rotate: 45, y: 3.5 } : { rotate: 0, y: 0 }}
                  transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                />
                <motion.span
                  className="block w-4 h-0.5 bg-white"
                  animate={menuOpen ? { opacity: 0, scaleX: 0 } : { opacity: 1, scaleX: 1 }}
                  transition={{ duration: 0.2 }}
                />
                <motion.span
                  className="block w-4 h-0.5 bg-white origin-center"
                  animate={menuOpen ? { rotate: -45, y: -3.5 } : { rotate: 0, y: 0 }}
                  transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                />
              </button>
            </div>
          </div>
        </div>
      </motion.nav>

      <MobileMenu
        isOpen={menuOpen}
        onClose={() => setMenuOpen(false)}
        onNavigate={handleClick}
      />
    </>
  );
};
