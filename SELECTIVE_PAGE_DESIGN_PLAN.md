# Selective Exam — Page Design Plan (Age 12)

**Target audience:** Year 6 students, age ~11–12, preparing for a selective school placement test  
**Tone:** Smart tutor, not storybook. Direct, encouraging, exam-focused.  
**Contrast with challenge-prep pages:** the age 5–10 challenge-prep pages use full story narrative + guide characters throughout. Selective pages use examples-first direct teaching with interactive checkpoints.

---

## 1. Audience Profile

| Factor | Detail |
|--------|--------|
| Age | 11–12 (Year 6) |
| Reading level | Comfortable reading full paragraphs |
| Attention span | 10–15 minutes per topic |
| Motivation | "I want to pass the selective exam" — goal-oriented |
| Learning style | Benefits from worked examples > abstract rules |
| Device | Mostly on desktop/laptop at home |
| Sensitivity | Not too babyish — no baby fonts, no excessive emojis |

---

## 2. Design Principles (how this differs from challenge-prep storybooks)

| Challenge-prep pages (age 5–10) | Selective pages (age 12) |
|------------------------|--------------------------|
| Storybook narrative drives every page | Concept + Example + Practice drives every page |
| Guide character narrates everything | Guide character appears only at intro and certificate |
| Adventure / quest framing | Exam-prep framing: "this comes up in the test" |
| Simple emoji-only illustrations | Detailed SVG diagrams (number lines, grids, charts) |
| 1 inline mini-quiz per story page | 2–3 inline checkpoints embedded in the lesson |
| ~6 final quiz questions | 6–8 final quiz questions, full exam format style |
| Lots of floating animations | Clean layout, subtle progress only |
| Short sentences, simple vocab | Clear sentences, introduces correct exam vocabulary |

---

## 3. Page Template (every selective topic page)

Each page is a **single self-contained HTML file** following this exact 10-section flow:

---

### Section 0 — Hero / Cover

- Topic title (large, bold)
- Exam section badge: e.g., "🧮 Mathematical Reasoning · ~3 questions"
- One-sentence hook: what this skill lets you do
- "Start Learning →" button to scroll into the content
- Guide character avatar (small, top-right corner only)

---

### Section 1 — What This Skill Is

> **Purpose:** Lock the concept before any example. 30–50 words max.

- One-paragraph plain-English definition
- One relatable real-world analogy (school project, sport, money, social situations)
- A "Key Words" pill row — 3–5 terms bolded and defined inline

**Example (Whole Numbers topic):**
> "Multi-step problems ask you to do more than one operation to reach the answer.  
> Think of it like a recipe — you have to measure, mix, AND bake. Skipping a step ruins the result."
>
> **Key words:** `operation` · `order of operations` · `estimate` · `verify`

---

### Section 2 — Illustrated Worked Example 1 (Basic)

> **Purpose:** Show the skill clearly before asking the student to try anything.

Structure:
1. Problem statement box (styled like an exam question)
2. Step-by-step solution — each step numbered and colour-coded
3. Inline SVG diagram or visual model where relevant (see Section 6 for illustration guide)
4. "Why this step?" annotation in a side callout

**Interactive mechanic:**
- Steps start hidden; student clicks "Show next step →" to reveal each one
- This forces active engagement instead of passive reading

---

### Section 3 — Try It: Checkpoint 1 (Easy)

> **Purpose:** Confirm the student understood the basic form.

- 1 multiple-choice question (4 options)
- On answer: instant colour feedback (green ✓ / red ✗)
- If wrong: short explanation of why the correct answer is right
- "Next →" only unlocks after answering

---

### Section 4 — Illustrated Worked Example 2 (Harder)

> **Purpose:** Show a variation or a common exam trap with visual contrast.

Structure:
- Same step-reveal mechanic as Example 1
- Includes a "⚠️ Watch Out" callout showing the wrong path most students take
- Side-by-side "❌ Common mistake vs ✅ Correct approach" panel (CSS two-column grid)

---

### Section 5 — Try It: Checkpoint 2 (Medium)

- 1 multiple-choice or fill-in-the-blank question
- Same feedback pattern as Checkpoint 1
- Slightly harder than Checkpoint 1

---

### Section 6 — Real Exam Question Walkthrough

> **Purpose:** Simulate the actual exam experience so students know what to expect.

Structure:
1. Header: "This is how it appears in the exam 📋"
2. Full question in exam-style box (Times New Roman or similar exam font)
3. Student sees the question cold — click "Start Working through it"
4. Guide walks through 4 annotated steps with highlighted diagram
5. Final answer boxed in green
6. "Transfer tip" — one sentence on how to apply this logic to different question wording

---

### Section 7 — Tricky Traps (Common Mistakes)

> **Purpose:** Prevent known errors before the quiz. High ROI for exam scores.

Format: 2–3 "Trap cards" laid out as a CSS grid
Each card has:
- ❌ Wrong approach (red tint box)
- ✅ Right approach (green tint box)
- 1-line explanation of WHY students make that mistake

**Examples of traps to cover per category:**
- Maths: confusing "more than" with "how many more than", rounding too early, missing units
- Thinking: concluding beyond the given facts, treating possibility as certainty
- Reading: choosing nearest quote instead of best evidence, confusing author's view with character's view
- Writing: strong idea but no example, general opener, forgetting the audience

---

### Section 8 — Practice Set (Mini Exam)

> **Purpose:** Scored practice. Simulates the exam under mild pressure.

Format:
- 6–8 questions (mix of multiple-choice, fill-in-blank, hot-text style)
- Questions displayed one at a time (not all visible at once)
- No feedback during questions — feedback shown after submitting all
- Pass threshold: **70%** (lower than the challenge-prep pass mark of 80% since selective is harder)
- On passing: animate to certificate
- On failing: show missed questions with full explanations + "Try again" button

**Question difficulty progression:**
- Q1–Q2: Basic recall of the concept
- Q3–Q4: Standard exam-difficulty question
- Q5–Q6: Harder selective-level variant
- Q7–Q8 (if present): Multi-step or time-pressure variant

---

### Section 9 — Summary Cheatsheet

> **Purpose:** Compact revision card that students can screenshot/print.

Styled as a tinted card with:
- Topic title
- 3–5 key rules in bullet form
- 1 worked mini-example
- Watch-out reminder in red
- Key vocabulary list

---

### Section 10 — Certificate

- Canvas-generated PNG (same mechanism as the challenge-prep pages)
- Student types their name
- "Download" and "Print" buttons
- Certificate title comes from `SELECTIVE_EXAM_BUILD_PLAN.md` certificate name table
- Mention: "Selective Exam Ready · fivetofifteen.com"

---

## 4. Illustration Guide (no external images — inline only)

All visuals are built with **inline SVG** or **CSS** — no image files needed.

### Maths Topics

| Topic | Illustration type | What to draw |
|-------|-----------------|-------------|
| Whole Numbers | SVG bar model | Three bars showing parts of a multi-step problem |
| Fractions & Decimals | SVG number line | Fractions and equivalent decimals plotted on same line |
| Percentages | SVG pie split | Circle divided into 100 parts, section highlighted |
| Ratios & Rates | SVG ratio strip | Two coloured bars showing ratio relationship |
| Patterns & Algebra | SVG dot/tile sequence | Growing pattern tiles in 4 steps with nth term |
| Measurement | SVG rectangle/cube | Labelled shape with formula annotation |
| Geometry | SVG shape diagrams | Net folding illustration + angle arcs |
| Position & Coordinates | SVG grid | Coordinate axes, plotted points, path arrows |
| Data Interpretation | SVG bar chart | 3–4 bar chart with dotted guide lines |
| Averages | SVG number strip | Strip showing values lined up with median/mean marked |
| Probability | SVG spinner | Segmented circle, sector labels, arrow |

### Thinking Skills Topics

| Topic | Illustration type | What to draw |
|-------|-----------------|-------------|
| Evaluating Arguments | CSS two-column | Left: claim. Right: evidence cards ranked by strength |
| Drawing Conclusions | CSS flow diagram | Facts → valid conclusions vs overreached conclusions |
| Identifying Flaws | CSS T-chart | Claim on top, hidden assumption below |
| Problem Solving with Numbers | SVG table | Organised data table with shading |
| Data Analysis | SVG rules panel | Rule checklist with pass/fail traffic lights |
| Spatial Reasoning | SVG shape grids | Rotation/reflection of a simple polygon in 4 orientations |

### Reading Topics

| Topic | Illustration type | What to draw |
|-------|-----------------|-------------|
| Inference | CSS annotation | Passage with colour-highlight callout boxes pointing to clues |
| Fiction | CSS quote highlight | Passage excerpt with key phrases highlighted + pop-up callout |
| Non-Fiction | CSS structure map | Heading → paragraph purpose labels down the side |
| Vocabulary in Context | CSS word map | Target word in centre, context clues radiating out |
| Poetry | CSS annotation | Line-by-line poem with figurative device labels |
| Synthesis | CSS Venn diagram | Two-source comparison overlapping circle |

### Writing Topics

| Topic | Illustration type | What to draw |
|-------|-----------------|-------------|
| Ideas & Content | CSS prompt breakdown | Prompt text annotated with arrows: topic/audience/angle |
| Structure | CSS stacked boxes | Boxes labelled intro/body/conclusion with content hints |
| Narrative | SVG story arc | Rising action curve with labels |
| Persuasive | CSS pyramid | Point → Elaborate → Example → Link pyramid |
| Discursive | CSS two-column | Side A argument vs Side B argument with balance scales icon |
| Language & Vocabulary | CSS swap boxes | Weak sentence → Upgraded sentence side-by-side |
| Grammar & Punctuation | CSS inline highlight | Sentence with error highlighted in red + fixed version |

---

## 5. Interactive Question Types

Six types, all built in vanilla JS (no libraries):

| Type | How it works | Best for |
|------|-------------|---------|
| **Multiple choice (4 options)** | Click an option div → JS marks correct/incorrect, shows explanation | All topics |
| **Fill in the blank** | Text input, on submit JS checks value (trim + lowercase) | Maths, spelling, grammar |
| **Click to reveal steps** | Step divs start `display:none`, "Next Step" button reveals one at a time | Worked examples |
| **Hot-text / click the error** | Sentence split into clickable `<span>` elements, click the wrong one | Grammar, punctuation, logic |
| **Side-by-side compare** | Student reads ❌ sample vs ✅ sample, then answers which feature is missing | Writing |
| **Matching (click to connect)** | Left list + right list, click a left item then a right item to connect | Vocabulary, argument structure |

---

## 6. Language and Tone Guide

**Do:**
- Start explanations with the concept directly: "A ratio compares two quantities..."
- Use real-world examples from their life: sport scores, social media stats, school grades, shopping
- Use second person: "You need to..." / "Notice how you can..."
- Praise smart thinking, not just effort: "Good — you spotted the two-step trap"
- Name the exam strategy: "In the exam, when you see X, always check Y first"

**Don't:**
- Baby talk: "Let's go on an adventure!" / "Yay!" / "Woohoo!"
- Overly cute guide narration that interrupts the lesson flow
- Use vocabulary the student hasn't been introduced to without defining it
- Write overly long single paragraphs — break into steps or bullets
- Give away the answer in the hint text

**Vocabulary complexity targets:**
- Sentence length: 15–25 words average
- Reading level: Year 6–7 (Flesch-Kincaid ~7th grade)
- Technical terms: use correctly, bold them, define inline on first use

---

## 7. Category-Specific Content Approach

### Maths — "Show the working, always"
- Every example shows full working, not just the answer
- Use real selective past question formats as inspiration (remove copyright wording, keep only the structure and style)
- Number sense over calculator tricks — emphasise mental strategies
- End each worked example with: "Could you get this in 90 seconds?" (exam pacing)

### Thinking Skills — "Slow down and test each assumption"
- Teach a named strategy for each: e.g., "Relevance Test" for evaluating arguments
- Examples must be short paragraphs (≤5 sentences) students actually read
- Worked examples should model the internal monologue: "I'm looking for... I found... I concluded..."
- Multiple-choice distractors should include the classic traps (too broad, too specific, reverses the logic)

### Reading — "Find evidence, don't guess"
- Passages should be 80–150 words long (manageable, not overwhelming)
- Write original short passages matching the selective exam style (narrative, factual, persuasive)
- Always show the passage + the question + the evidence trail
- Colour-code the evidence in the text → matched to the correct answer

### Writing — "Compare weak and strong, not rules alone"
- Show a mediocre response and a strong response side-by-side for every concept
- Use familiar marking language ("ideas and content", "language features", "structure")
- Example prompts should feel real: topics students actually have opinions about
- Writing checklists at the end (5 ticks) are more useful than long explanations

---

## 8. Build Quality Checklist (for every topic page)

Before considering a page done, verify all of these:

- [ ] Page renders correctly at 375px (mobile), 768px (tablet), 1280px (desktop)
- [ ] All SVG illustrations display correctly (no overflow, no clipping)
- [ ] All interactive questions give correct feedback (green/red + explanation)
- [ ] Step-reveal mechanic works for both worked examples
- [ ] Final quiz: pass at 70% → certificate animates; fail → explanations shown
- [ ] Certificate: name input → canvas render → download works
- [ ] Home link uses absolute `https://fivetofifteen.com/` 
- [ ] Analytics `analytics.js` loaded with `defer`
- [ ] No raw `</script>` tags inside JS template strings (known breakage pattern — escape as `<\/script>`)
- [ ] Page title in `<title>` matches topic name
- [ ] Google Fonts: Fredoka One + Nunito only (no new font imports)
- [ ] No guide character narration on every page — guide appears on cover + certificate only

---

## 9. Round 1 Build Priority

Build these 4 pages first (one per category) to establish the template:

| # | File | Topic | Round 1 focus |
|---|------|-------|--------------|
| 1 | `selective-maths-whole-numbers.html` | Whole Numbers & Multi-Step Operations | SVG bar model + step-reveal mechanic |
| 2 | `selective-thinking-evaluating-arguments.html` | Evaluating Arguments | Evidence ranking CSS layout + hot-text |
| 3 | `selective-reading-inference.html` | Inference | Annotated passage highlight + click-to-reveal |
| 4 | `selective-writing-ideas-content.html` | Ideas & Content | Weak vs strong prompt breakdown + compare panel |

After Round 1 is complete, review and lock the template, then use it for the remaining 26 pages.

---

## 10. What a Single Topic Page Looks Like (Maths example at a glance)

```
[Hero: "Whole Numbers & Multi-Step Operations" | badge: "🧮 ~3 exam questions"]
─────────────────────────────────────────────────────────────────────────────
[Section 1: Concept]
  "A multi-step problem requires two or more operations..."
  Key words: operation · BODMAS · estimation · verify

[Section 2: Worked Example 1 — step reveal]
  Problem: "A school orders 24 boxes of 36 crayons. 150 are given to one class..."
  Step 1 → Step 2 → Step 3 → Final Answer  ← each step revealed on click

[Section 3: Checkpoint 1 — MCQ] 
  "What is the first operation you need to do here?" A B C D →

[Section 4: Worked Example 2 — with ⚠️ trap]
  ❌ "Students often multiply THEN add — but that gives the wrong answer"
  ✅ "The correct order is..."

[Section 5: Checkpoint 2 — fill-in]
  "Complete: 24 × 36 = ____"

[Section 6: Real Exam Question Walkthrough]
  Full question in exam box → annotated 4-step solution → transfer tip

[Section 7: Tricky Traps grid]
  Trap 1 | Trap 2 | Trap 3

[Section 8: Practice Set — 6 questions — submit all → score]

[Section 9: Summary Cheatsheet card]

[Section 10: Certificate — "Whole Number Wizard"]
```

---

*Last updated: April 2026 · fivetofifteen.com*
