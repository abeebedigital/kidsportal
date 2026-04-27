<?php
require_once __DIR__ . '/../includes/functions.php';
require_login();

$user = current_user();
$blueprints = get_blueprints();
$examMap = latest_user_exam_map((int) $user['id']);

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
        <strong><?php echo count($blueprints); ?></strong>
        <span>Exam blueprints available</span>
    </article>
    <article class="metric">
        <strong><?php echo (int) ($stats['total_attempts'] ?? 0); ?></strong>
        <span>Total attempts</span>
    </article>
    <article class="metric">
        <strong><?php echo (int) ($stats['completed_attempts'] ?? 0); ?></strong>
        <span>Completed exams</span>
    </article>
</section>

<?php if ((int) $user['is_subscribed'] !== 1): ?>
    <div class="alert alert-error">This account is not subscribed. You can still view the dashboard, but starting an exam is locked until <code>is_subscribed = 1</code>.</div>
<?php endif; ?>

<section class="table-card">
    <h2>Available Exams</h2>
    <p class="muted">Start a fresh exam from a blueprint, resume an in-progress one, or revisit a completed result.</p>
    <div class="table-wrap">
        <table>
            <thead>
                <tr>
                    <th>Blueprint</th>
                    <th>Questions</th>
                    <th>Time Limit</th>
                    <th>Latest Attempt</th>
                    <th>Action</th>
                </tr>
            </thead>
            <tbody>
                <?php if (!$blueprints): ?>
                    <tr>
                        <td colspan="5">No blueprints available yet. Use the admin area to create one.</td>
                    </tr>
                <?php else: ?>
                    <?php foreach ($blueprints as $blueprint): ?>
                        <?php
                        $distribution = json_decode($blueprint['topic_distribution'], true) ?: [];
                        $questionTotal = array_sum(array_map('intval', $distribution));
                        $attempt = $examMap[(int) $blueprint['id']] ?? null;
                        ?>
                        <tr>
                            <td>
                                <strong><?php echo e($blueprint['title']); ?></strong>
                                <div class="muted">Blueprint ID: <?php echo (int) $blueprint['id']; ?></div>
                            </td>
                            <td><?php echo $questionTotal; ?></td>
                            <td><?php echo (int) $blueprint['time_limit']; ?> mins</td>
                            <td>
                                <?php if ($attempt): ?>
                                    <div class="status-row">
                                        <span class="pill <?php echo $attempt['status'] === 'completed' ? 'pill-success' : 'pill-warning'; ?>">
                                            <?php echo e(ucfirst($attempt['status'])); ?>
                                        </span>
                                        <?php if ($attempt['status'] === 'completed'): ?>
                                            <span class="muted">Score: <?php echo (int) $attempt['score']; ?></span>
                                        <?php endif; ?>
                                    </div>
                                <?php else: ?>
                                    <span class="muted">No attempt yet</span>
                                <?php endif; ?>
                            </td>
                            <td>
                                <div class="actions">
                                    <?php if (!$attempt): ?>
                                        <a class="btn <?php echo (int) $user['is_subscribed'] === 1 ? 'btn-primary' : 'btn-ghost'; ?>" href="<?php echo e(base_url('user/start_exam.php?blueprint_id=' . (int) $blueprint['id'])); ?>">
                                            Start Exam
                                        </a>
                                    <?php elseif ($attempt['status'] === 'completed'): ?>
                                        <a class="btn btn-accent" href="<?php echo e(base_url('user/result.php?exam_id=' . (int) $attempt['id'])); ?>">View Result</a>
                                    <?php else: ?>
                                        <a class="btn btn-secondary" href="<?php echo e(base_url('user/exam.php?exam_id=' . (int) $attempt['id'])); ?>">Resume Exam</a>
                                    <?php endif; ?>
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

