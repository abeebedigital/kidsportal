<?php
declare(strict_types=1);
require_once __DIR__ . '/../config/app.php';

ep_require_user();

$user = ep_current_user();
if (!$user) {
    ep_redirect('user/login.php');
}

$attemptId = (int) ($_GET['id'] ?? $_GET['attempt_id'] ?? 0);
if ($attemptId <= 0) {
    ep_flash_set('error', 'Attempt id is required.');
    ep_redirect('user/dashboard.php');
}

$attempt = ep_get_user_attempt_detail((int) $user['id'], $attemptId);
if (!$attempt) {
    ep_flash_set('error', 'Attempt not found.');
    ep_redirect('user/dashboard.php');
}

$status = (string) ($attempt['status'] ?? 'in_progress');
if (in_array($status, ['not_started', 'in_progress', 'paused'], true)) {
    ep_redirect('user/exam.php?attempt_id=' . $attemptId);
}

ep_redirect('user/result.php?attempt_id=' . $attemptId);
