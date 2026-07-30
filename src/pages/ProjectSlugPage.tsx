import React from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { getProjectById } from '@/core/content/contentLoader';
import { SeoHead } from '@/core/seo/SeoHead';
import { FadeIn } from '@/primitives/FadeIn';
import { GlassPanel } from '@/primitives/GlassPanel';
import { ArrowLeft, Github, ExternalLink, Layers, CheckCircle2, Cpu, ShieldCheck } from 'lucide-react';

export const ProjectSlugPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const project = slug ? getProjectById(slug) : undefined;

  if (!project) {
    return <Navigate to="/404" replace />;
  }

  return (
    <>
      <SeoHead
        title={`${project.title} Case Study`}
        description={project.description || project.tagline}
        slug={`/projects/${project.id}`}
        jsonLd={{
          '@context': 'https://schema.org',
          '@type': 'SoftwareSourceCode',
          name: project.title,
          description: project.tagline,
          programmingLanguage: project.techStack.join(', '),
          codeRepository: project.githubUrl,
          author: {
            '@type': 'Person',
            name: 'Tanmoy Majumder',
          },
        }}
      />

      <article className="py-20 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Back Link */}
        <FadeIn direction="up">
          <Link
            to="/projects"
            className="inline-flex items-center gap-2 font-code text-xs text-content-secondary hover:text-accent-cyan transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to All Projects</span>
          </Link>
        </FadeIn>

        {/* Hero Header */}
        <FadeIn direction="up" delay={0.1} className="space-y-4">
          <div className="flex flex-wrap items-center gap-3">
            <span className="font-code text-xs text-accent-cyan px-3 py-1 rounded-full bg-accent-cyan/10 border border-accent-cyan/20">
              {project.category}
            </span>
            {project.featured && (
              <span className="font-code text-xs text-accent-purple px-3 py-1 rounded-full bg-accent-purple/10 border border-accent-purple/20">
                Flagship Case Study
              </span>
            )}
          </div>

          <h1 className="font-display font-extrabold text-4xl sm:text-6xl text-content-primary">
            {project.title}
          </h1>

          <p className="font-body text-lg sm:text-xl text-content-secondary max-w-3xl leading-relaxed">
            {project.tagline}
          </p>

          {/* Action Links */}
          <div className="flex flex-wrap items-center gap-4 pt-4">
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-6 py-3 rounded-xl bg-accent-indigo text-white font-body font-semibold text-xs hover:bg-indigo-600 transition-colors shadow-lg shadow-accent-indigo/25"
            >
              <Github className="w-4 h-4" />
              <span>Explore GitHub Repository</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </FadeIn>

        {/* Overview & Problem/Solution Grid */}
        <FadeIn direction="up" delay={0.2} className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <GlassPanel glow className="space-y-3 bg-surface-raised p-6">
            <div className="flex items-center gap-2 font-code text-xs text-accent-purple">
              <Cpu className="w-4 h-4" />
              <span>Engineering Challenge</span>
            </div>
            <p className="font-body text-sm text-content-secondary leading-relaxed">
              {project.problem || project.description}
            </p>
          </GlassPanel>

          <GlassPanel glow className="space-y-3 bg-surface-raised p-6">
            <div className="flex items-center gap-2 font-code text-xs text-accent-cyan">
              <ShieldCheck className="w-4 h-4" />
              <span>Architectural Solution</span>
            </div>
            <p className="font-body text-sm text-content-secondary leading-relaxed">
              {project.solution || project.tagline}
            </p>
          </GlassPanel>
        </FadeIn>

        {/* Highlights & Key Features */}
        {project.highlights && project.highlights.length > 0 && (
          <FadeIn direction="up" delay={0.3}>
            <GlassPanel className="p-8 space-y-4 bg-surface-raised">
              <h3 className="font-display font-bold text-xl text-content-primary flex items-center gap-2">
                <Layers className="w-5 h-5 text-accent-indigo" />
                Key Architectural Highlights & Capabilities
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                {project.highlights.map((highlight, idx) => (
                  <div key={idx} className="flex items-start gap-3 p-4 rounded-xl bg-surface-base border border-border-subtle">
                    <CheckCircle2 className="w-4 h-4 text-accent-cyan shrink-0 mt-0.5" />
                    <span className="font-body text-xs text-content-primary leading-relaxed">{highlight}</span>
                  </div>
                ))}
              </div>
            </GlassPanel>
          </FadeIn>
        )}

        {/* Tech Stack Breakdown */}
        <FadeIn direction="up" delay={0.4} className="space-y-4">
          <h3 className="font-display font-bold text-xl text-content-primary">
            Technologies & Libraries Used
          </h3>
          <div className="flex flex-wrap gap-2">
            {project.techStack.map((tech) => (
              <span
                key={tech}
                className="px-4 py-2 rounded-xl bg-surface-raised border border-border-subtle font-code text-xs text-accent-cyan font-medium"
              >
                {tech}
              </span>
            ))}
          </div>
        </FadeIn>

        {/* Future Development Roadmap */}
        <FadeIn direction="up" delay={0.5}>
          <GlassPanel className="p-8 space-y-4 bg-surface-raised">
            <h3 className="font-display font-bold text-xl text-content-primary">
              Future Roadmap & Evolution
            </h3>
            <p className="font-body text-sm text-content-secondary leading-relaxed">
              Continued open-source engineering development focuses on performance optimization, extended cross-platform compatibility, expanded test coverage, and documentation.
            </p>
          </GlassPanel>
        </FadeIn>

      </article>
    </>
  );
};
