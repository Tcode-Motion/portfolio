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

let cached: { data: GithubStats; ts: number } | null = null;

function fetchGithubData(): Promise<{ repos: GithubRepo[]; profile: GithubProfile }> {
  return Promise.all([
    fetch(`https://api.github.com/users/${GITHUB_USER}/repos?sort=stars&direction=desc&per_page=20`).then(r => r.json()),
    fetch(`https://api.github.com/users/${GITHUB_USER}`).then(r => r.json()),
  ]).then(([reposData, profileData]) => ({
    repos: Array.isArray(reposData) ? reposData : [],
    profile: profileData?.public_repos ? profileData : null,
  }));
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
        if (!cancelled) setState(s => ({ ...s, loading: false }));
      });
    return () => { cancelled = true; };
  }, []);

  return state;
}
