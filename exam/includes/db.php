<?php
if (!defined('EXAM_DB_INCLUDED')) {
    define('EXAM_DB_INCLUDED', true);

    mysqli_report(MYSQLI_REPORT_ERROR | MYSQLI_REPORT_STRICT);

    $dbHost = 'localhost';
    $dbUser = 'root';
    $dbPass = '';
    $dbName = 'kids_exam';

    $conn = new mysqli($dbHost, $dbUser, $dbPass);
    $conn->set_charset('utf8mb4');
    $conn->query("CREATE DATABASE IF NOT EXISTS `{$dbName}` CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci");
    $conn->select_db($dbName);

    function exam_run_query($sql)
    {
        global $conn;
        $conn->query($sql);
    }

    function exam_table_exists($tableName)
    {
        global $conn, $dbName;
        $stmt = $conn->prepare('
            SELECT TABLE_NAME
            FROM information_schema.TABLES
            WHERE TABLE_SCHEMA = ? AND TABLE_NAME = ?
            LIMIT 1
        ');
        $stmt->bind_param('ss', $dbName, $tableName);
        $stmt->execute();
        $exists = (bool) $stmt->get_result()->fetch_assoc();
        $stmt->close();
        return $exists;
    }

    function exam_column_exists($tableName, $columnName)
    {
        global $conn, $dbName;
        $stmt = $conn->prepare('
            SELECT COLUMN_NAME
            FROM information_schema.COLUMNS
            WHERE TABLE_SCHEMA = ? AND TABLE_NAME = ? AND COLUMN_NAME = ?
            LIMIT 1
        ');
        $stmt->bind_param('sss', $dbName, $tableName, $columnName);
        $stmt->execute();
        $exists = (bool) $stmt->get_result()->fetch_assoc();
        $stmt->close();
        return $exists;
    }

    function exam_drop_foreign_key_for_column($tableName, $columnName)
    {
        global $conn, $dbName;
        $stmt = $conn->prepare('
            SELECT CONSTRAINT_NAME
            FROM information_schema.KEY_COLUMN_USAGE
            WHERE TABLE_SCHEMA = ?
              AND TABLE_NAME = ?
              AND COLUMN_NAME = ?
              AND REFERENCED_TABLE_NAME IS NOT NULL
            LIMIT 1
        ');
        $stmt->bind_param('sss', $dbName, $tableName, $columnName);
        $stmt->execute();
        $row = $stmt->get_result()->fetch_assoc();
        $stmt->close();

        if ($row && !empty($row['CONSTRAINT_NAME'])) {
            exam_run_query("ALTER TABLE `{$tableName}` DROP FOREIGN KEY `{$row['CONSTRAINT_NAME']}`");
        }
    }

    function exam_foreign_key_exists_for_column($tableName, $columnName)
    {
        global $conn, $dbName;
        $stmt = $conn->prepare('
            SELECT CONSTRAINT_NAME
            FROM information_schema.KEY_COLUMN_USAGE
            WHERE TABLE_SCHEMA = ?
              AND TABLE_NAME = ?
              AND COLUMN_NAME = ?
              AND REFERENCED_TABLE_NAME IS NOT NULL
            LIMIT 1
        ');
        $stmt->bind_param('sss', $dbName, $tableName, $columnName);
        $stmt->execute();
        $exists = (bool) $stmt->get_result()->fetch_assoc();
        $stmt->close();
        return $exists;
    }

    exam_run_query("
        CREATE TABLE IF NOT EXISTS admin_users (
            id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
            name VARCHAR(120) NOT NULL,
            email VARCHAR(190) NOT NULL UNIQUE,
            password VARCHAR(255) NOT NULL,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
    ");

    exam_run_query("
        CREATE TABLE IF NOT EXISTS users (
            id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
            name VARCHAR(120) NOT NULL,
            email VARCHAR(190) NOT NULL UNIQUE,
            password VARCHAR(255) NOT NULL,
            is_active TINYINT(1) NOT NULL DEFAULT 1,
            is_subscribed TINYINT(1) NOT NULL DEFAULT 0,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
    ");

    exam_run_query("ALTER TABLE users ADD COLUMN IF NOT EXISTS is_active TINYINT(1) NOT NULL DEFAULT 1 AFTER password");
    exam_run_query("ALTER TABLE users ADD COLUMN IF NOT EXISTS is_subscribed TINYINT(1) NOT NULL DEFAULT 0 AFTER is_active");

    exam_run_query("
        CREATE TABLE IF NOT EXISTS exam_categories (
            id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
            name VARCHAR(150) NOT NULL,
            slug VARCHAR(170) NOT NULL UNIQUE,
            description TEXT NULL,
            is_active TINYINT(1) NOT NULL DEFAULT 1,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
    ");

    exam_run_query("
        CREATE TABLE IF NOT EXISTS topics (
            id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
            category_id INT UNSIGNED NOT NULL DEFAULT 0,
            name VARCHAR(150) NOT NULL,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
    ");

    exam_run_query("ALTER TABLE topics ADD COLUMN IF NOT EXISTS category_id INT UNSIGNED NOT NULL DEFAULT 0 AFTER id");

    exam_run_query("
        CREATE TABLE IF NOT EXISTS questions (
            id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
            topic_id INT UNSIGNED NOT NULL DEFAULT 0,
            question TEXT NOT NULL,
            option_a VARCHAR(255) NOT NULL,
            option_b VARCHAR(255) NOT NULL,
            option_c VARCHAR(255) NOT NULL,
            option_d VARCHAR(255) NOT NULL,
            correct_answer CHAR(1) NOT NULL,
            explanation TEXT NULL,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
    ");

    exam_run_query("ALTER TABLE questions MODIFY topic_id INT UNSIGNED NOT NULL DEFAULT 0");

    $fkCheck = $conn->prepare("
        SELECT CONSTRAINT_NAME
        FROM information_schema.KEY_COLUMN_USAGE
        WHERE TABLE_SCHEMA = ?
          AND TABLE_NAME = 'questions'
          AND COLUMN_NAME = 'topic_id'
          AND REFERENCED_TABLE_NAME IS NOT NULL
        LIMIT 1
    ");
    $fkCheck->bind_param('s', $dbName);
    $fkCheck->execute();
    $fkRow = $fkCheck->get_result()->fetch_assoc();
    $fkCheck->close();

    if ($fkRow && !empty($fkRow['CONSTRAINT_NAME'])) {
        exam_run_query("ALTER TABLE questions DROP FOREIGN KEY `{$fkRow['CONSTRAINT_NAME']}`");
    }

    $legacyExamSetTable = 'exam_' . 'blue' . 'prints';
    $legacyExamSetColumn = 'blue' . 'print_id';

    if (exam_table_exists($legacyExamSetTable) && !exam_table_exists('exam_sets')) {
        if (exam_table_exists('user_exams') && exam_column_exists('user_exams', $legacyExamSetColumn)) {
            exam_drop_foreign_key_for_column('user_exams', $legacyExamSetColumn);
        }
        exam_run_query("RENAME TABLE {$legacyExamSetTable} TO exam_sets");
    }

    exam_run_query("
        CREATE TABLE IF NOT EXISTS exam_sets (
            id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
            category_id INT UNSIGNED NOT NULL DEFAULT 0,
            title VARCHAR(180) NOT NULL,
            topic_distribution JSON NOT NULL,
            time_limit INT UNSIGNED NOT NULL DEFAULT 30,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
    ");

    exam_run_query("ALTER TABLE exam_sets ADD COLUMN IF NOT EXISTS category_id INT UNSIGNED NOT NULL DEFAULT 0 AFTER id");

    if (exam_table_exists($legacyExamSetTable)) {
        exam_run_query("
            INSERT IGNORE INTO exam_sets (id, category_id, title, topic_distribution, time_limit, created_at)
            SELECT id, category_id, title, topic_distribution, time_limit, created_at
            FROM {$legacyExamSetTable}
        ");
    }

    exam_run_query("
        CREATE TABLE IF NOT EXISTS subscription_plans (
            id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
            category_id INT UNSIGNED NOT NULL,
            name VARCHAR(150) NOT NULL,
            amount DECIMAL(10,2) NOT NULL DEFAULT 0.00,
            duration_days INT UNSIGNED NOT NULL DEFAULT 30,
            description TEXT NULL,
            is_active TINYINT(1) NOT NULL DEFAULT 1,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            INDEX idx_subscription_plans_category (category_id),
            CONSTRAINT fk_subscription_plan_category FOREIGN KEY (category_id) REFERENCES exam_categories(id) ON DELETE CASCADE
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
    ");

    exam_run_query("
        CREATE TABLE IF NOT EXISTS user_category_subscriptions (
            id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
            user_id INT UNSIGNED NOT NULL,
            plan_id INT UNSIGNED NOT NULL,
            category_id INT UNSIGNED NOT NULL,
            amount DECIMAL(10,2) NOT NULL DEFAULT 0.00,
            status VARCHAR(30) NOT NULL DEFAULT 'active',
            starts_at DATETIME NOT NULL,
            expires_at DATETIME NOT NULL,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            INDEX idx_user_category_subscription (user_id, category_id, status, expires_at),
            CONSTRAINT fk_user_category_subscription_user FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
            CONSTRAINT fk_user_category_subscription_plan FOREIGN KEY (plan_id) REFERENCES subscription_plans(id) ON DELETE RESTRICT,
            CONSTRAINT fk_user_category_subscription_category FOREIGN KEY (category_id) REFERENCES exam_categories(id) ON DELETE CASCADE
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
    ");

    exam_run_query("
        CREATE TABLE IF NOT EXISTS user_exams (
            id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
            user_id INT UNSIGNED NOT NULL,
            exam_set_id INT UNSIGNED NOT NULL,
            time_limit INT UNSIGNED NOT NULL DEFAULT 30,
            question_ids TEXT NOT NULL,
            answers JSON NULL,
            score INT UNSIGNED NOT NULL DEFAULT 0,
            status VARCHAR(40) NOT NULL DEFAULT 'in_progress',
            started_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            completed_at TIMESTAMP NULL DEFAULT NULL,
            CONSTRAINT fk_user_exams_user FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
            CONSTRAINT fk_user_exams_exam_set FOREIGN KEY (exam_set_id) REFERENCES exam_sets(id) ON DELETE CASCADE
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
    ");

    if (exam_column_exists('user_exams', $legacyExamSetColumn)) {
        exam_drop_foreign_key_for_column('user_exams', $legacyExamSetColumn);
        if (!exam_column_exists('user_exams', 'exam_set_id')) {
            exam_run_query("ALTER TABLE user_exams CHANGE COLUMN {$legacyExamSetColumn} exam_set_id INT UNSIGNED NOT NULL");
        } else {
            exam_run_query("UPDATE user_exams SET exam_set_id = {$legacyExamSetColumn} WHERE exam_set_id = 0");
            exam_run_query("ALTER TABLE user_exams DROP COLUMN {$legacyExamSetColumn}");
        }
    }
    if (!exam_foreign_key_exists_for_column('user_exams', 'exam_set_id')) {
        exam_run_query('ALTER TABLE user_exams ADD CONSTRAINT fk_user_exams_exam_set FOREIGN KEY (exam_set_id) REFERENCES exam_sets(id) ON DELETE CASCADE');
    }
    exam_run_query("ALTER TABLE user_exams ADD COLUMN IF NOT EXISTS time_limit INT UNSIGNED NOT NULL DEFAULT 30 AFTER exam_set_id");
    exam_run_query("UPDATE user_exams ue INNER JOIN exam_sets eb ON eb.id = ue.exam_set_id SET ue.time_limit = eb.time_limit WHERE ue.time_limit IS NULL OR ue.time_limit = 0");

    $demoEmail = 'demo@kids.com';
    $checkUser = $conn->prepare('SELECT id FROM users WHERE email = ? LIMIT 1');
    $checkUser->bind_param('s', $demoEmail);
    $checkUser->execute();
    $demoUser = $checkUser->get_result()->fetch_assoc();
    $checkUser->close();

    if (!$demoUser) {
        $demoName = 'Demo Student';
        $demoPassword = password_hash('demo123', PASSWORD_DEFAULT);
        $active = 1;
        $subscribed = 1;
        $insertUser = $conn->prepare('INSERT INTO users (name, email, password, is_active, is_subscribed) VALUES (?, ?, ?, ?, ?)');
        $insertUser->bind_param('sssii', $demoName, $demoEmail, $demoPassword, $active, $subscribed);
        $insertUser->execute();
        $insertUser->close();
    }

    $adminEmail = 'admin@kids.com';
    $checkAdmin = $conn->prepare('SELECT id FROM admin_users WHERE email = ? LIMIT 1');
    $checkAdmin->bind_param('s', $adminEmail);
    $checkAdmin->execute();
    $demoAdmin = $checkAdmin->get_result()->fetch_assoc();
    $checkAdmin->close();

    if (!$demoAdmin) {
        $adminName = 'Exam Admin';
        $adminPassword = password_hash('admin123', PASSWORD_DEFAULT);
        $insertAdmin = $conn->prepare('INSERT INTO admin_users (name, email, password) VALUES (?, ?, ?)');
        $insertAdmin->bind_param('sss', $adminName, $adminEmail, $adminPassword);
        $insertAdmin->execute();
        $insertAdmin->close();
    }

    $categoryRows = $conn->query('SELECT COUNT(*) AS total FROM exam_categories')->fetch_assoc();
    if ((int) $categoryRows['total'] === 0) {
        $seedCategories = [
            ['Selective School', 'selective-school', 'Selective school exam preparation.'],
            ['PSC', 'psc', 'Public Service Commission preparation.'],
            ['UPSC', 'upsc', 'UPSC prelims and general studies preparation.'],
            ['Entrance', 'entrance', 'General entrance exam practice.']
        ];
        $insertCategory = $conn->prepare('INSERT INTO exam_categories (name, slug, description) VALUES (?, ?, ?)');
        foreach ($seedCategories as $category) {
            $insertCategory->bind_param('sss', $category[0], $category[1], $category[2]);
            $insertCategory->execute();
        }
        $insertCategory->close();
    }

    $defaultCategoryRow = $conn->query("SELECT id FROM exam_categories ORDER BY id ASC LIMIT 1")->fetch_assoc();
    $defaultCategoryId = (int) ($defaultCategoryRow['id'] ?? 0);

    if ($defaultCategoryId > 0) {
        exam_run_query("UPDATE topics SET category_id = {$defaultCategoryId} WHERE category_id = 0");
        exam_run_query("UPDATE exam_sets SET category_id = {$defaultCategoryId} WHERE category_id = 0");
    }

    $planRows = $conn->query('SELECT COUNT(*) AS total FROM subscription_plans')->fetch_assoc();
    if ((int) $planRows['total'] === 0) {
        $categorySeedRows = $conn->query('SELECT id, name FROM exam_categories ORDER BY id ASC')->fetch_all(MYSQLI_ASSOC);
        $insertPlan = $conn->prepare('INSERT INTO subscription_plans (category_id, name, amount, duration_days, description) VALUES (?, ?, ?, ?, ?)');
        foreach ($categorySeedRows as $category) {
            $planName = $category['name'] . ' Monthly';
            $amount = 299.00;
            $durationDays = 30;
            $description = 'Monthly access for ' . $category['name'] . ' question sets.';
            $categoryId = (int) $category['id'];
            $insertPlan->bind_param('isdis', $categoryId, $planName, $amount, $durationDays, $description);
            $insertPlan->execute();
        }
        $insertPlan->close();
    }

    if ($demoUser) {
        $demoUserId = (int) $demoUser['id'];
    } else {
        $demoLookup = $conn->prepare('SELECT id FROM users WHERE email = ? LIMIT 1');
        $demoLookup->bind_param('s', $demoEmail);
        $demoLookup->execute();
        $demoUserId = (int) (($demoLookup->get_result()->fetch_assoc()['id'] ?? 0));
        $demoLookup->close();
    }

    if (!empty($demoUserId)) {
        $activeSubCount = $conn->prepare("SELECT COUNT(*) AS total FROM user_category_subscriptions WHERE user_id = ? AND status = 'active' AND expires_at > NOW()");
        $activeSubCount->bind_param('i', $demoUserId);
        $activeSubCount->execute();
        $demoSubTotal = (int) ($activeSubCount->get_result()->fetch_assoc()['total'] ?? 0);
        $activeSubCount->close();

        if ($demoSubTotal === 0) {
            $planSeedRows = $conn->query('SELECT id, category_id, amount, duration_days FROM subscription_plans WHERE is_active = 1')->fetch_all(MYSQLI_ASSOC);
            $insertSub = $conn->prepare('
                INSERT INTO user_category_subscriptions (user_id, plan_id, category_id, amount, status, starts_at, expires_at)
                VALUES (?, ?, ?, ?, ?, NOW(), DATE_ADD(NOW(), INTERVAL ? DAY))
            ');
            $status = 'active';
            foreach ($planSeedRows as $plan) {
                $planId = (int) $plan['id'];
                $categoryId = (int) $plan['category_id'];
                $amount = (float) $plan['amount'];
                $durationDays = (int) $plan['duration_days'];
                $insertSub->bind_param('iiidsi', $demoUserId, $planId, $categoryId, $amount, $status, $durationDays);
                $insertSub->execute();
            }
            $insertSub->close();
        }
    }

    $topicCountRow = $conn->query('SELECT COUNT(*) AS total FROM topics')->fetch_assoc();
    if ((int) $topicCountRow['total'] === 0) {
        $topicNames = ['English Basics', 'Math Basics'];
        $topicIds = [];
        $insertTopic = $conn->prepare('INSERT INTO topics (category_id, name) VALUES (?, ?)');
        foreach ($topicNames as $topicName) {
            $insertTopic->bind_param('is', $defaultCategoryId, $topicName);
            $insertTopic->execute();
            $topicIds[] = $conn->insert_id;
        }
        $insertTopic->close();

        $seedQuestions = [
            [
                'topic_id' => $topicIds[0],
                'question' => 'Which word is a noun?',
                'a' => 'run',
                'b' => 'garden',
                'c' => 'quickly',
                'd' => 'blue',
                'correct' => 'B',
                'explanation' => 'A noun names a person, place, thing, or idea. "Garden" is a place.'
            ],
            [
                'topic_id' => $topicIds[0],
                'question' => 'Choose the sentence with correct punctuation.',
                'a' => 'the sun is bright.',
                'b' => 'The sun is bright.',
                'c' => 'The sun is bright',
                'd' => 'the Sun is bright.',
                'correct' => 'B',
                'explanation' => 'A complete sentence should start with a capital letter and end with a full stop.'
            ],
            [
                'topic_id' => $topicIds[0],
                'question' => 'Which word is spelled correctly?',
                'a' => 'beleive',
                'b' => 'freind',
                'c' => 'because',
                'd' => 'wich',
                'correct' => 'C',
                'explanation' => '"Because" is the correctly spelled option.'
            ],
            [
                'topic_id' => $topicIds[1],
                'question' => 'What is 7 + 5?',
                'a' => '10',
                'b' => '11',
                'c' => '12',
                'd' => '13',
                'correct' => 'C',
                'explanation' => '7 plus 5 equals 12.'
            ],
            [
                'topic_id' => $topicIds[1],
                'question' => 'Which number is greatest?',
                'a' => '48',
                'b' => '52',
                'c' => '39',
                'd' => '45',
                'correct' => 'B',
                'explanation' => '52 is greater than 48, 39, and 45.'
            ],
            [
                'topic_id' => $topicIds[1],
                'question' => 'What is 15 - 6?',
                'a' => '7',
                'b' => '8',
                'c' => '9',
                'd' => '10',
                'correct' => 'C',
                'explanation' => '15 minus 6 equals 9.'
            ]
        ];

        $insertQuestion = $conn->prepare(
            'INSERT INTO questions (topic_id, question, option_a, option_b, option_c, option_d, correct_answer, explanation) VALUES (?, ?, ?, ?, ?, ?, ?, ?)'
        );
        foreach ($seedQuestions as $item) {
            $insertQuestion->bind_param(
                'isssssss',
                $item['topic_id'],
                $item['question'],
                $item['a'],
                $item['b'],
                $item['c'],
                $item['d'],
                $item['correct'],
                $item['explanation']
            );
            $insertQuestion->execute();
        }
        $insertQuestion->close();

        $examSetTitle = 'Starter Mixed Challenge';
        $distribution = json_encode([
            (string) $topicIds[0] => 3,
            (string) $topicIds[1] => 3
        ]);
        $timeLimit = 10;
        $insertExamSet = $conn->prepare('INSERT INTO exam_sets (category_id, title, topic_distribution, time_limit) VALUES (?, ?, ?, ?)');
        $insertExamSet->bind_param('issi', $defaultCategoryId, $examSetTitle, $distribution, $timeLimit);
        $insertExamSet->execute();
        $insertExamSet->close();
    }
}
