const fs = require('fs');
const path = require('path');

const showcasePath = path.resolve(__dirname, '../src/content/projects/showcase.json');

const run = async () => {
  try {
    let failed = false;

    // 1. Verify main site
    const mainUrl = 'https://tanmoy.is-a.dev/';
    console.log(`Checking main portfolio site: ${mainUrl}`);
    try {
      const response = await fetch(mainUrl);
      console.log(`Main site returned HTTP status: ${response.status}`);
      if (response.status !== 200) {
        console.error(`❌ Main site is down or returned non-200 status!`);
        failed = true;
      }
    } catch (err) {
      console.error(`❌ Error fetching main site:`, err.message);
      failed = true;
    }

    // 2. Verify all locally hosted projects in showcase.json
    if (fs.existsSync(showcasePath)) {
      const showcase = JSON.parse(fs.readFileSync(showcasePath, 'utf8'));
      for (const project of showcase) {
        if (!project.id) continue;
        
        const isHostedLocally = project.liveUrl && (
          project.liveUrl.includes('tanmoy.is-a.dev') ||
          project.liveUrl.includes('tcode-motion.github.io/portfolio')
        );
        
        if (isHostedLocally) {
          const url = project.liveUrl;
          console.log(`Checking local project deployment URL: ${url}`);
          try {
            const response = await fetch(url);
            console.log(`Project '${project.id}' returned HTTP status: ${response.status}`);
            if (response.status !== 200) {
              console.error(`❌ Project '${project.id}' deployment URL returned non-200 status!`);
              failed = true;
            }
          } catch (err) {
            console.error(`❌ Error fetching project '${project.id}' URL:`, err.message);
            failed = true;
          }
        }
      }
    } else {
      console.log('showcase.json not found, skipping project checks.');
    }

    if (failed) {
      console.error('\n❌ Post-deployment URL verification FAILED.');
      process.exit(1);
    } else {
      console.log('\n✅ All URLs verified successfully. Deployment is healthy.');
    }
  } catch (error) {
    console.error('Error running verification:', error);
    process.exit(1);
  }
};

run();
