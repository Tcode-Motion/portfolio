export interface ProfileData {
  name: string;
  handle: string;
  title: string;
  roles: string[];
  location: string;
  tagline: string;
  elevatorPitch: string;
  philosophy: string;
  targetAudience: string[];
  contactEmail: string;
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
  githubUrl: string;
  liveUrl?: string;
  highlights?: string[];
  interactiveType?: 'playground' | '3d-device' | 'architecture-diagram' | 'default';
  githubRepo?: string;
  color?: string;
  layout?: 'featured' | 'horizontal' | 'split' | 'compact';
  features?: string[];
  architecture?: string;
  timeline?: string;
  challenges?: string[];
  optimizations?: string[];
  roadmap?: string[];
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
