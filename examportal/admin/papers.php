<?php
declare(strict_types=1);
require_once __DIR__ . '/../config/app.php';

ep_require_admin();

$user = ep_current_user();
if (!$user) {
    ep_redirect('user/login.php');
}

function ep_paper_template_form_defaults(): array
{
    return [
        'id' => 0,
        'title' => '',
        'category_id' => 0,
        'question_set_id' => 0,
        'subject_id' => 0,
        'subject_name' => '',
        'exam_year' => '',
        'instructions' => '',
        'total_questions' => '20',
        'duration_minutes' => '60',
        'default_marks_per_question' => '1',
        'max_attempts_per_user' => '1',
        'allow_pause' => 1,
        'max_pause_count' => '3',
        'no_refresh_mode' => 1,
        'max_refresh_violations' => '1',
        'published_status' => 'draft',
        'is_active' => 1,
        'manual_only' => 0,
        'question_search' => '',
        'difficulty' => '',
        'question_type' => '',
        'selected_question_ids' => [],
        'marks_by_question' => [],
        'sections_by_question' => [],
    ];
}

$form = ep_paper_template_form_defaults();
$mode = (string) ($_GET['mode'] ?? 'list');
$editId = (int) ($_GET['id'] ?? 0);

if ($mode === 'edit' && $editId > 0) {
    $template = ep_get_paper_template_detail($editId);
    if (!$template) {
        ep_flash_set('error', 'Paper template not found.');
        ep_redirect('admin/papers.php');
    }

    $form['id'] = (int) $template['id'];
    $form['title'] = (string) $template['title'];
    $form['category_id'] = (int) $template['category_id'];
    $form['question_set_id'] = (int) ($template['question_set_id'] ?? 0);
    $form['subject_name'] = (string) ($template['subject_name'] ?? '');
    $form['exam_year'] = (string) ($template['exam_year'] ?? '');
    $form['instructions'] = (string) ($template['instructions'] ?? '');
    $form['total_questions'] = (string) ($template['total_questions'] ?? '20');
    $form['duration_minutes'] = (string) ($template['duration_minutes'] ?? '60');
    $form['max_attempts_per_user'] = (string) ($template['max_attempts_per_user'] ?? '1');
    $form['allow_pause'] = (int) ($template['allow_pause'] ?? 1);
    $form['max_pause_count'] = (string) ($template['max_pause_count'] ?? '3');
    $form['no_refresh_mode'] = (int) ($template['no_refresh_mode'] ?? 1);
    $form['max_refresh_violations'] = (string) ($template['max_refresh_violations'] ?? '1');
    $form['published_status'] = (string) ($template['published_status'] ?? 'draft');
    $form['is_active'] = (int) ($template['is_active'] ?? 1);

    $items = ep_get_paper_template_items((int) $template['id']);
    if ($items) {
        $totalMarks = 0.0;
        foreach ($items as $item) {
            $qid = (int) $item['question_id'];
            $form['selected_question_ids'][] = $qid;
            $form['marks_by_question'][$qid] = (string) $item['marks'];
            $form['sections_by_question'][$qid] = (string) ($item['section_name'] ?? '');
            $totalMarks += (float) $item['marks'];
        }

        if (count($items) > 0) {
            $form['default_marks_per_question'] = (string) round($totalMarks / count($items), 2);
        }
    }
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $csrfToken = $_POST['csrf_token'] ?? null;
    if (!ep_verify_csrf_token(is_string($csrfToken) ? $csrfToken : null)) {
        ep_flash_set('error', 'Session validation failed. Please refresh and try again.');
        ep_redirect('admin/papers.php');
    }

    $postAction = (string) ($_POST['post_action'] ?? '');

    if ($postAction === 'set_status') {
        $templateId = (int) ($_POST['template_id'] ?? 0);
        $targetStatus = (string) ($_POST['target_published_status'] ?? 'draft');
        $targetActive = ((int) ($_POST['target_active'] ?? 1)) === 1;

        $result = ep_set_paper_template_publication($templateId, $targetStatus, $targetActive, (int) $user['id']);
        if (!($result['ok'] ?? false)) {
            ep_flash_set('error', (string) ($result['message'] ?? 'Unable to update publish state.'));
        } else {
            ep_flash_set('success', (string) ($result['message'] ?? 'Publish state updated.'));
        }

        ep_redirect('admin/papers.php');
    }

    if ($postAction === 'save_template') {
        $selectedQuestionIds = $_POST['selected_question_ids'] ?? [];
        if (!is_array($selectedQuestionIds)) {
            $selectedQuestionIds = [];
        }

        $marksByQuestion = $_POST['question_mark'] ?? [];
        if (!is_array($marksByQuestion)) {
            $marksByQuestion = [];
        }

        $sectionsByQuestion = $_POST['question_section'] ?? [];
        if (!is_array($sectionsByQuestion)) {
            $sectionsByQuestion = [];
        }

        $form = [
            'id' => (int) ($_POST['id'] ?? 0),
            'title' => trim((string) ($_POST['title'] ?? '')),
            'category_id' => (int) ($_POST['category_id'] ?? 0),
            'question_set_id' => (int) ($_POST['question_set_id'] ?? 0),
            'subject_id' => (int) ($_POST['subject_id'] ?? 0),
            'subject_name' => trim((string) ($_POST['subject_name'] ?? '')),
            'exam_year' => trim((string) ($_POST['exam_year'] ?? '')),
            'instructions' => trim((string) ($_POST['instructions'] ?? '')),
            'total_questions' => trim((string) ($_POST['total_questions'] ?? '20')),
            'duration_minutes' => trim((string) ($_POST['duration_minutes'] ?? '60')),
            'default_marks_per_question' => trim((string) ($_POST['default_marks_per_question'] ?? '1')),
            'max_attempts_per_user' => trim((string) ($_POST['max_attempts_per_user'] ?? '1')),
            'allow_pause' => isset($_POST['allow_pause']) ? 1 : 0,
            'max_pause_count' => trim((string) ($_POST['max_pause_count'] ?? '3')),
            'no_refresh_mode' => isset($_POST['no_refresh_mode']) ? 1 : 0,
            'max_refresh_violations' => trim((string) ($_POST['max_refresh_violations'] ?? '1')),
            'published_status' => (string) ($_POST['published_status'] ?? 'draft'),
            'is_active' => isset($_POST['is_active']) ? 1 : 0,
            'manual_only' => isset($_POST['manual_only']) ? 1 : 0,
            'question_search' => trim((string) ($_POST['question_search'] ?? '')),
            'difficulty' => (string) ($_POST['difficulty'] ?? ''),
            'question_type' => (string) ($_POST['question_type'] ?? ''),
            'selected_question_ids' => array_values(array_map('intval', $selectedQuestionIds)),
            'marks_by_question' => $marksByQuestion,
            'sections_by_question' => $sectionsByQuestion,
        ];

        $save = ep_save_paper_template(
            $form,
            (int) $user['id'],
            $form['id'] > 0 ? (int) $form['id'] : null
        );

        if (!($save['ok'] ?? false)) {
            ep_flash_set('error', (string) ($save['message'] ?? 'Unable to save template.'));
            $mode = $form['id'] > 0 ? 'edit' : 'new';
        } else {
            ep_flash_set('success', (string) ($save['message'] ?? 'Template saved.'));
            ep_redirect('admin/papers.php');
        }
    }
}

$categories = ep_get_categories_for_admin();
$subjects = ep_get_subjects_for_admin();
$questionSets = ep_get_question_sets_for_admin();

$viewForm = ($mode === 'new' || $mode === 'edit');
$candidateRows = [];
$candidateMap = [];
if ($viewForm && (int) $form['category_id'] > 0) {
    $candidateRows = ep_get_template_candidate_questions(
        [
            'category_id' => (int) $form['category_id'],
            'exam_year' => (string) $form['exam_year'],
            'subject_name' => (string) $form['subject_name'],
            'search' => (string) $form['question_search'],
            'difficulty' => (string) $form['difficulty'],
            'question_type' => (string) $form['question_type'],
        ],
        160
    );

    foreach ($candidateRows as $row) {
        $candidateMap[(int) $row['id']] = $row;
    }
}

$selectedQuestionIds = [];
foreach (($form['selected_question_ids'] ?? []) as $rawId) {
    $id = (int) $rawId;
    if ($id > 0) {
        $selectedQuestionIds[$id] = $id;
    }
}
$selectedQuestionIds = array_values($selectedQuestionIds);

$selectedOutsideIds = [];
foreach ($selectedQuestionIds as $selectedId) {
    if (!isset($candidateMap[$selectedId])) {
        $selectedOutsideIds[] = $selectedId;
    }
}
$selectedOutsideRows = $selectedOutsideIds ? ep_get_questions_by_ids($selectedOutsideIds, (int) $form['category_id']) : [];

$listFilters = [
    'search' => trim((string) ($_GET['search'] ?? '')),
    'category_id' => (int) ($_GET['category_id'] ?? 0),
    'published_status' => (string) ($_GET['published_status'] ?? 'all'),
    'activity' => (string) ($_GET['activity'] ?? 'all'),
];
$page = max(1, (int) ($_GET['page'] ?? 1));
$limit = 20;
$offset = ($page - 1) * $limit;
$listData = ep_get_paper_templates_for_admin($listFilters, $limit, $offset);
$listItems = $listData['items'];
$listTotal = (int) $listData['total'];
$totalPages = max(1, (int) ceil($listTotal / $limit));

ep_render_page_start([
    'title' => 'Paper Builder',
    'active' => 'admin',
    'hero_kicker' => 'Module 4',
    'hero_title' => 'Admin Paper Builder',
    'hero_text' => 'Create timed paper templates by category, year, subject, question count, marks, and publish state.',
]);
?>

<section class="panel">
  <div class="actions">
    <a class="btn-link" href="<?= h(examportal_url('admin/papers.php?mode=new')); ?>">+ New Template</a>
    <a class="btn-link btn-outline" href="<?= h(examportal_url('admin/questions.php')); ?>">Question Bank</a>
    <a class="btn-link btn-outline" href="<?= h(examportal_url('admin/index.php')); ?>">Back to Admin Home</a>
  </div>
</section>

<?php if ($viewForm): ?>
  <section class="panel">
    <h2 class="section-title">Template Editor</h2>
    <form id="template-editor-form" method="post" class="question-form-grid">
      <input type="hidden" name="csrf_token" value="<?= h(ep_csrf_token()); ?>">
      <input type="hidden" name="post_action" value="save_template">
      <input type="hidden" name="id" value="<?= (int) $form['id']; ?>">

      <label for="title">Template Title</label>
      <input id="title" name="title" type="text" value="<?= h((string) $form['title']); ?>" placeholder="NAPLAN Year 5 Numeracy Mock 01" required>

      <label for="category_id">Category</label>
      <select id="category_id" name="category_id" required>
        <option value="0">Select category</option>
        <?php foreach ($categories as $category): ?>
          <option value="<?= (int) $category['id']; ?>" <?= (int) $form['category_id'] === (int) $category['id'] ? 'selected' : ''; ?>>
            <?= h((string) $category['name']); ?>
          </option>
        <?php endforeach; ?>
      </select>

      <label for="question_set_id">Question Set (optional)</label>
      <select id="question_set_id" name="question_set_id">
        <option value="0">None</option>
        <?php foreach ($questionSets as $set): ?>
          <option value="<?= (int) $set['id']; ?>" <?= (int) $form['question_set_id'] === (int) $set['id'] ? 'selected' : ''; ?>>
            <?= h((string) $set['category_name'] . ' — ' . (string) $set['title']); ?>
          </option>
        <?php endforeach; ?>
      </select>

      <label for="exam_year">Year / Level</label>
      <input id="exam_year" name="exam_year" type="text" value="<?= h((string) $form['exam_year']); ?>" placeholder="Year 3, Year 5, 2026">

      <label for="subject_id">Subject (existing)</label>
      <select id="subject_id" name="subject_id">
        <option value="0">Select subject</option>
        <?php foreach ($subjects as $subject): ?>
          <option value="<?= (int) $subject['id']; ?>" <?= (int) $form['subject_id'] === (int) $subject['id'] ? 'selected' : ''; ?>>
            <?= h((string) $subject['category_name'] . ' — ' . (string) $subject['name']); ?>
          </option>
        <?php endforeach; ?>
      </select>

      <label for="subject_name">Subject (custom label)</label>
      <input id="subject_name" name="subject_name" type="text" value="<?= h((string) $form['subject_name']); ?>" placeholder="Numeracy, Grammar, Reasoning">

      <label for="total_questions">Question Count</label>
      <input id="total_questions" name="total_questions" type="number" min="1" max="500" value="<?= h((string) $form['total_questions']); ?>" required>

      <label for="default_marks_per_question">Marks Per Question</label>
      <input id="default_marks_per_question" name="default_marks_per_question" type="number" min="0.01" step="0.01" value="<?= h((string) $form['default_marks_per_question']); ?>" required>

      <label for="duration_minutes">Timer (minutes)</label>
      <input id="duration_minutes" name="duration_minutes" type="number" min="5" max="360" value="<?= h((string) $form['duration_minutes']); ?>" required>

      <label for="max_attempts_per_user">Max Attempts / User</label>
      <input id="max_attempts_per_user" name="max_attempts_per_user" type="number" min="1" max="99" value="<?= h((string) $form['max_attempts_per_user']); ?>" required>

      <label for="max_pause_count">Max Pause Count</label>
      <input id="max_pause_count" name="max_pause_count" type="number" min="0" max="20" value="<?= h((string) $form['max_pause_count']); ?>" required>

      <label for="max_refresh_violations">Max Refresh Violations</label>
      <input id="max_refresh_violations" name="max_refresh_violations" type="number" min="1" max="10" value="<?= h((string) $form['max_refresh_violations']); ?>" required>

      <label for="published_status">Publish State</label>
      <select id="published_status" name="published_status" required>
        <?php foreach (['draft' => 'Draft', 'published' => 'Published', 'archived' => 'Archived'] as $key => $label): ?>
          <option value="<?= h($key); ?>" <?= (string) $form['published_status'] === $key ? 'selected' : ''; ?>><?= h($label); ?></option>
        <?php endforeach; ?>
      </select>

      <label for="question_search">Question Search Filter</label>
      <input id="question_search" name="question_search" type="text" value="<?= h((string) $form['question_search']); ?>" placeholder="Only for auto-fill and candidate list">

      <label for="difficulty">Difficulty Filter</label>
      <select id="difficulty" name="difficulty">
        <option value="">All</option>
        <?php foreach (['easy', 'medium', 'hard'] as $difficulty): ?>
          <option value="<?= h($difficulty); ?>" <?= (string) $form['difficulty'] === $difficulty ? 'selected' : ''; ?>><?= h(ucfirst($difficulty)); ?></option>
        <?php endforeach; ?>
      </select>

      <label for="question_type">Question Type Filter</label>
      <select id="question_type" name="question_type">
        <option value="">All</option>
        <?php foreach (['mcq_single', 'mcq_multi', 'true_false', 'numeric', 'short_text'] as $questionType): ?>
          <option value="<?= h($questionType); ?>" <?= (string) $form['question_type'] === $questionType ? 'selected' : ''; ?>><?= h($questionType); ?></option>
        <?php endforeach; ?>
      </select>

      <label for="instructions">Instructions</label>
      <textarea id="instructions" name="instructions" rows="4" placeholder="Visible before exam starts"><?= h((string) $form['instructions']); ?></textarea>

      <label class="checkbox-row" for="allow_pause">
        <input id="allow_pause" name="allow_pause" type="checkbox" <?= !empty($form['allow_pause']) ? 'checked' : ''; ?>>
        Allow pause and resume
      </label>

      <label class="checkbox-row" for="no_refresh_mode">
        <input id="no_refresh_mode" name="no_refresh_mode" type="checkbox" <?= !empty($form['no_refresh_mode']) ? 'checked' : ''; ?>>
        Enable no-refresh mode
      </label>

      <label class="checkbox-row" for="manual_only">
        <input id="manual_only" name="manual_only" type="checkbox" <?= !empty($form['manual_only']) ? 'checked' : ''; ?>>
        Use only selected questions (disable auto-fill)
      </label>

      <label class="checkbox-row" for="is_active">
        <input id="is_active" name="is_active" type="checkbox" <?= !empty($form['is_active']) ? 'checked' : ''; ?>>
        Template active
      </label>

      <div class="form-actions">
        <button class="btn" type="submit"><?= (int) $form['id'] > 0 ? 'Update Template' : 'Create Template'; ?></button>
        <a class="btn-link btn-outline" href="<?= h(examportal_url('admin/papers.php')); ?>">Cancel</a>
      </div>

      <p class="inline-note">Selected questions: <?= count($selectedQuestionIds); ?>. If selected count is less than question count, auto-fill uses current filters.</p>

      <?php foreach ($selectedOutsideIds as $outsideId): ?>
        <?php
          $markValue = (string) ($form['marks_by_question'][$outsideId] ?? $form['default_marks_per_question']);
          $sectionValue = (string) ($form['sections_by_question'][$outsideId] ?? '');
        ?>
        <input type="hidden" name="selected_question_ids[]" value="<?= (int) $outsideId; ?>">
        <input type="hidden" name="question_mark[<?= (int) $outsideId; ?>]" value="<?= h($markValue); ?>">
        <input type="hidden" name="question_section[<?= (int) $outsideId; ?>]" value="<?= h($sectionValue); ?>">
      <?php endforeach; ?>
    </form>
  </section>

  <section class="panel">
    <h2 class="section-title">Candidate Questions</h2>
    <?php if ((int) $form['category_id'] <= 0): ?>
      <p class="muted">Select a category first to load questions.</p>
    <?php else: ?>
      <p class="inline-note">Showing <?= count($candidateRows); ?> candidate questions from active question bank records.</p>
      <div class="question-table-wrap">
        <table class="question-table">
          <thead>
            <tr>
              <th>Pick</th>
              <th>ID</th>
              <th>Type</th>
              <th>Difficulty</th>
              <th>Year</th>
              <th>Subject</th>
              <th>Question</th>
              <th>Default</th>
              <th>Marks</th>
              <th>Section</th>
            </tr>
          </thead>
          <tbody>
            <?php if (!$candidateRows): ?>
              <tr>
                <td colspan="10">No active questions match these filters.</td>
              </tr>
            <?php else: ?>
              <?php foreach ($candidateRows as $row): ?>
                <?php
                  $qid = (int) $row['id'];
                  $isChecked = in_array($qid, $selectedQuestionIds, true);
                  $markValue = (string) ($form['marks_by_question'][$qid] ?? $row['default_marks'] ?? $form['default_marks_per_question']);
                  $sectionValue = (string) ($form['sections_by_question'][$qid] ?? '');
                ?>
                <tr>
                  <td>
                    <input type="checkbox" name="selected_question_ids[]" value="<?= $qid; ?>" form="template-editor-form" <?= $isChecked ? 'checked' : ''; ?>>
                  </td>
                  <td>#<?= $qid; ?></td>
                  <td><?= h((string) $row['question_type']); ?></td>
                  <td><?= h(ucfirst((string) $row['difficulty_level'])); ?></td>
                  <td><?= h((string) ($row['exam_year'] ?? '—')); ?></td>
                  <td><?= h((string) ($row['subject_name'] ?? '—')); ?></td>
                  <td><?= h(substr((string) $row['question_text'], 0, 140)); ?><?= strlen((string) $row['question_text']) > 140 ? '…' : ''; ?></td>
                  <td><?= h((string) $row['default_marks']); ?></td>
                  <td>
                    <input type="number" min="0.01" step="0.01" name="question_mark[<?= $qid; ?>]" value="<?= h($markValue); ?>" form="template-editor-form">
                  </td>
                  <td>
                    <input type="text" name="question_section[<?= $qid; ?>]" value="<?= h($sectionValue); ?>" placeholder="Optional" form="template-editor-form">
                  </td>
                </tr>
              <?php endforeach; ?>
            <?php endif; ?>
          </tbody>
        </table>
      </div>

      <?php if ($selectedOutsideRows): ?>
        <p class="inline-note">Selected but outside current filter: <?= count($selectedOutsideRows); ?> question(s) are preserved on save.</p>
      <?php endif; ?>
    <?php endif; ?>
  </section>
<?php endif; ?>

<section class="panel">
  <h2 class="section-title">Template Library</h2>

  <form method="get" class="filter-grid">
    <input type="hidden" name="mode" value="list">
    <input type="text" name="search" value="<?= h((string) $listFilters['search']); ?>" placeholder="Search by title/instruction">

    <select name="category_id">
      <option value="0">All categories</option>
      <?php foreach ($categories as $category): ?>
        <option value="<?= (int) $category['id']; ?>" <?= (int) $listFilters['category_id'] === (int) $category['id'] ? 'selected' : ''; ?>>
          <?= h((string) $category['name']); ?>
        </option>
      <?php endforeach; ?>
    </select>

    <select name="published_status">
      <?php foreach (['all' => 'All states', 'draft' => 'Draft', 'published' => 'Published', 'archived' => 'Archived'] as $key => $label): ?>
        <option value="<?= h($key); ?>" <?= (string) $listFilters['published_status'] === $key ? 'selected' : ''; ?>><?= h($label); ?></option>
      <?php endforeach; ?>
    </select>

    <select name="activity">
      <?php foreach (['all' => 'All activity', 'active' => 'Active', 'inactive' => 'Inactive'] as $key => $label): ?>
        <option value="<?= h($key); ?>" <?= (string) $listFilters['activity'] === $key ? 'selected' : ''; ?>><?= h($label); ?></option>
      <?php endforeach; ?>
    </select>

    <button class="btn" type="submit">Apply</button>
  </form>

  <p class="inline-note">Showing <?= count($listItems); ?> of <?= $listTotal; ?> templates.</p>

  <div class="question-table-wrap">
    <table class="question-table">
      <thead>
        <tr>
          <th>ID</th>
          <th>Template</th>
          <th>Category</th>
          <th>Year</th>
          <th>Subject</th>
          <th>Questions</th>
          <th>Marks</th>
          <th>Timer</th>
          <th>Publish</th>
          <th>Status</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <?php if (!$listItems): ?>
          <tr>
            <td colspan="11">No templates found for this filter.</td>
          </tr>
        <?php else: ?>
          <?php foreach ($listItems as $item): ?>
            <tr>
              <td>#<?= (int) $item['id']; ?></td>
              <td>
                <strong><?= h((string) $item['title']); ?></strong><br>
                <span class="muted">Set: <?= h((string) ($item['question_set_title'] ?? '—')); ?></span>
              </td>
              <td><?= h((string) $item['category_name']); ?></td>
              <td><?= h((string) ($item['exam_year'] ?? '—')); ?></td>
              <td><?= h((string) ($item['subject_name'] ?? '—')); ?></td>
              <td><?= (int) $item['total_questions']; ?> / <?= (int) $item['item_count']; ?></td>
              <td><?= h((string) $item['total_marks']); ?></td>
              <td><?= (int) $item['duration_minutes']; ?> min<br><span class="muted">Refresh limit: <?= (int) ($item['max_refresh_violations'] ?? 1); ?></span></td>
              <td><span class="pill"><?= h((string) ucfirst((string) $item['published_status'])); ?></span></td>
              <td>
                <span class="pill <?= (int) $item['is_active'] === 1 ? 'pill-good' : 'pill-bad'; ?>">
                  <?= (int) $item['is_active'] === 1 ? 'Active' : 'Inactive'; ?>
                </span>
              </td>
              <td>
                <div class="table-actions">
                  <a class="btn-link btn-outline" href="<?= h(examportal_url('admin/papers.php?mode=edit&id=' . (int) $item['id'])); ?>">Edit</a>
                  <form method="post" class="inline-form inline-form-compact">
                    <input type="hidden" name="csrf_token" value="<?= h(ep_csrf_token()); ?>">
                    <input type="hidden" name="post_action" value="set_status">
                    <input type="hidden" name="template_id" value="<?= (int) $item['id']; ?>">
                    <select name="target_published_status">
                      <?php foreach (['draft', 'published', 'archived'] as $state): ?>
                        <option value="<?= h($state); ?>" <?= (string) $item['published_status'] === $state ? 'selected' : ''; ?>><?= h(ucfirst($state)); ?></option>
                      <?php endforeach; ?>
                    </select>
                    <select name="target_active">
                      <option value="1" <?= (int) $item['is_active'] === 1 ? 'selected' : ''; ?>>Active</option>
                      <option value="0" <?= (int) $item['is_active'] === 0 ? 'selected' : ''; ?>>Inactive</option>
                    </select>
                    <button class="btn btn-mini" type="submit">Apply</button>
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
          $url = examportal_url('admin/papers.php?' . http_build_query($query));
        ?>
        <a class="<?= $p === $page ? 'page-link current' : 'page-link'; ?>" href="<?= h($url); ?>"><?= $p; ?></a>
      <?php endfor; ?>
    </div>
  <?php endif; ?>
</section>

<?php ep_render_page_end(); ?>
