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
  const otherLocale = locale === 'en' ? 'zh' : 'en';
  const alternatePath = pathname.replace(/^\/(en|zh)(?=\/|$)/, `/${otherLocale}`);
  const persistLocale = () => localStorage.setItem('locale', otherLocale);
  const links = [
    { href: `/${locale}/`, label: labels.about },
    { href: `/${locale}/publications/`, label: labels.publications },
    { href: `/${locale}/projects/`, label: labels.projects },
    { href: '/cv/Wanhao_Liu_CV.pdf', label: labels.cv, external: true },
  ];

  return (
    <header className="site-header">
      <div className="header-inner">
        <Link href={`/${locale}/`} className="site-name" onClick={() => setOpen(false)}>
          Wanhao Liu <span>刘皖皓</span>
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
          <Link href={alternatePath || `/${otherLocale}/`} aria-label={labels.language} className="language-link" onClick={persistLocale}>
            {otherLocale === 'zh' ? '中文' : 'EN'}
          </Link>
          <ThemeButton label={labels.theme} />
        </nav>
        <div className="mobile-actions">
          <Link href={alternatePath || `/${otherLocale}/`} aria-label={labels.language} className="language-link" onClick={persistLocale}>
            {otherLocale === 'zh' ? '中文' : 'EN'}
          </Link>
          <ThemeButton label={labels.theme} />
          <button className="icon-button" onClick={() => setOpen((value) => !value)} aria-label={labels.menu} aria-expanded={open}>
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
