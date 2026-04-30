<?php
require_once __DIR__ . '/../includes/functions.php';
require_login();

$user = current_user();
$examId = (int) ($_GET['exam_id'] ?? 0);

$stmt = $conn->prepare('
    SELECT ue.*, eb.title AS exam_set_title, eb.time_limit, eb.category_id
    FROM user_exams ue
    INNER JOIN exam_sets eb ON eb.id = ue.exam_set_id
    WHERE ue.id = ? AND ue.user_id = ?
    LIMIT 1
');
$stmt->bind_param('ii', $examId, $user['id']);
$stmt->execute();
$exam = $stmt->get_result()->fetch_assoc();
$stmt->close();

if (!$exam) {
    set_flash('error', 'Result not found.');
    redirect_to('user/dashboard.php');
}

require_category_subscription((int) $exam['category_id']);

if ($exam['status'] !== 'completed') {
    redirect_to('user/exam.php?exam_id=' . (int) $exam['id']);
}

$questionIds = question_ids_from_text($exam['question_ids']);
$questions = fetch_questions_by_ids($questionIds);
$answers = json_decode($exam['answers'] ?? '{}', true);
if (!is_array($answers)) {
    $answers = [];
}

$totalQuestions = count($questions);
$correct = 0;
$wrong = 0;

foreach ($questions as $question) {
    $selected = strtoupper(trim($answers[(string) $question['id']] ?? ''));
    if ($selected === strtoupper($question['correct_answer'])) {
        $correct++;
    } else {
        $wrong++;
    }
}

function result_answer_label($answerKey, array $question)
{
    $answerKey = strtoupper(trim((string) $answerKey));
    if ($answerKey === '' || !in_array($answerKey, ['A', 'B', 'C', 'D'], true)) {
        return 'Not answered';
    }

    $optionField = 'option_' . strtolower($answerKey);
    $optionText = trim((string) ($question[$optionField] ?? ''));
    return $optionText !== '' ? $answerKey . ' - ' . $optionText : $answerKey;
}

render_header('Result', 'user');
?>

<section class="summary-box card">
    <div class="status-row">
        <span class="pill pill-info"><?php echo e($exam['exam_set_title']); ?></span>
        <span class="pill pill-success">Completed</span>
    </div>
    <h2>Your Score: <?php echo (int) $exam['score']; ?> / <?php echo $totalQuestions; ?></h2>
    <div class="result-grid">
        <article class="metric">
            <strong><?php echo $totalQuestions; ?></strong>
            <span>Total Questions</span>
        </article>
        <article class="metric">
            <strong><?php echo $correct; ?></strong>
            <span>Correct Answers</span>
        </article>
        <article class="metric">
            <strong><?php echo $wrong; ?></strong>
            <span>Wrong Answers</span>
        </article>
    </div>
    <div class="actions">
        <a class="btn btn-accent" href="<?php echo e(base_url('user/dashboard.php')); ?>">Back to Dashboard</a>
    </div>
</section>

<section class="result-detail">
    <h2>Question Review</h2>
    <div class="detail-list">
        <?php foreach ($questions as $index => $question): ?>
            <?php
            $selected = strtoupper(trim($answers[(string) $question['id']] ?? ''));
            $isCorrect = $selected === strtoupper($question['correct_answer']);
            ?>
            <article class="detail-item">
                <div class="status-row" style="margin-bottom:10px;">
                    <span class="question-label">Question <?php echo $index + 1; ?></span>
                    <span class="pill <?php echo $isCorrect ? 'pill-success' : 'pill-danger'; ?>">
                        <?php echo $isCorrect ? 'Correct' : 'Wrong'; ?>
                    </span>
                </div>
                <h3><?php echo e($question['question']); ?></h3>
                <div class="review-options">
                    <?php foreach (['A', 'B', 'C', 'D'] as $optionKey): ?>
                        <?php
                        $optionField = 'option_' . strtolower($optionKey);
                        $optionClasses = ['review-option'];
                        if ($optionKey === $selected) {
                            $optionClasses[] = 'is-selected';
                        }
                        if ($optionKey === strtoupper($question['correct_answer'])) {
                            $optionClasses[] = 'is-correct';
                        }
                        ?>
                        <div class="<?php echo e(implode(' ', $optionClasses)); ?>">
                            <strong><?php echo $optionKey; ?>.</strong>
                            <span><?php echo e($question[$optionField]); ?></span>
                        </div>
                    <?php endforeach; ?>
                </div>
                <p><strong>Your answer:</strong> <?php echo e(result_answer_label($selected, $question)); ?></p>
                <p><strong>Correct answer:</strong> <?php echo e(result_answer_label($question['correct_answer'], $question)); ?></p>
                <p><strong>Explanation:</strong> <?php echo e($question['explanation'] ?: 'No explanation provided.'); ?></p>
            </article>
        <?php endforeach; ?>
    </div>
</section>

<script>
try {
    localStorage.removeItem('kids_exam_answers_<?php echo (int) $exam['id']; ?>');
} catch (error) {
    // Ignore localStorage clear failures.
}
</script>

<?php render_footer(); ?>
