# Selective Writing Task Pattern Context (Original Content Blueprint)

This file captures the **task design pattern** from the SHS Writing sample paper so we can build **new, original** writing tasks in the same style and level.


## Exam-Style Blueprint (Observed)
- Total tasks: `1`
- Time: `30 minutes`
- Format: one prompt, extended written response
- Working method:
  - planning notes can be made on question paper
  - final response must be written on separate answer sheet
- Tools: no dictionaries, no calculators

## Prompt Pattern (Observed)
- Stimulus context: practical school/community scenario
- Audience: clearly defined (`new students`)
- Purpose: practical + persuasive (`help them settle`, `make them enthusiastic`)
- Genre cue: functional writing (`advice sheet`)
- Core instruction: explain how to succeed both in school and local area

## What The Task Is Testing (Inferred From Instructions)
- selecting relevant ideas for a specific audience
- developing and organizing ideas clearly
- communicating effectively for purpose and context
- using structure/layout that supports message

## Reusable Task Archetype

### Audience + Purpose Functional Writing
- Typical frame:
  - “You have been asked to create [genre] for [audience] about [situation].”
  - “Write [genre] that helps [audience] [goal] and feel [intended effect].”
- Strong fit genres:
  - advice sheet
  - welcome guide
  - orientation letter
  - survival checklist with explanations
  - short handbook page

## Difficulty Controls

### Easier
- single audience
- one clear goal
- familiar school context

### Medium
- two linked goals (practical + motivational)
- mixed contexts (school + community)
- expectation of clear sequencing and subheadings

### Hard
- audience with specific constraints (new language speaker, remote transfer, nervous starter)
- competing priorities (safety, belonging, achievement, time)
- requires nuanced tone and tight relevance

## Quality Features For High-Scoring Responses (Use As Generation Targets)
- clear opening that addresses the audience directly
- structured sections with meaningful headings
- concrete, actionable advice (not vague slogans)
- explanation of *why* each tip matters
- positive, credible voice matched to audience
- coherent progression from orientation -> habits -> support systems -> encouragement
- purposeful ending that reinforces confidence and belonging

## Common Weakness Patterns To Avoid
- generic advice not tied to the audience
- list-only writing with no development
- off-task storytelling that ignores functional purpose
- abrupt structure with no logical flow
- repetitive language and weak sentence control

## Explanation/Feedback Template (For Generated Sample Responses)
Use this format when evaluating or annotating student writing:
1. `Purpose & Audience Fit`
2. `Ideas & Development`
3. `Organisation & Cohesion`
4. `Language Control`
5. `Next-step improvements` (2-3 precise actions)

## Original Content Guardrails
- Do not reuse source prompt wording.
- Keep same task type (single timed functional response) but vary:
  - setting
  - audience details
  - practical priorities
  - tone goals
- Ensure each prompt remains school-age appropriate and culturally neutral.

## Prompt Generation Blueprint
Each new prompt should define:
- role of writer
- intended audience
- communication purpose
- required form/genre
- minimum coverage points (2-4 themes)
- desired tone

## Reusable JSON Shape For New Writing Tasks
```json
{
  "meta": {
    "title": "Selective Writing Practice - Original Task",
    "time_minutes": 30,
    "task_count": 1
  },
  "task": {
    "id": "writing_task_01",
    "genre": "advice_sheet",
    "writer_role": "current student",
    "audience": "new students to the area",
    "purpose": "help them settle and feel positive about school/community",
    "prompt": "...",
    "required_coverage": [
      "school routines",
      "friendship/belonging",
      "local-area navigation",
      "where to seek help"
    ],
    "tone_targets": ["welcoming", "encouraging", "practical"],
    "planning_hints": [
      "group ideas under short headings",
      "include specific examples",
      "explain why each tip helps"
    ]
  },
  "evaluation_rubric": {
    "criteria": [
      "audience_purpose_fit",
      "idea_quality_and_depth",
      "organisation_and_cohesion",
      "language_control"
    ]
  }
}
```

## Build Workflow
1. Pick audience + scenario.
2. Define exact purpose and tone.
3. Set 3-4 required coverage points.
4. Draft prompt with clear genre signal.
5. Validate that response demands planning, development, and organisation.
