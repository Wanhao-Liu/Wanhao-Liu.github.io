import Image from 'next/image';
import Link from 'next/link';
import { ExternalLink } from 'lucide-react';
import type { Locale, ProjectItem } from '@/lib/siteContent';
import { getLabels } from '@/lib/labels';

export default function ProjectList({ locale, projects }: { locale: Locale; projects: ProjectItem[] }) {
  const labels = getLabels(locale);
  return (
    <div className="project-list">
      {projects.map((project) => (
        <article className="project-row" key={project.title}>
          <Link href={project.url} target="_blank" className="project-image">
            <Image src={project.image} alt={project.title} fill sizes="(max-width: 720px) 100vw, 320px" />
          </Link>
          <div>
            <p className="project-period">{project.period}</p>
            <h2><Link href={project.url} target="_blank">{project.title}</Link></h2>
            <strong className="project-award">{project.award}</strong>
            <p>{project.description}</p>
            <Link href={project.url} target="_blank" className="inline-command">{labels.projectCode}<ExternalLink size={14} /></Link>
          </div>
        </article>
      ))}
    </div>
  );
}
