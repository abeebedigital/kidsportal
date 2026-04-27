<?php
declare(strict_types=1);
require_once __DIR__ . '/../config/app.php';

ep_logout_user();
ep_flash_set('success', 'You have been logged out.');
ep_redirect('user/login.php');
