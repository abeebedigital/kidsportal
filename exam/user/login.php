<?php
require_once __DIR__ . '/../includes/functions.php';

if (($_GET['action'] ?? '') === 'logout') {
    $_SESSION = [];
    if (ini_get('session.use_cookies')) {
        $params = session_get_cookie_params();
        setcookie(session_name(), '', time() - 42000, $params['path'], $params['domain'], $params['secure'], $params['httponly']);
    }
    session_destroy();
    session_start();
    set_flash('success', 'You have been logged out.');
    redirect_to('user/login.php');
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $email = trim($_POST['email'] ?? '');
    $password = $_POST['password'] ?? '';

    $stmt = $conn->prepare('SELECT * FROM users WHERE email = ? LIMIT 1');
    $stmt->bind_param('s', $email);
    $stmt->execute();
    $user = $stmt->get_result()->fetch_assoc();
    $stmt->close();

    if ($user && password_verify($password, $user['password'])) {
        if ((int) $user['is_active'] !== 1) {
            set_flash('error', 'Your account is inactive. Please contact the admin.');
            redirect_to('user/login.php');
        }
        $_SESSION['user_id'] = (int) $user['id'];
        set_flash('success', 'Welcome back, ' . $user['name'] . '!');
        redirect_to('user/dashboard.php');
    }

    set_flash('error', 'Invalid email or password.');
    redirect_to('user/login.php');
}

if (current_user()) {
    redirect_to('user/dashboard.php');
}

render_header('Login', 'user');
?>

<section class="card login-card">
    <h2>Student Login</h2>
    <p class="muted">Use a subscribed account to unlock exams. A demo subscribed user is already created for local testing.</p>
    <form method="post" class="form-grid">
        <div class="form-row">
            <label for="email">Email</label>
            <input id="email" type="email" name="email" placeholder="demo@kids.com" required>
        </div>
        <div class="form-row">
            <label for="password">Password</label>
            <input id="password" type="password" name="password" placeholder="demo123" required>
        </div>
    <div class="actions">
            <button class="btn btn-primary btn-block" type="submit">Login</button>
        </div>
    </form>
    <div class="card" style="margin-top:16px;">
        <h2>Demo Credentials</h2>
        <p class="muted">Email: <strong>demo@kids.com</strong></p>
        <p class="muted">Password: <strong>demo123</strong></p>
        <p class="muted" style="margin-top:8px;">Need a new account? <a href="<?php echo e(base_url('user/register.php')); ?>">Register here</a>.</p>
    </div>
</section>

<?php render_footer(); ?>
