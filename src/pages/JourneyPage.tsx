import React from 'react';
import { Link } from 'react-router-dom';
import { SeoHead } from '@/core/seo/SeoHead';
import { getJourneyData } from '@/core/content/contentLoader';
import { GitBranch, Home } from 'lucide-react';

export const JourneyPage: React.FC = () => {
  const journey = getJourneyData();

  return (
    <>
      <SeoHead
        title="Engineering Journey & Milestones — Tanmoy Majumder (Tcode-Motion)"
        description="The technical evolution of Tanmoy Majumder: from early programming in C and Python to architecting compilers in Rust and publishing Android apps on Google Play."
        slug="journey"
        breadcrumbs={[{ name: 'Journey', item: 'https://tanmoy.is-a.dev/journey' }]}
        jsonLd={[
          {
            '@context': 'https://schema.org',
            '@type': 'WebPage',
            '@id': 'https://tanmoy.is-a.dev/journey#page',
            name: 'Engineering Journey — Tanmoy Majumder',
            url: 'https://tanmoy.is-a.dev/journey',
            description: 'Chronological technical timeline and verified engineering milestones of Tanmoy Majumder.',
            author: { '@id': 'https://tanmoy.is-a.dev/#person' }
          }
        ]}
      />

      <article className="max-w-[1000px] mx-auto px-4 sm:px-6 md:px-10 pt-28 pb-20 space-y-12">
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
          <span className="text-[#8b5cf6]">Milestones &amp; Journey</span>
        </nav>

        {/* Header */}
        <header className="space-y-4 pb-8 border-b border-white/10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#8b5cf6]/10 border border-[#8b5cf6]/25 text-[#8b5cf6]">
            <GitBranch className="w-3.5 h-3.5" />
            <span className="font-code text-xs uppercase tracking-wider font-semibold">
              Verified Technical Evolution
            </span>
          </div>

          <h1 className="font-display font-extrabold text-4xl sm:text-6xl text-white tracking-tight">
            Engineering Journey
          </h1>

          <p className="font-body text-lg sm:text-xl text-[#94a3b8] max-w-2xl leading-relaxed">
            {journey.tagline}
          </p>
        </header>

        {/* Timeline Sequence */}
        <div className="relative border-l border-white/15 ml-4 sm:ml-8 pl-6 sm:pl-10 space-y-12">
          {journey.milestones.map((m) => (
            <div key={m.year} className="relative group">
              {/* Year Marker Bead */}
              <div className="absolute -left-[31px] sm:-left-[47px] top-1.5 w-4 h-4 rounded-full bg-[#07090e] border-2 border-[#c4ff36] group-hover:scale-125 transition-transform" />

              <div className="p-6 sm:p-8 rounded-2xl border border-white/10 bg-[#0d1627]/50 hover:border-white/20 transition-all space-y-3">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <span className="font-display font-bold text-2xl text-[#c4ff36]">
                    {m.year}
                  </span>
                  <span className="font-code text-xs px-2.5 py-0.5 rounded-full bg-white/5 text-[#94a3b8]">
                    {m.phase}
                  </span>
                </div>

                <p className="text-sm sm:text-base text-[#cbd5e1] leading-relaxed">
                  {m.summary}
                </p>

                <div className="p-3 rounded-xl bg-black/40 border border-white/5 text-xs text-[#94a3b8]">
                  <strong className="text-white font-medium">Key Milestone:</strong> {m.highlight}
                </div>

                <div className="flex flex-wrap gap-1.5 pt-2">
                  {m.technologies.map((t) => (
                    <span
                      key={t}
                      className="px-2 py-0.5 rounded text-[10px] font-code bg-white/5 border border-white/10 text-[#64748b]"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Footer Navigation */}
        <footer className="pt-8 border-t border-white/10 flex flex-wrap items-center justify-between gap-4 text-xs font-code text-[#94a3b8]">
          <Link to="/about" className="text-white hover:underline">
            &larr; Read About Tanmoy
          </Link>
          <Link to="/now" className="text-[#c4ff36] hover:underline">
            See What I'm Doing Now &rarr;
          </Link>
        </footer>
      </article>
    </>
  );
};
