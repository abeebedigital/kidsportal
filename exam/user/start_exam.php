<?php
require_once __DIR__ . '/../includes/functions.php';
require_login();

$user = current_user();
$examSetId = (int) ($_GET['exam_set_id'] ?? 0);

if ($examSetId <= 0) {
    set_flash('error', 'Invalid Exam Set selected.');
    redirect_to('user/dashboard.php');
}

$stmt = $conn->prepare('SELECT * FROM exam_sets WHERE id = ? LIMIT 1');
$stmt->bind_param('i', $examSetId);
$stmt->execute();
$examSet = $stmt->get_result()->fetch_assoc();
$stmt->close();

if (!$examSet) {
    set_flash('error', 'Exam Set not found.');
    redirect_to('user/dashboard.php');
}

require_category_subscription((int) $examSet['category_id']);

$existingStmt = $conn->prepare('
    SELECT *
    FROM user_exams
    WHERE user_id = ? AND exam_set_id = ?
    ORDER BY id DESC
    LIMIT 1
');
$existingStmt->bind_param('ii', $user['id'], $examSetId);
$existingStmt->execute();
$existingExam = $existingStmt->get_result()->fetch_assoc();
$existingStmt->close();

if ($existingExam) {
    if ($existingExam['status'] === 'completed') {
        redirect_to('user/result.php?exam_id=' . (int) $existingExam['id']);
    }
    redirect_to('user/exam.php?exam_id=' . (int) $existingExam['id']);
}

$distribution = json_decode($examSet['topic_distribution'], true) ?: [];
$questionIds = [];
$questionPicker = $conn->prepare('
    SELECT q.id
    FROM questions q
    INNER JOIN topics t ON t.id = q.topic_id
    WHERE q.topic_id = ? AND t.category_id = ?
    ORDER BY RAND()
    LIMIT ?
');

foreach ($distribution as $topicId => $count) {
    $topicId = (int) $topicId;
    $count = (int) $count;
    if ($count <= 0) {
        continue;
    }

    $categoryId = (int) $examSet['category_id'];
    $questionPicker->bind_param('iii', $topicId, $categoryId, $count);
    $questionPicker->execute();
    $rows = $questionPicker->get_result()->fetch_all(MYSQLI_ASSOC);

    if (count($rows) < $count) {
        set_flash('error', 'Not enough questions are available for one or more topics in this Exam Set.');
        redirect_to('user/dashboard.php');
    }

    foreach ($rows as $row) {
        $questionIds[] = (int) $row['id'];
    }
}
$questionPicker->close();

if (!$questionIds) {
    set_flash('error', 'This Exam Set does not contain any usable questions.');
    redirect_to('user/dashboard.php');
}

shuffle($questionIds);
$questionIdText = implode(',', $questionIds);
$status = 'in_progress';
$answers = json_encode(new stdClass());
$examTimeLimit = (int) $examSet['time_limit'];

$insertStmt = $conn->prepare('
    INSERT INTO user_exams (user_id, exam_set_id, time_limit, question_ids, answers, status)
    VALUES (?, ?, ?, ?, ?, ?)
');
$insertStmt->bind_param('iiisss', $user['id'], $examSetId, $examTimeLimit, $questionIdText, $answers, $status);
$insertStmt->execute();
$examId = $conn->insert_id;
$insertStmt->close();

redirect_to('user/exam.php?exam_id=' . $examId);
