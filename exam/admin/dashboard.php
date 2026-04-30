<?php
require_once __DIR__ . '/../includes/functions.php';
require_admin_login();

$summary = $conn->query("
    SELECT
        (SELECT COUNT(*) FROM users) AS total_users,
        (SELECT COUNT(*) FROM users WHERE is_active = 1) AS active_users,
        (SELECT COUNT(*) FROM exam_categories WHERE is_active = 1) AS active_categories,
        (SELECT COUNT(*) FROM exam_sets) AS exam_sets,
        (SELECT COUNT(*) FROM topics) AS topics,
        (SELECT COUNT(*) FROM questions) AS questions,
        (SELECT COUNT(*) FROM user_category_subscriptions WHERE status = 'active' AND expires_at > NOW()) AS active_subscriptions,
        (SELECT COUNT(*) FROM user_exams) AS total_attempts,
        (SELECT COUNT(*) FROM user_exams WHERE status = 'completed') AS completed_attempts,
        (SELECT COALESCE(ROUND(AVG(score)), 0) FROM user_exams WHERE status = 'completed') AS average_score
")->fetch_assoc();

$categoryRows = $conn->query("
    SELECT
        c.id,
        c.name,
        c.is_active,
        COALESCE(es.exam_set_count, 0) AS exam_set_count,
        COALESCE(t.topic_count, 0) AS topic_count,
        COALESCE(q.question_count, 0) AS question_count,
        COALESCE(s.subscription_count, 0) AS subscription_count
    FROM exam_categories c
    LEFT JOIN (
        SELECT category_id, COUNT(*) AS exam_set_count
        FROM exam_sets
        GROUP BY category_id
    ) es ON es.category_id = c.id
    LEFT JOIN (
        SELECT category_id, COUNT(*) AS topic_count
        FROM topics
        GROUP BY category_id
    ) t ON t.category_id = c.id
    LEFT JOIN (
        SELECT t.category_id, COUNT(q.id) AS question_count
        FROM topics t
        LEFT JOIN questions q ON q.topic_id = t.id
        GROUP BY t.category_id
    ) q ON q.category_id = c.id
    LEFT JOIN (
        SELECT category_id, COUNT(*) AS subscription_count
        FROM user_category_subscriptions
        WHERE status = 'active' AND expires_at > NOW()
        GROUP BY category_id
    ) s ON s.category_id = c.id
    ORDER BY c.is_active DESC, c.name ASC
")->fetch_all(MYSQLI_ASSOC);

$popularExamSets = $conn->query("
    SELECT
        es.id,
        es.title,
        c.name AS category_name,
        COUNT(ue.id) AS attempt_count,
        COALESCE(ROUND(AVG(CASE WHEN ue.status = 'completed' THEN ue.score END)), 0) AS average_score
    FROM exam_sets es
    INNER JOIN exam_categories c ON c.id = es.category_id
    LEFT JOIN user_exams ue ON ue.exam_set_id = es.id
    GROUP BY es.id
    ORDER BY attempt_count DESC, es.created_at DESC
    LIMIT 5
")->fetch_all(MYSQLI_ASSOC);

$recentAttempts = $conn->query("
    SELECT
        ue.id,
        ue.status,
        ue.score,
        ue.started_at,
        ue.completed_at,
        u.name AS user_name,
        es.title AS exam_set_title,
        c.name AS category_name
    FROM user_exams ue
    INNER JOIN users u ON u.id = ue.user_id
    INNER JOIN exam_sets es ON es.id = ue.exam_set_id
    INNER JOIN exam_categories c ON c.id = es.category_id
    ORDER BY ue.started_at DESC, ue.id DESC
    LIMIT 10
")->fetch_all(MYSQLI_ASSOC);

$trendRows = $conn->query("
    SELECT
        DATE(started_at) AS attempt_day,
        COUNT(*) AS total_attempts,
        SUM(CASE WHEN status = 'completed' THEN 1 ELSE 0 END) AS completed_attempts,
        COALESCE(ROUND(AVG(CASE WHEN status = 'completed' THEN score END)), 0) AS average_score
    FROM user_exams
    WHERE started_at >= DATE_SUB(CURDATE(), INTERVAL 13 DAY)
    GROUP BY DATE(started_at)
    ORDER BY attempt_day ASC
")->fetch_all(MYSQLI_ASSOC);

$trendByDay = [];
foreach ($trendRows as $trendRow) {
    $trendByDay[$trendRow['attempt_day']] = $trendRow;
}

$trendData = [];
for ($dayOffset = 13; $dayOffset >= 0; $dayOffset--) {
    $date = new DateTime('-' . $dayOffset . ' days');
    $key = $date->format('Y-m-d');
    $row = $trendByDay[$key] ?? null;
    $trendData[] = [
        'label' => $date->format('M j'),
        'date' => $key,
        'attempts' => (int) ($row['total_attempts'] ?? 0),
        'completed' => (int) ($row['completed_attempts'] ?? 0),
        'averageScore' => (int) ($row['average_score'] ?? 0)
    ];
}

$categoryChartData = [];
foreach ($categoryRows as $categoryRow) {
    $categoryChartData[] = [
        'name' => $categoryRow['name'],
        'questions' => (int) $categoryRow['question_count'],
        'examSets' => (int) $categoryRow['exam_set_count'],
        'subscriptions' => (int) $categoryRow['subscription_count']
    ];
}

$completionRate = (int) ($summary['total_attempts'] ?? 0) > 0
    ? round(((int) ($summary['completed_attempts'] ?? 0) / (int) $summary['total_attempts']) * 100)
    : 0;

$maxQuestionCount = 1;
foreach ($categoryRows as $categoryRow) {
    $maxQuestionCount = max($maxQuestionCount, (int) $categoryRow['question_count']);
}

render_header('Admin Dashboard', 'admin');
?>

<section class="admin-dashboard-actions">
    <a class="btn btn-primary" href="<?php echo e(base_url('admin/exam_sets.php')); ?>">Create Exam Set</a>
    <a class="btn btn-secondary" href="<?php echo e(base_url('admin/questions.php')); ?>">Manage Questions</a>
    <a class="btn btn-ghost" href="<?php echo e(base_url('admin/users.php')); ?>">Manage Users</a>
</section>

<section class="admin-metric-grid">
    <article class="admin-metric-card">
        <span>Users</span>
        <strong><?php echo (int) $summary['total_users']; ?></strong>
        <small><?php echo (int) $summary['active_users']; ?> active</small>
    </article>
    <article class="admin-metric-card">
        <span>Exam Sets</span>
        <strong><?php echo (int) $summary['exam_sets']; ?></strong>
        <small><?php echo (int) $summary['active_categories']; ?> active categories</small>
    </article>
    <article class="admin-metric-card">
        <span>Questions</span>
        <strong><?php echo (int) $summary['questions']; ?></strong>
        <small><?php echo (int) $summary['topics']; ?> topics</small>
    </article>
    <article class="admin-metric-card">
        <span>Completion</span>
        <strong><?php echo $completionRate; ?>%</strong>
        <small><?php echo (int) $summary['completed_attempts']; ?> of <?php echo (int) $summary['total_attempts']; ?> attempts</small>
    </article>
</section>

<section class="admin-graph-grid">
    <article class="table-card admin-graph-panel">
        <div class="section-heading-row">
            <div>
                <h2>Performance Overview</h2>
                <p class="muted">Attempts, completions, and score trend over the last 14 days.</p>
            </div>
            <div class="admin-filter-tabs" role="group" aria-label="Trend metric">
                <button class="is-active" type="button" data-admin-chart-mode="attempts">Attempts</button>
                <button type="button" data-admin-chart-mode="completed">Completed</button>
                <button type="button" data-admin-chart-mode="averageScore">Score</button>
            </div>
        </div>
        <div
            class="admin-trend-chart"
            data-admin-trend-chart
            data-chart='<?php echo e(json_encode($trendData)); ?>'
        >
            <div class="admin-chart-tooltip" data-admin-chart-tooltip hidden></div>
        </div>
    </article>

    <aside class="table-card admin-donut-panel">
        <div class="admin-donut" style="--value: <?php echo $completionRate; ?>;">
            <span><?php echo $completionRate; ?>%</span>
        </div>
        <h2>Completion Rate</h2>
        <p class="muted"><?php echo (int) $summary['completed_attempts']; ?> completed from <?php echo (int) $summary['total_attempts']; ?> total attempts.</p>
        <div class="admin-donut-stats">
            <span><strong><?php echo (int) $summary['average_score']; ?></strong>Avg score</span>
            <span><strong><?php echo (int) $summary['active_subscriptions']; ?></strong>Subscriptions</span>
        </div>
    </aside>
</section>

<section class="table-card">
    <div class="section-heading-row">
        <div>
            <h2>Category Comparison</h2>
            <p class="muted">Switch the chart to compare content depth and demand.</p>
        </div>
        <div class="admin-filter-tabs" role="group" aria-label="Category chart metric">
            <button class="is-active" type="button" data-admin-category-chart-mode="questions">Questions</button>
            <button type="button" data-admin-category-chart-mode="examSets">Exam Sets</button>
            <button type="button" data-admin-category-chart-mode="subscriptions">Subscriptions</button>
        </div>
    </div>
    <div
        class="admin-category-chart"
        data-admin-category-chart
        data-chart='<?php echo e(json_encode($categoryChartData)); ?>'
    ></div>
</section>

<section class="admin-dashboard-grid">
    <article class="table-card admin-panel-wide">
        <div class="section-heading-row">
            <div>
                <h2>Category Health</h2>
                <p class="muted">Question depth, exam sets, and active subscriptions by category.</p>
            </div>
            <span class="section-count"><?php echo count($categoryRows); ?> categories</span>
        </div>
        <div class="admin-category-list">
            <?php foreach ($categoryRows as $category): ?>
                <?php $barWidth = max(6, round(((int) $category['question_count'] / $maxQuestionCount) * 100)); ?>
                <article class="admin-category-row" data-admin-category-row>
                    <button class="admin-category-toggle" type="button" data-admin-toggle>
                        <span>
                            <strong><?php echo e($category['name']); ?></strong>
                            <small><?php echo (int) $category['exam_set_count']; ?> exam sets</small>
                        </span>
                        <span class="pill <?php echo (int) $category['is_active'] === 1 ? 'pill-success' : 'pill-warning'; ?>">
                            <?php echo (int) $category['is_active'] === 1 ? 'Active' : 'Inactive'; ?>
                        </span>
                    </button>
                    <div class="admin-progress-track" aria-hidden="true">
                        <span style="width: <?php echo (int) $barWidth; ?>%;"></span>
                    </div>
                    <div class="admin-category-detail">
                        <span><?php echo (int) $category['topic_count']; ?> topics</span>
                        <span><?php echo (int) $category['question_count']; ?> questions</span>
                        <span><?php echo (int) $category['subscription_count']; ?> subscriptions</span>
                    </div>
                </article>
            <?php endforeach; ?>
        </div>
    </article>

    <aside class="table-card">
        <div class="section-heading-row">
            <div>
                <h2>Exam Set Usage</h2>
                <p class="muted">Most-used exam sets.</p>
            </div>
        </div>
        <div class="admin-usage-list">
            <?php if (!$popularExamSets): ?>
                <div class="exam-card-empty">No exam sets yet.</div>
            <?php else: ?>
                <?php foreach ($popularExamSets as $examSet): ?>
                    <article class="admin-usage-item">
                        <div>
                            <strong><?php echo e($examSet['title']); ?></strong>
                            <span><?php echo e($examSet['category_name']); ?></span>
                        </div>
                        <span class="pill pill-info"><?php echo (int) $examSet['attempt_count']; ?> attempts</span>
                    </article>
                <?php endforeach; ?>
            <?php endif; ?>
        </div>
    </aside>
</section>

<section class="table-card">
    <div class="section-heading-row">
        <div>
            <h2>Recent Activity</h2>
            <p class="muted">Filter recent exam attempts by status.</p>
        </div>
        <div class="admin-filter-tabs" role="group" aria-label="Filter attempts">
            <button class="is-active" type="button" data-admin-filter="all">All</button>
            <button type="button" data-admin-filter="completed">Completed</button>
            <button type="button" data-admin-filter="in_progress">In Progress</button>
        </div>
    </div>
    <div class="table-wrap">
        <table>
            <thead>
                <tr>
                    <th>Student</th>
                    <th>Exam Set</th>
                    <th>Category</th>
                    <th>Status</th>
                    <th>Score</th>
                    <th>Started</th>
                </tr>
            </thead>
            <tbody>
                <?php if (!$recentAttempts): ?>
                    <tr><td colspan="6">No attempts yet.</td></tr>
                <?php else: ?>
                    <?php foreach ($recentAttempts as $attempt): ?>
                        <tr data-admin-attempt-row="<?php echo e($attempt['status']); ?>">
                            <td><?php echo e($attempt['user_name']); ?></td>
                            <td><?php echo e($attempt['exam_set_title']); ?></td>
                            <td><?php echo e($attempt['category_name']); ?></td>
                            <td>
                                <span class="pill <?php echo $attempt['status'] === 'completed' ? 'pill-success' : 'pill-warning'; ?>">
                                    <?php echo e(ucfirst(str_replace('_', ' ', $attempt['status']))); ?>
                                </span>
                            </td>
                            <td><?php echo $attempt['status'] === 'completed' ? (int) $attempt['score'] : '-'; ?></td>
                            <td><?php echo e($attempt['started_at']); ?></td>
                        </tr>
                    <?php endforeach; ?>
                <?php endif; ?>
            </tbody>
        </table>
    </div>
</section>

<?php render_footer(); ?>
