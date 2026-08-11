import { Trophy } from 'lucide-react';
import { getLabels } from '@/lib/labels';
import type { AwardItem, AwardsContent, Locale } from '@/lib/siteContent';

function AwardGroup({ title, items }: { title: string; items: AwardItem[] }) {
  return (
    <section className="awards-group">
      <h3>{title}</h3>
      <ul className="awards-list">
        {items.map((award) => (
          <li key={`${award.title}-${award.period}`}>
            <time>{award.period}</time>
            <div>
              <strong>{award.title}</strong>
              <span>{award.organization}</span>
              {award.detail && <small>{award.detail}</small>}
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}

export default function AwardsSection({ locale, awards }: { locale: Locale; awards: AwardsContent }) {
  const labels = getLabels(locale);
  return (
    <section id="awards" className="home-section home-awards">
      <h2><Trophy />{labels.awards}</h2>
      <div className="awards-groups">
        <AwardGroup title={labels.academicHonors} items={awards.academic} />
        <AwardGroup title={labels.competitions} items={awards.competitions} />
      </div>
    </section>
  );
}

