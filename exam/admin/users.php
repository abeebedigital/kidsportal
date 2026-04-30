<?php
require_once __DIR__ . '/../includes/functions.php';
require_admin_login();

if ($_SERVER['REQUEST_METHOD'] === 'POST' && ($_POST['action'] ?? '') === 'assign_subscription') {
    $userId = (int) ($_POST['user_id'] ?? 0);
    $planId = (int) ($_POST['plan_id'] ?? 0);

    $planStmt = $conn->prepare('
        SELECT p.*, c.name AS category_name
        FROM subscription_plans p
        INNER JOIN exam_categories c ON c.id = p.category_id
        WHERE p.id = ? AND p.is_active = 1 AND c.is_active = 1
        LIMIT 1
    ');
    $planStmt->bind_param('i', $planId);
    $planStmt->execute();
    $plan = $planStmt->get_result()->fetch_assoc();
    $planStmt->close();

    if ($userId <= 0 || !$plan) {
        set_flash('error', 'Choose a valid active plan.');
        redirect_to('admin/users.php');
    }

    $categoryId = (int) $plan['category_id'];
    $cancelOld = $conn->prepare("UPDATE user_category_subscriptions SET status = 'cancelled' WHERE user_id = ? AND category_id = ? AND status = 'active'");
    $cancelOld->bind_param('ii', $userId, $categoryId);
    $cancelOld->execute();
    $cancelOld->close();

    $status = 'active';
    $amount = (float) $plan['amount'];
    $durationDays = (int) $plan['duration_days'];
    $insert = $conn->prepare('
        INSERT INTO user_category_subscriptions (user_id, plan_id, category_id, amount, status, starts_at, expires_at)
        VALUES (?, ?, ?, ?, ?, NOW(), DATE_ADD(NOW(), INTERVAL ? DAY))
    ');
    $insert->bind_param('iiidsi', $userId, $planId, $categoryId, $amount, $status, $durationDays);
    $insert->execute();
    $insert->close();

    sync_user_subscription_flag($userId);
    set_flash('success', 'Category subscription assigned.');
    redirect_to('admin/users.php');
}

if (isset($_GET['toggle_active'])) {
    $userId = (int) $_GET['toggle_active'];
    $stmt = $conn->prepare('UPDATE users SET is_active = CASE WHEN is_active = 1 THEN 0 ELSE 1 END WHERE id = ?');
    $stmt->bind_param('i', $userId);
    $stmt->execute();
    $stmt->close();
    set_flash('success', 'User active status updated.');
    redirect_to('admin/users.php');
}

if (isset($_GET['toggle_subscription'])) {
    $userId = (int) $_GET['toggle_subscription'];
    $stmt = $conn->prepare('UPDATE users SET is_subscribed = CASE WHEN is_subscribed = 1 THEN 0 ELSE 1 END WHERE id = ?');
    $stmt->bind_param('i', $userId);
    $stmt->execute();
    $stmt->close();
    set_flash('success', 'User subscription status updated.');
    redirect_to('admin/users.php');
}

if (isset($_GET['cancel_subscription'])) {
    $subscriptionId = (int) $_GET['cancel_subscription'];
    $stmt = $conn->prepare('SELECT user_id FROM user_category_subscriptions WHERE id = ? LIMIT 1');
    $stmt->bind_param('i', $subscriptionId);
    $stmt->execute();
    $subscription = $stmt->get_result()->fetch_assoc();
    $stmt->close();

    if ($subscription) {
        $userId = (int) $subscription['user_id'];
        $cancel = $conn->prepare("UPDATE user_category_subscriptions SET status = 'cancelled' WHERE id = ?");
        $cancel->bind_param('i', $subscriptionId);
        $cancel->execute();
        $cancel->close();
        sync_user_subscription_flag($userId);
    }

    set_flash('success', 'Subscription cancelled.');
    redirect_to('admin/users.php');
}

$plans = get_subscription_plans(true);

$users = $conn->query("
    SELECT u.*,
           COUNT(ue.id) AS total_attempts,
           SUM(CASE WHEN ue.status = 'completed' THEN 1 ELSE 0 END) AS completed_attempts
    FROM users u
    LEFT JOIN user_exams ue ON ue.user_id = u.id
    GROUP BY u.id
    ORDER BY u.created_at DESC, u.id DESC
")->fetch_all(MYSQLI_ASSOC);

$subscriptionRows = $conn->query("
    SELECT s.*, p.name AS plan_name, c.name AS category_name
    FROM user_category_subscriptions s
    INNER JOIN subscription_plans p ON p.id = s.plan_id
    INNER JOIN exam_categories c ON c.id = s.category_id
    WHERE s.status = 'active' AND s.expires_at > NOW()
    ORDER BY c.name ASC, s.expires_at DESC
")->fetch_all(MYSQLI_ASSOC);

$subscriptionsByUser = [];
foreach ($subscriptionRows as $subscriptionRow) {
    $subscriptionsByUser[(int) $subscriptionRow['user_id']][] = $subscriptionRow;
}

render_header('Manage Users', 'admin');
?>

<section class="table-card">
    <h2>Registered Users</h2>
    <p class="muted">Admin can activate users and assign category-specific subscriptions here. Users only see exams from subscribed categories.</p>
    <div class="table-wrap">
        <table class="admin-users-table">
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Status</th>
                    <th>Subscription</th>
                    <th>Assign Plan</th>
                    <th>Attempts</th>
                    <th>Joined</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                <?php if (!$users): ?>
                    <tr>
                        <td colspan="8">No registered users yet.</td>
                    </tr>
                <?php else: ?>
                    <?php foreach ($users as $account): ?>
                        <?php
                        $accountSubscriptions = $subscriptionsByUser[(int) $account['id']] ?? [];
                        $subscriptionCount = count($accountSubscriptions);
                        $firstSubscription = $accountSubscriptions[0] ?? null;
                        ?>
                        <tr>
                            <td>
                                <strong class="user-name"><?php echo e($account['name']); ?></strong>
                                <span class="user-id">#<?php echo (int) $account['id']; ?></span>
                            </td>
                            <td><span class="user-email"><?php echo e($account['email']); ?></span></td>
                            <td>
                                <span class="pill <?php echo (int) $account['is_active'] === 1 ? 'pill-success' : 'pill-danger'; ?>">
                                    <?php echo (int) $account['is_active'] === 1 ? 'Active' : 'Inactive'; ?>
                                </span>
                            </td>
                            <td>
                                <div class="subscription-cell">
                                    <span class="pill <?php echo (int) $account['is_subscribed'] === 1 ? 'pill-success' : 'pill-warning'; ?>">
                                        <?php echo (int) $account['is_subscribed'] === 1 ? 'Subscribed' : 'Not Subscribed'; ?>
                                    </span>
                                    <?php if ($subscriptionCount > 0): ?>
                                        <button
                                            class="icon-detail-btn"
                                            type="button"
                                            data-modal-target="subscriptions-<?php echo (int) $account['id']; ?>"
                                            aria-label="View subscription details for <?php echo e($account['name']); ?>"
                                            title="View subscription details"
                                        >
                                            ^
                                        </button>
                                    <?php endif; ?>
                                </div>
                            </td>
                            <td>
                                <form method="post" class="compact-form">
                                    <input type="hidden" name="action" value="assign_subscription">
                                    <input type="hidden" name="user_id" value="<?php echo (int) $account['id']; ?>">
                                    <select name="plan_id" required>
                                        <option value="">Choose plan</option>
                                        <?php foreach ($plans as $plan): ?>
                                            <option value="<?php echo (int) $plan['id']; ?>">
                                                <?php echo e($plan['category_name'] . ' - ' . $plan['name'] . ' (' . number_format((float) $plan['amount'], 2) . ')'); ?>
                                            </option>
                                        <?php endforeach; ?>
                                    </select>
                                    <button class="btn btn-primary" type="submit">Assign</button>
                                </form>
                            </td>
                            <td>
                                <div><?php echo (int) $account['total_attempts']; ?> total</div>
                                <div class="muted"><?php echo (int) $account['completed_attempts']; ?> completed</div>
                            </td>
                            <td><?php echo e($account['created_at']); ?></td>
                            <td>
                                <div class="actions">
                                    <a
                                        class="btn <?php echo (int) $account['is_active'] === 1 ? 'btn-danger' : 'btn-primary'; ?>"
                                        href="<?php echo e(base_url('admin/users.php?toggle_active=' . (int) $account['id'])); ?>"
                                    >
                                        <?php echo (int) $account['is_active'] === 1 ? 'Deactivate' : 'Activate'; ?>
                                    </a>
                                </div>
                            </td>
                        </tr>
                    <?php endforeach; ?>
                <?php endif; ?>
            </tbody>
        </table>
    </div>
</section>

<?php foreach ($users as $account): ?>
    <?php $accountSubscriptions = $subscriptionsByUser[(int) $account['id']] ?? []; ?>
    <?php if (!$accountSubscriptions) {
        continue;
    } ?>
    <div class="modal-backdrop" id="subscriptions-<?php echo (int) $account['id']; ?>" hidden>
        <section class="modal-panel" role="dialog" aria-modal="true" aria-labelledby="subscriptions-title-<?php echo (int) $account['id']; ?>">
            <div class="modal-header">
                <div>
                    <h2 id="subscriptions-title-<?php echo (int) $account['id']; ?>">Subscription Details</h2>
                    <p class="muted"><?php echo e($account['name']); ?> - <?php echo e($account['email']); ?></p>
                </div>
                <button class="modal-close" type="button" data-modal-close aria-label="Close">x</button>
            </div>
            <div class="modal-list">
                <?php foreach ($accountSubscriptions as $subscription): ?>
                    <article class="subscription-detail-row">
                        <div>
                            <strong><?php echo e($subscription['category_name']); ?></strong>
                            <span><?php echo e($subscription['plan_name']); ?></span>
                        </div>
                        <div>
                            <span class="muted">Amount</span>
                            <strong><?php echo number_format((float) $subscription['amount'], 2); ?></strong>
                        </div>
                        <div>
                            <span class="muted">Started</span>
                            <strong><?php echo e($subscription['starts_at']); ?></strong>
                        </div>
                        <div>
                            <span class="muted">Expires</span>
                            <strong><?php echo e($subscription['expires_at']); ?></strong>
                        </div>
                        <a class="btn btn-danger btn-mini" href="<?php echo e(base_url('admin/users.php?cancel_subscription=' . (int) $subscription['id'])); ?>" onclick="return confirm('Cancel this subscription?');">
                            Cancel
                        </a>
                    </article>
                <?php endforeach; ?>
            </div>
        </section>
    </div>
<?php endforeach; ?>

<?php render_footer(); ?>
