<?php
 require_once __DIR__ . '/../includes/functions.php';

 if (current_admin()) {
     redirect_to('admin/dashboard.php');
 }

redirect_to('admin/login.php');
