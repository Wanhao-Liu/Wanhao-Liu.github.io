# Homepage Bio Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the long bilingual homepage biography with the approved concise copy.

**Architecture:** Keep biography text in the existing locale-specific TOML files. Add exact static-export assertions so future changes cannot accidentally restore the verbose copy or leave the locales inconsistent.

**Tech Stack:** TOML content, Next.js static export, Node.js verification script

---

### Task 1: Add failing export assertions

**Files:**
- Modify: `scripts/verify-export.mjs`

- [ ] Add the approved English research sentence and its Chinese translation to the homepage signal checks.
- [ ] Run `npm.cmd run verify:export` against the current export and confirm it fails because the concise sentence is absent.

### Task 2: Replace localized biography content

**Files:**
- Modify: `content/about.toml`
- Modify: `content_zh/about.toml`

- [ ] Replace the English `intro` and `research` values with the approved two-sentence copy.
- [ ] Replace the Chinese `intro` and `research` values with the matching concise translation.
- [ ] Run `npm.cmd run verify` and confirm all tests, validation, lint, type checking, build, and export checks pass.

### Task 3: Deploy and verify

**Files:**
- No additional source files.

- [ ] Commit the content, assertions, design, and plan.
- [ ] Push `main` and wait for GitHub Pages deployment success.
- [ ] Confirm the public English and Chinese homepages contain the new copy.

