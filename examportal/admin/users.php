<?php
declare(strict_types=1);
require_once __DIR__ . '/../config/app.php';

ep_require_admin();

$adminUser = ep_current_user();
if (!$adminUser) {
    ep_redirect('user/login.php');
}

$createForm = [
    'name' => '',
    'email' => '',
    'role' => 'user',
    'password' => '',
    'is_active' => 1,
];

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $csrfToken = $_POST['csrf_token'] ?? null;
    if (!ep_verify_csrf_token(is_string($csrfToken) ? $csrfToken : null)) {
        ep_flash_set('error', 'Session validation failed. Please refresh and try again.');
        ep_redirect('admin/users.php');
    }

    $postAction = (string) ($_POST['post_action'] ?? '');
    $returnTo = trim((string) ($_POST['return_to'] ?? ''));
    if ($returnTo === '') {
        $returnTo = 'admin/users.php';
    }

    if ($postAction === 'create_user') {
        $result = ep_admin_create_user_account([
            'name' => trim((string) ($_POST['name'] ?? '')),
            'email' => trim((string) ($_POST['email'] ?? '')),
            'role' => (string) ($_POST['role'] ?? 'user'),
            'password' => (string) ($_POST['password'] ?? ''),
            'is_active' => isset($_POST['is_active']) ? 1 : 0,
        ]);
        if (!($result['ok'] ?? false)) {
            ep_flash_set('error', (string) ($result['message'] ?? 'Unable to create user.'));
        } else {
            ep_flash_set('success', (string) ($result['message'] ?? 'User account created.'));
        }
        ep_redirect('admin/users.php');
    }

    if ($postAction === 'update_user') {
        $result = ep_admin_update_user_account((int) $adminUser['id'], [
            'user_id' => (int) ($_POST['user_id'] ?? 0),
            'name' => trim((string) ($_POST['name'] ?? '')),
            'role' => (string) ($_POST['role'] ?? 'user'),
            'is_active' => (int) ($_POST['is_active'] ?? 0),
        ]);
        if (!($result['ok'] ?? false)) {
            ep_flash_set('error', (string) ($result['message'] ?? 'Unable to update user.'));
        } else {
            ep_flash_set('success', (string) ($result['message'] ?? 'User account updated.'));
        }
        ep_redirect($returnTo);
    }

    if ($postAction === 'reset_password') {
        $result = ep_admin_reset_user_password(
            (int) $adminUser['id'],
            (int) ($_POST['user_id'] ?? 0),
            (string) ($_POST['new_password'] ?? '')
        );
        if (!($result['ok'] ?? false)) {
            ep_flash_set('error', (string) ($result['message'] ?? 'Unable to reset password.'));
        } else {
            ep_flash_set('success', (string) ($result['message'] ?? 'Password reset.'));
        }
        ep_redirect($returnTo);
    }

    ep_flash_set('error', 'Unknown action.');
    ep_redirect($returnTo);
}

$filters = [
    'search' => trim((string) ($_GET['search'] ?? '')),
    'role' => trim((string) ($_GET['role'] ?? 'all')),
    'status' => trim((string) ($_GET['status'] ?? 'all')),
    'subscription' => trim((string) ($_GET['subscription'] ?? 'all')),
];
if (!in_array($filters['role'], ['all', 'user', 'admin'], true)) {
    $filters['role'] = 'all';
}
if (!in_array($filters['status'], ['all', 'active', 'inactive'], true)) {
    $filters['status'] = 'all';
}
if (!in_array($filters['subscription'], ['all', 'with_active', 'without_active'], true)) {
    $filters['subscription'] = 'all';
}

$page = max(1, (int) ($_GET['page'] ?? 1));
$limit = 20;
$offset = ($page - 1) * $limit;

$stats = ep_admin_user_directory_stats();
$directory = ep_admin_get_user_directory($filters, $limit, $offset);
$rows = $directory['rows'];
$totalRows = (int) ($directory['total'] ?? 0);
$totalPages = max(1, (int) ceil($totalRows / $limit));

$baseQuery = [
    'search' => $filters['search'],
    'role' => $filters['role'],
    'status' => $filters['status'],
    'subscription' => $filters['subscription'],
];
$returnTo = 'admin/users.php';
if ($baseQuery['search'] !== '' || $baseQuery['role'] !== 'all' || $baseQuery['status'] !== 'all' || $baseQuery['subscription'] !== 'all' || $page > 1) {
    $withPage = $baseQuery;
    $withPage['page'] = $page;
    $returnTo .= '?' . http_build_query($withPage);
}

ep_render_page_start([
    'title' => 'Admin Users',
    'active' => 'admin_users',
    'hero_kicker' => 'Module 11',
    'hero_title' => 'User & Access Management',
    'hero_text' => 'Create and manage learner/admin accounts, control account status, and reset credentials with audit-safe safeguards.',
]);
?>

<section class="panel">
  <div class="actions">
    <a class="btn-link btn-outline" href="<?= h(examportal_url('admin/index.php')); ?>">Back to Admin Home</a>
    <a class="btn-link btn-outline" href="<?= h(examportal_url('admin/subscriptions.php')); ?>">Open Subscriptions</a>
    <a class="btn-link btn-outline" href="<?= h(examportal_url('admin/reports.php')); ?>">Open Reports</a>
  </div>
</section>

<section class="stat-grid">
  <article class="stat-card">
    <h3>Total Users</h3>
    <p><strong><?= (int) ($stats['users_total'] ?? 0); ?></strong></p>
    <p class="muted">Active: <?= (int) ($stats['users_active'] ?? 0); ?> • Inactive: <?= (int) ($stats['users_inactive'] ?? 0); ?></p>
  </article>
  <article class="stat-card">
    <h3>Role Split</h3>
    <p><strong>Admins: <?= (int) ($stats['admins_total'] ?? 0); ?></strong></p>
    <p class="muted">Learners: <?= (int) ($stats['learners_total'] ?? 0); ?></p>
  </article>
  <article class="stat-card">
    <h3>Active Subscribers</h3>
    <p><strong><?= (int) ($stats['with_active_subscription'] ?? 0); ?></strong></p>
    <p class="muted">Users with an active paid plan.</p>
  </article>
  <article class="stat-card">
    <h3>Recent Logins</h3>
    <p><strong><?= (int) ($stats['recent_logins_7d'] ?? 0); ?></strong></p>
    <p class="muted">Logged in during last 7 days.</p>
  </article>
</section>

<section class="panel">
  <h2 class="section-title">Create User</h2>
  <form method="post" class="question-form-grid">
    <input type="hidden" name="csrf_token" value="<?= h(ep_csrf_token()); ?>">
    <input type="hidden" name="post_action" value="create_user">

    <label for="name">Name</label>
    <input id="name" name="name" value="<?= h((string) $createForm['name']); ?>" placeholder="Full name" required>

    <label for="email">Email</label>
    <input id="email" name="email" type="email" value="<?= h((string) $createForm['email']); ?>" placeholder="user@example.com" required>

    <label for="role">Role</label>
    <select id="role" name="role">
      <option value="user" <?= $createForm['role'] === 'user' ? 'selected' : ''; ?>>User</option>
      <option value="admin" <?= $createForm['role'] === 'admin' ? 'selected' : ''; ?>>Admin</option>
    </select>

    <label for="password">Initial Password</label>
    <input id="password" name="password" type="password" placeholder="Minimum 8 characters" required>

    <label class="checkbox-row"><input type="checkbox" name="is_active" value="1" <?= (int) $createForm['is_active'] === 1 ? 'checked' : ''; ?>> Active account</label>

    <div class="form-actions">
      <button class="btn" type="submit">Create User</button>
    </div>
  </form>
</section>

<section class="panel">
  <h2 class="section-title">Directory Filters</h2>
  <form method="get" class="filter-grid">
    <input type="text" name="search" value="<?= h($filters['search']); ?>" placeholder="Search name or email">

    <select name="role">
      <option value="all" <?= $filters['role'] === 'all' ? 'selected' : ''; ?>>All roles</option>
      <option value="user" <?= $filters['role'] === 'user' ? 'selected' : ''; ?>>User</option>
      <option value="admin" <?= $filters['role'] === 'admin' ? 'selected' : ''; ?>>Admin</option>
    </select>

    <select name="status">
      <option value="all" <?= $filters['status'] === 'all' ? 'selected' : ''; ?>>All statuses</option>
      <option value="active" <?= $filters['status'] === 'active' ? 'selected' : ''; ?>>Active only</option>
      <option value="inactive" <?= $filters['status'] === 'inactive' ? 'selected' : ''; ?>>Inactive only</option>
    </select>

    <select name="subscription">
      <option value="all" <?= $filters['subscription'] === 'all' ? 'selected' : ''; ?>>All subscription states</option>
      <option value="with_active" <?= $filters['subscription'] === 'with_active' ? 'selected' : ''; ?>>With active subscription</option>
      <option value="without_active" <?= $filters['subscription'] === 'without_active' ? 'selected' : ''; ?>>Without active subscription</option>
    </select>

    <button class="btn" type="submit">Apply</button>
    <a class="btn-link btn-outline" href="<?= h(examportal_url('admin/users.php')); ?>">Reset</a>
  </form>
</section>

<section class="panel">
  <h2 class="section-title">Users Ledger</h2>
  <p class="inline-note">Showing <?= count($rows); ?> of <?= $totalRows; ?> users.</p>

  <div class="question-table-wrap">
    <table class="question-table">
      <thead>
        <tr>
          <th>ID</th>
          <th>User</th>
          <th>Role / Status</th>
          <th>Subscription</th>
          <th>Performance</th>
          <th>Auth</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <?php if (!$rows): ?>
          <tr>
            <td colspan="7">No users found for current filters.</td>
          </tr>
        <?php else: ?>
          <?php foreach ($rows as $row): ?>
            <?php
              $isActive = (int) ($row['is_active'] ?? 0) === 1;
              $role = (string) ($row['role'] ?? 'user');
              $statusClass = 'pill ' . ($isActive ? 'pill-good' : 'pill-bad');
              $activePlanName = trim((string) ($row['active_plan_name'] ?? ''));
              $isSelf = (int) ($row['id'] ?? 0) === (int) ($adminUser['id'] ?? 0);
            ?>
            <tr>
              <td>#<?= (int) ($row['id'] ?? 0); ?></td>
              <td>
                <strong><?= h((string) ($row['name'] ?? '')); ?></strong><?php if ($isSelf): ?> <span class="pill">You</span><?php endif; ?><br>
                <span class="muted"><?= h((string) ($row['email'] ?? '')); ?></span>
              </td>
              <td>
                <span class="pill"><?= h(strtoupper($role)); ?></span>
                <span class="<?= h($statusClass); ?>"><?= $isActive ? 'Active' : 'Inactive'; ?></span>
              </td>
              <td>
                <?php if ($activePlanName !== ''): ?>
                  <strong><?= h($activePlanName); ?></strong><br>
                  <span class="muted">Expires: <?= h((string) ($row['active_expires_at'] ?? '—')); ?></span><br>
                  <span class="muted">Remaining papers: <?= (int) ($row['remaining_papers'] ?? 0); ?></span>
                <?php else: ?>
                  <span class="muted">No active subscription</span>
                <?php endif; ?>
              </td>
              <td>
                Attempts: <?= (int) ($row['attempts_total'] ?? 0); ?><br>
                Results: <?= (int) ($row['results_total'] ?? 0); ?><br>
                <span class="muted">Best: <?= h(number_format((float) ($row['best_percentage'] ?? 0), 2)); ?>%</span>
              </td>
              <td>
                <span class="muted">Created: <?= h((string) ($row['created_at'] ?? '—')); ?></span><br>
                <span class="muted">Last login: <?= h((string) ($row['last_login_at'] ?? 'Never')); ?></span>
              </td>
              <td>
                <form method="post" class="inline-form-compact">
                  <input type="hidden" name="csrf_token" value="<?= h(ep_csrf_token()); ?>">
                  <input type="hidden" name="post_action" value="update_user">
                  <input type="hidden" name="user_id" value="<?= (int) ($row['id'] ?? 0); ?>">
                  <input type="hidden" name="return_to" value="<?= h($returnTo); ?>">
                  <input type="text" name="name" value="<?= h((string) ($row['name'] ?? '')); ?>" style="min-width:130px;">
                  <select name="role">
                    <option value="user" <?= $role === 'user' ? 'selected' : ''; ?>>User</option>
                    <option value="admin" <?= $role === 'admin' ? 'selected' : ''; ?>>Admin</option>
                  </select>
                  <select name="is_active">
                    <option value="1" <?= $isActive ? 'selected' : ''; ?>>Active</option>
                    <option value="0" <?= !$isActive ? 'selected' : ''; ?>>Inactive</option>
                  </select>
                  <button class="btn btn-mini" type="submit">Save</button>
                </form>
                <form method="post" class="inline-form-compact" style="margin-top:6px;">
                  <input type="hidden" name="csrf_token" value="<?= h(ep_csrf_token()); ?>">
                  <input type="hidden" name="post_action" value="reset_password">
                  <input type="hidden" name="user_id" value="<?= (int) ($row['id'] ?? 0); ?>">
                  <input type="hidden" name="return_to" value="<?= h($returnTo); ?>">
                  <input type="password" name="new_password" placeholder="New password" minlength="8" required style="min-width:130px;">
                  <button class="btn btn-mini" type="submit">Reset Password</button>
                </form>
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
          $query = $baseQuery;
          $query['page'] = $p;
          $url = examportal_url('admin/users.php?' . http_build_query($query));
        ?>
        <a class="<?= $p === $page ? 'page-link current' : 'page-link'; ?>" href="<?= h($url); ?>"><?= $p; ?></a>
      <?php endfor; ?>
    </div>
  <?php endif; ?>
</section>

<?php ep_render_page_end(); ?>
