<?php
declare(strict_types=1);
require_once __DIR__ . '/../config/app.php';

ep_require_admin();

$user = ep_current_user();
if (!$user) {
    ep_redirect('user/login.php');
}

function ep_question_form_defaults(): array
{
    return [
        'id' => 0,
        'category_id' => 0,
        'subject_id' => 0,
        'new_subject_name' => '',
        'question_set_id' => 0,
        'question_type' => 'mcq_single',
        'exam_year' => '',
        'difficulty_level' => 'medium',
        'question_text' => '',
        'hint_text' => '',
        'explanation_text' => '',
        'default_marks' => '1',
        'negative_marks' => '0',
        'option_a' => '',
        'option_b' => '',
        'option_c' => '',
        'option_d' => '',
        'correct_option_keys' => '',
        'correct_numeric' => '',
        'numeric_tolerance' => '',
        'correct_text' => '',
        'tags_csv' => '',
        'is_active' => 1,
    ];
}

function ep_parse_option_keys(string $value): array
{
    $parts = preg_split('/[\s,]+/', strtoupper(trim($value))) ?: [];
    $keys = [];
    foreach ($parts as $part) {
        $key = substr(trim($part), 0, 1);
        if ($key === '') {
            continue;
        }
        if (!preg_match('/^[A-Z]$/', $key)) {
            continue;
        }
        $keys[$key] = $key;
    }

    return array_values($keys);
}

$form = ep_question_form_defaults();
$mode = (string) ($_GET['mode'] ?? 'list');
$editId = (int) ($_GET['id'] ?? 0);

if ($mode === 'edit' && $editId > 0) {
    $question = ep_get_question_detail($editId);
    if (!$question) {
        ep_flash_set('error', 'Question not found.');
        ep_redirect('admin/questions.php');
    }

    $form['id'] = (int) $question['id'];
    $form['category_id'] = (int) $question['category_id'];
    $form['subject_id'] = (int) ($question['subject_id'] ?? 0);
    $form['question_set_id'] = (int) ($question['question_set_id'] ?? 0);
    $form['question_type'] = (string) $question['question_type'];
    $form['exam_year'] = (string) ($question['exam_year'] ?? '');
    $form['difficulty_level'] = (string) $question['difficulty_level'];
    $form['question_text'] = (string) $question['question_text'];
    $form['hint_text'] = (string) ($question['hint_text'] ?? '');
    $form['explanation_text'] = (string) ($question['explanation_text'] ?? '');
    $form['default_marks'] = (string) $question['default_marks'];
    $form['negative_marks'] = (string) $question['negative_marks'];
    $form['is_active'] = (int) $question['is_active'];

    $opts = ep_get_question_options($editId);
    foreach ($opts as $opt) {
        $slot = 'option_' . strtolower((string) $opt['option_key']);
        if (array_key_exists($slot, $form)) {
            $form[$slot] = (string) $opt['option_text'];
        }
    }

    $answerKey = ep_get_question_answer_key($editId);
    if ($answerKey) {
        $form['correct_option_keys'] = (string) ($answerKey['correct_option_keys'] ?? '');
        $form['correct_numeric'] = $answerKey['correct_numeric'] !== null ? (string) $answerKey['correct_numeric'] : '';
        $form['numeric_tolerance'] = $answerKey['numeric_tolerance'] !== null ? (string) $answerKey['numeric_tolerance'] : '';
        $form['correct_text'] = (string) ($answerKey['correct_text'] ?? '');
    }

    $tags = ep_get_question_tags($editId);
    if ($tags) {
        $form['tags_csv'] = implode(', ', array_map(static fn(array $t): string => (string) $t['name'], $tags));
    }
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $csrfToken = $_POST['csrf_token'] ?? null;
    if (!ep_verify_csrf_token(is_string($csrfToken) ? $csrfToken : null)) {
        ep_flash_set('error', 'Session validation failed. Please refresh and try again.');
        ep_redirect('admin/questions.php');
    }

    $postAction = (string) ($_POST['post_action'] ?? '');

    if ($postAction === 'toggle_status') {
        $questionId = (int) ($_POST['question_id'] ?? 0);
        $targetStatus = (int) ($_POST['target_status'] ?? 0) === 1;
        $result = ep_set_question_active_status($questionId, $targetStatus, (int) $user['id']);
        if (!($result['ok'] ?? false)) {
            ep_flash_set('error', (string) ($result['message'] ?? 'Unable to update status.'));
        } else {
            ep_flash_set('success', (string) ($result['message'] ?? 'Status updated.'));
        }
        ep_redirect('admin/questions.php');
    }

    if ($postAction === 'save_question') {
        $form = [
            'id' => (int) ($_POST['id'] ?? 0),
            'category_id' => (int) ($_POST['category_id'] ?? 0),
            'subject_id' => (int) ($_POST['subject_id'] ?? 0),
            'new_subject_name' => trim((string) ($_POST['new_subject_name'] ?? '')),
            'question_set_id' => (int) ($_POST['question_set_id'] ?? 0),
            'question_type' => (string) ($_POST['question_type'] ?? 'mcq_single'),
            'exam_year' => trim((string) ($_POST['exam_year'] ?? '')),
            'difficulty_level' => (string) ($_POST['difficulty_level'] ?? 'medium'),
            'question_text' => trim((string) ($_POST['question_text'] ?? '')),
            'hint_text' => trim((string) ($_POST['hint_text'] ?? '')),
            'explanation_text' => trim((string) ($_POST['explanation_text'] ?? '')),
            'default_marks' => trim((string) ($_POST['default_marks'] ?? '1')),
            'negative_marks' => trim((string) ($_POST['negative_marks'] ?? '0')),
            'option_a' => trim((string) ($_POST['option_a'] ?? '')),
            'option_b' => trim((string) ($_POST['option_b'] ?? '')),
            'option_c' => trim((string) ($_POST['option_c'] ?? '')),
            'option_d' => trim((string) ($_POST['option_d'] ?? '')),
            'correct_option_keys' => trim((string) ($_POST['correct_option_keys'] ?? '')),
            'correct_numeric' => trim((string) ($_POST['correct_numeric'] ?? '')),
            'numeric_tolerance' => trim((string) ($_POST['numeric_tolerance'] ?? '')),
            'correct_text' => trim((string) ($_POST['correct_text'] ?? '')),
            'tags_csv' => trim((string) ($_POST['tags_csv'] ?? '')),
            'is_active' => isset($_POST['is_active']) ? 1 : 0,
        ];

        $questionType = $form['question_type'];
        $allowedTypes = ['mcq_single', 'mcq_multi', 'numeric', 'short_text', 'true_false'];
        if (!in_array($questionType, $allowedTypes, true)) {
            $questionType = 'mcq_single';
            $form['question_type'] = $questionType;
        }

        $options = [];
        if ($questionType === 'true_false') {
            $options[] = ['key' => 'A', 'text' => $form['option_a'] !== '' ? $form['option_a'] : 'True', 'is_correct' => 0];
            $options[] = ['key' => 'B', 'text' => $form['option_b'] !== '' ? $form['option_b'] : 'False', 'is_correct' => 0];

            if ($form['correct_option_keys'] === '') {
                $form['correct_option_keys'] = 'A';
            }
        }

        if ($questionType === 'mcq_single' || $questionType === 'mcq_multi') {
            foreach (['A', 'B', 'C', 'D'] as $letter) {
                $field = 'option_' . strtolower($letter);
                $text = $form[$field];
                if ($text !== '') {
                    $options[] = ['key' => $letter, 'text' => $text, 'is_correct' => 0];
                }
            }
        }

        $validationError = null;
        if (($questionType === 'mcq_single' || $questionType === 'mcq_multi') && count($options) < 2) {
            $validationError = 'Add at least two answer options for MCQ questions.';
            $mode = $form['id'] > 0 ? 'edit' : 'new';
        } else {
            $correctKeys = ep_parse_option_keys($form['correct_option_keys']);
            $optionLetters = array_map(static fn(array $o): string => $o['key'], $options);
            $optionLookup = array_flip($optionLetters);

            if (($questionType === 'mcq_single' || $questionType === 'mcq_multi' || $questionType === 'true_false')) {
                if (!$correctKeys) {
                    $validationError = 'Provide correct option key(s). Example: A or A,C';
                    $mode = $form['id'] > 0 ? 'edit' : 'new';
                } else {
                    foreach ($correctKeys as $k) {
                        if (!isset($optionLookup[$k])) {
                            $validationError = 'Correct key ' . $k . ' does not match provided options.';
                            $mode = $form['id'] > 0 ? 'edit' : 'new';
                            break;
                        }
                    }
                }

                if ($questionType === 'mcq_single' || $questionType === 'true_false') {
                    if ($validationError === null && count($correctKeys) !== 1) {
                        $validationError = 'Single-answer questions must have exactly one correct option.';
                        $mode = $form['id'] > 0 ? 'edit' : 'new';
                    }
                }
            }

            $answerType = 'single_option';
            $correctText = '';
            $correctNumeric = null;
            $numericTolerance = null;

            if ($questionType === 'mcq_multi') {
                $answerType = 'multi_option';
            } elseif ($questionType === 'numeric') {
                $answerType = 'numeric';
                if ($form['correct_numeric'] === '' || !is_numeric($form['correct_numeric'])) {
                    $validationError = 'Numeric questions require a valid correct numeric value.';
                    $mode = $form['id'] > 0 ? 'edit' : 'new';
                } else {
                    $correctNumeric = (float) $form['correct_numeric'];
                    if ($form['numeric_tolerance'] !== '') {
                        if (!is_numeric($form['numeric_tolerance'])) {
                            $validationError = 'Numeric tolerance must be a number.';
                            $mode = $form['id'] > 0 ? 'edit' : 'new';
                        } else {
                            $numericTolerance = (float) $form['numeric_tolerance'];
                        }
                    }
                }
                $correctKeys = [];
                $options = [];
            } elseif ($questionType === 'short_text') {
                $answerType = 'text';
                if ($form['correct_text'] === '') {
                    $validationError = 'Short text questions require an expected answer.';
                    $mode = $form['id'] > 0 ? 'edit' : 'new';
                }
                $correctText = $form['correct_text'];
                $correctKeys = [];
                $options = [];
            }

            if ($validationError === null) {
                $tags = ep_parse_tags_csv($form['tags_csv']);
                $payload = [
                    'category_id' => $form['category_id'],
                    'subject_id' => $form['subject_id'],
                    'new_subject_name' => $form['new_subject_name'],
                    'question_set_id' => $form['question_set_id'],
                    'question_type' => $questionType,
                    'exam_year' => $form['exam_year'],
                    'difficulty_level' => $form['difficulty_level'],
                    'question_text' => $form['question_text'],
                    'hint_text' => $form['hint_text'],
                    'explanation_text' => $form['explanation_text'],
                    'default_marks' => (float) $form['default_marks'],
                    'negative_marks' => (float) $form['negative_marks'],
                    'is_active' => $form['is_active'],
                    'options' => array_map(
                        static function (array $opt) use ($correctKeys): array {
                            $opt['is_correct'] = in_array($opt['key'], $correctKeys, true) ? 1 : 0;
                            return $opt;
                        },
                        $options
                    ),
                    'answer' => [
                        'answer_type' => $answerType,
                        'correct_option_keys' => implode(',', $correctKeys),
                        'correct_text' => $correctText,
                        'correct_numeric' => $correctNumeric,
                        'numeric_tolerance' => $numericTolerance,
                        'answer_meta_json' => [
                            'question_type' => $questionType,
                        ],
                    ],
                    'tags' => $tags,
                ];

                $save = ep_save_question_bank_entry(
                    $payload,
                    (int) $user['id'],
                    $form['id'] > 0 ? (int) $form['id'] : null
                );

                if (!($save['ok'] ?? false)) {
                    ep_flash_set('error', (string) ($save['message'] ?? 'Failed to save question.'));
                    $mode = $form['id'] > 0 ? 'edit' : 'new';
                } else {
                    ep_flash_set('success', (string) ($save['message'] ?? 'Question saved.'));
                    ep_redirect('admin/questions.php');
                }
            } else {
                ep_flash_set('error', $validationError);
            }
        }
    }
}

$categories = ep_get_categories_for_admin();
$subjects = ep_get_subjects_for_admin();
$questionSets = ep_get_question_sets_for_admin();
$knownTags = ep_get_all_tags();

$viewForm = ($mode === 'new' || $mode === 'edit');

$filters = [
    'search' => trim((string) ($_GET['search'] ?? '')),
    'category_id' => (int) ($_GET['category_id'] ?? 0),
    'difficulty' => (string) ($_GET['difficulty'] ?? ''),
    'question_type' => (string) ($_GET['question_type'] ?? ''),
    'status' => (string) ($_GET['status'] ?? 'all'),
];

$page = max(1, (int) ($_GET['page'] ?? 1));
$limit = 25;
$offset = ($page - 1) * $limit;
$questionBank = ep_get_question_bank($filters, $limit, $offset);
$items = $questionBank['items'];
$total = (int) $questionBank['total'];
$totalPages = max(1, (int) ceil($total / $limit));

ep_render_page_start([
    'title' => 'Question Bank',
    'active' => 'admin',
    'hero_kicker' => 'Module 2',
    'hero_title' => 'Admin Question Bank',
    'hero_text' => 'Create, edit, search, and archive question records with answer keys, options, difficulty, and tags.',
]);
?>

<section class="panel">
  <div class="actions">
    <a class="btn-link" href="<?= h(examportal_url('admin/questions.php?mode=new')); ?>">+ Add Question</a>
    <a class="btn-link" href="<?= h(examportal_url('admin/import.php')); ?>">Import CSV/JSON</a>
    <a class="btn-link" href="<?= h(examportal_url('admin/papers.php')); ?>">Open Paper Builder</a>
    <a class="btn-link btn-outline" href="<?= h(examportal_url('admin/index.php')); ?>">Back to Admin Home</a>
  </div>
</section>

<?php if ($viewForm): ?>
  <section class="panel">
    <h2 class="section-title">Question Editor</h2>
    <form method="post" class="question-form-grid">
      <input type="hidden" name="csrf_token" value="<?= h(ep_csrf_token()); ?>">
      <input type="hidden" name="post_action" value="save_question">
      <input type="hidden" name="id" value="<?= (int) $form['id']; ?>">

      <label for="category_id">Category</label>
      <select id="category_id" name="category_id" required>
        <option value="">Select category</option>
        <?php foreach ($categories as $category): ?>
          <option value="<?= (int) $category['id']; ?>" <?= (int) $form['category_id'] === (int) $category['id'] ? 'selected' : ''; ?>>
            <?= h((string) $category['name']); ?>
          </option>
        <?php endforeach; ?>
      </select>

      <label for="subject_id">Subject (existing)</label>
      <select id="subject_id" name="subject_id">
        <option value="0">None</option>
        <?php foreach ($subjects as $subject): ?>
          <option value="<?= (int) $subject['id']; ?>" <?= (int) $form['subject_id'] === (int) $subject['id'] ? 'selected' : ''; ?>>
            <?= h((string) $subject['category_name'] . ' — ' . (string) $subject['name']); ?>
          </option>
        <?php endforeach; ?>
      </select>

      <label for="new_subject_name">Subject (new)</label>
      <input id="new_subject_name" name="new_subject_name" type="text" value="<?= h((string) $form['new_subject_name']); ?>" placeholder="Create a new subject if needed">

      <label for="question_set_id">Question Set (optional)</label>
      <select id="question_set_id" name="question_set_id">
        <option value="0">None</option>
        <?php foreach ($questionSets as $set): ?>
          <option value="<?= (int) $set['id']; ?>" <?= (int) $form['question_set_id'] === (int) $set['id'] ? 'selected' : ''; ?>>
            <?= h((string) $set['category_name'] . ' — ' . (string) $set['title']); ?>
          </option>
        <?php endforeach; ?>
      </select>

      <label for="exam_year">Exam Year/Level</label>
      <input id="exam_year" name="exam_year" type="text" value="<?= h((string) $form['exam_year']); ?>" placeholder="Year 5, 2026, Foundation">

      <label for="question_type">Question Type</label>
      <select id="question_type" name="question_type" required>
        <?php foreach (['mcq_single' => 'MCQ Single', 'mcq_multi' => 'MCQ Multiple', 'true_false' => 'True / False', 'numeric' => 'Numeric', 'short_text' => 'Short Text'] as $key => $label): ?>
          <option value="<?= h($key); ?>" <?= (string) $form['question_type'] === $key ? 'selected' : ''; ?>><?= h($label); ?></option>
        <?php endforeach; ?>
      </select>

      <label for="difficulty_level">Difficulty</label>
      <select id="difficulty_level" name="difficulty_level" required>
        <?php foreach (['easy' => 'Easy', 'medium' => 'Medium', 'hard' => 'Hard'] as $key => $label): ?>
          <option value="<?= h($key); ?>" <?= (string) $form['difficulty_level'] === $key ? 'selected' : ''; ?>><?= h($label); ?></option>
        <?php endforeach; ?>
      </select>

      <label for="default_marks">Marks</label>
      <input id="default_marks" name="default_marks" type="number" step="0.01" min="0" value="<?= h((string) $form['default_marks']); ?>" required>

      <label for="negative_marks">Negative Marks</label>
      <input id="negative_marks" name="negative_marks" type="number" step="0.01" min="0" value="<?= h((string) $form['negative_marks']); ?>" required>

      <label for="question_text">Question</label>
      <textarea id="question_text" name="question_text" rows="5" required><?= h((string) $form['question_text']); ?></textarea>

      <label for="option_a">Option A</label>
      <input id="option_a" name="option_a" type="text" value="<?= h((string) $form['option_a']); ?>">

      <label for="option_b">Option B</label>
      <input id="option_b" name="option_b" type="text" value="<?= h((string) $form['option_b']); ?>">

      <label for="option_c">Option C</label>
      <input id="option_c" name="option_c" type="text" value="<?= h((string) $form['option_c']); ?>">

      <label for="option_d">Option D</label>
      <input id="option_d" name="option_d" type="text" value="<?= h((string) $form['option_d']); ?>">

      <label for="correct_option_keys">Correct Option Key(s)</label>
      <input id="correct_option_keys" name="correct_option_keys" type="text" value="<?= h((string) $form['correct_option_keys']); ?>" placeholder="A or A,C">

      <label for="correct_numeric">Correct Numeric Answer</label>
      <input id="correct_numeric" name="correct_numeric" type="number" step="0.0001" value="<?= h((string) $form['correct_numeric']); ?>">

      <label for="numeric_tolerance">Numeric Tolerance</label>
      <input id="numeric_tolerance" name="numeric_tolerance" type="number" step="0.0001" min="0" value="<?= h((string) $form['numeric_tolerance']); ?>" placeholder="Optional">

      <label for="correct_text">Correct Text Answer</label>
      <textarea id="correct_text" name="correct_text" rows="2"><?= h((string) $form['correct_text']); ?></textarea>

      <label for="hint_text">Hint</label>
      <textarea id="hint_text" name="hint_text" rows="2"><?= h((string) $form['hint_text']); ?></textarea>

      <label for="explanation_text">Explanation</label>
      <textarea id="explanation_text" name="explanation_text" rows="3"><?= h((string) $form['explanation_text']); ?></textarea>

      <label for="tags_csv">Tags (comma-separated)</label>
      <input id="tags_csv" name="tags_csv" type="text" value="<?= h((string) $form['tags_csv']); ?>" placeholder="algebra, grammar, comprehension">

      <label class="checkbox-row" for="is_active">
        <input id="is_active" name="is_active" type="checkbox" <?= !empty($form['is_active']) ? 'checked' : ''; ?>>
        Active
      </label>

      <div class="form-actions">
        <button class="btn" type="submit"><?= (int) $form['id'] > 0 ? 'Update Question' : 'Save Question'; ?></button>
        <a class="btn-link btn-outline" href="<?= h(examportal_url('admin/questions.php')); ?>">Cancel</a>
      </div>
    </form>

    <?php if ($knownTags): ?>
      <p class="inline-note">Known tags: <?= h(implode(', ', array_map(static fn(array $t): string => (string) $t['name'], $knownTags))); ?></p>
    <?php endif; ?>
  </section>
<?php endif; ?>

<section class="panel">
  <h2 class="section-title">Question List</h2>

  <form method="get" class="filter-grid">
    <input type="hidden" name="mode" value="list">
    <input type="text" name="search" value="<?= h((string) $filters['search']); ?>" placeholder="Search question text">

    <select name="category_id">
      <option value="0">All categories</option>
      <?php foreach ($categories as $category): ?>
        <option value="<?= (int) $category['id']; ?>" <?= (int) $filters['category_id'] === (int) $category['id'] ? 'selected' : ''; ?>>
          <?= h((string) $category['name']); ?>
        </option>
      <?php endforeach; ?>
    </select>

    <select name="difficulty">
      <option value="">All difficulty</option>
      <?php foreach (['easy', 'medium', 'hard'] as $difficulty): ?>
        <option value="<?= h($difficulty); ?>" <?= (string) $filters['difficulty'] === $difficulty ? 'selected' : ''; ?>><?= h(ucfirst($difficulty)); ?></option>
      <?php endforeach; ?>
    </select>

    <select name="question_type">
      <option value="">All types</option>
      <?php foreach (['mcq_single', 'mcq_multi', 'true_false', 'numeric', 'short_text'] as $type): ?>
        <option value="<?= h($type); ?>" <?= (string) $filters['question_type'] === $type ? 'selected' : ''; ?>><?= h($type); ?></option>
      <?php endforeach; ?>
    </select>

    <select name="status">
      <?php foreach (['all' => 'All', 'active' => 'Active', 'archived' => 'Archived'] as $key => $label): ?>
        <option value="<?= h($key); ?>" <?= (string) $filters['status'] === $key ? 'selected' : ''; ?>><?= h($label); ?></option>
      <?php endforeach; ?>
    </select>

    <button class="btn" type="submit">Apply</button>
  </form>

  <p class="inline-note">Showing <?= count($items); ?> of <?= $total; ?> questions.</p>

  <div class="question-table-wrap">
    <table class="question-table">
      <thead>
        <tr>
          <th>ID</th>
          <th>Category</th>
          <th>Subject</th>
          <th>Type</th>
          <th>Difficulty</th>
          <th>Question</th>
          <th>Tags</th>
          <th>Status</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <?php if (!$items): ?>
          <tr>
            <td colspan="9">No questions found for current filter.</td>
          </tr>
        <?php else: ?>
          <?php foreach ($items as $item): ?>
            <tr>
              <td>#<?= (int) $item['id']; ?></td>
              <td><?= h((string) $item['category_name']); ?></td>
              <td><?= h((string) ($item['subject_name'] ?? '—')); ?></td>
              <td><?= h((string) $item['question_type']); ?></td>
              <td><?= h((string) ucfirst((string) $item['difficulty_level'])); ?></td>
              <td><?= h(substr((string) $item['question_text'], 0, 120)); ?><?= strlen((string) $item['question_text']) > 120 ? '…' : ''; ?></td>
              <td><?= h((string) ($item['tags'] ?? '')); ?></td>
              <td>
                <span class="pill <?= (int) $item['is_active'] === 1 ? 'pill-good' : 'pill-bad'; ?>">
                  <?= (int) $item['is_active'] === 1 ? 'Active' : 'Archived'; ?>
                </span>
              </td>
              <td>
                <div class="table-actions">
                  <a class="btn-link btn-outline" href="<?= h(examportal_url('admin/questions.php?mode=edit&id=' . (int) $item['id'])); ?>">Edit</a>
                  <form method="post" class="inline-form">
                    <input type="hidden" name="csrf_token" value="<?= h(ep_csrf_token()); ?>">
                    <input type="hidden" name="post_action" value="toggle_status">
                    <input type="hidden" name="question_id" value="<?= (int) $item['id']; ?>">
                    <input type="hidden" name="target_status" value="<?= (int) $item['is_active'] === 1 ? '0' : '1'; ?>">
                    <button class="btn btn-mini" type="submit"><?= (int) $item['is_active'] === 1 ? 'Archive' : 'Restore'; ?></button>
                  </form>
                </div>
              </td>
            </tr>
          <?php endforeach; ?>
        <?php endif; ?>
      </tbody>
    </table>
  </div>

  <?php if ($totalPages > 1): ?>
    <div class="pagination">
      <?php for ($p = 1; $p <= $totalPages; $p++): ?>
        <?php
          $query = $_GET;
          $query['page'] = $p;
          $query['mode'] = 'list';
          $url = examportal_url('admin/questions.php?' . http_build_query($query));
        ?>
        <a class="<?= $p === $page ? 'page-link current' : 'page-link'; ?>" href="<?= h($url); ?>"><?= $p; ?></a>
      <?php endfor; ?>
    </div>
  <?php endif; ?>
</section>

<?php ep_render_page_end(); ?>
