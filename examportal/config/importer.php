<?php
declare(strict_types=1);

if (!function_exists('ep_import_parse_boolean')) {
    function ep_import_parse_boolean(mixed $value, bool $default = true): bool
    {
        if ($value === null || $value === '') {
            return $default;
        }

        $normalized = strtolower(trim((string) $value));
        if (in_array($normalized, ['1', 'true', 'yes', 'y', 'active'], true)) {
            return true;
        }
        if (in_array($normalized, ['0', 'false', 'no', 'n', 'inactive'], true)) {
            return false;
        }

        return $default;
    }
}

if (!function_exists('ep_import_parse_float')) {
    function ep_import_parse_float(mixed $value, float $default = 0.0): float
    {
        if ($value === null || $value === '') {
            return $default;
        }
        if (!is_numeric((string) $value)) {
            return $default;
        }
        return (float) $value;
    }
}

if (!function_exists('ep_import_field')) {
    function ep_import_field(array $row, array $keys, string $default = ''): string
    {
        foreach ($keys as $key) {
            if (array_key_exists($key, $row)) {
                return trim((string) $row[$key]);
            }
        }
        return $default;
    }
}

if (!function_exists('ep_import_normalize_row_keys')) {
    function ep_import_normalize_row_keys(array $row): array
    {
        $normalized = [];
        foreach ($row as $key => $value) {
            $k = strtolower(trim((string) $key));
            $normalized[$k] = $value;
        }
        return $normalized;
    }
}

if (!function_exists('ep_import_parse_option_keys')) {
    function ep_import_parse_option_keys(string $value): array
    {
        $parts = preg_split('/[\s,]+/', strtoupper(trim($value))) ?: [];
        $keys = [];
        foreach ($parts as $part) {
            $key = substr(trim($part), 0, 1);
            if ($key === '') {
                continue;
            }
            if (!preg_match('/^[A-Z]$/', $key)) {
                continue;
            }
            $keys[$key] = $key;
        }

        return array_values($keys);
    }
}

if (!function_exists('ep_import_parse_csv_content')) {
    function ep_import_parse_csv_content(string $content): array
    {
        $handle = fopen('php://temp', 'r+');
        if ($handle === false) {
            return ['ok' => false, 'error' => 'Unable to open CSV content.'];
        }

        fwrite($handle, $content);
        rewind($handle);

        $header = fgetcsv($handle);
        if ($header === false) {
            fclose($handle);
            return ['ok' => false, 'error' => 'CSV appears empty.'];
        }

        $headerKeys = array_map(static fn($h): string => strtolower(trim((string) $h)), $header);
        $rows = [];
        $line = 1;

        while (($data = fgetcsv($handle)) !== false) {
            $line++;
            if (count($data) === 1 && trim((string) $data[0]) === '') {
                continue;
            }

            $assoc = [];
            foreach ($headerKeys as $idx => $key) {
                $assoc[$key] = $data[$idx] ?? '';
            }
            $rows[] = [
                'source_row_number' => $line,
                'row' => $assoc,
            ];
        }

        fclose($handle);
        return ['ok' => true, 'rows' => $rows];
    }
}

if (!function_exists('ep_import_parse_json_content')) {
    function ep_import_parse_json_content(string $content): array
    {
        $decoded = json_decode($content, true);
        if (!is_array($decoded)) {
            return ['ok' => false, 'error' => 'Invalid JSON format.'];
        }

        $items = [];
        if (array_is_list($decoded)) {
            $items = $decoded;
        } elseif (isset($decoded['questions']) && is_array($decoded['questions'])) {
            $items = $decoded['questions'];
        } else {
            return ['ok' => false, 'error' => 'JSON must be an array or an object with a "questions" array.'];
        }

        $rows = [];
        $index = 0;
        foreach ($items as $item) {
            $index++;
            if (!is_array($item)) {
                $rows[] = [
                    'source_row_number' => $index,
                    'row' => [],
                    'force_error' => 'Each JSON row must be an object.',
                ];
                continue;
            }
            $rows[] = [
                'source_row_number' => $index,
                'row' => ep_import_normalize_row_keys($item),
            ];
        }

        return ['ok' => true, 'rows' => $rows];
    }
}

if (!function_exists('ep_import_category_maps')) {
    function ep_import_category_maps(): array
    {
        $categories = ep_get_categories_for_admin(true);
        $bySlug = [];
        $byName = [];

        foreach ($categories as $category) {
            $slug = strtolower((string) $category['slug']);
            $name = strtolower((string) $category['name']);
            $bySlug[$slug] = $category;
            $byName[$name] = $category;
        }

        return ['by_slug' => $bySlug, 'by_name' => $byName];
    }
}

if (!function_exists('ep_import_find_question_set_id')) {
    function ep_import_find_question_set_id(int $categoryId, string $title): int
    {
        $title = trim($title);
        if ($title === '') {
            return 0;
        }

        $stmt = ep_db()->prepare('SELECT id FROM ep_question_sets WHERE category_id = ? AND title = ? LIMIT 1');
        $stmt->bind_param('is', $categoryId, $title);
        $stmt->execute();
        $row = $stmt->get_result()->fetch_assoc();
        $stmt->close();

        return $row ? (int) $row['id'] : 0;
    }
}

if (!function_exists('ep_import_normalize_single_row')) {
    function ep_import_normalize_single_row(array $rowInput, int $sourceRowNumber, array $categoryMaps): array
    {
        if (!empty($rowInput['force_error'])) {
            return [
                'ok' => false,
                'message' => (string) $rowInput['force_error'],
                'normalized' => null,
            ];
        }

        $raw = ep_import_normalize_row_keys($rowInput['row'] ?? []);

        $categorySlug = strtolower(ep_import_field($raw, ['category_slug', 'exam_category_slug', 'exam_category', 'category']));
        $categoryName = strtolower(ep_import_field($raw, ['category_name']));

        $category = null;
        if ($categorySlug !== '' && isset($categoryMaps['by_slug'][$categorySlug])) {
            $category = $categoryMaps['by_slug'][$categorySlug];
        } elseif ($categoryName !== '' && isset($categoryMaps['by_name'][$categoryName])) {
            $category = $categoryMaps['by_name'][$categoryName];
        }

        if (!$category) {
            return [
                'ok' => false,
                'message' => 'Category not found. Provide valid category_slug/category_name.',
                'normalized' => null,
            ];
        }

        $categoryId = (int) $category['id'];
        $subjectName = ep_import_field($raw, ['subject', 'subject_name']);
        $questionSetTitle = ep_import_field($raw, ['question_set_title', 'set_title']);
        $questionSetId = ep_import_find_question_set_id($categoryId, $questionSetTitle);

        $questionType = strtolower(ep_import_field($raw, ['question_type'], 'mcq_single'));
        $allowedTypes = ['mcq_single', 'mcq_multi', 'true_false', 'numeric', 'short_text'];
        if (!in_array($questionType, $allowedTypes, true)) {
            return [
                'ok' => false,
                'message' => 'Invalid question_type. Allowed: ' . implode(', ', $allowedTypes),
                'normalized' => null,
            ];
        }

        $difficulty = strtolower(ep_import_field($raw, ['difficulty_level', 'difficulty'], 'medium'));
        if (!in_array($difficulty, ['easy', 'medium', 'hard'], true)) {
            $difficulty = 'medium';
        }

        $questionText = ep_import_field($raw, ['question_text', 'question']);
        if ($questionText === '') {
            return [
                'ok' => false,
                'message' => 'question_text is required.',
                'normalized' => null,
            ];
        }

        $defaultMarks = ep_import_parse_float($raw['default_marks'] ?? null, 1.0);
        $negativeMarks = ep_import_parse_float($raw['negative_marks'] ?? null, 0.0);
        if ($defaultMarks < 0 || $negativeMarks < 0) {
            return [
                'ok' => false,
                'message' => 'default_marks and negative_marks must be non-negative.',
                'normalized' => null,
            ];
        }

        $options = [];
        $correctKeys = [];
        $answerType = 'single_option';
        $correctText = '';
        $correctNumeric = null;
        $numericTolerance = null;

        if ($questionType === 'mcq_single' || $questionType === 'mcq_multi' || $questionType === 'true_false') {
            $optionA = ep_import_field($raw, ['option_a']);
            $optionB = ep_import_field($raw, ['option_b']);
            $optionC = ep_import_field($raw, ['option_c']);
            $optionD = ep_import_field($raw, ['option_d']);

            if ($questionType === 'true_false') {
                $optionA = $optionA !== '' ? $optionA : 'True';
                $optionB = $optionB !== '' ? $optionB : 'False';
            }

            foreach (['A' => $optionA, 'B' => $optionB, 'C' => $optionC, 'D' => $optionD] as $key => $text) {
                if ($text !== '') {
                    $options[] = ['key' => $key, 'text' => $text, 'is_correct' => 0];
                }
            }

            if (count($options) < 2) {
                return [
                    'ok' => false,
                    'message' => 'MCQ/True-False rows need at least two options.',
                    'normalized' => null,
                ];
            }

            $correctOptionKeys = ep_import_field($raw, ['correct_option_keys', 'right_answer']);
            $correctKeys = ep_import_parse_option_keys($correctOptionKeys);
            if (!$correctKeys) {
                return [
                    'ok' => false,
                    'message' => 'correct_option_keys is required for option-based questions.',
                    'normalized' => null,
                ];
            }

            $validKeys = array_map(static fn(array $o): string => (string) $o['key'], $options);
            foreach ($correctKeys as $key) {
                if (!in_array($key, $validKeys, true)) {
                    return [
                        'ok' => false,
                        'message' => 'Correct option key ' . $key . ' does not exist in options.',
                        'normalized' => null,
                    ];
                }
            }

            if (($questionType === 'mcq_single' || $questionType === 'true_false') && count($correctKeys) !== 1) {
                return [
                    'ok' => false,
                    'message' => 'Single-answer question must have one correct option key.',
                    'normalized' => null,
                ];
            }

            if ($questionType === 'mcq_multi') {
                $answerType = 'multi_option';
            }

            $options = array_map(
                static function (array $opt) use ($correctKeys): array {
                    $opt['is_correct'] = in_array($opt['key'], $correctKeys, true) ? 1 : 0;
                    return $opt;
                },
                $options
            );
        }

        if ($questionType === 'numeric') {
            $answerType = 'numeric';
            $numericRaw = ep_import_field($raw, ['correct_numeric', 'correct_answer', 'right_answer']);
            if ($numericRaw === '' || !is_numeric($numericRaw)) {
                return [
                    'ok' => false,
                    'message' => 'Numeric question requires numeric correct_numeric/right_answer.',
                    'normalized' => null,
                ];
            }
            $correctNumeric = (float) $numericRaw;
            $toleranceRaw = ep_import_field($raw, ['numeric_tolerance', 'tolerance']);
            if ($toleranceRaw !== '') {
                if (!is_numeric($toleranceRaw)) {
                    return [
                        'ok' => false,
                        'message' => 'numeric_tolerance must be numeric.',
                        'normalized' => null,
                    ];
                }
                $numericTolerance = (float) $toleranceRaw;
            }
        }

        if ($questionType === 'short_text') {
            $answerType = 'text';
            $correctText = ep_import_field($raw, ['correct_text', 'correct_answer', 'right_answer']);
            if ($correctText === '') {
                return [
                    'ok' => false,
                    'message' => 'Short text question requires correct_text/right_answer.',
                    'normalized' => null,
                ];
            }
        }

        $tagsCsv = ep_import_field($raw, ['tags', 'tags_csv']);
        $tags = ep_parse_tags_csv($tagsCsv);

        $normalized = [
            'category_id' => $categoryId,
            'subject_id' => 0,
            'new_subject_name' => $subjectName,
            'question_set_id' => $questionSetId,
            'question_type' => $questionType,
            'exam_year' => ep_import_field($raw, ['exam_year', 'year']),
            'difficulty_level' => $difficulty,
            'question_text' => $questionText,
            'hint_text' => ep_import_field($raw, ['hint_text', 'hint']),
            'explanation_text' => ep_import_field($raw, ['explanation_text', 'explanation']),
            'default_marks' => $defaultMarks,
            'negative_marks' => $negativeMarks,
            'is_active' => ep_import_parse_boolean($raw['is_active'] ?? null, true) ? 1 : 0,
            'options' => $options,
            'answer' => [
                'answer_type' => $answerType,
                'correct_option_keys' => implode(',', $correctKeys),
                'correct_text' => $correctText,
                'correct_numeric' => $correctNumeric,
                'numeric_tolerance' => $numericTolerance,
                'answer_meta_json' => [
                    'import_source' => 'module3',
                    'source_row_number' => $sourceRowNumber,
                ],
            ],
            'tags' => $tags,
            'import_meta' => [
                'category_slug' => (string) $category['slug'],
                'source_row_number' => $sourceRowNumber,
                'question_set_title' => $questionSetTitle,
            ],
        ];

        return [
            'ok' => true,
            'message' => 'Valid',
            'normalized' => $normalized,
        ];
    }
}

if (!function_exists('ep_import_create_job_preview')) {
    function ep_import_create_job_preview(int $userId, string $sourceFormat, string $sourceFilename, string $content): array
    {
        $sourceFormat = strtolower(trim($sourceFormat));
        if (!in_array($sourceFormat, ['csv', 'json'], true)) {
            return ['ok' => false, 'message' => 'Unsupported format. Use CSV or JSON.'];
        }

        if (trim($content) === '') {
            return ['ok' => false, 'message' => 'Import content is empty.'];
        }

        $parsed = $sourceFormat === 'csv'
            ? ep_import_parse_csv_content($content)
            : ep_import_parse_json_content($content);

        if (!($parsed['ok'] ?? false)) {
            return ['ok' => false, 'message' => (string) ($parsed['error'] ?? 'Unable to parse import content.')];
        }

        $rows = $parsed['rows'] ?? [];
        if (!$rows) {
            return ['ok' => false, 'message' => 'No rows found in import payload.'];
        }

        $createdBy = $userId > 0 ? $userId : null;
        $importType = $sourceFormat === 'csv' ? 'questions_csv' : 'questions_json';
        $status = 'validating';
        $payloadJson = json_encode([
            'preview_only' => true,
            'source_format' => $sourceFormat,
        ], JSON_UNESCAPED_UNICODE);

        $insertJob = ep_db()->prepare(
            'INSERT INTO ep_import_jobs (
                created_by_user_id,
                import_type,
                source_format,
                source_filename,
                status,
                total_rows,
                success_rows,
                failed_rows,
                started_at,
                payload_json
            ) VALUES (?, ?, ?, ?, ?, 0, 0, 0, UTC_TIMESTAMP(), ?)' 
        );
        $insertJob->bind_param('isssss', $createdBy, $importType, $sourceFormat, $sourceFilename, $status, $payloadJson);
        $insertJob->execute();
        $jobId = (int) ep_db()->insert_id;
        $insertJob->close();

        $maps = ep_import_category_maps();
        $totalRows = 0;
        $validRows = 0;
        $failedRows = 0;

        $insertRow = ep_db()->prepare(
            'INSERT INTO ep_import_job_rows (
                import_job_id,
                source_row_number,
                status,
                category_id,
                question_id,
                raw_row_json,
                normalized_row_json,
                error_message
            ) VALUES (?, ?, ?, ?, NULL, ?, ?, ?)' 
        );

        foreach ($rows as $row) {
            $totalRows++;
            $sourceRowNumber = (int) ($row['source_row_number'] ?? $totalRows);

            $normalizedResult = ep_import_normalize_single_row($row, $sourceRowNumber, $maps);
            $isValid = (bool) ($normalizedResult['ok'] ?? false);
            $statusRow = $isValid ? 'pending' : 'failed';

            $normalizedPayload = $isValid ? $normalizedResult['normalized'] : null;
            $categoryId = $isValid ? (int) ($normalizedPayload['category_id'] ?? 0) : null;
            $errorMessage = $isValid ? null : (string) ($normalizedResult['message'] ?? 'Validation failed.');

            $rawJson = json_encode($row['row'] ?? [], JSON_UNESCAPED_UNICODE);
            $normalizedJson = $normalizedPayload ? json_encode($normalizedPayload, JSON_UNESCAPED_UNICODE) : null;

            if ($isValid) {
                $validRows++;
            } else {
                $failedRows++;
            }

            $insertRow->bind_param(
                'iisisss',
                $jobId,
                $sourceRowNumber,
                $statusRow,
                $categoryId,
                $rawJson,
                $normalizedJson,
                $errorMessage
            );
            $insertRow->execute();
        }

        $insertRow->close();

        $jobStatus = 'validated';
        $updateJob = ep_db()->prepare(
            'UPDATE ep_import_jobs
             SET status = ?, total_rows = ?, success_rows = ?, failed_rows = ?, completed_at = UTC_TIMESTAMP()
             WHERE id = ?'
        );
        $updateJob->bind_param('siiii', $jobStatus, $totalRows, $validRows, $failedRows, $jobId);
        $updateJob->execute();
        $updateJob->close();

        ep_audit_log(
            $userId,
            'import.previewed',
            'import_job',
            (string) $jobId,
            [],
            [
                'source_format' => $sourceFormat,
                'total_rows' => $totalRows,
                'valid_rows' => $validRows,
                'failed_rows' => $failedRows,
            ]
        );

        return [
            'ok' => true,
            'job_id' => $jobId,
            'total_rows' => $totalRows,
            'valid_rows' => $validRows,
            'failed_rows' => $failedRows,
            'message' => 'Preview generated. Valid: ' . $validRows . ', Invalid: ' . $failedRows,
        ];
    }
}

if (!function_exists('ep_import_get_job')) {
    function ep_import_get_job(int $jobId): ?array
    {
        $stmt = ep_db()->prepare(
            'SELECT j.*, u.name AS created_by_name, u.email AS created_by_email
             FROM ep_import_jobs j
             LEFT JOIN ep_users u ON u.id = j.created_by_user_id
             WHERE j.id = ?
             LIMIT 1'
        );
        $stmt->bind_param('i', $jobId);
        $stmt->execute();
        $row = $stmt->get_result()->fetch_assoc();
        $stmt->close();

        return $row ?: null;
    }
}

if (!function_exists('ep_import_get_job_rows')) {
    function ep_import_get_job_rows(int $jobId, int $limit = 500): array
    {
        $limit = max(1, min(2000, $limit));

        $stmt = ep_db()->prepare(
            'SELECT source_row_number, status, category_id, question_id, raw_row_json, normalized_row_json, error_message
             FROM ep_import_job_rows
             WHERE import_job_id = ?
             ORDER BY source_row_number ASC
             LIMIT ?'
        );
        $stmt->bind_param('ii', $jobId, $limit);
        $stmt->execute();
        $rows = $stmt->get_result()->fetch_all(MYSQLI_ASSOC);
        $stmt->close();

        return $rows;
    }
}

if (!function_exists('ep_import_commit_job')) {
    function ep_import_commit_job(int $jobId, int $userId): array
    {
        $job = ep_import_get_job($jobId);
        if (!$job) {
            return ['ok' => false, 'message' => 'Import job not found.'];
        }

        if ((string) $job['status'] === 'imported') {
            return ['ok' => false, 'message' => 'This import job is already completed.'];
        }

        $rows = ep_import_get_job_rows($jobId, 5000);
        if (!$rows) {
            return ['ok' => false, 'message' => 'No rows available for import.'];
        }

        $importedCount = 0;
        $failedCount = 0;

        foreach ($rows as $row) {
            $rowStatus = (string) $row['status'];
            if ($rowStatus !== 'pending') {
                continue;
            }

            $sourceRow = (int) $row['source_row_number'];
            $normalizedJson = (string) ($row['normalized_row_json'] ?? '');
            $payload = json_decode($normalizedJson, true);
            if (!is_array($payload)) {
                $failedCount++;
                $error = 'Invalid normalized payload for row ' . $sourceRow;
                $upd = ep_db()->prepare('UPDATE ep_import_job_rows SET status = ?, error_message = ? WHERE import_job_id = ? AND source_row_number = ?');
                $failedStatus = 'failed';
                $upd->bind_param('ssii', $failedStatus, $error, $jobId, $sourceRow);
                $upd->execute();
                $upd->close();
                continue;
            }

            $save = ep_save_question_bank_entry($payload, $userId, null);
            if (!($save['ok'] ?? false)) {
                $failedCount++;
                $error = (string) ($save['message'] ?? 'Failed to save row.');
                $upd = ep_db()->prepare('UPDATE ep_import_job_rows SET status = ?, error_message = ? WHERE import_job_id = ? AND source_row_number = ?');
                $failedStatus = 'failed';
                $upd->bind_param('ssii', $failedStatus, $error, $jobId, $sourceRow);
                $upd->execute();
                $upd->close();
                continue;
            }

            $questionId = (int) ($save['question_id'] ?? 0);
            $importedCount++;
            $upd = ep_db()->prepare('UPDATE ep_import_job_rows SET status = ?, question_id = ?, error_message = NULL WHERE import_job_id = ? AND source_row_number = ?');
            $importedStatus = 'imported';
            $upd->bind_param('siii', $importedStatus, $questionId, $jobId, $sourceRow);
            $upd->execute();
            $upd->close();
        }

        $failedPreviewRows = (int) $job['failed_rows'];
        $finalFailed = $failedPreviewRows + $failedCount;
        $status = $finalFailed > 0 ? 'failed' : 'imported';

        $update = ep_db()->prepare(
            'UPDATE ep_import_jobs
             SET status = ?, success_rows = ?, failed_rows = ?, completed_at = UTC_TIMESTAMP()
             WHERE id = ?'
        );
        $update->bind_param('siii', $status, $importedCount, $finalFailed, $jobId);
        $update->execute();
        $update->close();

        ep_audit_log(
            $userId,
            'import.committed',
            'import_job',
            (string) $jobId,
            [
                'status' => (string) $job['status'],
                'success_rows' => (int) $job['success_rows'],
                'failed_rows' => (int) $job['failed_rows'],
            ],
            [
                'status' => $status,
                'imported_rows' => $importedCount,
                'failed_rows' => $finalFailed,
            ]
        );

        return [
            'ok' => true,
            'status' => $status,
            'imported_rows' => $importedCount,
            'failed_rows' => $finalFailed,
            'message' => 'Import complete. Imported: ' . $importedCount . ', Failed: ' . $finalFailed,
        ];
    }
}
