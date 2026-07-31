**tanmoy.is-a.dev** SEO / GEO / AEO Audit Report 

FULL AUDIT 

**SEO GEO 5/10 3/10** _Needs Work Needs Work_ 

**AEO** 

**3/10** _Needs Work_ 

Audit date: July 31, 2026 Claude Skill and Plugin by Alex Labat 

tanmoy.is-a.dev 

SEO / GEO / AEO Audit Report 

# **Executive Summary** 

tanmoy.is-a.dev is a personal portfolio for Tanmoy Majumder (Tcode-Motion), and its <head> metadata is genuinely well built — complete Open Graph and Twitter Card tags, a clean canonical URL, and explicit indexing directives. The critical problem sits one layer deeper: every raw HTML fetch of the homepage in this audit returned only the <head> block, with no body markup, headings, or text — consistent with a fully client-side-rendered app with no server-side or static rendering. This was confirmed on a second, independent audit pass. Combined with zero appearances across multiple targeted web searches for the domain, and the discovery that both “Tanmoy Majumder” and “TechScript” already have significant name collisions in search results, the site faces a compounded visibility problem: it isn't just invisible today, it will have to fight for disambiguation once it is crawlable. 

|**Dimension**|**Score**|**Status**|**Key Takeaway**|
|---|---|---|---|
|**SEO**|**5/10**|**Needs Work**|Strong meta layer,<br>oversized<br>title/description,<br>unverifiable body<br>content|
|**GEO**|**3/10**|**Needs Work**|No verifiable E-E-A-T<br>signals; name-collision<br>risk confirmed by<br>search|
|**AEO**|**3/10**|**Needs Work**|No confirmed<br>FAQ/HowTo schema or<br>question-format<br>headings|
|**Combined**|**11/30**|||



# **Pages Audited** 

|**URL / Resource**|**Type**|**Notes**|
|---|---|---|
|https://tanmoy.is-a.dev/|Homepage|Fetched twice (two independent<br>audit passes). Both times, only<br><head> metadata was returned<br>— no body HTML, no headings,<br>no text.|
|/robots.txt|Crawl directives|Present. Allows all crawlers on /,<br>disallows /src/, /node_modules/,<br>/dist/ (build artifacts — correct to<br>block). Points to sitemap.xml.|



Claude Skill and Plugin by Alex Labat 

2 

tanmoy.is-a.dev 

SEO / GEO / AEO Audit Report 

|**URL / Resource**|**Type**|**Notes**|
|---|---|---|
|/sitemap.xml|Sitemap|File exists and returns as valid<br>XML content-type, but the fetch<br>tool could not extract its<br>contents as text (returned as<br>binary). Unable to verify which<br>URLs it lists.|
|About / Projects / TechScript /<br>Contact / FAQ|Inner pages|Could not be discovered or<br>fetched — no internal links were<br>visible in the fetched HTML, and<br>none of these paths appear in<br>search results. Unable to verify<br>whether they exist.|



# **SEO Analysis** 

_Score: 5/10 — Needs Work_ 

## **Technical On-Page** 

|**Signal**|**Finding**|**Status**|
|---|---|---|
|**Title tag**|Present: “Tanmoy Majumder — Software Engineer,<br>TechScript Creator & Open Source Developer” (~82<br>characters, well past the ~60-char display limit — will<br>truncate in Google results)|**Needs Attention**|
|**Meta description**|Present, ~190 characters — roughly 30 characters over<br>Google's ~160-char snippet limit|**Needs Attention**|
|**Canonical tag**|Present and self-referencing correctly (https://tanmoy.is-<br>a.dev/)|**Good**|
|**Robots meta**|index, follow, max-snippet:-1, max-image-preview:large<br>— fully crawlable, no accidental noindex|**Good**|
|**Viewport meta**|Present and correctly configured for mobile|**Good**|
|**Heading hierarchy**<br>**(H1/H2/H3)**|Not present in fetched HTML — confirmed absent from<br>the raw response (though may render client-side)|**Needs Attention**|
|**Image alt text**|Not visible in fetched HTML — could not verify|**Needs Attention**|
|**Internal links**|Not visible in fetched HTML — could not verify; no inner<br>pages discoverable via search either|**Needs Attention**|
|**Open Graph tags**|Complete set: og:title, og:description, og:image<br>(1200x630), og:type, og:url, og:site_name, og:locale|**Good**|
|**Twitter Card**|Complete set: summary_large_image, twitter:title,|**Good**|



Claude Skill and Plugin by Alex Labat 

3 

tanmoy.is-a.dev 

SEO / GEO / AEO Audit Report 

|**Signal**|**Finding**|**Status**|
|---|---|---|
||description, image, creator, site||



## **Content Quality** 

|**Signal**|**Finding**|**Status**|
|---|---|---|
|**Word count / body**<br>**text**|Raw HTML fetch returned no body content on two<br>separate attempts — cannot confirm what text exists for<br>crawlers|**Needs Attention**|
|**Content freshness**<br>**signals**|Not visible in fetched HTML — could not verify|**Needs Attention**|
|**Readability**<br>**structure**|Not visible in fetched HTML — could not verify|**Needs Attention**|



## **Structured Data** 

|**Signal**|**Finding**|**Status**|
|---|---|---|
|**JSON-LD / schema**|None detected in the fetched <head> block. No Person|**Missin**|
|**markup**|or WebSite schema present where it would typically live|**g**|



# **GEO Analysis** 

_Score: 3/10 — Needs Work_ 

## **E-E-A-T Assessment** 

|**Signal**|**Finding**|**Status**|
|---|---|---|
|**Author information**|meta-author tag present (“Tanmoy Majumder”) but no<br>visible bio, credentials, or experience signals in fetched<br>content|**Needs Attention**|
|**Trust signals**<br>**(testimonials,**<br>**awards, press)**|Not visible in fetched HTML — could not verify|**Needs Attention**|
|**Organization/Person**<br>**schema**|Not detected|**Missing**|



Claude Skill and Plugin by Alex Labat 

4 

tanmoy.is-a.dev 

SEO / GEO / AEO Audit Report 

## **Content for AI Synthesis** 

|**Signal**|**Finding**|**Status**|
|---|---|---|
|**Factual density**<br>**(stats, specifics)**|Cannot assess — no body content retrieved|**Needs Attention**|
|**Clear value**<br>**proposition stated**<br>**upfront**|Meta description states it clearly (“Rust developer,<br>creator of TechScript... open source engineer”) — but<br>this only helps if it also appears in the crawlable body|**Needs Attention**|
|**Entity clarity**<br>**(brand/name**<br>**consistency)**|Tags are internally consistent (“Tanmoy Majumder” /<br>“Tcode-Motion”), but search confirms both names collide<br>heavily with unrelated people and projects — see<br>Keyword Strategy section|**Needs Attention**|



## **Technical GEO** 

|**Signal**|**Finding**|**Status**|
|---|---|---|
|**HTTPS**|Site serves over HTTPS|**Good**|
|**Crawlability for AI**<br>**crawlers**|Raw HTML returns an effectively empty body. Crawlers<br>that don't execute JavaScript (GPTBot, PerplexityBot,<br>and similar) very likely see the same near-empty page<br>this audit did|**Missing**|
|**Same-as / social**<br>**profile links**|og:image points to a GitHub avatar (github.com/Tcode-<br>Motion.png), and twitter:creator/site is<br>@TanmoyMaju40558 — confirms two real profile<br>handles, but no sameAs schema ties them together, and<br>no other social links are visible|**Needs Attention**|



# **AEO Analysis** 

_Score: 3/10 — Needs Work_ 

## **Featured Snippet Eligibility** 

|**Signal**|**Finding**|**Status**|
|---|---|---|
|**Direct-answer**<br>**paragraphs**|Cannot assess — no body content retrieved|**Needs Attention**|
|**List/table content**|Cannot assess — no body content retrieved|**Needs Attention**|



Claude Skill and Plugin by Alex Labat 

5 

tanmoy.is-a.dev 

SEO / GEO / AEO Audit Report 

## **Structured Answer Formats** 

|**Signal**|**Finding**|
|---|---|
|**FAQ schema**|Not detected|
|**HowTo schema**|Not detected|
|**Question-phrased**<br>**headings**|Cannot assess — no body content retrieved|



|**Status**<br>**Missing**|
|---|
|**Missing**|
|**Needs Attention**|



## **Voice Search Readiness** 

|**Signal**|**Finding**|
|---|---|
|**Conversational /**<br>**long-tail coverage**|Cannot assess — no body content retrieved|



|**Status**|
|---|
|**Needs Attention**|



# **Keyword Strategy — Most Targeted Keywords to Rank** 

The keywords below were checked directly against live search results as part of this audit. Each is rated on how contested the term currently is — not on search volume — since for this site, the binding constraint is entity disambiguation, not demand. 

|**Target Keyword**|**Search Landscape Finding**|**Difficulty**|
|---|---|---|
|**Tanmoy Majumder**|Heavily contested. Search<br>results are dominated by other,<br>unrelated people named<br>Tanmoy Majumder: a university<br>associate professor, an MBBS<br>pediatrician, a corporate<br>consultant, several<br>ResearchGate/LinkedIn profiles,<br>and an artist. This name alone<br>will not reliably surface<br>tanmoy.is-a.dev without strong<br>entity signals.|**Missing**|
|**tanmoy**|Even more contested — an<br>extremely common Bengali first<br>name shared by thousands of<br>public profiles (tanmoy.dev,<br>various “Tanmoy Dev”<br>professionals, artists, students).<br>Effectively unwinnable as a|**Missing**|



Claude Skill and Plugin by Alex Labat 

6 

tanmoy.is-a.dev 

SEO / GEO / AEO Audit Report 

|**Target Keyword**|**Search Landscape Finding**|**Difficulty**|
|---|---|---|
||standalone keyword; only useful<br>as a component of longer,<br>qualified phrases.||
|**Tanmoy Majumder developer**|Confirmed zero current footprint<br>for the domain, but this qualified<br>phrase has far less competition<br>than the bare name — realistic<br>mid-term target once the site is<br>crawlable.|**Needs Attention**|
|**Tanmoy Majumder**<br>**programmer**|Same pattern as above — low<br>competition, good realistic<br>target, currently zero footprint.|**Needs Attention**|
|**Tanmoy Majumder projects**|No competing content found for<br>this phrase. Strong opportunity<br>once a Projects page with real<br>crawlable content exists.|**Needs Attention**|
|**Tanmoy Majumder TechScript**|No competing content found for<br>this exact combined phrase —<br>the single best long-tail target<br>available, since it pairs the<br>person's name with a specific,<br>ownable project name.|**Good**|
|**Tcode-Motion**|Confirmed collision with an<br>unrelated but sizable open<br>ecosystem: “TCode” / “T-Code”<br>is an established open-source<br>protocol name (multiple GitHub<br>orgs, physics simulation<br>software, hardware projects)<br>with its own SEO footprint.<br>“Tcode-Motion” as a compound<br>is not currently used elsewhere,<br>but individual searches for<br>“TCode” + “motion” will surface<br>that unrelated ecosystem first.|**Needs Attention**|
|**TechScript**|Name collision confirmed: an<br>existing PyPI package called<br>“techscript” (a beginner-friendly<br>scripting language), a GitHub<br>repo named TechScript (an<br>unrelated Next.js blogging<br>platform), and a Facebook page<br>“The Tech Script.” The bare<br>word “TechScript” is not<br>ownable — always pair it with<br>“Tanmoy Majumder” or “Tcode-<br>Motion” in titles, headings, and<br>schema to disambiguate.|**Needs Attention**|



Claude Skill and Plugin by Alex Labat 

7 

tanmoy.is-a.dev 

SEO / GEO / AEO Audit Report 

## **Recommended keyword placement, once the site is crawlable** 

- Title tag & H1: “Tanmoy Majumder” paired with a role subtitle (“Coder · AI App Builder · Open Source Contributor”) — not a keyword list. 

- Meta description: lead with “Tanmoy Majumder is a coder, AI app builder and open source contributor...” and work in “TechScript” naturally. 

- Dedicated Projects page: target “Tanmoy Majumder projects” in the H1 or intro sentence — currently the least-contested phrase found. 

- Dedicated TechScript page/section: target “Tanmoy Majumder TechScript” and “TechScript programming language” together, always naming the creator to disambiguate from the unrelated PyPI package and GitHub repo of the same name. 

- FAQ section: use “Tanmoy Majumder developer” and “Tanmoy Majumder programmer” as natural question phrasing (“What does Tanmoy Majumder develop?”) rather than forcing them into the title. 

- Avoid targeting bare “tanmoy” or bare “Tanmoy Majumder” as primary keywords in isolation — confirmed too contested to win directly; use them only inside longer, qualified phrases. 

# **Priority Recommendations** 

|**Priority**|**Issue**|**Dimensio**<br>**n**|**Effort**|**Impact**|
|---|---|---|---|---|
|**Critical**<br>🔴|Confirm whether the page ships meaningful content in<br>initial HTML (it does not, per two independent<br>fetches). If the site is client-rendered only, switch to<br>SSG/SSR so crawlers and AI bots see real content<br>without executing JavaScript.|SEO /<br>GEO /<br>AEO|Mediu<br>m|Very<br>High|
|**Critical**<br>🔴|Add Person JSON-LD schema (name, alternateName:<br>“Tcode-Motion”, url, sameAs: GitHub + Twitter/X<br>handle confirmed in this audit, jobTitle, knowsAbout)<br>so AI engines have a clear entity to disambiguate from<br>other people named Tanmoy Majumder.|GEO|Low|High|
|**High**<br>🟠|Shorten the title tag to ~55-60 characters, e.g.<br>“Tanmoy Majumder | Coder, AI App Builder & Open<br>Source Contributor,” so it doesn't truncate in search<br>results.|SEO|Low|Medium|
|**High**<br>🟠|Trim the meta description to ~150-160 characters,<br>leading with the name + TechScript hook (the most<br>ownable, least-contested identity signal found in this<br>audit).|SEO|Low|Medium|
|**High**<br>🟠|Submit the site to Google Search Console and Bing|SEO|Low|High|



Claude Skill and Plugin by Alex Labat 

8 

tanmoy.is-a.dev 

SEO / GEO / AEO Audit Report 

|**Priority**|**Issue**|**Dimensio**<br>**n**|**Effort**|**Impact**|
|---|---|---|---|---|
||Webmaster Tools and request indexing — it currently<br>shows zero footprint across search for both the<br>domain and the person's name.||||
|**Medium**<br>🟡|Add visible FAQ content with FAQ schema (“Who is<br>Tanmoy Majumder?”, “What is TechScript?”, “Who<br>created TechScript?”) to open up featured-snippet and<br>AI-citation opportunities, and to help disambiguate<br>from name collisions.|AEO|Mediu<br>m|Medium|
|**Medium**<br>🟡|Add an About/bio section with concrete, verifiable<br>specifics (project counts, real dates, real repo links)<br>rather than adjectives — this is what separates the<br>site from the many unrelated “Tanmoy Majumder”<br>profiles already ranking.|GEO|Mediu<br>m|Medium|
|**Quick**<br>🟢<br>**Win**|Add sameAs links (GitHub, the confirmed<br>@TanmoyMaju40558 X/Twitter handle, YouTube,<br>Instagram if applicable) to strengthen the brand entity<br>graph for AI engines.|GEO|Low|Medium|
|**Quick**<br>🟢<br>**Win**|In titles, H1s, and schema, always pair “TechScript”<br>with “Tanmoy Majumder” or “Tcode-Motion” (e.g.<br>“TechScript by Tanmoy Majumder”) rather than using<br>it standalone, since the bare term already collides with<br>an unrelated PyPI package and GitHub repo.|GEO /<br>AEO|Low|Medium|



# **What's Working Well** 

The <head> is more complete than most personal portfolio sites: full Open Graph (title, description, image at correct 1200x630 dimensions, type, url, site_name, locale) and full Twitter Card metadata, a self-referencing canonical, explicit crawl-friendly robots directives, and a consistent brand identity (“Tanmoy Majumder” / “Tcode-Motion”) across every tag. robots.txt is also correctly configured — it allows crawling of real content while blocking build directories. If the underlying rendering issue gets fixed, this metadata foundation means social shares, link previews, and basic indexing should follow quickly. 

# **Glossary** 

**SEO (Search Engine Optimization):** The practice of improving a site so traditional search engines like Google and Bing rank and display it well for relevant queries. 

**GEO (Generative Engine Optimization):** Optimizing a site so AI-powered search tools (ChatGPT Search, Perplexity, Google AI Overviews, Gemini) can find, trust, and cite it when synthesizing answers. 

Claude Skill and Plugin by Alex Labat 

9 

tanmoy.is-a.dev 

SEO / GEO / AEO Audit Report 

**AEO (Answer Engine Optimization):** Optimizing content so it can be extracted directly as a featured snippet, voice assistant answer, or “People Also Ask” result. 

Claude Skill and Plugin by Alex Labat 

10 

