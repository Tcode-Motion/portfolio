import React from 'react';
import { SeoHead } from '@/core/seo/SeoHead';
import { ContactModule } from '@/modules/contact/ContactModule';

export const ContactPage: React.FC = () => {
  return (
    <>
      <SeoHead
        title="Contact Tanmoy Majumder — Hire Rust Developer & Software Engineer"
        description="Get in touch with Tanmoy Majumder (Tcode-Motion) for software engineering roles, technical collaboration, open source projects, or consulting. Available for global remote opportunities."
        slug="contact"
        breadcrumbs={[{ name: 'Contact', item: 'https://tanmoy.is-a.dev/contact' }]}
        jsonLd={[
          {
            '@context': 'https://schema.org',
            '@type': 'ContactPage',
            '@id': 'https://tanmoy.is-a.dev/contact#page',
            name: 'Contact Tanmoy Majumder',
            url: 'https://tanmoy.is-a.dev/contact',
            description: 'Contact page for Tanmoy Majumder — open for software engineering roles, technical advisory, and open source collaborations.',
            mainEntity: { '@id': 'https://tanmoy.is-a.dev/#person' },
          },
        ]}
      />
      <div className="pt-8">
        <ContactModule />
      </div>
    </>
  );
};
