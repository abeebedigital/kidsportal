<?php
declare(strict_types=1);

if (!function_exists('ep_schema_query')) {
    function ep_schema_query(string $sql): void
    {
        ep_db()->query($sql);
    }
}

if (!function_exists('ep_schema_has_column')) {
    function ep_schema_has_column(string $tableName, string $columnName): bool
    {
        $schema = ep_db_name();
        $stmt = ep_db()->prepare(
            'SELECT COUNT(*) AS total
             FROM information_schema.COLUMNS
             WHERE TABLE_SCHEMA = ?
               AND TABLE_NAME = ?
               AND COLUMN_NAME = ?
             LIMIT 1'
        );
        $stmt->bind_param('sss', $schema, $tableName, $columnName);
        $stmt->execute();
        $row = $stmt->get_result()->fetch_assoc();
        $stmt->close();

        return (int) ($row['total'] ?? 0) > 0;
    }
}

if (!function_exists('ep_seed_categories')) {
    function ep_seed_categories(): void
    {
        $categories = [
            ['Selective School', 'selective-school', 'Selective school exam preparation.', 1],
            ['NAPLAN', 'naplan', 'NAPLAN model questions by year and subject.', 2],
            ['PSC', 'psc', 'Public Service Commission preparation.', 3],
            ['UPSC', 'upsc', 'UPSC prelims and subject prep.', 4],
            ['Entrance', 'entrance', 'General entrance examination sets.', 5],
        ];

        $stmt = ep_db()->prepare(
            'INSERT INTO ep_exam_categories (name, slug, description, sort_order, is_active) VALUES (?, ?, ?, ?, 1)
             ON DUPLICATE KEY UPDATE name = VALUES(name), description = VALUES(description), sort_order = VALUES(sort_order), is_active = 1'
        );

        foreach ($categories as $row) {
            [$name, $slug, $description, $order] = $row;
            $stmt->bind_param('sssi', $name, $slug, $description, $order);
            $stmt->execute();
        }

        $stmt->close();
    }
}

if (!function_exists('ep_seed_plans')) {
    function ep_seed_plans(): void
    {
        $plans = [
            ['Starter Monthly', 'starter-monthly', 'Best for regular weekly practice.', 20, 30, 19.00],
            ['Pro Monthly', 'pro-monthly', 'Higher limits for intensive exam prep.', 60, 30, 39.00],
            ['Pro Yearly', 'pro-yearly', 'Long-term prep with best value pricing.', 900, 365, 299.00],
        ];

        $stmt = ep_db()->prepare(
            'INSERT INTO ep_subscription_plans (name, slug, description, max_papers_per_cycle, duration_days, price_aud, is_active)
             VALUES (?, ?, ?, ?, ?, ?, 1)
             ON DUPLICATE KEY UPDATE
               name = VALUES(name),
               description = VALUES(description),
               max_papers_per_cycle = VALUES(max_papers_per_cycle),
               duration_days = VALUES(duration_days),
               price_aud = VALUES(price_aud),
               is_active = 1'
        );

        foreach ($plans as $plan) {
            [$name, $slug, $description, $maxPapers, $durationDays, $price] = $plan;
            $stmt->bind_param('sssiid', $name, $slug, $description, $maxPapers, $durationDays, $price);
            $stmt->execute();
        }

        $stmt->close();
    }
}

if (!function_exists('ep_seed_question_sets')) {
    function ep_seed_question_sets(): void
    {
        $categoryRows = ep_db()->query('SELECT id, slug FROM ep_exam_categories')->fetch_all(MYSQLI_ASSOC);
        $categoryIds = [];
        foreach ($categoryRows as $row) {
            $categoryIds[$row['slug']] = (int) $row['id'];
        }

        $sets = [
            ['selective-school', 'Selective Reasoning Set 01', 'Year 5-6', 'Reasoning', 45, 40],
            ['selective-school', 'Selective Maths Set 01', 'Year 5-6', 'Mathematics', 40, 40],
            ['naplan', 'NAPLAN Language Conventions Set A', 'Year 5', 'Language Conventions', 42, 40],
            ['naplan', 'NAPLAN Numeracy Set A', 'Year 7', 'Numeracy', 36, 45],
            ['psc', 'PSC Aptitude Set 01', 'General', 'Aptitude', 50, 60],
            ['upsc', 'UPSC GS Prelims Mini Test 01', '2026', 'General Studies', 50, 60],
            ['entrance', 'Entrance Mixed Practice 01', 'Foundation', 'Mixed', 35, 45],
        ];

        $stmt = ep_db()->prepare(
            'INSERT INTO ep_question_sets (category_id, title, exam_year, subject, total_questions, duration_minutes, is_active)
             VALUES (?, ?, ?, ?, ?, ?, 1)
             ON DUPLICATE KEY UPDATE
               exam_year = VALUES(exam_year),
               subject = VALUES(subject),
               total_questions = VALUES(total_questions),
               duration_minutes = VALUES(duration_minutes),
               is_active = 1'
        );

        foreach ($sets as $set) {
            [$slug, $title, $examYear, $subject, $totalQuestions, $durationMinutes] = $set;
            if (!isset($categoryIds[$slug])) {
                continue;
            }

            $categoryId = $categoryIds[$slug];
            $stmt->bind_param('isssii', $categoryId, $title, $examYear, $subject, $totalQuestions, $durationMinutes);
            $stmt->execute();
        }

        $stmt->close();
    }
}

if (!function_exists('ep_slugify')) {
    function ep_slugify(string $value): string
    {
        $slug = strtolower(trim($value));
        $slug = preg_replace('/[^a-z0-9]+/', '-', $slug) ?? '';
        $slug = trim($slug, '-');

        if ($slug === '') {
            return 'item';
        }

        return substr($slug, 0, 170);
    }
}

if (!function_exists('ep_seed_subjects')) {
    function ep_seed_subjects(): void
    {
        $subjectRows = ep_db()->query(
            "SELECT DISTINCT category_id, subject
             FROM ep_question_sets
             WHERE subject IS NOT NULL AND TRIM(subject) <> ''"
        )->fetch_all(MYSQLI_ASSOC);

        if (!$subjectRows) {
            return;
        }

        $stmt = ep_db()->prepare(
            'INSERT INTO ep_subjects (category_id, name, slug, is_active)
             VALUES (?, ?, ?, 1)
             ON DUPLICATE KEY UPDATE name = VALUES(name), is_active = 1'
        );

        foreach ($subjectRows as $row) {
            $categoryId = (int) $row['category_id'];
            $name = trim((string) $row['subject']);
            if ($name === '') {
                continue;
            }
            $slug = ep_slugify($name);
            $stmt->bind_param('iss', $categoryId, $name, $slug);
            $stmt->execute();
        }

        $stmt->close();
    }
}

if (!function_exists('ep_seed_paper_templates')) {
    function ep_seed_paper_templates(): void
    {
        $setRows = ep_db()->query(
            'SELECT id, category_id, title, exam_year, subject, total_questions, duration_minutes
             FROM ep_question_sets
             WHERE is_active = 1'
        )->fetch_all(MYSQLI_ASSOC);

        if (!$setRows) {
            return;
        }

        $stmt = ep_db()->prepare(
             'INSERT INTO ep_paper_templates (
                category_id,
                question_set_id,
                title,
                slug,
                exam_year,
                subject_name,
                duration_minutes,
                total_questions,
                max_pause_count,
                allow_pause,
                no_refresh_mode,
                max_refresh_violations,
                published_status,
                is_active
             ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, 3, 1, 1, 1, \'published\', 1)
             ON DUPLICATE KEY UPDATE
                question_set_id = VALUES(question_set_id),
                exam_year = VALUES(exam_year),
                subject_name = VALUES(subject_name),
                duration_minutes = VALUES(duration_minutes),
                total_questions = VALUES(total_questions),
                max_refresh_violations = VALUES(max_refresh_violations),
                is_active = 1'
        );

        foreach ($setRows as $row) {
            $categoryId = (int) $row['category_id'];
            $questionSetId = (int) $row['id'];
            $title = (string) $row['title'];
            $slug = ep_slugify($title);
            $examYear = (string) ($row['exam_year'] ?? '');
            $subject = (string) ($row['subject'] ?? '');
            $durationMinutes = (int) ($row['duration_minutes'] ?? 60);
            $totalQuestions = (int) ($row['total_questions'] ?? 0);

            $stmt->bind_param(
                'iissssii',
                $categoryId,
                $questionSetId,
                $title,
                $slug,
                $examYear,
                $subject,
                $durationMinutes,
                $totalQuestions
            );
            $stmt->execute();
        }

        $stmt->close();
    }
}

if (!function_exists('ep_seed_demo_user')) {
    function ep_seed_demo_user(): void
    {
        $demoEmail = 'subscriber@examportal.com';

        $checkUser = ep_db()->prepare('SELECT id FROM ep_users WHERE email = ? LIMIT 1');
        $checkUser->bind_param('s', $demoEmail);
        $checkUser->execute();
        $userRow = $checkUser->get_result()->fetch_assoc();
        $checkUser->close();

        if ($userRow) {
            $userId = (int) $userRow['id'];
            $roleUser = 'user';
            $enforceUserRole = ep_db()->prepare('UPDATE ep_users SET role = ? WHERE id = ?');
            $enforceUserRole->bind_param('si', $roleUser, $userId);
            $enforceUserRole->execute();
            $enforceUserRole->close();
        } else {
            $name = 'Demo Subscriber';
            $passwordHash = password_hash('demo12345', PASSWORD_DEFAULT);
            $role = 'user';

            $insertUser = ep_db()->prepare('INSERT INTO ep_users (name, email, role, password_hash, is_active) VALUES (?, ?, ?, ?, 1)');
            $insertUser->bind_param('ssss', $name, $demoEmail, $role, $passwordHash);
            $insertUser->execute();
            $userId = (int) ep_db()->insert_id;
            $insertUser->close();
        }

        $planRow = ep_db()->query("SELECT id, duration_days FROM ep_subscription_plans WHERE slug = 'starter-monthly' LIMIT 1")->fetch_assoc();
        if (!$planRow) {
            return;
        }

        $planId = (int) $planRow['id'];
        $durationDays = (int) $planRow['duration_days'];

        $checkSubscription = ep_db()->prepare(
            "SELECT id FROM ep_user_subscriptions WHERE user_id = ? AND status = 'active' AND expires_at > UTC_TIMESTAMP() LIMIT 1"
        );
        $checkSubscription->bind_param('i', $userId);
        $checkSubscription->execute();
        $activeSub = $checkSubscription->get_result()->fetch_assoc();
        $checkSubscription->close();

        if ($activeSub) {
            return;
        }

        $startedAt = gmdate('Y-m-d H:i:s');
        $expiresAt = gmdate('Y-m-d H:i:s', time() + ($durationDays * 86400));
        $status = 'active';

        $insertSubscription = ep_db()->prepare(
            'INSERT INTO ep_user_subscriptions (user_id, plan_id, status, started_at, expires_at, papers_used) VALUES (?, ?, ?, ?, ?, 0)'
        );
        $insertSubscription->bind_param('iisss', $userId, $planId, $status, $startedAt, $expiresAt);
        $insertSubscription->execute();
        $insertSubscription->close();
    }
}

if (!function_exists('ep_seed_admin_user')) {
    function ep_seed_admin_user(): void
    {
        $adminEmail = 'admin@examportal.com';

        $checkUser = ep_db()->prepare('SELECT id FROM ep_users WHERE email = ? LIMIT 1');
        $checkUser->bind_param('s', $adminEmail);
        $checkUser->execute();
        $userRow = $checkUser->get_result()->fetch_assoc();
        $checkUser->close();

        if ($userRow) {
            $userId = (int) $userRow['id'];
            $roleAdmin = 'admin';
            $enforceRole = ep_db()->prepare('UPDATE ep_users SET role = ? WHERE id = ?');
            $enforceRole->bind_param('si', $roleAdmin, $userId);
            $enforceRole->execute();
            $enforceRole->close();
            return;
        }

        $name = 'Portal Admin';
        $role = 'admin';
        $passwordHash = password_hash('admin12345', PASSWORD_DEFAULT);

        $insertUser = ep_db()->prepare('INSERT INTO ep_users (name, email, role, password_hash, is_active) VALUES (?, ?, ?, ?, 1)');
        $insertUser->bind_param('ssss', $name, $adminEmail, $role, $passwordHash);
        $insertUser->execute();
        $insertUser->close();
    }
}

if (!function_exists('ep_bootstrap_schema')) {
    function ep_bootstrap_schema(): void
    {
        static $initialized = false;

        if ($initialized) {
            return;
        }

        $initialized = true;

        ep_schema_query(
            "CREATE TABLE IF NOT EXISTS ep_users (
                id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
                name VARCHAR(120) NOT NULL,
                email VARCHAR(190) NOT NULL UNIQUE,
                role ENUM('user','admin') NOT NULL DEFAULT 'user',
                password_hash VARCHAR(255) NOT NULL,
                is_active TINYINT(1) NOT NULL DEFAULT 1,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
                last_login_at DATETIME NULL
            ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci"
        );

        if (!ep_schema_has_column('ep_users', 'role')) {
            ep_schema_query("ALTER TABLE ep_users ADD COLUMN role ENUM('user','admin') NOT NULL DEFAULT 'user' AFTER email");
        }
        ep_schema_query("ALTER TABLE ep_users MODIFY COLUMN role ENUM('user','admin') NOT NULL DEFAULT 'user'");

        ep_schema_query(
            "CREATE TABLE IF NOT EXISTS ep_subscription_plans (
                id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
                name VARCHAR(120) NOT NULL,
                slug VARCHAR(120) NOT NULL UNIQUE,
                description VARCHAR(255) NULL,
                max_papers_per_cycle INT UNSIGNED NOT NULL DEFAULT 10,
                duration_days INT UNSIGNED NOT NULL DEFAULT 30,
                price_aud DECIMAL(10,2) NOT NULL DEFAULT 0.00,
                is_active TINYINT(1) NOT NULL DEFAULT 1,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci"
        );

        ep_schema_query(
            "CREATE TABLE IF NOT EXISTS ep_user_subscriptions (
                id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
                user_id INT UNSIGNED NOT NULL,
                plan_id INT UNSIGNED NOT NULL,
                status ENUM('active','expired','cancelled','pending') NOT NULL DEFAULT 'pending',
                started_at DATETIME NULL,
                expires_at DATETIME NULL,
                papers_used INT UNSIGNED NOT NULL DEFAULT 0,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
                INDEX idx_ep_user_status (user_id, status),
                CONSTRAINT fk_ep_subscription_user FOREIGN KEY (user_id) REFERENCES ep_users(id) ON DELETE CASCADE,
                CONSTRAINT fk_ep_subscription_plan FOREIGN KEY (plan_id) REFERENCES ep_subscription_plans(id) ON DELETE RESTRICT
            ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci"
        );

        ep_schema_query(
            "CREATE TABLE IF NOT EXISTS ep_auth_sessions (
                id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
                user_id INT UNSIGNED NOT NULL,
                session_token CHAR(64) NOT NULL UNIQUE,
                ip_address VARCHAR(45) NULL,
                user_agent VARCHAR(255) NULL,
                last_seen_at DATETIME NOT NULL,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                revoked_at DATETIME NULL,
                INDEX idx_ep_auth_user (user_id),
                CONSTRAINT fk_ep_auth_user FOREIGN KEY (user_id) REFERENCES ep_users(id) ON DELETE CASCADE
            ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci"
        );

        ep_schema_query(
            "CREATE TABLE IF NOT EXISTS ep_exam_categories (
                id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
                name VARCHAR(120) NOT NULL,
                slug VARCHAR(120) NOT NULL UNIQUE,
                description VARCHAR(255) NULL,
                sort_order INT UNSIGNED NOT NULL DEFAULT 0,
                is_active TINYINT(1) NOT NULL DEFAULT 1,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci"
        );

        ep_schema_query(
            "CREATE TABLE IF NOT EXISTS ep_question_sets (
                id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
                category_id INT UNSIGNED NOT NULL,
                title VARCHAR(180) NOT NULL,
                exam_year VARCHAR(80) NULL,
                subject VARCHAR(120) NULL,
                total_questions INT UNSIGNED NOT NULL DEFAULT 0,
                duration_minutes INT UNSIGNED NOT NULL DEFAULT 60,
                is_active TINYINT(1) NOT NULL DEFAULT 1,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                UNIQUE KEY uq_ep_set (category_id, title),
                CONSTRAINT fk_ep_set_category FOREIGN KEY (category_id) REFERENCES ep_exam_categories(id) ON DELETE CASCADE
            ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci"
        );

        ep_schema_query(
            "CREATE TABLE IF NOT EXISTS ep_subjects (
                id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
                category_id INT UNSIGNED NOT NULL,
                name VARCHAR(120) NOT NULL,
                slug VARCHAR(170) NOT NULL,
                is_active TINYINT(1) NOT NULL DEFAULT 1,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                UNIQUE KEY uq_ep_subject (category_id, slug),
                CONSTRAINT fk_ep_subject_category FOREIGN KEY (category_id) REFERENCES ep_exam_categories(id) ON DELETE CASCADE
            ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci"
        );

        ep_schema_query(
            "CREATE TABLE IF NOT EXISTS ep_questions (
                id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
                category_id INT UNSIGNED NOT NULL,
                subject_id INT UNSIGNED NULL,
                question_set_id INT UNSIGNED NULL,
                question_type ENUM('mcq_single','mcq_multi','numeric','short_text','true_false') NOT NULL DEFAULT 'mcq_single',
                exam_year VARCHAR(80) NULL,
                difficulty_level ENUM('easy','medium','hard') NOT NULL DEFAULT 'medium',
                question_text TEXT NOT NULL,
                hint_text TEXT NULL,
                explanation_text TEXT NULL,
                default_marks DECIMAL(6,2) NOT NULL DEFAULT 1.00,
                negative_marks DECIMAL(6,2) NOT NULL DEFAULT 0.00,
                source_type ENUM('manual','csv','json','api') NOT NULL DEFAULT 'manual',
                source_ref VARCHAR(190) NULL,
                is_active TINYINT(1) NOT NULL DEFAULT 1,
                created_by_user_id INT UNSIGNED NULL,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
                INDEX idx_ep_questions_lookup (category_id, subject_id, is_active),
                INDEX idx_ep_questions_set (question_set_id),
                CONSTRAINT fk_ep_question_category FOREIGN KEY (category_id) REFERENCES ep_exam_categories(id) ON DELETE CASCADE,
                CONSTRAINT fk_ep_question_subject FOREIGN KEY (subject_id) REFERENCES ep_subjects(id) ON DELETE SET NULL,
                CONSTRAINT fk_ep_question_set FOREIGN KEY (question_set_id) REFERENCES ep_question_sets(id) ON DELETE SET NULL,
                CONSTRAINT fk_ep_question_author FOREIGN KEY (created_by_user_id) REFERENCES ep_users(id) ON DELETE SET NULL
            ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci"
        );

        ep_schema_query(
            "CREATE TABLE IF NOT EXISTS ep_question_options (
                id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
                question_id BIGINT UNSIGNED NOT NULL,
                option_key CHAR(1) NOT NULL,
                option_text VARCHAR(1000) NOT NULL,
                is_correct TINYINT(1) NOT NULL DEFAULT 0,
                sort_order INT UNSIGNED NOT NULL DEFAULT 0,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                UNIQUE KEY uq_ep_option_key (question_id, option_key),
                INDEX idx_ep_option_question_order (question_id, sort_order),
                CONSTRAINT fk_ep_option_question FOREIGN KEY (question_id) REFERENCES ep_questions(id) ON DELETE CASCADE
            ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci"
        );

        ep_schema_query(
            "CREATE TABLE IF NOT EXISTS ep_question_answer_keys (
                id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
                question_id BIGINT UNSIGNED NOT NULL,
                answer_type ENUM('single_option','multi_option','numeric','text','boolean') NOT NULL DEFAULT 'single_option',
                correct_option_keys VARCHAR(32) NULL,
                correct_text TEXT NULL,
                correct_numeric DECIMAL(12,4) NULL,
                numeric_tolerance DECIMAL(12,4) NULL,
                answer_meta_json JSON NULL,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
                UNIQUE KEY uq_ep_answer_key_question (question_id),
                CONSTRAINT fk_ep_answer_key_question FOREIGN KEY (question_id) REFERENCES ep_questions(id) ON DELETE CASCADE
            ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci"
        );

        ep_schema_query(
            "CREATE TABLE IF NOT EXISTS ep_tags (
                id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
                name VARCHAR(100) NOT NULL,
                slug VARCHAR(120) NOT NULL UNIQUE,
                is_active TINYINT(1) NOT NULL DEFAULT 1,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci"
        );

        ep_schema_query(
            "CREATE TABLE IF NOT EXISTS ep_question_tags (
                id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
                question_id BIGINT UNSIGNED NOT NULL,
                tag_id BIGINT UNSIGNED NOT NULL,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                UNIQUE KEY uq_ep_question_tag (question_id, tag_id),
                INDEX idx_ep_question_tag_tag (tag_id),
                CONSTRAINT fk_ep_question_tag_question FOREIGN KEY (question_id) REFERENCES ep_questions(id) ON DELETE CASCADE,
                CONSTRAINT fk_ep_question_tag_tag FOREIGN KEY (tag_id) REFERENCES ep_tags(id) ON DELETE CASCADE
            ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci"
        );

        ep_schema_query(
            "CREATE TABLE IF NOT EXISTS ep_paper_templates (
                id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
                category_id INT UNSIGNED NOT NULL,
                question_set_id INT UNSIGNED NULL,
                title VARCHAR(180) NOT NULL,
                slug VARCHAR(180) NOT NULL,
                exam_year VARCHAR(80) NULL,
                subject_name VARCHAR(120) NULL,
                instructions TEXT NULL,
                duration_minutes INT UNSIGNED NOT NULL DEFAULT 60,
                total_questions INT UNSIGNED NOT NULL DEFAULT 0,
                max_attempts_per_user INT UNSIGNED NOT NULL DEFAULT 1,
                allow_pause TINYINT(1) NOT NULL DEFAULT 1,
                max_pause_count INT UNSIGNED NOT NULL DEFAULT 3,
                no_refresh_mode TINYINT(1) NOT NULL DEFAULT 1,
                max_refresh_violations INT UNSIGNED NOT NULL DEFAULT 1,
                published_status ENUM('draft','published','archived') NOT NULL DEFAULT 'draft',
                is_active TINYINT(1) NOT NULL DEFAULT 1,
                created_by_user_id INT UNSIGNED NULL,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
                UNIQUE KEY uq_ep_template_title (category_id, title),
                UNIQUE KEY uq_ep_template_slug (category_id, slug),
                INDEX idx_ep_template_status (published_status, is_active),
                CONSTRAINT fk_ep_template_category FOREIGN KEY (category_id) REFERENCES ep_exam_categories(id) ON DELETE CASCADE,
                CONSTRAINT fk_ep_template_set FOREIGN KEY (question_set_id) REFERENCES ep_question_sets(id) ON DELETE SET NULL,
                CONSTRAINT fk_ep_template_author FOREIGN KEY (created_by_user_id) REFERENCES ep_users(id) ON DELETE SET NULL
            ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci"
        );
        if (!ep_schema_has_column('ep_paper_templates', 'max_refresh_violations')) {
            ep_schema_query('ALTER TABLE ep_paper_templates ADD COLUMN max_refresh_violations INT UNSIGNED NOT NULL DEFAULT 1 AFTER no_refresh_mode');
        }
        ep_schema_query('ALTER TABLE ep_paper_templates MODIFY COLUMN max_refresh_violations INT UNSIGNED NOT NULL DEFAULT 1');

        ep_schema_query(
            "CREATE TABLE IF NOT EXISTS ep_paper_template_items (
                id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
                template_id BIGINT UNSIGNED NOT NULL,
                question_id BIGINT UNSIGNED NOT NULL,
                section_name VARCHAR(120) NULL,
                marks DECIMAL(6,2) NOT NULL DEFAULT 1.00,
                display_order INT UNSIGNED NOT NULL DEFAULT 0,
                is_required TINYINT(1) NOT NULL DEFAULT 1,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                UNIQUE KEY uq_ep_template_question (template_id, question_id),
                INDEX idx_ep_template_item_order (template_id, display_order),
                CONSTRAINT fk_ep_template_item_template FOREIGN KEY (template_id) REFERENCES ep_paper_templates(id) ON DELETE CASCADE,
                CONSTRAINT fk_ep_template_item_question FOREIGN KEY (question_id) REFERENCES ep_questions(id) ON DELETE RESTRICT
            ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci"
        );

        ep_schema_query(
            "CREATE TABLE IF NOT EXISTS ep_exam_attempts (
                id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
                attempt_uuid CHAR(36) NOT NULL,
                user_id INT UNSIGNED NOT NULL,
                template_id BIGINT UNSIGNED NULL,
                question_set_id INT UNSIGNED NULL,
                status ENUM('not_started','in_progress','paused','auto_submitted','submitted','evaluated','abandoned') NOT NULL DEFAULT 'in_progress',
                started_at DATETIME NOT NULL,
                ends_at DATETIME NULL,
                submitted_at DATETIME NULL,
                last_saved_at DATETIME NULL,
                paused_at DATETIME NULL,
                resume_count INT UNSIGNED NOT NULL DEFAULT 0,
                pause_seconds_accum INT UNSIGNED NOT NULL DEFAULT 0,
                remaining_seconds INT UNSIGNED NULL,
                no_refresh_violations INT UNSIGNED NOT NULL DEFAULT 0,
                client_snapshot_json JSON NULL,
                score_obtained DECIMAL(8,2) NULL,
                max_score DECIMAL(8,2) NULL,
                percentage DECIMAL(5,2) NULL,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
                UNIQUE KEY uq_ep_attempt_uuid (attempt_uuid),
                INDEX idx_ep_attempt_user_status (user_id, status),
                INDEX idx_ep_attempt_template (template_id),
                CONSTRAINT fk_ep_attempt_user FOREIGN KEY (user_id) REFERENCES ep_users(id) ON DELETE CASCADE,
                CONSTRAINT fk_ep_attempt_template FOREIGN KEY (template_id) REFERENCES ep_paper_templates(id) ON DELETE SET NULL,
                CONSTRAINT fk_ep_attempt_set FOREIGN KEY (question_set_id) REFERENCES ep_question_sets(id) ON DELETE SET NULL
            ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci"
        );

        ep_schema_query(
            "CREATE TABLE IF NOT EXISTS ep_exam_attempt_answers (
                id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
                attempt_id BIGINT UNSIGNED NOT NULL,
                question_id BIGINT UNSIGNED NOT NULL,
                selected_option_keys VARCHAR(32) NULL,
                answer_text TEXT NULL,
                answer_numeric DECIMAL(12,4) NULL,
                is_correct TINYINT(1) NULL,
                marks_awarded DECIMAL(6,2) NOT NULL DEFAULT 0.00,
                time_spent_seconds INT UNSIGNED NOT NULL DEFAULT 0,
                evaluated_at DATETIME NULL,
                updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
                UNIQUE KEY uq_ep_attempt_question (attempt_id, question_id),
                INDEX idx_ep_attempt_answer_eval (attempt_id, is_correct),
                CONSTRAINT fk_ep_attempt_answer_attempt FOREIGN KEY (attempt_id) REFERENCES ep_exam_attempts(id) ON DELETE CASCADE,
                CONSTRAINT fk_ep_attempt_answer_question FOREIGN KEY (question_id) REFERENCES ep_questions(id) ON DELETE RESTRICT
            ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci"
        );

        ep_schema_query(
            "CREATE TABLE IF NOT EXISTS ep_exam_attempt_events (
                id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
                attempt_id BIGINT UNSIGNED NOT NULL,
                actor_user_id INT UNSIGNED NULL,
                event_type ENUM('start','autosave','answer_change','pause','resume','tab_hidden','tab_visible','refresh_detected','submit_manual','submit_auto','timeout','rejoin') NOT NULL,
                event_payload_json JSON NULL,
                created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
                INDEX idx_ep_attempt_event_attempt (attempt_id, created_at),
                INDEX idx_ep_attempt_event_type (event_type, created_at),
                CONSTRAINT fk_ep_attempt_event_attempt FOREIGN KEY (attempt_id) REFERENCES ep_exam_attempts(id) ON DELETE CASCADE,
                CONSTRAINT fk_ep_attempt_event_user FOREIGN KEY (actor_user_id) REFERENCES ep_users(id) ON DELETE SET NULL
            ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci"
        );

        ep_schema_query(
            "CREATE TABLE IF NOT EXISTS ep_exam_results (
                id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
                attempt_id BIGINT UNSIGNED NOT NULL,
                user_id INT UNSIGNED NOT NULL,
                total_questions INT UNSIGNED NOT NULL DEFAULT 0,
                attempted_questions INT UNSIGNED NOT NULL DEFAULT 0,
                correct_answers INT UNSIGNED NOT NULL DEFAULT 0,
                wrong_answers INT UNSIGNED NOT NULL DEFAULT 0,
                unanswered_count INT UNSIGNED NOT NULL DEFAULT 0,
                score_obtained DECIMAL(8,2) NOT NULL DEFAULT 0.00,
                max_score DECIMAL(8,2) NOT NULL DEFAULT 0.00,
                percentage DECIMAL(5,2) NOT NULL DEFAULT 0.00,
                rank_label VARCHAR(60) NULL,
                summary_json JSON NULL,
                published_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
                UNIQUE KEY uq_ep_result_attempt (attempt_id),
                INDEX idx_ep_result_user (user_id, published_at),
                CONSTRAINT fk_ep_result_attempt FOREIGN KEY (attempt_id) REFERENCES ep_exam_attempts(id) ON DELETE CASCADE,
                CONSTRAINT fk_ep_result_user FOREIGN KEY (user_id) REFERENCES ep_users(id) ON DELETE CASCADE
            ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci"
        );

        ep_schema_query(
            "CREATE TABLE IF NOT EXISTS ep_user_progress (
                id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
                user_id INT UNSIGNED NOT NULL,
                category_id INT UNSIGNED NOT NULL,
                subject_key VARCHAR(120) NOT NULL DEFAULT '',
                attempts_count INT UNSIGNED NOT NULL DEFAULT 0,
                papers_completed INT UNSIGNED NOT NULL DEFAULT 0,
                best_score DECIMAL(8,2) NOT NULL DEFAULT 0.00,
                avg_percentage DECIMAL(5,2) NOT NULL DEFAULT 0.00,
                last_attempt_at DATETIME NULL,
                streak_days INT UNSIGNED NOT NULL DEFAULT 0,
                mastery_level ENUM('beginner','developing','proficient','advanced') NOT NULL DEFAULT 'beginner',
                progress_json JSON NULL,
                updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
                UNIQUE KEY uq_ep_progress_user_scope (user_id, category_id, subject_key),
                CONSTRAINT fk_ep_progress_user FOREIGN KEY (user_id) REFERENCES ep_users(id) ON DELETE CASCADE,
                CONSTRAINT fk_ep_progress_category FOREIGN KEY (category_id) REFERENCES ep_exam_categories(id) ON DELETE CASCADE
            ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci"
        );

        ep_schema_query(
            "CREATE TABLE IF NOT EXISTS ep_subscription_usage_events (
                id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
                subscription_id INT UNSIGNED NOT NULL,
                user_id INT UNSIGNED NOT NULL,
                attempt_id BIGINT UNSIGNED NULL,
                event_type ENUM('paper_started','paper_submitted','paper_cancelled','manual_adjustment') NOT NULL DEFAULT 'paper_started',
                papers_delta INT NOT NULL DEFAULT 0,
                note VARCHAR(255) NULL,
                created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
                INDEX idx_ep_sub_usage_subscription (subscription_id, created_at),
                INDEX idx_ep_sub_usage_user (user_id, created_at),
                CONSTRAINT fk_ep_sub_usage_subscription FOREIGN KEY (subscription_id) REFERENCES ep_user_subscriptions(id) ON DELETE CASCADE,
                CONSTRAINT fk_ep_sub_usage_user FOREIGN KEY (user_id) REFERENCES ep_users(id) ON DELETE CASCADE,
                CONSTRAINT fk_ep_sub_usage_attempt FOREIGN KEY (attempt_id) REFERENCES ep_exam_attempts(id) ON DELETE SET NULL
            ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci"
        );

        ep_schema_query(
            "CREATE TABLE IF NOT EXISTS ep_import_jobs (
                id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
                created_by_user_id INT UNSIGNED NULL,
                import_type ENUM('questions_json','questions_csv','question_options_csv','manual_bulk') NOT NULL,
                source_format ENUM('json','csv','manual') NOT NULL DEFAULT 'manual',
                source_filename VARCHAR(255) NULL,
                status ENUM('uploaded','validating','validated','imported','failed','rolled_back') NOT NULL DEFAULT 'uploaded',
                total_rows INT UNSIGNED NOT NULL DEFAULT 0,
                success_rows INT UNSIGNED NOT NULL DEFAULT 0,
                failed_rows INT UNSIGNED NOT NULL DEFAULT 0,
                started_at DATETIME NULL,
                completed_at DATETIME NULL,
                error_summary TEXT NULL,
                payload_json JSON NULL,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
                INDEX idx_ep_import_status (status, created_at),
                CONSTRAINT fk_ep_import_job_user FOREIGN KEY (created_by_user_id) REFERENCES ep_users(id) ON DELETE SET NULL
            ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci"
        );

        ep_schema_query(
            "CREATE TABLE IF NOT EXISTS ep_import_job_rows (
                id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
                import_job_id BIGINT UNSIGNED NOT NULL,
                source_row_number INT UNSIGNED NOT NULL,
                status ENUM('pending','imported','failed','skipped') NOT NULL DEFAULT 'pending',
                category_id INT UNSIGNED NULL,
                question_id BIGINT UNSIGNED NULL,
                raw_row_json JSON NULL,
                normalized_row_json JSON NULL,
                error_message TEXT NULL,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                INDEX idx_ep_import_rows_job (import_job_id, source_row_number),
                INDEX idx_ep_import_rows_status (status),
                CONSTRAINT fk_ep_import_row_job FOREIGN KEY (import_job_id) REFERENCES ep_import_jobs(id) ON DELETE CASCADE,
                CONSTRAINT fk_ep_import_row_category FOREIGN KEY (category_id) REFERENCES ep_exam_categories(id) ON DELETE SET NULL,
                CONSTRAINT fk_ep_import_row_question FOREIGN KEY (question_id) REFERENCES ep_questions(id) ON DELETE SET NULL
            ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci"
        );

        ep_schema_query(
            "CREATE TABLE IF NOT EXISTS ep_audit_logs (
                id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
                actor_user_id INT UNSIGNED NULL,
                action VARCHAR(120) NOT NULL,
                entity_type VARCHAR(80) NOT NULL,
                entity_id VARCHAR(80) NULL,
                request_method VARCHAR(16) NULL,
                request_uri VARCHAR(255) NULL,
                ip_address VARCHAR(45) NULL,
                user_agent VARCHAR(255) NULL,
                old_values_json JSON NULL,
                new_values_json JSON NULL,
                metadata_json JSON NULL,
                created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
                INDEX idx_ep_audit_actor (actor_user_id, created_at),
                INDEX idx_ep_audit_entity (entity_type, entity_id),
                CONSTRAINT fk_ep_audit_actor FOREIGN KEY (actor_user_id) REFERENCES ep_users(id) ON DELETE SET NULL
            ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci"
        );

        ep_seed_categories();
        ep_seed_plans();
        ep_seed_question_sets();
        ep_seed_subjects();
        ep_seed_paper_templates();
        ep_seed_demo_user();
        ep_seed_admin_user();
    }
}
