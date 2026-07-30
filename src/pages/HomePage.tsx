import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { SeoHead } from '@/core/seo/SeoHead';
import { HeroModule } from '@/modules/hero/HeroModule';
import { ProjectsModule } from '@/modules/projects/ProjectsModule';
import { TechScriptPlayground } from '@/modules/techscript/TechScriptPlayground';
import { SkillConstellationModule } from '@/modules/skills/SkillConstellationModule';
import { GithubEngineModule } from '@/modules/github/GithubEngineModule';
import { AboutModule } from '@/modules/about/AboutModule';
import { ContactModule } from '@/modules/contact/ContactModule';
import { InfiniteMarquee } from '@/primitives/InfiniteMarquee';
import { ArrowRight } from 'lucide-react';

// Editorial divider section with CTA
const SectionCTA: React.FC<{ href: string; label: string }> = ({ href, label }) => (
  <div className="py-8 border-t border-white/5">
    <div className="max-w-[1300px] mx-auto px-6 sm:px-10 lg:px-16">
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="flex items-center justify-between"
      >
        <span className="font-code text-xs text-content-tertiary tracking-widest uppercase">
          {label}
        </span>
        <Link
          to={href}
          className="inline-flex items-center gap-2 font-body text-sm text-content-secondary hover:text-content-primary group transition-colors"
        >
          <span>View more</span>
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </Link>
      </motion.div>
    </div>
  </div>
);

export const HomePage: React.FC = () => {
  return (
    <>
      <SeoHead
        title="Tanmoy Majumder — Software Engineer, TechScript Creator & Open Source Developer"
        description="Official portfolio of Tanmoy Majumder (Tcode-Motion) — Rust developer, creator of the TechScript programming language, AI developer, full-stack engineer, and open source builder from West Bengal, India."
        slug="/"
        jsonLd={[
          {
            '@context': 'https://schema.org',
            '@type': 'Person',
            '@id': 'https://tanmoy.is-a.dev/#person',
            name: 'Tanmoy Majumder',
            alternateName: ['Tcode-Motion', 'Tanmoy', 'Tanmoy Developer'],
            url: 'https://tanmoy.is-a.dev',
            image: 'https://github.com/Tcode-Motion.png',
            email: 'tcodemotion@gmail.com',
            jobTitle: 'Software Engineer & TechScript Language Creator',
            description: 'Rust developer, creator of TechScript programming language, open source engineer, AI developer, and full-stack software engineer from West Bengal, India.',
            knowsAbout: ['Rust', 'TechScript', 'Compiler Design', 'AI Development', 'React', 'TypeScript', 'Systems Programming', 'Open Source'],
            nationality: { '@type': 'Country', name: 'India' },
            address: { '@type': 'PostalAddress', addressRegion: 'West Bengal', addressCountry: 'IN' },
            sameAs: [
              'https://github.com/Tcode-Motion',
              'https://x.com/TanmoyMaju40558',
              'https://youtube.com/@tcodemotin',
            ],
            mainEntityOfPage: { '@type': 'WebPage', '@id': 'https://tanmoy.is-a.dev/' },
          },
          {
            '@context': 'https://schema.org',
            '@type': 'ProfilePage',
            '@id': 'https://tanmoy.is-a.dev/#profilepage',
            name: 'Tanmoy Majumder — Developer Portfolio',
            url: 'https://tanmoy.is-a.dev/',
            about: { '@id': 'https://tanmoy.is-a.dev/#person' },
          },
        ]}
      />

      {/* ── HERO ── */}
      <HeroModule />

      {/* ── FEATURED PROJECTS ── */}
      <ProjectsModule />
      <SectionCTA href="/projects" label="// selected works" />

      {/* ── SKILLS ── */}
      <SkillConstellationModule />

      {/* ── TECHSCRIPT PLAYGROUND ── */}
      <TechScriptPlayground />
      <SectionCTA href="/techscript" label="// techscript language" />

      {/* ── GITHUB ENGINE ── */}
      <GithubEngineModule />

      {/* ── ABOUT ── */}
      <AboutModule />
      <SectionCTA href="/about" label="// about & philosophy" />

      {/* ── CONTACT ── */}
      <ContactModule />

      {/* ── CLOSING MARQUEE ── */}
      <div className="py-6 border-t border-white/5 overflow-hidden">
        <InfiniteMarquee
          text="AVAILABLE FOR WORK  ·  OPEN TO COLLABORATION  ·  SOFTWARE ENGINEERING  ·  COMPILER DESIGN  ·  AI DEVELOPMENT  ·  MOBILE APPS  ·  "
          className="font-code text-[10px] text-content-tertiary tracking-widest"
          speed="slow"
          reverse
        />
      </div>
    </>
  );
};
