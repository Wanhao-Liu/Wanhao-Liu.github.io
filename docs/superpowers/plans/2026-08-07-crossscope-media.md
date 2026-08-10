# CrossScope Media Revision Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the CrossScope paper preview with its project video, add a project-page link, and make all three new publication previews visually consistent.

**Architecture:** `index.html` keeps the existing publication table. A shared media container constrains preview height and centers its image or video; CrossScope uses the externally hosted video rather than a copied asset.

**Tech Stack:** HTML, CSS, existing JavaScript abstract toggle, HTML5 video.

---

### Task 1: Verify the expected markup fails

**Files:**
- Test: `C:/tmp/test_crossscope_media.py`

- [ ] **Step 1: Add the static acceptance test**

```python
assert 'class="publication-media"' in html
assert 'final_en_subtitled_compact.mp4' in html
assert '>webpage</a>' in html
```

- [ ] **Step 2: Run the test before implementation**

Run: `python C:/tmp/test_crossscope_media.py`

Expected: failure because the page has no shared media class, video, or webpage link.

### Task 2: Update the publication media

**Files:**
- Modify: `index.html:20-55` - add shared media-container CSS.
- Modify: `index.html:160-213` - wrap the three previews and replace only CrossScope's image with a video.

- [ ] **Step 1: Add the shared preview CSS**

Add `.publication-media` with a fixed desktop height, centered contents, `overflow:hidden`, and `object-fit:contain` for images. Add a narrow-screen media query that preserves the container without horizontal overflow.

- [ ] **Step 2: Update all three preview cells**

Wrap NCGR and EndoWAM images in `.publication-media`. Replace CrossScope's image with a `<video>` that uses `controls autoplay loop muted playsinline preload="metadata"` and the project-video URL.

- [ ] **Step 3: Add the project link**

Place `<a href="https://wanhao-liu.github.io/CrossScope/">webpage</a> |` before CrossScope's PDF link.

### Task 3: Verify and publish

**Files:**
- Verify: `index.html`

- [ ] **Step 1: Run static acceptance tests**

Run: `python C:/tmp/test_crossscope_media.py`

Expected: PASS.

- [ ] **Step 2: Inspect browser behavior**

Verify desktop and mobile layouts, the video source and controls, the webpage link target, and the three abstract toggles.

- [ ] **Step 3: Commit and push**

Run: `git add index.html && git commit -m "feat: refine publication media" && git push Wanhao-Liu main`

Expected: the configured remote accepts the update.
