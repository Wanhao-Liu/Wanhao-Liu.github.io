import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import PublicationList from '@/components/publications/PublicationList';
import { getLabels } from '@/lib/labels';
import { selectPublications } from '@/lib/selectedPublications';
import { getPublications, isLocale, locales } from '@/lib/siteContent';

export const dynamicParams = false;
export function generateStaticParams() { return locales.map((locale) => ({ locale })); }

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const zh = locale === 'zh';
  const title = zh ? '精选论文' : 'Selected Publications';
  const description = zh ? '刘皖皓在具身智能、医疗机器人和机器人学习方向的精选论文。' : 'Selected publications by Wanhao Liu on embodied intelligence, medical robotics, and robot learning.';
  return {
    title,
    description,
    alternates: { canonical: `/${locale}/selected-publications/`, languages: { en: '/en/selected-publications/', 'zh-CN': '/zh/selected-publications/', 'x-default': '/en/selected-publications/' } },
    openGraph: { title, description, locale: zh ? 'zh_CN' : 'en_US', url: `/${locale}/selected-publications/` },
  };
}

export default async function SelectedPublicationsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const labels = getLabels(locale);
  const publications = selectPublications(getPublications(locale));
  const schema = publications.map((publication) => ({
    '@context': 'https://schema.org',
    '@type': 'ScholarlyArticle',
    headline: publication.title,
    description: publication.abstract,
    datePublished: String(publication.year),
    author: publication.authors.map((author) => ({ '@type': 'Person', name: author.name })),
    url: publication.webpage || publication.url || (publication.doi ? `https://doi.org/${publication.doi}` : `https://wanhao-liu.github.io/${locale}/selected-publications/`),
    sameAs: publication.arxivId ? `https://arxiv.org/abs/${publication.arxivId}` : undefined,
  }));
  return <><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema).replaceAll('<', '\\u003c') }} /><div className="page-shell inner-page"><header className="page-title"><h1>{labels.selectedPublications}</h1></header><PublicationList publications={publications} locale={locale} compact /></div></>;
}

