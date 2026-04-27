# Codebase Context

## Overview

This repository is a content-heavy, framework-free learning site for `fivetofifteen.com`.

- Stack: static HTML, CSS, and vanilla JavaScript
- Runtime style: browser-only, no bundler, no framework, no module system
- Primary audience: kids aged roughly 5-15, with content spanning stories, worksheets, games, micro-topics, exam sessions, and selective exam prep
- Site shape: many standalone `.html` pages, plus a handful of shared JS files that provide navigation, search, accessibility, voice/read-aloud, and data-driven page rendering

The actual project lives in [kids](C:\xampp\htdocs\kids_pjt\kids). The repo root currently just contains that directory.

## High-Level Structure

The codebase is mostly flat inside `kids/`.

Main categories:

- `index.html`, `index.css`, `index.js`
  Home/library page and the largest shared browsing experience
- Story and practice pages
  Many standalone `*-kids.html` pages and worksheet pages
- Micro-topic system
  `np-microtopic-app.js` plus many `np-*.html` and data-driven topic definitions
- Exam session system
  `np-exam-app.js` plus `np-exam-session-*.html`
- Selective exam system
  `selective-topic-*.js`, `selective-*.html`, `selective-reading-sample-set-01.json`
- Geometry shape system
  `geometry-shape-page.js`, `geometry-shape-data.js`, and `selective-geometry-*.html`
- Shared utilities
  `slim-topbar.js`, `natural-read-aloud.js`, `voice-assist.js`, `accessibility-preferences.js`, `page-share.js`, `analytics.js`, `site-drawer.js`
- Build/helper scripts
  `scripts/generate-selective-search-index.js`
  `scripts/generate-rss.js`

## Core Architectural Patterns

### 1. Static-page-first site

Most pages are ordinary standalone HTML files with their own markup and styling. There is no central app shell, router, or build pipeline.

This means:

- linking between pages is done with normal anchors
- each page can include whichever helper scripts it needs
- many pages are self-contained and intentionally repetitive

### 2. Generator-style pages in plain JS

Some sections do not store page content mainly as HTML. Instead, a lightweight HTML file sets a global key, and a JS app renders the page into `document.body`.

Main examples:

- `np-microtopic-app.js`
  Renders micro-topic lesson flows from large in-file topic data objects
- `np-exam-app.js`
  Renders full exam-session experiences from JS session data
- `selective-topic-app.js`
  Loads topic datasets and renderer scripts, then builds selective topic pages
- `geometry-shape-page.js`
  Renders geometry deep-dive pages from shape data

When editing these areas, the content often lives in JS data structures rather than the HTML file itself.

### 3. Shared enhancement scripts

There are a few site-wide utility scripts that are reused across many pages:

- `slim-topbar.js`
  Injects a global fixed top navigation/search bar on pages that do not already have the custom home-page topbar
- `natural-read-aloud.js`
  Smarter page-level TTS with block collection, highlighting, and preferred voice selection
- `voice-assist.js`
  Simpler speech helper for button-triggered reading of specific text
- `accessibility-preferences.js`
  Stores and applies user accessibility modes from `localStorage`
- `page-share.js`
  Floating share button with Web Share API or clipboard fallback
- `analytics.js`
  Google Analytics injection if measurement ID is configured

## Important Files

### Home page

- [index.html](C:\xampp\htdocs\kids_pjt\kids\index.html)
  Main entry point and library page
- [index.js](C:\xampp\htdocs\kids_pjt\kids\index.js)
  Home-page behavior: search, filters, learning map, comments form, quick-link popup, sticky mini topbar behavior, competition states, and card gamification
- [index.css](C:\xampp\htdocs\kids_pjt\kids\index.css)
  Large stylesheet for home page and some redesigned navigation behavior

Notable home-page behaviors:

- age filtering and path filtering
- search across visible cards
- selective-page quick-link popup from generated search index
- local progress tracking via `localStorage`
- comments submission to a Google Apps Script endpoint

### Micro-topics

- [np-microtopic-app.js](C:\xampp\htdocs\kids_pjt\kids\np-microtopic-app.js)
  Contains the micro-topic dataset and renders the full lesson/quiz/certificate flow

Pattern:

- HTML page usually just boots the app with a topic key
- JS data includes intro, lessons, quick checks, review, final quiz, and certificate metadata

### Exam sessions

- [np-exam-app.js](C:\xampp\htdocs\kids_pjt\kids\np-exam-app.js)
  Defines session data and renders exam UI, scoring, and certificate generation

Pattern:

- session content is embedded directly in JS
- quiz logic and certificate canvas drawing also live in the same file

### Selective exam topic pages

- [selective-topic-app.js](C:\xampp\htdocs\kids_pjt\kids\selective-topic-app.js)
  Loader that pulls in the selective topic stack
- [selective-topic-core.js](C:\xampp\htdocs\kids_pjt\kids\selective-topic-core.js)
  Domain metadata and shared globals
- [selective-topic-renderer.js](C:\xampp\htdocs\kids_pjt\kids\selective-topic-renderer.js)
  Main renderer for selective topic pages
- [selective-topic-data-maths.js](C:\xampp\htdocs\kids_pjt\kids\selective-topic-data-maths.js)
- [selective-topic-data-thinking.js](C:\xampp\htdocs\kids_pjt\kids\selective-topic-data-thinking.js)
- [selective-topic-data-reading.js](C:\xampp\htdocs\kids_pjt\kids\selective-topic-data-reading.js)
- [selective-topic-data-writing.js](C:\xampp\htdocs\kids_pjt\kids\selective-topic-data-writing.js)
- [selective-topic-data-writing-criteria.js](C:\xampp\htdocs\kids_pjt\kids\selective-topic-data-writing-criteria.js)
- [selective-topic-visuals.js](C:\xampp\htdocs\kids_pjt\kids\selective-topic-visuals.js)
  Shared SVG/visual markup helpers

Pattern:

- page HTML provides `window.SELECTIVE_TOPIC_KEY`
- app loads the data/render stack sequentially
- renderer builds the entire page from topic metadata

### Geometry pages

- [geometry-shape-data.js](C:\xampp\htdocs\kids_pjt\kids\geometry-shape-data.js)
  Shape dataset and ordering
- [geometry-shape-page.js](C:\xampp\htdocs\kids_pjt\kids\geometry-shape-page.js)
  Full page renderer with diagrams, formulas, worked examples, and auto-generated fallback sections

Pattern:

- shape pages are data-driven
- renderer includes many custom SVG diagram builders
- if `deepDive` data is missing, it synthesizes several sections automatically from the base shape data

## Generated and Semi-Generated Assets

### Selective search index

- [scripts/generate-selective-search-index.js](C:\xampp\htdocs\kids_pjt\kids\scripts\generate-selective-search-index.js)
  Scans `selective-*.html` files and writes:
- [selective-search-index.js](C:\xampp\htdocs\kids_pjt\kids\selective-search-index.js)

This generated file powers the selective quick-link search popup used on the home page.

If selective pages are added/renamed, regenerate this file.

### RSS feeds

- [scripts/generate-rss.js](C:\xampp\htdocs\kids_pjt\kids\scripts\generate-rss.js)
  Builds:
- [rss.xml](C:\xampp\htdocs\kids_pjt\kids\rss.xml)
- [feed.xml](C:\xampp\htdocs\kids_pjt\kids\feed.xml)

The script classifies pages, derives dates from git history when possible, and uses `CNAME` to determine the site URL.

## Data Flow and Persistence

There is no backend app in this repository. Browser state is mostly local.

Current patterns:

- `localStorage`
  used for accessibility preferences, progress tracking, Pip guide cooldowns, and voice mute state
- external Google Apps Script endpoint
  used by the home-page comments form
- external browser APIs
  `speechSynthesis`, clipboard, Web Share API, canvas, print, and `fetch`

## Editing Guidance

### When to edit HTML directly

Edit HTML directly when:

- the page is a standalone content page
- layout/content is mostly fixed markup
- the page is not rendered by one of the JS app systems

Examples:

- story pages
- worksheet pages
- many game pages
- simple hubs like `worksheets.html`

### When to edit JS data instead

Edit JS data objects when:

- changing a micro-topic
- changing an exam session
- changing a selective topic page
- changing a geometry shape page

In those sections, the HTML file is often just a boot file, not the real source of truth.

### When to edit shared utilities

Be careful changing these because the blast radius is large:

- `slim-topbar.js`
- `natural-read-aloud.js`
- `voice-assist.js`
- `accessibility-preferences.js`
- `page-share.js`
- `index.js`
- `index.css`

## Repeating UX Conventions

The repo strongly favors:

- bright, kid-friendly gradients and rounded cards
- `Fredoka One` for headings and `Nunito` for body text
- story/lesson flows split into paged screens
- TTS buttons and certificate generation
- fixed or sticky navigation
- self-contained experiences with minimal dependencies

## Known Codebase Characteristics

### Large single files

Several important JS files are very large and combine:

- content data
- rendering
- interaction logic
- certificate drawing

That is normal for this repo. Refactoring is possible, but current behavior depends on this co-located style.

### Global namespace usage

The codebase relies heavily on `window.*` globals and script load order.

Examples:

- `window.SELECTIVE_TOPIC_KEY`
- `window.SELECTIVE_TOPIC_TOPICS`
- `window.renderSelectiveTopicPage`
- `window.currentPage`
- `window.pageEls`

When adding features, avoid assuming module isolation.

### Encoding issues in some files

Some files show mojibake in text output, especially around emoji and punctuation. This suggests mixed encoding history or files saved with inconsistent encodings at some point.

Be careful when editing text-heavy files:

- preserve UTF-8 if possible
- verify titles and visible text after edits

## Suggested Mental Model For Future Work

Think of this repo as four overlapping systems:

1. A static content library
2. A reusable set of kid-friendly browser utilities
3. A few data-driven lesson/exam renderers
4. A small script layer for generated search/feed artifacts

If you are adding something new, first decide which bucket it belongs to:

- plain standalone page
- micro-topic
- exam session
- selective topic
- geometry shape
- shared site utility

That decision usually tells you the correct files to touch.

## Fast Start For New Contributors

If you need to understand the repo quickly, read in this order:

1. [README.md](C:\xampp\htdocs\kids_pjt\kids\README.md)
2. [index.html](C:\xampp\htdocs\kids_pjt\kids\index.html)
3. [index.js](C:\xampp\htdocs\kids_pjt\kids\index.js)
4. One representative data-driven system:
   `np-microtopic-app.js` or `selective-topic-renderer.js`
5. One shared utility:
   `slim-topbar.js` or `natural-read-aloud.js`
6. The generation scripts in `scripts/`

## Recommended Next Docs To Add Later

If this repo keeps growing, the most useful next documentation would be:

- a page creation checklist
- a naming convention guide for new files
- a map of which HTML files are static vs JS-rendered
- a small contributor script list with exact commands to regenerate artifacts

