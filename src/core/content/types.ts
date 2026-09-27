export interface ProfileData {
  name: string;
  handle: string;
  aliases?: string[];
  title: string;
  roles: string[];
  location: string;
  country?: string;
  tagline: string;
  elevatorPitch: string;
  philosophy: string;
  contactEmail: string;
  googlePlayDevId?: string;
  googlePlayDevUrl?: string;
  orcid?: string;
  aboutMe?: string;
  superpowers?: string[];
}

export interface SkillItem {
  name: string;
  level: 'Primary' | 'Proficient' | 'Learning';
  relatedProjects: string[];
}

export interface SkillCategory {
  id: string;
  name: string;
  skills: SkillItem[];
}

export interface SkillsData {
  superpowers: string[];
  categories: SkillCategory[];
}

export interface SocialItem {
  platform: string;
  username: string;
  url: string;
  icon: string;
  rel?: string;
  description?: string;
}

export interface RoadmapItem {
  phase: string;
  title: string;
  status: 'completed' | 'in-progress' | 'planned';
}

export interface ProjectData {
  id: string;
  featured?: boolean;
  title: string;
  tagline: string;
  category: string;
  description?: string;
  problem?: string;
  solution?: string;
  techStack: string[];
  githubUrl?: string;
  liveUrl?: string;
  playStoreUrl?: string;
  highlights?: string[];
  interactiveType?: 'playground' | '3d-device' | 'architecture-diagram' | 'case-study' | 'default';
  githubRepo?: string;
  color?: string;
  layout?: 'featured' | 'standard' | 'horizontal' | 'split' | 'compact';
  features?: string[];
  architecture?: string;
  timeline?: string;
  challenges?: string[];
  optimizations?: string[];
  roadmap?: (string | RoadmapItem)[];
}

export interface AppItem {
  id: string;
  name: string;
  tagline: string;
  category: string;
  platform: string;
  packageId?: string;
  status: string;
  isReleased: boolean;
  playStoreUrl?: string | null;
  testingUrl?: string | null;
  officialUrl?: string | null;
  downloadUrl?: string | null;
  githubUrl?: string | null;
  techStack: string[];
  summary: string;
  highlights: string[];
  architecture?: string;
  testingDetails?: string;
}

export interface NowItem {
  title: string;
  description: string;
  link?: string;
  status?: string;
  date?: string;
}

export interface NowSection {
  category: string;
  items: NowItem[];
}

export interface NowData {
  lastUpdated: string;
  location: string;
  currentFocus: string;
  sections: NowSection[];
}

export interface JourneyMilestone {
  year: string;
  phase: string;
  summary: string;
  technologies: string[];
  highlight: string;
}

export interface JourneyData {
  title: string;
  tagline: string;
  milestones: JourneyMilestone[];
}

export interface WorkflowStage {
  step: string;
  name: string;
  summary: string;
  practices: string[];
}

export interface WorkflowData {
  title: string;
  tagline: string;
  philosophy: string;
  aiRole: string;
  stages: WorkflowStage[];
  toolchain: { category: string; items: string[] }[];
}

export interface TechnologyItem {
  id: string;
  name: string;
  category: string;
  icon: string;
  description: string;
  whyChosen: string;
  projects: { id: string; name: string; role: string }[];
}

export interface GithubRepoSnapshot {
  name: string;
  description: string | null;
  stars: number;
  language: string;
  url: string;
}

export interface GithubSnapshot {
  lastUpdated: string;
  username: string;
  publicRepoCount: number;
  totalStars: number;
  totalForks: number;
  topLanguages: [string, number][];
  featuredRepos: GithubRepoSnapshot[];
}

export interface SiteConfig {
  siteName: string;
  domain: string;
  defaultTheme: 'dark' | 'light';
  enableSoundByDefault: boolean;
  features: {
    techscriptPlayground: boolean;
    interactive3DHero: boolean;
    developerCli: boolean;
    githubSync: boolean;
    resumePage: boolean;
  };
  analytics: {
    cloudflare: {
      enabled: boolean;
    };
  };
}
