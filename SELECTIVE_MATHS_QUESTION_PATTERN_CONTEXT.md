# Selective Maths Question Pattern Context (Original Content Blueprint)

This file captures the **structure and cognitive pattern** of the  SHS Mathematical Reasoning sample so we can create **new, original** maths question sets with similar style and level.



## Exam-Style Blueprint (Observed)
- Total items: `35`
- Time: `40 minutes`
- Options per item: `A/B/C/D/E` (single best answer)
- Marking behavior: attempt all (no penalty for wrong answers)
- Tools: no calculators, no dictionaries

## Global Design Characteristics
- Mixed-domain paper rather than strict topic blocks.
- Heavy use of concise word problems with diagrams, scales, tables, and graphs.
- Frequent multi-step reasoning where one operation is not enough.
- Many distractors target common procedural slips (unit errors, operation choice, rounding mistakes, partial counting).

## Inferred Flow Pattern (From Question Order)
The sample appears to progress from quicker foundational items toward denser multi-step and spatial/algebraic reasoning.

1. `Q1-Q12` Foundational mixed fluency with visual reading
- Time, fractions, place value, scale reading, symmetry, multiples, area, probability, graph interpretation.

2. `Q13-Q24` Multi-step arithmetic + logical structure
- Reverse operations, angle/symmetry setup, remainder equations, composite perimeter, statement-check items, magic square, mass/temperature/rounding, fractional comparison, simultaneous constraints.

3. `Q25-Q35` Spatial/algebraic/combinatorial depth
- 3D properties, place-value ratio, time-zone travel, composite area, rotational symmetry, cube nets, perimeter-difference reasoning, recursive sequence, symbol-value deduction, counting with exclusions.

Note: This 3-block grouping is an inference from the sample sequence and explained-answer demands, not an official sectioning.

## Item Archetypes To Reuse (Do Not Copy Originals)

### A. Numerical Reasoning
- Patterns:
  - place value comparisons
  - rounding to different place values then comparing
  - multiples/factors with constraints
  - remainder forms and number sentences
- Common traps:
  - wrong place-value digit used
  - forgetting remainder in reconstruction
  - choosing closest-looking option without full recalculation

### B. Fraction/Ratio/Probability
- Patterns:
  - “who ate the rest” style fraction complement
  - probability from ratio statements
  - statement-validation sets (1/2/3 correct?)
- Common traps:
  - adding only visible fractions and missing complement
  - mixing part-part with part-whole
  - converting between equivalent forms incorrectly

### C. Measurement & Units
- Patterns:
  - reading scales with non-1 increments
  - mass/volume after additions/removals
  - perimeter/area of composite shapes
  - time and time-zone elapsed problems
- Common traps:
  - unit conversion mistakes (`mm/cm/m`, `mL/L`, hours/day rollover)
  - subtracting/adding from wrong baseline
  - partial perimeter counting

### D. Geometry & Spatial
- Patterns:
  - line/rotational symmetry
  - angle inference using symmetry + straight angle/total angle
  - net validity for cubes
  - 3D face/edge/vertex counting
- Common traps:
  - counting hidden/overlapping edges
  - confusing reflection with rotation
  - missing overlap conflicts in nets

### E. Algebraic & Logical Structures
- Patterns:
  - symbol equations
  - recursive sequence fill
  - relationship deduction from paired totals
  - combinatorial counting with exclusions
- Common traps:
  - solving only one equation and stopping
  - ignoring dependency between steps
  - double-counting excluded cases

## Response-Option Design Rules (A-E)
- Keep all five options plausible at first glance.
- Use one clearly correct option and four targeted misconception options.
- Avoid “joke” options or impossible magnitudes unless testing estimation.
- Keep numeric spacing deliberate:
  - one near-correct from a single arithmetic slip
  - one from unit error
  - one from operation inversion
  - one from premature rounding/truncation

## Difficulty Controls

### Easy
- Single operation + direct reading.
- Minimal language load.
- Distinct distractors.

### Medium
- Two linked steps or conversion + operation.
- One representation (graph/scale/diagram) plus inference.
- Distractors are procedurally plausible.

### Hard
- 3+ linked steps or embedded conditions.
- Cross-domain reasoning (e.g., geometry + algebra, probability + logic).
- Distractors match intermediate results from incomplete methods.

## Explanation Style Template (Per Item)
Use concise, audit-friendly explanations:

1. `Correct answer:` one line (`A-E` + value).
2. `Method:` 2-5 explicit steps in order.
3. `Check:` a quick validation (unit, substitution, reasonableness).
4. `Why common wrong choices happen:` short elimination note.

Example skeleton:
- Correct answer: `D 42 cm`
- Method: Read missing lengths from total width/height, sum all boundary segments, compute perimeter.
- Check: Result exceeds outer rectangle side sum due to notches, which is expected.
- Why not others: one option is from area, one from missed inner edges, one from unit mix, one from single-notch count.

## Original Content Guardrails
- Do not copy passages, diagrams, numbers, wording, or option sets from the sample.
- Preserve only structure, reasoning demand, and distractor style.
- Use fresh contexts (sports, travel, cooking, science, school logistics, design).
- Rotate representation formats across sets (line graph, table, scale, schematic, net diagram prompts).

## Recommended Composition For One New 35-Question Set
- Number & operations: `8-10`
- Fractions/ratio/probability: `6-8`
- Measurement/units/time: `7-9`
- Geometry/spatial: `6-8`
- Algebra/logic/combinatorics: `4-6`

## Answer-Key Balance Guidance
- Keep A-E distribution broadly balanced (approx `6-8` each across 35).
- Avoid long letter runs (prefer no more than 3 identical letters consecutively).

## Quality Checklist Before Publish
- Every item has exactly one unambiguous best answer.
- All units are explicit where required.
- Diagrams/scales are readable and consistent with values.
- Explanations verify final answer with at least one sanity check.
- Distractors can be traced to realistic misconceptions.
- Language load is concise enough for timed testing.

## Reusable JSON Shape For New Maths Sets
```json
{
  "meta": {
    "title": "Selective Maths Practice - Original Set",
    "time_minutes": 40,
    "total_questions": 35,
    "options_per_question": 5
  },
  "questions": [
    {
      "number": 1,
      "domain": "measurement_time",
      "type": "mcq_abcde",
      "representation": "text_only",
      "stem": "...",
      "options": {
        "A": "...",
        "B": "...",
        "C": "...",
        "D": "...",
        "E": "..."
      },
      "answer": "E",
      "value_answer": "7:05 pm",
      "explanation": {
        "method_steps": [
          "...",
          "..."
        ],
        "sanity_check": "...",
        "misconception_notes": {
          "A": "...",
          "B": "...",
          "C": "...",
          "D": "..."
        }
      },
      "skills": ["time_conversion", "elapsed_time"],
      "difficulty": "easy"
    }
  ]
}
```

## Optional Diagram Metadata (If Rendering In App)
```json
{
  "diagram": {
    "kind": "scale|grid|net|bar|line_graph|shape",
    "data": {},
    "not_to_scale": true
  }
}
```

## Build Workflow
1. Draft stems by domain plan.
2. Set correct answers first.
3. Build four misconception-driven distractors per item.
4. Verify uniqueness of correct answer.
5. Write method + check explanations.
6. Run unit and answer-balance QA.
