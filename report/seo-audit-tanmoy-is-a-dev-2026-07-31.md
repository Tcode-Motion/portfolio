# SEO / GEO / AEO Audit Report
**Domain:** tanmoy.is-a.dev  
**Audit Date:** July 31, 2026  
**Audit Tool:** Claude Skill and Plugin by Alex Labat  

---

## Executive Summary

> **Summary:** tanmoy.is-a.dev is a personal portfolio for Tanmoy Majumder (Tcode-Motion), and its `<head>` metadata is genuinely well built — complete Open Graph and Twitter Card tags, a clean canonical URL, and explicit indexing directives. The urgent problem sits one layer deeper: every attempt to fetch the page's raw HTML in this audit returned only the `<head>` block, with no body markup, headings, or text — consistent with a fully client-side-rendered app with no server-side or static rendering. Combined with zero appearances across multiple targeted web searches for the exact domain, the site is currently close to invisible to search engines and AI answer engines, regardless of how good the content looks in a browser.

### Scorecard Overview

| Dimension | Score | Status | Key Takeaway |
| :--- | :---: | :---: | :--- |
| **SEO** | 5/10 | Needs Work | Strong meta layer, oversized title/description, unverifiable body content |
| **GEO** | 3/10 | Needs Work | No verifiable E-E-A-T signals or factual content for AI engines to cite |
| **AEO** | 3/10 | Needs Work | No confirmed FAQ/HowTo schema or question-format headings |
| **Combined** | **11/30** | | |

---

## Pages Audited

| URL | Page Type | Notes |
| :--- | :--- | :--- |
| `https://tanmoy.is-a.dev/` | Homepage | Fetched twice via raw HTML extraction; only `<head>` metadata returned both times, no body markup |

*Note: robots.txt, sitemap.xml, and any inner pages (About, Projects, Blog, Contact) could not be reached — the fetch tool used for this audit blocked requests to any tanmoy.is-a.dev URL beyond the homepage. Treat findings below on body-level content (headings, word count, schema, internal links) as "unable to verify," not confirmed absent.*

---

## SEO Analysis
**Score: 5/10 — Needs Work**

### Technical On-Page

| Signal | Finding | Status |
| :--- | :--- | :---: |
| **Title tag** | Present: "Tanmoy Majumder — Software Engineer, TechScript Creator & Open Source Developer" (~82 characters, well past the ~60-char display limit — will truncate in search results) | Needs Attention |
| **Meta description** | Present, ~190 characters — roughly 30 characters over Google's ~160-char snippet limit | Needs Attention |
| **Canonical tag** | Present and self-referencing correctly (`https://tanmoy.is-a.dev/`) | Good |
| **Robots meta** | `index, follow, max-snippet:-1, max-image-preview:large` — fully crawlable, no accidental noindex | Good |
| **Viewport meta** | Present and correctly configured for mobile | Good |
| **Heading hierarchy (H1/H2/H3)** | Not visible in fetched HTML — could not verify | Needs Attention |
| **Image alt text** | Not visible in fetched HTML — could not verify | Needs Attention |
| **Internal links** | Not visible in fetched HTML — could not verify | Needs Attention |
| **Open Graph tags** | Complete set: og:title, og:description, og:image (1200x630), og:type, og:url, og:site_name, og:locale | Good |
| **Twitter Card** | Complete set: summary_large_image, twitter:title, description, image, creator, site | Good |

### Content Quality

| Signal | Finding | Status |
| :--- | :--- | :---: |
| **Word count / body text** | Raw HTML fetch returned no body content in either attempt — cannot confirm what text exists | Needs Attention |
| **Content freshness signals** | Not visible in fetched HTML — could not verify | Needs Attention |
| **Readability structure** | Not visible in fetched HTML — could not verify | Needs Attention |

### Structured Data

| Signal | Finding | Status |
| :--- | :--- | :---: |
| **JSON-LD / schema markup** | None detected in the fetched `<head>` block (Person/Organization schema would typically live here or in `<body>`) — not confirmed absent, but not found where expected | Needs Attention |

---

## GEO Analysis
**Score: 3/10 — Needs Work**

### E-E-A-T Assessment

| Signal | Finding | Status |
| :--- | :--- | :---: |
| **Author information** | meta-author tag present ("Tanmoy Majumder") but no visible bio, credentials, or experience signals in fetched content | Needs Attention |
| **Trust signals (testimonials, awards, press)** | Not visible in fetched HTML — could not verify | Needs Attention |
| **Organization/Person schema** | Not detected | Missing |

### Content for AI Synthesis

| Signal | Finding | Status |
| :--- | :--- | :---: |
| **Factual density (stats, specifics)** | Cannot assess — no body content retrieved | Needs Attention |
| **Clear value proposition stated upfront** | Meta description states it clearly ("Rust developer, creator of TechScript... open source engineer") — but this only helps if AI crawlers also see it in the body | Needs Attention |
| **Entity clarity (brand/name consistency)** | Strong — "Tanmoy Majumder" and "Tcode-Motion" used consistently across title, author, OG, and Twitter tags | Good |

### Technical GEO

| Signal | Finding | Status |
| :--- | :--- | :---: |
| **HTTPS** | Site serves over HTTPS | Good |
| **Crawlability for AI crawlers** | Raw HTML returns an effectively empty body — many AI crawlers (GPTBot, PerplexityBot, and similar) fetch raw HTML without full JS execution, so they likely see the same near-empty page this audit did | Missing |
| **Same-as / social profile links** | Not visible in fetched HTML — could not verify | Needs Attention |

---

## AEO Analysis
**Score: 3/10 — Needs Work**

### Featured Snippet Eligibility

| Signal | Finding | Status |
| :--- | :--- | :---: |
| **Direct-answer paragraphs** | Cannot assess — no body content retrieved | Needs Attention |
| **List/table content** | Cannot assess — no body content retrieved | Needs Attention |

### Structured Answer Formats

| Signal | Finding | Status |
| :--- | :--- | :---: |
| **FAQ schema** | Not detected | Missing |
| **HowTo schema** | Not detected | Missing |
| **Question-phrased headings** | Cannot assess — no body content retrieved | Needs Attention |

### Voice Search Readiness

| Signal | Finding | Status |
| :--- | :--- | :---: |
| **Conversational / long-tail coverage** | Cannot assess — no body content retrieved | Needs Attention |

---

## Priority Recommendations

| Priority | Issue | Dimension | Effort | Impact |
| :--- | :--- | :--- | :--- | :--- |
| 🔴 **Critical** | Confirm whether the page ships meaningful content in initial HTML. If it's client-rendered only (e.g. React/Next without SSR or static export), switch to SSG/SSR (Next.js static export, prerendering, or a framework default) so crawlers and AI bots see real content without executing JS. | SEO / GEO / AEO | Medium | Very High |
| 🔴 **Critical** | Add Person/Organization JSON-LD schema in the page (name, jobTitle, url, sameAs links to GitHub/social) to give AI engines a clear entity to cite. | GEO | Low | High |
| 🟠 **High** | Shorten the title tag to ~55-60 characters, e.g. "Tanmoy Majumder — Rust Developer & TechScript Creator", so it doesn't truncate in SERPs. | SEO | Low | Medium |
| 🟠 **High** | Trim the meta description to ~150-160 characters, leading with the strongest hook. | SEO | Low | Medium |
| 🟠 **High** | Submit the site to Google Search Console and Bing Webmaster Tools and request indexing — it currently shows zero footprint across search. | SEO | Low | High |
| 🟡 **Medium** | Add visible FAQ content with FAQ schema (e.g. "What does Tanmoy build?", "What is TechScript?") to open up featured-snippet and AI-citation opportunities. | AEO | Medium | Medium |
| 🟡 **Medium** | Add an About/bio section with concrete credentials, project counts, and specifics (not just adjectives) to strengthen E-E-A-T. | GEO | Medium | Medium |
| 🟢 **Quick Win** | Add sameAs links (GitHub, Twitter/X, YouTube, Instagram) to strengthen the brand entity graph for AI engines. | GEO | Low | Medium |

---

## What's Working Well

> **Positive Findings:** The `<head>` is more complete than most personal portfolio sites: full Open Graph (title, description, image at correct 1200x630 dimensions, type, url, site_name, locale) and full Twitter Card metadata, a self-referencing canonical, explicit crawl-friendly robots directives, and a consistent brand identity ("Tanmoy Majumder" / "Tcode-Motion") across every tag. If the underlying rendering issue gets fixed, this metadata foundation means social shares and link previews will already look polished.

---

## Glossary

- **SEO (Search Engine Optimization):** The practice of improving a site so traditional search engines like Google and Bing rank and display it well for relevant queries.
- **GEO (Generative Engine Optimization):** Optimizing a site so AI-powered search tools (ChatGPT Search, Perplexity, Google AI Overviews, Gemini) can find, trust, and cite it when synthesizing answers.
- **AEO (Answer Engine Optimization):** Optimizing content so it can be extracted directly as a featured snippet, voice assistant answer, or "People Also Ask" result.
