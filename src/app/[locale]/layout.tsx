import { notFound } from 'next/navigation';
import SiteHeader from '@/components/layout/SiteHeader';
import SiteFooter from '@/components/layout/SiteFooter';
import { isLocale, locales } from '@/lib/siteContent';

export const dynamicParams = false;

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({ children, params }: { children: React.ReactNode; params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const documentLanguage = locale === 'zh' ? 'zh-CN' : 'en';
  return <><script dangerouslySetInnerHTML={{ __html: `document.documentElement.lang=${JSON.stringify(documentLanguage)}` }} /><SiteHeader locale={locale} /><main>{children}</main><SiteFooter locale={locale} /></>;
}
