<?php
declare(strict_types=1);
require_once __DIR__ . '/../config/app.php';

ep_require_user();

$user = ep_current_user();
if (!$user) {
    ep_redirect('user/login.php');
}

$rebuildResult = ep_rebuild_user_progress_for_user((int) $user['id']);
if (!($rebuildResult['ok'] ?? false)) {
    ep_flash_set('error', (string) ($rebuildResult['message'] ?? 'Unable to refresh progress.'));
}

$filters = [
    'search' => trim((string) ($_GET['search'] ?? '')),
    'category_id' => (int) ($_GET['category_id'] ?? 0),
];

$page = max(1, (int) ($_GET['page'] ?? 1));
$limit = 12;
$offset = ($page - 1) * $limit;

$summary = ep_get_user_result_summary((int) $user['id']);
$history = ep_get_user_result_history((int) $user['id'], $filters, $limit, $offset);
$historyItems = $history['items'];
$historyTotal = (int) $history['total'];
$totalPages = max(1, (int) ceil($historyTotal / $limit));
$progressRows = ep_get_user_progress_rows((int) $user['id'], $filters['category_id'] > 0 ? $filters['category_id'] : null);

$categories = ep_get_categories_for_admin(false);

ep_render_page_start([
    'title' => 'Progress',
    'active' => 'progress',
    'hero_kicker' => 'Module 6',
    'hero_title' => 'Results & Progress',
    'hero_text' => 'Track your exam score history, mastery level, and category-wise learning progress.',
]);
?>

<section class="stat-grid">
  <article class="stat-card">
    <h3>Total Attempts</h3>
    <p><strong><?= (int) $summary['attempts_count']; ?></strong></p>
    <p class="muted">Last Result: <?= h((string) ($summary['last_result_at'] ?? '—')); ?></p>
  </article>

  <article class="stat-card">
    <h3>Average Performance</h3>
    <p><strong><?= h(number_format((float) $summary['avg_percentage'], 2)); ?>%</strong></p>
    <p class="muted">Best: <?= h(number_format((float) $summary['best_percentage'], 2)); ?>%</p>
  </article>

  <article class="stat-card">
    <h3>Accuracy</h3>
    <p><strong><?= h(number_format((float) $summary['overall_accuracy'], 2)); ?>%</strong></p>
    <p class="muted">Correct: <?= (int) $summary['correct_answers']; ?> | Wrong: <?= (int) $summary['wrong_answers']; ?></p>
  </article>

  <article class="stat-card">
    <h3>Total Score</h3>
    <p><strong><?= h(number_format((float) $summary['score_obtained'], 2)); ?></strong></p>
    <p class="muted">Out of <?= h(number_format((float) $summary['max_score'], 2)); ?></p>
  </article>
</section>

<section class="panel">
  <div class="actions">
    <a class="btn-link" href="<?= h(examportal_url('user/dashboard.php')); ?>">Back to Dashboard</a>
    <a class="btn-link btn-outline" href="<?= h(examportal_url('index.php')); ?>">Browse Categories</a>
  </div>
</section>

<section class="panel">
  <h2 class="section-title">Progress By Category & Subject</h2>

  <?php if (!$progressRows): ?>
    <p class="muted">No completed exam results yet. Once papers are evaluated, your mastery and progress will appear here.</p>
  <?php else: ?>
    <div class="question-table-wrap">
      <table class="question-table">
        <thead>
          <tr>
            <th>Category</th>
            <th>Subject</th>
            <th>Attempts</th>
            <th>Completed</th>
            <th>Best Score</th>
            <th>Avg %</th>
            <th>Mastery</th>
            <th>Streak</th>
            <th>Last Attempt</th>
          </tr>
        </thead>
        <tbody>
          <?php foreach ($progressRows as $row): ?>
            <?php
              $mastery = (string) ($row['mastery_level'] ?? 'beginner');
              $pillClass = 'pill';
              if ($mastery === 'advanced' || $mastery === 'proficient') {
                  $pillClass .= ' pill-good';
              } elseif ($mastery === 'beginner') {
                  $pillClass .= ' pill-bad';
              }
            ?>
            <tr>
              <td><?= h((string) $row['category_name']); ?></td>
              <td><?= h((string) $row['subject_key']); ?></td>
              <td><?= (int) $row['attempts_count']; ?></td>
              <td><?= (int) $row['papers_completed']; ?></td>
              <td><?= h(number_format((float) $row['best_score'], 2)); ?></td>
              <td><?= h(number_format((float) $row['avg_percentage'], 2)); ?>%</td>
              <td><span class="<?= h($pillClass); ?>"><?= h(ucfirst($mastery)); ?></span></td>
              <td><?= (int) $row['streak_days']; ?> day(s)</td>
              <td><?= h((string) ($row['last_attempt_at'] ?? '—')); ?></td>
            </tr>
          <?php endforeach; ?>
        </tbody>
      </table>
    </div>
  <?php endif; ?>
</section>

<section class="panel">
  <h2 class="section-title">Result History</h2>

  <form method="get" class="filter-grid">
    <input type="hidden" name="page" value="1">
    <input type="text" name="search" value="<?= h((string) $filters['search']); ?>" placeholder="Search paper title or subject">

    <select name="category_id">
      <option value="0">All categories</option>
      <?php foreach ($categories as $category): ?>
        <option value="<?= (int) $category['id']; ?>" <?= (int) $filters['category_id'] === (int) $category['id'] ? 'selected' : ''; ?>>
          <?= h((string) $category['name']); ?>
        </option>
      <?php endforeach; ?>
    </select>

    <button class="btn" type="submit">Apply</button>
  </form>

  <p class="inline-note">Showing <?= count($historyItems); ?> of <?= $historyTotal; ?> results.</p>

  <?php if (!$historyItems): ?>
    <p class="muted">No results found for selected filters.</p>
  <?php else: ?>
    <div class="question-table-wrap">
      <table class="question-table">
        <thead>
          <tr>
            <th>Date</th>
            <th>Category</th>
            <th>Paper</th>
            <th>Subject / Year</th>
            <th>Score</th>
            <th>Correct</th>
            <th>Percentage</th>
            <th>Rank</th>
            <th>Runtime Flags</th>
          </tr>
        </thead>
        <tbody>
          <?php foreach ($historyItems as $row): ?>
            <?php
              $rankLabel = trim((string) ($row['rank_label'] ?? ''));
              if ($rankLabel === '') {
                  $rankLabel = ep_result_rank_label_from_percentage((float) ($row['percentage'] ?? 0));
              }
            ?>
            <tr>
              <td><?= h((string) $row['published_at']); ?></td>
              <td><?= h((string) $row['category_name']); ?></td>
              <td><?= h((string) $row['paper_title']); ?></td>
              <td><?= h((string) $row['subject_name']); ?><?php if ((string) $row['exam_year'] !== ''): ?> • <?= h((string) $row['exam_year']); ?><?php endif; ?></td>
              <td><?= h(number_format((float) $row['score_obtained'], 2)); ?> / <?= h(number_format((float) $row['max_score'], 2)); ?></td>
              <td><?= (int) $row['correct_answers']; ?> / <?= (int) $row['attempted_questions']; ?></td>
              <td><?= h(number_format((float) $row['percentage'], 2)); ?>%</td>
              <td><span class="pill"><?= h($rankLabel); ?></span></td>
              <td>
                Resume: <?= (int) $row['resume_count']; ?>,
                Refresh: <?= (int) $row['no_refresh_violations']; ?>
              </td>
            </tr>
          <?php endforeach; ?>
        </tbody>
      </table>
    </div>

    <?php if ($totalPages > 1): ?>
      <div class="pagination">
        <?php for ($p = 1; $p <= $totalPages; $p++): ?>
          <?php
            $query = $_GET;
            $query['page'] = $p;
            $url = examportal_url('user/progress.php?' . http_build_query($query));
          ?>
          <a class="<?= $p === $page ? 'page-link current' : 'page-link'; ?>" href="<?= h($url); ?>"><?= $p; ?></a>
        <?php endfor; ?>
      </div>
    <?php endif; ?>
  <?php endif; ?>
</section>

<?php ep_render_page_end(); ?>
