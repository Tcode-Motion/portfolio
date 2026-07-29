import React, { useState, useRef } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { Github, Twitter, MessageSquare, Youtube, Instagram, Mail, Clock, ArrowUpRight } from 'lucide-react';
import { FadeIn } from '@/primitives/FadeIn';
import { useSound } from '@/core/audio/SoundManager';
import { getProfile, getSocials } from '@/core/content/contentLoader';

export const ContactModule: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { playClick, playHover } = useSound();
  const profile = getProfile();
  const socials = getSocials();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subjectOption: 'General Inquiry',
    customSubject: '',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);
  const [showMailSelector, setShowMailSelector] = useState(false);
  const [mailtoUrlData, setMailtoUrlData] = useState({ recipient: '', subject: '', body: '' });
  const [rememberChoice, setRememberChoice] = useState(false);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });
  const y = useTransform(scrollYProgress, [0, 1], [60, -60]);

  const triggerEmailClient = (clientKey: string, recipient: string, subject: string, body: string) => {
    let url = '';
    if (clientKey === 'gmail') {
      url = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(recipient)}&su=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    } else if (clientKey === 'outlook') {
      url = `https://outlook.live.com/default/deeplink/compose?to=${encodeURIComponent(recipient)}&subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    } else {
      // Default Native mailto client
      url = `mailto:${recipient}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    }

    if (rememberChoice) {
      localStorage.setItem('preferred_mail_client', clientKey);
    }

    if (clientKey === 'default') {
      window.location.href = url;
    } else {
      window.open(url, '_blank');
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    playClick();

    const recipient = profile.contactEmail || 'tcodemotion@gmail.com';
    const finalSubject = formData.subjectOption === 'Custom'
      ? formData.customSubject
      : formData.subjectOption;

    const emailSubject = `[Portfolio Inquiry] ${finalSubject}`;
    const emailBody = `Name: ${formData.name}
Email: ${formData.email}
Subject: ${finalSubject}

Message:
${formData.message}`;

    const savedPreference = localStorage.getItem('preferred_mail_client');
    if (savedPreference) {
      triggerEmailClient(savedPreference, recipient, emailSubject, emailBody);
      setSubmitted(true);
      setTimeout(() => setSubmitted(false), 4000);
    } else {
      setMailtoUrlData({ recipient, subject: emailSubject, body: emailBody });
      setShowMailSelector(true);
    }
  };

  const renderSocialIcon = (iconName: string) => {
    const name = iconName.toLowerCase();
    if (name.includes('github')) return <Github className="w-4 h-4 text-[#c4ff36]" />;
    if (name.includes('twitter') || name.includes('x')) return <Twitter className="w-4 h-4 text-[#38bdf8]" />;
    if (name.includes('discord') || name.includes('message')) return <MessageSquare className="w-4 h-4 text-[#a855f7]" />;
    if (name.includes('youtube')) return <Youtube className="w-4 h-4 text-[#ef4444]" />;
    if (name.includes('instagram')) return <Instagram className="w-4 h-4 text-[#ec4899]" />;
    return <Mail className="w-4 h-4 text-[#c4ff36]" />;
  };

  return (
    <section ref={sectionRef} id="contact" className="relative pt-8 sm:pt-28 pb-4 overflow-hidden">
      {/* Background accent gradient */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'linear-gradient(180deg, transparent 0%, rgba(196,255,54,0.02) 50%, transparent 100%)',
        }}
      />

      <div className="max-w-[1400px] mx-auto px-6 sm:px-8 md:px-12 lg:px-20">
        {/* Outer Ultra-Translucent Frosted Dark Glass Container Card */}
        <div className="p-5 sm:p-12 md:p-14 rounded-3xl border border-white/15 bg-[#0a0f1d]/40 backdrop-blur-2xl shadow-[0_25px_60px_rgba(0,0,0,0.6)] relative">
          {/* Section label */}
          <FadeIn>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-px bg-[var(--accent-lime)]" />
              <span className="section-label text-[var(--accent-lime)]">Contact</span>
            </div>
          </FadeIn>

          <motion.div style={{ y }}>
            <FadeIn delay={0.1}>
              <h2 className="font-display text-4xl sm:text-5xl md:text-6xl tracking-heading leading-heading mb-4 text-white font-bold">
                Let's build<br />
                something <span className="text-gradient-lime">extraordinary</span>
              </h2>
            </FadeIn>
          </motion.div>

          {/* Large email CTA Banner Card */}
          <FadeIn delay={0.2}>
            <div className="my-10 p-6 sm:p-8 rounded-2xl border border-white/15 bg-[#0d1527]/50 backdrop-blur-xl shadow-xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 overflow-hidden">
              <a
                href={`mailto:${profile.contactEmail || 'tcodemotion@gmail.com'}`}
                className="group inline-flex items-center gap-2 font-display text-sm xs:text-lg sm:text-2xl md:text-4xl tracking-heading text-white hover:text-[#c4ff36] transition-colors duration-300 font-bold max-w-full truncate"
                onClick={() => playClick()}
                onMouseEnter={() => playHover()}
              >
                <span className="truncate">{profile.contactEmail || 'tcodemotion@gmail.com'}</span>
                <ArrowUpRight className="w-5 h-5 sm:w-7 sm:h-7 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform text-[#c4ff36] shrink-0" />
              </a>
              <span className="font-code text-xs text-[#a1a1aa] bg-[#121824]/80 px-3 py-1.5 rounded-full border border-white/10 shrink-0">
                // Direct Mail
              </span>
            </div>
          </FadeIn>

          {/* Two-column: Form + Socials */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            {/* Form Card (7 Columns) */}
            <div className="lg:col-span-7">
              <FadeIn delay={0.3}>
                <div className="p-5 sm:p-10 rounded-2xl border border-white/15 bg-[#0d1527]/50 backdrop-blur-xl shadow-xl">
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <div>
                        <label className="section-label block mb-2 text-[#a1a1aa] font-semibold">Name</label>
                        <input
                          type="text"
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          className="w-full bg-[#080d1a]/80 border border-white/10 py-3.5 px-4 text-sm text-white placeholder-[#71717a] focus:outline-none focus:border-[#c4ff36] transition-colors duration-300 rounded-xl"
                          placeholder="Your name"
                          required
                        />
                      </div>
                      <div>
                        <label className="section-label block mb-2 text-[#a1a1aa] font-semibold">Email</label>
                        <input
                          type="email"
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          className="w-full bg-[#080d1a]/80 border border-white/10 py-3.5 px-4 text-sm text-white placeholder-[#71717a] focus:outline-none focus:border-[#c4ff36] transition-colors duration-300 rounded-xl"
                          placeholder="your@email.com"
                          required
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 gap-6">
                      <div>
                        <label className="section-label block mb-2 text-[#a1a1aa] font-semibold">Subject Topic</label>
                        <select
                          value={formData.subjectOption}
                          onChange={(e) => setFormData({ ...formData, subjectOption: e.target.value })}
                          className="w-full bg-[#080d1a]/80 border border-white/10 py-3.5 px-4 text-sm text-white focus:outline-none focus:border-[#c4ff36] transition-colors duration-300 rounded-xl"
                          required
                        >
                          <option value="General Inquiry" className="bg-[#0a0f1d] text-white">General Inquiry</option>
                          <option value="Freelance Project" className="bg-[#0a0f1d] text-white">Freelance Project</option>
                          <option value="Collaboration / Partnership" className="bg-[#0a0f1d] text-white">Collaboration / Partnership</option>
                          <option value="Technical Advisory" className="bg-[#0a0f1d] text-white">Technical Advisory</option>
                          <option value="Custom" className="bg-[#0a0f1d] text-white">Other (Write my own...)</option>
                        </select>
                      </div>

                      {formData.subjectOption === 'Custom' && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          className="space-y-1"
                        >
                          <label className="section-label block mb-2 text-[#a1a1aa] font-semibold">Custom Subject</label>
                          <input
                            type="text"
                            value={formData.customSubject}
                            onChange={(e) => setFormData({ ...formData, customSubject: e.target.value })}
                            className="w-full bg-[#080d1a]/80 border border-white/10 py-3.5 px-4 text-sm text-white placeholder-[#71717a] focus:outline-none focus:border-[#c4ff36] transition-colors duration-300 rounded-xl"
                            placeholder="Enter your custom subject..."
                            required
                          />
                        </motion.div>
                      )}
                    </div>

                    <div>
                      <label className="section-label block mb-2 text-[#a1a1aa] font-semibold">Message</label>
                      <textarea
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        className="w-full bg-[#080d1a]/80 border border-white/10 py-3.5 px-4 text-sm text-white placeholder-[#71717a] focus:outline-none focus:border-[#c4ff36] transition-colors duration-300 resize-none h-32 rounded-xl"
                        placeholder="Tell me about your project..."
                        required
                      />
                    </div>

                    <motion.button
                      type="submit"
                      className="w-full sm:w-auto px-8 py-3.5 bg-[#c4ff36] text-[#050505] font-bold text-sm rounded-full hover:shadow-[0_0_30px_rgba(196,255,54,0.35)] transition-all active:scale-95"
                      whileTap={{ scale: 0.98 }}
                    >
                      {submitted ? '✓ Opening Email...' : 'Send Message'}
                    </motion.button>
                  </form>
                </div>
              </FadeIn>
            </div>

            {/* Socials + Availability (5 Columns) */}
            <div className="lg:col-span-5">
              <FadeIn delay={0.35}>
                <div className="space-y-6">
                  {/* Availability Card */}
                  <div className="p-6 rounded-2xl border border-[#c4ff36]/40 bg-[#0c160e]/60 backdrop-blur-xl shadow-lg glow-pulse">
                    <div className="flex items-center gap-2 mb-3">
                      <span className="w-2.5 h-2.5 rounded-full bg-[#c4ff36] animate-pulse" />
                      <span className="section-label text-[#c4ff36] font-semibold">Availability</span>
                    </div>
                    <p className="text-sm text-[#d1d5db] leading-relaxed font-sans">
                      Open for freelance projects, collaborations, and full-time opportunities. Let's discuss your vision.
                    </p>
                  </div>

                  {/* Social Links Panel */}
                  <div className="p-6 rounded-2xl border border-white/15 bg-[#0d1527]/50 backdrop-blur-xl shadow-xl space-y-4">
                    <span className="section-label text-[#a1a1aa] block font-semibold">Connect Networks</span>
                    <div className="space-y-2.5">
                      {socials.map((social) => (
                        <a
                          key={social.platform}
                          href={social.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={() => playClick()}
                          onMouseEnter={() => playHover()}
                          className="group flex items-center justify-between p-3 rounded-xl bg-[#080d1a]/80 border border-white/10 hover:border-[#c4ff36] transition-all"
                        >
                          <div className="flex items-center gap-3">
                            <div className="p-2 rounded-lg bg-[#080c14] border border-white/10">
                              {renderSocialIcon(social.icon)}
                            </div>
                            <div>
                              <span className="text-sm font-semibold text-white group-hover:text-[#c4ff36] transition-colors">
                                {social.platform}
                              </span>
                              <span className="text-xs text-[#a1a1aa] ml-2 font-code">@{social.username}</span>
                            </div>
                          </div>
                          <ArrowUpRight className="w-4 h-4 text-[#a1a1aa] group-hover:text-[#c4ff36] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                        </a>
                      ))}
                    </div>
                  </div>

                  {/* Response time */}
                  <div className="p-4 rounded-xl border border-[#1f2430] bg-[#0d121f]/90 flex items-center gap-3 text-xs text-[#a1a1aa]">
                    <Clock className="w-4 h-4 text-[#c4ff36]" />
                    <span>Usually responds within 24 hours</span>
                  </div>
                </div>
              </FadeIn>
            </div>
          </div>
        </div>
      </div>
      {/* Email Client Choice Selector Modal Overlay */}
      <AnimatePresence>
        {showMailSelector && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              className="w-full max-w-md p-6 sm:p-8 rounded-3xl border border-white/15 bg-[#0a0f1d]/90 backdrop-blur-2xl shadow-2xl space-y-6"
            >
              <div className="text-left space-y-2">
                <h3 className="font-display text-xl sm:text-2xl font-bold text-white">
                  Choose Email Client
                </h3>
                <p className="text-xs text-[#a1a1aa] leading-relaxed">
                  How would you prefer to send this email? We will pre-fill all form details automatically.
                </p>
              </div>

              {/* Selection Options */}
              <div className="space-y-3">
                {[
                  { key: 'gmail', label: 'Gmail (Web / Tab)', desc: 'Opens Gmail compose in a new browser tab' },
                  { key: 'outlook', label: 'Outlook (Web / Tab)', desc: 'Opens Live Outlook compose in web browser' },
                  { key: 'default', label: 'Default Mail App', desc: 'Opens native Outlook Mail / Apple Mail app' },
                ].map((choice) => (
                  <button
                    key={choice.key}
                    onClick={() => {
                      playClick();
                      triggerEmailClient(choice.key, mailtoUrlData.recipient, mailtoUrlData.subject, mailtoUrlData.body);
                      setShowMailSelector(false);
                      setSubmitted(true);
                      setTimeout(() => setSubmitted(false), 4000);
                    }}
                    className="w-full text-left p-4 rounded-xl border border-white/10 hover:border-[#c4ff36] bg-[#0c1220]/60 hover:bg-[#121c33]/70 transition-all flex flex-col justify-center"
                  >
                    <span className="text-sm font-bold text-white group-hover:text-[#c4ff36]">{choice.label}</span>
                    <span className="text-[11px] text-[#888] mt-0.5">{choice.desc}</span>
                  </button>
                ))}
              </div>

              {/* Remember Choice Checkbox */}
              <label className="flex items-center gap-3 cursor-pointer select-none text-xs text-[#a1a1aa] pt-1">
                <input
                  type="checkbox"
                  checked={rememberChoice}
                  onChange={(e) => setRememberChoice(e.target.checked)}
                  className="w-4 h-4 rounded border-white/20 bg-[#080d1a] text-[#c4ff36] focus:ring-0 cursor-pointer"
                />
                <span>Remember choice (automates this for next submissions)</span>
              </label>

              {/* Cancel Button */}
              <div className="flex justify-end pt-2 border-t border-white/5">
                <button
                  onClick={() => { playClick(); setShowMailSelector(false); }}
                  className="px-4 py-2 text-xs font-code font-bold text-[#a1a1aa] hover:text-white border border-[#1f2430] rounded-xl transition-all"
                >
                  Cancel
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};

