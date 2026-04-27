# Selective Thinking Skills Question Pattern Context (Original Content Blueprint)

This file captures the **structure and reasoning pattern** of the SHS Thinking Skills sample so we can create **new, original** question sets at comparable style and difficulty.



## Exam-Style Blueprint (Observed)
- Total items: `40`
- Time: `40 minutes`
- Options per item: `A/B/C/D` (single best answer)
- Mixed format: verbal logic, critical reasoning, quantitative logic, spatial/visual reasoning.
- No calculators or dictionaries.

## Global Test Characteristics
- Strong emphasis on **reasoning validity**, not factual recall.
- Many items test whether a conclusion **must** follow, **could** follow, or **cannot** follow.
- Repeated use of quantified language: `all`, `some`, `none`, `must`, `only`, `if/then`.
- Frequent “most strengthens”, “most weakens”, and “shows the mistake” argument tasks.
- Spatial pattern items are interleaved with verbal and quantitative items.

## Inferred Flow Pattern (From Sequence + Explained Answers)
1. `Q1-Q13` Fast mixed reasoning
- Arithmetic logic, conditional reasoning, strengthen tasks, symmetry/pattern decoding, basic deduction tables.

2. `Q14-Q27` Heavier verbal and relational logic
- Argument evaluation, identifying flawed assumptions, must-true conditionals, schedule/constraint optimization, set logic.

3. `Q28-Q40` Dense mixed-endgame
- Complex visual fit/rotation, ranking constraints, truth-testing data sufficiency, value optimization, argument weakening/strengthening, advanced set/order logic.

Note: This 3-part grouping is an inference from the sample’s progression, not an official section label.

## Item Archetypes To Reuse (Do Not Copy Originals)

### A. Argument Evaluation
- Stem families:
  - Which statement most strengthens?
  - Which statement most weakens?
  - Which sentence shows the mistake?
  - Whose reasoning is correct?
- Core skill:
  - identify hidden assumption and relevance of new evidence

### B. Conditional / Formal Logic
- Stem families:
  - If statement X is true, what must be true?
  - Which option is impossible?
  - Which option cannot be true?
- Core skill:
  - valid inference with `if`, `only if`, contrapositive, and exclusion logic

### C. Set and Category Logic
- Stimulus:
  - “all/some/none” relations, multi-group preference data, category overlaps
- Core skill:
  - derive necessary consequences without overclaiming

### D. Constraint Grid / Ordering
- Stimulus:
  - houses/people/positions, finish-order + score constraints, schedule rules
- Core skill:
  - eliminate impossible arrangements, test candidate consistency

### E. Quantitative Logic (Non-routine)
- Stimulus:
  - marbles transfers, animal-leg counts, minimum score guarantees, cheapest valid pass/combo
- Core skill:
  - translate words into equations + constraints, then optimize or solve

### F. Spatial and Visual Reasoning
- Stimulus:
  - tile completion, faulty segment displays, side/top views, piece assembly, cut-and-fit patterns
- Core skill:
  - transformation tracking (rotation/reflection/overlay) and structure consistency

## Distractor Construction Rules
- Each distractor should fail for one clear reason:
  - `converse_error`: treats “if P then Q” as “if Q then P”
  - `scope_error`: switches from “some” to “all” (or vice versa)
  - `possibility_error`: treats possible as certain
  - `irrelevance`: true but does not affect the conclusion
  - `partial_case`: works only in one scenario, not all required scenarios
  - `visual_mismatch`: near-fit piece with one orientation/edge contradiction
- Avoid trivial elimination by wording length or obviously extreme language.

## Difficulty Controls

### Easy
- Single logical step.
- Minimal interacting conditions.
- Clear separation between relevant and irrelevant choices.

### Medium
- Two-step logical chain or moderate constraint combination.
- Requires rejecting plausible-but-invalid interpretation.

### Hard
- Multi-constraint interaction, nested conditionals, or subtle quantifier scope.
- Distractors correspond to common valid-looking but invalid transforms.

## Explanation Style Template (Per Item)
Use short, explicit logic.

1. `Correct answer:` option letter.
2. `Why:` minimal proof chain (2-5 lines).
3. `Why not others:` one-line elimination reason per option (or grouped).

Recommended pattern:
- Define the key rule(s).
- Apply rule(s) to test option(s).
- State why one option survives all constraints.

## Original Content Guardrails
- Do not copy source wording, names, numbers, diagrams, or option text.
- Preserve only structure and reasoning demands.
- Use fresh contexts (school clubs, transport, sports, events, household scenarios, science prompts).
- Rotate stimulus style to avoid predictability (text-only, table, mini-chart, symbolic conditions, visual puzzle).

## Recommended Composition For One New 40-Question Set
- Argument evaluation / critical reasoning: `12-14`
- Conditional and set logic: `10-12`
- Constraint ordering + data sufficiency: `8-10`
- Quantitative logic: `5-7`
- Spatial/visual reasoning: `6-8`

## Answer-Key Balance Guidance
- Keep A-D distribution broadly balanced (about `9-11` each across 40).
- Avoid long answer-letter runs (prefer max 3 identical letters in sequence).

## Quality Checklist Before Publish
- Exactly one best answer per question.
- Every “must/cannot” item is tested against all plausible cases.
- Strengthen/weaken options are judged by relevance to the conclusion, not topic similarity.
- Visual options differ by meaningful structure, not cosmetic noise.
- Explanations reference logic, not guesswork language.

## Reusable JSON Shape For New Thinking Sets
```json
{
  "meta": {
    "title": "Selective Thinking Skills Practice - Original Set",
    "time_minutes": 40,
    "total_questions": 40,
    "options_per_question": 4
  },
  "questions": [
    {
      "number": 1,
      "domain": "conditional_logic",
      "type": "mcq_abcd",
      "stimulus_type": "text",
      "stimulus": "...",
      "stem": "...",
      "options": {
        "A": "...",
        "B": "...",
        "C": "...",
        "D": "..."
      },
      "answer": "D",
      "explanation": {
        "why_correct": "...",
        "why_not_others": {
          "A": "...",
          "B": "...",
          "C": "..."
        }
      },
      "skills": ["contrapositive", "must_true"],
      "difficulty": "medium"
    }
  ]
}
```

## Optional Visual Metadata (If Rendering In App)
```json
{
  "visual": {
    "kind": "tile|net|segment_display|top_view|assembly",
    "data": {},
    "notes": "orientation fixed unless stated"
  }
}
```

## Build Workflow
1. Plan domain mix and target difficulties.
2. Draft stem + correct answer logic first.
3. Build three distractors tied to distinct reasoning errors.
4. Validate uniqueness with counterexample testing.
5. Add concise explanations and elimination notes.
6. Run balance and ambiguity checks before release.
