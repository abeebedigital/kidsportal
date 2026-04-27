<?php
declare(strict_types=1);
require_once __DIR__ . '/../config/app.php';

ep_require_user();

$user = ep_current_user();
if (!$user) {
    ep_redirect('user/login.php');
}

$attemptId = (int) ($_GET['attempt_id'] ?? 0);
if ($attemptId <= 0) {
    ep_flash_set('error', 'Attempt id is required.');
    ep_redirect('user/dashboard.php');
}

$result = ep_get_user_result_by_attempt((int) $user['id'], $attemptId);
if (!$result) {
    $attempt = ep_get_user_attempt_detail((int) $user['id'], $attemptId);
    if (!$attempt) {
        ep_flash_set('error', 'Attempt not found.');
        ep_redirect('user/dashboard.php');
    }

    $attemptStatus = (string) ($attempt['status'] ?? 'in_progress');
    if (in_array($attemptStatus, ['not_started', 'in_progress', 'paused'], true)) {
        ep_flash_set('error', 'This attempt is still in progress. Complete it to view result.');
        ep_redirect('user/exam.php?attempt_id=' . $attemptId);
    }

    $evaluate = ep_evaluate_user_attempt((int) $user['id'], $attemptId);
    if (!($evaluate['ok'] ?? false)) {
        ep_flash_set('error', (string) ($evaluate['message'] ?? 'Unable to generate result right now.'));
        ep_redirect('user/dashboard.php');
    }

    $result = ep_get_user_result_by_attempt((int) $user['id'], $attemptId);
    if (!$result) {
        ep_flash_set('error', 'Result not found after evaluation.');
        ep_redirect('user/dashboard.php');
    }
}

$summary = [];
$summaryRaw = (string) ($result['summary_json'] ?? '');
if ($summaryRaw !== '') {
    $decoded = json_decode($summaryRaw, true);
    if (is_array($decoded)) {
        $summary = $decoded;
    }
}

$questionRows = ep_get_attempt_question_rows((int) $user['id'], $attemptId);
$answerMap = ep_get_attempt_answer_map($attemptId);

function ep_option_text_by_key(array $options, string $key): string
{
    $key = strtoupper(trim($key));
    if ($key === '') {
        return '';
    }
    foreach ($options as $opt) {
        $optKey = strtoupper((string) ($opt['option_key'] ?? ''));
        if ($optKey === $key) {
            return (string) ($opt['option_text'] ?? '');
        }
    }
    return '';
}

function ep_render_answer_display(array $question, ?array $answerRow, bool $isCorrectAnswer): string
{
    $type = (string) ($question['question_type'] ?? 'mcq_single');

    if ($isCorrectAnswer) {
        if (in_array($type, ['mcq_single', 'true_false'], true)) {
            $key = substr(strtoupper(trim((string) ($question['correct_option_keys'] ?? ''))), 0, 1);
            $text = ep_option_text_by_key((array) ($question['options'] ?? []), $key);
            return $key !== '' ? ($key . '. ' . ($text !== '' ? $text : 'Option ' . $key)) : '—';
        }

        if ($type === 'mcq_multi') {
            $raw = strtoupper((string) ($question['correct_option_keys'] ?? ''));
            $parts = preg_split('/[\s,]+/', $raw) ?: [];
            $labels = [];
            foreach ($parts as $part) {
                $key = substr(trim($part), 0, 1);
                if ($key === '') {
                    continue;
                }
                $text = ep_option_text_by_key((array) ($question['options'] ?? []), $key);
                $labels[] = $key . '. ' . ($text !== '' ? $text : ('Option ' . $key));
            }
            return $labels ? implode(' | ', $labels) : '—';
        }

        if ($type === 'numeric') {
            $correct = $question['correct_numeric'];
            $tolerance = $question['numeric_tolerance'];
            if ($correct === null || $correct === '') {
                return '—';
            }
            $base = (string) $correct;
            if ($tolerance !== null && (float) $tolerance > 0) {
                $base .= ' (±' . (string) $tolerance . ')';
            }
            return $base;
        }

        $text = trim((string) ($question['correct_text'] ?? ''));
        return $text !== '' ? $text : '—';
    }

    if (!$answerRow) {
        return 'Not answered';
    }

    if (in_array($type, ['mcq_single', 'true_false'], true)) {
        $key = substr(strtoupper(trim((string) ($answerRow['selected_option_keys'] ?? ''))), 0, 1);
        if ($key === '') {
            return 'Not answered';
        }
        $text = ep_option_text_by_key((array) ($question['options'] ?? []), $key);
        return $key . '. ' . ($text !== '' ? $text : ('Option ' . $key));
    }

    if ($type === 'mcq_multi') {
        $raw = strtoupper((string) ($answerRow['selected_option_keys'] ?? ''));
        if (trim($raw) === '') {
            return 'Not answered';
        }
        $parts = preg_split('/[\s,]+/', $raw) ?: [];
        $labels = [];
        foreach ($parts as $part) {
            $key = substr(trim($part), 0, 1);
            if ($key === '') {
                continue;
            }
            $text = ep_option_text_by_key((array) ($question['options'] ?? []), $key);
            $labels[] = $key . '. ' . ($text !== '' ? $text : ('Option ' . $key));
        }
        return $labels ? implode(' | ', $labels) : 'Not answered';
    }

    if ($type === 'numeric') {
        $numeric = $answerRow['answer_numeric'];
        return ($numeric !== null && $numeric !== '') ? (string) $numeric : 'Not answered';
    }

    $text = trim((string) ($answerRow['answer_text'] ?? ''));
    return $text !== '' ? $text : 'Not answered';
}

$rankLabel = trim((string) ($result['rank_label'] ?? ''));
if ($rankLabel === '') {
    $rankLabel = ep_result_rank_label_from_percentage((float) ($result['percentage'] ?? 0));
}

ep_render_page_start([
    'title' => 'Exam Result',
    'active' => 'progress',
    'hero_kicker' => 'Module 7',
    'hero_title' => (string) ($result['paper_title'] ?? ('Attempt #' . $attemptId)),
    'hero_text' => 'Instant result with score summary and question-wise review.',
]);
?>

<section class="panel">
  <div class="meta-list">
    <span class="pill">Attempt #<?= (int) $attemptId; ?></span>
    <span class="pill">Category: <?= h((string) ($result['category_name'] ?? 'General')); ?></span>
    <span class="pill">Subject: <?= h((string) ($result['subject_name'] ?? 'General')); ?></span>
    <?php if ((string) ($result['exam_year'] ?? '') !== ''): ?>
      <span class="pill">Year: <?= h((string) $result['exam_year']); ?></span>
    <?php endif; ?>
    <span class="pill">Rank: <?= h($rankLabel); ?></span>
    <span class="pill">Published: <?= h((string) ($result['published_at'] ?? '—')); ?></span>
  </div>
</section>

<section class="stat-grid">
  <article class="stat-card">
    <h3>Total Score</h3>
    <p><strong><?= h(number_format((float) ($result['score_obtained'] ?? 0), 2)); ?> / <?= h(number_format((float) ($result['max_score'] ?? 0), 2)); ?></strong></p>
    <p class="muted">Percentage: <?= h(number_format((float) ($result['percentage'] ?? 0), 2)); ?>%</p>
  </article>

  <article class="stat-card">
    <h3>Attempt Summary</h3>
    <p><strong><?= (int) ($result['attempted_questions'] ?? 0); ?> / <?= (int) ($result['total_questions'] ?? 0); ?> answered</strong></p>
    <p class="muted">Unanswered: <?= (int) ($result['unanswered_count'] ?? 0); ?></p>
  </article>

  <article class="stat-card">
    <h3>Accuracy</h3>
    <p><strong><?= (int) ($result['correct_answers'] ?? 0); ?> correct</strong></p>
    <p class="muted">Wrong: <?= (int) ($result['wrong_answers'] ?? 0); ?></p>
  </article>

  <article class="stat-card">
    <h3>Runtime</h3>
    <p><strong>Resumes: <?= (int) ($result['resume_count'] ?? 0); ?></strong></p>
    <p class="muted">Refresh violations: <?= (int) ($result['no_refresh_violations'] ?? 0); ?></p>
  </article>
</section>

<section class="panel">
  <div class="actions">
    <a class="btn-link" href="<?= h(examportal_url('user/dashboard.php')); ?>">Back to Dashboard</a>
    <a class="btn-link btn-outline" href="<?= h(examportal_url('user/progress.php')); ?>">Open Progress</a>
    <a class="btn-link btn-outline" href="<?= h(examportal_url('index.php')); ?>">Browse Categories</a>
  </div>
</section>

<section class="panel">
  <h2 class="section-title">Question Review</h2>
  <?php if (!$questionRows): ?>
    <p class="muted">Question-wise review is not available for this attempt.</p>
  <?php else: ?>
    <div class="question-table-wrap">
      <table class="question-table">
        <thead>
          <tr>
            <th>#</th>
            <th>Question</th>
            <th>Your Answer</th>
            <th>Correct Answer</th>
            <th>Status</th>
            <th>Marks</th>
          </tr>
        </thead>
        <tbody>
          <?php foreach ($questionRows as $index => $question): ?>
            <?php
              $questionId = (int) ($question['question_id'] ?? 0);
              $answerRow = $answerMap[$questionId] ?? null;
              $isCorrectRaw = $answerRow['is_correct'] ?? null;
              $isAnswered = $answerRow !== null;
              $marksAwarded = $answerRow !== null ? (float) ($answerRow['marks_awarded'] ?? 0) : 0.0;

              $statusText = 'Unanswered';
              $statusClass = 'pill';
              if ($isAnswered) {
                  if ((int) $isCorrectRaw === 1) {
                      $statusText = 'Correct';
                      $statusClass .= ' pill-good';
                  } else {
                      $statusText = 'Wrong';
                      $statusClass .= ' pill-bad';
                  }
              }

              $yourAnswer = ep_render_answer_display($question, $answerRow, false);
              $correctAnswer = ep_render_answer_display($question, $answerRow, true);
            ?>
            <tr>
              <td>Q<?= $index + 1; ?></td>
              <td><?= h((string) ($question['question_text'] ?? '')); ?></td>
              <td><?= h($yourAnswer); ?></td>
              <td><?= h($correctAnswer); ?></td>
              <td><span class="<?= h($statusClass); ?>"><?= h($statusText); ?></span></td>
              <td><?= h(number_format($marksAwarded, 2)); ?> / <?= h(number_format((float) ($question['template_marks'] ?? 1), 2)); ?></td>
            </tr>
          <?php endforeach; ?>
        </tbody>
      </table>
    </div>
  <?php endif; ?>
</section>

<?php if ($summary): ?>
  <section class="panel">
    <h2 class="section-title">Evaluation Snapshot</h2>
    <div class="meta-list">
      <span class="pill">Evaluated At: <?= h((string) ($summary['evaluated_at'] ?? '—')); ?></span>
      <span class="pill">Total Questions: <?= (int) ($summary['total_questions'] ?? 0); ?></span>
      <span class="pill">Attempted: <?= (int) ($summary['attempted_questions'] ?? 0); ?></span>
      <span class="pill">Correct: <?= (int) ($summary['correct_answers'] ?? 0); ?></span>
      <span class="pill">Wrong: <?= (int) ($summary['wrong_answers'] ?? 0); ?></span>
      <span class="pill">Unanswered: <?= (int) ($summary['unanswered_count'] ?? 0); ?></span>
    </div>
  </section>
<?php endif; ?>

<?php ep_render_page_end(); ?>
