import React from 'react';
import { Link } from 'react-router-dom';
import { SeoHead } from '@/core/seo/SeoHead';
import { getSocials } from '@/core/content/contentLoader';
import { ArrowUpRight, Smartphone, Code2, Terminal, Shield, Home } from 'lucide-react';

export const AboutPage: React.FC = () => {
  const socials = getSocials();

  return (
    <>
      <SeoHead
        title="About Tanmoy Majumder (Tcode-Motion) — Coder, AI App Builder & Creator of TechScript"
        description="Learn about Tanmoy Majumder (Tcode-Motion): independent software engineer from West Bengal, India. Creator of TechScript programming language, Android developer of KinotiX on Google Play and Satvora AI, and open-source contributor."
        slug="about"
        breadcrumbs={[{ name: 'About', item: 'https://tanmoy.is-a.dev/about' }]}
        jsonLd={[
          {
            '@context': 'https://schema.org',
            '@type': 'ProfilePage',
            '@id': 'https://tanmoy.is-a.dev/about#page',
            name: 'About Tanmoy Majumder',
            url: 'https://tanmoy.is-a.dev/about',
            description: 'Engineering philosophy, background, and open-source contributions of Tanmoy Majumder.',
            mainEntity: {
              '@type': 'Person',
              '@id': 'https://tanmoy.is-a.dev/#person',
              name: 'Tanmoy Majumder',
              alternateName: 'Tcode-Motion'
            }
          }
        ]}
      />

      <article className="max-w-[1000px] mx-auto px-4 sm:px-6 md:px-10 lg:px-12 pt-28 pb-20 space-y-12">
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
          <span className="text-[#c4ff36]">About &amp; Biography</span>
        </nav>

        {/* Header Intro */}
        <header className="space-y-4 pb-8 border-b border-white/10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#c4ff36]/10 border border-[#c4ff36]/25">
            <span className="w-2 h-2 rounded-full bg-[#c4ff36]" />
            <span className="font-code text-xs text-[#c4ff36] uppercase tracking-wider font-semibold">
              Identity &amp; Engineering Philosophy
            </span>
          </div>

          <h1 className="font-display font-extrabold text-4xl sm:text-6xl text-white tracking-tight">
            I am Tanmoy Majumder.
          </h1>

          <p className="font-body text-lg sm:text-xl text-[#94a3b8] leading-relaxed max-w-3xl">
            I build programming languages, native Android software, and technical developer tools. Online, I publish code under the name <strong className="text-white font-semibold">Tcode-Motion</strong>.
          </p>
        </header>

        {/* Section: Who I Am */}
        <section className="space-y-4">
          <h2 className="font-display font-bold text-2xl sm:text-3xl text-white">
            Who I Am
          </h2>
          <div className="space-y-4 text-sm sm:text-base text-[#94a3b8] leading-relaxed">
            <p>
              I am an independent software engineer and open source builder based in West Bengal, India. My journey began with an insatiable curiosity about how software actually works beneath the user interface — what happens when high-level code is transformed into machine instructions, how memory is laid out, and how hardware graphics pipelines render pixels smoothly.
            </p>
            <p>
              Rather than sticking strictly to pre-configured frameworks, I choose to understand systems from the ground up. That mindset led me to engineer <Link to="/techscript" className="text-[#c4ff36] hover:underline font-medium">TechScript</Link> (a language with its own compiler and bytecode VM in Rust), publish <Link to="/apps/kinotix" className="text-[#c4ff36] hover:underline font-medium">KinotiX</Link> (an interactive 4K wallpaper engine) on Google Play, and build privacy-first Android products like <Link to="/apps/satvora-ai" className="text-[#c4ff36] hover:underline font-medium">Satvora AI</Link>.
            </p>
          </div>
        </section>

        {/* Section: What I Build */}
        <section className="space-y-6">
          <h2 className="font-display font-bold text-2xl sm:text-3xl text-white">
            What I Build
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-6 rounded-2xl border border-white/10 bg-[#0d1627]/60 space-y-2">
              <div className="flex items-center gap-2 text-[#c4ff36]">
                <Code2 className="w-4 h-4" />
                <h3 className="font-display font-bold text-base text-white">Compilers &amp; Languages</h3>
              </div>
              <p className="text-xs sm:text-sm text-[#94a3b8] leading-relaxed">
                Lexers, recursive-descent parsers, AST validators, and stack-based virtual machines engineered in Rust with zero runtime dependencies.
              </p>
            </div>

            <div className="p-6 rounded-2xl border border-white/10 bg-[#0d1627]/60 space-y-2">
              <div className="flex items-center gap-2 text-[#06b6d4]">
                <Smartphone className="w-4 h-4" />
                <h3 className="font-display font-bold text-base text-white">Android Applications</h3>
              </div>
              <p className="text-xs sm:text-sm text-[#94a3b8] leading-relaxed">
                Native Android apps with Kotlin and Jetpack Compose, custom OpenGL ES shader renderers, device sensor pipelines, and offline Room databases.
              </p>
            </div>

            <div className="p-6 rounded-2xl border border-white/10 bg-[#0d1627]/60 space-y-2">
              <div className="flex items-center gap-2 text-[#8b5cf6]">
                <Terminal className="w-4 h-4" />
                <h3 className="font-display font-bold text-base text-white">Web Operating Systems</h3>
              </div>
              <p className="text-xs sm:text-sm text-[#94a3b8] leading-relaxed">
                Complex browser environments like NovOS featuring draggable floating windows, z-index depth managers, and virtual POSIX filesystems over IndexedDB.
              </p>
            </div>

            <div className="p-6 rounded-2xl border border-white/10 bg-[#0d1627]/60 space-y-2">
              <div className="flex items-center gap-2 text-[#10b981]">
                <Shield className="w-4 h-4" />
                <h3 className="font-display font-bold text-base text-white">Offline AI &amp; Vision</h3>
              </div>
              <p className="text-xs sm:text-sm text-[#94a3b8] leading-relaxed">
                On-device neural inference using ONNX Runtime with Rust FFI, giving users privacy-first image editing and food nutrition scanning without cloud lock-in.
              </p>
            </div>
          </div>
        </section>

        {/* Section: How I Learn & Work with AI */}
        <section className="space-y-4">
          <h2 className="font-display font-bold text-2xl sm:text-3xl text-white">
            How I Learn &amp; How I Use AI in Development
          </h2>
          <div className="space-y-4 text-sm sm:text-base text-[#94a3b8] leading-relaxed">
            <p>
              I believe in learning by constructing real, functioning software. Reading language specifications is helpful, but implementing a lexer and AST parser in Rust is what actually teaches compiler mechanics. Studying Android lifecycle documentation is good, but debugging why an OpenGL surface drops frames on a low-end phone is what builds genuine engineering intuition.
            </p>
            <p>
              When it comes to artificial intelligence, I use AI coding agents (such as Gemini, Claude, and Copilot) as active pair programmers. They excel at writing boilerplate, generating broad test fixtures, and exploring alternative API bindings quickly. However, I maintain full ownership of architectural choices, memory layouts, invariants, and performance boundaries. AI accelerates my velocity, but software quality requires human judgment and disciplined design.
            </p>
          </div>
        </section>

        {/* Section: What I Care About */}
        <section className="space-y-4">
          <h2 className="font-display font-bold text-2xl sm:text-3xl text-white">
            What I Care About
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="p-5 rounded-xl border border-white/10 bg-[#0d1627]/40 space-y-2">
              <h3 className="font-display font-bold text-sm text-white">1. Transparency</h3>
              <p className="text-xs text-[#94a3b8] leading-relaxed">
                Clear code, verifiable repositories, and honest metrics. No inflated claims or synthetic social proof.
              </p>
            </div>
            <div className="p-5 rounded-xl border border-white/10 bg-[#0d1627]/40 space-y-2">
              <h3 className="font-display font-bold text-sm text-white">2. Privacy First</h3>
              <p className="text-xs text-[#94a3b8] leading-relaxed">
                Software should store data locally wherever possible. User health logs and personal media belong on their devices.
              </p>
            </div>
            <div className="p-5 rounded-xl border border-white/10 bg-[#0d1627]/40 space-y-2">
              <h3 className="font-display font-bold text-sm text-white">3. Performance</h3>
              <p className="text-xs text-[#94a3b8] leading-relaxed">
                Fast startup times, 60fps animations, lightweight binaries, and minimal memory footprints.
              </p>
            </div>
          </div>
        </section>

        {/* Section: Where to Find Me */}
        <section className="space-y-4 pt-6 border-t border-white/10">
          <h2 className="font-display font-bold text-2xl sm:text-3xl text-white">
            Where to Find Me Online
          </h2>
          <p className="text-sm text-[#94a3b8]">
            I maintain verified public presences across developer and academic platforms:
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
            {socials.map((s) => (
              <a
                key={s.platform}
                href={s.url}
                target="_blank"
                rel={s.rel || 'noopener noreferrer'}
                className="p-3 rounded-xl border border-white/10 bg-[#0d1627]/50 hover:border-[#c4ff36]/60 transition-all flex items-center justify-between group"
              >
                <div>
                  <span className="font-display font-bold text-xs text-white group-hover:text-[#c4ff36] transition-colors block">
                    {s.platform}
                  </span>
                  <span className="font-code text-[11px] text-[#64748b]">
                    {s.username}
                  </span>
                </div>
                <ArrowUpRight className="w-3.5 h-3.5 text-[#64748b] group-hover:text-[#c4ff36] transition-colors" />
              </a>
            ))}
          </div>
        </section>

        {/* Contact CTA */}
        <section className="p-8 rounded-2xl border border-white/15 bg-gradient-to-r from-[#0c1626] to-[#07090e] space-y-4">
          <h2 className="font-display font-bold text-2xl text-white">
            Interested in collaborating or discussing engineering?
          </h2>
          <p className="text-sm text-[#94a3b8] max-w-xl">
            I am available for software engineering roles, technical collaboration, and open source development.
          </p>
          <div className="flex flex-wrap gap-4 pt-2">
            <Link
              to="/connect"
              className="px-6 py-3 rounded-xl bg-[#c4ff36] text-[#07090e] font-display font-bold text-xs hover:shadow-[0_0_20px_rgba(196,255,54,0.35)] transition-all"
            >
              Contact Me Directly &rarr;
            </Link>
            <Link
              to="/now"
              className="px-6 py-3 rounded-xl border border-white/15 text-white font-display font-semibold text-xs hover:border-[#c4ff36] transition-all"
            >
              See What I'm Doing Now
            </Link>
          </div>
        </section>
      </article>
    </>
  );
};
