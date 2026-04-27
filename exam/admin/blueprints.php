<?php
require_once __DIR__ . '/../includes/functions.php';
require_admin_login();

$topics = get_topics();
$editing = null;
$editingDistribution = [];

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $action = $_POST['action'] ?? 'create';
    $title = trim($_POST['title'] ?? '');
    $timeLimit = (int) ($_POST['time_limit'] ?? 0);
    $rawCounts = $_POST['topic_count'] ?? [];
    $distribution = [];

    foreach ($rawCounts as $topicId => $count) {
        $countValue = (int) $count;
        if ($countValue > 0) {
            $distribution[(string) ((int) $topicId)] = $countValue;
        }
    }

    if ($title === '' || $timeLimit <= 0 || !$distribution) {
        set_flash('error', 'Please enter a title, time limit, and at least one topic count.');
        redirect_to('admin/blueprints.php');
    }

    $distributionJson = json_encode($distribution);

    if ($action === 'update') {
        $blueprintId = (int) ($_POST['blueprint_id'] ?? 0);
        $stmt = $conn->prepare('UPDATE exam_blueprints SET title = ?, topic_distribution = ?, time_limit = ? WHERE id = ?');
        $stmt->bind_param('ssii', $title, $distributionJson, $timeLimit, $blueprintId);
        $stmt->execute();
        $stmt->close();
        set_flash('success', 'Blueprint updated successfully.');
    } else {
        $stmt = $conn->prepare('INSERT INTO exam_blueprints (title, topic_distribution, time_limit) VALUES (?, ?, ?)');
        $stmt->bind_param('ssi', $title, $distributionJson, $timeLimit);
        $stmt->execute();
        $stmt->close();
        set_flash('success', 'Blueprint saved successfully.');
    }

    redirect_to('admin/blueprints.php');
}

if (isset($_GET['delete'])) {
    $blueprintId = (int) $_GET['delete'];
    $stmt = $conn->prepare('DELETE FROM exam_blueprints WHERE id = ?');
    $stmt->bind_param('i', $blueprintId);
    $stmt->execute();
    $stmt->close();
    set_flash('success', 'Blueprint deleted successfully.');
    redirect_to('admin/blueprints.php');
}

if (isset($_GET['edit'])) {
    $blueprintId = (int) $_GET['edit'];
    $stmt = $conn->prepare('SELECT * FROM exam_blueprints WHERE id = ? LIMIT 1');
    $stmt->bind_param('i', $blueprintId);
    $stmt->execute();
    $editing = $stmt->get_result()->fetch_assoc();
    $stmt->close();
    if ($editing) {
        $editingDistribution = json_decode($editing['topic_distribution'], true) ?: [];
    }
}

$blueprints = get_blueprints();
$questionCountByTopic = [];
$countRows = $conn->query('SELECT topic_id, COUNT(*) AS total FROM questions GROUP BY topic_id')->fetch_all(MYSQLI_ASSOC);
foreach ($countRows as $row) {
    $questionCountByTopic[(int) $row['topic_id']] = (int) $row['total'];
}

render_header('Manage Blueprints', 'admin');
?>

<?php if (!$topics): ?>
    <div class="alert alert-error">Create topics and questions before building an exam blueprint.</div>
<?php endif; ?>

<div class="grid-2">
    <section class="card">
        <h2><?php echo $editing ? 'Edit Blueprint' : 'Create Blueprint'; ?></h2>
        <p class="muted">Blueprints define how many random questions to pull from each topic and how much time the exam gets.</p>
        <form method="post" class="form-grid">
            <input type="hidden" name="action" value="<?php echo $editing ? 'update' : 'create'; ?>">
            <?php if ($editing): ?>
                <input type="hidden" name="blueprint_id" value="<?php echo (int) $editing['id']; ?>">
            <?php endif; ?>
            <div class="form-row">
                <label for="blueprintTitle">Blueprint Title</label>
                <input id="blueprintTitle" type="text" name="title" value="<?php echo e($editing['title'] ?? ''); ?>" placeholder="Example: Year 3 Mixed Review" required>
            </div>
            <div class="form-row">
                <label for="timeLimit">Time Limit (minutes)</label>
                <input id="timeLimit" type="number" min="1" name="time_limit" value="<?php echo e($editing['time_limit'] ?? 30); ?>" required>
            </div>
            <div class="form-row">
                <label>Topic Distribution</label>
                <div class="topic-count-grid">
                    <?php foreach ($topics as $topic): ?>
                        <div class="topic-count-card">
                            <div>
                                <strong><?php echo e($topic['name']); ?></strong>
                                <span class="muted"><?php echo (int) ($questionCountByTopic[(int) $topic['id']] ?? 0); ?> questions available</span>
                            </div>
                            <input type="number" min="0" name="topic_count[<?php echo (int) $topic['id']; ?>]" value="<?php echo e($editingDistribution[(string) $topic['id']] ?? 0); ?>">
                        </div>
                    <?php endforeach; ?>
                </div>
            </div>
            <div class="actions">
                <button class="btn btn-primary" type="submit" <?php echo !$topics ? 'disabled' : ''; ?>><?php echo $editing ? 'Update Blueprint' : 'Save Blueprint'; ?></button>
                <?php if ($editing): ?>
                    <a class="btn btn-ghost" href="<?php echo e(base_url('admin/blueprints.php')); ?>">Cancel</a>
                <?php endif; ?>
            </div>
        </form>
    </section>

    <section class="table-card">
        <h2>Saved Blueprints</h2>
        <p class="muted">These are the exam templates students can launch from the user dashboard.</p>
        <div class="table-wrap">
            <table>
                <thead>
                    <tr>
                        <th>Title</th>
                        <th>Time</th>
                        <th>Distribution</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    <?php if (!$blueprints): ?>
                        <tr>
                            <td colspan="4">No blueprints yet.</td>
                        </tr>
                    <?php else: ?>
                        <?php foreach ($blueprints as $blueprint): ?>
                            <?php $distribution = json_decode($blueprint['topic_distribution'], true) ?: []; ?>
                            <tr>
                                <td><?php echo e($blueprint['title']); ?></td>
                                <td><?php echo (int) $blueprint['time_limit']; ?> mins</td>
                                <td>
                                    <?php foreach ($distribution as $topicId => $count): ?>
                                        <?php
                                        $topicName = 'Topic #' . (int) $topicId;
                                        foreach ($topics as $topic) {
                                            if ((int) $topic['id'] === (int) $topicId) {
                                                $topicName = $topic['name'];
                                                break;
                                            }
                                        }
                                        ?>
                                        <div><?php echo e($topicName); ?>: <?php echo (int) $count; ?></div>
                                    <?php endforeach; ?>
                                </td>
                                <td>
                                    <div class="actions">
                                        <a class="btn btn-accent" href="<?php echo e(base_url('admin/blueprints.php?edit=' . (int) $blueprint['id'])); ?>">Edit</a>
                                        <a class="btn btn-danger" href="<?php echo e(base_url('admin/blueprints.php?delete=' . (int) $blueprint['id'])); ?>" onclick="return confirm('Delete this blueprint?');">Delete</a>
                                    </div>
                                </td>
                            </tr>
                        <?php endforeach; ?>
                    <?php endif; ?>
                </tbody>
            </table>
        </div>
    </section>
</div>

<?php render_footer(); ?>
