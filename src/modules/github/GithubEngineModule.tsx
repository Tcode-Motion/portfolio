import React, { useState, useRef } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { Sparkles, GitFork, Star, ArrowUpRight, ChevronLeft, ChevronRight } from 'lucide-react';
import { FadeIn } from '@/primitives/FadeIn';
import { getSocials } from '@/core/content/contentLoader';
import { useGithubStats } from '@/hooks/useGithubStats';

const GITHUB_USER = 'Tcode-Motion';

const LANG_COLORS: Record<string, string> = {
  TypeScript: '#38bdf8',
  Dart: '#00b4ab',
  Python: '#ec4899',
  JavaScript: '#f7df1e',
  Rust: '#c4ff36',
  Shell: '#89e051',
  HTML: '#e34c26',
  CSS: '#8b5cf6',
  Kotlin: '#A97BFF',
  Java: '#b07219',
  'C++': '#f34b7d',
  C: '#f59e0b',
};

const FLAGSHIP_REPOS = ['techscript', 'novos', 'wallvault', 'os-wallpapers', 'vortyx', 'neosketch'];

export const GithubEngineModule: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const socials = getSocials();
  const { repos, profile, totalStars, topLangs, repoCount, loading } = useGithubStats();
  const [currentPage, setCurrentPage] = useState(1);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });
  const y = useTransform(scrollYProgress, [0, 1], [40, -40]);

  // Intelligent ranking logic: Flagships & stars first, profile site repo last
  const getRepoRank = (repo: any): number => {
    const nameLower = (repo.name || '').toLowerCase();
    if (nameLower.includes('github.io') || nameLower === 'tcode-motion') return 999;
    const isFlagship = FLAGSHIP_REPOS.some(f => nameLower.includes(f));
    if (isFlagship) return 1;
    if (repo.stargazers_count > 0 && repo.description) return 2;
    if (repo.description) return 3;
    return 4;
  };

  const sortedRepos = [...repos].sort((a, b) => {
    const rankA = getRepoRank(a);
    const rankB = getRepoRank(b);
    if (rankA !== rankB) return rankA - rankB;
    return b.stargazers_count - a.stargazers_count;
  });

  const ITEMS_PER_PAGE = 6;
  const totalPages = Math.ceil(sortedRepos.length / ITEMS_PER_PAGE) || 1;
  const paginatedRepos = sortedRepos.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE);

  const githubUrl = socials.find(s => s.platform === 'GitHub')?.url || `https://github.com/${GITHUB_USER}`;

  return (
    <section ref={sectionRef} id="github" className="relative py-20 sm:py-28 overflow-hidden z-10">
      {/* Background ambient glow */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[850px] h-[850px] pointer-events-none opacity-25"
        style={{
          background: 'radial-gradient(circle, rgba(196,255,54,0.06) 0%, rgba(139,92,246,0.03) 50%, transparent 70%)',
        }}
      />

      <div className="max-w-[1400px] mx-auto px-6 sm:px-8 md:px-12 lg:px-20 relative z-10">
        {/* Ultra-Translucent Frosted Dark Glass Container Card */}
        <div className="p-5 sm:p-12 md:p-14 rounded-3xl border border-white/15 bg-[#0a0f1d]/40 backdrop-blur-2xl shadow-[0_25px_60px_rgba(0,0,0,0.6)] relative z-10 overflow-hidden">
          {/* Top glowing accent line */}
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#c4ff36]/50 to-transparent" />

          {/* Header */}
          <FadeIn>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-px bg-[var(--accent-lime)] shadow-[0_0_8px_#c4ff36]" />
              <span className="section-label text-[var(--accent-lime)] tracking-widest uppercase">Open Source</span>
            </div>
          </FadeIn>

          <motion.div style={{ y }}>
            <FadeIn delay={0.1}>
              <h2 className="font-display text-4xl sm:text-5xl md:text-6xl tracking-heading leading-heading mb-4 text-white font-bold">
                GitHub <span className="text-gradient-lime">Engine</span>
              </h2>
              <p className="text-[#94a3b8] text-sm sm:text-base max-w-lg mb-8 leading-relaxed">
                Live open-source statistics & repositories synchronized directly from GitHub.
              </p>
            </FadeIn>
          </motion.div>

          {/* Stats row */}
          {!loading && profile && (
            <FadeIn delay={0.15}>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-5 rounded-2xl border border-white/10 bg-[#0d1527]/60 backdrop-blur-md mb-8">
                {[
                  { label: 'Repos', value: repoCount },
                  { label: 'Total Stars', value: totalStars },
                  { label: 'Followers', value: profile?.followers ?? 0 },
                  { label: 'Languages', value: topLangs.length },
                ].map((stat) => (
                  <div key={stat.label} className="flex flex-col p-2">
                    <span className="font-display text-3xl sm:text-4xl text-[#c4ff36] font-bold drop-shadow-[0_0_10px_rgba(196,255,54,0.3)]">
                      {stat.value}
                    </span>
                    <span className="text-[10px] font-code uppercase tracking-widest text-[#94a3b8] mt-1">
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
              <div className="mb-10 p-5 rounded-2xl border border-white/10 bg-[#0d1527]/40 backdrop-blur-md">
                <div className="flex justify-between items-center mb-3">
                  <span className="text-xs font-code text-[#94a3b8] font-semibold">Language Distribution</span>
                  <Sparkles className="w-3.5 h-3.5 text-[#c4ff36]" />
                </div>
                <div className="flex gap-1 h-2.5 rounded-full overflow-hidden mb-4 bg-[#080d1a] border border-white/5">
                  {topLangs.map(([lang, count]) => (
                    <div
                      key={lang}
                      className="h-full rounded-full transition-all duration-300"
                      style={{
                        background: LANG_COLORS[lang] || '#888',
                        width: `${(count / repoCount) * 100}%`,
                      }}
                      title={`${lang}: ${count} repos`}
                    />
                  ))}
                </div>
                <div className="flex flex-wrap gap-4">
                  {topLangs.map(([lang, count]) => (
                    <span key={lang} className="flex items-center gap-2 text-xs font-code text-white">
                      <span className="w-2.5 h-2.5 rounded-full" style={{ background: LANG_COLORS[lang] || '#888', boxShadow: `0 0 6px ${LANG_COLORS[lang] || '#888'}` }} />
                      <span>{lang}</span>
                      <span className="text-[#94a3b8]">({count})</span>
                    </span>
                  ))}
                </div>
              </div>
            </FadeIn>
          )}

          {/* Repos grid header & pagination bar */}
          <div className="flex items-center justify-between mb-5">
            <span className="text-xs font-code text-[#94a3b8] font-semibold">
              Top Repositories (Page {currentPage} of {totalPages})
            </span>
            {totalPages > 1 && (
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                  disabled={currentPage === 1}
                  className="p-1.5 rounded-lg border border-white/10 text-white disabled:opacity-30 disabled:cursor-not-allowed hover:border-[#c4ff36] hover:text-[#c4ff36] transition-all"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                {Array.from({ length: totalPages }).map((_, idx) => {
                  const pNum = idx + 1;
                  return (
                    <button
                      key={pNum}
                      onClick={() => setCurrentPage(pNum)}
                      className={`w-7 h-7 text-xs font-code font-bold rounded-lg border transition-all ${
                        currentPage === pNum
                          ? 'border-[#c4ff36] text-[#c4ff36] bg-[#c4ff36]/15'
                          : 'border-white/10 text-[#94a3b8] hover:text-white'
                      }`}
                    >
                      {pNum}
                    </button>
                  );
                })}
                <button
                  onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                  disabled={currentPage === totalPages}
                  className="p-1.5 rounded-lg border border-white/10 text-white disabled:opacity-30 disabled:cursor-not-allowed hover:border-[#c4ff36] hover:text-[#c4ff36] transition-all"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            )}
          </div>

          {/* Repos grid */}
          <div className="flex sm:grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-10 overflow-x-auto sm:overflow-visible scrollbar-none snap-x snap-mandatory pb-4 sm:pb-0 min-h-[300px]">
            {loading ? (
              Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="p-6 rounded-2xl border border-white/10 bg-[#0d1527]/60 animate-pulse shrink-0 w-[275px] sm:w-auto snap-center">
                  <div className="h-5 w-36 bg-white/10 rounded mb-4" />
                  <div className="h-3 w-full bg-white/10 rounded mb-2" />
                  <div className="h-3 w-3/4 bg-white/10 rounded mb-6" />
                  <div className="flex gap-4">
                    <div className="h-3 w-16 bg-white/10 rounded" />
                    <div className="h-3 w-8 bg-white/10 rounded" />
                  </div>
                </div>
              ))
            ) : paginatedRepos.length > 0 ? (
              <AnimatePresence mode="wait">
                {paginatedRepos.map((repo, i) => (
                  <motion.a
                    key={repo.name}
                    href={repo.html_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -15 }}
                    transition={{ duration: 0.25, delay: i * 0.04 }}
                    className="group flex flex-col justify-between p-6 rounded-2xl border border-white/12 bg-[#0d1527]/85 hover:bg-[#121c33] hover:border-[#c4ff36]/60 backdrop-blur-md transition-all duration-300 hover:-translate-y-1 shadow-md h-full shrink-0 w-[275px] sm:w-auto snap-center"
                    data-cursor="hover"
                  >
                    <div>
                      <div className="flex items-start justify-between mb-3 gap-2">
                        <span className="text-base font-bold text-white group-hover:text-[#c4ff36] transition-colors truncate">
                          {repo.name}
                        </span>
                        <ArrowUpRight className="w-4 h-4 text-[#94a3b8] group-hover:text-[#c4ff36] transition-colors shrink-0" />
                      </div>
                      <p className="text-xs text-[#94a3b8] leading-relaxed mb-4 min-h-[2.5rem] line-clamp-2">
                        {repo.description || 'No description provided'}
                      </p>
                      {repo.topics && repo.topics.length > 0 && (
                        <div className="flex flex-wrap gap-1.5 mb-5">
                          {repo.topics.slice(0, 3).map((t) => (
                            <span key={t} className="px-2.5 py-0.5 text-[10px] font-code rounded-full bg-[#080d1a] text-[#94a3b8] border border-white/10">
                              {t}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>

                    <div className="flex items-center gap-4 text-xs font-code text-[#94a3b8] pt-3 border-t border-white/5">
                      {repo.language && (
                        <span className="flex items-center gap-1.5 text-white font-semibold">
                          <span
                            className="w-2.5 h-2.5 rounded-full"
                            style={{ background: LANG_COLORS[repo.language] || '#888', boxShadow: `0 0 6px ${LANG_COLORS[repo.language] || '#888'}` }}
                          />
                          {repo.language}
                        </span>
                      )}
                      {repo.stargazers_count > 0 && (
                        <span className="flex items-center gap-1 text-[#c4ff36] font-semibold">
                          <Star className="w-3.5 h-3.5 fill-[#c4ff36]" /> {repo.stargazers_count}
                        </span>
                      )}
                      {repo.forks_count > 0 && (
                        <span className="flex items-center gap-1 text-[#38bdf8]">
                          <GitFork className="w-3.5 h-3.5" /> {repo.forks_count}
                        </span>
                      )}
                    </div>
                  </motion.a>
                ))}
              </AnimatePresence>
            ) : (
              <div className="col-span-full text-center py-12">
                <p className="text-[#94a3b8] text-sm">
                  <span className="block mb-2">Unable to fetch repos</span>
                  <a
                    href={githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#c4ff36] hover:underline"
                  >
                    View profile directly
                  </a>
                </p>
              </div>
            )}
          </div>

          {/* CTA & Page Indicator */}
          <FadeIn delay={0.3}>
            <div className="flex flex-col sm:flex-row items-center justify-between pt-2 gap-4 border-t border-white/10">
              <span className="text-xs font-code text-[#94a3b8]">
                Showing {paginatedRepos.length} of {sortedRepos.length} repositories
              </span>
              <a
                href={githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2.5 px-6 py-3 text-xs font-code font-bold rounded-full border border-[#c4ff36]/40 text-[#c4ff36] bg-[#c4ff36]/10 hover:bg-[#c4ff36] hover:text-black transition-all shadow-[0_0_20px_rgba(196,255,54,0.15)]"
              >
                <span>View All ({sortedRepos.length}) on GitHub</span>
                <ArrowUpRight className="w-4 h-4" />
              </a>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
};
