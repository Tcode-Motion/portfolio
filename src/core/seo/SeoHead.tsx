import React, { useEffect } from 'react';

interface SeoHeadProps {
  title: string;
  description: string;
  slug?: string;
  jsonLd?: object;
}

export const SeoHead: React.FC<SeoHeadProps> = ({
  title,
  description,
  slug = '',
  jsonLd,
}) => {
  useEffect(() => {
    // 1. Update Title
    const siteTitle = `${title} | Tanmoy Majumder Portfolio`;
    document.title = siteTitle;

    // 2. Update Meta Description
    let metaDesc = document.querySelector('meta[name="description"]');
    if (!metaDesc) {
      metaDesc = document.createElement('meta');
      metaDesc.setAttribute('name', 'description');
      document.head.appendChild(metaDesc);
    }
    metaDesc.setAttribute('content', description);

    // 3. Update Canonical Tag
    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.setAttribute('rel', 'canonical');
      document.head.appendChild(canonical);
    }
    const currentUrl = `https://tanmoy.is-a.dev${slug ? `/${slug.replace(/^\//, '')}` : ''}`;
    canonical.setAttribute('href', currentUrl);

    // 4. Inject JSON-LD Structured Data
    if (jsonLd) {
      let script = document.querySelector('#json-ld-script');
      if (!script) {
        script = document.createElement('script');
        script.id = 'json-ld-script';
        script.setAttribute('type', 'application/ld+json');
        document.head.appendChild(script);
      }
      script.textContent = JSON.stringify(jsonLd);
    }
  }, [title, description, slug, jsonLd]);

  return null;
};
