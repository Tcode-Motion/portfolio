import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { SeoHead } from '@/core/seo/SeoHead';
import { getAllApps } from '@/core/content/contentLoader';
import { Smartphone, ExternalLink, ArrowUpRight, CheckCircle2, Play, Search, Home } from 'lucide-react';

export const AppsPage: React.FC = () => {
  const apps = getAllApps();
  const [searchQuery, setSearchQuery] = useState('');

  const filteredApps = apps.filter((app) => {
    const q = searchQuery.toLowerCase();
    return (
      app.name.toLowerCase().includes(q) ||
      app.tagline.toLowerCase().includes(q) ||
      app.category.toLowerCase().includes(q) ||
      app.techStack.some((t) => t.toLowerCase().includes(q))
    );
  });

  return (
    <>
      <SeoHead
        title="Android Applications & Mobile Software — Tanmoy Majumder (Tcode-Motion)"
        description="Official Android and mobile application directory by Tanmoy Majumder. Featuring KinotiX (4K Live & 3D Wallpaper on Google Play), Satvora AI (multimodal nutrition scanner), NeoSketch, and Vortyx."
        slug="apps"
        breadcrumbs={[{ name: 'Apps', item: 'https://tanmoy.is-a.dev/apps' }]}
        jsonLd={[
          {
            '@context': 'https://schema.org',
            '@type': 'CollectionPage',
            '@id': 'https://tanmoy.is-a.dev/apps#collection',
            name: 'Android & Mobile Applications by Tanmoy Majumder',
            url: 'https://tanmoy.is-a.dev/apps',
            description: 'Verified catalog of Android applications built and published by Tanmoy Majumder.',
            author: { '@id': 'https://tanmoy.is-a.dev/#person' },
            hasPart: apps.map((app) => ({
              '@type': 'SoftwareApplication',
              name: app.name,
              operatingSystem: app.platform,
              applicationCategory: app.category,
              url: `https://tanmoy.is-a.dev/apps/${app.id}`,
              downloadUrl: app.downloadUrl || app.playStoreUrl
            }))
          }
        ]}
      />

      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 md:px-10 lg:px-16 pt-28 pb-20 space-y-8">
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
          <span className="text-[#10b981]">Applications</span>
        </nav>

        {/* Header */}
        <header className="space-y-4 pb-8 border-b border-white/10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#10b981]/10 border border-[#10b981]/25 text-[#10b981]">
            <Smartphone className="w-3.5 h-3.5" />
            <span className="font-code text-xs uppercase tracking-wider font-semibold">
              Android &amp; Native Application Directory
            </span>
          </div>

          <h1 className="font-display font-extrabold text-4xl sm:text-6xl text-white tracking-tight">
            Applications &amp; Mobile Software
          </h1>

          <p className="font-body text-base sm:text-xl text-[#94a3b8] max-w-3xl leading-relaxed">
            A verified directory of mobile products and client applications built by Tanmoy Majumder. Features production software on Google Play, beta testing tracks, and offline-first native architectures.
          </p>

          <div className="flex flex-wrap items-center gap-4 pt-2">
            <a
              href="https://play.google.com/store/apps/dev?id=8946471561851740040"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-code text-[#c4ff36] transition-all"
            >
              <Play className="w-3.5 h-3.5 fill-[#c4ff36]" />
              <span>Google Play Developer Console (ID: 8946471561851740040)</span>
              <ExternalLink className="w-3 h-3 text-[#64748b]" />
            </a>
          </div>
        </header>

        {/* Search & Filter Bar */}
        <div className="flex items-center gap-3 p-3 rounded-2xl border border-white/10 bg-[#0d1627]/60 max-w-md">
          <Search className="w-4 h-4 text-[#64748b] shrink-0 ml-1" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search applications by name, tech or feature..."
            className="w-full bg-transparent text-sm text-white placeholder-[#64748b] focus:outline-none font-sans"
          />
        </div>

        {/* Apps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {filteredApps.map((app) => (
            <article
              key={app.id}
              className="p-6 sm:p-8 rounded-3xl border border-white/10 bg-[#0d1627]/60 hover:bg-[#121c33]/80 hover:border-[#c4ff36]/60 transition-all duration-300 backdrop-blur-md flex flex-col justify-between space-y-6 shadow-md"
            >
              <div className="space-y-4">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <span className="text-xs font-code text-[#06b6d4] bg-[#06b6d4]/10 px-3 py-1 rounded-full border border-[#06b6d4]/20">
                    {app.category}
                  </span>
                  <span
                    className={`text-xs font-code px-3 py-1 rounded-full font-semibold ${
                      app.isReleased
                        ? 'bg-[#10b981]/20 text-[#10b981] border border-[#10b981]/40'
                        : 'bg-[#f59e0b]/20 text-[#f59e0b] border border-[#f59e0b]/40'
                    }`}
                  >
                    {app.status}
                  </span>
                </div>

                <div>
                  <h2 className="font-display font-bold text-2xl sm:text-3xl text-white">
                    {app.name}
                  </h2>
                  <p className="font-body text-sm text-[#94a3b8] mt-1 leading-relaxed">
                    {app.tagline}
                  </p>
                </div>

                {app.packageId && (
                  <div className="text-xs font-code text-[#64748b] bg-black/40 px-3 py-1.5 rounded-lg border border-white/5 truncate">
                    Package ID: <span className="text-white/80">{app.packageId}</span>
                  </div>
                )}

                <p className="text-xs sm:text-sm text-[#cbd5e1] leading-relaxed">
                  {app.summary}
                </p>

                <div className="space-y-1.5 pt-2">
                  <span className="text-[11px] font-code text-[#64748b] uppercase tracking-wider block">
                    Core Technical Capabilities:
                  </span>
                  <ul className="space-y-1 text-xs text-[#94a3b8]">
                    {app.highlights.slice(0, 3).map((hl, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#c4ff36] shrink-0 mt-0.5" />
                        <span>{hl}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="flex flex-wrap gap-1.5 pt-2">
                  {app.techStack.map((tech) => (
                    <span
                      key={tech}
                      className="px-2 py-0.5 rounded text-[10px] font-code bg-white/5 border border-white/10 text-[#94a3b8]"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Action Links */}
              <div className="pt-6 border-t border-white/10 flex flex-wrap items-center justify-between gap-3">
                <Link
                  to={`/apps/${app.id}`}
                  className="inline-flex items-center gap-1.5 text-xs font-code font-bold text-[#c4ff36] hover:underline"
                >
                  <span>Detailed Product Case Study</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </Link>

                <div className="flex items-center gap-3">
                  {app.playStoreUrl && (
                    <a
                      href={app.playStoreUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-xs font-code text-white bg-white/10 hover:bg-white/20 px-3 py-1.5 rounded-lg transition-colors"
                    >
                      <Play className="w-3 h-3 fill-current" />
                      <span>Play Store</span>
                    </a>
                  )}
                  {app.officialUrl && !app.officialUrl.includes('is-a.dev') && (
                    <a
                      href={app.officialUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-xs font-code text-[#94a3b8] hover:text-white"
                    >
                      <span>Website</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  )}
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </>
  );
};
