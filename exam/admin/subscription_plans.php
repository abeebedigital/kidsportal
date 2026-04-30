<?php
require_once __DIR__ . '/../includes/functions.php';
require_admin_login();

$categories = get_categories(true);
$editing = null;

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $action = $_POST['action'] ?? 'create';
    $categoryId = (int) ($_POST['category_id'] ?? 0);
    $name = trim($_POST['name'] ?? '');
    $amount = (float) ($_POST['amount'] ?? 0);
    $durationDays = (int) ($_POST['duration_days'] ?? 0);
    $description = trim($_POST['description'] ?? '');
    $isActive = isset($_POST['is_active']) ? 1 : 0;

    if ($categoryId <= 0 || $name === '' || $amount < 0 || $durationDays <= 0) {
        set_flash('error', 'Choose category, plan name, amount, and valid duration.');
        redirect_to('admin/subscription_plans.php');
    }

    if ($action === 'update') {
        $planId = (int) ($_POST['plan_id'] ?? 0);
        $stmt = $conn->prepare('UPDATE subscription_plans SET category_id = ?, name = ?, amount = ?, duration_days = ?, description = ?, is_active = ? WHERE id = ?');
        $stmt->bind_param('isdisii', $categoryId, $name, $amount, $durationDays, $description, $isActive, $planId);
        $stmt->execute();
        $stmt->close();
        set_flash('success', 'Subscription plan updated successfully.');
    } else {
        $stmt = $conn->prepare('INSERT INTO subscription_plans (category_id, name, amount, duration_days, description, is_active) VALUES (?, ?, ?, ?, ?, ?)');
        $stmt->bind_param('isdisi', $categoryId, $name, $amount, $durationDays, $description, $isActive);
        $stmt->execute();
        $stmt->close();
        set_flash('success', 'Subscription plan added successfully.');
    }

    redirect_to('admin/subscription_plans.php');
}

if (isset($_GET['toggle'])) {
    $planId = (int) $_GET['toggle'];
    $stmt = $conn->prepare('UPDATE subscription_plans SET is_active = CASE WHEN is_active = 1 THEN 0 ELSE 1 END WHERE id = ?');
    $stmt->bind_param('i', $planId);
    $stmt->execute();
    $stmt->close();
    set_flash('success', 'Plan status updated.');
    redirect_to('admin/subscription_plans.php');
}

if (isset($_GET['edit'])) {
    $planId = (int) $_GET['edit'];
    $stmt = $conn->prepare('SELECT * FROM subscription_plans WHERE id = ? LIMIT 1');
    $stmt->bind_param('i', $planId);
    $stmt->execute();
    $editing = $stmt->get_result()->fetch_assoc();
    $stmt->close();
}

$plans = get_subscription_plans(false);

render_header('Manage Plans', 'admin');
?>

<div class="stacked-sections">
    <section class="card">
        <h2><?php echo $editing ? 'Edit Plan' : 'Add Plan'; ?></h2>
        <p class="muted">Each plan unlocks exactly one category for the configured price and duration.</p>
        <form method="post" class="form-grid">
            <input type="hidden" name="action" value="<?php echo $editing ? 'update' : 'create'; ?>">
            <?php if ($editing): ?>
                <input type="hidden" name="plan_id" value="<?php echo (int) $editing['id']; ?>">
            <?php endif; ?>
            <div class="form-row">
                <label for="categoryId">Category</label>
                <select id="categoryId" name="category_id" required>
                    <option value="">Choose category</option>
                    <?php foreach ($categories as $category): ?>
                        <option value="<?php echo (int) $category['id']; ?>" <?php echo (int) ($editing['category_id'] ?? 0) === (int) $category['id'] ? 'selected' : ''; ?>>
                            <?php echo e($category['name']); ?>
                        </option>
                    <?php endforeach; ?>
                </select>
            </div>
            <div class="form-row">
                <label for="planName">Plan Name</label>
                <input id="planName" type="text" name="name" value="<?php echo e($editing['name'] ?? ''); ?>" placeholder="Example: UPSC Monthly" required>
            </div>
            <div class="inline-grid">
                <div class="form-row">
                    <label for="amount">Amount</label>
                    <input id="amount" type="number" min="0" step="0.01" name="amount" value="<?php echo e($editing['amount'] ?? '299.00'); ?>" required>
                </div>
                <div class="form-row">
                    <label for="durationDays">Duration Days</label>
                    <input id="durationDays" type="number" min="1" name="duration_days" value="<?php echo e($editing['duration_days'] ?? 30); ?>" required>
                </div>
            </div>
            <div class="form-row">
                <label for="planDescription">Description</label>
                <textarea id="planDescription" name="description"><?php echo e($editing['description'] ?? ''); ?></textarea>
            </div>
            <label class="check-row">
                <input type="checkbox" name="is_active" value="1" <?php echo (int) ($editing['is_active'] ?? 1) === 1 ? 'checked' : ''; ?>>
                Active
            </label>
            <div class="actions">
                <button class="btn btn-primary" type="submit"><?php echo $editing ? 'Update Plan' : 'Save Plan'; ?></button>
                <?php if ($editing): ?>
                    <a class="btn btn-ghost" href="<?php echo e(base_url('admin/subscription_plans.php')); ?>">Cancel</a>
                <?php endif; ?>
            </div>
        </form>
    </section>

    <section class="table-card">
        <h2>Plan List</h2>
        <div class="table-wrap">
            <table>
                <thead>
                    <tr>
                        <th>S.No</th>
                        <th>Plan</th>
                        <th>Category</th>
                        <th>Amount</th>
                        <th>Duration</th>
                        <th>Status</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    <?php if (!$plans): ?>
                        <tr><td colspan="7">No subscription plans yet.</td></tr>
                    <?php endif; ?>
                    <?php foreach ($plans as $index => $plan): ?>
                        <tr>
                            <td><?php echo $index + 1; ?></td>
                            <td><?php echo e($plan['name']); ?></td>
                            <td><?php echo e($plan['category_name']); ?></td>
                            <td><?php echo number_format((float) $plan['amount'], 2); ?></td>
                            <td><?php echo (int) $plan['duration_days']; ?> days</td>
                            <td>
                                <span class="pill <?php echo (int) $plan['is_active'] === 1 ? 'pill-success' : 'pill-warning'; ?>">
                                    <?php echo (int) $plan['is_active'] === 1 ? 'Active' : 'Inactive'; ?>
                                </span>
                            </td>
                            <td>
                                <div class="actions">
                                    <a class="btn btn-accent" href="<?php echo e(base_url('admin/subscription_plans.php?edit=' . (int) $plan['id'])); ?>">Edit</a>
                                    <a class="btn btn-ghost" href="<?php echo e(base_url('admin/subscription_plans.php?toggle=' . (int) $plan['id'])); ?>">Toggle</a>
                                </div>
                            </td>
                        </tr>
                    <?php endforeach; ?>
                </tbody>
            </table>
        </div>
    </section>
</div>

<?php render_footer(); ?>
