import { useState, useEffect } from 'react';

interface GithubRepo {
  name: string;
  description: string | null;
  stargazers_count: number;
  forks_count: number;
  language: string | null;
  html_url: string;
  topics: string[];
}

interface GithubProfile {
  public_repos: number;
  followers: number;
  following: number;
  created_at: string;
}

interface GithubStats {
  repos: GithubRepo[];
  profile: GithubProfile | null;
  totalStars: number;
  totalForks: number;
  topLangs: [string, number][];
  repoCount: number;
  loading: boolean;
}

const GITHUB_USER = 'Tcode-Motion';
const CACHE_TTL = 5 * 60 * 1000; // 5 minutes

const FALLBACK_PROFILE: GithubProfile = {
  public_repos: 15,
  followers: 18,
  following: 12,
  created_at: '2021-03-24T00:00:00Z',
};

const FALLBACK_REPOS: GithubRepo[] = [
  {
    name: 'techscript',
    description: 'A lightweight, statically-typed compiled language with a custom AST, VM compiler, and WASM playground.',
    stargazers_count: 42,
    forks_count: 12,
    language: 'Rust',
    html_url: 'https://github.com/Tcode-Motion/techscript',
    topics: ['compiler', 'vm', 'programming-language', 'ast', 'wasm', 'rust'],
  },
  {
    name: 'NovOS',
    description: 'A web-based interactive desktop environment built with Three.js, React, and CSS Glassmorphism.',
    stargazers_count: 38,
    forks_count: 8,
    language: 'TypeScript',
    html_url: 'https://github.com/Tcode-Motion/NovOS',
    topics: ['desktop-environment', 'threejs', 'react', 'glassmorphism', 'webgl'],
  },
  {
    name: 'Aurora-OS.js',
    description: 'A custom audio synthesis engine and visual canvas playground built with pure JavaScript.',
    stargazers_count: 22,
    forks_count: 5,
    language: 'JavaScript',
    html_url: 'https://github.com/Tcode-Motion/Aurora-OS.js',
    topics: ['audio-synthesis', 'canvas', 'javascript', 'visualizer'],
  },
  {
    name: 'os-wallpapers',
    description: 'A collection of premium minimalist 4K wallpapers created for custom operating system desktops.',
    stargazers_count: 12,
    forks_count: 2,
    language: 'JavaScript',
    html_url: 'https://github.com/Tcode-Motion/os-wallpapers',
    topics: ['wallpapers', 'minimalist', 'javascript'],
  },
  {
    name: 'arc-reactor-3d',
    description: 'A real-time interactive 3D WebGL render of the Iron Man Arc Reactor using Three.js.',
    stargazers_count: 8,
    forks_count: 1,
    language: 'JavaScript',
    html_url: 'https://github.com/Tcode-Motion/arc-reactor-3d',
    topics: ['threejs', 'webgl', '3d', 'arc-reactor'],
  },
  {
    name: 'Vortyx',
    description: 'An experimental high-performance astrodynamics simulation engine written in Rust.',
    stargazers_count: 6,
    forks_count: 1,
    language: 'Rust',
    html_url: 'https://github.com/Tcode-Motion/Vortyx',
    topics: ['simulation-engine', 'astrodynamics', 'rust'],
  },
];

let cached: { data: GithubStats; ts: number } | null = null;

function fetchGithubData(): Promise<{ repos: GithubRepo[]; profile: GithubProfile }> {
  return Promise.all([
    fetch(`https://api.github.com/users/${GITHUB_USER}/repos?sort=stars&direction=desc&per_page=20`),
    fetch(`https://api.github.com/users/${GITHUB_USER}`),
  ]).then(([reposRes, profileRes]) => {
    if (!reposRes.ok || !profileRes.ok) {
      throw new Error('GitHub API responded with rate limit or error status');
    }
    return Promise.all([reposRes.json(), profileRes.json()]);
  }).then(([reposData, profileData]) => {
    if (!Array.isArray(reposData) || !profileData || profileData.message) {
      throw new Error('Invalid GitHub API response payload');
    }
    return { repos: reposData, profile: profileData };
  });
}

function computeStats(repos: GithubRepo[], profile: GithubProfile | null): GithubStats {
  const totalStars = repos.reduce((s, r) => s + r.stargazers_count, 0);
  const totalForks = repos.reduce((s, r) => s + r.forks_count, 0);
  const langCount: Record<string, number> = {};
  repos.forEach(r => { if (r.language) langCount[r.language] = (langCount[r.language] || 0) + 1; });
  const topLangs = Object.entries(langCount).sort((a, b) => b[1] - a[1]).slice(0, 5) as [string, number][];
  return { repos, profile, totalStars, totalForks, topLangs, repoCount: repos.length, loading: false };
}

export function useGithubStats(): GithubStats {
  const [state, setState] = useState<GithubStats>(() => {
    if (cached && Date.now() - cached.ts < CACHE_TTL) return cached.data;
    return { repos: [], profile: null, totalStars: 0, totalForks: 0, topLangs: [], repoCount: 0, loading: true };
  });

  useEffect(() => {
    if (cached && Date.now() - cached.ts < CACHE_TTL) {
      setState(cached.data);
      return;
    }

    let cancelled = false;
    fetchGithubData()
      .then(({ repos, profile }) => {
        if (cancelled) return;
        const stats = computeStats(repos, profile);
        cached = { data: stats, ts: Date.now() };
        setState(stats);
      })
      .catch(() => {
        if (cancelled) return;
        console.warn('GitHub API rate limit exceeded. Loading local fallback cache data.');
        const stats = computeStats(FALLBACK_REPOS, FALLBACK_PROFILE);
        cached = { data: stats, ts: Date.now() };
        setState(stats);
      });
    return () => { cancelled = true; };
  }, []);

  return state;
}
