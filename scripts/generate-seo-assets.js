const fs = require('fs');
const path = require('path');

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

const run = () => {
  try {
    const publicPath = path.join(portfolioPath, 'public');
    const showcasePath = path.join(portfolioPath, 'src', 'content', 'projects', 'showcase.json');
    
    if (!fs.existsSync(showcasePath)) {
      throw new Error(`showcase.json not found at: ${showcasePath}`);
    }
    
    const showcase = JSON.parse(fs.readFileSync(showcasePath, 'utf8'));
    
    // Detect static folders at the root that have index.html
    const excludedDirs = ['node_modules', 'dist', 'public', 'src', '.github', '.git', 'inspiration', 'scripts', 'automation', 'docs'];
    const projectSubdirs = fs.readdirSync(portfolioPath, { withFileTypes: true })
      .filter(dirent => dirent.isDirectory() && !excludedDirs.includes(dirent.name))
      .filter(dirent => fs.existsSync(path.join(portfolioPath, dirent.name, 'index.html')))
      .map(dirent => dirent.name);
      
    console.log('Detected static subfolders to map in SEO:', projectSubdirs);
    
    // 1. Generate Sitemap
    const baseUrl = 'https://tanmoy.is-a.dev';
    const sitemapUrls = [
      `<url><loc>${baseUrl}/</loc><priority>1.0</priority><changefreq>weekly</changefreq></url>`
    ];
    
    // Add subdirectories to sitemap
    projectSubdirs.forEach(dir => {
      sitemapUrls.push(`<url><loc>${baseUrl}/${dir}/</loc><priority>0.8</priority><changefreq>monthly</changefreq></url>`);
    });
    
    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${sitemapUrls.join('\n')}
</urlset>`;

    fs.writeFileSync(path.join(publicPath, 'sitemap.xml'), sitemap, 'utf8');
    console.log('Successfully generated sitemap.xml');
    
    // 2. Generate robots.txt
    const robots = `User-agent: *
Allow: /
Sitemap: ${baseUrl}/sitemap.xml
`;
    fs.writeFileSync(path.join(publicPath, 'robots.txt'), robots, 'utf8');
    console.log('Successfully generated robots.txt');
    
    // 3. Generate Search Index
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

    // 4. Generate RSS Feed
    const rssItems = showcase.map(p => {
      const pubDate = p.stats && p.stats.lastUpdated ? new Date(p.stats.lastUpdated).toUTCString() : new Date().toUTCString();
      return `    <item>
      <title>${p.title}</title>
      <link>${p.liveUrl || (baseUrl + '/' + p.id)}</link>
      <description>${p.tagline} - ${p.description}</description>
      <pubDate>${pubDate}</pubDate>
      <guid>${baseUrl}/${p.id}</guid>
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

run();
