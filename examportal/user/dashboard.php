<?php
declare(strict_types=1);
require_once __DIR__ . '/../config/app.php';

ep_require_user();

$user = ep_current_user();
if (!$user) {
    ep_redirect('user/login.php');
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $csrfToken = $_POST['csrf_token'] ?? null;
    if (!ep_verify_csrf_token(is_string($csrfToken) ? $csrfToken : null)) {
        ep_flash_set('error', 'Session validation failed. Please refresh and try again.');
        ep_redirect('user/dashboard.php');
    }

    $postAction = (string) ($_POST['post_action'] ?? '');
    if ($postAction === 'resume_attempt') {
        $attemptId = (int) ($_POST['attempt_id'] ?? 0);
        $resume = ep_resume_user_attempt((int) $user['id'], $attemptId);
        if (!($resume['ok'] ?? false)) {
            ep_flash_set('error', (string) ($resume['message'] ?? 'Unable to resume attempt.'));
            ep_redirect('user/dashboard.php');
        }

        ep_flash_set('success', (string) ($resume['message'] ?? 'Attempt resumed.'));
        ep_redirect('user/exam.php?attempt_id=' . $attemptId);
    }
}

$subscription = ep_get_active_subscription_for_user((int) $user['id']);
$subscriptionHistory = ep_get_user_subscription_history((int) $user['id'], 12);
$pendingAttempts = ep_get_user_pending_attempts((int) $user['id'], 6);
$recentAttempts = ep_get_user_recent_attempts((int) $user['id'], 10);
$bestScores = ep_get_user_best_scores((int) $user['id'], 5);
$resultSummary = ep_get_user_result_summary((int) $user['id']);
$categories = ep_get_categories();
$progressRows = ep_get_user_progress_rows((int) $user['id'], null);

$remainingPapers = $subscription ? ep_subscription_remaining_papers($subscription) : 0;
$maxPapers = $subscription ? (int) ($subscription['max_papers_per_cycle'] ?? 0) : 0;
$usedPapers = $subscription ? (int) ($subscription['papers_used'] ?? 0) : 0;
$bestPercentage = (float) ($resultSummary['best_percentage'] ?? 0);
$averagePercentage = (float) ($resultSummary['avg_percentage'] ?? 0);
$overallAccuracy = (float) ($resultSummary['overall_accuracy'] ?? 0);

$categorySlugById = [];
foreach ($categories as $categoryRow) {
    $categorySlugById[(int) ($categoryRow['id'] ?? 0)] = (string) ($categoryRow['slug'] ?? '');
}

$resumeAttempt = $pendingAttempts[0] ?? null;
$topProgress = $progressRows[0] ?? null;
$focusProgress = null;
if ($progressRows) {
    $sortedForFocus = $progressRows;
    usort(
        $sortedForFocus,
        static fn(array $a, array $b): int => ((float) ($a['avg_percentage'] ?? 0)) <=> ((float) ($b['avg_percentage'] ?? 0))
    );
    $focusProgress = $sortedForFocus[0] ?? null;
}

$topCategorySlug = $topProgress ? (string) ($categorySlugById[(int) ($topProgress['category_id'] ?? 0)] ?? '') : '';
$focusCategorySlug = $focusProgress ? (string) ($categorySlugById[(int) ($focusProgress['category_id'] ?? 0)] ?? '') : '';
$topCategoryUrl = $topCategorySlug !== '' ? examportal_url('category.php?exam=' . urlencode($topCategorySlug)) : '';
$focusCategoryUrl = $focusCategorySlug !== '' ? examportal_url('category.php?exam=' . urlencode($focusCategorySlug)) : '';

$recentStatusFilter = (string) ($_GET['recent_status'] ?? 'all');
$recentStatusAllowed = ['all', 'not_started', 'in_progress', 'paused', 'auto_submitted', 'submitted', 'evaluated', 'abandoned'];
if (!in_array($recentStatusFilter, $recentStatusAllowed, true)) {
    $recentStatusFilter = 'all';
}
$visibleRecentAttempts = array_values(array_filter(
    $recentAttempts,
    static function (array $attempt) use ($recentStatusFilter): bool {
        if ($recentStatusFilter === 'all') {
            return true;
        }
        return (string) ($attempt['status'] ?? '') === $recentStatusFilter;
    }
));

$heroKicker = $subscription ? 'Module 9 • Member Dashboard' : 'Module 9 • Subscription Needed';
$heroText = $subscription
    ? 'Your dashboard shows quota, recent attempts, best scores, and pending exam resumes.'
    : 'Activate a paid subscription to unlock paper attempts and quota tracking.';

$pendingCount = count($pendingAttempts);

ep_render_page_start([
    'title' => 'Dashboard',
    'active' => 'dashboard',
    'hero_kicker' => $heroKicker,
    'hero_title' => 'Welcome, ' . (string) $user['name'],
    'hero_text' => $heroText,
]);
?>

<section class="stat-grid">
  <article class="stat-card">
    <h3>My Subscription</h3>
    <?php if ($subscription): ?>
      <p><strong><?= h((string) $subscription['plan_name']); ?></strong></p>
      <p class="muted">Expires: <?= h((string) $subscription['expires_at']); ?></p>
    <?php else: ?>
      <p><strong>Inactive</strong></p>
      <p class="muted">No active paid plan.</p>
    <?php endif; ?>
  </article>

  <article class="stat-card">
    <h3>Remaining Quota</h3>
    <p><strong><?= (int) $remainingPapers; ?> papers</strong></p>
    <p class="muted">Used: <?= (int) $usedPapers; ?> / <?= (int) $maxPapers; ?></p>
  </article>

  <article class="stat-card">
    <h3>Pending Exam Resume</h3>
    <p><strong><?= (int) $pendingCount; ?> pending</strong></p>
    <p class="muted">In progress or paused sessions.</p>
  </article>

  <article class="stat-card">
    <h3>Best Score</h3>
    <p><strong><?= h(number_format($bestPercentage, 2)); ?>%</strong></p>
    <p class="muted">Attempts: <?= (int) ($resultSummary['attempts_count'] ?? 0); ?></p>
  </article>
</section>

<section class="panel">
  <div class="actions">
    <?php if (!$subscription): ?>
      <a class="btn-link" href="<?= h(examportal_url('user/subscribe.php')); ?>">Choose Plan</a>
    <?php else: ?>
      <a class="btn-link" href="<?= h(examportal_url('index.php')); ?>">Browse Categories</a>
    <?php endif; ?>
    <a class="btn-link btn-outline" href="<?= h(examportal_url('user/progress.php')); ?>">Open Progress</a>
  </div>
</section>

<section class="stat-grid">
  <article class="stat-card">
    <h3>Average Performance</h3>
    <p><strong><?= h(number_format($averagePercentage, 2)); ?>%</strong></p>
    <p class="muted">Across evaluated attempts.</p>
  </article>
  <article class="stat-card">
    <h3>Overall Accuracy</h3>
    <p><strong><?= h(number_format($overallAccuracy, 2)); ?>%</strong></p>
    <p class="muted">Correct vs attempted questions.</p>
  </article>
  <article class="stat-card">
    <h3>Focus Category</h3>
    <?php if ($focusProgress): ?>
      <p><strong><?= h((string) ($focusProgress['category_name'] ?? 'General')); ?></strong></p>
      <p class="muted">Avg: <?= h(number_format((float) ($focusProgress['avg_percentage'] ?? 0), 2)); ?>%</p>
    <?php else: ?>
      <p><strong>Not enough data</strong></p>
      <p class="muted">Complete a few papers to unlock focus recommendations.</p>
    <?php endif; ?>
  </article>
  <article class="stat-card">
    <h3>Quick Actions</h3>
    <div class="actions" style="margin-top:4px;">
      <?php if ($resumeAttempt): ?>
        <a class="btn-link" href="<?= h(examportal_url('user/exam.php?attempt_id=' . (int) ($resumeAttempt['id'] ?? 0))); ?>">Resume Latest</a>
      <?php endif; ?>
      <?php if ($topCategoryUrl !== ''): ?>
        <a class="btn-link btn-outline" href="<?= h($topCategoryUrl); ?>">Practice Strength</a>
      <?php endif; ?>
      <?php if ($focusCategoryUrl !== ''): ?>
        <a class="btn-link btn-outline" href="<?= h($focusCategoryUrl); ?>">Improve Focus</a>
      <?php endif; ?>
      <?php if (!$resumeAttempt && $topCategoryUrl === '' && $focusCategoryUrl === ''): ?>
        <a class="btn-link btn-outline" href="<?= h(examportal_url('index.php')); ?>">Start First Paper</a>
      <?php endif; ?>
    </div>
  </article>
</section>

<section class="panel">
  <h2 class="section-title">Resume Pending Exam</h2>
  <?php if (!$pendingAttempts): ?>
    <p class="muted">No pending attempts to resume.</p>
  <?php else: ?>
    <div class="question-table-wrap">
      <table class="question-table">
        <thead>
          <tr>
            <th>Attempt</th>
            <th>Paper</th>
            <th>Status</th>
            <th>Timer Left</th>
            <th>Last Save</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          <?php foreach ($pendingAttempts as $attempt): ?>
            <tr>
              <td>#<?= (int) $attempt['id']; ?></td>
              <td>
                <strong><?= h((string) $attempt['paper_title']); ?></strong><br>
                <span class="muted"><?= h((string) $attempt['category_name']); ?> • <?= h((string) $attempt['subject_name']); ?></span>
              </td>
              <td><span class="pill"><?= h(ucfirst(str_replace('_', ' ', (string) $attempt['status']))); ?></span></td>
              <td><?= (int) ($attempt['remaining_seconds'] ?? 0); ?> sec</td>
              <td><?= h((string) ($attempt['last_saved_at'] ?? '—')); ?></td>
              <td>
                <div class="table-actions">
                  <form method="post" class="inline-form">
                    <input type="hidden" name="csrf_token" value="<?= h(ep_csrf_token()); ?>">
                    <input type="hidden" name="post_action" value="resume_attempt">
                    <input type="hidden" name="attempt_id" value="<?= (int) $attempt['id']; ?>">
                    <button class="btn btn-mini" type="submit">Resume</button>
                  </form>
                  <a class="btn-link btn-outline" href="<?= h(examportal_url('user/exam.php?attempt_id=' . (int) $attempt['id'])); ?>">Open</a>
                </div>
              </td>
            </tr>
          <?php endforeach; ?>
        </tbody>
      </table>
    </div>
  <?php endif; ?>
</section>

<section class="panel">
  <h2 class="section-title">Recent Attempts</h2>
  <form method="get" class="filter-grid">
    <select name="recent_status">
      <option value="all" <?= $recentStatusFilter === 'all' ? 'selected' : ''; ?>>All statuses</option>
      <option value="not_started" <?= $recentStatusFilter === 'not_started' ? 'selected' : ''; ?>>Not started</option>
      <option value="in_progress" <?= $recentStatusFilter === 'in_progress' ? 'selected' : ''; ?>>In progress</option>
      <option value="paused" <?= $recentStatusFilter === 'paused' ? 'selected' : ''; ?>>Paused</option>
      <option value="auto_submitted" <?= $recentStatusFilter === 'auto_submitted' ? 'selected' : ''; ?>>Auto submitted</option>
      <option value="submitted" <?= $recentStatusFilter === 'submitted' ? 'selected' : ''; ?>>Submitted</option>
      <option value="evaluated" <?= $recentStatusFilter === 'evaluated' ? 'selected' : ''; ?>>Evaluated</option>
      <option value="abandoned" <?= $recentStatusFilter === 'abandoned' ? 'selected' : ''; ?>>Abandoned</option>
    </select>
    <button class="btn" type="submit">Filter</button>
  </form>
  <p class="inline-note">Showing <?= count($visibleRecentAttempts); ?> of <?= count($recentAttempts); ?> attempts.</p>
  <?php if (!$visibleRecentAttempts): ?>
    <p class="muted">No attempts found yet.</p>
  <?php else: ?>
    <div class="question-table-wrap">
      <table class="question-table">
        <thead>
          <tr>
            <th>Date</th>
            <th>Paper</th>
            <th>Status</th>
            <th>Score</th>
            <th>Percentage</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          <?php foreach ($visibleRecentAttempts as $attempt): ?>
            <?php
              $status = (string) ($attempt['status'] ?? '');
              $scoreText = number_format((float) ($attempt['score_obtained'] ?? 0), 2) . ' / ' . number_format((float) ($attempt['max_score'] ?? 0), 2);
              $isPending = in_array($status, ['not_started', 'in_progress', 'paused'], true);
            ?>
            <tr>
              <td><?= h((string) ($attempt['submitted_at'] ?? $attempt['last_saved_at'] ?? $attempt['started_at'] ?? '—')); ?></td>
              <td>
                <strong><?= h((string) $attempt['paper_title']); ?></strong><br>
                <span class="muted"><?= h((string) $attempt['category_name']); ?><?php if ((string) ($attempt['exam_year'] ?? '') !== ''): ?> • <?= h((string) $attempt['exam_year']); ?><?php endif; ?></span>
              </td>
              <td><span class="pill"><?= h(ucfirst(str_replace('_', ' ', $status))); ?></span></td>
              <td><?= h($scoreText); ?></td>
              <td><?= h(number_format((float) ($attempt['percentage'] ?? 0), 2)); ?>%</td>
              <td>
                <?php if ($isPending): ?>
                  <a class="btn-link btn-outline" href="<?= h(examportal_url('user/exam.php?attempt_id=' . (int) $attempt['id'])); ?>">Resume</a>
                <?php else: ?>
                  <a class="btn-link btn-outline" href="<?= h(examportal_url('user/result.php?attempt_id=' . (int) $attempt['id'])); ?>">View Result</a>
                <?php endif; ?>
              </td>
            </tr>
          <?php endforeach; ?>
        </tbody>
      </table>
    </div>
  <?php endif; ?>
</section>

<section class="panel">
  <h2 class="section-title">Best Scores</h2>
  <?php if (!$bestScores): ?>
    <p class="muted">No evaluated scores yet.</p>
  <?php else: ?>
    <div class="question-table-wrap">
      <table class="question-table">
        <thead>
          <tr>
            <th>Rank</th>
            <th>Paper</th>
            <th>Category</th>
            <th>Score</th>
            <th>Percentage</th>
            <th>Published</th>
          </tr>
        </thead>
        <tbody>
          <?php foreach ($bestScores as $index => $score): ?>
            <tr>
              <td>#<?= $index + 1; ?> <span class="pill"><?= h((string) ($score['rank_label'] ?: ep_result_rank_label_from_percentage((float) $score['percentage']))); ?></span></td>
              <td><?= h((string) $score['paper_title']); ?></td>
              <td><?= h((string) $score['category_name']); ?></td>
              <td><?= h(number_format((float) $score['score_obtained'], 2)); ?> / <?= h(number_format((float) $score['max_score'], 2)); ?></td>
              <td><?= h(number_format((float) $score['percentage'], 2)); ?>%</td>
              <td><?= h((string) $score['published_at']); ?></td>
            </tr>
          <?php endforeach; ?>
        </tbody>
      </table>
    </div>
  <?php endif; ?>
</section>

<section class="panel">
  <h2 class="section-title">My Subscriptions</h2>
  <?php if (!$subscriptionHistory): ?>
    <p class="muted">No subscription records found.</p>
  <?php else: ?>
    <div class="question-table-wrap">
      <table class="question-table">
        <thead>
          <tr>
            <th>Plan</th>
            <th>Status</th>
            <th>Start</th>
            <th>Expiry</th>
            <th>Quota Used</th>
            <th>Remaining</th>
            <th>Price</th>
          </tr>
        </thead>
        <tbody>
          <?php foreach ($subscriptionHistory as $sub): ?>
            <?php
              $status = (string) ($sub['status'] ?? 'pending');
              $statusClass = 'pill';
              if ($status === 'active') {
                  $statusClass .= ' pill-good';
              } elseif (in_array($status, ['expired', 'cancelled'], true)) {
                  $statusClass .= ' pill-bad';
              }

              $maxPapersForSub = (int) ($sub['max_papers_per_cycle'] ?? 0);
              $papersUsedForSub = (int) ($sub['papers_used'] ?? 0);
              $remainingForSub = max(0, $maxPapersForSub - $papersUsedForSub);
            ?>
            <tr>
              <td><?= h((string) $sub['plan_name']); ?></td>
              <td><span class="<?= h($statusClass); ?>"><?= h(ucfirst($status)); ?></span></td>
              <td><?= h((string) ($sub['started_at'] ?? '—')); ?></td>
              <td><?= h((string) ($sub['expires_at'] ?? '—')); ?></td>
              <td><?= $papersUsedForSub; ?> / <?= $maxPapersForSub; ?></td>
              <td><?= $remainingForSub; ?></td>
              <td>AUD <?= h(number_format((float) ($sub['price_aud'] ?? 0), 2)); ?></td>
            </tr>
          <?php endforeach; ?>
        </tbody>
      </table>
    </div>
  <?php endif; ?>
</section>

<h2 class="section-title">Available Categories</h2>
<section class="grid">
  <?php foreach ($categories as $item): ?>
    <a class="card" href="<?= h(examportal_url('category.php?exam=' . urlencode((string) $item['slug']))); ?>">
      <span class="tag">Category</span>
      <h3><?= h((string) $item['name']); ?></h3>
      <p><?= h((string) ($item['description'] ?? '')) ?></p>
    </a>
  <?php endforeach; ?>
</section>

<?php ep_render_page_end(); ?>
