<?php
declare(strict_types=1);
require_once __DIR__ . '/../config/app.php';

ep_require_admin();

$stats = ep_admin_stats();

ep_render_page_start([
    'title' => 'Admin',
    'active' => 'admin',
    'hero_kicker' => 'Portal Overview',
    'hero_title' => 'Admin Workspace',
    'hero_text' => 'Database-backed operations, policy analytics, and content management are live in this workspace.',
]);
?>

<section class="stat-grid">
  <article class="stat-card">
    <h3>Total Users</h3>
    <p><strong><?= (int) $stats['users_total']; ?></strong></p>
  </article>
  <article class="stat-card">
    <h3>Active Subscriptions</h3>
    <p><strong><?= (int) $stats['subscriptions_active']; ?></strong></p>
  </article>
  <article class="stat-card">
    <h3>Question Sets</h3>
    <p><strong><?= (int) $stats['question_sets_total']; ?></strong></p>
  </article>
  <article class="stat-card">
    <h3>Question Bank</h3>
    <p><strong><?= (int) $stats['question_bank_total']; ?></strong></p>
    <p class="muted">Active: <?= (int) $stats['question_bank_active']; ?></p>
  </article>
  <article class="stat-card">
    <h3>Paper Templates</h3>
    <p><strong><?= (int) $stats['paper_templates_total']; ?></strong></p>
    <p class="muted">Published: <?= (int) $stats['paper_templates_published']; ?></p>
  </article>
  <article class="stat-card">
    <h3>Exam Results</h3>
    <p><strong><?= (int) $stats['exam_results_total']; ?></strong></p>
    <p class="muted">Progress Rows: <?= (int) $stats['progress_rows_total']; ?></p>
  </article>
</section>

<section class="panel">
  <p class="muted">Question bank, import, paper builder, and reports analytics are available for admin workflow.</p>
  <div class="actions">
    <a class="btn-link" href="<?= h(examportal_url('admin/questions.php')); ?>">Open Question Bank</a>
    <a class="btn-link" href="<?= h(examportal_url('admin/import.php')); ?>">Open Import Engine</a>
    <a class="btn-link" href="<?= h(examportal_url('admin/papers.php')); ?>">Open Paper Builder</a>
    <a class="btn-link" href="<?= h(examportal_url('admin/users.php')); ?>">Open Users</a>
    <a class="btn-link" href="<?= h(examportal_url('admin/subscriptions.php')); ?>">Open Subscriptions</a>
    <a class="btn-link" href="<?= h(examportal_url('admin/security.php')); ?>">Open Security</a>
    <a class="btn-link btn-outline" href="<?= h(examportal_url('admin/reports.php')); ?>">Open Reports</a>
  </div>
</section>

<?php ep_render_page_end(); ?>
