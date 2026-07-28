import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { FadeIn } from '@/primitives/FadeIn';
import { getProfile } from '@/core/content/contentLoader';

const STATS = [
  { number: '15+', label: 'Projects Shipped' },
  { number: '6', label: 'Languages Spoken' },
  { number: '4+', label: 'Years Building' },
  { number: '∞', label: 'Curiosity' },
];

const SUPERPOWERS = [
  { title: 'Full-Stack Mastery', desc: 'From Flutter frontends to Rust backends — I own the entire stack.', icon: '⚡' },
  { title: 'Compiler Wizardry', desc: 'Built TechScript from scratch: lexer → parser → AST → bytecode → VM.', icon: '⟁' },
  { title: 'Systems Thinking', desc: 'I see architecture, not just code. Every decision serves the whole.', icon: '◎' },
  { title: 'Relentless Curiosity', desc: 'Always learning, always building. Comfort lives on the other side of fear.', icon: '∞' },
];

const TIMELINE = [
  { year: '2021', event: 'Started building with C and Python' },
  { year: '2022', event: 'Discovered Flutter, shipped first mobile apps' },
  { year: '2023', event: 'Built Aurora Music — 500+ active users' },
  { year: '2024', event: 'Created TechScript language from scratch' },
  { year: 'Now', event: 'Open to collaboration and freelance' },
];

export const AboutModule: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const profile = getProfile();

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  const y1 = useTransform(scrollYProgress, [0, 1], [60, -60]);
  const y2 = useTransform(scrollYProgress, [0, 1], [40, -40]);

  return (
    <section ref={sectionRef} id="about" className="relative py-20 sm:py-28 overflow-hidden">
      {/* Background accent */}
      <div
        className="absolute top-1/2 left-0 w-[400px] h-[400px] pointer-events-none -translate-y-1/2"
        style={{
          background: 'radial-gradient(circle, rgba(196,255,54,0.03) 0%, transparent 60%)',
        }}
      />

      <div className="max-w-[1400px] mx-auto px-6 sm:px-8 md:px-12 lg:px-20">
        {/* Section label */}
        <FadeIn>
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-px bg-[var(--accent-lime)]" />
            <span className="section-label text-[var(--accent-lime)]">About</span>
          </div>
        </FadeIn>

        {/* Editorial grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          {/* Left column — stats + status + timeline */}
          <div className="lg:col-span-4">
            <motion.div style={{ y: y1 }}>
              <FadeIn delay={0.1}>
                <div className="space-y-8">
                  {/* Stats */}
                  <div className="grid grid-cols-2 gap-6">
                    {STATS.map((stat) => (
                      <div key={stat.label}>
                        <div className="font-display text-3xl sm:text-4xl tracking-heading leading-display text-gradient-lime">
                          {stat.number}
                        </div>
                        <div className="section-label mt-2">{stat.label}</div>
                      </div>
                    ))}
                  </div>

                  {/* Status */}
                  <div className="p-4 rounded-xl border border-[var(--accent-lime)] bg-[rgba(196,255,54,0.03)] glow-pulse">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="w-2 h-2 rounded-full bg-[var(--accent-lime)] animate-pulse" />
                      <span className="section-label text-[var(--accent-lime)]">Currently</span>
                    </div>
                    <p className="text-sm text-[var(--text-2)]">
                      Building <span className="text-[var(--text-1)] font-medium">TechScript</span> — a programming language from scratch. Open to freelance and collaboration.
                    </p>
                  </div>

                  {/* Mini timeline */}
                  <div className="space-y-0">
                    <span className="section-label text-[var(--text-3)] mb-3 block">Journey</span>
                    {TIMELINE.map((item, i) => (
                      <div key={item.year} className="flex items-start gap-3 py-2">
                        <div className="flex flex-col items-center">
                          <div className="w-2 h-2 rounded-full bg-[var(--border-hover)]" />
                          {i < TIMELINE.length - 1 && <div className="w-px h-6 bg-[var(--border)]" />}
                        </div>
                        <div>
                          <span className="text-[10px] font-code text-[var(--accent-lime)]">{item.year}</span>
                          <p className="text-xs text-[var(--text-3)] mt-0.5">{item.event}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </FadeIn>
            </motion.div>
          </div>

          {/* Right column — heading + bio + superpowers */}
          <div className="lg:col-span-8">
            <motion.div style={{ y: y2 }}>
              <FadeIn delay={0.15}>
                <h2 className="font-display text-4xl sm:text-5xl md:text-6xl tracking-heading leading-heading mb-8">
                  I don't just write code.<br />
                  <span className="text-gradient-lime">I architect systems.</span>
                </h2>
              </FadeIn>

              <FadeIn delay={0.2}>
                <div className="space-y-4 mb-12">
                  <p className="text-[var(--text-2)] text-sm leading-body max-w-2xl">
                    {profile.elevatorPitch}
                  </p>
                </div>
              </FadeIn>

              {/* Superpowers */}
              <FadeIn delay={0.25}>
                <h3 className="section-label mb-6 text-[var(--accent-lime)]">Superpowers</h3>
              </FadeIn>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {SUPERPOWERS.map((power, i) => (
                  <FadeIn key={power.title} delay={0.3 + i * 0.08}>
                    <div className="group p-5 rounded-xl border border-[var(--border)] bg-[var(--surface-1)] hover:border-[var(--accent-lime)] transition-all duration-300 magnetic-btn relative overflow-hidden" data-cursor="hover">
                      <div className="absolute top-3 right-3 text-lg opacity-20 group-hover:opacity-40 transition-opacity">
                        {power.icon}
                      </div>
                      <h4 className="text-sm font-medium text-[var(--text-1)] mb-2 group-hover:text-[var(--accent-lime)] transition-colors">
                        {power.title}
                      </h4>
                      <p className="text-xs text-[var(--text-3)] leading-body">
                        {power.desc}
                      </p>
                    </div>
                  </FadeIn>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};
