# Homepage Introduction Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the scattered homepage biography with a concise research-oriented introduction covering embodied intelligence, robot learning, medical robot autonomy, and VLA/World-Action Models.

**Architecture:** Update only the introductory paragraphs in `index.html`. Preserve biography facts from the latest CV, existing contact details, and all publication and layout markup. Use a content regression test to protect the stated research focus.

**Tech Stack:** Static HTML and Python `unittest` content checks.

---

### Task 1: Update the homepage introduction

**Files:**
- Modify: `index.html:120-134`
- Test: `C:/tmp/test_homepage_introduction.py`

- [ ] **Step 1: Write the failing test**

```python
class HomepageIntroductionTest(unittest.TestCase):
    def test_introduction_states_current_research_focus(self):
        self.assertIn("The Chinese University of Hong Kong", HTML)
        self.assertIn("Vision-Language-Action and World-Action Models", HTML)
        self.assertIn("medical robot autonomy", HTML)
```

- [ ] **Step 2: Run the test to verify it fails**

Run: `python C:/tmp/test_homepage_introduction.py`
Expected: `FAIL`, because the prior introduction does not mention CUHK or the VLA/World-Action Model focus.

- [ ] **Step 3: Replace the biography and research-interest paragraphs**

```html
<p>I am a third-year B.Eng. student ... advised by Prof. Panshuo Li. I am also a Research Assistant at The Chinese University of Hong Kong, working with Prof. Hongliang Ren.</p>
<p>My research lies at the intersection of embodied intelligence, robot learning, and medical robot autonomy. I develop Vision-Language-Action and World-Action Models ...</p>
```

- [ ] **Step 4: Run all homepage content tests**

Run: `python C:/tmp/test_homepage_introduction.py; python C:/tmp/test_author_contributions.py; python C:/tmp/test_crossscope_media.py`
Expected: all tests pass.

- [ ] **Step 5: Check and commit**

```bash
git diff --check
git add index.html
git commit -m "feat: refine homepage introduction"
```
