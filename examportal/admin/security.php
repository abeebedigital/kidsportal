<?php
declare(strict_types=1);
require_once __DIR__ . '/../config/app.php';

ep_require_admin();

$adminUser = ep_current_user();
if (!$adminUser) {
    ep_redirect('user/login.php');
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $csrfToken = $_POST['csrf_token'] ?? null;
    if (!ep_verify_csrf_token(is_string($csrfToken) ? $csrfToken : null)) {
        ep_flash_set('error', 'Session validation failed. Please refresh and try again.');
        ep_redirect('admin/security.php');
    }

    $postAction = (string) ($_POST['post_action'] ?? '');
    $returnTo = trim((string) ($_POST['return_to'] ?? ''));
    if ($returnTo === '') {
        $returnTo = 'admin/security.php';
    }

    if ($postAction === 'revoke_session') {
        $result = ep_admin_revoke_auth_session((int) $adminUser['id'], (int) ($_POST['session_id'] ?? 0));
        if (!($result['ok'] ?? false)) {
            ep_flash_set('error', (string) ($result['message'] ?? 'Unable to revoke session.'));
        } else {
            ep_flash_set('success', (string) ($result['message'] ?? 'Session revoked.'));
        }
        ep_redirect($returnTo);
    }

    if ($postAction === 'revoke_user_sessions') {
        $result = ep_admin_revoke_user_sessions((int) $adminUser['id'], (int) ($_POST['user_id'] ?? 0));
        if (!($result['ok'] ?? false)) {
            ep_flash_set('error', (string) ($result['message'] ?? 'Unable to revoke user sessions.'));
        } else {
            ep_flash_set('success', (string) ($result['message'] ?? 'User sessions revoked.'));
        }
        ep_redirect($returnTo);
    }

    if ($postAction === 'cleanup_revoked') {
        $result = ep_admin_cleanup_revoked_sessions((int) ($_POST['older_than_days'] ?? 30));
        if (!($result['ok'] ?? false)) {
            ep_flash_set('error', (string) ($result['message'] ?? 'Unable to cleanup revoked sessions.'));
        } else {
            ep_flash_set('success', (string) ($result['message'] ?? 'Cleanup completed.'));
        }
        ep_redirect($returnTo);
    }

    ep_flash_set('error', 'Unknown action.');
    ep_redirect($returnTo);
}

$filters = [
    'search' => trim((string) ($_GET['search'] ?? '')),
    'role' => trim((string) ($_GET['role'] ?? 'all')),
    'state' => trim((string) ($_GET['state'] ?? 'all')),
];
if (!in_array($filters['role'], ['all', 'user', 'admin'], true)) {
    $filters['role'] = 'all';
}
if (!in_array($filters['state'], ['all', 'active', 'revoked', 'stale'], true)) {
    $filters['state'] = 'all';
}

$page = max(1, (int) ($_GET['page'] ?? 1));
$limit = 20;
$offset = ($page - 1) * $limit;

$stats = ep_admin_security_overview_stats();
$sessionsResult = ep_admin_get_auth_sessions($filters, $limit, $offset);
$sessions = $sessionsResult['rows'];
$totalSessions = (int) ($sessionsResult['total'] ?? 0);
$riskUsers = ep_admin_security_multi_session_users(3, 10);
$totalPages = max(1, (int) ceil($totalSessions / $limit));

$baseQuery = [
    'search' => $filters['search'],
    'role' => $filters['role'],
    'state' => $filters['state'],
];
$returnTo = 'admin/security.php';
if ($baseQuery['search'] !== '' || $baseQuery['role'] !== 'all' || $baseQuery['state'] !== 'all' || $page > 1) {
    $withPage = $baseQuery;
    $withPage['page'] = $page;
    $returnTo .= '?' . http_build_query($withPage);
}

$currentSessionHash = hash('sha256', session_id());

ep_render_page_start([
    'title' => 'Admin Security',
    'active' => 'admin_security',
    'hero_kicker' => 'Module 12',
    'hero_title' => 'Security & Session Audit',
    'hero_text' => 'Monitor authentication sessions, revoke compromised access quickly, and review risky multi-session behavior.',
]);
?>

<section class="panel">
  <div class="actions">
    <a class="btn-link btn-outline" href="<?= h(examportal_url('admin/index.php')); ?>">Back to Admin Home</a>
    <a class="btn-link btn-outline" href="<?= h(examportal_url('admin/users.php')); ?>">Open Users</a>
    <a class="btn-link btn-outline" href="<?= h(examportal_url('admin/reports.php')); ?>">Open Reports</a>
  </div>
</section>

<section class="stat-grid">
  <article class="stat-card">
    <h3>Total Sessions</h3>
    <p><strong><?= (int) ($stats['sessions_total'] ?? 0); ?></strong></p>
    <p class="muted">Active: <?= (int) ($stats['sessions_active'] ?? 0); ?></p>
  </article>
  <article class="stat-card">
    <h3>Active (24h)</h3>
    <p><strong><?= (int) ($stats['sessions_active_24h'] ?? 0); ?></strong></p>
    <p class="muted">Users with active sessions: <?= (int) ($stats['users_with_active_sessions'] ?? 0); ?></p>
  </article>
  <article class="stat-card">
    <h3>Revoked Sessions</h3>
    <p><strong><?= (int) ($stats['sessions_revoked'] ?? 0); ?></strong></p>
    <p class="muted">Historical revocations retained for audit.</p>
  </article>
  <article class="stat-card">
    <h3>Users Logged In (24h)</h3>
    <p><strong><?= (int) ($stats['users_logged_in_24h'] ?? 0); ?></strong></p>
    <p class="muted">Based on `last_login_at`.</p>
  </article>
</section>

<section class="panel">
  <h2 class="section-title">Security Filters</h2>
  <form method="get" class="filter-grid">
    <input type="text" name="search" value="<?= h($filters['search']); ?>" placeholder="Search user/email/IP/agent">

    <select name="role">
      <option value="all" <?= $filters['role'] === 'all' ? 'selected' : ''; ?>>All roles</option>
      <option value="user" <?= $filters['role'] === 'user' ? 'selected' : ''; ?>>User only</option>
      <option value="admin" <?= $filters['role'] === 'admin' ? 'selected' : ''; ?>>Admin only</option>
    </select>

    <select name="state">
      <option value="all" <?= $filters['state'] === 'all' ? 'selected' : ''; ?>>All session states</option>
      <option value="active" <?= $filters['state'] === 'active' ? 'selected' : ''; ?>>Active only</option>
      <option value="revoked" <?= $filters['state'] === 'revoked' ? 'selected' : ''; ?>>Revoked only</option>
      <option value="stale" <?= $filters['state'] === 'stale' ? 'selected' : ''; ?>>Stale active (&gt;30 days)</option>
    </select>

    <button class="btn" type="submit">Apply</button>
    <a class="btn-link btn-outline" href="<?= h(examportal_url('admin/security.php')); ?>">Reset</a>
  </form>
  <form method="post" class="inline-form-compact" style="margin-top:10px;">
    <input type="hidden" name="csrf_token" value="<?= h(ep_csrf_token()); ?>">
    <input type="hidden" name="post_action" value="cleanup_revoked">
    <input type="hidden" name="return_to" value="<?= h($returnTo); ?>">
    <input type="number" name="older_than_days" min="1" max="3650" value="30" style="max-width:120px;">
    <button class="btn btn-mini" type="submit">Cleanup Revoked Sessions</button>
  </form>
</section>

<section class="panel">
  <h2 class="section-title">Risk Signals: Multiple Active Sessions</h2>
  <?php if (!$riskUsers): ?>
    <p class="muted">No users currently have 3 or more active sessions.</p>
  <?php else: ?>
    <div class="question-table-wrap">
      <table class="question-table">
        <thead>
          <tr>
            <th>User</th>
            <th>Role</th>
            <th>Active Sessions</th>
            <th>Last Seen</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          <?php foreach ($riskUsers as $risk): ?>
            <tr>
              <td>
                <strong><?= h((string) ($risk['name'] ?? '')); ?></strong><br>
                <span class="muted"><?= h((string) ($risk['email'] ?? '')); ?></span>
              </td>
              <td><span class="pill"><?= h(strtoupper((string) ($risk['role'] ?? 'user'))); ?></span></td>
              <td><?= (int) ($risk['active_sessions'] ?? 0); ?></td>
              <td><?= h((string) ($risk['last_seen_at'] ?? '—')); ?></td>
              <td>
                <form method="post" class="inline-form-compact">
                  <input type="hidden" name="csrf_token" value="<?= h(ep_csrf_token()); ?>">
                  <input type="hidden" name="post_action" value="revoke_user_sessions">
                  <input type="hidden" name="user_id" value="<?= (int) ($risk['id'] ?? 0); ?>">
                  <input type="hidden" name="return_to" value="<?= h($returnTo); ?>">
                  <button class="btn btn-mini" type="submit">Revoke User Sessions</button>
                </form>
              </td>
            </tr>
          <?php endforeach; ?>
        </tbody>
      </table>
    </div>
  <?php endif; ?>
</section>

<section class="panel">
  <h2 class="section-title">Session Ledger</h2>
  <p class="inline-note">Showing <?= count($sessions); ?> of <?= $totalSessions; ?> sessions.</p>
  <div class="question-table-wrap">
    <table class="question-table">
      <thead>
        <tr>
          <th>ID</th>
          <th>User</th>
          <th>State</th>
          <th>Network</th>
          <th>User Agent</th>
          <th>Timeline</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        <?php if (!$sessions): ?>
          <tr>
            <td colspan="7">No sessions found for current filters.</td>
          </tr>
        <?php else: ?>
          <?php foreach ($sessions as $session): ?>
            <?php
              $revokedAt = (string) ($session['revoked_at'] ?? '');
              $isRevoked = $revokedAt !== '' && $revokedAt !== '0000-00-00 00:00:00';
              $isCurrent = (string) ($session['session_token'] ?? '') === $currentSessionHash;
              $stateClass = $isRevoked ? 'pill pill-bad' : 'pill pill-good';
              $stateLabel = $isRevoked ? 'Revoked' : 'Active';
            ?>
            <tr>
              <td>#<?= (int) ($session['id'] ?? 0); ?></td>
              <td>
                <strong><?= h((string) ($session['user_name'] ?? '')); ?></strong><?php if ($isCurrent): ?> <span class="pill">Current</span><?php endif; ?><br>
                <span class="muted"><?= h((string) ($session['user_email'] ?? '')); ?></span><br>
                <span class="pill"><?= h(strtoupper((string) ($session['user_role'] ?? 'user'))); ?></span>
              </td>
              <td><span class="<?= h($stateClass); ?>"><?= h($stateLabel); ?></span></td>
              <td>
                <span class="muted"><?= h((string) ($session['ip_address'] ?? 'N/A')); ?></span>
              </td>
              <td>
                <span class="muted"><?= h((string) ($session['user_agent'] ?? 'N/A')); ?></span>
              </td>
              <td>
                <span class="muted">Seen: <?= h((string) ($session['last_seen_at'] ?? '—')); ?></span><br>
                <span class="muted">Created: <?= h((string) ($session['created_at'] ?? '—')); ?></span><br>
                <span class="muted">Revoked: <?= $isRevoked ? h($revokedAt) : 'No'; ?></span>
              </td>
              <td>
                <?php if ($isRevoked): ?>
                  <span class="pill pill-bad">Already revoked</span>
                <?php elseif ($isCurrent): ?>
                  <span class="pill">Current session</span>
                <?php else: ?>
                  <form method="post" class="inline-form-compact">
                    <input type="hidden" name="csrf_token" value="<?= h(ep_csrf_token()); ?>">
                    <input type="hidden" name="post_action" value="revoke_session">
                    <input type="hidden" name="session_id" value="<?= (int) ($session['id'] ?? 0); ?>">
                    <input type="hidden" name="return_to" value="<?= h($returnTo); ?>">
                    <button class="btn btn-mini" type="submit">Revoke Session</button>
                  </form>
                <?php endif; ?>
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
          $url = examportal_url('admin/security.php?' . http_build_query($query));
        ?>
        <a class="<?= $p === $page ? 'page-link current' : 'page-link'; ?>" href="<?= h($url); ?>"><?= $p; ?></a>
      <?php endfor; ?>
    </div>
  <?php endif; ?>
</section>

<?php ep_render_page_end(); ?>
