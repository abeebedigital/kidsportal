<?php
require_once __DIR__ . '/../includes/functions.php';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $name = trim($_POST['name'] ?? '');
    $email = trim($_POST['email'] ?? '');
    $password = $_POST['password'] ?? '';
    $confirmPassword = $_POST['confirm_password'] ?? '';

    if ($name === '' || $email === '' || $password === '' || $confirmPassword === '') {
        set_flash('error', 'Please complete every registration field.');
        redirect_to('user/register.php');
    }

    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        set_flash('error', 'Please enter a valid email address.');
        redirect_to('user/register.php');
    }

    if (strlen($password) < 6) {
        set_flash('error', 'Password must be at least 6 characters long.');
        redirect_to('user/register.php');
    }

    if ($password !== $confirmPassword) {
        set_flash('error', 'Passwords do not match.');
        redirect_to('user/register.php');
    }

    $checkStmt = $conn->prepare('SELECT id FROM users WHERE email = ? LIMIT 1');
    $checkStmt->bind_param('s', $email);
    $checkStmt->execute();
    $existingUser = $checkStmt->get_result()->fetch_assoc();
    $checkStmt->close();

    if ($existingUser) {
        set_flash('error', 'An account already exists with that email.');
        redirect_to('user/register.php');
    }

    $passwordHash = password_hash($password, PASSWORD_DEFAULT);
    $isActive = 1;
    $isSubscribed = 0;
    $insertStmt = $conn->prepare('INSERT INTO users (name, email, password, is_active, is_subscribed) VALUES (?, ?, ?, ?, ?)');
    $insertStmt->bind_param('sssii', $name, $email, $passwordHash, $isActive, $isSubscribed);
    $insertStmt->execute();
    $insertStmt->close();

    set_flash('success', 'Registration successful. You can now log in.');
    redirect_to('user/login.php');
}

if (current_user()) {
    redirect_to('user/dashboard.php');
}

render_header('Register', 'user');
?>

<section class="card login-card">
    <h2>Create User Account</h2>
    <p class="muted">New users are active by default. Admin can later switch accounts to active or inactive.</p>
    <form method="post" class="form-grid">
        <div class="form-row">
            <label for="name">Full Name</label>
            <input id="name" type="text" name="name" placeholder="Your full name" required>
        </div>
        <div class="form-row">
            <label for="email">Email</label>
            <input id="email" type="email" name="email" placeholder="you@example.com" required>
        </div>
        <div class="inline-grid">
            <div class="form-row">
                <label for="password">Password</label>
                <input id="password" type="password" name="password" placeholder="Minimum 6 characters" required>
            </div>
            <div class="form-row">
                <label for="confirmPassword">Confirm Password</label>
                <input id="confirmPassword" type="password" name="confirm_password" placeholder="Repeat password" required>
            </div>
        </div>
        <div class="actions">
            <button class="btn btn-primary btn-block" type="submit">Register</button>
        </div>
    </form>
    <div class="card" style="margin-top:16px;">
        <p class="muted">Already have an account? <a href="<?php echo e(base_url('user/login.php')); ?>">Go to login</a>.</p>
    </div>
</section>

<?php render_footer(); ?>

