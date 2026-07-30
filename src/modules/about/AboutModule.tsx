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
        {/* Outer Ultra-Translucent Frosted Dark Glass Container Card */}
        <div className="p-5 sm:p-12 md:p-14 rounded-3xl border border-white/15 bg-[#0a0f1d]/40 backdrop-blur-2xl shadow-[0_25px_60px_rgba(0,0,0,0.6)] relative">
          {/* Section label */}
          <FadeIn>
            <div className="flex items-center gap-3 mb-8">
              <div className="w-12 h-px bg-[var(--accent-lime)]" />
              <span className="section-label text-[var(--accent-lime)]">About & Engineering Philosophy</span>
            </div>
          </FadeIn>

          {/* Editorial grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14">
            {/* Left column — stats + status + timeline (moved below introduction on mobile) */}
            <div className="lg:col-span-5 order-2 lg:order-1">
              <motion.div style={{ y: y1 }}>
                <FadeIn delay={0.1}>
                  <div className="space-y-6">
                    {/* Stats Card Block */}
                    <div className="p-6 rounded-2xl border border-white/15 bg-[#0d1527]/50 backdrop-blur-xl shadow-xl">
                      <div className="grid grid-cols-2 gap-6">
                        {STATS.map((stat) => (
                          <div key={stat.label}>
                            <div className="font-display text-3xl sm:text-4xl tracking-heading leading-display text-gradient-lime font-bold">
                              {stat.number}
                            </div>
                            <div className="section-label mt-1 text-[#a1a1aa]">{stat.label}</div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Status Box */}
                    <div className="p-5 rounded-2xl border border-[#c4ff36]/40 bg-[#0c160e]/60 backdrop-blur-xl shadow-lg glow-pulse">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="w-2.5 h-2.5 rounded-full bg-[#c4ff36] animate-pulse" />
                        <span className="section-label text-[#c4ff36] font-semibold">Currently</span>
                      </div>
                      <p className="text-sm text-[#d1d5db] leading-relaxed font-sans">
                        Building <span className="text-white font-semibold">TechScript</span> — a programming language from scratch. Open to freelance and collaboration.
                      </p>
                    </div>

                    {/* Mini timeline Panel */}
                    <div className="p-6 rounded-2xl border border-white/15 bg-[#0d1527]/50 backdrop-blur-xl shadow-xl">
                      <span className="section-label text-[#a1a1aa] mb-4 block font-semibold">Engineering Journey</span>
                      <div className="space-y-1">
                        {TIMELINE.map((item, i) => (
                          <div key={item.year} className="flex items-start gap-3 py-2">
                            <div className="flex flex-col items-center mt-1">
                              <div className="w-2 h-2 rounded-full bg-[#c4ff36]" />
                              {i < TIMELINE.length - 1 && <div className="w-px h-7 bg-[#27272a]" />}
                            </div>
                            <div>
                              <span className="text-xs font-code text-[#c4ff36] font-bold">{item.year}</span>
                              <p className="text-xs text-[#d1d5db] mt-0.5 leading-snug font-sans">{item.event}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </FadeIn>
              </motion.div>
            </div>

            {/* Right column — heading + bio + superpowers (displayed at top on mobile) */}
            <div className="lg:col-span-7 order-1 lg:order-2">
              <motion.div style={{ y: y2 }}>
                <FadeIn delay={0.15}>
                  <h2 className="font-display text-4xl sm:text-5xl md:text-6xl tracking-heading leading-tight text-white mb-6 font-bold">
                    I don't just write code.<br />
                    <span className="text-gradient-lime">I architect systems.</span>
                  </h2>
                </FadeIn>

                <FadeIn delay={0.2}>
                  <div className="p-6 rounded-2xl border border-white/15 bg-[#0d1527]/50 backdrop-blur-xl shadow-xl mb-8">
                    <p className="text-[#d1d5db] text-sm sm:text-base leading-relaxed font-sans">
                      {profile.elevatorPitch}
                    </p>
                  </div>
                </FadeIn>

                {/* Superpowers */}
                <FadeIn delay={0.25}>
                  <h3 className="section-label mb-4 text-[#c4ff36] font-semibold">Core Superpowers</h3>
                </FadeIn>

                <div className="flex sm:grid grid-cols-1 sm:grid-cols-2 gap-4 overflow-x-auto sm:overflow-visible scrollbar-none snap-x snap-mandatory pb-4 sm:pb-0">
                  {SUPERPOWERS.map((power, i) => (
                    <FadeIn key={power.title} delay={0.3 + i * 0.08} className="shrink-0 w-[260px] sm:w-auto snap-center">
                      <div className="group p-5 rounded-2xl border border-white/15 bg-[#0d1527]/50 backdrop-blur-xl hover:border-[#c4ff36] hover:shadow-[0_0_25px_rgba(196,255,54,0.15)] transition-all duration-300 relative overflow-hidden h-full">
                        <div className="absolute top-4 right-4 text-xl opacity-40 group-hover:opacity-100 transition-opacity">
                          {power.icon}
                        </div>
                        <h4 className="text-sm font-bold text-white mb-2 group-hover:text-[#c4ff36] transition-colors">
                          {power.title}
                        </h4>
                        <p className="text-xs text-[#a1a1aa] leading-relaxed font-sans">
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
      </div>
    </section>
  );
};
