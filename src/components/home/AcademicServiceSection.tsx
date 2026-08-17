import { Handshake } from 'lucide-react';
import { getLabels } from '@/lib/labels';
import type { AcademicServiceContent, AcademicServiceItem, Locale } from '@/lib/siteContent';

function ServiceGroup({ title, items }: { title: string; items: AcademicServiceItem[] }) {
  return (
    <section className="service-group">
      <h3>{title}</h3>
      <ul className="service-list">
        {items.map((item) => <li key={item.name}>{item.name}</li>)}
      </ul>
    </section>
  );
}

export default function AcademicServiceSection({ locale, service }: { locale: Locale; service: AcademicServiceContent }) {
  const labels = getLabels(locale);
  return (
    <section id="academic-service" className="home-section home-academic-service">
      <h2><Handshake />{labels.academicService}</h2>
      <div className="service-groups">
        <ServiceGroup title={labels.journalReviewing} items={service.journals} />
        <ServiceGroup title={labels.conferenceReviewing} items={service.conferences} />
      </div>
    </section>
  );
}

