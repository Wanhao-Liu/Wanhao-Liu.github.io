# Academic Service Section Design

## Scope

Add a bilingual Academic Service section to the homepage immediately after Awards. Do not add a navigation item or a separate page. Do not display service years.

## Content

The section contains two groups:

- Journal Reviewing / 期刊审稿
  - IEEE Transactions on Mobile Computing (TMC)
- Conference Reviewing / 会议审稿
  - IEEE/RSJ International Conference on Intelligent Robots and Systems (IROS)
  - International Conference on Autonomous Agents and Multiagent Systems (AAMAS)

Official venue names remain in English in both locales. Only the section and group labels are localized.

## Architecture

Store content in `content/academic-service.toml` and `content_zh/academic-service.toml`, following the existing bilingual Awards pattern. Add typed loading through `siteContent.ts`, pass the data from the localized homepage route, and render it with a focused `AcademicServiceSection` component.

The component uses an unframed, compact two-group list consistent with Awards. A Lucide `Handshake` icon identifies the section. Each venue is a plain list item with no year, badge, description, or external link.

## Verification

Component tests assert the section heading, both group headings, and all three venues. Export verification checks English and Chinese homepage signals and ensures no year is coupled to the service entries. Full verification covers tests, content loading, lint, types, production build, and static export.

