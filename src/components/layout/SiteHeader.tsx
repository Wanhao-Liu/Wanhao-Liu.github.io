'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X } from 'lucide-react';
import { useState } from 'react';
import type { Locale } from '@/lib/siteContent';
import { getLabels } from '@/lib/labels';
import ThemeButton from '@/components/ui/ThemeButton';

export default function SiteHeader({ locale }: { locale: Locale }) {
  const pathname = usePathname();
  const labels = getLabels(locale);
  const [open, setOpen] = useState(false);
  const localePath = (targetLocale: Locale) => pathname.replace(/^\/(en|zh)(?=\/|$)/, `/${targetLocale}`) || `/${targetLocale}/`;
  const persistLocale = (targetLocale: Locale) => () => localStorage.setItem('locale', targetLocale);
  const links = [
    { href: `/${locale}/`, label: labels.about },
    { href: `/${locale}/selected-publications/`, label: labels.selectedPublications },
    { href: `/${locale}/publications/`, label: labels.publications },
    { href: `/${locale}/projects/`, label: labels.projects },
    { href: '/cv/Wanhao_Liu_CV.pdf', label: labels.cv, external: true },
  ];
  const localeSwitch = (
    <div className="locale-switch" aria-label={labels.language}>
      <Link href={localePath('en')} className={locale === 'en' ? 'active' : undefined} aria-current={locale === 'en' ? 'page' : undefined} aria-label={locale === 'zh' ? labels.switchToEnglish : undefined} onClick={persistLocale('en')}>EN</Link>
      <Link href={localePath('zh')} className={locale === 'zh' ? 'active' : undefined} aria-current={locale === 'zh' ? 'page' : undefined} aria-label={locale === 'en' ? labels.switchToChinese : undefined} onClick={persistLocale('zh')}>中文</Link>
    </div>
  );

  return (
    <header className="site-header">
      <div className="header-inner">
        <Link href={`/${locale}/`} className="site-name" onClick={() => setOpen(false)}>
          {locale === 'zh' ? '刘皖皓' : 'Wanhao Liu'}
        </Link>
        <nav className="desktop-nav" aria-label={labels.primaryNavigation}>
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={pathname === link.href ? 'active' : undefined}
              target={link.external ? '_blank' : undefined}
            >
              {link.label}
            </Link>
          ))}
          <div className="nav-controls">{localeSwitch}<ThemeButton label={labels.theme} /></div>
        </nav>
        <div className="mobile-actions">
          {localeSwitch}
          <ThemeButton label={labels.theme} />
          <button className="icon-button" onClick={() => setOpen((value) => !value)} aria-label={open ? labels.closeMenu : labels.menu} aria-expanded={open}>
            {open ? <X size={19} /> : <Menu size={19} />}
          </button>
        </div>
      </div>
      {open && (
        <nav className="mobile-nav" aria-label={labels.mobileNavigation}>
          {links.map((link) => (
            <Link key={link.href} href={link.href} onClick={() => setOpen(false)} target={link.external ? '_blank' : undefined}>
              {link.label}
            </Link>
          ))}
        </nav>
      )}
    </header>
  );
}
