import React from 'react';
import { Link } from 'react-router-dom';
import { SeoHead } from '@/core/seo/SeoHead';
import { HeroModule } from '@/modules/hero/HeroModule';
import { ArrowUpRight, Smartphone, ExternalLink } from 'lucide-react';
import { getAllProjects, getAllApps, getTechnologies, getGithubSnapshot } from '@/core/content/contentLoader';

export const HomePage: React.FC = () => {
  const featuredProjects = getAllProjects().slice(0, 4);
  const apps = getAllApps();
  const technologies = getTechnologies();
  const gh = getGithubSnapshot();

  return (
    <>
      <SeoHead
        title="Tanmoy Majumder | Coder, AI App Builder & Open Source"
        description="Official developer portfolio & knowledge hub of Tanmoy Majumder (Tcode-Motion). Creator of TechScript (Rust language & compiler) and Android developer of KinotiX on Google Play and Satvora AI."
        slug=""
        jsonLd={[
          {
            '@context': 'https://schema.org',
            '@type': 'WebSite',
            '@id': 'https://tanmoy.is-a.dev/#website',
            name: 'Tanmoy Majumder',
            alternateName: 'Tcode-Motion',
            url: 'https://tanmoy.is-a.dev/',
            description: 'Official portfolio and technical knowledge hub for Tanmoy Majumder — creator of TechScript, Android app builder, and open source engineer.',
            publisher: {
              '@type': 'Person',
              '@id': 'https://tanmoy.is-a.dev/#person',
              name: 'Tanmoy Majumder',
              alternateName: 'Tcode-Motion'
            }
          },
          {
            '@context': 'https://schema.org',
            '@type': 'Person',
            '@id': 'https://tanmoy.is-a.dev/#person',
            name: 'Tanmoy Majumder',
            alternateName: ['Tcode-Motion', 'Tanmoy', 'tcodemotion'],
            url: 'https://tanmoy.is-a.dev/',
            image: 'https://github.com/Tcode-Motion.png',
            email: 'tcodemotion@gmail.com',
            jobTitle: 'Coder, AI App Builder & Open Source Contributor',
            nationality: { '@type': 'Country', name: 'India' },
            address: { '@type': 'PostalAddress', addressRegion: 'West Bengal', addressCountry: 'IN' },
            sameAs: [
              'https://github.com/Tcode-Motion',
              'https://play.google.com/store/apps/dev?id=8946471561851740040',
              'https://x.com/Tcodemotion',
              'https://www.youtube.com/@tcodemotin',
              'https://www.instagram.com/tcodemotion/',
              'https://about.me/Tanmoy.majumder',
              'https://orcid.org/0009-0007-9079-130X',
              'https://www.reddit.com/user/tcodemotion/'
            ]
          },
          {
            '@context': 'https://schema.org',
            '@type': 'FAQPage',
            mainEntity: [
              {
                '@type': 'Question',
                name: 'Who is Tanmoy Majumder?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Tanmoy Majumder (online alias Tcode-Motion) is an independent software engineer, AI app builder, and open source contributor from West Bengal, India. He builds programming languages in Rust, native Android apps, and full-stack systems.'
                }
              },
              {
                '@type': 'Question',
                name: 'What is TechScript?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'TechScript is an open-source programming language created by Tanmoy Majumder and built from scratch in Rust. It features a custom lexer, recursive-descent parser, strict AST, bytecode VM, package manager foundation, and an integrated CLI driver.'
                }
              },
              {
                '@type': 'Question',
                name: 'What Android apps has Tanmoy Majumder built?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Tanmoy Majumder has built KinotiX (a 4K live & 3D parallax wallpaper engine published on Google Play under developer ID 8946471561851740040), Satvora AI (multimodal health & food scanner for Android, currently in closed testing), and Vortyx (Kotlin media download manager).'
                }
              },
              {
                '@type': 'Question',
                name: 'Where can I find Tcode-Motion online?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'You can find Tanmoy Majumder on GitHub at https://github.com/Tcode-Motion, on Google Play at https://play.google.com/store/apps/dev?id=8946471561851740040, and on Twitter/X at https://x.com/Tcodemotion.'
                }
              }
            ]
          }
        ]}
      />

      <div className="space-y-24 sm:space-y-32">
        {/* ── 1. HERO ── */}
        <HeroModule />

        {/* ── 2. FLAGSHIP PROJECTS ── */}
        <section className="max-w-[1400px] mx-auto px-4 sm:px-6 md:px-10 lg:px-16">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10 pb-4 border-b border-white/10">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="w-2 h-2 rounded-full bg-[#c4ff36]" />
                <span className="font-code text-xs text-[#c4ff36] uppercase tracking-wider font-semibold">
                  Engineering Catalog
                </span>
              </div>
              <h2 className="font-display font-bold text-3xl sm:text-4xl text-white">
                Featured Flagship Works
              </h2>
            </div>
            <Link
              to="/projects"
              className="inline-flex items-center gap-1.5 font-code text-xs text-[#94a3b8] hover:text-[#c4ff36] transition-colors"
            >
              <span>View All Projects ({getAllProjects().length})</span>
              <ArrowUpRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {featuredProjects.map((p) => (
              <div
                key={p.id}
                className="group p-6 sm:p-8 rounded-2xl border border-white/10 bg-[#0d1627]/60 hover:bg-[#121c33]/80 hover:border-[#c4ff36]/60 backdrop-blur-md transition-all duration-300 shadow-md flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-4">
                    <span className="px-3 py-1 rounded-full text-[11px] font-code bg-white/5 border border-white/10 text-[#c4ff36]">
                      {p.category}
                    </span>
                    <span className="font-code text-xs text-[#64748b]">{p.timeline}</span>
                  </div>

                  <h3 className="font-display font-bold text-2xl text-white group-hover:text-[#c4ff36] transition-colors mb-2">
                    {p.title}
                  </h3>

                  <p className="text-sm text-[#94a3b8] leading-relaxed mb-6">
                    {p.tagline}
                  </p>

                  <div className="flex flex-wrap gap-1.5 mb-6">
                    {p.techStack.slice(0, 4).map((tech) => (
                      <span
                        key={tech}
                        className="px-2 py-0.5 rounded text-[10px] font-code bg-[#07090e] border border-white/10 text-[#94a3b8]"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="pt-4 border-t border-white/10 flex items-center justify-between">
                  <Link
                    to={p.id === 'techscript' ? '/techscript' : `/projects/${p.id}`}
                    className="inline-flex items-center gap-2 text-xs font-code font-bold text-white hover:text-[#c4ff36] transition-colors"
                  >
                    <span>Read Architecture Case Study</span>
                    <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </Link>

                  {p.githubUrl && (
                    <a
                      href={p.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs font-code text-[#64748b] hover:text-white transition-colors"
                      aria-label={`${p.title} source on GitHub`}
                    >
                      Source Code
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── 3. ANDROID APPLICATION DIRECTORY SPOTLIGHT ── */}
        <section className="max-w-[1400px] mx-auto px-4 sm:px-6 md:px-10 lg:px-16">
          <div className="p-6 sm:p-10 rounded-3xl border border-white/15 bg-gradient-to-br from-[#0c1626]/80 via-[#0a0f1d]/60 to-[#07090e] backdrop-blur-xl relative overflow-hidden">
            <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 mb-8">
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#10b981]/10 border border-[#10b981]/30 mb-3">
                  <Smartphone className="w-3.5 h-3.5 text-[#10b981]" />
                  <span className="font-code text-xs text-[#10b981] font-semibold uppercase tracking-wider">
                    Google Play &amp; Android Ecosystem
                  </span>
                </div>
                <h2 className="font-display font-bold text-3xl sm:text-4xl text-white">
                  Native Android Applications
                </h2>
                <p className="text-sm text-[#94a3b8] max-w-xl mt-2 leading-relaxed">
                  Real mobile products built with modern Kotlin, Jetpack Compose, OpenGL shaders, and on-device machine vision.
                </p>
              </div>

              <Link
                to="/apps"
                className="px-5 py-2.5 rounded-xl bg-white/10 hover:bg-white/15 border border-white/15 text-white font-code text-xs font-semibold inline-flex items-center gap-2 transition-all shrink-0"
              >
                <span>Explore All Apps ({apps.length})</span>
                <ArrowUpRight className="w-4 h-4" />
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {apps.slice(0, 3).map((app) => (
                <div
                  key={app.id}
                  className="p-5 rounded-2xl border border-white/10 bg-[#080d1a]/80 hover:border-[#10b981]/60 transition-all flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-[10px] font-code px-2 py-0.5 rounded bg-white/5 border border-white/10 text-white/80">
                        {app.platform}
                      </span>
                      <span
                        className={`text-[10px] font-code px-2 py-0.5 rounded font-semibold ${
                          app.isReleased
                            ? 'bg-[#10b981]/20 text-[#10b981] border border-[#10b981]/40'
                            : 'bg-[#f59e0b]/20 text-[#f59e0b] border border-[#f59e0b]/40'
                        }`}
                      >
                        {app.status}
                      </span>
                    </div>

                    <h3 className="font-display font-bold text-lg text-white mb-1">
                      {app.name}
                    </h3>
                    <p className="text-xs text-[#94a3b8] leading-relaxed mb-4 line-clamp-2">
                      {app.tagline}
                    </p>

                    {app.packageId && (
                      <div className="font-code text-[11px] text-[#64748b] bg-black/40 px-2 py-1 rounded mb-4 truncate">
                        ID: {app.packageId}
                      </div>
                    )}
                  </div>

                  <div className="pt-3 border-t border-white/5 flex items-center justify-between">
                    <Link
                      to={`/apps/${app.id}`}
                      className="text-xs font-code font-bold text-[#c4ff36] hover:underline"
                    >
                      View Details &rarr;
                    </Link>

                    {app.playStoreUrl && (
                      <a
                        href={app.playStoreUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[11px] font-code text-[#94a3b8] hover:text-white inline-flex items-center gap-1"
                      >
                        <span>Google Play</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── 4. BUILT WITH / TECHNOLOGY RELATIONSHIPS ── */}
        <section className="max-w-[1400px] mx-auto px-4 sm:px-6 md:px-10 lg:px-16">
          <div className="mb-10 pb-4 border-b border-white/10">
            <div className="flex items-center gap-2 mb-2">
              <span className="w-2 h-2 rounded-full bg-[#06b6d4]" />
              <span className="font-code text-xs text-[#06b6d4] uppercase tracking-wider font-semibold">
                Contextual Engineering
              </span>
            </div>
            <h2 className="font-display font-bold text-3xl sm:text-4xl text-white">
              Built With: Technology Relationships
            </h2>
            <p className="text-sm text-[#94a3b8] max-w-2xl mt-2">
              Meaningful technologies mapped directly to the verified software I have built with them — no arbitrary numeric skill percentages.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {technologies.map((tech) => (
              <div
                key={tech.id}
                className="p-6 rounded-2xl border border-white/10 bg-[#0d1627]/50 backdrop-blur-md space-y-4"
              >
                <div className="flex items-center justify-between">
                  <h3 className="font-display font-bold text-xl text-white">
                    {tech.name}
                  </h3>
                  <span className="text-[10px] font-code px-2 py-0.5 rounded bg-white/5 text-[#94a3b8]">
                    {tech.category}
                  </span>
                </div>

                <p className="text-xs text-[#94a3b8] leading-relaxed">
                  {tech.description}
                </p>

                <div className="space-y-1.5 pt-2 border-t border-white/10">
                  <span className="text-[10px] font-code text-[#64748b] uppercase tracking-wider block">
                    Verified Projects Built:
                  </span>
                  {tech.projects.map((proj) => (
                    <div key={proj.id} className="text-xs font-code flex items-start gap-1.5">
                      <span className="text-[#c4ff36]">&bull;</span>
                      <div>
                        <strong className="text-white font-medium">{proj.name}:</strong>{' '}
                        <span className="text-[#94a3b8]">{proj.role}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── 5. OPEN SOURCE & GITHUB ENGINE (BUILD-TIME CACHED) ── */}
        <section className="max-w-[1400px] mx-auto px-4 sm:px-6 md:px-10 lg:px-16">
          <div className="p-6 sm:p-10 rounded-3xl border border-white/15 bg-[#0a0f1d]/60 backdrop-blur-xl">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <span className="w-2 h-2 rounded-full bg-[#c4ff36]" />
                  <span className="font-code text-xs text-[#c4ff36] uppercase tracking-wider font-semibold">
                    Open Source Telemetry
                  </span>
                </div>
                <h2 className="font-display font-bold text-3xl sm:text-4xl text-white">
                  GitHub Engine Snapshot
                </h2>
                <p className="text-xs sm:text-sm text-[#94a3b8] mt-1">
                  Cached build-time data directly from GitHub API (Last synced: {gh.lastUpdated}).
                </p>
              </div>

              <a
                href={`https://github.com/${gh.username}`}
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-2.5 rounded-xl bg-[#c4ff36] text-[#07090e] font-display font-bold text-xs hover:shadow-[0_0_20px_rgba(196,255,54,0.35)] transition-all active:scale-95 inline-flex items-center gap-2 shrink-0"
              >
                <span>View GitHub Profile</span>
                <ArrowUpRight className="w-4 h-4" />
              </a>
            </div>

            {/* Metrics Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
              <div className="p-4 rounded-xl border border-white/10 bg-[#080d1a]">
                <span className="font-display font-bold text-3xl text-[#c4ff36] block">
                  {gh.publicRepoCount}
                </span>
                <span className="font-code text-[11px] text-[#94a3b8] uppercase tracking-wider">
                  Public Repositories
                </span>
              </div>
              <div className="p-4 rounded-xl border border-white/10 bg-[#080d1a]">
                <span className="font-display font-bold text-3xl text-white block">
                  {gh.totalStars}
                </span>
                <span className="font-code text-[11px] text-[#94a3b8] uppercase tracking-wider">
                  Verified GitHub Stars
                </span>
              </div>
              <div className="p-4 rounded-xl border border-white/10 bg-[#080d1a]">
                <span className="font-display font-bold text-3xl text-[#06b6d4] block">
                  {gh.totalForks}
                </span>
                <span className="font-code text-[11px] text-[#94a3b8] uppercase tracking-wider">
                  Total Forks
                </span>
              </div>
              <div className="p-4 rounded-xl border border-white/10 bg-[#080d1a]">
                <span className="font-display font-bold text-3xl text-[#8b5cf6] block">
                  100%
                </span>
                <span className="font-code text-[11px] text-[#94a3b8] uppercase tracking-wider">
                  Open Source Code
                </span>
              </div>
            </div>

            {/* Featured Repositories Snapshot */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {gh.featuredRepos.slice(0, 4).map((repo) => (
                <a
                  key={repo.name}
                  href={repo.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-4 rounded-xl border border-white/10 bg-[#0d1627]/40 hover:border-[#c4ff36]/60 transition-all flex flex-col justify-between group"
                >
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-display font-bold text-sm text-white group-hover:text-[#c4ff36] transition-colors truncate">
                        {repo.name}
                      </span>
                      <span className="text-[11px] font-code text-[#c4ff36] shrink-0">
                        ★ {repo.stars}
                      </span>
                    </div>
                    <p className="text-xs text-[#94a3b8] line-clamp-3 leading-relaxed mb-3">
                      {repo.description}
                    </p>
                  </div>
                  <span className="text-[10px] font-code text-[#64748b]">
                    {repo.language}
                  </span>
                </a>
              ))}
            </div>
          </div>
        </section>

        {/* ── 6. FACTUAL FAQ (AEO & RETRIEVAL READY) ── */}
        <section className="max-w-[1400px] mx-auto px-4 sm:px-6 md:px-10 lg:px-16">
          <div className="mb-10 pb-4 border-b border-white/10">
            <h2 className="font-display font-bold text-3xl text-white">
              Frequently Asked Questions
            </h2>
            <p className="text-xs sm:text-sm text-[#94a3b8] mt-1">
              Direct factual answers addressing common queries about Tanmoy Majumder and his projects.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 rounded-2xl border border-white/10 bg-[#0d1627]/50 space-y-2">
              <h3 className="font-display font-bold text-base text-white">
                Who is Tanmoy Majumder?
              </h3>
              <p className="text-xs sm:text-sm text-[#94a3b8] leading-relaxed">
                Tanmoy Majumder (also known online as Tcode-Motion) is a coder, AI app builder, and open source contributor from West Bengal, India. He builds programming languages, native Android applications, and technical developer tools.
              </p>
            </div>

            <div className="p-6 rounded-2xl border border-white/10 bg-[#0d1627]/50 space-y-2">
              <h3 className="font-display font-bold text-base text-white">
                What is TechScript?
              </h3>
              <p className="text-xs sm:text-sm text-[#94a3b8] leading-relaxed">
                TechScript is a programming language created by Tanmoy Majumder and built in Rust. It provides English-like readable syntax (do/when/loop/end), a custom lexer, recursive-descent AST parser, and a stack-based bytecode virtual machine.
              </p>
            </div>

            <div className="p-6 rounded-2xl border border-white/10 bg-[#0d1627]/50 space-y-2">
              <h3 className="font-display font-bold text-base text-white">
                What Android apps has Tanmoy Majumder built?
              </h3>
              <p className="text-xs sm:text-sm text-[#94a3b8] leading-relaxed">
                Tanmoy built KinotiX (a 4K live wallpaper app published on Google Play), Satvora AI (a multimodal nutrition & food scanner app currently in closed testing), and Vortyx (a Material 3 download manager).
              </p>
            </div>

            <div className="p-6 rounded-2xl border border-white/10 bg-[#0d1627]/50 space-y-2">
              <h3 className="font-display font-bold text-base text-white">
                Where is Tanmoy's source code hosted?
              </h3>
              <p className="text-xs sm:text-sm text-[#94a3b8] leading-relaxed">
                All open-source projects, including TechScript, NovOS, and Vortyx, are publicly hosted on GitHub at{' '}
                <a
                  href="https://github.com/Tcode-Motion"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#c4ff36] hover:underline"
                >
                  github.com/Tcode-Motion
                </a>.
              </p>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};
