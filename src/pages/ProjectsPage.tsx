import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { SeoHead } from '@/core/seo/SeoHead';
import { getAllProjects, getSecondaryProjects, getGithubSnapshot } from '@/core/content/contentLoader';
import { Github, ArrowUpRight, Search, ExternalLink, Code2, Terminal, Sparkles, HelpCircle, Home } from 'lucide-react';

const CATEGORY_COLORS: Record<string, string> = {
  'techscript': '#c4ff36',
  'satvora-ai': '#10b981',
  'kinotix': '#f43f5e',
  'novos': '#38bdf8',
  'neosketch': '#00b4ab',
  'vortyx': '#f59e0b',
  'arc-reactor-3d': '#00f2fe',
  'aurora-os': '#a855f7',
  'os-wallpapers': '#ec4899',
};

export const ProjectsPage: React.FC = () => {
  const showcaseProjects = getAllProjects();
  const secondaryProjects = getSecondaryProjects();
  const gh = getGithubSnapshot();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = [
    { id: 'all', label: 'All Works' },
    { id: 'compiler', label: 'Compiler & Languages' },
    { id: 'mobile', label: 'Mobile & Android' },
    { id: 'web', label: 'Web & Systems' },
    { id: '3d', label: '3D & Graphics' },
  ];

  const filteredShowcase = useMemo(() => {
    return showcaseProjects.filter((p) => {
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !q ||
        p.title.toLowerCase().includes(q) ||
        p.tagline.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q) ||
        p.techStack.some((t) => t.toLowerCase().includes(q));

      if (!matchesSearch) return false;

      if (selectedCategory === 'all') return true;
      if (selectedCategory === 'compiler') return p.category.toLowerCase().includes('compiler') || p.category.toLowerCase().includes('language');
      if (selectedCategory === 'mobile') return p.category.toLowerCase().includes('mobile') || p.category.toLowerCase().includes('android');
      if (selectedCategory === 'web') return p.category.toLowerCase().includes('web') || p.category.toLowerCase().includes('os');
      if (selectedCategory === '3d') return p.category.toLowerCase().includes('3d') || p.category.toLowerCase().includes('graphics');
      return true;
    });
  }, [showcaseProjects, searchQuery, selectedCategory]);

  const filteredSecondary = useMemo(() => {
    return secondaryProjects.filter((p) => {
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !q ||
        p.title.toLowerCase().includes(q) ||
        p.tagline.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q) ||
        p.techStack.some((t) => t.toLowerCase().includes(q));

      if (!matchesSearch) return false;

      if (selectedCategory === 'all') return true;
      if (selectedCategory === 'compiler') return false;
      if (selectedCategory === 'mobile') return p.category.toLowerCase().includes('mobile');
      if (selectedCategory === 'web') return p.category.toLowerCase().includes('web');
      if (selectedCategory === '3d') return p.category.toLowerCase().includes('3d') || p.category.toLowerCase().includes('ar');
      return true;
    });
  }, [secondaryProjects, searchQuery, selectedCategory]);

  return (
    <>
      <SeoHead
        title="Open Source Projects & Case Studies by Tanmoy Majumder (Tcode-Motion)"
        description="Comprehensive project knowledge base and case studies by Tanmoy Majumder. Featuring TechScript (Rust compiler), Satvora AI, KinotiX 4K live wallpaper on Google Play, NovOS web operating system, and open source repositories."
        slug="projects"
        breadcrumbs={[{ name: 'Projects', item: 'https://tanmoy.is-a.dev/projects' }]}
        jsonLd={[
          {
            '@context': 'https://schema.org',
            '@type': 'CollectionPage',
            '@id': 'https://tanmoy.is-a.dev/projects#collection',
            name: 'Open Source Projects by Tanmoy Majumder',
            description: 'Engineering case studies and repositories built by Tanmoy Majumder (Tcode-Motion).',
            url: 'https://tanmoy.is-a.dev/projects',
            author: { '@id': 'https://tanmoy.is-a.dev/#person' },
            hasPart: showcaseProjects.map((p) => ({
              '@type': 'SoftwareSourceCode',
              name: p.title,
              description: p.tagline,
              url: `https://tanmoy.is-a.dev/projects/${p.id}`,
              codeRepository: p.githubUrl || undefined,
              programmingLanguage: p.techStack.join(', '),
              author: { '@id': 'https://tanmoy.is-a.dev/#person' },
            })),
          },
        ]}
      />

      <div className="min-h-screen bg-[#090a0f] text-white">
        {/* Header */}
        <header className="pt-28 pb-12 max-w-7xl mx-auto px-6 sm:px-10 lg:px-12 space-y-6">
          {/* Navigation Breadcrumb */}
          <nav aria-label="Breadcrumb" className="flex items-center gap-2.5 font-code text-xs text-[#94a3b8]">
            <Link
              to="/"
              className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-white/5 hover:bg-[#c4ff36]/15 hover:text-[#c4ff36] transition-colors border border-white/10"
            >
              <Home className="w-3.5 h-3.5 text-[#c4ff36]" />
              <span>Home</span>
            </Link>
            <span className="text-white/30">/</span>
            <span className="text-[#c4ff36]">Projects &amp; Engineering Works</span>
          </nav>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent-indigo/10 border border-accent-indigo/20 font-code text-xs text-accent-indigo"
          >
            <Terminal className="w-3.5 h-3.5" />
            <span>Verified Knowledge Base // All Works</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="font-display font-extrabold text-4xl sm:text-6xl lg:text-7xl leading-tight mb-6"
          >
            Engineering Projects &amp; <br />
            <span className="text-gradient-indigo">Architectural Case Studies</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="font-body text-content-secondary max-w-2xl text-base sm:text-lg leading-relaxed mb-8"
          >
            Every project listed here is authentic, built from scratch by Tanmoy Majumder (Tcode-Motion), and documented with real technical architectures, source repositories, and deployment links.
          </motion.p>

          {/* Factual stats banner */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.25 }}
            className="flex flex-wrap items-center gap-4 sm:gap-8 py-3 px-5 rounded-2xl bg-[#121520]/80 border border-white/8 text-xs font-code text-content-secondary max-w-3xl"
          >
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-accent-emerald animate-pulse" />
              <span>Verified Repositories: <strong className="text-white">{gh.publicRepoCount}</strong></span>
            </div>
            <div className="flex items-center gap-2">
              <Sparkles className="w-3.5 h-3.5 text-accent-purple" />
              <span>GitHub Stars: <strong className="text-white">{gh.totalStars}+</strong></span>
            </div>
            <div className="flex items-center gap-2">
              <Code2 className="w-3.5 h-3.5 text-accent-cyan" />
              <span>Primary Tech: <strong className="text-white">Rust, Kotlin, TS, Flutter</strong></span>
            </div>
          </motion.div>
        </header>

        {/* Search & Filter Bar */}
        <section aria-label="Project filters and search" className="sticky top-20 z-20 bg-[#090a0f]/90 backdrop-blur-xl border-y border-white/5 py-4">
          <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-12 flex flex-col md:flex-row gap-4 items-center justify-between">
            {/* Search Input */}
            <div className="relative w-full md:w-80">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-content-tertiary" />
              <input
                type="text"
                placeholder="Search by title, tech, or concept..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 rounded-xl bg-[#121520] border border-white/10 text-white font-body text-xs placeholder:text-content-tertiary focus:outline-none focus:border-accent-indigo transition-colors"
                aria-label="Filter projects by keyword"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-content-tertiary hover:text-white text-xs font-code"
                >
                  ✕
                </button>
              )}
            </div>

            {/* Category Pills */}
            <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`px-3.5 py-1.5 rounded-full font-code text-xs transition-all ${
                    selectedCategory === cat.id
                      ? 'bg-white text-black font-semibold shadow-md'
                      : 'border border-white/10 text-content-secondary hover:text-white hover:border-white/20 bg-white/[0.02]'
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Main Content Area */}
        <main className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-12 py-12 space-y-16">
          {/* Flagship & Architectural Case Studies */}
          <div>
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="font-display font-bold text-2xl sm:text-3xl text-white">
                  Architectural Case Studies
                </h2>
                <p className="font-body text-xs text-content-secondary mt-1">
                  In-depth architectural breakdowns with verified repositories, design decisions, and live runtimes.
                </p>
              </div>
              <span className="font-code text-xs text-content-tertiary">
                Showing {filteredShowcase.length} of {showcaseProjects.length}
              </span>
            </div>

            {filteredShowcase.length === 0 ? (
              <div className="text-center py-16 rounded-2xl border border-dashed border-white/10 bg-[#121520]/40">
                <p className="font-body text-content-secondary text-sm">
                  No showcase projects match "{searchQuery}" in this category.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <AnimatePresence mode="popLayout">
                  {filteredShowcase.map((p, idx) => {
                    const accent = CATEGORY_COLORS[p.id] || '#6366f1';
                    return (
                      <motion.article
                        key={p.id}
                        layout
                        initial={{ opacity: 0, y: 24 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.96 }}
                        transition={{ duration: 0.4, delay: idx * 0.04 }}
                        className="group relative rounded-2xl bg-[#0d0e14] border border-white/8 hover:border-white/20 p-6 flex flex-col justify-between transition-all hover:shadow-xl hover:shadow-black/40"
                      >
                        {/* Top decorative glow */}
                        <div
                          className="absolute -top-px left-8 right-8 h-px opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                          style={{ background: `linear-gradient(90deg, transparent, ${accent}, transparent)` }}
                        />

                        <div>
                          {/* Category & Badge */}
                          <div className="flex items-center justify-between gap-2 mb-4">
                            <span
                              className="font-code text-[11px] px-2.5 py-0.5 rounded-full border"
                              style={{ color: accent, borderColor: `${accent}40`, backgroundColor: `${accent}12` }}
                            >
                              {p.category}
                            </span>
                            {p.featured && (
                              <span className="font-code text-[10px] text-accent-purple px-2 py-0.5 rounded bg-accent-purple/10 border border-accent-purple/20">
                                Flagship
                              </span>
                            )}
                          </div>

                          {/* Title & Tagline */}
                          <h3 className="font-display font-extrabold text-xl text-white group-hover:text-accent-cyan transition-colors mb-2">
                            <Link to={`/projects/${p.id}`} className="hover:underline">
                              {p.title}
                            </Link>
                          </h3>

                          <p className="font-body text-content-secondary text-xs sm:text-sm leading-relaxed mb-4 line-clamp-3">
                            {p.description || p.tagline}
                          </p>

                          {/* Tech stack badges */}
                          <div className="flex flex-wrap gap-1.5 mb-6">
                            {p.techStack.slice(0, 4).map((tech) => (
                              <span
                                key={tech}
                                className="px-2 py-0.5 rounded font-code text-[10px] text-content-tertiary bg-white/[0.03] border border-white/5"
                              >
                                {tech}
                              </span>
                            ))}
                            {p.techStack.length > 4 && (
                              <span className="px-1.5 py-0.5 rounded font-code text-[10px] text-content-tertiary">
                                +{p.techStack.length - 4}
                              </span>
                            )}
                          </div>
                        </div>

                        {/* Card Footer Actions */}
                        <div className="pt-4 border-t border-white/5 flex items-center justify-between gap-2">
                          <Link
                            to={`/projects/${p.id}`}
                            className="inline-flex items-center gap-1.5 font-body font-semibold text-xs text-white hover:text-accent-cyan transition-colors"
                          >
                            <span>Read Case Study</span>
                            <ArrowUpRight className="w-3.5 h-3.5" />
                          </Link>

                          <div className="flex items-center gap-2">
                            {p.liveUrl && (
                              <a
                                href={p.liveUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-content-secondary hover:text-white transition-colors"
                                title="Open Live Site / Demo"
                                aria-label={`${p.title} live link`}
                              >
                                <ExternalLink className="w-3.5 h-3.5" />
                              </a>
                            )}
                            {p.githubUrl && (
                              <a
                                href={p.githubUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-content-secondary hover:text-white transition-colors"
                                title="View GitHub Repository"
                                aria-label={`${p.title} GitHub repository`}
                              >
                                <Github className="w-3.5 h-3.5" />
                              </a>
                            )}
                          </div>
                        </div>
                      </motion.article>
                    );
                  })}
                </AnimatePresence>
              </div>
            )}
          </div>

          {/* Secondary Open Source Repositories */}
          {filteredSecondary.length > 0 && (
            <section className="pt-8 border-t border-white/5">
              <div className="mb-6">
                <h2 className="font-display font-bold text-xl sm:text-2xl text-white">
                  Additional Open Source Repositories &amp; Experiments
                </h2>
                <p className="font-body text-xs text-content-secondary mt-1">
                  Public experiments, graphics shaders, computer vision prototypes, and utility tools on GitHub.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredSecondary.map((proj) => (
                  <div
                    key={proj.id}
                    className="p-5 rounded-xl bg-[#0c0d12] border border-white/6 hover:border-white/15 transition-all flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-code text-[10px] text-content-tertiary uppercase tracking-wider">
                          {proj.category}
                        </span>
                        <a
                          href={proj.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-content-tertiary hover:text-white"
                          aria-label={`${proj.title} on GitHub`}
                        >
                          <Github className="w-4 h-4" />
                        </a>
                      </div>
                      <h4 className="font-display font-bold text-base text-white mb-1">
                        {proj.title}
                      </h4>
                      <p className="font-body text-xs text-content-secondary leading-relaxed mb-3">
                        {proj.tagline}
                      </p>
                    </div>

                    <div className="flex flex-wrap gap-1 pt-3 border-t border-white/5">
                      {proj.techStack.map((tech) => (
                        <span
                          key={tech}
                          className="px-2 py-0.5 rounded font-code text-[9px] text-content-tertiary bg-white/[0.02]"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* AEO / Generative Search Knowledge Hub Section */}
          <section className="p-8 sm:p-10 rounded-2xl bg-[#0d0e14] border border-white/8 space-y-6">
            <div className="flex items-center gap-2 font-code text-xs text-accent-indigo">
              <HelpCircle className="w-4 h-4" />
              <span>Factual FAQ // Generative Search Knowledge Reference</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
              <div className="space-y-2">
                <h4 className="font-display font-bold text-sm text-white">
                  What open source projects does Tanmoy Majumder maintain?
                </h4>
                <p className="font-body text-xs text-content-secondary leading-relaxed">
                  Tanmoy Majumder (Tcode-Motion) maintains TechScript (a compiled programming language toolchain in Rust), NovOS (a browser-based desktop operating system), KinotiX (live wallpaper engine), and various systems/audio utilities hosted publicly on GitHub.
                </p>
              </div>

              <div className="space-y-2">
                <h4 className="font-display font-bold text-sm text-white">
                  What is TechScript?
                </h4>
                <p className="font-body text-xs text-content-secondary leading-relaxed">
                  TechScript is an open-source programming language engineered in Rust by Tanmoy Majumder. It features a custom lexer, recursive-descent parser, Abstract Syntax Tree representation, and stack-based bytecode virtual machine. Read the full documentation at{' '}
                  <Link to="/techscript" className="text-accent-cyan hover:underline">
                    /techscript
                  </Link>.
                </p>
              </div>

              <div className="space-y-2">
                <h4 className="font-display font-bold text-sm text-white">
                  Are these projects open to contributions?
                </h4>
                <p className="font-body text-xs text-content-secondary leading-relaxed">
                  Yes, public repositories on GitHub (<a href="https://github.com/Tcode-Motion" target="_blank" rel="noopener noreferrer" className="text-accent-indigo hover:underline">@Tcode-Motion</a>) are licensed under open-source licenses (primarily Apache 2.0 and MIT) and welcome pull requests and issue discussions.
                </p>
              </div>

              <div className="space-y-2">
                <h4 className="font-display font-bold text-sm text-white">
                  Where can I find Android apps built by Tanmoy?
                </h4>
                <p className="font-body text-xs text-content-secondary leading-relaxed">
                  All Android projects including KinotiX and Satvora AI are indexed on the dedicated{' '}
                  <Link to="/apps" className="text-accent-cyan hover:underline">
                    /apps
                  </Link>{' '}
                  hub, as well as on the official Google Play Developer profile (ID: 8946471561851740040).
                </p>
              </div>
            </div>
          </section>
        </main>
      </div>
    </>
  );
};
