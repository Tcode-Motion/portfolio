import React from 'react';
import { SeoHead } from '@/core/seo/SeoHead';
import { TechScriptPlayground } from '@/modules/techscript/TechScriptPlayground';
import { FadeIn } from '@/primitives/FadeIn';
import { GlassPanel } from '@/primitives/GlassPanel';
import { Cpu, Code2, ExternalLink } from 'lucide-react';

export const TechScriptPage: React.FC = () => {
  return (
    <>
      <SeoHead
        title="TechScript Programming Language & Compiler"
        description="Detailed specification and interactive syntax playground for TechScript—a modern programming language ecosystem built from scratch in Rust."
        slug="/techscript"
      />

      <div className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* Hero Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <FadeIn direction="up">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-accent-purple/10 border border-accent-purple/30 font-code text-xs text-accent-purple">
              <Cpu className="w-3.5 h-3.5" />
              <span>Flagship Language Architecture</span>
            </div>
          </FadeIn>

          <FadeIn direction="up" delay={0.1}>
            <h1 className="font-display font-extrabold text-4xl sm:text-6xl text-content-primary">
              TechScript Ecosystem
            </h1>
          </FadeIn>

          <FadeIn direction="up" delay={0.2}>
            <p className="font-body text-base sm:text-xl text-content-secondary leading-relaxed">
              A modern programming language and developer toolchain built from the ground up in Rust with its own compiler, AST parser, stack-based VM, bytecode runtime, and standard library.
            </p>
          </FadeIn>

          <FadeIn direction="up" delay={0.3}>
            <a
              href="https://github.com/Tcode-Motion"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-accent-purple text-white font-body font-semibold text-xs hover:bg-purple-600 transition-colors shadow-lg shadow-accent-purple/25"
            >
              <Code2 className="w-4 h-4" />
              <span>View Compiler Source Code</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </FadeIn>
        </div>

        {/* Architecture Breakdown Cards */}
        <FadeIn direction="up" delay={0.4}>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <GlassPanel glow className="space-y-2 p-6 border-border-subtle bg-surface-raised">
              <div className="font-code text-xs text-accent-cyan font-bold">01. Lexer & Tokenizer</div>
              <h3 className="font-display font-bold text-base text-content-primary">Source Scanning</h3>
              <p className="font-body text-xs text-content-secondary">Transforms UTF-8 source streams into typed lexemes & tokens.</p>
            </GlassPanel>

            <GlassPanel glow className="space-y-2 p-6 border-border-subtle bg-surface-raised">
              <div className="font-code text-xs text-accent-purple font-bold">02. AST Parser</div>
              <h3 className="font-display font-bold text-base text-content-primary">Type-Checked AST</h3>
              <p className="font-body text-xs text-content-secondary">Recursive descent parser generating validated Abstract Syntax Trees.</p>
            </GlassPanel>

            <GlassPanel glow className="space-y-2 p-6 border-border-subtle bg-surface-raised">
              <div className="font-code text-xs text-accent-indigo font-bold">03. Bytecode Compiler</div>
              <h3 className="font-display font-bold text-base text-content-primary">Instruction Emitter</h3>
              <p className="font-body text-xs text-content-secondary">Compiles AST nodes into compact stack machine instruction sets.</p>
            </GlassPanel>

            <GlassPanel glow className="space-y-2 p-6 border-border-subtle bg-surface-raised">
              <div className="font-code text-xs text-emerald-400 font-bold">04. Stack Virtual Machine</div>
              <h3 className="font-display font-bold text-base text-content-primary">Runtime Engine</h3>
              <p className="font-body text-xs text-content-secondary">High-speed virtual machine evaluating bytecode instructions in Rust.</p>
            </GlassPanel>
          </div>
        </FadeIn>

        {/* Interactive Compiler Playground */}
        <TechScriptPlayground />

      </div>
    </>
  );
};
