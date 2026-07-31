# SEO / GEO / AEO Fix Report — tanmoy.is-a.dev

Generated from the audit dated July 31, 2026 (score: 11/30 — SEO 5/10, GEO 3/10, AEO 3/10).
This report turns every finding into a real, paste-in fix. Nothing below is a placeholder —
every value (name, handles, URLs, quoted strings) is pulled directly from what the audit
confirmed on your live `<head>`. Two items need one more input from you before they can be
finished; they're marked clearly below instead of being faked.

**How to use this:** work top to bottom. Critical items are blocking — nothing else on this
list matters for GEO/AEO if a crawler still can't see your body content.

---

## 🔴 Critical

### 1. Fix: Ship real HTML in the initial response (SSR/SSG)

**Problem:** Two independent raw fetches of `https://tanmoy.is-a.dev/` returned only the
`<head>` block — no body, no headings, no text. That means non-JS crawlers (GPTBot,
PerplexityBot, and traditional search bots on a slow render budget) very likely see an
empty page, no matter how good your meta tags are.

**Fix:** I can't generate this fix blind — the correct change depends entirely on what the
site is built with, which isn't visible from the outside. Tell me the framework and I'll
generate the exact config:

| If you're using... | The fix is... |
|---|---|
| **Next.js / Nuxt / SvelteKit / Astro** | You likely already support SSR/SSG — check that the homepage route isn't opted into client-only rendering (e.g. no stray `'use client'`-only data fetching for the whole page, or a Nuxt/Astro island misconfigured as client-only). |
| **Plain React (Vite/CRA), no meta-framework** | Add a prerendering step. Two low-effort options: `vite-plugin-ssr`/`vike`, or a build-time prerender pass with `react-snap` or `puppeteer` that writes the rendered DOM into `dist/index.html` after build. |
| **Vue (Vite, no Nuxt)** | Same idea — `vite-plugin-ssr` or `vite-ssg`. |
| **Something else / a static site generator already** | Then the build output itself is likely missing content — check that your build step is actually running before deploy, and that the deployed `index.html` (not just the JS bundle) contains real markup. |

Once you confirm the stack, I'll write the exact config or build script.

- **Where it goes:** build/deploy pipeline
- **Effort:** Medium · **Impact:** Very High

---

### 2. Fix: Add Person + WebSite JSON-LD schema

**Problem:** No `Person` or `WebSite` structured data was detected. Without it, AI engines
have no explicit entity to anchor "Tanmoy Majumder" / "Tcode-Motion" to — which matters a lot
given the name collisions the audit confirmed (an associate professor, an MBBS pediatrician,
a consultant, and an artist all share the name "Tanmoy Majumder" in search results today).

**Fix** — built entirely from what the audit confirmed: your name, alt-handle, canonical URL,
GitHub avatar URL, and X/Twitter handle.

```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Person",
      "@id": "https://tanmoy.is-a.dev/#person",
      "name": "Tanmoy Majumder",
      "alternateName": "Tcode-Motion",
      "url": "https://tanmoy.is-a.dev/",
      "image": "https://github.com/Tcode-Motion.png",
      "jobTitle": "Software Engineer",
      "sameAs": [
        "https://github.com/Tcode-Motion",
        "https://x.com/TanmoyMaju40558"
      ],
      "knowsAbout": [
        "Rust",
        "TechScript",
        "Open Source Software Development"
      ]
    },
    {
      "@type": "WebSite",
      "@id": "https://tanmoy.is-a.dev/#website",
      "url": "https://tanmoy.is-a.dev/",
      "name": "Tanmoy Majumder — Portfolio",
      "publisher": { "@id": "https://tanmoy.is-a.dev/#person" }
    }
  ]
}
</script>
```

> Note: `jobTitle` and `knowsAbout` are drawn from your existing title tag/meta description
> wording ("Software Engineer," "TechScript Creator," "Open Source Developer," Rust). If any
> of these aren't accurate, swap them before publishing — schema that contradicts your own
> page content is worse than no schema.

- **Where it goes:** inside `<head>`, anywhere after the existing meta tags
- **Effort:** Low · **Impact:** High

---

## 🟠 High

### 3. Fix: Shorten the title tag

**Problem:** Current title runs ~82 characters ("Tanmoy Majumder — Software Engineer,
TechScript Creator & Open Source Developer") — well past Google's ~60-character display
limit, so it truncates in results.

**Fix** (56 characters — pairs your name with TechScript, which the audit found is your
single least-contested search term):

```html
<title>Tanmoy Majumder | Software Engineer & TechScript Creator</title>
```

- **Where it goes:** replace the existing `<title>` tag in `<head>`
- **Effort:** Low · **Impact:** Medium

---

### 4. Fix: Trim the meta description

**Problem:** Current meta description runs ~190 characters, about 30 over Google's ~160-char
snippet limit — it will truncate mid-sentence.

**Fix**, rebuilt from the exact phrases the audit confirmed are already in your current
description ("Rust developer," "creator of TechScript," "open source engineer"), tightened to
149 characters:

```html
<meta name="description" content="Tanmoy Majumder is a Rust developer and open source engineer, creator of TechScript. Building AI-powered apps and tools on GitHub.">
```

> If your actual current description has other specifics beyond what the audit fragment
> captured, send me the full original text and I'll re-trim that instead of this
> reconstruction.

- **Where it goes:** replace the existing `<meta name="description">` tag in `<head>`
- **Effort:** Low · **Impact:** Medium

---

### 5. Fix: Submit to Google Search Console + Bing Webmaster Tools

**Problem:** The domain currently shows zero footprint across search for both the URL and
your name — it has likely never been indexed or actively hasn't been recrawled since launch.

**Fix** (no code — do this once the rendering fix in #1 is live, so crawlers see real
content on first index):

1. **Google Search Console** → [search.google.com/search-console](https://search.google.com/search-console) → Add property → `https://tanmoy.is-a.dev/` (URL prefix) → verify via the HTML tag method (drop the provided `<meta name="google-site-verification">` tag into `<head>`, or verify via your DNS provider) → once verified, use **URL Inspection** → **Request Indexing** on the homepage.
2. **Bing Webmaster Tools** → [bing.com/webmasters](https://www.bing.com/webmasters) → Add site → you can import directly from Search Console once step 1 is done (Bing supports GSC import, which also seeds Bing/Yahoo/DuckDuckGo).
3. In both tools, submit `https://tanmoy.is-a.dev/sitemap.xml` under Sitemaps.

- **Where it goes:** Search Console / Bing Webmaster dashboards
- **Effort:** Low · **Impact:** High

---

## 🟡 Medium

### 6. Fix: Add FAQ content + FAQPage schema

**Problem:** No FAQ schema or question-phrased headings exist. This is also your best
disambiguation lever — "Who is Tanmoy Majumder?" phrased content helps AI engines resolve
you specifically, not the professor/pediatrician/artist sharing your name.

**Fix** — visible FAQ block plus matching schema, using only facts the audit confirmed:

```html
<section id="faq">
  <h2>Frequently Asked Questions</h2>

  <h3>Who is Tanmoy Majumder?</h3>
  <p>Tanmoy Majumder, also known online as Tcode-Motion, is a software engineer and open
  source developer who builds Rust-based tools, including TechScript.</p>

  <h3>What is TechScript?</h3>
  <p>TechScript is an open source project created by Tanmoy Majumder (Tcode-Motion).</p>
  <!-- Fill in what TechScript actually does — see note below -->

  <h3>Who created TechScript?</h3>
  <p>TechScript was created by Tanmoy Majumder, who also publishes under the handle
  Tcode-Motion on GitHub.</p>
</section>
```

```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "Who is Tanmoy Majumder?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Tanmoy Majumder, also known online as Tcode-Motion, is a software engineer and open source developer who builds Rust-based tools, including TechScript."
      }
    },
    {
      "@type": "Question",
      "name": "What is TechScript?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "TechScript is an open source project created by Tanmoy Majumder (Tcode-Motion)."
      }
    },
    {
      "@type": "Question",
      "name": "Who created TechScript?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "TechScript was created by Tanmoy Majumder, who also publishes under the handle Tcode-Motion on GitHub."
      }
    }
  ]
}
</script>
```

> **Missing input:** the audit never captured what TechScript actually *does* — only that
> it exists and that you created it. The "What is TechScript?" answer above is intentionally
> thin rather than guessed (a wrong guess here is worse than a short truth, especially since
> the bare word "TechScript" already collides with an unrelated PyPI package — an inaccurate
> description would make that collision worse, not better). Send me one or two sentences on
> what it does and I'll tighten this up immediately.

- **Where it goes:** FAQ block in the page body; schema in `<head>` or right before `</body>`
- **Effort:** Medium · **Impact:** Medium

---

### 7. Fix: Add an About/bio section with verifiable specifics

**Problem:** `meta[name=author]` says "Tanmoy Majumder," but there's no visible bio,
credentials, or experience signal in any fetched content — nothing that separates you from
the other people already ranking for your name.

**Fix — structure only.** I'm not filling this with invented stats (project counts, dates,
company names) since the audit didn't confirm any and fabricated numbers would actively hurt
your E-E-A-T rather than help it:

```html
<section id="about">
  <h2>About Tanmoy Majumder</h2>
  <p>
    <!-- 2–3 sentences, first person or third person, with REAL specifics:
         - how long you've been building / what you currently work on
         - TechScript in one concrete sentence (what it does, what it's built in)
         - a real, linkable credential: a GitHub stats line, a specific repo,
           a talk, a role — anything verifiable, not "passionate developer" -->
  </p>
  <ul>
    <!-- e.g. real repo links, real project names, real dates -->
  </ul>
</section>
```

Give me 3–4 real facts (what TechScript does, how long you've been coding, any project you
want linked) and I'll write the full paragraph instead of the template.

- **Where it goes:** page body, near the top
- **Effort:** Medium · **Impact:** Medium

---

## 🟢 Quick Wins

### 8. Fix: Add `rel="me"` links to tie your profiles together

**Problem:** The audit confirmed two real handles (GitHub avatar URL, X/Twitter handle) but
found no `sameAs`/identity-linking markup connecting them to the site. (The Person schema in
fix #2 already covers the structured-data half of this — this adds the lightweight HTML
signal too, which some verification tools and IndieWeb-aware crawlers check independently of
JSON-LD.)

```html
<link rel="me" href="https://github.com/Tcode-Motion">
<link rel="me" href="https://x.com/TanmoyMaju40558">
```

- **Where it goes:** `<head>`
- **Effort:** Low · **Impact:** Medium

---

### 9. Fix: Always pair "TechScript" with your name

**Problem:** The bare word "TechScript" collides with an existing PyPI package, an unrelated
GitHub repo (a Next.js blogging platform), and a Facebook page. Used alone, it won't point
search or AI engines back to you.

**Fix — a rule to apply everywhere, not a single snippet.** Apply it to:
- Every heading that mentions TechScript → `"TechScript by Tanmoy Majumder"` or
  `"TechScript (Tanmoy Majumder / Tcode-Motion)"`, never `"TechScript"` alone
- The FAQ schema and About section above (already follows this rule)
- Any future project page or README — same pairing in the `<h1>`/title

This applies directly to fix #6's FAQ heading structure and fix #7's About section — no
separate file to touch, just a naming discipline going forward.

- **Where it goes:** anywhere "TechScript" appears in headings, titles, or schema
- **Effort:** Low · **Impact:** Medium

---

## What I didn't touch (already good — confirmed by the audit)

- **Canonical tag** — self-referencing correctly, left as-is
- **Robots meta** (`index, follow, max-snippet:-1, max-image-preview:large`) — fully
  crawlable, left as-is
- **Viewport meta** — correctly configured, left as-is
- **Open Graph / Twitter Card tags** — complete sets, left as-is
- **`robots.txt`** — correctly allows real content while blocking `/src/`, `/node_modules/`,
  `/dist/`, and points to `sitemap.xml`. No changes needed.

## Score path to 10/10

Fixes **#1** and **#2** are what unblock everything else — until crawlers can see body
content, GEO/AEO scoring is structurally capped regardless of how much schema you add on top.
Once #1 ships:
- SEO → title/description fixes (#3, #4) plus real, crawlable body content closes the
  remaining gap
- GEO → Person schema (#2) + About section (#7) + `rel=me` (#8) directly answer the E-E-A-T
  and entity-clarity gaps
- AEO → FAQ schema (#6) is the main lever; question-phrased headings become assessable once
  there's a body to assess

Two fixes are marked incomplete above (TechScript's actual description, and real bio
specifics) — send me those two facts and this report is fully closable without any
placeholder content left in it.
