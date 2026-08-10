'use client';

import Image from 'next/image';
import Link from 'next/link';
import { ChevronDown, Code2, ExternalLink, FileText, Globe2 } from 'lucide-react';
import { useEffect, useMemo, useRef, useState } from 'react';
import type { Publication } from '@/types/publication';
import type { Locale } from '@/lib/siteContent';
import { getLabels } from '@/lib/labels';

function PublicationMedia({ publication, eager }: { publication: Publication; eager: boolean }) {
  const [videoEligible, setVideoEligible] = useState(false);
  const [videoVisible, setVideoVisible] = useState(false);
  const [videoFailed, setVideoFailed] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const poster = publication.poster || publication.preview;
  const posterPath = poster ? `/images/${poster}` : undefined;
  const target = publication.webpage || publication.url || (publication.doi ? `https://doi.org/${publication.doi}` : '#');

  useEffect(() => {
    const motion = window.matchMedia('(prefers-reduced-motion: reduce)');
    const mobile = window.matchMedia('(max-width: 720px)');
    const update = () => setVideoEligible(Boolean(publication.video) && !motion.matches && !mobile.matches);
    update();
    motion.addEventListener('change', update);
    mobile.addEventListener('change', update);
    return () => {
      motion.removeEventListener('change', update);
      mobile.removeEventListener('change', update);
    };
  }, [publication.video]);

  useEffect(() => {
    if (!videoEligible || videoFailed || !videoRef.current) return;
    if (!('IntersectionObserver' in window)) {
      const timer = setTimeout(() => setVideoVisible(true), 0);
      return () => clearTimeout(timer);
    }
    const observer = new IntersectionObserver(([entry]) => setVideoVisible(entry.isIntersecting), { rootMargin: '120px' });
    observer.observe(videoRef.current);
    return () => observer.disconnect();
  }, [videoEligible, videoFailed]);

  useEffect(() => {
    if (videoEligible && videoVisible && videoRef.current) {
      videoRef.current.muted = true;
      void videoRef.current.play().catch(() => setVideoFailed(true));
    }
  }, [videoEligible, videoVisible]);

  return (
    <Link href={target} className="publication-media" target="_blank" aria-label={publication.title}>
      {videoEligible && !videoFailed && publication.video ? (
        <video ref={videoRef} loop muted playsInline preload="none" poster={posterPath} aria-label={`${publication.title} preview`} onError={() => setVideoFailed(true)}>
          <source src={publication.video} type="video/mp4" />
        </video>
      ) : posterPath ? (
        <Image src={posterPath} alt={`${publication.title} overview`} fill loading={eager ? 'eager' : 'lazy'} sizes="(max-width: 720px) 100vw, 320px" />
      ) : (
        <span className="media-placeholder">{publication.title}</span>
      )}
    </Link>
  );
}

function Authors({ publication }: { publication: Publication }) {
  return (
    <p className="publication-authors">
      {publication.authors.map((author, index) => (
        <span key={`${publication.id}-${author.name}`}>
          <span className={author.isHighlighted ? 'me' : undefined}>{author.name}</span>
          {author.isCoAuthor && <sup>#</sup>}
          {author.isCorresponding && <sup>*</sup>}
          {index < publication.authors.length - 1 && ', '}
        </span>
      ))}
    </p>
  );
}

export default function PublicationList({ publications, locale, compact = false }: { publications: Publication[]; locale: Locale; compact?: boolean }) {
  const labels = getLabels(locale);
  const [query, setQuery] = useState('');
  const [year, setYear] = useState('all');
  const [type, setType] = useState('all');
  const [topic, setTopic] = useState('all');
  const years = [...new Set(publications.map((publication) => String(publication.year)))].sort().reverse();
  const types = [...new Set(publications.map((publication) => publication.type))].sort();
  const topics = [...new Set(publications.flatMap((publication) => publication.tags))].sort();

  const visible = useMemo(() => publications.filter((publication) => {
    const haystack = [publication.title, publication.journal, publication.conference, ...publication.authors.map((author) => author.name)].join(' ').toLowerCase();
    return (!query || haystack.includes(query.toLowerCase()))
      && (year === 'all' || String(publication.year) === year)
      && (type === 'all' || publication.type === type)
      && (topic === 'all' || publication.tags.includes(topic));
  }), [publications, query, year, type, topic]);

  return (
    <div>
      {!compact && (
        <div className="publication-tools">
          <label className="search-field">
            <span className="sr-only">{labels.search}</span>
            <input type="search" value={query} onChange={(event) => setQuery(event.target.value)} placeholder={labels.search} />
          </label>
          <select aria-label={labels.allYears} value={year} onChange={(event) => setYear(event.target.value)}>
            <option value="all">{labels.allYears}</option>
            {years.map((item) => <option key={item} value={item}>{item}</option>)}
          </select>
          <select aria-label={labels.allTypes} value={type} onChange={(event) => setType(event.target.value)}>
            <option value="all">{labels.allTypes}</option>
            {types.map((item) => <option key={item} value={item}>{item}</option>)}
          </select>
          <select aria-label={labels.allTopics} value={topic} onChange={(event) => setTopic(event.target.value)}>
            <option value="all">{labels.allTopics}</option>
            {topics.map((item) => <option key={item} value={item}>{item}</option>)}
          </select>
        </div>
      )}

      <p className="author-legend"><sup>#</sup> {labels.equal}; <sup>*</sup> {labels.corresponding}.</p>

      <div className="publication-list">
        {visible.map((publication, index) => {
          const titleUrl = publication.webpage || publication.url || (publication.doi ? `https://doi.org/${publication.doi}` : '#');
          const venue = publication.conference || publication.journal;
          const showDoi = publication.doi && !publication.pdfUrl?.includes(publication.doi);
          return (
            <article className="publication-row" key={publication.id}>
              <PublicationMedia publication={publication} eager={index === 0} />
              <div className="publication-copy">
                <h3><Link href={titleUrl} target="_blank">{publication.title}</Link></h3>
                <Authors publication={publication} />
                <p className="publication-venue">{venue} · {publication.year}{publication.description ? <strong> · {publication.description}</strong> : null}</p>
                <div className="resource-links">
                  {publication.webpage && <Link href={publication.webpage} target="_blank"><Globe2 size={14} />{labels.webpage}</Link>}
                  {publication.pdfUrl && <Link href={publication.pdfUrl} target="_blank"><FileText size={14} />{labels.pdf}</Link>}
                  {publication.arxivId && <Link href={`https://arxiv.org/abs/${publication.arxivId}`} target="_blank"><ExternalLink size={14} />{labels.arxiv}</Link>}
                  {publication.code && <Link href={publication.code} target="_blank"><Code2 size={14} />{labels.code}</Link>}
                  {showDoi && <Link href={`https://doi.org/${publication.doi}`} target="_blank"><ExternalLink size={14} />{labels.doi}</Link>}
                </div>
                {publication.abstract && (
                  <details className="abstract-details">
                    <summary>{labels.abstract}<ChevronDown size={15} /></summary>
                    <p>{publication.abstract}</p>
                  </details>
                )}
              </div>
            </article>
          );
        })}
      </div>
      {!visible.length && <p className="empty-state">{labels.noResults}</p>}
    </div>
  );
}
