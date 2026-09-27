import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { SeoHead } from '@/core/seo/SeoHead';
import { getTechnologies } from '@/core/content/contentLoader';
import { Code2, ArrowUpRight, Cpu, Layers, Terminal, Shield, Smartphone, Box } from 'lucide-react';

const TECH_ICONS: Record<string, React.ReactNode> = {
  rust: <Shield className="w-5 h-5 text-accent-emerald" />,
  kotlin: <Smartphone className="w-5 h-5 text-accent-purple" />,
  typescript: <Code2 className="w-5 h-5 text-accent-cyan" />,
  flutter: <Layers className="w-5 h-5 text-accent-indigo" />,
  threejs: <Box className="w-5 h-5 text-accent-amber" />,
  python: <Terminal className="w-5 h-5 text-accent-pink" />,
};

export const TechnologiesPage: React.FC = () => {
  const technologies = getTechnologies();

  return (
    <>
      <SeoHead
        title="Technologies & Engineering Toolchains Used by Tanmoy Majumder"
        description="Contextual breakdown of technologies, programming languages, and frameworks used by Tanmoy Majumder (Tcode-Motion). Explore why Rust, Kotlin, TypeScript, Flutter, and Three.js were chosen across real projects."
        slug="technologies"
        breadcrumbs={[{ name: 'Technologies', item: 'https://tanmoy.is-a.dev/technologies' }]}
        jsonLd={[
          {
            '@context': 'https://schema.org',
            '@type': 'CollectionPage',
            '@id': 'https://tanmoy.is-a.dev/technologies#collection',
            name: 'Technologies & Toolchains Used by Tanmoy Majumder',
            description: 'Contextual technology relationships across systems programming, mobile development, and web graphics.',
            url: 'https://tanmoy.is-a.dev/technologies',
            author: { '@id': 'https://tanmoy.is-a.dev/#person' },
          },
        ]}
      />

      <div className="min-h-screen bg-[#090a0f] text-white">
        <header className="pt-36 pb-12 max-w-7xl mx-auto px-6 sm:px-10 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent-cyan/10 border border-accent-cyan/20 font-code text-xs text-accent-cyan mb-6"
          >
            <Cpu className="w-3.5 h-3.5" />
            <span>Architecture &amp; Tooling Context</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="font-display font-extrabold text-4xl sm:text-6xl lg:text-7xl leading-tight mb-6"
          >
            Technologies &amp; <br />
            <span className="text-gradient-cyan">Engineering Toolchains</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="font-body text-content-secondary max-w-2xl text-base sm:text-lg leading-relaxed"
          >
            I do not measure engineering proficiency with arbitrary percentage bars. Every technology here is documented by how and why it was selected, and the real production systems built with it.
          </motion.p>
        </header>

        <main className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-12 py-10 space-y-12 pb-24">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {technologies.map((tech) => (
              <article
                key={tech.id}
                className="p-8 rounded-2xl bg-[#0d0e14] border border-white/8 hover:border-white/20 transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between gap-4 mb-4">
                    <div className="flex items-center gap-3">
                      <div className="p-2.5 rounded-xl bg-white/5 border border-white/10">
                        {TECH_ICONS[tech.id] || <Code2 className="w-5 h-5 text-accent-cyan" />}
                      </div>
                      <div>
                        <h2 className="font-display font-bold text-xl text-white">
                          {tech.name}
                        </h2>
                        <span className="font-code text-xs text-content-tertiary">
                          {tech.category}
                        </span>
                      </div>
                    </div>
                  </div>

                  <p className="font-body text-sm text-content-secondary leading-relaxed mb-6">
                    {tech.description}
                  </p>

                  <div className="p-4 rounded-xl bg-[#121520] border border-white/5 mb-6 space-y-1">
                    <span className="font-code text-[11px] text-accent-cyan uppercase tracking-wider block">
                      Why I Selected This:
                    </span>
                    <p className="font-body text-xs text-content-secondary leading-relaxed">
                      {tech.whyChosen}
                    </p>
                  </div>
                </div>

                <div>
                  <span className="font-code text-xs text-content-tertiary uppercase tracking-wider block mb-3">
                    Verified Projects Built with {tech.name}:
                  </span>
                  <div className="space-y-2">
                    {tech.projects.map((proj) => (
                      <Link
                        key={proj.id}
                        to={`/projects/${proj.id}`}
                        className="group flex items-start justify-between gap-3 p-3 rounded-xl bg-white/[0.02] hover:bg-white/[0.06] border border-white/5 transition-all"
                      >
                        <div>
                          <span className="font-display font-semibold text-xs text-white group-hover:text-accent-cyan transition-colors">
                            {proj.name}
                          </span>
                          <p className="font-body text-[11px] text-content-tertiary leading-snug">
                            {proj.role}
                          </p>
                        </div>
                        <ArrowUpRight className="w-3.5 h-3.5 text-content-tertiary group-hover:text-white shrink-0 mt-0.5" />
                      </Link>
                    ))}
                  </div>
                </div>
              </article>
            ))}
          </div>

          {/* Generative Search Q&A Section */}
          <section className="p-8 sm:p-10 rounded-2xl bg-[#0d0e14] border border-white/8 space-y-4">
            <h3 className="font-display font-bold text-lg text-white">
              Frequently Asked Technical Questions
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2 font-body text-xs text-content-secondary">
              <div>
                <strong className="text-white">Why does Tanmoy use Rust?</strong>
                <p className="mt-1">
                  Tanmoy uses Rust for performance-critical systems like the TechScript compiler and virtual machine runtime, and for low-level image processing routines in NeoSketch where memory safety without GC pauses is essential.
                </p>
              </div>
              <div>
                <strong className="text-white">What does Tanmoy build on Android?</strong>
                <p className="mt-1">
                  Tanmoy builds native Android applications using Kotlin, Jetpack Compose, and OpenGL ES (KinotiX 3D live wallpaper published on Google Play, and Satvora AI multimodal food tracker).
                </p>
              </div>
            </div>
          </section>
        </main>
      </div>
    </>
  );
};
