# SurgLAT Publication Addition Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add SurgLAT as the first item on the complete bilingual Publications page with correct author roles, links, abstract, and a locally hosted pipeline preview.

**Architecture:** Reuse the existing BibTeX-driven publication pipeline. Add one entry to `content/publications.bib`, one local image under `public/images/SurgLAT/`, and focused assertions in `scripts/verify-export.mjs`; do not modify rendering components or selected-publication configuration.

**Tech Stack:** Next.js 16, TypeScript, BibTeX content, Vitest, Node.js export verification

---

### Task 1: Add Failing Export Assertions

**Files:**
- Modify: `scripts/verify-export.mjs`
- Test: `scripts/verify-export.mjs`

- [ ] **Step 1: Add assertions for the new publication contract**

Add checks for the SurgLAT title, `2608.07876`, project webpage, `SurgLAT/pipeline.png`, author-role HTML, first-place ordering before Surg-UniWorld, exclusion from Selected Publications, nine full publication rows, and four selected rows.

- [ ] **Step 2: Run the export verifier and observe RED**

Run: `npm.cmd run verify:export`

Expected: FAIL because the existing static export does not contain SurgLAT.

### Task 2: Add The Pipeline Asset And BibTeX Entry

**Files:**
- Create: `public/images/SurgLAT/pipeline.png`
- Modify: `content/publications.bib`
- Modify: `scripts/validate-content.mjs`

- [ ] **Step 1: Download the approved pipeline image**

Download `https://surglat-home-page.pages.dev/assets/method_cropped.png` to `public/images/SurgLAT/pipeline.png` and verify it is a non-empty PNG with readable dimensions.

- [ ] **Step 2: Add the SurgLAT BibTeX entry**

Insert a 2026 August `@misc` entry at the start of `content/publications.bib`. Use `#` on Rulin Zhou, Qiujie Song, and Yujie Ma; use `*` on Hongliang Ren; include the full author list, webpage, PDF, arXiv ID, local preview, abstract, and medical-robotics keywords. Do not add `selected={true}`.

Update the existing exact publication-count guard in `scripts/validate-content.mjs` from 8 to 9.

- [ ] **Step 3: Run focused validation and observe GREEN**

Run: `npm.cmd run validate:content`

Expected: `Validated 9 publications and all local media references.`

Run: `npm.cmd run build`

Expected: production build and static export complete successfully.

Run: `npm.cmd run verify:export`

Expected: all SurgLAT assertions pass.

### Task 3: Full Verification And Deployment

**Files:**
- Verify: generated `out/en/publications/index.html`
- Verify: generated `out/zh/publications/index.html`
- Verify: generated `out/en/selected-publications/index.html`

- [ ] **Step 1: Run the complete verification suite**

Run: `npm.cmd run verify`

Expected: all tests, content validation, ESLint, TypeScript, production build, and export verification pass.

- [ ] **Step 2: Inspect the final diff**

Run: `git diff --check`

Expected: no whitespace errors.

Run: `git status --short`

Expected: only the design, plan, BibTeX, validation scripts, and SurgLAT image changes are present.

- [ ] **Step 3: Commit and push**

Run: `git add docs/superpowers/specs/2026-08-11-surglat-publication-design.md docs/superpowers/plans/2026-08-11-surglat-publication.md scripts/verify-export.mjs scripts/validate-content.mjs content/publications.bib public/images/SurgLAT/pipeline.png`

Run: `git commit -m "feat: add SurgLAT publication"`

Run: `git push origin main`

- [ ] **Step 4: Verify the deployed page**

Open `https://wanhao-liu.github.io/en/publications/` and `https://wanhao-liu.github.io/zh/publications/`. Confirm SurgLAT is first, the pipeline image loads, Webpage/PDF/arXiv links are correct, the author markers render, and the abstract is closed. Confirm `https://wanhao-liu.github.io/en/selected-publications/` still contains exactly the original four works.
