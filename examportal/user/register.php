<?php
declare(strict_types=1);
require_once __DIR__ . '/../config/app.php';

if (ep_is_logged_in()) {
    ep_redirect(ep_is_admin() ? 'admin/index.php' : 'user/dashboard.php');
}

$form = [
    'name' => '',
    'email' => '',
];
$error = null;

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $form['name'] = trim((string) ($_POST['name'] ?? ''));
    $form['email'] = trim((string) ($_POST['email'] ?? ''));
    $password = (string) ($_POST['password'] ?? '');
    $confirmPassword = (string) ($_POST['confirm_password'] ?? '');
    $csrfToken = $_POST['csrf_token'] ?? null;

    if (!ep_verify_csrf_token(is_string($csrfToken) ? $csrfToken : null)) {
        $error = 'Session validation failed. Please refresh and submit again.';
    } else {
        $registration = ep_register_user($form['name'], $form['email'], $password, $confirmPassword);
        if (!($registration['ok'] ?? false)) {
            $error = (string) ($registration['message'] ?? 'Unable to register right now.');
        } else {
            ep_login_user((int) $registration['user_id']);
            ep_flash_set('success', 'Registration complete. Choose your subscription plan to continue.');
            ep_redirect('user/subscribe.php');
        }
    }
}

ep_render_page_start([
    'title' => 'Register',
    'active' => 'register',
    'hero_kicker' => 'New Subscriber',
    'hero_title' => 'Create Account',
    'hero_text' => 'Create your account, then activate a paid plan to unlock model question papers.',
]);
?>

<?php if ($error !== null): ?>
  <div class="alerts">
    <div class="alert alert-error"><?= h($error); ?></div>
  </div>
<?php endif; ?>

<section class="panel">
  <form method="post" class="form-grid">
    <input type="hidden" name="csrf_token" value="<?= h(ep_csrf_token()); ?>">

    <label for="name">Full Name</label>
    <input id="name" type="text" name="name" value="<?= h($form['name']); ?>" placeholder="Student name" required>

    <label for="email">Email</label>
    <input id="email" type="email" name="email" value="<?= h($form['email']); ?>" placeholder="you@example.com" required>

    <label for="password">Password</label>
    <input id="password" type="password" name="password" placeholder="At least 8 characters" required>

    <label for="confirm_password">Confirm Password</label>
    <input id="confirm_password" type="password" name="confirm_password" placeholder="Repeat password" required>

    <button class="btn" type="submit">Create Account</button>
  </form>

  <p class="inline-note">Already have an account? <a href="<?= h(examportal_url('user/login.php')); ?>">Login</a>.</p>
</section>

<?php ep_render_page_end(); ?>
