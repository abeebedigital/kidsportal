<?php
declare(strict_types=1);

if (!function_exists('ep_nav_links')) {
    function ep_nav_links(): array
    {
        if (ep_is_logged_in()) {
            if (ep_is_admin()) {
                return [
                    ['key' => 'home', 'label' => 'Home', 'href' => examportal_url('index.php')],
                    ['key' => 'admin', 'label' => 'Admin', 'href' => examportal_url('admin/index.php')],
                    ['key' => 'admin_questions', 'label' => 'Questions', 'href' => examportal_url('admin/questions.php')],
                    ['key' => 'admin_import', 'label' => 'Import', 'href' => examportal_url('admin/import.php')],
                    ['key' => 'admin_papers', 'label' => 'Papers', 'href' => examportal_url('admin/papers.php')],
                    ['key' => 'admin_users', 'label' => 'Users', 'href' => examportal_url('admin/users.php')],
                    ['key' => 'admin_subscriptions', 'label' => 'Subscriptions', 'href' => examportal_url('admin/subscriptions.php')],
                    ['key' => 'admin_security', 'label' => 'Security', 'href' => examportal_url('admin/security.php')],
                    ['key' => 'admin_reports', 'label' => 'Reports', 'href' => examportal_url('admin/reports.php')],
                    ['key' => 'logout', 'label' => 'Logout', 'href' => examportal_url('user/logout.php')],
                ];
            }

            return [
                ['key' => 'home', 'label' => 'Home', 'href' => examportal_url('index.php')],
                ['key' => 'dashboard', 'label' => 'Dashboard', 'href' => examportal_url('user/dashboard.php')],
                ['key' => 'progress', 'label' => 'Progress', 'href' => examportal_url('user/progress.php')],
                ['key' => 'subscribe', 'label' => 'Subscription', 'href' => examportal_url('user/subscribe.php')],
                ['key' => 'logout', 'label' => 'Logout', 'href' => examportal_url('user/logout.php')],
            ];
        }

        return [
            ['key' => 'home', 'label' => 'Home', 'href' => examportal_url('index.php')],
            ['key' => 'login', 'label' => 'Login', 'href' => examportal_url('user/login.php')],
            ['key' => 'register', 'label' => 'Register', 'href' => examportal_url('user/register.php')],
        ];
    }
}

if (!function_exists('ep_nav_class')) {
    function ep_nav_class(string $activeKey, string $key): string
    {
        return $activeKey === $key ? 'nav-link active' : 'nav-link';
    }
}

if (!function_exists('ep_render_flash_block')) {
    function ep_render_flash_block(): void
    {
        $success = ep_flash_get('success');
        $error = ep_flash_get('error');

        if ($success === null && $error === null) {
            return;
        }

        echo '<div class="alerts">';
        if ($success !== null) {
            echo '<div class="alert alert-success">' . h($success) . '</div>';
        }
        if ($error !== null) {
            echo '<div class="alert alert-error">' . h($error) . '</div>';
        }
        echo '</div>';
    }
}

if (!function_exists('ep_render_page_start')) {
    function ep_render_page_start(array $options): void
    {
        $title = $options['title'] ?? 'ExamPortal';
        $active = $options['active'] ?? '';
        $heroKicker = $options['hero_kicker'] ?? '';
        $heroTitle = $options['hero_title'] ?? 'ExamPortal';
        $heroText = $options['hero_text'] ?? '';

        $navLinks = ep_nav_links();

        echo '<!DOCTYPE html>';
        echo '<html lang="en">';
        echo '<head>';
        echo '  <meta charset="UTF-8">';
        echo '  <meta name="viewport" content="width=device-width, initial-scale=1.0">';
        echo '  <title>' . h($title) . ' | ExamPortal</title>';
        echo '  <link rel="preconnect" href="https://fonts.googleapis.com">';
        echo '  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>';
        echo '  <link href="https://fonts.googleapis.com/css2?family=Fredoka+One&family=Nunito:wght@400;600;700;800;900&display=swap" rel="stylesheet">';
        echo '  <link rel="stylesheet" href="' . h(examportal_url('assets/style.css')) . '">';
        echo '  <script defer src="' . h(examportal_url('assets/app.js')) . '"></script>';
        echo '</head>';
        echo '<body>';
        echo '  <aside class="mobile-drawer" data-mobile-drawer>';
        echo '    <div class="mobile-drawer-head">';
        echo '      <img class="mobile-drawer-logo" src="' . h('/kids_pjt/kids/fivetofifteen-logo.svg') . '" alt="FiveToFifteen">';
        echo '      <span class="mobile-drawer-title">ExamPortal</span>';
        echo '    </div>';
        echo '    <nav class="mobile-links">';
        foreach ($navLinks as $link) {
            echo '      <a href="' . h($link['href']) . '">' . h($link['label']) . '</a>';
        }
        echo '    </nav>';
        echo '  </aside>';
        echo '  <div class="overlay" data-overlay></div>';
        echo '  <div class="page">';
        echo '    <header class="topbar">';
        echo '      <button class="menu-toggle" type="button" data-menu-toggle aria-label="Open menu" aria-expanded="false">';
        echo '        <span></span><span></span><span></span>';
        echo '      </button>';
        echo '      <a class="brand" href="' . h(examportal_url('index.php')) . '">';
        echo '        <img class="brand-logo" src="' . h('/kids_pjt/kids/fivetofifteen-logo.svg') . '" alt="FiveToFifteen">';
        echo '        <span class="brand-text">ExamPortal</span>';
        echo '      </a>';
        echo '      <nav class="desktop-nav">';
        foreach ($navLinks as $link) {
            echo '        <a class="' . h(ep_nav_class($active, (string) $link['key'])) . '" href="' . h($link['href']) . '">' . h($link['label']) . '</a>';
        }
        echo '      </nav>';
        echo '    </header>';
        echo '    <section class="hero">';
        if ($heroKicker !== '') {
            echo '      <span class="hero-kicker">' . h($heroKicker) . '</span>';
        }
        echo '      <h1>' . h($heroTitle) . '</h1>';
        if ($heroText !== '') {
            echo '      <p>' . h($heroText) . '</p>';
        }
        echo '    </section>';

        ep_render_flash_block();
    }
}

if (!function_exists('ep_render_page_end')) {
    function ep_render_page_end(): void
    {
        echo '  </div>';
        echo '</body>';
        echo '</html>';
    }
}
