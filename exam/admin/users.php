<?php
require_once __DIR__ . '/../includes/functions.php';
require_admin_login();

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

$users = $conn->query("
    SELECT u.*,
           COUNT(ue.id) AS total_attempts,
           SUM(CASE WHEN ue.status = 'completed' THEN 1 ELSE 0 END) AS completed_attempts
    FROM users u
    LEFT JOIN user_exams ue ON ue.user_id = u.id
    GROUP BY u.id
    ORDER BY u.created_at DESC, u.id DESC
")->fetch_all(MYSQLI_ASSOC);

render_header('Manage Users', 'admin');
?>

<section class="table-card">
    <h2>Registered Users</h2>
    <p class="muted">Admin can activate or deactivate users here. Only active users are allowed to log in.</p>
    <div class="table-wrap">
        <table>
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Status</th>
                    <th>Subscription</th>
                    <th>Attempts</th>
                    <th>Joined</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                <?php if (!$users): ?>
                    <tr>
                        <td colspan="7">No registered users yet.</td>
                    </tr>
                <?php else: ?>
                    <?php foreach ($users as $account): ?>
                        <tr>
                            <td><?php echo e($account['name']); ?></td>
                            <td><?php echo e($account['email']); ?></td>
                            <td>
                                <span class="pill <?php echo (int) $account['is_active'] === 1 ? 'pill-success' : 'pill-danger'; ?>">
                                    <?php echo (int) $account['is_active'] === 1 ? 'Active' : 'Inactive'; ?>
                                </span>
                            </td>
                            <td>
                                <span class="pill <?php echo (int) $account['is_subscribed'] === 1 ? 'pill-success' : 'pill-warning'; ?>">
                                    <?php echo (int) $account['is_subscribed'] === 1 ? 'Subscribed' : 'Not Subscribed'; ?>
                                </span>
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
                                    <a
                                        class="btn <?php echo (int) $account['is_subscribed'] === 1 ? 'btn-ghost' : 'btn-accent'; ?>"
                                        href="<?php echo e(base_url('admin/users.php?toggle_subscription=' . (int) $account['id'])); ?>"
                                    >
                                        <?php echo (int) $account['is_subscribed'] === 1 ? 'Remove Subscription' : 'Make Subscribed'; ?>
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

<?php render_footer(); ?>
