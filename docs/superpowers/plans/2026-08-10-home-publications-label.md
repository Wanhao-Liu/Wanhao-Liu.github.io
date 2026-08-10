# Homepage Publications Label Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Label the complete-publications navigation correctly while keeping the homepage selected list focused and excluding NCGR.

**Architecture:** Keep the shared locale labels as the source of navigation and homepage heading text. Change only the English navigation label, and exclude NCGR in the homepage component without altering the publication source data used by the complete publications page.

**Tech Stack:** Next.js 16, React 19, TypeScript, Vitest, Testing Library

---

### Task 1: Lock the intended UI behavior in tests

**Files:**
- Modify: `src/components/layout/__tests__/SiteHeader.test.tsx`
- Modify: `src/components/home/__tests__/AcademicHome.test.tsx`

- [ ] **Step 1: Change the navigation assertion to require `Publications`**

Update the English header test to assert:

```tsx
expect(screen.getByRole('link', { name: 'Publications' })).toBeInTheDocument();
```

- [ ] **Step 2: Keep the homepage heading assertion at `Selected Publications` and remove NCGR from the expected homepage titles**

The ordered expectation must contain CrossScope, AC-MASAC, Surg-UniWorld, and EndoWAM only. Add an explicit assertion that the NCGR title is absent from `.home-publications`.

- [ ] **Step 3: Run focused tests and verify RED**

Run:

```powershell
npm.cmd test -- src/components/layout/__tests__/SiteHeader.test.tsx src/components/home/__tests__/AcademicHome.test.tsx
```

Expected: the header test fails because the navigation still says `Selected Publications`, and the homepage test fails because NCGR is still rendered.

### Task 2: Implement the minimal behavior change

**Files:**
- Modify: `src/lib/labels.ts`
- Modify: `src/components/home/AcademicHome.tsx`

- [ ] **Step 1: Rename only the English navigation label**

Set `en.publications` to `Publications`. Leave `en.selectedPublications` as `Selected Publications` and keep all Chinese labels unchanged.

- [ ] **Step 2: Exclude NCGR only from the homepage selection**

Remove `pan2026ncgr` from `selectedPublicationOrder` and filter the homepage list to IDs included in that order. Do not edit `content/publications.bib`.

- [ ] **Step 3: Run focused tests and verify GREEN**

Run the focused Vitest command from Task 1. Expected: both test files pass.

### Task 3: Verify and deploy

**Files:**
- Modify: `scripts/verify-export.mjs`

- [ ] **Step 1: Update the static-export signal**

Replace the required English signal `Selected Publications` only where it represents the navigation expectation with a check that exported content includes both `Publications` and `Selected Publications`.

- [ ] **Step 2: Run the complete verification suite**

Run:

```powershell
npm.cmd run verify
git diff --check
```

Expected: all tests, validation, lint, typecheck, production build, and export verification pass with exit code 0.

- [ ] **Step 3: Commit and push**

Commit the plan, tests, labels, component, and export verification, then push `main` to `origin`.

- [ ] **Step 4: Verify GitHub Pages**

Confirm the deployment for the new commit succeeds and the exported English homepage contains a `Publications` navigation link, a `Selected Publications` section heading, and no NCGR card in the homepage section.
