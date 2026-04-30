<?php
require_once __DIR__ . '/../includes/functions.php';
require_login();

$user = current_user();
$categoryId = (int) ($_GET['category_id'] ?? 0);

if ($categoryId <= 0) {
    set_flash('error', 'Invalid category selected.');
    redirect_to('user/dashboard.php');
}

$category = get_category_by_id($categoryId, true);
if (!$category) {
    set_flash('error', 'Category not found or inactive.');
    redirect_to('user/dashboard.php');
}

$hasSubscription = user_has_category_subscription((int) $user['id'], $categoryId);
$examSets = get_exam_sets_by_category($categoryId);
$examMap = latest_user_exam_map((int) $user['id']);

render_header($category['name'] . ' Exams', 'user');
?>

<section class="table-card">
    <div class="section-heading-row">
        <div>
            <h2><?php echo e($category['name']); ?></h2>
            <?php if (!empty($category['description'])): ?>
                <p class="muted"><?php echo e($category['description']); ?></p>
            <?php else: ?>
                <p class="muted">Exam sets available inside this category.</p>
            <?php endif; ?>
        </div>
        <span class="pill <?php echo $hasSubscription ? 'pill-success' : 'pill-warning'; ?>">
            <?php echo $hasSubscription ? 'Subscribed' : 'Subscription needed'; ?>
        </span>
    </div>
    <div class="actions">
        <a class="btn btn-ghost" href="<?php echo e(base_url('user/dashboard.php')); ?>">Back to Dashboard</a>
        <?php if (!$hasSubscription): ?>
            <a class="btn btn-primary" href="<?php echo e(base_url('user/subscribe.php')); ?>">Choose Plan</a>
        <?php endif; ?>
    </div>
</section>

<section class="exam-grid-section">
    <div class="section-heading-row">
        <div>
            <h2>Exam Sets</h2>
            <p class="muted"><?php echo $hasSubscription ? 'Start, resume, or review exams from this category.' : 'You can preview the list, then subscribe to unlock exam attempts.'; ?></p>
        </div>
        <span class="section-count"><?php echo count($examSets); ?> available</span>
    </div>

    <?php if (!$examSets): ?>
        <div class="exam-card-empty">No exam sets are available in this category yet.</div>
    <?php else: ?>
        <div class="exam-card-grid">
            <?php foreach ($examSets as $examSet): ?>
                <?php
                $distribution = json_decode($examSet['topic_distribution'], true) ?: [];
                $questionTotal = array_sum(array_map('intval', $distribution));
                $attempt = $examMap[(int) $examSet['id']] ?? null;
                $topicCount = 0;
                foreach ($distribution as $topicQuestionCount) {
                    if ((int) $topicQuestionCount > 0) {
                        $topicCount++;
                    }
                }
                ?>
                <article class="exam-card <?php echo $hasSubscription ? '' : 'is-locked'; ?>">
                    <div class="exam-card-header">
                        <div>
                            <h3><?php echo e($examSet['title']); ?></h3>
                            <span class="exam-card-kicker"><?php echo e($examSet['category_name']); ?> - Exam Set #<?php echo (int) $examSet['id']; ?></span>
                        </div>
                        <?php if (!$hasSubscription): ?>
                            <span class="pill pill-warning">Locked</span>
                        <?php elseif ($attempt): ?>
                            <span class="pill <?php echo $attempt['status'] === 'completed' ? 'pill-success' : 'pill-warning'; ?>">
                                <?php echo e(ucfirst($attempt['status'])); ?>
                            </span>
                        <?php else: ?>
                            <span class="pill pill-info">New</span>
                        <?php endif; ?>
                    </div>

                    <div class="exam-card-stats">
                        <div>
                            <strong><?php echo $questionTotal; ?></strong>
                            <span>Questions</span>
                        </div>
                        <div>
                            <strong><?php echo (int) $examSet['time_limit']; ?></strong>
                            <span>Minutes</span>
                        </div>
                        <div>
                            <strong><?php echo $topicCount; ?></strong>
                            <span>Topics</span>
                        </div>
                    </div>

                    <div class="exam-card-attempt">
                        <?php if (!$hasSubscription): ?>
                            <div>
                                <span class="muted">Access</span>
                                <strong>Subscribe to start</strong>
                            </div>
                        <?php elseif ($attempt): ?>
                            <?php if ($attempt['status'] === 'completed'): ?>
                                <div>
                                    <span class="muted">Latest score</span>
                                    <strong><?php echo (int) $attempt['score']; ?></strong>
                                </div>
                            <?php else: ?>
                                <div>
                                    <span class="muted">Latest attempt</span>
                                    <strong>In progress</strong>
                                </div>
                            <?php endif; ?>
                        <?php else: ?>
                            <div>
                                <span class="muted">Latest attempt</span>
                                <strong>No attempt yet</strong>
                            </div>
                        <?php endif; ?>
                    </div>

                    <div class="actions exam-card-actions">
                        <?php if (!$hasSubscription): ?>
                            <a class="btn btn-primary" href="<?php echo e(base_url('user/subscribe.php')); ?>">Choose Plan</a>
                        <?php elseif (!$attempt): ?>
                            <a class="btn btn-primary" href="<?php echo e(base_url('user/start_exam.php?exam_set_id=' . (int) $examSet['id'])); ?>">Start Exam</a>
                        <?php elseif ($attempt['status'] === 'completed'): ?>
                            <a class="btn btn-accent" href="<?php echo e(base_url('user/result.php?exam_id=' . (int) $attempt['id'])); ?>">View Result</a>
                        <?php else: ?>
                            <a class="btn btn-secondary" href="<?php echo e(base_url('user/exam.php?exam_id=' . (int) $attempt['id'])); ?>">Resume Exam</a>
                        <?php endif; ?>
                    </div>
                </article>
            <?php endforeach; ?>
        </div>
    <?php endif; ?>
</section>

<?php render_footer(); ?>
