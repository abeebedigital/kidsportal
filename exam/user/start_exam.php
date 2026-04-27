<?php
require_once __DIR__ . '/../includes/functions.php';
require_login();
require_subscription();

$user = current_user();
$blueprintId = (int) ($_GET['blueprint_id'] ?? 0);

if ($blueprintId <= 0) {
    set_flash('error', 'Invalid blueprint selected.');
    redirect_to('user/dashboard.php');
}

$stmt = $conn->prepare('SELECT * FROM exam_blueprints WHERE id = ? LIMIT 1');
$stmt->bind_param('i', $blueprintId);
$stmt->execute();
$blueprint = $stmt->get_result()->fetch_assoc();
$stmt->close();

if (!$blueprint) {
    set_flash('error', 'Blueprint not found.');
    redirect_to('user/dashboard.php');
}

$existingStmt = $conn->prepare('
    SELECT *
    FROM user_exams
    WHERE user_id = ? AND blueprint_id = ?
    ORDER BY id DESC
    LIMIT 1
');
$existingStmt->bind_param('ii', $user['id'], $blueprintId);
$existingStmt->execute();
$existingExam = $existingStmt->get_result()->fetch_assoc();
$existingStmt->close();

if ($existingExam) {
    if ($existingExam['status'] === 'completed') {
        redirect_to('user/result.php?exam_id=' . (int) $existingExam['id']);
    }
    redirect_to('user/exam.php?exam_id=' . (int) $existingExam['id']);
}

$distribution = json_decode($blueprint['topic_distribution'], true) ?: [];
$questionIds = [];
$questionPicker = $conn->prepare('SELECT id FROM questions WHERE topic_id = ? ORDER BY RAND() LIMIT ?');

foreach ($distribution as $topicId => $count) {
    $topicId = (int) $topicId;
    $count = (int) $count;
    if ($count <= 0) {
        continue;
    }

    $questionPicker->bind_param('ii', $topicId, $count);
    $questionPicker->execute();
    $rows = $questionPicker->get_result()->fetch_all(MYSQLI_ASSOC);

    if (count($rows) < $count) {
        set_flash('error', 'Not enough questions are available for one or more topics in this blueprint.');
        redirect_to('user/dashboard.php');
    }

    foreach ($rows as $row) {
        $questionIds[] = (int) $row['id'];
    }
}
$questionPicker->close();

if (!$questionIds) {
    set_flash('error', 'This blueprint does not contain any usable questions.');
    redirect_to('user/dashboard.php');
}

shuffle($questionIds);
$questionIdText = implode(',', $questionIds);
$status = 'in_progress';
$answers = json_encode(new stdClass());
$examTimeLimit = (int) $blueprint['time_limit'];

$insertStmt = $conn->prepare('
    INSERT INTO user_exams (user_id, blueprint_id, time_limit, question_ids, answers, status)
    VALUES (?, ?, ?, ?, ?, ?)
');
$insertStmt->bind_param('iiisss', $user['id'], $blueprintId, $examTimeLimit, $questionIdText, $answers, $status);
$insertStmt->execute();
$examId = $conn->insert_id;
$insertStmt->close();

redirect_to('user/exam.php?exam_id=' . $examId);
