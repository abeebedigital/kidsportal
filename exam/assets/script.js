document.addEventListener('DOMContentLoaded', function () {
  if (!window.examConfig) {
    return;
  }

  var form = document.getElementById('examForm');
  var hiddenInput = document.getElementById('answersJson');
  var panes = Array.prototype.slice.call(document.querySelectorAll('.question-pane'));
  var paletteButtons = Array.prototype.slice.call(document.querySelectorAll('.palette-btn'));
  var prevBtn = document.getElementById('prevQuestionBtn');
  var nextBtn = document.getElementById('nextQuestionBtn');
  var submitBtn = document.getElementById('submitExamBtn');
  var timerEl = document.getElementById('examTimer');
  var storageKey = 'kids_exam_answers_' + window.examConfig.examId;
  var currentIndex = 0;
  var answers = {};

  function readSavedAnswers() {
    var initial = window.examConfig.initialAnswers || {};
    try {
      var saved = localStorage.getItem(storageKey);
      if (saved) {
        var parsed = JSON.parse(saved);
        if (parsed && typeof parsed === 'object') {
          return parsed;
        }
      }
    } catch (error) {
      return initial;
    }
    return initial;
  }

  answers = readSavedAnswers();

  function persistAnswers() {
    if (hiddenInput) {
      hiddenInput.value = JSON.stringify(answers);
    }
    try {
      localStorage.setItem(storageKey, JSON.stringify(answers));
    } catch (error) {
      // Ignore localStorage write errors.
    }
  }

  function clearSavedAnswers() {
    try {
      localStorage.removeItem(storageKey);
    } catch (error) {
      // Ignore localStorage removal errors.
    }
  }

  function updatePalette() {
    paletteButtons.forEach(function (button) {
      var index = Number(button.getAttribute('data-index'));
      var questionId = String(button.getAttribute('data-question-id'));
      button.classList.toggle('is-active', index === currentIndex);
      button.classList.toggle('is-answered', !!answers[questionId]);
    });
  }

  function showQuestion(index) {
    currentIndex = Math.max(0, Math.min(index, panes.length - 1));
    panes.forEach(function (pane, paneIndex) {
      pane.classList.toggle('is-active', paneIndex === currentIndex);
    });
    if (prevBtn) {
      prevBtn.disabled = currentIndex === 0;
    }
    if (nextBtn) {
      nextBtn.disabled = currentIndex === panes.length - 1;
    }
    updatePalette();
  }

  function markSelectedOptions() {
    panes.forEach(function (pane) {
      var questionId = String(pane.getAttribute('data-question-id'));
      var selected = answers[questionId] || '';
      var inputs = pane.querySelectorAll('input[type="radio"]');
      inputs.forEach(function (input) {
        input.checked = input.value === selected;
      });
    });
  }

  paletteButtons.forEach(function (button) {
    button.addEventListener('click', function () {
      showQuestion(Number(button.getAttribute('data-index')));
    });
  });

  panes.forEach(function (pane) {
    var questionId = String(pane.getAttribute('data-question-id'));
    pane.querySelectorAll('input[type="radio"]').forEach(function (input) {
      input.addEventListener('change', function () {
        answers[questionId] = input.value;
        persistAnswers();
        updatePalette();
      });
    });
  });

  if (prevBtn) {
    prevBtn.addEventListener('click', function () {
      showQuestion(currentIndex - 1);
    });
  }

  if (nextBtn) {
    nextBtn.addEventListener('click', function () {
      showQuestion(currentIndex + 1);
    });
  }

  if (form) {
    form.addEventListener('submit', function () {
      persistAnswers();
      clearSavedAnswers();
    });
  }

  function renderTimer() {
    if (!timerEl || typeof window.examConfig.remainingSeconds === 'undefined') {
      return;
    }

    var remaining = Math.max(0, Number(window.examConfig.remainingSeconds) || 0);

    function updateTimer() {
      var minutes = Math.floor(remaining / 60);
      var seconds = remaining % 60;
      timerEl.textContent = String(minutes).padStart(2, '0') + ':' + String(seconds).padStart(2, '0');

      if (remaining <= 0) {
        clearInterval(window.__kidsExamTimer);
        if (form) {
          persistAnswers();
          form.submit();
        }
        return;
      }

      remaining -= 1;
    }

    updateTimer();
    window.__kidsExamTimer = setInterval(updateTimer, 1000);
  }

  markSelectedOptions();
  persistAnswers();
  showQuestion(0);
  renderTimer();
});
