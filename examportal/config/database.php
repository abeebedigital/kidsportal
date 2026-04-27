<?php
declare(strict_types=1);

if (!function_exists('ep_db_name')) {
    function ep_db_name(): string
    {
        $dbName = getenv('EXAMPORTAL_DB_NAME');
        if (is_string($dbName) && trim($dbName) !== '') {
            return trim($dbName);
        }

        return 'kids_examportal';
    }
}

if (!function_exists('ep_db')) {
    function ep_db(): mysqli
    {
        static $conn = null;

        if ($conn instanceof mysqli) {
            return $conn;
        }

        mysqli_report(MYSQLI_REPORT_ERROR | MYSQLI_REPORT_STRICT);

        $host = getenv('DB_HOST') ?: '127.0.0.1';
        $port = (int) (getenv('DB_PORT') ?: 3306);
        $user = getenv('DB_USER') ?: 'root';
        $pass = getenv('DB_PASS') !== false ? (string) getenv('DB_PASS') : '';
        $dbName = ep_db_name();

        $conn = new mysqli($host, $user, $pass, '', $port);
        $conn->set_charset('utf8mb4');

        $safeDbName = str_replace('`', '``', $dbName);
        $conn->query("CREATE DATABASE IF NOT EXISTS `{$safeDbName}` CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci");
        $conn->select_db($dbName);

        return $conn;
    }
}
