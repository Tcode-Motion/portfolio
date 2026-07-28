import React from 'react';
import { BrandLogo } from './BrandLogo';
import { useScrollContext } from '@/core/scroll/ScrollContext';
import { getProfile, getSocials } from '@/core/content/contentLoader';

export const Footer: React.FC = () => {
  const { lenis } = useScrollContext();
  const profile = getProfile();
  const socials = getSocials();

  return (
    <footer className="border-t border-[var(--border)] py-10 px-6 sm:px-8 md:px-12 lg:px-20">
      <div className="max-w-[1400px] mx-auto">
        {/* Top row */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 mb-8">
          <a
            href="#"
            className="magnetic-btn flex items-center gap-2.5"
            onClick={(e) => { e.preventDefault(); lenis?.scrollTo(0, { duration: 1.5 }); }}
          >
            <BrandLogo />
            <span className="text-xs font-code text-[var(--text-3)]">{profile.handle}</span>
          </a>

          <div className="flex items-center gap-6">
            {socials.map((s) => (
              <a
                key={s.platform}
                href={s.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs font-code text-[var(--text-3)] hover:text-[var(--text-1)] transition-colors magnetic-btn"
              >
                {s.platform}
              </a>
            ))}
          </div>
        </div>

        {/* Bottom row */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pt-6 border-t border-[var(--border)]">
          <span className="section-label text-[var(--text-3)]">
            © {new Date().getFullYear()} {profile.name}
          </span>
          <span className="section-label text-[var(--text-3)] opacity-50">
            Built with React · Three.js · GSAP · Lenis
          </span>
        </div>
      </div>
    </footer>
  );
};
