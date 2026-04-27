<?php
declare(strict_types=1);

if (!function_exists('ep_start_session')) {
    function ep_start_session(): void
    {
        if (session_status() === PHP_SESSION_ACTIVE) {
            return;
        }

        $sessionDir = __DIR__ . '/../tmp_sessions';
        if (!is_dir($sessionDir)) {
            mkdir($sessionDir, 0777, true);
        }

        session_name('EPSESSID');
        session_save_path($sessionDir);
        session_set_cookie_params([
            'lifetime' => 0,
            'path' => '/',
            'httponly' => true,
            'samesite' => 'Lax',
        ]);

        session_start();
    }
}

if (!function_exists('ep_bootstrap_app')) {
    function ep_bootstrap_app(): void
    {
        ep_start_session();
        ep_bootstrap_schema();
    }
}

if (!function_exists('ep_redirect')) {
    function ep_redirect(string $path): never
    {
        $target = $path;
        if (!str_starts_with($path, '/')) {
            $target = examportal_url($path);
        }

        header('Location: ' . $target);
        exit;
    }
}

if (!function_exists('ep_csrf_token')) {
    function ep_csrf_token(): string
    {
        ep_start_session();

        if (empty($_SESSION['ep_csrf_token'])) {
            $_SESSION['ep_csrf_token'] = bin2hex(random_bytes(32));
        }

        return (string) $_SESSION['ep_csrf_token'];
    }
}

if (!function_exists('ep_verify_csrf_token')) {
    function ep_verify_csrf_token(?string $token): bool
    {
        if (!is_string($token) || $token === '') {
            return false;
        }

        $sessionToken = (string) ($_SESSION['ep_csrf_token'] ?? '');
        if ($sessionToken === '') {
            return false;
        }

        return hash_equals($sessionToken, $token);
    }
}

if (!function_exists('ep_flash_set')) {
    function ep_flash_set(string $type, string $message): void
    {
        $_SESSION['ep_flash_' . $type] = $message;
    }
}

if (!function_exists('ep_flash_get')) {
    function ep_flash_get(string $type): ?string
    {
        $key = 'ep_flash_' . $type;
        if (!isset($_SESSION[$key])) {
            return null;
        }

        $message = (string) $_SESSION[$key];
        unset($_SESSION[$key]);

        return $message;
    }
}

if (!function_exists('ep_current_user')) {
    function ep_current_user(): ?array
    {
        static $resolved = false;
        static $cachedUser = null;

        if ($resolved) {
            return $cachedUser;
        }

        $resolved = true;

        $userId = (int) ($_SESSION['ep_user_id'] ?? 0);
        if ($userId <= 0) {
            return null;
        }

        $stmt = ep_db()->prepare('SELECT id, name, email, role, is_active, created_at, last_login_at FROM ep_users WHERE id = ? LIMIT 1');
        $stmt->bind_param('i', $userId);
        $stmt->execute();
        $user = $stmt->get_result()->fetch_assoc();
        $stmt->close();

        if (!$user || (int) $user['is_active'] !== 1) {
            unset($_SESSION['ep_user_id']);
            return null;
        }

        $cachedUser = $user;
        ep_touch_auth_session($userId);

        return $cachedUser;
    }
}

if (!function_exists('ep_user_role')) {
    function ep_user_role(): string
    {
        $user = ep_current_user();
        if (!$user) {
            return 'guest';
        }

        $role = (string) ($user['role'] ?? 'user');
        return in_array($role, ['user', 'admin'], true) ? $role : 'user';
    }
}

if (!function_exists('ep_is_admin')) {
    function ep_is_admin(): bool
    {
        return ep_user_role() === 'admin';
    }
}

if (!function_exists('ep_is_logged_in')) {
    function ep_is_logged_in(): bool
    {
        return ep_current_user() !== null;
    }
}

if (!function_exists('ep_record_auth_session')) {
    function ep_record_auth_session(int $userId): void
    {
        $sessionToken = hash('sha256', session_id());
        $userAgent = substr((string) ($_SERVER['HTTP_USER_AGENT'] ?? 'unknown'), 0, 255);
        $ipAddress = substr((string) ($_SERVER['REMOTE_ADDR'] ?? ''), 0, 45);
        $lastSeenAt = gmdate('Y-m-d H:i:s');

        $stmt = ep_db()->prepare(
            'INSERT INTO ep_auth_sessions (user_id, session_token, ip_address, user_agent, last_seen_at, revoked_at)
             VALUES (?, ?, ?, ?, ?, NULL)
             ON DUPLICATE KEY UPDATE
               user_id = VALUES(user_id),
               ip_address = VALUES(ip_address),
               user_agent = VALUES(user_agent),
               last_seen_at = VALUES(last_seen_at),
               revoked_at = NULL'
        );
        $stmt->bind_param('issss', $userId, $sessionToken, $ipAddress, $userAgent, $lastSeenAt);
        $stmt->execute();
        $stmt->close();
    }
}

if (!function_exists('ep_touch_auth_session')) {
    function ep_touch_auth_session(int $userId): void
    {
        $sessionToken = hash('sha256', session_id());
        $lastSeenAt = gmdate('Y-m-d H:i:s');

        $stmt = ep_db()->prepare(
            'UPDATE ep_auth_sessions
             SET last_seen_at = ?, revoked_at = NULL
             WHERE user_id = ? AND session_token = ?'
        );
        $stmt->bind_param('sis', $lastSeenAt, $userId, $sessionToken);
        $stmt->execute();
        $stmt->close();
    }
}

if (!function_exists('ep_login_user')) {
    function ep_login_user(int $userId): void
    {
        session_regenerate_id(true);
        $_SESSION['ep_user_id'] = $userId;
        ep_record_auth_session($userId);
    }
}

if (!function_exists('ep_logout_user')) {
    function ep_logout_user(): void
    {
        $userId = (int) ($_SESSION['ep_user_id'] ?? 0);
        if ($userId > 0) {
            $sessionToken = hash('sha256', session_id());
            $revokedAt = gmdate('Y-m-d H:i:s');

            $stmt = ep_db()->prepare('UPDATE ep_auth_sessions SET revoked_at = ? WHERE user_id = ? AND session_token = ?');
            $stmt->bind_param('sis', $revokedAt, $userId, $sessionToken);
            $stmt->execute();
            $stmt->close();
        }

        $_SESSION = [];
        session_destroy();
        ep_start_session();
    }
}

if (!function_exists('ep_attempt_login')) {
    function ep_attempt_login(string $email, string $password): array
    {
        $email = strtolower(trim($email));
        if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
            return ['ok' => false, 'message' => 'Enter a valid email address.'];
        }

        if ($password === '') {
            return ['ok' => false, 'message' => 'Enter your password.'];
        }

        $stmt = ep_db()->prepare('SELECT id, role, password_hash, is_active FROM ep_users WHERE email = ? LIMIT 1');
        $stmt->bind_param('s', $email);
        $stmt->execute();
        $user = $stmt->get_result()->fetch_assoc();
        $stmt->close();

        if (!$user || (int) $user['is_active'] !== 1) {
            return ['ok' => false, 'message' => 'Invalid login credentials.'];
        }

        if (!password_verify($password, (string) $user['password_hash'])) {
            return ['ok' => false, 'message' => 'Invalid login credentials.'];
        }

        $userId = (int) $user['id'];
        $now = gmdate('Y-m-d H:i:s');
        $update = ep_db()->prepare('UPDATE ep_users SET last_login_at = ? WHERE id = ?');
        $update->bind_param('si', $now, $userId);
        $update->execute();
        $update->close();

        ep_login_user($userId);

        $role = (string) ($user['role'] ?? 'user');
        if (!in_array($role, ['user', 'admin'], true)) {
            $role = 'user';
        }

        return ['ok' => true, 'user_id' => $userId, 'role' => $role];
    }
}

if (!function_exists('ep_register_user')) {
    function ep_register_user(string $name, string $email, string $password, string $confirmPassword): array
    {
        $name = trim($name);
        $email = strtolower(trim($email));

        if (strlen($name) < 2) {
            return ['ok' => false, 'message' => 'Name should be at least 2 characters.'];
        }

        if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
            return ['ok' => false, 'message' => 'Enter a valid email address.'];
        }

        if (strlen($password) < 8) {
            return ['ok' => false, 'message' => 'Password should be at least 8 characters.'];
        }

        if ($password !== $confirmPassword) {
            return ['ok' => false, 'message' => 'Password and confirm password do not match.'];
        }

        $check = ep_db()->prepare('SELECT id FROM ep_users WHERE email = ? LIMIT 1');
        $check->bind_param('s', $email);
        $check->execute();
        $existing = $check->get_result()->fetch_assoc();
        $check->close();

        if ($existing) {
            return ['ok' => false, 'message' => 'This email is already registered. Please login.'];
        }

        $hash = password_hash($password, PASSWORD_DEFAULT);
        $role = 'user';
        $insert = ep_db()->prepare('INSERT INTO ep_users (name, email, role, password_hash, is_active) VALUES (?, ?, ?, ?, 1)');
        $insert->bind_param('ssss', $name, $email, $role, $hash);
        $insert->execute();
        $userId = (int) ep_db()->insert_id;
        $insert->close();

        return ['ok' => true, 'user_id' => $userId];
    }
}

if (!function_exists('ep_mark_expired_subscriptions')) {
    function ep_mark_expired_subscriptions(): void
    {
        static $done = false;
        if ($done) {
            return;
        }

        $done = true;
        ep_db()->query("UPDATE ep_user_subscriptions SET status = 'expired' WHERE status = 'active' AND expires_at IS NOT NULL AND expires_at <= UTC_TIMESTAMP()");
    }
}

if (!function_exists('ep_get_active_subscription_for_user')) {
    function ep_get_active_subscription_for_user(int $userId): ?array
    {
        ep_mark_expired_subscriptions();

        $stmt = ep_db()->prepare(
            "SELECT s.id, s.user_id, s.plan_id, s.status, s.started_at, s.expires_at, s.papers_used,
                    p.name AS plan_name, p.slug AS plan_slug, p.max_papers_per_cycle, p.duration_days, p.price_aud
             FROM ep_user_subscriptions s
             INNER JOIN ep_subscription_plans p ON p.id = s.plan_id
             WHERE s.user_id = ?
               AND s.status = 'active'
               AND s.expires_at > UTC_TIMESTAMP()
             ORDER BY s.expires_at DESC, s.id DESC
             LIMIT 1"
        );
        $stmt->bind_param('i', $userId);
        $stmt->execute();
        $row = $stmt->get_result()->fetch_assoc();
        $stmt->close();

        return $row ?: null;
    }
}

if (!function_exists('ep_user_has_active_subscription')) {
    function ep_user_has_active_subscription(int $userId): bool
    {
        return ep_get_active_subscription_for_user($userId) !== null;
    }
}

if (!function_exists('ep_subscription_remaining_papers')) {
    function ep_subscription_remaining_papers(array $subscription): int
    {
        $limit = (int) ($subscription['max_papers_per_cycle'] ?? 0);
        $used = (int) ($subscription['papers_used'] ?? 0);

        if ($limit <= 0) {
            return 0;
        }

        return max(0, $limit - $used);
    }
}

if (!function_exists('ep_get_available_plans')) {
    function ep_get_available_plans(): array
    {
        $result = ep_db()->query(
            'SELECT id, name, slug, description, max_papers_per_cycle, duration_days, price_aud
             FROM ep_subscription_plans
             WHERE is_active = 1
             ORDER BY price_aud ASC, id ASC'
        );

        return $result->fetch_all(MYSQLI_ASSOC);
    }
}

if (!function_exists('ep_activate_subscription')) {
    function ep_activate_subscription(int $userId, int $planId): array
    {
        $planStmt = ep_db()->prepare('SELECT id, duration_days FROM ep_subscription_plans WHERE id = ? AND is_active = 1 LIMIT 1');
        $planStmt->bind_param('i', $planId);
        $planStmt->execute();
        $plan = $planStmt->get_result()->fetch_assoc();
        $planStmt->close();

        if (!$plan) {
            return ['ok' => false, 'message' => 'Selected plan is not available.'];
        }

        $durationDays = max(1, (int) $plan['duration_days']);
        $startedAt = gmdate('Y-m-d H:i:s');
        $expiresAt = gmdate('Y-m-d H:i:s', time() + ($durationDays * 86400));
        $status = 'active';
        $cancelled = 'cancelled';

        ep_db()->begin_transaction();
        try {
            $closeOld = ep_db()->prepare("UPDATE ep_user_subscriptions SET status = ? WHERE user_id = ? AND status = 'active'");
            $closeOld->bind_param('si', $cancelled, $userId);
            $closeOld->execute();
            $closeOld->close();

            $insert = ep_db()->prepare(
                'INSERT INTO ep_user_subscriptions (user_id, plan_id, status, started_at, expires_at, papers_used)
                 VALUES (?, ?, ?, ?, ?, 0)'
            );
            $insert->bind_param('iisss', $userId, $planId, $status, $startedAt, $expiresAt);
            $insert->execute();
            $insert->close();

            ep_db()->commit();
        } catch (Throwable $exception) {
            ep_db()->rollback();
            return ['ok' => false, 'message' => 'Unable to activate subscription right now. Please try again.'];
        }

        return ['ok' => true, 'message' => 'Subscription activated successfully.'];
    }
}

if (!function_exists('ep_require_login')) {
    function ep_require_login(): void
    {
        if (ep_is_logged_in()) {
            return;
        }

        ep_flash_set('error', 'Please login to continue.');
        ep_redirect('user/login.php');
    }
}

if (!function_exists('ep_require_user')) {
    function ep_require_user(): void
    {
        ep_require_login();
        if (ep_is_admin()) {
            ep_flash_set('error', 'This section is available only for learner accounts.');
            ep_redirect('admin/index.php');
        }
    }
}

if (!function_exists('ep_require_subscription')) {
    function ep_require_subscription(): void
    {
        ep_require_user();
        $user = ep_current_user();
        if (!$user) {
            ep_redirect('user/login.php');
        }

        if (ep_user_has_active_subscription((int) $user['id'])) {
            return;
        }

        ep_flash_set('error', 'An active paid subscription is required to access question papers.');
        ep_redirect('user/subscribe.php');
    }
}

if (!function_exists('ep_require_admin')) {
    function ep_require_admin(): void
    {
        ep_require_login();
        if (ep_is_admin()) {
            return;
        }

        ep_flash_set('error', 'Admin access is restricted to administrator accounts.');
        ep_redirect('user/dashboard.php');
    }
}
