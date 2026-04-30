<?php
$appConfig = require __DIR__ . '/config.php';
require_once __DIR__ . '/auth.php';

function app_config($key, $default = null)
{
    global $appConfig;
    return $appConfig[$key] ?? $default;
}

function join_url_path($base, $path = '')
{
    return rtrim((string) $base, '/') . '/' . ltrim((string) $path, '/');
}

function base_url($path = '')
{
    return join_url_path(app_config('exam_base_url', '/kids_pjt_main/kids/exam/'), $path);
}

function kids_root_url($path = '')
{
    return join_url_path(app_config('kids_base_url', '/kids_pjt_main/kids/'), $path);
}

function e($value)
{
    return htmlspecialchars((string) $value, ENT_QUOTES, 'UTF-8');
}

function redirect_to($path)
{
    header('Location: ' . base_url($path));
    exit;
}

function set_flash($type, $message)
{
    $_SESSION['flash_' . $type] = $message;
}

function flash_message($type)
{
    $key = 'flash_' . $type;
    if (empty($_SESSION[$key])) {
        return '';
    }
    $message = $_SESSION[$key];
    unset($_SESSION[$key]);
    return $message;
}

function page_title($title)
{
    return $title . ' | Kids MCQ Exam System';
}

function render_header($title, $section = 'user')
{
    $user = current_user();
    $admin = current_admin();
    $isLoggedIn = (bool) $user;
    $isAdminLoggedIn = (bool) $admin;
    $navLinks = [];

    if ($section === 'admin') {

        if ($isAdminLoggedIn) {
            $navLinks = [
            ['label' => 'Dashboard', 'href' => base_url('admin/dashboard.php')],
            ['label' => 'Categories', 'href' => base_url('admin/categories.php')],
            ['label' => 'Plans', 'href' => base_url('admin/subscription_plans.php')],
            ['label' => 'Topics', 'href' => base_url('admin/topics.php')],
            ['label' => 'Questions', 'href' => base_url('admin/questions.php')],
            ['label' => 'Exam Sets', 'href' => base_url('admin/exam_sets.php')],
            ['label' => 'Users', 'href' => base_url('admin/users.php')]
        ];
        } else {
            $navLinks[] = ['label' => 'Admin Login', 'href' => base_url('admin/login.php')];
        }

        // $navLinks = [
        //     ['label' => 'Topics', 'href' => base_url('admin/topics.php')],
        //     ['label' => 'Questions', 'href' => base_url('admin/questions.php')],
        //     ['label' => 'Bulk Upload', 'href' => base_url('admin/questions_upload.php')],
        //     ['label' => 'Exam Sets', 'href' => base_url('admin/exam_sets.php')],
        //     ['label' => 'Users', 'href' => base_url('admin/users.php')],
        //     //['label' => 'User Area', 'href' => base_url('user/dashboard.php')],
        //     //['label' => 'Admin Login', 'href' => base_url('admin/login.php')]
        // ];

    } else {

        if ($isLoggedIn) {
            $navLinks[] = ['label' => 'Dashboard', 'href' => base_url('user/dashboard.php')];
            $navLinks[] = ['label' => 'Subscription', 'href' => base_url('user/subscribe.php')];
        } else {
            $navLinks[] = ['label' => 'Login', 'href' => base_url('user/login.php')];
            $navLinks[] = ['label' => 'Register', 'href' => base_url('user/register.php')];
        }
        // $navLinks = [
        //     ['label' => 'Dashboard', 'href' => base_url('user/dashboard.php')],
        //     ['label' => 'Login', 'href' => base_url('user/login.php')],
        //     ['label' => 'Register', 'href' => base_url('user/register.php')],
        //     ['label' => 'Admin', 'href' => base_url('admin/login.php')]
        // ];
    }
    ?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title><?php echo e(page_title($title)); ?></title>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Fredoka:wght@500;600;700&family=Nunito:wght@400;600;700;800;900&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="<?php echo e(base_url('assets/style.css')); ?>">
    <script src="<?php echo e(base_url('assets/script.js')); ?>" defer></script>
</head>
<body>
    <div class="exam-shell">
        <header class="exam-topbar">
            <a class="brand" href="<?php echo e(base_url('index.php')); ?>">
                <img src="<?php echo e(kids_root_url('fivetofifteen-logo.svg')); ?>" alt="FiveToFifteen logo">
                <span>MCQ Exam System</span>
            </a>
            <nav class="top-nav">
                <?php foreach ($navLinks as $link): ?>
                    <a class="top-nav-link" href="<?php echo e($link['href']); ?>"><?php echo e($link['label']); ?></a>
                <?php endforeach; ?>
                <?php if ($section === 'admin' && $isAdminLoggedIn): ?>
                    <a class="top-nav-link top-nav-link-soft" href="<?php echo e(base_url('admin/login.php?action=logout')); ?>">Admin Logout</a>
                <?php elseif ($section !== 'admin' && $isLoggedIn): ?>
                    <a class="top-nav-link top-nav-link-soft" href="<?php echo e(base_url('user/login.php?action=logout')); ?>">Logout</a>
                <?php endif; ?>
            </nav>
        </header>

        <section class="hero-panel">
            <div class="hero-copy">
                <span class="hero-badge"><?php echo $section === 'admin' ? 'Admin Control Room' : 'Student Exam Area'; ?></span>
                <h1><?php echo e($title); ?></h1>
                <p>Bright, simple, and fast exam management with the same friendly visual language as the main FiveToFifteen site.</p>
            </div>
            <div class="hero-meta-card">
                <?php if ($section === 'admin' && $isAdminLoggedIn): ?>
                    <strong><?php echo e($admin['name']); ?></strong>
                    <span><?php echo e($admin['email']); ?></span>
                    <span class="pill pill-info">Admin Session</span>
                <?php elseif ($section === 'admin'): ?>
                    <strong>Admin Area</strong>
                    <span>Secure management access</span>
                    <span class="pill pill-info">Admin Login</span>
                <?php elseif ($isLoggedIn): ?>
                    <?php
                    $headerSubscriptions = [];
                    if (function_exists('get_user_active_subscriptions')) {
                        $headerSubscriptions = get_user_active_subscriptions((int) $user['id']);
                    }
                    ?>
                    <strong><?php echo e($user['name']); ?></strong>
                    <span><?php echo e($user['email']); ?></span>
                    <div class="status-row">
                        <span class="pill <?php echo (int) $user['is_active'] === 1 ? 'pill-success' : 'pill-danger'; ?>">
                            <?php echo (int) $user['is_active'] === 1 ? 'Active' : 'Inactive'; ?>
                        </span>
                        <span class="pill <?php echo (int) $user['is_subscribed'] === 1 ? 'pill-success' : 'pill-warning'; ?>">
                            <?php echo (int) $user['is_subscribed'] === 1 ? 'Subscribed' : 'Not Subscribed'; ?>
                        </span>
                    </div>
                    <?php if ($headerSubscriptions): ?>
                        <div class="subscription-mini-list">
                            <?php foreach ($headerSubscriptions as $subscription): ?>
                                <span class="pill pill-info">
                                    <?php echo e($subscription['category_name']); ?>: <?php echo e($subscription['plan_name']); ?>
                                </span>
                            <?php endforeach; ?>
                        </div>
                    <?php endif; ?>
                <?php else: ?>
                    <strong>Demo Login</strong>
                    <span>demo@kids.com</span>
                    <span class="pill pill-success">Password: demo123</span>
                <?php endif; ?>
            </div>
        </section>

        <main class="content-wrap">
            <?php if ($message = flash_message('success')): ?>
                <div class="alert alert-success"><?php echo e($message); ?></div>
            <?php endif; ?>
            <?php if ($message = flash_message('error')): ?>
                <div class="alert alert-error"><?php echo e($message); ?></div>
            <?php endif; ?>
<?php
}

function render_footer()
{
    ?>
        </main>
    </div>
</body>
</html>
<?php
}

function get_topics()
{
    global $conn;
    $result = $conn->query('
        SELECT t.*, COALESCE(c.name, "Unassigned") AS category_name
        FROM topics t
        LEFT JOIN exam_categories c ON c.id = t.category_id
        ORDER BY t.created_at DESC, t.id DESC
    ');
    return $result->fetch_all(MYSQLI_ASSOC);
}

function get_categories($activeOnly = false)
{
    global $conn;
    $sql = 'SELECT * FROM exam_categories';
    if ($activeOnly) {
        $sql .= ' WHERE is_active = 1';
    }
    $sql .= ' ORDER BY created_at DESC, id DESC';
    $result = $conn->query($sql);
    return $result->fetch_all(MYSQLI_ASSOC);
}

function get_categories_with_exam_set_counts($activeOnly = false)
{
    global $conn;
    $sql = '
        SELECT c.*, COALESCE(exam_set_totals.exam_set_count, 0) AS exam_set_count
        FROM exam_categories c
        LEFT JOIN (
            SELECT category_id, COUNT(*) AS exam_set_count
            FROM exam_sets
            GROUP BY category_id
        ) exam_set_totals ON exam_set_totals.category_id = c.id
    ';
    if ($activeOnly) {
        $sql .= ' WHERE c.is_active = 1';
    }
    $sql .= ' ORDER BY c.created_at DESC, c.id DESC';
    $result = $conn->query($sql);
    return $result->fetch_all(MYSQLI_ASSOC);
}

function get_subscription_plans($activeOnly = false)
{
    global $conn;
    $sql = '
        SELECT p.*, c.name AS category_name
        FROM subscription_plans p
        INNER JOIN exam_categories c ON c.id = p.category_id
    ';
    if ($activeOnly) {
        $sql .= ' WHERE p.is_active = 1 AND c.is_active = 1';
    }
    $sql .= ' ORDER BY p.created_at DESC, p.id DESC';
    $result = $conn->query($sql);
    return $result->fetch_all(MYSQLI_ASSOC);
}

function get_exam_sets()
{
    global $conn;
    $result = $conn->query('
        SELECT eb.*, COALESCE(c.name, "Unassigned") AS category_name
        FROM exam_sets eb
        LEFT JOIN exam_categories c ON c.id = eb.category_id
        ORDER BY eb.created_at DESC, eb.id DESC
    ');
    return $result->fetch_all(MYSQLI_ASSOC);
}

function get_category_by_id($categoryId, $activeOnly = false)
{
    global $conn;
    $sql = 'SELECT * FROM exam_categories WHERE id = ?';
    if ($activeOnly) {
        $sql .= ' AND is_active = 1';
    }
    $sql .= ' LIMIT 1';
    $stmt = $conn->prepare($sql);
    $stmt->bind_param('i', $categoryId);
    $stmt->execute();
    $category = $stmt->get_result()->fetch_assoc() ?: null;
    $stmt->close();
    return $category;
}

function get_exam_sets_by_category($categoryId)
{
    global $conn;
    $stmt = $conn->prepare('
        SELECT eb.*, COALESCE(c.name, "Unassigned") AS category_name
        FROM exam_sets eb
        INNER JOIN exam_categories c ON c.id = eb.category_id
        WHERE eb.category_id = ? AND c.is_active = 1
        ORDER BY eb.created_at DESC, eb.id DESC
    ');
    $stmt->bind_param('i', $categoryId);
    $stmt->execute();
    $rows = $stmt->get_result()->fetch_all(MYSQLI_ASSOC);
    $stmt->close();
    return $rows;
}

function get_user_active_category_ids($userId)
{
    global $conn;
    $stmt = $conn->prepare("
        SELECT DISTINCT category_id
        FROM user_category_subscriptions
        WHERE user_id = ? AND status = 'active' AND expires_at > NOW()
    ");
    $stmt->bind_param('i', $userId);
    $stmt->execute();
    $rows = $stmt->get_result()->fetch_all(MYSQLI_ASSOC);
    $stmt->close();

    return array_values(array_map(static function ($row) {
        return (int) $row['category_id'];
    }, $rows));
}

function get_user_active_subscriptions($userId)
{
    global $conn;
    $stmt = $conn->prepare("
        SELECT s.*, p.name AS plan_name, c.name AS category_name
        FROM user_category_subscriptions s
        INNER JOIN subscription_plans p ON p.id = s.plan_id
        INNER JOIN exam_categories c ON c.id = s.category_id
        WHERE s.user_id = ? AND s.status = 'active' AND s.expires_at > NOW()
        ORDER BY s.expires_at ASC
    ");
    $stmt->bind_param('i', $userId);
    $stmt->execute();
    $rows = $stmt->get_result()->fetch_all(MYSQLI_ASSOC);
    $stmt->close();
    return $rows;
}

function user_has_category_subscription($userId, $categoryId)
{
    global $conn;
    if ($categoryId <= 0) {
        return false;
    }

    $stmt = $conn->prepare("
        SELECT id
        FROM user_category_subscriptions
        WHERE user_id = ? AND category_id = ? AND status = 'active' AND expires_at > NOW()
        LIMIT 1
    ");
    $stmt->bind_param('ii', $userId, $categoryId);
    $stmt->execute();
    $hasSubscription = (bool) $stmt->get_result()->fetch_assoc();
    $stmt->close();
    return $hasSubscription;
}

function sync_user_subscription_flag($userId)
{
    global $conn;
    $hasAny = count(get_user_active_category_ids((int) $userId)) > 0 ? 1 : 0;
    $stmt = $conn->prepare('UPDATE users SET is_subscribed = ? WHERE id = ?');
    $stmt->bind_param('ii', $hasAny, $userId);
    $stmt->execute();
    $stmt->close();
}

function get_available_exam_sets_for_user($userId)
{
    global $conn;
    $categoryIds = get_user_active_category_ids((int) $userId);
    if (!$categoryIds) {
        return [];
    }

    $placeholders = in_clause_placeholders($categoryIds);
    $types = str_repeat('i', count($categoryIds));
    $stmt = $conn->prepare("
        SELECT eb.*, COALESCE(c.name, 'Unassigned') AS category_name
        FROM exam_sets eb
        INNER JOIN exam_categories c ON c.id = eb.category_id
        WHERE eb.category_id IN ($placeholders) AND c.is_active = 1
        ORDER BY eb.created_at DESC, eb.id DESC
    ");
    bind_dynamic_params($stmt, $types, $categoryIds);
    $stmt->execute();
    $rows = $stmt->get_result()->fetch_all(MYSQLI_ASSOC);
    $stmt->close();
    return $rows;
}

function question_ids_from_text($value)
{
    $parts = array_filter(array_map('trim', explode(',', (string) $value)));
    return array_values(array_map('intval', $parts));
}

function in_clause_placeholders(array $items)
{
    return implode(',', array_fill(0, count($items), '?'));
}

function bind_dynamic_params($stmt, $types, array &$values)
{
    $refs = [];
    $refs[] = &$types;
    foreach ($values as $key => $value) {
        $refs[] = &$values[$key];
    }
    call_user_func_array([$stmt, 'bind_param'], $refs);
}

function fetch_questions_by_ids(array $questionIds)
{
    global $conn;
    if (!$questionIds) {
        return [];
    }

    $ids = array_values(array_map('intval', $questionIds));
    $placeholders = in_clause_placeholders($ids);
    $types = str_repeat('i', count($ids));
    $stmt = $conn->prepare("SELECT q.*, COALESCE(t.name, 'Unassigned') AS topic_name FROM questions q LEFT JOIN topics t ON t.id = q.topic_id WHERE q.id IN ($placeholders)");
    bind_dynamic_params($stmt, $types, $ids);
    $stmt->execute();
    $rows = $stmt->get_result()->fetch_all(MYSQLI_ASSOC);
    $stmt->close();

    $indexed = [];
    foreach ($rows as $row) {
        $indexed[(int) $row['id']] = $row;
    }

    $ordered = [];
    foreach ($ids as $id) {
        if (isset($indexed[$id])) {
            $ordered[] = $indexed[$id];
        }
    }

    return $ordered;
}

function topic_options_with_unassigned()
{
    $topics = get_topics();
    array_unshift($topics, [
        'id' => 0,
        'name' => 'Unassigned / Unknown Topic',
        'created_at' => null
    ]);
    return $topics;
}

function normalize_import_header($value)
{
    $value = strtolower(trim((string) $value));
    $value = preg_replace('/[^a-z0-9]+/', '_', $value);
    return trim((string) $value, '_');
}

function xlsx_column_index($letters)
{
    $letters = strtoupper((string) $letters);
    $index = 0;
    $length = strlen($letters);
    for ($i = 0; $i < $length; $i++) {
        $index = ($index * 26) + (ord($letters[$i]) - 64);
    }
    return $index - 1;
}

function parse_csv_file_rows($filePath)
{
    $handle = fopen($filePath, 'r');
    if (!$handle) {
        throw new RuntimeException('Could not open CSV file.');
    }

    $rows = [];
    $headers = [];
    $rowNumber = 0;

    while (($data = fgetcsv($handle)) !== false) {
        $rowNumber++;
        if ($rowNumber === 1) {
            $headers = array_map('normalize_import_header', $data);
            continue;
        }

        $assoc = [];
        foreach ($headers as $index => $header) {
            if ($header === '') {
                continue;
            }
            $assoc[$header] = isset($data[$index]) ? trim((string) $data[$index]) : '';
        }
        $rows[] = $assoc;
    }

    fclose($handle);
    return $rows;
}

function parse_xlsx_file_rows($filePath)
{
    $tempBase = dirname(__DIR__) . '/tmp_extract';
    if (!is_dir($tempBase)) {
        mkdir($tempBase, 0777, true);
    }

    $extractDir = $tempBase . '/xlsx_' . uniqid('', true);
    if (!mkdir($extractDir, 0777, true) && !is_dir($extractDir)) {
        throw new RuntimeException('Could not prepare a temporary extraction folder.');
    }

    try {
        $sharedStrings = [];

        if (class_exists('ZipArchive')) {
            $zip = new ZipArchive();
            if ($zip->open($filePath) !== true) {
                throw new RuntimeException('Could not open XLSX file.');
            }

            if (!$zip->extractTo($extractDir)) {
                $zip->close();
                throw new RuntimeException('Could not extract XLSX file.');
            }
            $zip->close();
        } else {
            $powershellFile = str_replace("'", "''", $filePath);
            $powershellDir = str_replace("'", "''", $extractDir);
            $command = "powershell -NoProfile -NonInteractive -ExecutionPolicy Bypass -Command \"Expand-Archive -LiteralPath '$powershellFile' -DestinationPath '$powershellDir' -Force\"";

            $output = [];
            $exitCode = 0;
            @exec($command, $output, $exitCode);

            if ($exitCode !== 0) {
                throw new RuntimeException('Excel upload needs PHP ZipArchive or PowerShell archive extraction support. CSV upload still works.');
            }
        }

        $sharedStringsPath = $extractDir . '/xl/sharedStrings.xml';
        if (is_file($sharedStringsPath)) {
            $sharedStringsXml = file_get_contents($sharedStringsPath);
            $sharedXml = simplexml_load_string($sharedStringsXml);
            if ($sharedXml && isset($sharedXml->si)) {
                foreach ($sharedXml->si as $item) {
                    $text = '';
                    if (isset($item->t)) {
                        $text = (string) $item->t;
                    } elseif (isset($item->r)) {
                        foreach ($item->r as $run) {
                            $text .= (string) $run->t;
                        }
                    }
                    $sharedStrings[] = $text;
                }
            }
        }

        $sheetPath = $extractDir . '/xl/worksheets/sheet1.xml';
        if (!is_file($sheetPath)) {
            throw new RuntimeException('The XLSX file does not contain sheet1.xml.');
        }

        $sheetXmlRaw = file_get_contents($sheetPath);
        $sheetXml = simplexml_load_string($sheetXmlRaw);
        if (!$sheetXml || !isset($sheetXml->sheetData)) {
            throw new RuntimeException('Could not read rows from the XLSX file.');
        }

        $sheetXml->registerXPathNamespace('main', 'http://schemas.openxmlformats.org/spreadsheetml/2006/main');
        $headers = [];
        $rows = [];
        $isHeaderRow = true;

        foreach ($sheetXml->sheetData->row as $rowNode) {
            $rowValues = [];
            foreach ($rowNode->c as $cell) {
                $cellRef = (string) $cell['r'];
                preg_match('/[A-Z]+/', $cellRef, $matches);
                $colLetters = $matches[0] ?? 'A';
                $index = xlsx_column_index($colLetters);
                $type = (string) $cell['t'];
                $value = '';

                if ($type === 's') {
                    $sharedIndex = (int) ($cell->v ?? 0);
                    $value = $sharedStrings[$sharedIndex] ?? '';
                } elseif ($type === 'inlineStr') {
                    $value = (string) ($cell->is->t ?? '');
                } else {
                    $value = (string) ($cell->v ?? '');
                }

                $rowValues[$index] = trim($value);
            }

            if (!$rowValues) {
                continue;
            }

            ksort($rowValues);
            $denseRow = [];
            $maxIndex = max(array_keys($rowValues));
            for ($i = 0; $i <= $maxIndex; $i++) {
                $denseRow[$i] = $rowValues[$i] ?? '';
            }

            if ($isHeaderRow) {
                $headers = array_map('normalize_import_header', $denseRow);
                $isHeaderRow = false;
                continue;
            }

            $assoc = [];
            foreach ($headers as $index => $header) {
                if ($header === '') {
                    continue;
                }
                $assoc[$header] = isset($denseRow[$index]) ? trim((string) $denseRow[$index]) : '';
            }
            $rows[] = $assoc;
        }

        return $rows;
    } finally {
        if (is_dir($extractDir)) {
            delete_directory_recursive($extractDir);
        }
    }
}

function delete_directory_recursive($dir)
{
    if (!is_dir($dir)) {
        return;
    }

    $items = scandir($dir);
    if ($items === false) {
        return;
    }

    foreach ($items as $item) {
        if ($item === '.' || $item === '..') {
            continue;
        }
        $path = $dir . DIRECTORY_SEPARATOR . $item;
        if (is_dir($path)) {
            delete_directory_recursive($path);
        } elseif (is_file($path)) {
            @unlink($path);
        }
    }

    @rmdir($dir);
}

function resolve_topic_id_for_import($rawTopicId, $rawTopicName)
{
    global $conn;

    $topicId = (int) trim((string) $rawTopicId);
    if ($topicId > 0) {
        $stmt = $conn->prepare('SELECT id FROM topics WHERE id = ? LIMIT 1');
        $stmt->bind_param('i', $topicId);
        $stmt->execute();
        $found = $stmt->get_result()->fetch_assoc();
        $stmt->close();
        if ($found) {
            return $topicId;
        }
    }

    $topicName = trim((string) $rawTopicName);
    if ($topicName !== '') {
        $stmt = $conn->prepare('SELECT id FROM topics WHERE LOWER(name) = LOWER(?) LIMIT 1');
        $stmt->bind_param('s', $topicName);
        $stmt->execute();
        $found = $stmt->get_result()->fetch_assoc();
        $stmt->close();
        if ($found) {
            return (int) $found['id'];
        }
    }

    return 0;
}

function import_question_rows(array $rows)
{
    global $conn;

    $insertStmt = $conn->prepare('
        INSERT INTO questions (topic_id, question, option_a, option_b, option_c, option_d, correct_answer, explanation)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    ');

    $imported = 0;
    $skipped = 0;
    $errors = [];

    foreach ($rows as $index => $row) {
        $rowNumber = $index + 2;
        $question = trim((string) ($row['question'] ?? ''));
        $optionA = trim((string) ($row['option_a'] ?? ''));
        $optionB = trim((string) ($row['option_b'] ?? ''));
        $optionC = trim((string) ($row['option_c'] ?? ''));
        $optionD = trim((string) ($row['option_d'] ?? ''));
        $correct = strtoupper(trim((string) ($row['correct_answer'] ?? $row['answer'] ?? '')));
        $explanation = trim((string) ($row['explanation'] ?? ''));

        if ($question === '' && $optionA === '' && $optionB === '' && $optionC === '' && $optionD === '' && $correct === '') {
            $skipped++;
            continue;
        }

        if ($question === '' || $optionA === '' || $optionB === '' || $optionC === '' || $optionD === '' || !in_array($correct, ['A', 'B', 'C', 'D'], true)) {
            $errors[] = 'Row ' . $rowNumber . ' skipped: missing question/options or invalid correct_answer.';
            $skipped++;
            continue;
        }

        $topicId = resolve_topic_id_for_import($row['topic_id'] ?? '', $row['topic_name'] ?? $row['topic'] ?? '');
        $insertStmt->bind_param('isssssss', $topicId, $question, $optionA, $optionB, $optionC, $optionD, $correct, $explanation);
        $insertStmt->execute();
        $imported++;
    }

    $insertStmt->close();

    return [
        'imported' => $imported,
        'skipped' => $skipped,
        'errors' => $errors
    ];
}

function latest_user_exam_map($userId)
{
    global $conn;
    $stmt = $conn->prepare('
        SELECT ue.*
        FROM user_exams ue
        INNER JOIN (
            SELECT exam_set_id, MAX(id) AS latest_id
            FROM user_exams
            WHERE user_id = ?
            GROUP BY exam_set_id
        ) latest ON latest.latest_id = ue.id
        ORDER BY ue.id DESC
    ');
    $stmt->bind_param('i', $userId);
    $stmt->execute();
    $rows = $stmt->get_result()->fetch_all(MYSQLI_ASSOC);
    $stmt->close();

    $map = [];
    foreach ($rows as $row) {
        $map[(int) $row['exam_set_id']] = $row;
    }
    return $map;
}
