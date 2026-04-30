<?php
require_once __DIR__ . '/db.php';

if (session_status() === PHP_SESSION_NONE) {
    $sessionPath = dirname(__DIR__) . '/tmp_sessions';
    if (!is_dir($sessionPath)) {
        mkdir($sessionPath, 0777, true);
    }
    session_save_path($sessionPath);
    session_start();
}

function current_user()
{
    global $conn;

    if (empty($_SESSION['user_id'])) {
        return null;
    }

    static $cachedUser = null;
    static $cachedUserId = null;

    if ($cachedUserId === (int) $_SESSION['user_id'] && $cachedUser !== null) {
        return $cachedUser;
    }

    $userId = (int) $_SESSION['user_id'];
    $stmt = $conn->prepare('SELECT * FROM users WHERE id = ? LIMIT 1');
    $stmt->bind_param('i', $userId);
    $stmt->execute();
    $result = $stmt->get_result();
    $cachedUser = $result->fetch_assoc() ?: null;
    $cachedUserId = $userId;
    $stmt->close();

    if (!$cachedUser) {
        unset($_SESSION['user_id']);
    }

    return $cachedUser;
}

function current_admin()
{
    global $conn;

    if (empty($_SESSION['admin_user_id'])) {
        return null;
    }

    static $cachedAdmin = null;
    static $cachedAdminId = null;

    if ($cachedAdminId === (int) $_SESSION['admin_user_id'] && $cachedAdmin !== null) {
        return $cachedAdmin;
    }

    $adminId = (int) $_SESSION['admin_user_id'];
    $stmt = $conn->prepare('SELECT * FROM admin_users WHERE id = ? LIMIT 1');
    $stmt->bind_param('i', $adminId);
    $stmt->execute();
    $result = $stmt->get_result();
    $cachedAdmin = $result->fetch_assoc() ?: null;
    $cachedAdminId = $adminId;
    $stmt->close();

    if (!$cachedAdmin) {
        unset($_SESSION['admin_user_id']);
    }

    return $cachedAdmin;
}

function require_login()
{
    if (!current_user()) {
        $_SESSION['flash_error'] = 'Please log in to continue.';
        header('Location: ' . base_url('user/login.php'));
        exit;
    }
}

function require_admin_login()
{
    if (!current_admin()) {
        $_SESSION['flash_error'] = 'Please log in as admin to continue.';
        header('Location: ' . base_url('admin/login.php'));
        exit;
    }
}

function require_subscription()
{
    $user = current_user();
    if (!$user || (int) $user['is_subscribed'] !== 1) {
        $_SESSION['flash_error'] = 'A subscribed account is required to start an exam.';
        header('Location: ' . base_url('user/dashboard.php'));
        exit;
    }
}

function require_category_subscription($categoryId)
{
    $user = current_user();
    if (!$user || !user_has_category_subscription((int) $user['id'], (int) $categoryId)) {
        $_SESSION['flash_error'] = 'Your subscription does not include this exam category.';
        header('Location: ' . base_url('user/dashboard.php'));
        exit;
    }
}
