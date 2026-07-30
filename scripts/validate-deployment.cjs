const fs = require('fs');
const path = require('path');

const portfolioPath = path.resolve(__dirname, '..');
const distPath = path.join(portfolioPath, 'dist');
const showcasePath = path.join(portfolioPath, 'src', 'content', 'projects', 'showcase.json');

if (!fs.existsSync(showcasePath)) {
  console.error(`Error: showcase.json not found at ${showcasePath}`);
  process.exit(1);
}

const showcase = JSON.parse(fs.readFileSync(showcasePath, 'utf8'));

let validationFailed = false;

// 1. Verify that dist/index.html (the main portfolio) exists
const mainIndex = path.join(distPath, 'index.html');
if (!fs.existsSync(mainIndex)) {
  console.error(`Validation Error: Main portfolio index.html is missing at ${mainIndex}`);
  validationFailed = true;
}

// 2. For each project in showcase.json, verify its directory and index.html in dist/ if it is hosted locally
showcase.forEach(project => {
  if (!project.id) return;
  
  // Detect if project is locally hosted
  const isHostedLocally = project.liveUrl && (
    project.liveUrl.includes('tanmoy.is-a.dev') ||
    project.liveUrl.includes('tcode-motion.github.io/portfolio')
  );
  
  if (isHostedLocally) {
    const projectDistDir = path.join(distPath, project.id);
    const projectIndex = path.join(projectDistDir, 'index.html');
    
    console.log(`Validating local deployment folder for project '${project.id}'...`);
    
    if (!fs.existsSync(projectDistDir)) {
      console.error(`Validation Error: Directory for project '${project.id}' is missing in build output at ${projectDistDir}`);
      validationFailed = true;
    } else if (!fs.existsSync(projectIndex)) {
      console.error(`Validation Error: index.html for project '${project.id}' is missing at ${projectIndex}`);
      validationFailed = true;
    } else {
      console.log(`✓ Project '${project.id}' verified successfully.`);
    }
  } else {
    console.log(`Project '${project.id}' is externally hosted (${project.liveUrl || 'no URL'}), skipping folder validation.`);
  }
});

if (validationFailed) {
  console.error('\n❌ Deployment validation FAILED. One or more projects will return a 404.');
  process.exit(1);
} else {
  console.log('\n✅ All local project deployments verified successfully.');
}
