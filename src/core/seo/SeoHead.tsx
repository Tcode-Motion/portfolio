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
  /**
   * Page-specific JSON-LD schemas. Do NOT pass Person or WebSite here —
   * those are already in the static index.html and will be read by all crawlers
   * without JavaScript. Only pass rich-result-eligible schemas:
   * FAQPage, SoftwareSourceCode, BreadcrumbList, CollectionPage, etc.
   */
  jsonLd?: object | object[];
  breadcrumbs?: Array<{ name: string; item: string }>;
  noindex?: boolean;
}

const setMeta = (selector: string, attr: string, value: string) => {
  let el = document.querySelector(selector);
  if (!el) {
    const tagMatch = selector.match(/^([a-z]+)/);
    const tag = tagMatch ? tagMatch[1] : 'meta';
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

    // ── 2. Meta description
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

    // ── 7. Page-specific JSON-LD
    // NOTE: Person and WebSite schemas are already injected statically in index.html
    // and are visible to all crawlers before JS executes. Do NOT re-inject them here.
    // Only inject page-specific, rich-result-eligible schemas below.

    // Remove any previously injected dynamic schemas to prevent stale data on SPA navigation
    document.querySelectorAll('script[data-seo-jsonld]').forEach(el => el.remove());

    const payloads: object[] = Array.isArray(jsonLd) ? jsonLd : jsonLd ? [jsonLd] : [];

    // Always inject BreadcrumbList when breadcrumbs are provided
    if (breadcrumbs && breadcrumbs.length > 0) {
      payloads.push({
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
      });
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
