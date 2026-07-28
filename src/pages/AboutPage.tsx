import React from 'react';
import { SeoHead } from '@/core/seo/SeoHead';
import { AboutModule } from '@/modules/about/AboutModule';
import { SkillConstellationModule } from '@/modules/skills/SkillConstellationModule';

export const AboutPage: React.FC = () => {
  return (
    <>
      <SeoHead
        title="About & Engineering Philosophy"
        description="Learn about Tanmoy Majumder's background in software engineering, AI systems, mobile applications, and compiler design."
        slug="/about"
      />
      <div className="pt-20 bg-[#090a0f]">
        <AboutModule />
        <SkillConstellationModule />
      </div>
    </>
  );
};
