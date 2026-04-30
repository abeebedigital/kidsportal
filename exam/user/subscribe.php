<?php
require_once __DIR__ . '/../includes/functions.php';
require_login();

$user = current_user();

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
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

    if (!$plan) {
        set_flash('error', 'Please choose a valid active subscription plan.');
        redirect_to('user/subscribe.php');
    }

    $categoryId = (int) $plan['category_id'];
    $cancelOld = $conn->prepare("UPDATE user_category_subscriptions SET status = 'cancelled' WHERE user_id = ? AND category_id = ? AND status = 'active'");
    $cancelOld->bind_param('ii', $user['id'], $categoryId);
    $cancelOld->execute();
    $cancelOld->close();

    $status = 'active';
    $amount = (float) $plan['amount'];
    $durationDays = (int) $plan['duration_days'];
    $insert = $conn->prepare('
        INSERT INTO user_category_subscriptions (user_id, plan_id, category_id, amount, status, starts_at, expires_at)
        VALUES (?, ?, ?, ?, ?, NOW(), DATE_ADD(NOW(), INTERVAL ? DAY))
    ');
    $insert->bind_param('iiidsi', $user['id'], $planId, $categoryId, $amount, $status, $durationDays);
    $insert->execute();
    $insert->close();

    sync_user_subscription_flag((int) $user['id']);
    set_flash('success', $plan['category_name'] . ' subscription activated. Matching exam sets are now available.');
    redirect_to('user/dashboard.php');
}

$plans = get_subscription_plans(true);
$activeCategoryIds = get_user_active_category_ids((int) $user['id']);
$activeCategoryLookup = array_fill_keys($activeCategoryIds, true);

$plansByCategory = [];
foreach ($plans as $plan) {
    $plansByCategory[(int) $plan['category_id']]['category_name'] = $plan['category_name'];
    $plansByCategory[(int) $plan['category_id']]['plans'][] = $plan;
}

render_header('Choose Subscription', 'user');
?>

<section class="table-card">
    <div class="section-heading-row">
        <div>
            <h2>Choose Your Exam Category</h2>
            <p class="muted">Pick a plan to unlock only the exam sets and questions from that category.</p>
        </div>
        <a class="btn btn-ghost" href="<?php echo e(base_url('user/dashboard.php')); ?>">Back to Dashboard</a>
    </div>
</section>

<?php if (!$plansByCategory): ?>
    <div class="exam-card-empty">No active subscription plans are available yet.</div>
<?php else: ?>
    <section class="subscription-plan-grid">
        <?php foreach ($plansByCategory as $categoryId => $categoryGroup): ?>
            <?php foreach ($categoryGroup['plans'] as $plan): ?>
                <form method="post" class="plan-card">
                    <input type="hidden" name="plan_id" value="<?php echo (int) $plan['id']; ?>">
                    <div class="plan-card-top">
                        <span class="pill <?php echo !empty($activeCategoryLookup[$categoryId]) ? 'pill-success' : 'pill-info'; ?>">
                            <?php echo e($categoryGroup['category_name']); ?>
                        </span>
                        <span class="exam-card-kicker"><?php echo (int) $plan['duration_days']; ?> days</span>
                    </div>
                    <h3><?php echo e($plan['name']); ?></h3>
                    <strong class="plan-price"><?php echo number_format((float) $plan['amount'], 2); ?></strong>
                    <?php if (trim((string) $plan['description']) !== ''): ?>
                        <p class="muted"><?php echo e($plan['description']); ?></p>
                    <?php endif; ?>
                    <button class="btn <?php echo !empty($activeCategoryLookup[$categoryId]) ? 'btn-secondary' : 'btn-primary'; ?>" type="submit">
                        <?php echo !empty($activeCategoryLookup[$categoryId]) ? 'Renew / Change Plan' : 'Choose Plan'; ?>
                    </button>
                </form>
            <?php endforeach; ?>
        <?php endforeach; ?>
    </section>
<?php endif; ?>

<?php render_footer(); ?>
