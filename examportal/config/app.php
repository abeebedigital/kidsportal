<?php
declare(strict_types=1);

if (!defined('EXAMPORTAL_BASE')) {
    define('EXAMPORTAL_BASE', '/kids_pjt/kids/examportal/');
}

if (!function_exists('examportal_url')) {
    function examportal_url(string $path = ''): string
    {
        return EXAMPORTAL_BASE . ltrim($path, '/');
    }
}

if (!function_exists('h')) {
    function h(string $value): string
    {
        return htmlspecialchars($value, ENT_QUOTES, 'UTF-8');
    }
}

require_once __DIR__ . '/database.php';
require_once __DIR__ . '/schema.php';
require_once __DIR__ . '/repository.php';
require_once __DIR__ . '/importer.php';
require_once __DIR__ . '/auth.php';
require_once __DIR__ . '/layout.php';

ep_bootstrap_app();
