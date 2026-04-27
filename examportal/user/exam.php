<?php
declare(strict_types=1);
require_once __DIR__ . '/../config/app.php';

ep_require_subscription();

$user = ep_current_user();
if (!$user) {
    ep_redirect('user/login.php');
}

$attemptId = (int) ($_GET['attempt_id'] ?? $_POST['attempt_id'] ?? 0);
if ($attemptId <= 0) {
    ep_flash_set('error', 'Attempt id is required.');
    ep_redirect('user/dashboard.php');
}

function ep_collect_runner_responses(array $post): array
{
    $responses = [];

    $single = $post['option_single'] ?? [];
    if (is_array($single)) {
        foreach ($single as $questionId => $value) {
            $qid = (int) $questionId;
            if ($qid <= 0) {
                continue;
            }
            $responses[$qid] = ['option' => (string) $value];
        }
    }

    $multi = $post['option_multi'] ?? [];
    if (is_array($multi)) {
        foreach ($multi as $questionId => $values) {
            $qid = (int) $questionId;
            if ($qid <= 0) {
                continue;
            }
            if (!is_array($values)) {
                $values = [];
            }
            $responses[$qid] = ['options' => array_values(array_map(static fn($v): string => (string) $v, $values))];
        }
    }

    $numeric = $post['numeric'] ?? [];
    if (is_array($numeric)) {
        foreach ($numeric as $questionId => $value) {
            $qid = (int) $questionId;
            if ($qid <= 0) {
                continue;
            }
            $responses[$qid] = ['numeric' => (string) $value];
        }
    }

    $text = $post['text'] ?? [];
    if (is_array($text)) {
        foreach ($text as $questionId => $value) {
            $qid = (int) $questionId;
            if ($qid <= 0) {
                continue;
            }
            $responses[$qid] = ['text' => (string) $value];
        }
    }

    return $responses;
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $postAction = (string) ($_POST['post_action'] ?? '');
    $csrfToken = $_POST['csrf_token'] ?? null;
    if (!ep_verify_csrf_token(is_string($csrfToken) ? $csrfToken : null)) {
        if ($postAction === 'runtime_event') {
            http_response_code(400);
            echo 'csrf_failed';
            exit;
        }

        ep_flash_set('error', 'Session validation failed. Please refresh and try again.');
        ep_redirect('user/exam.php?attempt_id=' . $attemptId);
        exit;
    }

    if ($postAction === 'runtime_event') {
        $eventType = (string) ($_POST['event_type'] ?? '');
        $incrementRefresh = !empty($_POST['increment_refresh']);
        $payloadRaw = (string) ($_POST['payload_json'] ?? '');
        $payload = [];
        if ($payloadRaw !== '') {
            $decoded = json_decode($payloadRaw, true);
            if (is_array($decoded)) {
                $payload = $decoded;
            }
        }
        $payload['source'] = $payload['source'] ?? 'module5_runtime_js';

        $runtimeEvent = ep_log_attempt_runtime_event((int) $user['id'], $attemptId, $eventType, $payload, $incrementRefresh);
        if (!($runtimeEvent['ok'] ?? false)) {
            http_response_code(400);
            echo 'runtime_event_failed';
            exit;
        }
        if (!empty($runtimeEvent['force_submit'])) {
            http_response_code(409);
            echo 'force_submit';
            exit;
        }

        http_response_code(204);
        exit;
    }

    if ($postAction === 'resume_session') {
        $resume = ep_resume_user_attempt((int) $user['id'], $attemptId);
        if (!($resume['ok'] ?? false)) {
            ep_flash_set('error', (string) ($resume['message'] ?? 'Unable to resume session.'));
        } else {
            ep_flash_set('success', (string) ($resume['message'] ?? 'Attempt resumed.'));
        }
        ep_redirect('user/exam.php?attempt_id=' . $attemptId);
    }

    $responses = ep_collect_runner_responses($_POST);

    if ($postAction === 'pause_attempt') {
        $save = ep_save_user_attempt_responses((int) $user['id'], $attemptId, $responses, false);
        if (!($save['ok'] ?? false)) {
            ep_flash_set('error', (string) ($save['message'] ?? 'Unable to save responses.'));
            ep_redirect('user/exam.php?attempt_id=' . $attemptId);
        }

        $pause = ep_pause_user_attempt((int) $user['id'], $attemptId);
        if (!($pause['ok'] ?? false)) {
            ep_flash_set('error', (string) ($pause['message'] ?? 'Unable to pause attempt.'));
            ep_redirect('user/exam.php?attempt_id=' . $attemptId);
        }

        ep_flash_set('success', (string) ($pause['message'] ?? 'Attempt paused.'));
        ep_redirect('user/dashboard.php');
    }

    if ($postAction === 'submit_exam') {
        $save = ep_save_user_attempt_responses((int) $user['id'], $attemptId, $responses, true);
        if (!($save['ok'] ?? false)) {
            ep_flash_set('error', (string) ($save['message'] ?? 'Unable to submit exam.'));
            ep_redirect('user/exam.php?attempt_id=' . $attemptId);
        }

        $evaluate = ep_evaluate_user_attempt((int) $user['id'], $attemptId);
        if (!($evaluate['ok'] ?? false)) {
            ep_flash_set('error', (string) ($evaluate['message'] ?? 'Unable to evaluate exam.'));
            ep_redirect('user/exam.php?attempt_id=' . $attemptId);
        }

        ep_flash_set('success', 'Exam submitted and evaluated.');
        ep_redirect('user/result.php?attempt_id=' . $attemptId);
    }

    $save = ep_save_user_attempt_responses((int) $user['id'], $attemptId, $responses, false);
    if (!($save['ok'] ?? false)) {
        ep_flash_set('error', (string) ($save['message'] ?? 'Unable to save responses.'));
    } else {
        ep_flash_set('success', (string) ($save['message'] ?? 'Responses saved.'));
    }
    ep_redirect('user/exam.php?attempt_id=' . $attemptId);
}

$attempt = ep_get_user_attempt_detail((int) $user['id'], $attemptId);
if (!$attempt) {
    ep_flash_set('error', 'Attempt not found.');
    ep_redirect('user/dashboard.php');
}

$status = (string) ($attempt['status'] ?? 'in_progress');
if (in_array($status, ['evaluated', 'submitted', 'auto_submitted', 'abandoned'], true)) {
    if ($status !== 'evaluated') {
        ep_evaluate_user_attempt((int) $user['id'], $attemptId);
    }
    ep_redirect('user/result.php?attempt_id=' . $attemptId);
}

$endsAt = (string) ($attempt['ends_at'] ?? '');
if ($status !== 'paused' && $endsAt !== '' && strtotime($endsAt) !== false && strtotime($endsAt) <= time()) {
    ep_save_user_attempt_responses((int) $user['id'], $attemptId, [], false);
    ep_evaluate_user_attempt((int) $user['id'], $attemptId);
    ep_flash_set('success', 'Timer ended. Exam auto-submitted.');
    ep_redirect('user/result.php?attempt_id=' . $attemptId);
}

$noRefreshModeEnabled = (int) ($attempt['no_refresh_mode'] ?? 0) === 1;
$maxRefreshViolations = max(1, (int) ($attempt['max_refresh_violations'] ?? 1));
$currentRefreshViolations = (int) ($attempt['no_refresh_violations'] ?? 0);
if ($noRefreshModeEnabled && $currentRefreshViolations >= $maxRefreshViolations) {
    $forceSubmit = ep_force_auto_submit_attempt(
        (int) $user['id'],
        $attemptId,
        'no_refresh_limit',
        [
            'source' => 'module5_guard_on_load',
            'max_refresh_violations' => $maxRefreshViolations,
            'current_refresh_violations' => $currentRefreshViolations,
        ]
    );
    if (!($forceSubmit['ok'] ?? false)) {
        ep_flash_set('error', (string) ($forceSubmit['message'] ?? 'No-refresh policy enforcement failed.'));
        ep_redirect('user/dashboard.php');
    }

    ep_flash_set('error', 'No-refresh policy triggered. Attempt auto-submitted.');
    ep_redirect('user/result.php?attempt_id=' . $attemptId);
}

$attempt = ep_get_user_attempt_detail((int) $user['id'], $attemptId);
if (!$attempt) {
    ep_flash_set('error', 'Attempt not found after update.');
    ep_redirect('user/dashboard.php');
}

$questionRows = ep_get_attempt_question_rows((int) $user['id'], $attemptId);
if (!$questionRows) {
    ep_flash_set('error', 'This attempt has no question items.');
    ep_redirect('user/dashboard.php');
}

$answerMap = ep_get_attempt_answer_map($attemptId);
$status = (string) ($attempt['status'] ?? 'in_progress');
$allowPause = (int) ($attempt['allow_pause'] ?? 1) === 1;
$noRefreshMode = (int) ($attempt['no_refresh_mode'] ?? 0) === 1;
$maxRefreshViolations = max(1, (int) ($attempt['max_refresh_violations'] ?? 1));
$remainingSeconds = (int) ($attempt['remaining_seconds'] ?? 0);

if ($status !== 'paused') {
    if ((string) ($attempt['ends_at'] ?? '') !== '' && strtotime((string) $attempt['ends_at']) !== false) {
        $remainingByEndsAt = strtotime((string) $attempt['ends_at']) - time();
        $remainingSeconds = max(0, $remainingByEndsAt);
    } elseif ($remainingSeconds <= 0) {
        $remainingSeconds = max(60, (int) ($attempt['template_duration_minutes'] ?? 60) * 60);
    }
} elseif ($remainingSeconds <= 0) {
    $remainingSeconds = max(60, (int) ($attempt['template_duration_minutes'] ?? 60) * 60);
}

$statusPillClass = 'pill';
if ($status === 'paused') {
    $statusPillClass .= ' pill-bad';
}
if (in_array($status, ['evaluated', 'submitted', 'auto_submitted'], true)) {
    $statusPillClass .= ' pill-good';
}

ep_render_page_start([
    'title' => 'Exam Runner',
    'active' => 'dashboard',
    'hero_kicker' => 'Module 5 • Module 7',
    'hero_title' => (string) ($attempt['paper_title'] ?? ('Attempt #' . (int) $attempt['id'])),
    'hero_text' => 'Live exam runner with timer, policy guardrails, pause-resume controls, and instant result.',
]);
?>

<section class="panel">
  <div class="meta-list">
    <span class="pill">Attempt #<?= (int) $attempt['id']; ?></span>
    <span class="pill">Category: <?= h((string) ($attempt['category_name'] ?? 'General')); ?></span>
    <span class="pill">Subject: <?= h((string) ($attempt['subject_name'] ?? 'General')); ?></span>
    <?php if ((string) ($attempt['exam_year'] ?? '') !== ''): ?>
      <span class="pill">Year: <?= h((string) $attempt['exam_year']); ?></span>
    <?php endif; ?>
    <span class="<?= h($statusPillClass); ?>">Status: <?= h(ucfirst(str_replace('_', ' ', $status))); ?></span>
    <span class="pill">Questions: <?= count($questionRows); ?></span>
    <span class="pill">Timer: <strong id="runner-timer">--:--</strong></span>
    <?php if ($noRefreshMode): ?>
      <span class="pill">No Refresh: On</span>
      <span class="pill">Refresh Limit: <?= (int) $maxRefreshViolations; ?></span>
      <span class="pill">Refresh Violations: <?= (int) ($attempt['no_refresh_violations'] ?? 0); ?></span>
    <?php endif; ?>
  </div>
</section>

<?php if ($status === 'paused'): ?>
  <section class="panel">
    <p class="muted">This attempt is paused. Resume to continue from where you left off.</p>
    <form method="post" class="actions">
      <input type="hidden" name="csrf_token" value="<?= h(ep_csrf_token()); ?>">
      <input type="hidden" name="attempt_id" value="<?= (int) $attemptId; ?>">
      <input type="hidden" name="post_action" value="resume_session">
      <button class="btn" type="submit">Resume Session</button>
      <a class="btn-link btn-outline" href="<?= h(examportal_url('user/dashboard.php')); ?>">Back to Dashboard</a>
    </form>
  </section>
<?php else: ?>
  <section class="panel">
    <form id="runner-form" method="post" class="question-form-grid">
      <input type="hidden" id="runner-csrf" name="csrf_token" value="<?= h(ep_csrf_token()); ?>">
      <input type="hidden" name="attempt_id" value="<?= (int) $attemptId; ?>">
      <input type="hidden" id="runner-post-action" name="post_action" value="save_draft">

      <?php foreach ($questionRows as $idx => $question): ?>
        <?php
          $questionId = (int) $question['question_id'];
          $questionType = (string) ($question['question_type'] ?? 'mcq_single');
          $savedAnswer = $answerMap[$questionId] ?? null;
          $savedOptionKeys = strtoupper((string) ($savedAnswer['selected_option_keys'] ?? ''));
          $savedOptionsSet = [];
          if ($savedOptionKeys !== '') {
              $savedParts = preg_split('/[\s,]+/', $savedOptionKeys) ?: [];
              foreach ($savedParts as $part) {
                  $k = substr(trim($part), 0, 1);
                  if ($k !== '') {
                      $savedOptionsSet[$k] = true;
                  }
              }
          }
          $savedNumeric = $savedAnswer['answer_numeric'] ?? '';
          $savedText = (string) ($savedAnswer['answer_text'] ?? '');
        ?>

        <article class="panel" style="margin-top:8px; grid-column:1 / -1;">
          <h3 class="section-title" style="margin-top:0;">Q<?= $idx + 1; ?>. <?= h((string) $question['question_text']); ?></h3>

          <?php if ((string) ($question['section_name'] ?? '') !== ''): ?>
            <p class="muted">Section: <?= h((string) $question['section_name']); ?></p>
          <?php endif; ?>

          <div class="meta-list" style="margin-bottom:8px;">
            <span class="pill">Type: <?= h($questionType); ?></span>
            <span class="pill">Marks: <?= h(number_format((float) ($question['template_marks'] ?? 1), 2)); ?></span>
          </div>

          <?php if (in_array($questionType, ['mcq_single', 'true_false'], true)): ?>
            <div class="form-grid">
              <?php foreach (($question['options'] ?? []) as $opt): ?>
                <?php
                  $optKey = strtoupper((string) ($opt['option_key'] ?? ''));
                  $isChecked = isset($savedOptionsSet[$optKey]) ? 'checked' : '';
                ?>
                <label class="checkbox-row">
                  <input type="radio" name="option_single[<?= $questionId; ?>]" value="<?= h($optKey); ?>" <?= $isChecked; ?>>
                  <span><strong><?= h($optKey); ?>.</strong> <?= h((string) ($opt['option_text'] ?? '')); ?></span>
                </label>
              <?php endforeach; ?>
            </div>
          <?php elseif ($questionType === 'mcq_multi'): ?>
            <div class="form-grid">
              <?php foreach (($question['options'] ?? []) as $opt): ?>
                <?php
                  $optKey = strtoupper((string) ($opt['option_key'] ?? ''));
                  $isChecked = isset($savedOptionsSet[$optKey]) ? 'checked' : '';
                ?>
                <label class="checkbox-row">
                  <input type="checkbox" name="option_multi[<?= $questionId; ?>][]" value="<?= h($optKey); ?>" <?= $isChecked; ?>>
                  <span><strong><?= h($optKey); ?>.</strong> <?= h((string) ($opt['option_text'] ?? '')); ?></span>
                </label>
              <?php endforeach; ?>
            </div>
          <?php elseif ($questionType === 'numeric'): ?>
            <label for="numeric_<?= $questionId; ?>">Your Numeric Answer</label>
            <input id="numeric_<?= $questionId; ?>" name="numeric[<?= $questionId; ?>]" type="number" step="0.0001" value="<?= h((string) $savedNumeric); ?>">
          <?php else: ?>
            <label for="text_<?= $questionId; ?>">Your Answer</label>
            <textarea id="text_<?= $questionId; ?>" name="text[<?= $questionId; ?>]" rows="3"><?= h($savedText); ?></textarea>
          <?php endif; ?>

          <?php if ((string) ($question['hint_text'] ?? '') !== ''): ?>
            <p class="inline-note">Hint: <?= h((string) $question['hint_text']); ?></p>
          <?php endif; ?>
        </article>
      <?php endforeach; ?>

      <div class="form-actions" style="grid-column:1 / -1;">
        <button class="btn" type="submit" onclick="document.getElementById('runner-post-action').value='save_draft'">Save Draft</button>
        <?php if ($allowPause): ?>
          <button class="btn" type="submit" onclick="document.getElementById('runner-post-action').value='pause_attempt'">Save & Pause</button>
        <?php endif; ?>
        <button class="btn" type="submit" onclick="document.getElementById('runner-post-action').value='submit_exam'">Submit Exam</button>
        <a class="btn-link btn-outline" href="<?= h(examportal_url('user/dashboard.php')); ?>">Exit to Dashboard</a>
      </div>
    </form>
  </section>

  <script>
    (function () {
      var remaining = <?= (int) max(0, $remainingSeconds); ?>;
      var timerEl = document.getElementById('runner-timer');
      var formEl = document.getElementById('runner-form');
      var actionEl = document.getElementById('runner-post-action');
      var csrfEl = document.getElementById('runner-csrf');
      var postUrl = <?= json_encode(examportal_url('user/exam.php?attempt_id=' . $attemptId)); ?>;
      var attemptId = <?= (int) $attemptId; ?>;
      var noRefreshMode = <?= $noRefreshMode ? 'true' : 'false'; ?>;
      var isSubmitting = false;
      var refreshLogged = false;
      if (!timerEl) {
        return;
      }

      function fmt(sec) {
        var h = Math.floor(sec / 3600);
        var m = Math.floor((sec % 3600) / 60);
        var s = sec % 60;
        if (h > 0) {
          return String(h).padStart(2, '0') + ':' + String(m).padStart(2, '0') + ':' + String(s).padStart(2, '0');
        }
        return String(m).padStart(2, '0') + ':' + String(s).padStart(2, '0');
      }

      function logRuntimeEvent(eventType, payload, incrementRefresh) {
        if (!navigator.sendBeacon || !csrfEl) {
          return;
        }
        var body = new URLSearchParams();
        body.append('csrf_token', csrfEl.value);
        body.append('attempt_id', String(attemptId));
        body.append('post_action', 'runtime_event');
        body.append('event_type', eventType);
        if (incrementRefresh) {
          body.append('increment_refresh', '1');
        }
        body.append('payload_json', JSON.stringify(payload || {}));
        navigator.sendBeacon(postUrl, body);
      }

      if (formEl) {
        formEl.addEventListener('submit', function () {
          isSubmitting = true;
        });
      }

      var navEntries = (performance.getEntriesByType && performance.getEntriesByType('navigation')) || [];
      if (noRefreshMode && navEntries.length > 0 && navEntries[0].type === 'reload') {
        refreshLogged = true;
        logRuntimeEvent('refresh_detected', { source: 'navigation_reload' }, true);
      }

      document.addEventListener('visibilitychange', function () {
        if (document.visibilityState === 'hidden') {
          logRuntimeEvent('tab_hidden', { source: 'visibilitychange' }, false);
        } else if (document.visibilityState === 'visible') {
          logRuntimeEvent('tab_visible', { source: 'visibilitychange' }, false);
        }
      });

      window.addEventListener('beforeunload', function () {
        if (!noRefreshMode || isSubmitting || refreshLogged) {
          return;
        }
        refreshLogged = true;
        logRuntimeEvent('refresh_detected', { source: 'beforeunload' }, true);
      });

      function tick() {
        if (remaining <= 0) {
          timerEl.textContent = '00:00';
          if (formEl && actionEl) {
            actionEl.value = 'submit_exam';
            isSubmitting = true;
            formEl.submit();
          }
          return;
        }
        timerEl.textContent = fmt(remaining);
        remaining -= 1;
      }

      tick();
      setInterval(tick, 1000);
    })();
  </script>
<?php endif; ?>

<?php ep_render_page_end(); ?>
