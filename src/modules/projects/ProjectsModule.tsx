import React, { useRef, useState } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { FadeIn } from '@/primitives/FadeIn';
import { useSound } from '@/core/audio/SoundManager';
import { CaseStudyModal } from './CaseStudyModal';
import { OrbitalProjectCarousel } from './OrbitalProjectCarousel';
import type { ProjectData } from '@/core/content/types';

const GITHUB_USER = 'Tcode-Motion';

export const ProjectsModule: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { playClick } = useSound();
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start end', 'end start'] });
  const y = useTransform(scrollYProgress, [0, 1], [60, -60]);

  const [selectedProject, setSelectedProject] = useState<ProjectData | null>(null);

  return (
    <>
      <section ref={sectionRef} id="work" className="relative py-20 sm:py-28 overflow-hidden">
        {/* Header */}
        <div className="max-w-[1400px] mx-auto px-6 sm:px-8 md:px-12 lg:px-20 mb-8">
          <FadeIn>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-px bg-[var(--accent-lime)]" />
              <span className="section-label text-[var(--accent-lime)]">Selected Projects</span>
            </div>
          </FadeIn>

          <motion.div style={{ y }}>
            <FadeIn delay={0.1}>
              <h2 className="font-display text-4xl sm:text-5xl md:text-6xl tracking-heading leading-heading">
                Selected<br />
                <span className="text-gradient-lime">Work</span>
              </h2>
            </FadeIn>
          </motion.div>
        </div>

        {/* 3D Orbital Project Carousel (Cards physically orbit around the 3D globe) */}
        <OrbitalProjectCarousel onSelectProject={setSelectedProject} />

        {/* CTA */}
        <FadeIn delay={0.3}>
          <div className="max-w-[1400px] mx-auto px-6 sm:px-8 md:px-12 lg:px-20 mt-12 text-center">
            <a
              href={`https://github.com/${GITHUB_USER}`}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => playClick()}
              className="inline-flex items-center gap-2 px-6 py-3 text-sm font-medium rounded-full border border-[var(--border)] text-[var(--text-2)] hover:border-[var(--accent-lime)] hover:text-[var(--accent-lime)] transition-all magnetic-btn"
            >
              View All on GitHub
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </a>
          </div>
        </FadeIn>
      </section>

      {/* Case Study Modal */}
      <AnimatePresence>
        {selectedProject && (
          <CaseStudyModal project={selectedProject} onClose={() => setSelectedProject(null)} />
        )}
      </AnimatePresence>
    </>
  );
};
