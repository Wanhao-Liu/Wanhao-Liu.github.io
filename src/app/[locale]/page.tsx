import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import AcademicHome from '@/components/home/AcademicHome';
import { getAbout, getNews, getPublications, isLocale, locales } from '@/lib/siteContent';

export const dynamicParams = false;
export function generateStaticParams() { return locales.map((locale) => ({ locale })); }

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const zh = locale === 'zh';
  return {
    title: { absolute: zh ? '刘皖皓 | 机器人研究者' : 'Wanhao Liu | Robotics Researcher' },
    description: zh ? '刘皖皓的个人学术主页：具身智能、机器人学习、医疗机器人与世界动作模型。' : 'Wanhao Liu researches embodied intelligence, robot learning, medical robotics, and world-action models.',
    alternates: { canonical: `/${locale}/`, languages: { en: '/en/', 'zh-CN': '/zh/', 'x-default': '/en/' } },
    openGraph: { locale: zh ? 'zh_CN' : 'en_US', url: `/${locale}/` },
  };
}

export default async function HomePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const schema = {
    '@context': 'https://schema.org', '@type': 'Person', name: 'Wanhao Liu', alternateName: '刘皖皓',
    url: `https://wanhao-liu.github.io/${locale}/`, jobTitle: 'Robotics Researcher',
    affiliation: [{ '@type': 'CollegeOrUniversity', name: 'Guangdong University of Technology' }, { '@type': 'CollegeOrUniversity', name: 'The Chinese University of Hong Kong' }],
    sameAs: ['https://github.com/Wanhao-Liu', 'https://scholar.google.com/citations?hl=en&user=zaRHAjgAAAAJ'],
  };
  return <><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} /><AcademicHome locale={locale} about={getAbout(locale)} news={getNews(locale)} publications={getPublications(locale)} /></>;
}
