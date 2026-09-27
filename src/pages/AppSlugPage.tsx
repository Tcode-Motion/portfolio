import React from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { getAppById } from '@/core/content/contentLoader';
import { SeoHead } from '@/core/seo/SeoHead';
import {
  ArrowLeft,
  ExternalLink,
  ShieldCheck,
  CheckCircle2,
  Cpu,
  Play,
  Download,
  AlertCircle,
  Home
} from 'lucide-react';

export const AppSlugPage: React.FC = () => {
  const { id, slug } = useParams<{ id?: string; slug?: string }>();
  const appId = id || slug;
  const app = appId ? getAppById(appId) : undefined;

  if (!app) {
    return <Navigate to="/apps" replace />;
  }

  return (
    <>
      <SeoHead
        title={`${app.name} — Android App by Tanmoy Majumder`}
        description={`${app.tagline} — Developed by Tanmoy Majumder. ${app.summary.slice(0, 150)}...`}
        slug={`apps/${app.id}`}
        breadcrumbs={[
          { name: 'Apps', item: 'https://tanmoy.is-a.dev/apps' },
          { name: app.name, item: `https://tanmoy.is-a.dev/apps/${app.id}` },
        ]}
        jsonLd={[
          {
            '@context': 'https://schema.org',
            '@type': 'SoftwareApplication',
            '@id': `https://tanmoy.is-a.dev/apps/${app.id}#app`,
            name: app.name,
            operatingSystem: app.platform,
            applicationCategory: app.category,
            description: app.summary,
            author: { '@id': 'https://tanmoy.is-a.dev/#person' },
            creator: { '@id': 'https://tanmoy.is-a.dev/#person' },
            url: `https://tanmoy.is-a.dev/apps/${app.id}`,
            downloadUrl: app.downloadUrl || app.playStoreUrl || undefined,
            keywords: app.techStack,
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
          <span className="text-white/20">/</span>
          <Link
            to="/apps"
            className="inline-flex items-center gap-1 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>All Apps</span>
          </Link>
          <span className="text-white/20">/</span>
          <span className="text-[#06b6d4]">{app.name}</span>
        </nav>

        {/* Product Hero */}
        <header className="space-y-6 pb-8 border-b border-white/10">
          <div className="flex flex-wrap items-center gap-3">
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
            <span className="text-xs font-code text-[#94a3b8] bg-white/5 px-3 py-1 rounded-full border border-white/10">
              {app.platform}
            </span>
          </div>

          <div className="space-y-2">
            <h1 className="font-display font-extrabold text-4xl sm:text-6xl text-white tracking-tight">
              {app.name}
            </h1>
            <p className="font-body text-lg sm:text-xl text-[#94a3b8] leading-relaxed max-w-2xl">
              {app.tagline}
            </p>
          </div>

          {app.packageId && (
            <div className="font-code text-xs text-[#94a3b8] bg-[#0d1627] p-3 rounded-xl border border-white/10 flex items-center justify-between max-w-md">
              <span className="text-[#64748b]">Android Package ID:</span>
              <span className="text-white font-mono">{app.packageId}</span>
            </div>
          )}

          {/* Action CTAs */}
          <div className="flex flex-wrap items-center gap-4 pt-2">
            {app.playStoreUrl && (
              <a
                href={app.playStoreUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#c4ff36] text-[#07090e] font-display font-bold text-xs hover:shadow-[0_0_20px_rgba(196,255,54,0.4)] transition-all"
              >
                <Play className="w-4 h-4 fill-current" />
                <span>Open in Google Play Store</span>
              </a>
            )}

            {app.testingUrl && (
              <a
                href={app.testingUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-xl border border-[#f59e0b]/40 bg-[#f59e0b]/10 text-[#f59e0b] font-code text-xs font-semibold hover:bg-[#f59e0b]/20 transition-all"
              >
                <AlertCircle className="w-4 h-4" />
                <span>Join Closed Testing Program</span>
              </a>
            )}

            {app.downloadUrl && !app.playStoreUrl && (
              <a
                href={app.downloadUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white/10 hover:bg-white/20 border border-white/15 text-white font-code text-xs font-semibold transition-all"
              >
                <Download className="w-4 h-4" />
                <span>Download Application</span>
              </a>
            )}

            {app.officialUrl && !app.officialUrl.includes('is-a.dev') && (
              <a
                href={app.officialUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-4 py-3 rounded-xl border border-white/10 text-xs font-code text-[#94a3b8] hover:text-white"
              >
                <span>Official Product Site</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            )}

            {app.githubUrl && (
              <a
                href={app.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-4 py-3 rounded-xl border border-white/10 text-xs font-code text-[#94a3b8] hover:text-white"
              >
                <span>GitHub Repository</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            )}
          </div>
        </header>

        {/* Product Overview */}
        <section className="space-y-4">
          <h2 className="font-display font-bold text-2xl text-white">
            Product Overview &amp; Purpose
          </h2>
          <p className="text-sm sm:text-base text-[#94a3b8] leading-relaxed">
            {app.summary}
          </p>
        </section>

        {/* Key Capabilities */}
        <section className="space-y-4">
          <h2 className="font-display font-bold text-2xl text-white">
            Key Architectural Highlights
          </h2>
          <div className="grid grid-cols-1 gap-3">
            {app.highlights.map((hl, i) => (
              <div
                key={i}
                className="p-4 rounded-xl border border-white/10 bg-[#0d1627]/40 flex items-start gap-3"
              >
                <CheckCircle2 className="w-4 h-4 text-[#c4ff36] shrink-0 mt-0.5" />
                <span className="text-xs sm:text-sm text-[#cbd5e1] leading-relaxed">
                  {hl}
                </span>
              </div>
            ))}
          </div>
        </section>

        {/* Technical Architecture Pipeline */}
        {app.architecture && (
          <section className="space-y-4">
            <h2 className="font-display font-bold text-2xl text-white flex items-center gap-2">
              <Cpu className="w-5 h-5 text-[#06b6d4]" />
              <span>Technical Data Flow &amp; Pipeline</span>
            </h2>
            <div className="p-6 rounded-2xl border border-white/10 bg-[#080d1a] font-code text-xs sm:text-sm text-[#c4ff36] leading-relaxed overflow-x-auto">
              {app.architecture}
            </div>
          </section>
        )}

        {/* Testing / Release Status Details */}
        {app.testingDetails && (
          <section className="p-6 rounded-2xl border border-white/10 bg-[#0d1627]/60 space-y-2">
            <h3 className="font-display font-bold text-base text-white flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-[#10b981]" />
              <span>Verification &amp; Deployment Truth</span>
            </h3>
            <p className="text-xs sm:text-sm text-[#94a3b8] leading-relaxed">
              {app.testingDetails}
            </p>
          </section>
        )}

        {/* Technology Stack Grid */}
        <section className="space-y-4">
          <h2 className="font-display font-bold text-xl text-white">
            Technologies &amp; Libraries Used
          </h2>
          <div className="flex flex-wrap gap-2">
            {app.techStack.map((tech) => (
              <span
                key={tech}
                className="px-3 py-1 rounded-lg text-xs font-code bg-white/5 border border-white/10 text-white"
              >
                {tech}
              </span>
            ))}
          </div>
        </section>

        {/* Author Ownership Box */}
        <footer className="pt-8 border-t border-white/10 flex flex-wrap items-center justify-between gap-4 text-xs font-code text-[#64748b]">
          <div>
            Built by <strong className="text-white font-medium">Tanmoy Majumder</strong> (Tcode-Motion). First-party source.
          </div>
          <Link to="/apps" className="text-[#c4ff36] hover:underline">
            &larr; View all applications
          </Link>
        </footer>
      </article>
    </>
  );
};
