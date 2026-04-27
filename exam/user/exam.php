<?php
require_once __DIR__ . '/../includes/functions.php';
require_login();

$user = current_user();
$examId = (int) ($_GET['exam_id'] ?? 0);

$stmt = $conn->prepare('
    SELECT
        ue.*,
        eb.title AS blueprint_title,
        eb.time_limit AS blueprint_time_limit,
        CASE
            WHEN TIMESTAMPDIFF(SECOND, ue.started_at, NOW()) >= (COALESCE(NULLIF(ue.time_limit, 0), eb.time_limit) * 60)
                THEN 0
            ELSE ((COALESCE(NULLIF(ue.time_limit, 0), eb.time_limit) * 60) - TIMESTAMPDIFF(SECOND, ue.started_at, NOW()))
        END AS remaining_seconds
    FROM user_exams ue
    INNER JOIN exam_blueprints eb ON eb.id = ue.blueprint_id
    WHERE ue.id = ? AND ue.user_id = ?
    LIMIT 1
');
$stmt->bind_param('ii', $examId, $user['id']);
$stmt->execute();
$exam = $stmt->get_result()->fetch_assoc();
$stmt->close();

if (!$exam) {
    set_flash('error', 'Exam not found.');
    redirect_to('user/dashboard.php');
}

if ($exam['status'] === 'completed') {
    redirect_to('user/result.php?exam_id=' . (int) $exam['id']);
}

$questionIds = question_ids_from_text($exam['question_ids']);
$questions = fetch_questions_by_ids($questionIds);

if (!$questions) {
    set_flash('error', 'No questions were found for this exam.');
    redirect_to('user/dashboard.php');
}

$initialAnswers = json_decode($exam['answers'] ?? '{}', true);
if (!is_array($initialAnswers)) {
    $initialAnswers = [];
}

$effectiveTimeLimit = (int) $exam['time_limit'] > 0 ? (int) $exam['time_limit'] : (int) $exam['blueprint_time_limit'];
$remainingSeconds = max(0, (int) $exam['remaining_seconds']);

render_header('Exam Runner', 'user');
?>

<form id="examForm" method="post" action="<?php echo e(base_url('user/submit_exam.php')); ?>">
    <input type="hidden" name="exam_id" value="<?php echo (int) $exam['id']; ?>">
    <input type="hidden" name="answers_json" id="answersJson" value="<?php echo e(json_encode($initialAnswers)); ?>">

    <div class="exam-layout">
        <section class="exam-main">
            <div class="question-nav">
                <div class="status-row">
                    <span class="pill pill-info"><?php echo e($exam['blueprint_title']); ?></span>
                    <span class="pill pill-warning"><?php echo count($questions); ?> questions</span>
                    <span class="pill pill-success"><?php echo $effectiveTimeLimit; ?> mins</span>
                </div>
            </div>

            <div class="question-panel" style="margin-top:18px;">
                <?php foreach ($questions as $index => $question): ?>
                    <article class="question-pane <?php echo $index === 0 ? 'is-active' : ''; ?>" data-question-id="<?php echo (int) $question['id']; ?>">
                        <div class="question-header">
                            <span class="question-label">Question <?php echo $index + 1; ?> of <?php echo count($questions); ?></span>
                            <span class="pill pill-info"><?php echo e($question['topic_name']); ?></span>
                        </div>
                        <h2 class="exam-question-title"><?php echo e($question['question']); ?></h2>
                        <div class="options-grid">
                            <?php foreach (['A', 'B', 'C', 'D'] as $optionKey): ?>
                                <?php $optionField = 'option_' . strtolower($optionKey); ?>
                                <div class="option-card">
                                    <input
                                        type="radio"
                                        id="question-<?php echo (int) $question['id']; ?>-<?php echo strtolower($optionKey); ?>"
                                        name="question_<?php echo (int) $question['id']; ?>"
                                        value="<?php echo $optionKey; ?>"
                                        <?php echo (($initialAnswers[(string) $question['id']] ?? '') === $optionKey) ? 'checked' : ''; ?>
                                    >
                                    <label for="question-<?php echo (int) $question['id']; ?>-<?php echo strtolower($optionKey); ?>">
                                        <strong><?php echo $optionKey; ?>.</strong> <?php echo e($question[$optionField]); ?>
                                    </label>
                                </div>
                            <?php endforeach; ?>
                        </div>
                    </article>
                <?php endforeach; ?>
                <div class="actions question-actions">
                    <button class="btn btn-ghost" type="button" id="prevQuestionBtn">Previous</button>
                    <button class="btn btn-accent" type="button" id="nextQuestionBtn">Next</button>
                </div>
            </div>
        </section>

        <aside class="exam-sidebar">
            <section class="timer-card">
                <h2>Timer</h2>
                <div id="examTimer" class="timer">00:00</div>
                <p class="timer-note">When the timer reaches zero the exam will submit automatically.</p>
            </section>

            <section class="result-detail">
                <h2>Question Palette</h2>
                <div class="palette-grid">
                    <?php foreach ($questions as $index => $question): ?>
                        <button
                            class="palette-btn"
                            type="button"
                            data-index="<?php echo $index; ?>"
                            data-question-id="<?php echo (int) $question['id']; ?>"
                        >
                            <?php echo $index + 1; ?>
                        </button>
                    <?php endforeach; ?>
                </div>
            </section>

            <button class="btn btn-primary btn-block" type="submit" id="submitExamBtn">Submit Exam</button>
        </aside>
    </div>
</form>

<script>
window.examConfig = {
    examId: <?php echo (int) $exam['id']; ?>,
    remainingSeconds: <?php echo (int) $remainingSeconds; ?>,
    initialAnswers: <?php echo json_encode($initialAnswers, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES); ?>
};
</script>

<?php render_footer(); ?>
