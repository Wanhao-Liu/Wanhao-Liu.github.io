import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import PublicationList from '@/components/publications/PublicationList';
import { getLabels } from '@/lib/labels';
import { getPublications, isLocale, locales } from '@/lib/siteContent';

export const dynamicParams = false;
export function generateStaticParams() { return locales.map((locale) => ({ locale })); }

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const zh = locale === 'zh';
  const title = zh ? '论文' : 'Publications';
  const description = zh ? '刘皖皓在具身智能、机器人学习、医疗机器人和世界模型方向的论文。' : 'Publications by Wanhao Liu on embodied intelligence, robot learning, medical robotics, and world models.';
  return {
    title,
    description,
    alternates: { canonical: `/${locale}/publications/`, languages: { en: '/en/publications/', 'zh-CN': '/zh/publications/', 'x-default': '/en/publications/' } },
    openGraph: { title, description, locale: zh ? 'zh_CN' : 'en_US', url: `/${locale}/publications/` },
  };
}

export default async function PublicationsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const labels = getLabels(locale);
  const publications = getPublications(locale);
  const schema = publications.map((publication) => ({
    '@context': 'https://schema.org',
    '@type': 'ScholarlyArticle',
    headline: publication.title,
    description: publication.abstract,
    datePublished: String(publication.year),
    author: publication.authors.map((author) => ({ '@type': 'Person', name: author.name })),
    url: publication.webpage || publication.url || (publication.doi ? `https://doi.org/${publication.doi}` : `https://wanhao-liu.github.io/${locale}/publications/`),
    sameAs: publication.arxivId ? `https://arxiv.org/abs/${publication.arxivId}` : undefined,
  }));
  return <><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema).replaceAll('<', '\\u003c') }} /><div className="page-shell inner-page"><header className="page-title"><h1>{labels.publications}</h1></header><PublicationList publications={publications} locale={locale} /></div></>;
}
