<?php
require_once __DIR__ . '/../includes/functions.php';
require_admin_login();

$importReport = null;

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    if (empty($_FILES['question_file']['tmp_name']) || !is_uploaded_file($_FILES['question_file']['tmp_name'])) {
        set_flash('error', 'Please choose a CSV or XLSX file to upload.');
        redirect_to('admin/questions_upload.php');
    }

    $originalName = $_FILES['question_file']['name'] ?? '';
    $extension = strtolower(pathinfo($originalName, PATHINFO_EXTENSION));
    $tmpPath = $_FILES['question_file']['tmp_name'];

    try {
        if ($extension === 'csv') {
            $rows = parse_csv_file_rows($tmpPath);
        } elseif ($extension === 'xlsx') {
            $rows = parse_xlsx_file_rows($tmpPath);
        } else {
            throw new RuntimeException('Unsupported file type. Please upload a .csv or .xlsx file.');
        }

        if (!$rows) {
            throw new RuntimeException('No usable data rows were found in the uploaded file.');
        }

        $importReport = import_question_rows($rows);
        set_flash('success', 'Bulk upload finished. Imported: ' . $importReport['imported'] . ', skipped: ' . $importReport['skipped'] . '.');
        $_SESSION['bulk_upload_report'] = $importReport;
        redirect_to('admin/questions_upload.php');
    } catch (Throwable $error) {
        set_flash('error', $error->getMessage());
        redirect_to('admin/questions_upload.php');
    }
}

if (!empty($_SESSION['bulk_upload_report'])) {
    $importReport = $_SESSION['bulk_upload_report'];
    unset($_SESSION['bulk_upload_report']);
}

render_header('Bulk Upload Questions', 'admin');
?>

<div class="grid-2">
    <section class="card">
        <h2>Upload CSV or XLSX</h2>
        <p class="muted">Supported headers: <code>question</code>, <code>option_a</code>, <code>option_b</code>, <code>option_c</code>, <code>option_d</code>, <code>correct_answer</code>, <code>explanation</code>, and optional <code>topic_id</code> or <code>topic_name</code>.</p>
        <p class="muted">If topic is missing or unknown, the question is saved with topic <strong>0</strong> as <strong>Unassigned</strong>. You can fix it later from the edit screen.</p>
        <form method="post" enctype="multipart/form-data" class="form-grid">
            <div class="form-row">
                <label for="questionFile">Question File</label>
                <input id="questionFile" type="file" name="question_file" accept=".csv,.xlsx" required>
            </div>
            <div class="actions">
                <button class="btn btn-primary" type="submit">Upload Questions</button>
                <a class="btn btn-accent" href="<?php echo e(base_url('admin/questions.php')); ?>">Back to Questions</a>
            </div>
        </form>
    </section>

    <section class="card">
        <h2>Template Format</h2>
        <div class="detail-list">
            <article class="detail-item">
                <h3>Accepted Columns</h3>
                <p><strong>Required:</strong> question, option_a, option_b, option_c, option_d, correct_answer</p>
                <p><strong>Optional:</strong> explanation, topic_id, topic_name, topic</p>
            </article>
            <article class="detail-item">
                <h3>Example Row</h3>
                <p><code>1 + 1 = ?,1,2,3,4,B,Because 1 plus 1 equals 2,Math Basics</code></p>
            </article>
            <article class="detail-item">
                <h3>Notes</h3>
                <p>For Excel upload, this importer reads the first worksheet in a standard <code>.xlsx</code> file. Legacy <code>.xls</code> files are not supported in this version.</p>
            </article>
        </div>
    </section>
</div>

<?php if ($importReport): ?>
    <section class="table-card">
        <h2>Last Import Report</h2>
        <div class="metrics-grid">
            <article class="metric">
                <strong><?php echo (int) $importReport['imported']; ?></strong>
                <span>Imported</span>
            </article>
            <article class="metric">
                <strong><?php echo (int) $importReport['skipped']; ?></strong>
                <span>Skipped</span>
            </article>
            <article class="metric">
                <strong><?php echo count($importReport['errors'] ?? []); ?></strong>
                <span>Row warnings</span>
            </article>
        </div>
        <?php if (!empty($importReport['errors'])): ?>
            <div class="detail-list" style="margin-top:18px;">
                <?php foreach ($importReport['errors'] as $error): ?>
                    <article class="detail-item">
                        <p><?php echo e($error); ?></p>
                    </article>
                <?php endforeach; ?>
            </div>
        <?php endif; ?>
    </section>
<?php endif; ?>

<?php render_footer(); ?>
