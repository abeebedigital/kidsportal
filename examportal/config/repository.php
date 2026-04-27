<?php
declare(strict_types=1);

if (!function_exists('ep_bind_dynamic_params')) {
    function ep_bind_dynamic_params(mysqli_stmt $stmt, string $types, array &$values): void
    {
        if ($types === '') {
            return;
        }

        $refs = [];
        $refs[] = &$types;
        foreach ($values as $key => $value) {
            $refs[] = &$values[$key];
        }

        call_user_func_array([$stmt, 'bind_param'], $refs);
    }
}

if (!function_exists('ep_get_categories')) {
    function ep_get_categories(): array
    {
        $result = ep_db()->query('SELECT * FROM ep_exam_categories WHERE is_active = 1 ORDER BY sort_order ASC, name ASC');
        return $result->fetch_all(MYSQLI_ASSOC);
    }
}

if (!function_exists('ep_get_categories_for_admin')) {
    function ep_get_categories_for_admin(bool $includeInactive = true): array
    {
        $sql = 'SELECT * FROM ep_exam_categories';
        if (!$includeInactive) {
            $sql .= ' WHERE is_active = 1';
        }
        $sql .= ' ORDER BY sort_order ASC, name ASC';

        $result = ep_db()->query($sql);
        return $result->fetch_all(MYSQLI_ASSOC);
    }
}

if (!function_exists('ep_get_category_by_slug')) {
    function ep_get_category_by_slug(string $slug): ?array
    {
        $stmt = ep_db()->prepare('SELECT * FROM ep_exam_categories WHERE slug = ? AND is_active = 1 LIMIT 1');
        $stmt->bind_param('s', $slug);
        $stmt->execute();
        $row = $stmt->get_result()->fetch_assoc();
        $stmt->close();

        return $row ?: null;
    }
}

if (!function_exists('ep_get_subjects_for_admin')) {
    function ep_get_subjects_for_admin(?int $categoryId = null): array
    {
        $sql = 'SELECT s.id, s.category_id, s.name, s.slug, s.is_active, c.name AS category_name
                FROM ep_subjects s
                INNER JOIN ep_exam_categories c ON c.id = s.category_id';
        $types = '';
        $params = [];
        $conditions = [];

        if ($categoryId !== null && $categoryId > 0) {
            $conditions[] = 's.category_id = ?';
            $types .= 'i';
            $params[] = $categoryId;
        }

        if ($conditions) {
            $sql .= ' WHERE ' . implode(' AND ', $conditions);
        }

        $sql .= ' ORDER BY c.sort_order ASC, c.name ASC, s.name ASC';

        $stmt = ep_db()->prepare($sql);
        if ($types !== '') {
            ep_bind_dynamic_params($stmt, $types, $params);
        }
        $stmt->execute();
        $rows = $stmt->get_result()->fetch_all(MYSQLI_ASSOC);
        $stmt->close();

        return $rows;
    }
}

if (!function_exists('ep_get_question_sets_by_category')) {
    function ep_get_question_sets_by_category(int $categoryId): array
    {
        $stmt = ep_db()->prepare(
            'SELECT id, title, exam_year, subject, total_questions, duration_minutes
             FROM ep_question_sets
             WHERE category_id = ? AND is_active = 1
             ORDER BY created_at DESC, id DESC'
        );
        $stmt->bind_param('i', $categoryId);
        $stmt->execute();
        $rows = $stmt->get_result()->fetch_all(MYSQLI_ASSOC);
        $stmt->close();

        return $rows;
    }
}

if (!function_exists('ep_get_question_sets_for_admin')) {
    function ep_get_question_sets_for_admin(?int $categoryId = null): array
    {
        $sql = 'SELECT qs.id, qs.category_id, qs.title, qs.exam_year, qs.subject, qs.total_questions, qs.duration_minutes, c.name AS category_name
                FROM ep_question_sets qs
                INNER JOIN ep_exam_categories c ON c.id = qs.category_id';
        $params = [];
        $types = '';
        if ($categoryId !== null && $categoryId > 0) {
            $sql .= ' WHERE qs.category_id = ?';
            $types = 'i';
            $params[] = $categoryId;
        }
        $sql .= ' ORDER BY c.sort_order ASC, qs.title ASC';

        $stmt = ep_db()->prepare($sql);
        if ($types !== '') {
            ep_bind_dynamic_params($stmt, $types, $params);
        }
        $stmt->execute();
        $rows = $stmt->get_result()->fetch_all(MYSQLI_ASSOC);
        $stmt->close();

        return $rows;
    }
}

if (!function_exists('ep_get_question_bank')) {
    function ep_get_question_bank(array $filters = [], int $limit = 50, int $offset = 0): array
    {
        $conditions = [];
        $params = [];
        $types = '';

        $search = trim((string) ($filters['search'] ?? ''));
        if ($search !== '') {
            $conditions[] = '(q.question_text LIKE ? OR q.explanation_text LIKE ? OR q.hint_text LIKE ?)';
            $searchLike = '%' . $search . '%';
            $types .= 'sss';
            $params[] = $searchLike;
            $params[] = $searchLike;
            $params[] = $searchLike;
        }

        $categoryId = (int) ($filters['category_id'] ?? 0);
        if ($categoryId > 0) {
            $conditions[] = 'q.category_id = ?';
            $types .= 'i';
            $params[] = $categoryId;
        }

        $difficulty = trim((string) ($filters['difficulty'] ?? ''));
        if (in_array($difficulty, ['easy', 'medium', 'hard'], true)) {
            $conditions[] = 'q.difficulty_level = ?';
            $types .= 's';
            $params[] = $difficulty;
        }

        $questionType = trim((string) ($filters['question_type'] ?? ''));
        if (in_array($questionType, ['mcq_single', 'mcq_multi', 'numeric', 'short_text', 'true_false'], true)) {
            $conditions[] = 'q.question_type = ?';
            $types .= 's';
            $params[] = $questionType;
        }

        $status = trim((string) ($filters['status'] ?? 'all'));
        if ($status === 'active') {
            $conditions[] = 'q.is_active = 1';
        } elseif ($status === 'archived') {
            $conditions[] = 'q.is_active = 0';
        }

        $baseSql = ' FROM ep_questions q
                     INNER JOIN ep_exam_categories c ON c.id = q.category_id
                     LEFT JOIN ep_subjects s ON s.id = q.subject_id
                     LEFT JOIN ep_question_tags qt ON qt.question_id = q.id
                     LEFT JOIN ep_tags t ON t.id = qt.tag_id';

        if ($conditions) {
            $baseSql .= ' WHERE ' . implode(' AND ', $conditions);
        }

        $countSql = 'SELECT COUNT(DISTINCT q.id) AS total' . $baseSql;
        $countStmt = ep_db()->prepare($countSql);
        if ($types !== '') {
            $countParams = $params;
            ep_bind_dynamic_params($countStmt, $types, $countParams);
        }
        $countStmt->execute();
        $countRow = $countStmt->get_result()->fetch_assoc();
        $countStmt->close();

        $total = (int) ($countRow['total'] ?? 0);

        $limit = max(1, min(200, $limit));
        $offset = max(0, $offset);

        $sql = 'SELECT
                    q.id,
                    q.question_type,
                    q.exam_year,
                    q.difficulty_level,
                    q.question_text,
                    q.default_marks,
                    q.negative_marks,
                    q.is_active,
                    q.updated_at,
                    c.name AS category_name,
                    s.name AS subject_name,
                    GROUP_CONCAT(DISTINCT t.name ORDER BY t.name SEPARATOR ", ") AS tags
                ' . $baseSql . '
                GROUP BY q.id
                ORDER BY q.updated_at DESC, q.id DESC
                LIMIT ? OFFSET ?';

        $stmt = ep_db()->prepare($sql);
        $runTypes = $types . 'ii';
        $runParams = $params;
        $runParams[] = $limit;
        $runParams[] = $offset;
        ep_bind_dynamic_params($stmt, $runTypes, $runParams);
        $stmt->execute();
        $items = $stmt->get_result()->fetch_all(MYSQLI_ASSOC);
        $stmt->close();

        return [
            'items' => $items,
            'total' => $total,
            'limit' => $limit,
            'offset' => $offset,
        ];
    }
}

if (!function_exists('ep_get_question_detail')) {
    function ep_get_question_detail(int $questionId): ?array
    {
        $stmt = ep_db()->prepare(
            'SELECT q.*, c.name AS category_name, s.name AS subject_name
             FROM ep_questions q
             INNER JOIN ep_exam_categories c ON c.id = q.category_id
             LEFT JOIN ep_subjects s ON s.id = q.subject_id
             WHERE q.id = ?
             LIMIT 1'
        );
        $stmt->bind_param('i', $questionId);
        $stmt->execute();
        $row = $stmt->get_result()->fetch_assoc();
        $stmt->close();

        return $row ?: null;
    }
}

if (!function_exists('ep_get_question_options')) {
    function ep_get_question_options(int $questionId): array
    {
        $stmt = ep_db()->prepare(
            'SELECT id, option_key, option_text, is_correct, sort_order
             FROM ep_question_options
             WHERE question_id = ?
             ORDER BY sort_order ASC, option_key ASC'
        );
        $stmt->bind_param('i', $questionId);
        $stmt->execute();
        $rows = $stmt->get_result()->fetch_all(MYSQLI_ASSOC);
        $stmt->close();

        return $rows;
    }
}

if (!function_exists('ep_get_question_answer_key')) {
    function ep_get_question_answer_key(int $questionId): ?array
    {
        $stmt = ep_db()->prepare(
            'SELECT * FROM ep_question_answer_keys WHERE question_id = ? LIMIT 1'
        );
        $stmt->bind_param('i', $questionId);
        $stmt->execute();
        $row = $stmt->get_result()->fetch_assoc();
        $stmt->close();

        return $row ?: null;
    }
}

if (!function_exists('ep_get_question_tags')) {
    function ep_get_question_tags(int $questionId): array
    {
        $stmt = ep_db()->prepare(
            'SELECT t.id, t.name, t.slug
             FROM ep_question_tags qt
             INNER JOIN ep_tags t ON t.id = qt.tag_id
             WHERE qt.question_id = ?
             ORDER BY t.name ASC'
        );
        $stmt->bind_param('i', $questionId);
        $stmt->execute();
        $rows = $stmt->get_result()->fetch_all(MYSQLI_ASSOC);
        $stmt->close();

        return $rows;
    }
}

if (!function_exists('ep_get_all_tags')) {
    function ep_get_all_tags(): array
    {
        $result = ep_db()->query('SELECT id, name, slug FROM ep_tags WHERE is_active = 1 ORDER BY name ASC');
        return $result->fetch_all(MYSQLI_ASSOC);
    }
}

if (!function_exists('ep_find_or_create_subject')) {
    function ep_find_or_create_subject(int $categoryId, string $subjectName): int
    {
        $subjectName = trim($subjectName);
        if ($subjectName === '') {
            return 0;
        }

        $slug = ep_slugify($subjectName);

        $stmt = ep_db()->prepare('SELECT id FROM ep_subjects WHERE category_id = ? AND slug = ? LIMIT 1');
        $stmt->bind_param('is', $categoryId, $slug);
        $stmt->execute();
        $row = $stmt->get_result()->fetch_assoc();
        $stmt->close();

        if ($row) {
            return (int) $row['id'];
        }

        $insert = ep_db()->prepare(
            'INSERT INTO ep_subjects (category_id, name, slug, is_active) VALUES (?, ?, ?, 1)'
        );
        $insert->bind_param('iss', $categoryId, $subjectName, $slug);
        $insert->execute();
        $subjectId = (int) ep_db()->insert_id;
        $insert->close();

        return $subjectId;
    }
}

if (!function_exists('ep_find_or_create_tag')) {
    function ep_find_or_create_tag(string $tagName): int
    {
        $tagName = trim($tagName);
        if ($tagName === '') {
            return 0;
        }

        $slug = ep_slugify($tagName);

        $stmt = ep_db()->prepare('SELECT id FROM ep_tags WHERE slug = ? LIMIT 1');
        $stmt->bind_param('s', $slug);
        $stmt->execute();
        $row = $stmt->get_result()->fetch_assoc();
        $stmt->close();

        if ($row) {
            return (int) $row['id'];
        }

        $insert = ep_db()->prepare('INSERT INTO ep_tags (name, slug, is_active) VALUES (?, ?, 1)');
        $insert->bind_param('ss', $tagName, $slug);
        $insert->execute();
        $tagId = (int) ep_db()->insert_id;
        $insert->close();

        return $tagId;
    }
}

if (!function_exists('ep_parse_tags_csv')) {
    function ep_parse_tags_csv(string $tagsCsv): array
    {
        if (trim($tagsCsv) === '') {
            return [];
        }

        $parts = preg_split('/[,;\n]+/', $tagsCsv) ?: [];
        $result = [];
        foreach ($parts as $part) {
            $name = trim($part);
            if ($name === '') {
                continue;
            }
            $result[strtolower($name)] = $name;
        }

        return array_values($result);
    }
}

if (!function_exists('ep_audit_log')) {
    function ep_audit_log(?int $actorUserId, string $action, string $entityType, ?string $entityId, array $oldValues = [], array $newValues = [], array $meta = []): void
    {
        try {
            $method = substr((string) ($_SERVER['REQUEST_METHOD'] ?? ''), 0, 16);
            $uri = substr((string) ($_SERVER['REQUEST_URI'] ?? ''), 0, 255);
            $ip = substr((string) ($_SERVER['REMOTE_ADDR'] ?? ''), 0, 45);
            $agent = substr((string) ($_SERVER['HTTP_USER_AGENT'] ?? ''), 0, 255);
            $oldJson = $oldValues ? json_encode($oldValues, JSON_UNESCAPED_UNICODE) : null;
            $newJson = $newValues ? json_encode($newValues, JSON_UNESCAPED_UNICODE) : null;
            $metaJson = $meta ? json_encode($meta, JSON_UNESCAPED_UNICODE) : null;

            $stmt = ep_db()->prepare(
                'INSERT INTO ep_audit_logs (actor_user_id, action, entity_type, entity_id, request_method, request_uri, ip_address, user_agent, old_values_json, new_values_json, metadata_json)
                 VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)'
            );
            $stmt->bind_param(
                'issssssssss',
                $actorUserId,
                $action,
                $entityType,
                $entityId,
                $method,
                $uri,
                $ip,
                $agent,
                $oldJson,
                $newJson,
                $metaJson
            );
            $stmt->execute();
            $stmt->close();
        } catch (Throwable $e) {
            // no-op: audit should never block primary flow
        }
    }
}

if (!function_exists('ep_save_question_bank_entry')) {
    function ep_save_question_bank_entry(array $payload, int $actorUserId, ?int $questionId = null): array
    {
        $categoryId = (int) ($payload['category_id'] ?? 0);
        $subjectId = (int) ($payload['subject_id'] ?? 0);
        $newSubjectName = trim((string) ($payload['new_subject_name'] ?? ''));
        $questionSetId = (int) ($payload['question_set_id'] ?? 0);
        $questionType = (string) ($payload['question_type'] ?? 'mcq_single');
        $examYear = trim((string) ($payload['exam_year'] ?? ''));
        $difficulty = (string) ($payload['difficulty_level'] ?? 'medium');
        $questionText = trim((string) ($payload['question_text'] ?? ''));
        $hintText = trim((string) ($payload['hint_text'] ?? ''));
        $explanationText = trim((string) ($payload['explanation_text'] ?? ''));
        $defaultMarks = (float) ($payload['default_marks'] ?? 1);
        $negativeMarks = (float) ($payload['negative_marks'] ?? 0);
        $isActive = !empty($payload['is_active']) ? 1 : 0;
        $options = $payload['options'] ?? [];
        $answer = $payload['answer'] ?? [];
        $tags = $payload['tags'] ?? [];

        if ($categoryId <= 0) {
            return ['ok' => false, 'message' => 'Category is required.'];
        }
        if ($questionText === '') {
            return ['ok' => false, 'message' => 'Question text is required.'];
        }
        if ($defaultMarks < 0 || $negativeMarks < 0) {
            return ['ok' => false, 'message' => 'Marks cannot be negative.'];
        }

        if ($subjectId <= 0 && $newSubjectName !== '') {
            $subjectId = ep_find_or_create_subject($categoryId, $newSubjectName);
        }

        if ($questionSetId <= 0) {
            $questionSetId = null;
        }

        if (!$questionId) {
            $questionId = null;
        }

        $existing = null;
        if ($questionId !== null) {
            $existing = ep_get_question_detail($questionId);
            if (!$existing) {
                return ['ok' => false, 'message' => 'Question not found for update.'];
            }
        }

        ep_db()->begin_transaction();
        try {
            if ($questionId === null) {
                $insert = ep_db()->prepare(
                    'INSERT INTO ep_questions (
                        category_id,
                        subject_id,
                        question_set_id,
                        question_type,
                        exam_year,
                        difficulty_level,
                        question_text,
                        hint_text,
                        explanation_text,
                        default_marks,
                        negative_marks,
                        source_type,
                        source_ref,
                        is_active,
                        created_by_user_id
                    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)'
                );
                $sourceType = 'manual';
                $sourceRef = 'admin_question_bank';
                $insert->bind_param(
                    'iiissssssddssii',
                    $categoryId,
                    $subjectId,
                    $questionSetId,
                    $questionType,
                    $examYear,
                    $difficulty,
                    $questionText,
                    $hintText,
                    $explanationText,
                    $defaultMarks,
                    $negativeMarks,
                    $sourceType,
                    $sourceRef,
                    $isActive,
                    $actorUserId
                );
                $insert->execute();
                $questionId = (int) ep_db()->insert_id;
                $insert->close();
            } else {
                $update = ep_db()->prepare(
                    'UPDATE ep_questions
                     SET category_id = ?, subject_id = ?, question_set_id = ?, question_type = ?, exam_year = ?, difficulty_level = ?,
                         question_text = ?, hint_text = ?, explanation_text = ?, default_marks = ?, negative_marks = ?, is_active = ?
                     WHERE id = ?'
                );
                $update->bind_param(
                    'iiissssssddii',
                    $categoryId,
                    $subjectId,
                    $questionSetId,
                    $questionType,
                    $examYear,
                    $difficulty,
                    $questionText,
                    $hintText,
                    $explanationText,
                    $defaultMarks,
                    $negativeMarks,
                    $isActive,
                    $questionId
                );
                $update->execute();
                $update->close();

                ep_db()->query('DELETE FROM ep_question_options WHERE question_id = ' . (int) $questionId);
                ep_db()->query('DELETE FROM ep_question_answer_keys WHERE question_id = ' . (int) $questionId);
                ep_db()->query('DELETE FROM ep_question_tags WHERE question_id = ' . (int) $questionId);
            }

            $sortOrder = 1;
            foreach ($options as $option) {
                $key = strtoupper(trim((string) ($option['key'] ?? '')));
                $text = trim((string) ($option['text'] ?? ''));
                $correct = !empty($option['is_correct']) ? 1 : 0;

                if ($key === '' || $text === '') {
                    continue;
                }

                $insOpt = ep_db()->prepare(
                    'INSERT INTO ep_question_options (question_id, option_key, option_text, is_correct, sort_order)
                     VALUES (?, ?, ?, ?, ?)'
                );
                $insOpt->bind_param('issii', $questionId, $key, $text, $correct, $sortOrder);
                $insOpt->execute();
                $insOpt->close();
                $sortOrder++;
            }

            $answerType = (string) ($answer['answer_type'] ?? 'single_option');
            $correctOptionKeys = (string) ($answer['correct_option_keys'] ?? '');
            $correctText = (string) ($answer['correct_text'] ?? '');
            $correctNumeric = $answer['correct_numeric'];
            $numericTolerance = $answer['numeric_tolerance'];
            $correctNumericValue = $correctNumeric !== null ? (string) $correctNumeric : null;
            $numericToleranceValue = $numericTolerance !== null ? (string) $numericTolerance : null;
            $answerMeta = $answer['answer_meta_json'] ?? null;
            $answerMetaJson = is_array($answerMeta) ? json_encode($answerMeta, JSON_UNESCAPED_UNICODE) : null;

            $insAnswer = ep_db()->prepare(
                'INSERT INTO ep_question_answer_keys (
                    question_id,
                    answer_type,
                    correct_option_keys,
                    correct_text,
                    correct_numeric,
                    numeric_tolerance,
                    answer_meta_json
                 ) VALUES (?, ?, ?, ?, ?, ?, ?)' 
            );
            $insAnswer->bind_param(
                'issssss',
                $questionId,
                $answerType,
                $correctOptionKeys,
                $correctText,
                $correctNumericValue,
                $numericToleranceValue,
                $answerMetaJson
            );
            $insAnswer->execute();
            $insAnswer->close();

            foreach ($tags as $tagName) {
                $tagId = ep_find_or_create_tag((string) $tagName);
                if ($tagId <= 0) {
                    continue;
                }

                $insTag = ep_db()->prepare(
                    'INSERT INTO ep_question_tags (question_id, tag_id) VALUES (?, ?)
                     ON DUPLICATE KEY UPDATE tag_id = VALUES(tag_id)'
                );
                $insTag->bind_param('ii', $questionId, $tagId);
                $insTag->execute();
                $insTag->close();
            }

            ep_db()->commit();
        } catch (Throwable $exception) {
            ep_db()->rollback();
            return ['ok' => false, 'message' => 'Unable to save question. ' . $exception->getMessage()];
        }

        ep_audit_log(
            $actorUserId,
            $existing ? 'question.updated' : 'question.created',
            'question',
            (string) $questionId,
            $existing ?? [],
            [
                'category_id' => $categoryId,
                'subject_id' => $subjectId,
                'question_type' => $questionType,
                'difficulty_level' => $difficulty,
                'is_active' => $isActive,
                'tags' => $tags,
            ]
        );

        return [
            'ok' => true,
            'question_id' => $questionId,
            'message' => $existing ? 'Question updated.' : 'Question created.',
        ];
    }
}

if (!function_exists('ep_set_question_active_status')) {
    function ep_set_question_active_status(int $questionId, bool $isActive, int $actorUserId): array
    {
        $question = ep_get_question_detail($questionId);
        if (!$question) {
            return ['ok' => false, 'message' => 'Question not found.'];
        }

        $value = $isActive ? 1 : 0;
        $stmt = ep_db()->prepare('UPDATE ep_questions SET is_active = ? WHERE id = ?');
        $stmt->bind_param('ii', $value, $questionId);
        $stmt->execute();
        $stmt->close();

        ep_audit_log(
            $actorUserId,
            $isActive ? 'question.unarchived' : 'question.archived',
            'question',
            (string) $questionId,
            ['is_active' => (int) $question['is_active']],
            ['is_active' => $value]
        );

        return ['ok' => true, 'message' => $isActive ? 'Question restored.' : 'Question archived.'];
    }
}

if (!function_exists('ep_get_paper_templates_for_admin')) {
    function ep_get_paper_templates_for_admin(array $filters = [], int $limit = 30, int $offset = 0): array
    {
        $conditions = [];
        $params = [];
        $types = '';

        $search = trim((string) ($filters['search'] ?? ''));
        if ($search !== '') {
            $conditions[] = '(t.title LIKE ? OR t.instructions LIKE ? OR t.subject_name LIKE ?)';
            $searchLike = '%' . $search . '%';
            $types .= 'sss';
            $params[] = $searchLike;
            $params[] = $searchLike;
            $params[] = $searchLike;
        }

        $categoryId = (int) ($filters['category_id'] ?? 0);
        if ($categoryId > 0) {
            $conditions[] = 't.category_id = ?';
            $types .= 'i';
            $params[] = $categoryId;
        }

        $publishedStatus = trim((string) ($filters['published_status'] ?? 'all'));
        if (in_array($publishedStatus, ['draft', 'published', 'archived'], true)) {
            $conditions[] = 't.published_status = ?';
            $types .= 's';
            $params[] = $publishedStatus;
        }

        $activity = trim((string) ($filters['activity'] ?? 'all'));
        if ($activity === 'active') {
            $conditions[] = 't.is_active = 1';
        } elseif ($activity === 'inactive') {
            $conditions[] = 't.is_active = 0';
        }

        $fromSql = ' FROM ep_paper_templates t
                     INNER JOIN ep_exam_categories c ON c.id = t.category_id
                     LEFT JOIN ep_question_sets qs ON qs.id = t.question_set_id
                     LEFT JOIN ep_users u ON u.id = t.created_by_user_id';
        $whereSql = $conditions ? (' WHERE ' . implode(' AND ', $conditions)) : '';

        $countStmt = ep_db()->prepare('SELECT COUNT(*) AS total' . $fromSql . $whereSql);
        if ($types !== '') {
            $countParams = $params;
            ep_bind_dynamic_params($countStmt, $types, $countParams);
        }
        $countStmt->execute();
        $countRow = $countStmt->get_result()->fetch_assoc();
        $countStmt->close();

        $total = (int) ($countRow['total'] ?? 0);
        $limit = max(1, min(200, $limit));
        $offset = max(0, $offset);

        $listSql = 'SELECT
                        t.id,
                        t.category_id,
                        t.question_set_id,
                        t.title,
                        t.slug,
                        t.exam_year,
                        t.subject_name,
                        t.duration_minutes,
                        t.total_questions,
                        t.max_attempts_per_user,
                        t.allow_pause,
                        t.max_pause_count,
                        t.no_refresh_mode,
                        t.max_refresh_violations,
                        t.published_status,
                        t.is_active,
                        t.updated_at,
                        c.name AS category_name,
                        qs.title AS question_set_title,
                        u.name AS created_by_name,
                        COUNT(ti.id) AS item_count,
                        COALESCE(SUM(ti.marks), 0) AS total_marks
                    ' . $fromSql . '
                    LEFT JOIN ep_paper_template_items ti ON ti.template_id = t.id
                    ' . $whereSql . '
                    GROUP BY t.id
                    ORDER BY t.updated_at DESC, t.id DESC
                    LIMIT ? OFFSET ?';

        $stmt = ep_db()->prepare($listSql);
        $runTypes = $types . 'ii';
        $runParams = $params;
        $runParams[] = $limit;
        $runParams[] = $offset;
        ep_bind_dynamic_params($stmt, $runTypes, $runParams);
        $stmt->execute();
        $items = $stmt->get_result()->fetch_all(MYSQLI_ASSOC);
        $stmt->close();

        return [
            'items' => $items,
            'total' => $total,
            'limit' => $limit,
            'offset' => $offset,
        ];
    }
}

if (!function_exists('ep_get_paper_template_detail')) {
    function ep_get_paper_template_detail(int $templateId): ?array
    {
        $stmt = ep_db()->prepare(
            'SELECT
                t.*,
                c.name AS category_name,
                qs.title AS question_set_title,
                u.name AS created_by_name
             FROM ep_paper_templates t
             INNER JOIN ep_exam_categories c ON c.id = t.category_id
             LEFT JOIN ep_question_sets qs ON qs.id = t.question_set_id
             LEFT JOIN ep_users u ON u.id = t.created_by_user_id
             WHERE t.id = ?
             LIMIT 1'
        );
        $stmt->bind_param('i', $templateId);
        $stmt->execute();
        $row = $stmt->get_result()->fetch_assoc();
        $stmt->close();

        return $row ?: null;
    }
}

if (!function_exists('ep_get_paper_template_items')) {
    function ep_get_paper_template_items(int $templateId): array
    {
        $stmt = ep_db()->prepare(
            'SELECT
                ti.id,
                ti.template_id,
                ti.question_id,
                ti.section_name,
                ti.marks,
                ti.display_order,
                q.question_text,
                q.question_type,
                q.exam_year,
                q.default_marks,
                q.difficulty_level,
                s.name AS subject_name
             FROM ep_paper_template_items ti
             INNER JOIN ep_questions q ON q.id = ti.question_id
             LEFT JOIN ep_subjects s ON s.id = q.subject_id
             WHERE ti.template_id = ?
             ORDER BY ti.display_order ASC, ti.id ASC'
        );
        $stmt->bind_param('i', $templateId);
        $stmt->execute();
        $rows = $stmt->get_result()->fetch_all(MYSQLI_ASSOC);
        $stmt->close();

        return $rows;
    }
}

if (!function_exists('ep_get_template_candidate_questions')) {
    function ep_get_template_candidate_questions(array $filters = [], int $limit = 120): array
    {
        $conditions = ['q.is_active = 1'];
        $types = '';
        $params = [];

        $categoryId = (int) ($filters['category_id'] ?? 0);
        if ($categoryId > 0) {
            $conditions[] = 'q.category_id = ?';
            $types .= 'i';
            $params[] = $categoryId;
        }

        $examYear = trim((string) ($filters['exam_year'] ?? ''));
        if ($examYear !== '') {
            $conditions[] = 'q.exam_year = ?';
            $types .= 's';
            $params[] = $examYear;
        }

        $subjectName = trim((string) ($filters['subject_name'] ?? ''));
        if ($subjectName !== '') {
            $conditions[] = 's.name = ?';
            $types .= 's';
            $params[] = $subjectName;
        }

        $search = trim((string) ($filters['search'] ?? ''));
        if ($search !== '') {
            $conditions[] = '(q.question_text LIKE ? OR q.hint_text LIKE ? OR q.explanation_text LIKE ?)';
            $searchLike = '%' . $search . '%';
            $types .= 'sss';
            $params[] = $searchLike;
            $params[] = $searchLike;
            $params[] = $searchLike;
        }

        $difficulty = trim((string) ($filters['difficulty'] ?? ''));
        if (in_array($difficulty, ['easy', 'medium', 'hard'], true)) {
            $conditions[] = 'q.difficulty_level = ?';
            $types .= 's';
            $params[] = $difficulty;
        }

        $questionType = trim((string) ($filters['question_type'] ?? ''));
        if (in_array($questionType, ['mcq_single', 'mcq_multi', 'numeric', 'short_text', 'true_false'], true)) {
            $conditions[] = 'q.question_type = ?';
            $types .= 's';
            $params[] = $questionType;
        }

        $limit = max(20, min(400, $limit));

        $sql = 'SELECT
                    q.id,
                    q.category_id,
                    q.subject_id,
                    q.question_type,
                    q.exam_year,
                    q.difficulty_level,
                    q.question_text,
                    q.default_marks,
                    s.name AS subject_name
                FROM ep_questions q
                LEFT JOIN ep_subjects s ON s.id = q.subject_id
                WHERE ' . implode(' AND ', $conditions) . '
                ORDER BY q.updated_at DESC, q.id DESC
                LIMIT ?';

        $stmt = ep_db()->prepare($sql);
        $runTypes = $types . 'i';
        $runParams = $params;
        $runParams[] = $limit;
        ep_bind_dynamic_params($stmt, $runTypes, $runParams);
        $stmt->execute();
        $rows = $stmt->get_result()->fetch_all(MYSQLI_ASSOC);
        $stmt->close();

        return $rows;
    }
}

if (!function_exists('ep_get_questions_by_ids')) {
    function ep_get_questions_by_ids(array $questionIds, int $categoryId = 0): array
    {
        $ids = [];
        foreach ($questionIds as $rawId) {
            $id = (int) $rawId;
            if ($id > 0) {
                $ids[$id] = $id;
            }
        }
        $ids = array_values($ids);

        if (!$ids) {
            return [];
        }

        $placeholders = implode(',', array_fill(0, count($ids), '?'));
        $types = str_repeat('i', count($ids));
        $params = $ids;

        $sql = 'SELECT
                    q.id,
                    q.category_id,
                    q.subject_id,
                    q.question_type,
                    q.exam_year,
                    q.difficulty_level,
                    q.question_text,
                    q.default_marks,
                    s.name AS subject_name
                FROM ep_questions q
                LEFT JOIN ep_subjects s ON s.id = q.subject_id
                WHERE q.is_active = 1
                  AND q.id IN (' . $placeholders . ')';

        if ($categoryId > 0) {
            $sql .= ' AND q.category_id = ?';
            $types .= 'i';
            $params[] = $categoryId;
        }

        $stmt = ep_db()->prepare($sql);
        ep_bind_dynamic_params($stmt, $types, $params);
        $stmt->execute();
        $rows = $stmt->get_result()->fetch_all(MYSQLI_ASSOC);
        $stmt->close();

        $mapped = [];
        foreach ($rows as $row) {
            $mapped[(int) $row['id']] = $row;
        }

        return $mapped;
    }
}

if (!function_exists('ep_pick_template_question_ids')) {
    function ep_pick_template_question_ids(array $filters, int $limit, array $excludeIds = []): array
    {
        $conditions = ['q.is_active = 1'];
        $types = '';
        $params = [];

        $categoryId = (int) ($filters['category_id'] ?? 0);
        if ($categoryId > 0) {
            $conditions[] = 'q.category_id = ?';
            $types .= 'i';
            $params[] = $categoryId;
        }

        $examYear = trim((string) ($filters['exam_year'] ?? ''));
        if ($examYear !== '') {
            $conditions[] = 'q.exam_year = ?';
            $types .= 's';
            $params[] = $examYear;
        }

        $subjectName = trim((string) ($filters['subject_name'] ?? ''));
        if ($subjectName !== '') {
            $conditions[] = 's.name = ?';
            $types .= 's';
            $params[] = $subjectName;
        }

        $search = trim((string) ($filters['search'] ?? ''));
        if ($search !== '') {
            $conditions[] = '(q.question_text LIKE ? OR q.hint_text LIKE ? OR q.explanation_text LIKE ?)';
            $searchLike = '%' . $search . '%';
            $types .= 'sss';
            $params[] = $searchLike;
            $params[] = $searchLike;
            $params[] = $searchLike;
        }

        $difficulty = trim((string) ($filters['difficulty'] ?? ''));
        if (in_array($difficulty, ['easy', 'medium', 'hard'], true)) {
            $conditions[] = 'q.difficulty_level = ?';
            $types .= 's';
            $params[] = $difficulty;
        }

        $questionType = trim((string) ($filters['question_type'] ?? ''));
        if (in_array($questionType, ['mcq_single', 'mcq_multi', 'numeric', 'short_text', 'true_false'], true)) {
            $conditions[] = 'q.question_type = ?';
            $types .= 's';
            $params[] = $questionType;
        }

        $exclude = [];
        foreach ($excludeIds as $rawId) {
            $id = (int) $rawId;
            if ($id > 0) {
                $exclude[$id] = $id;
            }
        }
        $exclude = array_values($exclude);

        if ($exclude) {
            $placeholders = implode(',', array_fill(0, count($exclude), '?'));
            $conditions[] = 'q.id NOT IN (' . $placeholders . ')';
            $types .= str_repeat('i', count($exclude));
            foreach ($exclude as $id) {
                $params[] = $id;
            }
        }

        $limit = max(1, min(500, $limit));

        $sql = 'SELECT q.id
                FROM ep_questions q
                LEFT JOIN ep_subjects s ON s.id = q.subject_id
                WHERE ' . implode(' AND ', $conditions) . '
                ORDER BY q.updated_at DESC, q.id DESC
                LIMIT ?';
        $types .= 'i';
        $params[] = $limit;

        $stmt = ep_db()->prepare($sql);
        ep_bind_dynamic_params($stmt, $types, $params);
        $stmt->execute();
        $rows = $stmt->get_result()->fetch_all(MYSQLI_ASSOC);
        $stmt->close();

        return array_map(static fn(array $row): int => (int) $row['id'], $rows);
    }
}

if (!function_exists('ep_resolve_subject_name')) {
    function ep_resolve_subject_name(?int $subjectId, string $fallback): string
    {
        $name = trim($fallback);
        if ($name !== '' || !$subjectId || $subjectId <= 0) {
            return $name;
        }

        $stmt = ep_db()->prepare('SELECT name FROM ep_subjects WHERE id = ? LIMIT 1');
        $stmt->bind_param('i', $subjectId);
        $stmt->execute();
        $row = $stmt->get_result()->fetch_assoc();
        $stmt->close();

        return trim((string) ($row['name'] ?? ''));
    }
}

if (!function_exists('ep_generate_unique_template_slug')) {
    function ep_generate_unique_template_slug(int $categoryId, string $title, ?int $excludeTemplateId = null): string
    {
        $base = ep_slugify($title);
        if ($base === '') {
            $base = 'paper-template';
        }

        $candidate = $base;
        $suffix = 2;
        while (true) {
            $sql = 'SELECT id FROM ep_paper_templates WHERE category_id = ? AND slug = ?';
            $types = 'is';
            $params = [$categoryId, $candidate];
            if ($excludeTemplateId !== null && $excludeTemplateId > 0) {
                $sql .= ' AND id <> ?';
                $types .= 'i';
                $params[] = $excludeTemplateId;
            }
            $sql .= ' LIMIT 1';

            $stmt = ep_db()->prepare($sql);
            ep_bind_dynamic_params($stmt, $types, $params);
            $stmt->execute();
            $exists = $stmt->get_result()->fetch_assoc();
            $stmt->close();

            if (!$exists) {
                return $candidate;
            }

            $candidate = $base . '-' . $suffix;
            $suffix++;
        }
    }
}

if (!function_exists('ep_save_paper_template')) {
    function ep_save_paper_template(array $payload, int $actorUserId, ?int $templateId = null): array
    {
        $title = trim((string) ($payload['title'] ?? ''));
        $categoryId = (int) ($payload['category_id'] ?? 0);
        $questionSetId = (int) ($payload['question_set_id'] ?? 0);
        $subjectId = (int) ($payload['subject_id'] ?? 0);
        $subjectName = ep_resolve_subject_name($subjectId, (string) ($payload['subject_name'] ?? ''));
        $examYear = trim((string) ($payload['exam_year'] ?? ''));
        $instructions = trim((string) ($payload['instructions'] ?? ''));
        $durationMinutes = (int) ($payload['duration_minutes'] ?? 60);
        $totalQuestions = (int) ($payload['total_questions'] ?? 0);
        $defaultMarks = (float) ($payload['default_marks_per_question'] ?? 1);
        $maxAttemptsPerUser = (int) ($payload['max_attempts_per_user'] ?? 1);
        $allowPause = !empty($payload['allow_pause']) ? 1 : 0;
        $maxPauseCount = (int) ($payload['max_pause_count'] ?? 0);
        $noRefreshMode = !empty($payload['no_refresh_mode']) ? 1 : 0;
        $maxRefreshViolations = (int) ($payload['max_refresh_violations'] ?? 1);
        $publishedStatus = (string) ($payload['published_status'] ?? 'draft');
        $isActive = !empty($payload['is_active']) ? 1 : 0;
        $manualOnly = !empty($payload['manual_only']);

        if ($title === '') {
            return ['ok' => false, 'message' => 'Template title is required.'];
        }
        if ($categoryId <= 0) {
            return ['ok' => false, 'message' => 'Category is required.'];
        }
        if ($totalQuestions <= 0) {
            return ['ok' => false, 'message' => 'Question count must be at least 1.'];
        }
        if ($durationMinutes < 5 || $durationMinutes > 360) {
            return ['ok' => false, 'message' => 'Timer must be between 5 and 360 minutes.'];
        }
        if ($defaultMarks <= 0) {
            return ['ok' => false, 'message' => 'Marks per question must be greater than 0.'];
        }
        if ($maxAttemptsPerUser <= 0 || $maxAttemptsPerUser > 99) {
            return ['ok' => false, 'message' => 'Max attempts per user must be between 1 and 99.'];
        }
        if ($maxPauseCount < 0 || $maxPauseCount > 20) {
            return ['ok' => false, 'message' => 'Max pause count must be between 0 and 20.'];
        }
        if ($maxRefreshViolations < 1 || $maxRefreshViolations > 10) {
            return ['ok' => false, 'message' => 'Refresh violation limit must be between 1 and 10.'];
        }
        if (!in_array($publishedStatus, ['draft', 'published', 'archived'], true)) {
            $publishedStatus = 'draft';
        }

        if ($questionSetId <= 0) {
            $questionSetId = 0;
        }

        $postedIds = $payload['selected_question_ids'] ?? [];
        if (!is_array($postedIds)) {
            $postedIds = [];
        }
        $selectedIds = [];
        foreach ($postedIds as $rawId) {
            $id = (int) $rawId;
            if ($id > 0 && !isset($selectedIds[$id])) {
                $selectedIds[$id] = $id;
            }
        }
        $selectedIds = array_values($selectedIds);

        $questionMarksRaw = $payload['marks_by_question'] ?? [];
        if (!is_array($questionMarksRaw)) {
            $questionMarksRaw = [];
        }
        $sectionRaw = $payload['sections_by_question'] ?? [];
        if (!is_array($sectionRaw)) {
            $sectionRaw = [];
        }

        $manualQuestions = ep_get_questions_by_ids($selectedIds, $categoryId);
        $finalIds = [];
        foreach ($selectedIds as $selectedId) {
            if (isset($manualQuestions[$selectedId])) {
                $finalIds[] = $selectedId;
                if (count($finalIds) >= $totalQuestions) {
                    break;
                }
            }
        }

        if ($manualOnly && count($finalIds) < $totalQuestions) {
            return [
                'ok' => false,
                'message' => 'Manual-only mode needs at least ' . $totalQuestions . ' valid selected questions from this category.',
            ];
        }

        if (count($finalIds) < $totalQuestions) {
            $need = $totalQuestions - count($finalIds);
            $autoIds = ep_pick_template_question_ids(
                [
                    'category_id' => $categoryId,
                    'exam_year' => $examYear,
                    'subject_name' => $subjectName,
                    'search' => (string) ($payload['question_search'] ?? ''),
                    'difficulty' => (string) ($payload['difficulty'] ?? ''),
                    'question_type' => (string) ($payload['question_type'] ?? ''),
                ],
                max($need * 3, $need),
                $finalIds
            );

            foreach ($autoIds as $autoId) {
                $finalIds[] = $autoId;
                if (count($finalIds) >= $totalQuestions) {
                    break;
                }
            }
        }

        if (count($finalIds) < $totalQuestions) {
            return [
                'ok' => false,
                'message' => 'Not enough active questions match this filter. Needed ' . $totalQuestions . ', found ' . count($finalIds) . '.',
            ];
        }

        $finalQuestions = ep_get_questions_by_ids($finalIds, $categoryId);
        $orderedRows = [];
        foreach ($finalIds as $questionId) {
            if (!isset($finalQuestions[$questionId])) {
                continue;
            }

            $mark = $defaultMarks;
            if (isset($questionMarksRaw[$questionId]) && is_numeric((string) $questionMarksRaw[$questionId])) {
                $mark = (float) $questionMarksRaw[$questionId];
            } elseif (isset($finalQuestions[$questionId]['default_marks']) && is_numeric((string) $finalQuestions[$questionId]['default_marks'])) {
                $mark = (float) $finalQuestions[$questionId]['default_marks'];
            }
            if ($mark <= 0) {
                $mark = $defaultMarks;
            }

            $section = '';
            if (isset($sectionRaw[$questionId])) {
                $section = trim((string) $sectionRaw[$questionId]);
            }

            $orderedRows[] = [
                'question_id' => $questionId,
                'marks' => round($mark, 2),
                'section_name' => $section,
            ];
        }

        if (count($orderedRows) !== $totalQuestions) {
            return ['ok' => false, 'message' => 'Unable to resolve selected questions for template save.'];
        }

        $existing = null;
        if ($templateId !== null && $templateId > 0) {
            $existing = ep_get_paper_template_detail($templateId);
            if (!$existing) {
                return ['ok' => false, 'message' => 'Template not found for update.'];
            }
        } else {
            $templateId = null;
        }

        $slug = ep_generate_unique_template_slug($categoryId, $title, $templateId);

        ep_db()->begin_transaction();
        try {
            if ($templateId === null) {
                $insert = ep_db()->prepare(
                    'INSERT INTO ep_paper_templates (
                        category_id,
                        question_set_id,
                        title,
                        slug,
                        exam_year,
                        subject_name,
                        instructions,
                        duration_minutes,
                        total_questions,
                        max_attempts_per_user,
                        allow_pause,
                        max_pause_count,
                        no_refresh_mode,
                        max_refresh_violations,
                        published_status,
                        is_active,
                        created_by_user_id
                    ) VALUES (?, NULLIF(?, 0), ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)'
                );
                $insert->bind_param(
                    'iisssssiiiiiiisii',
                    $categoryId,
                    $questionSetId,
                    $title,
                    $slug,
                    $examYear,
                    $subjectName,
                    $instructions,
                    $durationMinutes,
                    $totalQuestions,
                    $maxAttemptsPerUser,
                    $allowPause,
                    $maxPauseCount,
                    $noRefreshMode,
                    $maxRefreshViolations,
                    $publishedStatus,
                    $isActive,
                    $actorUserId
                );
                $insert->execute();
                $templateId = (int) ep_db()->insert_id;
                $insert->close();
            } else {
                $update = ep_db()->prepare(
                    'UPDATE ep_paper_templates
                     SET category_id = ?,
                         question_set_id = NULLIF(?, 0),
                         title = ?,
                         slug = ?,
                         exam_year = ?,
                         subject_name = ?,
                         instructions = ?,
                         duration_minutes = ?,
                         total_questions = ?,
                         max_attempts_per_user = ?,
                         allow_pause = ?,
                         max_pause_count = ?,
                         no_refresh_mode = ?,
                         max_refresh_violations = ?,
                         published_status = ?,
                         is_active = ?
                     WHERE id = ?'
                );
                $update->bind_param(
                    'iisssssiiiiiiisii',
                    $categoryId,
                    $questionSetId,
                    $title,
                    $slug,
                    $examYear,
                    $subjectName,
                    $instructions,
                    $durationMinutes,
                    $totalQuestions,
                    $maxAttemptsPerUser,
                    $allowPause,
                    $maxPauseCount,
                    $noRefreshMode,
                    $maxRefreshViolations,
                    $publishedStatus,
                    $isActive,
                    $templateId
                );
                $update->execute();
                $update->close();

                $deleteItems = ep_db()->prepare('DELETE FROM ep_paper_template_items WHERE template_id = ?');
                $deleteItems->bind_param('i', $templateId);
                $deleteItems->execute();
                $deleteItems->close();
            }

            $displayOrder = 1;
            $insertItem = ep_db()->prepare(
                'INSERT INTO ep_paper_template_items (template_id, question_id, section_name, marks, display_order, is_required)
                 VALUES (?, ?, ?, ?, ?, 1)'
            );

            foreach ($orderedRows as $row) {
                $questionId = (int) $row['question_id'];
                $sectionName = (string) ($row['section_name'] ?? '');
                $marks = (float) ($row['marks'] ?? 1.0);
                $insertItem->bind_param('iisdi', $templateId, $questionId, $sectionName, $marks, $displayOrder);
                $insertItem->execute();
                $displayOrder++;
            }
            $insertItem->close();

            ep_db()->commit();
        } catch (Throwable $exception) {
            ep_db()->rollback();
            return ['ok' => false, 'message' => 'Unable to save paper template. ' . $exception->getMessage()];
        }

        ep_audit_log(
            $actorUserId,
            $existing ? 'paper_template.updated' : 'paper_template.created',
            'paper_template',
            (string) $templateId,
            $existing ?? [],
            [
                'category_id' => $categoryId,
                'question_set_id' => $questionSetId,
                'title' => $title,
                'slug' => $slug,
                'exam_year' => $examYear,
                'subject_name' => $subjectName,
                'duration_minutes' => $durationMinutes,
                'total_questions' => $totalQuestions,
                'max_refresh_violations' => $maxRefreshViolations,
                'published_status' => $publishedStatus,
                'is_active' => $isActive,
            ]
        );

        return [
            'ok' => true,
            'template_id' => $templateId,
            'message' => $existing ? 'Paper template updated.' : 'Paper template created.',
        ];
    }
}

if (!function_exists('ep_set_paper_template_publication')) {
    function ep_set_paper_template_publication(int $templateId, string $publishedStatus, bool $isActive, int $actorUserId): array
    {
        if (!in_array($publishedStatus, ['draft', 'published', 'archived'], true)) {
            return ['ok' => false, 'message' => 'Invalid publish state.'];
        }

        $template = ep_get_paper_template_detail($templateId);
        if (!$template) {
            return ['ok' => false, 'message' => 'Template not found.'];
        }

        $activeValue = $isActive ? 1 : 0;
        $stmt = ep_db()->prepare('UPDATE ep_paper_templates SET published_status = ?, is_active = ? WHERE id = ?');
        $stmt->bind_param('sii', $publishedStatus, $activeValue, $templateId);
        $stmt->execute();
        $stmt->close();

        ep_audit_log(
            $actorUserId,
            'paper_template.publication_updated',
            'paper_template',
            (string) $templateId,
            [
                'published_status' => (string) $template['published_status'],
                'is_active' => (int) $template['is_active'],
            ],
            [
                'published_status' => $publishedStatus,
                'is_active' => $activeValue,
            ]
        );

        return ['ok' => true, 'message' => 'Publish state updated.'];
    }
}

if (!function_exists('ep_result_mastery_level_from_percentage')) {
    function ep_result_mastery_level_from_percentage(float $avgPercentage): string
    {
        if ($avgPercentage >= 85.0) {
            return 'advanced';
        }
        if ($avgPercentage >= 70.0) {
            return 'proficient';
        }
        if ($avgPercentage >= 50.0) {
            return 'developing';
        }

        return 'beginner';
    }
}

if (!function_exists('ep_result_rank_label_from_percentage')) {
    function ep_result_rank_label_from_percentage(float $percentage): string
    {
        if ($percentage >= 90.0) {
            return 'Outstanding';
        }
        if ($percentage >= 75.0) {
            return 'Strong';
        }
        if ($percentage >= 60.0) {
            return 'Good';
        }
        if ($percentage >= 40.0) {
            return 'Developing';
        }

        return 'Needs Focus';
    }
}

if (!function_exists('ep_result_streak_days')) {
    function ep_result_streak_days(array $dateList): int
    {
        if (!$dateList) {
            return 0;
        }

        $unique = [];
        foreach ($dateList as $rawDate) {
            $date = trim((string) $rawDate);
            if ($date !== '') {
                $unique[$date] = $date;
            }
        }
        if (!$unique) {
            return 0;
        }

        rsort($unique, SORT_STRING);
        $ordered = array_values($unique);
        $streak = 1;
        $previous = DateTimeImmutable::createFromFormat('Y-m-d', $ordered[0]);
        if (!$previous) {
            return 0;
        }

        $count = count($ordered);
        for ($i = 1; $i < $count; $i++) {
            $current = DateTimeImmutable::createFromFormat('Y-m-d', $ordered[$i]);
            if (!$current) {
                break;
            }

            $days = (int) $previous->diff($current)->format('%a');
            if ($days === 1) {
                $streak++;
                $previous = $current;
                continue;
            }
            break;
        }

        return $streak;
    }
}

if (!function_exists('ep_get_user_result_history')) {
    function ep_get_user_result_history(int $userId, array $filters = [], int $limit = 20, int $offset = 0): array
    {
        $conditions = ['r.user_id = ?'];
        $types = 'i';
        $params = [$userId];

        $categoryId = (int) ($filters['category_id'] ?? 0);
        if ($categoryId > 0) {
            $conditions[] = 'COALESCE(t.category_id, qs.category_id) = ?';
            $types .= 'i';
            $params[] = $categoryId;
        }

        $search = trim((string) ($filters['search'] ?? ''));
        if ($search !== '') {
            $conditions[] = '(t.title LIKE ? OR qs.title LIKE ? OR COALESCE(t.subject_name, qs.subject, \'\') LIKE ?)';
            $searchLike = '%' . $search . '%';
            $types .= 'sss';
            $params[] = $searchLike;
            $params[] = $searchLike;
            $params[] = $searchLike;
        }

        $baseSql = ' FROM ep_exam_results r
                     INNER JOIN ep_exam_attempts a ON a.id = r.attempt_id
                     LEFT JOIN ep_paper_templates t ON t.id = a.template_id
                     LEFT JOIN ep_question_sets qs ON qs.id = a.question_set_id
                     LEFT JOIN ep_exam_categories c ON c.id = COALESCE(t.category_id, qs.category_id)';

        $whereSql = ' WHERE ' . implode(' AND ', $conditions);

        $countStmt = ep_db()->prepare('SELECT COUNT(*) AS total' . $baseSql . $whereSql);
        $countParams = $params;
        ep_bind_dynamic_params($countStmt, $types, $countParams);
        $countStmt->execute();
        $countRow = $countStmt->get_result()->fetch_assoc();
        $countStmt->close();

        $total = (int) ($countRow['total'] ?? 0);
        $limit = max(1, min(100, $limit));
        $offset = max(0, $offset);

        $sql = 'SELECT
                    r.id,
                    r.attempt_id,
                    r.total_questions,
                    r.attempted_questions,
                    r.correct_answers,
                    r.wrong_answers,
                    r.unanswered_count,
                    r.score_obtained,
                    r.max_score,
                    r.percentage,
                    r.rank_label,
                    r.published_at,
                    a.status AS attempt_status,
                    a.started_at,
                    a.submitted_at,
                    a.resume_count,
                    a.pause_seconds_accum,
                    a.no_refresh_violations,
                    COALESCE(t.title, qs.title, CONCAT(\'Attempt #\', a.id)) AS paper_title,
                    COALESCE(t.subject_name, qs.subject, \'General\') AS subject_name,
                    COALESCE(t.exam_year, qs.exam_year, \'\') AS exam_year,
                    COALESCE(c.name, \'General\') AS category_name
                ' . $baseSql . $whereSql . '
                ORDER BY r.published_at DESC, r.id DESC
                LIMIT ? OFFSET ?';

        $stmt = ep_db()->prepare($sql);
        $runTypes = $types . 'ii';
        $runParams = $params;
        $runParams[] = $limit;
        $runParams[] = $offset;
        ep_bind_dynamic_params($stmt, $runTypes, $runParams);
        $stmt->execute();
        $items = $stmt->get_result()->fetch_all(MYSQLI_ASSOC);
        $stmt->close();

        return [
            'items' => $items,
            'total' => $total,
            'limit' => $limit,
            'offset' => $offset,
        ];
    }
}

if (!function_exists('ep_get_user_result_summary')) {
    function ep_get_user_result_summary(int $userId): array
    {
        $summary = [
            'attempts_count' => 0,
            'correct_answers' => 0,
            'wrong_answers' => 0,
            'unanswered_count' => 0,
            'score_obtained' => 0.0,
            'max_score' => 0.0,
            'avg_percentage' => 0.0,
            'best_percentage' => 0.0,
            'last_result_at' => null,
            'overall_accuracy' => 0.0,
        ];

        $stmt = ep_db()->prepare(
            'SELECT
                COUNT(*) AS attempts_count,
                COALESCE(SUM(correct_answers), 0) AS correct_answers,
                COALESCE(SUM(wrong_answers), 0) AS wrong_answers,
                COALESCE(SUM(unanswered_count), 0) AS unanswered_count,
                COALESCE(SUM(score_obtained), 0) AS score_obtained,
                COALESCE(SUM(max_score), 0) AS max_score,
                COALESCE(AVG(percentage), 0) AS avg_percentage,
                COALESCE(MAX(percentage), 0) AS best_percentage,
                MAX(published_at) AS last_result_at
             FROM ep_exam_results
             WHERE user_id = ?'
        );
        $stmt->bind_param('i', $userId);
        $stmt->execute();
        $row = $stmt->get_result()->fetch_assoc();
        $stmt->close();

        if (!$row) {
            return $summary;
        }

        $summary['attempts_count'] = (int) ($row['attempts_count'] ?? 0);
        $summary['correct_answers'] = (int) ($row['correct_answers'] ?? 0);
        $summary['wrong_answers'] = (int) ($row['wrong_answers'] ?? 0);
        $summary['unanswered_count'] = (int) ($row['unanswered_count'] ?? 0);
        $summary['score_obtained'] = (float) ($row['score_obtained'] ?? 0);
        $summary['max_score'] = (float) ($row['max_score'] ?? 0);
        $summary['avg_percentage'] = (float) ($row['avg_percentage'] ?? 0);
        $summary['best_percentage'] = (float) ($row['best_percentage'] ?? 0);
        $summary['last_result_at'] = $row['last_result_at'] ?? null;

        $attemptedAnswers = $summary['correct_answers'] + $summary['wrong_answers'];
        if ($attemptedAnswers > 0) {
            $summary['overall_accuracy'] = round(($summary['correct_answers'] / $attemptedAnswers) * 100, 2);
        }

        return $summary;
    }
}

if (!function_exists('ep_rebuild_user_progress_for_user')) {
    function ep_rebuild_user_progress_for_user(int $userId): array
    {
        if ($userId <= 0) {
            return ['ok' => false, 'message' => 'Invalid user.'];
        }

        $stmt = ep_db()->prepare(
            'SELECT
                r.id AS result_id,
                r.total_questions,
                r.correct_answers,
                r.score_obtained,
                r.max_score,
                r.percentage,
                r.published_at,
                COALESCE(t.category_id, qs.category_id) AS category_id,
                COALESCE(NULLIF(t.subject_name, \'\'), NULLIF(qs.subject, \'\'), \'General\') AS subject_key
             FROM ep_exam_results r
             INNER JOIN ep_exam_attempts a ON a.id = r.attempt_id
             LEFT JOIN ep_paper_templates t ON t.id = a.template_id
             LEFT JOIN ep_question_sets qs ON qs.id = a.question_set_id
             WHERE r.user_id = ?
             ORDER BY r.published_at DESC, r.id DESC'
        );
        $stmt->bind_param('i', $userId);
        $stmt->execute();
        $rows = $stmt->get_result()->fetch_all(MYSQLI_ASSOC);
        $stmt->close();

        $scopes = [];
        foreach ($rows as $row) {
            $categoryId = (int) ($row['category_id'] ?? 0);
            if ($categoryId <= 0) {
                continue;
            }
            $subjectKey = trim((string) ($row['subject_key'] ?? ''));
            if ($subjectKey === '') {
                $subjectKey = 'General';
            }

            $scopeKey = $categoryId . '::' . strtolower($subjectKey);
            if (!isset($scopes[$scopeKey])) {
                $scopes[$scopeKey] = [
                    'category_id' => $categoryId,
                    'subject_key' => $subjectKey,
                    'attempts_count' => 0,
                    'papers_completed' => 0,
                    'best_score' => 0.0,
                    'sum_percentage' => 0.0,
                    'last_attempt_at' => null,
                    'total_correct' => 0,
                    'total_questions' => 0,
                    'result_ids' => [],
                    'recent_percentages' => [],
                    'date_list' => [],
                ];
            }

            $percentage = (float) ($row['percentage'] ?? 0);
            $score = (float) ($row['score_obtained'] ?? 0);
            $publishedAt = (string) ($row['published_at'] ?? '');
            $dateOnly = substr($publishedAt, 0, 10);

            $scopes[$scopeKey]['attempts_count']++;
            $scopes[$scopeKey]['papers_completed']++;
            $scopes[$scopeKey]['sum_percentage'] += $percentage;
            $scopes[$scopeKey]['best_score'] = max($scopes[$scopeKey]['best_score'], $score);
            $scopes[$scopeKey]['total_correct'] += (int) ($row['correct_answers'] ?? 0);
            $scopes[$scopeKey]['total_questions'] += (int) ($row['total_questions'] ?? 0);
            $scopes[$scopeKey]['result_ids'][] = (int) ($row['result_id'] ?? 0);
            $scopes[$scopeKey]['recent_percentages'][] = $percentage;
            if ($dateOnly !== '') {
                $scopes[$scopeKey]['date_list'][] = $dateOnly;
            }

            if ($scopes[$scopeKey]['last_attempt_at'] === null || $publishedAt > (string) $scopes[$scopeKey]['last_attempt_at']) {
                $scopes[$scopeKey]['last_attempt_at'] = $publishedAt;
            }
        }

        ep_db()->begin_transaction();
        try {
            $deleteStmt = ep_db()->prepare('DELETE FROM ep_user_progress WHERE user_id = ?');
            $deleteStmt->bind_param('i', $userId);
            $deleteStmt->execute();
            $deleteStmt->close();

            if ($scopes) {
                $insertStmt = ep_db()->prepare(
                    'INSERT INTO ep_user_progress (
                        user_id,
                        category_id,
                        subject_key,
                        attempts_count,
                        papers_completed,
                        best_score,
                        avg_percentage,
                        last_attempt_at,
                        streak_days,
                        mastery_level,
                        progress_json
                     ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)'
                );

                foreach ($scopes as $scope) {
                    $attemptsCount = (int) $scope['attempts_count'];
                    $papersCompleted = (int) $scope['papers_completed'];
                    $bestScore = (float) $scope['best_score'];
                    $avgPercentage = $attemptsCount > 0 ? round((float) $scope['sum_percentage'] / $attemptsCount, 2) : 0.0;
                    $lastAttemptAt = $scope['last_attempt_at'] !== null ? (string) $scope['last_attempt_at'] : null;
                    $streakDays = ep_result_streak_days((array) $scope['date_list']);
                    $masteryLevel = ep_result_mastery_level_from_percentage($avgPercentage);
                    $accuracy = (int) $scope['total_questions'] > 0
                        ? round(((int) $scope['total_correct'] / (int) $scope['total_questions']) * 100, 2)
                        : 0.0;
                    $recentPercentages = array_slice((array) $scope['recent_percentages'], 0, 5);
                    $resultIds = array_slice((array) $scope['result_ids'], 0, 10);
                    $progressJson = json_encode([
                        'accuracy_percentage' => $accuracy,
                        'recent_percentages' => $recentPercentages,
                        'result_ids' => $resultIds,
                    ], JSON_UNESCAPED_UNICODE);

                    $insertStmt->bind_param(
                        'iisiiddsiss',
                        $userId,
                        $scope['category_id'],
                        $scope['subject_key'],
                        $attemptsCount,
                        $papersCompleted,
                        $bestScore,
                        $avgPercentage,
                        $lastAttemptAt,
                        $streakDays,
                        $masteryLevel,
                        $progressJson
                    );
                    $insertStmt->execute();
                }
                $insertStmt->close();
            }

            ep_db()->commit();
        } catch (Throwable $exception) {
            ep_db()->rollback();
            return ['ok' => false, 'message' => 'Unable to rebuild progress. ' . $exception->getMessage()];
        }

        return [
            'ok' => true,
            'rows' => count($scopes),
            'message' => 'Progress synchronized.',
        ];
    }
}

if (!function_exists('ep_get_user_progress_rows')) {
    function ep_get_user_progress_rows(int $userId, ?int $categoryId = null): array
    {
        $sql = 'SELECT
                    p.*,
                    c.name AS category_name
                FROM ep_user_progress p
                INNER JOIN ep_exam_categories c ON c.id = p.category_id
                WHERE p.user_id = ?';
        $types = 'i';
        $params = [$userId];

        if ($categoryId !== null && $categoryId > 0) {
            $sql .= ' AND p.category_id = ?';
            $types .= 'i';
            $params[] = $categoryId;
        }

        $sql .= ' ORDER BY c.sort_order ASC, c.name ASC, p.avg_percentage DESC, p.updated_at DESC';

        $stmt = ep_db()->prepare($sql);
        ep_bind_dynamic_params($stmt, $types, $params);
        $stmt->execute();
        $rows = $stmt->get_result()->fetch_all(MYSQLI_ASSOC);
        $stmt->close();

        return $rows;
    }
}

if (!function_exists('ep_get_user_subscription_history')) {
    function ep_get_user_subscription_history(int $userId, int $limit = 10): array
    {
        $limit = max(1, min(100, $limit));
        $stmt = ep_db()->prepare(
            "SELECT
                s.id,
                s.plan_id,
                s.status,
                s.started_at,
                s.expires_at,
                s.papers_used,
                s.updated_at,
                p.name AS plan_name,
                p.max_papers_per_cycle,
                p.duration_days,
                p.price_aud
             FROM ep_user_subscriptions s
             INNER JOIN ep_subscription_plans p ON p.id = s.plan_id
             WHERE s.user_id = ?
             ORDER BY COALESCE(s.started_at, s.created_at) DESC, s.id DESC
             LIMIT ?"
        );
        $stmt->bind_param('ii', $userId, $limit);
        $stmt->execute();
        $rows = $stmt->get_result()->fetch_all(MYSQLI_ASSOC);
        $stmt->close();

        return $rows;
    }
}

if (!function_exists('ep_get_user_recent_attempts')) {
    function ep_get_user_recent_attempts(int $userId, int $limit = 8): array
    {
        $limit = max(1, min(100, $limit));
        $stmt = ep_db()->prepare(
            "SELECT
                a.id,
                a.attempt_uuid,
                a.status,
                a.started_at,
                a.ends_at,
                a.submitted_at,
                a.last_saved_at,
                a.resume_count,
                a.pause_seconds_accum,
                a.remaining_seconds,
                a.no_refresh_violations,
                a.score_obtained,
                a.max_score,
                a.percentage,
                COALESCE(t.title, qs.title, CONCAT('Attempt #', a.id)) AS paper_title,
                COALESCE(t.subject_name, qs.subject, 'General') AS subject_name,
                COALESCE(t.exam_year, qs.exam_year, '') AS exam_year,
                COALESCE(c.name, 'General') AS category_name,
                r.rank_label
             FROM ep_exam_attempts a
             LEFT JOIN ep_paper_templates t ON t.id = a.template_id
             LEFT JOIN ep_question_sets qs ON qs.id = a.question_set_id
             LEFT JOIN ep_exam_categories c ON c.id = COALESCE(t.category_id, qs.category_id)
             LEFT JOIN ep_exam_results r ON r.attempt_id = a.id
             WHERE a.user_id = ?
             ORDER BY COALESCE(a.submitted_at, a.last_saved_at, a.started_at) DESC, a.id DESC
             LIMIT ?"
        );
        $stmt->bind_param('ii', $userId, $limit);
        $stmt->execute();
        $rows = $stmt->get_result()->fetch_all(MYSQLI_ASSOC);
        $stmt->close();

        return $rows;
    }
}

if (!function_exists('ep_get_user_pending_attempts')) {
    function ep_get_user_pending_attempts(int $userId, int $limit = 5): array
    {
        $limit = max(1, min(100, $limit));
        $stmt = ep_db()->prepare(
            "SELECT
                a.id,
                a.attempt_uuid,
                a.status,
                a.started_at,
                a.ends_at,
                a.last_saved_at,
                a.paused_at,
                a.resume_count,
                a.remaining_seconds,
                a.no_refresh_violations,
                COALESCE(t.title, qs.title, CONCAT('Attempt #', a.id)) AS paper_title,
                COALESCE(t.subject_name, qs.subject, 'General') AS subject_name,
                COALESCE(t.exam_year, qs.exam_year, '') AS exam_year,
                COALESCE(c.name, 'General') AS category_name
             FROM ep_exam_attempts a
             LEFT JOIN ep_paper_templates t ON t.id = a.template_id
             LEFT JOIN ep_question_sets qs ON qs.id = a.question_set_id
             LEFT JOIN ep_exam_categories c ON c.id = COALESCE(t.category_id, qs.category_id)
             WHERE a.user_id = ?
               AND a.status IN ('not_started','in_progress','paused')
             ORDER BY COALESCE(a.last_saved_at, a.started_at) DESC, a.id DESC
             LIMIT ?"
        );
        $stmt->bind_param('ii', $userId, $limit);
        $stmt->execute();
        $rows = $stmt->get_result()->fetch_all(MYSQLI_ASSOC);
        $stmt->close();

        return $rows;
    }
}

if (!function_exists('ep_get_user_best_scores')) {
    function ep_get_user_best_scores(int $userId, int $limit = 5): array
    {
        $limit = max(1, min(100, $limit));
        $stmt = ep_db()->prepare(
            "SELECT
                r.id,
                r.attempt_id,
                r.score_obtained,
                r.max_score,
                r.percentage,
                r.rank_label,
                r.correct_answers,
                r.total_questions,
                r.published_at,
                COALESCE(t.title, qs.title, CONCAT('Attempt #', a.id)) AS paper_title,
                COALESCE(c.name, 'General') AS category_name
             FROM ep_exam_results r
             INNER JOIN ep_exam_attempts a ON a.id = r.attempt_id
             LEFT JOIN ep_paper_templates t ON t.id = a.template_id
             LEFT JOIN ep_question_sets qs ON qs.id = a.question_set_id
             LEFT JOIN ep_exam_categories c ON c.id = COALESCE(t.category_id, qs.category_id)
             WHERE r.user_id = ?
             ORDER BY r.percentage DESC, r.score_obtained DESC, r.published_at DESC
             LIMIT ?"
        );
        $stmt->bind_param('ii', $userId, $limit);
        $stmt->execute();
        $rows = $stmt->get_result()->fetch_all(MYSQLI_ASSOC);
        $stmt->close();

        return $rows;
    }
}

if (!function_exists('ep_get_user_attempt_detail')) {
    function ep_get_user_attempt_detail(int $userId, int $attemptId): ?array
    {
        $stmt = ep_db()->prepare(
            "SELECT
                a.*,
                COALESCE(t.title, qs.title, CONCAT('Attempt #', a.id)) AS paper_title,
                COALESCE(t.subject_name, qs.subject, 'General') AS subject_name,
                COALESCE(t.exam_year, qs.exam_year, '') AS exam_year,
                COALESCE(c.name, 'General') AS category_name,
                COALESCE(t.allow_pause, 1) AS allow_pause,
                COALESCE(t.max_pause_count, 3) AS max_pause_count,
                COALESCE(t.no_refresh_mode, 0) AS no_refresh_mode,
                COALESCE(t.max_refresh_violations, 1) AS max_refresh_violations,
                COALESCE(t.duration_minutes, qs.duration_minutes, 60) AS template_duration_minutes
             FROM ep_exam_attempts a
             LEFT JOIN ep_paper_templates t ON t.id = a.template_id
             LEFT JOIN ep_question_sets qs ON qs.id = a.question_set_id
             LEFT JOIN ep_exam_categories c ON c.id = COALESCE(t.category_id, qs.category_id)
             WHERE a.id = ? AND a.user_id = ?
             LIMIT 1"
        );
        $stmt->bind_param('ii', $attemptId, $userId);
        $stmt->execute();
        $row = $stmt->get_result()->fetch_assoc();
        $stmt->close();

        return $row ?: null;
    }
}

if (!function_exists('ep_resume_user_attempt')) {
    function ep_resume_user_attempt(int $userId, int $attemptId): array
    {
        $attempt = ep_get_user_attempt_detail($userId, $attemptId);
        if (!$attempt) {
            return ['ok' => false, 'message' => 'Attempt not found.'];
        }
        $status = (string) ($attempt['status'] ?? '');
        if (!in_array($status, ['not_started', 'in_progress', 'paused'], true)) {
            return ['ok' => false, 'message' => 'Attempt is already closed.'];
        }

        $status = (string) ($attempt['status'] ?? '');
        if (!in_array($status, ['not_started', 'in_progress', 'paused'], true)) {
            return ['ok' => false, 'message' => 'This attempt is already finished.'];
        }

        $nextStatus = 'in_progress';
        $nowTs = time();
        $now = gmdate('Y-m-d H:i:s', $nowTs);
        $wasPaused = $status === 'paused';
        $resumeIncrement = $wasPaused ? 1 : 0;
        $pauseSecondsDelta = 0;
        $pausedAtRaw = (string) ($attempt['paused_at'] ?? '');
        if ($wasPaused && $pausedAtRaw !== '' && strtotime($pausedAtRaw) !== false) {
            $pauseSecondsDelta = max(0, $nowTs - strtotime($pausedAtRaw));
        }
        $remainingSeconds = (int) ($attempt['remaining_seconds'] ?? 0);
        $endsAtRaw = (string) ($attempt['ends_at'] ?? '');
        if ($endsAtRaw !== '' && strtotime($endsAtRaw) !== false) {
            $remainingSeconds = max(0, strtotime($endsAtRaw) - $nowTs);
        }

        if ($remainingSeconds <= 0) {
            $durationMinutes = (int) ($attempt['template_duration_minutes'] ?? 60);
            $remainingSeconds = max(0, $durationMinutes * 60);
        }

        if ($remainingSeconds <= 0) {
            return ['ok' => false, 'message' => 'This attempt timer has already ended.'];
        }

        $nextEndsAt = gmdate('Y-m-d H:i:s', $nowTs + $remainingSeconds);

        $stmt = ep_db()->prepare(
            'UPDATE ep_exam_attempts
             SET status = ?, paused_at = NULL, last_saved_at = ?, resume_count = resume_count + ?, pause_seconds_accum = pause_seconds_accum + ?, remaining_seconds = ?, ends_at = ?
             WHERE id = ? AND user_id = ?'
        );
        $stmt->bind_param('ssiiisii', $nextStatus, $now, $resumeIncrement, $pauseSecondsDelta, $remainingSeconds, $nextEndsAt, $attemptId, $userId);
        $stmt->execute();
        $stmt->close();

        $eventType = $wasPaused ? 'resume' : 'rejoin';
        $payloadJson = json_encode([
            'from_status' => $status,
            'to_status' => $nextStatus,
            'remaining_seconds' => $remainingSeconds,
            'source' => 'module7_runner',
        ], JSON_UNESCAPED_UNICODE);

        $eventStmt = ep_db()->prepare(
            'INSERT INTO ep_exam_attempt_events (attempt_id, actor_user_id, event_type, event_payload_json)
             VALUES (?, ?, ?, ?)'
        );
        $eventStmt->bind_param('iiss', $attemptId, $userId, $eventType, $payloadJson);
        $eventStmt->execute();
        $eventStmt->close();

        return ['ok' => true, 'message' => 'Attempt session resumed.'];
    }
}

if (!function_exists('ep_pause_user_attempt')) {
    function ep_pause_user_attempt(int $userId, int $attemptId): array
    {
        $attempt = ep_get_user_attempt_detail($userId, $attemptId);
        if (!$attempt) {
            return ['ok' => false, 'message' => 'Attempt not found.'];
        }

        $status = (string) ($attempt['status'] ?? '');
        if (!in_array($status, ['not_started', 'in_progress', 'paused'], true)) {
            return ['ok' => false, 'message' => 'This attempt cannot be paused.'];
        }
        if ($status === 'paused') {
            return ['ok' => true, 'message' => 'Attempt is already paused.'];
        }

        $allowPause = (int) ($attempt['allow_pause'] ?? 1);
        if ($allowPause !== 1) {
            return ['ok' => false, 'message' => 'Pause is not allowed for this paper.'];
        }

        $maxPauseCount = (int) ($attempt['max_pause_count'] ?? 0);
        if ($maxPauseCount > 0) {
            $countStmt = ep_db()->prepare(
                "SELECT COUNT(*) AS total
                 FROM ep_exam_attempt_events
                 WHERE attempt_id = ?
                   AND event_type = 'pause'"
            );
            $countStmt->bind_param('i', $attemptId);
            $countStmt->execute();
            $countRow = $countStmt->get_result()->fetch_assoc();
            $countStmt->close();

            $pauseCount = (int) ($countRow['total'] ?? 0);
            if ($pauseCount >= $maxPauseCount) {
                return ['ok' => false, 'message' => 'Maximum pause limit reached for this paper.'];
            }
        }

        $nextStatus = 'paused';
        $nowTs = time();
        $now = gmdate('Y-m-d H:i:s', $nowTs);
        $remainingSeconds = (int) ($attempt['remaining_seconds'] ?? 0);
        $endsAtRaw = (string) ($attempt['ends_at'] ?? '');
        if ($endsAtRaw !== '' && strtotime($endsAtRaw) !== false) {
            $remainingSeconds = max(0, strtotime($endsAtRaw) - $nowTs);
        }

        if ($remainingSeconds <= 0) {
            return ['ok' => false, 'message' => 'Timer already ended. Submit the exam now.'];
        }

        $stmt = ep_db()->prepare(
            'UPDATE ep_exam_attempts
             SET status = ?, paused_at = ?, last_saved_at = ?, remaining_seconds = ?, ends_at = NULL
             WHERE id = ? AND user_id = ?'
        );
        $stmt->bind_param('sssiii', $nextStatus, $now, $now, $remainingSeconds, $attemptId, $userId);
        $stmt->execute();
        $stmt->close();

        $eventType = 'pause';
        $payloadJson = json_encode([
            'from_status' => $status,
            'to_status' => $nextStatus,
            'remaining_seconds' => $remainingSeconds,
            'source' => 'module7_runner',
        ], JSON_UNESCAPED_UNICODE);
        $eventStmt = ep_db()->prepare(
            'INSERT INTO ep_exam_attempt_events (attempt_id, actor_user_id, event_type, event_payload_json)
             VALUES (?, ?, ?, ?)'
        );
        $eventStmt->bind_param('iiss', $attemptId, $userId, $eventType, $payloadJson);
        $eventStmt->execute();
        $eventStmt->close();

        return ['ok' => true, 'message' => 'Attempt paused. You can resume from dashboard.'];
    }
}

if (!function_exists('ep_log_attempt_runtime_event')) {
    function ep_log_attempt_runtime_event(int $userId, int $attemptId, string $eventType, array $payload = [], bool $incrementRefreshViolation = false): array
    {
        $attempt = ep_get_user_attempt_detail($userId, $attemptId);
        if (!$attempt) {
            return ['ok' => false, 'message' => 'Attempt not found.'];
        }
        $status = (string) ($attempt['status'] ?? '');
        if (!in_array($status, ['not_started', 'in_progress', 'paused'], true)) {
            return ['ok' => false, 'message' => 'Attempt is already closed.'];
        }

        $allowedEvents = [
            'autosave',
            'answer_change',
            'pause',
            'resume',
            'tab_hidden',
            'tab_visible',
            'refresh_detected',
            'submit_manual',
            'submit_auto',
            'timeout',
            'rejoin',
        ];
        if (!in_array($eventType, $allowedEvents, true)) {
            return ['ok' => false, 'message' => 'Unsupported runtime event.'];
        }

        $currentRefreshViolations = (int) ($attempt['no_refresh_violations'] ?? 0);
        $maxRefreshViolations = max(1, (int) ($attempt['max_refresh_violations'] ?? 1));
        $noRefreshMode = (int) ($attempt['no_refresh_mode'] ?? 0) === 1;
        $nextRefreshViolations = $incrementRefreshViolation ? ($currentRefreshViolations + 1) : $currentRefreshViolations;
        $shouldForceSubmit = $noRefreshMode && $incrementRefreshViolation && $nextRefreshViolations >= $maxRefreshViolations;

        $payloadJson = $payload ? json_encode($payload, JSON_UNESCAPED_UNICODE) : null;
        $now = gmdate('Y-m-d H:i:s');

        ep_db()->begin_transaction();
        try {
            if ($incrementRefreshViolation) {
                $updateAttempt = ep_db()->prepare(
                    'UPDATE ep_exam_attempts
                     SET no_refresh_violations = no_refresh_violations + 1, last_saved_at = ?
                     WHERE id = ? AND user_id = ?'
                );
                $updateAttempt->bind_param('sii', $now, $attemptId, $userId);
                $updateAttempt->execute();
                $updateAttempt->close();
            }

            $eventStmt = ep_db()->prepare(
                'INSERT INTO ep_exam_attempt_events (attempt_id, actor_user_id, event_type, event_payload_json)
                 VALUES (?, ?, ?, ?)'
            );
            $eventStmt->bind_param('iiss', $attemptId, $userId, $eventType, $payloadJson);
            $eventStmt->execute();
            $eventStmt->close();

            ep_db()->commit();
        } catch (Throwable $exception) {
            ep_db()->rollback();
            return ['ok' => false, 'message' => 'Unable to record runtime event. ' . $exception->getMessage()];
        }

        if ($shouldForceSubmit) {
            $forceSubmit = ep_force_auto_submit_attempt(
                $userId,
                $attemptId,
                'no_refresh_limit',
                [
                    'source' => 'module5_policy',
                    'max_refresh_violations' => $maxRefreshViolations,
                    'current_refresh_violations' => $nextRefreshViolations,
                ]
            );
            if (!($forceSubmit['ok'] ?? false)) {
                return $forceSubmit;
            }

            return [
                'ok' => true,
                'force_submit' => true,
                'message' => 'No-refresh policy triggered. Attempt auto-submitted.',
            ];
        }

        return ['ok' => true, 'message' => 'Runtime event recorded.'];
    }
}

if (!function_exists('ep_force_auto_submit_attempt')) {
    function ep_force_auto_submit_attempt(int $userId, int $attemptId, string $reason, array $extraPayload = []): array
    {
        $attempt = ep_get_user_attempt_detail($userId, $attemptId);
        if (!$attempt) {
            return ['ok' => false, 'message' => 'Attempt not found.'];
        }

        $status = (string) ($attempt['status'] ?? '');
        if (!in_array($status, ['not_started', 'in_progress', 'paused'], true)) {
            return ['ok' => true, 'message' => 'Attempt already closed.', 'already_closed' => true];
        }

        $now = gmdate('Y-m-d H:i:s');

        ep_db()->begin_transaction();
        try {
            $nextStatus = 'auto_submitted';
            $remainingSeconds = 0;

            $updateAttempt = ep_db()->prepare(
                'UPDATE ep_exam_attempts
                 SET status = ?, submitted_at = COALESCE(submitted_at, ?), last_saved_at = ?, remaining_seconds = ?, ends_at = NULL
                 WHERE id = ? AND user_id = ?'
            );
            $updateAttempt->bind_param('sssiii', $nextStatus, $now, $now, $remainingSeconds, $attemptId, $userId);
            $updateAttempt->execute();
            $updateAttempt->close();

            $eventPayload = json_encode(array_merge(
                [
                    'source' => 'module5_policy',
                    'reason' => $reason,
                ],
                $extraPayload
            ), JSON_UNESCAPED_UNICODE);
            $eventType = 'submit_auto';
            $eventStmt = ep_db()->prepare(
                'INSERT INTO ep_exam_attempt_events (attempt_id, actor_user_id, event_type, event_payload_json)
                 VALUES (?, ?, ?, ?)'
            );
            $eventStmt->bind_param('iiss', $attemptId, $userId, $eventType, $eventPayload);
            $eventStmt->execute();
            $eventStmt->close();

            ep_db()->commit();
        } catch (Throwable $exception) {
            ep_db()->rollback();
            return ['ok' => false, 'message' => 'Unable to auto-submit attempt. ' . $exception->getMessage()];
        }

        $evaluate = ep_evaluate_user_attempt($userId, $attemptId);
        if (!($evaluate['ok'] ?? false)) {
            return $evaluate;
        }

        return ['ok' => true, 'message' => 'Attempt auto-submitted by policy.'];
    }
}

if (!function_exists('ep_uuid_v4')) {
    function ep_uuid_v4(): string
    {
        $bytes = random_bytes(16);
        $bytes[6] = chr((ord($bytes[6]) & 0x0f) | 0x40);
        $bytes[8] = chr((ord($bytes[8]) & 0x3f) | 0x80);

        return vsprintf('%s%s-%s-%s-%s-%s%s%s', str_split(bin2hex($bytes), 4));
    }
}

if (!function_exists('ep_get_published_templates_by_category_for_user')) {
    function ep_get_published_templates_by_category_for_user(int $categoryId): array
    {
        $stmt = ep_db()->prepare(
            "SELECT
                t.id,
                t.title,
                t.slug,
                t.exam_year,
                t.subject_name,
                t.instructions,
                t.duration_minutes,
                t.total_questions,
                t.max_attempts_per_user,
                t.allow_pause,
                t.no_refresh_mode,
                t.max_refresh_violations,
                COUNT(ti.id) AS item_count,
                COALESCE(SUM(ti.marks), 0) AS max_score
             FROM ep_paper_templates t
             LEFT JOIN ep_paper_template_items ti ON ti.template_id = t.id
             WHERE t.category_id = ?
               AND t.published_status = 'published'
               AND t.is_active = 1
             GROUP BY t.id
             ORDER BY t.updated_at DESC, t.id DESC"
        );
        $stmt->bind_param('i', $categoryId);
        $stmt->execute();
        $rows = $stmt->get_result()->fetch_all(MYSQLI_ASSOC);
        $stmt->close();

        return $rows;
    }
}

if (!function_exists('ep_get_pending_attempt_map_for_templates')) {
    function ep_get_pending_attempt_map_for_templates(int $userId, array $templateIds): array
    {
        $ids = [];
        foreach ($templateIds as $rawId) {
            $id = (int) $rawId;
            if ($id > 0) {
                $ids[$id] = $id;
            }
        }
        $ids = array_values($ids);
        if (!$ids) {
            return [];
        }

        $placeholders = implode(',', array_fill(0, count($ids), '?'));
        $types = 'i' . str_repeat('i', count($ids));
        $params = [$userId];
        foreach ($ids as $id) {
            $params[] = $id;
        }

        $stmt = ep_db()->prepare(
            "SELECT
                a.id,
                a.template_id,
                a.status,
                a.last_saved_at,
                a.remaining_seconds
             FROM ep_exam_attempts a
             WHERE a.user_id = ?
               AND a.template_id IN ($placeholders)
               AND a.status IN ('not_started','in_progress','paused')
             ORDER BY a.id DESC"
        );
        ep_bind_dynamic_params($stmt, $types, $params);
        $stmt->execute();
        $rows = $stmt->get_result()->fetch_all(MYSQLI_ASSOC);
        $stmt->close();

        $map = [];
        foreach ($rows as $row) {
            $templateId = (int) ($row['template_id'] ?? 0);
            if ($templateId <= 0 || isset($map[$templateId])) {
                continue;
            }
            $map[$templateId] = $row;
        }

        return $map;
    }
}

if (!function_exists('ep_start_exam_attempt')) {
    function ep_start_exam_attempt(int $userId, int $templateId): array
    {
        $template = ep_get_paper_template_detail($templateId);
        if (!$template || (string) ($template['published_status'] ?? '') !== 'published' || (int) ($template['is_active'] ?? 0) !== 1) {
            return ['ok' => false, 'message' => 'Selected paper is not available.'];
        }

        $items = ep_get_paper_template_items($templateId);
        if (!$items) {
            return ['ok' => false, 'message' => 'This paper has no questions configured yet.'];
        }

        $existingPending = ep_db()->prepare(
            "SELECT id
             FROM ep_exam_attempts
             WHERE user_id = ?
               AND template_id = ?
               AND status IN ('not_started','in_progress','paused')
             ORDER BY id DESC
             LIMIT 1"
        );
        $existingPending->bind_param('ii', $userId, $templateId);
        $existingPending->execute();
        $existingRow = $existingPending->get_result()->fetch_assoc();
        $existingPending->close();

        if ($existingRow) {
            return [
                'ok' => true,
                'attempt_id' => (int) $existingRow['id'],
                'message' => 'Resuming your pending attempt.',
                'was_existing' => true,
            ];
        }

        $maxAttemptsPerUser = max(1, (int) ($template['max_attempts_per_user'] ?? 1));
        $countStmt = ep_db()->prepare(
            'SELECT COUNT(*) AS total FROM ep_exam_attempts WHERE user_id = ? AND template_id = ?'
        );
        $countStmt->bind_param('ii', $userId, $templateId);
        $countStmt->execute();
        $countRow = $countStmt->get_result()->fetch_assoc();
        $countStmt->close();
        $attemptsUsed = (int) ($countRow['total'] ?? 0);
        if ($attemptsUsed >= $maxAttemptsPerUser) {
            return ['ok' => false, 'message' => 'Maximum attempt limit reached for this paper.'];
        }

        ep_db()->begin_transaction();
        try {
            $subStmt = ep_db()->prepare(
                "SELECT
                    s.id,
                    s.papers_used,
                    p.max_papers_per_cycle
                 FROM ep_user_subscriptions s
                 INNER JOIN ep_subscription_plans p ON p.id = s.plan_id
                 WHERE s.user_id = ?
                   AND s.status = 'active'
                   AND s.expires_at > UTC_TIMESTAMP()
                 ORDER BY s.expires_at DESC, s.id DESC
                 LIMIT 1
                 FOR UPDATE"
            );
            $subStmt->bind_param('i', $userId);
            $subStmt->execute();
            $subRow = $subStmt->get_result()->fetch_assoc();
            $subStmt->close();

            if (!$subRow) {
                throw new RuntimeException('Active subscription required to start paper.');
            }

            $subscriptionId = (int) $subRow['id'];
            $papersUsed = (int) ($subRow['papers_used'] ?? 0);
            $maxPapers = (int) ($subRow['max_papers_per_cycle'] ?? 0);
            if ($maxPapers <= 0 || $papersUsed >= $maxPapers) {
                throw new RuntimeException('No remaining paper quota in current subscription.');
            }

            $newPapersUsed = $papersUsed + 1;
            $updateSub = ep_db()->prepare('UPDATE ep_user_subscriptions SET papers_used = ? WHERE id = ?');
            $updateSub->bind_param('ii', $newPapersUsed, $subscriptionId);
            $updateSub->execute();
            $updateSub->close();

            $durationMinutes = max(1, (int) ($template['duration_minutes'] ?? 60));
            $remainingSeconds = $durationMinutes * 60;
            $startedAt = gmdate('Y-m-d H:i:s');
            $endsAt = gmdate('Y-m-d H:i:s', time() + $remainingSeconds);
            $status = 'in_progress';
            $attemptUuid = ep_uuid_v4();
            $snapshotJson = json_encode([
                'source' => 'module7_start',
                'template_id' => $templateId,
            ], JSON_UNESCAPED_UNICODE);

            $insertAttempt = ep_db()->prepare(
                'INSERT INTO ep_exam_attempts (
                    attempt_uuid,
                    user_id,
                    template_id,
                    question_set_id,
                    status,
                    started_at,
                    ends_at,
                    last_saved_at,
                    remaining_seconds,
                    client_snapshot_json
                 ) VALUES (?, ?, ?, NULLIF(?, 0), ?, ?, ?, ?, ?, ?)'
            );
            $questionSetId = (int) ($template['question_set_id'] ?? 0);
            $insertAttempt->bind_param(
                'siiissssis',
                $attemptUuid,
                $userId,
                $templateId,
                $questionSetId,
                $status,
                $startedAt,
                $endsAt,
                $startedAt,
                $remainingSeconds,
                $snapshotJson
            );
            $insertAttempt->execute();
            $attemptId = (int) ep_db()->insert_id;
            $insertAttempt->close();

            $eventType = 'paper_started';
            $papersDelta = 1;
            $note = 'Start paper #' . $templateId;
            $usageStmt = ep_db()->prepare(
                'INSERT INTO ep_subscription_usage_events (subscription_id, user_id, attempt_id, event_type, papers_delta, note)
                 VALUES (?, ?, ?, ?, ?, ?)'
            );
            $usageStmt->bind_param('iiisis', $subscriptionId, $userId, $attemptId, $eventType, $papersDelta, $note);
            $usageStmt->execute();
            $usageStmt->close();

            $eventPayload = json_encode([
                'template_id' => $templateId,
                'source' => 'module7_start',
            ], JSON_UNESCAPED_UNICODE);
            $attemptEventType = 'start';
            $attemptEvent = ep_db()->prepare(
                'INSERT INTO ep_exam_attempt_events (attempt_id, actor_user_id, event_type, event_payload_json)
                 VALUES (?, ?, ?, ?)'
            );
            $attemptEvent->bind_param('iiss', $attemptId, $userId, $attemptEventType, $eventPayload);
            $attemptEvent->execute();
            $attemptEvent->close();

            ep_db()->commit();
        } catch (Throwable $exception) {
            ep_db()->rollback();
            return ['ok' => false, 'message' => 'Unable to start attempt. ' . $exception->getMessage()];
        }

        return [
            'ok' => true,
            'attempt_id' => $attemptId,
            'message' => 'Paper started successfully.',
            'was_existing' => false,
        ];
    }
}

if (!function_exists('ep_get_attempt_question_rows')) {
    function ep_get_attempt_question_rows(int $userId, int $attemptId): array
    {
        $attempt = ep_get_user_attempt_detail($userId, $attemptId);
        if (!$attempt) {
            return [];
        }

        $templateId = (int) ($attempt['template_id'] ?? 0);
        if ($templateId <= 0) {
            return [];
        }

        $stmt = ep_db()->prepare(
            "SELECT
                ti.id AS template_item_id,
                ti.template_id,
                ti.question_id,
                ti.section_name,
                ti.marks AS template_marks,
                ti.display_order,
                q.question_type,
                q.question_text,
                q.hint_text,
                q.explanation_text,
                q.default_marks,
                q.negative_marks,
                qak.answer_type,
                qak.correct_option_keys,
                qak.correct_text,
                qak.correct_numeric,
                qak.numeric_tolerance
             FROM ep_paper_template_items ti
             INNER JOIN ep_questions q ON q.id = ti.question_id
             LEFT JOIN ep_question_answer_keys qak ON qak.question_id = q.id
             WHERE ti.template_id = ?
             ORDER BY ti.display_order ASC, ti.id ASC"
        );
        $stmt->bind_param('i', $templateId);
        $stmt->execute();
        $rows = $stmt->get_result()->fetch_all(MYSQLI_ASSOC);
        $stmt->close();

        if (!$rows) {
            return [];
        }

        $questionIds = [];
        foreach ($rows as $row) {
            $questionIds[] = (int) $row['question_id'];
        }
        $questionIds = array_values(array_unique($questionIds));

        $placeholders = implode(',', array_fill(0, count($questionIds), '?'));
        $types = str_repeat('i', count($questionIds));
        $params = $questionIds;
        $optionStmt = ep_db()->prepare(
            "SELECT question_id, option_key, option_text, sort_order
             FROM ep_question_options
             WHERE question_id IN ($placeholders)
             ORDER BY question_id ASC, sort_order ASC, option_key ASC"
        );
        ep_bind_dynamic_params($optionStmt, $types, $params);
        $optionStmt->execute();
        $optionRows = $optionStmt->get_result()->fetch_all(MYSQLI_ASSOC);
        $optionStmt->close();

        $optionsByQuestion = [];
        foreach ($optionRows as $optionRow) {
            $questionId = (int) $optionRow['question_id'];
            if (!isset($optionsByQuestion[$questionId])) {
                $optionsByQuestion[$questionId] = [];
            }
            $optionsByQuestion[$questionId][] = $optionRow;
        }

        foreach ($rows as $index => $row) {
            $questionId = (int) $row['question_id'];
            $rows[$index]['options'] = $optionsByQuestion[$questionId] ?? [];
        }

        return $rows;
    }
}

if (!function_exists('ep_get_attempt_answer_map')) {
    function ep_get_attempt_answer_map(int $attemptId): array
    {
        $stmt = ep_db()->prepare(
            'SELECT
                question_id,
                selected_option_keys,
                answer_text,
                answer_numeric,
                is_correct,
                marks_awarded
             FROM ep_exam_attempt_answers
             WHERE attempt_id = ?'
        );
        $stmt->bind_param('i', $attemptId);
        $stmt->execute();
        $rows = $stmt->get_result()->fetch_all(MYSQLI_ASSOC);
        $stmt->close();

        $map = [];
        foreach ($rows as $row) {
            $map[(int) $row['question_id']] = $row;
        }

        return $map;
    }
}

if (!function_exists('ep_save_user_attempt_responses')) {
    function ep_save_user_attempt_responses(int $userId, int $attemptId, array $responses, bool $submitNow = false): array
    {
        $attempt = ep_get_user_attempt_detail($userId, $attemptId);
        if (!$attempt) {
            return ['ok' => false, 'message' => 'Attempt not found.'];
        }

        $status = (string) ($attempt['status'] ?? '');
        if (in_array($status, ['submitted', 'evaluated', 'abandoned', 'auto_submitted'], true)) {
            return ['ok' => false, 'message' => 'Attempt is already closed.'];
        }

        $questions = ep_get_attempt_question_rows($userId, $attemptId);
        if (!$questions) {
            return ['ok' => false, 'message' => 'No questions found for this attempt.'];
        }

        $nowTs = time();
        $now = gmdate('Y-m-d H:i:s', $nowTs);
        $remainingSeconds = (int) ($attempt['remaining_seconds'] ?? 0);
        $endsAtRaw = (string) ($attempt['ends_at'] ?? '');
        if ($endsAtRaw !== '' && strtotime($endsAtRaw) !== false) {
            $remainingSeconds = max(0, strtotime($endsAtRaw) - $nowTs);
        }
        $forcedAutoSubmit = false;
        if (!$submitNow && $remainingSeconds <= 0) {
            $submitNow = true;
            $forcedAutoSubmit = true;
        }
        if ($submitNow) {
            $remainingSeconds = 0;
        }

        ep_db()->begin_transaction();
        try {
            $upsertStmt = ep_db()->prepare(
                'INSERT INTO ep_exam_attempt_answers (attempt_id, question_id, selected_option_keys, answer_text, answer_numeric, time_spent_seconds)
                 VALUES (?, ?, ?, ?, ?, 0)
                 ON DUPLICATE KEY UPDATE
                    selected_option_keys = VALUES(selected_option_keys),
                    answer_text = VALUES(answer_text),
                    answer_numeric = VALUES(answer_numeric),
                    updated_at = CURRENT_TIMESTAMP'
            );

            $deleteStmt = ep_db()->prepare(
                'DELETE FROM ep_exam_attempt_answers WHERE attempt_id = ? AND question_id = ?'
            );

            foreach ($questions as $question) {
                $questionId = (int) $question['question_id'];
                $questionType = (string) ($question['question_type'] ?? 'mcq_single');
                $response = $responses[$questionId] ?? [];
                if (!is_array($response)) {
                    $response = [];
                }

                $selectedOptionKeys = null;
                $answerText = null;
                $answerNumeric = null;
                $attempted = false;

                if (in_array($questionType, ['mcq_single', 'true_false'], true)) {
                    $optionValue = strtoupper(trim((string) ($response['option'] ?? '')));
                    if ($optionValue !== '') {
                        $selectedOptionKeys = substr($optionValue, 0, 1);
                        $attempted = $selectedOptionKeys !== '';
                    }
                } elseif ($questionType === 'mcq_multi') {
                    $rawOptions = $response['options'] ?? [];
                    if (!is_array($rawOptions)) {
                        $rawOptions = [];
                    }
                    $normalized = [];
                    foreach ($rawOptions as $rawOption) {
                        $opt = strtoupper(trim((string) $rawOption));
                        if ($opt === '') {
                            continue;
                        }
                        $normalized[substr($opt, 0, 1)] = substr($opt, 0, 1);
                    }
                    if ($normalized) {
                        ksort($normalized);
                        $selectedOptionKeys = implode(',', array_values($normalized));
                        $attempted = true;
                    }
                } elseif ($questionType === 'numeric') {
                    $numericRaw = trim((string) ($response['numeric'] ?? ''));
                    if ($numericRaw !== '' && is_numeric($numericRaw)) {
                        $answerNumeric = (string) ((float) $numericRaw);
                        $attempted = true;
                    }
                } else {
                    $textRaw = trim((string) ($response['text'] ?? ''));
                    if ($textRaw !== '') {
                        $answerText = $textRaw;
                        $attempted = true;
                    }
                }

                if ($attempted) {
                    $answerNumericValue = $answerNumeric;
                    $upsertStmt->bind_param(
                        'iisss',
                        $attemptId,
                        $questionId,
                        $selectedOptionKeys,
                        $answerText,
                        $answerNumericValue
                    );
                    $upsertStmt->execute();
                } else {
                    $deleteStmt->bind_param('ii', $attemptId, $questionId);
                    $deleteStmt->execute();
                }
            }

            $upsertStmt->close();
            $deleteStmt->close();

            $nextStatus = $submitNow ? ($forcedAutoSubmit ? 'auto_submitted' : 'submitted') : 'in_progress';
            $submittedAt = $submitNow ? $now : null;
            $nextEndsAt = $submitNow ? null : gmdate('Y-m-d H:i:s', $nowTs + max(0, $remainingSeconds));
            $updateAttempt = ep_db()->prepare(
                'UPDATE ep_exam_attempts
                 SET status = ?, last_saved_at = ?, submitted_at = COALESCE(?, submitted_at), remaining_seconds = ?, ends_at = ?
                 WHERE id = ? AND user_id = ?'
            );
            $updateAttempt->bind_param('sssisii', $nextStatus, $now, $submittedAt, $remainingSeconds, $nextEndsAt, $attemptId, $userId);
            $updateAttempt->execute();
            $updateAttempt->close();

            $eventType = $forcedAutoSubmit ? 'submit_auto' : ($submitNow ? 'submit_manual' : 'autosave');
            $eventPayload = json_encode([
                'source' => 'module7_runner',
                'status' => $nextStatus,
                'remaining_seconds' => $remainingSeconds,
            ], JSON_UNESCAPED_UNICODE);
            $eventStmt = ep_db()->prepare(
                'INSERT INTO ep_exam_attempt_events (attempt_id, actor_user_id, event_type, event_payload_json)
                 VALUES (?, ?, ?, ?)'
            );
            $eventStmt->bind_param('iiss', $attemptId, $userId, $eventType, $eventPayload);
            $eventStmt->execute();
            $eventStmt->close();

            ep_db()->commit();
        } catch (Throwable $exception) {
            ep_db()->rollback();
            return ['ok' => false, 'message' => 'Unable to save responses. ' . $exception->getMessage()];
        }

        if ($forcedAutoSubmit) {
            return ['ok' => true, 'message' => 'Timer ended. Exam auto-submitted.', 'auto_submitted' => true];
        }

        return ['ok' => true, 'message' => $submitNow ? 'Exam submitted.' : 'Responses saved.'];
    }
}

if (!function_exists('ep_evaluate_user_attempt')) {
    function ep_evaluate_user_attempt(int $userId, int $attemptId): array
    {
        $attempt = ep_get_user_attempt_detail($userId, $attemptId);
        if (!$attempt) {
            return ['ok' => false, 'message' => 'Attempt not found.'];
        }

        $status = (string) ($attempt['status'] ?? '');
        if (!in_array($status, ['submitted', 'auto_submitted', 'in_progress', 'paused', 'evaluated'], true)) {
            return ['ok' => false, 'message' => 'Attempt is not eligible for evaluation.'];
        }

        $questions = ep_get_attempt_question_rows($userId, $attemptId);
        if (!$questions) {
            return ['ok' => false, 'message' => 'No questions found for evaluation.'];
        }

        $answersMap = ep_get_attempt_answer_map($attemptId);
        $now = gmdate('Y-m-d H:i:s');

        $totalQuestions = count($questions);
        $attemptedQuestions = 0;
        $correctAnswers = 0;
        $wrongAnswers = 0;
        $unansweredCount = 0;
        $scoreObtained = 0.0;
        $maxScore = 0.0;

        ep_db()->begin_transaction();
        try {
            $updateAnswerStmt = ep_db()->prepare(
                'UPDATE ep_exam_attempt_answers
                 SET is_correct = ?, marks_awarded = ?, evaluated_at = ?
                 WHERE attempt_id = ? AND question_id = ?'
            );

            foreach ($questions as $question) {
                $questionId = (int) $question['question_id'];
                $questionType = (string) ($question['question_type'] ?? 'mcq_single');
                $templateMarks = (float) ($question['template_marks'] ?? 1.0);
                $negativeMarks = (float) ($question['negative_marks'] ?? 0.0);
                $maxScore += $templateMarks;

                $answerRow = $answersMap[$questionId] ?? null;
                $attempted = false;
                $isCorrect = false;
                $marksAwarded = 0.0;

                if ($answerRow !== null) {
                    $selectedKeysRaw = (string) ($answerRow['selected_option_keys'] ?? '');
                    $answerTextRaw = trim((string) ($answerRow['answer_text'] ?? ''));
                    $answerNumericRaw = $answerRow['answer_numeric'];

                    if (in_array($questionType, ['mcq_single', 'true_false'], true)) {
                        $selected = strtoupper(trim($selectedKeysRaw));
                        if ($selected !== '') {
                            $attempted = true;
                            $given = substr($selected, 0, 1);
                            $expected = substr(strtoupper(trim((string) ($question['correct_option_keys'] ?? ''))), 0, 1);
                            $isCorrect = $expected !== '' && $given === $expected;
                        }
                    } elseif ($questionType === 'mcq_multi') {
                        if ($selectedKeysRaw !== '') {
                            $attempted = true;
                            $givenParts = preg_split('/[\s,]+/', strtoupper($selectedKeysRaw)) ?: [];
                            $expectedParts = preg_split('/[\s,]+/', strtoupper((string) ($question['correct_option_keys'] ?? ''))) ?: [];
                            $givenSet = [];
                            foreach ($givenParts as $part) {
                                $k = substr(trim($part), 0, 1);
                                if ($k !== '') {
                                    $givenSet[$k] = $k;
                                }
                            }
                            $expectedSet = [];
                            foreach ($expectedParts as $part) {
                                $k = substr(trim($part), 0, 1);
                                if ($k !== '') {
                                    $expectedSet[$k] = $k;
                                }
                            }
                            ksort($givenSet);
                            ksort($expectedSet);
                            $isCorrect = $givenSet === $expectedSet && !empty($expectedSet);
                        }
                    } elseif ($questionType === 'numeric') {
                        if ($answerNumericRaw !== null && $answerNumericRaw !== '') {
                            $attempted = true;
                            $givenNumeric = (float) $answerNumericRaw;
                            $correctNumeric = $question['correct_numeric'] !== null ? (float) $question['correct_numeric'] : null;
                            $tolerance = $question['numeric_tolerance'] !== null ? (float) $question['numeric_tolerance'] : 0.0;
                            if ($correctNumeric !== null) {
                                $isCorrect = abs($givenNumeric - $correctNumeric) <= $tolerance;
                            }
                        }
                    } else {
                        if ($answerTextRaw !== '') {
                            $attempted = true;
                            $expectedText = trim((string) ($question['correct_text'] ?? ''));
                            $isCorrect = $expectedText !== '' && strtolower($answerTextRaw) === strtolower($expectedText);
                        }
                    }
                }

                if ($attempted) {
                    $attemptedQuestions++;
                    if ($isCorrect) {
                        $correctAnswers++;
                        $marksAwarded = $templateMarks;
                    } else {
                        $wrongAnswers++;
                        $marksAwarded = $negativeMarks > 0 ? (0 - $negativeMarks) : 0.0;
                    }
                    $scoreObtained += $marksAwarded;

                    $isCorrectInt = $isCorrect ? 1 : 0;
                    $updateAnswerStmt->bind_param('idsii', $isCorrectInt, $marksAwarded, $now, $attemptId, $questionId);
                    $updateAnswerStmt->execute();
                } else {
                    $unansweredCount++;
                }
            }
            $updateAnswerStmt->close();

            $percentage = $maxScore > 0 ? round(($scoreObtained / $maxScore) * 100, 2) : 0.0;
            $rankLabel = ep_result_rank_label_from_percentage($percentage);

            $evaluatedStatus = 'evaluated';
            $updateAttempt = ep_db()->prepare(
                'UPDATE ep_exam_attempts
                 SET status = ?, submitted_at = COALESCE(submitted_at, ?), last_saved_at = ?, score_obtained = ?, max_score = ?, percentage = ?
                 WHERE id = ? AND user_id = ?'
            );
            $updateAttempt->bind_param('sssdddii', $evaluatedStatus, $now, $now, $scoreObtained, $maxScore, $percentage, $attemptId, $userId);
            $updateAttempt->execute();
            $updateAttempt->close();

            $summaryJson = json_encode([
                'evaluated_at' => $now,
                'total_questions' => $totalQuestions,
                'attempted_questions' => $attemptedQuestions,
                'correct_answers' => $correctAnswers,
                'wrong_answers' => $wrongAnswers,
                'unanswered_count' => $unansweredCount,
            ], JSON_UNESCAPED_UNICODE);
            $insertResult = ep_db()->prepare(
                'INSERT INTO ep_exam_results (
                    attempt_id,
                    user_id,
                    total_questions,
                    attempted_questions,
                    correct_answers,
                    wrong_answers,
                    unanswered_count,
                    score_obtained,
                    max_score,
                    percentage,
                    rank_label,
                    summary_json,
                    published_at
                 ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
                 ON DUPLICATE KEY UPDATE
                    total_questions = VALUES(total_questions),
                    attempted_questions = VALUES(attempted_questions),
                    correct_answers = VALUES(correct_answers),
                    wrong_answers = VALUES(wrong_answers),
                    unanswered_count = VALUES(unanswered_count),
                    score_obtained = VALUES(score_obtained),
                    max_score = VALUES(max_score),
                    percentage = VALUES(percentage),
                    rank_label = VALUES(rank_label),
                    summary_json = VALUES(summary_json),
                    published_at = VALUES(published_at)'
            );
            $insertResult->bind_param(
                'iiiiiiidddsss',
                $attemptId,
                $userId,
                $totalQuestions,
                $attemptedQuestions,
                $correctAnswers,
                $wrongAnswers,
                $unansweredCount,
                $scoreObtained,
                $maxScore,
                $percentage,
                $rankLabel,
                $summaryJson,
                $now
            );
            $insertResult->execute();
            $insertResult->close();

            $eventPayload = json_encode([
                'source' => 'module7_evaluate',
                'score' => $scoreObtained,
                'max_score' => $maxScore,
                'percentage' => $percentage,
            ], JSON_UNESCAPED_UNICODE);
            $eventType = $status === 'auto_submitted' ? 'submit_auto' : 'submit_manual';
            $shouldInsertEvent = true;
            if ($eventType === 'submit_auto') {
                $existsStmt = ep_db()->prepare(
                    "SELECT COUNT(*) AS total
                     FROM ep_exam_attempt_events
                     WHERE attempt_id = ?
                       AND event_type = 'submit_auto'"
                );
                $existsStmt->bind_param('i', $attemptId);
                $existsStmt->execute();
                $existsRow = $existsStmt->get_result()->fetch_assoc();
                $existsStmt->close();
                $shouldInsertEvent = ((int) ($existsRow['total'] ?? 0)) === 0;
            }
            if ($shouldInsertEvent) {
                $eventStmt = ep_db()->prepare(
                    'INSERT INTO ep_exam_attempt_events (attempt_id, actor_user_id, event_type, event_payload_json)
                     VALUES (?, ?, ?, ?)'
                );
                $eventStmt->bind_param('iiss', $attemptId, $userId, $eventType, $eventPayload);
                $eventStmt->execute();
                $eventStmt->close();
            }

            ep_db()->commit();
        } catch (Throwable $exception) {
            ep_db()->rollback();
            return ['ok' => false, 'message' => 'Unable to evaluate attempt. ' . $exception->getMessage()];
        }

        ep_rebuild_user_progress_for_user($userId);

        return [
            'ok' => true,
            'attempt_id' => $attemptId,
            'message' => 'Result generated.',
        ];
    }
}

if (!function_exists('ep_get_user_result_by_attempt')) {
    function ep_get_user_result_by_attempt(int $userId, int $attemptId): ?array
    {
        $stmt = ep_db()->prepare(
            "SELECT
                r.*,
                a.status AS attempt_status,
                a.started_at,
                a.submitted_at,
                a.resume_count,
                a.pause_seconds_accum,
                a.no_refresh_violations,
                COALESCE(t.title, qs.title, CONCAT('Attempt #', a.id)) AS paper_title,
                COALESCE(t.subject_name, qs.subject, 'General') AS subject_name,
                COALESCE(t.exam_year, qs.exam_year, '') AS exam_year,
                COALESCE(c.name, 'General') AS category_name
             FROM ep_exam_results r
             INNER JOIN ep_exam_attempts a ON a.id = r.attempt_id
             LEFT JOIN ep_paper_templates t ON t.id = a.template_id
             LEFT JOIN ep_question_sets qs ON qs.id = a.question_set_id
             LEFT JOIN ep_exam_categories c ON c.id = COALESCE(t.category_id, qs.category_id)
             WHERE r.user_id = ?
               AND r.attempt_id = ?
             LIMIT 1"
        );
        $stmt->bind_param('ii', $userId, $attemptId);
        $stmt->execute();
        $row = $stmt->get_result()->fetch_assoc();
        $stmt->close();

        return $row ?: null;
    }
}

if (!function_exists('ep_admin_reports_normalize_filters')) {
    function ep_admin_reports_normalize_filters(array $filters): array
    {
        $status = trim((string) ($filters['status'] ?? 'all'));
        $allowedStatuses = ['all', 'not_started', 'in_progress', 'paused', 'auto_submitted', 'submitted', 'evaluated', 'abandoned'];
        if (!in_array($status, $allowedStatuses, true)) {
            $status = 'all';
        }

        $dateFrom = trim((string) ($filters['date_from'] ?? ''));
        if ($dateFrom !== '' && !preg_match('/^\d{4}-\d{2}-\d{2}$/', $dateFrom)) {
            $dateFrom = '';
        }
        $dateTo = trim((string) ($filters['date_to'] ?? ''));
        if ($dateTo !== '' && !preg_match('/^\d{4}-\d{2}-\d{2}$/', $dateTo)) {
            $dateTo = '';
        }

        return [
            'search' => trim((string) ($filters['search'] ?? '')),
            'category_id' => (int) ($filters['category_id'] ?? 0),
            'status' => $status,
            'date_from' => $dateFrom,
            'date_to' => $dateTo,
        ];
    }
}

if (!function_exists('ep_admin_reports_where_clause')) {
    function ep_admin_reports_where_clause(array $filters, string $attemptAlias = 'a', bool $includeSearch = true): array
    {
        $normalized = ep_admin_reports_normalize_filters($filters);
        $conditions = [];
        $types = '';
        $params = [];

        $categoryId = (int) $normalized['category_id'];
        if ($categoryId > 0) {
            $conditions[] = 'COALESCE(t.category_id, qs.category_id) = ?';
            $types .= 'i';
            $params[] = $categoryId;
        }

        $status = (string) $normalized['status'];
        if ($status !== 'all') {
            $conditions[] = $attemptAlias . '.status = ?';
            $types .= 's';
            $params[] = $status;
        }

        $dateFrom = (string) $normalized['date_from'];
        if ($dateFrom !== '') {
            $conditions[] = 'COALESCE(' . $attemptAlias . '.submitted_at, ' . $attemptAlias . '.started_at) >= ?';
            $types .= 's';
            $params[] = $dateFrom . ' 00:00:00';
        }

        $dateTo = (string) $normalized['date_to'];
        if ($dateTo !== '') {
            $conditions[] = 'COALESCE(' . $attemptAlias . '.submitted_at, ' . $attemptAlias . '.started_at) <= ?';
            $types .= 's';
            $params[] = $dateTo . ' 23:59:59';
        }

        $search = (string) $normalized['search'];
        if ($includeSearch && $search !== '') {
            $like = '%' . $search . '%';
            $conditions[] = '(u.name LIKE ? OR u.email LIKE ? OR COALESCE(t.title, qs.title, CONCAT(\'Attempt #\', ' . $attemptAlias . '.id)) LIKE ?)';
            $types .= 'sss';
            $params[] = $like;
            $params[] = $like;
            $params[] = $like;
        }

        $whereSql = $conditions ? (' WHERE ' . implode(' AND ', $conditions)) : '';
        return [
            'where' => $whereSql,
            'types' => $types,
            'params' => $params,
            'normalized' => $normalized,
        ];
    }
}

if (!function_exists('ep_admin_reports_kpis')) {
    function ep_admin_reports_kpis(array $filters = []): array
    {
        $built = ep_admin_reports_where_clause($filters, 'a', true);

        $sql = "SELECT
                    COUNT(*) AS attempts_total,
                    SUM(CASE WHEN a.status = 'evaluated' THEN 1 ELSE 0 END) AS evaluated_total,
                    SUM(CASE WHEN a.status = 'auto_submitted' THEN 1 ELSE 0 END) AS auto_submitted_total,
                    SUM(CASE WHEN a.status IN ('in_progress','paused') THEN 1 ELSE 0 END) AS pending_total,
                    COALESCE(AVG(r.percentage), 0) AS avg_percentage,
                    COALESCE(AVG(a.no_refresh_violations), 0) AS avg_refresh_violations,
                    COALESCE(SUM(a.no_refresh_violations), 0) AS refresh_violations_total
                FROM ep_exam_attempts a
                INNER JOIN ep_users u ON u.id = a.user_id
                LEFT JOIN ep_paper_templates t ON t.id = a.template_id
                LEFT JOIN ep_question_sets qs ON qs.id = a.question_set_id
                LEFT JOIN ep_exam_results r ON r.attempt_id = a.id" . $built['where'];

        $stmt = ep_db()->prepare($sql);
        if ($built['types'] !== '') {
            $runParams = $built['params'];
            ep_bind_dynamic_params($stmt, $built['types'], $runParams);
        }
        $stmt->execute();
        $row = $stmt->get_result()->fetch_assoc();
        $stmt->close();

        $attemptsTotal = (int) ($row['attempts_total'] ?? 0);
        $evaluatedTotal = (int) ($row['evaluated_total'] ?? 0);
        $completionRate = $attemptsTotal > 0 ? round(($evaluatedTotal / $attemptsTotal) * 100, 2) : 0.0;

        return [
            'attempts_total' => $attemptsTotal,
            'evaluated_total' => $evaluatedTotal,
            'auto_submitted_total' => (int) ($row['auto_submitted_total'] ?? 0),
            'pending_total' => (int) ($row['pending_total'] ?? 0),
            'avg_percentage' => (float) ($row['avg_percentage'] ?? 0),
            'avg_refresh_violations' => (float) ($row['avg_refresh_violations'] ?? 0),
            'refresh_violations_total' => (int) ($row['refresh_violations_total'] ?? 0),
            'completion_rate' => $completionRate,
        ];
    }
}

if (!function_exists('ep_admin_reports_attempts')) {
    function ep_admin_reports_attempts(array $filters = [], int $limit = 25, int $offset = 0): array
    {
        $built = ep_admin_reports_where_clause($filters, 'a', true);
        $baseFrom = " FROM ep_exam_attempts a
                      INNER JOIN ep_users u ON u.id = a.user_id
                      LEFT JOIN ep_paper_templates t ON t.id = a.template_id
                      LEFT JOIN ep_question_sets qs ON qs.id = a.question_set_id
                      LEFT JOIN ep_exam_categories c ON c.id = COALESCE(t.category_id, qs.category_id)
                      LEFT JOIN ep_exam_results r ON r.attempt_id = a.id";

        $countStmt = ep_db()->prepare('SELECT COUNT(*) AS total' . $baseFrom . $built['where']);
        if ($built['types'] !== '') {
            $countParams = $built['params'];
            ep_bind_dynamic_params($countStmt, $built['types'], $countParams);
        }
        $countStmt->execute();
        $countRow = $countStmt->get_result()->fetch_assoc();
        $countStmt->close();
        $total = (int) ($countRow['total'] ?? 0);

        $limit = max(1, min(5000, $limit));
        $offset = max(0, $offset);

        $sql = "SELECT
                    a.id,
                    a.status,
                    a.started_at,
                    a.submitted_at,
                    a.last_saved_at,
                    a.resume_count,
                    a.no_refresh_violations,
                    a.score_obtained,
                    a.max_score,
                    a.percentage,
                    u.name AS user_name,
                    u.email AS user_email,
                    COALESCE(c.name, 'General') AS category_name,
                    COALESCE(t.title, qs.title, CONCAT('Attempt #', a.id)) AS paper_title,
                    COALESCE(t.subject_name, qs.subject, 'General') AS subject_name,
                    COALESCE(t.exam_year, qs.exam_year, '') AS exam_year,
                    r.rank_label
                " . $baseFrom . $built['where'] . "
                ORDER BY COALESCE(a.submitted_at, a.last_saved_at, a.started_at) DESC, a.id DESC
                LIMIT ? OFFSET ?";

        $stmt = ep_db()->prepare($sql);
        $runTypes = $built['types'] . 'ii';
        $runParams = $built['params'];
        $runParams[] = $limit;
        $runParams[] = $offset;
        ep_bind_dynamic_params($stmt, $runTypes, $runParams);
        $stmt->execute();
        $items = $stmt->get_result()->fetch_all(MYSQLI_ASSOC);
        $stmt->close();

        return [
            'items' => $items,
            'total' => $total,
            'limit' => $limit,
            'offset' => $offset,
        ];
    }
}

if (!function_exists('ep_admin_reports_top_users')) {
    function ep_admin_reports_top_users(array $filters = [], int $limit = 10): array
    {
        $built = ep_admin_reports_where_clause($filters, 'a', true);
        $limit = max(1, min(50, $limit));

        $sql = "SELECT
                    u.id AS user_id,
                    u.name AS user_name,
                    u.email AS user_email,
                    COUNT(*) AS attempts_total,
                    SUM(CASE WHEN a.status = 'evaluated' THEN 1 ELSE 0 END) AS evaluated_total,
                    COALESCE(AVG(r.percentage), 0) AS avg_percentage,
                    COALESCE(MAX(r.percentage), 0) AS best_percentage,
                    COALESCE(SUM(a.no_refresh_violations), 0) AS refresh_violations_total
                FROM ep_exam_attempts a
                INNER JOIN ep_users u ON u.id = a.user_id
                LEFT JOIN ep_paper_templates t ON t.id = a.template_id
                LEFT JOIN ep_question_sets qs ON qs.id = a.question_set_id
                LEFT JOIN ep_exam_results r ON r.attempt_id = a.id
                " . $built['where'] . "
                GROUP BY u.id
                ORDER BY avg_percentage DESC, attempts_total DESC, u.id ASC
                LIMIT ?";

        $stmt = ep_db()->prepare($sql);
        $runTypes = $built['types'] . 'i';
        $runParams = $built['params'];
        $runParams[] = $limit;
        ep_bind_dynamic_params($stmt, $runTypes, $runParams);
        $stmt->execute();
        $rows = $stmt->get_result()->fetch_all(MYSQLI_ASSOC);
        $stmt->close();

        return $rows;
    }
}

if (!function_exists('ep_admin_reports_category_breakdown')) {
    function ep_admin_reports_category_breakdown(array $filters = [], int $limit = 10): array
    {
        $built = ep_admin_reports_where_clause($filters, 'a', false);
        $limit = max(1, min(50, $limit));

        $sql = "SELECT
                    COALESCE(c.name, 'General') AS category_name,
                    COUNT(*) AS attempts_total,
                    SUM(CASE WHEN a.status = 'evaluated' THEN 1 ELSE 0 END) AS evaluated_total,
                    SUM(CASE WHEN a.status = 'auto_submitted' THEN 1 ELSE 0 END) AS auto_submitted_total,
                    COALESCE(AVG(r.percentage), 0) AS avg_percentage
                FROM ep_exam_attempts a
                INNER JOIN ep_users u ON u.id = a.user_id
                LEFT JOIN ep_paper_templates t ON t.id = a.template_id
                LEFT JOIN ep_question_sets qs ON qs.id = a.question_set_id
                LEFT JOIN ep_exam_categories c ON c.id = COALESCE(t.category_id, qs.category_id)
                LEFT JOIN ep_exam_results r ON r.attempt_id = a.id
                " . $built['where'] . "
                GROUP BY COALESCE(c.id, 0), COALESCE(c.name, 'General')
                ORDER BY attempts_total DESC, category_name ASC
                LIMIT ?";

        $stmt = ep_db()->prepare($sql);
        $runTypes = $built['types'] . 'i';
        $runParams = $built['params'];
        $runParams[] = $limit;
        ep_bind_dynamic_params($stmt, $runTypes, $runParams);
        $stmt->execute();
        $rows = $stmt->get_result()->fetch_all(MYSQLI_ASSOC);
        $stmt->close();

        return $rows;
    }
}

if (!function_exists('ep_admin_reports_policy_events')) {
    function ep_admin_reports_policy_events(array $filters = [], int $limit = 20): array
    {
        $built = ep_admin_reports_where_clause($filters, 'a', true);
        $limit = max(1, min(200, $limit));

        $sql = "SELECT
                    e.id,
                    e.event_type,
                    e.created_at,
                    e.event_payload_json,
                    a.id AS attempt_id,
                    a.status AS attempt_status,
                    u.name AS user_name,
                    u.email AS user_email,
                    COALESCE(c.name, 'General') AS category_name,
                    COALESCE(t.title, qs.title, CONCAT('Attempt #', a.id)) AS paper_title
                FROM ep_exam_attempt_events e
                INNER JOIN ep_exam_attempts a ON a.id = e.attempt_id
                INNER JOIN ep_users u ON u.id = a.user_id
                LEFT JOIN ep_paper_templates t ON t.id = a.template_id
                LEFT JOIN ep_question_sets qs ON qs.id = a.question_set_id
                LEFT JOIN ep_exam_categories c ON c.id = COALESCE(t.category_id, qs.category_id)
                " . $built['where'] . "
                " . ($built['where'] === '' ? ' WHERE ' : ' AND ') . "e.event_type IN ('refresh_detected','submit_auto','timeout')
                ORDER BY e.created_at DESC, e.id DESC
                LIMIT ?";

        $stmt = ep_db()->prepare($sql);
        $runTypes = $built['types'] . 'i';
        $runParams = $built['params'];
        $runParams[] = $limit;
        ep_bind_dynamic_params($stmt, $runTypes, $runParams);
        $stmt->execute();
        $rows = $stmt->get_result()->fetch_all(MYSQLI_ASSOC);
        $stmt->close();

        return $rows;
    }
}

if (!function_exists('ep_admin_stats')) {
    function ep_admin_stats(): array
    {
        $stats = [
            'users_total' => 0,
            'subscriptions_active' => 0,
            'question_sets_total' => 0,
            'question_bank_total' => 0,
            'question_bank_active' => 0,
            'paper_templates_total' => 0,
            'paper_templates_published' => 0,
            'exam_results_total' => 0,
            'progress_rows_total' => 0,
        ];

        $users = ep_db()->query('SELECT COUNT(*) AS total FROM ep_users')->fetch_assoc();
        $active = ep_db()->query("SELECT COUNT(*) AS total FROM ep_user_subscriptions WHERE status = 'active' AND expires_at > UTC_TIMESTAMP()")->fetch_assoc();
        $sets = ep_db()->query('SELECT COUNT(*) AS total FROM ep_question_sets WHERE is_active = 1')->fetch_assoc();
        $questions = ep_db()->query('SELECT COUNT(*) AS total FROM ep_questions')->fetch_assoc();
        $questionsActive = ep_db()->query('SELECT COUNT(*) AS total FROM ep_questions WHERE is_active = 1')->fetch_assoc();
        $templates = ep_db()->query('SELECT COUNT(*) AS total FROM ep_paper_templates')->fetch_assoc();
        $templatesPublished = ep_db()->query("SELECT COUNT(*) AS total FROM ep_paper_templates WHERE published_status = 'published' AND is_active = 1")->fetch_assoc();
        $resultsTotal = ep_db()->query('SELECT COUNT(*) AS total FROM ep_exam_results')->fetch_assoc();
        $progressRowsTotal = ep_db()->query('SELECT COUNT(*) AS total FROM ep_user_progress')->fetch_assoc();

        $stats['users_total'] = (int) ($users['total'] ?? 0);
        $stats['subscriptions_active'] = (int) ($active['total'] ?? 0);
        $stats['question_sets_total'] = (int) ($sets['total'] ?? 0);
        $stats['question_bank_total'] = (int) ($questions['total'] ?? 0);
        $stats['question_bank_active'] = (int) ($questionsActive['total'] ?? 0);
        $stats['paper_templates_total'] = (int) ($templates['total'] ?? 0);
        $stats['paper_templates_published'] = (int) ($templatesPublished['total'] ?? 0);
        $stats['exam_results_total'] = (int) ($resultsTotal['total'] ?? 0);
        $stats['progress_rows_total'] = (int) ($progressRowsTotal['total'] ?? 0);

        return $stats;
    }
}

if (!function_exists('ep_admin_parse_datetime_input')) {
    function ep_admin_parse_datetime_input(?string $value): ?string
    {
        if (!is_string($value)) {
            return null;
        }

        $trimmed = trim($value);
        if ($trimmed === '') {
            return null;
        }

        $normalized = str_replace('T', ' ', $trimmed);
        if (strlen($normalized) === 16) {
            $normalized .= ':00';
        }

        $timestamp = strtotime($normalized . ' UTC');
        if ($timestamp === false) {
            $timestamp = strtotime($normalized);
        }
        if ($timestamp === false) {
            return null;
        }

        return gmdate('Y-m-d H:i:s', $timestamp);
    }
}

if (!function_exists('ep_admin_subscription_stats')) {
    function ep_admin_subscription_stats(): array
    {
        $stats = [
            'plans_total' => 0,
            'plans_active' => 0,
            'subscriptions_total' => 0,
            'subscriptions_active' => 0,
            'subscriptions_expired' => 0,
            'subscriptions_cancelled' => 0,
            'subscriptions_pending' => 0,
            'papers_used_total' => 0,
        ];

        $plan = ep_db()->query(
            'SELECT
                COUNT(*) AS plans_total,
                SUM(CASE WHEN is_active = 1 THEN 1 ELSE 0 END) AS plans_active
             FROM ep_subscription_plans'
        )->fetch_assoc();
        $sub = ep_db()->query(
            "SELECT
                COUNT(*) AS subscriptions_total,
                SUM(CASE WHEN status = 'active' AND expires_at > UTC_TIMESTAMP() THEN 1 ELSE 0 END) AS subscriptions_active,
                SUM(CASE WHEN status = 'expired' OR (status = 'active' AND expires_at <= UTC_TIMESTAMP()) THEN 1 ELSE 0 END) AS subscriptions_expired,
                SUM(CASE WHEN status = 'cancelled' THEN 1 ELSE 0 END) AS subscriptions_cancelled,
                SUM(CASE WHEN status = 'pending' THEN 1 ELSE 0 END) AS subscriptions_pending,
                SUM(COALESCE(papers_used, 0)) AS papers_used_total
             FROM ep_user_subscriptions"
        )->fetch_assoc();

        $stats['plans_total'] = (int) ($plan['plans_total'] ?? 0);
        $stats['plans_active'] = (int) ($plan['plans_active'] ?? 0);
        $stats['subscriptions_total'] = (int) ($sub['subscriptions_total'] ?? 0);
        $stats['subscriptions_active'] = (int) ($sub['subscriptions_active'] ?? 0);
        $stats['subscriptions_expired'] = (int) ($sub['subscriptions_expired'] ?? 0);
        $stats['subscriptions_cancelled'] = (int) ($sub['subscriptions_cancelled'] ?? 0);
        $stats['subscriptions_pending'] = (int) ($sub['subscriptions_pending'] ?? 0);
        $stats['papers_used_total'] = (int) ($sub['papers_used_total'] ?? 0);

        return $stats;
    }
}

if (!function_exists('ep_admin_get_subscription_plan')) {
    function ep_admin_get_subscription_plan(int $planId): ?array
    {
        $stmt = ep_db()->prepare(
            'SELECT id, name, slug, description, max_papers_per_cycle, duration_days, price_aud, is_active, created_at
             FROM ep_subscription_plans
             WHERE id = ?
             LIMIT 1'
        );
        $stmt->bind_param('i', $planId);
        $stmt->execute();
        $row = $stmt->get_result()->fetch_assoc();
        $stmt->close();

        return $row ?: null;
    }
}

if (!function_exists('ep_admin_get_subscription_plans')) {
    function ep_admin_get_subscription_plans(bool $includeInactive = true): array
    {
        $sql = 'SELECT
                    p.id,
                    p.name,
                    p.slug,
                    p.description,
                    p.max_papers_per_cycle,
                    p.duration_days,
                    p.price_aud,
                    p.is_active,
                    p.created_at,
                    COUNT(s.id) AS subscriptions_total,
                    SUM(CASE WHEN s.status = \'active\' AND s.expires_at > UTC_TIMESTAMP() THEN 1 ELSE 0 END) AS active_subscriptions
                FROM ep_subscription_plans p
                LEFT JOIN ep_user_subscriptions s ON s.plan_id = p.id';

        if (!$includeInactive) {
            $sql .= ' WHERE p.is_active = 1';
        }

        $sql .= ' GROUP BY p.id
                  ORDER BY p.is_active DESC, p.price_aud ASC, p.duration_days ASC, p.name ASC';

        $result = ep_db()->query($sql);
        return $result->fetch_all(MYSQLI_ASSOC);
    }
}

if (!function_exists('ep_admin_save_subscription_plan')) {
    function ep_admin_save_subscription_plan(array $payload): array
    {
        $planId = (int) ($payload['id'] ?? 0);
        $name = trim((string) ($payload['name'] ?? ''));
        $slugInput = trim((string) ($payload['slug'] ?? ''));
        $descriptionRaw = trim((string) ($payload['description'] ?? ''));
        $maxPapers = (int) ($payload['max_papers_per_cycle'] ?? 0);
        $durationDays = (int) ($payload['duration_days'] ?? 0);
        $priceRaw = trim((string) ($payload['price_aud'] ?? '0'));
        $isActive = (int) ($payload['is_active'] ?? 0) === 1 ? 1 : 0;

        if (mb_strlen($name) < 3) {
            return ['ok' => false, 'message' => 'Plan name should be at least 3 characters.'];
        }

        $slug = ep_slugify($slugInput !== '' ? $slugInput : $name);
        if ($slug === '') {
            return ['ok' => false, 'message' => 'Plan slug is required.'];
        }

        if ($maxPapers < 1 || $maxPapers > 100000) {
            return ['ok' => false, 'message' => 'Max papers should be between 1 and 100000.'];
        }

        if ($durationDays < 1 || $durationDays > 3650) {
            return ['ok' => false, 'message' => 'Duration days should be between 1 and 3650.'];
        }

        if ($priceRaw === '' || !is_numeric($priceRaw)) {
            return ['ok' => false, 'message' => 'Price must be a valid number.'];
        }

        $price = (float) $priceRaw;
        if ($price < 0 || $price > 1000000) {
            return ['ok' => false, 'message' => 'Price must be between 0 and 1000000.'];
        }

        if ($planId > 0) {
            $uniqueStmt = ep_db()->prepare('SELECT id FROM ep_subscription_plans WHERE slug = ? AND id <> ? LIMIT 1');
            $uniqueStmt->bind_param('si', $slug, $planId);
        } else {
            $uniqueStmt = ep_db()->prepare('SELECT id FROM ep_subscription_plans WHERE slug = ? LIMIT 1');
            $uniqueStmt->bind_param('s', $slug);
        }
        $uniqueStmt->execute();
        $existing = $uniqueStmt->get_result()->fetch_assoc();
        $uniqueStmt->close();

        if ($existing) {
            return ['ok' => false, 'message' => 'Another plan with the same slug already exists.'];
        }

        $description = $descriptionRaw !== '' ? $descriptionRaw : null;

        if ($planId > 0) {
            $stmt = ep_db()->prepare(
                'UPDATE ep_subscription_plans
                 SET name = ?, slug = ?, description = ?, max_papers_per_cycle = ?, duration_days = ?, price_aud = ?, is_active = ?
                 WHERE id = ?'
            );
            $stmt->bind_param('sssiidii', $name, $slug, $description, $maxPapers, $durationDays, $price, $isActive, $planId);
            $stmt->execute();
            $stmt->close();

            return ['ok' => true, 'message' => 'Plan updated.', 'plan_id' => $planId];
        }

        $stmt = ep_db()->prepare(
            'INSERT INTO ep_subscription_plans (
                name,
                slug,
                description,
                max_papers_per_cycle,
                duration_days,
                price_aud,
                is_active
             ) VALUES (?, ?, ?, ?, ?, ?, ?)'
        );
        $stmt->bind_param('sssiidi', $name, $slug, $description, $maxPapers, $durationDays, $price, $isActive);
        $stmt->execute();
        $newId = (int) ep_db()->insert_id;
        $stmt->close();

        return ['ok' => true, 'message' => 'Plan created.', 'plan_id' => $newId];
    }
}

if (!function_exists('ep_admin_set_subscription_plan_active_status')) {
    function ep_admin_set_subscription_plan_active_status(int $planId, bool $isActive): array
    {
        if ($planId <= 0) {
            return ['ok' => false, 'message' => 'Plan id is required.'];
        }

        $status = $isActive ? 1 : 0;
        $stmt = ep_db()->prepare('UPDATE ep_subscription_plans SET is_active = ? WHERE id = ?');
        $stmt->bind_param('ii', $status, $planId);
        $stmt->execute();
        $affected = $stmt->affected_rows;
        $stmt->close();

        if ($affected <= 0) {
            return ['ok' => false, 'message' => 'No plan record updated.'];
        }

        return ['ok' => true, 'message' => $isActive ? 'Plan activated.' : 'Plan archived.'];
    }
}

if (!function_exists('ep_admin_find_user_by_email')) {
    function ep_admin_find_user_by_email(string $email): ?array
    {
        $email = strtolower(trim($email));
        if ($email === '' || !filter_var($email, FILTER_VALIDATE_EMAIL)) {
            return null;
        }

        $stmt = ep_db()->prepare(
            'SELECT id, name, email, role, is_active
             FROM ep_users
             WHERE email = ?
             LIMIT 1'
        );
        $stmt->bind_param('s', $email);
        $stmt->execute();
        $row = $stmt->get_result()->fetch_assoc();
        $stmt->close();

        return $row ?: null;
    }
}

if (!function_exists('ep_admin_get_user_options')) {
    function ep_admin_get_user_options(int $limit = 120): array
    {
        $limit = max(1, min(500, $limit));
        $stmt = ep_db()->prepare(
            'SELECT id, name, email, role
             FROM ep_users
             ORDER BY created_at DESC, id DESC
             LIMIT ?'
        );
        $stmt->bind_param('i', $limit);
        $stmt->execute();
        $rows = $stmt->get_result()->fetch_all(MYSQLI_ASSOC);
        $stmt->close();

        return $rows;
    }
}

if (!function_exists('ep_admin_get_subscription_records')) {
    function ep_admin_get_subscription_records(array $filters = [], int $limit = 30, int $offset = 0): array
    {
        if (function_exists('ep_mark_expired_subscriptions')) {
            ep_mark_expired_subscriptions();
        }

        $conditions = [];
        $types = '';
        $params = [];

        $search = trim((string) ($filters['search'] ?? ''));
        if ($search !== '') {
            $conditions[] = '(u.name LIKE ? OR u.email LIKE ? OR p.name LIKE ?)';
            $needle = '%' . $search . '%';
            $types .= 'sss';
            $params[] = $needle;
            $params[] = $needle;
            $params[] = $needle;
        }

        $status = trim((string) ($filters['status'] ?? 'all'));
        $allowedStatus = ['active', 'expired', 'cancelled', 'pending', 'all'];
        if (!in_array($status, $allowedStatus, true)) {
            $status = 'all';
        }
        if ($status !== 'all') {
            $conditions[] = 's.status = ?';
            $types .= 's';
            $params[] = $status;
        }

        $planId = (int) ($filters['plan_id'] ?? 0);
        if ($planId > 0) {
            $conditions[] = 's.plan_id = ?';
            $types .= 'i';
            $params[] = $planId;
        }

        $baseSql = ' FROM ep_user_subscriptions s
                     INNER JOIN ep_users u ON u.id = s.user_id
                     INNER JOIN ep_subscription_plans p ON p.id = s.plan_id';

        if ($conditions) {
            $baseSql .= ' WHERE ' . implode(' AND ', $conditions);
        }

        $countStmt = ep_db()->prepare('SELECT COUNT(*) AS total' . $baseSql);
        if ($types !== '') {
            $countParams = $params;
            ep_bind_dynamic_params($countStmt, $types, $countParams);
        }
        $countStmt->execute();
        $countRow = $countStmt->get_result()->fetch_assoc();
        $countStmt->close();
        $total = (int) ($countRow['total'] ?? 0);

        $limit = max(1, min(200, $limit));
        $offset = max(0, $offset);

        $sql = 'SELECT
                    s.id,
                    s.user_id,
                    s.plan_id,
                    s.status,
                    s.started_at,
                    s.expires_at,
                    s.papers_used,
                    s.created_at,
                    s.updated_at,
                    u.name AS user_name,
                    u.email AS user_email,
                    u.role AS user_role,
                    p.name AS plan_name,
                    p.slug AS plan_slug,
                    p.max_papers_per_cycle,
                    p.duration_days,
                    p.price_aud,
                    GREATEST(p.max_papers_per_cycle - s.papers_used, 0) AS remaining_papers
                ' . $baseSql . '
                ORDER BY COALESCE(s.started_at, s.created_at) DESC, s.id DESC
                LIMIT ? OFFSET ?';
        $stmt = ep_db()->prepare($sql);
        $runTypes = $types . 'ii';
        $runParams = $params;
        $runParams[] = $limit;
        $runParams[] = $offset;
        ep_bind_dynamic_params($stmt, $runTypes, $runParams);
        $stmt->execute();
        $rows = $stmt->get_result()->fetch_all(MYSQLI_ASSOC);
        $stmt->close();

        return ['rows' => $rows, 'total' => $total];
    }
}

if (!function_exists('ep_admin_assign_subscription')) {
    function ep_admin_assign_subscription(int $adminUserId, array $payload): array
    {
        $userId = (int) ($payload['user_id'] ?? 0);
        $userEmail = trim((string) ($payload['user_email'] ?? ''));
        $planId = (int) ($payload['plan_id'] ?? 0);
        $status = trim((string) ($payload['status'] ?? 'active'));
        $durationDaysInput = (int) ($payload['duration_days'] ?? 0);
        $papersUsed = (int) ($payload['papers_used'] ?? 0);
        $noteInput = trim((string) ($payload['note'] ?? ''));

        if ($userId <= 0 && $userEmail === '') {
            return ['ok' => false, 'message' => 'Choose a user or provide user email.'];
        }

        if ($userId <= 0 && $userEmail !== '') {
            $userByEmail = ep_admin_find_user_by_email($userEmail);
            if (!$userByEmail) {
                return ['ok' => false, 'message' => 'User email not found.'];
            }
            $userId = (int) $userByEmail['id'];
        }

        $statusAllowed = ['active', 'pending', 'cancelled', 'expired'];
        if (!in_array($status, $statusAllowed, true)) {
            $status = 'active';
        }

        if ($papersUsed < 0) {
            return ['ok' => false, 'message' => 'Papers used cannot be negative.'];
        }

        $userStmt = ep_db()->prepare('SELECT id, is_active FROM ep_users WHERE id = ? LIMIT 1');
        $userStmt->bind_param('i', $userId);
        $userStmt->execute();
        $userRow = $userStmt->get_result()->fetch_assoc();
        $userStmt->close();
        if (!$userRow || (int) ($userRow['is_active'] ?? 0) !== 1) {
            return ['ok' => false, 'message' => 'Selected user is not active.'];
        }

        $planStmt = ep_db()->prepare(
            'SELECT id, duration_days, max_papers_per_cycle
             FROM ep_subscription_plans
             WHERE id = ?
             LIMIT 1'
        );
        $planStmt->bind_param('i', $planId);
        $planStmt->execute();
        $planRow = $planStmt->get_result()->fetch_assoc();
        $planStmt->close();
        if (!$planRow) {
            return ['ok' => false, 'message' => 'Plan not found.'];
        }

        $maxPapers = max(1, (int) ($planRow['max_papers_per_cycle'] ?? 1));
        if ($papersUsed > $maxPapers) {
            return ['ok' => false, 'message' => 'Papers used cannot exceed plan quota.'];
        }

        $startedAt = ep_admin_parse_datetime_input((string) ($payload['started_at'] ?? '')) ?? gmdate('Y-m-d H:i:s');
        $expiresAt = ep_admin_parse_datetime_input((string) ($payload['expires_at'] ?? ''));
        if ($expiresAt === null) {
            $durationDays = $durationDaysInput > 0 ? $durationDaysInput : max(1, (int) ($planRow['duration_days'] ?? 30));
            $startTs = strtotime($startedAt . ' UTC');
            if ($startTs === false) {
                $startTs = time();
            }
            $expiresAt = gmdate('Y-m-d H:i:s', $startTs + ($durationDays * 86400));
        }

        if ($status === 'active' && strcmp($expiresAt, $startedAt) <= 0) {
            return ['ok' => false, 'message' => 'Expiry must be after start for active subscriptions.'];
        }

        $note = $noteInput !== '' ? $noteInput : 'Admin assignment';

        ep_db()->begin_transaction();
        try {
            if ($status === 'active') {
                $cancelled = 'cancelled';
                $closeOld = ep_db()->prepare("UPDATE ep_user_subscriptions SET status = ? WHERE user_id = ? AND status = 'active'");
                $closeOld->bind_param('si', $cancelled, $userId);
                $closeOld->execute();
                $closeOld->close();
            }

            $insert = ep_db()->prepare(
                'INSERT INTO ep_user_subscriptions (user_id, plan_id, status, started_at, expires_at, papers_used)
                 VALUES (?, ?, ?, ?, ?, ?)'
            );
            $insert->bind_param('iisssi', $userId, $planId, $status, $startedAt, $expiresAt, $papersUsed);
            $insert->execute();
            $subscriptionId = (int) ep_db()->insert_id;
            $insert->close();

            if ($papersUsed !== 0) {
                $eventType = 'manual_adjustment';
                $delta = $papersUsed;
                $usage = ep_db()->prepare(
                    'INSERT INTO ep_subscription_usage_events (subscription_id, user_id, attempt_id, event_type, papers_delta, note)
                     VALUES (?, ?, NULL, ?, ?, ?)'
                );
                $usage->bind_param('iisis', $subscriptionId, $userId, $eventType, $delta, $note);
                $usage->execute();
                $usage->close();
            }

            ep_db()->commit();
        } catch (Throwable $exception) {
            ep_db()->rollback();
            return ['ok' => false, 'message' => 'Unable to assign subscription. ' . $exception->getMessage()];
        }

        return ['ok' => true, 'message' => 'Subscription assigned.', 'subscription_id' => $subscriptionId];
    }
}

if (!function_exists('ep_admin_update_subscription')) {
    function ep_admin_update_subscription(int $adminUserId, array $payload): array
    {
        $subscriptionId = (int) ($payload['subscription_id'] ?? 0);
        $status = trim((string) ($payload['status'] ?? 'pending'));
        $papersUsed = (int) ($payload['papers_used'] ?? 0);
        $noteInput = trim((string) ($payload['note'] ?? ''));

        if ($subscriptionId <= 0) {
            return ['ok' => false, 'message' => 'Subscription id is required.'];
        }

        if ($papersUsed < 0) {
            return ['ok' => false, 'message' => 'Papers used cannot be negative.'];
        }

        $statusAllowed = ['active', 'expired', 'cancelled', 'pending'];
        if (!in_array($status, $statusAllowed, true)) {
            return ['ok' => false, 'message' => 'Invalid status value.'];
        }

        ep_db()->begin_transaction();
        try {
            $rowStmt = ep_db()->prepare(
                'SELECT
                    s.id,
                    s.user_id,
                    s.plan_id,
                    s.papers_used,
                    s.started_at,
                    s.expires_at,
                    p.max_papers_per_cycle
                 FROM ep_user_subscriptions s
                 INNER JOIN ep_subscription_plans p ON p.id = s.plan_id
                 WHERE s.id = ?
                 LIMIT 1
                 FOR UPDATE'
            );
            $rowStmt->bind_param('i', $subscriptionId);
            $rowStmt->execute();
            $row = $rowStmt->get_result()->fetch_assoc();
            $rowStmt->close();

            if (!$row) {
                ep_db()->rollback();
                return ['ok' => false, 'message' => 'Subscription record not found.'];
            }

            $maxPapers = max(1, (int) ($row['max_papers_per_cycle'] ?? 1));
            if ($papersUsed > $maxPapers) {
                ep_db()->rollback();
                return ['ok' => false, 'message' => 'Papers used cannot exceed plan quota.'];
            }

            $startedAt = ep_admin_parse_datetime_input((string) ($payload['started_at'] ?? '')) ?? (string) ($row['started_at'] ?? gmdate('Y-m-d H:i:s'));
            $expiresAt = ep_admin_parse_datetime_input((string) ($payload['expires_at'] ?? '')) ?? (string) ($row['expires_at'] ?? gmdate('Y-m-d H:i:s'));

            if ($status === 'active' && strcmp($expiresAt, $startedAt) <= 0) {
                ep_db()->rollback();
                return ['ok' => false, 'message' => 'Expiry must be after start for active subscriptions.'];
            }

            $userId = (int) ($row['user_id'] ?? 0);

            if ($status === 'active') {
                $cancelled = 'cancelled';
                $closeOld = ep_db()->prepare(
                    "UPDATE ep_user_subscriptions
                     SET status = ?
                     WHERE user_id = ?
                       AND id <> ?
                       AND status = 'active'"
                );
                $closeOld->bind_param('sii', $cancelled, $userId, $subscriptionId);
                $closeOld->execute();
                $closeOld->close();
            }

            $updateStmt = ep_db()->prepare(
                'UPDATE ep_user_subscriptions
                 SET status = ?, papers_used = ?, started_at = ?, expires_at = ?
                 WHERE id = ?'
            );
            $updateStmt->bind_param('sissi', $status, $papersUsed, $startedAt, $expiresAt, $subscriptionId);
            $updateStmt->execute();
            $updateStmt->close();

            $oldPapers = (int) ($row['papers_used'] ?? 0);
            $delta = $papersUsed - $oldPapers;
            if ($delta !== 0) {
                $eventType = 'manual_adjustment';
                $note = $noteInput !== '' ? $noteInput : 'Admin quota adjustment';
                $usage = ep_db()->prepare(
                    'INSERT INTO ep_subscription_usage_events (subscription_id, user_id, attempt_id, event_type, papers_delta, note)
                     VALUES (?, ?, NULL, ?, ?, ?)'
                );
                $usage->bind_param('iisis', $subscriptionId, $userId, $eventType, $delta, $note);
                $usage->execute();
                $usage->close();
            }

            ep_db()->commit();
        } catch (Throwable $exception) {
            ep_db()->rollback();
            return ['ok' => false, 'message' => 'Unable to update subscription. ' . $exception->getMessage()];
        }

        return ['ok' => true, 'message' => 'Subscription updated.'];
    }
}

if (!function_exists('ep_admin_get_subscription_usage_feed')) {
    function ep_admin_get_subscription_usage_feed(array $filters = [], int $limit = 30): array
    {
        $conditions = [];
        $types = '';
        $params = [];

        $search = trim((string) ($filters['search'] ?? ''));
        if ($search !== '') {
            $conditions[] = '(u.name LIKE ? OR u.email LIKE ? OR p.name LIKE ?)';
            $needle = '%' . $search . '%';
            $types .= 'sss';
            $params[] = $needle;
            $params[] = $needle;
            $params[] = $needle;
        }

        $eventType = trim((string) ($filters['event_type'] ?? 'all'));
        $allowed = ['all', 'paper_started', 'paper_submitted', 'paper_cancelled', 'manual_adjustment'];
        if (!in_array($eventType, $allowed, true)) {
            $eventType = 'all';
        }
        if ($eventType !== 'all') {
            $conditions[] = 'e.event_type = ?';
            $types .= 's';
            $params[] = $eventType;
        }

        $sql = 'SELECT
                    e.id,
                    e.subscription_id,
                    e.user_id,
                    e.attempt_id,
                    e.event_type,
                    e.papers_delta,
                    e.note,
                    e.created_at,
                    u.name AS user_name,
                    u.email AS user_email,
                    p.name AS plan_name
                FROM ep_subscription_usage_events e
                INNER JOIN ep_users u ON u.id = e.user_id
                INNER JOIN ep_user_subscriptions s ON s.id = e.subscription_id
                INNER JOIN ep_subscription_plans p ON p.id = s.plan_id';
        if ($conditions) {
            $sql .= ' WHERE ' . implode(' AND ', $conditions);
        }
        $sql .= ' ORDER BY e.created_at DESC, e.id DESC LIMIT ?';

        $limit = max(1, min(200, $limit));
        $stmt = ep_db()->prepare($sql);
        $runTypes = $types . 'i';
        $runParams = $params;
        $runParams[] = $limit;
        ep_bind_dynamic_params($stmt, $runTypes, $runParams);
        $stmt->execute();
        $rows = $stmt->get_result()->fetch_all(MYSQLI_ASSOC);
        $stmt->close();

        return $rows;
    }
}

if (!function_exists('ep_admin_user_directory_stats')) {
    function ep_admin_user_directory_stats(): array
    {
        if (function_exists('ep_mark_expired_subscriptions')) {
            ep_mark_expired_subscriptions();
        }

        $stats = [
            'users_total' => 0,
            'users_active' => 0,
            'users_inactive' => 0,
            'admins_total' => 0,
            'learners_total' => 0,
            'with_active_subscription' => 0,
            'recent_logins_7d' => 0,
        ];

        $row = ep_db()->query(
            "SELECT
                COUNT(*) AS users_total,
                SUM(CASE WHEN is_active = 1 THEN 1 ELSE 0 END) AS users_active,
                SUM(CASE WHEN is_active = 0 THEN 1 ELSE 0 END) AS users_inactive,
                SUM(CASE WHEN role = 'admin' THEN 1 ELSE 0 END) AS admins_total,
                SUM(CASE WHEN role = 'user' THEN 1 ELSE 0 END) AS learners_total,
                SUM(CASE WHEN last_login_at IS NOT NULL AND last_login_at >= (UTC_TIMESTAMP() - INTERVAL 7 DAY) THEN 1 ELSE 0 END) AS recent_logins_7d
             FROM ep_users"
        )->fetch_assoc();
        $activeSub = ep_db()->query(
            "SELECT COUNT(DISTINCT user_id) AS total
             FROM ep_user_subscriptions
             WHERE status = 'active'
               AND expires_at > UTC_TIMESTAMP()"
        )->fetch_assoc();

        $stats['users_total'] = (int) ($row['users_total'] ?? 0);
        $stats['users_active'] = (int) ($row['users_active'] ?? 0);
        $stats['users_inactive'] = (int) ($row['users_inactive'] ?? 0);
        $stats['admins_total'] = (int) ($row['admins_total'] ?? 0);
        $stats['learners_total'] = (int) ($row['learners_total'] ?? 0);
        $stats['recent_logins_7d'] = (int) ($row['recent_logins_7d'] ?? 0);
        $stats['with_active_subscription'] = (int) ($activeSub['total'] ?? 0);

        return $stats;
    }
}

if (!function_exists('ep_admin_get_user_directory')) {
    function ep_admin_get_user_directory(array $filters = [], int $limit = 20, int $offset = 0): array
    {
        if (function_exists('ep_mark_expired_subscriptions')) {
            ep_mark_expired_subscriptions();
        }

        $conditions = [];
        $types = '';
        $params = [];

        $search = trim((string) ($filters['search'] ?? ''));
        if ($search !== '') {
            $conditions[] = '(u.name LIKE ? OR u.email LIKE ?)';
            $needle = '%' . $search . '%';
            $types .= 'ss';
            $params[] = $needle;
            $params[] = $needle;
        }

        $role = trim((string) ($filters['role'] ?? 'all'));
        if (!in_array($role, ['all', 'user', 'admin'], true)) {
            $role = 'all';
        }
        if ($role !== 'all') {
            $conditions[] = 'u.role = ?';
            $types .= 's';
            $params[] = $role;
        }

        $status = trim((string) ($filters['status'] ?? 'all'));
        if (!in_array($status, ['all', 'active', 'inactive'], true)) {
            $status = 'all';
        }
        if ($status === 'active') {
            $conditions[] = 'u.is_active = 1';
        } elseif ($status === 'inactive') {
            $conditions[] = 'u.is_active = 0';
        }

        $subscription = trim((string) ($filters['subscription'] ?? 'all'));
        if (!in_array($subscription, ['all', 'with_active', 'without_active'], true)) {
            $subscription = 'all';
        }
        if ($subscription === 'with_active') {
            $conditions[] = "EXISTS (
                SELECT 1
                FROM ep_user_subscriptions sx
                WHERE sx.user_id = u.id
                  AND sx.status = 'active'
                  AND sx.expires_at > UTC_TIMESTAMP()
            )";
        } elseif ($subscription === 'without_active') {
            $conditions[] = "NOT EXISTS (
                SELECT 1
                FROM ep_user_subscriptions sx
                WHERE sx.user_id = u.id
                  AND sx.status = 'active'
                  AND sx.expires_at > UTC_TIMESTAMP()
            )";
        }

        $baseSql = ' FROM ep_users u';
        if ($conditions) {
            $baseSql .= ' WHERE ' . implode(' AND ', $conditions);
        }

        $countStmt = ep_db()->prepare('SELECT COUNT(*) AS total' . $baseSql);
        if ($types !== '') {
            $countParams = $params;
            ep_bind_dynamic_params($countStmt, $types, $countParams);
        }
        $countStmt->execute();
        $countRow = $countStmt->get_result()->fetch_assoc();
        $countStmt->close();
        $total = (int) ($countRow['total'] ?? 0);

        $limit = max(1, min(200, $limit));
        $offset = max(0, $offset);

        $sql = "SELECT
                    u.id,
                    u.name,
                    u.email,
                    u.role,
                    u.is_active,
                    u.created_at,
                    u.last_login_at,
                    (
                        SELECT COUNT(*)
                        FROM ep_exam_attempts a
                        WHERE a.user_id = u.id
                    ) AS attempts_total,
                    (
                        SELECT COUNT(*)
                        FROM ep_exam_results r
                        WHERE r.user_id = u.id
                    ) AS results_total,
                    (
                        SELECT COALESCE(MAX(r.percentage), 0)
                        FROM ep_exam_results r
                        WHERE r.user_id = u.id
                    ) AS best_percentage,
                    (
                        SELECT p.name
                        FROM ep_user_subscriptions s
                        INNER JOIN ep_subscription_plans p ON p.id = s.plan_id
                        WHERE s.user_id = u.id
                          AND s.status = 'active'
                          AND s.expires_at > UTC_TIMESTAMP()
                        ORDER BY s.expires_at DESC, s.id DESC
                        LIMIT 1
                    ) AS active_plan_name,
                    (
                        SELECT s.expires_at
                        FROM ep_user_subscriptions s
                        WHERE s.user_id = u.id
                          AND s.status = 'active'
                          AND s.expires_at > UTC_TIMESTAMP()
                        ORDER BY s.expires_at DESC, s.id DESC
                        LIMIT 1
                    ) AS active_expires_at,
                    (
                        SELECT GREATEST(p.max_papers_per_cycle - s.papers_used, 0)
                        FROM ep_user_subscriptions s
                        INNER JOIN ep_subscription_plans p ON p.id = s.plan_id
                        WHERE s.user_id = u.id
                          AND s.status = 'active'
                          AND s.expires_at > UTC_TIMESTAMP()
                        ORDER BY s.expires_at DESC, s.id DESC
                        LIMIT 1
                    ) AS remaining_papers
                " . $baseSql . "
                ORDER BY u.created_at DESC, u.id DESC
                LIMIT ? OFFSET ?";

        $stmt = ep_db()->prepare($sql);
        $runTypes = $types . 'ii';
        $runParams = $params;
        $runParams[] = $limit;
        $runParams[] = $offset;
        ep_bind_dynamic_params($stmt, $runTypes, $runParams);
        $stmt->execute();
        $rows = $stmt->get_result()->fetch_all(MYSQLI_ASSOC);
        $stmt->close();

        return ['rows' => $rows, 'total' => $total];
    }
}

if (!function_exists('ep_admin_create_user_account')) {
    function ep_admin_create_user_account(array $payload): array
    {
        $name = trim((string) ($payload['name'] ?? ''));
        $email = strtolower(trim((string) ($payload['email'] ?? '')));
        $role = trim((string) ($payload['role'] ?? 'user'));
        $password = (string) ($payload['password'] ?? '');
        $isActive = !empty($payload['is_active']) ? 1 : 0;

        if (mb_strlen($name) < 2) {
            return ['ok' => false, 'message' => 'Name should be at least 2 characters.'];
        }
        if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
            return ['ok' => false, 'message' => 'Enter a valid email address.'];
        }
        if (!in_array($role, ['user', 'admin'], true)) {
            return ['ok' => false, 'message' => 'Invalid role value.'];
        }
        if (strlen($password) < 8) {
            return ['ok' => false, 'message' => 'Password should be at least 8 characters.'];
        }

        $check = ep_db()->prepare('SELECT id FROM ep_users WHERE email = ? LIMIT 1');
        $check->bind_param('s', $email);
        $check->execute();
        $existing = $check->get_result()->fetch_assoc();
        $check->close();
        if ($existing) {
            return ['ok' => false, 'message' => 'Email is already registered.'];
        }

        $hash = password_hash($password, PASSWORD_DEFAULT);
        $insert = ep_db()->prepare(
            'INSERT INTO ep_users (name, email, role, password_hash, is_active)
             VALUES (?, ?, ?, ?, ?)'
        );
        $insert->bind_param('ssssi', $name, $email, $role, $hash, $isActive);
        $insert->execute();
        $userId = (int) ep_db()->insert_id;
        $insert->close();

        return ['ok' => true, 'message' => 'User account created.', 'user_id' => $userId];
    }
}

if (!function_exists('ep_admin_update_user_account')) {
    function ep_admin_update_user_account(int $adminUserId, array $payload): array
    {
        $userId = (int) ($payload['user_id'] ?? 0);
        $name = trim((string) ($payload['name'] ?? ''));
        $role = trim((string) ($payload['role'] ?? 'user'));
        $isActive = (int) ($payload['is_active'] ?? 0) === 1 ? 1 : 0;

        if ($userId <= 0) {
            return ['ok' => false, 'message' => 'User id is required.'];
        }
        if (mb_strlen($name) < 2) {
            return ['ok' => false, 'message' => 'Name should be at least 2 characters.'];
        }
        if (!in_array($role, ['user', 'admin'], true)) {
            return ['ok' => false, 'message' => 'Invalid role value.'];
        }

        ep_db()->begin_transaction();
        try {
            $rowStmt = ep_db()->prepare(
                'SELECT id, role, is_active
                 FROM ep_users
                 WHERE id = ?
                 LIMIT 1
                 FOR UPDATE'
            );
            $rowStmt->bind_param('i', $userId);
            $rowStmt->execute();
            $current = $rowStmt->get_result()->fetch_assoc();
            $rowStmt->close();

            if (!$current) {
                ep_db()->rollback();
                return ['ok' => false, 'message' => 'User not found.'];
            }

            $currentRole = (string) ($current['role'] ?? 'user');
            $wasActive = (int) ($current['is_active'] ?? 0) === 1;

            if ($userId === $adminUserId && ($role !== 'admin' || $isActive !== 1)) {
                ep_db()->rollback();
                return ['ok' => false, 'message' => 'You cannot remove your own admin/active access.'];
            }

            if ($currentRole === 'admin' && $wasActive && ($role !== 'admin' || $isActive !== 1)) {
                $countRow = ep_db()->query(
                    "SELECT COUNT(*) AS total
                     FROM ep_users
                     WHERE role = 'admin'
                       AND is_active = 1"
                )->fetch_assoc();
                $activeAdmins = (int) ($countRow['total'] ?? 0);
                if ($activeAdmins <= 1) {
                    ep_db()->rollback();
                    return ['ok' => false, 'message' => 'At least one active admin account must remain.'];
                }
            }

            $update = ep_db()->prepare(
                'UPDATE ep_users
                 SET name = ?, role = ?, is_active = ?
                 WHERE id = ?'
            );
            $update->bind_param('ssii', $name, $role, $isActive, $userId);
            $update->execute();
            $update->close();

            ep_db()->commit();
        } catch (Throwable $exception) {
            ep_db()->rollback();
            return ['ok' => false, 'message' => 'Unable to update user. ' . $exception->getMessage()];
        }

        return ['ok' => true, 'message' => 'User account updated.'];
    }
}

if (!function_exists('ep_admin_reset_user_password')) {
    function ep_admin_reset_user_password(int $adminUserId, int $userId, string $newPassword): array
    {
        if ($userId <= 0) {
            return ['ok' => false, 'message' => 'User id is required.'];
        }
        if (strlen($newPassword) < 8) {
            return ['ok' => false, 'message' => 'Password should be at least 8 characters.'];
        }

        $check = ep_db()->prepare('SELECT id FROM ep_users WHERE id = ? LIMIT 1');
        $check->bind_param('i', $userId);
        $check->execute();
        $row = $check->get_result()->fetch_assoc();
        $check->close();
        if (!$row) {
            return ['ok' => false, 'message' => 'User not found.'];
        }

        $hash = password_hash($newPassword, PASSWORD_DEFAULT);
        $update = ep_db()->prepare('UPDATE ep_users SET password_hash = ? WHERE id = ?');
        $update->bind_param('si', $hash, $userId);
        $update->execute();
        $update->close();

        return ['ok' => true, 'message' => 'Password reset successfully.'];
    }
}

if (!function_exists('ep_admin_security_overview_stats')) {
    function ep_admin_security_overview_stats(): array
    {
        $stats = [
            'sessions_total' => 0,
            'sessions_active' => 0,
            'sessions_active_24h' => 0,
            'sessions_revoked' => 0,
            'users_with_active_sessions' => 0,
            'users_logged_in_24h' => 0,
        ];

        $sessionRow = ep_db()->query(
            "SELECT
                COUNT(*) AS sessions_total,
                SUM(CASE WHEN revoked_at IS NULL THEN 1 ELSE 0 END) AS sessions_active,
                SUM(CASE WHEN revoked_at IS NULL AND last_seen_at >= (UTC_TIMESTAMP() - INTERVAL 1 DAY) THEN 1 ELSE 0 END) AS sessions_active_24h,
                SUM(CASE WHEN revoked_at IS NOT NULL THEN 1 ELSE 0 END) AS sessions_revoked
             FROM ep_auth_sessions"
        )->fetch_assoc();

        $activeUsersRow = ep_db()->query(
            "SELECT COUNT(DISTINCT user_id) AS total
             FROM ep_auth_sessions
             WHERE revoked_at IS NULL"
        )->fetch_assoc();

        $loginUsersRow = ep_db()->query(
            "SELECT COUNT(*) AS total
             FROM ep_users
             WHERE last_login_at IS NOT NULL
               AND last_login_at >= (UTC_TIMESTAMP() - INTERVAL 1 DAY)"
        )->fetch_assoc();

        $stats['sessions_total'] = (int) ($sessionRow['sessions_total'] ?? 0);
        $stats['sessions_active'] = (int) ($sessionRow['sessions_active'] ?? 0);
        $stats['sessions_active_24h'] = (int) ($sessionRow['sessions_active_24h'] ?? 0);
        $stats['sessions_revoked'] = (int) ($sessionRow['sessions_revoked'] ?? 0);
        $stats['users_with_active_sessions'] = (int) ($activeUsersRow['total'] ?? 0);
        $stats['users_logged_in_24h'] = (int) ($loginUsersRow['total'] ?? 0);

        return $stats;
    }
}

if (!function_exists('ep_admin_get_auth_sessions')) {
    function ep_admin_get_auth_sessions(array $filters = [], int $limit = 20, int $offset = 0): array
    {
        $conditions = [];
        $types = '';
        $params = [];

        $search = trim((string) ($filters['search'] ?? ''));
        if ($search !== '') {
            $conditions[] = '(u.name LIKE ? OR u.email LIKE ? OR COALESCE(s.ip_address, \'\') LIKE ? OR COALESCE(s.user_agent, \'\') LIKE ?)';
            $needle = '%' . $search . '%';
            $types .= 'ssss';
            $params[] = $needle;
            $params[] = $needle;
            $params[] = $needle;
            $params[] = $needle;
        }

        $role = trim((string) ($filters['role'] ?? 'all'));
        if (!in_array($role, ['all', 'user', 'admin'], true)) {
            $role = 'all';
        }
        if ($role !== 'all') {
            $conditions[] = 'u.role = ?';
            $types .= 's';
            $params[] = $role;
        }

        $state = trim((string) ($filters['state'] ?? 'all'));
        if (!in_array($state, ['all', 'active', 'revoked', 'stale'], true)) {
            $state = 'all';
        }
        if ($state === 'active') {
            $conditions[] = 's.revoked_at IS NULL';
        } elseif ($state === 'revoked') {
            $conditions[] = 's.revoked_at IS NOT NULL';
        } elseif ($state === 'stale') {
            $conditions[] = 's.revoked_at IS NULL AND s.last_seen_at < (UTC_TIMESTAMP() - INTERVAL 30 DAY)';
        }

        $baseSql = ' FROM ep_auth_sessions s
                     INNER JOIN ep_users u ON u.id = s.user_id';
        if ($conditions) {
            $baseSql .= ' WHERE ' . implode(' AND ', $conditions);
        }

        $countStmt = ep_db()->prepare('SELECT COUNT(*) AS total' . $baseSql);
        if ($types !== '') {
            $countParams = $params;
            ep_bind_dynamic_params($countStmt, $types, $countParams);
        }
        $countStmt->execute();
        $countRow = $countStmt->get_result()->fetch_assoc();
        $countStmt->close();
        $total = (int) ($countRow['total'] ?? 0);

        $limit = max(1, min(200, $limit));
        $offset = max(0, $offset);

        $sql = 'SELECT
                    s.id,
                    s.user_id,
                    s.session_token,
                    s.ip_address,
                    s.user_agent,
                    s.last_seen_at,
                    s.created_at,
                    s.revoked_at,
                    u.name AS user_name,
                    u.email AS user_email,
                    u.role AS user_role,
                    u.is_active AS user_is_active
                ' . $baseSql . '
                ORDER BY (s.revoked_at IS NULL) DESC, s.last_seen_at DESC, s.id DESC
                LIMIT ? OFFSET ?';

        $stmt = ep_db()->prepare($sql);
        $runTypes = $types . 'ii';
        $runParams = $params;
        $runParams[] = $limit;
        $runParams[] = $offset;
        ep_bind_dynamic_params($stmt, $runTypes, $runParams);
        $stmt->execute();
        $rows = $stmt->get_result()->fetch_all(MYSQLI_ASSOC);
        $stmt->close();

        return ['rows' => $rows, 'total' => $total];
    }
}

if (!function_exists('ep_admin_security_multi_session_users')) {
    function ep_admin_security_multi_session_users(int $threshold = 3, int $limit = 10): array
    {
        $threshold = max(2, min(20, $threshold));
        $limit = max(1, min(100, $limit));

        $stmt = ep_db()->prepare(
            "SELECT
                u.id,
                u.name,
                u.email,
                u.role,
                u.is_active,
                COUNT(*) AS active_sessions,
                MAX(s.last_seen_at) AS last_seen_at
             FROM ep_auth_sessions s
             INNER JOIN ep_users u ON u.id = s.user_id
             WHERE s.revoked_at IS NULL
             GROUP BY u.id, u.name, u.email, u.role, u.is_active
             HAVING COUNT(*) >= ?
             ORDER BY active_sessions DESC, last_seen_at DESC
             LIMIT ?"
        );
        $stmt->bind_param('ii', $threshold, $limit);
        $stmt->execute();
        $rows = $stmt->get_result()->fetch_all(MYSQLI_ASSOC);
        $stmt->close();

        return $rows;
    }
}

if (!function_exists('ep_admin_revoke_auth_session')) {
    function ep_admin_revoke_auth_session(int $adminUserId, int $sessionId): array
    {
        if ($sessionId <= 0) {
            return ['ok' => false, 'message' => 'Session id is required.'];
        }

        $stmt = ep_db()->prepare(
            'SELECT id, session_token
             FROM ep_auth_sessions
             WHERE id = ?
             LIMIT 1'
        );
        $stmt->bind_param('i', $sessionId);
        $stmt->execute();
        $row = $stmt->get_result()->fetch_assoc();
        $stmt->close();

        if (!$row) {
            return ['ok' => false, 'message' => 'Session record not found.'];
        }

        $currentTokenHash = hash('sha256', session_id());
        if ((string) ($row['session_token'] ?? '') === $currentTokenHash) {
            return ['ok' => false, 'message' => 'You cannot revoke your current active session from this screen.'];
        }

        $revokedAt = gmdate('Y-m-d H:i:s');
        $update = ep_db()->prepare(
            'UPDATE ep_auth_sessions
             SET revoked_at = ?
             WHERE id = ?
               AND revoked_at IS NULL'
        );
        $update->bind_param('si', $revokedAt, $sessionId);
        $update->execute();
        $affected = $update->affected_rows;
        $update->close();

        if ($affected <= 0) {
            return ['ok' => false, 'message' => 'Session already revoked or unavailable.'];
        }

        return ['ok' => true, 'message' => 'Session revoked.'];
    }
}

if (!function_exists('ep_admin_revoke_user_sessions')) {
    function ep_admin_revoke_user_sessions(int $adminUserId, int $targetUserId): array
    {
        if ($targetUserId <= 0) {
            return ['ok' => false, 'message' => 'Target user id is required.'];
        }

        $currentTokenHash = hash('sha256', session_id());
        $revokedAt = gmdate('Y-m-d H:i:s');
        $update = ep_db()->prepare(
            'UPDATE ep_auth_sessions
             SET revoked_at = ?
             WHERE user_id = ?
               AND revoked_at IS NULL
               AND session_token <> ?'
        );
        $update->bind_param('sis', $revokedAt, $targetUserId, $currentTokenHash);
        $update->execute();
        $affected = $update->affected_rows;
        $update->close();

        if ($affected <= 0) {
            return ['ok' => false, 'message' => 'No active sessions found to revoke for this user.'];
        }

        return ['ok' => true, 'message' => 'Revoked ' . $affected . ' active session(s) for the user.'];
    }
}

if (!function_exists('ep_admin_cleanup_revoked_sessions')) {
    function ep_admin_cleanup_revoked_sessions(int $olderThanDays = 30): array
    {
        $olderThanDays = max(1, min(3650, $olderThanDays));
        $stmt = ep_db()->prepare(
            'DELETE FROM ep_auth_sessions
             WHERE revoked_at IS NOT NULL
               AND revoked_at < (UTC_TIMESTAMP() - INTERVAL ? DAY)'
        );
        $stmt->bind_param('i', $olderThanDays);
        $stmt->execute();
        $affected = $stmt->affected_rows;
        $stmt->close();

        return ['ok' => true, 'message' => 'Cleaned up ' . max(0, $affected) . ' revoked session record(s).'];
    }
}
