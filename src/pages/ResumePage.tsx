import React from 'react';
import { SeoHead } from '@/core/seo/SeoHead';
import { ResumeView } from '@/modules/resume/ResumeView';

export const ResumePage: React.FC = () => {
  return (
    <>
      <SeoHead
        title="Tanmoy Majumder Resume — Software Engineer, Rust Developer & TechScript Creator"
        description="Download or view the professional resume of Tanmoy Majumder — software engineer, Rust programmer, TechScript language creator, AI developer, and open source builder from West Bengal, India."
        slug="resume"
        breadcrumbs={[{ name: 'Resume', item: 'https://tanmoy.is-a.dev/resume' }]}
        jsonLd={[
          {
            '@context': 'https://schema.org',
            '@type': 'WebPage',
            '@id': 'https://tanmoy.is-a.dev/resume#page',
            name: 'Tanmoy Majumder — Professional Resume',
            description: 'Professional resume and technical qualifications of Tanmoy Majumder — software engineer, Rust developer, and TechScript creator.',
            url: 'https://tanmoy.is-a.dev/resume',
            about: { '@id': 'https://tanmoy.is-a.dev/#person' },
          },
        ]}
      />
      <div className="pt-8">
        <ResumeView />
      </div>
    </>
  );
};
