# Selective Exam — Story Build Plan

This file tracks what content stories need to be built for each selective exam topic.
All 30 topic **wrapper pages** already exist. What is not built yet is the interactive
story/quiz content inside each one.

---

## What Already Exists

| File | Purpose | Built? |
|------|---------|--------|
| `selective-exam-introduction.html` | Intro guide — what is the selective exam, 1.5-year timeline, cartoon visual | ✅ Done |
| `selective-school-exam.html` | Hub/index — links to all 30 topic pages organised by category | ✅ Done |
| `selective-topic-app.js` | Shared metadata renderer for all 30 topic shells | ✅ Done |
| `selective-maths-*.html` (×11) | Shell wrappers — topic info and skill overview only, no story | 🔲 Story needed |
| `selective-thinking-*.html` (×6) | Shell wrappers — topic info and skill overview only, no story | 🔲 Story needed |
| `selective-reading-*.html` (×6) | Shell wrappers — topic info and skill overview only, no story | 🔲 Story needed |
| `selective-writing-*.html` (×7) | Shell wrappers — topic info and skill overview only, no story | 🔲 Story needed |

---

## Story Content Spec (applies to every topic)

Each topic story should follow the same pattern used across the challenge-prep storybooks
(see `NP_STORY_TEMPLATE.md` and `7-wonders-kids.html` for reference).

| Section | Description |
|---------|-------------|
| **Cover page** | Animated title, topic emoji, short hook sentence |
| **Guide character intro** | A recurring character who announces the topic |
| **3–4 story pages** | Narrative explaining the skill through a kid-friendly scenario |
| **Mini-quizzes (inline)** | 1–2 questions per page, immediate feedback |
| **Worked example page** | Walk through a sample selective question step by step |
| **Watch-out page** | Common mistakes with cartoon warning |
| **Final quiz** | 5–8 questions, selective question style, need ~70 % to pass |
| **Certificate** | "Selective Thinker — [Topic Name]" certificate, printable |

---

## Category 1 — Mathematical Reasoning

Exam section: **40 minutes · 35 questions** · Upper-primary focus

### Story Build Order (recommended)

| Priority | File | Topic | Key Skills | Story Idea |
|----------|------|-------|-----------|------------|
| 1 | `selective-maths-whole-numbers.html` | Whole Numbers & Multi-Step Operations | Place value, operation choice, estimation | Chef character unpacking a recipe that hides a multi-step maths problem |
| 2 | `selective-maths-fractions-decimals.html` | Fractions & Decimals | Convert, order, operate across forms | Market stall where prices appear as fractions AND decimals |
| 3 | `selective-maths-percentages.html` | Percentages | Percent of amount, discount, change | A school fundraiser tracking how much was raised as a percentage |
| 4 | `selective-maths-ratios-rates.html` | Ratios & Rates | Simplify, scale, unitary method | Mixing paint colours in the right ratio for a school mural |
| 5 | `selective-maths-patterns-algebra.html` | Patterns & Algebra | Spot the rule, generalise, work backwards | A treasure map where each step is a jumping number pattern |
| 6 | `selective-maths-measurement.html` | Measurement | Area, perimeter, volume, metric units | Designing a school garden with fixed area and perimeter rules |
| 7 | `selective-maths-geometry.html` | Geometry | Angles, nets, symmetry, 3D properties | An architect building a model city — nets fold into different buildings |
| 8 | `selective-maths-position-coordinates.html` | Position & Coordinates | Grids, ordered pairs, path logic | A pirate map adventure where X marks the ordered pair |
| 9 | `selective-maths-data-interpretation.html` | Data Interpretation | Read scales, extract info, compare | School survey data with multiple graph types to untangle |
| 10 | `selective-maths-averages.html` | Mean, Median & Mode | Choose and compute the right average | A sports class comparing test scores — which average is fairest? |
| 11 | `selective-maths-probability.html` | Probability | Outcomes, likelihood, fairness | A game show spinning wheel — is it fair or biased? |

---

## Category 2 — Thinking Skills

Exam section: **40 minutes · 40 questions** · Reasoning-first section

### Story Build Order (recommended)

| Priority | File | Topic | Key Skills | Story Idea |
|----------|------|-------|-----------|------------|
| 1 | `selective-thinking-evaluating-arguments.html` | Evaluating Arguments | Identify claim, support vs weaken, relevance | A class debate — which evidence actually helps the speaker? |
| 2 | `selective-thinking-drawing-conclusions.html` | Drawing Conclusions | Fact tracking, necessary truth, no overreach | A detective scene where only certain conclusions are safe to make |
| 3 | `selective-thinking-identifying-flaws.html` | Identifying Flaws in Logic | Find assumption, check the link, name weakness | An advertisement with sneaky hidden assumptions to spot |
| 4 | `selective-thinking-problem-solving.html` | Problem Solving with Numbers | Strategy choice, organise info, efficiency | A timed escape room where each door has a number puzzle |
| 5 | `selective-thinking-data-analysis.html` | Data Analysis under Rules | Rule filtering, schedule reading, constraint matching | A school timetable puzzle with rules about which classes can overlap |
| 6 | `selective-thinking-spatial-reasoning.html` | Spatial Reasoning | Rotate, reflect, compose shapes | A cubes-and-shadows puzzle game — flip the shape to match the view |

---

## Category 3 — Reading

Exam section: **40 minutes · 30 questions** · Inference and subtext focus

### Story Build Order (recommended)

| Priority | File | Topic | Key Skills | Story Idea |
|----------|------|-------|-----------|------------|
| 1 | `selective-reading-inference.html` | Inference | Clue gathering, evidence-based guessing, fit check | A new student arrives in class — reader infers their home background from clues |
| 2 | `selective-reading-fiction.html` | Fiction Reading | Character motive, tone tracking, evidence selection | A short scene with no dialogue tags — reader works out who said what and why |
| 3 | `selective-reading-non-fiction.html` | Non-Fiction Reading | Purpose, structure, author perspective | Two short reports on the same conservation issue written from different angles |
| 4 | `selective-reading-vocabulary-context.html` | Vocabulary in Context | Context clues, tone sensitivity, multiple meanings | A science article using technical-but-familiar words in unfamiliar ways |
| 5 | `selective-reading-poetry.html` | Poetry Reading | Imagery, figurative meaning, theme | A nature poem comparing seasons — reader interprets metaphors and theme |
| 6 | `selective-reading-synthesis.html` | Synthesis Across Texts | Cross-text comparison, description matching, evidence sorting | Three very short texts about the same event from different perspectives |

---

## Category 4 — Writing

Exam section: **30 minutes · 1 prompt** · Timed composition

### Story Build Order (recommended)

| Priority | File | Topic | Key Skills | Story Idea / Focus |
|----------|------|-------|-----------|------------|
| 1 | `selective-writing-ideas-content.html` | Ideas & Content | Idea generation, depth, prompt relevance | A prompt brainstorming workshop — compare weak vs strong angles |
| 2 | `selective-writing-structure-organisation.html` | Structure & Organisation | Paragraphing, openings/endings, flow | Cut-up paragraph exercise — reassemble in the right order |
| 3 | `selective-writing-narrative.html` | Narrative Writing | Story focus, character/setting, controlled ending | A mentor author shows how the same three-line plan becomes a vivid story |
| 4 | `selective-writing-persuasive.html` | Persuasive Writing | Clear position, reason + evidence, persuasive voice | A student writes a persuasive letter to the principal — before and after revision |
| 5 | `selective-writing-discursive.html` | Discursive Writing | Balanced exploration, logical progression, measured tone | Two viewpoints on screen time — student walks through how to represent both fairly |
| 6 | `selective-writing-language-vocabulary.html` | Language & Vocabulary | Precision, variety, literary devices | A sentence swap game — replace weak verbs and vague phrases with sharp choices |
| 7 | `selective-writing-grammar-punctuation.html` | Grammar & Punctuation | Sentence control, tense/agreement, proofreading | A timed proofreading challenge — spot the errors before the marker does |

---

## Guide Characters (to assign per category)

One recurring guide character per category makes the experience feel consistent.
These are suggestions — confirm or change before building.

| Category | Suggested Character | Emoji |
|----------|-------------------|-------|
| Mathematical Reasoning | Numi the Calculator Fox | 🦊➗ |
| Thinking Skills | Logi the Detective Owl | 🦉🔍 |
| Reading | Lexie the Bookworm (already exists in competitive prep) | 🐛📖 |
| Writing | Penny the Pen (new) | 🖊️✨ |

---

## Certificate Titles (one per topic)

| Topic File | Certificate Name |
|-----------|-----------------|
| `selective-maths-whole-numbers.html` | Whole Number Wizard |
| `selective-maths-fractions-decimals.html` | Fraction Decoder |
| `selective-maths-percentages.html` | Percentage Expert |
| `selective-maths-ratios-rates.html` | Ratio Ranger |
| `selective-maths-patterns-algebra.html` | Pattern Detective |
| `selective-maths-measurement.html` | Measurement Master |
| `selective-maths-geometry.html` | Shape Explorer |
| `selective-maths-position-coordinates.html` | Grid Navigator |
| `selective-maths-data-interpretation.html` | Data Reader |
| `selective-maths-averages.html` | Averages Analyst |
| `selective-maths-probability.html` | Chance Champion |
| `selective-thinking-evaluating-arguments.html` | Argument Evaluator |
| `selective-thinking-drawing-conclusions.html` | Conclusion Drawer |
| `selective-thinking-identifying-flaws.html` | Logic Detective |
| `selective-thinking-problem-solving.html` | Problem Solver |
| `selective-thinking-data-analysis.html` | Data Analyst |
| `selective-thinking-spatial-reasoning.html` | Spatial Thinker |
| `selective-reading-fiction.html` | Fiction Explorer |
| `selective-reading-poetry.html` | Poetry Interpreter |
| `selective-reading-non-fiction.html` | Non-Fiction Reader |
| `selective-reading-inference.html` | Inference Star |
| `selective-reading-vocabulary-context.html` | Vocabulary Builder |
| `selective-reading-synthesis.html` | Synthesis Expert |
| `selective-writing-narrative.html` | Narrative Author |
| `selective-writing-persuasive.html` | Persuasive Writer |
| `selective-writing-discursive.html` | Discursive Thinker |
| `selective-writing-ideas-content.html` | Ideas Generator |
| `selective-writing-structure-organisation.html` | Structure Expert |
| `selective-writing-language-vocabulary.html` | Language Craftsperson |
| `selective-writing-grammar-punctuation.html` | Grammar Guardian |

---

## Build Rules (same as challenge-prep storybooks)

1. Self-contained single HTML file — no external JS or CSS beyond Google Fonts.
2. Same font stack: **Fredoka One** + **Nunito**.
3. Navigation: prev/next buttons, page dots, progress bar.
4. Read-aloud (TTS) support via `speechSynthesis`.
5. Responsive — works on mobile without horizontal scroll.
6. Home link → `https://fivetofifteen.com/` (absolute, not relative).
7. Final quiz difficulty aligned to a **high selective exam level** (harder than the challenge-prep track).
8. Certificate generated via canvas, downloadable as PNG and printable.
9. `analytics.js` loaded with `defer`.
10. No raw closing HTML tags inside inline `<script>` blocks (causes visible JS text bug).

---

## Recommended Overall Build Order

Build one topic from each category per round so all areas grow together.

| Round | Maths | Thinking | Reading | Writing |
|-------|-------|---------|---------|---------|
| R1 | Whole Numbers | Evaluating Arguments | Inference | Ideas & Content |
| R2 | Fractions & Decimals | Drawing Conclusions | Fiction | Structure & Organisation |
| R3 | Percentages | Identifying Flaws | Non-Fiction | Narrative |
| R4 | Ratios & Rates | Problem Solving | Vocabulary | Persuasive |
| R5 | Patterns & Algebra | Data Analysis | Poetry | Discursive |
| R6 | Measurement | Spatial Reasoning | Synthesis | Language & Vocabulary |
| R7 | Geometry | — | — | Grammar & Punctuation |
| R8 | Position & Coordinates | — | — | — |
| R9 | Data Interpretation | — | — | — |
| R10 | Averages | — | — | — |
| R11 | Probability | — | — | — |

---

## Status Tracker

### Mathematical Reasoning
| Topic | Shell | Story | Quiz | Certificate |
|-------|-------|-------|------|-------------|
| Whole Numbers & Multi-Step Operations | ✅ | 🔲 | 🔲 | 🔲 |
| Fractions & Decimals | ✅ | 🔲 | 🔲 | 🔲 |
| Percentages | ✅ | 🔲 | 🔲 | 🔲 |
| Ratios & Rates | ✅ | 🔲 | 🔲 | 🔲 |
| Patterns & Algebra | ✅ | 🔲 | 🔲 | 🔲 |
| Measurement | ✅ | 🔲 | 🔲 | 🔲 |
| Geometry | ✅ | 🔲 | 🔲 | 🔲 |
| Position & Coordinates | ✅ | 🔲 | 🔲 | 🔲 |
| Data Interpretation | ✅ | 🔲 | 🔲 | 🔲 |
| Mean, Median & Mode | ✅ | 🔲 | 🔲 | 🔲 |
| Probability | ✅ | 🔲 | 🔲 | 🔲 |

### Thinking Skills
| Topic | Shell | Story | Quiz | Certificate |
|-------|-------|-------|------|-------------|
| Evaluating Arguments | ✅ | 🔲 | 🔲 | 🔲 |
| Drawing Conclusions | ✅ | 🔲 | 🔲 | 🔲 |
| Identifying Flaws in Logic | ✅ | 🔲 | 🔲 | 🔲 |
| Problem Solving with Numbers | ✅ | 🔲 | 🔲 | 🔲 |
| Data Analysis under Rules | ✅ | 🔲 | 🔲 | 🔲 |
| Spatial Reasoning | ✅ | 🔲 | 🔲 | 🔲 |

### Reading
| Topic | Shell | Story | Quiz | Certificate |
|-------|-------|-------|------|-------------|
| Fiction Reading | ✅ | 🔲 | 🔲 | 🔲 |
| Poetry Reading | ✅ | 🔲 | 🔲 | 🔲 |
| Non-Fiction Reading | ✅ | 🔲 | 🔲 | 🔲 |
| Inference | ✅ | 🔲 | 🔲 | 🔲 |
| Vocabulary in Context | ✅ | 🔲 | 🔲 | 🔲 |
| Synthesis Across Texts | ✅ | 🔲 | 🔲 | 🔲 |

### Writing
| Topic | Shell | Story | Quiz | Certificate |
|-------|-------|-------|------|-------------|
| Narrative Writing | ✅ | 🔲 | 🔲 | 🔲 |
| Persuasive Writing | ✅ | 🔲 | 🔲 | 🔲 |
| Discursive Writing | ✅ | 🔲 | 🔲 | 🔲 |
| Ideas & Content | ✅ | 🔲 | 🔲 | 🔲 |
| Structure & Organisation | ✅ | 🔲 | 🔲 | 🔲 |
| Language & Vocabulary | ✅ | 🔲 | 🔲 | 🔲 |
| Grammar & Punctuation | ✅ | 🔲 | 🔲 | 🔲 |

---

*Update the ✅ / 🔲 status cells as each story, quiz, and certificate is built.*
