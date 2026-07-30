import React from 'react';
import { GlassPanel } from '@/primitives/GlassPanel';
import { Github, Sparkles, Layout, Box, Server } from 'lucide-react';
import type { ProjectData } from '@/core/content/types';

interface SecondaryGridProps {
  projects: ProjectData[];
}

export const SecondaryProjectsGrid: React.FC<SecondaryGridProps> = ({ projects }) => {
  const getIcon = (id: string) => {
    switch (id) {
      case 'nutrilens-ai': return <Sparkles className="w-4 h-4 text-accent-cyan" />;
      case 'armenu-ai': return <Box className="w-4 h-4 text-accent-purple" />;
      case 'wallvault': return <Layout className="w-4 h-4 text-accent-indigo" />;
      default: return <Server className="w-4 h-4 text-accent-cyan" />;
    }
  };

  return (
    <div className="space-y-6 pt-12">
      <div className="flex items-center justify-between border-b border-border-subtle pb-4">
        <h3 className="font-display font-bold text-2xl text-content-primary">
          More Innovation & Product Engineering
        </h3>
        <span className="font-code text-xs text-content-tertiary">
          // Additional Open Source Repositories
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {projects.map((project) => (
          <GlassPanel
            key={project.id}
            glow
            className="flex flex-col justify-between space-y-4 border-border-subtle hover:border-accent-cyan/40 transition-all"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="p-2 rounded-lg bg-surface-raised border border-border-subtle">
                  {getIcon(project.id)}
                </div>
                <span className="font-code text-[10px] text-accent-cyan px-2 py-0.5 rounded bg-accent-cyan/10">
                  {project.category}
                </span>
              </div>

              <h4 className="font-display font-bold text-lg text-content-primary">
                {project.title}
              </h4>

              <p className="font-body text-xs text-content-secondary leading-relaxed">
                {project.tagline}
              </p>
            </div>

            <div className="space-y-3 pt-3 border-t border-border-subtle">
              <div className="flex flex-wrap gap-1">
                {project.techStack.map((tech) => (
                  <span
                    key={tech}
                    className="px-2 py-0.5 rounded bg-surface-base font-code text-[10px] text-content-tertiary"
                  >
                    {tech}
                  </span>
                ))}
              </div>

              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 font-code text-xs text-accent-indigo hover:text-indigo-400 transition-colors pt-1"
              >
                <Github className="w-3.5 h-3.5" />
                <span>View Code</span>
              </a>
            </div>
          </GlassPanel>
        ))}
      </div>
    </div>
  );
};
