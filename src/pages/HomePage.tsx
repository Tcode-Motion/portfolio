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
        slug=""
        jsonLd={[
          {
            '@context': 'https://schema.org',
            '@type': 'FAQPage',
            mainEntity: [
              {
                '@type': 'Question',
                name: 'Who is Tanmoy Majumder?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Tanmoy Majumder (also known as Tcode-Motion) is an independent software engineer and open source developer from West Bengal, India. He specializes in Rust systems programming, compiler design, AI development, and 3D web experiences. He is the creator of the TechScript programming language.',
                },
              },
              {
                '@type': 'Question',
                name: 'What is TechScript programming language?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'TechScript is a modern, plain-English inspired programming language created by Tanmoy Majumder and built from scratch in Rust. It includes a custom lexer, recursive descent AST parser, bytecode compiler, NaN-boxed stack-based virtual machine, and a Studio IDE.',
                },
              },
              {
                '@type': 'Question',
                name: 'What projects has Tanmoy Majumder built?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Tanmoy Majumder has built TechScript (Rust programming language), NovOS (web-based desktop OS), Aurora-OS.js (web OS game framework), Vortyx (Rust CLI utility), NeoSketch (AI photo editor for Android), and ARC Reactor 3D (Three.js WebGL engine), among other open source projects.',
                },
              },
              {
                '@type': 'Question',
                name: 'How can I hire Tanmoy Majumder?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'You can contact Tanmoy Majumder through his portfolio at https://tanmoy.is-a.dev/contact or via email at tcodemotion@gmail.com. He is available for software engineering roles, open source collaboration, and technical consulting globally.',
                },
              },
            ],
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
