import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { SeoHead } from '@/core/seo/SeoHead';
import { getProfile, getSocials } from '@/core/content/contentLoader';
import {
  Copy,
  Check,
  ArrowUpRight,
  Sparkles,
  Send,
  Home
} from 'lucide-react';

export const ConnectPage: React.FC = () => {
  const profile = getProfile();
  const socials = getSocials();
  const [copied, setCopied] = useState(false);
  const [subject, setSubject] = useState('collaboration');
  const [senderName, setSenderName] = useState('');
  const [message, setMessage] = useState('');

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(profile.contactEmail);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSendMail = (e: React.FormEvent) => {
    e.preventDefault();
    const mailtoUrl = `mailto:${profile.contactEmail}?subject=${encodeURIComponent(
      `[Portfolio Inquiry - ${subject}] from ${senderName || 'Visitor'}`
    )}&body=${encodeURIComponent(message)}`;
    window.location.href = mailtoUrl;
  };

  return (
    <>
      <SeoHead
        title="Connect &amp; Contact — Tanmoy Majumder (Tcode-Motion)"
        description="Official contact hub and verified identity directory for Tanmoy Majumder (Tcode-Motion). Connect via GitHub, Google Play Developer profile, Twitter/X, ORCID, about.me, or direct email."
        slug="connect"
        breadcrumbs={[{ name: 'Connect', item: 'https://tanmoy.is-a.dev/connect' }]}
        jsonLd={[
          {
            '@context': 'https://schema.org',
            '@type': 'ContactPage',
            '@id': 'https://tanmoy.is-a.dev/connect#page',
            name: 'Connect with Tanmoy Majumder',
            url: 'https://tanmoy.is-a.dev/connect',
            description: 'Public identity profiles and communication channels for Tanmoy Majumder.',
            mainEntity: {
              '@type': 'Person',
              '@id': 'https://tanmoy.is-a.dev/#person',
              name: 'Tanmoy Majumder',
              email: profile.contactEmail,
              sameAs: socials.map((s) => s.url)
            }
          }
        ]}
      />

      <article className="max-w-[1100px] mx-auto px-4 sm:px-6 md:px-10 pt-28 pb-20 space-y-12">
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
          <span className="text-[#c4ff36]">Connect &amp; Contact</span>
        </nav>

        {/* Header */}
        <header className="space-y-4 pb-8 border-b border-white/10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#c4ff36]/10 border border-[#c4ff36]/25 text-[#c4ff36]">
            <Sparkles className="w-3.5 h-3.5" />
            <span className="font-code text-xs uppercase tracking-wider font-semibold">
              Verified Public Identity Hub
            </span>
          </div>

          <h1 className="font-display font-extrabold text-4xl sm:text-6xl text-white tracking-tight">
            Connect &amp; Contact
          </h1>

          <p className="font-body text-lg sm:text-xl text-[#94a3b8] max-w-2xl leading-relaxed">
            All official public communication channels and identity anchors for <strong className="text-white font-semibold">Tanmoy Majumder (Tcode-Motion)</strong>.
          </p>
        </header>

        {/* Direct Email Card */}
        <section className="p-6 sm:p-8 rounded-3xl border border-white/15 bg-gradient-to-br from-[#0d1627] to-[#07090e] space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <span className="text-xs font-code text-[#c4ff36] uppercase tracking-wider block font-semibold mb-1">
                Primary Direct Channel
              </span>
              <h2 className="font-display font-bold text-2xl text-white">
                {profile.contactEmail}
              </h2>
              <p className="text-xs sm:text-sm text-[#94a3b8] mt-1">
                Best for software engineering roles, open source collaboration, and consulting inquiries.
              </p>
            </div>

            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={handleCopyEmail}
                className="px-4 py-2.5 rounded-xl border border-white/15 bg-white/5 hover:bg-white/10 text-white font-code text-xs font-semibold inline-flex items-center gap-2 transition-all active:scale-95"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-[#c4ff36]" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? 'Copied to Clipboard' : 'Copy Email Address'}</span>
              </button>

              <a
                href={`mailto:${profile.contactEmail}`}
                className="px-5 py-2.5 rounded-xl bg-[#c4ff36] text-[#07090e] font-display font-bold text-xs hover:shadow-[0_0_20px_rgba(196,255,54,0.4)] transition-all active:scale-95"
              >
                Send Email &rarr;
              </a>
            </div>
          </div>

          {/* Quick Email Launcher Form */}
          <form onSubmit={handleSendMail} className="pt-6 border-t border-white/10 space-y-4">
            <h3 className="font-display font-bold text-base text-white">
              Compose Direct Message
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-code text-[#94a3b8] mb-1.5">
                  Your Name / Organization
                </label>
                <input
                  type="text"
                  value={senderName}
                  onChange={(e) => setSenderName(e.target.value)}
                  placeholder="e.g. Alex (Engineering Recruiter)"
                  className="w-full px-4 py-2.5 rounded-xl border border-white/10 bg-[#080d1a] text-white text-sm placeholder-[#64748b] focus:outline-none focus:border-[#c4ff36]"
                />
              </div>

              <div>
                <label className="block text-xs font-code text-[#94a3b8] mb-1.5">
                  Subject / Topic
                </label>
                <select
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-white/10 bg-[#080d1a] text-white text-sm focus:outline-none focus:border-[#c4ff36]"
                >
                  <option value="Software Engineering Role">Software Engineering Role</option>
                  <option value="Open Source Collaboration">Open Source Collaboration</option>
                  <option value="TechScript Compiler Feedback">TechScript Compiler Feedback</option>
                  <option value="Satvora AI Testing">Satvora AI Testing</option>
                  <option value="Technical Consulting">Technical Consulting</option>
                  <option value="Other Inquiry">Other Inquiry</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-code text-[#94a3b8] mb-1.5">
                Message Brief
              </label>
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                rows={3}
                placeholder="Share details about your project, timeline, or discussion topic..."
                className="w-full px-4 py-2.5 rounded-xl border border-white/10 bg-[#080d1a] text-white text-sm placeholder-[#64748b] focus:outline-none focus:border-[#c4ff36]"
              />
            </div>

            <button
              type="submit"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white/10 hover:bg-white/20 border border-white/15 text-white font-display font-semibold text-xs transition-all active:scale-95"
            >
              <Send className="w-3.5 h-3.5 text-[#c4ff36]" />
              <span>Open in Default Mail Client</span>
            </button>
          </form>
        </section>

        {/* Verified Profile Directory Grid */}
        <section className="space-y-6">
          <div className="border-b border-white/10 pb-3">
            <h2 className="font-display font-bold text-2xl sm:text-3xl text-white">
              Verified Public Profile Directory
            </h2>
            <p className="text-xs sm:text-sm text-[#94a3b8] mt-1">
              Every profile below is authenticated and represents a canonical first-party identity for Tanmoy Majumder.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {socials.map((s) => (
              <a
                key={s.platform}
                href={s.url}
                target="_blank"
                rel={s.rel || 'noopener noreferrer'}
                className="p-5 rounded-2xl border border-white/10 bg-[#0d1627]/50 hover:border-[#c4ff36]/60 transition-all flex flex-col justify-between group space-y-4"
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-display font-bold text-base text-white group-hover:text-[#c4ff36] transition-colors">
                      {s.platform}
                    </span>
                    <ArrowUpRight className="w-4 h-4 text-[#64748b] group-hover:text-[#c4ff36] transition-colors" />
                  </div>
                  <span className="text-xs font-code text-[#c4ff36] block">
                    {s.username}
                  </span>
                  {s.description && (
                    <p className="text-xs text-[#94a3b8] leading-relaxed">
                      {s.description}
                    </p>
                  )}
                </div>

                <div className="pt-2 border-t border-white/5 text-[10px] font-code text-[#64748b] truncate">
                  {s.url}
                </div>
              </a>
            ))}
          </div>
        </section>
      </article>
    </>
  );
};
