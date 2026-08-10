# PRISM Reference Layout Synchronization Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Rebuild the bilingual homepage as a close structural and visual match to the supplied PRISM reference, including GoatCounter page views and a Leaflet/OpenStreetMap visitor map.

**Architecture:** Keep the existing Next.js static-export routes and structured content. Split the homepage into a server-rendered content column plus small client-side `ProfileSidebar`, `VisitorPanel`, and `VisitorMap` components; external analytics and map scripts load progressively and fail without breaking static content.

**Tech Stack:** Next.js 16 static export, React 19, TypeScript, CSS/Tailwind 4, Vitest/Testing Library, lucide-react, GoatCounter, Leaflet 1.9.4, OpenStreetMap.

---

### Task 1: Lock Homepage Structure With Tests

**Files:**
- Create: `src/components/home/__tests__/AcademicHome.test.tsx`
- Modify: `src/components/home/AcademicHome.tsx`

- [ ] **Step 1: Write a failing test for the reference layout**

Render `AcademicHome` with minimal bilingual content and assert a `home-grid`, a complementary profile sidebar, About, Research Interests, Recent News, and Selected Publications headings.

- [ ] **Step 2: Run the test and verify RED**

Run: `npm.cmd test -- src/components/home/__tests__/AcademicHome.test.tsx`

Expected: FAIL because the current homepage has no `home-grid` or profile sidebar landmark.

- [ ] **Step 3: Implement the server-rendered layout**

Replace the current full-width section sequence with:

```tsx
<div className="home-shell">
  <div className="home-grid">
    <ProfileSidebar locale={locale} />
    <div className="home-content">
      <section id="about">...</section>
      <section id="research">...</section>
      <section id="news">...</section>
      <section id="selected-publications">...</section>
    </div>
  </div>
</div>
```

Combine experience and education into compact timeline rows. Render three verified research themes with localized descriptions derived from existing biography content.

- [ ] **Step 4: Run the test and verify GREEN**

Run: `npm.cmd test -- src/components/home/__tests__/AcademicHome.test.tsx`

Expected: PASS.

### Task 2: Build Visitor Analytics And Map

**Files:**
- Create: `src/components/home/ProfileSidebar.tsx`
- Create: `src/components/home/VisitorPanel.tsx`
- Create: `src/components/home/VisitorMap.tsx`
- Create: `src/components/home/__tests__/VisitorPanel.test.tsx`
- Modify: `src/app/layout.tsx`

- [ ] **Step 1: Write failing visitor-count tests**

Mock `fetch` and assert that `VisitorPanel` initially renders `—`, formats `{ count: '1234' }` as `1,234`, links to `https://wanhao.goatcounter.com`, and retains `—` on rejection.

- [ ] **Step 2: Run the tests and verify RED**

Run: `npm.cmd test -- src/components/home/__tests__/VisitorPanel.test.tsx`

Expected: FAIL because the component does not exist.

- [ ] **Step 3: Implement the client components**

`VisitorPanel` requests:

```ts
fetch('https://wanhao.goatcounter.com/counter/TOTAL.json', { signal })
```

`VisitorMap` uses `IntersectionObserver`, dynamically loads Leaflet CSS/JS from `unpkg.com`, renders OSM tiles, adds restrained circle markers, and exposes a bordered fallback before/if the map loads.

`ProfileSidebar` renders the square portrait, localized name/title/institution, icon-only Email/Scholar/GitHub/CV links, and `VisitorPanel`.

- [ ] **Step 4: Add GoatCounter to the root layout**

Add exactly one async script with:

```tsx
<script data-goatcounter="https://wanhao.goatcounter.com/count" async src="https://gc.zgo.at/count.js" />
```

- [ ] **Step 5: Run visitor tests and verify GREEN**

Run: `npm.cmd test -- src/components/home/__tests__/VisitorPanel.test.tsx`

Expected: PASS with success and failure cases.

### Task 3: Synchronize Navigation And Visual System

**Files:**
- Modify: `src/components/layout/SiteHeader.tsx`
- Modify: `src/components/layout/__tests__/SiteHeader.test.tsx`
- Modify: `src/lib/labels.ts`
- Modify: `src/app/globals.css`

- [ ] **Step 1: Extend the existing header test and verify RED**

Assert the English header exposes `Selected Publications`, a segmented language control, and the existing theme/menu controls.

- [ ] **Step 2: Implement the navigation mapping**

Use About, Selected Publications, Projects, and CV with active rounded background styling. Keep equivalent-route language persistence and mobile menu behavior.

- [ ] **Step 3: Replace layout tokens and CSS**

Implement reference-scale tokens and layout:

```css
:root {
  --bg: #ffffff;
  --text: #172033;
  --muted: #65748b;
  --accent: #d8a34f;
  --line: #e3e8ef;
}
.home-grid { display: grid; grid-template-columns: minmax(250px, 1fr) minmax(0, 2fr); gap: 3rem; }
```

Use Crimson Text/Georgia for headings and Inter/system sans for body. Match reference header height, `max-width: 72rem`, section rhythm, compact timeline, sticky sidebar, visitor cards, map, dark mode, mobile stack, focus visibility, and reduced-motion rules.

- [ ] **Step 4: Run header and homepage tests**

Run: `npm.cmd test -- src/components/layout/__tests__/SiteHeader.test.tsx src/components/home/__tests__/AcademicHome.test.tsx`

Expected: PASS.

### Task 4: Preserve Publication And Project Functionality

**Files:**
- Modify: `src/components/publications/PublicationList.tsx`
- Modify: `src/components/projects/ProjectList.tsx`
- Modify: `src/app/globals.css`
- Modify: `scripts/verify-export.mjs`

- [ ] **Step 1: Add export assertions and verify RED**

Require the exported English homepage to include the GoatCounter endpoint, Visitors heading, About/Selected Publications anchors, and the visitor map container.

- [ ] **Step 2: Adapt compact publication styling**

Keep complete authors, resource links, collapsed abstracts, search/filters, official videos, mobile posters, and playback fallback. Only adjust density, colors, and media dimensions to the synchronized visual system.

- [ ] **Step 3: Adapt project styling**

Keep all current project content and links while applying the shared reference page width, headings, spacing, and restrained borders.

- [ ] **Step 4: Build and verify export GREEN**

Run: `npm.cmd run build` then `npm.cmd run verify:export`.

Expected: PASS for all bilingual routes, GoatCounter, visitor map, SEO, publications, and CV.

### Task 5: Visual QA, Review, Commit, And Push

**Files:**
- Modify as required by verified browser findings only.

- [ ] **Step 1: Run full verification**

Run: `npm.cmd run verify` and `npm.cmd audit --omit=dev --audit-level=high`.

Expected: all tests/content/lint/typecheck/build/export checks pass and production audit reports zero high-severity vulnerabilities.

- [ ] **Step 2: Compare desktop screenshots**

At 1440x900, compare `http://127.0.0.1:3000/en/` to `https://ntdxyg.github.io/en/`. Verify header alignment, one-third/two-thirds grid, sticky profile, section density, typography, visitor cards, and map.

- [ ] **Step 3: Verify mobile and interactions**

At 390x844, verify no overflow; profile/content stack; language and theme work; abstracts start collapsed; videos use posters; visitor count failure does not shift layout; and console contains no errors.

- [ ] **Step 4: Request independent code review**

Review the worktree diff against `48440ba` using the approved design and this plan. Fix all critical and important findings.

- [ ] **Step 5: Commit and push**

Run:

```powershell
git add -A
git diff --cached --check
git commit -m "feat: synchronize homepage with PRISM reference"
git push origin codex/prism-migration
```

Do not merge to `main` without explicit approval.
