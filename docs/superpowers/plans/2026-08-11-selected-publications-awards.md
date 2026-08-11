# Selected Publications and Awards Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Create bilingual Selected Publications pages and replace the homepage publication list with localized Awards.

**Architecture:** Store awards in locale-specific TOML files loaded through `siteContent.ts`. Reuse `PublicationList` on a new selected-publications route and keep the existing complete publications route and source data unchanged.

**Tech Stack:** Next.js 16 static export, React 19, TypeScript, TOML, Vitest, Testing Library

---

### Task 1: Lock homepage and navigation behavior

**Files:**
- Modify: `src/components/home/__tests__/AcademicHome.test.tsx`
- Modify: `src/components/layout/__tests__/SiteHeader.test.tsx`

- [ ] Require grouped Awards with five CV entries and no homepage Selected Publications section.
- [ ] Require distinct Selected Publications and Publications navigation links.
- [ ] Run both focused test files and confirm they fail against the current homepage and navigation.

### Task 2: Implement Awards content and homepage section

**Files:**
- Create: `content/awards.toml`
- Create: `content_zh/awards.toml`
- Create: `src/components/home/AwardsSection.tsx`
- Modify: `src/lib/siteContent.ts`
- Modify: `src/lib/labels.ts`
- Modify: `src/components/home/AcademicHome.tsx`
- Modify: `src/app/[locale]/page.tsx`
- Modify: `src/app/globals.css`

- [ ] Define localized academic and competition award records.
- [ ] Add typed award loading and labels.
- [ ] Replace homepage publication rendering with the Awards section.
- [ ] Run the homepage test and confirm it passes.

### Task 3: Add independent Selected Publications pages

**Files:**
- Create: `src/lib/selectedPublications.ts`
- Create: `src/app/[locale]/selected-publications/page.tsx`
- Modify: `src/components/layout/SiteHeader.tsx`
- Modify: `src/app/sitemap.ts`

- [ ] Centralize the four-item selection and ordering.
- [ ] Add bilingual static pages, metadata, canonical URLs, and ScholarlyArticle schema.
- [ ] Add the selected route before the complete Publications route in desktop and mobile navigation.
- [ ] Add both selected routes to the sitemap.

### Task 4: Strengthen export verification and deploy

**Files:**
- Modify: `scripts/verify-export.mjs`

- [ ] Require 11 routes and verify Awards on both homepages.
- [ ] Verify the selected page contains four ordered works and excludes NCGR.
- [ ] Verify the complete page still contains all eight works and NCGR.
- [ ] Run `npm.cmd run verify` and `git diff --check`.
- [ ] Commit, push `main`, wait for GitHub Pages, and verify all six bilingual page URLs return 200.

