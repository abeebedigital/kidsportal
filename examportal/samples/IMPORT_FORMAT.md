# ExamPortal Import Format

Use either CSV or JSON for Module 3 import preview and commit.

## Required core fields
- `category_slug` (recommended) or `category_name`
- `question_type`
- `question_text`

## Common optional fields
- `exam_year`
- `subject`
- `question_set_title`
- `difficulty_level` (`easy|medium|hard`)
- `hint_text`
- `explanation_text`
- `tags` (comma/semicolon separated)
- `default_marks`
- `negative_marks`
- `is_active`

## Question type specific rules
- `mcq_single` / `mcq_multi`:
  - Provide `option_a` .. `option_d` (at least two options)
  - Provide `correct_option_keys` (for multi use `A,C`)
- `true_false`:
  - `correct_option_keys` required (`A` or `B`)
  - Options default to `True`/`False` if not provided
- `numeric`:
  - `correct_numeric` required
  - `numeric_tolerance` optional
- `short_text`:
  - `correct_text` required

## Examples
- CSV sample: `questions-import-sample.csv`
- JSON sample: `questions-import-sample.json`
