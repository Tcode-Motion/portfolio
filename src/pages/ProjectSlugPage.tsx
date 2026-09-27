import React from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { getProjectById, getAllProjects } from '@/core/content/contentLoader';
import { SeoHead } from '@/core/seo/SeoHead';
import {
  ArrowLeft,
  Github,
  ExternalLink,
  Layers,
  CheckCircle2,
  Cpu,
  ShieldCheck,
  Calendar,
  Code2,
  Terminal,
  HelpCircle,
  Smartphone,
  ArrowRight,
  Sparkles,
  GitBranch,
  Home
} from 'lucide-react';

export const ProjectSlugPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const project = slug ? getProjectById(slug) : undefined;

  if (!project) {
    return <Navigate to="/404" replace />;
  }

  // Related projects for internal link graph
  const allProjects = getAllProjects();
  const relatedProjects = allProjects
    .filter((p) => p.id !== project.id && (p.category === project.category || p.techStack.some((t) => project.techStack.includes(t))))
    .slice(0, 3);

  return (
    <>
      <SeoHead
        title={`${project.title} — Architectural Case Study by Tanmoy Majumder`}
        description={`${project.title}: ${project.tagline} An open source engineering project architected and built by Tanmoy Majumder (Tcode-Motion) using ${project.techStack.slice(0, 4).join(', ')}.`}
        slug={`projects/${project.id}`}
        breadcrumbs={[
          { name: 'Projects', item: 'https://tanmoy.is-a.dev/projects' },
          { name: project.title, item: `https://tanmoy.is-a.dev/projects/${project.id}` },
        ]}
        jsonLd={[
          {
            '@context': 'https://schema.org',
            '@type': 'SoftwareSourceCode',
            '@id': `https://tanmoy.is-a.dev/projects/${project.id}#software`,
            name: project.title,
            description: project.description || project.tagline,
            programmingLanguage: project.techStack.join(', '),
            codeRepository: project.githubUrl || undefined,
            url: `https://tanmoy.is-a.dev/projects/${project.id}`,
            author: {
              '@type': 'Person',
              '@id': 'https://tanmoy.is-a.dev/#person',
              name: 'Tanmoy Majumder',
              alternateName: 'Tcode-Motion'
            },
            creator: {
              '@type': 'Person',
              '@id': 'https://tanmoy.is-a.dev/#person',
              name: 'Tanmoy Majumder',
              alternateName: 'Tcode-Motion'
            },
            keywords: project.techStack,
          },
          {
            '@context': 'https://schema.org',
            '@type': 'FAQPage',
            mainEntity: [
              {
                '@type': 'Question',
                name: `What is ${project.title}?`,
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: project.description || project.tagline
                }
              },
              {
                '@type': 'Question',
                name: `Who built ${project.title}?`,
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: `${project.title} was designed and built by Tanmoy Majumder (online alias Tcode-Motion).`
                }
              },
              {
                '@type': 'Question',
                name: `What technologies are used in ${project.title}?`,
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: `${project.title} is built with ${project.techStack.join(', ')}.`
                }
              }
            ]
          }
        ]}
      />

      <div className="min-h-screen bg-[#090a0f] text-white">
        <article className="pt-32 pb-24 max-w-5xl mx-auto px-6 sm:px-8 space-y-12">
          {/* Breadcrumb / Back Navigation */}
          <nav aria-label="Breadcrumb" className="flex items-center gap-2.5 font-code text-xs text-content-secondary">
            <Link
              to="/"
              className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-white/5 hover:bg-[#c4ff36]/15 hover:text-[#c4ff36] transition-colors border border-white/10"
            >
              <Home className="w-3.5 h-3.5 text-[#c4ff36]" />
              <span>Home</span>
            </Link>
            <span className="text-white/20">/</span>
            <Link
              to="/projects"
              className="inline-flex items-center gap-1 hover:text-white transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Projects</span>
            </Link>
            <span className="text-white/20">/</span>
            <span className="text-accent-cyan truncate">{project.title}</span>
          </nav>

          {/* Hero Header */}
          <header className="space-y-6">
            <div className="flex flex-wrap items-center gap-3">
              <span className="font-code text-xs text-accent-cyan px-3 py-1 rounded-full bg-accent-cyan/10 border border-accent-cyan/20">
                {project.category}
              </span>
              {project.timeline && (
                <span className="flex items-center gap-1.5 font-code text-xs text-content-tertiary px-3 py-1 rounded-full bg-white/5 border border-white/10">
                  <Calendar className="w-3 h-3" />
                  <span>{project.timeline}</span>
                </span>
              )}
              {project.featured && (
                <span className="font-code text-xs text-accent-purple px-3 py-1 rounded-full bg-accent-purple/10 border border-accent-purple/20">
                  Flagship Case Study
                </span>
              )}
            </div>

            <h1 className="font-display font-extrabold text-4xl sm:text-6xl text-white leading-tight">
              {project.title}
            </h1>

            <p className="font-body text-lg sm:text-xl text-content-secondary leading-relaxed max-w-3xl">
              {project.tagline}
            </p>

            {/* Authorship & Credibility Line */}
            <div className="p-4 rounded-xl bg-[#121520] border border-white/8 flex flex-wrap items-center justify-between gap-4 font-body text-xs text-content-secondary">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-accent-emerald" />
                <span>
                  Architected &amp; Built by <strong className="text-white">Tanmoy Majumder</strong> (Tcode-Motion)
                </span>
              </div>
              <div className="font-code text-content-tertiary">
                First-party authenticated project
              </div>
            </div>

            {/* Action Links */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              {project.githubUrl && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-accent-indigo text-white font-body font-semibold text-xs hover:bg-indigo-600 transition-colors shadow-lg shadow-accent-indigo/25"
                >
                  <Github className="w-4 h-4" />
                  <span>GitHub Repository</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              )}

              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white/10 text-white font-body font-semibold text-xs hover:bg-white/15 transition-colors border border-white/10"
                >
                  <ExternalLink className="w-4 h-4" />
                  <span>Live Production URL</span>
                </a>
              )}

              {project.playStoreUrl && (
                <a
                  href={project.playStoreUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-accent-emerald/20 text-accent-emerald border border-accent-emerald/30 font-body font-semibold text-xs hover:bg-accent-emerald/30 transition-colors"
                >
                  <Smartphone className="w-4 h-4" />
                  <span>Google Play Listing</span>
                </a>
              )}

              {project.id === 'techscript' && (
                <Link
                  to="/techscript"
                  className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-accent-cyan/20 text-accent-cyan border border-accent-cyan/30 font-body font-semibold text-xs hover:bg-accent-cyan/30 transition-colors"
                >
                  <Terminal className="w-4 h-4" />
                  <span>Dedicated Language Hub</span>
                </Link>
              )}
            </div>
          </header>

          {/* Detailed Overview */}
          <section className="p-8 rounded-2xl bg-[#0d0e14] border border-white/8 space-y-4">
            <h2 className="font-display font-bold text-2xl text-white">
              System Overview
            </h2>
            <p className="font-body text-sm sm:text-base text-content-secondary leading-relaxed">
              {project.description}
            </p>
          </section>

          {/* Problem & Solution Grid */}
          <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 rounded-2xl bg-[#0d0e14] border border-white/8 space-y-3">
              <div className="flex items-center gap-2 font-code text-xs text-accent-purple">
                <Cpu className="w-4 h-4" />
                <span>The Engineering Problem</span>
              </div>
              <p className="font-body text-sm text-content-secondary leading-relaxed">
                {project.problem || 'Standard alternatives lack deterministic native toolchains, introduce excessive latency, or require complex configurations.'}
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-[#0d0e14] border border-white/8 space-y-3">
              <div className="flex items-center gap-2 font-code text-xs text-accent-cyan">
                <ShieldCheck className="w-4 h-4" />
                <span>The Architectural Solution</span>
              </div>
              <p className="font-body text-sm text-content-secondary leading-relaxed">
                {project.solution || project.tagline}
              </p>
            </div>
          </section>

          {/* Architecture Pipeline */}
          {project.architecture && (
            <section className="p-8 rounded-2xl bg-[#0d0e14] border border-white/8 space-y-4">
              <div className="flex items-center gap-2 font-code text-xs text-accent-indigo">
                <GitBranch className="w-4 h-4" />
                <span>Execution Architecture &amp; Dataflow</span>
              </div>
              <div className="p-4 rounded-xl bg-[#06070a] border border-white/5 font-code text-xs sm:text-sm text-accent-cyan overflow-x-auto">
                <code>{project.architecture}</code>
              </div>
              <p className="font-body text-xs text-content-tertiary">
                Verified pipeline flow implemented across the codebase modules.
              </p>
            </section>
          )}

          {/* Key Features & Architectural Highlights */}
          {project.features && project.features.length > 0 && (
            <section className="p-8 rounded-2xl bg-[#0d0e14] border border-white/8 space-y-6">
              <h3 className="font-display font-bold text-xl text-white flex items-center gap-2">
                <Layers className="w-5 h-5 text-accent-indigo" />
                <span>Key Features &amp; Implementation Details</span>
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {project.features.map((feature, idx) => (
                  <div key={idx} className="flex items-start gap-3 p-4 rounded-xl bg-[#121520] border border-white/5">
                    <CheckCircle2 className="w-4 h-4 text-accent-emerald shrink-0 mt-0.5" />
                    <span className="font-body text-xs text-content-primary leading-relaxed">{feature}</span>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Engineering Challenges & Solutions */}
          {project.challenges && project.challenges.length > 0 && (
            <section className="p-8 rounded-2xl bg-[#0d0e14] border border-white/8 space-y-4">
              <h3 className="font-display font-bold text-xl text-white">
                Technical Challenges &amp; Engineering Trade-offs
              </h3>
              <ul className="space-y-3">
                {project.challenges.map((challenge, idx) => (
                  <li key={idx} className="p-4 rounded-xl bg-[#121520] border border-white/5 font-body text-xs text-content-secondary leading-relaxed">
                    <strong className="text-white font-semibold">Challenge {idx + 1}:</strong> {challenge}
                  </li>
                ))}
              </ul>
            </section>
          )}

          {/* Optimizations */}
          {project.optimizations && project.optimizations.length > 0 && (
            <section className="p-8 rounded-2xl bg-[#0d0e14] border border-white/8 space-y-4">
              <h3 className="font-display font-bold text-xl text-white flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-accent-cyan" />
                <span>Performance Optimizations Applied</span>
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {project.optimizations.map((opt, idx) => (
                  <div key={idx} className="p-3.5 rounded-xl bg-[#121520] border border-white/5 font-body text-xs text-content-secondary">
                    {opt}
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Tech Stack */}
          <section className="space-y-4">
            <h3 className="font-display font-bold text-xl text-white flex items-center gap-2">
              <Code2 className="w-5 h-5 text-accent-purple" />
              <span>Technologies &amp; Libraries Used</span>
            </h3>
            <div className="flex flex-wrap gap-2">
              {project.techStack.map((tech) => (
                <span
                  key={tech}
                  className="px-4 py-2 rounded-xl bg-[#0d0e14] border border-white/8 font-code text-xs text-accent-cyan font-medium"
                >
                  {tech}
                </span>
              ))}
            </div>
          </section>

          {/* Roadmap */}
          {project.roadmap && project.roadmap.length > 0 && (
            <section className="p-8 rounded-2xl bg-[#0d0e14] border border-white/8 space-y-6">
              <h3 className="font-display font-bold text-xl text-white">
                Evolution &amp; Development Roadmap
              </h3>
              <div className="space-y-3">
                {project.roadmap.map((item, idx) => {
                  const isObj = typeof item === 'object' && item !== null;
                  const title = isObj ? item.title : String(item);
                  const status = isObj ? item.status : 'planned';
                  const phase = isObj ? item.phase : `Phase ${idx + 1}`;

                  return (
                    <div
                      key={idx}
                      className="p-4 rounded-xl bg-[#121520] border border-white/5 flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                    >
                      <div className="flex items-center gap-3">
                        <span className="font-code text-xs text-accent-indigo px-2 py-0.5 rounded bg-accent-indigo/10 border border-accent-indigo/20">
                          {phase}
                        </span>
                        <span className="font-body text-xs sm:text-sm text-content-primary">
                          {title}
                        </span>
                      </div>
                      <span
                        className={`font-code text-[10px] uppercase tracking-wider px-2 py-0.5 rounded self-start sm:self-auto ${
                          status === 'completed'
                            ? 'bg-accent-emerald/10 text-accent-emerald border border-accent-emerald/20'
                            : status === 'in-progress'
                            ? 'bg-accent-cyan/10 text-accent-cyan border border-accent-cyan/20'
                            : 'bg-white/5 text-content-tertiary border border-white/10'
                        }`}
                      >
                        {status}
                      </span>
                    </div>
                  );
                })}
              </div>
            </section>
          )}

          {/* Generative Search & AEO Q&A Section */}
          <section className="p-8 rounded-2xl bg-[#0d0e14] border border-white/8 space-y-4">
            <div className="flex items-center gap-2 font-code text-xs text-accent-cyan">
              <HelpCircle className="w-4 h-4" />
              <span>Verified Facts // Generative Search Extraction</span>
            </div>

            <div className="space-y-4 text-xs font-body text-content-secondary pt-2">
              <div>
                <strong className="text-white">What is {project.title}?</strong>
                <p className="mt-1">{project.description || project.tagline}</p>
              </div>
              <div>
                <strong className="text-white">Who created {project.title}?</strong>
                <p className="mt-1">
                  {project.title} was architected and built by Tanmoy Majumder, who publishes software under the online alias Tcode-Motion.
                </p>
              </div>
              <div>
                <strong className="text-white">Where is the source code?</strong>
                <p className="mt-1">
                  {project.githubUrl ? (
                    <>
                      Source repository is available on GitHub at{' '}
                      <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="text-accent-indigo hover:underline">
                        {project.githubUrl}
                      </a>.
                    </>
                  ) : (
                    'Source code is maintained privately or under staged release.'
                  )}
                </p>
              </div>
            </div>
          </section>

          {/* Related Projects (Internal Link Graph) */}
          {relatedProjects.length > 0 && (
            <section className="pt-8 border-t border-white/5 space-y-6">
              <h3 className="font-display font-bold text-xl text-white">
                Related Projects by Tanmoy Majumder
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {relatedProjects.map((rel) => (
                  <Link
                    key={rel.id}
                    to={`/projects/${rel.id}`}
                    className="p-4 rounded-xl bg-[#0d0e14] border border-white/6 hover:border-white/15 transition-all flex flex-col justify-between group"
                  >
                    <div>
                      <span className="font-code text-[10px] text-accent-cyan uppercase">
                        {rel.category}
                      </span>
                      <h4 className="font-display font-bold text-sm text-white group-hover:text-accent-cyan transition-colors mt-1">
                        {rel.title}
                      </h4>
                      <p className="font-body text-xs text-content-secondary mt-1 line-clamp-2">
                        {rel.tagline}
                      </p>
                    </div>
                    <div className="mt-3 flex items-center gap-1 font-body text-[11px] text-accent-indigo group-hover:translate-x-1 transition-transform">
                      <span>Explore</span>
                      <ArrowRight className="w-3 h-3" />
                    </div>
                  </Link>
                ))}
              </div>
            </section>
          )}
        </article>
      </div>
    </>
  );
};
