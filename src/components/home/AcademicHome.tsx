import Image from 'next/image';
import Link from 'next/link';
import { Github, GraduationCap, Mail } from 'lucide-react';
import type { Locale, AboutContent, NewsItem } from '@/lib/siteContent';
import type { Publication } from '@/types/publication';
import { getLabels } from '@/lib/labels';
import PublicationList from '@/components/publications/PublicationList';

export default function AcademicHome({ locale, about, news, publications }: { locale: Locale; about: AboutContent; news: NewsItem[]; publications: Publication[] }) {
  const labels = getLabels(locale);
  return (
    <div className="page-shell">
      <section className="profile-section">
        <div className="portrait-wrap">
          <Image src="/images/LWH.jpg" alt="Wanhao Liu" fill priority sizes="220px" />
        </div>
        <div className="profile-copy">
          <p className="role">Robotics Researcher · 机器人研究者</p>
          <h1>Wanhao Liu <span>刘皖皓</span></h1>
          <p>{about.intro}</p>
          <p>{about.research}</p>
          <div className="profile-links">
            <Link href="mailto:liuwanhao@mails.gdut.edu.cn"><Mail size={15} />Email</Link>
            <Link href="https://scholar.google.com/citations?hl=en&user=zaRHAjgAAAAJ" target="_blank"><GraduationCap size={15} />Google Scholar</Link>
            <Link href="https://github.com/Wanhao-Liu" target="_blank"><Github size={15} />GitHub</Link>
          </div>
        </div>
      </section>

      <section className="content-section">
        <h2>{labels.researchInterests}</h2>
        <ul className="interest-list">{about.interests.map((interest) => <li key={interest}>{interest}</li>)}</ul>
      </section>

      <section className="content-section timeline-grid">
        <div>
          <h2>{labels.education}</h2>
          {about.education.map((item) => (
            <div className="timeline-item" key={`${item.institution}-${item.period}`}>
              <div><strong>{item.institution}</strong><span>{item.period}</span></div>
              <p>{item.degree}</p><small>{item.detail}</small>
            </div>
          ))}
        </div>
        <div>
          <h2>{labels.experience}</h2>
          {about.experience.map((item) => (
            <div className="timeline-item" key={`${item.institution}-${item.period}`}>
              <div><strong>{item.role}, {item.institution}</strong><span>{item.period}</span></div>
              <p>{item.detail}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="content-section">
        <h2>{labels.news}</h2>
        <div className="news-list">{news.map((item) => <div key={`${item.date}-${item.content}`}><time>{item.date}</time><p>{item.content}</p></div>)}</div>
      </section>

      <section className="content-section publications-section">
        <div className="section-heading-row"><h2>{labels.selectedPublications}</h2><Link href={`/${locale}/publications/`}>{labels.viewAll}</Link></div>
        <PublicationList publications={publications.filter((publication) => publication.selected)} locale={locale} compact />
      </section>
    </div>
  );
}
