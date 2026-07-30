import React from 'react';
import { SeoHead } from '@/core/seo/SeoHead';
import { AboutModule } from '@/modules/about/AboutModule';
import { SkillConstellationModule } from '@/modules/skills/SkillConstellationModule';

export const AboutPage: React.FC = () => {
  return (
    <>
      <SeoHead
        title="About Tanmoy Majumder — Rust Developer, Compiler Engineer & Open Source Builder"
        description="Tanmoy Majumder (Tcode-Motion) is a self-taught software engineer from West Bengal, India specializing in Rust systems programming, compiler design, AI development, and open source software. Creator of TechScript."
        slug="about"
        breadcrumbs={[{ name: 'About', item: 'https://tanmoy.is-a.dev/about' }]}
        jsonLd={[
          {
            '@context': 'https://schema.org',
            '@type': 'AboutPage',
            '@id': 'https://tanmoy.is-a.dev/about#page',
            name: 'About Tanmoy Majumder',
            description: 'Engineering philosophy, skills, and background of Tanmoy Majumder — Rust developer, TechScript creator, and open source engineer.',
            url: 'https://tanmoy.is-a.dev/about',
            about: { '@id': 'https://tanmoy.is-a.dev/#person' },
          },
        ]}
      />
      <div className="pt-20 bg-[#090a0f]">
        <AboutModule />
        <SkillConstellationModule />
      </div>
    </>
  );
};
