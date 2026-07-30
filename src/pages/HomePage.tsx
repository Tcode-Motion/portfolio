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
        title="Software Engineer & TechScript Creator"
        description="Official flagship portfolio of Tanmoy Majumder (Tcode-Motion) — Software Engineer, Creative Developer, Programming Language Creator (TechScript), AI Application Developer, and Open Source Builder."
        jsonLd={{
          '@context': 'https://schema.org',
          '@type': 'Person',
          name: 'Tanmoy Majumder',
          alternateName: 'Tcode-Motion',
          url: 'https://tcode-motion.vercel.app',
          jobTitle: 'Software Engineer & Creative Developer',
          sameAs: [
            'https://github.com/Tcode-Motion',
            'https://x.com/TanmoyMaju40558',
            'https://youtube.com/@tcodemotin',
          ],
        }}
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
