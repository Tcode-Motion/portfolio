const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const args = process.argv.slice(2);
let portfolioPath = '';

for (let i = 0; i < args.length; i++) {
  if (args[i] === '--portfolio' && args[i + 1]) {
    portfolioPath = args[i + 1];
  }
}

if (!portfolioPath) {
  portfolioPath = path.resolve(__dirname, '..');
}

// Helper: Get ISO 8601 modification time from Git (recommended format)
const getLastmod = (filePath) => {
  try {
    const gitDate = execSync(`git log -1 --format="%cI" -- "${filePath}"`, { 
      encoding: 'utf8', 
      stdio: ['ignore', 'pipe', 'ignore'] 
    }).trim();
    if (gitDate) return gitDate;
  } catch (err) {
    // Ignore and fallback
  }
  try {
    return fs.statSync(filePath).mtime.toISOString();
  } catch (err) {
    return new Date().toISOString();
  }
};

const run = () => {
  try {
    const publicPath = path.join(portfolioPath, 'public');
    const showcasePath = path.join(portfolioPath, 'src', 'content', 'projects', 'showcase.json');
    
    if (!fs.existsSync(showcasePath)) {
      throw new Error(`showcase.json not found at: ${showcasePath}`);
    }
    
    const showcase = JSON.parse(fs.readFileSync(showcasePath, 'utf8'));
    const baseUrl = 'https://tanmoy.is-a.dev';
    
    // 1. Scan and detect valid static subfolders containing an index.html (Indexable pages only)
    const excludedDirs = ['node_modules', 'dist', 'public', 'src', '.github', '.git', 'inspiration', 'scripts', 'automation', 'docs'];
    const projectSubdirs = fs.readdirSync(portfolioPath, { withFileTypes: true })
      .filter(dirent => dirent.isDirectory() && !excludedDirs.includes(dirent.name))
      .filter(dirent => {
        const hasIndex = fs.existsSync(path.join(portfolioPath, dirent.name, 'index.html'));
        if (!hasIndex) {
          console.log(`[SEO-Audit] Skipping non-indexable directory (missing index.html): /${dirent.name}`);
        }
        return hasIndex;
      })
      .map(dirent => dirent.name);
      
    console.log('[SEO-Audit] Verified indexable static subfolders:', projectSubdirs);

    // 2. Build list of sitemap entry objects
    const sitemapEntries = [
      {
        loc: `${baseUrl}/`,
        lastmod: getLastmod(path.join(portfolioPath, 'index.html')),
        changefreq: 'weekly',
        priority: '1.0'
      },
      {
        loc: `${baseUrl}/projects/`,
        lastmod: getLastmod(path.join(portfolioPath, 'src', 'pages', 'HomePage.tsx')),
        changefreq: 'weekly',
        priority: '0.8'
      }
    ];

    projectSubdirs.forEach(dir => {
      sitemapEntries.push({
        loc: `${baseUrl}/${dir}/`,
        lastmod: getLastmod(path.join(portfolioPath, dir, 'index.html')),
        changefreq: 'monthly',
        priority: '0.8'
      });
    });

    // Remove any duplicate URLs and sort consistently by URL location
    const uniqueLocs = new Set();
    const cleanEntries = sitemapEntries.filter(entry => {
      if (uniqueLocs.has(entry.loc)) return false;
      uniqueLocs.add(entry.loc);
      return true;
    }).sort((a, b) => a.loc.localeCompare(b.loc));

    // Limit URLs per sitemap (Sitemap protocol limit is 50,000 URLs or 50MB uncompressed)
    const MAX_URLS_PER_SITEMAP = 50000;
    
    if (cleanEntries.length > MAX_URLS_PER_SITEMAP) {
      console.log(`[SEO-Audit] Generating sitemap index (exceeds ${MAX_URLS_PER_SITEMAP} entries).`);
      
      const sitemapFiles = [];
      for (let i = 0; i < cleanEntries.length; i += MAX_URLS_PER_SITEMAP) {
        const chunk = cleanEntries.slice(i, i + MAX_URLS_PER_SITEMAP);
        const chunkIndex = Math.floor(i / MAX_URLS_PER_SITEMAP) + 1;
        const filename = `sitemap-${chunkIndex}.xml`;
        
        const xml = generateSitemapXml(chunk);
        fs.writeFileSync(path.join(publicPath, filename), xml, 'utf8');
        sitemapFiles.push(filename);
      }
      
      // Write sitemap index
      const indexXml = `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${sitemapFiles.map(file => `  <sitemap>
    <loc>${baseUrl}/${file}</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
  </sitemap>`).join('\n')}
</sitemapindex>`;
      
      fs.writeFileSync(path.join(publicPath, 'sitemap.xml'), indexXml, 'utf8');
      console.log('Successfully wrote sitemap index (sitemap.xml) and chunked sub-sitemaps.');
    } else {
      // Single sitemap file (standard)
      const xml = generateSitemapXml(cleanEntries);
      fs.writeFileSync(path.join(publicPath, 'sitemap.xml'), xml, 'utf8');
      console.log('Successfully generated standardized sitemap.xml.');
    }

    // 3. Generate robots.txt referencing the sitemap
    const robots = `User-agent: *
Allow: /
Disallow: /src/
Disallow: /node_modules/
Disallow: /dist/

Sitemap: ${baseUrl}/sitemap.xml
`;
    fs.writeFileSync(path.join(publicPath, 'robots.txt'), robots, 'utf8');
    console.log('Successfully generated robots.txt pointing to live sitemap.');

    // 4. Generate Search Index
    const searchIndex = showcase.map(p => ({
      id: p.id,
      title: p.title,
      tagline: p.tagline,
      category: p.category,
      description: p.description,
      techStack: p.techStack || []
    }));
    fs.writeFileSync(path.join(publicPath, 'search-index.json'), JSON.stringify(searchIndex, null, 2), 'utf8');
    console.log('Successfully generated search-index.json');

    // 5. Generate RSS Feed
    const rssItems = showcase.map(p => {
      const pubDate = p.stats && p.stats.lastUpdated ? new Date(p.stats.lastUpdated).toUTCString() : new Date().toUTCString();
      return `    <item>
      <title>${p.title}</title>
      <link>${p.liveUrl || (baseUrl + '/' + p.id + '/')}</link>
      <description>${p.tagline} - ${p.description}</description>
      <pubDate>${pubDate}</pubDate>
      <guid>${baseUrl}/${p.id}/</guid>
    </item>`;
    });

    const rss = `<?xml version="1.0" encoding="UTF-8" ?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
<channel>
  <title>Tanmoy Majumder Projects</title>
  <link>${baseUrl}</link>
  <description>Latest projects and releases from Tanmoy Majumder's portfolio</description>
  <language>en-us</language>
  <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
  <atom:link href="${baseUrl}/feed.xml" rel="self" type="application/rss+xml" />
${rssItems.join('\n')}
</channel>
</rss>`;

    fs.writeFileSync(path.join(publicPath, 'feed.xml'), rss, 'utf8');
    console.log('Successfully generated feed.xml (RSS)');
    
  } catch (error) {
    console.error('Error generating SEO assets:', error);
    process.exit(1);
  }
};

// XML template generator helper (Namespace, structures, future-proof image/video anchors)
const generateSitemapXml = (entries) => {
  const urlNodes = entries.map(entry => {
    return `  <url>
    <loc>${entry.loc}</loc>
    <lastmod>${entry.lastmod}</lastmod>
    <changefreq>${entry.changefreq}</changefreq>
    <priority>${entry.priority}</priority>
  </url>`;
  });

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset 
  xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
  xmlns:image="http://www.google.com/schemas/sitemap-image/1.1"
  xmlns:video="http://www.google.com/schemas/sitemap-video/1.1"
>
${urlNodes.join('\n')}
</urlset>`;
};

run();
