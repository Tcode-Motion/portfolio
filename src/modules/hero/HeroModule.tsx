import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight, Github, Smartphone, Sparkles, Code2 } from 'lucide-react';
import { useSound } from '@/core/audio/SoundManager';
import { getProfile, getGithubSnapshot } from '@/core/content/contentLoader';

export const HeroModule: React.FC = () => {
  const profile = getProfile();
  const gh = getGithubSnapshot();
  const { playClick, playHover } = useSound();

  const badges = [
    { label: 'Creator of TechScript 2.0', icon: Code2, path: '/techscript' },
    { label: 'KinotiX on Google Play', icon: Smartphone, path: '/apps/kinotix' },
    { label: 'Satvora AI Health Scanner', icon: Sparkles, path: '/apps/satvora-ai' },
    { label: `${gh.publicRepoCount} Public Repositories`, icon: Github, path: 'https://github.com/Tcode-Motion', external: true },
  ];

  return (
    <section id="hero" className="relative min-h-[90vh] flex flex-col justify-center pt-28 pb-16 overflow-hidden">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 md:px-10 lg:px-16 w-full relative z-10">
        
        {/* Editorial Sub-header Badge */}
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#c4ff36]/10 border border-[#c4ff36]/25 mb-8">
          <span className="w-2 h-2 rounded-full bg-[#c4ff36] animate-pulse" />
          <span className="font-code text-xs text-[#c4ff36] font-semibold tracking-wider uppercase">
            Official Developer Portfolio &amp; Knowledge Base
          </span>
        </div>

        {/* Identity & Headline */}
        <div className="max-w-4xl space-y-6">
          <div className="space-y-2">
            <div className="flex flex-wrap items-center gap-3 text-sm font-code text-[#94a3b8]">
              <span className="text-white font-semibold">{profile.name}</span>
              <span className="text-[#64748b]">/</span>
              <span className="text-[#c4ff36]">@{profile.handle}</span>
              <span className="text-[#64748b]">·</span>
              <span>{profile.location}</span>
            </div>

            <h1 className="font-display font-extrabold text-4xl sm:text-6xl md:text-7xl lg:text-[5.25rem] tracking-[-0.035em] text-white leading-[1.05]">
              Coder, AI App Builder <br className="hidden sm:inline" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#c4ff36] via-[#38bdf8] to-[#a855f7]">
                &amp; Systems Creator.
              </span>
            </h1>
          </div>

          <p className="font-body text-base sm:text-xl text-[#94a3b8] max-w-2xl leading-relaxed">
            I engineer programming languages, native Android applications, and technical developer software from scratch. Creator of <strong className="text-white font-semibold">TechScript</strong> in Rust and publisher of <strong className="text-white font-semibold">KinotiX</strong> on Google Play.
          </p>

          {/* Primary Action Row */}
          <div className="flex flex-wrap items-center gap-4 pt-4">
            <Link
              to="/projects"
              onClick={() => playClick()}
              onMouseEnter={() => playHover()}
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-[#c4ff36] text-[#07090e] font-display font-bold text-sm hover:shadow-[0_0_25px_rgba(196,255,54,0.4)] transition-all active:scale-95 shadow-md"
            >
              <span>Explore Projects</span>
              <ArrowUpRight className="w-4 h-4" />
            </Link>

            <Link
              to="/apps"
              onClick={() => playClick()}
              onMouseEnter={() => playHover()}
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl border border-white/15 bg-[#0d1627]/60 text-white font-display font-semibold text-sm hover:border-[#c4ff36] hover:text-[#c4ff36] transition-all backdrop-blur-md active:scale-95 shadow-sm"
            >
              <Smartphone className="w-4 h-4 text-[#06b6d4]" />
              <span>Android Applications</span>
            </Link>

            <a
              href="https://github.com/Tcode-Motion"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => playClick()}
              onMouseEnter={() => playHover()}
              className="inline-flex items-center gap-2 px-5 py-3.5 rounded-xl border border-white/10 bg-[#0d1627]/40 text-[#94a3b8] font-code text-xs hover:text-white hover:border-white/30 transition-all active:scale-95"
            >
              <Github className="w-4 h-4 text-white" />
              <span>GitHub (@Tcode-Motion)</span>
            </a>
          </div>

          {/* Authentic Activity Badges */}
          <div className="pt-8 border-t border-white/10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {badges.map((b) => {
              const Icon = b.icon;
              const content = (
                <div className="flex items-center gap-2.5 p-3 rounded-xl border border-white/10 bg-[#0d1627]/40 backdrop-blur-md hover:border-[#c4ff36]/50 transition-all group">
                  <div className="p-1.5 rounded-lg bg-white/5 text-[#c4ff36] group-hover:scale-110 transition-transform">
                    <Icon className="w-3.5 h-3.5" />
                  </div>
                  <span className="font-code text-xs text-[#94a3b8] group-hover:text-white transition-colors truncate">
                    {b.label}
                  </span>
                </div>
              );

              if (b.external) {
                return (
                  <a
                    key={b.label}
                    href={b.path}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="focus:outline-none focus-visible:ring-1 focus-visible:ring-[#c4ff36] rounded-xl"
                  >
                    {content}
                  </a>
                );
              }

              return (
                <Link
                  key={b.label}
                  to={b.path}
                  onClick={() => playClick()}
                  className="focus:outline-none focus-visible:ring-1 focus-visible:ring-[#c4ff36] rounded-xl"
                >
                  {content}
                </Link>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
};
