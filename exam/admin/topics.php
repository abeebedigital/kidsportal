<?php
require_once __DIR__ . '/../includes/functions.php';
require_admin_login();

$editing = null;

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $action = $_POST['action'] ?? 'create';
    $name = trim($_POST['name'] ?? '');

    if ($name === '') {
        set_flash('error', 'Topic name is required.');
        redirect_to('admin/topics.php');
    }

    if ($action === 'update') {
        $topicId = (int) ($_POST['topic_id'] ?? 0);
        $stmt = $conn->prepare('UPDATE topics SET name = ? WHERE id = ?');
        $stmt->bind_param('si', $name, $topicId);
        $stmt->execute();
        $stmt->close();
        set_flash('success', 'Topic updated successfully.');
    } else {
        $stmt = $conn->prepare('INSERT INTO topics (name) VALUES (?)');
        $stmt->bind_param('s', $name);
        $stmt->execute();
        $stmt->close();
        set_flash('success', 'Topic added successfully.');
    }

    redirect_to('admin/topics.php');
}

if (isset($_GET['delete'])) {
    $topicId = (int) $_GET['delete'];
    $stmt = $conn->prepare('DELETE FROM topics WHERE id = ?');
    $stmt->bind_param('i', $topicId);
    $stmt->execute();
    $stmt->close();
    set_flash('success', 'Topic deleted successfully.');
    redirect_to('admin/topics.php');
}

if (isset($_GET['edit'])) {
    $topicId = (int) $_GET['edit'];
    $stmt = $conn->prepare('SELECT * FROM topics WHERE id = ? LIMIT 1');
    $stmt->bind_param('i', $topicId);
    $stmt->execute();
    $editing = $stmt->get_result()->fetch_assoc();
    $stmt->close();
}

$topics = get_topics();

render_header('Manage Topics', 'admin');
?>

<div class="grid-2">
    <section class="card">
        <h2><?php echo $editing ? 'Edit Topic' : 'Add Topic'; ?></h2>
        <p class="muted">Create the high-level subject buckets that questions will belong to.</p>
        <form method="post" class="form-grid">
            <input type="hidden" name="action" value="<?php echo $editing ? 'update' : 'create'; ?>">
            <?php if ($editing): ?>
                <input type="hidden" name="topic_id" value="<?php echo (int) $editing['id']; ?>">
            <?php endif; ?>
            <div class="form-row">
                <label for="topicName">Topic Name</label>
                <input id="topicName" type="text" name="name" value="<?php echo e($editing['name'] ?? ''); ?>" placeholder="Example: Fractions" required>
            </div>
            <div class="actions">
                <button class="btn btn-primary" type="submit"><?php echo $editing ? 'Update Topic' : 'Save Topic'; ?></button>
                <?php if ($editing): ?>
                    <a class="btn btn-ghost" href="<?php echo e(base_url('admin/topics.php')); ?>">Cancel</a>
                <?php endif; ?>
            </div>
        </form>
    </section>

    <section class="table-card">
        <h2>Topic List</h2>
        <p class="muted">Deleting a topic also removes its linked questions because of the foreign key rule.</p>
        <div class="table-wrap">
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Topic</th>
                        <th>Created</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    <?php if (!$topics): ?>
                        <tr>
                            <td colspan="4">No topics yet.</td>
                        </tr>
                    <?php else: ?>
                        <?php foreach ($topics as $topic): ?>
                            <tr>
                                <td><?php echo (int) $topic['id']; ?></td>
                                <td><?php echo e($topic['name']); ?></td>
                                <td><?php echo e($topic['created_at']); ?></td>
                                <td>
                                    <div class="actions">
                                        <a class="btn btn-accent" href="<?php echo e(base_url('admin/topics.php?edit=' . (int) $topic['id'])); ?>">Edit</a>
                                        <a class="btn btn-danger" href="<?php echo e(base_url('admin/topics.php?delete=' . (int) $topic['id'])); ?>" onclick="return confirm('Delete this topic and its questions?');">Delete</a>
                                    </div>
                                </td>
                            </tr>
                        <?php endforeach; ?>
                    <?php endif; ?>
                </tbody>
            </table>
        </div>
    </section>
</div>

<?php render_footer(); ?>
