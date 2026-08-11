import { getBibtexContent, getTomlContent } from '@/lib/content';
import { parseBibTeX } from '@/lib/bibtexParser';

export const locales = ['en', 'zh'] as const;
export type Locale = (typeof locales)[number];

export interface AboutContent {
  intro: string;
  research: string;
  interests: string[];
  education: TimelineItem[];
  experience: TimelineItem[];
}

export interface TimelineItem {
  institution: string;
  period: string;
  detail: string;
  degree?: string;
  role?: string;
}

export interface NewsItem {
  date: string;
  content: string;
}

export interface AwardItem {
  title: string;
  organization: string;
  period: string;
  detail?: string;
}

export interface AwardsContent {
  academic: AwardItem[];
  competitions: AwardItem[];
}

export interface ProjectItem {
  title: string;
  period: string;
  image: string;
  url: string;
  award: string;
  description: string;
}

export function isLocale(value: string): value is Locale {
  return locales.includes(value as Locale);
}

export function getAbout(locale: Locale): AboutContent {
  const content = getTomlContent<AboutContent>('about.toml', locale);
  if (!content) throw new Error(`Missing about content for ${locale}`);
  return content;
}

export function getNews(locale: Locale): NewsItem[] {
  return getTomlContent<{ news: NewsItem[] }>('news.toml', locale)?.news ?? [];
}

export function getAwards(locale: Locale): AwardsContent {
  const content = getTomlContent<AwardsContent>('awards.toml', locale);
  if (!content) throw new Error(`Missing awards content for ${locale}`);
  return content;
}

export function getProjects(locale: Locale): ProjectItem[] {
  return getTomlContent<{ projects: ProjectItem[] }>('projects.toml', locale)?.projects ?? [];
}

export function getPublications(locale: Locale) {
  return parseBibTeX(getBibtexContent('publications.bib'), locale);
}
