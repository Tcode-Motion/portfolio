const fs = require('fs');
const path = require('path');

const portfolioPath = path.resolve(__dirname, '..');
const distPath = path.join(portfolioPath, 'dist');
const showcasePath = path.join(portfolioPath, 'src', 'content', 'projects', 'showcase.json');

let validationFailed = false;

// 1. Verify that dist/index.html (the main portfolio) exists
const mainIndex = path.join(distPath, 'index.html');
if (!fs.existsSync(mainIndex)) {
  console.error(`Validation Error: Main portfolio index.html is missing at ${mainIndex}`);
  validationFailed = true;
} else {
  console.log('✓ Main portfolio index.html verified.');
}

// 2. Scan root for project subfolders containing index.html
const excludedDirs = ['node_modules', 'dist', 'public', 'src', '.github', '.git', 'inspiration', 'scripts', 'automation', 'docs'];
const expectedProjects = fs.readdirSync(portfolioPath, { withFileTypes: true })
  .filter(dirent => dirent.isDirectory() && !excludedDirs.includes(dirent.name))
  .filter(dirent => fs.existsSync(path.join(portfolioPath, dirent.name, 'index.html')))
  .map(dirent => dirent.name);

console.log(`\nScanning repository. Detected expected project directories:`, expectedProjects);

expectedProjects.forEach(projectId => {
  const projectDistDir = path.join(distPath, projectId);
  const projectIndex = path.join(projectDistDir, 'index.html');
  
  console.log(`Validating directory merge in build for '${projectId}'...`);
  if (!fs.existsSync(projectDistDir)) {
    console.error(`Validation Error: Directory for project '${projectId}' was NOT copied to build output at ${projectDistDir}`);
    validationFailed = true;
  } else if (!fs.existsSync(projectIndex)) {
    console.error(`Validation Error: index.html for project '${projectId}' is missing in build output at ${projectIndex}`);
    validationFailed = true;
  } else {
    console.log(`✓ Project '${projectId}' deployment verified successfully.`);
  }
});

// 2.5 Verify Core Knowledge Hub Prerendered Routes
const coreRoutes = [
  'about',
  'projects',
  'apps',
  'techscript',
  'technologies',
  'now',
  'workflow',
  'journey',
  'connect'
];

console.log('\nValidating Core Knowledge Hub Prerendered Routes...');
coreRoutes.forEach(route => {
  const routeIndex = path.join(distPath, route, 'index.html');
  if (!fs.existsSync(routeIndex)) {
    console.error(`Validation Error: Prerendered route '${route}' is missing at ${routeIndex}`);
    validationFailed = true;
  } else {
    console.log(`✓ Core route '/${route}/' verified.`);
  }
});

// 2.6 Verify SEO Assets in dist/
['sitemap.xml', 'robots.txt', 'feed.xml', '404.html'].forEach(asset => {
  const assetPath = path.join(distPath, asset);
  if (!fs.existsSync(assetPath)) {
    console.warn(`[SEO Warning] '${asset}' is missing in dist/ output at ${assetPath}`);
  } else {
    console.log(`✓ SEO asset '${asset}' verified in dist/.`);
  }
});

// 3. Cross-reference with showcase.json
if (fs.existsSync(showcasePath)) {
  const showcase = JSON.parse(fs.readFileSync(showcasePath, 'utf8'));
  console.log('\nCross-referencing showcase.json with project detail routes...');
  
  showcase.forEach(project => {
    if (!project.id) return;
    const projectRoute = path.join(distPath, 'projects', project.id, 'index.html');
    if (!fs.existsSync(projectRoute)) {
      console.warn(`[Route Warning] Case study route for '${project.id}' is missing at ${projectRoute}`);
    } else {
      console.log(`✓ Project route '/projects/${project.id}/' verified.`);
    }
  });
} else {
  console.warn(`Warning: showcase.json not found at ${showcasePath}, skipping logical validation.`);
}

if (validationFailed) {
  console.error('\n❌ Deployment validation FAILED. One or more projects will return a 404.');
  process.exit(1);
} else {
  console.log('\n✅ All project deployments verified successfully. Safe to deploy.');
}
