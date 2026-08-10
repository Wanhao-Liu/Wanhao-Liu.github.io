# PRISM Reference Layout Synchronization Design

## Goal

Reshape the bilingual homepage to closely match the structure, density, typography, spacing, and responsive behavior of `https://ntdxyg.github.io/en/`, while preserving Wanhao Liu's verified biography, publications, project resources, author markers, SEO, and static GitHub Pages deployment.

## Reference Fidelity

The homepage will use the reference page's main composition:

- a wide fixed-height navigation bar with serif site name, page links, segmented language control, and theme control;
- a centered three-column desktop grid, with the profile occupying the left column and homepage content occupying the right two columns;
- a sticky profile column containing a square portrait, centered name/title/institution, icon-only contact links, visitor statistics, and a map;
- a compact right-column sequence of About, Research Interests, Recent News, and Selected Publications;
- a single-column mobile layout with the profile above the content.

The implementation will not copy Guang Yang's personal content, metrics, awards, services, or publication categories. It will reuse the visual and interaction system with Wanhao Liu's content.

## Navigation

Desktop navigation will contain:

- About: `/{locale}/`
- Selected Publications: `/{locale}/publications/`
- Projects: `/{locale}/projects/`
- CV: `/cv/Wanhao_Liu_CV.pdf`

The language control remains a two-segment `EN / 中文` control and preserves the equivalent route. The theme control remains icon-only. Mobile navigation collapses behind the existing menu button.

## Profile Column

The left column will contain:

- the existing `/images/LWH.jpg` portrait in a square, softly rounded frame;
- `Wanhao Liu / 刘皖皓`;
- the localized researcher title and current institution;
- icon-only Email, Google Scholar, GitHub, and CV actions with accessible labels and tooltips;
- a Visitors section containing Page Views, a GoatCounter dashboard link, and an OpenStreetMap map.

The GoatCounter script will use the user-provided endpoint:

```html
<script data-goatcounter="https://wanhao.goatcounter.com/count"
        async src="//gc.zgo.at/count.js"></script>
```

The page-view card will request `https://wanhao.goatcounter.com/counter/TOTAL.json`. It will show an em dash while loading and retain that fallback if the endpoint is unavailable.

## Visitor Map

The map will follow the reference implementation:

- Leaflet 1.9.4 loaded only in the browser and only when the map approaches the viewport;
- OpenStreetMap tiles and attribution;
- restrained blue circular markers and reference-style zoom controls;
- a fixed 220 px desktop height with a responsive mobile width;
- a static set of representative geographic markers, because GoatCounter's public total endpoint does not expose individual visitor locations.

The map will degrade to a quiet bordered placeholder if Leaflet or tiles fail. No individual visitor data, cookies, or precise location data will be collected by the site.

## Main Content

The right column will contain:

1. About: concise biography plus a compact timeline combining current research experience and education.
2. Research Interests: existing research areas rendered as compact label-description rows, with a link to Google Scholar.
3. Recent News: existing bilingual news entries in date/content rows.
4. Selected Publications: the existing selected publication data and resources, using the current full-author and collapsed-abstract behavior in a denser reference-style presentation.

The dedicated Publications and Projects routes remain available. They will inherit the synchronized navigation, typography, colors, content width, and control styling without losing search, filters, videos, abstracts, or resource links.

## Visual System

- Display type: Crimson Text or a local serif fallback for the site name and section headings.
- Body type: Inter with existing system fallbacks.
- Light theme: white background, deep navy text, muted blue-gray secondary text, amber accent.
- Dark theme: deep navy background, cool off-white text, muted gray-blue secondary text, amber accent.
- Radius: 8 px or less for controls and content panels; the portrait may use the reference's larger soft radius.
- Motion: limited to subtle entrance and hover transitions, disabled under reduced motion.

The page will avoid decorative cards in the main content. Only visitor metrics, map framing, and repeated publication/project items may use bounded surfaces where functionally useful.

## Responsive Behavior

- At desktop widths, use a `1fr / 2fr` reference-style grid with a sticky left profile.
- At tablet and mobile widths, stack the profile above content and disable sticky positioning.
- The portrait scales down without cropping the face incorrectly.
- Navigation, language control, section headings, timeline rows, publication resources, and visitor cards must not overflow at 390 px width.
- Videos continue to use static posters on mobile and under reduced motion.

## Verification

- Component tests cover visitor-count success/failure, bilingual navigation, and existing publication interactions.
- Content, lint, TypeScript, production build, static export, and dependency audit remain part of `npm run verify`.
- Browser QA compares the reference and local homepage at desktop and mobile widths.
- Browser QA verifies GoatCounter script presence, total-count fallback, Leaflet map rendering, theme/language switching, videos, and zero console errors.
- The work remains on `codex/prism-migration` until the user approves merging to `main`.
