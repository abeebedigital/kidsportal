<?php
declare(strict_types=1);
require_once __DIR__ . '/../config/app.php';

ep_require_admin();

$user = ep_current_user();
if (!$user) {
    ep_redirect('user/login.php');
}

$selectedFormat = (string) ($_GET['source_format'] ?? 'csv');
if (!in_array($selectedFormat, ['csv', 'json'], true)) {
    $selectedFormat = 'csv';
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $csrfToken = $_POST['csrf_token'] ?? null;
    if (!ep_verify_csrf_token(is_string($csrfToken) ? $csrfToken : null)) {
        ep_flash_set('error', 'Session validation failed. Please refresh and try again.');
        ep_redirect('admin/import.php');
    }

    $postAction = (string) ($_POST['post_action'] ?? '');

    if ($postAction === 'preview_import') {
        $sourceFormat = strtolower(trim((string) ($_POST['source_format'] ?? 'csv')));
        if (!in_array($sourceFormat, ['csv', 'json'], true)) {
            $sourceFormat = 'csv';
        }

        $importPayload = trim((string) ($_POST['import_payload'] ?? ''));
        $sourceFilename = 'pasted_' . $sourceFormat . '_payload';

        if (isset($_FILES['import_file']) && is_array($_FILES['import_file']) && (int) ($_FILES['import_file']['error'] ?? UPLOAD_ERR_NO_FILE) === UPLOAD_ERR_OK) {
            $tmpName = (string) ($_FILES['import_file']['tmp_name'] ?? '');
            $fileName = (string) ($_FILES['import_file']['name'] ?? 'upload_' . $sourceFormat . '.txt');
            if ($tmpName !== '' && is_uploaded_file($tmpName)) {
                $fileContent = file_get_contents($tmpName);
                if ($fileContent !== false) {
                    $importPayload = trim($fileContent);
                    $sourceFilename = $fileName;
                }
            }
        }

        if ($importPayload === '') {
            ep_flash_set('error', 'Provide import content in textarea or upload a file.');
            ep_redirect('admin/import.php?source_format=' . urlencode($sourceFormat));
        }

        $preview = ep_import_create_job_preview((int) $user['id'], $sourceFormat, $sourceFilename, $importPayload);
        if (!($preview['ok'] ?? false)) {
            ep_flash_set('error', (string) ($preview['message'] ?? 'Unable to preview import.'));
            ep_redirect('admin/import.php?source_format=' . urlencode($sourceFormat));
        }

        ep_flash_set('success', (string) ($preview['message'] ?? 'Preview generated.'));
        ep_redirect('admin/import.php?job_id=' . (int) $preview['job_id']);
    }

    if ($postAction === 'commit_import') {
        $jobId = (int) ($_POST['job_id'] ?? 0);
        if ($jobId <= 0) {
            ep_flash_set('error', 'Invalid job id for commit.');
            ep_redirect('admin/import.php');
        }

        $commit = ep_import_commit_job($jobId, (int) $user['id']);
        if (!($commit['ok'] ?? false)) {
            ep_flash_set('error', (string) ($commit['message'] ?? 'Commit failed.'));
        } else {
            ep_flash_set('success', (string) ($commit['message'] ?? 'Import committed.'));
        }

        ep_redirect('admin/import.php?job_id=' . $jobId);
    }
}

$jobId = (int) ($_GET['job_id'] ?? 0);
$job = null;
$rows = [];
if ($jobId > 0) {
    $job = ep_import_get_job($jobId);
    if ($job) {
        $rows = ep_import_get_job_rows($jobId, 1000);
        $selectedFormat = (string) ($job['source_format'] ?? $selectedFormat);
    }
}

ep_render_page_start([
    'title' => 'Import Engine',
    'active' => 'admin',
    'hero_kicker' => 'Module 3',
    'hero_title' => 'Question Import Engine',
    'hero_text' => 'Upload or paste CSV/JSON, preview row-level validation, then commit import into question bank.',
]);
?>

<section class="panel">
  <div class="actions">
    <a class="btn-link btn-outline" href="<?= h(examportal_url('admin/index.php')); ?>">Back to Admin Home</a>
    <a class="btn-link btn-outline" href="<?= h(examportal_url('admin/questions.php')); ?>">Open Question Bank</a>
    <a class="btn-link btn-outline" href="<?= h(examportal_url('admin/papers.php')); ?>">Open Paper Builder</a>
    <a class="btn-link" href="<?= h(examportal_url('samples/questions-import-sample.csv')); ?>">Sample CSV</a>
    <a class="btn-link" href="<?= h(examportal_url('samples/questions-import-sample.json')); ?>">Sample JSON</a>
  </div>
</section>

<section class="panel">
  <h2 class="section-title">Preview Import</h2>
  <form method="post" enctype="multipart/form-data" class="import-form-grid">
    <input type="hidden" name="csrf_token" value="<?= h(ep_csrf_token()); ?>">
    <input type="hidden" name="post_action" value="preview_import">

    <label for="source_format">Format</label>
    <select id="source_format" name="source_format" required>
      <option value="csv" <?= $selectedFormat === 'csv' ? 'selected' : ''; ?>>CSV</option>
      <option value="json" <?= $selectedFormat === 'json' ? 'selected' : ''; ?>>JSON</option>
    </select>

    <label for="import_file">Upload File (optional)</label>
    <input id="import_file" name="import_file" type="file" accept=".csv,.json,.txt">

    <label for="import_payload">Paste Payload</label>
    <textarea id="import_payload" name="import_payload" rows="12" placeholder="Paste CSV or JSON content here..."></textarea>

    <div class="form-actions">
      <button class="btn" type="submit">Preview Validation</button>
    </div>
  </form>

  <p class="inline-note">Tip: use either file upload or pasted payload. File content takes priority if both are provided.</p>
</section>

<?php if ($job): ?>
  <section class="panel">
    <h2 class="section-title">Preview Result #<?= (int) $job['id']; ?></h2>
    <div class="meta-list">
      <span class="pill">Format: <?= h((string) $job['source_format']); ?></span>
      <span class="pill">Status: <?= h((string) $job['status']); ?></span>
      <span class="pill">Total: <?= (int) $job['total_rows']; ?></span>
      <span class="pill">Valid: <?= (int) $job['success_rows']; ?></span>
      <span class="pill">Invalid: <?= (int) $job['failed_rows']; ?></span>
      <span class="pill">File: <?= h((string) ($job['source_filename'] ?? '')); ?></span>
    </div>

    <div class="actions" style="margin-top:10px;">
      <?php if ((int) $job['success_rows'] > 0 && (string) $job['status'] !== 'imported'): ?>
        <form method="post" class="inline-form">
          <input type="hidden" name="csrf_token" value="<?= h(ep_csrf_token()); ?>">
          <input type="hidden" name="post_action" value="commit_import">
          <input type="hidden" name="job_id" value="<?= (int) $job['id']; ?>">
          <button class="btn" type="submit">Commit Import</button>
        </form>
      <?php endif; ?>
      <a class="btn-link btn-outline" href="<?= h(examportal_url('admin/import.php')); ?>">New Import</a>
    </div>
  </section>

  <section class="panel">
    <h2 class="section-title">Row-Level Validation</h2>
    <div class="question-table-wrap">
      <table class="question-table import-table">
        <thead>
          <tr>
            <th>Row</th>
            <th>Status</th>
            <th>Category</th>
            <th>Type</th>
            <th>Question Preview</th>
            <th>Error</th>
          </tr>
        </thead>
        <tbody>
          <?php foreach ($rows as $row): ?>
            <?php
              $normalized = json_decode((string) ($row['normalized_row_json'] ?? ''), true);
              $questionText = is_array($normalized) ? (string) ($normalized['question_text'] ?? '') : '';
              $questionType = is_array($normalized) ? (string) ($normalized['question_type'] ?? '') : '';
              $categorySlug = is_array($normalized) ? (string) ($normalized['import_meta']['category_slug'] ?? '') : '';
              $statusClass = ((string) $row['status'] === 'failed') ? 'pill-bad' : 'pill-good';
            ?>
            <tr>
              <td><?= (int) $row['source_row_number']; ?></td>
              <td><span class="pill <?= h($statusClass); ?>"><?= h((string) $row['status']); ?></span></td>
              <td><?= h($categorySlug !== '' ? $categorySlug : '—'); ?></td>
              <td><?= h($questionType !== '' ? $questionType : '—'); ?></td>
              <td><?= h($questionText !== '' ? (substr($questionText, 0, 110) . (strlen($questionText) > 110 ? '...' : '')) : '—'); ?></td>
              <td><?= h((string) ($row['error_message'] ?? '')); ?></td>
            </tr>
          <?php endforeach; ?>
        </tbody>
      </table>
    </div>
  </section>
<?php endif; ?>

<section class="panel">
  <h2 class="section-title">Expected Format Notes</h2>
  <ul class="import-note-list">
    <li>`category_slug` is strongly recommended (`selective-school`, `naplan`, `psc`, `upsc`, `entrance`).</li>
    <li>`question_type` supports: `mcq_single`, `mcq_multi`, `true_false`, `numeric`, `short_text`.</li>
    <li>MCQ/True-False need options and `correct_option_keys` (for multi use `A,C`).</li>
    <li>Numeric needs `correct_numeric` (optional `numeric_tolerance`).</li>
    <li>Short text needs `correct_text`.</li>
  </ul>
</section>

<?php ep_render_page_end(); ?>
