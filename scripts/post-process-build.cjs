const fs = require('fs');
const path = require('path');

const distDir = process.argv[2];
const projectId = process.argv[3];

if (!distDir || !projectId) {
  console.error('Usage: node post-process-build.cjs <dist-directory> <project-id>');
  process.exit(1);
}

const basePrefix = `/${projectId}/`;

const walk = (dir) => {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    if (stat.isDirectory()) {
      walk(filePath);
    } else if (stat.isFile() && (file.endsWith('.html') || file.endsWith('.js') || file.endsWith('.css') || file.endsWith('.json') || file.endsWith('.webmanifest'))) {
      let content = fs.readFileSync(filePath, 'utf8');
      let newContent = content;

      if (file.endsWith('.html')) {
        // Rewrite all root-relative src, href, and content attributes
        // Examples: src="/assets/index.js" -> src="/vortex/assets/index.js"
        //           href="/favicon.ico" -> href="/vortex/favicon.ico"
        // Avoid matching protocol-relative link like src="//example.com"
        newContent = newContent.replace(/(href|src|content)=["']\/([^/][^"']*)["']/g, (match, attr, pathVal) => {
          console.log(`[Post-Process] Rewrote HTML attribute in ${file}: ${match} -> ${attr}="/${projectId}/${pathVal}"`);
          return `${attr}="/${projectId}/${pathVal}"`;
        });
      } else {
        // For JS, CSS, JSON, WebManifest: rewrite common absolute asset paths
        const assetPatterns = [
          { regex: /(["'`])\/assets\//g, replacement: `$1${basePrefix}assets/` },
          { regex: /(["'`])\/static\//g, replacement: `$1${basePrefix}static/` },
          { regex: /(["'`])\/images\//g, replacement: `$1${basePrefix}images/` },
          { regex: /(["'`])\/favicon/g, replacement: `$1${basePrefix}favicon` },
          { regex: /(["'`])\/vite.svg/g, replacement: `$1${basePrefix}vite.svg` }
        ];
        for (const pattern of assetPatterns) {
          newContent = newContent.replace(pattern.regex, pattern.replacement);
        }
      }

      if (newContent !== content) {
        fs.writeFileSync(filePath, newContent, 'utf8');
        console.log(`[Post-Process] Updated paths in: ${filePath}`);
      }
    }
  }
};

const absoluteDistPath = path.resolve(distDir);
if (fs.existsSync(absoluteDistPath)) {
  console.log(`[Post-Process] Scanning build output at ${absoluteDistPath} for project '${projectId}'...`);
  walk(absoluteDistPath);
  console.log('[Post-Process] Finished rewriting paths.');
} else {
  console.error(`[Post-Process] Error: Directory ${absoluteDistPath} does not exist.`);
  process.exit(1);
}
