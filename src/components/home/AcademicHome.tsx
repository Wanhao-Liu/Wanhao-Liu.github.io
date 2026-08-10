import Link from 'next/link';
import { BookOpen, Microscope, Newspaper, UserRound } from 'lucide-react';
import type { Locale, AboutContent, NewsItem } from '@/lib/siteContent';
import type { Publication } from '@/types/publication';
import { getLabels } from '@/lib/labels';
import PublicationList from '@/components/publications/PublicationList';
import ProfileSidebar from '@/components/home/ProfileSidebar';

export default function AcademicHome({ locale, about, news, publications }: { locale: Locale; about: AboutContent; news: NewsItem[]; publications: Publication[] }) {
  const labels = getLabels(locale);
  const zh = locale === 'zh';
  const researchThemes = zh ? [
    ['具身智能与机器人学习', '视觉-语言-动作模型、世界动作模型与视觉运动控制'],
    ['医疗机器人', '手术视频预测、具身内窥镜导航与机器人辅助介入'],
    ['鲁棒自主系统', '多智能体强化学习、无人机协同与容错控制'],
  ] : [
    ['Embodied Intelligence and Robot Learning', 'Vision-Language-Action models, world-action models, and visuomotor control'],
    ['Medical Robotics', 'Surgical video prediction, grounded endoscopic navigation, and robot-assisted intervention'],
    ['Robust Autonomous Systems', 'Multi-agent reinforcement learning, UAV coordination, and fault-tolerant control'],
  ];
  const timeline = [
    ...about.experience.map((item) => ({ period: item.period, institution: item.institution, role: item.role ?? item.detail })),
    ...about.education.map((item) => ({ period: item.period, institution: item.institution, role: item.degree ?? item.detail })),
  ];

  return (
    <div className="home-shell">
      <div className="home-grid">
        <ProfileSidebar locale={locale} />
        <div className="home-content">
          <section id="about" className="home-section">
            <h2><UserRound />{labels.about}</h2>
            <div className="about-copy"><p>{about.intro}</p><p>{about.research}</p></div>
            <ol className="compact-timeline">
              {timeline.map((item) => <li key={`${item.institution}-${item.period}`}><span className="timeline-dot" /><time>{item.period}</time><strong>{item.institution}</strong><span>{item.role}</span></li>)}
            </ol>
          </section>

          <section id="research" className="home-section">
            <div className="home-section-heading"><h2><Microscope />{labels.researchInterests}</h2><Link href="https://scholar.google.com/citations?hl=en&user=zaRHAjgAAAAJ" target="_blank">{zh ? '查看详情 →' : 'View Details →'}</Link></div>
            <ul className="research-theme-list">{researchThemes.map(([title, description]) => <li key={title}><strong>{title}</strong><span> — {description}</span></li>)}</ul>
          </section>

          <section id="news" className="home-section">
            <h2><Newspaper />{labels.news}</h2>
            <div className="news-list">{news.map((item) => <div key={`${item.date}-${item.content}`}><time>{item.date}</time><p>{item.content}</p></div>)}</div>
          </section>

          <section id="selected-publications" className="home-section home-publications">
            <div className="home-section-heading"><h2><BookOpen />{labels.selectedPublications}</h2><Link href={`/${locale}/publications/`}>{labels.viewAll}</Link></div>
            <PublicationList publications={publications.filter((publication) => publication.selected)} locale={locale} compact />
          </section>
        </div>
      </div>
    </div>
  );
}
