<?php
require_once __DIR__ . '/../includes/functions.php';
require_login();

$user = current_user();
$examId = (int) ($_POST['exam_id'] ?? 0);
$answersJson = $_POST['answers_json'] ?? '{}';
$decodedAnswers = json_decode($answersJson, true);

if (!is_array($decodedAnswers)) {
    $decodedAnswers = [];
}

$stmt = $conn->prepare('
    SELECT ue.*, eb.time_limit
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

$score = 0;
foreach ($questions as $question) {
    $questionId = (string) $question['id'];
    $selected = strtoupper(trim($decodedAnswers[$questionId] ?? ''));
    if ($selected === strtoupper($question['correct_answer'])) {
        $score++;
    }
}

$status = 'completed';
$answersToSave = json_encode($decodedAnswers);
$updateStmt = $conn->prepare('
    UPDATE user_exams
    SET answers = ?, score = ?, status = ?, completed_at = NOW()
    WHERE id = ? AND user_id = ?
');
$updateStmt->bind_param('sisii', $answersToSave, $score, $status, $examId, $user['id']);
$updateStmt->execute();
$updateStmt->close();

redirect_to('user/result.php?exam_id=' . $examId);

