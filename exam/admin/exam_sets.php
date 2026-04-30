<?php
require_once __DIR__ . '/../includes/functions.php';
require_admin_login();

$categories = get_categories(true);
$topics = get_topics();
$editing = null;
$editingDistribution = [];

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $action = $_POST['action'] ?? 'create';
    $categoryId = (int) ($_POST['category_id'] ?? 0);
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

    if ($categoryId > 0 && $distribution) {
        $validTopicRows = $conn->query('SELECT id, category_id FROM topics')->fetch_all(MYSQLI_ASSOC);
        $validTopicIds = [];
        foreach ($validTopicRows as $topicRow) {
            if ((int) $topicRow['category_id'] === $categoryId) {
                $validTopicIds[(int) $topicRow['id']] = true;
            }
        }
        foreach (array_keys($distribution) as $topicId) {
            if (empty($validTopicIds[(int) $topicId])) {
                unset($distribution[$topicId]);
            }
        }
    }

    if ($categoryId <= 0 || $title === '' || $timeLimit <= 0 || !$distribution) {
        set_flash('error', 'Please choose a category, enter a title, time limit, and at least one topic from that category.');
        redirect_to('admin/exam_sets.php');
    }

    $distributionJson = json_encode($distribution);

    if ($action === 'update') {
        $examSetId = (int) ($_POST['exam_set_id'] ?? 0);
        $stmt = $conn->prepare('UPDATE exam_sets SET category_id = ?, title = ?, topic_distribution = ?, time_limit = ? WHERE id = ?');
        $stmt->bind_param('issii', $categoryId, $title, $distributionJson, $timeLimit, $examSetId);
        $stmt->execute();
        $stmt->close();
        set_flash('success', 'Exam Set updated successfully.');
    } else {
        $stmt = $conn->prepare('INSERT INTO exam_sets (category_id, title, topic_distribution, time_limit) VALUES (?, ?, ?, ?)');
        $stmt->bind_param('issi', $categoryId, $title, $distributionJson, $timeLimit);
        $stmt->execute();
        $stmt->close();
        set_flash('success', 'Exam Set saved successfully.');
    }

    redirect_to('admin/exam_sets.php');
}

if (isset($_GET['delete'])) {
    $examSetId = (int) $_GET['delete'];
    $stmt = $conn->prepare('DELETE FROM exam_sets WHERE id = ?');
    $stmt->bind_param('i', $examSetId);
    $stmt->execute();
    $stmt->close();
    set_flash('success', 'Exam Set deleted successfully.');
    redirect_to('admin/exam_sets.php');
}

if (isset($_GET['edit'])) {
    $examSetId = (int) $_GET['edit'];
    $stmt = $conn->prepare('SELECT * FROM exam_sets WHERE id = ? LIMIT 1');
    $stmt->bind_param('i', $examSetId);
    $stmt->execute();
    $editing = $stmt->get_result()->fetch_assoc();
    $stmt->close();
    if ($editing) {
        $editingDistribution = json_decode($editing['topic_distribution'], true) ?: [];
    }
}

$examSets = get_exam_sets();
$selectedCategoryId = (int) ($editing['category_id'] ?? 0);
$questionCountByTopic = [];
$countRows = $conn->query('SELECT topic_id, COUNT(*) AS total FROM questions GROUP BY topic_id')->fetch_all(MYSQLI_ASSOC);
foreach ($countRows as $row) {
    $questionCountByTopic[(int) $row['topic_id']] = (int) $row['total'];
}

render_header('Manage Exam Sets', 'admin');
?>

<?php if (!$topics): ?>
    <div class="alert alert-error">Create topics and questions before building an exam set.</div>
<?php endif; ?>

<div class="stacked-sections">
    <section class="card">
        <h2><?php echo $editing ? 'Edit Exam Set' : 'Create Exam Set'; ?></h2>
        <p class="muted">Exam sets define how many random questions to pull from each topic and how much time the exam gets.</p>
        <form method="post" class="form-grid exam-set-form-grid">
            <input type="hidden" name="action" value="<?php echo $editing ? 'update' : 'create'; ?>">
            <?php if ($editing): ?>
                <input type="hidden" name="exam_set_id" value="<?php echo (int) $editing['id']; ?>">
            <?php endif; ?>
            <div class="exam-set-form-main">
                <div class="form-row">
                    <label for="categoryId">Category</label>
                    <select id="categoryId" name="category_id" data-topic-category-select required>
                        <option value="">Choose category</option>
                        <?php foreach ($categories as $category): ?>
                            <option value="<?php echo (int) $category['id']; ?>" <?php echo (int) ($editing['category_id'] ?? 0) === (int) $category['id'] ? 'selected' : ''; ?>>
                                <?php echo e($category['name']); ?>
                            </option>
                        <?php endforeach; ?>
                    </select>
                </div>
                <div class="form-row">
                    <label for="examSetTitle">Exam Set Title</label>
                    <input id="examSetTitle" type="text" name="title" value="<?php echo e($editing['title'] ?? ''); ?>" placeholder="Example: Year 3 Mixed Review" required>
                </div>
                <div class="form-row">
                    <label for="timeLimit">Time Limit (minutes)</label>
                    <input id="timeLimit" type="number" min="1" name="time_limit" value="<?php echo e($editing['time_limit'] ?? 30); ?>" required>
                </div>
            </div>
            <div class="form-row exam-set-topic-panel">
                <label>Topic Distribution</label>
                <div class="topic-count-grid">
                    <?php foreach ($topics as $topic): ?>
                        <?php $topicVisible = $selectedCategoryId > 0 && (int) $topic['category_id'] === $selectedCategoryId; ?>
                        <div class="topic-count-card" data-topic-category="<?php echo (int) $topic['category_id']; ?>" <?php echo $topicVisible ? '' : 'hidden'; ?>>
                            <div>
                                <strong><?php echo e($topic['name']); ?></strong>
                                <span class="muted"><?php echo e($topic['category_name']); ?> - <?php echo (int) ($questionCountByTopic[(int) $topic['id']] ?? 0); ?> questions available</span>
                            </div>
                            <input type="number" min="0" name="topic_count[<?php echo (int) $topic['id']; ?>]" value="<?php echo e($editingDistribution[(string) $topic['id']] ?? 0); ?>" data-topic-count-input <?php echo $topicVisible ? '' : 'disabled'; ?>>
                        </div>
                    <?php endforeach; ?>
                    <div class="topic-count-empty" data-topic-category-empty <?php echo $selectedCategoryId > 0 ? 'hidden' : ''; ?>>Select a category to view its topics.</div>
                </div>
            </div>
            <div class="actions">
                <button class="btn btn-primary" type="submit" <?php echo !$topics ? 'disabled' : ''; ?>><?php echo $editing ? 'Update Exam Set' : 'Save Exam Set'; ?></button>
                <?php if ($editing): ?>
                    <a class="btn btn-ghost" href="<?php echo e(base_url('admin/exam_sets.php')); ?>">Cancel</a>
                <?php endif; ?>
            </div>
        </form>
    </section>

    <section class="table-card">
        <h2>Saved Exam Sets</h2>
        <p class="muted">These are the exam templates students can launch from the user dashboard.</p>
        <div class="table-wrap">
            <table>
                <thead>
                    <tr>
                        <th>Title</th>
                        <th>Category</th>
                        <th>Time</th>
                        <th>Distribution</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    <?php if (!$examSets): ?>
                        <tr>
                            <td colspan="5">No exam sets yet.</td>
                        </tr>
                    <?php else: ?>
                        <?php foreach ($examSets as $examSet): ?>
                            <?php $distribution = json_decode($examSet['topic_distribution'], true) ?: []; ?>
                            <tr>
                                <td><?php echo e($examSet['title']); ?></td>
                                <td><?php echo e($examSet['category_name']); ?></td>
                                <td><?php echo (int) $examSet['time_limit']; ?> mins</td>
                                <td>
                                    <span class="pill pill-info"><?php echo (int) array_sum(array_map('intval', $distribution)); ?> questions</span>
                                    <button
                                        class="icon-detail-btn"
                                        type="button"
                                        data-modal-target="exam-set-distribution-<?php echo (int) $examSet['id']; ?>"
                                        aria-label="View distribution for <?php echo e($examSet['title']); ?>"
                                        title="View distribution"
                                    >
                                        ^
                                    </button>
                                </td>
                                <td>
                                    <div class="actions">
                                        <a class="btn btn-accent" href="<?php echo e(base_url('admin/exam_sets.php?edit=' . (int) $examSet['id'])); ?>">Edit</a>
                                        <a class="btn btn-danger" href="<?php echo e(base_url('admin/exam_sets.php?delete=' . (int) $examSet['id'])); ?>" onclick="return confirm('Delete this Exam Set?');">Delete</a>
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

<?php foreach ($examSets as $examSet): ?>
    <?php $distribution = json_decode($examSet['topic_distribution'], true) ?: []; ?>
    <div class="modal-backdrop" id="exam-set-distribution-<?php echo (int) $examSet['id']; ?>" hidden>
        <section class="modal-panel modal-panel-small" role="dialog" aria-modal="true" aria-labelledby="exam-set-distribution-title-<?php echo (int) $examSet['id']; ?>">
            <div class="modal-header">
                <div>
                    <h2 id="exam-set-distribution-title-<?php echo (int) $examSet['id']; ?>">Distribution Details</h2>
                    <p class="muted"><?php echo e($examSet['title']); ?> - <?php echo e($examSet['category_name']); ?></p>
                </div>
                <button class="modal-close" type="button" data-modal-close aria-label="Close">x</button>
            </div>
            <div class="modal-list">
                <?php if (!$distribution): ?>
                    <div class="exam-card-empty">No distribution configured.</div>
                <?php else: ?>
                    <?php foreach ($distribution as $topicId => $count): ?>
                        <?php
                        $topicName = 'Topic #' . (int) $topicId;
                        $topicCategoryName = '';
                        foreach ($topics as $topic) {
                            if ((int) $topic['id'] === (int) $topicId) {
                                $topicName = $topic['name'];
                                $topicCategoryName = $topic['category_name'];
                                break;
                            }
                        }
                        ?>
                        <article class="distribution-detail-row">
                            <div>
                                <strong><?php echo e($topicName); ?></strong>
                                <?php if ($topicCategoryName !== ''): ?>
                                    <span class="muted"><?php echo e($topicCategoryName); ?></span>
                                <?php endif; ?>
                            </div>
                            <span class="pill pill-info"><?php echo (int) $count; ?> questions</span>
                        </article>
                    <?php endforeach; ?>
                <?php endif; ?>
            </div>
        </section>
    </div>
<?php endforeach; ?>

<?php render_footer(); ?>
