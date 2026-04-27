<?php
declare(strict_types=1);
require_once __DIR__ . '/config/app.php';

ep_require_subscription();

$currentUser = ep_current_user();
if (!$currentUser) {
    ep_redirect('user/login.php');
}

$slug = trim((string) ($_GET['exam'] ?? $_POST['exam'] ?? ''));
if ($slug === '') {
    ep_flash_set('error', 'Choose an exam category first.');
    ep_redirect('index.php');
}

$category = ep_get_category_by_slug($slug);
if (!$category) {
    ep_flash_set('error', 'Category not found.');
    ep_redirect('index.php');
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $csrfToken = $_POST['csrf_token'] ?? null;
    if (!ep_verify_csrf_token(is_string($csrfToken) ? $csrfToken : null)) {
        ep_flash_set('error', 'Session validation failed. Please refresh and try again.');
        ep_redirect('category.php?exam=' . urlencode($slug));
    }

    $postAction = (string) ($_POST['post_action'] ?? '');
    if ($postAction === 'start_template') {
        $templateId = (int) ($_POST['template_id'] ?? 0);
        $start = ep_start_exam_attempt((int) $currentUser['id'], $templateId);
        if (!($start['ok'] ?? false)) {
            ep_flash_set('error', (string) ($start['message'] ?? 'Unable to start selected paper.'));
            ep_redirect('category.php?exam=' . urlencode($slug));
        }

        ep_flash_set('success', (string) ($start['message'] ?? 'Paper ready.'));
        ep_redirect('user/exam.php?attempt_id=' . (int) $start['attempt_id']);
    }

    ep_redirect('category.php?exam=' . urlencode($slug));
}

$subscription = ep_get_active_subscription_for_user((int) $currentUser['id']);
if (!$subscription) {
    ep_flash_set('error', 'Active subscription required.');
    ep_redirect('user/subscribe.php');
}

$templates = ep_get_published_templates_by_category_for_user((int) $category['id']);
$templateIds = array_map(static fn(array $row): int => (int) ($row['id'] ?? 0), $templates);
$pendingByTemplate = ep_get_pending_attempt_map_for_templates((int) $currentUser['id'], $templateIds);

ep_render_page_start([
    'title' => (string) $category['name'],
    'active' => 'home',
    'hero_kicker' => 'Module 7',
    'hero_title' => (string) $category['name'] . ' Papers',
    'hero_text' => 'Start a paper with timer and resume pending attempts directly from this category.',
]);
?>

<section class="panel">
  <div class="meta-list">
    <span class="pill">Plan: <?= h((string) $subscription['plan_name']); ?></span>
    <span class="pill">Papers Left: <?= (int) ep_subscription_remaining_papers($subscription); ?></span>
    <span class="pill">Category: <?= h((string) $category['name']); ?></span>
  </div>
</section>

<h2 class="section-title">Published Papers</h2>
<?php if (!$templates): ?>
  <section class="panel">
    <p class="muted">No published papers are available in this category yet.</p>
  </section>
<?php else: ?>
  <section class="set-grid">
    <?php foreach ($templates as $template): ?>
      <?php
        $templateId = (int) ($template['id'] ?? 0);
        $pending = $pendingByTemplate[$templateId] ?? null;
        $isPending = is_array($pending);
        $buttonLabel = $isPending ? 'Resume Attempt' : 'Start Paper';
      ?>
      <article class="set-card">
        <h3><?= h((string) $template['title']); ?></h3>
        <p class="muted">
          <?= h((string) (($template['subject_name'] ?? '') !== '' ? $template['subject_name'] : 'General Subject')); ?>
          <?php if ((string) ($template['exam_year'] ?? '') !== ''): ?>
            • <?= h((string) $template['exam_year']); ?>
          <?php endif; ?>
        </p>

        <div class="meta-list">
          <span class="pill"><?= (int) (($template['item_count'] ?? 0) > 0 ? $template['item_count'] : $template['total_questions']); ?> Questions</span>
          <span class="pill"><?= (int) ($template['duration_minutes'] ?? 0); ?> Minutes</span>
          <span class="pill">Max Score: <?= h(number_format((float) ($template['max_score'] ?? 0), 2)); ?></span>
          <span class="pill">Attempts/User: <?= (int) ($template['max_attempts_per_user'] ?? 1); ?></span>
          <span class="pill">Pause: <?= ((int) ($template['allow_pause'] ?? 1) === 1) ? 'Yes' : 'No'; ?></span>
          <span class="pill">No Refresh: <?= ((int) ($template['no_refresh_mode'] ?? 0) === 1) ? 'On' : 'Off'; ?></span>
          <span class="pill">Refresh Limit: <?= (int) ($template['max_refresh_violations'] ?? 1); ?></span>
        </div>

        <?php if ((string) ($template['instructions'] ?? '') !== ''): ?>
          <p class="inline-note"><?= h((string) $template['instructions']); ?></p>
        <?php endif; ?>

        <?php if ($isPending): ?>
          <p class="inline-note">Pending attempt #<?= (int) ($pending['id'] ?? 0); ?> • Status: <?= h((string) ($pending['status'] ?? 'in_progress')); ?></p>
        <?php endif; ?>

        <form method="post" class="inline-form">
          <input type="hidden" name="csrf_token" value="<?= h(ep_csrf_token()); ?>">
          <input type="hidden" name="exam" value="<?= h($slug); ?>">
          <input type="hidden" name="post_action" value="start_template">
          <input type="hidden" name="template_id" value="<?= $templateId; ?>">
          <button class="btn" type="submit"><?= h($buttonLabel); ?></button>
        </form>
      </article>
    <?php endforeach; ?>
  </section>
<?php endif; ?>

<?php ep_render_page_end(); ?>
