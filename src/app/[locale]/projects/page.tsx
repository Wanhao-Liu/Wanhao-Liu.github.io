import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import ProjectList from '@/components/projects/ProjectList';
import { getLabels } from '@/lib/labels';
import { getProjects, isLocale, locales } from '@/lib/siteContent';

export const dynamicParams = false;
export function generateStaticParams() { return locales.map((locale) => ({ locale })); }

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const zh = locale === 'zh';
  const title = zh ? '项目' : 'Projects';
  const description = zh ? '刘皖皓的机器人、无人机与智能系统项目。' : 'Robotics, UAV, and intelligent systems projects by Wanhao Liu.';
  return {
    title,
    description,
    alternates: { canonical: `/${locale}/projects/`, languages: { en: '/en/projects/', 'zh-CN': '/zh/projects/', 'x-default': '/en/projects/' } },
    openGraph: { title, description, locale: zh ? 'zh_CN' : 'en_US', url: `/${locale}/projects/` },
  };
}

export default async function ProjectsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  return <div className="page-shell inner-page"><header className="page-title"><h1>{getLabels(locale).projects}</h1></header><ProjectList locale={locale} projects={getProjects(locale)} /></div>;
}
