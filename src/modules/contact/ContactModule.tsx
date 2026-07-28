import React, { useState, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { FadeIn } from '@/primitives/FadeIn';
import { useSound } from '@/core/audio/SoundManager';
import { getProfile, getSocials } from '@/core/content/contentLoader';

export const ContactModule: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { playClick, playHover } = useSound();
  const profile = getProfile();
  const socials = getSocials();

  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [submitted, setSubmitted] = useState(false);
  const [focusedField, setFocusedField] = useState<string | null>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });
  const y = useTransform(scrollYProgress, [0, 1], [60, -60]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    playClick();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
  };

  return (
    <section ref={sectionRef} id="contact" className="relative py-20 sm:py-28 overflow-hidden">
      {/* Gradient background */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'linear-gradient(180deg, transparent 0%, rgba(196,255,54,0.02) 50%, transparent 100%)',
        }}
      />

      <div className="max-w-[1400px] mx-auto px-6 sm:px-8 md:px-12 lg:px-20">
        {/* Section label */}
        <FadeIn>
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-px bg-[var(--accent-lime)]" />
            <span className="section-label text-[var(--accent-lime)]">Contact</span>
          </div>
        </FadeIn>

        <motion.div style={{ y }}>
          <FadeIn delay={0.1}>
            <h2 className="font-display text-4xl sm:text-5xl md:text-7xl tracking-heading leading-heading mb-4">
              Let's build<br />
              something <span className="text-gradient-lime">extraordinary</span>
            </h2>
          </FadeIn>
        </motion.div>

        {/* Large email CTA */}
        <FadeIn delay={0.2}>
          <div className="my-16">
            <a
              href={`mailto:${profile.contactEmail || 'tanmoybhowmik2006@gmail.com'}`}
              className="group inline-flex items-center gap-4 font-display text-2xl sm:text-3xl md:text-5xl tracking-heading text-[var(--text-1)] hover:text-[var(--accent-lime)] transition-colors duration-500 magnetic-btn"
              data-cursor="hover"
              onClick={() => playClick()}
              onMouseEnter={() => playHover()}
            >
              <span>{profile.contactEmail || 'tanmoybhowmik2006@gmail.com'}</span>
              <svg
                className="w-8 h-8 md:w-12 md:h-12 group-hover:translate-x-2 group-hover:-translate-y-2 transition-transform duration-300"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={1.5}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25" />
              </svg>
            </a>
          </div>
        </FadeIn>

        {/* Two-column: form + socials */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Form Card */}
          <FadeIn delay={0.3}>
            <div className="p-8 sm:p-10 rounded-2xl border border-[#1f2430] bg-[#080a0f]/92 backdrop-blur-xl shadow-2xl">
              <form onSubmit={handleSubmit} className="space-y-8">
                {[
                  { name: 'name', label: 'Name', type: 'text', placeholder: 'Your name' },
                  { name: 'email', label: 'Email', type: 'email', placeholder: 'your@email.com' },
                ].map((field) => (
                  <div key={field.name} className="relative">
                    <label className="section-label block mb-3 text-white">{field.label}</label>
                    <div className="relative">
                      <input
                        type={field.type}
                        value={formData[field.name as keyof typeof formData]}
                        onChange={(e) => setFormData({ ...formData, [field.name]: e.target.value })}
                        onFocus={() => setFocusedField(field.name)}
                        onBlur={() => setFocusedField(null)}
                        className="w-full bg-[#050505]/60 border-b-2 py-3 px-3 text-sm text-white placeholder-[#71717a] focus:outline-none transition-colors duration-300 rounded-t"
                        style={{
                          borderColor: focusedField === field.name
                            ? 'var(--accent-lime)'
                            : 'var(--border)',
                        }}
                        placeholder={field.placeholder}
                        required
                      />
                      <motion.div
                        className="absolute bottom-0 left-0 h-[2px] bg-[var(--accent-lime)]"
                        initial={{ scaleX: 0 }}
                        animate={{ scaleX: focusedField === field.name ? 1 : 0 }}
                        transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                        style={{ transformOrigin: 'left' }}
                      />
                    </div>
                  </div>
                ))}

                <div className="relative">
                  <label className="section-label block mb-3 text-white">Message</label>
                  <div className="relative">
                    <textarea
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      onFocus={() => setFocusedField('message')}
                      onBlur={() => setFocusedField(null)}
                      className="w-full bg-[#050505]/60 border-b-2 py-3 px-3 text-sm text-white placeholder-[#71717a] focus:outline-none transition-colors duration-300 resize-none h-32 rounded-t"
                      style={{
                        borderColor: focusedField === 'message'
                          ? 'var(--accent-lime)'
                          : 'var(--border)',
                      }}
                      placeholder="Tell me about your project..."
                      required
                    />
                    <motion.div
                      className="absolute bottom-0 left-0 h-[2px] bg-[var(--accent-lime)]"
                      initial={{ scaleX: 0 }}
                      animate={{ scaleX: focusedField === 'message' ? 1 : 0 }}
                      transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                      style={{ transformOrigin: 'left' }}
                    />
                  </div>
                </div>

                <motion.button
                  type="submit"
                  className="w-full sm:w-auto px-8 py-3.5 bg-[#c4ff36] text-[#050505] font-semibold text-sm rounded-full magnetic-btn hover:shadow-[0_0_30px_rgba(196,255,54,0.35)] transition-all"
                  whileTap={{ scale: 0.98 }}
                >
                  {submitted ? '✓ Sent!' : 'Send Message'}
                </motion.button>
              </form>
            </div>
          </FadeIn>

          {/* Socials + availability */}
          <FadeIn delay={0.35}>
            <div className="space-y-8">
              {/* Availability */}
              <div className="p-6 rounded-xl border border-[var(--accent-lime)] bg-[rgba(196,255,54,0.03)]">
                <div className="flex items-center gap-2 mb-3">
                  <span className="w-2 h-2 rounded-full bg-[var(--accent-lime)] animate-pulse" />
                  <span className="section-label text-[var(--accent-lime)]">Availability</span>
                </div>
                <p className="text-sm text-[var(--text-2)]">
                  Open for freelance projects, collaborations, and full-time opportunities. Let's discuss your vision.
                </p>
              </div>

              {/* Social links */}
              <div className="space-y-3">
                <span className="section-label text-[var(--text-3)]">Connect</span>
                {socials.map((social) => (
                  <a
                    key={social.platform}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => playClick()}
                    onMouseEnter={() => playHover()}
                    className="group flex items-center justify-between py-3 border-b border-[var(--border)] hover:border-[var(--accent-lime)] transition-colors magnetic-btn"
                    data-cursor="hover"
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-lg opacity-40 group-hover:opacity-100 transition-opacity">{social.icon}</span>
                      <div>
                        <span className="text-sm text-[var(--text-2)] group-hover:text-[var(--text-1)] transition-colors">
                          {social.platform}
                        </span>
                        <span className="text-xs text-[var(--text-3)] ml-2">{social.username}</span>
                      </div>
                    </div>
                    <svg
                      className="w-4 h-4 text-[var(--text-3)] group-hover:text-[var(--accent-lime)] group-hover:translate-x-1 group-hover:-translate-y-1 transition-all"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={1.5}
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25" />
                    </svg>
                  </a>
                ))}
              </div>

              {/* Response time */}
              <div className="flex items-center gap-2 text-xs text-[var(--text-3)]">
                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>Usually responds within 24 hours</span>
              </div>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
};
