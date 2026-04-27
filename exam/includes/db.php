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

    exam_run_query("
        CREATE TABLE IF NOT EXISTS topics (
            id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
            name VARCHAR(150) NOT NULL,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
    ");

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

    exam_run_query("
        CREATE TABLE IF NOT EXISTS exam_blueprints (
            id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
            title VARCHAR(180) NOT NULL,
            topic_distribution JSON NOT NULL,
            time_limit INT UNSIGNED NOT NULL DEFAULT 30,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
    ");

    exam_run_query("
        CREATE TABLE IF NOT EXISTS user_exams (
            id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
            user_id INT UNSIGNED NOT NULL,
            blueprint_id INT UNSIGNED NOT NULL,
            time_limit INT UNSIGNED NOT NULL DEFAULT 30,
            question_ids TEXT NOT NULL,
            answers JSON NULL,
            score INT UNSIGNED NOT NULL DEFAULT 0,
            status VARCHAR(40) NOT NULL DEFAULT 'in_progress',
            started_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            completed_at TIMESTAMP NULL DEFAULT NULL,
            CONSTRAINT fk_user_exams_user FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
            CONSTRAINT fk_user_exams_blueprint FOREIGN KEY (blueprint_id) REFERENCES exam_blueprints(id) ON DELETE CASCADE
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
    ");

    exam_run_query("ALTER TABLE user_exams ADD COLUMN IF NOT EXISTS time_limit INT UNSIGNED NOT NULL DEFAULT 30 AFTER blueprint_id");
    exam_run_query("UPDATE user_exams ue INNER JOIN exam_blueprints eb ON eb.id = ue.blueprint_id SET ue.time_limit = eb.time_limit WHERE ue.time_limit IS NULL OR ue.time_limit = 0");

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

    $topicCountRow = $conn->query('SELECT COUNT(*) AS total FROM topics')->fetch_assoc();
    if ((int) $topicCountRow['total'] === 0) {
        $topicNames = ['English Basics', 'Math Basics'];
        $topicIds = [];
        $insertTopic = $conn->prepare('INSERT INTO topics (name) VALUES (?)');
        foreach ($topicNames as $topicName) {
            $insertTopic->bind_param('s', $topicName);
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

        $blueprintTitle = 'Starter Mixed Challenge';
        $distribution = json_encode([
            (string) $topicIds[0] => 3,
            (string) $topicIds[1] => 3
        ]);
        $timeLimit = 10;
        $insertBlueprint = $conn->prepare('INSERT INTO exam_blueprints (title, topic_distribution, time_limit) VALUES (?, ?, ?)');
        $insertBlueprint->bind_param('ssi', $blueprintTitle, $distribution, $timeLimit);
        $insertBlueprint->execute();
        $insertBlueprint->close();
    }
}
