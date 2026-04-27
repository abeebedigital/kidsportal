<?php
declare(strict_types=1);
require_once __DIR__ . '/../config/app.php';

ep_require_admin();

$user = ep_current_user();
if (!$user) {
    ep_redirect('user/login.php');
}

$filters = [
    'search' => trim((string) ($_GET['search'] ?? '')),
    'category_id' => (int) ($_GET['category_id'] ?? 0),
    'status' => (string) ($_GET['status'] ?? 'all'),
    'date_from' => trim((string) ($_GET['date_from'] ?? '')),
    'date_to' => trim((string) ($_GET['date_to'] ?? '')),
];

$hasDateInput = $filters['date_from'] !== '' || $filters['date_to'] !== '';
if (!$hasDateInput) {
    $filters['date_from'] = gmdate('Y-m-d', time() - (30 * 86400));
    $filters['date_to'] = gmdate('Y-m-d');
}
$filters = ep_admin_reports_normalize_filters($filters);

$export = (string) ($_GET['export'] ?? '');
if ($export === 'attempts_csv') {
    $report = ep_admin_reports_attempts($filters, 5000, 0);
    $filename = 'examportal-module8-attempts-' . gmdate('Ymd-His') . '.csv';

    header('Content-Type: text/csv; charset=utf-8');
    header('Content-Disposition: attachment; filename="' . $filename . '"');

    $out = fopen('php://output', 'w');
    if ($out !== false) {
        fputcsv($out, [
            'attempt_id',
            'status',
            'user_name',
            'user_email',
            'category',
            'paper_title',
            'subject',
            'exam_year',
            'started_at',
            'submitted_at',
            'score_obtained',
            'max_score',
            'percentage',
            'resume_count',
            'refresh_violations',
            'rank_label',
        ]);

        foreach ($report['items'] as $row) {
            fputcsv($out, [
                (int) ($row['id'] ?? 0),
                (string) ($row['status'] ?? ''),
                (string) ($row['user_name'] ?? ''),
                (string) ($row['user_email'] ?? ''),
                (string) ($row['category_name'] ?? ''),
                (string) ($row['paper_title'] ?? ''),
                (string) ($row['subject_name'] ?? ''),
                (string) ($row['exam_year'] ?? ''),
                (string) ($row['started_at'] ?? ''),
                (string) ($row['submitted_at'] ?? ''),
                (string) ($row['score_obtained'] ?? ''),
                (string) ($row['max_score'] ?? ''),
                (string) ($row['percentage'] ?? ''),
                (string) ($row['resume_count'] ?? ''),
                (string) ($row['no_refresh_violations'] ?? ''),
                (string) ($row['rank_label'] ?? ''),
            ]);
        }

        fclose($out);
    }
    exit;
}

$page = max(1, (int) ($_GET['page'] ?? 1));
$limit = 20;
$offset = ($page - 1) * $limit;

$kpis = ep_admin_reports_kpis($filters);
$attemptData = ep_admin_reports_attempts($filters, $limit, $offset);
$attemptItems = $attemptData['items'];
$attemptTotal = (int) $attemptData['total'];
$totalPages = max(1, (int) ceil($attemptTotal / $limit));
$topUsers = ep_admin_reports_top_users($filters, 10);
$categoryBreakdown = ep_admin_reports_category_breakdown($filters, 10);
$policyEvents = ep_admin_reports_policy_events($filters, 20);
$categories = ep_get_categories_for_admin(false);

$exportQuery = $_GET;
$exportQuery['export'] = 'attempts_csv';
$exportUrl = examportal_url('admin/reports.php?' . http_build_query($exportQuery));

ep_render_page_start([
    'title' => 'Reports',
    'active' => 'admin',
    'hero_kicker' => 'Module 8',
    'hero_title' => 'Admin Reports & Insights',
    'hero_text' => 'Live operational analytics for attempts, policy events, category performance, and top learners.',
]);
?>

<section class="panel">
  <div class="actions">
    <a class="btn-link" href="<?= h($exportUrl); ?>">Export Attempts CSV</a>
    <a class="btn-link btn-outline" href="<?= h(examportal_url('admin/index.php')); ?>">Back to Admin Home</a>
    <a class="btn-link btn-outline" href="<?= h(examportal_url('admin/papers.php')); ?>">Paper Builder</a>
  </div>
</section>

<section class="panel">
  <h2 class="section-title">Filters</h2>
  <form method="get" class="filter-grid">
    <input type="hidden" name="page" value="1">

    <input type="text" name="search" value="<?= h((string) $filters['search']); ?>" placeholder="User email, name, or paper title">

    <select name="category_id">
      <option value="0">All categories</option>
      <?php foreach ($categories as $category): ?>
        <option value="<?= (int) $category['id']; ?>" <?= (int) $filters['category_id'] === (int) $category['id'] ? 'selected' : ''; ?>>
          <?= h((string) $category['name']); ?>
        </option>
      <?php endforeach; ?>
    </select>

    <select name="status">
      <?php
        $statusOptions = [
            'all' => 'All statuses',
            'not_started' => 'Not started',
            'in_progress' => 'In progress',
            'paused' => 'Paused',
            'auto_submitted' => 'Auto submitted',
            'submitted' => 'Submitted',
            'evaluated' => 'Evaluated',
            'abandoned' => 'Abandoned',
        ];
      ?>
      <?php foreach ($statusOptions as $value => $label): ?>
        <option value="<?= h($value); ?>" <?= (string) $filters['status'] === $value ? 'selected' : ''; ?>><?= h($label); ?></option>
      <?php endforeach; ?>
    </select>

    <input type="date" name="date_from" value="<?= h((string) $filters['date_from']); ?>">
    <input type="date" name="date_to" value="<?= h((string) $filters['date_to']); ?>">

    <button class="btn" type="submit">Apply</button>
  </form>
</section>

<section class="stat-grid">
  <article class="stat-card">
    <h3>Total Attempts</h3>
    <p><strong><?= (int) ($kpis['attempts_total'] ?? 0); ?></strong></p>
    <p class="muted">Evaluated: <?= (int) ($kpis['evaluated_total'] ?? 0); ?></p>
  </article>
  <article class="stat-card">
    <h3>Completion Rate</h3>
    <p><strong><?= h(number_format((float) ($kpis['completion_rate'] ?? 0), 2)); ?>%</strong></p>
    <p class="muted">Pending: <?= (int) ($kpis['pending_total'] ?? 0); ?></p>
  </article>
  <article class="stat-card">
    <h3>Avg Percentage</h3>
    <p><strong><?= h(number_format((float) ($kpis['avg_percentage'] ?? 0), 2)); ?>%</strong></p>
    <p class="muted">Auto submitted: <?= (int) ($kpis['auto_submitted_total'] ?? 0); ?></p>
  </article>
  <article class="stat-card">
    <h3>Refresh Violations</h3>
    <p><strong><?= (int) ($kpis['refresh_violations_total'] ?? 0); ?></strong></p>
    <p class="muted">Avg / attempt: <?= h(number_format((float) ($kpis['avg_refresh_violations'] ?? 0), 2)); ?></p>
  </article>
</section>

<section class="panel">
  <h2 class="section-title">Attempts Ledger</h2>
  <p class="inline-note">Showing <?= count($attemptItems); ?> of <?= $attemptTotal; ?> attempts.</p>

  <div class="question-table-wrap">
    <table class="question-table">
      <thead>
        <tr>
          <th>ID</th>
          <th>User</th>
          <th>Paper</th>
          <th>Category</th>
          <th>Status</th>
          <th>Score</th>
          <th>Runtime Flags</th>
          <th>Time</th>
        </tr>
      </thead>
      <tbody>
        <?php if (!$attemptItems): ?>
          <tr>
            <td colspan="8">No attempts found for current filters.</td>
          </tr>
        <?php else: ?>
          <?php foreach ($attemptItems as $row): ?>
            <?php
              $status = (string) ($row['status'] ?? 'in_progress');
              $statusClass = 'pill';
              if ($status === 'evaluated') {
                  $statusClass .= ' pill-good';
              } elseif (in_array($status, ['abandoned', 'auto_submitted'], true)) {
                  $statusClass .= ' pill-bad';
              }
            ?>
            <tr>
              <td>#<?= (int) ($row['id'] ?? 0); ?></td>
              <td>
                <strong><?= h((string) ($row['user_name'] ?? '')); ?></strong><br>
                <span class="muted"><?= h((string) ($row['user_email'] ?? '')); ?></span>
              </td>
              <td>
                <strong><?= h((string) ($row['paper_title'] ?? '')); ?></strong><br>
                <span class="muted"><?= h((string) ($row['subject_name'] ?? '')); ?><?php if ((string) ($row['exam_year'] ?? '') !== ''): ?> • <?= h((string) $row['exam_year']); ?><?php endif; ?></span>
              </td>
              <td><?= h((string) ($row['category_name'] ?? 'General')); ?></td>
              <td><span class="<?= h($statusClass); ?>"><?= h(ucfirst(str_replace('_', ' ', $status))); ?></span></td>
              <td>
                <?= h(number_format((float) ($row['score_obtained'] ?? 0), 2)); ?> / <?= h(number_format((float) ($row['max_score'] ?? 0), 2)); ?><br>
                <span class="muted"><?= h(number_format((float) ($row['percentage'] ?? 0), 2)); ?>%</span>
              </td>
              <td>
                Resume: <?= (int) ($row['resume_count'] ?? 0); ?><br>
                Refresh: <?= (int) ($row['no_refresh_violations'] ?? 0); ?>
              </td>
              <td>
                <span class="muted">Start: <?= h((string) ($row['started_at'] ?? '—')); ?></span><br>
                <span class="muted">Submit: <?= h((string) ($row['submitted_at'] ?? '—')); ?></span>
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
          $url = examportal_url('admin/reports.php?' . http_build_query($query));
        ?>
        <a class="<?= $p === $page ? 'page-link current' : 'page-link'; ?>" href="<?= h($url); ?>"><?= $p; ?></a>
      <?php endfor; ?>
    </div>
  <?php endif; ?>
</section>

<section class="panel">
  <h2 class="section-title">Top Users</h2>
  <div class="question-table-wrap">
    <table class="question-table">
      <thead>
        <tr>
          <th>User</th>
          <th>Attempts</th>
          <th>Evaluated</th>
          <th>Average %</th>
          <th>Best %</th>
          <th>Refresh Violations</th>
        </tr>
      </thead>
      <tbody>
        <?php if (!$topUsers): ?>
          <tr><td colspan="6">No user data found.</td></tr>
        <?php else: ?>
          <?php foreach ($topUsers as $row): ?>
            <tr>
              <td>
                <strong><?= h((string) ($row['user_name'] ?? '')); ?></strong><br>
                <span class="muted"><?= h((string) ($row['user_email'] ?? '')); ?></span>
              </td>
              <td><?= (int) ($row['attempts_total'] ?? 0); ?></td>
              <td><?= (int) ($row['evaluated_total'] ?? 0); ?></td>
              <td><?= h(number_format((float) ($row['avg_percentage'] ?? 0), 2)); ?>%</td>
              <td><?= h(number_format((float) ($row['best_percentage'] ?? 0), 2)); ?>%</td>
              <td><?= (int) ($row['refresh_violations_total'] ?? 0); ?></td>
            </tr>
          <?php endforeach; ?>
        <?php endif; ?>
      </tbody>
    </table>
  </div>
</section>

<section class="panel">
  <h2 class="section-title">Category Breakdown</h2>
  <div class="question-table-wrap">
    <table class="question-table">
      <thead>
        <tr>
          <th>Category</th>
          <th>Attempts</th>
          <th>Evaluated</th>
          <th>Auto Submitted</th>
          <th>Average %</th>
        </tr>
      </thead>
      <tbody>
        <?php if (!$categoryBreakdown): ?>
          <tr><td colspan="5">No category breakdown data found.</td></tr>
        <?php else: ?>
          <?php foreach ($categoryBreakdown as $row): ?>
            <tr>
              <td><?= h((string) ($row['category_name'] ?? 'General')); ?></td>
              <td><?= (int) ($row['attempts_total'] ?? 0); ?></td>
              <td><?= (int) ($row['evaluated_total'] ?? 0); ?></td>
              <td><?= (int) ($row['auto_submitted_total'] ?? 0); ?></td>
              <td><?= h(number_format((float) ($row['avg_percentage'] ?? 0), 2)); ?>%</td>
            </tr>
          <?php endforeach; ?>
        <?php endif; ?>
      </tbody>
    </table>
  </div>
</section>

<section class="panel">
  <h2 class="section-title">Recent Policy Events</h2>
  <div class="question-table-wrap">
    <table class="question-table">
      <thead>
        <tr>
          <th>Time</th>
          <th>Event</th>
          <th>Attempt</th>
          <th>User</th>
          <th>Paper</th>
          <th>Payload</th>
        </tr>
      </thead>
      <tbody>
        <?php if (!$policyEvents): ?>
          <tr><td colspan="6">No policy events for current filters.</td></tr>
        <?php else: ?>
          <?php foreach ($policyEvents as $row): ?>
            <?php
              $payloadText = '';
              $payloadRaw = (string) ($row['event_payload_json'] ?? '');
              if ($payloadRaw !== '') {
                  $decoded = json_decode($payloadRaw, true);
                  if (is_array($decoded)) {
                      $payloadText = json_encode($decoded, JSON_UNESCAPED_UNICODE);
                  }
              }
              if ($payloadText === '') {
                  $payloadText = $payloadRaw;
              }
              if (strlen($payloadText) > 180) {
                  $payloadText = substr($payloadText, 0, 180) . '...';
              }
            ?>
            <tr>
              <td><?= h((string) ($row['created_at'] ?? '')); ?></td>
              <td><span class="pill"><?= h((string) ($row['event_type'] ?? '')); ?></span></td>
              <td>#<?= (int) ($row['attempt_id'] ?? 0); ?><br><span class="muted"><?= h((string) ($row['attempt_status'] ?? '')); ?></span></td>
              <td><?= h((string) ($row['user_email'] ?? '')); ?></td>
              <td><?= h((string) ($row['paper_title'] ?? '')); ?><br><span class="muted"><?= h((string) ($row['category_name'] ?? '')); ?></span></td>
              <td><span class="muted"><?= h($payloadText); ?></span></td>
            </tr>
          <?php endforeach; ?>
        <?php endif; ?>
      </tbody>
    </table>
  </div>
</section>

<?php ep_render_page_end(); ?>
