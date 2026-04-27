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
    $planId = (int) ($_POST['plan_id'] ?? 0);

    if (!ep_verify_csrf_token(is_string($csrfToken) ? $csrfToken : null)) {
        ep_flash_set('error', 'Session validation failed. Try again.');
        ep_redirect('user/subscribe.php');
    }

    $activation = ep_activate_subscription((int) $user['id'], $planId);
    if (!($activation['ok'] ?? false)) {
        ep_flash_set('error', (string) ($activation['message'] ?? 'Unable to activate subscription.'));
    } else {
        ep_flash_set('success', (string) ($activation['message'] ?? 'Subscription activated.'));
    }

    ep_redirect('user/subscribe.php');
}

$activeSubscription = ep_get_active_subscription_for_user((int) $user['id']);
$plans = ep_get_available_plans();

ep_render_page_start([
    'title' => 'Subscription',
    'active' => 'subscribe',
    'hero_kicker' => 'Plan Management',
    'hero_title' => 'Choose Your Plan',
    'hero_text' => 'Access to model papers is enabled only with an active paid subscription.',
]);
?>

<?php if ($activeSubscription): ?>
  <section class="panel">
    <div class="meta-list">
      <span class="pill">Current Plan: <?= h((string) $activeSubscription['plan_name']); ?></span>
      <span class="pill">Expires: <?= h((string) $activeSubscription['expires_at']); ?></span>
      <span class="pill">Papers Left: <?= (int) ep_subscription_remaining_papers($activeSubscription); ?></span>
    </div>
  </section>
<?php endif; ?>

<section class="plan-grid">
  <?php foreach ($plans as $plan): ?>
    <article class="plan-card">
      <h3><?= h((string) $plan['name']); ?></h3>
      <p class="plan-price">AUD <?= number_format((float) $plan['price_aud'], 2); ?></p>
      <p class="muted"><?= h((string) ($plan['description'] ?? '')); ?></p>
      <div class="meta-list">
        <span class="pill"><?= (int) $plan['max_papers_per_cycle']; ?> Papers / Cycle</span>
        <span class="pill"><?= (int) $plan['duration_days']; ?> Days</span>
      </div>
      <form method="post" class="inline-form">
        <input type="hidden" name="csrf_token" value="<?= h(ep_csrf_token()); ?>">
        <input type="hidden" name="plan_id" value="<?= (int) $plan['id']; ?>">
        <button class="btn" type="submit">Activate Plan</button>
      </form>
    </article>
  <?php endforeach; ?>
</section>

<?php ep_render_page_end(); ?>
