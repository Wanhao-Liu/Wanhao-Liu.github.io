# PRISM Bilingual Homepage Migration Plan

## 1. Protect The Existing Site

- Tag the current production commit as `pre-prism-migration`.
- Create and work on `codex/prism-migration`.
- Run the existing PowerShell verification script and record the clean baseline.

## 2. Establish The Application Skeleton

- Import only the PRISM application structure needed for a static academic site.
- Configure Next.js static export, trailing slashes, TypeScript, Tailwind, and Node 22+.
- Add test, lint, type-check, build, and content-validation scripts.
- Write route and content-schema tests before implementing their production modules.

## 3. Build Bilingual Routing

- Generate `/en/` and `/zh/` route families with English as the fallback.
- Add a crawlable root locale entry and persistent language switcher.
- Keep users on the equivalent route when changing language.
- Add localized navigation, filter, resource, and accessibility labels.

## 4. Migrate Content

- Convert profile, biography, interests, education, experience, news, projects, and contact details into structured content files.
- Use the latest available CV and current homepage as sources, preserving only verifiable content.
- Copy maintained images and PDFs into `public/` with stable filenames.
- Remove legacy generated files only after the new equivalents exist.

## 5. Migrate Publications

- Convert all visible publications into structured BibTeX/data records.
- Preserve full author lists and verify equal-contribution/corresponding-author markers against PDFs.
- Record abstract, venue, year, selected status, tags, and each verified resource URL.
- Add content validation for missing previews, invalid author markers, and unsupported resource fields.

## 6. Implement Publication Presentation

- Write component tests for collapsed abstracts, conditional resource links, author markers, and media fallback.
- Implement the compact two-column publication row and mobile single-column layout.
- Add official project video previews for Surg-UniWorld and CrossScope.
- Use consistent pipeline overview images for all remaining papers.
- Add publication search and year/type/tag filters without decorative controls.

## 7. Match The Reference Visual System

- Implement compact header, disciplined typography, neutral surfaces, restrained links, and thin separators.
- Match content density and section rhythm to the supplied PRISM example.
- Support dark mode, visible focus, reduced motion, and responsive layouts.
- Review desktop and mobile screenshots and remove any unnecessary visual element.

## 8. SEO And Static Output

- Add canonical, hreflang, x-default, Open Graph, and structured data metadata.
- Generate bilingual sitemap and robots files using the root domain.
- Ensure static-export deep routes and assets work on GitHub Pages.

## 9. Deployment

- Add a GitHub Actions workflow using Node 22, dependency caching, tests, build, and Pages deployment.
- Verify the generated `out/` artifact locally before push.
- Push the migration branch, review the deployed result, then merge/cut over only after approval.

## 10. Acceptance Checks

- Run unit/component tests, content validation, lint, type-check, and production build.
- Check all localized routes, internal links, images, videos, CV, and publication resources.
- Verify desktop/mobile layout, keyboard operation, reduced motion, and theme/language persistence.
- Confirm root and key deployed URLs return 200 and metadata uses `https://wanhao-liu.github.io/`.
- Compare the final result line-by-line against the approved scope and retain the rollback tag.
