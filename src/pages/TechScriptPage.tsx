import React from 'react';
import { Link } from 'react-router-dom';
import { SeoHead } from '@/core/seo/SeoHead';
import { TechScriptPlayground } from '@/modules/techscript/TechScriptPlayground';
import {
  Cpu,
  Code2,
  ExternalLink,
  Terminal,
  Box,
  FileCode,
  Home
} from 'lucide-react';

export const TechScriptPage: React.FC = () => {

  const pipelineStages = [
    {
      num: '01',
      title: 'Lexer & Tokenizer',
      desc: 'Scans UTF-8 source streams into tokens, keywords, and source location spans with zero-copy slicing.'
    },
    {
      num: '02',
      title: 'Parser & AST Generator',
      desc: 'Recursive-descent parser producing a strongly-typed Abstract Syntax Tree with syntax error diagnostic spans.'
    },
    {
      num: '03',
      title: 'Semantic Analysis & Optimizer',
      desc: 'Resolves lexical scopes, module imports/exports, type constraints, and constant-expression folding.'
    },
    {
      num: '04',
      title: 'IR Lowering & Bytecode Compiler',
      desc: 'Lowers AST into intermediate representation instructions targeting the stack-based VM and LLVM IR backend.'
    },
    {
      num: '05',
      title: 'Stack Virtual Machine Runtime',
      desc: 'Executes bytecode using NaN-boxed value representations, call frames, and standard library bindings in Rust.'
    }
  ];

  return (
    <>
      <SeoHead
        title="TechScript Programming Language — Rust Compiler, Bytecode VM & Ecosystem by Tanmoy Majumder"
        description="TechScript is an open-source programming language created by Tanmoy Majumder (Tcode-Motion), engineered from scratch in Rust. Features English-like keywords, custom lexer, AST parser, bytecode VM, and CLI toolchain."
        slug="techscript"
        breadcrumbs={[{ name: 'TechScript', item: 'https://tanmoy.is-a.dev/techscript' }]}
        jsonLd={[
          {
            '@context': 'https://schema.org',
            '@type': 'SoftwareSourceCode',
            '@id': 'https://tanmoy.is-a.dev/techscript#software',
            name: 'TechScript Programming Language',
            alternateName: ['TechScript 2.0', 'TechScript Compiler', 'TechScript Rust'],
            description: 'A modern, human-readable programming language with a native Rust compiler, bytecode virtual machine, and developer toolchain.',
            programmingLanguage: 'Rust',
            runtimePlatform: 'Cross-platform (Windows, macOS, Linux, WebAssembly)',
            codeRepository: 'https://github.com/Tcode-Motion/techscript',
            url: 'https://tanmoy.is-a.dev/techscript',
            author: { '@id': 'https://tanmoy.is-a.dev/#person' },
            creator: { '@id': 'https://tanmoy.is-a.dev/#person' },
            license: 'https://opensource.org/licenses/Apache-2.0',
            keywords: ['TechScript', 'Rust', 'Compiler', 'Bytecode VM', 'Programming Language', 'Tanmoy Majumder', 'Tcode-Motion']
          },
          {
            '@context': 'https://schema.org',
            '@type': 'FAQPage',
            mainEntity: [
              {
                '@type': 'Question',
                name: 'Who created TechScript?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'TechScript was created by Tanmoy Majumder, who publishes open-source software under the GitHub username Tcode-Motion.'
                }
              },
              {
                '@type': 'Question',
                name: 'What language is TechScript written in?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'TechScript is written entirely in Rust using Cargo workspaces for maximum memory safety and systems-level performance.'
                }
              },
              {
                '@type': 'Question',
                name: 'How does TechScript work?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'TechScript compiles .txs source files through a custom lexer, recursive-descent AST parser, semantic analyzer, and intermediate representation lowering to a stack-based bytecode virtual machine or LLVM backend.'
                }
              },
              {
                '@type': 'Question',
                name: 'Where is the TechScript source code hosted?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'The TechScript source code is open source under the Apache 2.0 license and hosted on GitHub at https://github.com/Tcode-Motion/techscript.'
                }
              }
            ]
          }
        ]}
      />

      <article className="max-w-[1200px] mx-auto px-4 sm:px-6 md:px-10 pt-28 pb-20 space-y-12">
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
          <Link
            to="/projects"
            className="hover:text-white transition-colors"
          >
            Projects
          </Link>
          <span className="text-white/30">/</span>
          <span className="text-[#c4ff36]">TechScript</span>
        </nav>

        {/* Flagship Hero Header */}
        <header className="space-y-6 pb-8 border-b border-white/10">
          <div className="flex flex-wrap items-center gap-3">
            <span className="text-xs font-code text-[#c4ff36] bg-[#c4ff36]/10 px-3 py-1 rounded-full border border-[#c4ff36]/25">
              Flagship Language Ecosystem
            </span>
            <span className="text-xs font-code text-[#38bdf8] bg-[#38bdf8]/10 px-3 py-1 rounded-full border border-[#38bdf8]/20">
              TechScript 2.0.x
            </span>
            <span className="text-xs font-code text-[#94a3b8] bg-white/5 px-3 py-1 rounded-full border border-white/10">
              Apache License 2.0
            </span>
          </div>

          <div className="space-y-3">
            <h1 className="font-display font-extrabold text-4xl sm:text-6xl md:text-7xl text-white tracking-tight">
              TechScript
            </h1>
            <p className="font-body text-lg sm:text-2xl text-[#94a3b8] max-w-3xl leading-relaxed">
              A modern, human-readable programming language and developer ecosystem built from the ground up in Rust.
            </p>
          </div>

          <p className="text-sm sm:text-base text-[#cbd5e1] max-w-3xl leading-relaxed">
            TechScript is created by <strong className="text-white font-semibold">Tanmoy Majumder (Tcode-Motion)</strong>. It is designed so that code reads like a structured description of the work it performs, replacing punctuation-dense brackets with explicit English-like keywords (<code className="text-[#c4ff36]">do</code>, <code className="text-[#c4ff36]">when</code>, <code className="text-[#c4ff36]">loop</code>, <code className="text-[#c4ff36]">end</code>) while retaining native performance and modular compiler architecture.
          </p>

          <div className="flex flex-wrap items-center gap-4 pt-2">
            <a
              href="https://github.com/Tcode-Motion/techscript"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-[#c4ff36] text-[#07090e] font-display font-bold text-xs hover:shadow-[0_0_20px_rgba(196,255,54,0.4)] transition-all"
            >
              <Code2 className="w-4 h-4" />
              <span>Explore TechScript on GitHub</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>

            <a
              href="https://github.com/Tcode-Motion/techscript/releases"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-3.5 rounded-xl border border-white/15 bg-white/5 text-white font-code text-xs font-semibold hover:border-white/30 transition-all"
            >
              <Box className="w-4 h-4 text-[#38bdf8]" />
              <span>Releases &amp; Binaries</span>
            </a>
          </div>
        </header>

        {/* Core Architectural Pillars */}
        <section className="space-y-6">
          <div className="flex items-center justify-between pb-2 border-b border-white/10">
            <div>
              <h2 className="font-display font-bold text-2xl sm:text-3xl text-white">
                How the Compiler Pipeline Works
              </h2>
              <p className="text-xs sm:text-sm text-[#94a3b8] mt-1">
                The full path from a <code className="text-[#c4ff36]">.txs</code> source file to stack execution.
              </p>
            </div>
            <Cpu className="w-6 h-6 text-[#c4ff36]" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            {pipelineStages.map((stage) => (
              <div
                key={stage.num}
                className="p-5 rounded-2xl border border-white/10 bg-[#0d1627]/60 flex flex-col justify-between space-y-3"
              >
                <div className="space-y-1">
                  <span className="font-code text-xs text-[#c4ff36] font-bold block">
                    {stage.num}.
                  </span>
                  <h3 className="font-display font-bold text-sm text-white">
                    {stage.title}
                  </h3>
                </div>
                <p className="text-xs text-[#94a3b8] leading-relaxed">
                  {stage.desc}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Syntax Philosophy & Code Comparison */}
        <section className="space-y-6">
          <div className="space-y-2">
            <h2 className="font-display font-bold text-2xl sm:text-3xl text-white">
              Syntax Philosophy
            </h2>
            <p className="text-sm text-[#94a3b8] max-w-2xl leading-relaxed">
              TechScript 2.0 uses explicit English-like keywords for blocks and control flow instead of curly brackets or indentation-sensitive white space.
            </p>
          </div>

          <div className="p-6 rounded-2xl border border-white/10 bg-[#080d1a] overflow-x-auto">
            <table className="w-full text-left text-xs sm:text-sm font-code">
              <thead>
                <tr className="border-b border-white/10 text-[#64748b] text-[11px] uppercase tracking-wider">
                  <th className="py-2.5 pr-4">Concept</th>
                  <th className="py-2.5 px-4 text-[#c4ff36]">TechScript 2.0 (.txs)</th>
                  <th className="py-2.5 px-4 text-[#94a3b8]">JavaScript</th>
                  <th className="py-2.5 pl-4 text-[#94a3b8]">Python</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5 text-[#cbd5e1]">
                <tr>
                  <td className="py-3 pr-4 font-sans font-semibold text-white">Function definition</td>
                  <td className="py-3 px-4 text-[#c4ff36]">do greet(name)<br />&nbsp;&nbsp;send "Hi " + name<br />end</td>
                  <td className="py-3 px-4 text-[#94a3b8]">function greet(name) &#123;<br />&nbsp;&nbsp;return "Hi " + name;<br />&#125;</td>
                  <td className="py-3 pl-4 text-[#94a3b8]">def greet(name):<br />&nbsp;&nbsp;return "Hi " + name</td>
                </tr>
                <tr>
                  <td className="py-3 pr-4 font-sans font-semibold text-white">Conditionals</td>
                  <td className="py-3 px-4 text-[#c4ff36]">when score &gt; 90<br />&nbsp;&nbsp;say "Pass"<br />else<br />&nbsp;&nbsp;say "Retry"<br />end</td>
                  <td className="py-3 px-4 text-[#94a3b8]">if (score &gt; 90) &#123;<br />&nbsp;&nbsp;console.log("Pass");<br />&#125;</td>
                  <td className="py-3 pl-4 text-[#94a3b8]">if score &gt; 90:<br />&nbsp;&nbsp;print("Pass")<br />else:<br />&nbsp;&nbsp;print("Retry")</td>
                </tr>
                <tr>
                  <td className="py-3 pr-4 font-sans font-semibold text-white">Collection loops</td>
                  <td className="py-3 px-4 text-[#c4ff36]">for item in items<br />&nbsp;&nbsp;say item<br />end</td>
                  <td className="py-3 px-4 text-[#94a3b8]">for (const item of items) &#123;<br />&nbsp;&nbsp;console.log(item);<br />&#125;</td>
                  <td className="py-3 pl-4 text-[#94a3b8]">for item in items:<br />&nbsp;&nbsp;print(item)</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* Unified Toolchain Driver: tsc */}
        <section className="space-y-4">
          <div className="flex items-center gap-2">
            <Terminal className="w-5 h-5 text-[#38bdf8]" />
            <h2 className="font-display font-bold text-2xl text-white">
              The 'tsc' Command-Line Driver
            </h2>
          </div>
          <p className="text-sm text-[#94a3b8] leading-relaxed">
            The TechScript toolchain provides an all-in-one compiler executable in Rust. It eliminates fragmented build tooling by unifying execution, compilation, linting, formatting, and tests:
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
            {[
              { cmd: 'tsc run main.txs', desc: 'Parses and executes file directly in the Bytecode VM' },
              { cmd: 'tsc build --release', desc: 'Compiles project into an optimized standalone binary' },
              { cmd: 'tsc check', desc: 'Performs static analysis and type validation diagnostics' },
              { cmd: 'tsc test', desc: 'Executes automated assertions and unit tests' },
              { cmd: 'tsc fmt', desc: 'Formats all source files to canonical 2.0 style' },
              { cmd: 'tsc lsp', desc: 'Launches Language Server Protocol server for IDEs' },
            ].map((c) => (
              <div key={c.cmd} className="p-4 rounded-xl border border-white/10 bg-[#0d1627]/40 space-y-1">
                <code className="text-xs font-code text-[#c4ff36] block font-bold">{c.cmd}</code>
                <span className="text-xs text-[#94a3b8]">{c.desc}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Interactive In-Browser Playground */}
        <section className="space-y-4">
          <div className="flex items-center justify-between pb-2 border-b border-white/10">
            <div>
              <h2 className="font-display font-bold text-2xl text-white">
                Interactive Playground
              </h2>
              <p className="text-xs sm:text-sm text-[#94a3b8]">
                Explore TechScript code snippets with syntax highlighting and instant compilation output.
              </p>
            </div>
            <FileCode className="w-5 h-5 text-[#c4ff36]" />
          </div>

          <TechScriptPlayground />
        </section>

        {/* Authority & First-Party Grounding Box */}
        <footer className="p-8 rounded-3xl border border-white/10 bg-[#0c1322]/60 space-y-4">
          <h3 className="font-display font-bold text-xl text-white">
            First-Party Technical Grounding
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-code text-[#94a3b8]">
            <div><strong>Creator:</strong> Tanmoy Majumder (Tcode-Motion)</div>
            <div><strong>Primary Implementation:</strong> 100% Rust (Cargo workspace)</div>
            <div><strong>License:</strong> Apache License 2.0</div>
            <div><strong>Official Repository:</strong> <a href="https://github.com/Tcode-Motion/techscript" target="_blank" rel="noopener noreferrer" className="text-[#c4ff36] hover:underline">github.com/Tcode-Motion/techscript</a></div>
          </div>
        </footer>
      </article>
    </>
  );
};
