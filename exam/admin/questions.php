<?php
require_once __DIR__ . '/../includes/functions.php';
require_admin_login();

$topics = topic_options_with_unassigned();
$editing = null;

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $action = $_POST['action'] ?? 'create';
    $topicId = (int) ($_POST['topic_id'] ?? 0);
    $question = trim($_POST['question'] ?? '');
    $optionA = trim($_POST['option_a'] ?? '');
    $optionB = trim($_POST['option_b'] ?? '');
    $optionC = trim($_POST['option_c'] ?? '');
    $optionD = trim($_POST['option_d'] ?? '');
    $correct = strtoupper(trim($_POST['correct_answer'] ?? ''));
    $explanation = trim($_POST['explanation'] ?? '');

    if ($question === '' || $optionA === '' || $optionB === '' || $optionC === '' || $optionD === '' || !in_array($correct, ['A', 'B', 'C', 'D'], true)) {
        set_flash('error', 'Please fill every field and choose a valid correct answer.');
        redirect_to('admin/questions.php');
    }

    if ($action === 'update') {
        $questionId = (int) ($_POST['question_id'] ?? 0);
        $stmt = $conn->prepare('
            UPDATE questions
            SET topic_id = ?, question = ?, option_a = ?, option_b = ?, option_c = ?, option_d = ?, correct_answer = ?, explanation = ?
            WHERE id = ?
        ');
        $stmt->bind_param('isssssssi', $topicId, $question, $optionA, $optionB, $optionC, $optionD, $correct, $explanation, $questionId);
        $stmt->execute();
        $stmt->close();
        set_flash('success', 'Question updated successfully.');
    } else {
        $stmt = $conn->prepare('
            INSERT INTO questions (topic_id, question, option_a, option_b, option_c, option_d, correct_answer, explanation)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?)
        ');
        $stmt->bind_param('isssssss', $topicId, $question, $optionA, $optionB, $optionC, $optionD, $correct, $explanation);
        $stmt->execute();
        $stmt->close();
        set_flash('success', 'Question added successfully.');
    }

    redirect_to('admin/questions.php');
}

if (isset($_GET['delete'])) {
    $questionId = (int) $_GET['delete'];
    $stmt = $conn->prepare('DELETE FROM questions WHERE id = ?');
    $stmt->bind_param('i', $questionId);
    $stmt->execute();
    $stmt->close();
    set_flash('success', 'Question deleted successfully.');
    redirect_to('admin/questions.php');
}

if (isset($_GET['edit'])) {
    $questionId = (int) $_GET['edit'];
    $stmt = $conn->prepare('SELECT * FROM questions WHERE id = ? LIMIT 1');
    $stmt->bind_param('i', $questionId);
    $stmt->execute();
    $editing = $stmt->get_result()->fetch_assoc();
    $stmt->close();
}

$questionsPerPage = 20;
$currentPage = max(1, (int) ($_GET['page'] ?? 1));
$totalQuestions = (int) ($conn->query('SELECT COUNT(*) AS total FROM questions')->fetch_assoc()['total'] ?? 0);
$totalPages = max(1, (int) ceil($totalQuestions / $questionsPerPage));
$currentPage = min($currentPage, $totalPages);
$offset = ($currentPage - 1) * $questionsPerPage;

$questionStmt = $conn->prepare('
    SELECT q.*, COALESCE(t.name, "Unassigned") AS topic_name
    FROM questions q
    LEFT JOIN topics t ON t.id = q.topic_id
    ORDER BY q.id DESC
    LIMIT ? OFFSET ?
');
$questionStmt->bind_param('ii', $questionsPerPage, $offset);
$questionStmt->execute();
$questionRows = $questionStmt->get_result()->fetch_all(MYSQLI_ASSOC);
$questionStmt->close();

render_header('Manage Questions', 'admin');
?>

<div class="stacked-sections">
    <section class="card">
        <h2><?php echo $editing ? 'Edit Question' : 'Add MCQ'; ?></h2>
        <p class="muted">Each question needs four options, one correct answer, and an explanation for review mode. You can leave topic as unassigned and fix it later.</p>
        <div class="actions" style="margin-bottom:12px;">
            <a class="btn btn-accent" href="<?php echo e(base_url('admin/questions_upload.php')); ?>">Bulk Upload CSV/XLSX</a>
        </div>
        <form method="post" class="form-grid">
            <input type="hidden" name="action" value="<?php echo $editing ? 'update' : 'create'; ?>">
            <?php if ($editing): ?>
                <input type="hidden" name="question_id" value="<?php echo (int) $editing['id']; ?>">
            <?php endif; ?>
            <div class="form-row">
                <label for="topicId">Topic</label>
                <select id="topicId" name="topic_id">
                    <?php foreach ($topics as $topic): ?>
                        <option value="<?php echo (int) $topic['id']; ?>" <?php echo (int) ($editing['topic_id'] ?? 0) === (int) $topic['id'] ? 'selected' : ''; ?>>
                            <?php echo e($topic['name']); ?>
                        </option>
                    <?php endforeach; ?>
                </select>
            </div>
            <div class="form-row">
                <label for="questionText">Question</label>
                <textarea id="questionText" name="question" placeholder="Type the MCQ prompt here" required><?php echo e($editing['question'] ?? ''); ?></textarea>
            </div>
            <div class="inline-grid">
                <div class="form-row">
                    <label for="optionA">Option A</label>
                    <input id="optionA" type="text" name="option_a" value="<?php echo e($editing['option_a'] ?? ''); ?>" required>
                </div>
                <div class="form-row">
                    <label for="optionB">Option B</label>
                    <input id="optionB" type="text" name="option_b" value="<?php echo e($editing['option_b'] ?? ''); ?>" required>
                </div>
                <div class="form-row">
                    <label for="optionC">Option C</label>
                    <input id="optionC" type="text" name="option_c" value="<?php echo e($editing['option_c'] ?? ''); ?>" required>
                </div>
                <div class="form-row">
                    <label for="optionD">Option D</label>
                    <input id="optionD" type="text" name="option_d" value="<?php echo e($editing['option_d'] ?? ''); ?>" required>
                </div>
            </div>
            <div class="inline-grid">
                <div class="form-row">
                    <label for="correctAnswer">Correct Answer</label>
                    <select id="correctAnswer" name="correct_answer" required>
                        <option value="">Choose</option>
                        <?php foreach (['A', 'B', 'C', 'D'] as $answer): ?>
                            <option value="<?php echo $answer; ?>" <?php echo ($editing['correct_answer'] ?? '') === $answer ? 'selected' : ''; ?>><?php echo $answer; ?></option>
                        <?php endforeach; ?>
                    </select>
                </div>
                <div class="form-row">
                    <label for="explanation">Explanation</label>
                    <textarea id="explanation" name="explanation" placeholder="Explain why the answer is correct"><?php echo e($editing['explanation'] ?? ''); ?></textarea>
                </div>
            </div>
            <div class="actions">
                <button class="btn btn-primary" type="submit"><?php echo $editing ? 'Update Question' : 'Save Question'; ?></button>
                <?php if ($editing): ?>
                    <a class="btn btn-ghost" href="<?php echo e(base_url('admin/questions.php')); ?>">Cancel</a>
                <?php endif; ?>
            </div>
        </form>
    </section>

    <section class="table-card">
        <h2>Question Bank</h2>
        <p class="muted">Use this list to review and edit the current MCQ bank across all topics, including unassigned uploads. Showing <?php echo $totalQuestions ? (int) ($offset + 1) : 0; ?>-<?php echo (int) min($offset + $questionsPerPage, $totalQuestions); ?> of <?php echo (int) $totalQuestions; ?> questions.</p>
        <div class="table-wrap">
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Topic</th>
                        <th>Question</th>
                        <th>Correct</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    <?php if (!$questionRows): ?>
                        <tr>
                            <td colspan="5">No questions yet.</td>
                        </tr>
                    <?php else: ?>
                        <?php foreach ($questionRows as $row): ?>
                            <tr>
                                <td><?php echo (int) $row['id']; ?></td>
                                <td><?php echo e($row['topic_name']); ?></td>
                                <td><?php echo e($row['question']); ?></td>
                                <td><span class="pill pill-info"><?php echo e($row['correct_answer']); ?></span></td>
                                <td>
                                    <div class="actions">
                                        <a class="btn btn-accent" href="<?php echo e(base_url('admin/questions.php?edit=' . (int) $row['id'])); ?>">Edit</a>
                                        <a class="btn btn-danger" href="<?php echo e(base_url('admin/questions.php?delete=' . (int) $row['id'])); ?>" onclick="return confirm('Delete this question?');">Delete</a>
                                    </div>
                                </td>
                            </tr>
                        <?php endforeach; ?>
                    <?php endif; ?>
                </tbody>
            </table>
        </div>
        <?php if ($totalPages > 1): ?>
            <nav class="pagination" aria-label="Question bank pagination">
                <a class="btn btn-ghost <?php echo $currentPage <= 1 ? 'is-disabled' : ''; ?>" href="<?php echo e(base_url('admin/questions.php?page=' . max(1, $currentPage - 1))); ?>">Previous</a>
                <div class="pagination-pages">
                    <?php for ($page = 1; $page <= $totalPages; $page++): ?>
                        <?php if ($page === 1 || $page === $totalPages || abs($page - $currentPage) <= 2): ?>
                            <a class="pagination-link <?php echo $page === $currentPage ? 'is-active' : ''; ?>" href="<?php echo e(base_url('admin/questions.php?page=' . $page)); ?>" aria-current="<?php echo $page === $currentPage ? 'page' : 'false'; ?>"><?php echo $page; ?></a>
                        <?php elseif (abs($page - $currentPage) === 3): ?>
                            <span class="pagination-ellipsis">...</span>
                        <?php endif; ?>
                    <?php endfor; ?>
                </div>
                <a class="btn btn-ghost <?php echo $currentPage >= $totalPages ? 'is-disabled' : ''; ?>" href="<?php echo e(base_url('admin/questions.php?page=' . min($totalPages, $currentPage + 1))); ?>">Next</a>
            </nav>
        <?php endif; ?>
    </section>
</div>

<?php render_footer(); ?>
