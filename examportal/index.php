<?php
declare(strict_types=1);
require_once __DIR__ . '/config/app.php';

$currentUser = ep_current_user();
$subscription = null;
if ($currentUser) {
    $subscription = ep_get_active_subscription_for_user((int) $currentUser['id']);
}

$categories = ep_get_categories();

ep_render_page_start([
    'title' => 'Home',
    'active' => 'home',
    'hero_kicker' => 'Paid Subscription Portal',
    'hero_title' => 'ExamPortal',
    'hero_text' => 'Model question papers for Selective School, NAPLAN, PSC, UPSC, and Entrance exams.',
]);
?>

<?php if (!$currentUser): ?>
  <section class="panel">
    <p class="muted">Login is required to access paid content. New user? Create your account and choose a subscription plan.</p>
    <div class="actions">
      <a class="btn-link" href="<?= h(examportal_url('user/login.php')); ?>">Login</a>
      <a class="btn-link btn-outline" href="<?= h(examportal_url('user/register.php')); ?>">Register</a>
    </div>
    <p class="inline-note">Demo account: <strong>subscriber@examportal.com</strong> / <strong>demo12345</strong></p>
  </section>
<?php elseif ($subscription === null): ?>
  <section class="panel">
    <p class="muted">Your account is active, but you do not have a paid subscription yet.</p>
    <div class="actions">
      <a class="btn-link" href="<?= h(examportal_url('user/subscribe.php')); ?>">Activate Subscription</a>
    </div>
  </section>
<?php else: ?>
  <section class="panel">
    <div class="meta-list">
      <span class="pill">Plan: <?= h((string) $subscription['plan_name']); ?></span>
      <span class="pill">Expires: <?= h((string) $subscription['expires_at']); ?></span>
      <span class="pill">Papers Left: <?= (int) ep_subscription_remaining_papers($subscription); ?></span>
    </div>
  </section>
<?php endif; ?>

<h2 class="section-title">Exam Categories</h2>
<section class="grid">
  <?php foreach ($categories as $item): ?>
    <a class="card" href="<?= h(examportal_url('category.php?exam=' . urlencode((string) $item['slug']))); ?>">
      <span class="tag">Subscription</span>
      <h3><?= h((string) $item['name']); ?></h3>
      <p><?= h((string) ($item['description'] ?? '')) ?></p>
    </a>
  <?php endforeach; ?>
</section>

<?php ep_render_page_end(); ?>
