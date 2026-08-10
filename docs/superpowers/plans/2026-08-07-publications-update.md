# 2026 Publications Update Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add the three specified August 2026 arXiv papers to the homepage with pipeline overview figures, complete metadata, and expandable abstracts.

**Architecture:** The site stays static HTML. Three local PNG previews fill the left column, while three self-contained rows in `index.html` contain metadata and use the existing abstract-toggle JavaScript.

**Tech Stack:** HTML, existing CSS and JavaScript, PNG assets extracted from arXiv PDFs, Git.

---

## File Structure

- Create: `images/NCGR/pipeline.png` - NCGR pipeline overview.
- Create: `images/CrossScope/pipeline.png` - CrossScope pipeline overview.
- Create: `images/EndoWAM/pipeline.png` - EndoWAM pipeline overview.
- Modify: `index.html:156` - insert three rows before AC-MASAC.
- Create: `docs/superpowers/plans/2026-08-07-publications-update.md` - this record.

### Task 1: Collect and validate visual assets

**Files:**
- Create: `images/NCGR/pipeline.png`
- Create: `images/CrossScope/pipeline.png`
- Create: `images/EndoWAM/pipeline.png`

- [ ] **Step 1: Download the official PDFs outside the repository**

```powershell
curl.exe -L https://arxiv.org/pdf/2608.03895 -o $env:TEMP/ncgr.pdf
curl.exe -L https://arxiv.org/pdf/2608.03211 -o $env:TEMP/crossscope.pdf
curl.exe -L https://arxiv.org/pdf/2608.01221 -o $env:TEMP/endowam.pdf
```

Expected: three non-empty PDF files.

- [ ] **Step 2: Extract the pipeline overview in each PDF**

Render PDF pages with Poppler, identify each figure captioned as the method overview or pipeline, crop the figure without body text, and save it at the corresponding path under `images/`. Preserve its aspect ratio.

- [ ] **Step 3: Verify local assets**

```powershell
Get-Item images/NCGR/pipeline.png, images/CrossScope/pipeline.png, images/EndoWAM/pipeline.png | Select-Object Name, Length
```

Expected: three non-empty PNG files.

### Task 2: Add the publication rows

**Files:**
- Modify: `index.html:156`

- [ ] **Step 1: Add the NCGR row**

Use the existing `40%`/`60%` table pattern. Set image source to `images/NCGR/pipeline.png`; link the title and `arXiv` control to `https://arxiv.org/abs/2608.03895`; link `pdf` to `https://arxiv.org/pdf/2608.03895`; bold Wanhao Liu; and use the unique abstract ID `ncgr_abs`.

- [ ] **Step 2: Add the CrossScope row**

Use `images/CrossScope/pipeline.png`, the matching arXiv/PDF URLs for `2608.03211`, the complete official author list with Wanhao Liu bolded, and the unique abstract ID `crossscope_abs`.

- [ ] **Step 3: Add the EndoWAM row**

Use `images/EndoWAM/pipeline.png`, the matching arXiv/PDF URLs for `2608.01221`, the complete official author list with Wanhao Liu bolded, and the unique abstract ID `endowam_abs`.

- [ ] **Step 4: Validate inserted content**

```powershell
rg -n '2608\\.(03895|03211|01221)|ncgr_abs|crossscope_abs|endowam_abs' index.html
```

Expected: every arXiv ID and abstract ID occurs in its matching row.

### Task 3: Render and inspect the site

**Files:**
- Verify: `index.html` and the three PNG assets.

- [ ] **Step 1: Start a local static server**

```powershell
python -m http.server 4173
```

Expected: `http://localhost:4173` serves the homepage.

- [ ] **Step 2: Inspect desktop and mobile views**

Confirm all three figures render without text overflow and each abstract control expands its own abstract.

- [ ] **Step 3: Inspect all new link targets**

Confirm NCGR uses `https://arxiv.org/abs/2608.03895` and `https://arxiv.org/pdf/2608.03895`; CrossScope uses `https://arxiv.org/abs/2608.03211` and `https://arxiv.org/pdf/2608.03211`; and EndoWAM uses `https://arxiv.org/abs/2608.01221` and `https://arxiv.org/pdf/2608.01221`.

### Task 4: Commit and publish

**Files:**
- Modify: `index.html`
- Create: the three pipeline PNGs and this plan.

- [ ] **Step 1: Review the final change set**

```powershell
git diff --check
git status --short
```

Expected: no whitespace errors and only the planned files are pending.

- [ ] **Step 2: Commit the update**

```powershell
git add index.html images/NCGR/pipeline.png images/CrossScope/pipeline.png images/EndoWAM/pipeline.png docs/superpowers/plans/2026-08-07-publications-update.md
git commit -m "feat: add 2026 arxiv publications"
```

Expected: one commit contains the publication update.

- [ ] **Step 3: Push the homepage remote**

```powershell
git push Wanhao-Liu main
```

Expected: `Wanhao-Liu` accepts the commit.
