<?php
declare(strict_types=1);
require_once __DIR__ . '/../config/app.php';

ep_require_admin();

$adminUser = ep_current_user();
if (!$adminUser) {
    ep_redirect('user/login.php');
}

function ep_datetime_local_value(?string $value): string
{
    if (!is_string($value) || trim($value) === '') {
        return '';
    }

    $timestamp = strtotime($value . ' UTC');
    if ($timestamp === false) {
        $timestamp = strtotime($value);
    }
    if ($timestamp === false) {
        return '';
    }

    return gmdate('Y-m-d\TH:i', $timestamp);
}

$planForm = [
    'id' => 0,
    'name' => '',
    'slug' => '',
    'description' => '',
    'max_papers_per_cycle' => '20',
    'duration_days' => '30',
    'price_aud' => '0',
    'is_active' => 1,
];

$assignForm = [
    'user_id' => 0,
    'user_email' => '',
    'plan_id' => 0,
    'status' => 'active',
    'duration_days' => '',
    'started_at' => gmdate('Y-m-d\TH:i'),
    'expires_at' => '',
    'papers_used' => '0',
    'note' => '',
];

$editPlanId = (int) ($_GET['edit_plan_id'] ?? 0);
if ($editPlanId > 0) {
    $plan = ep_admin_get_subscription_plan($editPlanId);
    if ($plan) {
        $planForm = [
            'id' => (int) ($plan['id'] ?? 0),
            'name' => (string) ($plan['name'] ?? ''),
            'slug' => (string) ($plan['slug'] ?? ''),
            'description' => (string) ($plan['description'] ?? ''),
            'max_papers_per_cycle' => (string) ($plan['max_papers_per_cycle'] ?? '20'),
            'duration_days' => (string) ($plan['duration_days'] ?? '30'),
            'price_aud' => (string) ($plan['price_aud'] ?? '0'),
            'is_active' => (int) ($plan['is_active'] ?? 0),
        ];
    }
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $csrfToken = $_POST['csrf_token'] ?? null;
    if (!ep_verify_csrf_token(is_string($csrfToken) ? $csrfToken : null)) {
        ep_flash_set('error', 'Session validation failed. Please refresh and try again.');
        ep_redirect('admin/subscriptions.php');
    }

    $postAction = (string) ($_POST['post_action'] ?? '');
    $returnTo = trim((string) ($_POST['return_to'] ?? ''));
    if ($returnTo === '') {
        $returnTo = 'admin/subscriptions.php';
    }

    if ($postAction === 'save_plan') {
        $result = ep_admin_save_subscription_plan([
            'id' => (int) ($_POST['id'] ?? 0),
            'name' => trim((string) ($_POST['name'] ?? '')),
            'slug' => trim((string) ($_POST['slug'] ?? '')),
            'description' => trim((string) ($_POST['description'] ?? '')),
            'max_papers_per_cycle' => (int) ($_POST['max_papers_per_cycle'] ?? 0),
            'duration_days' => (int) ($_POST['duration_days'] ?? 0),
            'price_aud' => trim((string) ($_POST['price_aud'] ?? '0')),
            'is_active' => isset($_POST['is_active']) ? 1 : 0,
        ]);
        if (!($result['ok'] ?? false)) {
            ep_flash_set('error', (string) ($result['message'] ?? 'Unable to save plan.'));
            ep_redirect('admin/subscriptions.php');
        }

        ep_flash_set('success', (string) ($result['message'] ?? 'Plan saved.'));
        $savedPlanId = (int) ($result['plan_id'] ?? 0);
        if ($savedPlanId > 0) {
            ep_redirect('admin/subscriptions.php?edit_plan_id=' . $savedPlanId);
        }
        ep_redirect('admin/subscriptions.php');
    }

    if ($postAction === 'toggle_plan') {
        $planId = (int) ($_POST['plan_id'] ?? 0);
        $targetStatus = (int) ($_POST['target_status'] ?? 0) === 1;
        $result = ep_admin_set_subscription_plan_active_status($planId, $targetStatus);
        if (!($result['ok'] ?? false)) {
            ep_flash_set('error', (string) ($result['message'] ?? 'Unable to update plan status.'));
        } else {
            ep_flash_set('success', (string) ($result['message'] ?? 'Plan status updated.'));
        }
        ep_redirect($returnTo);
    }

    if ($postAction === 'assign_subscription') {
        $result = ep_admin_assign_subscription((int) $adminUser['id'], [
            'user_id' => (int) ($_POST['user_id'] ?? 0),
            'user_email' => trim((string) ($_POST['user_email'] ?? '')),
            'plan_id' => (int) ($_POST['plan_id'] ?? 0),
            'status' => (string) ($_POST['status'] ?? 'active'),
            'duration_days' => (int) ($_POST['duration_days'] ?? 0),
            'started_at' => (string) ($_POST['started_at'] ?? ''),
            'expires_at' => (string) ($_POST['expires_at'] ?? ''),
            'papers_used' => (int) ($_POST['papers_used'] ?? 0),
            'note' => trim((string) ($_POST['note'] ?? '')),
        ]);
        if (!($result['ok'] ?? false)) {
            ep_flash_set('error', (string) ($result['message'] ?? 'Unable to assign subscription.'));
        } else {
            ep_flash_set('success', (string) ($result['message'] ?? 'Subscription assigned.'));
        }
        ep_redirect($returnTo);
    }

    if ($postAction === 'update_subscription') {
        $result = ep_admin_update_subscription((int) $adminUser['id'], [
            'subscription_id' => (int) ($_POST['subscription_id'] ?? 0),
            'status' => (string) ($_POST['status'] ?? 'pending'),
            'papers_used' => (int) ($_POST['papers_used'] ?? 0),
            'started_at' => (string) ($_POST['started_at'] ?? ''),
            'expires_at' => (string) ($_POST['expires_at'] ?? ''),
            'note' => trim((string) ($_POST['note'] ?? '')),
        ]);
        if (!($result['ok'] ?? false)) {
            ep_flash_set('error', (string) ($result['message'] ?? 'Unable to update subscription.'));
        } else {
            ep_flash_set('success', (string) ($result['message'] ?? 'Subscription updated.'));
        }
        ep_redirect($returnTo);
    }

    ep_flash_set('error', 'Unknown action.');
    ep_redirect($returnTo);
}

$filter = [
    'search' => trim((string) ($_GET['search'] ?? '')),
    'status' => trim((string) ($_GET['status'] ?? 'all')),
    'plan_id' => (int) ($_GET['plan_id'] ?? 0),
];
$statusAllowed = ['all', 'active', 'expired', 'cancelled', 'pending'];
if (!in_array($filter['status'], $statusAllowed, true)) {
    $filter['status'] = 'all';
}

$page = max(1, (int) ($_GET['page'] ?? 1));
$limit = 20;
$offset = ($page - 1) * $limit;

$stats = ep_admin_subscription_stats();
$plans = ep_admin_get_subscription_plans(true);
$users = ep_admin_get_user_options(120);
$subscriptionRows = ep_admin_get_subscription_records($filter, $limit, $offset);
$subscriptions = $subscriptionRows['rows'];
$totalSubscriptions = (int) ($subscriptionRows['total'] ?? 0);
$usageEvents = ep_admin_get_subscription_usage_feed(['search' => $filter['search']], 20);

$baseQuery = [
    'search' => $filter['search'],
    'status' => $filter['status'],
    'plan_id' => $filter['plan_id'],
];
$returnTo = 'admin/subscriptions.php';
if ($baseQuery['search'] !== '' || $baseQuery['status'] !== 'all' || $baseQuery['plan_id'] > 0 || $page > 1) {
    $withPage = $baseQuery;
    $withPage['page'] = $page;
    $returnTo .= '?' . http_build_query($withPage);
}

$totalPages = max(1, (int) ceil($totalSubscriptions / $limit));

ep_render_page_start([
    'title' => 'Admin Subscriptions',
    'active' => 'admin_subscriptions',
    'hero_kicker' => 'Module 10',
    'hero_title' => 'Subscription Operations',
    'hero_text' => 'Manage plan catalog, assign paid access, adjust paper quota, and monitor subscription usage events.',
]);
?>

<section class="stat-grid">
  <article class="stat-card">
    <h3>Plans</h3>
    <p><strong><?= (int) $stats['plans_total']; ?></strong></p>
    <p class="muted">Active: <?= (int) $stats['plans_active']; ?></p>
  </article>
  <article class="stat-card">
    <h3>Subscriptions</h3>
    <p><strong><?= (int) $stats['subscriptions_total']; ?></strong></p>
    <p class="muted">Active: <?= (int) $stats['subscriptions_active']; ?></p>
  </article>
  <article class="stat-card">
    <h3>Expired / Cancelled</h3>
    <p><strong><?= (int) $stats['subscriptions_expired']; ?> / <?= (int) $stats['subscriptions_cancelled']; ?></strong></p>
    <p class="muted">Pending: <?= (int) $stats['subscriptions_pending']; ?></p>
  </article>
  <article class="stat-card">
    <h3>Papers Consumed</h3>
    <p><strong><?= (int) $stats['papers_used_total']; ?></strong></p>
    <p class="muted">Across all subscriptions.</p>
  </article>
</section>

<section class="panel">
  <h2 class="section-title"><?= (int) $planForm['id'] > 0 ? 'Edit Plan' : 'Create Plan'; ?></h2>
  <form method="post" class="question-form-grid">
    <input type="hidden" name="csrf_token" value="<?= h(ep_csrf_token()); ?>">
    <input type="hidden" name="post_action" value="save_plan">
    <input type="hidden" name="id" value="<?= (int) $planForm['id']; ?>">

    <label for="name">Plan Name</label>
    <input id="name" name="name" value="<?= h((string) $planForm['name']); ?>" placeholder="Starter Monthly" required>

    <label for="slug">Slug</label>
    <input id="slug" name="slug" value="<?= h((string) $planForm['slug']); ?>" placeholder="starter-monthly">

    <label for="description">Description</label>
    <textarea id="description" name="description" placeholder="Best for regular practice."><?= h((string) $planForm['description']); ?></textarea>

    <label for="max_papers_per_cycle">Max Papers</label>
    <input id="max_papers_per_cycle" type="number" min="1" max="100000" name="max_papers_per_cycle" value="<?= h((string) $planForm['max_papers_per_cycle']); ?>" required>

    <label for="duration_days">Duration (Days)</label>
    <input id="duration_days" type="number" min="1" max="3650" name="duration_days" value="<?= h((string) $planForm['duration_days']); ?>" required>

    <label for="price_aud">Price (AUD)</label>
    <input id="price_aud" type="number" min="0" step="0.01" name="price_aud" value="<?= h((string) $planForm['price_aud']); ?>" required>

    <label class="checkbox-row"><input type="checkbox" name="is_active" value="1" <?= (int) $planForm['is_active'] === 1 ? 'checked' : ''; ?>> Active plan</label>
    <div class="form-actions">
      <button class="btn" type="submit"><?= (int) $planForm['id'] > 0 ? 'Update Plan' : 'Create Plan'; ?></button>
      <a class="btn-link btn-outline" href="<?= h(examportal_url('admin/subscriptions.php')); ?>">Reset Form</a>
    </div>
  </form>
</section>

<section class="panel">
  <h2 class="section-title">Plan Catalog</h2>
  <?php if (!$plans): ?>
    <p class="muted">No plans found.</p>
  <?php else: ?>
    <div class="question-table-wrap">
      <table class="question-table">
        <thead>
          <tr>
            <th>Plan</th>
            <th>Quota</th>
            <th>Duration</th>
            <th>Price</th>
            <th>Subscribers</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          <?php foreach ($plans as $plan): ?>
            <?php $isActive = (int) ($plan['is_active'] ?? 0) === 1; ?>
            <tr>
              <td>
                <strong><?= h((string) ($plan['name'] ?? '')); ?></strong><br>
                <span class="muted"><?= h((string) ($plan['slug'] ?? '')); ?></span>
              </td>
              <td><?= (int) ($plan['max_papers_per_cycle'] ?? 0); ?></td>
              <td><?= (int) ($plan['duration_days'] ?? 0); ?> days</td>
              <td>AUD <?= h(number_format((float) ($plan['price_aud'] ?? 0), 2)); ?></td>
              <td><?= (int) ($plan['active_subscriptions'] ?? 0); ?> active / <?= (int) ($plan['subscriptions_total'] ?? 0); ?> total</td>
              <td><span class="pill <?= $isActive ? 'pill-good' : 'pill-bad'; ?>"><?= $isActive ? 'Active' : 'Inactive'; ?></span></td>
              <td>
                <div class="table-actions">
                  <a class="btn-link btn-outline" href="<?= h(examportal_url('admin/subscriptions.php?edit_plan_id=' . (int) $plan['id'])); ?>">Edit</a>
                  <form method="post" class="inline-form-compact">
                    <input type="hidden" name="csrf_token" value="<?= h(ep_csrf_token()); ?>">
                    <input type="hidden" name="post_action" value="toggle_plan">
                    <input type="hidden" name="plan_id" value="<?= (int) $plan['id']; ?>">
                    <input type="hidden" name="target_status" value="<?= $isActive ? '0' : '1'; ?>">
                    <input type="hidden" name="return_to" value="<?= h($returnTo); ?>">
                    <button class="btn btn-mini" type="submit"><?= $isActive ? 'Archive' : 'Activate'; ?></button>
                  </form>
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
  <h2 class="section-title">Assign Subscription</h2>
  <form method="post" class="question-form-grid">
    <input type="hidden" name="csrf_token" value="<?= h(ep_csrf_token()); ?>">
    <input type="hidden" name="post_action" value="assign_subscription">
    <input type="hidden" name="return_to" value="<?= h($returnTo); ?>">

    <label for="user_id">Select User</label>
    <select id="user_id" name="user_id">
      <option value="0">Choose user (optional if email entered)</option>
      <?php foreach ($users as $user): ?>
        <option value="<?= (int) ($user['id'] ?? 0); ?>" <?= (int) $assignForm['user_id'] === (int) ($user['id'] ?? 0) ? 'selected' : ''; ?>>
          <?= h((string) ($user['name'] ?? '')); ?> (<?= h((string) ($user['email'] ?? '')); ?>)
        </option>
      <?php endforeach; ?>
    </select>

    <label for="user_email">Or User Email</label>
    <input id="user_email" name="user_email" type="email" value="<?= h((string) $assignForm['user_email']); ?>" placeholder="subscriber@examportal.com">

    <label for="plan_id">Plan</label>
    <select id="plan_id" name="plan_id" required>
      <option value="0">Choose plan</option>
      <?php foreach ($plans as $plan): ?>
        <option value="<?= (int) ($plan['id'] ?? 0); ?>" <?= (int) $assignForm['plan_id'] === (int) ($plan['id'] ?? 0) ? 'selected' : ''; ?>>
          <?= h((string) ($plan['name'] ?? '')); ?> (<?= (int) ($plan['max_papers_per_cycle'] ?? 0); ?> papers / <?= (int) ($plan['duration_days'] ?? 0); ?> days)
        </option>
      <?php endforeach; ?>
    </select>

    <label for="status">Status</label>
    <select id="status" name="status">
      <option value="active" <?= $assignForm['status'] === 'active' ? 'selected' : ''; ?>>Active</option>
      <option value="pending" <?= $assignForm['status'] === 'pending' ? 'selected' : ''; ?>>Pending</option>
      <option value="cancelled" <?= $assignForm['status'] === 'cancelled' ? 'selected' : ''; ?>>Cancelled</option>
      <option value="expired" <?= $assignForm['status'] === 'expired' ? 'selected' : ''; ?>>Expired</option>
    </select>

    <label for="duration_days">Duration Override (days)</label>
    <input id="duration_days" name="duration_days" type="number" min="1" max="3650" value="<?= h((string) $assignForm['duration_days']); ?>" placeholder="Use plan default if empty">

    <label for="started_at">Start Time (UTC)</label>
    <input id="started_at" name="started_at" type="datetime-local" value="<?= h((string) $assignForm['started_at']); ?>">

    <label for="expires_at">Expiry Time (UTC)</label>
    <input id="expires_at" name="expires_at" type="datetime-local" value="<?= h((string) $assignForm['expires_at']); ?>">

    <label for="papers_used">Papers Used</label>
    <input id="papers_used" name="papers_used" type="number" min="0" value="<?= h((string) $assignForm['papers_used']); ?>">

    <label for="note">Admin Note</label>
    <input id="note" name="note" value="<?= h((string) $assignForm['note']); ?>" placeholder="Optional reason">

    <div class="form-actions">
      <button class="btn" type="submit">Assign Subscription</button>
    </div>
  </form>
  <p class="inline-note">If both user selector and email are provided, selected user id is used first.</p>
</section>

<section class="panel">
  <h2 class="section-title">Manage User Subscriptions</h2>
  <form method="get" class="filter-grid">
    <input type="text" name="search" value="<?= h($filter['search']); ?>" placeholder="Search user or plan">
    <select name="status">
      <option value="all" <?= $filter['status'] === 'all' ? 'selected' : ''; ?>>All Status</option>
      <option value="active" <?= $filter['status'] === 'active' ? 'selected' : ''; ?>>Active</option>
      <option value="pending" <?= $filter['status'] === 'pending' ? 'selected' : ''; ?>>Pending</option>
      <option value="expired" <?= $filter['status'] === 'expired' ? 'selected' : ''; ?>>Expired</option>
      <option value="cancelled" <?= $filter['status'] === 'cancelled' ? 'selected' : ''; ?>>Cancelled</option>
    </select>
    <select name="plan_id">
      <option value="0">All Plans</option>
      <?php foreach ($plans as $plan): ?>
        <option value="<?= (int) ($plan['id'] ?? 0); ?>" <?= $filter['plan_id'] === (int) ($plan['id'] ?? 0) ? 'selected' : ''; ?>>
          <?= h((string) ($plan['name'] ?? '')); ?>
        </option>
      <?php endforeach; ?>
    </select>
    <button class="btn" type="submit">Filter</button>
    <a class="btn-link btn-outline" href="<?= h(examportal_url('admin/subscriptions.php')); ?>">Reset</a>
  </form>

  <p class="inline-note">Showing <?= count($subscriptions); ?> of <?= $totalSubscriptions; ?> subscription records.</p>

  <?php if (!$subscriptions): ?>
    <p class="muted">No subscriptions found for current filter.</p>
  <?php else: ?>
    <div class="question-table-wrap">
      <table class="question-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>User</th>
            <th>Plan</th>
            <th>Status</th>
            <th>Period</th>
            <th>Quota</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          <?php foreach ($subscriptions as $subscription): ?>
            <?php
              $rowStatus = (string) ($subscription['status'] ?? 'pending');
              $statusClass = 'pill';
              if ($rowStatus === 'active') {
                  $statusClass .= ' pill-good';
              } elseif (in_array($rowStatus, ['expired', 'cancelled'], true)) {
                  $statusClass .= ' pill-bad';
              }
            ?>
            <tr>
              <td>#<?= (int) ($subscription['id'] ?? 0); ?></td>
              <td>
                <strong><?= h((string) ($subscription['user_name'] ?? '')); ?></strong><br>
                <span class="muted"><?= h((string) ($subscription['user_email'] ?? '')); ?></span>
              </td>
              <td>
                <strong><?= h((string) ($subscription['plan_name'] ?? '')); ?></strong><br>
                <span class="muted"><?= h((string) ($subscription['plan_slug'] ?? '')); ?></span>
              </td>
              <td><span class="<?= h($statusClass); ?>"><?= h(ucfirst($rowStatus)); ?></span></td>
              <td>
                <span class="muted">Start: <?= h((string) ($subscription['started_at'] ?? '—')); ?></span><br>
                <span class="muted">End: <?= h((string) ($subscription['expires_at'] ?? '—')); ?></span>
              </td>
              <td>
                <?= (int) ($subscription['papers_used'] ?? 0); ?> / <?= (int) ($subscription['max_papers_per_cycle'] ?? 0); ?><br>
                <span class="muted">Remaining: <?= (int) ($subscription['remaining_papers'] ?? 0); ?></span>
              </td>
              <td>
                <form method="post" class="inline-form-compact">
                  <input type="hidden" name="csrf_token" value="<?= h(ep_csrf_token()); ?>">
                  <input type="hidden" name="post_action" value="update_subscription">
                  <input type="hidden" name="subscription_id" value="<?= (int) ($subscription['id'] ?? 0); ?>">
                  <input type="hidden" name="return_to" value="<?= h($returnTo); ?>">

                  <select name="status">
                    <option value="active" <?= $rowStatus === 'active' ? 'selected' : ''; ?>>Active</option>
                    <option value="pending" <?= $rowStatus === 'pending' ? 'selected' : ''; ?>>Pending</option>
                    <option value="expired" <?= $rowStatus === 'expired' ? 'selected' : ''; ?>>Expired</option>
                    <option value="cancelled" <?= $rowStatus === 'cancelled' ? 'selected' : ''; ?>>Cancelled</option>
                  </select>
                  <input type="number" name="papers_used" min="0" value="<?= (int) ($subscription['papers_used'] ?? 0); ?>" style="max-width:88px;">
                  <input type="datetime-local" name="started_at" value="<?= h(ep_datetime_local_value((string) ($subscription['started_at'] ?? ''))); ?>">
                  <input type="datetime-local" name="expires_at" value="<?= h(ep_datetime_local_value((string) ($subscription['expires_at'] ?? ''))); ?>">
                  <input type="text" name="note" placeholder="Adjustment note">
                  <button class="btn btn-mini" type="submit">Save</button>
                </form>
              </td>
            </tr>
          <?php endforeach; ?>
        </tbody>
      </table>
    </div>
  <?php endif; ?>

  <?php if ($totalPages > 1): ?>
    <nav class="pagination">
      <?php for ($p = 1; $p <= $totalPages; $p++): ?>
        <?php
          $query = $baseQuery;
          $query['page'] = $p;
          $url = examportal_url('admin/subscriptions.php?' . http_build_query($query));
        ?>
        <a class="page-link <?= $p === $page ? 'current' : ''; ?>" href="<?= h($url); ?>"><?= $p; ?></a>
      <?php endfor; ?>
    </nav>
  <?php endif; ?>
</section>

<section class="panel">
  <h2 class="section-title">Recent Usage Events</h2>
  <?php if (!$usageEvents): ?>
    <p class="muted">No usage events recorded yet.</p>
  <?php else: ?>
    <div class="question-table-wrap">
      <table class="question-table">
        <thead>
          <tr>
            <th>Time</th>
            <th>User</th>
            <th>Plan</th>
            <th>Event</th>
            <th>Delta</th>
            <th>Note</th>
            <th>Attempt</th>
          </tr>
        </thead>
        <tbody>
          <?php foreach ($usageEvents as $event): ?>
            <tr>
              <td><?= h((string) ($event['created_at'] ?? '—')); ?></td>
              <td>
                <strong><?= h((string) ($event['user_name'] ?? '')); ?></strong><br>
                <span class="muted"><?= h((string) ($event['user_email'] ?? '')); ?></span>
              </td>
              <td><?= h((string) ($event['plan_name'] ?? '')); ?></td>
              <td><span class="pill"><?= h((string) ($event['event_type'] ?? '')); ?></span></td>
              <td><?= (int) ($event['papers_delta'] ?? 0); ?></td>
              <td><?= h((string) ($event['note'] ?? '')); ?></td>
              <td><?= (int) ($event['attempt_id'] ?? 0); ?></td>
            </tr>
          <?php endforeach; ?>
        </tbody>
      </table>
    </div>
  <?php endif; ?>
</section>

<?php ep_render_page_end(); ?>
