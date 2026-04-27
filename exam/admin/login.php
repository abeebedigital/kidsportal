<?php
require_once __DIR__ . '/../includes/functions.php';

if (($_GET['action'] ?? '') === 'logout') {
    unset($_SESSION['admin_user_id']);
    set_flash('success', 'Admin session closed.');
    redirect_to('admin/login.php');
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $email = trim($_POST['email'] ?? '');
    $password = $_POST['password'] ?? '';

    $stmt = $conn->prepare('SELECT * FROM admin_users WHERE email = ? LIMIT 1');
    $stmt->bind_param('s', $email);
    $stmt->execute();
    $admin = $stmt->get_result()->fetch_assoc();
    $stmt->close();

    if ($admin && password_verify($password, $admin['password'])) {
        $_SESSION['admin_user_id'] = (int) $admin['id'];
        set_flash('success', 'Welcome to the admin area, ' . $admin['name'] . '!');
        redirect_to('admin/topics.php');
    }

    set_flash('error', 'Invalid admin email or password.');
    redirect_to('admin/login.php');
}

if (current_admin()) {
    redirect_to('admin/topics.php');
}

render_header('Admin Login', 'admin');
?>

<section class="card login-card">
    <h2>Admin Login</h2>
    <p class="muted">Only logged-in admins can access the admin pages inside this exam system.</p>
    <form method="post" class="form-grid">
        <div class="form-row">
            <label for="email">Admin Email</label>
            <input id="email" type="email" name="email" placeholder="admin@kids.com" required>
        </div>
        <div class="form-row">
            <label for="password">Password</label>
            <input id="password" type="password" name="password" placeholder="admin123" required>
        </div>
        <div class="actions">
            <button class="btn btn-primary btn-block" type="submit">Login as Admin</button>
        </div>
    </form>
    <div class="card" style="margin-top:16px;">
        <h2>Default Admin</h2>
        <p class="muted">Email: <strong>admin@kids.com</strong></p>
        <p class="muted">Password: <strong>admin123</strong></p>
    </div>
</section>

<?php render_footer(); ?>
