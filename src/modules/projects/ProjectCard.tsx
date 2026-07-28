import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Github, ArrowUpRight } from 'lucide-react';
import type { ProjectData } from '@/core/content/types';

const PROJECT_COLORS: Record<string, string> = {
  'techscript': '#c4ff36',
  'aurora-music': '#e8e4df',
  'cloudvault': '#888888',
};

interface ProjectCardProps {
  project: ProjectData;
  index: number;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({ project, index }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ['start end', 'end start'],
  });

  const y = useTransform(scrollYProgress, [0, 1], ['8%', '-8%']);
  const accentColor = PROJECT_COLORS[project.id] ?? '#e8e4df';

  return (
    <div
      ref={cardRef}
      className="group relative w-full min-w-[85vw] md:min-w-[60vw] lg:min-w-[45vw] snap-start"
    >
      {/* Large number watermark */}
      <div
        className="absolute -top-6 -left-4 font-display font-extrabold pointer-events-none select-none z-0 leading-none opacity-[0.03]"
        style={{ fontSize: 'clamp(5rem, 12vw, 14rem)', color: accentColor }}
        aria-hidden="true"
      >
        {String(index + 1).padStart(2, '0')}
      </div>

      <div className="relative z-10 flex flex-col h-full rounded-card border border-[#1e2433] bg-[#090c12]/95 backdrop-blur-xl shadow-2xl overflow-hidden transition-all duration-500 group-hover:border-[var(--accent-lime)]">
        {/* Visual area */}
        <div
          className="relative h-64 md:h-80 overflow-hidden"
          style={{
            background: `linear-gradient(135deg, ${accentColor}15 0%, ${accentColor}08 50%, #090c12 100%)`,
          }}
        >
          {/* Grid overlay */}
          <div
            className="absolute inset-0 opacity-[0.04]"
            style={{
              backgroundImage: `
                linear-gradient(${accentColor}40 1px, transparent 1px),
                linear-gradient(90deg, ${accentColor}40 1px, transparent 1px)
              `,
              backgroundSize: '40px 40px',
            }}
            aria-hidden="true"
          />

          {/* Parallax glow */}
          <motion.div className="absolute inset-0 pointer-events-none" style={{ y }}>
            <div
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 rounded-full blur-3xl opacity-20"
              style={{ background: accentColor }}
            />
          </motion.div>

          {/* Category badge */}
          <div className="absolute top-5 left-5">
            <span
              className="font-code text-micro tracking-widest uppercase px-3 py-1.5 rounded-button border font-semibold"
              style={{ color: accentColor, borderColor: `${accentColor}40`, background: '#090c12' }}
            >
              {project.category}
            </span>
          </div>

          {/* Index number */}
          <div
            className="absolute bottom-5 right-5 font-display font-extrabold opacity-15 select-none"
            style={{ fontSize: '4rem', lineHeight: 1, color: accentColor }}
            aria-hidden="true"
          >
            {String(index + 1).padStart(2, '0')}
          </div>
        </div>

        {/* Content area */}
        <div className="flex flex-col flex-1 p-6 md:p-8 bg-[#090c12]/90">
          <div className="flex-1 space-y-4">
            <h3
              className="font-display font-bold text-white leading-heading tracking-heading group-hover:text-[var(--accent-lime)] transition-colors duration-300"
              style={{ fontSize: 'clamp(1.3rem, 2.2vw, 2rem)' }}
            >
              {project.title}
            </h3>

            <p className="font-body text-body text-[#d1d5db] leading-body max-w-sm">
              {project.tagline}
            </p>

            {project.highlights && (
              <ul className="space-y-1.5 pt-2">
                {project.highlights.slice(0, 3).map((h, i) => (
                  <li key={i} className="flex items-start gap-2 font-code text-xs text-[#e4e4e7]">
                    <span style={{ color: accentColor }}>→</span>
                    <span>{h}</span>
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Tech stack */}
          <div className="flex flex-wrap gap-1.5 pt-5 mt-5 border-t border-border">
            {project.techStack.slice(0, 4).map((tech) => (
              <span
                key={tech}
                className="px-2 py-0.5 rounded-button font-code text-[10px] border border-border text-text-3"
              >
                {tech}
              </span>
            ))}
          </div>

          {/* Actions */}
          <div className="flex items-center gap-3 pt-5">
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 flex items-center justify-center gap-2 py-3 rounded-button border border-border font-body font-medium text-small text-text-2 hover:text-text-1 hover:border-border-hover transition-all duration-300"
            >
              <Github className="w-4 h-4" />
              <span>View Code</span>
              <ArrowUpRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
