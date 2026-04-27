<?php
declare(strict_types=1);
require_once __DIR__ . '/../config/app.php';

if (ep_is_logged_in()) {
    ep_redirect(ep_is_admin() ? 'admin/index.php' : 'user/dashboard.php');
}

$email = '';
$error = null;

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $email = trim((string) ($_POST['email'] ?? ''));
    $password = (string) ($_POST['password'] ?? '');
    $csrfToken = $_POST['csrf_token'] ?? null;

    if (!ep_verify_csrf_token(is_string($csrfToken) ? $csrfToken : null)) {
        $error = 'Session validation failed. Please try again.';
    } else {
        $login = ep_attempt_login($email, $password);
        if (!($login['ok'] ?? false)) {
            $error = (string) ($login['message'] ?? 'Unable to login.');
        } else {
            $loginRole = (string) ($login['role'] ?? 'user');
            $target = $loginRole === 'admin' ? 'admin/index.php' : 'user/dashboard.php';
            ep_flash_set('success', 'Welcome back.');
            ep_redirect($target);
        }
    }
}

ep_render_page_start([
    'title' => 'Login',
    'active' => 'login',
    'hero_kicker' => 'Subscriber Access',
    'hero_title' => 'Login',
    'hero_text' => 'Only paid subscribers can open question paper sets.',
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

    <label for="email">Email</label>
    <input id="email" type="email" name="email" value="<?= h($email); ?>" placeholder="you@example.com" required>

    <label for="password">Password</label>
    <input id="password" type="password" name="password" placeholder="Minimum 8 characters" required>

    <button class="btn" type="submit">Login</button>
  </form>

  <p class="inline-note">Demo account: <strong>subscriber@examportal.com</strong> / <strong>demo12345</strong></p>
  <p class="inline-note">Need an account? <a href="<?= h(examportal_url('user/register.php')); ?>">Create one</a>.</p>
</section>

<?php ep_render_page_end(); ?>
