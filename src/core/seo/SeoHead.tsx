import React, { useEffect } from 'react';

const SITE_NAME = 'Tanmoy Majumder Portfolio';
const BASE_URL = 'https://tanmoy.is-a.dev';
const DEFAULT_OG_IMAGE = 'https://github.com/Tcode-Motion.png';

interface SeoHeadProps {
  title: string;
  description: string;
  slug?: string;
  ogImage?: string;
  ogType?: 'website' | 'article' | 'profile';
  jsonLd?: object | object[];
  breadcrumbs?: Array<{ name: string; item: string }>;
  noindex?: boolean;
}

const setMeta = (selector: string, attr: string, value: string) => {
  let el = document.querySelector(selector);
  if (!el) {
    const tag = selector.includes('[property') ? 'meta' : selector.split('[')[0] || 'meta';
    el = document.createElement(tag);
    const attrMatch = selector.match(/\[([a-z:]+)="([^"]+)"\]/);
    if (attrMatch) el.setAttribute(attrMatch[1], attrMatch[2]);
    document.head.appendChild(el);
  }
  el.setAttribute(attr, value);
};

export const SeoHead: React.FC<SeoHeadProps> = ({
  title,
  description,
  slug = '',
  ogImage = DEFAULT_OG_IMAGE,
  ogType = 'website',
  jsonLd,
  breadcrumbs,
  noindex = false,
}) => {
  useEffect(() => {
    const canonicalUrl = `${BASE_URL}${slug ? `/${slug.replace(/^\//, '')}` : ''}`;
    const fullTitle = `${title} | ${SITE_NAME}`;

    // ── 1. Title
    document.title = fullTitle;

    // ── 2. Meta description (unique, 150–160 chars)
    setMeta('meta[name="description"]', 'content', description);

    // ── 3. Canonical URL
    setMeta('link[rel="canonical"]', 'href', canonicalUrl);

    // ── 4. Robots
    setMeta('meta[name="robots"]', 'content', noindex
      ? 'noindex, nofollow'
      : 'index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1');

    // ── 5. Open Graph
    setMeta('meta[property="og:title"]',       'content', fullTitle);
    setMeta('meta[property="og:description"]', 'content', description);
    setMeta('meta[property="og:url"]',         'content', canonicalUrl);
    setMeta('meta[property="og:type"]',        'content', ogType);
    setMeta('meta[property="og:image"]',       'content', ogImage);
    setMeta('meta[property="og:image:width"]', 'content', '1200');
    setMeta('meta[property="og:image:height"]','content', '630');
    setMeta('meta[property="og:image:alt"]',   'content', `${title} — Tanmoy Majumder`);
    setMeta('meta[property="og:site_name"]',   'content', SITE_NAME);
    setMeta('meta[property="og:locale"]',      'content', 'en_US');

    // ── 6. Twitter Card
    setMeta('meta[name="twitter:card"]',        'content', 'summary_large_image');
    setMeta('meta[name="twitter:title"]',       'content', fullTitle);
    setMeta('meta[name="twitter:description"]', 'content', description);
    setMeta('meta[name="twitter:image"]',       'content', ogImage);
    setMeta('meta[name="twitter:image:alt"]',   'content', `${title} — Tanmoy Majumder`);
    setMeta('meta[name="twitter:site"]',        'content', '@TanmoyMaju40558');
    setMeta('meta[name="twitter:creator"]',     'content', '@TanmoyMaju40558');

    // ── 7. JSON-LD Structured Data
    // Clear existing JSON-LD scripts first to avoid stale data on navigation
    document.querySelectorAll('script[data-seo-jsonld]').forEach(el => el.remove());

    const payloads = Array.isArray(jsonLd) ? jsonLd : jsonLd ? [jsonLd] : [];

    // Always inject WebSite schema on every page
    const webSiteSchema = {
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      name: SITE_NAME,
      url: BASE_URL,
      description: 'Official portfolio of Tanmoy Majumder — Rust developer, TechScript programming language creator, open source builder and software engineer.',
      author: {
        '@type': 'Person',
        name: 'Tanmoy Majumder',
        url: BASE_URL,
        sameAs: [
          'https://github.com/Tcode-Motion',
          'https://x.com/TanmoyMaju40558',
          'https://youtube.com/@tcodemotin',
        ],
      },
      potentialAction: {
        '@type': 'SearchAction',
        target: { '@type': 'EntryPoint', urlTemplate: `${BASE_URL}/projects?q={search_term_string}` },
        'query-input': 'required name=search_term_string',
      },
    };
    payloads.unshift(webSiteSchema);

    // BreadcrumbList
    if (breadcrumbs && breadcrumbs.length > 0) {
      const breadcrumbSchema = {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: BASE_URL },
          ...breadcrumbs.map((b, i) => ({
            '@type': 'ListItem',
            position: i + 2,
            name: b.name,
            item: b.item,
          })),
        ],
      };
      payloads.push(breadcrumbSchema);
    }

    payloads.forEach((payload, i) => {
      const script = document.createElement('script');
      script.setAttribute('type', 'application/ld+json');
      script.setAttribute('data-seo-jsonld', String(i));
      script.textContent = JSON.stringify(payload);
      document.head.appendChild(script);
    });

  }, [title, description, slug, ogImage, ogType, jsonLd, breadcrumbs, noindex]);

  return null;
};
