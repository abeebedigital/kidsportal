<?php
require_once __DIR__ . '/../includes/functions.php';
require_login();

$user = current_user();
$activeCategoryIds = get_user_active_category_ids((int) $user['id']);
if (((int) $user['is_subscribed'] === 1) !== (count($activeCategoryIds) > 0)) {
    sync_user_subscription_flag((int) $user['id']);
}
$examSets = get_available_exam_sets_for_user((int) $user['id']);
$categories = array_values(array_filter(get_categories_with_exam_set_counts(true), static function ($category) {
    return (int) $category['exam_set_count'] > 0;
}));
$activeCategoryLookup = array_fill_keys($activeCategoryIds, true);
usort($categories, static function ($left, $right) use ($activeCategoryLookup) {
    $leftSubscribed = !empty($activeCategoryLookup[(int) $left['id']]) ? 1 : 0;
    $rightSubscribed = !empty($activeCategoryLookup[(int) $right['id']]) ? 1 : 0;

    if ($leftSubscribed !== $rightSubscribed) {
        return $rightSubscribed <=> $leftSubscribed;
    }

    return strcasecmp((string) $left['name'], (string) $right['name']);
});
$activeSubscriptions = get_user_active_subscriptions((int) $user['id']);

$statsStmt = $conn->prepare("
    SELECT
        COUNT(*) AS total_attempts,
        SUM(CASE WHEN status = 'completed' THEN 1 ELSE 0 END) AS completed_attempts,
        COALESCE(MAX(score), 0) AS best_score
    FROM user_exams
    WHERE user_id = ?
");
$statsStmt->bind_param('i', $user['id']);
$statsStmt->execute();
$stats = $statsStmt->get_result()->fetch_assoc();
$statsStmt->close();

render_header('Dashboard', 'user');
?>

<section class="metrics-grid">
    <article class="metric">
        <strong><?php echo count($categories); ?></strong>
        <span>Available categories</span>
    </article>
    <article class="metric">
        <strong><?php echo count($examSets); ?></strong>
        <span>Unlocked exam sets</span>
    </article>
    <article class="metric">
        <strong><?php echo (int) ($stats['total_attempts'] ?? 0); ?></strong>
        <span>Total attempts</span>
    </article>
</section>

<?php if (!$activeSubscriptions): ?>
    <section class="table-card">
        <div class="section-heading-row">
            <div>
                <h2>Choose a Subscription</h2>
                <p class="muted">Select a category plan to unlock its exam sets here.</p>
            </div>
            <a class="btn btn-primary" href="<?php echo e(base_url('user/subscribe.php')); ?>">Choose Plan</a>
        </div>
    </section>
<?php else: ?>
    <section class="table-card">
        <div class="section-heading-row">
            <div>
                <h2>My Category Subscriptions</h2>
                <div class="status-row">
                    <?php foreach ($activeSubscriptions as $subscription): ?>
                        <span class="pill pill-success">
                            <?php echo e($subscription['category_name']); ?> - <?php echo e($subscription['plan_name']); ?> until <?php echo e($subscription['expires_at']); ?>
                        </span>
                    <?php endforeach; ?>
                </div>
            </div>
            <a class="btn btn-ghost" href="<?php echo e(base_url('user/subscribe.php')); ?>">Add / Renew</a>
        </div>
    </section>
<?php endif; ?>

<section class="exam-grid-section">
    <div class="section-heading-row">
        <div>
            <h2>Available Exams</h2>
            <p class="muted">Browse every active category. Your subscribed categories are highlighted and ready to start.</p>
        </div>
        <span class="section-count"><?php echo count($categories); ?> categories</span>
    </div>
    <?php if (!$categories): ?>
        <div class="exam-card-empty">No active exam categories are available yet.</div>
    <?php else: ?>
        <div class="category-card-grid">
            <?php foreach ($categories as $category): ?>
                <?php
                $categoryId = (int) $category['id'];
                $isSubscribedCategory = !empty($activeCategoryLookup[$categoryId]);
                ?>
                <article class="category-exam-card <?php echo $isSubscribedCategory ? 'is-subscribed' : ''; ?>">
                    <div class="exam-card-header">
                        <div>
                            <h3><?php echo e($category['name']); ?></h3>
                            <span class="exam-card-kicker">Category #<?php echo $categoryId; ?></span>
                        </div>
                        <span class="pill <?php echo $isSubscribedCategory ? 'pill-success' : 'pill-warning'; ?>">
                            <?php echo $isSubscribedCategory ? 'Subscribed' : 'Subscribe'; ?>
                        </span>
                    </div>

                    <div class="exam-card-attempt">
                        <span class="muted">Available exam sets</span>
                        <strong><?php echo (int) $category['exam_set_count']; ?></strong>
                    </div>

                    <?php if (!empty($category['description'])): ?>
                        <p class="category-card-description"><?php echo e($category['description']); ?></p>
                    <?php else: ?>
                        <p class="category-card-description">Open this category to view the exam sets prepared for it.</p>
                    <?php endif; ?>

                    <div class="actions exam-card-actions">
                        <a class="btn <?php echo $isSubscribedCategory ? 'btn-primary' : 'btn-ghost'; ?>" href="<?php echo e(base_url('user/category_exams.php?category_id=' . $categoryId)); ?>">
                            View Exams
                        </a>
                    </div>
                </article>
            <?php endforeach; ?>
        </div>
    <?php endif; ?>
</section>

<?php render_footer(); ?>
