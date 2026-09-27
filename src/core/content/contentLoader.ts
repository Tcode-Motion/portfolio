import profileData from '@/content/profile.json';
import skillsData from '@/content/skills.json';
import socialsData from '@/content/socials.json';
import configData from '@/content/config.json';
import appsData from '@/content/apps.json';
import nowData from '@/content/now.json';
import journeyData from '@/content/journey.json';
import workflowData from '@/content/workflow.json';
import technologiesData from '@/content/technologies.json';
import githubSnapshotData from '@/content/github-snapshot.json';
import showcaseProjects from '@/content/projects/showcase.json';
import secondaryProjects from '@/content/projects/secondary.json';

import type {
  ProfileData,
  SkillsData,
  SocialItem,
  ProjectData,
  SiteConfig,
  AppItem,
  NowData,
  JourneyData,
  WorkflowData,
  TechnologyItem,
  GithubSnapshot
} from './types';

export const getProfile = (): ProfileData => profileData as ProfileData;
export const getSkills = (): SkillsData => skillsData as SkillsData;
export const getSocials = (): SocialItem[] => socialsData as SocialItem[];
export const getConfig = (): SiteConfig => configData as SiteConfig;

export const getAllProjects = (): ProjectData[] => showcaseProjects as ProjectData[];

export const getFeaturedProjects = (): ProjectData[] =>
  getAllProjects().filter((p) => p.featured);

export const getSecondaryProjects = () => secondaryProjects;

export const getProjectById = (id: string): ProjectData | undefined =>
  getAllProjects().find((project) => project.id.toLowerCase() === id.toLowerCase());

export const getAllApps = (): AppItem[] => appsData as AppItem[];

export const getAppById = (id: string): AppItem | undefined =>
  getAllApps().find((app) => app.id.toLowerCase() === id.toLowerCase());

export const getNowData = (): NowData => nowData as NowData;
export const getJourneyData = (): JourneyData => journeyData as JourneyData;
export const getWorkflowData = (): WorkflowData => workflowData as WorkflowData;
export const getTechnologies = (): TechnologyItem[] => technologiesData as TechnologyItem[];
export const getGithubSnapshot = (): GithubSnapshot => githubSnapshotData as GithubSnapshot;
