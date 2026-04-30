<?php
require_once __DIR__ . '/../includes/functions.php';
require_admin_login();

$editing = null;

function category_slug_from_name($name)
{
    $slug = strtolower(trim((string) $name));
    $slug = preg_replace('/[^a-z0-9]+/', '-', $slug);
    return trim((string) $slug, '-');
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $action = $_POST['action'] ?? 'create';
    $name = trim($_POST['name'] ?? '');
    $slug = category_slug_from_name($_POST['slug'] ?? $name);
    $description = trim($_POST['description'] ?? '');
    $isActive = isset($_POST['is_active']) ? 1 : 0;

    if ($name === '' || $slug === '') {
        set_flash('error', 'Category name and slug are required.');
        redirect_to('admin/categories.php');
    }

    if ($action === 'update') {
        $categoryId = (int) ($_POST['category_id'] ?? 0);
        $stmt = $conn->prepare('UPDATE exam_categories SET name = ?, slug = ?, description = ?, is_active = ? WHERE id = ?');
        $stmt->bind_param('sssii', $name, $slug, $description, $isActive, $categoryId);
        $stmt->execute();
        $stmt->close();
        set_flash('success', 'Category updated successfully.');
    } else {
        $stmt = $conn->prepare('INSERT INTO exam_categories (name, slug, description, is_active) VALUES (?, ?, ?, ?)');
        $stmt->bind_param('sssi', $name, $slug, $description, $isActive);
        $stmt->execute();
        $stmt->close();
        set_flash('success', 'Category added successfully.');
    }

    redirect_to('admin/categories.php');
}

if (isset($_GET['toggle'])) {
    $categoryId = (int) $_GET['toggle'];
    $stmt = $conn->prepare('UPDATE exam_categories SET is_active = CASE WHEN is_active = 1 THEN 0 ELSE 1 END WHERE id = ?');
    $stmt->bind_param('i', $categoryId);
    $stmt->execute();
    $stmt->close();
    set_flash('success', 'Category status updated.');
    redirect_to('admin/categories.php');
}

if (isset($_GET['delete'])) {
    $categoryId = (int) $_GET['delete'];

    $usageChecks = [
        'topics' => 'SELECT COUNT(*) AS total FROM topics WHERE category_id = ?',
        'Exam Sets' => 'SELECT COUNT(*) AS total FROM exam_sets WHERE category_id = ?',
        'plans' => 'SELECT COUNT(*) AS total FROM subscription_plans WHERE category_id = ?',
        'subscriptions' => 'SELECT COUNT(*) AS total FROM user_category_subscriptions WHERE category_id = ?'
    ];

    $usedBy = [];
    foreach ($usageChecks as $label => $sql) {
        $stmt = $conn->prepare($sql);
        $stmt->bind_param('i', $categoryId);
        $stmt->execute();
        $total = (int) ($stmt->get_result()->fetch_assoc()['total'] ?? 0);
        $stmt->close();
        if ($total > 0) {
            $usedBy[] = $label;
        }
    }

    if ($usedBy) {
        set_flash('error', 'Cannot delete this category because it has linked ' . implode(', ', $usedBy) . '. Deactivate it instead, or remove linked data first.');
        redirect_to('admin/categories.php');
    }

    $stmt = $conn->prepare('DELETE FROM exam_categories WHERE id = ?');
    $stmt->bind_param('i', $categoryId);
    $stmt->execute();
    $deleted = $stmt->affected_rows;
    $stmt->close();

    set_flash($deleted > 0 ? 'success' : 'error', $deleted > 0 ? 'Category deleted successfully.' : 'Category not found.');
    redirect_to('admin/categories.php');
}

if (isset($_GET['edit'])) {
    $categoryId = (int) $_GET['edit'];
    $stmt = $conn->prepare('SELECT * FROM exam_categories WHERE id = ? LIMIT 1');
    $stmt->bind_param('i', $categoryId);
    $stmt->execute();
    $editing = $stmt->get_result()->fetch_assoc();
    $stmt->close();
}

$categories = get_categories(false);

render_header('Manage Categories', 'admin');
?>

<div class="stacked-sections">
    <section class="card">
        <h2><?php echo $editing ? 'Edit Category' : 'Add Category'; ?></h2>
        <p class="muted">Categories are the paid exam buckets, such as Selective School, PSC, UPSC, and Entrance.</p>
        <form method="post" class="form-grid compact-category-form">
            <input type="hidden" name="action" value="<?php echo $editing ? 'update' : 'create'; ?>">
            <?php if ($editing): ?>
                <input type="hidden" name="category_id" value="<?php echo (int) $editing['id']; ?>">
            <?php endif; ?>
            <div class="form-row">
                <label for="categoryName">Category Name</label>
                <input id="categoryName" type="text" name="name" value="<?php echo e($editing['name'] ?? ''); ?>" placeholder="Example: Selective School" data-slug-source="categorySlug" required>
            </div>
            <div class="form-row">
                <label for="categorySlug">Slug</label>
                <input id="categorySlug" type="text" name="slug" value="<?php echo e($editing['slug'] ?? ''); ?>" placeholder="selective-school" data-slug-target>
            </div>
            <div class="form-row">
                <label for="categoryDescription">Description</label>
                <textarea id="categoryDescription" name="description" placeholder="Short admin note for this category"><?php echo e($editing['description'] ?? ''); ?></textarea>
            </div>
            <label class="check-row compact-category-active">
                <input type="checkbox" name="is_active" value="1" <?php echo (int) ($editing['is_active'] ?? 1) === 1 ? 'checked' : ''; ?>>
                Active
            </label>
            <div class="actions">
                <button class="btn btn-primary" type="submit"><?php echo $editing ? 'Update Category' : 'Save Category'; ?></button>
                <?php if ($editing): ?>
                    <a class="btn btn-ghost" href="<?php echo e(base_url('admin/categories.php')); ?>">Cancel</a>
                <?php endif; ?>
            </div>
        </form>
    </section>

    <section class="table-card">
        <h2>Category List</h2>
        <div class="table-wrap">
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Category</th>
                        <th>Description</th>
                        <th>Status</th>
                        <th>Created</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    <?php foreach ($categories as $category): ?>
                        <tr>
                            <td><?php echo (int) $category['id']; ?></td>
                            <td>
                                <strong><?php echo e($category['name']); ?></strong>
                                <div class="muted"><?php echo e($category['slug']); ?></div>
                            </td>
                            <td>
                                <?php
                                $description = trim((string) ($category['description'] ?? ''));
                                $preview = mb_strlen($description) > 42 ? mb_substr($description, 0, 42) . '...' : $description;
                                ?>
                                <?php if ($description !== ''): ?>
                                    <span class="description-preview"><?php echo e($preview); ?></span>
                                    <button
                                        class="icon-detail-btn"
                                        type="button"
                                        data-modal-target="category-description-<?php echo (int) $category['id']; ?>"
                                        aria-label="View category description for <?php echo e($category['name']); ?>"
                                        title="View full description"
                                    >
                                        ^
                                    </button>
                                <?php else: ?>
                                    <span class="muted">No description</span>
                                <?php endif; ?>
                            </td>
                            <td>
                                <span class="pill <?php echo (int) $category['is_active'] === 1 ? 'pill-success' : 'pill-warning'; ?>">
                                    <?php echo (int) $category['is_active'] === 1 ? 'Active' : 'Inactive'; ?>
                                </span>
                            </td>
                            <td><?php echo e($category['created_at']); ?></td>
                            <td>
                                <div class="actions">
                                    <a class="btn btn-accent" href="<?php echo e(base_url('admin/categories.php?edit=' . (int) $category['id'])); ?>">Edit</a>
                                    <a class="btn btn-ghost" href="<?php echo e(base_url('admin/categories.php?toggle=' . (int) $category['id'])); ?>">Toggle</a>
                                    <a class="btn btn-danger" href="<?php echo e(base_url('admin/categories.php?delete=' . (int) $category['id'])); ?>" onclick="return confirm('Delete this category? This only works when the category has no linked data.');">Delete</a>
                                </div>
                            </td>
                        </tr>
                    <?php endforeach; ?>
                </tbody>
            </table>
        </div>
    </section>
</div>

<?php foreach ($categories as $category): ?>
    <?php $description = trim((string) ($category['description'] ?? '')); ?>
    <?php if ($description === '') {
        continue;
    } ?>
    <div class="modal-backdrop" id="category-description-<?php echo (int) $category['id']; ?>" hidden>
        <section class="modal-panel modal-panel-small" role="dialog" aria-modal="true" aria-labelledby="category-description-title-<?php echo (int) $category['id']; ?>">
            <div class="modal-header">
                <div>
                    <h2 id="category-description-title-<?php echo (int) $category['id']; ?>"><?php echo e($category['name']); ?></h2>
                    <p class="muted"><?php echo e($category['slug']); ?></p>
                </div>
                <button class="modal-close" type="button" data-modal-close aria-label="Close">x</button>
            </div>
            <p class="modal-description-text"><?php echo nl2br(e($description)); ?></p>
        </section>
    </div>
<?php endforeach; ?>

<?php render_footer(); ?>
