const fs = require('fs');
const path = require('path');

// Arguments parsing
const args = process.argv.slice(2);
let projectMetadataPath = '';
let portfolioPath = '';

for (let i = 0; i < args.length; i++) {
  if (args[i] === '--metadata' && args[i + 1]) {
    projectMetadataPath = args[i + 1];
  } else if (args[i] === '--portfolio' && args[i + 1]) {
    portfolioPath = args[i + 1];
  }
}

if (!projectMetadataPath || !portfolioPath) {
  console.error('Usage: node register-project.js --metadata <path-to-metadata.json> --portfolio <path-to-portfolio-root>');
  process.exit(1);
}

const run = async () => {
  try {
    // 1. Read metadata
    const metadataRaw = fs.readFileSync(projectMetadataPath, 'utf8');
    const metadata = JSON.parse(metadataRaw);
    
    // Enforce correct liveUrl formatting for portfolio subfolder projects
    if (metadata.id && metadata.id !== 'techscript') {
      metadata.liveUrl = `https://tanmoy.is-a.dev/${metadata.id}/`;
      console.log(`Enforced liveUrl for project '${metadata.id}': ${metadata.liveUrl}`);
    }
    
    // 2. Fetch Github stats if repository is defined
    const githubStats = {
      stars: 0,
      forks: 0,
      openIssues: 0,
      contributors: 1,
      releaseVersion: 'v1.0.0'
    };
    
    if (metadata.githubRepo) {
      console.log(`Fetching statistics for repository: ${metadata.githubRepo}`);
      const token = process.env.GITHUB_TOKEN;
      const headers = {
        'User-Agent': 'Portfolio-Automation-Script',
        'Accept': 'application/vnd.github.v3+json'
      };
      if (token) {
        headers['Authorization'] = `token ${token}`;
      }
      
      // Fetch repo main data
      try {
        const repoResponse = await fetch(`https://api.github.com/repos/${metadata.githubRepo}`, { headers });
        if (repoResponse.ok) {
          const repoData = await repoResponse.json();
          githubStats.stars = repoData.stargazers_count || 0;
          githubStats.forks = repoData.forks_count || 0;
          githubStats.openIssues = repoData.open_issues_count || 0;
        } else {
          console.warn(`Could not fetch repo details: ${repoResponse.statusText}`);
        }
      } catch (err) {
        console.warn('Error fetching repo data:', err.message);
      }

      // Fetch release data
      try {
        const releaseResponse = await fetch(`https://api.github.com/repos/${metadata.githubRepo}/releases/latest`, { headers });
        if (releaseResponse.ok) {
          const releaseData = await releaseResponse.json();
          githubStats.releaseVersion = releaseData.tag_name || 'v1.0.0';
        } else {
          console.warn(`Could not fetch latest release: ${releaseResponse.statusText}`);
        }
      } catch (err) {
        console.warn('Error fetching release data:', err.message);
      }

      // Fetch contributors
      try {
        const contributorsResponse = await fetch(`https://api.github.com/repos/${metadata.githubRepo}/contributors?per_page=1`, { headers });
        if (contributorsResponse.ok) {
          const linkHeader = contributorsResponse.headers.get('Link');
          if (linkHeader) {
            const match = linkHeader.match(/&page=(\d+)>; rel="last"/);
            if (match && match[1]) {
              githubStats.contributors = parseInt(match[1], 10);
            }
          } else {
            const contributorsData = await contributorsResponse.json();
            githubStats.contributors = contributorsData.length || 1;
          }
        }
      } catch (err) {
        console.warn('Error fetching contributors data:', err.message);
      }
    }
    
    // Merge stats into metadata
    metadata.stats = {
      ...(metadata.stats || {}),
      ...githubStats,
      lastUpdated: new Date().toISOString()
    };
    
    // 3. Read showcase.json
    const showcasePath = path.join(portfolioPath, 'src', 'content', 'projects', 'showcase.json');
    if (!fs.existsSync(showcasePath)) {
      throw new Error(`showcase.json not found at expected path: ${showcasePath}`);
    }
    
    const showcaseRaw = fs.readFileSync(showcasePath, 'utf8');
    let showcase = JSON.parse(showcaseRaw);
    
    // 4. Update showcase.json
    const existingIndex = showcase.findIndex(p => p.id === metadata.id);
    if (existingIndex > -1) {
      console.log(`Updating existing project: ${metadata.id}`);
      showcase[existingIndex] = {
        ...showcase[existingIndex],
        ...metadata
      };
    } else {
      console.log(`Adding new project: ${metadata.id}`);
      showcase.push(metadata);
    }
    
    // 5. Write back
    fs.writeFileSync(showcasePath, JSON.stringify(showcase, null, 2), 'utf8');
    console.log(`Successfully registered project ${metadata.id} in showcase.json`);
    
  } catch (error) {
    console.error('Error registering project:', error);
    process.exit(1);
  }
};

run();
