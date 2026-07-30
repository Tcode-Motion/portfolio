import React from 'react';
import { SeoHead } from '@/core/seo/SeoHead';
import { ResumeView } from '@/modules/resume/ResumeView';

export const ResumePage: React.FC = () => {
  return (
    <>
      <SeoHead
        title="Executive Resume"
        description="Printable executive resume and technical qualifications for Tanmoy Majumder."
        slug="/resume"
      />
      <div className="pt-8">
        <ResumeView />
      </div>
    </>
  );
};
