# PRISM Bilingual Homepage Migration Design

## Goal

Refactor the existing `Wanhao-Liu/Wanhao-Liu.github.io` repository into a bilingual PRISM-based academic homepage while preserving the root domain, Git history, publication metadata, media, CV, and search visibility.

## Product Scope

The site serves research collaborators, prospective supervisors, students, and academic recruiters. Its primary job is to make Wanhao Liu's research profile and publications easy to scan and verify.

The visible navigation is limited to About, Publications, Projects, CV, language, and theme controls. The homepage contains profile details, a short biography, research interests, education and experience, recent news, and selected publications. Teaching, blog, gallery, visitor map, counters, and decorative marketing sections are excluded.

## Routes

- `/` is a lightweight locale entry with crawlable links and an English fallback.
- `/en/` and `/zh/` are the localized homepages.
- `/en/publications/` and `/zh/publications/` provide searchable publication lists.
- `/en/projects/` and `/zh/projects/` contain only substantive projects.
- CV navigation opens the current PDF from `/cv/`.

## Content Model

English content lives in `content/`; Chinese content lives in `content_zh/`. Publication titles, venue names, author names, and official resource labels remain in their source language. Biography, research interests, news, project descriptions, navigation, filters, and interface labels are localized.

Publications retain complete author lists. `#` marks equal contribution and `*` marks corresponding authors, with a visible legend. Each item may expose webpage, PDF, arXiv, code, and DOI resources only when verified. Abstracts are collapsed by default.

## Publication Media

Surg-UniWorld and CrossScope use their official project-page videos. Other publications use pipeline or method-overview images extracted from their papers when available. All previews share one aspect ratio and stable dimensions. Video is muted, looping, inline, and lazy-loaded; reduced-motion and mobile conditions receive a poster image fallback.

## Visual Direction

Follow PRISM and the supplied reference closely: quiet academic typography, compact navigation, white and near-black surfaces, restrained cool blue links, fine neutral dividers, and no decorative gradients or floating cards. The distinctive element is the publication media rail, where method figures and project videos use one consistent frame without overwhelming the research text.

## SEO And Accessibility

Every localized page provides canonical and alternate-language metadata. The site emits bilingual sitemap entries, robots rules, Open Graph metadata, and Person/ScholarlyArticle structured data. Keyboard focus, semantic headings, media alternatives, reduced motion, contrast, and responsive layout are required.

## Deployment And Rollback

Next.js uses static export with no repository subpath. GitHub Actions builds and deploys `out/` to GitHub Pages. The `pre-prism-migration` tag and previous commit remain the rollback point. The current production source is not removed until the new build passes local and deployed checks.
