import React from 'react';
import { Link } from 'react-router-dom';
import { SeoHead } from '@/core/seo/SeoHead';
import { getNowData } from '@/core/content/contentLoader';
import { Clock, MapPin, Target, ArrowUpRight, Home } from 'lucide-react';

export const NowPage: React.FC = () => {
  const now = getNowData();

  return (
    <>
      <SeoHead
        title="What I'm Doing Now — Tanmoy Majumder (Tcode-Motion)"
        description="Current focus, active software development projects, maintenance tasks, and technical experiments by Tanmoy Majumder as of September 2026."
        slug="now"
        breadcrumbs={[{ name: 'Now', item: 'https://tanmoy.is-a.dev/now' }]}
        jsonLd={[
          {
            '@context': 'https://schema.org',
            '@type': 'WebPage',
            '@id': 'https://tanmoy.is-a.dev/now#page',
            name: 'What I Am Doing Now — Tanmoy Majumder',
            url: 'https://tanmoy.is-a.dev/now',
            description: 'Current development focus, active software projects, and recently shipped work by Tanmoy Majumder.',
            author: { '@id': 'https://tanmoy.is-a.dev/#person' },
            dateModified: now.lastUpdated
          }
        ]}
      />

      <article className="max-w-[900px] mx-auto px-4 sm:px-6 md:px-10 pt-28 pb-20 space-y-10">
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
          <span className="text-[#c4ff36]">Now</span>
        </nav>

        {/* Header */}
        <header className="space-y-4 pb-8 border-b border-white/10">
          <div className="flex flex-wrap items-center gap-4 text-xs font-code text-[#94a3b8]">
            <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#c4ff36]/10 text-[#c4ff36] border border-[#c4ff36]/20">
              <Clock className="w-3.5 h-3.5" />
              <span>Last updated: {now.lastUpdated}</span>
            </div>
            <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/5 border border-white/10">
              <MapPin className="w-3.5 h-3.5 text-[#06b6d4]" />
              <span>{now.location}</span>
            </div>
          </div>

          <h1 className="font-display font-extrabold text-4xl sm:text-6xl text-white tracking-tight">
            Now.
          </h1>

          <p className="font-body text-base sm:text-lg text-[#94a3b8] leading-relaxed max-w-2xl">
            This is a living <a href="https://nownownow.com/about" target="_blank" rel="noopener noreferrer" className="text-[#c4ff36] hover:underline">now page</a> detailing my active technical priorities, current codebase experiments, and recently shipped software.
          </p>

          <div className="p-4 rounded-xl border border-white/10 bg-[#0d1627]/60 flex items-start gap-3">
            <Target className="w-4 h-4 text-[#c4ff36] shrink-0 mt-0.5" />
            <div>
              <strong className="text-white text-xs sm:text-sm font-semibold block">Current Primary Focus:</strong>
              <span className="text-xs sm:text-sm text-[#94a3b8]">{now.currentFocus}</span>
            </div>
          </div>
        </header>

        {/* Dynamic Sections */}
        <div className="space-y-10">
          {now.sections.map((section) => (
            <section key={section.category} className="space-y-4">
              <h2 className="font-display font-bold text-2xl text-white border-l-2 border-[#c4ff36] pl-3">
                {section.category}
              </h2>

              <div className="grid grid-cols-1 gap-4">
                {section.items.map((item) => (
                  <div
                    key={item.title}
                    className="p-5 rounded-2xl border border-white/10 bg-[#0d1627]/40 hover:border-white/20 transition-all space-y-2"
                  >
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <h3 className="font-display font-bold text-base text-white">
                        {item.title}
                      </h3>
                      {item.status && (
                        <span className="text-[10px] font-code px-2 py-0.5 rounded bg-white/5 border border-white/10 text-[#c4ff36]">
                          {item.status}
                        </span>
                      )}
                      {item.date && (
                        <span className="text-[10px] font-code text-[#64748b]">
                          {item.date}
                        </span>
                      )}
                    </div>

                    <p className="text-xs sm:text-sm text-[#94a3b8] leading-relaxed">
                      {item.description}
                    </p>

                    {item.link && (
                      <div className="pt-2">
                        {item.link.startsWith('http') ? (
                          <a
                            href={item.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1.5 text-xs font-code text-[#06b6d4] hover:underline"
                          >
                            <span>Learn more</span>
                            <ArrowUpRight className="w-3.5 h-3.5" />
                          </a>
                        ) : (
                          <Link
                            to={item.link}
                            className="inline-flex items-center gap-1.5 text-xs font-code text-[#c4ff36] hover:underline"
                          >
                            <span>Explore dedicated page</span>
                            <ArrowUpRight className="w-3.5 h-3.5" />
                          </Link>
                        )}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </section>
          ))}
        </div>

        {/* Footer Navigation */}
        <footer className="pt-8 border-t border-white/10 flex flex-wrap items-center justify-between gap-4 text-xs font-code text-[#94a3b8]">
          <span>Inspired by Derek Sivers' /now page movement.</span>
          <Link to="/workflow" className="text-[#c4ff36] hover:underline">
            Read How I Build Software &rarr;
          </Link>
        </footer>
      </article>
    </>
  );
};
