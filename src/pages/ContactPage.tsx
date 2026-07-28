import React from 'react';
import { SeoHead } from '@/core/seo/SeoHead';
import { ContactModule } from '@/modules/contact/ContactModule';

export const ContactPage: React.FC = () => {
  return (
    <>
      <SeoHead
        title="Contact & Technical Inquiries"
        description="Initiate a direct conversation with Tanmoy Majumder regarding software engineering roles, technical advisory, and collaborations."
        slug="/contact"
      />
      <div className="pt-8">
        <ContactModule />
      </div>
    </>
  );
};
