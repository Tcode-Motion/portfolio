import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { SeoHead } from '@/core/seo/SeoHead';
import { getAllProjects } from '@/core/content/contentLoader';
import { Github, ArrowUpRight } from 'lucide-react';

const PROJECT_GRADIENTS: Record<string, string> = {
  'techscript':    'from-violet-500/20 via-indigo-500/10 to-transparent',
  'aurora-music':  'from-cyan-500/20 via-blue-500/10 to-transparent',
  'cloudvault':    'from-indigo-500/20 via-purple-500/10 to-transparent',
  'nutrilens-ai':  'from-emerald-500/20 via-cyan-500/10 to-transparent',
};

const PROJECT_ACCENT: Record<string, string> = {
  'techscript':    '#8b5cf6',
  'aurora-music':  '#06b6d4',
  'cloudvault':    '#6366f1',
  'nutrilens-ai':  '#10b981',
};

export const ProjectsPage: React.FC = () => {
  const projects = getAllProjects();
  const [filter, setFilter] = useState<string>('all');

  const categories = [
    { id: 'all', label: 'All Works' },
    { id: 'compiler', label: 'Compiler & Tools' },
    { id: 'mobile', label: 'Mobile' },
    { id: 'ai', label: 'AI & Web' },
  ];

  const filteredProjects = projects.filter((p) => {
    if (filter === 'all') return true;
    if (filter === 'compiler') return p.category.toLowerCase().includes('compiler') || p.category.toLowerCase().includes('tool');
    if (filter === 'mobile') return p.category.toLowerCase().includes('android') || p.category.toLowerCase().includes('desktop') || p.category.toLowerCase().includes('mobile');
    if (filter === 'ai') return p.category.toLowerCase().includes('ai') || p.category.toLowerCase().includes('web');
    return true;
  });

  return (
    <>
      <SeoHead
        title="Open Source Projects by Tanmoy Majumder — TechScript, Aurora, CloudVault, Vortex CLI & More"
        description="Explore all open source projects by Tanmoy Majumder (Tcode-Motion): TechScript compiler, Aurora Music Player, CloudVault, WallVault, Vortex CLI, NutriLens AI, and more software engineering case studies."
        slug="projects"
        breadcrumbs={[{ name: 'Projects', item: 'https://tanmoy.is-a.dev/projects' }]}
        jsonLd={[
          {
            '@context': 'https://schema.org',
            '@type': 'CollectionPage',
            '@id': 'https://tanmoy.is-a.dev/projects#collection',
            name: 'Open Source Projects by Tanmoy Majumder',
            description: 'Explore all open source software projects by Tanmoy Majumder — compiler design, AI applications, mobile apps, and developer tools.',
            url: 'https://tanmoy.is-a.dev/projects',
            author: { '@id': 'https://tanmoy.is-a.dev/#person' },
            hasPart: [
              { '@type': 'SoftwareSourceCode', name: 'TechScript', url: 'https://tanmoy.is-a.dev/projects/techscript', codeRepository: 'https://github.com/Tcode-Motion/techscript' },
              { '@type': 'SoftwareSourceCode', name: 'Aurora Music Player', url: 'https://tanmoy.is-a.dev/projects/aurora-music', codeRepository: 'https://github.com/Tcode-Motion/aurora' },
              { '@type': 'SoftwareSourceCode', name: 'CloudVault', url: 'https://tanmoy.is-a.dev/projects/cloudvault', codeRepository: 'https://github.com/Tcode-Motion/cloudvault' },
              { '@type': 'SoftwareSourceCode', name: 'WallVault', url: 'https://tanmoy.is-a.dev/projects/wallvault', codeRepository: 'https://github.com/Tcode-Motion/wallvault' },
              { '@type': 'SoftwareSourceCode', name: 'Vortex CLI', url: 'https://tanmoy.is-a.dev/projects/vortyx', codeRepository: 'https://github.com/Tcode-Motion/vortyx' },
              { '@type': 'SoftwareSourceCode', name: 'NutriLens AI', url: 'https://tanmoy.is-a.dev/projects/nutrilens-ai', codeRepository: 'https://github.com/Tcode-Motion/nutrilens' },
            ],
          },
        ]}
      />

      <div className="min-h-screen bg-[#090a0f]">

        {/* ── Page Header ── */}
        <div className="pt-36 pb-16 max-w-[1300px] mx-auto px-6 sm:px-10 lg:px-16">
          <motion.span
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-block font-code text-xs text-accent-indigo tracking-widest uppercase mb-6"
          >
            // all works
          </motion.span>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="font-display font-extrabold text-content-primary leading-tight mb-8"
            style={{ fontSize: 'clamp(2.5rem, 7vw, 6rem)' }}
          >
            Projects &amp;<br />
            <span className="text-gradient-indigo">Case Studies</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="font-body text-content-secondary max-w-xl text-base leading-relaxed"
          >
            Every project is engineered with production standards — from custom compilers to AI platforms and mobile applications.
          </motion.p>
        </div>

        {/* ── Filter Bar ── */}
        <div className="sticky top-20 z-30 bg-[#090a0f]/90 backdrop-blur-xl border-b border-white/5">
          <div className="max-w-[1300px] mx-auto px-6 sm:px-10 lg:px-16 py-4 flex items-center gap-3">
            <span className="font-code text-[10px] text-content-tertiary tracking-widest uppercase mr-2">
              Filter:
            </span>
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setFilter(cat.id)}
                className={`px-4 py-2 rounded-full font-code text-xs transition-all duration-200 ${
                  filter === cat.id
                    ? 'bg-white text-black font-bold'
                    : 'border border-white/10 text-content-secondary hover:text-content-primary hover:border-white/20'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* ── Projects Grid ── */}
        <div className="max-w-[1300px] mx-auto px-6 sm:px-10 lg:px-16 py-16">
          <AnimatePresence mode="popLayout">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {filteredProjects.map((project, idx) => {
                const accent = PROJECT_ACCENT[project.id] ?? '#6366f1';
                const grad = PROJECT_GRADIENTS[project.id] ?? 'from-indigo-500/20 via-purple-500/10 to-transparent';
                return (
                  <motion.div
                    key={project.id}
                    layout
                    initial={{ opacity: 0, y: 32 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.96 }}
                    transition={{ duration: 0.5, delay: idx * 0.06, ease: [0.16, 1, 0.3, 1] }}
                    className="group relative rounded-2xl border border-white/5 hover:border-white/10 bg-[#0d0e14] overflow-hidden transition-colors duration-300"
                  >
                    {/* Gradient top accent */}
                    <div className={`absolute top-0 left-0 right-0 h-48 bg-gradient-to-b ${grad} pointer-events-none`} aria-hidden="true" />

                    <div className="relative p-8 flex flex-col h-full min-h-[320px]">
                      {/* Top row */}
                      <div className="flex items-start justify-between gap-4 mb-6">
                        <div className="space-y-2">
                          <span
                            className="font-code text-[10px] tracking-widest uppercase px-3 py-1 rounded-full border"
                            style={{ color: accent, borderColor: `${accent}40`, background: `${accent}10` }}
                          >
                            {project.category}
                          </span>
                          {project.featured && (
                            <div className="inline-flex items-center gap-1.5 ml-2 font-code text-[10px] text-accent-purple px-2.5 py-1 rounded-full bg-accent-purple/10 border border-accent-purple/20">
                              ★ Featured
                            </div>
                          )}
                        </div>
                        <span className="font-display font-extrabold text-5xl opacity-5 leading-none select-none"
                          style={{ color: accent }}>
                          {String(idx + 1).padStart(2, '0')}
                        </span>
                      </div>

                      {/* Content */}
                      <div className="flex-1 space-y-3">
                        <h2 className="font-display font-extrabold text-content-primary text-2xl leading-tight group-hover:text-white transition-colors">
                          {project.title}
                        </h2>
                        <p className="font-body text-content-secondary text-sm leading-relaxed">
                          {project.tagline}
                        </p>
                      </div>

                      {/* Tech stack */}
                      <div className="flex flex-wrap gap-1.5 mt-6">
                        {project.techStack.slice(0, 5).map((tech) => (
                          <span
                            key={tech}
                            className="px-2.5 py-1 rounded-md font-code text-[10px] text-content-tertiary border border-white/6"
                            style={{ background: 'rgba(255,255,255,0.02)' }}
                          >
                            {tech}
                          </span>
                        ))}
                      </div>

                      {/* Actions */}
                      <div className="flex items-center gap-3 mt-6 pt-5 border-t border-white/5">
                        <Link
                          to={`/projects/${project.id}`}
                          className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl font-body font-semibold text-xs text-white transition-all hover:opacity-90"
                          style={{ background: `linear-gradient(135deg, ${accent}cc, ${accent}88)` }}
                        >
                          <span>Case Study</span>
                          <ArrowUpRight className="w-3.5 h-3.5" />
                        </Link>
                        <a
                          href={project.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-3 rounded-xl border border-white/8 text-content-secondary hover:text-white hover:border-white/20 transition-all"
                          aria-label={`${project.title} on GitHub`}
                        >
                          <Github className="w-4 h-4" />
                        </a>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </AnimatePresence>

          {filteredProjects.length === 0 && (
            <div className="text-center py-24 text-content-tertiary font-code text-sm">
              No projects in this category yet.
            </div>
          )}
        </div>
      </div>
    </>
  );
};
