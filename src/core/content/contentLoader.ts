import profileData from '@/content/profile.json';
import skillsData from '@/content/skills.json';
import socialsData from '@/content/socials.json';
import configData from '@/content/config.json';

import showcaseProjects from '@/content/projects/showcase.json';

import type { ProfileData, SkillsData, SocialItem, ProjectData, SiteConfig } from './types';

export const getProfile = (): ProfileData => profileData as ProfileData;
export const getSkills = (): SkillsData => skillsData as SkillsData;
export const getSocials = (): SocialItem[] => socialsData as SocialItem[];
export const getConfig = (): SiteConfig => configData as SiteConfig;

export const getAllProjects = (): ProjectData[] => showcaseProjects as ProjectData[];

export const getFeaturedProjects = (): ProjectData[] =>
  getAllProjects().filter((p) => p.featured);

export const getSecondaryProjects = (): ProjectData[] =>
  getAllProjects().filter((p) => !p.featured);

export const getProjectById = (id: string): ProjectData | undefined =>
  getAllProjects().find((project) => project.id === id);
