# Selective Reading Question Pattern Context (Original Content Blueprint)

This file captures the **pattern** of  selective reading sample materials so we can build **new, original** question sets with matching difficulty and style.


## Exam-Style Blueprint (Observed Pattern)
- Total items: `30`
- Time: `40 minutes`
- Core format: mostly `A/B/C/D` multiple choice, with one sentence-insertion task using `A-G` bank.

### Section Pattern
1. `Q1-Q8` Dual extracts (comparison + close reading)
- Two prose extracts on a related theme.
- Mix of cross-extract comparison and single-extract inference.
- Skills: implication, tone, reference tracking, writer viewpoint.

2. `Q9-Q14` Poem analysis
- One poem, then interpretation questions.
- Skills: imagery, figurative language, lexical precision, structure/form effect, theme.

3. `Q15-Q20` Gapped article (sentence insertion)
- One factual/argument text with six numbered gaps.
- Sentence bank (`A-G`) with one unused option.
- Skills: cohesion, logical progression, pronoun/reference links, discourse markers, argument flow.

4. `Q21-Q30` Multi-extract matching
- Four short extracts (`A-D`) on one broad theme.
- Each question asks “Which extract...?”
- Skills: idea matching, fine distinction between similar claims, recall of specific detail.

## Item Archetypes to Reuse (Do Not Copy Originals)

### A. Comparison/Inference MCQ (Q1-Q8 style)
- Stem types:
  - shared detail across two texts
  - who/what/why inference in one text
  - attitude or tone judgment
- Option design:
  - 1 correct inference with text support
  - 3 distractors: plausible but unsupported, over-strong, or detail-swapped

### B. Poetry MCQ (Q9-Q14 style)
- Stem types:
  - image meaning
  - function of a quoted phrase
  - technique-effect relationship
  - whole-poem form/theme link
- Option design:
  - include one literal trap for figurative language items

### C. Gap-Fill Cohesion (Q15-Q20 style)
- Stem type:
  - choose best sentence for each gap in continuous passage
- Option design:
  - keep all options topic-relevant
  - make wrong options fail on cohesion (pronouns, tense, contrast marker, logic order)
- Required signal checks:
  - backward link: “this/these/such/one such...”
  - forward link: sets up next sentence
  - stance continuity: supportive vs cautionary vs neutral

### D. Extract-Matching Grid (Q21-Q30 style)
- Stem types:
  - “describes...”, “argues...”, “mentions...”, “explains...”
- Option design:
  - all extracts should touch same theme but differ in emphasis
  - avoid obvious keyword giveaway; test meaning not word matching

## Difficulty Controls

### Easy
- Direct evidence in one sentence.
- Limited abstraction.
- Distinct distractors.

### Medium
- Requires two clues across nearby lines.
- Distractors partially true but incomplete.

### Hard
- Needs global interpretation or structure-level reasoning.
- Distractors are text-aligned but wrong in scope/attitude/cause.

## Distractor Construction Rules
- Use exactly one primary trap per distractor:
  - `scope_shift` (too broad/narrow)
  - `tone_shift` (wrong emotional color)
  - `cause_effect_flip`
  - `detail_swap` (borrows correct words, wrong meaning)
  - `outside_knowledge` (true in life, not in text)
- Avoid joke options.
- Keep option lengths reasonably similar.

## Explanation Style Template (Per Item)
Use this 3-part format:
1. `Correct answer:` one line.
2. `Why:` short reasoning tied to evidence location/idea.
3. `Why not others:` brief elimination logic (one line each or grouped).

Example explanation skeleton:
- Correct answer: `B`
- Why: The passage links X and Y in adjacent lines, showing ___.
- Why not others: `A` overstates, `C` swaps cause/effect, `D` is not supported by the text.

## Original Content Guardrails
- Do not reuse original passages, wording, or question stems.
- Keep only structural features (section types, cognitive demand, option logic).
- Use new themes, characters, and settings.
- Avoid copying sequence logic verbatim from the sample.

## Passage Authoring Specs (Recommended)
- Section 1 extracts: `160-260 words` each.
- Section 2 poem: `14-30 lines`, with at least 2 figurative devices.
- Section 3 article: `380-550 words`, six gaps, one extra option.
- Section 4 extracts: `90-170 words` each, four extracts on one theme.

## Set Assembly Targets (One 30-Item Paper)
- `8` dual-extract MCQ
- `6` poem MCQ
- `6` gap-fill insertion
- `10` extract-matching

## Answer Key Balance Rules
- For A/B/C/D items, avoid long streaks of same letter.
- Keep approximate spread balanced across A-D.
- For gap-fill (`A-G`), ensure one clean unused option.

## Quality Checklist Before Publish
- Every correct answer has explicit textual support.
- No ambiguous double-correct options.
- Explanations reference textual logic, not “test tricks”.
- Reading load is age-appropriate but challenging.
- Vocabulary difficulty varies naturally across sections.

## Reusable JSON Shape for New Question Sets
```json
{
  "meta": {
    "title": "Selective Reading Practice - Original Set",
    "time_minutes": 40,
    "total_questions": 30
  },
  "sections": [
    {
      "id": "dual_extract",
      "question_range": "1-8",
      "extracts": [
        { "label": "A", "title": "New Extract A", "text": "..." },
        { "label": "B", "title": "New Extract B", "text": "..." }
      ],
      "questions": [
        {
          "number": 1,
          "type": "mcq_abcd",
          "stem": "...",
          "options": { "A": "...", "B": "...", "C": "...", "D": "..." },
          "answer": "C",
          "explanation": {
            "why_correct": "...",
            "why_not_others": { "A": "...", "B": "...", "D": "..." }
          },
          "skills": ["comparison", "inference"],
          "difficulty": "medium"
        }
      ]
    },
    {
      "id": "poetry",
      "question_range": "9-14",
      "poem": { "title": "New Poem", "lines": ["..."] },
      "questions": []
    },
    {
      "id": "gap_fill",
      "question_range": "15-20",
      "text_with_gaps": "... [15] ... [16] ... [20] ...",
      "option_bank": { "A": "...", "B": "...", "C": "...", "D": "...", "E": "...", "F": "...", "G": "..." },
      "answers": { "15": "C", "16": "E", "17": "A", "18": "G", "19": "D", "20": "F" },
      "explanations": {
        "15": "...",
        "16": "...",
        "17": "...",
        "18": "...",
        "19": "...",
        "20": "..."
      }
    },
    {
      "id": "multi_extract_match",
      "question_range": "21-30",
      "extracts": [
        { "label": "A", "text": "..." },
        { "label": "B", "text": "..." },
        { "label": "C", "text": "..." },
        { "label": "D", "text": "..." }
      ],
      "questions": [
        {
          "number": 21,
          "type": "which_extract_abcd",
          "stem": "Which extract ...?",
          "answer": "D",
          "explanation": { "why_correct": "...", "why_not_others": "..." },
          "skills": ["matching", "claim_distinction"],
          "difficulty": "medium"
        }
      ]
    }
  ]
}
```

## How To Use This File
1. Write fresh passages first (no recycled wording).
2. Draft questions by section archetype.
3. Build distractors with one deliberate trap type each.
4. Create answer key.
5. Write explanations using evidence + elimination.
6. Run checklist and revise ambiguity.
