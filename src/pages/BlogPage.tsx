import React from 'react';
import { Link } from 'react-router-dom';
import { SeoHead } from '@/core/seo/SeoHead';
import { FadeIn } from '@/primitives/FadeIn';
import { GlassPanel } from '@/primitives/GlassPanel';
import { BookOpen, Sparkles, ArrowRight } from 'lucide-react';

export const BlogPage: React.FC = () => {
  return (
    <>
      <SeoHead
        title="Technical Articles & Engineering Blog"
        description="Articles on compiler design, Rust, WebGL shaders, React performance optimization, and AI application development by Tanmoy Majumder."
        slug="/blog"
      />

      <div className="py-24 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <FadeIn direction="up">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-accent-purple/10 border border-accent-purple/30 font-code text-xs text-accent-purple">
              <BookOpen className="w-3.5 h-3.5" />
              <span>Engineering Writing & Insights</span>
            </div>
          </FadeIn>

          <FadeIn direction="up" delay={0.1}>
            <h1 className="font-display font-extrabold text-4xl sm:text-5xl text-content-primary">
              Technical Blog & Research
            </h1>
          </FadeIn>

          <FadeIn direction="up" delay={0.2}>
            <p className="font-body text-base text-content-secondary leading-relaxed">
              Deep dives into compiler engineering in Rust, virtual machine design, mobile architectures, and creative web development.
            </p>
          </FadeIn>
        </div>

        {/* Blog Post List Placeholder */}
        <FadeIn direction="up" delay={0.3}>
          <GlassPanel glow className="p-8 space-y-4 bg-surface-raised border-border-subtle">
            <div className="flex items-center gap-2 font-code text-xs text-accent-cyan">
              <Sparkles className="w-4 h-4" />
              <span>Upcoming Article Release</span>
            </div>
            <h3 className="font-display font-bold text-2xl text-content-primary">
              Building a Stack-Based Virtual Machine in Rust from Scratch
            </h3>
            <p className="font-body text-sm text-content-secondary leading-relaxed">
              A comprehensive technical exploration of designing a Lexer, Parser, Abstract Syntax Tree generator, and Stack VM runtime engine for TechScript.
            </p>
            <div className="pt-2">
              <Link to="/techscript" className="inline-flex items-center gap-2 text-accent-indigo font-code text-xs hover:underline">
                <span>Explore TechScript Playground</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </GlassPanel>
        </FadeIn>
      </div>
    </>
  );
};
