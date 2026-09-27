import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');
const distDir = path.join(rootDir, 'dist');

if (!fs.existsSync(distDir)) {
  console.error('Error: dist directory does not exist. Run "vite build" first.');
  process.exit(1);
}

const templatePath = path.join(distDir, 'index.html');
if (!fs.existsSync(templatePath)) {
  console.error('Error: dist/index.html not found.');
  process.exit(1);
}

const templateHtml = fs.readFileSync(templatePath, 'utf8');

// Load structured content
const profile = JSON.parse(fs.readFileSync(path.join(rootDir, 'src/content/profile.json'), 'utf8'));
const showcase = JSON.parse(fs.readFileSync(path.join(rootDir, 'src/content/projects/showcase.json'), 'utf8'));
const apps = JSON.parse(fs.readFileSync(path.join(rootDir, 'src/content/apps.json'), 'utf8'));
const now = JSON.parse(fs.readFileSync(path.join(rootDir, 'src/content/now.json'), 'utf8'));
const journey = JSON.parse(fs.readFileSync(path.join(rootDir, 'src/content/journey.json'), 'utf8'));
const workflow = JSON.parse(fs.readFileSync(path.join(rootDir, 'src/content/workflow.json'), 'utf8'));
const technologies = JSON.parse(fs.readFileSync(path.join(rootDir, 'src/content/technologies.json'), 'utf8'));

const BASE_URL = 'https://tanmoy.is-a.dev';

// Define static routes to prerender
const routes = [
  {
    path: '',
    title: 'Tanmoy Majumder | Coder, AI App Builder & Open Source',
    description: 'Official portfolio and technical knowledge hub for Tanmoy Majumder (Tcode-Motion). Creator of TechScript (Rust language & compiler) and Android developer of KinotiX on Google Play and Satvora AI.',
    bodyHtml: `
      <main class="min-h-screen bg-[#090a0f] text-white p-8 max-w-5xl mx-auto space-y-12">
        <header class="space-y-4">
          <p class="text-xs font-mono text-[#c4ff36] uppercase tracking-wider">// Verified Knowledge Base &amp; Developer Hub</p>
          <h1 class="text-5xl font-extrabold">Tanmoy Majumder</h1>
          <p class="text-xl text-gray-300">Coder, AI App Builder &amp; Open Source Contributor (online alias Tcode-Motion)</p>
          <p class="text-sm text-gray-400 max-w-2xl leading-relaxed">
            Building programming languages in Rust, native Android applications on Google Play, and modern web architectures.
          </p>
        </header>

        <section class="space-y-4">
          <h2 class="text-2xl font-bold">Featured Projects &amp; Software Systems</h2>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <article class="p-4 rounded-xl border border-white/10 bg-[#121520]">
              <h3 class="text-lg font-bold"><a href="/techscript" class="hover:underline">TechScript 2.0</a></h3>
              <p class="text-xs text-gray-400">A compiled, human-readable programming language toolchain written in Rust with custom lexer, parser, AST, bytecode VM, and CLI driver.</p>
            </article>
            <article class="p-4 rounded-xl border border-white/10 bg-[#121520]">
              <h3 class="text-lg font-bold"><a href="/apps/kinotix" class="hover:underline">KinotiX Wallpaper Engine</a></h3>
              <p class="text-xs text-gray-400">Interactive 4K live &amp; 3D parallax wallpaper engine published on Google Play (com.kinotix.app) with OpenGL ES and hardware gyro sensors.</p>
            </article>
            <article class="p-4 rounded-xl border border-white/10 bg-[#121520]">
              <h3 class="text-lg font-bold"><a href="/apps/satvora-ai" class="hover:underline">Satvora AI</a></h3>
              <p class="text-xs text-gray-400">Multimodal food scanning and nutrition tracking application for Android in active closed testing.</p>
            </article>
            <article class="p-4 rounded-xl border border-white/10 bg-[#121520]">
              <h3 class="text-lg font-bold"><a href="/projects/novos" class="hover:underline">NovOS</a></h3>
              <p class="text-xs text-gray-400">Web-based desktop operating system with reactive window management and virtual file system.</p>
            </article>
          </div>
        </section>

        <section class="space-y-4">
          <h2 class="text-2xl font-bold">Core Navigation</h2>
          <ul class="flex flex-wrap gap-4 text-sm font-mono text-[#c4ff36]">
            <li><a href="/projects" class="hover:underline">/projects</a></li>
            <li><a href="/apps" class="hover:underline">/apps</a></li>
            <li><a href="/techscript" class="hover:underline">/techscript</a></li>
            <li><a href="/technologies" class="hover:underline">/technologies</a></li>
            <li><a href="/now" class="hover:underline">/now</a></li>
            <li><a href="/workflow" class="hover:underline">/workflow</a></li>
            <li><a href="/journey" class="hover:underline">/journey</a></li>
            <li><a href="/about" class="hover:underline">/about</a></li>
            <li><a href="/connect" class="hover:underline">/connect</a></li>
          </ul>
        </section>
      </main>
    `,
  },
  {
    path: 'about',
    title: 'About Tanmoy Majumder (Tcode-Motion) — Coder, AI App Builder & TechScript Creator',
    description: 'Learn about Tanmoy Majumder (Tcode-Motion): independent software engineer from West Bengal, India. Creator of TechScript programming language, Android developer of KinotiX on Google Play and Satvora AI.',
    bodyHtml: `
      <main class="min-h-screen bg-[#090a0f] text-white p-8 max-w-4xl mx-auto space-y-8">
        <header>
          <h1 class="text-4xl font-extrabold">About Tanmoy Majumder</h1>
          <p class="text-lg text-gray-300 mt-2">Also known online as Tcode-Motion</p>
        </header>
        <section class="space-y-4 text-gray-300 leading-relaxed">
          <h2 class="text-2xl font-bold text-white">Who I Am</h2>
          <p>I am an independent software engineer and coder based in West Bengal, India. I build programming language toolchains in Rust, native Android applications on Google Play, and interactive web architectures.</p>
          <h2 class="text-2xl font-bold text-white">What I Build</h2>
          <p>My work spans low-level systems programming (TechScript compiler &amp; VM in Rust), native Android graphics (KinotiX wallpaper engine with OpenGL ES), multimodal computer vision applications (Satvora AI, NeoSketch with ONNX), and web operating systems (NovOS).</p>
          <h2 class="text-2xl font-bold text-white">Verified Profiles</h2>
          <ul class="list-disc pl-6 space-y-1">
            <li>GitHub: <a href="https://github.com/Tcode-Motion" class="text-cyan-400">github.com/Tcode-Motion</a></li>
            <li>Google Play Developer: <a href="https://play.google.com/store/apps/dev?id=8946471561851740040" class="text-cyan-400">Developer ID 8946471561851740040</a></li>
            <li>ORCID: <a href="https://orcid.org/0009-0007-9079-130X" class="text-cyan-400">0009-0007-9079-130X</a></li>
            <li>Email: <a href="mailto:tcodemotion@gmail.com" class="text-cyan-400">tcodemotion@gmail.com</a></li>
          </ul>
        </section>
      </main>
    `,
  },
  {
    path: 'now',
    title: "What I'm Doing Now — Tanmoy Majumder (Tcode-Motion)",
    description: 'Current focus, active software development projects, maintenance tasks, and technical experiments by Tanmoy Majumder as of September 2026.',
    bodyHtml: `
      <main class="min-h-screen bg-[#090a0f] text-white p-8 max-w-4xl mx-auto space-y-8">
        <header>
          <h1 class="text-4xl font-extrabold">What I'm Doing Now</h1>
          <p class="text-sm text-gray-400 mt-2">Location: West Bengal, India // Current Focus: ${now.currentFocus}</p>
        </header>
        <section class="space-y-6">
          ${now.sections.map(s => `
            <div class="space-y-3">
              <h2 class="text-xl font-bold text-[#c4ff36]">${s.category}</h2>
              <div class="space-y-3">
                ${s.items.map(item => `
                  <div class="p-4 rounded-xl bg-[#121520] border border-white/5">
                    <h3 class="font-bold text-white">${item.title}</h3>
                    <p class="text-xs text-gray-300 mt-1">${item.description}</p>
                  </div>
                `).join('')}
              </div>
            </div>
          `).join('')}
        </section>
      </main>
    `,
  },
  {
    path: 'projects',
    title: 'Open Source Projects & Case Studies by Tanmoy Majumder (Tcode-Motion)',
    description: 'Comprehensive project knowledge base and case studies by Tanmoy Majumder. Featuring TechScript (Rust compiler), Satvora AI, KinotiX 4K live wallpaper on Google Play, NovOS web operating system, and open source repositories.',
    bodyHtml: `
      <main class="min-h-screen bg-[#090a0f] text-white p-8 max-w-5xl mx-auto space-y-8">
        <header>
          <h1 class="text-4xl font-extrabold">Open Source Projects &amp; Case Studies</h1>
          <p class="text-gray-300 mt-2">Architected and built by Tanmoy Majumder (Tcode-Motion)</p>
        </header>
        <section class="grid grid-cols-1 md:grid-cols-2 gap-6">
          ${showcase.map(p => `
            <article class="p-6 rounded-2xl bg-[#0d0e14] border border-white/8 space-y-3">
              <span class="text-xs font-mono text-cyan-400">${p.category}</span>
              <h2 class="text-xl font-bold text-white"><a href="/projects/${p.id}" class="hover:underline">${p.title}</a></h2>
              <p class="text-xs text-gray-300">${p.description || p.tagline}</p>
              <div class="text-xs font-mono text-gray-500">${p.techStack.join(' • ')}</div>
            </article>
          `).join('')}
        </section>
      </main>
    `,
  },
  {
    path: 'apps',
    title: 'Android Applications by Tanmoy Majumder — Google Play Store & Android SDK',
    description: 'Official Android application directory by Tanmoy Majumder (Google Play Developer ID: 8946471561851740040). Explore KinotiX 4K live wallpaper, Satvora AI food scanner, NeoSketch, and Vortyx.',
    bodyHtml: `
      <main class="min-h-screen bg-[#090a0f] text-white p-8 max-w-5xl mx-auto space-y-8">
        <header>
          <h1 class="text-4xl font-extrabold">Android Applications Hub</h1>
          <p class="text-gray-300 mt-2">Published &amp; Staged by Tanmoy Majumder on Google Play</p>
        </header>
        <section class="grid grid-cols-1 md:grid-cols-2 gap-6">
          ${apps.map(a => `
            <article class="p-6 rounded-2xl bg-[#0d0e14] border border-white/8 space-y-3">
              <span class="text-xs font-mono text-emerald-400">${a.category} • ${a.status}</span>
              <h2 class="text-xl font-bold text-white"><a href="/apps/${a.id}" class="hover:underline">${a.name}</a></h2>
              <p class="text-xs text-gray-300">${a.summary}</p>
              ${a.packageId ? `<p class="text-[11px] font-mono text-gray-400">Package: ${a.packageId}</p>` : ''}
              <div class="text-xs font-mono text-gray-500">${a.techStack.join(' • ')}</div>
            </article>
          `).join('')}
        </section>
      </main>
    `,
  },
  {
    path: 'techscript',
    title: 'TechScript 2.0 — Programming Language & Compiler Toolchain in Rust by Tanmoy Majumder',
    description: 'TechScript is an open-source programming language created by Tanmoy Majumder and built in Rust. Features a custom lexer, recursive-descent parser, AST representation, stack-based bytecode VM, and CLI driver.',
    bodyHtml: `
      <main class="min-h-screen bg-[#090a0f] text-white p-8 max-w-5xl mx-auto space-y-8">
        <header>
          <h1 class="text-4xl font-extrabold">TechScript 2.0 Ecosystem</h1>
          <p class="text-lg text-gray-300 mt-2">Created by Tanmoy Majumder (Tcode-Motion)</p>
        </header>
        <section class="space-y-4 text-gray-300 leading-relaxed">
          <h2 class="text-2xl font-bold text-white">What is TechScript?</h2>
          <p>TechScript is an open-source compiled programming language designed to make code read like structured English while retaining native systems performance. The compiler and runtime toolchain are built from scratch in Rust.</p>
          <h2 class="text-2xl font-bold text-white">Compiler Pipeline</h2>
          <ol class="list-decimal pl-6 space-y-2">
            <li><strong>Lexer &amp; Tokenizer:</strong> Converts source code into discrete typed tokens with source span coordinates.</li>
            <li><strong>Recursive Descent Parser:</strong> Generates a strict Abstract Syntax Tree (AST) validating grammar rules.</li>
            <li><strong>Bytecode Compiler:</strong> Lowers the AST into compact bytecode instructions.</li>
            <li><strong>Stack-Based Virtual Machine:</strong> Executes bytecode with NaN-boxed value representations and lexical call frames.</li>
            <li><strong>CLI Driver ('tsc'):</strong> Unified developer tooling for run, build, check, format, and lint commands.</li>
          </ol>
          <p>Source Repository: <a href="https://github.com/Tcode-Motion/techscript" class="text-cyan-400">github.com/Tcode-Motion/techscript</a></p>
        </section>
      </main>
    `,
  },
  {
    path: 'technologies',
    title: 'Technologies & Engineering Toolchains Used by Tanmoy Majumder',
    description: 'Contextual breakdown of technologies, programming languages, and frameworks used by Tanmoy Majumder (Tcode-Motion). Explore why Rust, Kotlin, TypeScript, Flutter, and Three.js were chosen across real projects.',
    bodyHtml: `
      <main class="min-h-screen bg-[#090a0f] text-white p-8 max-w-5xl mx-auto space-y-8">
        <header>
          <h1 class="text-4xl font-extrabold">Technologies &amp; Toolchains</h1>
          <p class="text-gray-300 mt-2">Contextual architectural relationships across projects by Tanmoy Majumder</p>
        </header>
        <section class="grid grid-cols-1 md:grid-cols-2 gap-6">
          ${technologies.map(t => `
            <article class="p-6 rounded-2xl bg-[#0d0e14] border border-white/8 space-y-3">
              <h2 class="text-xl font-bold text-white">${t.name}</h2>
              <span class="text-xs font-mono text-cyan-400">${t.category}</span>
              <p class="text-xs text-gray-300">${t.description}</p>
              <div class="p-3 rounded-lg bg-[#121520] text-xs text-gray-400">
                <strong>Why Selected:</strong> ${t.whyChosen}
              </div>
            </article>
          `).join('')}
        </section>
      </main>
    `,
  },
  {
    path: 'workflow',
    title: 'Engineering Workflow — How Tanmoy Majumder Builds Software',
    description: 'A transparent look into how Tanmoy Majumder architects, implements, tests, and deploys compilers, Android applications, and technical software from first principles.',
    bodyHtml: `
      <main class="min-h-screen bg-[#090a0f] text-white p-8 max-w-4xl mx-auto space-y-8">
        <header>
          <h1 class="text-4xl font-extrabold">Engineering Workflow</h1>
          <p class="text-gray-300 mt-2">Methodology and development philosophy of Tanmoy Majumder</p>
        </header>
        <section class="space-y-6">
          ${workflow.stages.map(st => `
            <div class="p-6 rounded-2xl bg-[#0d0e14] border border-white/8 space-y-2">
              <span class="text-xs font-mono text-indigo-400">${st.step}</span>
              <h2 class="text-xl font-bold text-white">${st.name}</h2>
              <p class="text-xs text-gray-300">${st.summary}</p>
            </div>
          `).join('')}
        </section>
      </main>
    `,
  },
  {
    path: 'journey',
    title: 'Engineering Journey & Milestones — Tanmoy Majumder (Tcode-Motion)',
    description: 'The technical evolution of Tanmoy Majumder: from early programming in C and Python to architecting compilers in Rust and publishing Android apps on Google Play.',
    bodyHtml: `
      <main class="min-h-screen bg-[#090a0f] text-white p-8 max-w-4xl mx-auto space-y-8">
        <header>
          <h1 class="text-4xl font-extrabold">Engineering Journey</h1>
          <p class="text-gray-300 mt-2">Verified milestones from 2021 to 2026</p>
        </header>
        <section class="space-y-6">
          ${journey.milestones.map(m => `
            <div class="p-6 rounded-2xl bg-[#0d0e14] border border-white/8 space-y-2">
              <span class="text-xs font-mono text-cyan-400">${m.year} // ${m.phase}</span>
              <h2 class="text-xl font-bold text-white">${m.highlight}</h2>
              <p class="text-xs text-gray-300">${m.summary}</p>
              <div class="text-xs font-mono text-gray-500">${m.technologies.join(', ')}</div>
            </div>
          `).join('')}
        </section>
      </main>
    `,
  },
  {
    path: 'connect',
    title: 'Connect & Contact — Tanmoy Majumder (Tcode-Motion)',
    description: 'Get in touch with Tanmoy Majumder (Tcode-Motion) for software engineering roles, open source collaboration, or technical inquiries. Verified profiles on GitHub, Google Play, and X.',
    bodyHtml: `
      <main class="min-h-screen bg-[#090a0f] text-white p-8 max-w-4xl mx-auto space-y-8">
        <header>
          <h1 class="text-4xl font-extrabold">Connect &amp; Contact</h1>
          <p class="text-gray-300 mt-2">Direct channels to reach Tanmoy Majumder</p>
        </header>
        <section class="space-y-4 text-gray-300">
          <p>Email: <a href="mailto:${profile.contactEmail}" class="text-cyan-400 font-mono">${profile.contactEmail}</a></p>
          <p>GitHub: <a href="https://github.com/Tcode-Motion" class="text-cyan-400">github.com/Tcode-Motion</a></p>
          <p>X (Twitter): <a href="https://x.com/Tcodemotion" class="text-cyan-400">@Tcodemotion</a></p>
          <p>about.me: <a href="https://about.me/Tanmoy.majumder" class="text-cyan-400">about.me/Tanmoy.majumder</a></p>
          <p>ORCID: <a href="https://orcid.org/0009-0007-9079-130X" class="text-cyan-400">0009-0007-9079-130X</a></p>
        </section>
      </main>
    `,
  },
  {
    path: 'resume',
    title: 'Tanmoy Majumder Resume — Software Engineer, Rust Developer & TechScript Creator',
    description: 'Download or view the professional resume of Tanmoy Majumder — software engineer, Rust programmer, TechScript language creator, AI developer, and open source builder from West Bengal, India.',
    bodyHtml: `
      <main class="min-h-screen bg-[#090a0f] text-white p-8 max-w-4xl mx-auto space-y-8">
        <header>
          <h1 class="text-4xl font-extrabold">Tanmoy Majumder — Professional Resume</h1>
          <p class="text-gray-300 mt-2">Coder, AI App Builder &amp; Open Source Contributor</p>
        </header>
        <section class="space-y-4 text-gray-300">
          <p>Specializing in Rust systems programming, compiler toolchains, Android development (Kotlin/Compose), and high-performance web graphics.</p>
        </section>
      </main>
    `,
  },
  {
    path: 'blog',
    title: 'Technical Articles & Engineering Blog — Tanmoy Majumder',
    description: 'Articles on compiler design, Rust, WebGL shaders, React performance optimization, and AI application development by Tanmoy Majumder.',
    bodyHtml: `
      <main class="min-h-screen bg-[#090a0f] text-white p-8 max-w-4xl mx-auto space-y-8">
        <header>
          <h1 class="text-4xl font-extrabold">Technical Blog &amp; Research</h1>
          <p class="text-gray-300 mt-2">Engineering deep dives into compiler design and systems programming</p>
        </header>
      </main>
    `,
  }
];

// Add each showcase project as a prerendered route
showcase.forEach(project => {
  routes.push({
    path: `projects/${project.id}`,
    title: `${project.title} — Architectural Case Study by Tanmoy Majumder`,
    description: `${project.title}: ${project.tagline} An open source engineering project built by Tanmoy Majumder (Tcode-Motion) using ${project.techStack.join(', ')}.`,
    bodyHtml: `
      <main class="min-h-screen bg-[#090a0f] text-white p-8 max-w-4xl mx-auto space-y-8">
        <header class="space-y-2">
          <span class="text-xs font-mono text-cyan-400">${project.category}</span>
          <h1 class="text-4xl font-extrabold">${project.title}</h1>
          <p class="text-lg text-gray-300">${project.tagline}</p>
          <p class="text-xs text-gray-400">Architected &amp; Built by Tanmoy Majumder (Tcode-Motion)</p>
        </header>
        <section class="space-y-4 text-gray-300">
          <h2 class="text-2xl font-bold text-white">Overview</h2>
          <p>${project.description || project.tagline}</p>
          ${project.architecture ? `
            <h2 class="text-2xl font-bold text-white">Architecture</h2>
            <pre class="p-4 rounded-xl bg-[#06070a] border border-white/5 font-mono text-xs text-cyan-400">${project.architecture}</pre>
          ` : ''}
          ${project.githubUrl ? `
            <p>Source Code: <a href="${project.githubUrl}" class="text-indigo-400">${project.githubUrl}</a></p>
          ` : ''}
        </section>
      </main>
    `
  });
});

// Add each app as a prerendered route
apps.forEach(app => {
  routes.push({
    path: `apps/${app.id}`,
    title: `${app.name} — Android Application Case Study by Tanmoy Majumder`,
    description: `${app.name}: ${app.tagline}. Developed by Tanmoy Majumder (Google Play Developer ID: 8946471561851740040) using ${app.techStack.join(', ')}.`,
    bodyHtml: `
      <main class="min-h-screen bg-[#090a0f] text-white p-8 max-w-4xl mx-auto space-y-8">
        <header class="space-y-2">
          <span class="text-xs font-mono text-emerald-400">${app.category} • ${app.status}</span>
          <h1 class="text-4xl font-extrabold">${app.name}</h1>
          <p class="text-lg text-gray-300">${app.tagline}</p>
          <p class="text-xs text-gray-400">Developed by Tanmoy Majumder (Google Play Dev ID: 8946471561851740040)</p>
        </header>
        <section class="space-y-4 text-gray-300">
          <h2 class="text-2xl font-bold text-white">Summary</h2>
          <p>${app.summary}</p>
          ${app.playStoreUrl ? `
            <p>Google Play Store: <a href="${app.playStoreUrl}" class="text-emerald-400">${app.playStoreUrl}</a></p>
          ` : ''}
          ${app.packageId ? `<p class="font-mono text-xs text-gray-400">Package ID: ${app.packageId}</p>` : ''}
        </section>
      </main>
    `
  });
});

console.log(`Prerendering ${routes.length} static routes for crawlable HTML output...`);

routes.forEach(route => {
  const canonicalUrl = route.path ? `${BASE_URL}/${route.path}/` : `${BASE_URL}/`;
  let html = templateHtml;

  // Replace Title
  html = html.replace(/<title>.*?<\/title>/i, `<title>${route.title}</title>`);

  // Replace Description
  html = html.replace(/<meta\s+name=["']description["']\s+content=["'].*?["']\s*\/?>/i, `<meta name="description" content="${route.description.replace(/"/g, '&quot;')}" />`);

  // Replace Canonical Link
  html = html.replace(/<link\s+rel=["']canonical["']\s+href=["'].*?["']\s*\/?>/i, `<link rel="canonical" href="${canonicalUrl}" />`);

  // Replace OpenGraph Title & Description
  html = html.replace(/<meta\s+property=["']og:title["']\s+content=["'].*?["']\s*\/?>/i, `<meta property="og:title" content="${route.title.replace(/"/g, '&quot;')}" />`);
  html = html.replace(/<meta\s+property=["']og:description["']\s+content=["'].*?["']\s*\/?>/i, `<meta property="og:description" content="${route.description.replace(/"/g, '&quot;')}" />`);
  html = html.replace(/<meta\s+property=["']og:url["']\s+content=["'].*?["']\s*\/?>/i, `<meta property="og:url" content="${canonicalUrl}" />`);

  // Inject semantic HTML into <noscript> for crawlers while preserving the instant inline dark loader in #root
  html = html.replace(/<noscript>[\s\S]*?<\/noscript>/i, `<noscript>\n${route.bodyHtml}\n    </noscript>`);

  // Target directory
  const targetDir = route.path ? path.join(distDir, route.path) : distDir;
  if (!fs.existsSync(targetDir)) {
    fs.mkdirSync(targetDir, { recursive: true });
  }

  const targetFile = path.join(targetDir, 'index.html');
  fs.writeFileSync(targetFile, html, 'utf8');
  console.log(`✓ Prerendered: ${route.path ? `/${route.path}/` : '/'} -> ${path.relative(rootDir, targetFile)}`);
});

// Create 404.html fallback for GitHub Pages SPA routing
const notFoundTarget = path.join(distDir, '404.html');
fs.writeFileSync(notFoundTarget, templateHtml, 'utf8');
console.log(`✓ Generated: 404.html SPA fallback -> ${path.relative(rootDir, notFoundTarget)}`);

console.log('✅ Route prerendering completed successfully.');
