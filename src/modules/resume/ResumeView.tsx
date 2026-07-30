import React from 'react';
import { getProfile, getSkills, getFeaturedProjects } from '@/core/content/contentLoader';
import { FadeIn } from '@/primitives/FadeIn';
import { GlassPanel } from '@/primitives/GlassPanel';
import { FileText, Printer, Mail, MapPin, Github } from 'lucide-react';

export const ResumeView: React.FC = () => {
  const profile = getProfile();
  const skills = getSkills();
  const projects = getFeaturedProjects();

  const handlePrint = () => {
    window.print();
  };

  return (
    <section id="resume" className="py-24 relative overflow-hidden bg-surface-base border-t border-border-subtle">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header & Toolbar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6 mb-12">
          <div className="space-y-2 text-center sm:text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-accent-purple/10 border border-accent-purple/30 font-code text-xs text-accent-purple">
              <FileText className="w-3.5 h-3.5" />
              <span>Executive Resume View</span>
            </div>
            <h2 className="font-display font-extrabold text-3xl sm:text-4xl text-content-primary">
              Curriculum Vitae
            </h2>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handlePrint}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-accent-indigo text-white font-body font-semibold text-xs hover:bg-indigo-600 transition-colors shadow-lg shadow-accent-indigo/25"
            >
              <Printer className="w-4 h-4" />
              <span>Print / Save PDF</span>
            </button>
          </div>
        </div>

        {/* Resume Sheet */}
        <FadeIn direction="up">
          <GlassPanel glow className="p-8 sm:p-12 border-border-subtle bg-surface-raised space-y-10 shadow-2xl print:bg-white print:text-black print:p-0">
            
            {/* Header / Identity */}
            <div className="border-b border-border-subtle pb-8 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
              <div className="space-y-2">
                <h1 className="font-display font-extrabold text-3xl sm:text-4xl text-content-primary">
                  {profile.name}
                </h1>
                <p className="font-display font-bold text-lg text-accent-cyan">
                  {profile.title}
                </p>
                <div className="flex flex-wrap items-center gap-4 font-code text-xs text-content-secondary pt-1">
                  <span className="flex items-center gap-1.5"><MapPin className="w-3.5 h-3.5 text-accent-indigo" /> {profile.location}</span>
                  <span className="flex items-center gap-1.5"><Mail className="w-3.5 h-3.5 text-accent-purple" /> {profile.contactEmail}</span>
                  <span className="flex items-center gap-1.5"><Github className="w-3.5 h-3.5 text-accent-cyan" /> github.com/Tcode-Motion</span>
                </div>
              </div>
            </div>

            {/* Summary */}
            <div className="space-y-3">
              <h3 className="font-display font-bold text-lg text-accent-indigo uppercase tracking-wider">
                Professional Summary
              </h3>
              <p className="font-body text-sm text-content-secondary leading-relaxed">
                {profile.elevatorPitch}
              </p>
            </div>

            {/* Core Competencies */}
            <div className="space-y-3">
              <h3 className="font-display font-bold text-lg text-accent-purple uppercase tracking-wider">
                Primary Superpowers & Technical Stack
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 font-code text-xs">
                {skills.categories.map((cat) => (
                  <div key={cat.id} className="p-3 rounded-lg bg-surface-base border border-border-subtle space-y-1">
                    <span className="text-content-primary font-bold">{cat.name}:</span>
                    <p className="text-content-secondary">{cat.skills.map((s) => s.name).join(' • ')}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Key Software Products */}
            <div className="space-y-4">
              <h3 className="font-display font-bold text-lg text-accent-cyan uppercase tracking-wider">
                Flagship Engineering Works & Case Studies
              </h3>
              <div className="space-y-4">
                {projects.map((proj) => (
                  <div key={proj.id} className="p-4 rounded-xl bg-surface-base border border-border-subtle space-y-2">
                    <div className="flex items-center justify-between">
                      <h4 className="font-display font-bold text-base text-content-primary">{proj.title}</h4>
                      <span className="font-code text-xs text-accent-cyan">{proj.category}</span>
                    </div>
                    <p className="font-body text-xs text-content-secondary">{proj.tagline}</p>
                    <div className="flex flex-wrap gap-1 pt-1">
                      {proj.techStack.map((tech) => (
                        <span key={tech} className="px-2 py-0.5 rounded bg-surface-raised font-code text-[10px] text-content-tertiary">
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Footer Note */}
            <div className="pt-6 border-t border-border-subtle flex items-center justify-between font-code text-xs text-content-tertiary">
              <span>Interactive Portfolio: tanmoy.is-a.dev</span>
              <span>Available for Global Roles</span>
            </div>

          </GlassPanel>
        </FadeIn>

      </div>
    </section>
  );
};
