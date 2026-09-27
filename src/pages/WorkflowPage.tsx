import React from 'react';
import { Link } from 'react-router-dom';
import { SeoHead } from '@/core/seo/SeoHead';
import { getWorkflowData } from '@/core/content/contentLoader';
import { Layers, CheckCircle2, Cpu, Sparkles, Home } from 'lucide-react';

export const WorkflowPage: React.FC = () => {
  const workflow = getWorkflowData();

  return (
    <>
      <SeoHead
        title="Engineering Workflow — How Tanmoy Majumder Builds Software"
        description="A transparent look into how Tanmoy Majumder architects, implements, tests, and deploys compilers, Android applications, and technical software from first principles."
        slug="workflow"
        breadcrumbs={[{ name: 'Workflow', item: 'https://tanmoy.is-a.dev/workflow' }]}
        jsonLd={[
          {
            '@context': 'https://schema.org',
            '@type': 'WebPage',
            '@id': 'https://tanmoy.is-a.dev/workflow#page',
            name: 'Engineering Workflow — Tanmoy Majumder',
            url: 'https://tanmoy.is-a.dev/workflow',
            description: 'Engineering methodology, systems thinking, testing practices, and AI toolchain of Tanmoy Majumder.',
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
          <span className="text-[#06b6d4]">Workflow &amp; Practices</span>
        </nav>

        {/* Header */}
        <header className="space-y-4 pb-8 border-b border-white/10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#06b6d4]/10 border border-[#06b6d4]/25 text-[#06b6d4]">
            <Layers className="w-3.5 h-3.5" />
            <span className="font-code text-xs uppercase tracking-wider font-semibold">
              Engineering Methodology
            </span>
          </div>

          <h1 className="font-display font-extrabold text-4xl sm:text-6xl text-white tracking-tight">
            How I Build Software
          </h1>

          <p className="font-body text-lg sm:text-xl text-[#94a3b8] max-w-2xl leading-relaxed">
            {workflow.tagline}
          </p>
        </header>

        {/* Core Philosophy Callout */}
        <section className="p-6 sm:p-8 rounded-2xl border border-white/10 bg-[#0d1627]/60 space-y-3">
          <h2 className="font-display font-bold text-xl text-white flex items-center gap-2">
            <Cpu className="w-5 h-5 text-[#c4ff36]" />
            <span>Systems-First Philosophy</span>
          </h2>
          <p className="text-sm sm:text-base text-[#cbd5e1] leading-relaxed">
            {workflow.philosophy}
          </p>
        </section>

        {/* Honest Stance on AI Coding Agents */}
        <section className="p-6 sm:p-8 rounded-2xl border border-[#c4ff36]/20 bg-[#0c160e]/50 space-y-3">
          <div className="flex items-center gap-2 text-[#c4ff36]">
            <Sparkles className="w-5 h-5" />
            <h2 className="font-display font-bold text-xl text-white">
              The Role of AI in My Workflow
            </h2>
          </div>
          <p className="text-sm sm:text-base text-[#cbd5e1] leading-relaxed">
            {workflow.aiRole}
          </p>
        </section>

        {/* 5-Step Process Breakdown */}
        <section className="space-y-8">
          <div className="border-b border-white/10 pb-3">
            <h2 className="font-display font-bold text-2xl sm:text-3xl text-white">
              The Development Lifecycle
            </h2>
            <p className="text-xs sm:text-sm text-[#94a3b8] mt-1">
              From concept to deterministic distribution.
            </p>
          </div>

          <div className="space-y-6">
            {workflow.stages.map((stage) => (
              <div
                key={stage.step}
                className="p-6 sm:p-8 rounded-2xl border border-white/10 bg-[#0d1627]/40 space-y-4"
              >
                <div className="flex items-center gap-3">
                  <span className="font-code text-xs font-bold text-[#c4ff36] bg-[#c4ff36]/10 px-2.5 py-1 rounded-md border border-[#c4ff36]/20">
                    STAGE {stage.step}
                  </span>
                  <h3 className="font-display font-bold text-xl text-white">
                    {stage.name}
                  </h3>
                </div>

                <p className="text-sm text-[#94a3b8] leading-relaxed">
                  {stage.summary}
                </p>

                <div className="pt-2 border-t border-white/5 space-y-1.5">
                  <span className="text-[11px] font-code text-[#64748b] uppercase tracking-wider block">
                    Key Execution Practices:
                  </span>
                  <ul className="space-y-1 text-xs text-[#cbd5e1]">
                    {stage.practices.map((practice, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#06b6d4] shrink-0 mt-0.5" />
                        <span>{practice}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Toolchain Taxonomy */}
        <section className="space-y-6">
          <div className="border-b border-white/10 pb-3">
            <h2 className="font-display font-bold text-2xl sm:text-3xl text-white">
              Verified Daily Toolchain
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {workflow.toolchain.map((group) => (
              <div
                key={group.category}
                className="p-5 rounded-xl border border-white/10 bg-[#0d1627]/40 space-y-3"
              >
                <h3 className="font-display font-bold text-sm text-[#c4ff36]">
                  {group.category}
                </h3>
                <div className="flex flex-wrap gap-1.5">
                  {group.items.map((tool) => (
                    <span
                      key={tool}
                      className="px-2.5 py-1 rounded text-xs font-code bg-white/5 border border-white/10 text-white"
                    >
                      {tool}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Footer Navigation */}
        <footer className="pt-8 border-t border-white/10 flex flex-wrap items-center justify-between gap-4 text-xs font-code text-[#94a3b8]">
          <Link to="/journey" className="text-[#c4ff36] hover:underline">
            &larr; View Engineering Journey
          </Link>
          <Link to="/projects" className="text-white hover:underline">
            Explore Built Projects &rarr;
          </Link>
        </footer>
      </article>
    </>
  );
};
