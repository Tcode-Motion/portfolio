import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { FadeIn } from '@/primitives/FadeIn';
import { getSocials } from '@/core/content/contentLoader';
import { useGithubStats } from '@/hooks/useGithubStats';

const GITHUB_USER = 'Tcode-Motion';

const LANG_COLORS: Record<string, string> = {
  TypeScript: '#3178c6',
  Dart: '#00b4ab',
  Python: '#3776ab',
  JavaScript: '#f7df1e',
  Rust: '#dea584',
  Shell: '#89e051',
  HTML: '#e34c26',
  CSS: '#563d7c',
  Kotlin: '#A97BFF',
  Java: '#b07219',
  'C++': '#f34b7d',
  C: '#555555',
};

export const GithubEngineModule: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const socials = getSocials();
  const { repos, profile, totalStars, topLangs, repoCount, loading } = useGithubStats();

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });
  const y = useTransform(scrollYProgress, [0, 1], [40, -40]);

  const featuredRepos = repos.filter(r => r.stargazers_count > 0).slice(0, 6);

  const githubUrl = socials.find(s => s.platform === 'GitHub')?.url || `https://github.com/${GITHUB_USER}`;

  return (
    <section ref={sectionRef} id="github" className="relative py-20 sm:py-28 overflow-hidden">
      <div className="max-w-[1400px] mx-auto px-6 sm:px-8 md:px-12 lg:px-20">
        {/* Header */}
        <FadeIn>
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-px bg-[var(--accent-lime)]" />
            <span className="section-label text-[var(--accent-lime)]">Open Source</span>
          </div>
        </FadeIn>

        <motion.div style={{ y }}>
          <FadeIn delay={0.1}>
            <h2 className="font-display text-4xl sm:text-5xl md:text-6xl tracking-heading leading-heading mb-4">
              GitHub<br />
              <span className="text-gradient-lime">Engine</span>
            </h2>
          </FadeIn>
        </motion.div>

        {/* Stats row */}
        {!loading && profile && (
          <FadeIn delay={0.15}>
            <div className="flex flex-wrap gap-6 sm:gap-10 mt-8 mb-10">
              {[
                { label: 'Repos', value: repoCount },
                { label: 'Total Stars', value: totalStars },
                { label: 'Followers', value: profile?.followers ?? 0 },
                { label: 'Languages', value: topLangs.length },
              ].map((stat) => (
                <div key={stat.label} className="flex flex-col">
                  <span className="font-display text-2xl sm:text-3xl text-[var(--accent-lime)]">
                    {stat.value}
                  </span>
                  <span className="text-[10px] font-code uppercase tracking-widest text-[var(--text-3)] mt-1">
                    {stat.label}
                  </span>
                </div>
              ))}
            </div>
          </FadeIn>
        )}

        {/* Language bar */}
        {!loading && topLangs.length > 0 && (
          <FadeIn delay={0.18}>
            <div className="flex gap-1 h-2 rounded-full overflow-hidden mb-10 max-w-xl">
              {topLangs.map(([lang, count]) => (
                <div
                  key={lang}
                  className="h-full rounded-full"
                  style={{
                    background: LANG_COLORS[lang] || '#888',
                    width: `${(count / repoCount) * 100}%`,
                  }}
                  title={`${lang}: ${count} repos`}
                />
              ))}
            </div>
            <div className="flex flex-wrap gap-4 mb-8">
              {topLangs.map(([lang, count]) => (
                <span key={lang} className="flex items-center gap-1.5 text-[10px] font-code text-[var(--text-3)]">
                  <span className="w-2 h-2 rounded-full" style={{ background: LANG_COLORS[lang] || '#888' }} />
                  {lang} ({count})
                </span>
              ))}
            </div>
          </FadeIn>
        )}

        {/* Repos grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {loading ? (
            Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="p-6 rounded-xl border border-[var(--border)] bg-[var(--surface-1)] animate-pulse">
                <div className="h-4 w-32 bg-[var(--surface-3)] rounded mb-4" />
                <div className="h-3 w-full bg-[var(--surface-3)] rounded mb-2" />
                <div className="h-3 w-3/4 bg-[var(--surface-3)] rounded mb-6" />
                <div className="flex gap-4">
                  <div className="h-3 w-16 bg-[var(--surface-3)] rounded" />
                  <div className="h-3 w-8 bg-[var(--surface-3)] rounded" />
                </div>
              </div>
            ))
          ) : featuredRepos.length > 0 ? (
            featuredRepos.map((repo, i) => (
              <FadeIn key={repo.name} delay={i * 0.06}>
                <a
                  href={repo.html_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group block p-6 rounded-xl border border-[var(--border)] bg-[var(--surface-1)] hover:border-[var(--accent-lime)] transition-all duration-300 magnetic-btn"
                  data-cursor="hover"
                >
                  <div className="flex items-start justify-between mb-3">
                    <span className="text-sm font-medium text-[var(--text-1)] group-hover:text-[var(--accent-lime)] transition-colors">
                      {repo.name}
                    </span>
                    <svg className="w-4 h-4 text-[var(--text-3)] group-hover:text-[var(--accent-lime)] transition-colors shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M7 17L17 7M17 7H7M17 7v10" />
                    </svg>
                  </div>
                  <p className="text-xs text-[var(--text-3)] leading-body mb-4 min-h-[2rem] line-clamp-2">
                    {repo.description || 'No description'}
                  </p>
                  {repo.topics.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 mb-4">
                      {repo.topics.slice(0, 3).map((t) => (
                        <span key={t} className="px-2 py-0.5 text-[9px] font-code rounded-full bg-[var(--surface-2)] text-[var(--text-3)] border border-[var(--border)]">
                          {t}
                        </span>
                      ))}
                    </div>
                  )}
                  <div className="flex items-center gap-4 text-[10px] font-code text-[var(--text-3)]">
                    {repo.language && (
                      <span className="flex items-center gap-1.5">
                        <span
                          className="w-2 h-2 rounded-full"
                          style={{ background: LANG_COLORS[repo.language] || '#888' }}
                        />
                        {repo.language}
                      </span>
                    )}
                    {repo.stargazers_count > 0 && <span>{'\u2605'} {repo.stargazers_count}</span>}
                    {repo.forks_count > 0 && <span>{'\u2442'} {repo.forks_count}</span>}
                  </div>
                </a>
              </FadeIn>
            ))
          ) : (
            <div className="col-span-full text-center py-12">
              <p className="text-[var(--text-3)] text-sm">
                <span className="block mb-2">Unable to fetch repos</span>
                <a
                  href={githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[var(--accent-lime)] hover:underline"
                >
                  View profile directly
                </a>
              </p>
            </div>
          )}
        </div>

        {/* CTA */}
        <FadeIn delay={0.4}>
          <div className="mt-8 text-center">
            <a
              href={githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 text-sm font-medium rounded-full border border-[var(--border)] text-[var(--text-2)] hover:border-[var(--accent-lime)] hover:text-[var(--accent-lime)] transition-all magnetic-btn"
            >
              View All {profile?.public_repos ? `(${profile.public_repos})` : ''} on GitHub
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </a>
          </div>
        </FadeIn>
      </div>
    </section>
  );
};
