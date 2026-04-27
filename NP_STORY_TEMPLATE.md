# NP Story Page Template

This template defines the **standard structure** for every challenge-prep story page in this project.

Each challenge-prep file should be:

- a **single self-contained HTML file**
- built with **HTML + CSS + vanilla JS**
- themed around **one main syllabus cluster**
- written for **Year 3 to Year 5** learners, with room to scale complexity upward later
- designed to feel like a **storybook adventure first**, but measure a **real challenge-style skill**

---

## 1. Page Identity

Every new file should begin by clearly defining:

- **Domain:** `Reading`, `Writing`, `Conventions of Language`, or `Numeracy`
- **Syllabus reference(s):** for example `1.1.1`, `2.2.1`, `3.2.2`
- **Main measuring goal:** the exact skill being practised
- **Guide character:** one consistent narrator for the file
- **Theme language:** quest, dojo, workshop, lab, mission, trail, or similar playful frame

Example:

- Domain: `Numeracy`
- Syllabus refs: `1.1.1`, `1.1.2`, `1.1.3`
- Measuring goal: identify place value, expand numbers, and compare 4-digit numbers
- Guide: `Numi the Number Ninja`

---

## 2. Required Technical Shell

Every page should include these shared UI features:

- Home link back to `index.html`
- Read-aloud controls using browser speech synthesis
- Progress strip with page count
- Previous/next navigation buttons
- Clickable page dots
- Responsive mobile layout
- Final quiz scoring
- Certificate generation with learner name input

The visual language can change by subject, but the interaction model should stay familiar across files.

---

## 3. Standard Page Flow

Each story page should follow this sequence.

### Page 0: Cover

Purpose:
- introduce the adventure
- show the guide character
- state the skill area in child-friendly language

Must include:
- title
- subtitle
- hero emoji or visual motif
- short tagline with age range or year band

### Page 1: Meet the Guide

Purpose:
- welcome the learner
- explain what they will master
- make the guide feel memorable

Must include:
- guide intro
- 3 to 4 short “facts” or traits about the guide
- simple overview of what the learner will do

### Pages 2-5: Teach the Core Skill

Purpose:
- teach the main skill through story and examples

Must include on each teaching page:
- one clear sub-skill focus
- story text in a friendly narrative voice
- one visual/support panel on the right
- one short interactive check or mini quiz

Good examples:
- Reading: passage plus scan-for-detail question
- Writing: weak sentence vs strong sentence comparison
- Grammar: fix-the-sentence prompt
- Numeracy: place value chart, number line, array, or coins

### Pages 6-7: Guided Practice

Purpose:
- move from explanation to learner application

Must include:
- 1 or 2 worked examples
- 1 scaffolded practice task
- hint or strategy box

These pages should still feel playful, but they should be closer to the kinds of decisions students make in challenge items.

### Pages 8-9: Skill Check

Purpose:
- simulate short challenge-style thinking tasks

Must include:
- short prompts with less scaffolding
- 2 to 4 practice questions
- feedback that explains why the answer is correct

Recommended formats:
- multiple choice
- choose the best sentence
- identify the mistake
- compare two options
- read a short passage and infer meaning

### Page 10: Review and Memory Tricks

Purpose:
- help learners consolidate what they learned

Must include:
- recap of key rules or strategies
- memory device, checklist, acronym, or comparison chart
- quick reminder of common mistakes

### Pages 11-12: Final Quiz

Purpose:
- assess whether the learner can apply the skill independently

Must include:
- at least 6 questions across the target skill cluster
- immediate feedback per question
- clear score display
- pass threshold of about `80%`

Quiz design rules:
- mix easy, medium, and stretch questions
- avoid trick wording
- test the measuring goal, not random trivia

### Page 13: Certificate

Purpose:
- reward completion

Must include:
- learner name input
- certificate title
- download button
- print button if already supported

Certificate naming should match the domain or skill, for example:

- `Super Reader Certificate`
- `Number Ninja Certificate`
- `Story Builder Certificate`
- `Spelling & Grammar Wizard Certificate`

---

## 4. Standard Content Blocks

These reusable blocks already appear across the existing files and should stay standard.

### Story Text Block

Use for:
- teaching explanation
- narration
- worked examples

Rules:
- short paragraphs
- bold highlights for key vocabulary
- child-friendly tone

### Story Art / Support Panel

Use for:
- guide character
- charts
- diagrams
- fact cards
- worked examples
- visual summaries

### Mini Quiz Bubble

Use for:
- one fast question after a teaching chunk
- confidence check before moving on

Rules:
- 2 to 4 options
- fast feedback
- visually rewarding when correct

### Fun Fact Box

Use for:
- memorable supporting information
- context that makes the skill less dry

### Tip Box

Use for:
- strategy reminders
- “watch out” mistakes
- problem-solving hints

### Memory Card / Checklist

Use for:
- editing reminders
- reading strategies
- maths process steps
- writing structure reminders

---

## 5. Domain-Specific Rules

### Reading Pages

Should include:
- short passages
- headings, captions, labels, or diagrams when relevant
- questions that test literal and inferential understanding

Focus on:
- scanning
- clue finding
- main purpose
- text feature interpretation

### Writing Pages

Should include:
- model sentences and model paragraphs
- weak vs strong comparisons
- structure reminders
- prompts for the learner to improve or continue writing

Focus on:
- narrative structure
- character and setting
- complication
- persuasive devices
- logical order

### Conventions of Language Pages

Should include:
- sentence-level tasks
- proofreading tasks
- identify-and-fix activities
- homophone choices in context

Focus on:
- parts of speech
- tense consistency
- capitals and full stops
- speech punctuation
- spelling correction

### Numeracy Pages

Should include:
- visual models
- worked examples
- short calculation tasks
- real-world contexts where possible

Focus on:
- place value
- operations
- fractions
- money
- data
- shapes

---

## 6. Difficulty Rules by Year Level

Each page can contain both Year 3 and Year 5 style learning, but the progression should be visible.

### Year 3

Use:
- shorter text
- simpler numbers
- one-step questions
- obvious clues
- heavy scaffolding

### Year 5

Use:
- longer text
- more distractors
- multi-step reasoning
- less obvious clues
- stronger vocabulary

The learner should feel that Year 5 tasks are a natural “level up,” not a totally different lesson.

---

## 7. Tone and Writing Rules

Every file should feel:

- warm
- playful
- energetic
- encouraging
- clear

Avoid:

- textbook-style lecturing
- long dense paragraphs
- unexplained jargon
- harsh “wrong answer” feedback

Preferred style:

- “Let’s try this together.”
- “Look for the clue.”
- “Here’s the trick smart readers use.”
- “Oops, almost. Try again by checking the tens place.”

---

## 8. Accessibility and Usability Rules

Every file should aim for:

- large readable text
- strong contrast
- clear tap targets
- obvious navigation
- uncluttered layouts
- readable content on phones

Also keep language aligned with **Standard Australian English** and use examples that are age-appropriate and inclusive.

---

## 9. New File Build Checklist

Before marking a new challenge-prep file complete, confirm that it has:

- a clear syllabus cluster
- a clear measuring goal
- a guide character and cover page
- at least 4 teaching pages
- at least 2 guided practice or skill-check pages
- a review page
- a final quiz with pass logic
- a certificate page
- home navigation
- read-aloud support
- mobile-friendly layout

---

## 10. Suggested Naming Pattern

Use:

- `np-reading-<topic>-kids.html`
- `np-writing-<topic>-kids.html`
- `np-grammar-<topic>-kids.html`
- `np-spelling-<topic>-kids.html`
- `np-numeracy-<topic>-kids.html`

Examples:

- `np-numeracy-place-value-kids.html`
- `np-numeracy-fractions-money-kids.html`
- `np-reading-inference-kids.html`

---

## 11. Recommended Authoring Formula

When building a new page, use this formula:

1. Pick one syllabus cluster.
2. Write the measuring goal in one sentence.
3. Invent a guide + adventure frame that matches the subject.
4. Break the skill into 4 teachable mini-lessons.
5. Add one mini quiz after each major teaching chunk.
6. Add 2 pages of guided or challenge-style practice.
7. Build a final quiz that covers the whole skill.
8. Finish with a certificate.

This keeps every file consistent for learners while still allowing each story to feel distinct.
