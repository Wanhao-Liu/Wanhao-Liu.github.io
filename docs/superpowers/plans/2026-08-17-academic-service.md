# Academic Service Section Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add a bilingual, year-free Academic Service section after Awards with separate journal and conference reviewing groups.

**Architecture:** Reuse the homepage's TOML-driven content pattern. Add typed service data, a focused presentational component, route-level loading, minimal CSS, and regression assertions without changing navigation or adding a route.

**Tech Stack:** Next.js 16, React, TypeScript, TOML content, Vitest, Testing Library, static export verification

---

### Task 1: Add Failing Homepage Tests

**Files:**
- Modify: `src/components/home/__tests__/AcademicHome.test.tsx`
- Modify: `scripts/verify-export.mjs`

- [ ] **Step 1: Define the expected component contract**

Add an `academicService` fixture with `journals` containing TMC and `conferences` containing IROS and AAMAS. Pass it to `AcademicHome` and assert the headings `Academic Service`, `Journal Reviewing`, and `Conference Reviewing`, plus all three venue names.

- [ ] **Step 2: Define the expected export contract**

Require the English homepage to contain `Academic Service`, `Journal Reviewing`, `Conference Reviewing`, TMC, IROS, and AAMAS. Require the Chinese homepage to contain `学术服务`, `期刊审稿`, and `会议审稿`.

- [ ] **Step 3: Run RED**

Run: `npm.cmd test -- src/components/home/__tests__/AcademicHome.test.tsx`

Expected: FAIL because `AcademicHome` does not accept or render `academicService`.

### Task 2: Implement Bilingual Academic Service

**Files:**
- Create: `content/academic-service.toml`
- Create: `content_zh/academic-service.toml`
- Create: `src/components/home/AcademicServiceSection.tsx`
- Modify: `src/lib/siteContent.ts`
- Modify: `src/lib/labels.ts`
- Modify: `src/components/home/AcademicHome.tsx`
- Modify: `src/app/[locale]/page.tsx`
- Modify: `src/app/globals.css`

- [ ] **Step 1: Add structured content**

Create TOML arrays named `journals` and `conferences`. Each item has only a `name` field; no year field is allowed.

- [ ] **Step 2: Add typed loading**

Define `AcademicServiceItem`, `AcademicServiceContent`, and `getAcademicService(locale)` in `siteContent.ts`, mirroring the existing Awards loader and throwing when localized content is missing.

- [ ] **Step 3: Add localized labels**

Add `academicService`, `journalReviewing`, and `conferenceReviewing` labels for English and Chinese.

- [ ] **Step 4: Render the section**

Create `AcademicServiceSection` with a `Handshake` icon, two semantic groups, and plain venue list items. Pass loaded data through the localized homepage route and render the component after `AwardsSection`.

- [ ] **Step 5: Add compact styling**

Add unframed group and list styles that match Awards typography and spacing. Keep stable widths and allow long venue names to wrap naturally on mobile.

- [ ] **Step 6: Run GREEN**

Run: `npm.cmd test -- src/components/home/__tests__/AcademicHome.test.tsx`

Expected: the focused test file passes.

### Task 3: Verify And Deploy

**Files:**
- Verify: `out/en/index.html`
- Verify: `out/zh/index.html`

- [ ] **Step 1: Run full verification**

Run: `npm.cmd run verify`

Expected: tests, content validation, lint, typecheck, production build, and export verification all pass.

- [ ] **Step 2: Inspect repository state**

Run: `git diff --check`

Expected: no whitespace errors.

Run: `git status --short`

Expected: only academic-service content, component, loader, labels, homepage wiring, styles, tests, and documentation are changed.

- [ ] **Step 3: Commit and push**

Run: `git add content/academic-service.toml content_zh/academic-service.toml src/components/home/AcademicServiceSection.tsx src/components/home/AcademicHome.tsx src/components/home/__tests__/AcademicHome.test.tsx src/app/[locale]/page.tsx src/app/globals.css src/lib/siteContent.ts src/lib/labels.ts scripts/verify-export.mjs docs/superpowers/specs/2026-08-17-academic-service-design.md docs/superpowers/plans/2026-08-17-academic-service.md`

Run: `git commit -m "feat: add academic service section"`

Run: `git push origin main`

- [ ] **Step 4: Verify deployed pages**

Open `/en/` and `/zh/`. Confirm the section follows Awards, contains one journal and two conferences, shows no years, wraps correctly on mobile, and produces no console errors.

