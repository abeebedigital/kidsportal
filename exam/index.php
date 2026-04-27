<?php
require_once __DIR__ . '/includes/functions.php';

if (current_user()) {
    redirect_to('user/dashboard.php');
}

redirect_to('user/login.php');

